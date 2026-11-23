// A escada: motor low-poly (estilo PS1/N64 da skill /low-poly).
// Render interno 360x640 mostrado 3x com nearest-neighbour; vertices "tremidos" e dithering de 15 bits em todo material.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
export { THREE };

export const RW = 360, RH = 640;
let seed = 1925;
export const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export const lerp = (a, b, k) => a + (b - a) * k;
export const V = (x, y, z) => new THREE.Vector3(x, y, z);

export const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: false, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(RW, RH, false);
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(52, RW / RH, 0.05, 600);

// ------------------------------------------------------------ shader PS1 + gradacao de cor global
export const U = { uCool: { value: 0 }, uSketch: { value: 0 }, uDark: { value: 0 } };
const SNX = (RW / 2).toFixed(1), SNY = (RH / 2).toFixed(1);
function ps1(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uCool = U.uCool; sh.uniforms.uSketch = U.uSketch; sh.uniforms.uDark = U.uDark;
    sh.vertexShader = sh.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
      if (gl_Position.w > 0.0) { vec2 sn = vec2(${SNX}, ${SNY});
        gl_Position.xy = floor(gl_Position.xy / gl_Position.w * sn + 0.5) / sn * gl_Position.w; }`);
    sh.fragmentShader = 'uniform float uCool;\nuniform float uSketch;\nuniform float uDark;\n' + sh.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
      { vec3 c = gl_FragColor.rgb;
        float l = dot(c, vec3(.299, .587, .114));
        c = mix(c, vec3(l * .74, l * .88, l * 1.16), uCool);
        vec3 g = mix(vec3(.34, .2, .07), vec3(1.0, .93, .7), smoothstep(.04, .85, l));
        float hatch = step(mod(gl_FragCoord.x - gl_FragCoord.y, 5.0), 1.0) * step(l, .42);
        g *= 1.0 - .25 * hatch;
        c = mix(c, g, uSketch);
        c *= 1.0 - uDark;
        const float BY[16] = float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
        ivec2 q = ivec2(mod(gl_FragCoord.xy, 4.0));
        float th = (BY[q.x + q.y * 4] + 0.5) / 16.0 - 0.5;
        gl_FragColor.rgb = clamp(floor(c * 31.0 + th + 0.5) / 31.0, 0.0, 1.0); }`);
  };
  m.customProgramCacheKey = () => 'ps1';
  return m;
}
export const lam = (o) => ps1(new THREE.MeshLambertMaterial(Object.assign({ flatShading: true }, o)));
export const basic = (o) => ps1(new THREE.MeshBasicMaterial(o));

// ------------------------------------------------------------ texturas de pixel desenhadas em codigo
export function tex(w, h, draw) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const g = cv.getContext('2d'); g.imageSmoothingEnabled = false; draw(g, w, h);
  const t = new THREE.CanvasTexture(cv);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const rgbOf = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255];
export const col = (h, k = 1) => { const [r, g, b] = rgbOf(h); return `rgb(${clamp(r * k, 0, 255) | 0},${clamp(g * k, 0, 255) | 0},${clamp(b * k, 0, 255) | 0})`; };
export const px = (g, x, y, c, w = 1, h = 1) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
const noise = (g, x0, y0, w, h, base, j) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) px(g, x, y, col(base, 1 + (rnd() * 2 - 1) * j)); };
function uvs(geo, sx, sy) { const a = geo.attributes.uv; for (let i = 0; i < a.count; i++) a.setXY(i, a.getX(i) * sx, a.getY(i) * sy); return geo; }

// fonte bitmap 5x7 (da skill) + acentos do portugues
const GL = {
  'A': ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'], 'B': ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  'C': ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'], 'D': ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  'E': ['#####', '#....', '#....', '####.', '#....', '#....', '#####'], 'F': ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  'G': ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'], 'H': ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  'I': ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'], 'J': ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  'K': ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'], 'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  'M': ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'], 'N': ['#...#', '#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#'],
  'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], 'P': ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  'Q': ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'], 'R': ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  'S': ['.###.', '#...#', '#....', '.###.', '....#', '#...#', '.###.'], 'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  'U': ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], 'V': ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  'W': ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'], 'X': ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'], 'Z': ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'], '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'], '3': ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'], '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  '6': ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'], '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'], '9': ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
  '-': ['.....', '.....', '.....', '.###.', '.....', '.....', '.....'], '.': ['.....', '.....', '.....', '.....', '.....', '.....', '..#..'],
  ':': ['.....', '..#..', '.....', '.....', '.....', '..#..', '.....'], '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
};
const ACC = { 'Á': ['A', 'a'], 'Ã': ['A', 't'], 'Â': ['A', 'c'], 'Ç': ['C', 'd'], 'É': ['E', 'a'], 'Ê': ['E', 'c'], 'Í': ['I', 'a'], 'Ó': ['O', 'a'], 'Õ': ['O', 't'], 'Ú': ['U', 'a'] };
const MARK = { a: [[3, -2], [2, -1]], t: [[1, -1], [2, -2], [3, -1], [4, -2]], c: [[1, -1], [2, -2], [3, -1]], d: [[2, 7], [3, 8]] };
export function bitText(g, str, x, y, s, c) {
  for (let ch of str.toUpperCase()) {
    if (ch === '–') ch = '-';
    let gl = GL[ch], mk = null;
    if (ACC[ch]) { gl = GL[ACC[ch][0]]; mk = MARK[ACC[ch][1]]; }
    if (gl) gl.forEach((row, j) => { for (let i = 0; i < 5; i++) if (row[i] === '#') px(g, x + i * s, y + j * s, c, s, s); });
    if (mk) for (const [i, j] of mk) px(g, x + i * s, y + j * s, c, s, s);
    x += 6 * s;
  }
}
export const textW = (str, s) => str.length * 6 * s - s;

export const T = {};
T.brick = tex(32, 32, (g) => {
  noise(g, 0, 0, 32, 32, 0xa4543a, .1);
  for (let y = 0; y < 32; y += 4) { px(g, 0, y, col(0x8a7f70), 32, 1); for (let x = (y / 4 % 2) * 4; x < 32; x += 8) px(g, x, y, col(0x8a7f70), 1, 4); }
  for (let k = 0; k < 20; k++) px(g, rnd() * 32 | 0, rnd() * 32 | 0, col(0x7a3a26));
});
T.plaster = (base) => tex(32, 32, (g) => {
  noise(g, 0, 0, 32, 32, base, .05);
  for (let k = 0; k < 5; k++) { const x = rnd() * 28 | 0, y = rnd() * 28 | 0, w = 2 + rnd() * 5 | 0, h = 2 + rnd() * 4 | 0; noise(g, x, y, w, h, 0xa4543a, .1); }   // pintura descascada mostrando tijolo
  for (let x = 0; x < 32; x++) if (rnd() < .5) px(g, x, 31 - (rnd() * 4 | 0), col(base, .7), 1, 4);
});
T.slab = tex(16, 16, (g) => { noise(g, 0, 0, 16, 16, 0x8f8a80, .08); });
T.ground = tex(32, 32, (g) => { noise(g, 0, 0, 32, 32, 0x6a5a48, .12); for (let k = 0; k < 30; k++) px(g, rnd() * 32 | 0, rnd() * 32 | 0, col(0x857563)); });
T.wood = tex(32, 32, (g) => {
  for (let y = 0; y < 32; y++) { const b = [0x8a5a34, 0x7a4e2c, 0x956238, 0x815330][(y / 8) | 0]; for (let x = 0; x < 32; x++) px(g, x, y, col(b, .9 + rnd() * .14 + .05 * Math.sin(x * .6 + y))); }
  for (let y = 7; y < 32; y += 8) for (let x = 0; x < 32; x++) px(g, x, y, col(0x4a2e18));
  for (let k = 0; k < 4; k++) px(g, rnd() * 30 | 0, rnd() * 30 | 0, col(0x4f3019), 2, 1);
});
T.oldwood = tex(16, 16, (g) => { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(g, x, y, col(y % 8 === 7 ? 0x3e2a1a : 0x7c5b3e, .85 + rnd() * .2 + .06 * Math.sin(x * .9))); });
T.rail = tex(16, 4, (g) => { noise(g, 0, 0, 16, 4, 0x3d8a4e, .08); for (let k = 0; k < 7; k++) px(g, rnd() * 16 | 0, rnd() * 4 | 0, col(0x8a6a48), 1 + (rnd() * 2 | 0), 1); });
T.parquet = tex(32, 32, (g) => {
  for (let by = 0; by < 4; by++) for (let bx = 0; bx < 4; bx++) {
    const v = (bx + by) % 2; for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const k = v ? i : j; px(g, bx * 8 + i, by * 8 + j, col(k % 2 ? 0x9a6a3a : 0xb07c46, .92 + rnd() * .12)); }
  }
});
T.tiles = tex(16, 16, (g) => { noise(g, 0, 0, 16, 16, 0xe8efe8, .03); for (let i = 0; i < 16; i++) { px(g, i, 0, col(0xa8b4ac)); px(g, 0, i, col(0xa8b4ac)); px(g, i, 8, col(0xa8b4ac)); px(g, 8, i, col(0xa8b4ac)); } px(g, 3, 3, col(0x5a8ab0), 2, 2); px(g, 11, 11, col(0x5a8ab0), 2, 2); });
T.concrete = tex(32, 32, (g) => { noise(g, 0, 0, 32, 32, 0x8c8a86, .06); for (let i = 0; i < 32; i++) { px(g, i, 0, col(0x6c6a66)); px(g, 0, i, col(0x6c6a66)); } });
T.fur = tex(8, 8, (g) => noise(g, 0, 0, 8, 8, 0xffffff, .06));
T.plaid = tex(16, 16, (g) => {
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const a = (x % 8 < 2), b = (y % 8 < 2); px(g, x, y, col(a && b ? 0x13284a : a || b ? 0x24467a : 0x3b67a8, .95 + rnd() * .08)); }
  for (let i = 0; i < 16; i++) { px(g, i, 5, col(0xa8c0e0, .9)); px(g, 5, i, col(0xa8c0e0, .9)); }
});
T.torsoNam = tex(16, 16, (g) => { g.drawImage(T.plaid.image, 0, 0); noise(g, 5, 0, 6, 16, 0xc99a2e, .06); px(g, 6, 0, col(0xa87c20), 4, 1); });
T.jeans = tex(8, 8, (g) => noise(g, 0, 0, 8, 8, 0x3c5a86, .07));
T.keys = tex(32, 8, (g) => {
  px(g, 0, 0, col(0x2a2a2c), 32, 8); noise(g, 1, 2, 30, 6, 0xf0ece0, .02);
  for (let x = 1; x < 31; x += 2) px(g, x, 2, col(0x9a968c), 1, 6);
  for (const x of [3, 5, 9, 11, 13, 17, 19, 23, 25, 27]) px(g, x, 2, col(0x161616), 1, 3);
  px(g, 14, 3, col(0xd8c890), 3, 4);                                   // tecla remendada com fita
  px(g, 2, 0, col(0x4cc06a)); px(g, 4, 0, col(0xd04040));
});
T.pianoKeys = tex(64, 8, (g) => { noise(g, 0, 0, 64, 8, 0xf2eee2, .02); for (let x = 0; x < 64; x += 2) px(g, x, 0, col(0x9a968c), 1, 8); for (let x = 1; x < 64; x++) if ([1, 3, 6, 8, 10].includes(Math.floor(x / 2) % 7 === 0 ? 99 : (x % 14))) px(g, x, 0, col(0x161616), 1, 5); });

