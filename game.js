// -----------------------------
// game.js
// Full file — implements the flow you specified:
// Home (login/register) -> Journey -> Difficulty -> Village -> Ninja -> Start Game -> Village Hub
// -----------------------------

/* Helpers */
const $ = id => document.getElementById(id);
const qsa = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

/* App state and data */
const App = {
  user: null,
  selectedDifficulty: null,
  selectedVillage: null,
  selectedNinja: null,
  villages: [
    "Leaf","Mist","Sand","Cloud","Earth","Rain","Sound","Grass","Waterfall","Snow","Whirling Tides"
  ],
  // Example ninja roster by village (add more as needed)
  ninjasByVillage: {
    "Leaf": ["Naruto Uzumaki","Sakura Haruno","Kakashi Hatake"],
    "Mist": ["Zabuza Momochi","Haku"],
    "Sand": ["Gaara","Kankuro"],
    "Cloud": ["Killer Bee","Darui"],
    "Earth": ["Onoki"],
    "Rain": ["Pain"],
    "Sound": ["Orochimaru"],
    "Grass": ["Kiba Inuzuka"],
    "Waterfall": ["Tenten"],
    "Snow": ["Haku (Snow)"],
    "Whirling Tides": ["Ashina Uzumaki"]
  },
  // Which difficulties are selectable by default
  difficultyConfig: {
    academy: { selectable: true, locked: false, paid: false },
    genin:   { selectable: false, locked: false, paid: false },
    chunin:  { selectable: false, locked: false, paid: false },
    specialjonin: { selectable: false, locked: true, paid: true },
    jonin:   { selectable: false, locked: false, paid: false },
    anbu:    { selectable: false, locked: false, paid: false },
    kage:    { selectable: false, locked: false, paid: false },
    akatsuki:{ selectable: false, locked: true, paid: true },
    jinchuriki:{ selectable: false, locked: true, paid: true }
  }
};

/* Persistence */
function saveAppState() {
  try {
    localStorage.setItem('shinobi_app', JSON.stringify({
      user: App.user,
      selectedDifficulty: App.selectedDifficulty,
      selectedVillage: App.selectedVillage,
      selectedNinja: App.selectedNinja
    }));
  } catch(e){}
}
function loadAppState() {
  try {
    const raw = localStorage.getItem('shinobi_app');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    App.user = parsed.user || null;
    App.selectedDifficulty = parsed.selectedDifficulty || null;
    App.selectedVillage = parsed.selectedVillage || null;
    App.selectedNinja = parsed.selectedNinja || null;
  } catch(e){}
}

/* -----------------------------
   Navigation helpers (exposed)
   ----------------------------- */
function showPage(pageId) {
  const pages = ['login-page','journey-page','difficulty-page','village-page','ninja-page','game-village'];
  pages.forEach(id => {
    const el = $(id);
    if (!el) return;
    el.classList.toggle('hidden', id !== pageId);
  });

  // Update header user text
  const headerUser = $('header-user') || $('header-user');
  if (headerUser) {
    headerUser.textContent = App.user ? `Signed in as ${App.user}` : 'Not signed in';
  }
}

/* -----------------------------
   Authentication
   ----------------------------- */
function login() {
  const user = $('username') ? $('username').value.trim() : '';
  const pass = $('password') ? $('password').value.trim() : '';
  if (!user || !pass) { alert('Please enter both username and password.'); return; }
  App.user = user;
  saveAppState();
  showPage('journey-page');
}

function register() {
  const user = $('username') ? $('username').value.trim() : '';
  const pass = $('password') ? $('password').value.trim() : '';
  if (!user || !pass) { alert('Please enter both username and password.'); return; }
  App.user = user;
  saveAppState();
  alert('Registration successful!');
  showPage('journey-page');
}

/* -----------------------------
   Difficulty selection wiring
   ----------------------------- */
