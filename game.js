/* Helpers */
const $ = id => document.getElementById(id);
const qsa = sel => Array.from(document.querySelectorAll(sel));

/* App State */
const App = {
  user: null,
  selectedDifficulty: null,
  selectedVillage: null,
  selectedNinja: null
};

/* -----------------------------
   INACTIVITY TIMER & PERSISTENCE
   ----------------------------- */
let inactivityTimer = null;
const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

function resetInactivityTimer() {
  if (!App.user) return;
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert("You have been logged out due to 15 minutes of inactivity.");
    goBackToLogin();
  }, INACTIVITY_LIMIT);
}

["mousemove", "keydown", "click", "scroll"].forEach(event => {
  window.addEventListener(event, resetInactivityTimer);
});

/* -----------------------------
   PAGE NAVIGATION
   ----------------------------- */
function showPage(pageId) {
  const panelPages = [
    "login-page",
    "journey-page",
    "difficulty-page",
    "village-page",
    "ninja-page",
    "summary-page",
    "treasures-page",
    "story-page",
    "game-village"
  ];

  panelPages.forEach(id => {
    const el = $(id);
    if (!el) return;
    
    if (id === pageId) {
      el.classList.remove("hidden");
      el.style.display = "block";
    } else {
      el.classList.add("hidden");
      el.style.display = "none";
    }
  });
  
  if (pageId === "difficulty-page") {
    initDifficulty();
  }
  
  resetInactivityTimer();
}

/* -----------------------------
   LOGIN & REGISTER
   ----------------------------- */
function login() {
  const user = $("username").value.trim();
  const pass = $("password").value.trim();

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  App.user = user;
  localStorage.setItem("shinobi_username", user);
  if ($("header-user")) $("header-user").textContent = `Logged in as: ${user}`;
  showPage("journey-page");
  resetInactivityTimer();
}

function register() {
  const user = $("username").value.trim();
  const pass = $("password").value.trim();

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  App.user = user;
  localStorage.setItem("shinobi_username", user);
  if ($("header-user")) $("header-user").textContent = `Logged in as: ${user}`;
  alert("Registration successful!");
  showPage("journey-page");
  resetInactivityTimer();
}

/* -----------------------------
   NAVIGATION BACK/FORWARD HELPERS
   ----------------------------- */
function goBackToJourney() { showPage("journey-page"); }
function goBackToLogin() { 
  App.user = null;
  localStorage.removeItem("shinobi_username");
  clearTimeout(inactivityTimer);
  if ($("header-user")) $("header-user").textContent = "Not signed in";
  showPage("login-page"); 
}
function goBackToDifficulty() { showPage("difficulty-page"); }
function goBackToVillage() { showPage("village-page"); }
function goBackToNinja() { showPage("ninja-page"); }

/* -----------------------------
   DIFFICULTY SELECTION
   ----------------------------- */
const DIFFICULTIES = [
  { id: "academy", name: "Academy Student", file: "Academy Student.png", desc: "Basic training, simple survival.", unlocked: true },
  { id: "genin", name: "Genin", file: "Genin.png", desc: "It's called Easy, but it's still going to take concentration.", unlocked: false },
  { id: "chunin", name: "Chunin", file: "Chunin.png", desc: "A tougher test of tactical ninja prowess.", unlocked: false },
  { id: "jonin", name: "Jonin", file: "Jonin.png", desc: "Advanced combat for experienced fighters.", unlocked: false },
  { id: "anbu", name: "Anbu", file: "Anbu.png", desc: "Elite operations in the shadows.", unlocked: false },
  { id: "kage", name: "Kage", file: "Kage.png", desc: "The ultimate leadership challenge.", unlocked: false },
  { id: "akatsuki", name: "Akatsuki", file: "Akatsuki.png", desc: "Dangerous rogue entities.", unlocked: false },
  { id: "specialjonin", name: "Special Jonin", file: "Special Jonin.png", desc: "Specialized high-risk missions.", unlocked: false },
  { id: "jinchuriki", name: "Jinchuriki", file: "Jinchuriki.png", desc: "Unleash overwhelming tailed-beast power.", unlocked: false }
];

