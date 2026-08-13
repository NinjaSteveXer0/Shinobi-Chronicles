// -----------------------------
// game.js
// Full file — replace your existing game.js with this version.
// Restores Login, Journey, Difficulty, Village, Ninja pages and integrates with index.html.
// -----------------------------

const $ = (id) => document.getElementById(id);
const qsa = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

/* -----------------------------
   Page / Modal management
   ----------------------------- */
function showPage(pageId) {
  const known = ["login-page","journey-page","difficulty-page","village-page","ninja-page"];
  // If pageId corresponds to a modal (login-page) toggle its active class
  const target = $(pageId);
  if (!target) {
    // fallback: if login requested but element missing, do nothing
    if (pageId === "login-page") {
      const modal = $("login-page");
      if (modal) modal.classList.add("active");
    }
    return;
  }
  // Hide all known page-panels and remove modal active class
  known.forEach(id => {
    const el = $(id);
    if (!el) return;
    if (id === "login-page") {
      el.classList.toggle("active", id === pageId);
    } else {
      el.classList.toggle("active", id === pageId);
    }
  });
}

/* -----------------------------
   Authentication
   ----------------------------- */
function login() {
  const userEl = $("username");
  const passEl = $("password");
  const user = userEl ? userEl.value.trim() : "";
  const pass = passEl ? passEl.value.trim() : "";

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  try { localStorage.setItem("player_username", user); } catch(e){}
  const modal = $("login-page");
  if (modal) modal.classList.remove("active");

  // Show journey page
  const journey = $("journey-page");
  if (journey) showPage("journey-page");
  else console.log("Login successful for", user);
}

function register() {
  const userEl = $("username");
  const passEl = $("password");
  const user = userEl ? userEl.value.trim() : "";
  const pass = passEl ? passEl.value.trim() : "";

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  try { localStorage.setItem("player_username", user); } catch(e){}
  alert("Registration successful!");
  const modal = $("login-page");
  if (modal) modal.classList.remove("active");
  if ($("journey-page")) showPage("journey-page");
}

/* -----------------------------
   Navigation helpers
   ----------------------------- */
function goToDifficulty() {
  // Our redesigned index uses the main UI; ensure journey page hidden and difficulty UI visible
  // We'll show the difficulty UI by focusing the ranks area and ensuring journey-page is hidden
  const journey = $("journey-page");
  if (journey) journey.classList.remove("active");
  // No separate difficulty-page element in this layout; keep UI visible
  const ranks = $("ranks");
  if (ranks) ranks.scrollIntoView({behavior:"smooth", block:"center"});
}

function goBackToJourney() {
  if ($("journey-page")) showPage("journey-page");
  else {
    // fallback: close login modal if open
    const modal = $("login-page");
    if (modal) modal.classList.remove("active");
  }
}

function goBackToLogin() {
  const modal = $("login-page");
  if (modal) modal.classList.add("active");
  else if ($("journey-page")) showPage("journey-page");
}

function goBackToDifficulty() {
  // Focus ranks area
  const ranks = $("ranks");
  if (ranks) ranks.scrollIntoView({behavior:"smooth", block:"center"});
}

function goBackToVillage() {
  if ($("village-page")) showPage("village-page");
  else {
    const ranks = $("ranks");
    if (ranks) ranks.scrollIntoView({behavior:"smooth", block:"center"});
  }
}

/* -----------------------------
   Difficulty selection
   ----------------------------- */
const GameState = {
  selectedDifficulty: null,
  availableLevels: ["academy","genin","chunin","specialjonin","jonin","anbu","akatsuki","jinchuriki"]
};

function selectDifficulty(level) {
  if (!level) return;
  level = String(level);

  if (!GameState.availableLevels.includes(level)) {
    console.warn("Unknown difficulty level:", level);
    GameState.selectedDifficulty = level;
  } else {
    GameState.selectedDifficulty = level;
  }

  try { localStorage.setItem("selectedDifficulty", GameState.selectedDifficulty); } catch(e){}

  // Update UI hint
  const selectedNameEl = $("selected-name");
  if (selectedNameEl) {
    const card = document.querySelector(`.rank[data-level="${level}"]`);
    const name = card ? (card.querySelector('.name')?.textContent || level) : level;
    selectedNameEl.textContent = name;
  }

  // Move to village page if present
  if ($("village-page")) showPage("village-page");
  else console.log("Difficulty selected:", level);
}

/* -----------------------------
   Initialization: wire preview, cards, and start button
   ----------------------------- */
