#!/usr/bin/env python3
"""Trilhas e efeitos no estilo do @aprendendocomvitinho1 (sintetizados, livres de direitos).
O estudo do som dele mostrou: fundo contínuo e macio (pad) + notas leves (cordas dedilhadas, caixinha de música,
sininhos), ambiente (vento, multidão), brilhinhos nos momentos mágicos, "swish" em parte dos cortes e
silêncio total nos momentos dramáticos.
Uso: python3 ferramentas/gerar_trilhas_vitinho.py [pasta_audio=audio]
Cria trilhas/vt_alegre, vt_suspense, vt_aventura, vt_emocao e sfx/swish, brilho_sobe, plim, boing, apagar,
poder_volta, sino_torre, amb_festa_noite, fogos.
"""
import numpy as np, wave, os, sys, subprocess
SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 else 'audio'
R = np.random.default_rng(7)
nota = lambda n: 440 * 2 ** ((n - 69) / 12)          # número MIDI -> Hz
def save(path, x, alvo=-16):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    x = np.asarray(x, np.float32)
    if x.ndim == 1: x = np.stack([x, x], 1)
    x = x / (np.max(np.abs(x)) + 1e-9) * .9
    tmp = path + '.tmp.wav'
    with wave.open(tmp, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())
    args = ['ffmpeg', '-v', 'error', '-y', '-i', tmp]
    if alvo is not None: args += ['-af', f'loudnorm=I={alvo}:TP=-2:LRA=11', '-ar', str(SR)]
    if path.endswith('.mp3'): args += ['-b:a', '192k']
    subprocess.run(args + [path], check=True); os.remove(tmp)
def lp(x, fc):  # passa-baixa de 1 polo, vetorizado em blocos via filtfilt simples
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def env(n, at=.005, dec=.4):
    t = np.arange(n) / SR; return np.minimum(1, t / at) * np.exp(-t / dec)
def add(buf, x, t, g=1.0):
    i = int(t * SR); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
# ---------- instrumentos ----------
def dedilhado(f, d=.7, br=1.0):     # corda dedilhada / pizzicato (harmônicos que morrem rápido)
    t = np.arange(int(SR * d)) / SR; x = np.zeros_like(t)
    for h in range(1, 9): x += np.sin(2 * np.pi * f * h * t * (1 + .0007 * h)) / h ** 1.2 * np.exp(-t * (3 + h * 2.2 * br))
    return x * np.minimum(1, t / .002)
def caixinha(f, d=1.6):             # caixinha de música / glockenspiel (parciais inarmônicos)
    t = np.arange(int(SR * d)) / SR; x = np.zeros_like(t)
    for r, a, k in [(1, 1, 2.2), (2.76, .45, 5), (5.4, .2, 9), (8.93, .08, 14)]: x += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * k)
    return x * np.minimum(1, t / .001)
def piano(f, d=2.2):
    t = np.arange(int(SR * d)) / SR; x = np.zeros_like(t)
    for h in range(1, 7): x += np.sin(2 * np.pi * f * h * t * (1 + .0004 * h * h)) / h ** 1.4 * np.exp(-t * (1.1 + h * .7))
    x += R.standard_normal(len(t)) * np.exp(-t * 300) * .05
    return x * np.minimum(1, t / .003)
def pad(fs, d, at=.8):              # acorde macio (dentes de serra desafinados, poucos harmônicos)
    t = np.arange(int(SR * d)) / SR; x = np.zeros_like(t)
    for f in fs:
        for det in (-.004, .004):
            for h in range(1, 6): x += np.sin(2 * np.pi * f * (1 + det) * h * t + h) / h ** 1.6
    e = np.minimum(1, t / at) * np.minimum(1, (d - t) / at)
    return x * e / len(fs)
def chocalho(d=.06): n = int(SR * d); x = R.standard_normal(n) * env(n, .002, .02); return x - lp(x, 5000)
def bumbo(): t = np.arange(int(SR * .25)) / SR; f = 50 + 70 * np.exp(-t * 30); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)
ACORDES = {'C': [60, 64, 67], 'G': [55, 59, 62], 'Am': [57, 60, 64], 'F': [53, 57, 60], 'Em': [52, 55, 59], 'Dm': [50, 53, 57], 'E': [52, 56, 59]}
def trilha(prog, bpm, compassos, estilo):
    b = 60 / bpm; dur = len(prog) * 4 * b * compassos // len(prog) if False else compassos * 4 * b
    L = int(SR * (dur + 3)); x = np.zeros(L)
    for k in range(compassos):
        c = ACORDES[prog[k % len(prog)]]; t0 = k * 4 * b
        add(x, pad([nota(n - 12) for n in c] + [nota(c[0] - 24)], 4 * b + .6, .5), t0, .22 if estilo != 'suspense' else .3)
        if estilo == 'alegre':      # pizzicato saltitante + sininho na melodia
            for i, n in enumerate([c[0], c[1], c[2], c[1], c[0] + 12, c[2], c[1], c[2]]): add(x, dedilhado(nota(n)), t0 + i * b / 2, .5)
            mel = [c[2] + 12, c[1] + 12, c[0] + 12, c[1] + 12] if k % 2 == 0 else [c[0] + 12, c[2] + 12, c[1] + 24 - 12, c[0] + 12]
            for i, n in enumerate(mel): add(x, caixinha(nota(n)), t0 + i * b + (b / 2 if i == 3 else 0), .22)
            for i in range(8): add(x, chocalho(), t0 + i * b / 2 + b / 4, .05)
        if estilo == 'suspense':    # caixinha esparsa em tom menor + tique
            for i, n in enumerate([c[0] + 12, c[2] + 12]): add(x, caixinha(nota(n), 2.5), t0 + i * 2 * b + b, .18)
            for i in range(4): add(x, chocalho(.03), t0 + i * b, .05)
        if estilo == 'aventura':    # ostinato rápido de cordas + bumbo leve + sininhos
            for i in range(16): add(x, dedilhado(nota([c[0], c[2], c[1] + 12, c[2]][i % 4]), .35, 1.6), t0 + i * b / 4, .38)
            for i in range(4): add(x, bumbo(), t0 + i * b, .35)
            for i in range(8): add(x, chocalho(), t0 + i * b / 2 + b / 4, .07)
            add(x, caixinha(nota(c[0] + 24), 1.2), t0 + 3.5 * b, .14)
        if estilo == 'emocao':      # piano em arpejo + pad
            for i, n in enumerate([c[0], c[1], c[2], c[1] + 12, c[2], c[1]]): add(x, piano(nota(n)), t0 + i * 2 * b / 3, .35)
            add(x, piano(nota(c[2] + 12), 3), t0, .25)
    x = x[:int(SR * dur)]; f = int(SR * .02); x[:f] *= np.linspace(0, 1, f)
    # reverb simples (ecos amortecidos) para soar "macio"
    y = x.copy()
    for d, g in [(.031, .35), (.053, .3), (.079, .25), (.11, .2), (.17, .14), (.23, .1)]: i = int(d * SR); y[i:] += x[:-i] * g
    return lp(y, 7000)
