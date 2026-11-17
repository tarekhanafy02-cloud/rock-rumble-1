(function(){
var CX=240,CY=320,K=.04,TOTAL=8,AR0=1875;
var wrap=document.getElementById('wrap'),ov=document.getElementById('ov'),leftEl=document.getElementById('left'),winsEl=document.getElementById('wins'),dashB=document.getElementById('dash'),radar=document.getElementById('radar'),rx=radar.getContext('2d');
var wins=0;try{wins=+localStorage.getItem('rr-wins')||0}catch(e){}
winsEl.textContent=wins;
var snapC=true,DM=[.8,1,1.35],diff=0,kos=0,slow=0,pw=0,orb=null,orbT=5,AC=null,kosEl=document.getElementById('kos'),popEl=document.getElementById('pop');
try{kos=+localStorage.getItem('rr-kos')||0}catch(e){}kosEl.textContent=kos;
function snd(f,d,ty,v){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime;o.type=ty||'square';o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(Math.max(30,f*.4),n+d);g.gain.setValueAtTime(v||.08,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(n+d)}catch(e){}}
function pop(t){popEl.textContent=t;popEl.classList.remove('on');void popEl.offsetWidth;popEl.classList.add('on')}
function grab(ty){snd(ty?220:520,.4,'sawtooth',.1);pop(ty?'QUAKE!':'MEGA ROCK!');var p=R[0];
 if(ty){R.forEach(function(r){if(r===p||!r.alive||r.fall)return;var dx=r.x-p.x,dy=r.y-p.y,d=Math.hypot(dx,dy)||1;if(d<900){var k=1400*(1-d/900)+300;r.vx+=dx/d*k;r.vy+=dy/d*k;r.lh=p}});shake=10;for(var i=0;i<30;i++)burst(p.x,p.y,0xff6a2b,1)}
 else{pw=8;p.g.scale.setScalar(1.6);p.r=42;p.bm=p.r*p.r/576*PM}}
var ROCKS=[{n:'Pebble Pal',c:0xffcf70,p:0,mass:1,spd:1,dsh:1,gl:0,d:'Balanced'},{n:'Obsidian',c:0x30304a,p:40,mass:1.3,spd:1,dsh:1,gl:0,d:'+30% weight'},{n:'Crystal',c:0x6fe3ff,p:80,mass:1,spd:1.25,dsh:1,gl:.15,d:'+25% speed'},{n:'Magma',c:0xff5a14,p:150,mass:1.1,spd:1,dsh:1.35,gl:.5,d:'+35% dash force, glows'},{n:'Cosmic',c:0xb070ff,p:300,mass:1.25,spd:1.2,dsh:1.25,gl:.6,d:'Best of everything'}];
var UPS=[['dash','Dash power','+25% ram force and +1 damage per level',5,15],['cool','Dash recharge','12% faster per level',5,15],['spd','Speed','+10% speed per level',5,10],['arm','Armor','+12% weight per level',5,20],['hook','Grapple hook','Press G or Hook: reels in the nearest rival. More range and faster recharge per level',5,30],['rev','Phoenix','Survive a fall, once per level each match',3,50]];
var sv={pts:0,own:[0],sel:0,up:{}};
try{var q=JSON.parse(localStorage.getItem('rr-save'));if(q)sv=Object.assign(sv,q)}catch(e){}
sv.up=Object.assign({dash:0,cool:0,spd:0,arm:0,hook:0,rev:0},sv.up);
var up=sv.up,rk=ROCKS[sv.sel]||ROCKS[0],PM=1,revs=0,hk={t:0,r:null},hkCd=0,earned=0,hpf=document.getElementById('hpf'),hpt=document.getElementById('hpt'),hpb=document.getElementById('hpb'),shopEl=document.getElementById('shop'),hookB=document.getElementById('hook');
function save(){try{localStorage.setItem('rr-save',JSON.stringify(sv))}catch(e){}}
function upd(){document.getElementById('ptsP').textContent='Points: '+sv.pts}
function shop(){var h='<h1>Shop</h1><p>Points: <b style="color:#ffb347">'+(admin?'∞ (admin)':sv.pts)+'</b></p><div class="sh"><h3>Rocks</h3>';
 ROCKS.forEach(function(r,i){var own=sv.own.indexOf(i)>=0;h+='<div class="it"><span><b>'+r.n+'</b><br><small>'+r.d+'</small></span><button data-r="'+i+'">'+(sv.sel===i?'Equipped':own?'Equip':'Buy '+r.p)+'</button></div>'});
 h+='<h3>Upgrades</h3>';UPS.forEach(function(u,i){var l=sv.up[u[0]],mx=l>=u[3];h+='<div class="it"><span><b>'+u[1]+'</b> '+'●'.repeat(l)+'○'.repeat(u[3]-l)+'<br><small>'+u[2]+'</small></span><button data-u="'+i+'"'+(mx?' disabled':'')+'>'+(mx?'Maxed':'Buy '+u[4]*(l+1))+'</button></div>'});
 shopEl.innerHTML=h+'</div><button id="back">Back</button>'}
var yt=null,ytOk=false,musicOn=true,gest=false,musB=document.getElementById('musB');
function playMusic(){gest=true;if(yt&&ytOk&&musicOn)yt.playVideo()}
function toggleMusic(){musicOn=!musicOn;musB.textContent='Music: '+(musicOn?'On':'Off');if(yt&&ytOk){musicOn?yt.playVideo():yt.pauseVideo()}}
window.onYouTubeIframeAPIReady=function(){try{yt=new YT.Player('yt',{width:200,height:113,videoId:'K6cf7sf2ybs',playerVars:{loop:1,playlist:'K6cf7sf2ybs',playsinline:1,rel:0},events:{
 onReady:function(){ytOk=true;yt.setVolume(35);document.getElementById('ytw').classList.remove('hide');musB.classList.remove('hide');if(gest&&musicOn)yt.playVideo()},
 onStateChange:function(e){if(e.data===0){yt.seekTo(0);yt.playVideo()}}}})}catch(e){}};
musB.addEventListener('click',toggleMusic);
addEventListener('pointerdown',playMusic,{once:true});
addEventListener('keydown',playMusic,{once:true});
var ys=document.createElement('script');ys.src='https://www.youtube.com/iframe_api';document.head.appendChild(ys);
var brkB=document.getElementById('brk');
function brake(){var p=R[0];if(!run||cli||!p.alive||p.fall||(p.dashT||0)<=0)return;p.vx=p.vy=0;p.dash=0;p.dashT=0;p.m=p.bm;burst(p.x,p.y,0xcfc4b8,10);snd(180,.15,'square',.08)}
brkB.addEventListener('pointerdown',function(e){e.stopPropagation();brake()});
var mp=false,cli=false,peer=null,conns=[],hostConn=null,myId=0,byId=[],snapN=0,mpst=document.getElementById('mpst'),logEl=document.getElementById('log'),ci=document.getElementById('ci'),jc=document.getElementById('jc');
function addChat(n,x){var d=document.createElement('div');d.textContent=(n?n+': ':'')+x;logEl.appendChild(d);while(logEl.children.length>40)logEl.removeChild(logEl.firstChild);logEl.classList.remove('fade');clearTimeout(addChat.t);addChat.t=setTimeout(function(){if(document.activeElement!==ci)logEl.classList.add('fade')},9000)}
function bcast(m,ex){conns.forEach(function(c){if(c.open&&c!==ex)c.send(m)})}
function sendChat(x){x=x.trim().slice(0,160);if(!x)return;var n=sv.name||'Rock';if(cli){if(hostConn&&hostConn.open)hostConn.send({t:'c',n:n,x:x})}else{addChat(n,x);if(mp)bcast({t:'c',n:n,x:x})}}
ci.addEventListener('keydown',function(e){e.stopPropagation();if(e.key==='Enter'){sendChat(ci.value);ci.value='';ci.blur()}else if(e.key==='Escape')ci.blur()});
document.getElementById('chat').addEventListener('pointerdown',function(e){e.stopPropagation()});
function mpMsg(s){mpst.textContent=s}
function endHud(){[dashB,brkB,radar,hookB,hpb,xhB].forEach(function(e){e.classList.add('hide')})}
function mkPeer(id,cb){if(!window.Peer){mpMsg('Multiplayer library failed to load (needs internet).');return}if(peer){try{peer.destroy()}catch(e){}}peer=new Peer(id);peer.on('error',function(e){mpMsg('Network error: '+e.type)});peer.on('open',cb)}
function hostGame(){setName();var c='';for(var i=0;i<4;i++)c+='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'.charAt(Math.floor(Math.random()*32));mpMsg('Opening room...');
 mkPeer('rockrumble-'+c,function(){mp=true;cli=false;conns=[];mpMsg('Room code: '+c+'. Players: 1. Press Play when everyone has joined.');addChat('','Room '+c+' is open. Share the code!');
  peer.on('connection',function(cn){
   cn.on('data',function(m){
    if(m.t==='hi'){if(run||conns.length>=3){cn.send({t:'no'});return}cn.nm=String(m.n||'Player').slice(0,14);conns.push(cn);mpMsg('Room code: '+c+'. Players: '+(conns.length+1)+'. Press Play to start.');addChat('',cn.nm+' joined');bcast({t:'c',n:'',x:cn.nm+' joined'},cn)}
    else if(m.t==='i'){if(cn.rock){cn.rock.ix=+m.x||0;cn.rock.iy=+m.y||0}}
    else if(m.t==='d'){if(cn.rock&&run&&cn.rock.alive)doDash(cn.rock,+m.x||0,+m.y||1)}
    else if(m.t==='c'){var n=String(m.n).slice(0,14),x=String(m.x).slice(0,160);addChat(n,x);bcast({t:'c',n:n,x:x})}});
   cn.on('close',function(){conns=conns.filter(function(x){return x!==cn});if(cn.rock)cn.rock.human=false;addChat('',(cn.nm||'A player')+' left');mpMsg('Room code: '+c+'. Players: '+(conns.length+1))})})})}
function joinGame(){setName();var code=jc.value.trim().toUpperCase();if(!code){mpMsg('Type the room code first.');return}mpMsg('Joining '+code+'...');
 mkPeer(undefined,function(){var cn=peer.connect('rockrumble-'+code);hostConn=cn;
  cn.on('open',function(){mp=true;cli=true;cn.send({t:'hi',n:sv.name||'Rock'});mpMsg('Connected to '+code+'. Waiting for the host to press Play...');addChat('','Connected to room '+code)});
  cn.on('data',onHost);
  cn.on('close',function(){mpMsg('Disconnected from host.');mp=false;cli=false;if(run){run=false;endHud();ov.classList.remove('hide')}})})}
function onHost(m){
 if(m.t==='c')addChat(m.n,m.x);
 else if(m.t==='no')mpMsg('Room is full or already playing.');
 else if(m.t==='st'){myId=m.id;cli=true;start(m)}
 else if(m.t==='s'&&run&&byId.length){t=m.tm;arenaR=m.ar;bladeA=m.ba;m.r.forEach(function(d,id){var r=byId[id];if(!r)return;if(r.tx===undefined){r.x=d[0];r.y=d[1]}r.tx=d[0];r.ty=d[1];r.vx=d[2];r.vy=d[3];r.hp=d[4];var was=r.alive;r.alive=!!(d[5]&1);if(d[5]&2){if(!r.fall)r.fall=.001}else r.fall=0;r.dash=(d[5]&4)?.3:0;if(r===R[0]&&was&&!r.alive&&!r.outShown){r.outShown=1;pop('YOU ARE OUT!')}})}
 else if(m.t==='ko'){kos++;kosEl.textContent=kos;try{localStorage.setItem('rr-kos',kos)}catch(e){}sv.pts+=5;earned+=5;save();pop('KO! +5')}
 else if(m.t==='end'){var win=m.w===myId;finish(win);document.getElementById('msg').textContent=win?'You win!':(m.nm||'Nobody')+' wins!'}}
function mpBegin(){R[0].nm=sv.name||'Rock';
 conns.forEach(function(cn,k){var r=R[k+1];r.human=true;r.conn=cn;cn.rock=r;r.nm=cn.nm||'Player';r.ix=r.iy=0;tag(r,r.nm)});
 var names=R.map(function(r){return r.nm||'Bot'}),spec={ti:THEMES.indexOf(theme),N:N,o:obs.filter(function(o){return o.p}).map(function(o){return{x:Math.round(o.x),y:Math.round(o.y),r:Math.round(o.r)}})};
 conns.forEach(function(cn,k){if(cn.open)cn.send({t:'st',id:k+1,spec:spec,names:names})})}
function sendSnap(){var m={t:'s',tm:t,ar:arenaR,ba:bladeA,r:R.map(function(r){return[Math.round(r.x*10)/10,Math.round(r.y*10)/10,Math.round(r.vx),Math.round(r.vy),Math.round(r.hp),(r.alive?1:0)|(r.fall?2:0)|(r.dash>0?4:0)]})};bcast(m)}
function finishMP(wn){bcast({t:'end',w:wn?wn.id:-1,nm:wn?wn.nm||'A bot':''});var win=wn===R[0];finish(win);document.getElementById('msg').textContent=wn?(win?'You win!':(wn.nm||'A bot')+' wins!'):'Nobody wins.'}
function tag(r,name){var c=document.createElement('canvas');c.width=256;c.height=64;var g=c.getContext('2d');g.font='bold 36px Fredoka,Trebuchet MS,sans-serif';g.textAlign='center';g.lineWidth=6;g.strokeStyle='#000';g.fillStyle='#fff';g.strokeText(name,128,44);g.fillText(name,128,44);
 var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));sp.scale.set(2.6,.65,1);sp.position.y=.55;sp.renderOrder=12;r.bar.add(sp)}
