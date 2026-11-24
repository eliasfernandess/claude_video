#!/usr/bin/env python3
"""Deixa a voz no ritmo do perfil analisado (~3,6 palavras/s, pausas curtas).
Uso: python3 ferramentas/apertar_voz.py <voz_entrada> <voz_saida.wav> [--vel 1.0] [--pausa 0.18] [--limiar -38]
 - remove o silêncio do começo e do fim;
 - toda pausa interna maior que --pausa é encurtada para --pausa (corte suave de 15 ms);
 - --vel acelera sem mudar o tom (atempo do ffmpeg), ex.: 1.08.
"""
import argparse, subprocess, sys, wave, numpy as np, os, tempfile
ap = argparse.ArgumentParser(); ap.add_argument('entrada'); ap.add_argument('saida')
ap.add_argument('--vel', type=float, default=1.0); ap.add_argument('--pausa', type=float, default=0.18); ap.add_argument('--limiar', type=float, default=-38)
a = ap.parse_args(); SR = 48000
raw = subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', a.entrada, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
win = int(SR * .01); n = len(x) // win
rms = np.sqrt(np.mean(x[:n * win].reshape(n, win) ** 2, axis=1) + 1e-12); db = 20 * np.log10(rms)
silent = db < a.limiar
runs = []; i = 0
while i < n:
    if silent[i]:
        j = i
        while j < n and silent[j]: j += 1
        runs.append((i, j)); i = j
    else: i += 1
keep = np.ones(len(x), bool); cap = int(a.pausa * SR); fade = int(.015 * SR)
for i, j in runs:
    s, e = i * win, j * win
    if i == 0: keep[:max(0, e - int(.03 * SR))] = False; continue        # silêncio inicial
    if j >= n: keep[s + int(.05 * SR):] = False; continue                 # silêncio final
    if e - s > cap: keep[s + cap // 2: e - cap // 2] = False              # pausa longa: mantém só cap
# junta com cross-fade curto nas emendas
segs = []; idx = np.flatnonzero(np.diff(np.r_[0, keep.astype(np.int8), 0]))
for k in range(0, len(idx), 2):
    seg = x[idx[k]:idx[k + 1]].copy()
    if len(seg) > 2 * fade: seg[:fade] *= np.linspace(0, 1, fade); seg[-fade:] *= np.linspace(1, 0, fade)
    segs.append(seg)
y = np.concatenate(segs)
tmp = tempfile.mktemp(suffix='.wav')
with wave.open(tmp, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-i', tmp, '-af', f'atempo={a.vel}', '-ac', '2', '-ar', str(SR), '-c:a', 'pcm_s16le', a.saida], check=True); os.remove(tmp)
d0 = len(x) / SR; d1 = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.saida], capture_output=True, text=True).stdout)
longas = sum(1 for i, j in runs if 0 < i and j < n and (j - i) * win > cap)
print(f'antes: {d0:.1f} s · depois: {d1:.1f} s ({longas} pausas encurtadas, velocidade {a.vel})')
