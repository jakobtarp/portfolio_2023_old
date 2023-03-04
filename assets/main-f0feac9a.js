(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Wt(t,e){t.indexOf(e)===-1&&t.push(e)}const xt=(t,e,n)=>Math.min(Math.max(n,t),e),y={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},T=t=>typeof t=="number",P=t=>Array.isArray(t)&&!T(t[0]),Rt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function Ft(t,e){return P(t)?t[Rt(0,t.length,e)]:t}const wt=(t,e,n)=>-n*t+n*e+t,bt=()=>{},w=t=>t,K=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function Et(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=K(0,e,i);t.push(wt(n,1,s))}}function Ot(t){const e=[0];return Et(e,t-1),e}function St(t,e=Ot(t.length),n=w){const i=t.length,s=i-e.length;return s>0&&Et(e,s),r=>{let o=0;for(;o<i-2&&!(r<e[o+1]);o++);let a=xt(0,1,K(e[o],e[o+1],r));return a=Ft(n,o)(a),wt(t[o],t[o+1],a)}}const At=t=>Array.isArray(t)&&T(t[0]),Q=t=>typeof t=="object"&&Boolean(t.createAnimation),b=t=>typeof t=="function",it=t=>typeof t=="string",H={ms:t=>t*1e3,s:t=>t/1e3};function Ht(t,e){return e?t*(1e3/e):0}const Tt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,qt=1e-7,Vt=12;function _t(t,e,n,i,s){let r,o,a=0;do o=e+(n-e)/2,r=Tt(o,i,s)-t,r>0?n=o:e=o;while(Math.abs(r)>qt&&++a<Vt);return o}function F(t,e,n,i){if(t===e&&n===i)return w;const s=r=>_t(r,0,1,t,n);return r=>r===0||r===1?r:Tt(s(r),e,i)}const jt=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return xt(0,1,s/t)},ct={ease:F(.25,.1,.25,1),"ease-in":F(.42,0,1,1),"ease-in-out":F(.42,0,.58,1),"ease-out":F(0,0,.58,1)},$t=/\((.*?)\)/;function Y(t){if(b(t))return t;if(At(t))return F(...t);if(ct[t])return ct[t];if(t.startsWith("steps")){const e=$t.exec(t);if(e){const n=e[1].split(",");return jt(parseFloat(n[0]),n[1].trim())}}return w}class zt{constructor(e,n=[0,1],{easing:i,duration:s=y.duration,delay:r=y.delay,endDelay:o=y.endDelay,repeat:a=y.repeat,offset:f,direction:l="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=w,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((d,c)=>{this.resolve=d,this.reject=c}),i=i||y.easing,Q(i)){const d=i.createAnimation(n);i=d.easing,n=d.keyframes||n,s=d.duration||s}this.repeat=a,this.easing=P(i)?w:Y(i),this.updateDuration(s);const u=St(n,f,P(i)?i.map(Y):w);this.tick=d=>{var c;r=r;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(d-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const I=m/this.duration;let D=Math.floor(I),E=I%1;!E&&I>=1&&(E=1),E===1&&D--;const _=D%2;(l==="reverse"||l==="alternate"&&_||l==="alternate-reverse"&&!_)&&(E=1-E);const M=m>=this.totalDuration?1:Math.min(E,1),z=u(this.easing(M));e(z),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+o)?(this.playState="finished",(c=this.resolve)===null||c===void 0||c.call(this,z)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Bt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const G=new WeakMap;function Lt(t){return G.has(t)||G.set(t,{transforms:[],values:new Map}),G.get(t)}function Ct(t,e){return t.has(e)||t.set(e,new Bt),t.get(e)}const Nt=["","X","Y","Z"],Ut=["translate","scale","rotate","skew"],U={x:"translateX",y:"translateY",z:"translateZ"},lt={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},kt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:lt,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:w},skew:lt},V=new Map,st=t=>`--motion-${t}`,k=["x","y","z"];Ut.forEach(t=>{Nt.forEach(e=>{k.push(t+e),V.set(st(t+e),kt[t])})});const Kt=(t,e)=>k.indexOf(t)-k.indexOf(e),Gt=new Set(k),Pt=t=>Gt.has(t),Xt=(t,e)=>{U[e]&&(e=U[e]);const{transforms:n}=Lt(t);Wt(n,e),t.style.transform=Zt(n)},Zt=t=>t.sort(Kt).reduce(Jt,"").trim(),Jt=(t,e)=>`${t} ${e}(var(${st(e)}))`,tt=t=>t.startsWith("--"),ut=new Set;function Qt(t){if(!ut.has(t)){ut.add(t);try{const{syntax:e,initialValue:n}=V.has(t)?V.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const X=(t,e)=>document.createElement("div").animate(t,e),ft={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{X({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(X({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{X({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Z={},L={};for(const t in ft)L[t]=()=>(Z[t]===void 0&&(Z[t]=ft[t]()),Z[t]);const Yt=.015,te=(t,e)=>{let n="";const i=Math.round(e/Yt);for(let s=0;s<i;s++)n+=t(K(0,i-1,s))+", ";return n.substring(0,n.length-2)},dt=(t,e)=>b(t)?L.linearEasing()?`linear(${te(t,e)})`:y.easing:At(t)?ee(t):t,ee=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function ne(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const ie=t=>Array.isArray(t)?t:[t];function et(t){return U[t]&&(t=U[t]),Pt(t)?st(t):t}const B={get:(t,e)=>{e=et(e);let n=tt(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=V.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=et(e),tt(e)?t.style.setProperty(e,n):t.style[e]=n}};function It(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function se(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||w;const s=t[t.length-1];if(it(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=o=>o+r)}return i}function re(){return window.__MOTION_DEV_TOOLS_RECORD}function oe(t,e,n,i={},s){const r=re(),o=i.record!==!1&&r;let a,{duration:f=y.duration,delay:l=y.delay,endDelay:u=y.endDelay,repeat:d=y.repeat,easing:c=y.easing,persist:m=!1,direction:I,offset:D,allowWebkitAcceleration:E=!1}=i;const _=Lt(t),M=Pt(e);let z=L.waapi();M&&Xt(t,e);const v=et(e),j=Ct(_.values,v),O=V.get(v);return It(j.animation,!(Q(c)&&j.generator)&&i.record!==!1),()=>{const $=()=>{var h,W;return(W=(h=B.get(t,v))!==null&&h!==void 0?h:O==null?void 0:O.initialValue)!==null&&W!==void 0?W:0};let p=ne(ie(n),$);const at=se(p,O);if(Q(c)){const h=c.createAnimation(p,e!=="opacity",$,v,j);c=h.easing,p=h.keyframes||p,f=h.duration||f}if(tt(v)&&(L.cssRegisterProperty()?Qt(v):z=!1),M&&!L.linearEasing()&&(b(c)||P(c)&&c.some(b))&&(z=!1),z){O&&(p=p.map(A=>T(A)?O.toDefaultUnit(A):A)),p.length===1&&(!L.partialKeyframes()||o)&&p.unshift($());const h={delay:H.ms(l),duration:H.ms(f),endDelay:H.ms(u),easing:P(c)?void 0:dt(c,f),direction:I,iterations:d+1,fill:"both"};a=t.animate({[v]:p,offset:D,easing:P(c)?c.map(A=>dt(A,f)):void 0},h),a.finished||(a.finished=new Promise((A,Mt)=>{a.onfinish=A,a.oncancel=Mt}));const W=p[p.length-1];a.finished.then(()=>{m||(B.set(t,v,W),a.cancel())}).catch(bt),E||(a.playbackRate=1.000001)}else if(s&&M)p=p.map(h=>typeof h=="string"?parseFloat(h):h),p.length===1&&p.unshift(parseFloat($())),a=new s(h=>{B.set(t,v,at?at(h):h)},p,Object.assign(Object.assign({},i),{duration:f,easing:c}));else{const h=p[p.length-1];B.set(t,v,O&&T(h)?O.toDefaultUnit(h):h)}return o&&r(t,e,p,{duration:f,delay:l,easing:c,repeat:d,offset:D},"motion-one"),j.setAnimation(a),a}}const ae=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function rt(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const ce=t=>t(),Dt=(t,e,n=y.duration)=>new Proxy({animations:t.map(ce).filter(Boolean),duration:n,options:e},ue),le=t=>t.animations[0],ue={get:(t,e)=>{const n=le(t);switch(e){case"duration":return t.duration;case"currentTime":return H.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(fe)).catch(bt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>It(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=H.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},fe=t=>t.finished;function ht(t=.1,{start:e=0,from:n=0,easing:i}={}){return(s,r)=>{const o=T(n)?n:de(n,r),a=Math.abs(o-s);let f=t*a;if(i){const l=r*t;f=Y(i)(f/l)*l}return e+f}}function de(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function he(t,e,n){return b(t)?t(e,n):t}function ge(t){return function(n,i,s={}){n=rt(n);const r=n.length,o=[];for(let a=0;a<r;a++){const f=n[a];for(const l in i){const u=ae(s,l);u.delay=he(u.delay,a,r);const d=oe(f,l,i[l],u,t);o.push(d)}}return Dt(o,s,s.duration)}}const pe=ge(zt);function me(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}const ye={any:0,all:1};function x(t,e,{root:n,margin:i,amount:s="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const r=rt(t),o=new WeakMap,a=l=>{l.forEach(u=>{const d=o.get(u.target);if(u.isIntersecting!==Boolean(d))if(u.isIntersecting){const c=e(u);b(c)?o.set(u.target,c):f.unobserve(u.target)}else d&&(d(u),o.delete(u.target))})},f=new IntersectionObserver(a,{root:n,rootMargin:i,threshold:typeof s=="number"?s:ye[s]});return r.forEach(l=>f.observe(l)),()=>f.disconnect()}const C=new WeakMap;let S;function ve(t,e){if(e){const{inlineSize:n,blockSize:i}=e[0];return{width:n,height:i}}else return t instanceof SVGElement&&"getBBox"in t?t.getBBox():{width:t.offsetWidth,height:t.offsetHeight}}function xe({target:t,contentRect:e,borderBoxSize:n}){var i;(i=C.get(t))===null||i===void 0||i.forEach(s=>{s({target:t,contentSize:e,get size(){return ve(t,n)}})})}function we(t){t.forEach(xe)}function be(){typeof ResizeObserver>"u"||(S=new ResizeObserver(we))}function Ee(t,e){S||be();const n=rt(t);return n.forEach(i=>{let s=C.get(i);s||(s=new Set,C.set(i,s)),s.add(e),S==null||S.observe(i)}),()=>{n.forEach(i=>{const s=C.get(i);s==null||s.delete(e),s!=null&&s.size||S==null||S.unobserve(i)})}}const N=new Set;let q;function Oe(){q=()=>{const t={width:window.innerWidth,height:window.innerHeight},e={target:window,size:t,contentSize:t};N.forEach(n=>n(e))},window.addEventListener("resize",q)}function Se(t){return N.add(t),q||Oe(),()=>{N.delete(t),!N.size&&q&&(q=void 0)}}function Ae(t,e){return b(t)?Se(t):Ee(t,e)}const Te=50,gt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),ze=()=>({time:0,x:gt(),y:gt()}),Le={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function pt(t,e,n,i){const s=n[e],{length:r,position:o}=Le[e],a=s.current,f=n.time;s.current=t["scroll"+o],s.scrollLength=t["scroll"+r]-t["client"+r],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=K(0,s.scrollLength,s.current);const l=i-f;s.velocity=l>Te?0:Ht(s.current-a,l)}function Pe(t,e,n){pt(t,"x",e,n),pt(t,"y",e,n),e.time=n}function Ie(t,e){let n={x:0,y:0},i=t;for(;i&&i!==e;)if(i instanceof HTMLElement)n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if(i instanceof SVGGraphicsElement&&"getBBox"in i){const{top:s,left:r}=i.getBBox();for(n.x+=r,n.y+=s;i&&i.tagName!=="svg";)i=i.parentNode}return n}const De={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},nt={start:0,center:.5,end:1};function mt(t,e,n=0){let i=0;if(nt[t]!==void 0&&(t=nt[t]),it(t)){const s=parseFloat(t);t.endsWith("px")?i=s:t.endsWith("%")?t=s/100:t.endsWith("vw")?i=s/100*document.documentElement.clientWidth:t.endsWith("vh")?i=s/100*document.documentElement.clientHeight:t=s}return T(t)&&(i=e*t),n+i}const Me=[0,0];function We(t,e,n,i){let s=Array.isArray(t)?t:Me,r=0,o=0;return T(t)?s=[t,t]:it(t)&&(t=t.trim(),t.includes(" ")?s=t.split(" "):s=[t,nt[t]?t:"0"]),r=mt(s[0],n,i),o=mt(s[1],e),r-o}const Re={x:0,y:0};function Fe(t,e,n){let{offset:i=De.All}=n;const{target:s=t,axis:r="y"}=n,o=r==="y"?"height":"width",a=s!==t?Ie(s,t):Re,f=s===t?{width:t.scrollWidth,height:t.scrollHeight}:{width:s.clientWidth,height:s.clientHeight},l={width:t.clientWidth,height:t.clientHeight};e[r].offset.length=0;let u=!e[r].interpolate;const d=i.length;for(let c=0;c<d;c++){const m=We(i[c],l[o],f[o],a[r]);!u&&m!==e[r].interpolatorOffsets[c]&&(u=!0),e[r].offset[c]=m}u&&(e[r].interpolate=St(Ot(d),e[r].offset),e[r].interpolatorOffsets=[...e[r].offset]),e[r].progress=e[r].interpolate(e[r].current)}function He(t,e=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,e!==t){let i=e;for(;i&&i!=t;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=e===t?e.scrollWidth:e.clientWidth,n.y.targetLength=e===t?e.scrollHeight:e.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function qe(t,e,n,i={}){const s=i.axis||"y";return{measure:()=>He(t,i.target,n),update:r=>{Pe(t,n,r),(i.offset||i.target)&&Fe(t,n,i)},notify:b(e)?()=>e(n):Ve(e,n[s])}}function Ve(t,e){return t.pause(),t.forEachNative((n,{easing:i})=>{var s,r;if(n.updateDuration)i||(n.easing=w),n.updateDuration(1);else{const o={duration:1e3};i||(o.easing="linear"),(r=(s=n.effect)===null||s===void 0?void 0:s.updateTiming)===null||r===void 0||r.call(s,o)}}),()=>{t.currentTime=e.progress}}const R=new WeakMap,yt=new WeakMap,J=new WeakMap,vt=t=>t===document.documentElement?window:t;function ot(t,e={}){var{container:n=document.documentElement}=e,i=me(e,["container"]);let s=J.get(n);s||(s=new Set,J.set(n,s));const r=ze(),o=qe(n,t,r,i);if(s.add(o),!R.has(n)){const l=()=>{const d=performance.now();for(const c of s)c.measure();for(const c of s)c.update(d);for(const c of s)c.notify()};R.set(n,l);const u=vt(n);window.addEventListener("resize",l,{passive:!0}),n!==document.documentElement&&yt.set(n,Ae(n,l)),u.addEventListener("scroll",l,{passive:!0})}const a=R.get(n),f=requestAnimationFrame(a);return()=>{var l;typeof t!="function"&&t.stop(),cancelAnimationFrame(f);const u=J.get(n);if(!u||(u.delete(o),u.size))return;const d=R.get(n);R.delete(n),d&&(vt(n).removeEventListener("scroll",d),(l=yt.get(n))===null||l===void 0||l(),window.removeEventListener("resize",d))}}function _e(t,e={}){return Dt([()=>{const n=new zt(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function g(t,e,n){return(b(t)?_e:pe)(t,e,n)}x(".tracking-in-expand",()=>{g(".tracking-in-expand",{x:[-2e3,0]},{duration:2})});x(".fotogalleryinview",({target:t})=>(g(t.querySelectorAll("img"),{x:[-2e3,0]},{duration:1,delay:ht(1,{start:.25})}),()=>{g(t.querySelectorAll("img"),{x:[-2e3,0]},{duration:1,delay:ht(1,{start:.25})})}));x(".mangeelementerinview",()=>{g(".mangeelementer1",{x:[-2e3,0]},{duration:3}),g(".mangeelementer2",{x:[-1500,0]},{duration:3}),g(".mangeelementer3",{x:[-1e3,0]},{duration:3}),g(".mangeelementer4",{x:[-3e3,0]},{duration:5}),g(".mangeelementer5",{x:[-2e3,0]},{duration:2}),g(".mangeelementer6",{x:[2e3,0]},{duration:2})});x(".box7",()=>{g("box7",{opacity:[0,1]},{duration:7})});g("body",{opacity:[0,1]},{duration:4});x(".box1",()=>{g(".box1",{x:[-2e3,0]},{duration:2})});x(".box2",()=>{g(".box2",{x:[2e3,0]},{duration:2})});x(".box3",()=>{g(".box3",{x:[-2e3,0]},{duration:3})});x(".box4",()=>{g(".box4",{x:[-3e3,0]},{duration:3})});x(".box5",()=>{g(".box5",{x:[-4e3,0]},{duration:3})});x(".box6",()=>{g(".box6",{x:[-4e3,0]},{duration:4})});ot(g(".progress",{strokeDasharray:["0,1","1,1"]}));ot(g(".scrollzoomimg",{scale:[1,1.5]}),{target:document.querySelector(".scrollzoom"),offset:["0.5 0.5","1 1"]});const je=document.querySelectorAll("#horisontalliste li");ot(g("#horisontalliste",{transform:["none",`translateX(-${je.length-1}00vw)`]}),{target:document.querySelector("#horisontalscrollsection")});