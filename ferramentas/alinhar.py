import re,json,sys
txtf,silf,outdir,total=sys.argv[1],sys.argv[2],sys.argv[3],float(sys.argv[4])
raw=open(txtf,encoding='utf-8').read()
raw=re.sub(r'\[[^\]]*\]','',raw)
words=raw.split()
# chunks split at punctuation
chunks=[];cur=[]
for w in words:
    cur.append(w)
    if re.search(r'[,.…:?!"]$',w): chunks.append(cur);cur=[]
if cur: chunks.append(cur)
L=[sum(len(re.sub(r'[^\wÀ-ú]','',w))+1 for w in c) for c in chunks]
# segments
ev=re.findall(r'silence_(start|end): ([0-9.]+)',open(silf).read())
segs=[];t=0.0;inside=True
for k,v in ev:
    v=float(v)
    if k=='start':
        if v-t>0.05: segs.append([t,v])
    else: t=v
if total-t>0.05: segs.append([t,total])
D=[b-a for a,b in segs]
rate=sum(D)/sum(L)
N,M=len(segs),len(chunks)
INF=1e18
import functools
best=[[INF]*(M+1) for _ in range(N+1)];bp=[[None]*(M+1) for _ in range(N+1)]
best[0][0]=0
for i in range(N+1):
    for j in range(M+1):
        if best[i][j]>=INF: continue
        # 1 seg with k chunks
        for k in range(1,8):
            if i+1<=N and j+k<=M:
                c=(D[i]-rate*sum(L[j:j+k]))**2
                if best[i][j]+c<best[i+1][j+k]: best[i+1][j+k]=best[i][j]+c;bp[i+1][j+k]=(i,j)
        # k segs with 1 chunk
        for k in range(2,6):
            if i+k<=N and j+1<=M:
                c=(sum(D[i:i+k])-rate*L[j])**2+0.02*(k-1)
                if best[i][j]+c<best[i+k][j+1]: best[i+k][j+1]=best[i][j]+c;bp[i+k][j+1]=(i,j)
groups=[];i,j=N,M
while (i,j)!=(0,0):
    pi,pj=bp[i][j];groups.append((pi,i,pj,j));i,j=pi,pj
groups.reverse()
out=[]
for si,se,ci,ce in groups:
    spans=segs[si:se];dur=sum(b-a for a,b in spans)
    ws=[w for c in chunks[ci:ce] for w in c]
    wl=[len(re.sub(r'[^\wÀ-ú]','',w))+2 for w in ws];tot=sum(wl)
    acc=0
    def at(x):
        x*=dur
        for a,b in spans:
            if x<=b-a: return a+x
            x-=b-a
        return spans[-1][1]
    for w,l in zip(ws,wl):
        s=at(acc/tot);acc+=l;e=at(acc/tot)
        out.append({'text':w,'start':round(s,3),'end':round(e,3)})
json.dump({'words':out},open(outdir+'/assets/audio/transcript.json','w'),ensure_ascii=False,indent=0)
open(outdir+'/PALAVRAS.txt','w').write('\n'.join(f"{x['start']:.2f}\t{x['text']}" for x in out)+'\n')
print(N,'segs',M,'chunks',len(groups),'groups; rate',round(rate,4),'cost',round(best[N][M],2))
for si,se,ci,ce in groups: print(f"{segs[si][0]:6.2f}-{segs[se-1][1]:6.2f} | {' '.join(w for c in chunks[ci:ce] for w in c)}")