function cloop(ts){if(!run)return;var dt=Math.min(.05,(ts-last)/1000);last=ts;cstep(dt);render();if(run)requestAnimationFrame(cloop)}
function cstep(dt){var p=R[0],ax=0,ay=0,fx=Math.sin(camH),fy=Math.cos(camH),fw=(keys.ArrowUp||keys.w?1:0)-(keys.ArrowDown||keys.s?1:0),rt=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0);
 camH+=((keys.e?1:0)-(keys.q?1:0))*1.8*dt;t+=dt;bladeA+=(1.1+Math.min(.9,t*.012))*dt;
 if(!fw&&!rt&&(tmx||tmy)){fw=-tmy;rt=tmx}
 if(fw||rt){ax=fw*fx-rt*fy;ay=fw*fy+rt*fx;var l=Math.hypot(ax,ay);ax/=l;ay/=l;p.dx=ax;p.dy=ay}else{p.dx=fx;p.dy=fy}
 if(hostConn&&hostConn.open&&++snapN%2===0)hostConn.send({t:'i',x:ax,y:ay});
 R.forEach(function(r){if(r.tx!==undefined){var k=Math.min(1,dt*14);r.x+=(r.tx-r.x)*k;r.y+=(r.ty-r.y)*k}
  if(r.fall>0)r.fall+=dt;r.rot+=(r.vx+r.vy)*dt*.01;if(r!==p){var sp=Math.hypot(r.vx,r.vy);if(sp>20){r.dx=r.vx/sp;r.dy=r.vy/sp}}});
 count()}
