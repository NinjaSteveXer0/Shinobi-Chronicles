// 1. Shinobi Chronicles Core Combat Engine: PL & Seven Stats Data
let playerCharacter = {
  name: "Shadow Ninja",
  rank: "Jonin",
  stats: {
    ninjutsu: 320,
    taijutsu: 280,
    genjutsu: 210,
    fuinjutsu: 150,
    defense: 290,
    speed: 340,
    chakraControl: 300
  },
  hp: 1000,
  maxHp: 1000,
  powerPool: 850,
  maxPowerPool: 850,
  ryo: 14500,
  getPowerLevel: function() {
    let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
    return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
  }
};

let enemyCharacter = {
  name: "Jonin Sasuke",
  rank: "Elite",
  stats: {
    ninjutsu: 380,
    taijutsu: 350,
    genjutsu: 280,
    fuinjutsu: 200,
    defense: 330,
    speed: 360,
    chakraControl: 350
  },
  hp: 1200,
  maxHp: 1200,
  powerPool: 1000,
  maxPowerPool: 1000,
  getPowerLevel: function() {
    let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0);
    return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
  }
};

let battleState = {
  isBattleOver: false
};

// 2. Combat Logging & Feedback
function logMessage(msg, color = "#00D9E8") {
  const log = document.getElementById('combat-log');
  if (log) {
    log.style.color = color;
    log.innerHTML = msg;
  }
}

// 3. Action Buttons Logic (Powered by Seven Stats & PL)
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
  let enemyHpPercent = (enemyCharacter.hp / enemyCharacter.maxHp) * 100;
  document.getElementById('enemy-fill-bar').style.width = enemyHpPercent + '%';

  if (enemyCharacter.hp <= 0) {
    battleState.isBattleOver = true;
    playerCharacter.ryo += 1200;
    updateHUD();
    logMessage(`🎉 VICTORY! ${enemyCharacter.name} defeated. PL Verified. Gained 1,200 Ryo!`, "#D6A93A");
    return;
  }

  let enemyRawDmg = Math.floor((Math.random() * 15 + 20 + (enemyCharacter.stats.ninjutsu * 0.3)));
  let enemyFinalDmg = Math.max(5, enemyRawDmg - Math.floor(playerCharacter.stats.defense * 0.2));
  
  playerCharacter.hp = Math.max(0, playerCharacter.hp - enemyFinalDmg);
  let playerHpPercent = (playerCharacter.hp / playerCharacter.maxHp) * 100;
  document.getElementById('player-fill-bar').style.width = playerHpPercent + '%';

  if (playerCharacter.hp <= 0) {
    battleState.isBattleOver = true;
    logMessage(`💀 DEFEAT... Your PL was insufficient to overcome ${enemyCharacter.name}.`, "#E53935");
    return;
  }

  logMessage(`⚡ Ninjutsu Strike dealt ${finalDamage} damage! (PL: ${playerCharacter.getPowerLevel()}). Sasuke counters for ${enemyFinalDmg}.`);
}

function performChakraRestore() {
  if (battleState.isBattleOver) return;

  playerCharacter.powerPool = Math.min(playerCharacter.maxPowerPool, playerCharacter.powerPool + 300);
  playerCharacter.hp = Math.min(playerCharacter.maxHp, playerCharacter.hp + 100);
  
  updateHUD();
  let playerHpPercent = (playerCharacter.hp / playerCharacter.maxHp) * 100;
  document.getElementById('player-fill-bar').style.width = playerHpPercent + '%';

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
  document.getElementById('hud-ryo').textContent = playerCharacter.ryo.toLocaleString();
  
  // Render calculated Power Levels onto the cards
  document.getElementById('player-pl-display').textContent = playerCharacter.getPowerLevel();
  document.getElementById('enemy-pl-display').textContent = enemyCharacter.getPowerLevel();
}

// 4. Initialization & Listeners
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