// ------------------------------------------------------------ ceus
function skyTex(stops, stars = 0, W = 1024, H = 512) {
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d'); const im = g.createImageData(W, H); const d = im.data;
  for (let y = 0; y < H; y++) {
    const f = y / (H - 1) * (stops.length - 1), i = clamp(Math.floor(f), 0, stops.length - 2), k = f - i;
    const [r1, g1, b1] = rgbOf(stops[i]), [r2, g2, b2] = rgbOf(stops[i + 1]);
    const r = lerp(r1, r2, k), gg = lerp(g1, g2, k), b = lerp(b1, b2, k);
    for (let x = 0; x < W; x++) { const o = (y * W + x) * 4; d[o] = r; d[o + 1] = gg; d[o + 2] = b; d[o + 3] = 255; }
  }
  for (let n = 0; n < stars; n++) {
    const x = rnd() * W | 0, y = rnd() * H * .48 | 0, o = (y * W + x) * 4, v = rnd() < .15 ? 255 : 150 + rnd() * 90;
    d[o] = v; d[o + 1] = v; d[o + 2] = Math.min(255, v + 20);
  }
  g.putImageData(im, 0, 0);
  const t = new THREE.CanvasTexture(cv); t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const SKY = {
  dusk: skyTex([0x1a1e48, 0x2a3670, 0x4c4c8c, 0x8c6a92, 0xd8846a, 0xf4a868, 0xffcf88, 0xffd890], 120),
  night: skyTex([0x02040e, 0x060a1e, 0x0b1230, 0x141c44, 0x1f2a5a, 0x2c3466, 0x2c3466], 1400),
  cold: skyTex([0x05080f, 0x0e1522, 0x18222f, 0x25303e, 0x34404e, 0x3c4856], 300),
  rain: skyTex([0x0a0e16, 0x141b26, 0x1c2531, 0x27303c, 0x2f3845]),
  day: skyTex([0x3d86d0, 0x5ea2e0, 0x86bfe9, 0xb5d9f0, 0xdcecf2, 0xeaf2f0]),
  black: skyTex([0x000000, 0x000000]),
  paper: skyTex([0xf4e7c8, 0xf4e7c8]),
};
const skyMat = basic({ map: SKY.dusk, side: THREE.BackSide, fog: false, depthWrite: false });
const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 24, 12), skyMat); sky.renderOrder = -1; scene.add(sky);
skyMat.map.wrapS = THREE.ClampToEdgeWrapping;

// ------------------------------------------------------------ luzes e "humor" (paleta)
const hemi = new THREE.HemisphereLight(0xffe2bc, 0x5c3f2c, 1.5); scene.add(hemi);
const key = new THREE.DirectionalLight(0xffc285, 1.3); key.position.set(4, 8, 7); scene.add(key); scene.add(key.target);
const fill = new THREE.DirectionalLight(0xb8c4ff, 0.35); fill.position.set(-6, 3, 5); scene.add(fill);
const PTS = []; for (let i = 0; i < 5; i++) { const p = new THREE.PointLight(0xffffff, 0, 0, 2); scene.add(p); PTS.push(p); }
const spot = new THREE.SpotLight(0xfff0d8, 0, 0, 0.5, 0.6, 1.2); scene.add(spot); scene.add(spot.target);
scene.fog = new THREE.Fog(0x000000, 10, 100);
const MOODS = {
  dusk: { sky: 'dusk', fog: 0x5a4a6e, near: 40, far: 170, hemi: [0xffd8b8, 0x3a3050, 1.25], key: [0xffa860, 1.25, [6, 5, 8]], fill: [0x7080ff, .45], win: 1 },
  night: { sky: 'night', fog: 0x101634, near: 30, far: 150, hemi: [0x8898d0, 0x1a1428, 0.95], key: [0xffd8a0, 0.75, [5, 8, 6]], fill: [0x6070ff, .5], win: 1 },
  warm: { sky: 'night', fog: 0x2a1c30, near: 30, far: 150, hemi: [0xffc890, 0x40283a, 1.35], key: [0xffb060, 1.25, [4, 6, 7]], fill: [0xff9a7a, .35], win: 1 },
  cold: { sky: 'cold', fog: 0x1e2836, near: 18, far: 120, hemi: [0x98a8c8, 0x18202c, 1.05], key: [0xb0c4ff, 0.7, [-5, 8, 4]], fill: [0x5a70a0, .4], win: 1 },
  rain: { sky: 'rain', fog: 0x1c2430, near: 6, far: 55, hemi: [0x8090a8, 0x101820, 0.95], key: [0x9ab0d8, 0.6, [-3, 8, 5]], fill: [0x405070, .3], win: 1 },
  day: { sky: 'day', fog: 0xcfe2ee, near: 50, far: 200, hemi: [0xfff6e8, 0x8a7a60, 1.55], key: [0xfff0d0, 1.45, [6, 10, 7]], fill: [0xa0c0ff, .4], win: 0 },
  room: { sky: 'black', fog: 0x1a120c, near: 9, far: 40, hemi: [0xffe0b8, 0x5a4030, 1.35], key: [0xffd8a0, 1.0, [3, 6, 6]], fill: [0xa0b0ff, .25], win: 0 },
  roomCold: { sky: 'black', fog: 0x0a0e16, near: 7, far: 30, hemi: [0x8a98b8, 0x202634, 0.9], key: [0xa8b8e0, 0.6, [3, 6, 6]], fill: [0x6070a0, .25], win: 0 },
  station: { sky: 'night', fog: 0x0c1020, near: 20, far: 90, hemi: [0xd8e4ff, 0x202430, 1.0], key: [0xf0f4ff, 0.8, [0, 10, 4]], fill: [0x6070a0, .3], win: 1 },
  void: { sky: 'black', fog: 0x000000, near: 3.5, far: 9, hemi: [0x504840, 0x000000, 0.25], key: [0xfff0d8, 0.0, [0, 10, 0]], fill: [0x000000, 0], win: 0 },
  sketch: { sky: 'paper', fog: 0xf4e7c8, near: 8, far: 30, hemi: [0xfff0d0, 0x806040, 1.5], key: [0xffe0a0, 1.1, [3, 6, 6]], fill: [0xffd8a0, .3], win: 0 },
};
let winLit = 1;
export function mood(name, o = {}) {
  const m = Object.assign({}, MOODS[name], o);
  skyMat.map = SKY[m.sky]; skyMat.needsUpdate = false;
  scene.fog.color.setHex(m.fog); scene.fog.near = m.near; scene.fog.far = m.far;
  hemi.color.setHex(m.hemi[0]); hemi.groundColor.setHex(m.hemi[1]); hemi.intensity = m.hemi[2];
  key.color.setHex(m.key[0]); key.intensity = m.key[1];
  fill.color.setHex(m.fill[0]); fill.intensity = m.fill[1];
  winLit = m.win;
  return m;
}
export function keyDir(x, y, z, target) { const t = target || V(0, 0, 0); key.position.set(t.x + x, t.y + y, t.z + z); key.target.position.copy(t); }
export function points(list) { PTS.forEach((p, i) => { const d = list[i]; if (!d) { p.intensity = 0; return; } p.position.copy(d[0]); p.color.setHex(d[1]); p.intensity = d[2]; p.distance = d[3] || 0; p.decay = d[4] ?? 2; }); }
export function spotlight(on, pos, tgt, color = 0xfff0d8, inten = 60, angle = 0.42) { spot.intensity = on ? inten : 0; if (on) { spot.position.copy(pos); spot.target.position.copy(tgt); spot.color.setHex(color); spot.angle = angle; } }

// ------------------------------------------------------------ ajudantes de geometria
export const box = (parent, w, h, d, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); parent.add(m); return m;
};
export const plane = (parent, w, h, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, sx = 1, sy = 1) => {
  const m = new THREE.Mesh(uvs(new THREE.PlaneGeometry(w, h), sx, sy), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); parent.add(m); return m;
};
export const frustum = (parent, wt, wb, h, dz, mat, x, y, z, rx = 0) => {
  const geo = new THREE.CylinderGeometry(wt / Math.SQRT2, wb / Math.SQRT2, h, 4, 1); geo.rotateY(Math.PI / 4); geo.scale(1, 1, dz);
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.x = rx; parent.add(m); return m;
};
const geoBox = (w, h, d, x, y, z, su = 1, sv = 1) => { const g = new THREE.BoxGeometry(w, h, d); uvs(g, su, sv); g.translate(x, y, z); return g; };
function merged(parent, list, mat) { if (!list.length) return null; const m = new THREE.Mesh(mergeGeometries(list), mat); parent.add(m); return m; }
export function group(parent = scene) { const g = new THREE.Group(); parent.add(g); return g; }

// ------------------------------------------------------------ conjuntos (cenarios) com visibilidade por plano
export const SETS = {};
const mkSet = (name, x = 0, y = 0, z = 0) => { const g = group(); g.position.set(x, y, z); g.visible = false; SETS[name] = g; return g; };

