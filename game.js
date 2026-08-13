// -----------------------------
// game.js
// Full file — replace your existing game.js with this version.
// Designed to work with the "Demon Night" index.html redesign.
// -----------------------------

/*
  Features
  - Robust page/show toggles that are tolerant if an element is missing.
  - Login / register stubs with basic validation.
  - Difficulty selection, preview wiring, and persistence to localStorage.
  - Safe no-op fallbacks so missing DOM elements won't throw errors.
  - Small utility helpers for cleaner code.
*/

/* -----------------------------
   Utility helpers
   ----------------------------- */
const $ = (id) => document.getElementById(id);
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function safeSetDisplay(id, display) {
  const el = $(id);
  if (el) el.style.display = display;
}

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

/* -----------------------------
   Page / Modal management
   -----------------------------
   The original game.js used page ids:
   - login-page
   - journey-page
   - difficulty-page
   - village-page
   - ninja-page
   This redesign uses a single main UI and a login modal.
   We keep the same function names for compatibility; they will
   gracefully no-op or toggle the login modal where appropriate.
*/
function showPage(pageId) {
  // If the element exists, show it and hide others from the known set.
  const known = ["login-page", "journey-page", "difficulty-page", "village-page", "ninja-page"];
  const target = $(pageId);
  if (!target) {
    // If requested page doesn't exist, fallback: if it's login-page toggle modal
    if (pageId === "login-page") {
      const modal = $("login-page");
      if (modal) modal.classList.add("active");
    }
    return;
  }

  known.forEach(id => {
    const el = $(id);
    if (!el) return;
    el.style.display = (id === pageId) ? "block" : "none";
  });
}

/* -----------------------------
   Authentication stubs
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

  // Simple demo persistence
  try { localStorage.setItem("player_username", user); } catch(e){}

  // Close login modal if present
  const modal = $("login-page");
  if (modal) modal.classList.remove("active");

  // If your app uses a journey page, show it; otherwise do nothing
  if ($("journey-page")) showPage("journey-page");
  else {
    // Optionally highlight the UI or show a toast — for now, console log
    console.log("Login successful for", user);
  }
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

  // In a real app you'd call an API. For now, just confirm and store locally.
  try { localStorage.setItem("player_username", user); } catch(e){}
  alert("Registration successful!");
}

/* -----------------------------
   Navigation helpers (kept for compatibility)
   ----------------------------- */
function goToDifficulty() {
  if ($("difficulty-page")) showPage("difficulty-page");
  else {
    // If no separate difficulty page exists, focus the main UI
    const canvas = $("path-canvas");
    if (canvas) canvas.scrollIntoView({behavior:"smooth", block:"center"});
  }
}

function goBackToJourney() {
  if ($("journey-page")) showPage("journey-page");
  else {
    // fallback: close any overlays and focus main UI
    const modal = $("login-page");
    if (modal) modal.classList.remove("active");
  }
}

function goBackToLogin() {
  // Show login modal if present, otherwise try to navigate to journey page
  const modal = $("login-page");
  if (modal) modal.classList.add("active");
  else if ($("journey-page")) showPage("journey-page");
}

function goBackToDifficulty() {
  if ($("difficulty-page")) showPage("difficulty-page");
  else goToDifficulty();
}

function goBackToVillage() {
  if ($("village-page")) showPage("village-page");
  else {
    // If no village page, try to focus the ranks area
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

  // Validate level
  if (!GameState.availableLevels.includes(level)) {
    console.warn("Unknown difficulty level:", level);
    GameState.selectedDifficulty = level; // still allow custom
  } else {
    GameState.selectedDifficulty = level;
  }

  // Persist selection
  try { localStorage.setItem("selectedDifficulty", GameState.selectedDifficulty); } catch(e){}

  // Update UI hint if present
  const selectedNameEl = $("selected-name");
  if (selectedNameEl) {
    // Find the card name text if possible
    const card = document.querySelector(`.rank[data-level="${level}"]`);
    const name = card ? (card.querySelector('.name')?.textContent || level) : level;
    selectedNameEl.textContent = name;
  }

  // If your flow expects to move to village page, do that
  if ($("village-page")) showPage("village-page");
  else {
    // Otherwise, log and keep user on the same screen
    console.log("Difficulty selected:", level);
  }
}

/* -----------------------------
   Initialization: wire preview, cards, and start button
   ----------------------------- */
(function initUI(){
  // Restore last selected difficulty
  try {
    const saved = localStorage.getItem("selectedDifficulty");
    if (saved) GameState.selectedDifficulty = saved;
  } catch(e){}

  // Wire card hover/selection behavior (works with redesigned HTML)
  const cards = qsa('.rank');
  const previewImg = $("preview-img");
  const selectedNameEl = $("selected-name");
  const startBtn = $("start-btn");

  function setPreviewFromCard(card) {
    if (!card) return;
    const level = card.dataset.level || 'genin';
    const art = card.querySelector('.card-art');
    if (art && previewImg) previewImg.src = art.src;
    const name = card.querySelector('.name')?.textContent || level;
    if (selectedNameEl) selectedNameEl.textContent = name;
    // update start button action
    if (startBtn) startBtn.onclick = () => selectDifficulty(level);
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => setPreviewFromCard(card));
    card.addEventListener('click', () => {
      // Visual selection outline
      qsa('.rank').forEach(r => r.style.outline = 'none');
      card.style.outline = '3px solid rgba(255,43,43,0.14)';
      // If card is locked, show purchase prompt
      if (card.classList.contains('locked')) {
        // Simple prompt — replace with your monetization flow
        const wants = confirm("This is a paid difficulty. Would you like to unlock it?");
        if (wants) {
          // In a real app you'd redirect to purchase flow. For now, unlock locally.
          card.classList.remove('locked');
          alert("Unlocked for demo purposes.");
        } else {
          // keep previous selection
          return;
        }
      }
      setPreviewFromCard(card);
      // store selection
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
  if (initialCard) {
    // Slight delay to ensure images have loaded in some environments
    setTimeout(() => setPreviewFromCard(initialCard), 40);
  }

  // Start button fallback: if no start button exists, create a safe global function
  if (!startBtn) {
    window.startJourney = function() {
      const level = GameState.selectedDifficulty || 'genin';
      selectDifficulty(level);
    };
  }

  // Expose a small API for debugging in console
  window.__gameState = GameState;
})();

/* -----------------------------
   Optional: small accessibility helpers
   ----------------------------- */
(function accessibilityHelpers(){
  // Allow keyboard navigation for rank cards
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
   Exported functions (kept for compatibility)
   ----------------------------- */
window.login = login;
window.register = register;
window.goToDifficulty = goToDifficulty;
window.goBackToJourney = goBackToJourney;
window.goBackToLogin = goBackToLogin;
window.selectDifficulty = selectDifficulty;
window.goBackToDifficulty = goBackToDifficulty;
window.goBackToVillage = goBackToVillage;

// End of game.js