os.makedirs(f'{OUT}/trilhas', exist_ok=True)
save(f'{OUT}/trilhas/vt_alegre.mp3', trilha(['C', 'G', 'Am', 'F'], 104, 28, 'alegre'))
save(f'{OUT}/trilhas/vt_suspense.mp3', trilha(['Am', 'Am', 'Dm', 'E'], 80, 14, 'suspense'))
save(f'{OUT}/trilhas/vt_aventura.mp3', trilha(['Am', 'F', 'C', 'G'], 128, 28, 'aventura'))
save(f'{OUT}/trilhas/vt_emocao.mp3', trilha(['F', 'G', 'Em', 'Am', 'F', 'G', 'C', 'C'], 78, 22, 'emocao'))
# ---------- efeitos ----------
def ruido_filtrado(d, f0, f1, at=.3):
    n = int(SR * d); t = np.arange(n) / SR; x = R.standard_normal(n); y = np.zeros(n); s = 0.0
    fc = f0 * (f1 / f0) ** (t / d)
    for i in range(n): a = np.exp(-2 * np.pi * fc[i] / SR); s = (1 - a) * x[i] + a * s; y[i] = s
    y = y - lp(y, 300)
    return y * np.sin(np.pi * np.minimum(1, t / d)) ** 1.5
S = {}
S['swish'] = ruido_filtrado(.32, 900, 6000)
b = np.zeros(int(SR * 1.4))
for i, n in enumerate([84, 88, 91, 96, 100, 103]): add(b, caixinha(nota(n), 1.0), i * .055, .5)
S['brilho_sobe'] = b
S['plim'] = caixinha(nota(88), 1.4) + .5 * caixinha(nota(95), 1.4)
t = np.arange(int(SR * .5)) / SR; S['boing'] = np.sin(2 * np.pi * np.cumsum(180 + 90 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 5)) / SR) * np.exp(-t * 6)
t = np.arange(int(SR * .9)) / SR; f = 600 * np.exp(-t * 4) + 40; S['apagar'] = (np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .4 + np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-t * 3)
t = np.arange(int(SR * .7)) / SR; f = 300 + 900 * t / .7; S['poder_volta'] = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .7) * .6 + np.r_[np.zeros(int(SR * .5)), caixinha(nota(96), .7)][:len(t)]
t = np.arange(int(SR * 3)) / SR; S['sino_torre'] = sum(a * np.sin(2 * np.pi * 220 * r * t) * np.exp(-t * k) for r, a, k in [(1, 1, .9), (2.0, .5, 1.3), (2.4, .4, 1.6), (3.0, .3, 2), (4.2, .2, 3)])
# ambiente de festa à noite: murmúrio de gente + grilos
n = int(SR * 20); m = lp(R.standard_normal(n), 900); m = m - lp(m, 200); mod = lp(R.standard_normal(n) * 30, 3); m *= .6 + .4 * np.tanh(mod)
gr = np.zeros(n)
for k in range(60):
    tt = R.uniform(0, 19.5); c = np.arange(int(SR * .05)) / SR
    for j in range(3): add(gr, np.sin(2 * np.pi * 4300 * c) * np.sin(np.pi * c / .05) * .25, tt + j * .07)
S['amb_festa_noite'] = m + gr
f = np.zeros(int(SR * 2.5))
for k in range(5):
    tt = k * .4; c = R.standard_normal(int(SR * .8)) * np.exp(-np.arange(int(SR * .8)) / SR * 6); add(f, c - lp(c, 400), tt + .3, .6)
    add(f, ruido_filtrado(.3, 2000, 400) * .3, tt)
S['fogos'] = f
for k, v in S.items(): save(f'{OUT}/sfx/{k}.wav', v, alvo=-18)
print('ok:', ', '.join(['vt_alegre', 'vt_suspense', 'vt_aventura', 'vt_emocao'] + list(S)))