// ========================= o bairro =========================
const M = {
  brick: lam({ map: T.brick }), slab: lam({ map: T.slab }), ground: lam({ map: T.ground }), tank: lam({ color: 0x2f74d0 }),
  winDark: basic({ color: 0x1a1612 }), winLit: basic({ color: 0xffd27a }), pole: lam({ color: 0x6a645c }), wire: basic({ color: 0x14120f }),
  wood: lam({ map: T.wood }), oldwood: lam({ map: T.oldwood }), rail: lam({ map: T.rail, color: 0xffffff }), post: lam({ map: T.oldwood, color: 0x9a8a7a }),
  white: lam({ color: 0xf2f0ea }), dark: lam({ color: 0x18141a }), gold: basic({ color: 0xffd65a }), glow: basic({ color: 0xffe9a8 }),
  fluor: basic({ color: 0xe4fff0 }), metal: lam({ color: 0x8a8c90 }), black: basic({ color: 0x000000 }),
};
const PLASTER = [0xd99a9a, 0xe6c46a, 0x9fc4a0, 0xe8e2d4, 0x9ab4d4].map((c) => lam({ map: T.plaster(c) }));
export const RISE = 0.25, RUN = 0.32;
export const STAIR0 = V(0, 4.1, 1.0);
const stairY = (z) => STAIR0.y + (STAIR0.z - z) / RUN * RISE;
{
  const S = mkSet('bairro');
  plane(S, 260, 260, M.ground, 0, 0, -40, -Math.PI / 2, 0, 60, 60);
  const walls = new Map(), slabs = [], tanks = [], wd = [], wl = [], posts = [], wires = [];
  const add = (mat, g) => { if (!walls.has(mat)) walls.set(mat, []); walls.get(mat).push(g); };
  const house = (x, z, w, d, h, base, force) => {
    const H = base + h;
    const mat = force || (rnd() < .68 ? M.brick : PLASTER[rnd() * PLASTER.length | 0]);
    add(mat, geoBox(w, H, d, x, H / 2, z, w / 1.3, H / 1.3));
    slabs.push(geoBox(w + .2, .14, d + .2, x, H + .07, z, (w + .2) / 2, (d + .2) / 2));
    if (rnd() < .6) { const tx = x + (rnd() - .5) * (w - 1.1), tz = z + (rnd() - .5) * (d - 1.1); const c = new THREE.CylinderGeometry(.42, .42, .62, 8); c.translate(tx, H + .45, tz); tanks.push(c); }
    const floors = Math.max(1, Math.round(h / 2.6));
    for (let f = 0; f < floors; f++) for (let i = 0; i < (w > 2.8 ? 2 : 1); i++) {
      const wx = x + (w > 2.8 ? (i ? .65 : -.65) : 0), wy = base + 1.4 + f * 2.5;
      if (wy + .4 > H) continue;
      const p = new THREE.PlaneGeometry(.55, .65); p.translate(wx, wy, z + d / 2 + .02);
      (rnd() < .55 ? wl : wd).push(p);
    }
    if (rnd() < .3) {                                                                     // varal com roupas na laje
      const y0 = H + .14;
      posts.push(geoBox(.05, 1.0, .05, x - w / 2 + .3, y0 + .5, z), geoBox(.05, 1.0, .05, x + w / 2 - .3, y0 + .5, z));
      wires.push(geoBox(w - .6, .02, .02, x, y0 + .95, z));
      for (let k = 0; k < 3; k++) { const c = new THREE.PlaneGeometry(.35, .45); c.translate(x - w / 2 + .6 + k * (w - 1.2) / 2, y0 + .7, z); (CLOTH[k % 4]).push(c); }
    }
  };
  const CLOTH = [[], [], [], []];
  const CLOTHM = [0xd84a4a, 0xf0d040, 0x4a8ad8, 0xf2f2f2].map((c) => lam({ color: c, side: THREE.DoubleSide }));
  // casas-base das escadas (Namiques, Livia, Jeferson)
  house(0, 1.0, 2.2, 3.2, 4.1, 0, M.brick); house(2.4, 1.0, 2.2, 3.2, 4.1, 0, PLASTER[0]); house(-2.5, 1.0, 2.3, 3.2, 4.1, 0, PLASTER[1]);
  for (let r = 0; r < 18; r++) {
    const z = 6.2 - r * 4.0, base = z < -4 ? (-z - 4) * .2 : 0;
    for (let c = 0; c < 22; c++) {
      const x = -36 + c * 3.4 + (rnd() - .5) * .6;
      const w = 2.5 + rnd() * .7, d = 3.0 + rnd() * .5;
      let h = 2.6 + (rnd() < .45 ? 2.5 : 0) + rnd() * 1.2;
      if (r === 1 && x > -4.5 && x < 4.5) continue;
      if (x > -2.2 - w / 2 && x < 10 + w / 2 && z < 1) {                                      // corredor das escadas: casas baixas
        const lim = stairY(z + d / 2) - base - 1.6; if (lim < 2.2) continue; h = Math.min(h, lim);
      }
      if (r === 0 && x > -12 && x < -4) continue;                                               // espaco da escola (anos depois)
      house(x, z, w, d, h, base);
    }
    // postes e fios embolados na rua entre as fileiras
    const zs = z + 2.0;
    for (let x = -34; x < 36; x += 7.5) {
      const ph = 6.5 + base;
      posts.push(geoBox(.14, ph, .14, x, ph / 2, zs), geoBox(1.2, .08, .08, x, ph - .4, zs));
      for (let k = 0; k < 3; k++) { const sag = .25 + k * .12; wires.push(geoBox(7.5, .025, .025, x + 3.75, ph - .4 - sag + k * .05, zs + (k - 1) * .25)); }
    }
  }
  for (const [mat, list] of walls) merged(S, list, mat);
  merged(S, slabs, M.slab); merged(S, tanks, M.tank); merged(S, wd, M.winDark);
  SETS.winLit = merged(S, wl, M.winLit); merged(S, posts, M.pole); merged(S, wires, M.wire);
  CLOTH.forEach((l, i) => merged(S, l, CLOTHM[i]));
  // bar de esquina com luz fluorescente
  box(S, .9, .06, .06, M.fluor, -14.2, 2.35, 8.0);
  // pipas no ceu
  SETS.kites = [];
  const KC = [0xe83a3a, 0xf6d23a, 0x3a8ae8, 0x3ad06a, 0xf07ad0];
  for (let i = 0; i < 9; i++) {
    const k = new THREE.Mesh(new THREE.PlaneGeometry(.9, .9), basic({ color: KC[i % 5], side: THREE.DoubleSide }));
    k.rotation.z = Math.PI / 4; k.position.set(-30 + i * 7 + rnd() * 3, 14 + rnd() * 10, -10 - rnd() * 30); S.add(k);
    const tail = box(S, .03, 2.2, .03, M.wire, k.position.x, k.position.y - 1.4, k.position.z);
    SETS.kites.push({ k, tail, ph: rnd() * 6 });
  }
}

// ========================= escadas =========================
export const STAIRS = [];
const NSTEP = 132;
function makeStair(base, width, railSide = 1) {
  const g = group(); g.position.copy(base);
  const mk = (geo, mat, n) => { const m = new THREE.InstancedMesh(geo, mat, n); m.frustumCulled = false; g.add(m); return m; };
  const boards = mk(uvs(new THREE.BoxGeometry(width, .08, .36), width / 1.2, .3), M.wood, NSTEP);
  const posts = mk(new THREE.BoxGeometry(.05, .92, .05), M.post, NSTEP);
  const L = 3 * Math.hypot(RISE, RUN);
  const railGeo = uvs(new THREE.BoxGeometry(.07, .07, L + .06), 1, 1);
  const rails = mk(railGeo, M.rail, NSTEP);
  const st = { g, width, boards, posts, rails, n: NSTEP, railSide, dust: 0 };
  STAIRS.push(st);
  return st;
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _e = new THREE.Euler();
export function stairBuild(st, n) {                                             // n degraus visiveis (fracao = degrau surgindo)
  const full = Math.floor(n), fr = n - full, cnt = Math.min(NSTEP, Math.ceil(n));
  const ang = Math.atan2(RISE, RUN);
  let pc = 0, rc = 0;
  for (let k = 0; k < cnt; k++) {
    const sc = k < full ? 1 : clamp(fr, .001, 1);
    _p.set(0, k * RISE + (1 - sc) * -.15, -k * RUN); _s.set(sc, sc, sc); _q.identity();
    st.boards.setMatrixAt(k, _m.compose(_p, _q, _s));
    if (k % 3 === 0 && k < full) {
      _p.set(st.railSide * (st.width / 2 - .04), k * RISE + .5, -k * RUN); _s.set(1, 1, 1);
      st.posts.setMatrixAt(pc++, _m.compose(_p, _q, _s));
      if (k + 3 <= full) {
        _p.set(st.railSide * (st.width / 2 - .04), k * RISE + .95 + 1.5 * RISE, -k * RUN - 1.5 * RUN);
        _q.setFromEuler(_e.set(ang, 0, 0)); st.rails.setMatrixAt(rc++, _m.compose(_p, _q, _s)); _q.identity();
      }
    }
  }
  st.boards.count = cnt; st.posts.count = pc; st.rails.count = rc;
  st.boards.instanceMatrix.needsUpdate = st.posts.instanceMatrix.needsUpdate = st.rails.instanceMatrix.needsUpdate = true;
  st.n = n;
}
export const stairA = makeStair(V(0, 4.1, 1.0), 1.1, -1);       // Namiques
export const stairB = makeStair(V(2.4, 4.1, 1.0), .72, 1);    // Livia (degrau pequeno demais)
export const stairC = makeStair(V(-2.5, 4.1, 1.0), 1.0, -1);   // Jeferson
export function stepPos(st, k) { st.g.updateMatrixWorld(); return st.g.localToWorld(V(0, k * RISE + .04, -k * RUN)); }
export function stepWorldX(st) { return st.g.position.x; }

// poeira dourada (degraus que surgem)
const DUST = [];
{
  const gm = basic({ color: 0xffd860, transparent: true, opacity: .95, depthWrite: false });
  for (let i = 0; i < 60; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(.045, .045), gm); m.visible = false; scene.add(m); DUST.push({ m, a: rnd(), b: rnd(), c: rnd(), ph: rnd() }); }
}
export function dust(st, k, t, amt = 1, spread = 1) {          // particulas em volta do degrau k
  const p = stepPos(st, k);
  const n = Math.floor(DUST.length * amt);
  for (let i = 0; i < DUST.length; i++) {
    const d = DUST[i]; if (i >= n) continue;
    const life = ((t * (.35 + d.c * .3) + d.ph) % 1);
    d.m.visible = true;
    d.m.position.set(p.x + (d.a - .5) * st.width * 1.2 * spread, p.y - .05 + life * 1.1, p.z + (d.b - .5) * .6 * spread + .1);
    d.m.quaternion.copy(camera.quaternion);
    const s = 1 - life * .7; d.m.scale.set(s, s, s);
  }
}

