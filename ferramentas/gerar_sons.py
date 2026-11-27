#!/usr/bin/env python3
"""Gera a biblioteca de efeitos sonoros e trilhas provisórias (sintetizadas, livres de direitos).
Uso: python3 ferramentas/gerar_sons.py [pasta_saida=audio]
Cria audio/sfx/*.wav e audio/trilhas/*.wav. As trilhas são provisórias: para o vídeo final,
prefira uma trilha de banco (ElevenLabs Music, YouTube Audio Library, Pixabay) com o mesmo clima.
"""
import numpy as np, wave, os, sys, subprocess
SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 else 'audio'
R = np.random.default_rng(7)
t_ = lambda d: np.arange(int(SR * d)) / SR

def save(path, x, stereo_w=0.0):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    x = np.asarray(x, np.float32)
    if x.ndim == 1: x = np.stack([x, x], 1)
    pk = np.max(np.abs(x)) + 1e-9; x = x / pk * 0.89
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())

def lp(x, fc):  # passa-baixa de 1 polo (fc pode ser array)
    fc = np.broadcast_to(np.asarray(fc, np.float64), x.shape); a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a[i]) * x[i] + a[i] * s; y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def bp(x, lo, hi): return lp(hp(x, lo), hi)
def env(n, a=.005, d=.2, curve=4):
    t = np.arange(n) / SR; e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-curve * np.maximum(0, t - a) / max(d, 1e-4)); return e
def tone(f, d, harm=(1,), decay=1.0, det=0.0):
    t = t_(d); x = sum(np.sin(2 * np.pi * f * (k) * t * (1 + det * (k - 1))) / k ** 1.3 for k in harm); return x * np.exp(-t / decay)
def reverb(x, tail=1.6, mix=.25):
    n = int(SR * tail); ir = R.standard_normal(n) * np.exp(-6 * np.arange(n) / n); ir = lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
    L = len(x) + n; F = 1 << (L - 1).bit_length(); y = np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[:L]
    out = np.zeros(L); out[:len(x)] = x; return out * (1 - mix) + y * mix * 3
def place(base, x, at):
    i = int(at * SR); base[i:i + len(x)] += x[:max(0, len(base) - i)]; return base

