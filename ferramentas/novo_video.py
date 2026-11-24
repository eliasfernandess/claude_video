#!/usr/bin/env python3
"""Cria um projeto do Kit "E se animado" já no ritmo certo, sem depender do whisper.
Uso: python3 ferramentas/novo_video.py <pasta_do_kit> <nome> <audio_da_voz> <roteiro.txt> [--vel 1.0] [--pausa 0.18]

Faz, em ordem:
 1. aperta a voz (sem silêncio no começo/fim, pausas de no máximo --pausa s, velocidade --vel);
 2. cria meus-videos/<nome> a partir do modelo do kit, com o GSAP local (o CDN é bloqueado aqui)
    e o desfoque com 36 amostras (renderiza ~2x mais rápido sem placa de vídeo);
 3. duração do vídeo = voz + 0,4 s (sem tela parada no fim);
 4. alinha o texto do roteiro às pausas da voz e grava transcript.json e PALAVRAS.txt;
 5. imprime o ritmo (palavras/s) e uma sugestão de cortes: uma troca de imagem a cada 2 a 3,5 s.
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, glob
FER = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser(); ap.add_argument('kit'); ap.add_argument('nome'); ap.add_argument('audio'); ap.add_argument('roteiro')
ap.add_argument('--vel', type=float, default=1.0); ap.add_argument('--pausa', type=float, default=0.18)
a = ap.parse_args()
KIT = os.path.abspath(a.kit); S = os.path.join(KIT, '.claude/skills/e-se-animado'); P = os.path.join(KIT, 'meus-videos', a.nome)
if os.path.exists(P): sys.exit(f'meus-videos/{a.nome} já existe')
run = lambda *c, **k: subprocess.run(c, check=True, **k)
shutil.copytree(os.path.join(S, 'modelo'), P); os.makedirs(f'{P}/src/motor', exist_ok=True); os.makedirs(f'{P}/assets/audio', exist_ok=True); os.makedirs(f'{P}/assets/js', exist_ok=True)
for f in glob.glob(os.path.join(S, 'motor', '*.js')): shutil.copy(f, f'{P}/src/motor/')
core = open(f'{P}/src/motor/core.js').read().replace('i<72;i++){float fi=float(i);float r=sqrt(fi/72.)', 'i<36;i++){float fi=float(i);float r=sqrt(fi/36.)'); open(f'{P}/src/motor/core.js', 'w').write(core)
# GSAP local
g = os.path.join(KIT, '.gsap', 'gsap.min.js')
if not os.path.exists(g):
    d = tempfile.mkdtemp(); run('npm', 'pack', 'gsap@3.15.0', '--silent', cwd=d, capture_output=True); run('tar', 'xzf', 'gsap-3.15.0.tgz', cwd=d)
    os.makedirs(os.path.dirname(g), exist_ok=True); shutil.copy(f'{d}/package/dist/gsap.min.js', g)
shutil.copy(g, f'{P}/assets/js/gsap.min.js')
# voz apertada
voz = f'{P}/assets/audio/voz.wav'
run(sys.executable, '-I', os.path.join(FER, 'apertar_voz.py'), a.audio, voz, '--vel', str(a.vel), '--pausa', str(a.pausa))
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', voz], capture_output=True, text=True).stdout)
total = round(dur + .4, 2)
for f in ['index.html', 'compositions/film.html', 'meta.json']:
    p = f'{P}/{f}'; s = open(p).read().replace('__TOTAL__', str(total)).replace('__VOZ__', f'{dur:.3f}').replace('__NOME__', a.nome)
    s = s.replace('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js', 'assets/js/gsap.min.js'); open(p, 'w').write(s)
ui = json.load(open(f'{P}/ui.json')); ui['duracao'] = total; json.dump(ui, open(f'{P}/ui.json', 'w'), indent=2)
# alinhamento
sil = subprocess.run(['ffmpeg', '-nostdin', '-i', voz, '-af', 'silencedetect=n=-38dB:d=0.1', '-f', 'null', '-'], capture_output=True, text=True).stderr
sf = tempfile.mktemp(suffix='.txt'); open(sf, 'w').write('\n'.join(re.findall(r'silence_(?:start|end): [0-9.]+', sil)))
txt = tempfile.mktemp(suffix='.txt'); open(txt, 'w', encoding='utf-8').write(open(a.roteiro, encoding='utf-8').read().replace('"', ''))
run(sys.executable, '-I', os.path.join(FER, 'alinhar.py'), txt, sf, P, f'{dur:.3f}', stdout=subprocess.DEVNULL)
w = json.load(open(f'{P}/assets/audio/transcript.json', encoding='utf-8'))['words']
print(f'\nProjeto: {P}\nVoz: {dur:.1f} s · vídeo: {total} s · {len(w)} palavras · ritmo {len(w) / dur:.2f} palavras/s (alvo: 3,5 a 3,8)')
# sugestão de cortes: começa nova imagem em início de frase, a cada 2 a 3,5 s
starts = [w[0]['start']] + [w[i]['start'] for i in range(1, len(w)) if re.search(r'[.,!?…:]$', w[i - 1]['text'])]
cortes, last = [0.0], 0.0
for s in starts[1:]:
    if s - last >= 2.0: cortes.append(round(s, 2)); last = s
cortes2 = []
for c0, c1 in zip(cortes, cortes[1:] + [total]):
    cortes2.append(c0); x = c0
    while c1 - x > 3.6: x += (c1 - c0) / (int((c1 - c0) / 3.2) + 1); cortes2.append(round(x, 2))
json.dump({'cortes': cortes2[1:]}, open(f'{P}/cortes_sugeridos.json', 'w'))
print(f'Cortes sugeridos: {len(cortes2)} planos (média {total / len(cortes2):.1f} s) → {P}/cortes_sugeridos.json')
