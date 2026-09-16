// Issue #112 bootstrap: preserve the reviewed implementation as a core module,
// apply the live-runtime seam correction, then install the post-team Konoha
// onboarding bridge from Issue #209 on the same existing World surface.
(function(){
  "use strict";
  function load(src,onload){const s=document.createElement("script");s.src=src;s.async=false;if(onload)s.onload=onload;s.onerror=()=>console.error("SC World runtime module failed to load",src);document.head.appendChild(s);}
  load("runtime/alpha-world-konoha-112-core.js",()=>load("runtime/alpha-world-konoha-112-fix.js",()=>load("runtime/alpha-first-konoha-tutorial-35000.js")));
})();