def sfx():
    S = {}
    n = R.standard_normal(int(SR * .6)); sw = np.linspace(300, 6000, len(n)) ** 1 ; S['whoosh'] = bp(n, 200, 600 + 5000 * np.sin(np.linspace(0, np.pi, len(n)))) * np.sin(np.linspace(0, np.pi, len(n))) ** 2
    n = R.standard_normal(int(SR * .32)); S['whoosh_curto'] = bp(n, 400, 900 + 6000 * np.sin(np.linspace(0, np.pi, len(n)))) * np.sin(np.linspace(0, np.pi, len(n))) ** 2
    t = t_(.14); S['pop'] = np.sin(2 * np.pi * (900 - 2800 * t) * t) * env(len(t), .002, .04)
    S['ding'] = reverb(tone(1318, 1.6, (1, 2.76, 5.4), .5) * env(int(SR * 1.6), .002, 1.2, 1.5), 1.2, .3)
    S['sino'] = reverb(sum(tone(f, 2.4, (1, 2.0, 3.01), 1.1) for f in (523, 784)), 2.0, .35)
    k = R.standard_normal(int(SR * .09)); knock = bp(k, 120, 900) * env(len(k), .001, .03) + tone(180, .09, (1, 2), .03) * .8
    S['toc'] = knock; tt = np.zeros(int(SR * 1.2));
    for i in range(3): place(tt, knock, i * .32)
    S['toc_toc_toc'] = reverb(tt, .5, .15)
    t = t_(1.8); S['impacto'] = reverb(np.sin(2 * np.pi * (70 * np.exp(-t * 2)) * t) * np.exp(-t * 2.5) + lp(R.standard_normal(len(t)), 900) * np.exp(-t * 6) * .5, 1.4, .3)
    t = t_(2.2); S['riser'] = (bp(R.standard_normal(len(t)), 300, 800 + 7000 * (t / 2.2) ** 2) * (t / 2.2) ** 2 + np.sin(2 * np.pi * (200 + 600 * (t / 2.2) ** 2) * t) * .25 * (t / 2.2)) * (1 - np.exp(-(2.2 - t) * 30))
    sp = np.zeros(int(SR * 1.4))
    for i in range(18): f = R.uniform(2200, 5200); place(sp, tone(f, .25, (1, 2), .06) * .5, R.uniform(0, 1.1))
    S['brilho'] = reverb(sp, 1.0, .4)
    tk = np.zeros(int(SR * 2.1)); click = bp(R.standard_normal(int(SR * .02)), 2000, 7000) * env(int(SR * .02), .0005, .008)
    for i in range(8): place(tk, click * (1 if i % 2 else .7), i * .25)
    S['tic_tac'] = tk
    t = t_(1.1); buzz = np.sign(np.sin(2 * np.pi * 160 * t)) * .4 + np.sin(2 * np.pi * 160 * t); gate = ((t % .45) < .3).astype(float); S['vibra'] = lp(buzz * gate, 1200) * .7
    ring = np.zeros(int(SR * 2.6))
    for k in range(2): place(ring, (np.sin(2 * np.pi * 440 * t_(.9)) + np.sin(2 * np.pi * 480 * t_(.9))) * env(int(SR * .9), .02, 2, .2) * .5, k * 1.4)
    S['chamando'] = ring
    hb = np.zeros(int(SR * 2)); lub = lp(np.sin(2 * np.pi * 55 * t_(.15)) * env(int(SR * .15), .005, .06), 300)
    for b in (0, .95): place(hb, lub, b); place(hb, lub * .7, b + .22)
    S['coracao'] = hb
    st = np.zeros(int(SR * 2)); step = lp(R.standard_normal(int(SR * .07)), 1800) * env(int(SR * .07), .002, .025)
    for i in range(4): place(st, step * (.8 + .2 * (i % 2)), .1 + i * .42)
    S['passos'] = st
    pg = np.zeros(int(SR * .5)); fl = bp(R.standard_normal(int(SR * .25)), 1500, 8000) * np.sin(np.linspace(0, np.pi, int(SR * .25))) ** 3; place(pg, fl, .05); S['papel'] = pg
    nt = np.zeros(int(SR * .8)); place(nt, tone(1046, .4, (1, 2), .12), 0); place(nt, tone(1568, .4, (1, 2), .15), .12); S['notificacao'] = reverb(nt, .6, .2)
    ty = np.zeros(int(SR * 2.2))
    for i in range(14): place(ty, bp(R.standard_normal(int(SR * .018)), 1500, 6000) * env(int(SR * .018), .0005, .006) * R.uniform(.5, 1), .05 + i * .14 + R.uniform(-.03, .03))
    S['teclado'] = ty
    t = t_(1.6); S['swell'] = bp(R.standard_normal(len(t)), 500, 2000 + 8000 * (t / 1.6) ** 2) * (t / 1.6) ** 3
    t = t_(1.2); S['sopro_magico'] = reverb((np.sin(2 * np.pi * 880 * t) + np.sin(2 * np.pi * 1320 * t) * .5) * np.sin(np.pi * t / 1.2) ** 2 * .4 + bp(R.standard_normal(len(t)), 3000, 9000) * np.sin(np.pi * t / 1.2) ** 2 * .3, 1.5, .4)
    t = t_(1.0); S['plim_triste'] = reverb(tone(392, 1.0, (1, 2, 3), .4) + tone(311, 1.0, (1, 2, 3), .4) * .7, 1.2, .3)
    t = t_(.5); S['risadinha'] = sum(np.sin(2 * np.pi * (500 + 60 * k) * t) * ((t > k * .1) & (t < k * .1 + .07)) for k in range(4)) * .5
    # ambientes (loops de 10 s)
    n = R.standard_normal(SR * 10); S['amb_vento'] = lp(n, 300 + 250 * np.sin(np.linspace(0, 6 * np.pi, len(n)))) * (0.6 + 0.4 * np.sin(np.linspace(0, 4 * np.pi, len(n))))
    n = R.standard_normal(SR * 10); S['amb_chuva'] = hp(lp(n, 6000), 800) * .6 + lp(R.standard_normal(SR * 10), 400) * .3
    n = R.standard_normal(SR * 10); hum = np.sin(2 * np.pi * 60 * t_(10)) * .05; S['amb_cidade_noite'] = lp(n, 500) * .5 + hum
    n = R.standard_normal(SR * 10); S['amb_rua_dia'] = bp(n, 200, 2500) * .3 + lp(R.standard_normal(SR * 10), 200) * .3
    for k, v in S.items(): save(f'{OUT}/sfx/{k}.wav', v)
    return list(S)

