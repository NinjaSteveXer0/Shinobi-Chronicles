// -----------------------------
// game.js
// Full file — stepping-stone layout, large icons, keyboard nav, persistence.
// Works with the provided index.html.
// -----------------------------

/* Helpers */
const $ = id => document.getElementById(id);
const qsa = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

/* App state */
const GameState = {
  selectedDifficulty: null,
  availableLevels: ['academy','genin','chunin','specialjonin','jonin','anbu','kage','akatsuki','jinchuriki']
};

/* Persistence */
function saveState() {
  try { localStorage.setItem('shinobi_selectedDifficulty', GameState.selectedDifficulty || ''); } catch(e){}
}
function loadState() {
  try {
    const v = localStorage.getItem('shinobi_selectedDifficulty');
    if (v) GameState.selectedDifficulty = v;
  } catch(e){}
}

/* -----------------------------
   Positioning: stepping-stone diagonal
   -----------------------------
   This function computes clear, evenly spaced positions for each stone.
   It exposes window.setPositions for compatibility and window.nudgeDiagonal.
*/
(function positioning(){
  window.setPositions = function(){
    const canvas = $('difficulty-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const root = getComputedStyle(document.documentElement);
    const anchorLeftPct = parseFloat(root.getPropertyValue('--anchor-left')) || 10;
    const anchorTopPct  = parseFloat(root.getPropertyValue('--anchor-top'))  || 88;
    const stepHPct = parseFloat(root.getPropertyValue('--step-h')) || 12;
    const stepVPct = parseFloat(root.getPropertyValue('--step-v')) || 14;

    // Order defines the main diagonal path
    const order = ['academy','genin','chunin','specialjonin','jonin','anbu','kage'];

    // Compute base pixel values
    const anchorLeftPx = anchorLeftPct/100 * rect.width;
    const anchorTopPx  = anchorTopPct/100 * rect.height;
    const stepHPx = stepHPct/100 * rect.width;
    const stepVPx = stepVPct/100 * rect.height;

    // Place main sequence
    order.forEach((id, idx) => {
      const el = $(id);
      if (!el) return;
      const leftPx = anchorLeftPx + idx * stepHPx;
      const topPx  = anchorTopPx  - idx * stepVPx;
      el.style.left = (leftPx / rect.width) * 100 + '%';
      el.style.top  = (topPx  / rect.height) * 100 + '%';
      // ensure icon size respects CSS variable
      const img = el.querySelector('.rock-icon');
      if (img) {
        const size = getComputedStyle(document.documentElement).getPropertyValue('--icon-size').trim() || '160px';
        img.style.width = size;
      }
    });

    // Place paid/extra stones to the right with slight offsets
    const lastIdx = order.length - 1;
    const baseX = anchorLeftPx + lastIdx * stepHPx;
    const paidOffsetX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--paid-offset-x')) || 6.0;
    const ak = $('akatsuki');
    if (ak) {
      const leftPx = baseX + paidOffsetX * stepHPx;
      const topPx  = anchorTopPx - 1.6 * stepVPx;
      ak.style.left = (leftPx / rect.width) * 100 + '%';
      ak.style.top  = (topPx / rect.height) * 100 + '%';
    }
    const ji = $('jinchuriki');
    if (ji) {
      const leftPx = baseX + (paidOffsetX + 0.8) * stepHPx;
      const topPx  = anchorTopPx - 2.2 * stepVPx;
      ji.style.left = (leftPx / rect.width) * 100 + '%';
      ji.style.top  = (topPx / rect.height) * 100 + '%';
    }
  };

  window.addEventListener('resize', () => { try { window.setPositions(); } catch(e){} });
  window.addEventListener('load', () => setTimeout(() => { try { window.setPositions(); } catch(e){} }, 40));
})();

/* -----------------------------
   UI wiring: hover, click, keyboard, selection
   ----------------------------- */
(function wireUI(){
  loadState();

  const levels = qsa('.difficulty-level');
  if (!levels.length) return;

  // Ensure data-level exists
  levels.forEach(el => {
    if (!el.dataset.level) {
      if (el.id) el.dataset.level = el.id;
    }
  });

  // Helper to update header user (if present)
  function updateHeaderUser() {
    const header = $('header-user');
    if (header) {
      const user = localStorage.getItem('shinobi_username') || null;
      header.textContent = user ? `Signed in as ${user}` : 'Not signed in';
    }
  }
  updateHeaderUser();

  // Hover preview (if you later add preview-img)
  const previewImg = $('preview-img');

  levels.forEach((el, idx) => {
    const level = el.dataset.level || el.id || `level-${idx}`;

    // Apply tabindex for keyboard nav
    el.setAttribute('tabindex','0');

    // Click handler
    el.addEventListener('click', () => {
      // If disabled (not selectable) show hint
      if (el.classList.contains('disabled')) {
        // Academy should be selectable; others disabled by design
        if (level === 'academy') {
          // allow selection
        } else {
          // small non-blocking hint
          alert('This difficulty is not selectable yet. Academy Student is the default playable difficulty.');
          return;
        }
      }

      // If locked/paid, prompt demo unlock
      if (el.classList.contains('locked') || el.classList.contains('paid-level')) {
        const wants = confirm('This difficulty is paid. Unlock now?');
        if (!wants) return;
        // demo unlock: remove locked/paid and enable
        el.classList.remove('locked');
        el.classList.remove('paid-level');
        el.classList.remove('disabled');
        alert('Unlocked for demo purposes.');
      }

      // Select visually and persist
      qsa('.difficulty-level').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      GameState.selectedDifficulty = level;
      saveState();

      // If you want to auto-advance to village selection, call your flow here.
      // For now, we log and keep user on the same page.
      console.log('Selected difficulty:', level);
    });

    // Hover preview
    el.addEventListener('mouseenter', () => {
      el.classList.add('hovered');
      const art = el.querySelector('.rock-icon');
      if (previewImg && art && art.src) previewImg.src = art.src;
    });
    el.addEventListener('mouseleave', () => el.classList.remove('hovered'));

    // Keyboard navigation
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
      } else if (ev.key === 'ArrowUp') {
        // move to previous in diagonal (approx)
        const prev = levels[Math.max(0, idx - 1)];
        prev?.focus();
      } else if (ev.key === 'ArrowDown') {
        const next = levels[Math.min(levels.length - 1, idx + 1)];
        next?.focus();
      }
    });
  });

  // Restore saved selection visually
  if (GameState.selectedDifficulty) {
    const sel = document.querySelector(`.difficulty-level[data-level="${GameState.selectedDifficulty}"], .difficulty-level#${GameState.selectedDifficulty}`);
    if (sel) sel.classList.add('selected');
  } else {
    // default: select academy visually so user can see it's active
    const academy = $('academy');
    if (academy) {
      academy.classList.add('selected');
      GameState.selectedDifficulty = 'academy';
      saveState();
    }
  }
})();