function initDifficultyCanvas() {
  // Positioning logic (keeps your original function name compatibility)
  (function positionStones(){
    window.setPositions = function(){
      const order = ['academy','genin','chunin','specialjonin','jonin','anbu','kage'];
      const canvas = $('difficulty-canvas');
      if(!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const root = getComputedStyle(document.documentElement);
      const anchorLeftPct = parseFloat(root.getPropertyValue('--anchor-left')) || 14;
      const anchorTopPct  = parseFloat(root.getPropertyValue('--anchor-top'))  || 92;
      const stepHPct = parseFloat(root.getPropertyValue('--step-h')) || 9.5;
      const stepVPct = parseFloat(root.getPropertyValue('--step-v')) || 13;
      const anchorLeftPx = anchorLeftPct/100 * rect.width;
      const anchorTopPx  = anchorTopPct/100 * rect.height;
      const stepHPx = stepHPct/100 * rect.width;
      const stepVPx = stepVPct/100 * rect.height;
      order.forEach((id, idx) => {
        const el = $(id);
        if(!el) return;
        const leftPx = anchorLeftPx + idx * stepHPx;
        const topPx  = anchorTopPx  - idx * stepVPx;
        el.style.left = (leftPx / rect.width) * 100 + '%';
        el.style.top  = (topPx  / rect.height) * 100 + '%';
        const img = el.querySelector('.rock-icon');
        if(img) img.style.width = getComputedStyle(document.documentElement).getPropertyValue('--icon-max') || '140px';
      });
      // paid offsets
      const ak = $('akatsuki');
      if(ak){ ak.style.left = '86%'; ak.style.top = '12%'; }
      const ji = $('jinchuriki');
      if(ji){ ji.style.left = '92%'; ji.style.top = '8%'; }
    };
    window.addEventListener('resize', window.setPositions);
    window.addEventListener('load', ()=> setTimeout(window.setPositions, 60));
    document.querySelectorAll('.rock-icon').forEach(img => { if(!img.complete) img.addEventListener('load', window.setPositions); });
    window.setPositions();
  })();

  // Wire interactions
  const levels = qsa('.difficulty-level');
  levels.forEach(el => {
    const level = el.dataset.level || el.id;
    // apply config classes
    const cfg = App.difficultyConfig && App.difficultyConfig[level];
    if (cfg) {
      if (cfg.locked || cfg.paid) el.classList.add('locked');
      if (!cfg.selectable) el.classList.add('disabled');
    }
    // set tabindex
    el.setAttribute('tabindex','0');

    el.addEventListener('click', () => {
      // if disabled (not selectable) do nothing
      if (el.classList.contains('disabled')) {
        // show small hint
        alert('This difficulty is locked for now. Academy Student is the default playable difficulty.');
        return;
      }
      if (el.classList.contains('locked') || el.classList.contains('paid-level')) {
        const wants = confirm('This difficulty is paid. Unlock now?');
        if (!wants) return;
        // demo unlock
        el.classList.remove('locked');
        el.classList.remove('paid-level');
        el.classList.remove('disabled');
        alert('Unlocked for demo purposes.');
      }
      // select
      qsa('.difficulty-level').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      App.selectedDifficulty = level;
      saveAppState();
      // move to village selection
      showPage('village-page');
      renderVillageList();
    });

    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); el.click(); }
      if (ev.key === 'ArrowRight') {
        const idx = levels.indexOf(el);
        const next = levels[(idx+1)%levels.length];
        next?.focus();
      }
      if (ev.key === 'ArrowLeft') {
        const idx = levels.indexOf(el);
        const prev = levels[(idx-1+levels.length)%levels.length];
        prev?.focus();
      }
    });
  });

  // restore selection if present
  if (App.selectedDifficulty) {
    const sel = document.querySelector(`.difficulty-level[data-level="${App.selectedDifficulty}"], .difficulty-level#${App.selectedDifficulty}`);
    if (sel) sel.classList.add('selected');
  }
}

/* -----------------------------
   Village selection
   ----------------------------- */
function renderVillageList() {
  const container = $('village-list');
  if (!container) return;
  container.innerHTML = '';
  App.villages.forEach(v => {
    const btn = document.createElement('div');
    btn.className = 'village-item';
    btn.textContent = v;
    btn.dataset.village = v;
    if (App.selectedVillage === v) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      App.selectedVillage = v;
      saveAppState();
      // mark selected visually
      qsa('.village-item').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      // enable next button
      const next = $('to-ninja-btn');
      if (next) next.disabled = false;
    });
    container.appendChild(btn);
  });
}

/* -----------------------------
   Ninja selection (dependent on village)
   ----------------------------- */
function goToNinjaSelection() {
  if (!App.selectedVillage) { alert('Please select a village first.'); return; }
  showPage('ninja-page');
  renderNinjaGrid(App.selectedVillage);
}

function renderNinjaGrid(village) {
  const grid = $('ninja-grid');
  const label = $('ninja-village-label');
  if (!grid) return;
  grid.innerHTML = '';
  if (label) label.textContent = `Village: ${village}`;
  const roster = App.ninjasByVillage[village] || [];
  roster.forEach(name => {
    const card = document.createElement('div');
    card.className = 'ninja-card';
    card.textContent = name;
    card.dataset.ninja = name;
    card.addEventListener('click', () => {
      // select
      qsa('.ninja-card').forEach(x => x.classList.remove('selected'));
      card.classList.add('selected');
      App.selectedNinja = name;
      saveAppState();
      const startBtn = $('start-game-btn');
      if (startBtn) startBtn.disabled = false;
    });
    grid.appendChild(card);
  });

  // If no ninjas, show placeholder
  if (roster.length === 0) {
    const p = document.createElement('div');
    p.className = 'muted';
    p.textContent = 'No ninjas available for this village yet.';
    grid.appendChild(p);
  }
}

/* -----------------------------
   Start Game flow: conversation -> first battle -> village hub
   ----------------------------- */