// ========================= nuvens e a escola-sonho =========================
{
  const S = mkSet('clouds');
  const cm = lam({ color: 0xfff6f2, emissive: 0x7a6478 });
  const list = [];
  for (let i = 0; i < 60; i++) {
    const cx = -50 + rnd() * 100, cy = 24 + rnd() * 18, cz = -14 - rnd() * 60, n = 3 + (rnd() * 3 | 0);
    if (Math.abs(cx) < 16 && cz < -22 && cy > 27) continue;
    for (let j = 0; j < n; j++) {
      const r = 1.6 + rnd() * 2.2; const ge = new THREE.IcosahedronGeometry(r, 0);
      ge.scale(1.5, .55, 1.1); ge.rotateY(rnd() * 3); ge.translate(cx + (j - n / 2) * r * 1.2, cy + rnd() * .6, cz + (rnd() - .5) * 2); list.push(ge);
    }
  }
  SETS.cloudMesh = merged(S, list, cm); SETS.cloudMat = cm;
}
T.schoolSign = tex(128, 24, (g) => {
  noise(g, 0, 0, 128, 24, 0xf6efe0, .02); px(g, 0, 0, col(0x2a5a8a), 128, 2); px(g, 0, 22, col(0x2a5a8a), 128, 2);
  const a = 'ESCOLA DE MÚSICA', b = 'DEGRAU';
  bitText(g, a, (128 - textW(a, 1)) / 2 | 0, 4, 1, col(0x1a3a6a));
  bitText(g, b, (128 - textW(b, 2)) / 2 | 0, 12, 1, col(0xc0392b));
  px(g, 8, 13, col(0xe0a020), 6, 6); px(g, 114, 13, col(0xe0a020), 6, 6);
});
T.bluewall = tex(32, 32, (g) => { noise(g, 0, 0, 32, 32, 0x9cc8e8, .04); for (let k = 0; k < 8; k++) px(g, rnd() * 32 | 0, rnd() * 32 | 0, col(0x86b4d8), 2, 1); });
export function makeSchool(parent, x, y, z, s = 1) {
  const g = group(parent); g.position.set(x, y, z); g.scale.setScalar(s);
  const wall = lam({ map: T.bluewall }), roof = lam({ color: 0xc8643c }), trim = lam({ color: 0xf4f0e8 }), door = lam({ map: T.wood, color: 0xb08868 });
  box(g, 3.4, 2.5, 2.8, wall, 0, 1.25, 0);
  const rg = new THREE.CylinderGeometry(2.0, 2.0, 3.8, 3, 1); rg.rotateY(Math.PI / 2); rg.rotateZ(Math.PI / 2); rg.scale(1, .55, 1);
  const rf = new THREE.Mesh(rg, roof); rf.position.set(0, 3.05, 0); g.add(rf);
  box(g, .8, 1.5, .08, door, 0, .75, 1.42);
  plane(g, 2.6, .5, lam({ map: T.schoolSign }), 0, 2.0, 1.43);
  const winM = basic({ color: 0x2a3a50 });
  const wins = [box(g, .7, .7, .06, winM, -1.15, 1.1, 1.42), box(g, .7, .7, .06, winM, 1.15, 1.1, 1.42)];
  for (const w of wins) { box(g, .78, .06, .08, trim, w.position.x, 1.47, 1.43); box(g, .78, .06, .08, trim, w.position.x, .73, 1.43); }
  box(g, 3.6, .14, 3.0, trim, 0, .07, 0);
  return { g, wins, setLit(n) { wins.forEach((w, i) => { w.material = i < n ? M.winLit : winM; }); } };
}
const topK = NSTEP - 1;
{
  const S = mkSet('dream');
  const p = stepPos(stairA, topK);
  SETS.dreamSchool = makeSchool(S, p.x, p.y - .1, p.z - 2.2, 1);
  const cm = SETS.cloudMat;
  const ge = []; for (let i = 0; i < 9; i++) { const g2 = new THREE.IcosahedronGeometry(1.6 + rnd(), 0); g2.scale(1.6, .5, 1.3); g2.translate(p.x + (rnd() - .5) * 7, p.y - .8 - rnd() * .5, p.z - 2 + (rnd() - .5) * 6); ge.push(g2); }
  merged(S, ge, cm);
  const glowT = tex(32, 32, (g) => { for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const d = Math.hypot(x - 15.5, y - 15.5) / 16; const a = clamp(1 - d, 0, 1) ** 2 * .7; g.fillStyle = `rgba(255,214,120,${a})`; g.fillRect(x, y, 1, 1); } });
  SETS.dreamGlow = plane(S, 14, 14, basic({ map: glowT, transparent: true, depthWrite: false, fog: false }), p.x, p.y + 1.4, p.z - 3.8);
}

// ========================= personagens =========================
const FACES = new Map();
function faceTex(o, ex) {
  const k = o.id + ':' + ex;
  if (FACES.has(k)) return FACES.get(k);
  const t = tex(16, 16, (g) => {
    noise(g, 0, 0, 16, 16, o.skin, .03);
    const dk = col(0x140c08), lip = col(o.lip || 0x5a2a20), sk = (k2) => col(o.skin, k2);
    if (o.stubble) for (let i = 0; i < 12; i++) px(g, 2 + rnd() * 12 | 0, 11 + rnd() * 5 | 0, col(o.skin, .8));
    if (o.beard) { for (let y = 10; y < 16; y++) for (let x = 1; x < 15; x++) if (!(y === 10 && (x < 3 || x > 12))) px(g, x, y, col(0x2a1a12, .9 + rnd() * .2)); }
    // sobrancelhas grossas
    const sad = ex === 'sad' || ex === 'sadopen';
    if (sad) { px(g, 3, 5, dk, 3, 1); px(g, 5, 4, dk, 2, 1); px(g, 10, 5, dk, 3, 1); px(g, 9, 4, dk, 2, 1); }
    else if (ex === 'surprise') { px(g, 3, 3, dk, 4, 1); px(g, 9, 3, dk, 4, 1); }
    else { px(g, 3, o.thickBrow ? 4 : 5, dk, 4, o.thickBrow ? 2 : 1); px(g, 9, o.thickBrow ? 4 : 5, dk, 4, o.thickBrow ? 2 : 1); }
    // olhos
    if (ex === 'closed' || ex === 'laugh') { px(g, 4, 8, dk, 3, 1); px(g, 9, 8, dk, 3, 1); }
    else { px(g, 4, 7, dk, 2, 2); px(g, 10, 7, dk, 2, 2); px(g, 4, 7, col(0xf8f4ee)); px(g, 10, 7, col(0xf8f4ee)); }
    if (o.glasses) { const gc = col(0x1a1a1a); for (const x0 of [3, 8]) { px(g, x0, 6, gc, 5, 1); px(g, x0, 9, gc, 5, 1); px(g, x0, 6, gc, 1, 4); px(g, x0 + 4, 6, gc, 1, 4); } px(g, 8, 7, gc, 0, 0); }
    // nariz
    px(g, 7, 9, sk(.78), 2, 2); px(g, 6, 10, sk(.85), 4, 1);
    // boca
    if (ex === 'open' || ex === 'sadopen') { px(g, 6, 12, dk, 4, 2); px(g, 7, 13, col(0x8a3030), 2, 1); }
    else if (ex === 'laugh') { px(g, 5, 12, dk, 6, 2); px(g, 6, 12, col(0xf4f0ea), 4, 1); }
    else if (ex === 'smile') { px(g, 6, 13, lip, 4, 1); px(g, 5, 12, lip); px(g, 10, 12, lip); if (o.dimple) px(g, 3, 12, sk(.78)); }
    else if (ex === 'half') { px(g, 6, 13, lip, 4, 1); px(g, 10, 12, lip); }
    else if (ex === 'sad') { px(g, 6, 12, lip, 4, 1); px(g, 5, 13, lip); px(g, 10, 13, lip); }
    else if (ex === 'surprise') { px(g, 7, 12, dk, 2, 2); }
    else px(g, 6, 13, lip, 4, 1);
  });
  FACES.set(k, t);
  return t;
}
export const CH = {};
let chId = 0;
export function human(o) {
  o = Object.assign({ skin: 0x8a5a3c, shirt: 0xc99a2e, sleeve: null, pants: 0x3c5a86, shoe: 0xe8e4da, hair: 0x1a1210, scale: 1, id: 'h' + (chId++) }, o);
  const root = group(); root.visible = false; root.scale.setScalar(o.scale);
  const mat = (c, m) => (typeof c === 'object' && c.isMaterial) ? c : lam(Object.assign({ color: c }, m || {}));
  const skin = mat(o.skin), shirt = o.torsoMat || mat(o.shirt), sleeve = o.sleeveMat || mat(o.sleeve ?? o.shirt), pants = o.pantsMat || mat(o.pants), shoe = mat(o.shoe);
  const foreM = o.foreSkin ? skin : sleeve;
  const hips = group(root); hips.position.y = .95;
  box(hips, .34, .2, .21, o.pelvisMat || pants, 0, 0, 0);
  const legs = [];
  for (const s of [1, -1]) {
    const L = group(hips); L.position.set(s * .095, -.04, 0);
    box(L, .14, .46, .15, o.thighMat || pants, 0, -.23, 0);
    const knee = group(L); knee.position.y = -.46;
    box(knee, .125, .44, .135, o.shinMat || pants, 0, -.22, 0);
    const foot = box(knee, .13, .08, .26, shoe, 0, -.44, .05);
    legs.push({ L, knee, foot });
  }
  const spine = group(hips); spine.position.y = .08;
  const torso = box(spine, .4, .52, .22, o.torsoMats || shirt, 0, .27, 0);
  const neck = group(spine); neck.position.y = .53;
  box(neck, .1, .09, .1, skin, 0, .03, 0);
  const head = group(neck); head.position.y = .07;
  const faceMat = lam({ map: faceTex(o, 'neutral') });
  const hairM = mat(o.hair);
  const hm = [skin, skin, hairM, skin, faceMat, o.backHair ? hairM : skin];
  const headMesh = box(head, .25, .29, .26, hm, 0, .15, 0);
  const arms = [];
  for (const s of [1, -1]) {
    const A = group(spine); A.position.set(s * .255, .5, 0); A.rotation.order = 'YXZ';
    box(A, .11, .3, .12, sleeve, 0, -.15, 0);
    const el = group(A); el.position.y = -.3;
    box(el, .1, .27, .105, foreM, 0, -.135, 0);
    const hand = box(el, .085, .1, .09, skin, 0, -.32, 0);
    arms.push({ A, el, hand });
  }
  const c = { o, root, hips, spine, torso, neck, head, headMesh, faceMat, legs, arms, skin, hairM, props: {}, ex: 'neutral' };
  c.face = (ex) => { if (c.ex !== ex) { c.ex = ex; faceMat.map = faceTex(o, ex); } };
  c.pose = (p) => setPose(c, p);
  return c;
}
function setPose(c, p) {
  c.root.visible = true;
  c.root.position.set(p.x || 0, p.y || 0, p.z || 0);
  c.root.rotation.set(p.rx || 0, p.ry || 0, p.rz || 0);
  c.hips.position.y = .95 + (p.hy || 0);
  c.hips.rotation.set(p.hipx || 0, 0, 0);
  c.spine.rotation.set(p.lean || 0, p.twist || 0, p.side || 0);
  c.neck.rotation.set(p.hx || 0, p.hyw || 0, p.hz || 0);
  const [L, R] = c.arms;
  L.A.rotation.set(p.lax || 0, p.lay || 0, .07 + (p.laz || 0)); L.el.rotation.set(p.lae || 0, 0, p.laez || 0);
  R.A.rotation.set(p.rax || 0, p.ray || 0, -.07 - (p.raz || 0)); R.el.rotation.set(p.rae || 0, 0, -(p.raez || 0));
  const [LL, RL] = c.legs;
  LL.L.rotation.set(p.llx || 0, 0, p.llz || 0); LL.knee.rotation.x = p.llk || 0; LL.foot.rotation.x = p.lf || 0;
  RL.L.rotation.set(p.rlx || 0, 0, -(p.rlz || 0)); RL.knee.rotation.x = p.rlk || 0; RL.foot.rotation.x = p.rf || 0;
  c.face(p.ex || 'neutral');
}
export function hideAllChars() { for (const k in CH) CH[k].root.visible = false; for (const c of KIDS.concat(ADULTS)) c.root.visible = false; }

