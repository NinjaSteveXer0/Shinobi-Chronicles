// ==========================================
// 1. CHARACTER ROSTER & SHOP DATABASE
// ==========================================
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
    inventory: [],
    getPowerLevel: function() {
      let itemBonus = this.inventory.reduce((sum, item) => sum + item.statBonus, 0);
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0) + itemBonus;
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
    inventory: [],
    getPowerLevel: function() {
      let itemBonus = this.inventory.reduce((sum, item) => sum + item.statBonus, 0);
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0) + itemBonus;
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
    inventory: [],
    getPowerLevel: function() {
      let itemBonus = this.inventory.reduce((sum, item) => sum + item.statBonus, 0);
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0) + itemBonus;
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
    inventory: [],
    getPowerLevel: function() {
      let itemBonus = this.inventory.reduce((sum, item) => sum + item.statBonus, 0);
      let totalStats = Object.values(this.stats).reduce((a, b) => a + b, 0) + itemBonus;
      return Math.floor(totalStats * 1.5 + (this.maxHp / 10));
    }
  }
};

const shopItems = [
  { id: "kunai", name: "Chakra Blade Kunai", desc: "Boosts overall combat stats and precision.", price: 2500, statBonus: 40 },
  { id: "scroll", name: "Forbidden Jutsu Scroll", desc: "Unlocks advanced chakra circulation channels.", price: 5000, statBonus: 90 },
  { id: "flak", name: "Elite Jonin Flak Jacket", desc: "Reinforced woven armor providing high defense.", price: 3500, statBonus: 60 }
];

// ==========================================
// REGION HIERARCHY DATA & FUNCTIONS
// ==========================================
const worldRegions = {
  fire: {
    name: "Land of Fire",
    description: "The heartland of the shinobi world, dominated by thick forests and Konohagakure.",
    mapImage: "Assets/Maps/Land_of_Fire_Detail.png",
    locations: [
      { id: "konoha", name: "Konohagakure Village", type: "safe", category: "VILLAGE HUB", desc: "Home base for shopping, roster management, and daily training.", top: "45%", left: "40%" },
      { id: "training_fields", name: "Death Forest", type: "activity", category: "EXP & GOLD GRINDING", desc: "High-density wildlife and rogue ninja scouting grounds for earning rewards.", top: "30%", left: "60%" },
      { id: "valley_end", name: "Valley of the End", type: "battle", category: "HIGH THREAT BOSS", desc: "Legendary battlefield. High-threat boss encounters with rare drop chance loot.", top: "70%", left: "75%" }
    ]
  },
  wind: {
    name: "Land of Wind",
    description: "Vast desert expanses guarded by Sunagakure and harsh sandstorms.",
    mapImage: "Assets/Maps/Land_of_Wind_Detail.png",
    locations: [
      { id: "sunagakure", name: "Sunagakure Village", type: "safe", category: "VILLAGE HUB", desc: "Hidden Sand stronghold.", top: "50%", left: "35%" },
      { id: "desert_canyon", name: "Howling Sand Canyon", type: "battle", category: "BOUNTY HUNTING", desc: "Ambush zone for rogue puppet masters and missing-nin.", top: "65%", left: "60%" }
    ]
  },
  water: {
    name: "Land of Water",
    description: "Misty archipelagos surrounded by dense fog and hidden ninja mist bases.",
    mapImage: "Assets/Maps/Land_of_Water_Detail.png",
    locations: [
      { id: "kirigakure", name: "Kirigakure Village", type: "safe", category: "VILLAGE HUB", desc: "Mist-shrouded village headquarters.", top: "40%", left: "50%" },
      { id: "mist_forest", name: "Forest of the Seven Swords", type: "battle", category: "RARE DROP LOOT", desc: "Deadly grounds where elite Seven Swordsmen artifacts drop.", top: "60%", left: "70%" }
    ]
  },
  earth: {
    name: "Land of Earth",
    description: "Rugged mountainous terrain with natural stone defenses.",
    mapImage: "Assets/Maps/Land_of_Earth_Detail.png",
    locations: [
      { id: "iwagakure", name: "Iwagakure Village", type: "safe", category: "VILLAGE HUB", desc: "Impenetrable mountain fortress village.", top: "35%", left: "45%" },
      { id: "stone_quarry", name: "Stone Quarry Outpost", type: "activity", category: "EXP GRINDING", desc: "Ideal location for physical taijutsu training and stamina gains.", top: "55%", left: "65%" }
    ]
  },
  lightning: {
    name: "Land of Lightning",
    description: "High mountain peaks piercing through thunderstorm clouds.",
    mapImage: "Assets/Maps/Land_of_Lightning_Detail.png",
    locations: [
      { id: "kumogakure", name: "Kumogakure Village", type: "safe", category: "VILLAGE HUB", desc: "Cloud village suspended high above the valley.", top: "30%", left: "55%" },
      { id: "thunder_canyon", name: "Thunder Plateau", type: "battle", category: "HIGH THREAT BOSS", desc: "Electrified arena home to powerful lightning jutsu masters.", top: "60%", left: "40%" }
    ]
  }
};

