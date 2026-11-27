// Cortes secos de câmera dentro de uma mesma cena do kit (para trocar de imagem a cada 2-3,5 s
// sem precisar montar um cenário novo). Copie para src/ do projeto e importe nas cenas.
//
// Uso no update de uma cena:
//   import { cameraCortes } from './cortes.js';
//   const P = [ // [fim_em_u, posição inicial, posição final, alvo inicial, alvo final, (fov opcional)]
//     [2.6, [0, 1.6, 5], [0, 1.6, 4.4], [0, 1.4, 0], [0, 1.4, 0]],          // geral, empurrando
//     [5.1, [1.2, 1.5, 2], [1.0, 1.5, 1.8], [.3, 1.5, 0], [.3, 1.5, 0], 30], // close do rosto (corte seco)
//     [8.0, [-2, 3, 7], [-1, 2.6, 7.5], [0, 1, 0], [0, 1, 0]],               // plano aberto
//   ];
//   const pl = cameraCortes(s.camera, u, P);   // pl.i = índice do plano atual, pl.k = progresso 0..1
//   return { focus: pl.dist, ... }              // foco na distância câmera-alvo
import { aim, lerp, clamp } from './motor/core.js';
const eio = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
export function cameraCortes(cam, u, planos) {
  let i = planos.findIndex((p) => u < p[0]); if (i < 0) i = planos.length - 1;
  const ini = i ? planos[i - 1][0] : 0, [fim, p0, p1, a0, a1, fov] = planos[i];
  const k = eio((u - ini) / Math.max(.01, fim - ini));
  const pos = p0.map((v, j) => lerp(v, p1[j], k)), alvo = a0.map((v, j) => lerp(v, a1[j], k));
  if (cam.userData.fov0 === undefined) cam.userData.fov0 = cam.fov;
  const alvoFov = fov || cam.userData.fov0;
  if (cam.fov !== alvoFov) { cam.fov = alvoFov; cam.updateProjectionMatrix(); }
  aim(cam, pos, alvo, 0);
  const dist = Math.hypot(pos[0] - alvo[0], pos[1] - alvo[1], pos[2] - alvo[2]);
  return { i, k, dist };
}