(function initUI(){
  try {
    const saved = localStorage.getItem("selectedDifficulty");
    if (saved) GameState.selectedDifficulty = saved;
  } catch(e){}

  const cards = qsa('.rank');
  const previewImg = $("preview-img");
  const selectedNameEl = $("selected-name");
  const startBtn = $("start-btn");

  // If an animated GIF exists at the recommended path, prefer it
  (function preferGif(){
    const gifPath = 'assets/cards/shadow_ninja.gif';
    // Attempt to load the GIF by creating an Image and checking onload/onerror
    const img = new Image();
    img.onload = function(){ if(previewImg) previewImg.src = gifPath; };
    img.onerror = function(){ /* keep default */ };
    img.src = gifPath;
  })();

  function setPreviewFromCard(card) {
    if (!card) return;
    const level = card.dataset.level || 'genin';
    const art = card.querySelector('.card-art');
    if (art && previewImg) previewImg.src = art.src;
    const name = card.querySelector('.name')?.textContent || level;
    if (selectedNameEl) selectedNameEl.textContent = name;
    if (startBtn) startBtn.onclick = () => selectDifficulty(level);
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => setPreviewFromCard(card));
    card.addEventListener('click', () => {
      qsa('.rank').forEach(r => r.style.outline = 'none');
      card.style.outline = '3px solid rgba(255,43,43,0.14)';
      if (card.classList.contains('locked')) {
        const wants = confirm("This is a paid difficulty. Would you like to unlock it?");
        if (wants) {
          card.classList.remove('locked');
          alert("Unlocked for demo purposes.");
        } else {
          return;
        }
      }
      setPreviewFromCard(card);
      const level = card.dataset.level;
      if (level) {
        GameState.selectedDifficulty = level;
        try { localStorage.setItem("selectedDifficulty", level); } catch(e){}
      }
    });
  });

  // Initialize preview from saved selection or first available card
  let initialCard = null;
  if (GameState.selectedDifficulty) {
    initialCard = document.querySelector(`.rank[data-level="${GameState.selectedDifficulty}"]`);
  }
  if (!initialCard) initialCard = document.querySelector('.rank:not(.locked)') || cards[0];
  if (initialCard) setTimeout(() => setPreviewFromCard(initialCard), 40);

  // Expose small API for debugging
  window.__gameState = GameState;
})();

/* -----------------------------
   Positioning helper for diagonal path (keeps original responsive behavior)
   ----------------------------- */
(function positionRanks(){
  const order = ['academy','genin','chunin','specialjonin','jonin','anbu','kage'];
  function getVar(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function setPositions(){
    const canvas = document.getElementById('path-canvas');
    if(!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const anchorLeftPct = 14;
    const anchorTopPct  = 92;
    const stepHPct = 9.5;
    const stepVPct = 13;
    const anchorLeftPx = anchorLeftPct/100 * rect.width;
    const anchorTopPx  = anchorTopPct/100 * rect.height;
    const stepHPx = stepHPct/100 * rect.width;
    const stepVPx = stepVPct/100 * rect.height;
    order.forEach((id, idx) => {
      const el = document.getElementById(id);
      if(!el) return;
      const leftPx = anchorLeftPx + idx * stepHPx;
      const topPx  = anchorTopPx  - idx * stepVPx;
      el.style.left = (leftPx / rect.width) * 100 + '%';
      el.style.top  = (topPx  / rect.height) * 100 + '%';
      const img = el.querySelector('.card-art');
      if(img) img.style.width = '100%';
    });
    // Paid offsets for akatsuki/jinchuriki if present
    const ak = document.getElementById('akatsuki');
    if(ak){
      ak.style.left = '86%';
      ak.style.top = '12%';
    }
    const ji = document.getElementById('jinchuriki');
    if(ji){
      ji.style.left = '92%';
      ji.style.top = '8%';
    }
  }
  window.addEventListener('resize', setPositions);
  window.addEventListener('load', ()=> setTimeout(setPositions, 60));
  document.querySelectorAll('.card-art').forEach(img => { if(!img.complete) img.addEventListener('load', setPositions); });
  setPositions();
})();

/* -----------------------------
   Accessibility helpers
   ----------------------------- */
(function accessibilityHelpers(){
  const ranks = qsa('.rank');
  ranks.forEach((r, idx) => {
    r.setAttribute('tabindex', '0');
    r.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        r.click();
      }
      if (ev.key === 'ArrowRight') {
        const next = ranks[idx+1] || ranks[0];
        next?.focus();
      }
      if (ev.key === 'ArrowLeft') {
        const prev = ranks[idx-1] || ranks[ranks.length-1];
        prev?.focus();
      }
    });
  });
})();

/* -----------------------------
   Exported functions for compatibility
   ----------------------------- */
window.login = login;
window.register = register;
window.goToDifficulty = goToDifficulty;
window.goBackToJourney = goBackToJourney;
window.goBackToLogin = goBackToLogin;
window.selectDifficulty = selectDifficulty;
window.goBackToDifficulty = goBackToDifficulty;
window.goBackToVillage = goBackToVillage;