document.getElementById('hostB').addEventListener('click',hostGame);document.getElementById('joinB').addEventListener('click',joinGame);
function hurt(v,at){v.hcd=.45;v.lh=at;if(v.you&&admin)return;v.hp=Math.max(0,v.hp-(at.you?(admin?100:1+up.dash):1));burst(v.x,v.y,0xff5050,4);snd(220,.1,'square',.08);if(v.hp<=0)die(v,1)}
function die(r,byHp){if(r.fall||!r.alive)return;
 if(r.you&&(revs>0||admin)){if(!admin)revs--;r.x=CX;r.y=CY;r.vx=r.vy=0;r.hp=100;pop('PHOENIX REVIVE!');snd(700,.5,'triangle',.12);shake=8;for(var q2=0;q2<20;q2++)burst(r.x,r.y,0xffd24a,1);return}
 if(!r.you){snd(160,.5,'sawtooth',.1);if(r.lh&&r.lh.human&&r.lh.conn&&r.lh.conn.open)r.lh.conn.send({t:'ko'});if(r.lh===R[0]&&R[0].alive){kos++;kosEl.textContent=kos;try{localStorage.setItem('rr-kos',kos)}catch(e){}pop(['KO!','SMASHED!','BONK!','ROCKED!'][Math.floor(Math.random()*4)]+' +5');sv.pts+=5;earned+=5;save();slow=.4}}
 if(byHp){if(r.you)out=R.filter(function(o){return o.alive&&!o.fall&&o!==r}).length+1;r.alive=false;shake=6;for(var z=0;z<26;z++)burst(r.x,r.y,0xcfc4b8,1);count()}else r.fall=.001}
function doHook(){var p=R[0];if(!run||cli||!up.hook||(hkCd>0&&!admin)||!p.alive||p.fall)return;var best=null,bd=1e9;
 R.forEach(function(r){if(r===p||!r.alive||r.fall)return;var d=Math.hypot(r.x-p.x,r.y-p.y);if(d<bd){bd=d;best=r}});
 if(!best||bd>900+500*up.hook){snd(100,.1,'square',.05);return}
 best.lh=p;hk={t:.35,r:best};hkCd=Math.max(1.2,5-.7*up.hook);snd(500,.25,'sawtooth',.08)}
if(!window.THREE){document.getElementById('msg').textContent='The 3D engine could not load. Check your connection and reload.';document.getElementById('go').classList.add('hide');return}
var COLS=[0xc9b79c,0x9fb4c7,0xb79fc7,0xa6c79f,0xc79f9f,0xc7c09f];
var THEMES=[
 {name:'Lava Pit',kind:'rock',bg:0x2a0d06,base:'#b82a0c',g1:'rgba(255,190,60,.9)',g0:'rgba(255,90,20,0)',light:0xff5a14,side:0x4a413a,tint:0xffffff,flow:1},
 {name:'School Desk',kind:'desk',N:4,bg:0x9db8cc,base:'#d8cfae',g1:'#8aa0b4',light:0xffe9b0,side:0x7a5230,tint:0xffc98a},
 {name:'The Blender',kind:'blender',N:48,bg:0x4a1030,base:'#c2305e',g1:'rgba(255,200,220,.9)',g0:'rgba(255,90,140,0)',light:0xff7aa8,side:0xb8d8e4,tint:0xdfe8ff,flow:1}];
