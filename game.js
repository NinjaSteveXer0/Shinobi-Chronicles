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
   PAGE NAVIGATION
   ----------------------------- */
function showPage(pageId) {
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
    el.classList.toggle("hidden", id !== pageId);
  });
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
  $("header-user").textContent = `Logged in as: ${user}`;
  showPage("journey-page");
}

function register() {
  const user = $("username").value.trim();
  const pass = $("password").value.trim();

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  App.user = user;
  $("header-user").textContent = `Logged in as: ${user}`;
  alert("Registration successful!");
  showPage("journey-page");
}

/* -----------------------------
   BACK BUTTONS
   ----------------------------- */
function goBackToJourney() { showPage("journey-page"); }
function goBackToLogin() { 
  App.user = null;
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
      // Disabled levels (except academy)
      if (el.classList.contains("disabled") && level !== "academy") {
        alert("Only Academy Student is playable right now.");
        return;
      }

      // Paid / locked levels (Special Jonin, Akatsuki, Jinchuriki)
      if (el.classList.contains("locked") || el.classList.contains("paid-level")) {
        const wants = confirm("This is a Premium difficulty. Would you like to unlock it?");
        if (!wants) return;
        
        // Unlock for demo testing
        el.classList.remove("locked", "paid-level", "disabled");
        alert(`${level.toUpperCase()} difficulty unlocked!`);
      }

      // Visual selection
      qsa(".difficulty-level").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");

      App.selectedDifficulty = level;

      // Move to Village page
      showPage("village-page");
      renderVillageList();
    });
  });
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
      qsa("#village-list .grid-item").forEach(x => x.classList.remove("selected"));
      item.classList.add("selected");

      App.selectedVillage = v;
      if ($("to-ninja-btn")) $("to-ninja-btn").disabled = false;
    });

    container.appendChild(item);
  });
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
      qsa("#ninja-grid .grid-item").forEach(x => x.classList.remove("selected"));
      card.classList.add("selected");

      App.selectedNinja = name;
      if ($("start-game-btn")) $("start-game-btn").disabled = false;
      
      // Update the Ninja ID Card photo and name
      updateMainPlayerProfile(name);
    });

    grid.appendChild(card);
  });
}

/* Update main character portrait on the Ninja ID card */
function updateMainPlayerProfile(ninjaName) {
  const nameEl = $("main-player-name");
  const imgEl = $("main-player-img");

  if (nameEl) nameEl.textContent = ninjaName;

  if (imgEl) {
    if (ninjaName === "Shadow Ninja") {
      imgEl.src = "Assets/Icons/Shadow Ninja - Animated.png";
    } else {
      imgEl.src = `Assets/Icons/${ninjaName}.png`;
      imgEl.onerror = () => { 
        imgEl.src = "Assets/Icons/Academy student.png"; 
      };
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
  modal.classList.remove("hidden");
}

function closeStartModal() {
  $("start-modal").classList.add("hidden");
}

function beginFirstBattle() {
  closeStartModal();
  showPage("game-village");
  if ($("hub-village-name")) {
    $("hub-village-name").textContent = `${App.selectedVillage} Village Hub — Main: ${App.selectedNinja}`;
  }
}

/* -----------------------------
   INITIALIZATION
   ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("shinobi_username");
  localStorage.removeItem("shinobi_selectedDifficulty");
  
  showPage("login-page");
  initDifficulty();
});