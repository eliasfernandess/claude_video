#!/usr/bin/env python3
"""Mixa voz + trilha + efeitos e (opcional) coloca o áudio no vídeo.
Uso: python3 ferramentas/mixar.py roteiro_som.json [--video video.mp4 --saida final.mp4]

roteiro_som.json:
{
  "voz": "caminho/voz.wav",
  "duracao": 98.5,                      // opcional: padrão = voz + 0.4 s
  "biblioteca": "audio",                // pasta com sfx/ e trilhas/
  "trilha": [ {"som": "melancolia", "de": 0, "ate": 60, "ganho": -17},
              {"som": "esperanca",  "de": 60, "ate": 98.5, "ganho": -17} ],
  "abaixar_trilha_na_fala": 7,          // dB que a trilha abaixa enquanto há voz
  "cortes": [3.1, 5.8, 8.2],            // um whoosh curto em cada corte de imagem
  "ganho_cortes": -16,
  "efeitos": [ {"t": 0.2, "som": "chamando", "ganho": -10},
               {"t": 0, "som": "amb_cidade_noite", "ate": 7, "ganho": -22} ]  // com "ate" o som repete até o tempo
}
Ganhos em dB relativos (0 = volume original do arquivo). No fim, tudo é nivelado em -14 LUFS (padrão das redes).
"""
import json, sys, os, subprocess, wave, tempfile, numpy as np
SR = 48000
def load(p):
    raw = subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', p, '-ac', '2', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32).reshape(-1, 2) / 32768
def db(g): return 10 ** (g / 20)
def add(buf, x, at, until=None, gain=0.0, fade=0.0):
    i0 = int(at * SR); n = (int(until * SR) - i0) if until is not None else len(x)
    if until is not None and len(x) < n: x = np.tile(x, (int(np.ceil(n / len(x))), 1))
    x = x[:max(0, min(n, len(buf) - i0))].copy() * db(gain)
    if fade and len(x) > 2 * int(fade * SR): f = int(fade * SR); r = np.linspace(0, 1, f)[:, None]; x[:f] *= r; x[-f:] *= r[::-1]
    buf[i0:i0 + len(x)] += x
def main():
    cfg = json.load(open(sys.argv[1], encoding='utf-8')); base = os.path.dirname(os.path.abspath(sys.argv[1]))
    P = lambda p: p if os.path.isabs(p) else os.path.join(base, p)
    lib = P(cfg.get('biblioteca', 'audio'))
    def som(n, k):
        if n.endswith(('.wav', '.mp3')): return P(n)
        for ext in ('.wav', '.mp3'):
            f = os.path.join(lib, k, n + ext)
            if os.path.exists(f): return f
        sys.exit(f'som não encontrado: {k}/{n}')
    voz = load(P(cfg['voz'])); T = cfg.get('duracao') or len(voz) / SR + .4; N = int(T * SR)
    V = np.zeros((N, 2), np.float32); V[:min(N, len(voz))] = voz[:N]
    M = np.zeros((N, 2), np.float32); E = np.zeros((N, 2), np.float32)
    for tr in cfg.get('trilha', []): add(M, load(som(tr['som'], 'trilhas')), tr.get('de', 0), tr.get('ate', T), tr.get('ganho', -17), fade=tr.get('fade', 1.2))
    # abaixa a trilha quando há voz (envelope suave: ataque 40 ms, soltura 350 ms)
    win = int(SR * .01); n = N // win; e = np.sqrt(np.mean(V[:n * win, 0].reshape(n, win) ** 2, 1)); act = (20 * np.log10(e + 1e-9) > -40).astype(float)
    g = np.empty(n); s = 0.0
    for i in range(n): s = s + (act[i] - s) * (.25 if act[i] > s else .03); g[i] = s
    duck = np.repeat(db(-cfg.get('abaixar_trilha_na_fala', 7) * g), win); duck = np.r_[duck, np.full(N - len(duck), duck[-1] if len(duck) else 1)]
    M *= duck[:, None]
    gc = cfg.get('ganho_cortes', -16); w = load(som('whoosh_curto', 'sfx'))
    for c in cfg.get('cortes', []): add(E, w, max(0, c - .12), gain=gc)
    for ef in cfg.get('efeitos', []): add(E, load(som(ef['som'], 'sfx')), ef['t'], ef.get('ate'), ef.get('ganho', -10), fade=.3 if ef.get('ate') else 0)
    mix = V + M + E; mix /= max(1.0, np.max(np.abs(mix)) / .98)
    tmp = tempfile.mktemp(suffix='.wav')
    with wave.open(tmp, 'wb') as wv: wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((mix * 32767).astype(np.int16).tobytes())
    out_wav = P(cfg.get('saida_audio', 'mix.wav'))
    subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-i', tmp, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', str(SR), out_wav], check=True); os.remove(tmp)
    print(f'✓ áudio mixado: {out_wav} ({T:.1f} s)')
    if '--video' in sys.argv:
        v = sys.argv[sys.argv.index('--video') + 1]; o = sys.argv[sys.argv.index('--saida') + 1]
        subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-i', v, '-i', out_wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', o], check=True)
        print(f'✓ vídeo com som: {o}')
if __name__ == '__main__': main()
