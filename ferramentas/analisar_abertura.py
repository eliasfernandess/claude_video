"""Compara o movimento de câmera da abertura (0-8 s) com o resto do vídeo.
Para cada par de quadros seguidos: corte? escala, deslocamento. Saída: estatísticas por trecho."""
import cv2, numpy as np, sys, json, glob
orb = cv2.ORB_create(500); bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
def motion(a, b):
    ka, da = orb.detectAndCompute(a, None); kb, db = orb.detectAndCompute(b, None)
    if da is None or db is None or len(ka) < 15 or len(kb) < 15: return None
    m = bf.match(da, db)
    if len(m) < 15: return None
    pa = np.float32([ka[x.queryIdx].pt for x in m]); pb = np.float32([kb[x.trainIdx].pt for x in m])
    M, inl = cv2.estimateAffinePartial2D(pa, pb, ransacReprojThreshold=2)
    if M is None or inl.sum() < 12: return None
    s = np.hypot(M[0, 0], M[1, 0]); r = np.degrees(np.arctan2(M[1, 0], M[0, 0]))
    return s, M[0, 2] / a.shape[1], M[1, 2] / a.shape[0], r
out = {}
for v in sys.argv[1:]:
    cap = cv2.VideoCapture(v); fps = cap.get(cv2.CAP_PROP_FPS); prev = None; rows = []; k = 0
    while True:
        ok, f = cap.read()
        if not ok: break
        h = f.shape[0]
        g = cv2.cvtColor(cv2.resize(f[int(h * .05):int(h * .66)], (240, 300)), cv2.COLOR_BGR2GRAY)
        if prev is not None:
            d = np.abs(g.astype(np.int16) - prev).mean()
            mo = motion(prev, g) if d > .3 else (1.0, 0, 0, 0)
            rows.append((k / fps, d, mo))
        prev = g; k += 1
    def stats(t0, t1):
        R = [r for r in rows if t0 <= r[0] < t1]
        cut = [r for r in R if r[2] is None and r[1] > 12]
        mv = [r[2] for r in R if r[2] is not None]
        sp = np.array([abs(np.log(m[0])) * fps * 100 for m in mv])  # % de zoom por s
        tr = np.array([np.hypot(m[1], m[2]) * fps * 100 for m in mv])  # % da tela por s
        rot = np.array([abs(m[3]) * fps for m in mv])
        moving = ((sp > 1.5) | (tr > 1.5)).mean() if len(mv) else 0
        return dict(cortes_por_s=round(len(cut) / (t1 - t0), 2), quadros_com_camera_andando=round(float(moving) * 100),
                    zoom_med=round(float(np.median(sp)), 1), zoom_p90=round(float(np.percentile(sp, 90)), 1),
                    pan_med=round(float(np.median(tr)), 1), pan_p90=round(float(np.percentile(tr, 90)), 1),
                    rot_p90=round(float(np.percentile(rot, 90)), 2), cortes_t=[round(r[0], 2) for r in cut])
    dur = rows[-1][0]
    out[v] = dict(abertura=stats(0, 8), resto=stats(8, dur))
    a, r = out[v]['abertura'], out[v]['resto']
    print(f"{v[:24]:24} ABERTURA cortes/s {a['cortes_por_s']:.2f} cam andando {a['quadros_com_camera_andando']}% zoom med {a['zoom_med']} p90 {a['zoom_p90']} pan med {a['pan_med']} p90 {a['pan_p90']} rot {a['rot_p90']}")
    print(f"{'':24} RESTO    cortes/s {r['cortes_por_s']:.2f} cam andando {r['quadros_com_camera_andando']}% zoom med {r['zoom_med']} p90 {r['zoom_p90']} pan med {r['pan_med']} p90 {r['pan_p90']} rot {r['rot_p90']}")
    print(f"{'':24} cortes na abertura: {a['cortes_t']}")
json.dump(out, open('abertura.json', 'w'), indent=1)
