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
   PAGE NAVIGATION (FIXED)
   ----------------------------- */
function showPage(pageId) {
  // Target all sections/page panels in the application
  const pages = [
    "login-page",
    "journey-page",
    "difficulty-page",
    "village-page",
    "ninja-page",
    "game-village"
  ];

  pages.forEach(id => {
    const el = $(id);
    if (!el) return;
    
    if (id === pageId) {
      el.classList.remove("hidden");
      el.classList.add("active");
      el.style.display = "block"; // Force display override
    } else {
      el.classList.add("hidden");
      el.classList.remove("active");
      el.style.display = "none"; // Force hide override
    }
  });
  
  // Refresh difficulty list automatically if navigating to it
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
  $("header-user").textContent = `Logged in as: ${user}`;
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
  $("header-user").textContent = `Logged in as: ${user}`;
  alert("Registration successful!");
  showPage("journey-page");
  resetInactivityTimer();
}

/* -----------------------------
   BACK BUTTONS
   ----------------------------- */
function goBackToJourney() { showPage("journey-page"); }
function goBackToLogin() { 
  App.user = null;
  localStorage.removeItem("shinobi_username");
  localStorage.removeItem("shinobi_activePage");
  clearTimeout(inactivityTimer);
  if ($("header-user")) $("header-user").textContent = "Not signed in";
  showPage("login-page"); 
}
function goBackToDifficulty() { showPage("difficulty-page"); }
function goBackToVillage() { showPage("village-page"); }
function goBackToNinja() { showPage("ninja-page"); }

/* -----------------------------
   DIFFICULTY SELECTION (UPDATED)
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
  if (typeof renderVillageList === "function") renderVillageList();
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
      showPage("ninja-page");
      renderNinjaGrid();
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
      startGame();
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
      imgEl.src = "Assets/Animated Cards/Shadow ninja - animated.png";
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
   START GAME MODAL & HUB
   ----------------------------- */
function startGame() {
  if (!App.selectedNinja) {
    alert("Choose a ninja first.");
    return;
  }

  const modal = $("start-modal");
  const convo = [
    `${App.selectedNinja}: "I’m ready, sensei."`,
    `Trainer: "Your journey begins in ${App.selectedVillage}. Stay sharp."`,
    `${App.selectedNinja}: "I won't fail!"`
  ];

  if ($("conversation-text")) {
    $("conversation-text").innerHTML = convo.map(line => `<div>${line}</div>`).join("");
  }
  if (modal) modal.classList.remove("hidden");
}

function closeStartModal() {
  const modal = $("start-modal");
  if (modal) modal.classList.add("hidden");
}

function beginFirstBattle() {
  closeStartModal();
  showPage("game-village");
  if ($("hub-village-name")) {
    $("hub-village-name").textContent = `${App.selectedVillage} Village Hub — Main: ${App.selectedNinja}`;
  }
}

/* -----------------------------
   INITIALIZATION & ENTER KEY LISTENER
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

  /* ==========================================================
   CHARACTER STATS & POWER LEVEL LOGIC
   ================================================---------- */

// Sample Character Object for Shadow Ninja
const shadowNinja = {
  name: "Shadow Ninja",
  rank: "Academy Student",
  stats: {
    taijutsu: 2,
    ninjutsu: 3,
    bukishi: 1,
    fuinjutsu: 0,
    kinjutsu: 1, // Has a bit of forbidden knowledge!
    genjutsu: 0,
    stamina: 3
  },
  // Dynamic calculation of total Power Level
  getPowerLevel() {
    return (
      this.stats.taijutsu +
      this.stats.ninjutsu +
      this.stats.bukishi +
      this.stats.fuinjutsu +
      this.stats.kinjutsu +
      this.stats.genjutsu +
      this.stats.stamina
    );
  }
};


/* ==========================================================
   SEQUENTIAL BATTLE ENGINE
   ================================================---------- */

function startBattle(playerTeam, bossEnemy) {
  let remainingBossPL = bossEnemy.powerLevel;
  let backlashPenalty = false; // Tracks Kinjutsu penalty for the next ninja
  let combatLog = [];

  combatLog.push(`--- BATTLE STARTED: VS ${bossEnemy.name} (PL: ${remainingBossPL}) ---`);

  for (let i = 0; i < playerTeam.length; i++) {
    let ninja = playerTeam[i];
    let basePL = ninja.getPowerLevel();
    let effectivePL = basePL;

    // 1. Check if previous teammate used Kinjutsu (Half PL Penalty)
    if (backlashPenalty) {
      effectivePL = Math.floor(effectivePL / 2);
      combatLog.push(`⚠️ ${ninja.name} is staggered by Kinjutsu backlash! Power reduced to ${effectivePL}.`);
      backlashPenalty = false; // Reset penalty after it affects this ninja
    }

    // 2. Check if this ninja uses a Kinjutsu boost (3x PL boost + trigger backlash)
    if (ninja.stats.kinjutsu > 0 && ninja.useKinjutsuThisTurn) {
      effectivePL = effectivePL * 3;
      backlashPenalty = true; // Next teammate will suffer half PL
      combatLog.push(`🔥 ${ninja.name} activates KINJUTSU! Power multiplied to ${effectivePL}!`);
    }

    // 3. Ninja attacks the boss pool
    remainingBossPL -= effectivePL;
    combatLog.push(`⚔️ ${ninja.name} strikes for ${effectivePL} damage! Boss PL remaining: ${Math.max(0, remainingBossPL)}`);

    // 4. Check if boss is defeated
    if (remainingBossPL <= 0) {
      combatLog.push(`🎉 VICTORY! ${bossEnemy.name} was defeated!`);
      return { success: true, log: combatLog, remainingBossPL: 0 };
    } else {
      combatLog.push(`💀 ${ninja.name} was exhausted and defeated by the boss.`);
    }
  }

  // If loop finishes and boss PL is still > 0, it's a defeat
  combatLog.push(`❌ DEFEAT! Your team ran out of ninjas. Boss survived with ${remainingBossPL} PL.`);
  return { success: false, log: combatLog, remainingBossPL: remainingBossPL };
}


/* ==========================================================
   MOCK BATTLE TEST
   ================================================---------- */

// Define a test boss
const rogueNinjaBoss = {
  name: "Rogue Jonin",
  powerLevel: 50
};

// Define team (Shadow Ninja + Jonin Ally)
const joninAlly = {
  name: "Jonin Sasuke",
  stats: { taijutsu: 8, ninjutsu: 10, bukishi: 5, fuinjutsu: 2, kinjutsu: 0, genjutsu: 3, stamina: 7 },
  getPowerLevel() { return 35; }
};

});