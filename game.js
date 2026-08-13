// -----------------------------
// game.js
// Full file — safe, robust replacement for your current script.
// Keeps the same function names (showPage, login, register, goToDifficulty, etc.)
// -----------------------------

/* Utility helpers */
const $ = id => document.getElementById(id);
const qsa = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

/* App state */
const GameState = {
  selectedDifficulty: null,
  availableLevels: ['academy','genin','chunin','specialjonin','jonin','anbu','kage','akatsuki','jinchuriki']
};

/* Persistence */
function saveSelectedDifficulty() {
  try { localStorage.setItem('shinobi_selectedDifficulty', GameState.selectedDifficulty || ''); }
  catch (e) { /* ignore */ }
}
function loadSelectedDifficulty() {
  try {
    const v = localStorage.getItem('shinobi_selectedDifficulty');
    if (v) GameState.selectedDifficulty = v;
  } catch (e) {}
}

/* -----------------------------
   Page show/hide (tolerant)
   ----------------------------- */
function showPage(pageId) {
  const pages = [
    "login-page",
    "journey-page",
    "difficulty-page",
    "village-page",
    "ninja-page"
  ];

  pages.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return; // tolerate missing elements
    try {
      el.style.display = (id === pageId) ? "block" : "none";
    } catch (e) {
      // ignore style errors
    }
  });

  // If requested page is a modal-style element that uses .active instead of display
  const modal = document.getElementById(pageId);
  if (modal && modal.classList && modal.classList.contains('page-panel')) {
    // ensure only that panel has .active
    qsa('.page-panel').forEach(p => p.classList.remove('active'));
    modal.classList.add('active');
  }
}

/* -----------------------------
   Login & Registration
   ----------------------------- */
function login() {
  const userEl = $('username');
  const passEl = $('password');
  const user = userEl ? userEl.value.trim() : '';
  const pass = passEl ? passEl.value.trim() : '';

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  try { localStorage.setItem('shinobi_username', user); } catch (e) {}
  // Close login modal if present
  const loginModal = $('login-page');
  if (loginModal && loginModal.classList) loginModal.classList.remove('active');

  // Show journey page if present
  if ($('journey-page')) showPage('journey-page');
  else console.log('Login successful for', user);
}

function register() {
  const userEl = $('username');
  const passEl = $('password');
  const user = userEl ? userEl.value.trim() : '';
  const pass = passEl ? passEl.value.trim() : '';

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  try { localStorage.setItem('shinobi_username', user); } catch (e) {}
  alert("Registration successful!");
  const loginModal = $('login-page');
  if (loginModal && loginModal.classList) loginModal.classList.remove('active');
  if ($('journey-page')) showPage('journey-page');
}

/* -----------------------------
   Navigation helpers
   ----------------------------- */