var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,.75,.1,400);
var ren=new THREE.WebGLRenderer({antialias:true});ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;
ren.domElement.className='gl';wrap.insertBefore(ren.domElement,wrap.firstChild);
function size(){var w=wrap.clientWidth,h=wrap.clientHeight;ren.setPixelRatio(Math.min(devicePixelRatio||1,2));ren.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();
scene.add(new THREE.AmbientLight(0xffd9b0,.6));
var sun=new THREE.DirectionalLight(0xfff0dd,.95);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
var sc=sun.shadow.camera;sc.left=-24;sc.right=24;sc.top=24;sc.bottom=-24;sc.near=1;sc.far=70;scene.add(sun,sun.target);
var glowL=new THREE.PointLight(0xff5a14,1.6,60);scene.add(glowL);
function tex(w,fn){var c=document.createElement('canvas');c.width=c.height=w;fn(c.getContext('2d'),w);return new THREE.CanvasTexture(c)}
var lava=new THREE.Mesh(new THREE.PlaneGeometry(700,700),new THREE.MeshBasicMaterial());lava.rotation.x=-Math.PI/2;lava.position.y=-4;scene.add(lava);
var arena=new THREE.Mesh(new THREE.CylinderGeometry(1,.8,3,48),[new THREE.MeshStandardMaterial({color:0x4a413a,flatShading:true}),new THREE.MeshStandardMaterial(),new THREE.MeshStandardMaterial({color:0x2a2420})]);
arena.position.y=-1.5;arena.receiveShadow=true;scene.add(arena);
var rg=new THREE.Group(),og=new THREE.Group();scene.add(rg,og);
var hLine=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1,6).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:0x7fd6ff}));hLine.visible=false;scene.add(hLine);
var eyeG=new THREE.SphereGeometry(1,12,10),whiteM=new THREE.MeshStandardMaterial({color:0xffffff}),blackM=new THREE.MeshStandardMaterial({color:0x111111}),browM=new THREE.MeshStandardMaterial({color:0x222222});
var ringM=new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
var rockG=new THREE.IcosahedronGeometry(1,1);
function b64buf(b){var s=atob(b),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u.buffer}
var rockGs=(window.ROCK_MESHES||[]).map(function(m){var p=new Int16Array(b64buf(m.p)),f=new Float32Array(p.length);for(var k=0;k<p.length;k++)f[k]=p[k]/8000;var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(f,3));g.setIndex(new THREE.BufferAttribute(new Uint16Array(b64buf(m.i)),1));g.computeVertexNormals();return g});
if(!rockGs.length)rockGs=[rockG];
var ground=new THREE.TextureLoader().load(window.GROUND_PNG||'');ground.wrapS=ground.wrapT=THREE.RepeatWrapping;ground.repeat.set(5,5);arena.material[1].map=ground;
function hash(v){var s=Math.sin(v.x*12.9898+v.y*78.233+v.z*37.719)*43758.5453;return s-Math.floor(s)}
(function(){var p=rockG.attributes.position,v=new THREE.Vector3();for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);var s=.82+.34*hash(v.clone().normalize().multiplyScalar(3));p.setXYZ(i,v.x*s,v.y*s*.88,v.z*s)}rockG.computeVertexNormals()})();
var R,obs=[],parts=[],t,run,arenaR,shake,keys={},nx0=0,ny0=0,hasPtr=false,out,last=0,camH=Math.PI,camT=new THREE.Vector3(),N=48,NX=[],NY=[],COSP=1,OFF=0,bladeA=0,blade=null,theme;
var rc=new THREE.Raycaster(),gp=new THREE.Plane(new THREE.Vector3(0,1,0),0),v2=new THREE.Vector2(),hit=new THREE.Vector3();
function mkProp(kind,rad){var q=rad*K,m,mt=function(c){return new THREE.MeshStandardMaterial({color:c,flatShading:true})};
 if(kind==='rock'){m=new THREE.Mesh(rockGs[Math.floor(Math.random()*rockGs.length)],mt(0x6a625a));m.scale.setScalar(q*1.1);m.position.y=q*.8;m.rotation.y=Math.random()*6}
 else if(kind==='blender'){m=new THREE.Mesh(new THREE.SphereGeometry(q,16,12),new THREE.MeshStandardMaterial({color:[0xe03a4a,0xff9a2a,0x9bd13a][Math.floor(Math.random()*3)],roughness:.5}));m.position.y=q}
 else if(Math.random()<.5){m=new THREE.Group();var b=new THREE.Mesh(new THREE.CylinderGeometry(q*.8,q*.8,5,6),mt(0xf4c430)),c=new THREE.Mesh(new THREE.ConeGeometry(q*.8,1.2,6),mt(0xe8c9a0));b.position.y=2.5;c.position.y=5.6;m.add(b,c)}
 else{m=new THREE.Mesh(new THREE.BoxGeometry(q*2.4,q*1.4,q*1.6),mt(0xff9aa8));m.position.y=q*.7}
 return m}
