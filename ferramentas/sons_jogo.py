#!/usr/bin/env python3
"""Gera os efeitos de "jogo" do Estilo 3 (sintetizados, livres de direitos) em audio/sfx/.
Uso: python3 ferramentas/sons_jogo.py [pasta_saida=audio]
Cria: jogo_moeda, jogo_blip, jogo_nivel, jogo_dano, jogo_menu, jogo_glitch, jogo_erro, jogo_zona,
      jogo_alvo, fogo, splash, batimento.
"""
import numpy as np, wave, os, sys
SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 else 'audio'
R = np.random.default_rng(11)
t_ = lambda d: np.arange(int(SR * d)) / SR

def save(path, x):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    x = np.asarray(x, np.float32); x = x / (np.max(np.abs(x)) + 1e-9) * 0.89
    st = np.stack([x, x], 1)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def env(n, a=.004, d=.15):
    t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d)
def sq(f, d, duty=.5):  # onda quadrada (som de videogame)
    t = t_(d); return np.where((t * f) % 1 < duty, 1.0, -1.0)
def place(buf, x, at):
    i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n]
def eco(x, d=.09, g=.35, n=3):
    y = np.concatenate([x, np.zeros(int(SR * d * n))])
    for k in range(1, n + 1): place(y, x * g ** k, d * k)
    return y

S = {}
# moedinha: duas notas rápidas subindo
m = np.zeros(int(SR * .45)); place(m, sq(988, .07) * env(int(SR * .07), .002, .05) * .5, 0); place(m, sq(1319, .3) * env(int(SR * .3), .002, .12) * .5, .07); S['jogo_moeda'] = lp(m, 7000)
# blip curto de interface
S['jogo_blip'] = lp(sq(1760, .06, .25) * env(int(SR * .06), .001, .025), 6000) * .6
# subir de nível: arpejo
n = np.zeros(int(SR * 1.0))
for i, f in enumerate([523, 659, 784, 1047, 1319]): place(n, sq(f, .14, .5) * env(int(SR * .14), .002, .07) * .45, i * .07)
S['jogo_nivel'] = lp(eco(n, .11, .3, 3), 8000)
# dano: tom caindo + ruído
t = t_(.3); d = sq(1, .3) * 0; f = 600 * np.exp(-t * 7) + 90; d = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * env(len(t), .002, .12) * .5 + lp(R.standard_normal(len(t)), 2500) * env(len(t), .001, .04) * .5
S['jogo_dano'] = d
# menu / clique
S['jogo_menu'] = lp(sq(880, .04, .3) * env(int(SR * .04), .001, .015), 5000) * .5
# glitch: rajadas digitais
g = np.zeros(int(SR * .7))
for k in range(9):
    seg = (R.standard_normal(int(SR * R.uniform(.02, .06))) > 0).astype(float) * 2 - 1
    seg = np.repeat(seg[::int(R.integers(8, 40))], int(R.integers(8, 40)))[:int(SR * .06)]
    place(g, seg * .4 * R.uniform(.5, 1), k * .07 + R.uniform(0, .02))
S['jogo_glitch'] = lp(g, 9000)
# erro de sistema: dois bipes graves
e = np.zeros(int(SR * .9))
for k in range(2): place(e, (sq(196, .28, .5) + sq(207, .28, .5)) * env(int(SR * .28), .003, .2) * .35, k * .34)
S['jogo_erro'] = lp(e, 3000)
# zona fechando: zumbido grave com tremolo (loop de 4 s)
t = t_(4); z = (np.sin(2 * np.pi * 55 * t) + .5 * np.sin(2 * np.pi * 110.7 * t) + .25 * np.sign(np.sin(2 * np.pi * 82.5 * t))) * (.7 + .3 * np.sin(2 * np.pi * 3 * t))
S['jogo_zona'] = lp(z, 900)
# alvo travado (mira)
a = np.zeros(int(SR * .35)); place(a, sq(1400, .05) * .4, 0); place(a, sq(1400, .05) * .4, .09); S['jogo_alvo'] = lp(a, 6000)
# fogo crepitando (loop de 4 s)
f = lp(R.standard_normal(SR * 4), 700) * .5
for k in range(120): place(f, hp(R.standard_normal(int(SR * .01)), 2000) * R.uniform(.2, 1), R.uniform(0, 3.95))
S['fogo'] = f
# splash
t = t_(.9); S['splash'] = lp(hp(R.standard_normal(len(t)), 300), 5000) * np.exp(-t * 5) * np.minimum(1, t / .01)
# batimento cardíaco tenso
hb = np.zeros(int(SR * 1.6)); lub = lp(np.sin(2 * np.pi * 55 * t_(.16)) * env(int(SR * .16), .005, .06), 300)
for b in (0, .8): place(hb, lub, b); place(hb, lub * .7, b + .2)
S['batimento'] = hb
for k, v in S.items(): save(f'{OUT}/sfx/{k}.wav', v)
print('ok:', ', '.join(S))
