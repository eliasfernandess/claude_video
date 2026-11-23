#!/usr/bin/env bash
# Gera o video final: audio (narracao + pausas + efeitos) -> render low-poly em paralelo -> mp4 com som.
#   bash make.sh            video completo em out/a-escada.mp4
#   bash make.sh 4          numero de processos de render em paralelo (padrao 4)
set -euo pipefail
cd "$(dirname "$0")"
JOBS="${1:-4}"
[ -d node_modules/three ] || npm install --silent --no-audit --no-fund
python3 tools/build_audio.py
DUR=$(node -e "global.window={};require('vm').runInThisContext(require('fs').readFileSync('web/timeline.js','utf8'));console.log(window.TL.duration)")
mkdir -p out/parts
rm -f out/parts/*.mp4
pids=()
for i in $(seq 0 $((JOBS - 1))); do
  A=$(python3 -c "print(round($DUR*$i/$JOBS*30)/30)")
  B=$(python3 -c "print(round($DUR*($i+1)/$JOBS*30)/30)")
  node tools/render.mjs --from "$A" --to "$B" --out "out/parts/p$i.mp4" > "out/parts/p$i.log" 2>&1 &
  pids+=($!)
done
for p in "${pids[@]}"; do wait "$p"; done
for i in $(seq 0 $((JOBS - 1))); do echo "file 'p$i.mp4'"; done > out/parts/list.txt
ffmpeg -v error -y -f concat -safe 0 -i out/parts/list.txt -c copy out/parts/video.mp4
ffmpeg -v error -y -i out/parts/video.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart out/a-escada.mp4
# folha de contato com a area segura do Instagram (vermelho)
ffmpeg -v error -y -i out/a-escada.mp4 -vf "fps=1/8,scale=180:320,drawbox=x=17:y=37:w=146:h=213:color=red@0.7:t=1,tile=11x3" -frames:v 1 out/a-escada.sheet.jpg
echo "pronto: out/a-escada.mp4"