// poses
export const P = {
  stand: (t = 0) => ({ hy: .004 * Math.sin(t * 2.4), laz: .02, raz: .02, lae: -.12, rae: -.12 }),
  walk: (ph, a = 1) => { const s = Math.sin(ph), c = Math.cos(ph); return { llx: -.5 * s * a, rlx: .5 * s * a, llk: .55 * Math.max(0, c) * a + .05, rlk: .55 * Math.max(0, -c) * a + .05, lax: .38 * s * a, rax: -.38 * s * a, lae: -.3, rae: -.3, hy: -.03 * Math.abs(c) * a }; },
  climb: (ph) => { const s = Math.sin(ph), s2 = Math.sin(ph + Math.PI); return { llx: -.25 - .55 * Math.max(0, s), llk: .15 + .95 * Math.max(0, s), rlx: -.25 - .55 * Math.max(0, s2), rlk: .15 + .95 * Math.max(0, s2), lax: .35 * s, rax: -.35 * s, lae: -.4, rae: -.4, lean: .18, hy: -.06 + .03 * Math.abs(Math.cos(ph)) }; },
  sit: () => ({ hy: -.82, llx: -1.42, rlx: -1.42, llk: 1.3, rlk: 1.3, lae: -.3, rae: -.3, lax: -.25, rax: -.25 }),
  sitChair: () => ({ hy: -.5, llx: -1.5, rlx: -1.5, llk: 1.5, rlk: 1.5, lax: -.4, rax: -.4, lae: -.9, rae: -.9 }),
  keyboard: (t) => ({ hy: -.82, llx: -1.42, rlx: -1.42, llk: 1.3, rlk: 1.3, lax: -.75, rax: -.75, lae: -.75 + .08 * Math.sin(t * 9), rae: -.75 + .08 * Math.sin(t * 11 + 1), laz: -.18, raz: -.18, lean: .25, hx: .3 }),
  arms: (o) => o,
};
export function merge(...ps) { return Object.assign({}, ...ps); }

// --- os personagens do documento
const torsoMats = (front, side) => [side, side, side, side, front, side];
CH.nam = human({
  id: 'nam', skin: 0x8a5a3c, lip: 0x4a2418, stubble: true, thickBrow: true, hair: 0x161010, shoe: 0xd8d2c4,
  torsoMats: torsoMats(lam({ map: T.torsoNam }), lam({ map: T.plaid })), sleeveMat: lam({ map: T.plaid }), pantsMat: lam({ map: T.jeans }),
});
CH.namOld = human({
  id: 'namOld', skin: 0x8a5a3c, lip: 0x4a2418, beard: true, glasses: true, thickBrow: true, hair: 0x1e1814, shirt: 0xd8c8a8, pants: 0x2a2a30, shoe: 0x5a3a24, foreSkin: true,
});
CH.liv = human({
  id: 'liv', skin: 0x4a2a1c, lip: 0x3a1610, dimple: true, hair: 0x120c0a, shirt: 0x1c2a52, pants: 0xe2acb4, foreSkin: true, sleeve: 0x4a2a1c, shoe: 0xf4d4d0, scale: .93,
  pelvisMat: lam({ color: 0x1c2a52 }),
});
CH.livOld = human({
  id: 'livOld', skin: 0x4a2a1c, lip: 0x5a2018, dimple: true, hair: 0x140e0c, shirt: 0xb88a5a, pants: 0x1a1a1e, shoe: 0x2a1e1a, scale: .93, backHair: true,
});
CH.jef = human({ id: 'jef', skin: 0xb07a50, hair: 0x2a1a10, shirt: 0xf2d22a, sleeve: 0xb07a50, foreSkin: true, pants: 0x2a4aa8, shoe: 0x2a2a2a, scale: .95 });
CH.davi = human({ id: 'davi', skin: 0x6e452c, hair: 0x120c08, shirt: 0xf4f4f0, pants: 0x2a3a6a, shoe: 0x3a3a3a, scale: .6 });
{
  const n = CH.nam, h = n.head;
  box(h, .27, .07, .28, n.hairM, 0, .32, -.005);                                     // cabelo crespo curto
  box(h, .27, .14, .05, n.hairM, 0, .23, -.12);
  for (const s of [1, -1]) box(h, .02, .1, .2, n.hairM, s * .128, .25, -.02);
  box(h, .021, .012, .12, lam({ color: 0x8a5a3c }), .13, .27, -.02);                   // risca raspada
  n.props.ribbon = box(n.arms[0].el, .108, .035, .113, lam({ color: 0xf2d22a }), 0, -.255, 0);   // fitinha do Bonfim (pulso esquerdo)
  const bag = group(n.spine); bag.position.set(0, .3, -.17); n.props.bag = bag;
  box(bag, .32, .4, .1, lam({ color: 0x3a3a3e }), 0, 0, 0); box(bag, .08, .62, .07, lam({ color: 0x2a2a2a }), .1, .1, -.02);
  const o = CH.namOld, h2 = o.head;
  box(h2, .27, .05, .28, o.hairM, 0, .31, -.005);
  for (const s of [1, -1]) box(h2, .02, .09, .2, lam({ color: 0x8a8580 }), s * .128, .24, -.02);   // fios brancos nas temporas
  box(h2, .26, .12, .05, o.hairM, 0, .22, -.12);
  o.props.ribbon = box(o.arms[0].el, .108, .03, .113, lam({ color: 0xece6c8 }), 0, -.255, 0);    // fitinha desbotada
  const l = CH.liv, hl = l.head;
  box(hl, .27, .08, .28, l.hairM, 0, .31, 0); box(hl, .27, .2, .05, l.hairM, 0, .2, -.12);
  for (const s of [1, -1]) box(hl, .025, .14, .18, l.hairM, s * .13, .24, -.03);
  const bun = new THREE.Mesh(new THREE.IcosahedronGeometry(.13, 0), l.hairM); bun.position.set(0, .44, -.05); hl.add(bun);
  const scarf = new THREE.Mesh(new THREE.CylinderGeometry(.13, .14, .07, 6), lam({ color: 0xf6c21a })); scarf.position.set(0, .36, -.04); hl.add(scarf);
  frustum(l.hips, .3, .5, .26, .8, lam({ color: 0x8c8c92 }), 0, -.08, 0);                            // saia de ensaio
  l.props.tape = box(l.legs[0].foot, .135, .03, .08, lam({ color: 0xf8f8f8 }), 0, .03, .1);             // sapatilha remendada
  const rib = lam({ color: 0xffc2d0, emissive: 0x401c24 });
  l.props.ribbons = group(l.root);
  for (const lg of l.legs) { box(lg.knee, .14, .025, .145, rib, 0, -.36, 0, 0, 0, .35); box(lg.knee, .14, .025, .145, rib, 0, -.3, 0, 0, 0, -.35); }
  l.ribbonMeshes = l.legs.flatMap((lg) => lg.knee.children.slice(-2));
  const lo = CH.livOld, ho = lo.head;
  const curl = lam({ color: 0x140e0c });
  for (const [x, y, z, r] of [[0, .33, -.03, .17], [.13, .2, -.05, .13], [-.13, .2, -.05, .13], [.12, .06, -.08, .11], [-.12, .06, -.08, .11], [0, .2, -.13, .15]]) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), curl); m.position.set(x, y, z); ho.add(m); }
  for (const s of [1, -1]) box(ho, .03, .05, .03, basic({ color: 0xffcf3a }), s * .135, .05, .02);
  frustum(lo.hips, .4, .52, .62, .7, lam({ color: 0xb88a5a }), 0, -.3, 0);                           // sobretudo cor de camelo
  box(lo.spine, .05, .3, .01, lam({ color: 0x1a4a9a }), .06, .32, .115);                                // credencial
  box(lo.spine, .12, .08, .01, lam({ color: 0xf0f0f0 }), .06, .16, .118);
  const lt = box(lo.spine, .41, .12, .23, lam({ color: 0x141414 }), 0, .51, 0);                          // gola alta preta
  const bagL = group(lo.root); bagL.position.set(-.3, .85, 0); lo.props.bag = bagL;
  box(bagL, .08, .34, .3, lam({ color: 0x5a3a2a }), 0, 0, 0);
  const sh = lam({ color: 0xffd8dc }); box(bagL, .06, .07, .2, sh, -.05, -.25, .04); box(bagL, .06, .07, .2, sh, -.08, -.3, -.04);   // sapatilha nova pendurada
  const j = CH.jef, hj = j.head;
  box(hj, .27, .06, .28, j.hairM, 0, .31, 0);
  const cap = lam({ color: 0xc8202a }); box(hj, .28, .09, .28, cap, 0, .34, 0); box(hj, .26, .02, .16, cap, 0, .3, -.2);   // bone pra tras
  box(j.spine, .42, .1, .23, lam({ color: 0x1a8a3a }), 0, .49, 0);
  j.props.ctrl = box(j.arms[1].el, .16, .05, .1, lam({ color: 0x222226 }), .04, -.36, .06);
  const d = CH.davi, hd = d.head;
  box(hd, .26, .03, .27, d.hairM, 0, .3, 0); box(hd, .26, .1, .03, d.hairM, 0, .23, -.13);
  box(d.spine, .41, .06, .23, lam({ color: 0x2a5ad0 }), 0, .5, 0);
  for (const a of d.arms) box(a.A, .115, .07, .125, lam({ color: 0x2a5ad0 }), 0, -.27, 0);
}
// criancas e plateia genericas
export const KIDS = [];
{
  const SK = [0x8a5a3c, 0x4a2a1c, 0xc09070, 0x6e452c, 0xa87048, 0x5a3424];
  const SH = [0xf4f4f0, 0xd84a4a, 0x3a8ad8, 0xf0c030, 0x6ac06a, 0xc06ad0];
  for (let i = 0; i < 6; i++) KIDS.push(human({ id: 'kid' + i, skin: SK[i], shirt: SH[i], pants: 0x2a3a6a, scale: .56 + (i % 3) * .05, hair: 0x120c08 }));
  KIDS.forEach((k, i) => { if (i % 2) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(.16, 0), k.hairM); b.position.set(0, .3, -.06); k.head.add(b); } else box(k.head, .27, .05, .28, k.hairM, 0, .31, 0); });
}
export const ADULTS = [];
{
  const SK = [0x8a5a3c, 0x4a2a1c, 0xc09070, 0x6e452c, 0xa87048, 0x5a3424, 0xd8a880, 0x7a4a30];
  const SH = [0xd84a7a, 0x4a6ab0, 0xe0b040, 0x6a9a6a, 0xa05ab0, 0xe87040, 0x40a0a0, 0xf0f0f0];
  for (let i = 0; i < 12; i++) {
    const a = human({ id: 'ad' + i, skin: SK[i % 8], shirt: SH[(i * 3) % 8], pants: [0x2a2a3a, 0x3a4a6a, 0x5a4a3a][i % 3], hair: i % 4 === 0 ? 0xa8a4a0 : 0x140e0a, scale: .95 });
    box(a.head, .27, .06, .28, a.hairM, 0, .31, 0);
    if (i % 2) box(a.head, .27, .2, .06, a.hairM, 0, .18, -.12);
    a.props.phone = box(a.arms[1].el, .07, .12, .015, basic({ color: 0xbfe4ff }), 0, -.38, .06);
    ADULTS.push(a);
  }
}

