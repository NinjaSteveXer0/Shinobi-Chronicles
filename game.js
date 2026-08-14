// 1. Shinobi Chronicles Character Roster & Combat Engine
const charactersDatabase = {
  naruto: {
    id: "naruto",
    name: "Kage Naruto",
    rank: "Kage",
    rarity: "legendary",
    image: "Assets/Animated Cards/Kage Naruto.png",
    stats: { ninjutsu: 420, taijutsu: 390, genjutsu: 250, fuinjutsu: 310, defense: 380, speed: 410, chakraControl: 450 },
    hp: 1400,
    maxHp: 1400,
    powerPool: 1200,
    maxPowerPool: 1200,
    getPowerLevel: function() {
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
      return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
    }
  },
  sasuke: {
    id: "sasuke",
    name: "Jonin Sasuke",
    rank: "Elite",
    rarity: "legendary",
    image: "Assets/Animated Cards/Jonin Sasuke.png",
    stats: { ninjutsu: 380, taijutsu: 350, genjutsu: 280, fuinjutsu: 200, defense: 330, speed: 360, chakraControl: 350 },
    hp: 1200,
    maxHp: 1200,
    powerPool: 1000,
    maxPowerPool: 1000,
    getPowerLevel: function() {
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
      return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
    }
  },
  sakura: {
    id: "sakura",
    name: "Sannin Sakura",
    rank: "Legendary Sannin",
    rarity: "rare",
    image: "Assets/Animated Cards/Sannin Sakura.png",
    stats: { ninjutsu: 340, taijutsu: 430, genjutsu: 220, fuinjutsu: 380, defense: 360, speed: 320, chakraControl: 400 },
    hp: 1300,
    maxHp: 1300,
    powerPool: 900,
    maxPowerPool: 900,
    getPowerLevel: function() {
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
      return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
    }
  },
  nagato: {
    id: "nagato",
    name: "Teen Nagato",
    rank: "Akatsuki",
    rarity: "legendary",
    image: "Assets/Animated Cards/Teen Nagato.png",
    stats: { ninjutsu: 450, taijutsu: 290, genjutsu: 390, fuinjutsu: 410, defense: 310, speed: 330, chakraControl: 480 },
    hp: 1250,
    maxHp: 1250,
    powerPool: 1300,
    maxPowerPool: 1300,
    getPowerLevel: function() {
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
      return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
    }
  }
};

// Active Battle Combatants
let playerCharacter = charactersDatabase.naruto;
let enemyCharacter = charactersDatabase.sasuke;

let battleState = {
  isBattleOver: false,
  ryo: 14500
};

// 2. Screen Navigation Logic
function switchScreen(screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  if (screenName === 'battle') {
    document.getElementById('screen-battle').classList.add('active');
    document.getElementById('tab-battle').classList.add('active');
  } else if (screenName === 'roster') {
    document.getElementById('screen-roster').classList.add('active');
    document.getElementById('tab-roster').classList.add('active');
    renderRosterGrid();
  }
}

// 3. Render Roster Grid View
function renderRosterGrid() {
  const grid = document.getElementById('roster-grid');
  grid.innerHTML = '';

  Object.values(charactersDatabase).forEach(char => {
    const isSelected = playerCharacter.name === char.name;
    const cardDiv = document.createElement('div');
    cardDiv.className = 'roster-card';
    cardDiv.innerHTML = `
      <div class="character-card-frame card-rarity-${char.rarity}">
        <div class="card-header-tag">${char.rank.toUpperCase()}</div>
        <div class="card-art-container" style="background: url('${char.image}') center/cover no-repeat;"></div>
        <div class="card-footer-stats">
          <div class="card-title">${char.name.toUpperCase()}</div>
          <div class="card-stats-row"><span>PL: <b>${char.getPowerLevel()}</b></span><span>NIN: <b>${char.stats.ninjutsu}</b></span></div>
        </div>
      </div>
      <button class="btn-select-shinobi" onclick="selectActiveShinobi('${char.id}')">
        ${isSelected ? 'ACTIVE' : 'SELECT'}
      </button>
    `;
    grid.appendChild(cardDiv);
  });
}

function selectActiveShinobi(charId) {
  playerCharacter = charactersDatabase[charId];
  updateHUD();
  switchScreen('battle');
  logMessage(`✨ Deployed ${playerCharacter.name} into battle!`);
}

// 4. Combat Logging & Feedback
function logMessage(msg, color = "#00D9E8") {
  const log = document.getElementById('combat-log');
  if (log) {
    log.style.color = color;
    log.innerHTML = msg;
  }
}