function initDifficulty() {
  const container = $("difficulty-list-container");
  if (!container) return;

  container.innerHTML = "";

  DIFFICULTIES.forEach((diff) => {
    const row = document.createElement("div");
    row.className = `diff-row ${diff.unlocked ? "" : "locked"}`;
    
    row.innerHTML = `
      <div class="diff-info">
        <img src="Assets/Icons/${diff.file}" alt="${diff.name}" onerror="this.src='Assets/Icons/Academy Student.png'">
        <div class="diff-text">
          <h4>${diff.name}</h4>
          <p>${diff.desc}</p>
        </div>
      </div>
      <div class="diff-action">
        <button class="primary" ${!diff.unlocked ? "disabled" : ""} onclick="selectDifficultyLevel('${diff.id}')">
          ${diff.unlocked ? "Select →" : "Locked"}
        </button>
      </div>
    `;
    container.appendChild(row);
  });
}

function selectDifficultyLevel(levelId) {
  const diffObj = DIFFICULTIES.find(d => d.id === levelId);
  if (!diffObj || !diffObj.unlocked) {
    alert("This difficulty is locked.");
    return;
  }

  App.selectedDifficulty = levelId;
  localStorage.setItem("shinobi_selectedDifficulty", levelId);

  showPage("village-page");
  renderVillageList();
}

/* -----------------------------
   VILLAGE SELECTION
   ----------------------------- */
const VILLAGES = [
  "Leaf","Mist","Sand","Cloud","Earth","Rain",
  "Sound","Grass","Waterfall","Snow","Whirling Tides"
];

function renderVillageList() {
  const container = $("village-list");
  if (!container) return;
  
  container.innerHTML = "";
  App.selectedVillage = null;
  if ($("to-ninja-btn")) $("to-ninja-btn").disabled = true;

  VILLAGES.forEach(v => {
    const item = document.createElement("div");
    item.className = "grid-item";
    item.textContent = v;

    item.addEventListener("click", () => {
      selectVillage(item, v);
    });

    item.addEventListener("dblclick", () => {
      selectVillage(item, v);
      goToNinjaSelection();
    });

    container.appendChild(item);
  });
}

function selectVillage(item, v) {
  qsa("#village-list .grid-item").forEach(x => x.classList.remove("selected"));
  item.classList.add("selected");

  App.selectedVillage = v;
  if ($("to-ninja-btn")) $("to-ninja-btn").disabled = false;
  
  const villageLabel = $("id-village");
  if (villageLabel) villageLabel.textContent = v;
}

function goToNinjaSelection() {
  if (!App.selectedVillage) {
    alert("Select a village first.");
    return;
  }
  showPage("ninja-page");
  renderNinjaGrid();
}

/* -----------------------------
   NINJA SELECTION
   ----------------------------- */
const NINJAS = {
  "Leaf": ["Naruto Uzumaki","Sakura Haruno","Kakashi Hatake"],
  "Mist": ["Zabuza Momochi","Haku"],
  "Sand": ["Gaara","Kankuro"],
  "Cloud": ["Killer Bee","Darui"],
  "Earth": ["Onoki"],
  "Rain": ["Pain"],
  "Sound": ["Orochimaru"],
  "Grass": ["Kiba Inuzuka"],
  "Waterfall": ["Shadow Ninja", "Tenten"],
  "Snow": ["Haku (Snow)"],
  "Whirling Tides": ["Ashina Uzumaki"]
};

function renderNinjaGrid() {
  const grid = $("ninja-grid");
  if (!grid) return;

  const village = App.selectedVillage;
  const roster = NINJAS[village] || [];

  App.selectedNinja = null;
  if ($("start-game-btn")) $("start-game-btn").disabled = true;
  if ($("ninja-village-label")) $("ninja-village-label").textContent = `Selected Village: ${village}`;
  
  grid.innerHTML = "";

  roster.forEach(name => {
    const card = document.createElement("div");
    card.className = "grid-item";
    card.textContent = name;

    card.addEventListener("click", () => {
      selectNinja(card, name);
    });

    card.addEventListener("dblclick", () => {
      selectNinja(card, name);
      goToSummaryPage();
    });

    grid.appendChild(card);
  });
}

function selectNinja(card, name) {
  qsa("#ninja-grid .grid-item").forEach(x => x.classList.remove("selected"));
  card.classList.add("selected");

  App.selectedNinja = name;
  if ($("start-game-btn")) $("start-game-btn").disabled = false;
  
  updateMainPlayerProfile(name);
}

