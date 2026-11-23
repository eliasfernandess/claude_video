#!/usr/bin/env python3
"""Monta o audio final e a timeline do video.

    python3 tools/build_audio.py

Le roteiro/timeline.json + audio/narracao.mp3 e escreve:
  audio/mix.wav        narracao com as pausas inseridas + efeitos sonoros sintetizados em codigo + vento
  web/timeline.js      legendas, pausas e envelope da voz (para a boca do Namiques) no tempo final do video
So precisa de numpy e ffmpeg.
"""
import json
import subprocess
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
FPS = 30
rng = np.random.default_rng(1925)
TL = json.loads((ROOT / 'roteiro' / 'timeline.json').read_text())
LEAD, TAIL, INS = TL['lead'], TL['tail'], TL['inserts']


# ---------------------------------------------------------------- tempo original -> tempo final
def T(o):
    return o + LEAD + sum(d for p, d in INS if o >= p)


def ins_start(i):
    p, d = INS[i]
    return T(p) - d


def when(c):
    if 'ins' in c:
        return ins_start(c['ins']) + c.get('at', 0)
    if 'orig' in c:
        return T(c['orig']) + c.get('at', 0)
    return T(c['t'])


# ---------------------------------------------------------------- narracao
def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)


voice = decode(ROOT / 'audio' / 'narracao.mp3')
voice /= np.max(np.abs(voice)) / 0.89
src_dur = len(voice) / SR
total = T(src_dur) + TAIL
N = int(total * SR) + 1
narr = np.zeros(N)
cuts = [0.0] + [p for p, _ in INS] + [src_dur]
for a, b in zip(cuts[:-1], cuts[1:]):
    seg = voice[int(a * SR):int(b * SR)]
    s = int(T(a) * SR) if a == 0 else int(T(a) * SR)
    n = min(len(seg), N - s)
    # micro fade nas bordas do corte para nao estalar
    f = np.ones(n)
    k = min(240, n // 2)
    f[:k] = np.linspace(0, 1, k)
    f[-k:] = np.linspace(1, 0, k)
    narr[s:s + n] += seg[:n] * f


# ---------------------------------------------------------------- utilitarios de sintese
def t_(d):
    return np.arange(int(d * SR)) / SR


def noise(d):
    return rng.standard_normal(int(d * SR))


def band(x, lo, hi, soft=0.25):
    """filtro passa-banda no dominio da frequencia (bordas suaves)"""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    g = np.ones_like(f)
    if lo > 0:
        g *= 1 / (1 + (lo / np.maximum(f, 1e-3)) ** (2 / soft))
    if hi < SR / 2:
        g *= 1 / (1 + (f / hi) ** (2 / soft))
    return np.fft.irfft(X * g, n)


def norm(x, peak=1.0):
    m = np.max(np.abs(x))
    return x * (peak / m) if m > 0 else x


def reverb(x, t60=0.6, mix=0.3, tone=4000):
    ir = noise(t60 * 1.2) * np.exp(-6.9 * t_(t60 * 1.2) / t60)
    ir = band(ir, 120, tone)
    ir /= np.sqrt(np.sum(ir ** 2))
    n = len(x) + len(ir)
    y = np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)
    out = np.zeros(n)
    out[:len(x)] += x * (1 - mix)
    out += norm(y, np.max(np.abs(x)) + 1e-9) * mix
    return out


def place(dst, x, at):
    s = max(0, int(at * SR))
    if s >= len(dst):
        return
    n = min(len(x), len(dst) - s)
    dst[s:s + n] += x[:n]


def fade(x, a=0.01, b=0.05):
    x = x.copy()
    ka, kb = int(a * SR), int(b * SR)
    if ka:
        x[:ka] *= np.linspace(0, 1, ka)
    if kb:
        x[-kb:] *= np.linspace(1, 0, kb)
    return x


