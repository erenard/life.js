(()=>{"use strict";function t(t){return 1&t}function n(t,n){return 15&t|(15&n)<<4}function e(n,e){var s=(t(n)?e.s:e.b)[function(t){return(240&t)>>4}(n)];return function(t,n){return 241&t|(7&n)<<1}(n=function(t,n){return 254&t|1&n}(n,s),s*Math.min(function(t){return(14&t)>>1}(n)+1,7))}function s(t,n,e){return t[e%n]}function r(n,e,r,i){return t(s(n,e,i-r-1))+t(s(n,e,i-r))+t(s(n,e,i-r+1))+t(s(n,e,i-1))+t(s(n,e,i+1))+t(s(n,e,i+r-1))+t(s(n,e,i+r))+t(s(n,e,i+r+1))}function i(n,e,s){return t(n[s-e-1])+t(n[s-e])+t(n[s-e+1])+t(n[s-1])+t(n[s+1])+t(n[s+e-1])+t(n[s+e])+t(n[s+e+1])}const u=new class{constructor(){this.cells=null,this.sizeX=null,this.length=null,this.rules=null}onInit(t){this.cells=new Uint8Array(t.buffer),this.sizeX=t.board.gridWidth,this.length=t.board.gridWidth*t.board.gridHeight,this.rules=t.rules}onUpdate(t){!function(t,s,u,o){var l;for(l=0;l<u+1;l++)t[l]=n(t[l],r(t,s,u,s+l));for(l=u+1;l<s-(u+1);l++)t[l]=n(t[l],i(t,u,l));for(l=s-(u+1);l<s;l++)t[l]=n(t[l],r(t,s,u,l));for(l=s;l--;)t[l]=e(t[l],o)}(this.cells,this.length,this.sizeX,this.rules),postMessage({type:"render"})}onRules(t){this.rules=t.rules}onMessage(t){const n=t.data.type,e=t.data;switch(n){case"init":this.onInit(e);break;case"update":this.onUpdate(e);break;case"rules":this.onRules(e)}}};addEventListener("message",u.onMessage.bind(u))})();