// ------------------------------------------------------------ objetos
export const PROPS = {};
const prop = (name, build) => { const g = group(); g.visible = false; build(g); PROPS[name] = g; return g; };
export function keyboardMesh(parent) {
  const g = group(parent);
  box(g, .62, .06, .2, lam({ color: 0x2a2a2c }), 0, 0, 0);
  plane(g, .58, .16, lam({ map: T.keys }), 0, .032, .01, -Math.PI / 2);
  return g;
}
prop('keyboard', (g) => keyboardMesh(g));
prop('lid', (g) => box(g, .62, .02, .2, lam({ color: 0x3a3a3c }), 0, 0, 0));
T.calendar = tex(16, 20, (g) => { noise(g, 0, 0, 16, 20, 0xf6f2e8, .02); px(g, 0, 0, col(0xd03030), 16, 4); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { px(g, 1 + c * 3, 6 + r * 3, col(0x606060), 2, 2); } for (let r = 0; r < 4; r++) { px(g, 1, 6 + r * 3, col(0xd02020), 2, 2); px(g, 0, 7 + r * 3, col(0xd02020), 4, 1); } });
prop('pillow', (g) => { box(g, .5, .12, .32, lam({ color: 0xf2f2f6 }), 0, .06, 0); });
prop('calendar', (g) => { plane(g, .26, .32, lam({ map: T.calendar, side: THREE.DoubleSide }), 0, .02, 0, -Math.PI / 2 + .2); });
prop('fear', (g) => {
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(.17, 0), lam({ color: 0x14101a })); m.position.y = .17; m.scale.set(1, .85, 1); g.add(m);
  const e = basic({ color: 0xfff6c0 }); box(g, .04, .05, .01, e, -.06, .2, .155); box(g, .04, .05, .01, e, .06, .2, .155);
  PROPS.fearBody = m;
});
prop('console', (g) => { box(g, .36, .08, .28, lam({ color: 0x1a1a1e }), 0, .04, 0); box(g, .06, .02, .02, basic({ color: 0x40ff60 }), .12, .085, .14); box(g, .16, .05, .1, lam({ color: 0x2a2a30 }), -.1, .1, .2); });
prop('shoe', (g) => {                                                // sapatilha de ponta gasta (para closes)
  const m = lam({ color: 0xf0c8c4 }); box(g, .09, .07, .26, m, 0, .035, 0); box(g, .07, .05, .05, lam({ color: 0xf8f8f6 }), 0, .045, .12);
  box(g, .012, .012, .5, lam({ color: 0xf6b8c0 }), .03, .1, -.1, .5); box(g, .012, .012, .5, lam({ color: 0xf6b8c0 }), -.03, .1, -.1, .7);
});
prop('shoeNew', (g) => {
  const m = lam({ color: 0xffd0d8, emissive: 0x30181a }); box(g, .09, .07, .26, m, 0, .035, 0); box(g, .07, .05, .05, m, 0, .045, .12);
  box(g, .012, .012, .45, lam({ color: 0xffb0c0 }), .03, .1, -.08, .5);
});
T.notebook = tex(48, 32, (g) => {
  noise(g, 0, 0, 48, 32, 0xf8f4e8, .015); for (let y = 3; y < 32; y += 3) px(g, 0, y, col(0xc8d8f0), 48, 1);
  const L = col(0x2a2a3a);
  const rect = (x, y, w, h) => { px(g, x, y, L, w, 1); px(g, x, y + h - 1, L, w, 1); px(g, x, y, L, 1, h); px(g, x + w - 1, y, L, 1, h); };
  rect(4, 8, 40, 20); px(g, 4, 8, L, 1, 1);
  for (let i = 0; i < 6; i++) { px(g, 4 + i * 3, 7 - i, L, 3, 1); px(g, 41 - i * 3, 7 - i, L, 3, 1); }
  px(g, 20, 8, L, 1, 20); px(g, 32, 8, L, 1, 20);
  px(g, 8, 18, col(0x8a5a3c), 8, 5); for (let x = 9; x < 16; x += 2) px(g, x, 18, col(0xf8f4e8), 1, 2);     // o piano na cozinha
  px(g, 10, 13, col(0x404040), 4, 3);                                                                     // fogao
  bitText(g, 'PIANO', 6, 24, 1, col(0xc0392b));
  px(g, 24, 14, col(0xe0a0c0), 4, 8); px(g, 23, 15, col(0xe0a0c0), 6, 1);                                   // bonequinha dançando
  px(g, 35, 13, col(0x3a6ab0), 6, 4); px(g, 36, 18, col(0x3a6ab0), 4, 6);                                   // escola
});
prop('notebook', (g) => { box(g, .5, .02, .34, lam({ color: 0x2a4a8a }), 0, 0, 0); plane(g, .48, .32, lam({ map: T.notebook }), 0, .012, 0, -Math.PI / 2); box(g, .01, .01, .16, lam({ color: 0xf0c020 }), .3, .03, .05, 0, .6); });
T.letter = tex(64, 80, (g) => {
  noise(g, 0, 0, 64, 80, 0xf8f4ea, .015); for (let y = 36; y < 76; y += 5) px(g, 5, y, col(0x9a9aa8), 34 + (rnd() * 18 | 0), 1);
  const r = col(0xc0392b); px(g, 2, 2, r, 60, 1); px(g, 2, 30, r, 60, 1); px(g, 2, 2, r, 1, 29); px(g, 61, 2, r, 1, 29);
  bitText(g, 'AUDIÇÃO', (64 - textW('AUDIÇÃO', 1)) / 2 | 0, 8, 1, r); bitText(g, 'SÃO PAULO', (64 - textW('SÃO PAULO', 1)) / 2 | 0, 20, 1, r);
});
prop('letter', (g) => plane(g, .26, .34, lam({ map: T.letter, side: THREE.DoubleSide }), 0, 0, 0));
T.ticket = tex(64, 32, (g) => { noise(g, 0, 0, 64, 32, 0xf2f0f6, .02); px(g, 0, 0, col(0x2a6ab0), 64, 7); bitText(g, 'SÃO PAULO', 5, 13, 1, col(0x1a1a2a)); for (let x = 4; x < 60; x += 3) px(g, x, 27, col(0x7a7a7a), 2, 1); });
prop('ticket', (g) => plane(g, .2, .1, lam({ map: T.ticket, side: THREE.DoubleSide }), 0, 0, 0));
T.sheet = tex(32, 40, (g) => { noise(g, 0, 0, 32, 40, 0xf6f2e6, .015); for (let s = 0; s < 4; s++) for (let l = 0; l < 5; l++) px(g, 2, 5 + s * 9 + l * 1.4 | 0, col(0x5a5a5a), 28, 1); for (let k = 0; k < 24; k++) px(g, 3 + rnd() * 26 | 0, 4 + rnd() * 34 | 0, col(0x1a1a1a), 2, 1); px(g, 6, 8, col(0xc0392b), 10, 1); px(g, 14, 17, col(0xc0392b), 8, 1); });
prop('sheets', (g) => { plane(g, .32, .4, lam({ map: T.sheet }), 0, 0, 0, -Math.PI / 2); plane(g, .32, .4, lam({ map: T.sheet }), .2, -.005, .08, -Math.PI / 2, .2); });
prop('lamp', (g) => {
  box(g, .14, .03, .14, lam({ color: 0x2a2a2a }), 0, .015, 0); box(g, .02, .36, .02, lam({ color: 0x2a2a2a }), 0, .18, 0);
  const sh = new THREE.Mesh(new THREE.ConeGeometry(.1, .1, 6, 1, true), lam({ color: 0x2a5a3a, side: THREE.DoubleSide })); sh.position.set(.04, .36, 0); sh.rotation.z = -.4; g.add(sh);
  box(g, .04, .04, .04, M.glow, .05, .32, 0);
});
T.photo = (i) => tex(12, 14, (g) => {
  noise(g, 0, 0, 12, 14, 0xf4f0e6, .01); noise(g, 1, 1, 10, 10, [0x7ab0d8, 0xf0c070, 0x9ad09a, 0xe8a0a0][i % 4], .05);
  const sk = [0x8a5a3c, 0x4a2a1c, 0xc09070, 0x6e452c][(i * 3) % 4];
  for (let k = 0; k < 3; k++) { const x = 2 + k * 3; px(g, x, 4, col(sk), 2, 2); px(g, x, 3, col(0x140c08), 2, 1); px(g, x - (k === 1 ? 0 : 0), 6, col([0xd84a4a, 0xf0d040, 0x4a8ad8][k]), 2, 4); }
  px(g, 4, 6, col(0xf4f4f0));
});
export const PHOTOS = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => lam({ map: T.photo(i), side: THREE.DoubleSide }));
prop('photos', (g) => { for (let i = 0; i < 3; i++) plane(g, .2, .24, PHOTOS[i], (i - 1) * .12, i * .004, (i - 1) * .02, -Math.PI / 2, 0); });
T.phoneDriver = tex(60, 108, (g) => { noise(g, 0, 0, 60, 108, 0x101418, .02); px(g, 3, 10, col(0x1e2a38), 54, 86); px(g, 8, 18, col(0x40c060), 44, 22); bitText(g, 'MOTORISTA', 4, 50, 1, '#ffffff'); px(g, 25, 61, '#ffffff', 10, 1); bitText(g, 'CHEGOU', 12, 66, 1, '#ffffff'); px(g, 14, 84, col(0x40c060), 32, 7); });
T.phoneCall = tex(32, 56, (g) => { noise(g, 0, 0, 32, 56, 0x0c1a2a, .02); px(g, 10, 8, col(0xe0b0a0), 12, 12); bitText(g, 'LIVIA', 2, 28, 1, '#ffffff'); px(g, 4, 44, col(0xd03030), 8, 6); px(g, 20, 44, col(0x30c050), 8, 6); });
T.phoneGlow = tex(16, 28, (g) => { noise(g, 0, 0, 16, 28, 0x9ad0ff, .04); px(g, 2, 3, col(0xffffff), 12, 3); for (let y = 8; y < 26; y += 3) px(g, 2, y, col(0x5a8ab0), 9 + (rnd() * 3 | 0), 1); });
export function phone(parent, map) { const g = group(parent); box(g, .085, .16, .012, lam({ color: 0x111114 }), 0, 0, 0); g.screen = plane(g, .075, .145, basic({ map }), 0, 0, .007); return g; }
prop('phone', (g) => { PROPS.phoneObj = phone(g, T.phoneDriver); });
T.reservado = tex(64, 16, (g) => { noise(g, 0, 0, 64, 16, 0xffffff, .01); bitText(g, 'RESERVADO', 5, 4, 1, col(0x1a1a1a)); });
T.busSign = tex(64, 12, (g) => { px(g, 0, 0, col(0x0a0a0a), 64, 12); bitText(g, 'SÃO PAULO', 5, 3, 1, col(0xffb020)); });
T.bus = tex(64, 16, (g) => { noise(g, 0, 0, 64, 16, 0xf0f0f2, .02); px(g, 0, 3, col(0x1a2a3a), 64, 6); for (let x = 2; x < 64; x += 8) px(g, x, 3, col(0xd8d8dc), 1, 6); px(g, 0, 11, col(0x2a6ad0), 64, 2); px(g, 0, 13, col(0xf0a020), 64, 1); });

