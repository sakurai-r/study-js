(()=>{"use strict";const e=10,t=(t,n)=>{for(let l=0;l<50;l++)for(let o=0;o<50;o++){const r=t[l][o];n.beginPath(),n.rect(o*e,l*e,e,e),n.fillStyle=r?"black":"white",n.fill(),n.stroke()}},n=document.querySelector("#screen"),l=n.getContext("2d"),o=document.querySelector("#start"),r=document.querySelector("#pause");n.width=500,n.height=500;let c=null;const i=new Audio("./decision1.mp3");let a=new Array(50).fill(null).map((()=>new Array(50).fill(null).map((()=>!!Math.floor(2*Math.random())))));function u(){a=(e=>{const t=e.map((e=>[...e]));for(let n=0;n<50;n++)for(let l=0;l<50;l++){let o=0;n>0&&e[n-1][l]&&o++,n<49&&e[n+1][l]&&o++,l>0&&e[n][l-1]&&o++,l<49&&e[n][l+1]&&o++,n>0&&l>0&&e[n-1][l-1]&&o++,n>0&&l<49&&e[n-1][l+1]&&o++,n<49&&l>0&&e[n+1][l-1]&&o++,n<49&&l<49&&e[n+1][l+1]&&o++,e[n][l]?t[n][l]=2===o||3===o:t[n][l]=3===o}return t})(a),t(a,l),c=requestAnimationFrame(u)}n.addEventListener("click",(function(o){const r=n.getBoundingClientRect(),c=o.clientX-r.left,u=o.clientY-r.top,d=Math.floor(u/e),s=Math.floor(c/e);a[d][s]=!a[d][s],i.cloneNode().play(),t(a,l)})),o.addEventListener("click",(()=>{c||u()})),r.addEventListener("click",(()=>{c&&(cancelAnimationFrame(c),c=null)})),t(a,l)})();