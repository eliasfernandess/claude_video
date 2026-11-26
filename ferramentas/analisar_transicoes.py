import cv2, numpy as np, sys, json
v = sys.argv[1]
cap = cv2.VideoCapture(v); fps = cap.get(cv2.CAP_PROP_FPS)
G = []; SH = []; HX = []
while True:
    ok, f = cap.read()
    if not ok: break
    h = f.shape[0]
    g = cv2.cvtColor(cv2.resize(f[int(h*.04):int(h*.68)], (180, 230)), cv2.COLOR_BGR2GRAY).astype(np.float32)
    G.append(g)
    gx = np.abs(cv2.Sobel(g, cv2.CV_32F, 1, 0)).mean(); gy = np.abs(cv2.Sobel(g, cv2.CV_32F, 0, 1)).mean()
    SH.append(cv2.Laplacian(g, cv2.CV_32F).var()); HX.append(gx / (gy + 1e-6))
G = np.array(G); SH = np.array(SH); HX = np.array(HX); N = len(G)
D = np.r_[0, np.abs(np.diff(G, axis=0)).mean((1, 2))]
# eventos: quadros com diferença alta
thr = max(6, np.percentile(D, 90))
hi = D > thr
ev = []; i = 0
while i < N:
    if hi[i]:
        j = i
        while j + 1 < N and hi[j + 1]: j += 1
        ev.append((i, j)); i = j + 1
    else: i += 1
res = []
for a, b in ev:
    L = b - a + 1
    pre = SH[max(0, a - 6):a - 1].mean() if a > 2 else SH[a]
    post = SH[b + 2:b + 8].mean() if b + 8 < N else SH[b]
    mid = SH[a:b + 1].min()
    dip = mid / (min(pre, post) + 1e-6)
    hx = HX[a:b + 1]
    blurdir = 'H' if hx.min() < .75 else ('V' if hx.max() > 1.35 else '-')
    # quanto do quadro mudou entre antes e depois
    big = np.abs(G[min(N - 1, b + 3)] - G[max(0, a - 3)]).mean()
    if big < 8: kind = 'anim'          # mudança dentro da mesma cena
    elif dip < .55 and L >= 2: kind = 'whip-' + blurdir
    elif L >= 5: kind = 'dissolve'
    else: kind = 'seco'
    res.append(dict(t=round(a / fps, 2), quadros=L, tipo=kind, dip=round(float(dip), 2), muda=round(float(big), 1)))
cuts = [r for r in res if r['tipo'] != 'anim']
# movimento de câmera dentro de cada plano: escala e deslocamento entre começo e fim
def mov(i0, i1):
    a = G[i0].astype(np.uint8); b = G[i1].astype(np.uint8)
    orb = cv2.ORB_create(400); ka, da = orb.detectAndCompute(a, None); kb, db = orb.detectAndCompute(b, None)
    if da is None or db is None or len(ka) < 12 or len(kb) < 12: return None
    m = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True).match(da, db)
    if len(m) < 12: return None
    pa = np.float32([ka[x.queryIdx].pt for x in m]); pb = np.float32([kb[x.trainIdx].pt for x in m])
    M, inl = cv2.estimateAffinePartial2D(pa, pb)
    if M is None or inl.sum() < 10: return None
    s = np.sqrt(M[0, 0] ** 2 + M[1, 0] ** 2)
    return s, M[0, 2] / 180, M[1, 2] / 230
bounds = [0] + [int(c['t'] * fps) for c in cuts] + [N]
planos = []
for i0, i1 in zip(bounds[:-1], bounds[1:]):
    a, b = i0 + 4, i1 - 4
    if b - a < 15: continue
    r = mov(a, b)
    if r: planos.append(dict(t=round(i0 / fps, 2), dur=round((i1 - i0) / fps, 2), zoom_por_s=round((r[0] ** (fps / (b - a)) - 1) * 100, 2), pan_x=round(r[1] * fps / (b - a) * 100, 2), pan_y=round(r[2] * fps / (b - a) * 100, 2)))
from collections import Counter
print(v, 'quadros', N, 'fps', fps)
print('tipos de transição:', Counter(c['tipo'] for c in cuts), ' animações internas:', sum(1 for r in res if r['tipo'] == 'anim'))
print('duração (quadros) por tipo:', {k: np.median([c['quadros'] for c in cuts if c['tipo'] == k]) for k in set(c['tipo'] for c in cuts)})
d = np.diff([c['t'] for c in cuts]); print('intervalo entre trocas: mediana %.2f s, média %.2f' % (np.median(d), d.mean()))
z = np.array([p['zoom_por_s'] for p in planos]); px = np.array([p['pan_x'] for p in planos]); py = np.array([p['pan_y'] for p in planos])
print('planos medidos', len(planos), '| zoom %%/s: mediana %.2f, p10 %.2f, p90 %.2f | com zoom-in >0.3%%/s: %d, zoom-out <-0.3: %d, parado: %d' % (np.median(z), np.percentile(z, 10), np.percentile(z, 90), (z > .3).sum(), (z < -.3).sum(), (np.abs(z) <= .3).sum()))
print('pan x %%/s mediana abs %.2f, pan y mediana abs %.2f' % (np.median(np.abs(px)), np.median(np.abs(py))))
json.dump(dict(cortes=cuts, planos=planos, todos=res), open(v + '.json', 'w'), indent=0)