function buildMap(spec){
 theme=THEMES[spec?spec.ti:Math.floor(Math.random()*THEMES.length)];
 N=spec?spec.N:(theme.N||[48,6,8,5,4][Math.floor(Math.random()*5)]);COSP=Math.cos(Math.PI/N);AR0=1875/COSP;OFF=N===4?Math.PI/4:0;NX=[];NY=[];
 for(var k=0;k<N;k++){var a=(k+.5)*6.2832/N+OFF;NX.push(Math.sin(a));NY.push(Math.cos(a))}
 arena.geometry.dispose();arena.geometry=new THREE.CylinderGeometry(1,.8,3,N);arena.rotation.y=OFF;
 var old=lava.material.map,desk=theme.kind==='desk';
 lava.material.map=tex(256,function(g,w){g.fillStyle=theme.base;g.fillRect(0,0,w,w);
  if(desk){g.fillStyle=theme.g1;g.fillRect(0,0,w/2,w/2);g.fillRect(w/2,w/2,w/2,w/2);return}
  for(var i=0;i<60;i++){var x=Math.random()*w,y=Math.random()*w,r=10+Math.random()*30,gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,theme.g1);gr.addColorStop(1,theme.g0);g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}});
 lava.material.map.wrapS=lava.material.map.wrapT=THREE.RepeatWrapping;lava.material.map.repeat.set(desk?24:10,desk?24:10);lava.material.needsUpdate=true;if(old)old.dispose();
 arena.material[0].color.setHex(theme.side);arena.material[1].color.setHex(theme.tint);
 scene.background=new THREE.Color(theme.bg);scene.fog=new THREE.Fog(theme.bg,45,140);glowL.color.setHex(theme.light);
 while(og.children.length)og.remove(og.children[0]);obs=[];blade=null;bladeA=0;
 var bl=theme.kind==='blender';
 if(bl){blade=new THREE.Group();var bmt=new THREE.MeshStandardMaterial({color:0xc9d3dc,roughness:.3});
  var arm=new THREE.Mesh(new THREE.BoxGeometry(41.6,.5,2.4),bmt),hub=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.2,2,16),bmt);arm.position.y=hub.position.y=.8;blade.add(arm,hub);blade.traverse(function(o){o.castShadow=true});og.add(blade);
  obs.push({x:CX,y:CY,r:80});for(var sg=-1;sg<=1;sg+=2)for(var d2=120;d2<=480;d2+=120)obs.push({x:CX+sg*d2,y:CY,r:40,bl:sg*d2})}
 var ap0=AR0*COSP,cnt=spec?0:(bl?6:3+Math.floor(Math.random()*5));
 for(var i=0;i<cnt;i++)for(var tries=0;tries<12;tries++){
  var a2=Math.random()*6.28,d=bl?650+Math.random()*350:300+Math.random()*(.5*ap0-300),rad=bl?50+Math.random()*35:35+Math.random()*35,px=CX+Math.cos(a2)*d,py=CY+Math.sin(a2)*d,ok=true;
  obs.forEach(function(o){if(Math.hypot(o.x-px,o.y-py)<o.r+rad+30)ok=false});
  if(!ok)continue;
  var m=mkProp(theme.kind,rad);m.position.x=(px-CX)*K;m.position.z=(py-CY)*K;m.traverse(function(o){o.castShadow=o.receiveShadow=true});og.add(m);obs.push({x:px,y:py,r:rad,p:1});break}
 if(spec)spec.o.forEach(function(q){var m=mkProp(theme.kind,q.r);m.position.x=(q.x-CX)*K;m.position.z=(q.y-CY)*K;m.traverse(function(o){o.castShadow=o.receiveShadow=true});og.add(m);obs.push({x:q.x,y:q.y,r:q.r,p:1})})
}
function edge(x,y){var ax=x-CX,ay=y-CY,m=-1e9;for(var k=0;k<N;k++){var d=ax*NX[k]+ay*NY[k];if(d>m)m=d}return m-arenaR*COSP}
function mk(i,you,ring){var a=you?Math.PI/2:(i-1)/(TOTAL-1)*6.283-.4,r=you?26:22,rr=r*K,g=new THREE.Group();
 var mat=new THREE.MeshStandardMaterial({color:you?rk.c:COLS[i%COLS.length],flatShading:true,roughness:.9,emissive:0xff8a20,emissiveIntensity:0});
 var body=new THREE.Mesh(rockGs[you?0:i%rockGs.length],mat);body.scale.set(rr,rr,rr);body.castShadow=true;g.add(body);
 var face=new THREE.Group();g.add(face);
 [-1,1].forEach(function(s){var w=new THREE.Mesh(eyeG,whiteM);w.scale.setScalar(rr*.3);w.position.set(s*rr*.38,rr*.28,rr*.82);face.add(w);
  var b=new THREE.Mesh(eyeG,blackM);b.scale.setScalar(rr*.15);b.position.set(s*rr*.38,rr*.28,rr*1.07);face.add(b);
  var br=new THREE.Mesh(new THREE.BoxGeometry(rr*.5,rr*.08,rr*.08),browM);br.position.set(s*rr*.38,rr*.62,rr*.85);br.rotation.z=-s*.45;face.add(br)});
 if(you){var rg2=new THREE.Mesh(new THREE.RingGeometry(rr*1.25,rr*1.5,32),ringM);rg2.rotation.x=-Math.PI/2;rg2.position.y=-rr*.72;g.add(rg2)}
 var bar=new THREE.Group(),bgm=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.22),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.6,depthTest:false})),fl=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.14),new THREE.MeshBasicMaterial({color:0x58d26b,depthTest:false}));fl.position.z=.01;bgm.renderOrder=10;fl.renderOrder=11;bar.add(bgm,fl);rg.add(bar);
 if(you){mat.colorWrite=false;mat.depthWrite=false;face.visible=false;g.children.forEach(function(c){if(c.geometry&&c.geometry.type==='RingGeometry')c.visible=false})}
 rg.add(g);var bm=r*r/576*(you?PM:1);
 return{x:CX+Math.cos(a)*ring,y:CY+Math.sin(a)*ring,vx:0,vy:0,r:r,bm:bm,m:bm,you:you,dash:0,cd:0,fall:0,alive:true,rot:Math.random()*6,aiT:2+Math.random()*3,dx:0,dy:-1,g:g,body:body,face:face,mat:mat,rr:rr,hp:100,hcd:0,bar:bar,fl:fl}}
function reset(m){earned=0;up=admin?ADM:sv.up;cp=0;rk=ROCKS[sv.sel];PM=(1+.12*up.arm)*rk.mass;revs=up.rev;hkCd=0;hk={t:0,r:null};while(rg.children.length)rg.remove(rg.children[0]);parts.forEach(function(p){scene.remove(p.m)});parts=[];if(orb){scene.remove(orb.m);orb=null}pw=0;orbT=5;slow=0;
 buildMap(m&&m.spec);arenaR=AR0;var ring=arenaR*COSP*.6;
 R=[];for(var i=0;i<TOTAL;i++){var k2=mk(i,m?i===m.id:i===0,m?0:ring);k2.id=i;if(m&&i!==m.id&&m.names[i]!=='Bot'){k2.nm=m.names[i];tag(k2,k2.nm)}R.push(k2)}byId=R.slice();if(m)R=[byId[m.id]].concat(byId.filter(function(r,i){return i!==m.id}));
 t=0;shake=0;out=0;camH=Math.PI;hasPtr=false;snapC=true;render();count()}
function count(){var n=0;R.forEach(function(r){if(r.alive&&!r.fall)n++});leftEl.textContent=n;return n}
function pt(e){var b=ren.domElement.getBoundingClientRect();nx0=(e.clientX-b.left)/b.width*2-1;ny0=-((e.clientY-b.top)/b.height)*2+1;hasPtr=true}
var cp=0,tch={},tmx=0,tmy=0,admin=false,nameTag='',nm=document.getElementById('nm'),ADM={dash:5,cool:5,spd:5,arm:5,hook:5,rev:3},xhB=document.getElementById('xh');
nm.value=sv.name||'';
function setName(){sv.name=nm.value.trim().slice(0,14);admin=sv.name.toLowerCase()==='tartar';nameTag=(admin?'ADMIN ':'')+(sv.name||'Rock')+'  ';save()}
wrap.addEventListener('pointerdown',function(e){
 if(e.pointerType==='mouse'){if(run&&!document.pointerLockElement&&wrap.requestPointerLock){try{wrap.requestPointerLock()}catch(x){}}return}
 tch[e.pointerId]={x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,mv:e.clientX<innerWidth/2}});