function goToDifficulty() {
  if ($('difficulty-page')) {
    showPage('difficulty-page');
    return;
  }
  const canvas = $('difficulty-canvas') || $('difficulty-path') || $('path-canvas');
  if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function goBackToJourney() {
  if ($('journey-page')) showPage('journey-page');
  else window.history.back();
}

function goBackToLogin() {
  if ($('login-page')) {
    const modal = $('login-page');
    if (modal.classList) modal.classList.add('active');
    else showPage('login-page');
  } else if ($('journey-page')) showPage('journey-page');
}

function goBackToDifficulty() {
  goToDifficulty();
}

function goBackToVillage() {
  if ($('village-page')) showPage('village-page');
  else goBackToJourney();
}

/* -----------------------------
   Difficulty selection
   ----------------------------- */
function selectDifficulty(level) {
  if (!level) return;
  level = String(level);

  if (!GameState.availableLevels.includes(level)) {
    console.warn('Unknown difficulty level:', level);
    // allow custom but warn
  }

  GameState.selectedDifficulty = level;
  saveSelectedDifficulty();

  // Visual feedback: add selected class if element exists
  qsa('.difficulty-level').forEach(el => el.classList.remove('selected'));
  const el = document.querySelector(`.difficulty-level[data-level="${level}"], .difficulty-level#${level}`);
  if (el) el.classList.add('selected');

  // Update any selected-name hint
  const hint = $('selected-name');
  if (hint) {
    const nameText = el ? (el.querySelector('.difficulty-info')?.textContent || level) : level;
    hint.textContent = nameText;
  }

  // Navigate to village if present
  if ($('village-page')) showPage('village-page');
  else console.log('Difficulty selected:', level);
}

/* -----------------------------
   UI wiring: hover, click, keyboard
   ----------------------------- */
(function wireDifficultyUI(){
  loadSelectedDifficulty();

  // Ensure data-level exists for each difficulty-level element
  qsa('.difficulty-level').forEach(el => {
    if (!el.dataset.level) {
      if (el.id) el.dataset.level = el.id;
    }
  });

  const levels = qsa('.difficulty-level');
  if (!levels.length) return;

  // Optional preview image element (if present)
  const previewImg = $('preview-img');

  levels.forEach((el, idx) => {
    const level = el.dataset.level || el.id || `level-${idx}`;

    // Hover preview
    el.addEventListener('mouseenter', () => {
      el.classList.add('hovered');
      const art = el.querySelector('img.rock-icon, img.card-art');
      if (previewImg && art && art.src) previewImg.src = art.src;
    });
    el.addEventListener('mouseleave', () => el.classList.remove('hovered'));

    // Click selection
    el.addEventListener('click', () => {
      if (el.classList.contains('paid-level') || el.classList.contains('locked')) {
        const wants = confirm('This difficulty is paid. Unlock now?');
        if (!wants) return;
        // demo unlock
        el.classList.remove('locked');
        el.classList.remove('paid-level');
        alert('Unlocked for demo purposes.');
      }
      selectDifficulty(level);
    });

    // Keyboard accessibility
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        el.click();
      } else if (ev.key === 'ArrowRight') {
        const next = levels[(idx + 1) % levels.length];
        next?.focus();
      } else if (ev.key === 'ArrowLeft') {
        const prev = levels[(idx - 1 + levels.length) % levels.length];
        prev?.focus();
      }
    });
  });

  // Restore saved selection visually
  if (GameState.selectedDifficulty) {
    const savedEl = document.querySelector(`.difficulty-level[data-level="${GameState.selectedDifficulty}"], .difficulty-level#${GameState.selectedDifficulty}`);
    if (savedEl) {
      savedEl.classList.add('selected');
      const hint = $('selected-name');
      if (hint) hint.textContent = savedEl.querySelector('.difficulty-info')?.textContent || GameState.selectedDifficulty;
    }
  }
})();

/* -----------------------------
   Positioning helper (keeps parity with your inline function)
   ----------------------------- */
window.nudgeDiagonal = function(dxPct = 0, dyPct = 0) {
  const root = document.documentElement;
  const curLeft = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-left')) || 14;
  const curTop  = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-top'))  || 92;
  root.style.setProperty('--anchor-left', (curLeft + dxPct) + '%');
  root.style.setProperty('--anchor-top', (curTop + dyPct) + '%');

  // If a setPositions function exists on the page, call it
  if (typeof window.setPositions === 'function') {
    try { window.setPositions(); } catch (e) {}
  } else {
    // trigger resize to let responsive code recalc
    window.dispatchEvent(new Event('resize'));
  }
};

/* -----------------------------
   Expose functions for compatibility
   ----------------------------- */
window.showPage = showPage;
window.login = login;
window.register = register;
window.goToDifficulty = goToDifficulty;
window.goBackToJourney = goBackToJourney;
window.goBackToLogin = goBackToLogin;
window.selectDifficulty = selectDifficulty;
window.goBackToDifficulty = goBackToDifficulty;
window.goBackToVillage = goBackToVillage;

/* End of game.js */