function openRegionHub(regionKey) {
  const region = worldRegions[regionKey];
  if (!region) return;
  
  const overlay = document.getElementById('screen-overlay');
  const container = document.getElementById('overlay-content-container');
  overlay.style.display = 'flex';

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <div>
        <h2 style="font-size: 16px; color: #D6A93A; letter-spacing: 1px;">${region.name.toUpperCase()}</h2>
        <p style="font-size: 11px; color: #94A3B8;">${region.description}</p>
      </div>
    </div>

    <div class="region-hub-container" style="display: flex; gap: 20px; flex: 1; min-height: 400px;">
      <!-- Left Map / Keypoints Pane -->
      <div class="region-map-pane" style="flex: 1; background: rgba(8, 12, 16, 0.8) url('${region.mapImage}') center/cover no-repeat; border: 1px solid #1E293B; border-radius: 8px; position: relative; min-height: 350px;">
        ${region.locations.map(loc => `
          <div class="location-keypoint" 
               style="position: absolute; top: ${loc.top}; left: ${loc.left}; width: 22px; height: 22px; background: #00D9E8; border: 2px solid #FFF; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px #00D9E8;"
               title="${loc.name}"
               onclick="highlightLocation('${loc.id}')">
          </div>
        `).join('')}
      </div>

      <!-- Right Details & Actions Pane -->
      <div class="region-details-pane" style="width: 360px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto;">
        ${region.locations.map(loc => `
          <div id="loc-card-${loc.id}" style="background: #080C10; border: 1px solid #1E293B; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 9px; font-weight: bold; color: #D6A93A; background: rgba(214, 169, 58, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(214, 169, 58, 0.3);">${loc.category}</span>
            </div>
            <div style="color: #FFF; font-size: 13px; font-weight: bold;">${loc.name}</div>
            <div style="color: #94A3B8; font-size: 11px; line-height: 1.4;">${loc.desc}</div>
            <button class="btn-ninja" style="margin-top: 4px;" onclick="handleLocationAction('${loc.type}')">ENTER LOCATION</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function highlightLocation(locationId) {
  const card = document.getElementById(`loc-card-${locationId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    card.style.borderColor = '#00D9E8';
    setTimeout(() => { card.style.borderColor = '#1E293B'; }, 1500);
  }
}

function handleLocationAction(type) {
  if (type === 'battle' || type === 'activity') {
    openOverlay('battle');
  } else {
    openOverlay('village');
  }
}

// ==========================================
// 3. OVERLAY & NAVIGATION SYSTEM
// ==========================================
let playerCharacter = charactersDatabase.naruto;
let enemyCharacter = charactersDatabase.sasuke;

let battleState = {
  isBattleOver: false,
  ryo: 14500
};

function openOverlay(screenType) {
  const overlay = document.getElementById('screen-overlay');
  const container = document.getElementById('overlay-content-container');
  overlay.style.display = 'flex';

  if (screenType === 'battle') {
    container.innerHTML = `
      <div class="battle-arena">
        <div class="battle-environment" id="particle-container"></div>
        <div class="combatants-stage">
          <div class="combatant">
            <div id="player-card-frame" class="character-card-frame card-rarity-legendary">
              <div id="player-header-tag" class="card-header-tag">KAGE</div>
              <div id="player-art" class="card-art-container"></div>
              <div class="card-footer-stats">
                <div id="player-title" class="card-title">KAGE NARUTO</div>
                <div class="card-stats-row"><span>PL: <b id="player-pl-display">0</b></span><span>NIN: <b id="player-nin-display">420</b></span></div>
              </div>
            </div>
            <div class="health-bar-container">
              <span id="player-name-label" class="name">KAGE NARUTO</span>
              <div class="bar"><div id="player-fill-bar" class="fill" style="width: 100%;"></div></div>
            </div>
          </div>
          <div class="versus-badge">VS</div>
          <div class="combatant">
            <div id="enemy-card-frame" class="character-card-frame card-rarity-legendary">
              <div id="enemy-header-tag" class="card-header-tag">ELITE</div>
              <div id="enemy-art" class="card-art-container"></div>
              <div class="card-footer-stats">
                <div id="enemy-title" class="card-title">JONIN SASUKE</div>
                <div class="card-stats-row"><span>PL: <b id="enemy-pl-display">0</b></span><span>NIN: <b id="enemy-nin-display">380</b></span></div>
              </div>
            </div>
            <div class="health-bar-container">
              <span id="enemy-name-label" class="name">JONIN SASUKE</span>
              <div class="bar"><div id="enemy-fill-bar" class="fill enemy" style="width: 100%;"></div></div>
            </div>
          </div>
        </div>
        <div class="combat-console">
          <div id="combat-log" class="action-feedback-log" style="color: #00D9E8;">⚡ Battle ready in Konohagakure arena. Choose your action.</div>
          <div class="action-buttons">
            <button class="btn-ninja" onclick="performNinjutsuStrike()">NINJUTSU STRIKE</button>
            <button class="btn-ninja" onclick="performChakraRestore()">CHAKRA RESTORE</button>
            <button class="btn-ninja" onclick="performFlee()">FLEE</button>
          </div>
        </div>
      </div>
    `;
    initParticles();
    updateHUD();
  } else if (screenType === 'roster') {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 20px;">SHINOBI ROSTER MANAGEMENT</h2>
      <div id="roster-grid" class="roster-grid"></div>
    `;
    renderRosterGrid();
  } else if (screenType === 'shop') {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 20px;">VILLAGE ARSENAL & SHOP</h2>
      <div id="shop-grid" class="shop-grid"></div>
    `;
    renderShopGrid();
  } else if (screenType === 'village') {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 10px;">KONOHAGAKURE - HIDDEN LEAF VILLAGE</h2>
      <p style="font-size: 12px; color: #94A3B8; line-height: 1.5;">Welcome back to your home base, Shinobi. Manage your active squad in the Roster, upgrade gear at the Shop, or deploy directly to location objectives across the world map.</p>
    `;
  } else if (screenType === 'missions') {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 10px;">ACTIVE MISSION: ESCORT THE KAZEKAGE ENVOY</h2>
      <p style="font-size: 12px; color: #94A3B8; line-height: 1.5;">Rank: B | Difficulty: 780 PL. Guard the diplomatic party safely through hostile terrain.</p>
    `;
  } else if (screenType === 'events') {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 10px;">WORLD EVENTS & THREATS</h2>
      <p style="font-size: 12px; color: #94A3B8; line-height: 1.5;">Village Defense starting soon. Akatsuki increased activity detected across border regions.</p>
    `;
  }
}

function closeOverlay() {
  document.getElementById('screen-overlay').style.display = 'none';
}

function claimDailyReward() {
  battleState.ryo += 500;
  updateHUD();
  openOverlay('village');
  const container = document.getElementById('overlay-content-container');
  if (container) {
    container.innerHTML = `
      <h2 style="font-size: 15px; color: #D6A93A; margin-bottom: 10px;">🎁 DAILY REWARD CLAIMED</h2>
      <p style="font-size: 12px; color: #00D9E8; line-height: 1.5;">Successfully claimed your daily provisions! +500 Ryo added to your treasury.</p>
    `;
  }
}

// ==========================================
// 4. ROSTER GRID & SHOP RENDERERS
// ==========================================
function renderRosterGrid() {
  const grid = document.getElementById('roster-grid');
  if (!grid) return;
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
        ${isSelected ? 'ACTIVE SHINOBI' : 'DEPLOY SHINOBI'}
      </button>
    `;
    grid.appendChild(cardDiv);
  });
}

function selectActiveShinobi(charId) {
  playerCharacter = charactersDatabase[charId];
  updateHUD();
  closeOverlay();
  openOverlay('battle');
  logMessage(`✨ Deployed ${playerCharacter.name} into battle!`);
}

function renderShopGrid() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;
  grid.innerHTML = '';

  shopItems.forEach(item => {
    const alreadyOwned = playerCharacter.inventory.some(i => i.id === item.id);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'shop-item-card';
    itemDiv.innerHTML = `
      <div>
        <div class="shop-item-title">${item.name}</div>
        <div class="shop-item-desc">${item.desc}</div>
      </div>
      <div class="shop-item-footer">
        <span class="shop-item-price">💰 ${item.price.toLocaleString()} Ryo</span>
        <button class="btn-buy-item" onclick="buyShopItem('${item.id}')" ${alreadyOwned ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          ${alreadyOwned ? 'OWNED' : 'PURCHASE'}
        </button>
      </div>
    `;
    grid.appendChild(itemDiv);
  });
}