wrap.addEventListener('pointermove',function(e){if(!run)return;
 if(e.pointerType==='mouse'){if(document.pointerLockElement===wrap||e.buttons){camH-=e.movementX*.0025;cp=Math.max(-.9,Math.min(.9,cp-e.movementY*.0025))}return}
 var c=tch[e.pointerId];if(!c)return;
 if(c.mv){var dx=e.clientX-c.x,dy=e.clientY-c.y,l=Math.hypot(dx,dy);if(l>12){var k=Math.min(1,l/60)/l;tmx=dx*k;tmy=dy*k}else{tmx=tmy=0}}
 else{camH-=(e.clientX-c.lx)*.006;cp=Math.max(-.9,Math.min(.9,cp-(e.clientY-c.ly)*.006));c.lx=e.clientX;c.ly=e.clientY}});
function pup(e){var c=tch[e.pointerId];if(c&&c.mv)tmx=tmy=0;delete tch[e.pointerId]}
wrap.addEventListener('pointerup',pup);wrap.addEventListener('pointercancel',pup);
function doDash(r,dx,dy){if(cli){if(r===R[0]&&hostConn&&hostConn.open){hostConn.send({t:'d',x:dx,y:dy});snd(340,.2,'sawtooth',.07)}return}if((r.cd>0&&!(r.you&&admin))||r.fall)return;if(!r.you&&!r.human){var j=(Math.random()-.5)*.7,c=Math.cos(j),s=Math.sin(j),nx=dx*c-dy*s;dy=dx*s+dy*c;dx=nx}
 var l=Math.hypot(dx,dy)||1,imp=r.you?1500*(1+.25*up.dash)*rk.dsh:(r.human?1100:700*DM[diff]);r.vx+=dx/l*imp;r.vy+=dy/l*imp;r.dash=r.you||r.human?.35:.28;r.dashT=1.3;r.cd=r.you?.9*Math.pow(.88,up.cool):(r.human?1:1.8/DM[diff]);r.m=r.bm*(r.you||r.human?4:2.6);burst(r.x,r.y,0xffb347,8);snd(r.you?340:260,.2,'sawtooth',.07)}
dashB.addEventListener('pointerdown',function(e){e.stopPropagation();var p=R[0];doDash(p,p.dx,p.dy)});
addEventListener('keydown',function(e){if(e.target&&e.target.tagName==='INPUT')return;if(e.key==='Enter'&&run){ci.focus();if(document.exitPointerLock)document.exitPointerLock();e.preventDefault();return}keys[e.key]=1;if(e.key===' '&&run){e.preventDefault();var p=R[0];doDash(p,p.dx,p.dy)}if(e.key==='Enter'&&!run&&!cli&&shopEl.classList.contains('hide'))start();if((e.key==='g'||e.key==='G')&&run)doHook();if(e.key==='m'||e.key==='M')toggleMusic();if((e.key==='s'||e.key==='S'||e.key==='ArrowDown')&&!e.repeat)brake()});
addEventListener('keyup',function(e){keys[e.key]=0});
var pg=new THREE.TetrahedronGeometry(.16);
function burst(px,py,c,n){for(var i=0;i<n&&parts.length<90;i++){var a=Math.random()*6.28,s=(40+Math.random()*140)*K;
 var m=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({color:c}));m.position.set((px-CX)*K,.8,(py-CY)*K);scene.add(m);
 parts.push({m:m,vx:Math.cos(a)*s,vz:Math.sin(a)*s,vy:2+Math.random()*4,l:.7})}}