function updateMainPlayerProfile(ninjaName) {
  const nameEl = $("main-player-name");
  const imgEl = $("main-player-img");
  const rankEl = $("id-rank");

  if (nameEl) nameEl.textContent = ninjaName;

  if (imgEl) {
    if (ninjaName === "Shadow Ninja") {
      imgEl.src = "Assets/Animated Cards/Shadow Ninja.png";
      if (rankEl) rankEl.textContent = "Anbu";
    } else {
      imgEl.src = `Assets/Icons/${ninjaName}.png`;
      imgEl.onerror = () => { 
        imgEl.src = "Assets/Icons/Academy Student.png"; 
      };
      if (rankEl) rankEl.textContent = "Academy Student";
    }
  }
}

/* -----------------------------
   FLOW PROGRESSION: SUMMARY -> TREASURES -> STORY
   ----------------------------- */
function goToSummaryPage() {
  if (!App.selectedNinja) {
    alert("Please select a ninja first.");
    return;
  }

  if ($("summary-ninja-name")) $("summary-ninja-name").textContent = App.selectedNinja;
  if ($("summary-ninja-rank")) $("summary-ninja-rank").textContent = App.selectedNinja === "Shadow Ninja" ? "Anbu" : "Genin";
  if ($("summary-village-name")) $("summary-village-name").textContent = App.selectedVillage || "Leaf";
  if ($("summary-difficulty-name")) $("summary-difficulty-name").textContent = App.selectedDifficulty || "Academy Student";

  const summaryImg = $("summary-ninja-img");
  if (summaryImg) {
    if (App.selectedNinja === "Shadow Ninja") {
      summaryImg.src = "Assets/Animated Cards/Shadow Ninja.png";
    } else {
      summaryImg.src = `Assets/Icons/${App.selectedNinja}.png`;
      summaryImg.onerror = () => { summaryImg.src = "Assets/Icons/Academy Student.png"; };
    }
  }

  showPage("summary-page");
}

function goToTreasuresPage() {
  showPage("treasures-page");
}

function goToStoryPage() {
  const convo = [
    `${App.selectedNinja}: "I’m ready, sensei."`,
    `Trainer: "Your journey begins in ${App.selectedVillage || 'Leaf'}. Stay sharp."`,
    `${App.selectedNinja}: "I won't fail!"`
  ];

  const storyPanel = $("story-page");
  if (storyPanel) {
    storyPanel.classList.add("page-transition-fade");
    setTimeout(() => storyPanel.classList.remove("page-transition-fade"), 400);
  }

  if ($("conversation-text")) {
    $("conversation-text").innerHTML = convo.map(line => `<div>${line}</div>`).join("");
  }

  showPage("story-page");
}

/* -----------------------------
   CHARACTER MODELS & CUSTOM PL
   ----------------------------- */
const shadowNinja = {
  name: "Shadow Ninja",
  getPowerLevel() { return 10; }
};

/* -----------------------------
   BATTLE OVERLAY & UI TRIGGERS
   ----------------------------- */
function openBattleOverlay() {
  const overlay = $("battle-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.style.display = "flex";
    overlay.classList.add("page-transition-fade");
    setTimeout(() => overlay.classList.remove("page-transition-fade"), 400);
  }

  const playerImg = $("battle-player-img");
  const playerName = $("battle-player-name");
  
  if (playerImg) {
    playerImg.className = "fighter-wrapper";
    playerImg.src = App.selectedNinja === "Shadow Ninja" ? "Assets/Animated Cards/Shadow Ninja.png" : `Assets/Icons/${App.selectedNinja || 'Academy Student'}.png`;
    playerImg.onerror = () => { playerImg.src = "Assets/Icons/Academy Student.png"; };
  }
  
  if (playerName) {
    playerName.textContent = App.selectedNinja || "Shadow Ninja";
  }

  const currentPL = App.selectedNinja === "Shadow Ninja" ? 10 : 5;
  if ($("ui-player-pl")) $("ui-player-pl").innerText = currentPL;
  if ($("ui-enemy-pl")) $("ui-enemy-pl").innerText = 50;

  updateModernHealthBar(50, 50);

  if ($("ui-battle-log")) {
    $("ui-battle-log").innerHTML = `<p>Mission loaded. Click FIGHT to engage combat!</p>`;
  }
}

