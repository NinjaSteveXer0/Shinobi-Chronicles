/* ==========================================================
   CHARACTER STATS & POWER LEVEL LOGIC
   ================================================---------- */

const shadowNinja = {
  name: "Shadow Ninja",
  rank: "Academy Student",
  assetPath: "Assets/Animated Cards/Shadow Ninja.png",
  stats: {
    taijutsu: 2,
    ninjutsu: 3,
    bukishi: 1,
    fuinjutsu: 0,
    kinjutsu: 1, 
    genjutsu: 0,
    stamina: 3
  },
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

const joninSasuke = {
  name: "Jonin Sasuke",
  rank: "Jonin",
  assetPath: "Assets/Animated Cards/Jonin Sasuke.png",
  stats: {
    taijutsu: 8,
    ninjutsu: 10,
    bukishi: 5,
    fuinjutsu: 2,
    kinjutsu: 0,
    genjutsu: 3,
    stamina: 7
  },
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
  let backlashPenalty = false;
  let combatLog = [];

  combatLog.push(`--- BATTLE STARTED: VS ${bossEnemy.name} (PL: ${remainingBossPL}) ---`);

  for (let i = 0; i < playerTeam.length; i++) {
    let ninja = playerTeam[i];
    let basePL = ninja.getPowerLevel();
    let effectivePL = basePL;

    if (backlashPenalty) {
      effectivePL = Math.floor(effectivePL / 2);
      combatLog.push(`⚠️ ${ninja.name} is staggered by Kinjutsu backlash! Power reduced to ${effectivePL}.`);
      backlashPenalty = false;
    }

    if (ninja.stats.kinjutsu > 0 && ninja.useKinjutsuThisTurn) {
      effectivePL = effectivePL * 3;
      backlashPenalty = true;
      combatLog.push(`🔥 ${ninja.name} activates KINJUTSU! Power multiplied to ${effectivePL}!`);
    }

    remainingBossPL -= effectivePL;
    combatLog.push(`⚔️ ${ninja.name} strikes for ${effectivePL} damage! Boss PL remaining: ${Math.max(0, remainingBossPL)}`);

    if (remainingBossPL <= 0) {
      combatLog.push(`🎉 VICTORY! ${bossEnemy.name} was defeated!`);
      return { success: true, log: combatLog, remainingBossPL: 0 };
    } else {
      combatLog.push(`💀 ${ninja.name} was exhausted and defeated by the boss.`);
    }
  }

  combatLog.push(`❌ DEFEAT! Your team ran out of ninjas. Boss survived with ${remainingBossPL} PL.`);
  return { success: false, log: combatLog, remainingBossPL: remainingBossPL };
}


/* ==========================================================
   UI CONTROLLER & GAME FLOW MANAGER
   ================================================---------- */

const App = {
  currentBoss: null,
  activeTeam: [shadowNinja, joninSasuke],

  switchScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  },

  startMission(missionName, bossPL) {
    this.currentBoss = { name: missionName, powerLevel: bossPL };
    
    // Bind UI elements in battle screen
    document.getElementById('battle-player-name').innerText = shadowNinja.name;
    document.getElementById('battle-player-img').src = shadowNinja.assetPath;
    document.getElementById('battle-player-pl').innerText = shadowNinja.getPowerLevel();

    document.getElementById('battle-enemy-name').innerText = missionName;
    document.getElementById('battle-enemy-img').src = joninSasuke.assetPath;
    document.getElementById('battle-enemy-pl').innerText = bossPL;

    const healthBar = document.getElementById('boss-health-bar');
    healthBar.max = bossPL;
    healthBar.value = bossPL;
    document.getElementById('boss-hp-text').innerText = `${bossPL} / ${bossPL}`;

    document.getElementById('combat-log-box').innerHTML = `<p>Ready to fight ${missionName} (Boss PL: ${bossPL})</p>`;
    
    this.switchScreen('screen-battle');
  },

  runSequentialFight() {
    let result = startBattle(this.activeTeam, this.currentBoss);
    let logBox = document.getElementById('combat-log-box');
    logBox.innerHTML = result.log.map(line => `<p>${line}</p>`).join('');

    let healthBar = document.getElementById('boss-health-bar');
    healthBar.value = result.remainingBossPL;
    document.getElementById('boss-hp-text').innerText = `${result.remainingBossPL} / ${this.currentBoss.powerLevel}`;

    if (result.success) {
      setTimeout(() => {
        this.switchScreen('screen-victory');
      }, 1500);
    }
  },

  skipFight() {
    this.runSequentialFight();
  },

  returnToWorld() {
    this.switchScreen('screen-world');
  }
};