// ========================= rodoviaria =========================
{
  const S = mkSet('station', 300, 0, 0);
  plane(S, 40, 16, lam({ map: T.concrete }), 0, 0, 0, -Math.PI / 2, 0, 20, 8);
  box(S, 40, .3, .4, lam({ color: 0xe8d040 }), 0, .02, 3.0);
  plane(S, 40, 10, lam({ color: 0x2a2a2e }), 0, -.3, 8, -Math.PI / 2);
  box(S, 40, .12, 9, lam({ color: 0x4a4e58 }), 0, 4.2, 0);
  for (let x = -18; x <= 18; x += 4.5) { box(S, .3, 4.2, .3, lam({ color: 0x8a8c94 }), x, 2.1, -1.5); box(S, 1.8, .08, .14, M.fluor, x + 2.2, 4.08, 0); }
  box(S, 40, 4.2, .2, lam({ color: 0x5a6070 }), 0, 2.1, -4.3);
  const bus = group(S); bus.position.set(3, 0, 5.2); SETS.bus = bus;
  const bm = lam({ map: T.bus }); box(bus, 11, 2.6, 2.5, [bm, bm, lam({ color: 0xe8e8ea }), lam({ color: 0x2a2a2a }), bm, bm], 0, 1.75, 0);
  box(bus, .08, 1.2, 2.2, lam({ color: 0x1a2a3a }), -5.52, 2.2, 0);
  plane(bus, 2.0, .36, basic({ map: T.busSign }), -5.57, 2.85, 0, 0, -Math.PI / 2);
  for (const x of [-3.6, 3.4]) for (const z of [-1.2, 1.2]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .3, 8), lam({ color: 0x141414 })); w.rotation.x = Math.PI / 2; w.position.set(x, .5, z); bus.add(w); }
  for (const s of [1, -1]) box(bus, .05, .14, .4, basic({ color: 0xfff4d0 }), -5.53, .8, s * .85);
  const bench = (x) => { box(S, 2, .08, .5, lam({ color: 0x3a6ab0 }), x, .48, -3); box(S, 2, .5, .08, lam({ color: 0x3a6ab0 }), x, .78, -3.25); };
  bench(-6); bench(-12); bench(8);
}

// ========================= salao comunitario (apresentacao) =========================
{
  const S = mkSet('hall', -300, 0, 0);
  plane(S, 14, 18, lam({ map: T.parquet }), 0, 0, 0, -Math.PI / 2, 0, 8, 10);
  const wl = lam({ map: T.plaster(0xb8d8c0) }), wu = lam({ map: T.plaster(0xf0ece2) });
  for (const [x, ry] of [[-7, Math.PI / 2], [7, -Math.PI / 2]]) { plane(S, 18, 1.4, wl, x, .7, 0, 0, ry, 10, 1); plane(S, 18, 3.4, wu, x, 3.1, 0, 0, ry, 10, 2); }
  plane(S, 14, 4.8, wu, 0, 2.4, -9, 0, 0, 8, 3); plane(S, 14, 4.8, wu, 0, 2.4, 9, 0, Math.PI, 8, 3);
  plane(S, 14, 18, lam({ color: 0xd8d0c0 }), 0, 4.8, 0, Math.PI / 2, 0);
  box(S, 9, .45, 3.2, lam({ map: T.wood }), 0, .225, -7.2);
  // porta no fundo (com luz)
  box(S, 1.3, 2.3, .08, lam({ map: T.wood, color: 0xa08060 }), 3.5, 1.15, 8.95);
  SETS.hallDoorLight = box(S, .06, 2.2, .02, M.glow, 2.84, 1.15, 8.9);
  // bandeirolas
  const BC = [0xe83a3a, 0xf6d23a, 0x3a8ae8, 0x3ad06a, 0xf07ad0, 0xf08a3a];
  for (let r = 0; r < 5; r++) {
    const z = -7 + r * 3.6;
    box(S, 14, .015, .015, M.wire, 0, 4.2, z);
    for (let i = 0; i < 22; i++) { const tri = new THREE.Mesh(new THREE.ConeGeometry(.16, .32, 3), basic({ color: BC[(i + r) % 6] })); tri.rotation.z = Math.PI; tri.position.set(-6.6 + i * .62, 4.03, z); S.add(tri); }
  }
  // cadeiras de plastico brancas
  const chairM = lam({ color: 0xf6f6f2 });
  const seats = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) {
    const x = -4.2 + c * 1.2 + (c > 3 ? .6 : 0), z = -3.6 + r * 1.3;
    seats.push(geoBox(.48, .06, .46, x, .46, z), geoBox(.48, .5, .05, x, .74, z + .22), geoBox(.05, .46, .05, x - .2, .23, z - .2), geoBox(.05, .46, .05, x + .2, .23, z - .2), geoBox(.05, .46, .05, x - .2, .23, z + .2), geoBox(.05, .46, .05, x + .2, .23, z + .2));
  }
  merged(S, seats, chairM);
  SETS.chairPos = (r, c) => V(-300 - 4.2 + c * 1.2 + (c > 3 ? .6 : 0), 0, -3.6 + r * 1.3);
  SETS.reservado = plane(S, .4, .15, lam({ map: T.reservado }), -300, 0, 0); S.remove(SETS.reservado); S.add(SETS.reservado);
  const p = SETS.chairPos(0, 3); SETS.reservado.position.set(p.x + 300, .5, p.z); SETS.reservado.rotation.set(-Math.PI / 2, 0, Math.PI);
}