# ---------- trilhas provisórias ----------
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
def piano(f, d, vel=1.0):
    t = t_(d); x = sum(np.sin(2 * np.pi * f * k * t * (1 + .0007 * (k - 1))) * (.6 ** (k - 1)) for k in range(1, 7)); return x * (1 - np.exp(-t * 400)) * np.exp(-t * (1.2 + f / 900)) * vel
def pad(f, d):
    t = t_(d); x = sum(np.sin(2 * np.pi * f * m * t + R.uniform(0, 6)) for m in (1, 1.003, .997, 2.001)) * .25; a = np.minimum(1, t / 1.2) * np.minimum(1, (d - t) / 1.2); return lp(x, 1800) * a
def trilha(nome, bpm, acordes, compassos=16, arpejo=(0, 2, 1, 2), pulso=False, oct=0, brilho=False):
    beat = 60 / bpm; bar = beat * 4; dur = bar * compassos + 3; out = np.zeros(int(SR * dur))
    for b in range(compassos):
        ch = acordes[b % len(acordes)]; t0 = b * bar
        out = place(out, sum(pad(NOTE(m - 12 + oct), bar + 1.2) for m in ch) * .35, t0)
        out = place(out, piano(NOTE(ch[0] - 24 + oct), bar * 1.2, .7), t0)
        for i in range(8 if brilho else 4):
            step = bar / (8 if brilho else 4); m = ch[arpejo[i % len(arpejo)]] + (12 if (brilho and i % 4 == 3) else 0)
            out = place(out, piano(NOTE(m + oct), 1.6, .55 if i % 2 else .7), t0 + i * step)
        if pulso:
            for i in range(4): out = place(out, lp(np.sin(2 * np.pi * NOTE(ch[0] - 24 + oct) * t_(.35)) * env(int(SR * .35), .003, .2), 600) * .8, t0 + i * beat)
    out = reverb(out, 2.4, .35); f = int(SR * 2); out[-f:] *= np.linspace(1, 0, f)
    save(f'{OUT}/trilhas/{nome}.wav', out); subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-i', f'{OUT}/trilhas/{nome}.wav', '-b:a', '192k', f'{OUT}/trilhas/{nome}.mp3'], check=True); os.remove(f'{OUT}/trilhas/{nome}.wav')
C, G, Am, F, Em, Dm = [60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60], [52, 55, 59], [50, 53, 57]
def trilhas():
    trilha('emocional_piano', 78, [C, G, Am, F])                                   # reflexivo, saudade
    trilha('esperanca', 96, [F, C, G, Am], brilho=True)                            # sonho, conquista, final positivo
    trilha('tensao_misterio', 70, [Am, F, Dm, Em], arpejo=(0, 1, 2, 1), pulso=True, oct=-12)  # mistério, perigo, virada
    trilha('melancolia', 66, [Am, F, C, G], arpejo=(2, 1, 0, 1))                    # perda, despedida
    return ['emocional_piano', 'esperanca', 'tensao_misterio', 'melancolia']

if __name__ == '__main__':
    a = sfx(); b = trilhas(); print(f'{len(a)} efeitos em {OUT}/sfx e {len(b)} trilhas em {OUT}/trilhas')
