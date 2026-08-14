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
  clearTimeout(inactivityTimer);
  $("header-user").textContent = "Not signed in";
  showPage("login-page"); 
}
function goBackToDifficulty() { showPage("difficulty-page"); }
function goBackToVillage() { showPage("village-page"); }

/* -----------------------------
   DIFFICULTY SELECTION
   ----------------------------- */
function initDifficulty() {
  const levels = qsa(".difficulty-level");

  levels.forEach(el => {
    const level = el.dataset.level;

    el.addEventListener("click", () => {
      handleDifficultySelection(el, level);
    });

    el.addEventListener("dblclick", () => {
      handleDifficultySelection(el, level);
      if (!el.classList.contains("disabled") && !el.classList.contains("locked")) {
        showPage("village-page");
        renderVillageList();
      }
    });
  });
}

function handleDifficultySelection(el, level) {
  if (el.classList.contains("disabled") && level !== "academy") {
    alert("Only Academy Student is playable right now.");
    return;
  }

  if (el.classList.contains("locked") || el.classList.contains("paid-level")) {
    const wants = confirm("This is a Premium difficulty. Would you like to unlock it?");
    if (!wants) return;
    
    el.classList.remove("locked", "paid-level", "disabled");
    alert(`${level.toUpperCase()} difficulty unlocked!`);
  }

  qsa(".difficulty-level").forEach(x => x.classList.remove("selected"));
  el.classList.add("selected");

  App.selectedDifficulty = level;
  localStorage.setItem("shinobi_selectedDifficulty", level);

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
        imgEl.src = "Assets/Icons/Academy student.png"; 
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
});