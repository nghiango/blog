(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6098)}])},8045:function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,r=!1,o=void 0;try{for(var a,c=t[Symbol.iterator]();!(i=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(s){r=!0,o=s}finally{try{i||null==c.return||c.return()}finally{if(r)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}e.default=function(t){var e=t.src,n=t.sizes,o=t.unoptimized,l=void 0!==o&&o,u=t.priority,f=void 0!==u&&u,p=t.loading,v=t.lazyBoundary,w=void 0===v?"200px":v,x=t.className,j=t.quality,A=t.width,k=t.height,z=t.objectFit,E=t.objectPosition,N=t.onLoadingComplete,I=t.loader,P=void 0===I?_:I,D=t.placeholder,R=void 0===D?"empty":D,L=t.blurDataURL,q=function(t,e){if(null==t)return{};var n,i,r=function(t,e){if(null==t)return{};var n,i,r={},o=Object.keys(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(i=0;i<o.length;i++)n=o[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}(t,["src","sizes","unoptimized","priority","loading","lazyBoundary","className","quality","width","height","objectFit","objectPosition","onLoadingComplete","loader","placeholder","blurDataURL"]),B=n?"responsive":"intrinsic";"layout"in q&&(q.layout&&(B=q.layout),delete q.layout);var C="";if(function(t){return"object"===typeof t&&(b(t)||function(t){return void 0!==t.src}(t))}(e)){var W=b(e)?e.default:e;if(!W.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(W)));if(L=L||W.blurDataURL,C=W.src,(!B||"fill"!==B)&&(k=k||W.height,A=A||W.width,!W.height||!W.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(W)))}e="string"===typeof e?e:C;var M=O(A),H=O(k),T=O(j),U=!f&&("lazy"===p||"undefined"===typeof p);(e.startsWith("data:")||e.startsWith("blob:"))&&(l=!0,U=!1);h.has(e)&&(U=!1);0;var F,V=r(d.useIntersection({rootMargin:w,disabled:!U}),2),G=V[0],J=V[1],X=!U||J,Q={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},K={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},Y=!1,Z={position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:z,objectPosition:E},$="blur"===R?{filter:"blur(20px)",backgroundSize:z||"cover",backgroundImage:'url("'.concat(L,'")'),backgroundPosition:E||"0% 0%"}:{};if("fill"===B)Q.display="block",Q.position="absolute",Q.top=0,Q.left=0,Q.bottom=0,Q.right=0;else if("undefined"!==typeof M&&"undefined"!==typeof H){var tt=H/M,et=isNaN(tt)?"100%":"".concat(100*tt,"%");"responsive"===B?(Q.display="block",Q.position="relative",Y=!0,K.paddingTop=et):"intrinsic"===B?(Q.display="inline-block",Q.position="relative",Q.maxWidth="100%",Y=!0,K.maxWidth="100%",F='<svg width="'.concat(M,'" height="').concat(H,'" xmlns="http://www.w3.org/2000/svg" version="1.1"/>')):"fixed"===B&&(Q.display="inline-block",Q.position="relative",Q.width=M,Q.height=H)}else 0;var nt={src:g,srcSet:void 0,sizes:void 0};X&&(nt=S({src:e,unoptimized:l,layout:B,width:M,quality:T,sizes:n,loader:P}));var it=e;0;0;var rt=(i(y={},"imagesrcset",nt.srcSet),i(y,"imagesizes",nt.sizes),y);return a.default.createElement("span",{style:Q},Y?a.default.createElement("span",{style:K},F?a.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:"data:image/svg+xml;base64,".concat(s.toBase64(F))}):null):null,a.default.createElement("img",Object.assign({},q,nt,{decoding:"async","data-nimg":B,className:x,ref:function(t){G(t),function(t,e,n,i,r){if(!t)return;var o=function(){t.src!==g&&("decode"in t?t.decode():Promise.resolve()).catch((function(){})).then((function(){if("blur"===i&&(t.style.filter="none",t.style.backgroundSize="none",t.style.backgroundImage="none"),h.add(e),r){var n=t.naturalWidth,o=t.naturalHeight;r({naturalWidth:n,naturalHeight:o})}}))};t.complete?o():t.onload=o}(t,it,0,R,N)},style:m({},Z,$)})),a.default.createElement("noscript",null,a.default.createElement("img",Object.assign({},q,S({src:e,unoptimized:l,layout:B,width:M,quality:T,sizes:n,loader:P}),{decoding:"async","data-nimg":B,style:Z,className:x,loading:p||"lazy"}))),f?a.default.createElement(c.default,null,a.default.createElement("link",Object.assign({key:"__nimg-"+nt.src+nt.srcSet+nt.sizes,rel:"preload",as:"image",href:nt.srcSet?void 0:nt.src},rt))):null)};var a=f(n(7294)),c=f(n(5443)),s=n(6978),l=n(5809),d=n(7190);function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){return t&&t.__esModule?t:{default:t}}function m(t){for(var e=arguments,n=function(n){var i=null!=e[n]?e[n]:{},r=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter((function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})))),r.forEach((function(e){u(t,e,i[e])}))},i=1;i<arguments.length;i++)n(i);return t}var h=new Set,g=(new Map,"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");var p=new Map([["default",function(t){var e=t.root,n=t.src,i=t.width,r=t.quality;0;return"".concat(e,"?url=").concat(encodeURIComponent(n),"&w=").concat(i,"&q=").concat(r||75)}],["imgix",function(t){var e=t.root,n=t.src,i=t.width,r=t.quality,o=new URL("".concat(e).concat(z(n))),a=o.searchParams;a.set("auto",a.get("auto")||"format"),a.set("fit",a.get("fit")||"max"),a.set("w",a.get("w")||i.toString()),r&&a.set("q",r.toString());return o.href}],["cloudinary",function(t){var e=t.root,n=t.src,i=t.width,r=t.quality,o=["f_auto","c_limit","w_"+i,"q_"+(r||"auto")].join(",")+"/";return"".concat(e).concat(o).concat(z(n))}],["akamai",function(t){var e=t.root,n=t.src,i=t.width;return"".concat(e).concat(z(n),"?imwidth=").concat(i)}],["custom",function(t){var e=t.src;throw new Error('Image with src "'.concat(e,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}]]);function b(t){return void 0!==t.default}var y,v={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"",loader:"akamai"}||l.imageConfigDefault,w=v.deviceSizes,x=v.imageSizes,j=v.loader,A=v.path,k=(v.domains,o(w).concat(o(x)));function S(t){var e=t.src,n=t.unoptimized,i=t.layout,r=t.width,a=t.quality,c=t.sizes,s=t.loader;if(n)return{src:e,srcSet:void 0,sizes:void 0};var l=function(t,e,n){if(n&&("fill"===e||"responsive"===e)){for(var i,r=/(^|\s)(1?\d?\d)vw/g,a=[];i=r.exec(n);i)a.push(parseInt(i[2]));if(a.length){var c,s=.01*(c=Math).min.apply(c,o(a));return{widths:k.filter((function(t){return t>=w[0]*s})),kind:"w"}}return{widths:k,kind:"w"}}return"number"!==typeof t||"fill"===e||"responsive"===e?{widths:w,kind:"w"}:{widths:o(new Set([t,2*t].map((function(t){return k.find((function(e){return e>=t}))||k[k.length-1]})))),kind:"x"}}(r,i,c),d=l.widths,u=l.kind,f=d.length-1;return{sizes:c||"w"!==u?c:"100vw",srcSet:d.map((function(t,n){return"".concat(s({src:e,quality:a,width:t})," ").concat("w"===u?t:n+1).concat(u)})).join(", "),src:s({src:e,quality:a,width:d[f]})}}function O(t){return"number"===typeof t?t:"string"===typeof t?parseInt(t,10):void 0}function _(t){var e=p.get(j);if(e)return e(m({root:A},t));throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(l.VALID_LOADERS.join(", "),". Received: ").concat(j))}function z(t){return"/"===t[0]?t.slice(1):t}w.sort((function(t,e){return t-e})),k.sort((function(t,e){return t-e}))},6978:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toBase64=function(t){return window.btoa(t)}},6098:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return s},default:function(){return l}});var i=n(5893),r=n(9008),o=n(1664),a=n(5675);function c(t){var e=t.card;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl mt-4 w-100 mx-2",children:[(0,i.jsx)("div",{className:"h-64 w-auto md:w-1/2",children:(0,i.jsx)(a.default,{alt:"test",className:"inset-0 h-full w-full object-cover object-center",style:{width:"100%"},src:"".concat(e.frontmatter.cover_image)})}),(0,i.jsxs)("div",{className:"w-full py-4 px-6 text-gray-800 flex flex-col justify-between",children:[(0,i.jsx)(o.default,{href:"".concat(e.link),passHref:!0,children:(0,i.jsx)("h3",{className:"font-semibold text-lg leading-tight truncate cursor-pointer",children:e.frontmatter.title})}),(0,i.jsx)("span",{className:"inline-flex w-fit justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded",children:e.frontmatter.tag}),(0,i.jsx)("p",{className:"mt-2",children:e.frontmatter.excerpt}),(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsxs)("p",{className:"text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2",children:[e.frontmatter.author," \u2022 ",e.frontmatter.date]}),(0,i.jsx)(o.default,{href:"".concat(e.link),passHref:!0,children:(0,i.jsx)("button",{className:"p-2 bg-white hover:bg-gray-600 hover:text-white border border-solid border-grey py-2",children:"Read More"})})]})]})]})})}var s=!0;function l(t){var e=t.posts;return(0,i.jsxs)("div",{children:[(0,i.jsx)(r.default,{children:(0,i.jsx)("title",{children:"Dev Blog"})}),(0,i.jsx)("div",{children:e.map((function(t,e){return(0,i.jsx)(c,{card:t},e)}))})]})}},5809:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.imageConfigDefault=e.VALID_LOADERS=void 0;e.VALID_LOADERS=["default","imgix","cloudinary","akamai","custom"];e.imageConfigDefault={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"]}},9008:function(t,e,n){t.exports=n(5443)},5675:function(t,e,n){t.exports=n(8045)}},function(t){t.O(0,[774,888,179],(function(){return e=8581,t(t.s=e);var e}));var e=t.O();_N_E=e}]);