def tone(f, d, wave='sine', vib=0.0, vibf=5.5):
    t = t_(d)
    ph = 2 * np.pi * np.cumsum(f * (1 + vib * np.sin(2 * np.pi * vibf * t)) * np.ones_like(t)) / SR
    if wave == 'sine':
        return np.sin(ph)
    if wave == 'square':
        return np.sign(np.sin(ph)) * 0.6
    if wave == 'pulse':
        return np.where((ph / (2 * np.pi)) % 1 < 0.25, 1.0, -0.33)
    if wave == 'saw':
        return 2 * ((ph / (2 * np.pi)) % 1) - 1


def mtof(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------------------------------------------------------------- efeitos
def knock(kind='rail'):
    d = 0.16
    t = t_(d)
    if kind == 'glass':
        body = (np.sin(2 * np.pi * 1450 * t) * 0.5 + np.sin(2 * np.pi * 3100 * t) * 0.3) * np.exp(-t * 60)
        click = band(noise(d), 2000, 9000) * np.exp(-t * 300) * 0.8
    else:
        f0 = 150 if kind == 'door' else 210
        body = (np.sin(2 * np.pi * f0 * t) + 0.6 * np.sin(2 * np.pi * f0 * 2.3 * t) + 0.3 * np.sin(2 * np.pi * f0 * 4.1 * t)) * np.exp(-t * 45)
        click = band(noise(d), 500, 3500) * np.exp(-t * 180) * 0.9
    return body + click


def toc3(kind):
    out = np.zeros(int(1.4 * SR))
    for i in range(3):
        place(out, knock(kind) * (1 - 0.05 * i), 0.05 + i * 0.36)
    if kind == 'door':
        out = reverb(out, 0.9, 0.35, 3000)
    if kind == 'rail':
        out = reverb(out, 1.4, 0.25, 2500)       # ao ar livre, la no alto
    return out


def footstep(soft=1.0):
    d = 0.14
    t = t_(d)
    thump = np.sin(2 * np.pi * (95 + 40 * rng.random()) * t) * np.exp(-t * 38)
    wood = band(noise(d), 300, 2500) * np.exp(-t * 70) * 0.5
    return (thump + wood) * soft


def steps(n, gap, jitter=0.04, decay=0.0, creak_every=0):
    out = np.zeros(int((n * gap + 0.6) * SR))
    for i in range(n):
        g = (1 - decay * i / max(1, n - 1)) * (0.8 + 0.3 * rng.random())
        place(out, footstep() * g, i * gap + rng.uniform(-jitter, jitter))
        if creak_every and i % creak_every == 1:
            place(out, creak(0.35, 120) * 0.25 * g, i * gap + 0.05)
    return out


def creak(d=0.8, f=110):
    t = t_(d)
    fr = f * (1 + 0.35 * np.sin(2 * np.pi * 0.9 / d * t) + 0.08 * rng.standard_normal(len(t)).cumsum() / np.sqrt(len(t)))
    ph = np.cumsum(fr) / SR
    pulses = (np.sin(2 * np.pi * ph) > 0.93).astype(float)
    x = band(pulses + 0.02 * rng.standard_normal(len(t)), 250, 2600)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 0.6
    return norm(x * env)


def piano_note(m, d=1.6, vel=1.0):
    f = mtof(m)
    t = t_(d)
    x = np.zeros_like(t)
    for h in range(1, 7):
        fh = f * h * np.sqrt(1 + 0.0004 * h * h)
        x += np.sin(2 * np.pi * fh * t) * np.exp(-t * (1.2 + h * 0.9)) / h
    att = np.minimum(1, t / 0.004)
    return x * att * vel


def keyboard_note(m, d=0.5, detune=0.0):
    f = mtof(m) * (1 + detune)
    x = tone(f, d, 'pulse', vib=0.003) + 0.5 * tone(f * 1.003, d, 'square')
    x = band(x, 120, 2600)
    t = t_(d)
    return x * np.exp(-t * 2.4) * np.minimum(1, t / 0.01)


def sfx(name):
    if name == 'creak':
        return creak(0.9, 120)
    if name == 'creak_long':
        a = creak(3.6, 70)
        return reverb(a, 1.5, 0.3, 2000)
    if name == 'steps_up':
        return steps(6, 0.4, creak_every=3)
    if name == 'run_down':
        return steps(8, 0.17, decay=0.3)
    if name == 'steps_down':
        return steps(4, 0.62, decay=0.2, creak_every=2)
    if name == 'steps_two':
        a = steps(9, 0.46, decay=0.85)
        b = steps(7, 0.61, decay=0.85)
        out = np.zeros(max(len(a), len(b)) + SR)
        place(out, a, 0)
        place(out, b * 0.8, 0.2)
        return reverb(out, 1.2, 0.25, 3000)
    if name == 'bip':
        out = np.zeros(int(0.5 * SR))
        place(out, fade(tone(988, 0.09, 'square'), 0.002, 0.01), 0)
        place(out, fade(tone(1480, 0.16, 'square'), 0.002, 0.04), 0.1)
        return out
    if name == 'dance':
        out = np.zeros(int(2.2 * SR))
        for i, at in enumerate([0.1, 0.42, 0.74, 1.06]):           # cinco, seis, sete, oito
            place(out, footstep(0.5), at)
        sl = band(noise(0.7), 1800, 7000) * np.sin(np.pi * np.clip(t_(0.7) / 0.7, 0, 1)) ** 2 * 0.25
        place(out, sl, 1.3)
        return out
    if name == 'keys3':
        out = np.zeros(int(2.2 * SR))
        for i, m in enumerate([72, 76, 79]):
            place(out, keyboard_note(m, 0.9), i * 0.42)
        return reverb(out, 1.0, 0.2)
    if name == 'wrong':
        x = keyboard_note(73, 0.8, 0.0) + keyboard_note(74, 0.8, 0.012)
        t = t_(0.8)
        return reverb(x * (1 - 0.15 * t), 0.8, 0.2)
    if name == 'toc_rail':
        return toc3('rail')
    if name == 'toc_door':
        return toc3('door')
    if name == 'toc_glass':
        return toc3('glass')
    if name in ('pencil', 'pen'):
        d = 2.2 if name == 'pencil' else 1.3
        out = np.zeros(int(d * SR))
        at = 0.0
        while at < d - 0.3:
            L = rng.uniform(0.12, 0.32) if name == 'pencil' else rng.uniform(0.07, 0.18)
            lo, hi = (1800, 7000) if name == 'pencil' else (2500, 8000)
            s = band(noise(L), lo, hi) * (0.6 + 0.4 * np.sin(2 * np.pi * rng.uniform(18, 30) * t_(L)) ** 2)
            place(out, fade(s, 0.01, 0.04) * rng.uniform(0.5, 1), at)
            at += L + rng.uniform(0.03, 0.12)
        return out * 0.6
    if name == 'applause':
        d = 3.2
        out = np.zeros(int(d * SR))
        for _ in range(260):
            at = rng.uniform(0, d - 0.1)
            dens = np.sin(np.pi * at / d) ** 0.7
            if rng.random() > dens:
                continue
            c = band(noise(0.03), 700, 3500) * np.exp(-t_(0.03) * 140)
            place(out, c * rng.uniform(0.3, 1), at)
        return reverb(band(out, 200, 2200), 1.0, 0.4)
    if name == 'clock':
        out = np.zeros(int(4.2 * SR))
        for i in range(8):
            f = 2600 if i % 2 == 0 else 1900
            c = band(noise(0.025), f * 0.7, f * 1.3) * np.exp(-t_(0.025) * 220) + np.sin(2 * np.pi * f * t_(0.025)) * np.exp(-t_(0.025) * 200) * 0.4
            place(out, c, i * 0.5)
        return out
    if name == 'ring':
        out = np.zeros(int(4.2 * SR))
        for k in range(2):
            r = (tone(440, 1.3) + tone(480, 1.3)) * 0.5
            r *= (np.sin(2 * np.pi * 20 * t_(1.3)) > -0.2)            # trinado de telefone
            place(out, fade(band(r, 300, 3000), 0.01, 0.05), k * 2.1)
        return out
    if name == 'spin':
        d = 1.1
        t = t_(d)
        w = noise(d)
        lo = band(w, 300, 900) * np.sin(np.pi * np.clip(t / 0.55, 0, 1)) ** 2
        hi = band(w, 1200, 4000) * np.sin(np.pi * np.clip((t - 0.25) / 0.55, 0, 1)) ** 2
        out = np.zeros(int(1.6 * SR))
        place(out, (lo + hi * 0.7) * 0.5, 0)
        sq = tone(1300, 0.07) * np.linspace(1, 0, int(0.07 * SR)) * 0.3
        place(out, sq, 1.02)
        place(out, footstep(0.6), 1.05)
        return out
    if name == 'violin':
        mel = [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60]
        dur = [0.42] * 6 + [0.8] + [0.42] * 6 + [0.9]
        out = np.zeros(int((sum(dur) + 1) * SR))
        at = 0
        for m, d in zip(mel, dur):
            n = tone(mtof(m) * (1 + rng.uniform(-0.012, 0.015)), d, 'saw', vib=0.006, vibf=6.2)
            n = band(n, 350, 4500)
            env = np.minimum(1, t_(d) / 0.06) * np.minimum(1, (d - t_(d)) / 0.05)
            place(out, n * env, at)
            at += d
        return reverb(out, 1.1, 0.35)
    if name == 'rain':
        d = 15.8
        t = t_(d)
        r = band(noise(d), 400, 9000) * 0.35 + band(noise(d), 80, 400) * 0.25
        env = np.minimum(1, t / 3.0) * np.minimum(1, (d - t) / 2.5)
        out = r * env
        for _ in range(500):
            at = rng.uniform(0, d - 0.05)
            place(out, band(noise(0.012), 2000, 8000) * np.exp(-t_(0.012) * 400) * 0.5 * min(1, at / 3), at)
        return out
    if name == 'lid':
        d = 0.5
        t = t_(d)
        th = np.sin(2 * np.pi * 75 * t) * np.exp(-t * 18)
        cl = band(noise(d), 900, 3500) * np.exp(-t * 90) * 0.7
        return reverb(th + cl, 0.6, 0.25)
    if name == 'kids':
        d = 5.0
        out = np.zeros(int(d * SR))
        at = 0
        while at < d - 0.5:
            m = rng.choice([72, 74, 76, 77, 79, 81])
            L = rng.choice([0.25, 0.25, 0.5])
            n = band(tone(mtof(m) * (1 + rng.uniform(-0.01, 0.01)), L, 'square'), 300, 2500) * 0.4
            place(out, fade(n, 0.02, 0.05), at)
            at += L
        for i in range(10):
            place(out, band(noise(0.06), 5000, 11000) * np.exp(-t_(0.06) * 50) * 0.6, 0.2 + i * 0.47)
        at = 0.1
        while at < d - 1:
            place(out, piano_note(int(rng.choice([55, 60, 62, 64, 67])), 1.0, 0.5), at)
            at += rng.choice([0.5, 1.0])
        return reverb(band(out, 150, 3500), 1.0, 0.45)
    if name == 'slide_note':
        out = np.zeros(int(3.0 * SR))
        sl = band(noise(1.3), 250, 1400) * np.sin(np.pi * np.clip(t_(1.3) / 1.3, 0, 1)) ** 1.5 * 0.35
        place(out, sl, 0.05)
        place(out, piano_note(36, 2.8, 1.0), 1.0)
        return reverb(out, 1.4, 0.3)
    if name == 'piano_dream':
        d = T(206.16) - T(197.75)
        out = np.zeros(int((d + 0.5) * SR))
        chords = [[48, 55, 64, 67], [45, 52, 60, 64], [41, 48, 57, 60], [43, 50, 59, 62]]
        at, i = 0.0, 0
        while at < d:
            ch = chords[i % 4]
            for j, m in enumerate(ch + [ch[2] + 12]):
                place(out, piano_note(m, 2.4, 0.55 if j else 0.7), at + j * 0.21)
            at += 2.1
            i += 1
        out = reverb(out, 1.6, 0.3)[:int(d * SR)]
        k = int(0.03 * SR)
        out[-k:] *= np.linspace(1, 0, k)                    # para de repente
        return out
    if name == 'vibrate':
        d = 1.3
        t = t_(d)
        b = tone(165, d, 'square') * ((t % 0.65) < 0.42)
        return band(b, 100, 3000) * 0.8
    if name == 'door_close':
        out = np.zeros(int(1.6 * SR))
        place(out, creak(0.7, 150) * 0.3, 0)
        place(out, lid := sfx('lid'), 0.7)
        c = band(noise(0.02), 2000, 6000) * np.exp(-t_(0.02) * 300) * 0.5
        place(out, c, 0.78)
        return reverb(out, 0.8, 0.3)
    if name == 'child_wrong':
        out = np.zeros(int(2.4 * SR))
        seq = [(60, 0), (62, 0.3), (63, 0.62), (60, 1.15), (62, 1.42), (63, 1.72)]   # erra a mesma nota duas vezes
        for m, at in seq:
            place(out, piano_note(m, 0.9, 0.8), at)
        return reverb(out, 0.7, 0.25)
    raise KeyError(name)


fx = np.zeros(N)
for c in TL['sfx']:
    x = sfx(c['name'])
    x = norm(x) * c['gain']
    place(fx, x, when(c))

# vento (ambiente o video inteiro, bem baixo) ate o silencio total
w = TL['wind']
w_end = ins_start(w['until_ins'])
d = w_end
t = t_(d)
wind = band(noise(d), 70, 700) * (0.55 + 0.3 * np.sin(2 * np.pi * 0.07 * t) + 0.15 * np.sin(2 * np.pi * 0.19 * t + 1))
wind = norm(wind) * w['gain']
wind[:int(1.0 * SR)] *= np.linspace(0, 1, int(1.0 * SR))
wind[-int(0.05 * SR):] *= np.linspace(1, 0, int(0.05 * SR))
place(fx, wind, 0)

# silencio total: nada de efeito entre o inicio da pausa 6 e o toc no vidro
s0, s1 = int(ins_start(6) * SR), int(ins_start(8) * SR)
fx[s0:s1] *= 0.0

mix = narr + fx
mix = norm(mix, 0.95)
out = ROOT / 'audio' / 'mix.wav'
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-ac', '2', str(out)],
               input=pcm.tobytes(), check=True)

