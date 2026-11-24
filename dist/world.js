import * as THREE from './vendor/three.module.js';
import { towersFromDays, initialCar, stepCar } from './domain.mjs';

export function createWorld(container, data, callbacks) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.5;
  container.append(renderer.domElement);
  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog('#71405e',150,440);
  scene.add(new THREE.HemisphereLight('#ffd8b6','#37234d',2.5));
  const light=new THREE.DirectionalLight('#ffcfab',3.5);light.position.set(-60,90,-100);scene.add(light);
  const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,1200);
  const materials=new Map(),boxGeometry=new THREE.BoxGeometry(1,1,1);
  const material=(color,emissive=false)=>{
    const key=color+emissive;
    if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,roughness:.8,metalness:.1,...(emissive?{emissive:color,emissiveIntensity:.4}:{})}));
    return materials.get(key);
  };
  function box(x,y,z,w,h,d,color,emissive=false,parent=scene){
    const mesh=new THREE.Mesh(boxGeometry,material(color,emissive));
    mesh.position.set(x,y,z);mesh.scale.set(w,h,d);parent.add(mesh);return mesh;
  }
  const water=new THREE.Mesh(new THREE.PlaneGeometry(1800,1800),new THREE.MeshStandardMaterial({color:'#482e60',roughness:.32,metalness:.45}));water.rotation.x=-Math.PI/2;water.position.y=-1.6;scene.add(water);
  const sun=new THREE.Mesh(new THREE.SphereGeometry(23,40,24),new THREE.MeshBasicMaterial({color:'#ffc2ae',fog:false}));sun.position.set(-105,31,-230);scene.add(sun);
  for(let i=0;i<28;i++)box(-105+(i%3-1)*3,-1.48,-170+i*4,14+i*.8,.025,.6,'#a86c88',true);
  box(0,-1,0,146,2,110,'#45334f');
  box(0,.02,0,142,.12,106,'#755778');
  // Decorative background skyline; only the central labeled towers encode activity.
  for(let i=0;i<28;i++){
    const x=-125+i*9,z=-102-(i%3)*11,h=8+((i*17)%29);
    box(x,h/2-1,z,6+(i%3),h,8,i%3?'#684764':'#84546f');
    for(let j=3;j<h;j+=4)box(x,j,z+4.05,4.5,.25,.1,'#e397a9',true);
  }
  for(const z of [-42,0,42]){
    box(0,.13,z,140,.13,10,'#33263f');
    box(0,.22,z-5.1,140,.12,.18,'#e3aeae');box(0,.22,z+5.1,140,.12,.18,'#e3aeae');
    for(let x=-65;x<68;x+=8)box(x,.23,z,3,.04,.16,'#c99ab0');
  }
  for(const x of [-62,-18,18,62]){
    box(x,.15,0,9,.14,94,'#33263f');
    for(let z=-44;z<46;z+=8)box(x,.25,z,.15,.04,3,'#c99ab0');
  }
  for(const z of [-35,35])for(let x=-70;x<=70;x+=3.3)box(x,.18,z,1.1,.05,.12,'#b6809d');
  // A real calendar grid at the waterfront: inactive days are low paving.
  data.days.forEach((day,i)=>box(-65+Math.floor(i/7)*2.42,.22,-52+(i%7)*.7,1.8,.12,.43,day.contributionCount?'#e899c5':'#65506f',!!day.contributionCount));

  const obstacles=[],selectables=[];
  const towers=towersFromDays(data.days);
  towers.forEach((t,i)=>{
    const color=i%2?'#bc8ae7':'#d991c5';
    const mesh=box(t.x,t.height/2,t.z,6,t.height,6,color);
    mesh.userData={type:'activity',...t};selectables.push(mesh);obstacles.push(t);
    box(t.x,t.height+.12,t.z,6.2,.25,6.2,'#f4c8e3',true);
    box(t.x,.35,t.z,8,.7,8,'#47324f');
    for(let y=3;y<t.height-1;y+=2.6){
      box(t.x,y,t.z+3.04,4.6,.27,.1,'#ffcfcc',true);
      box(t.x+3.04,y,t.z,.1,.27,4.6,'#ddadeb',true);
    }
  });
  const labels=document.createElement('div');labels.id='landmark-labels';
  Object.assign(labels.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'1'});container.append(labels);
  const projectObjects=[];
  data.projects.forEach((p,i)=>{
    const h=[16,20,13,10,12,17][i],w=i===0?13:9,d=9;
    const group=new THREE.Group();group.position.set(p.x,0,p.z);scene.add(group);
    const mesh=box(0,h/2,0,w,h,d,'#65445f',false,group);
    mesh.userData={type:'project',project:p};selectables.push(mesh);obstacles.push({x:p.x,z:p.z,w:w+1,d:d+1});
    box(0,h+.2,0,w+1,.5,d+1,p.color,true,group);
    for(let y=2;y<h;y+=2.3){box(0,y,4.55,w-.8,.32,.12,p.color,true,group);box(w/2+.05,y,0,.1,.32,7,p.color,true,group);}
    box(0,.5,0,w+2,1,d+2,'#3e2c47',false,group);
    if(i===1){box(0,h+4,0,4,8,4,p.color,false,group);box(0,h+8.2,0,4.4,.5,4.4,'#f9d1e2',true,group);}
    if(i===2){const ring=new THREE.Mesh(new THREE.TorusGeometry(3,.15,6,32),material(p.color,true));ring.position.set(0,h+4,0);group.add(ring);}
    const button=document.createElement('button');button.className='landmark';button.textContent=p.title;button.setAttribute('aria-label','Conhecer '+p.title);
    button.style.setProperty('--marker',p.color);button.addEventListener('click',()=>callbacks.select({type:'project',project:p},button));labels.append(button);
    projectObjects.push({p,button,point:new THREE.Vector3(p.x,h+2,p.z)});
  });
  function palm(x,z,height=7){
    const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.16,.35,height,5),material('#8c6273'));trunk.position.y=height/2;trunk.rotation.z=.1;group.add(trunk);
    for(let i=0;i<7;i++){
      const a=i*Math.PI*2/7;
      const vertices=new Float32Array([0,height,0,Math.cos(a-.19)*2,height+.4,Math.sin(a-.19)*2,Math.cos(a)*4.2,height-1.6,Math.sin(a)*4.2,Math.cos(a+.19)*2,height+.4,Math.sin(a+.19)*2]);
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(vertices,3));geo.setIndex([0,1,2,0,2,3]);geo.computeVertexNormals();
      const leaf=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:'#376266',roughness:1,side:THREE.DoubleSide}));group.add(leaf);
    }
  }
  for(let x=-67;x<=68;x+=13){palm(x,49,6+(x%3));palm(x,-46,7);}
  for(const x of [-67,67])for(let z=-26;z<36;z+=15)palm(x,z,7);
  // Waterfront promenade and arcade-like street lights.
  for(let x=-60;x<70;x+=16){box(x,3.2,47,.12,6.4,.12,'#3c2e49');box(x,6.4,46,1.4,.22,1.1,'#ffd5b3',true);}
  for(let i=0;i<10;i++)box(71,.5,-44+i*9,1,1,3,'#bb859c');
  const carGroup=new THREE.Group();scene.add(carGroup);
  box(0,1,0,2.5,.7,4.4,'#ffadc6',false,carGroup);
  box(0,1.6,.1,2.1,.65,2.2,'#c481aa',false,carGroup);
  box(0,1.72,-.88,1.82,.45,.08,'#443e62',false,carGroup);
  box(0,1.72,1.12,1.82,.45,.08,'#443e62',false,carGroup);
  for(const x of [-1.22,1.22])for(const z of [-1.25,1.35]){
    const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.53,.53,.28,12),material('#231e34'));wheel.rotation.z=Math.PI/2;wheel.position.set(x,.64,z);carGroup.add(wheel);
  }
  for(const x of [-.78,.78]){box(x,1,-2.24,.6,.22,.08,'#fff3b8',true,carGroup);box(x,1,2.24,.55,.2,.08,'#ff608c',true,carGroup);}
  let car=initialCar(),mode='overview',motion=!matchMedia('(prefers-reduced-motion: reduce)').matches,orbit=.85,nearest=null;
  const desired=new THREE.Vector3(),look=new THREE.Vector3(),projected=new THREE.Vector3();
  function reset(){car=initialCar();}
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
  renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)return;
    const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(selectables)[0];if(hit)callbacks.select(hit.object.userData,renderer.domElement);
  });
  renderer.domElement.addEventListener('pointercancel',()=>{down=null;});
  function update(input,dt){
    if(mode==='drive')car=stepCar(car,input,dt,obstacles);
    carGroup.position.set(car.x,0,car.z);carGroup.rotation.y=car.heading;
    const mobile=innerWidth<760;
    if(mode==='overview'){
      if(motion)orbit+=Math.min(dt,.05)*.08;
      const angle=.9+Math.sin(orbit)*.13;
      const radius=mobile?220:170;
      desired.set(Math.sin(angle)*radius, mobile?112:103,Math.cos(angle)*radius);
      look.set(mobile?0:-38,mobile?48:0,0);
    }else{
      desired.set(car.x+Math.sin(car.heading)*24,18,car.z+Math.cos(car.heading)*24);
      look.set(car.x-Math.sin(car.heading)*7,2,car.z-Math.cos(car.heading)*7);
    }
    const blend=motion?1-Math.exp(-Math.min(dt,.05)*5):1;
    camera.position.lerp(desired,blend);camera.lookAt(look);
    nearest=null;let distance=Infinity;
    for(const item of projectObjects){
      const d=Math.hypot(car.x-item.p.x,car.z-item.p.z);
      if(d<distance){distance=d;nearest=item.p;}
      projected.copy(item.point).project(camera);
      const sx=(projected.x*.5+.5)*innerWidth,sy=(-projected.y*.5+.5)*innerHeight;
      const outsideIntro=mode==='drive'||(!mobile&&sx>innerWidth*.43);
      const visible=outsideIntro&&projected.z<1&&projected.z>-1&&sx>25&&sx<innerWidth-25&&sy>100&&sy<innerHeight-85&&(mode==='overview'||d<52);
      item.button.hidden=!visible;
      if(visible){item.button.style.left=sx+'px';item.button.style.top=sy+'px';}
    }
    callbacks.nearby(mode==='drive'&&distance<18?nearest:null);
    renderer.render(scene,camera);
  }
  function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
  camera.position.set(130,110,150);camera.lookAt(-28,0,0);
  return {update,resize,reset,setMode(value){mode=value;},setMotion(value){motion=value;},getState(){return {...car,mode};},getNearest(){return nearest;},canvas:renderer.domElement,towers};
}