function step(dt){
 t+=dt;shake=Math.max(0,shake-dt*30);
 if(t>8)arenaR=Math.max(AR0*.35,AR0-(t-8)*AR0/80);
 var alive=R.filter(function(r){return r.alive&&!r.fall});
 var fx=Math.sin(camH),fy=Math.cos(camH);
 R.forEach(function(r){
  if(!r.alive)return;
  r.cd=Math.max(0,r.cd-dt);r.hcd=Math.max(0,r.hcd-dt);r.dashT=Math.max(0,(r.dashT||0)-dt);r.dash=Math.max(0,r.dash-dt);if(r.dash<=0)r.m=r.bm;else burst(r.x,r.y,0xffb347,1);
  if(r.fall>0){r.fall+=dt;r.x+=r.vx*dt*.3;r.y+=r.vy*dt*.3;if(r.fall>.9){r.alive=false;if(r.you)out=alive.length+1;burst(r.x,r.y,0xff6a2b,14);count()}return}
  var ax=0,ay=0,acc=700*DM[diff];
  if(r.you){acc=1100*(1+.1*up.spd)*rk.spd*(admin?1.6:1);
   var fw=(keys.ArrowUp||keys.w?1:0)-(keys.ArrowDown||keys.s?1:0),rt=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0);
   if(!fw&&!rt&&(tmx||tmy)){fw=-tmy;rt=tmx}if(fw||rt){ax=fw*fx-rt*fy;ay=fw*fy+rt*fx;var l0=Math.hypot(ax,ay);ax/=l0;ay/=l0}
   else if(hasPtr){v2.set(nx0,ny0);rc.setFromCamera(v2,cam);
    if(rc.ray.intersectPlane(gp,hit)){var px=hit.x/K+CX-r.x,py=hit.z/K+CY-r.y,pl=Math.hypot(px,py);if(pl>16){ax=px/pl;ay=py/pl}}
    else{ax=fx;ay=fy}}
   if(ax||ay){var l=Math.hypot(ax,ay);r.dx=ax/l;r.dy=ay/l}else{r.dx=fx;r.dy=fy}
  }else if(r.human){ax=r.ix||0;ay=r.iy||0;acc=900;if(ax||ay){r.dx=ax;r.dy=ay}}else{
   var best=null,bd=1e9;alive.forEach(function(o){if(o!==r){var d=Math.hypot(o.x-r.x,o.y-r.y);if(d<bd){bd=d;best=o}}});
   if(best){var px=best.x-r.x,py=best.y-r.y,pl=bd||1;ax=px/pl;ay=py/pl;r.dx=ax;r.dy=ay;
    var ed=edge(r.x,r.y);
    if(ed>-90){var cx=CX-r.x,cy=CY-r.y,cl=Math.hypot(cx,cy)||1;ax=cx/cl;ay=cy/cl}
    r.aiT-=dt;if(bd<100&&r.aiT<=0&&ed<-70){doDash(r,px/pl,py/pl);r.aiT=(2.5+Math.random()*2.5)/DM[diff]}}
  }
  r.vx+=ax*acc*dt;r.vy+=ay*acc*dt;
  var f=Math.exp(-2.2*dt);r.vx*=f;r.vy*=f;r.x+=r.vx*dt;r.y+=r.vy*dt;
  r.rot+=(r.vx+r.vy)*dt*.01;
  if(edge(r.x,r.y)>r.r*.4)die(r)
 });
 hkCd=Math.max(0,hkCd-dt);
 if(blade){var bw=1.1+Math.min(.9,t*.012),ca,sa;bladeA+=bw*dt;ca=Math.cos(bladeA);sa=Math.sin(bladeA);obs.forEach(function(o){if(o.bl!==undefined){o.x=CX+o.bl*ca;o.y=CY+o.bl*sa;o.vx=-o.bl*bw*sa;o.vy=o.bl*bw*ca}})}
 if(hk.t>0){hk.t-=dt;var hp=R[0],hq=hk.r;if(hq&&hq.alive&&!hq.fall&&hp.alive){var hx=hq.x-hp.x,hy=hq.y-hp.y,hd=Math.hypot(hx,hy)||1,gx=hp.x+hx/hd*(hp.r+hq.r+8),gy=hp.y+hy/hd*(hp.r+hq.r+8),hf=1-Math.exp(-14*dt);hq.x+=(gx-hq.x)*hf;hq.y+=(gy-hq.y)*hf;hq.vx=hq.vy=0}}
 for(var i=0;i<R.length;i++){var a=R[i];if(!a.alive||a.fall)continue;
  for(var j=i+1;j<R.length;j++){var b=R[j];if(!b.alive||b.fall)continue;
   var dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),mr=a.r+b.r;
   if(d<mr&&d>0){var nx=dx/d,ny=dy/d,ov2=mr-d,tm=a.m+b.m;
    a.x-=nx*ov2*b.m/tm;a.y-=ny*ov2*b.m/tm;b.x+=nx*ov2*a.m/tm;b.y+=ny*ov2*a.m/tm;
    var vn=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
    if(vn<0){var jj=-(1.25)*vn/(1/a.m+1/b.m);a.vx-=jj*nx/a.m;a.vy-=jj*ny/a.m;b.vx+=jj*nx/b.m;b.vy+=jj*ny/b.m;
     if(-vn>60){a.lh=b;b.lh=a}if(a.dash>0&&b.hcd<=0)hurt(b,a);if(b.dash>0&&a.hcd<=0)hurt(a,b);if(-vn>150){shake=Math.min(8,-vn/60);burst((a.x+b.x)/2,(a.y+b.y)/2,0xfff1c9,6);snd(110+Math.random()*60,.15,'square',.1);if(-vn>380)slow=.12}}}}
  obs.forEach(function(o){var dx=a.x-o.x,dy=a.y-o.y,d=Math.hypot(dx,dy),mr=a.r+o.r;
   if(d<mr&&d>0){var nx=dx/d,ny=dy/d;a.x=o.x+nx*mr;a.y=o.y+ny*mr;var vn=a.vx*nx+a.vy*ny;if(vn<0){a.vx-=1.8*vn*nx;a.vy-=1.8*vn*ny;if(-vn>150)burst(a.x,a.y,0xcfc4b8,4)}if(o.vx!==undefined){a.vx+=o.vx*.9;a.vy+=o.vy*.9;if(a.hcd<=0){a.hcd=.5;if(!(a.you&&admin))a.hp=Math.max(0,a.hp-3);burst(a.x,a.y,0xff5050,6);snd(300,.1,'square',.1);if(a.hp<=0)die(a,1)}}}})}
 for(i=parts.length-1;i>=0;i--){var p=parts[i];p.m.position.x+=p.vx*dt;p.m.position.z+=p.vz*dt;p.vy-=14*dt;p.m.position.y+=p.vy*dt;p.m.rotation.x+=dt*8;p.l-=dt;if(p.l<=0){scene.remove(p.m);parts.splice(i,1)}}
 if(Math.random()<dt*14&&parts.length<80){var ea=Math.random()*6.28,ed2=(arenaR+200+Math.random()*800)*K,em=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({color:theme.light}));em.position.set(Math.cos(ea)*ed2,-3.5,Math.sin(ea)*ed2);scene.add(em);parts.push({m:em,vx:0,vz:0,vy:5+Math.random()*7,l:1.6})}
 var pr=R[0];camH+=((keys.e?1:0)-(keys.q?1:0))*1.8*dt;
 if(pw>0){pw-=dt;if(pw<=0){pr.g.scale.setScalar(1);pr.r=26;pr.bm=676/576*PM}}
 orbT-=dt;if(!(mp&&conns.length)&&!orb&&orbT<=0&&pr.alive){var oa=Math.random()*6.28,od=Math.random()*arenaR*COSP*.55,ox=CX+Math.cos(oa)*od,oy=CY+Math.sin(oa)*od,okk=true;obs.forEach(function(o){if(Math.hypot(o.x-ox,o.y-oy)<o.r+30)okk=false});
  if(okk){var ty2=Math.random()<.5?0:1,om=new THREE.Mesh(new THREE.OctahedronGeometry(.9),new THREE.MeshBasicMaterial({color:ty2?0xff3c3c:0xc060ff}));om.position.set((ox-CX)*K,1.2,(oy-CY)*K);scene.add(om);orb={m:om,x:ox,y:oy,t:ty2,life:25}}orbT=4}
 if(orb){orb.life-=dt;orb.m.rotation.y+=dt*3;orb.m.position.y=1.2+Math.sin(t*4)*.25;
  if(pr.alive&&!pr.fall&&Math.hypot(pr.x-orb.x,pr.y-orb.y)<pr.r+70){grab(orb.t);scene.remove(orb.m);orb=null}
  else if(orb.life<=0||edge(orb.x,orb.y)>-40){scene.remove(orb.m);orb=null}}
 var n=count();
 if(mp&&conns.length){if(!pr.alive&&!pr.outShown){pr.outShown=1;pop('YOU ARE OUT!')}if(n<=1)finishMP(R.filter(function(o){return o.alive&&!o.fall})[0])}else if(!pr.alive){finish(false)}else if(n<=1&&!pr.fall){finish(true)}
}
function drawRadar(){
 rx.clearRect(0,0,192,192);var sc2=88/AR0,fx=Math.sin(camH),fy=Math.cos(camH),cx=96,cy=96;
 function map(x,y){var wx=x-CX,wz=y-CY;return[cx+(wx*-fy+wz*fx)*sc2,cy-(wx*fx+wz*fy)*sc2]}
 rx.strokeStyle='rgba(255,255,255,.55)';rx.lineWidth=2;rx.beginPath();
 for(var k=0;k<=N;k++){var a=k*6.2832/N,p=map(CX+Math.sin(a)*arenaR,CY+Math.cos(a)*arenaR);k?rx.lineTo(p[0],p[1]):rx.moveTo(p[0],p[1])}rx.stroke();
 rx.fillStyle='#8a7d72';obs.forEach(function(o){var p=map(o.x,o.y);rx.beginPath();rx.arc(p[0],p[1],o.r*sc2,0,6.28);rx.fill()});
 R.forEach(function(r){if(!r.alive||r.fall)return;var p=map(r.x,r.y);rx.fillStyle=r.you?'#ffcf70':'#ff6a6a';rx.beginPath();rx.arc(p[0],p[1],r.you?7:5,0,6.28);rx.fill()});
}
function render(){
 var s=arenaR*K;arena.scale.set(s,1,s);
 if(theme.flow){lava.material.map.offset.x=t*.02;lava.material.map.offset.y=t*.012}if(blade)blade.rotation.y=-bladeA;glowL.intensity=1.5+.3*Math.sin(t*5);
 R.forEach(function(r){var g=r.g;if(!r.alive){g.visible=false;r.bar.visible=false;return}
  var f=r.fall;g.position.set((r.x-CX)*K,r.rr*.8*g.scale.x-f*f*7,(r.y-CY)*K);g.rotation.z=f*1.4;g.rotation.x=f*.8;
  r.body.rotation.y=r.rot;r.body.rotation.x=r.rot*.6;
  r.face.rotation.y=Math.atan2(r.dx,r.dy);
  r.mat.emissiveIntensity=r.dash>0?.9:(r.you?rk.gl:0);var bv=r.fall===0&&!r.you;r.bar.visible=bv;if(bv){r.bar.position.set(g.position.x,g.position.y+r.rr*1.9*g.scale.x+.5,g.position.z);r.bar.quaternion.copy(cam.quaternion);var fr=Math.max(.001,r.hp/100);r.fl.scale.x=fr;r.fl.position.x=-.8*(1-fr);r.fl.material.color.setHSL(fr*.33,.8,.5)}});
 var p0=R[0].g.position,gs=R[0].g.scale.x,fx=Math.sin(camH),fz=Math.cos(camH),cpv=Math.cos(cp),sx=shake?(Math.random()-.5)*shake*.06:0,ey=p0.y+.5*gs;
 camT.set(p0.x,0,p0.z);cam.position.set(p0.x+sx,ey,p0.z);cam.lookAt(p0.x+fx*cpv,ey+Math.sin(cp),p0.z+fz*cpv);cam.updateMatrixWorld();
 cam.fov+=((R[0].dash>0?95:75)-cam.fov)*.2;cam.updateProjectionMatrix();
 sun.position.set(camT.x+8,22,camT.z+8);sun.target.position.set(camT.x,0,camT.z);glowL.position.set(camT.x,-2.5,camT.z);
 if(R[0].alive)dashB.classList.toggle('cd',R[0].cd>0);hookB.classList.toggle('cd',hkCd>0);hpf.style.width=R[0].hp+'%';hpt.textContent=nameTag+Math.ceil(R[0].hp)+' HP';
 if(hk.t>0&&hk.r&&hk.r.alive){var A=R[0].g.position,B=hk.r.g.position;hLine.visible=true;hLine.position.set((A.x+B.x)/2,(A.y+B.y)/2,(A.z+B.z)/2);hLine.lookAt(B);hLine.scale.z=A.distanceTo(B)}else hLine.visible=false;
 drawRadar();ren.render(scene,cam)}