// ========================= salinha (primeiros alunos) e quarto (Livia) =========================
{
  const S = mkSet('room', -300, 0, 80);
  plane(S, 8, 8, lam({ map: T.parquet }), 0, 0, 0, -Math.PI / 2, 0, 5, 5);
  plane(S, 8, 3.2, lam({ map: T.plaster(0xe8d8b0) }), 0, 1.6, -3, 0, 0, 5, 2);
  plane(S, 8, 3.2, lam({ map: T.plaster(0xe8d8b0) }), -3, 1.6, 0, 0, Math.PI / 2, 5, 2);
  box(S, 1.6, 1.0, .05, lam({ color: 0x1e3a2a }), 1.0, 1.7, -2.95);                                  // quadro
  bitText; // (decoracao)
  box(S, 1.1, .8, .5, lam({ map: T.wood }), -1.8, .4, -2.4);                                          // mesa
  SETS.roomLamp = PROPS.lamp;
}
{
  const S = mkSet('bedroom', -300, 0, 160);
  plane(S, 8, 8, lam({ map: T.wood }), 0, 0, 0, -Math.PI / 2, 0, 5, 5);
  plane(S, 8, 3.2, lam({ map: T.plaster(0xd8c8e0) }), 0, 1.6, -2.4, 0, 0, 5, 2);
  plane(S, 8, 3.2, lam({ map: T.plaster(0xd8c8e0) }), 2.4, 1.6, 0, 0, -Math.PI / 2, 5, 2);
  box(S, 1.5, .4, 2.1, lam({ color: 0x8a6a4a }), 0, .2, -1.2);
  box(S, 1.45, .14, 2.05, lam({ color: 0xa8a8c8 }), 0, .47, -1.2);
  box(S, .7, .12, .4, lam({ color: 0xf4f4f8 }), 0, .6, -2.0);
  for (let i = 0; i < 3; i++) plane(S, .3, .4, lam({ color: [0xf0b0c0, 0xb0c8f0, 0xf0e0a0][i] }), -1 + i * .5, 1.9, -2.38);   // posteres de bale
}

// ========================= escola pronta: interior, cozinha (outra vida) =========================
{
  const S = mkSet('schoolIn', 300, 0, 80);
  plane(S, 10, 10, lam({ map: T.parquet }), 0, 0, 0, -Math.PI / 2, 0, 6, 6);
  const w = lam({ map: T.plaster(0xf0e6d0) });
  plane(S, 10, 3.4, w, 0, 1.7, -3.5, 0, 0, 6, 2); plane(S, 10, 3.4, w, -3.5, 1.7, 0, 0, Math.PI / 2, 6, 2); plane(S, 10, 3.4, w, 3.5, 1.7, 0, 0, -Math.PI / 2, 6, 2);
  plane(S, 1.9, 3.4, w, -2.55, 1.7, 3.5, 0, Math.PI, 1.2, 2); plane(S, 4.1, 3.4, w, 1.45, 1.7, 3.5, 0, Math.PI, 2.5, 2); plane(S, 1.0, 1.2, w, -1.1, 2.8, 3.5, 0, Math.PI, .6, .7);
  plane(S, 6, 4, lam({ color: 0x8a9a6a }), -1.1, 0, 6, -Math.PI / 2);
  // fotos de alunos na parede
  for (let i = 0; i < 12; i++) plane(S, .34, .4, PHOTOS[i % 8], -2.6 + (i % 6) * .55, 2.3 - Math.floor(i / 6) * .55, -3.48);
  // piano de armario
  const pg = group(S); pg.position.set(1.4, 0, -3.1); SETS.piano = pg;
  const pw = lam({ color: 0x2a1810 });
  box(pg, 1.5, 1.25, .6, pw, 0, .625, 0); box(pg, 1.5, .08, .35, pw, 0, .74, .42);
  plane(pg, 1.4, .3, lam({ map: T.pianoKeys }), 0, .785, .42, -Math.PI / 2);
  box(pg, 1.2, .3, .03, lam({ color: 0x3a2418 }), 0, 1.0, .31);
  box(pg, .9, .06, .35, pw, 0, .46, .9);                                                                // banquinho
  for (const s of [-1, 1]) box(pg, .06, .46, .06, pw, s * .4, .23, .9);
  // janela com grade colorida
  plane(S, 1.3, 1.2, basic({ color: 0xffe8b8 }), -3.46, 1.7, -1.2, 0, Math.PI / 2);
  for (let i = 0; i < 5; i++) box(S, .04, 1.2, .04, lam({ color: [0xe83a3a, 0xf6d23a, 0x3a8ae8, 0x3ad06a, 0xf07ad0][i] }), -3.42, 1.7, -1.7 + i * .25);
  // porta
  SETS.door = group(S); SETS.door.position.set(-1.6, 0, 3.45);
  box(SETS.door, 1.0, 2.2, .07, lam({ map: T.wood, color: 0xb89070 }), .5, 1.1, 0);
  SETS.doorGap = box(S, .05, 2.15, .02, M.glow, -.55, 1.1, 3.42);
  // sapatilha velha no prego
  const sh = group(S); sh.position.set(-3.0, 1.5, -3.42);
  box(sh, .09, .26, .07, lam({ color: 0xe8c0bc }), 0, 0, 0); box(sh, .07, .05, .075, lam({ color: 0xf8f8f8 }), 0, -.12, 0); box(sh, .03, .03, .06, lam({ color: 0x3a3a3a }), 0, .15, 0);
}
{
  const S = mkSet('kitchen', 300, 0, 160);
  plane(S, 8, 8, lam({ map: T.tiles, color: 0xe8e0d0 }), 0, 0, 0, -Math.PI / 2, 0, 8, 8);
  plane(S, 8, 3.2, lam({ map: T.tiles }), 0, 1.6, -2.6, 0, 0, 8, 3.2);
  plane(S, 8, 3.2, lam({ map: T.plaster(0xf0d890) }), -2.6, 1.6, 0, 0, Math.PI / 2, 5, 2);
  // fogao com panelas
  box(S, .9, .9, .65, lam({ color: 0xf0f0ec }), -1.6, .45, -2.2);
  for (const x of [-1.8, -1.4]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(.16, .14, .18, 8), lam({ color: 0x9a9aa0 })); p.position.set(x, .99, -2.15); S.add(p); }
  // filtro de barro
  const f1 = new THREE.Mesh(new THREE.CylinderGeometry(.18, .22, .5, 8), lam({ color: 0xb8643a })); f1.position.set(-.6, 1.17, -2.3); S.add(f1);
  const f2 = new THREE.Mesh(new THREE.CylinderGeometry(.2, .18, .4, 8), lam({ color: 0xc8744a })); f2.position.set(-.6, 1.62, -2.3); S.add(f2);
  box(S, 1.2, .9, .6, lam({ map: T.wood }), -.6, .45, -2.25);
  // piano encostado na parede da cozinha
  const pw = lam({ color: 0x2a1810 });
  box(S, 1.4, 1.2, .55, pw, 1.3, .6, -2.3); plane(S, 1.3, .28, lam({ map: T.pianoKeys }), 1.3, .76, -1.92, -Math.PI / 2); box(S, 1.4, .07, .32, pw, 1.3, .72, -1.9);
  // mesa posta
  box(S, 1.2, .06, .8, lam({ color: 0xf4f0f0 }), .2, .76, -.2);
  for (const [x, z] of [[-.45, -.5], [.85, -.5], [-.45, .1], [.85, .1]]) box(S, .05, .73, .05, lam({ color: 0x6a4a2a }), x, .37, z);
  for (const x of [-.1, .5]) { const pl = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .02, 8), lam({ color: 0xffffff })); pl.position.set(x, .8, -.2); S.add(pl); }
}

// ========================= vazio (quarta parede) =========================
{
  const S = mkSet('void', 0, -200, 400);
  box(S, 1.6, .12, .5, M.oldwood, 0, .5, 0);
  for (const s of [-1, 1]) box(S, .06, .5, .4, M.oldwood, s * .72, .25, 0);
  box(S, .05, .9, .05, M.post, .74, .95, 0);
}

// ------------------------------------------------------------ chuva, estrelas cadentes etc.
const RAIN = [];
{
  const rm = basic({ color: 0xa8b8d0, transparent: true, opacity: .55, depthWrite: false });
  for (let i = 0; i < 260; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(.012, .35, .012), rm); m.visible = false; scene.add(m); RAIN.push({ m, a: rnd(), b: rnd(), c: rnd() }); }
}
export function rain(center, t, on = true, size = 8, h = 8) {
  for (const r of RAIN) {
    r.m.visible = on; if (!on) continue;
    const y = h - ((t * (9 + r.c * 4) + r.c * h) % h);
    r.m.position.set(center.x + (r.a - .5) * size, center.y + y - h / 2, center.z + (r.b - .5) * size);
  }
}

// ------------------------------------------------------------ reset por quadro
export function resetFrame() {
  for (const k in SETS) if (SETS[k] && SETS[k].isGroup && SETS[k].parent === scene) SETS[k].visible = false;
  for (const k in PROPS) if (PROPS[k].isGroup && PROPS[k].parent === scene) PROPS[k].visible = false;
  hideAllChars();
  for (const s of STAIRS) { s.g.visible = false; s.g.rotation.set(0, 0, 0); stairBuild(s, NSTEP); }
  stairB.g.position.set(2.4, 4.1, 1.0); stairA.g.position.set(0, 4.1, 1.0);
  for (const d of DUST) d.m.visible = false;
  for (const r of RAIN) r.m.visible = false;
  points([]); spotlight(false);
  U.uCool.value = 0; U.uSketch.value = 0; U.uDark.value = 0;
  for (const c of Object.values(CH).concat(KIDS, ADULTS)) { for (const k in c.props) c.props[k].visible = true; }
  CH.jef.props.ctrl.visible = false;
  for (const a of ADULTS) a.props.phone.visible = false;
}
export function showProp(name, pos, rot = [0, 0, 0], s = 1) { const p = PROPS[name]; p.visible = true; p.position.copy(pos); p.rotation.set(rot[0], rot[1], rot[2]); p.scale.setScalar(s); return p; }
export function updateWindows() { if (SETS.winLit) SETS.winLit.visible = SETS.bairro.visible && winLit > 0; }
export function setCam(pos, tgt, fov = 52, aspect = RW / RH) { camera.position.copy(pos); camera.fov = fov; camera.aspect = aspect; camera.updateProjectionMatrix(); camera.lookAt(tgt); camera.updateMatrixWorld(); }
export function render(view) {
  sky.position.copy(camera.position);
  if (!view) { renderer.setScissorTest(false); renderer.setViewport(0, 0, RW, RH); renderer.render(scene, camera); return; }
  const h = RH / 2;
  renderer.setScissorTest(true);
  const y = view === 'top' ? h : 0;
  renderer.setViewport(0, y, RW, h); renderer.setScissor(0, y, RW, h);
  renderer.render(scene, camera);
  renderer.setScissorTest(false);
}
export function kites(t) { for (const k of SETS.kites) { k.k.rotation.y = .4 * Math.sin(t * .8 + k.ph); k.k.position.y += 0; } }
