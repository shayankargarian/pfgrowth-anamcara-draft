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