function startGame() {
  if (!App.selectedNinja || !App.selectedVillage) { alert('Select a village and ninja first.'); return; }
  // Build a short conversation
  const convo = [
    `${App.selectedNinja}: "I won't let the village fall. I'm ready."`,
    `Trainer: "Focus. Use what you've learned at the Academy. Trust your instincts."`,
    `${App.selectedNinja}: "Yes, sensei."`
  ];
  const convEl = $('conversation-text');
  if (convEl) convEl.innerHTML = convo.map(s => `<div>${s}</div>`).join('');
  const modal = $('start-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeStartModal() {
  const modal = $('start-modal');
  if (modal) modal.classList.add('hidden');
}

function beginFirstBattle() {
  // Close modal
  closeStartModal();
  // Simulate a short battle (for demo, we just show an alert and then go to village hub)
  alert(`First battle: ${App.selectedNinja} vs. Training Opponent\n(You won the demo battle!)`);
  // After battle, go to village hub
  showPage('game-village');
  // Update hub title
  const hubTitle = $('hub-village-name');
  if (hubTitle) hubTitle.textContent = `${App.selectedVillage} Village`;
  // Optionally show a mission summary
  const hubContent = $('hub-content');
  if (hubContent) hubContent.textContent = `Welcome back to ${App.selectedVillage}. Your ninja ${App.selectedNinja} has completed the first trial. Choose a header to continue.`;
}

/* -----------------------------
   Hub header wiring
   ----------------------------- */
function initHubHeaders() {
  const headers = qsa('#hub-headers button');
  headers.forEach(btn => {
    btn.addEventListener('click', () => {
      headers.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      const hubContent = $('hub-content');
      if (!hubContent) return;
      // Simple content swap
      switch(tab) {
        case 'village': hubContent.textContent = `Village center of ${App.selectedVillage}. Visit shops and NPCs.`; break;
        case 'missions': hubContent.textContent = `Available missions: Patrol, Escort, Recon.`; break;
        case 'arena': hubContent.textContent = `Arena: Fight other shinobi to test your skills.`; break;
        case 'exam': hubContent.textContent = `Exam: Prove your rank in the next exam.`; break;
        case 'physical': hubContent.textContent = `Physical training area: Improve stats.`; break;
        case 'rogue': hubContent.textContent = `Rogue missions: Hunt rogue ninjas.`; break;
        case 'defend': hubContent.textContent = `Defend the village from incoming threats.`; break;
        default: hubContent.textContent = ''; break;
      }
    });
  });
}

/* -----------------------------
   Initialization
   ----------------------------- */
(function init(){
  loadAppState();

  // Show login if not signed in, otherwise journey
  if (!App.user) showPage('login-page');
  else showPage('journey-page');

  // Initialize difficulty canvas interactions
  initDifficultyCanvas();

  // Render village list if returning to village page
  renderVillageList();

  // Wire to-ninja button state
  const toNinja = $('to-ninja-btn');
  if (toNinja) toNinja.disabled = !App.selectedVillage;

  // Wire start-game button state
  const startBtn = $('start-game-btn');
  if (startBtn) startBtn.disabled = !App.selectedNinja;

  // If state already had village/ninja selected, restore UI
  if (App.selectedVillage) {
    // mark village visually
    setTimeout(() => {
      const vEl = document.querySelector(`.village-item[data-village="${App.selectedVillage}"]`);
      if (vEl) vEl.classList.add('selected');
      if ($('to-ninja-btn')) $('to-ninja-btn').disabled = false;
    }, 40);
  }
  if (App.selectedNinja) {
    // mark ninja visually if on ninja page
    setTimeout(() => {
      const nEl = document.querySelector(`.ninja-card[data-ninja="${App.selectedNinja}"]`);
      if (nEl) nEl.classList.add('selected');
      if ($('start-game-btn')) $('start-game-btn').disabled = false;
    }, 40);
  }

  // Hub headers
  initHubHeaders();

  // Expose for debugging
  window.App = App;
})();

/* -----------------------------
   Expose functions globally (compat)
   ----------------------------- */
window.showPage = showPage;
window.login = login;
window.register = register;
window.goToDifficulty = () => showPage('difficulty-page');
window.goBackToJourney = () => showPage('journey-page');
window.goBackToLogin = () => showPage('login-page');
window.selectDifficulty = (lvl) => {
  const el = document.querySelector(`.difficulty-level[data-level="${lvl}"], .difficulty-level#${lvl}`);
  if (el) el.click();
  else {
    App.selectedDifficulty = lvl;
    saveAppState();
    showPage('village-page');
    renderVillageList();
  }
};
window.goBackToDifficulty = () => showPage('difficulty-page');
window.goBackToVillage = () => showPage('village-page');
window.goToNinjaSelection = goToNinjaSelection;
window.startGame = startGame;
window.beginFirstBattle = beginFirstBattle;
window.nudgeDiagonal = function(dxPct = 0, dyPct = 0) {
  const root = document.documentElement;
  const curLeft = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-left')) || 14;
  const curTop  = parseFloat(getComputedStyle(root).getPropertyValue('--anchor-top'))  || 92;
  root.style.setProperty('--anchor-left', (curLeft + dxPct) + '%');
  root.style.setProperty('--anchor-top', (curTop + dyPct) + '%');
  if (typeof window.setPositions === 'function') {
    try { window.setPositions(); } catch(e){}
  } else {
    window.dispatchEvent(new Event('resize'));
  }
};