# ---------------------------------------------------------------- timeline para o navegador
caps = []
raw = TL['captions']
for i, c in enumerate(raw):
    if isinstance(c, dict):
        s = when(c)
        caps.append([round(s, 3), round(s + c['dur'], 3), c['text'], c.get('cls', '')])
    else:
        s, e, text = c[0], c[1], c[2]
        cls = c[3] if len(c) > 3 else ''
        caps.append([round(T(s), 3), round(T(e) + 0.3, 3), text, cls])
caps.sort(key=lambda c: c[0])
for a, b in zip(caps[:-1], caps[1:]):           # sem sobreposicao
    a[1] = min(a[1], b[0])

hop = SR // FPS
nfr = int(total * FPS) + 1
env = []
for i in range(nfr):
    seg = narr[i * hop:(i + 1) * hop]
    env.append(float(np.sqrt(np.mean(seg ** 2))) if len(seg) else 0.0)
env = np.array(env)
env = np.clip(env / (np.percentile(env[env > 0.01], 90) + 1e-9), 0, 1)

data = {
    'lead': LEAD, 'inserts': INS, 'duration': round(total, 3), 'fps': FPS,
    'captions': caps, 'env': [round(float(v), 2) for v in env],
}
(ROOT / 'web' / 'timeline.js').write_text('window.TL = ' + json.dumps(data, ensure_ascii=False) + ';\n')
print(f'duracao final {total:.2f} s ({nfr} quadros), {len(caps)} legendas -> audio/mix.wav, web/timeline.js')
