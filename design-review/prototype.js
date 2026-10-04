const params=new URLSearchParams(location.search);
for(const [key,allowed,variable] of [['reading',['680','720','760'],'--reading'],['header',['72','76','80'],'--header']])if(allowed.includes(params.get(key)))document.documentElement.style.setProperty(variable,params.get(key)+'px');
const toc=document.querySelector('.toc');
if(toc){
 const links=[...toc.querySelectorAll('a')];
 const sections=links.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
 let navigationTarget=sections.find(section=>'#'+section.id===location.hash)?.id||null;
 let framePending=false;
 const mark=id=>{for(const link of links){if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}};
 const update=()=>{
  framePending=false;
  if(navigationTarget){mark(navigationTarget);return;}
  const line=(document.querySelector('header')?.getBoundingClientRect().bottom||0)+24;
  const section=sections.find(section=>section.getBoundingClientRect().bottom>line)||sections.at(-1);
  if(section)mark(section.id);
 };
 const schedule=()=>{if(!framePending){framePending=true;requestAnimationFrame(update);}};
 const manualMove=()=>{navigationTarget=null;schedule();};
 toc.addEventListener('click',event=>{const link=event.target.closest('a');if(links.includes(link)){navigationTarget=link.hash.slice(1);mark(navigationTarget);}});
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('wheel',manualMove,{passive:true});
 window.addEventListener('touchstart',manualMove,{passive:true});
 window.addEventListener('pointerdown',event=>{if(!toc.contains(event.target))manualMove();},{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))manualMove();});
 window.addEventListener('resize',manualMove);
 window.addEventListener('hashchange',()=>{const target=sections.find(section=>'#'+section.id===location.hash);if(target){navigationTarget=target.id;mark(target.id);}});
 update();
}
const draft=document.getElementById('draft'), mail=document.getElementById('mail-link');
if(draft&&mail)draft.addEventListener('input',()=>{mail.href='mailto:blueredexper@gmail.com?subject='+encodeURIComponent('왜 사라졌지 제안')+'&body='+encodeURIComponent(draft.value);});
document.getElementById('copy-draft')?.addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(draft.value);status.textContent='내용을 복사했습니다. 사이트에 전송하거나 저장하지 않았습니다.';}catch{status.textContent='이 환경에서는 자동 복사가 지원되지 않습니다. 내용을 직접 선택해 복사해주세요.';}});
document.querySelector('[data-random-ids]')?.addEventListener('click',event=>{const ids=JSON.parse(event.currentTarget.dataset.randomIds);const id=ids[Math.floor(Math.random()*ids.length)];location.href='https://rhtngudwls2-lang.github.io/why-gone-preview/record/'+encodeURIComponent(id)+'/';});
