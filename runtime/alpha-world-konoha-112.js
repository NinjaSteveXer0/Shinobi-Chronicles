// Issue #112 bootstrap: preserve the reviewed implementation as a core module, then apply the live-runtime seam correction.
(function(){
  "use strict";
  function load(src,onload){const s=document.createElement("script");s.src=src;s.async=false;if(onload)s.onload=onload;s.onerror=()=>console.error("SC #112 runtime module failed to load",src);document.head.appendChild(s);}
  load("runtime/alpha-world-konoha-112-core.js",()=>load("runtime/alpha-world-konoha-112-fix.js"));
})();
