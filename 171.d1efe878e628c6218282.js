"use strict";(self.webpackChunkconway_life=self.webpackChunkconway_life||[]).push([[171],{439:(e,t,r)=>{r.d(t,{A:()=>c});var n=r(607);function o(e,t,r){return e[r%t]}function u(e,t,r,u){return(0,n.Gu)(o(e,t,u-r-1))+(0,n.Gu)(o(e,t,u-r))+(0,n.Gu)(o(e,t,u-r+1))+(0,n.Gu)(o(e,t,u-1))+(0,n.Gu)(o(e,t,u+1))+(0,n.Gu)(o(e,t,u+r-1))+(0,n.Gu)(o(e,t,u+r))+(0,n.Gu)(o(e,t,u+r+1))}function i(e,t,r){return(0,n.Gu)(e[r-t-1])+(0,n.Gu)(e[r-t])+(0,n.Gu)(e[r-t+1])+(0,n.Gu)(e[r-1])+(0,n.Gu)(e[r+1])+(0,n.Gu)(e[r+t-1])+(0,n.Gu)(e[r+t])+(0,n.Gu)(e[r+t+1])}function c(e,t,r,o){var c;for(c=0;c<r+1;c++)e[c]=(0,n.cU)(e[c],u(e,t,r,t+c));for(c=r+1;c<t-(r+1);c++)e[c]=(0,n.cU)(e[c],i(e,r,c));for(c=t-(r+1);c<t;c++)e[c]=(0,n.cU)(e[c],u(e,t,r,c));for(c=t;c--;)e[c]=(0,n.k9)(e[c],o)}},11:(e,t,r)=>{r.d(t,{A:()=>c});var n=r(29),o=r(901),u=r(439),i=r(607),c=function(){function e(t,r){(0,n.A)(this,e),this.sizeX=t.gridWidth,this.sizeY=t.gridHeight,this.length=this.sizeX*this.sizeY,this.rules=r}return(0,o.A)(e,[{key:"update",value:function(){(0,u.A)(this.cells,this.length,this.sizeX,this.rules)}},{key:"random",value:function(e){!function(e,t,r){for(var n=t;n--;)e[n]=(0,i.wb)(e[n],Math.random()+r>=1)}(this.cells,this.length,e)}},{key:"clear",value:function(){!function(e,t){for(var r=t;r--;)e[r]=(0,i.wb)(e[r],0)}(this.cells,this.length)}},{key:"indexToXy",value:function(e){return function(e,t,r){return{x:(r%=e)%t,y:Math.floor(r/t)}}(this.length,this.sizeX,e)}},{key:"xyToIndex",value:function(e,t){return function(e,t,r,n){return(t*n+r)%e}(this.length,this.sizeX,e,t)}}]),e}()},171:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var n=r(467),o=r(29),u=r(901),i=r(822),c=r(954),s=r(417),f=r(361),a=r(756),l=r.n(a);function h(){return new Worker(r.p+"grid-one-worker.worker.a1eb43f6e8a50eb3c4c4.worker.js")}function d(e,t,r){return t=(0,c.A)(t),(0,i.A)(e,p()?Reflect.construct(t,r||[],(0,c.A)(e).constructor):t.apply(e,r))}function p(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(p=function(){return!!e})()}var y=function(e){function t(e,r){var n;return(0,o.A)(this,t),(n=d(this,t,[e,r])).buffer=new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT*n.length),n.worker=new h,n.worker.postMessage({type:"init",buffer:n.buffer,board:e,rules:r}),n.cells=new Uint8Array(n.buffer),n.worker.addEventListener("message",n.onMessage.bind((0,s.A)(n))),n.onRender=null,n}var r;return(0,f.A)(t,e),(0,u.A)(t,[{key:"onMessage",value:function(e){var t=e.data.type,r=e.data;"render"===t&&this.onRender&&this.onRender(r)}},{key:"update",value:(r=(0,n.A)(l().mark((function e(){var t=this;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.worker.postMessage({type:"update"}),e.next=3,new Promise((function(e){t.onRender=e}));case 3:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})}]),t}(r(11).A)},417:(e,t,r)=>{function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}r.d(t,{A:()=>n})},954:(e,t,r)=>{function n(e){return n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}r.d(t,{A:()=>n})},361:(e,t,r)=>{function n(e,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},n(e,t)}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&n(e,t)}r.d(t,{A:()=>o})},822:(e,t,r)=>{r.d(t,{A:()=>u});var n=r(284),o=r(417);function u(e,t){if(t&&("object"===(0,n.A)(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,o.A)(e)}}}]);