function closeBattleOverlay() {
  const overlay = $("battle-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
  }
}

function updateModernHealthBar(current, max) {
  const fill = $("ui-health-fill");
  const text = $("ui-health-text");
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  if (fill) fill.style.width = `${percentage}%`;
  if (text) text.innerText = `BOSS PL POOL: ${Math.max(0, current)} / ${max}`;
}

function showFloatingDamage(amount) {
  const modalCard = document.querySelector(".modern-battle-card");
  if (!modalCard) return;

  const dmgPopup = document.createElement("div");
  dmgPopup.className = "floating-damage";
  dmgPopup.innerText = `-${amount}`;
  modalCard.appendChild(dmgPopup);

  setTimeout(() => {
    dmgPopup.remove();
  }, 900);
}

/* Accurate Single Squad Member Combat with Lunge & Enemy Reaction */
async function triggerActiveBattle() {
  const testBoss = {
    name: "Jonin Sasuke",
    maxPL: 50,
    powerLevel: 50
  };

  let activeNinjaName = App.selectedNinja || "Shadow Ninja";
  let activeNinjaPL = activeNinjaName === "Shadow Ninja" ? 10 : 5;
  let activeNinjaAsset = activeNinjaName === "Shadow Ninja" ? "Assets/Animated Cards/Shadow Ninja.png" : `Assets/Icons/${activeNinjaName}.png`;

  let logContainer = $("ui-battle-log");
  if (logContainer) logContainer.innerHTML = `<p>--- BATTLE STARTED: VS ${testBoss.name} (PL: ${testBoss.powerLevel}) ---</p>`;

  let currentBossHP = testBoss.powerLevel;

  const playerImg = $("battle-player-img");
  const enemyContainer = document.querySelector(".enemy-wrapper") || $("battle-enemy-img")?.parentElement;
  const playerName = $("battle-player-name");
  const playerPL = $("ui-player-pl");

  if (playerName) playerName.textContent = activeNinjaName;
  if (playerPL) playerPL.innerText = activeNinjaPL;
  if (playerImg) {
    playerImg.src = activeNinjaAsset;
  }

  await new Promise(r => setTimeout(r, 400));

  // Player Attack Lunge & Enemy Shake
  if (playerImg) playerImg.classList.add("lunge-forward");
  if (enemyContainer) enemyContainer.classList.add("enemy-hit");

  currentBossHP -= activeNinjaPL;
  showFloatingDamage(activeNinjaPL);
  updateModernHealthBar(currentBossHP, testBoss.maxPL);

  if (logContainer) {
    logContainer.innerHTML += `<p>⚔️ ${activeNinjaName} strikes for <strong>${activeNinjaPL}</strong> damage! Boss HP left: ${Math.max(0, currentBossHP)}</p>`;
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  await new Promise(r => setTimeout(r, 400));
  if (playerImg) playerImg.classList.remove("lunge-forward");
  if (enemyContainer) enemyContainer.classList.remove("enemy-hit");

  await new Promise(r => setTimeout(r, 600));

  // Outcome check
  if (currentBossHP <= 0) {
    if (logContainer) {
      logContainer.innerHTML += `<p style="color: #4ade80; font-weight: bold;">🎉 VICTORY! ${activeNinjaName} defeated ${testBoss.name}!</p>`;
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  } else {
    if (logContainer) {
      logContainer.innerHTML += `<p style="color: #ef4444; font-weight: bold;">❌ DEFEAT! Boss survived with ${currentBossHP} PL. Train harder!</p>`;
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }
}

/* -----------------------------
   INITIALIZATION & LISTENERS
   ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("shinobi_username");
  if (savedUser) {
    App.user = savedUser;
    if ($("header-user")) $("header-user").textContent = `Logged in as: ${savedUser}`;
    showPage("journey-page");
  } else {
    showPage("login-page");
  }

  initDifficulty();

  const passwordInput = $("password");
  const usernameInput = $("username");

  if (passwordInput && usernameInput) {
    const handleEnterKey = (e) => {
      if (e.key === "Enter") {
        login();
      }
    };
    passwordInput.addEventListener("keypress", handleEnterKey);
    usernameInput.addEventListener("keypress", handleEnterKey);
  }
});