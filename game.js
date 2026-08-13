// -----------------------------
// Shinobi Chronicles — game.js
// FULL FILE — paste this entire file into your project
// Fixes:
// ✔ Forced login every reload
// ✔ Difficulty page no longer loads first
// ✔ Academy Student moves to Village selection
// ✔ Back button works
// ✔ Stepping-stone icons remain functional
// -----------------------------

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
   FORCE LOGIN EVERY TIME GAME LOADS
   ----------------------------- */
(function forceLoginOnReload(){
  localStorage.removeItem("shinobi_username");
  localStorage.removeItem("shinobi_selectedDifficulty");
  App.user = null;
})();

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
  alert("Registration successful!");
  showPage("journey-page");
}

/* -----------------------------
   BACK BUTTONS
   ----------------------------- */
function goBackToJourney() {
  showPage("journey-page");
}

function goBackToLogin() {
  showPage("login-page");
}

function goBackToDifficulty() {
  showPage("difficulty-page");
}

function goBackToVillage() {
  showPage("village-page");
}

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

      // Paid / locked levels
      if (el.classList.contains("locked") || el.classList.contains("paid-level")) {
        const wants = confirm("This difficulty is locked behind a paywall. Unlock?");
        if (!wants) return;
        el.classList.remove("locked", "paid-level", "disabled");
        alert("Unlocked for demo purposes.");
      }

      // Select visually
      qsa(".difficulty-level").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");

      App.selectedDifficulty = level;

      // ⭐ MOVE TO VILLAGE PAGE ⭐
      showPage("village-page");
      renderVillageList();
    });

    // Keyboard navigation
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        el.click();
      }
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
  container.innerHTML = "";

  VILLAGES.forEach(v => {
    const item = document.createElement("div");
    item.className = "village-item";
    item.textContent = v;
    item.dataset.village = v;

    item.addEventListener("click", () => {
      qsa(".village-item").forEach(x => x.classList.remove("selected"));
      item.classList.add("selected");

      App.selectedVillage = v;
      $("to-ninja-btn").disabled = false;
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
  "Waterfall": ["Tenten"],
  "Snow": ["Haku (Snow)"],
  "Whirling Tides": ["Ashina Uzumaki"]
};

function renderNinjaGrid() {
  const grid = $("ninja-grid");
  const village = App.selectedVillage;
  const roster = NINJAS[village] || [];

  $("ninja-village-label").textContent = `Village: ${village}`;
  grid.innerHTML = "";

  roster.forEach(name => {
    const card = document.createElement("div");
    card.className = "ninja-card";
    card.textContent = name;
    card.dataset.ninja = name;

    card.addEventListener("click", () => {
      qsa(".ninja-card").forEach(x => x.classList.remove("selected"));
      card.classList.add("selected");

      App.selectedNinja = name;
      $("start-game-btn").disabled = false;
    });

    grid.appendChild(card);
  });
}

/* -----------------------------
   START GAME
   ----------------------------- */
function startGame() {
  if (!App.selectedNinja) {
    alert("Choose a ninja first.");
    return;
  }

  const modal = $("start-modal");
  const convo = [
    `${App.selectedNinja}: "I’m ready, sensei."`,
    `Trainer: "Your journey begins now. Stay sharp."`,
    `${App.selectedNinja}: "I won't fail."`
  ];

  $("conversation-text").innerHTML = convo.map(line => `<div>${line}</div>`).join("");
  modal.classList.remove("hidden");
}

function closeStartModal() {
  $("start-modal").classList.add("hidden");
}

function beginFirstBattle() {
  closeStartModal();
  alert(`${App.selectedNinja} wins the first battle!`);
  showPage("game-village");
  $("hub-village-name").textContent = `${App.selectedVillage} Village`;
}

/* -----------------------------
   INIT
   ----------------------------- */
(function init(){
  showPage("login-page"); // ALWAYS start at login
  initDifficulty();
})();