function buyShopItem(itemId) {
  const item = shopItems.find(i => i.id === itemId);
  if (!item) return;

  if (battleState.ryo < item.price) {
    alert("Insufficient Ryo to purchase this item!");
    return;
  }

  battleState.ryo -= item.price;
  playerCharacter.inventory.push(item);
  updateHUD();
  renderShopGrid();
}

// ==========================================
// 5. COMBAT ENGINE FUNCTIONS
// ==========================================
function logMessage(msg, color = "#00D9E8") {
  const log = document.getElementById('combat-log');
  if (log) {
    log.style.color = color;
    log.innerHTML = msg;
  }
}

function performNinjutsuStrike() {
  if (battleState.isBattleOver) return;

  const chakraCost = 150;
  if (playerCharacter.powerPool < chakraCost) {
    logMessage("⚠️ Not enough Chakra! Use Chakra Restore.", "#E53935");
    return;
  }

  playerCharacter.powerPool -= chakraCost;
  updateHUD();

  let statScaling = playerCharacter.stats.ninjutsu * 0.4;
  let plMultiplier = playerCharacter.getPowerLevel() / 100;
  let rawDamage = Math.floor((Math.random() * 20 + 30 + statScaling) * (plMultiplier / 10));
  let finalDamage = Math.max(10, rawDamage - Math.floor(enemyCharacter.stats.defense * 0.2));
  
  enemyCharacter.hp = Math.max(0, enemyCharacter.hp - finalDamage);
  const enemyBar = document.getElementById('enemy-fill-bar');
  if (enemyBar) enemyBar.style.width = `${(enemyCharacter.hp / enemyCharacter.maxHp) * 100}%`;

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
  const playerBar = document.getElementById('player-fill-bar');
  if (playerBar) playerBar.style.width = `${(playerCharacter.hp / playerCharacter.maxHp) * 100}%`;

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
  const playerBar = document.getElementById('player-fill-bar');
  if (playerBar) playerBar.style.width = `${(playerCharacter.hp / playerCharacter.maxHp) * 100}%`;
  logMessage("💧 Focused breathing. Restored 300 Chakra and recovered health.");
}

