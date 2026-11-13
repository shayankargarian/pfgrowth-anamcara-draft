// PFG mockup interactions (original)
(()=>{const b=document.body;const btn=document.querySelector('.burger');
if(btn)btn.addEventListener('click',()=>{const o=b.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
document.querySelectorAll('.overlay a').forEach(a=>a.addEventListener('click',()=>b.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.fx').forEach(el=>io.observe(el));
const rail=document.querySelector('.rail');if(rail){const links=[...rail.querySelectorAll('a')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=secs.indexOf(e.target);links.forEach((l,j)=>l.classList.toggle('on',i===j));rail.classList.toggle('light',!!e.target.dataset.dark)}}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>s&&so.observe(s));}
document.querySelectorAll('form.mock').forEach(f=>f.addEventListener('submit',e=>e.preventDefault()));
// portfolio directory
const dir=document.getElementById('dir');if(dir&&window.PFG_PORTFOLIO){let reg='All',sec='All';
const draw=()=>{const list=PFG_PORTFOLIO.filter(c=>(reg==='All'||c.r.includes(reg))&&(sec==='All'||c.s.includes(sec)));
dir.innerHTML=list.map(c=>`<li><b>${c.n}</b><span>${[...c.r,...c.s].join(' · ')}</span></li>`).join('');
document.getElementById('count').textContent=`${list.length} companies shown`;};
const wire=(id,set)=>document.querySelectorAll(`#${id} button`).forEach(x=>x.addEventListener('click',()=>{document.querySelectorAll(`#${id} button`).forEach(y=>y.setAttribute('aria-pressed','false'));x.setAttribute('aria-pressed','true');set(x.dataset.v);draw();}));
wire('freg',v=>reg=v);wire('fsec',v=>sec=v);draw();}
})();
// ===== v3 =====
(()=>{
const RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// hero video: still image stays underneath as poster and fallback
const hero=document.querySelector('.hero'),vid=hero&&hero.querySelector('video');
if(vid){
  if(RM){vid.pause();vid.remove();}
  else{
    const on=()=>hero.classList.add('playing');
    vid.addEventListener('playing',on,{once:true});
    vid.addEventListener('error',()=>vid.remove(),true);
    // attach sources only after the page has loaded, so the still paints first
    const start=()=>{const sd=navigator.connection&&navigator.connection.saveData;if(sd)return;
      [['webm','video/webm'],['mp4','video/mp4']].forEach(([k,t])=>{const u=vid.dataset[k];if(u){const so=document.createElement('source');so.src=u;so.type=t;vid.appendChild(so);}});
      vid.preload='auto';vid.load();const p=vid.play();if(p&&p.catch)p.catch(()=>{});};
    if(document.readyState==='complete')setTimeout(start,400);else window.addEventListener('load',()=>setTimeout(start,400),{once:true});
  }
}
// panels rise as they enter
const panels=document.querySelectorAll('.pad .panel');
if(!RM&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px -6% 0px'});
  panels.forEach(p=>{const r=p.getBoundingClientRect();if(r.top<innerHeight)return;p.classList.add('rise');io.observe(p)});
}
// partner profiles
const T=window.PFG_TEAM||[],bySlug={};T.forEach(m=>bySlug[m.slug]=m);
const dlg=document.getElementById('profile');
function openProfile(slug,opener){
  const m=bySlug[slug];if(!m||!dlg)return;
  const ill=document.querySelector(`.person[data-slug="${slug}"] img`);const img=ill?ill.getAttribute('src'):m.img;
  let h=`<div class="pf-head"><img src="${esc(img)}" alt="" width="120" height="120"><div><h2 id="pf-name">${esc(m.name)}</h2>${m.title?`<p>${esc(m.title)}</p>`:''}${m.region?`<p class="pf-region">${esc(m.region)}</p>`:''}</div></div>`;
  if(m.bio){
    if(m.focus.length)h+=`<span class="label">Focus</span><ul class="chips">${m.focus.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`;
    h+=`<p class="pf-bio">${esc(m.bio)}</p>`;
    if(m.prior.length)h+=`<span class="label">Before PFG</span><ul class="pf-prior">${m.prior.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`;
  } else h+=`<p class="pf-bio pf-soon">Bio coming soon.</p>`;
  h+=`<div class="pf-cta"><a class="btn" href="connect.html">Contact PFG</a><a class="arrow" href="mailto:contact@pfgrowth.com">contact@pfgrowth.com</a></div><p class="note">Enquiries go to PFG's general inbox and are passed to the right person.</p>`;
  document.getElementById('pf-body').innerHTML=h;
  dlg._opener=opener||null;
  if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
  if(history.replaceState)history.replaceState(null,'','#p-'+slug);
}
if(dlg){
  document.querySelectorAll('.person[data-slug]').forEach(b=>b.addEventListener('click',()=>openProfile(b.dataset.slug,b)));
  const close=()=>{dlg.close?dlg.close():dlg.removeAttribute('open')};
  dlg.querySelector('.close').addEventListener('click',close);
  dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
  dlg.addEventListener('close',()=>{if(history.replaceState)history.replaceState(null,'',location.pathname);if(dlg._opener)dlg._opener.focus({preventScroll:true})});
  const hm=location.hash.match(/^#p-(.+)$/);if(hm)openProfile(hm[1]);
}
// deal flow map
const map=document.querySelector('.dealmap');
if(map){
  const btns=map.querySelectorAll('[data-city]');
  const show=(c,from)=>{map.querySelectorAll('.citycard').forEach(x=>x.hidden=x.id!=='city-'+c);
    btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.city===c));
    const card=document.getElementById('city-'+c);if(card&&from){const r=card.getBoundingClientRect();if(r.bottom>innerHeight)card.scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'})}};
  btns.forEach(b=>b.addEventListener('click',()=>show(b.dataset.city,b)));
  map.querySelectorAll('.citycard-close').forEach(b=>b.addEventListener('click',()=>{b.closest('.citycard').hidden=true;btns.forEach(x=>x.setAttribute('aria-pressed','false'))}));
}
// facility finder
const f=document.getElementById('finder');
if(f){
  const qs=[...f.querySelectorAll('.fq')],ans={};let i=0;
  const step=document.querySelector('.fstep'),bar=document.querySelector('.fprog i'),res=document.getElementById('fresult');
  const back=document.createElement('button');back.type='button';back.className='pill fback';back.textContent='← Back';
  const go=n=>{i=n;qs.forEach((q,j)=>q.classList.toggle('cur',j===i));step.textContent=`Question ${i+1} of ${qs.length}`;bar.style.width=((i+1)/qs.length*100)+'%';
    if(i>0)qs[i].appendChild(back);else back.remove();const first=qs[i].querySelector('.opt');if(first&&n>0)first.focus({preventScroll:true});};
  back.addEventListener('click',()=>go(Math.max(0,i-1)));
  qs.forEach((q,j)=>q.querySelectorAll('.opt').forEach(o=>o.addEventListener('click',()=>{
    q.querySelectorAll('.opt').forEach(x=>x.setAttribute('aria-pressed','false'));o.setAttribute('aria-pressed','true');ans[q.dataset.q]=o.dataset.v;
    setTimeout(()=>{if(j<qs.length-1)go(j+1);else result();},RM?0:180);
  })));
  function result(){
    const {stage,rev,use,region}=ans;let kind,title,why,fit;
    if(stage==='lender'||use==='book'||rev==='assets'){kind='abl';title='Asset-backed or warehouse facility';
      why='Lenders and fintech originators often scale fastest with a facility that funds a specific pool of loans or receivables.';
      fit=['Asset portfolios of $5MM or more','Warehouse facilities across many currencies, asset classes and jurisdictions','Loans of $1 to 50MM'];
      if(rev==='lt5'&&stage!=='lender')why+=' A book under $5MM may be early for PFG\'s usual range, so start with a conversation.';}
    else if(stage==='pre'||rev==='lt5'){kind='talk';title='Talk to us first';
      why='PFG usually backs post-revenue companies with $5 to 150MM in revenue. Earlier than that, a conversation is the best next step.';
      fit=['Growth debt is offered at any post-revenue stage','PFG\'s usual revenue range is $5 to 150MM'];}
    else if(rev==='gt150'){kind='talk';title='Talk to us about a tailored structure';
      why='Above $150MM in revenue sits outside PFG\'s usual published range, so the team would need to look at your situation directly.';
      fit=['Loans of $1 to 50MM','Term loans, lines of credit, royalty or revenue-based finance'];}
    else{kind='gd';title='Growth debt';
      why=use==='acq'?'Growth debt can help fund an acquisition while limiting dilution, sized to your trajectory.':use==='buffer'?'Growth debt can provide a buffer for the unexpected, structured around your cash flow.':'Growth debt can fund product, sales and marketing or new markets, and is cheaper than equity.';
      fit=['Loans of $1 to 50MM for companies with $5 to 150MM in revenue','Term loans, lines of credit, royalty or revenue-based finance','Security over assets, warrants or conversion, and financial covenants are usual'];}
    let pool=T.filter(m=>m.deal&&m.lend.includes(region));
    if(kind==='abl'){const ft=T.filter(m=>m.deal&&m.fintech);pool=[...pool.filter(m=>m.fintech),...ft,...pool];}
    pool=[...new Set(pool)];
    if(pool.length<2){const lead=T.filter(m=>/business development|president|ceo/i.test(m.title));pool=[...pool,...lead.filter(m=>!pool.includes(m))];}
    pool=pool.slice(0,4);
    const card=m=>{const ill=`assets/team-illustrated/${m.slug}.webp`;return `<a class="mate" href="team.html#p-${m.slug}"><img src="${ill}" alt="" width="64" height="64" loading="lazy"><span><b>${esc(m.name)}</b><span>${esc(m.title)}</span>${m.region?`<span style="opacity:.7">${esc(m.region)}</span>`:''}</span></a>`};
    res.innerHTML=`<div class="rcard"><span class="label">Suggested direction</span><h2>${title}</h2><p>${why}</p><ul>${fit.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <h3 class="med" style="margin-top:26px">People to talk to first</h3><p class="small" style="opacity:.75">Matched on ${esc(region)}${kind==='abl'?' and fintech or structured credit focus':''}, from the team page.</p>
    <div class="mates">${pool.map(card).join('')}</div>
    <div class="factions"><a class="btn" href="connect.html">Contact PFG</a><button type="button" class="pill frestart" style="border-color:rgba(47,70,49,.35)">Start again</button></div>`;
    f.hidden=true;res.hidden=false;step.textContent='Your indicative result';bar.style.width='100%';
    res.querySelector('.frestart').addEventListener('click',()=>{Object.keys(ans).forEach(k=>delete ans[k]);f.querySelectorAll('.opt').forEach(x=>x.setAttribute('aria-pressed','false'));res.hidden=true;f.hidden=false;go(0);});
    res.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
  }
  go(0);
}
})();