// 5. Action Buttons Logic
function performNinjutsuStrike() {
  if (battleState.isBattleOver) return;

  const chakraCost = 150;
  if (playerCharacter.powerPool < chakraCost) {
    logMessage("⚠️ Not enough Chakra/Power Pool! Use Chakra Restore.", "#E53935");
    return;
  }

  playerCharacter.powerPool -= chakraCost;
  updateHUD();

  let statScaling = playerCharacter.stats.ninjutsu * 0.4;
  let plMultiplier = playerCharacter.getPowerLevel() / 100;
  let rawDamage = Math.floor((Math.random() * 20 + 30 + statScaling) * (plMultiplier / 10));
  let finalDamage = Math.max(10, rawDamage - Math.floor(enemyCharacter.stats.defense * 0.2));
  
  enemyCharacter.hp = Math.max(0, enemyCharacter.hp - finalDamage);
  document.getElementById('enemy-fill-bar').style.width = `${(enemyCharacter.hp / enemyCharacter.maxHp) * 100}%`;

  if (enemyCharacter.hp <= 0) {
    battleState.isBattleOver = true;
    battleState.ryo += 1200;
    updateHUD();
    logMessage(`🎉 VICTORY! ${enemyCharacter.name} defeated. Gained 1,200 Ryo!`, "#D6A93A");
    return;
  }

  let enemyRawDmg = Math.floor((Math.random() * 15 + 20 + (enemyCharacter.stats.ninjutsu * 0.3)));
  let enemyFinalDmg = Math.max(5, enemyRawDmg - Math.floor(playerCharacter.stats.defense * 0.2));
  
  playerCharacter.hp = Math.max(0, playerCharacter.hp - enemyFinalDmg);
  document.getElementById('player-fill-bar').style.width = `${(playerCharacter.hp / playerCharacter.maxHp) * 100}%`;

  if (playerCharacter.hp <= 0) {
    battleState.isBattleOver = true;
    logMessage(`💀 DEFEAT... Your PL was insufficient to overcome ${enemyCharacter.name}.`, "#E53935");
    return;
  }

  logMessage(`⚡ Ninjutsu Strike dealt ${finalDamage} damage! ${enemyCharacter.name} counters for ${enemyFinalDmg}.`);
}

function performChakraRestore() {
  if (battleState.isBattleOver) return;

  playerCharacter.powerPool = Math.min(playerCharacter.maxPowerPool, playerCharacter.powerPool + 300);
  playerCharacter.hp = Math.min(playerCharacter.maxHp, playerCharacter.hp + 100);
  
  updateHUD();
  document.getElementById('player-fill-bar').style.width = `${(playerCharacter.hp / playerCharacter.maxHp) * 100}%`;
  logMessage("💧 Focused breathing. Restored 300 Chakra and recovered health.");
}

function performFlee() {
  playerCharacter.hp = playerCharacter.maxHp;
  enemyCharacter.hp = enemyCharacter.maxHp;
  playerCharacter.powerPool = playerCharacter.maxPowerPool;
  battleState.isBattleOver = false;

  document.getElementById('player-fill-bar').style.width = '100%';
  document.getElementById('enemy-fill-bar').style.width = '100%';
  updateHUD();
  logMessage("💨 Successfully fled from battle. Ready to try again.");
}

function updateHUD() {
  document.getElementById('hud-chakra').textContent = `${playerCharacter.powerPool}/${playerCharacter.maxPowerPool}`;
  document.getElementById('hud-ryo').textContent = battleState.ryo.toLocaleString();
  document.getElementById('hud-rank').textContent = playerCharacter.rank;

  // Update Player Card Display & Artwork
  document.getElementById('player-pl-display').textContent = playerCharacter.getPowerLevel();
  document.getElementById('player-nin-display').textContent = playerCharacter.stats.ninjutsu;
  document.getElementById('player-title').textContent = playerCharacter.name.toUpperCase();
  document.getElementById('player-name-label').textContent = playerCharacter.name.toUpperCase();
  document.getElementById('player-header-tag').textContent = playerCharacter.rank.toUpperCase();
  document.getElementById('player-art').style.background = `url('${playerCharacter.image}') center/cover no-repeat`;

  // Update Enemy Card Display & Artwork
  document.getElementById('enemy-pl-display').textContent = enemyCharacter.getPowerLevel();
  document.getElementById('enemy-nin-display').textContent = enemyCharacter.stats.ninjutsu;
  document.getElementById('enemy-title').textContent = enemyCharacter.name.toUpperCase();
  document.getElementById('enemy-name-label').textContent = enemyCharacter.name.toUpperCase();
  document.getElementById('enemy-header-tag').textContent = enemyCharacter.rank.toUpperCase();
  document.getElementById('enemy-art').style.background = `url('${enemyCharacter.image}') center/cover no-repeat`;
}

// 6. Initialization & Listeners
document.addEventListener("DOMContentLoaded", () => {
  updateHUD();

  const particleContainer = document.getElementById('particle-container');
  if (particleContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 5 + 5) + 's';
      p.style.animationDelay = Math.random() * 5 + 's';
      particleContainer.appendChild(p);
    }
  }
});