function performFlee() {
  playerCharacter.hp = playerCharacter.maxHp;
  enemyCharacter.hp = enemyCharacter.maxHp;
  playerCharacter.powerPool = playerCharacter.maxPowerPool;
  battleState.isBattleOver = false;

  const playerBar = document.getElementById('player-fill-bar');
  const enemyBar = document.getElementById('enemy-fill-bar');
  if (playerBar) playerBar.style.width = '100%';
  if (enemyBar) enemyBar.style.width = '100%';

  updateHUD();
  logMessage("💨 Successfully fled from battle back to open territory.");
}

function updateHUD() {
  const ryoEl = document.getElementById('hud-ryo');
  const chakraEl = document.getElementById('hud-chakra');
  const rankEl = document.getElementById('hud-rank');

  if (ryoEl) ryoEl.textContent = battleState.ryo.toLocaleString();
  if (chakraEl) chakraEl.textContent = `${playerCharacter.powerPool}/${playerCharacter.maxPowerPool}`;
  if (rankEl) rankEl.textContent = playerCharacter.rank;

  const pPl = document.getElementById('player-pl-display');
  if (pPl) {
    document.getElementById('player-pl-display').textContent = playerCharacter.getPowerLevel();
    document.getElementById('player-nin-display').textContent = playerCharacter.stats.ninjutsu;
    document.getElementById('player-title').textContent = playerCharacter.name.toUpperCase();
    document.getElementById('player-name-label').textContent = playerCharacter.name.toUpperCase();
    document.getElementById('player-header-tag').textContent = playerCharacter.rank.toUpperCase();
    document.getElementById('player-art').style.background = `url('${playerCharacter.image}') center/cover no-repeat`;

    document.getElementById('enemy-pl-display').textContent = enemyCharacter.getPowerLevel();
    document.getElementById('enemy-nin-display').textContent = enemyCharacter.stats.ninjutsu;
    document.getElementById('enemy-title').textContent = enemyCharacter.name.toUpperCase();
    document.getElementById('enemy-name-label').textContent = enemyCharacter.name.toUpperCase();
    document.getElementById('enemy-header-tag').textContent = enemyCharacter.rank.toUpperCase();
    document.getElementById('enemy-art').style.background = `url('${enemyCharacter.image}') center/cover no-repeat`;
  }
}

// ==========================================
// 6. AMBIENT PARTICLES & INITIALIZATION
// ==========================================
function initParticles() {
  const particleContainer = document.getElementById('particle-container');
  if (particleContainer && particleContainer.children.length === 0) {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = (Math.random() * 50 + 50) + '%';
      p.style.animationDuration = (Math.random() * 4 + 4) + 's';
      p.style.animationDelay = Math.random() * 3 + 's';
      particleContainer.appendChild(p);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateHUD();
});