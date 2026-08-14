// --- SHINOBI CHRONICLES CORE SCRIPT ---

const worldRegions = {
  fire: {
    name: "Land of Fire",
    description: "A land of passion and willpower, protected by fierce ninjas and burning spirit.",
    mapImage: "Assets/Backgrounds/inside_LOF.png",
    locations: [
      { id: "konohagakure", name: "Konohagakure (Hidden Leaf)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "The glorious capital hidden behind giant mountain walls.", levelRange: "1-50", bestFor: "Hub & Quests", enemyTypes: "Safe Zone", top: "85%", left: "50%" },
      { id: "training_grounds", name: "Training Grounds", type: "battle", category: "EXP Grinding", desc: "High-density wildlife and rogue ninja scouting grounds.", levelRange: "10-16", bestFor: "EXP", enemyTypes: "Bandits", top: "42%", left: "28%" },
      { id: "bandit_hideout", name: "Bandit Hideout", type: "battle", category: "Loot Hotspot", desc: "Outlaw encampment hiding stolen scrolls and gear.", levelRange: "15-20", bestFor: "Ryo & Materials", enemyTypes: "Rogues", top: "22%", left: "45%" }
    ]
  },
  wind: {
    name: "Land of Wind",
    description: "Vast desert territory known for resilient warriors and sand mastery.",
    mapImage: "Assets/Backgrounds/WorldMap.png",
    locations: [
      { id: "sunagakure", name: "Sunagakure (Hidden Sand)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "Hidden fortress nestled within sweeping desert dunes.", levelRange: "10-60", bestFor: "Puppet Jutsu", enemyTypes: "Safe Zone", top: "50%", left: "50%" }
    ]
  },
  water: {
    name: "Land of Water",
    description: "An isolated island archipelago shrouded in thick mist and brutal traditions.",
    mapImage: "Assets/Backgrounds/WorldMap.png",
    locations: [
      { id: "kirigakure", name: "Kirigakure (Hidden Mist)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "The misty sanctuary of legendary swordsmen.", levelRange: "15-65", bestFor: "Water Style", enemyTypes: "Safe Zone", top: "50%", left: "50%" }
    ]
  },
  earth: {
    name: "Land of Earth",
    description: "Rugged terrain carved out of steep rock canyons and stone formations.",
    mapImage: "Assets/Backgrounds/WorldMap.png",
    locations: [
      { id: "iwagakure", name: "Iwagakure (Hidden Stone)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "Unwavering fortress carved directly into massive stone cliffs.", levelRange: "15-65", bestFor: "Earth Release", enemyTypes: "Safe Zone", top: "50%", left: "50%" }
    ]
  },
  lightning: {
    name: "Land of Lightning",
    description: "Mountain ranges echoing with continuous thunder storms and high-voltage chakra.",
    mapImage: "Assets/Backgrounds/WorldMap.png",
    locations: [
      { id: "kumogakure", name: "Kumogakure (Hidden Cloud)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "Soaring peaks touching the skies where lightning strikes.", levelRange: "20-70", bestFor: "Lightning Release", enemyTypes: "Safe Zone", top: "50%", left: "50%" }
    ]
  }
};

let selectedLocationNode = null;

// --- OVERLAY / MODAL CONTROLS ---
function openOverlay(type) {
  const overlay = document.getElementById('screen-overlay');
  const container = document.getElementById('overlay-content-container');
  if (!overlay || !container) return;

  overlay.style.display = 'flex';
  
  // Render content based on screen type requested
  switch(type) {
    case 'village':
      container.innerHTML = `
        <h2 style="color: #D6A93A; font-size: 16px; margin-bottom: 8px;">HIDDEN LEAF VILLAGE (KONOHAGAKURE)</h2>
        <p style="color: #94A3B8; font-size: 11px; margin-bottom: 15px;">Manage your daily Hokage duties, academy training, and merchant deals.</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; flex: 1;">
          <div style="background: #080C10; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
            <h3 style="color: #00D9E8; font-size: 12px; margin-bottom: 5px;">Hokage Office</h3>
            <p style="color: #64748B; font-size: 10px;">Accept high-rank missions and distribute squad assignments.</p>
          </div>
          <div style="background: #080C10; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
            <h3 style="color: #00D9E8; font-size: 12px; margin-bottom: 5px;">Ichiraku Ramen</h3>
            <p style="color: #64748B; font-size: 10px;">Boost temporary stamina and chakra regen buffers.</p>
          </div>
          <div style="background: #080C10; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
            <h3 style="color: #00D9E8; font-size: 12px; margin-bottom: 5px;">Ninja Academy</h3>
            <p style="color: #64748B; font-size: 10px;">Research new ninjutsu tiers and elemental affinities.</p>
          </div>
        </div>
      `;
      break;
    case 'missions':
      container.innerHTML = `
        <h2 style="color: #D6A93A; font-size: 16px; margin-bottom: 8px;">MISSION BOARD</h2>
        <p style="color: #94A3B8; font-size: 11px; margin-bottom: 15px;">Active B-Rank Contract: Escort the Kazekage Envoy.</p>
      `;
      break;
    case 'battle':
      container.innerHTML = `
        <h2 style="color: #D6A93A; font-size: 16px; margin-bottom: 8px;">COMBAT ARENA</h2>
        <p style="color: #94A3B8; font-size: 11px; margin-bottom: 15px;">Prepare your squad formations for tactical clashes.</p>
      `;
      break;
    default:
      container.innerHTML = `
        <h2 style="color: #D6A93A; font-size: 16px; margin-bottom: 8px;">SYSTEM PENDING</h2>
        <p style="color: #94A3B8; font-size: 11px;">This module is currently under development.</p>
      `;
  }
}

function closeOverlay() {
  const overlay = document.getElementById('screen-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// --- REGION HUB CONTROLS ---
function openRegionHub(regionKey) {
  const region = worldRegions[regionKey];
  if (!region) return;
  
  selectedLocationNode = region.locations[0];

  const overlay = document.getElementById('screen-overlay');
  overlay.style.display = 'flex';

  renderRegionHubUI(region);
}

function renderRegionHubUI(region) {
  const container = document.getElementById('overlay-content-container');
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #1E293B; padding-bottom: 8px;">
      <div>
        <h2 style="font-size: 14px; color: #D6A93A; letter-spacing: 1px;">${region.name.toUpperCase()}</h2>
        <p style="font-size: 10px; color: #94A3B8;">${region.description}</p>
      </div>
    </div>

    <div class="region-hub-container" style="display: flex; gap: 15px; flex: 1; overflow: hidden;">
      
      <!-- Left Interactive Node Map -->
      <div class="region-map-pane" style="flex: 1; background-image: url('${region.mapImage}'); background-size: cover; background-position: center; background-repeat: no-repeat; border: 1px solid #1E293B; border-radius: 6px; position: relative; min-height: 420px;">
        ${region.locations.map(loc => `
          <div class="location-keypoint" 
               style="position: absolute; top: ${loc.top}; left: ${loc.left}; width: 24px; height: 24px; background: ${selectedLocationNode && selectedLocationNode.id === loc.id ? '#D6A93A' : '#00D9E8'}; border: 2px solid #FFF; border-radius: 50%; cursor: pointer; transform: translate(-50%, -50%); box-shadow: 0 0 10px rgba(0,217,232,0.8); display: flex; align-items: center; justify-content: center; font-size: 9px;"
               title="${loc.name}"
               onclick="selectMapNode('${region.id}', '${loc.id}')">
            📍
          </div>
        `).join('')}
      </div>

      <!-- Right Location Details Pane -->
      <div class="region-details-pane" style="width: 300px; background: #080C10; border: 1px solid #1E293B; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 9px; color: #D6A93A; font-weight: bold; margin-bottom: 6px; text-transform: uppercase; border-bottom: 1px solid #1E293B; padding-bottom: 4px;">Location Details</div>
          
          <div style="color: #FFF; font-size: 13px; font-weight: bold; margin-bottom: 2px;">${selectedLocationNode ? selectedLocationNode.name : ''}</div>
          <div style="color: #00D9E8; font-size: 10px; margin-bottom: 8px;">${selectedLocationNode ? selectedLocationNode.category : ''}</div>
          <div style="color: #94A3B8; font-size: 10px; line-height: 1.4; margin-bottom: 12px;">${selectedLocationNode ? selectedLocationNode.desc : ''}</div>

          <div style="display: flex; flex-direction: column; gap: 5px; font-size: 10px; border-top: 1px solid #1E293B; padding-top: 8px;">
            <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Level Range</span><span style="color: #FFF;">${selectedLocationNode ? selectedLocationNode.levelRange : ''}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Best For</span><span style="color: #FFF;">${selectedLocationNode ? selectedLocationNode.bestFor : ''}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Enemy Types</span><span style="color: #FFF;">${selectedLocationNode ? selectedLocationNode.enemyTypes : ''}</span></div>
          </div>
        </div>

        <button class="btn-ninja" style="width: 100%; padding: 8px; font-size: 10px; font-weight: bold; background: #D6A93A; border: none; border-radius: 4px; cursor: pointer; color: #000;" onclick="handleNodeNavigation('${selectedLocationNode ? selectedLocationNode.type : 'battle'}')">
          NAVIGATE ➔
        </button>
      </div>

    </div>
  `;
}

function selectMapNode(regionKey, locId) {
  const region = worldRegions[regionKey];
  if (!region) return;
  selectedLocationNode = region.locations.find(l => l.id === locId);
  renderRegionHubUI(region);
}

function handleNodeNavigation(type) {
  if (type === 'village') {
    openOverlay('village');
  } else {
    openOverlay('battle');
  }
}

function claimDailyReward() {
  alert("Daily reward claimed successfully!");
}