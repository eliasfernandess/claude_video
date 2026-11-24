#!/bin/bash
# Renderiza um projeto do kit em partes (evita limite de tempo e falta de GPU) e junta com o áudio mixado.
# Uso: ferramentas/renderizar_partes.sh <pasta_do_kit> <nome> [segundos_por_parte=30] [audio_final.wav]
# Rode desanexado: setsid nohup ferramentas/renderizar_partes.sh KIT nome > render.log 2>&1 < /dev/null &
KIT="$1"; NOME="$2"; PARTE="${3:-30}"; AUDIO="$4"; P="$KIT/meus-videos/$NOME"
cd "$KIT" && node tools/construir.mjs "$NOME" --sem-check || exit 1
cd "$P"; TOTAL=$(python3 -c "import json;print(json.load(open('ui.json'))['duracao'])")
CORTES=$(python3 -c "t=$TOTAL;p=$PARTE;c=[0];x=0
while x+p<t-5: x+=p; c.append(round(x,2))
c.append(t);print(' '.join(map(str,c)))"); read -ra C <<< "$CORTES"; N=$((${#C[@]}-1))
for ((i=0;i<N;i++)); do s=${C[$i]}; e=${C[$((i+1))]}; out="parte_$i.mp4"; [ -s "$out" ] && { echo "parte $i já existe"; continue; }
  echo "$(date +%H:%M:%S) parte $((i+1))/$N ($s a $e s)"
  # a entrada aberta (sleep) impede o render de se cancelar quando roda desanexado
  npx --yes hyperframes@0.9.16 render --start "$s" --end "$e" --output "$out" --quality high --quiet < <(sleep 999999) > "render_parte_$i.log" 2>&1 || { echo "parte $i FALHOU"; tail -20 "render_parte_$i.log"; exit 1; }
  pkill -f "sleep 999999" 2>/dev/null; echo "$(date +%H:%M:%S) parte $((i+1)) pronta"
done
for ((i=0;i<N;i++)); do echo "file 'parte_$i.mp4'"; done > partes.txt
ffmpeg -nostdin -y -v error -f concat -safe 0 -i partes.txt -c:v copy -an _video.mp4 || exit 1
A="${AUDIO:-assets/audio/voz.wav}"
ffmpeg -nostdin -y -v error -i _video.mp4 -i "$A" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 -c:a aac -b:a 192k "$NOME.mp4" || exit 1
echo "$(date +%H:%M:%S) FINALIZADO $P/$NOME.mp4"