function loop(ts){if(!run)return;var dt=Math.min(.05,(ts-last)/1000);last=ts;if(slow>0){slow-=dt;dt*=.25}step(dt);render();if(mp&&!cli&&conns.length&&++snapN%3===0)sendSnap();if(run)requestAnimationFrame(loop)}
function start(m){setName();try{if(wrap.requestPointerLock&&!('ontouchstart' in window))wrap.requestPointerLock()}catch(e){}playMusic();snd(400,.1,'triangle',.05);reset(m&&m.spec?m:null);pop((admin?'ADMIN: ':'')+theme.name);if(mp&&!cli)mpBegin();ov.classList.add('hide');dashB.classList.remove('hide');brkB.classList.remove('hide');radar.classList.remove('hide');if(up.hook&&!cli)hookB.classList.remove('hide');hpb.classList.remove('hide');xhB.classList.remove('hide');run=true;last=performance.now();requestAnimationFrame(cli?cloop:loop)}
function finish(win){run=false;dashB.classList.add('hide');brkB.classList.add('hide');radar.classList.add('hide');hookB.classList.add('hide');hpb.classList.add('hide');xhB.classList.add('hide');
 snd(win?660:90,.6,'triangle',.12);if(win){sv.pts+=10;earned+=10;wins++;winsEl.textContent=wins;try{localStorage.setItem('rr-wins',wins)}catch(e){}}
 document.getElementById('ttl').textContent=win?'Last rock standing!':'Into the lava!';
 document.getElementById('msg').textContent=win?'You knocked out every rival. Take a bow, boulder.':'You finished '+(out||2)+' of '+TOTAL+'. Dash at rivals when they’re near the edge.';
 document.getElementById('sub').textContent='Earned '+earned+' points this match. Wins: '+wins+'.';save();upd();
 document.getElementById('go').textContent=win?'Rumble again':'Try again';ov.classList.remove('hide');render()}
document.getElementById('go').addEventListener('click',function(){if(cli){mpMsg('Waiting for the host to press Play...');return}start()});
document.getElementById('dif').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;diff=+b.dataset.d;[].forEach.call(this.children,function(c){c.classList.toggle('sel',c===b)})});
shopEl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 if(b.id==='back'){shopEl.classList.add('hide');ov.classList.remove('hide');upd();return}
 if(b.dataset.r!==undefined){var i=+b.dataset.r,r=ROCKS[i];if(sv.own.indexOf(i)<0){if(!admin&&sv.pts<r.p){snd(100,.2,'square',.08);return}if(!admin)sv.pts-=r.p;sv.own.push(i)}sv.sel=i}
 else if(b.dataset.u!==undefined){var u=UPS[+b.dataset.u],l=sv.up[u[0]],c=u[4]*(l+1);if(l>=u[3]||(!admin&&sv.pts<c)){snd(100,.2,'square',.08);return}if(!admin)sv.pts-=c;sv.up[u[0]]++}
 snd(600,.15,'triangle',.08);save();shop()});
document.getElementById('shopB').addEventListener('click',function(){setName();ov.classList.add('hide');shopEl.classList.remove('hide');shop()});
hookB.addEventListener('pointerdown',function(e){e.stopPropagation();doHook()});
upd();
reset();
})();
