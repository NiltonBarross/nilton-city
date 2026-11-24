const $=id=>document.getElementById(id);
let data,world,driving=false,nearby=null,returnFocus=null;
let motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const keys=new Set(),touch=new Set();
const clearInput=()=>{keys.clear();touch.clear();};
function openDialog(id,trigger=document.activeElement){
  clearInput();returnFocus=trigger;
  const dialog=$(id);dialog.showModal();
  dialog.querySelector('button,a')?.focus();
}
function closeDialog(dialog){dialog.close();returnFocus?.focus?.();}
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(button.closest('dialog'))));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog(dialog);});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});
});
for(const id of ['projects-button','directory-button','fallback-projects'])$(id).addEventListener('click',()=>openDialog('directory-dialog',$(id)));
$('about-button').addEventListener('click',()=>openDialog('about-dialog',$('about-button')));
$('activity-button').addEventListener('click',()=>openDialog('activity-dialog',$('activity-button')));
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();openDialog('directory-dialog',e.currentTarget);$('project-list').focus();});
function select(item,trigger){
  if(item.type==='activity'){
    $('detail-category').textContent='Um dia na cidade';
    $('detail-title').textContent=new Date(item.date+'T12:00:00').toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
    $('detail-description').textContent=`${item.count} ${item.count===1?'contribuição contabilizada':'contribuições contabilizadas'} pelo GitHub neste dia. Esta torre representa esse registro real do calendário.`;
    $('detail-tech').textContent='Altura proporcional à atividade · cenário ao redor é decorativo';
    $('detail-link').textContent='Conferir no GitHub';$('detail-link').href='https://github.com/NiltonBarross?tab=overview';
  }else{
    const p=item.project;
    $('detail-category').textContent=p.category;$('detail-title').textContent=p.title;
    $('detail-description').textContent=p.description;$('detail-tech').textContent=p.tech;
    $('detail-link').textContent='Abrir repositório';$('detail-link').href=p.url;
  }
  // Only one modal at a time; preserve a stable trigger in the directory.
  if($('directory-dialog').open)$('directory-dialog').close();
  openDialog('detail-dialog',item.type==='activity'?$('activity-button'):trigger);
}
function setDriving(value){
  if(!world)return;
  driving=value;clearInput();document.body.classList.toggle('driving',value);
  $('drive-hud').hidden=!value;$('touch-controls').hidden=!value||!matchMedia('(pointer: coarse), (max-width: 760px)').matches;
  $('nearby').hidden=true;world.setMode(value?'drive':'overview');
  if(value)$('exit-button').focus();else $('start-button').focus();
}
$('start-button').addEventListener('click',()=>setDriving(true));
$('exit-button').addEventListener('click',()=>setDriving(false));
$('reset-button').addEventListener('click',()=>{clearInput();world?.reset();});
$('visit-button').addEventListener('click',()=>{if(nearby)select({type:'project',project:nearby},$('projects-button'));});
function syncMotion(){
  $('motion-button').setAttribute('aria-pressed',String(motion));
  $('motion-button').title=motion?'Pausar câmera automática':'Ativar câmera automática';
  $('motion-button').querySelector('svg').innerHTML=motion?'<path d="M8 5v14M16 5v14"/>':'<path d="m8 5 11 7-11 7z"/>';
  world?.setMotion(motion);
}
$('motion-button').addEventListener('click',()=>{motion=!motion;syncMotion();});syncMotion();
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches){motion=false;syncMotion();}});
window.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]'))return;
  if(e.key==='Escape'&&driving){setDriving(false);return;}
  if(!driving||e.target.matches('input,textarea,select'))return;
  const key=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d','shift','e',' '].includes(key)){
    // Buttons retain Enter/Space activation; movement does not steal Tab navigation.
    if(key===' '&&e.target.closest('button,a'))return;
    e.preventDefault();keys.add(key);
    if((key==='e'||key===' ')&&nearby&&!e.repeat)select({type:'project',project:nearby},$('projects-button'));
  }
});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',clearInput);document.addEventListener('visibilitychange',clearInput);
document.querySelectorAll('[data-direction]').forEach(button=>{
  button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);touch.add(button.dataset.direction);});
  const release=()=>touch.delete(button.dataset.direction);
  button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
});
$('start-button').disabled=true;
try{
  const response=await fetch('data.json');if(!response.ok)throw Error('Dados indisponíveis');data=await response.json();
  $('activity-total').textContent=data.totalContributions;$('project-count').textContent=String(data.projects.length).padStart(2,'0');
  $('snapshot-description').textContent=`${data.totalContributions} contribuições em ${data.days.filter(d=>d.contributionCount>0).length} dias ativos. Retrato do calendário consultado em ${new Date(data.capturedAt+'T12:00:00').toLocaleDateString('pt-BR')}.`;
  for(const p of data.projects){
    const button=document.createElement('button');button.className='project-row';
    const swatch=document.createElement('span');swatch.className='project-swatch';swatch.style.background=p.color;
    const content=document.createElement('span'),title=document.createElement('strong'),subtitle=document.createElement('small');
    title.textContent=p.title;subtitle.textContent=p.category+' · '+p.tech;content.append(title,subtitle);
    const plus=document.createElementNS('http://www.w3.org/2000/svg','svg');plus.setAttribute('viewBox','0 0 24 24');plus.innerHTML='<path d="M12 5v14M5 12h14"/>';
    button.append(swatch,content,plus);button.addEventListener('click',()=>select({type:'project',project:p},$('projects-button')));$('project-list').append(button);
  }
  data.days.filter(d=>d.contributionCount>0).forEach(day=>{
    const row=document.createElement('div');row.className='activity-row';
    const date=document.createElement('span'),count=document.createElement('span');
    date.textContent=new Date(day.date+'T12:00:00').toLocaleDateString('pt-BR');count.textContent=day.contributionCount+' contribuições';row.append(date,count);$('activity-list').append(row);
  });
  try{
    const {createWorld}=await import('./world.js');
    world=createWorld($('scene'),data,{select,nearby(p){nearby=p;$('nearby').hidden=!p||!!document.querySelector('dialog[open]');if(p)$('nearby-name').textContent=p.title;}});
    syncMotion();$('start-button').disabled=false;$('loading').textContent='Sem instalação. Só entrar e explorar.';
    let last=performance.now();
    function frame(now){
      const dt=Math.min(.05,(now-last)/1000);last=now;
      if(!document.hidden){
        const paused=!!document.querySelector('dialog[open]');
        world.update(paused?{}:{forward:keys.has('w')||keys.has('arrowup')||touch.has('forward'),back:keys.has('s')||keys.has('arrowdown')||touch.has('back'),left:keys.has('a')||keys.has('arrowleft')||touch.has('left'),right:keys.has('d')||keys.has('arrowright')||touch.has('right'),fast:keys.has('shift')},dt);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);window.addEventListener('resize',()=>world.resize());
  }catch(error){console.error('Cidade 3D indisponível:',error);$('fallback').hidden=false;$('loading').textContent='Os projetos continuam disponíveis, mesmo sem a cidade 3D.';$('controls-hint').hidden=true;$('motion-button').hidden=true;}
}catch(error){console.error(error);$('loading').textContent='Não foi possível carregar os dados. Recarregue ou visite o GitHub.';$('fallback').hidden=false;$('fallback-projects').textContent='Abrir GitHub';$('fallback-projects').onclick=()=>{location.href='https://github.com/NiltonBarross';};}