/* -----------------------------
   Navigation helpers (compat)
   ----------------------------- */
function goBackToJourney() {
  // If a journey page exists, show it; otherwise fallback to history
  const journey = document.getElementById('journey-page');
  if (journey) {
    journey.classList.remove('hidden');
    document.getElementById('difficulty-page')?.classList.add('hidden');
  } else {
    window.history.back();
  }
}

/* -----------------------------
   nudgeDiagonal helper (keeps parity)
   ----------------------------- */
window.nudgeDiagonal = function(dxPct = 0, dyPct = 0) {
  const root = document.documentElement;
  const curLeft = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-left')) || 10;
  const curTop  = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-top'))  || 88;
  root.style.setProperty('--anchor-left', (curLeft + dxPct) + '%');
  root.style.setProperty('--anchor-top', (curTop + dyPct) + '%');
  if (typeof window.setPositions === 'function') {
    try { window.setPositions(); } catch(e){}
  } else {
    window.dispatchEvent(new Event('resize'));
  }
};

/* Expose functions for compatibility */
window.showPage = function(pageId){ const el = document.getElementById(pageId); if (el) { el.classList.remove('hidden'); } };
window.selectDifficulty = function(lvl){ const el = document.querySelector(`.difficulty-level[data-level="${lvl}"], .difficulty-level#${lvl}`); if (el) el.click(); else { GameState.selectedDifficulty = lvl; saveState(); } };
window.goBackToJourney = goBackToJourney;

// Load saved state on script load
loadState();
