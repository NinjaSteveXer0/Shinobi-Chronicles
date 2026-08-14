const worldRegions = {
  fire: {
    name: "Land of Fire",
    description: "A land of passion and willpower, protected by fierce ninjas and burning spirit.",
    mapImage: "Assets/Backgrounds/inside_LOF.png",
    locations: [
      { id: "konohagakure", name: "Konohagakure (Hidden Leaf)", type: "village", category: "CAPITAL VILLAGE HUB", desc: "The glorious capital hidden behind giant mountain walls.", levelRange: "1-50", bestFor: "Hub & Quests", enemyTypes: "Safe Zone", x: 50, y: 86 },
      { id: "training_grounds", name: "Training Grounds", type: "battle", category: "EXP Grinding", desc: "High-density wildlife and rogue ninja scouting grounds.", levelRange: "10-16", bestFor: "EXP", enemyTypes: "Bandits", x: 30, y: 44 },
      { id: "bandit_hideout", name: "Bandit Hideout", type: "battle", category: "Loot Hotspot", desc: "Outlaw encampment hiding stolen scrolls and gear.", levelRange: "15-20", bestFor: "Ryo & Materials", enemyTypes: "Rogues", x: 26, y: 22 }
    ]
  }
};

let selectedLocationNode = null;

function openOverlay(type) {
  const overlay = document.getElementById('screen-overlay');
  const container = document.getElementById('overlay-content-container');
  if (!overlay || !container) return;

  overlay.style.display = 'flex';
  
  if (type === 'village') {
    container.innerHTML = `
      <h2 style="color: #D6A93A; font-size: 15px; margin-bottom: 6px;">HIDDEN LEAF VILLAGE (KONOHAGAKURE)</h2>
      <p style="color: #94A3B8; font-size: 10px; margin-bottom: 12px;">Manage your daily Hokage duties, academy training, and merchant deals.</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; flex: 1;">
        <div style="background: #111827; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
          <h3 style="color: #00D9E8; font-size: 11px; margin-bottom: 4px;">Hokage Office</h3>
          <p style="color: #64748B; font-size: 9px;">Accept high-rank missions and distribute squad assignments.</p>
        </div>
        <div style="background: #111827; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
          <h3 style="color: #00D9E8; font-size: 11px; margin-bottom: 4px;">Ichiraku Ramen</h3>
          <p style="color: #64748B; font-size: 9px;">Boost temporary stamina and chakra regen buffers.</p>
        </div>
        <div style="background: #111827; border: 1px solid #1E293B; padding: 12px; border-radius: 6px;">
          <h3 style="color: #00D9E8; font-size: 11px; margin-bottom: 4px;">Ninja Academy</h3>
          <p style="color: #64748B; font-size: 9px;">Research new ninjutsu tiers and elemental affinities.</p>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <h2 style="color: #D6A93A; font-size: 15px; margin-bottom: 6px;">MODULE ACTIVE</h2>
      <p style="color: #94A3B8; font-size: 10px;">System loaded successfully.</p>
    `;
  }
}

function closeOverlay() {
  const overlay = document.getElementById('screen-overlay');
  if (overlay) overlay.style.display = 'none';
}

function openRegionHub(regionKey) {
  const region = worldRegions[regionKey];
  if (!region) return;
  
  selectedLocationNode = region.locations[0];
  const overlay = document.getElementById('screen-overlay');
  overlay.style.display = 'flex';

  renderRegionHubUI(regionKey, region);
}

function renderRegionHubUI(regionKey, region) {
  const container = document.getElementById('overlay-content-container');
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #1E293B; padding-bottom: 6px;">
      <div>
        <h2 style="font-size: 13px; color: #D6A93A; letter-spacing: 1px; margin: 0;">${region.name.toUpperCase()}</h2>
        <p style="font-size: 9px; color: #94A3B8; margin: 2px 0 0 0;">${region.description}</p>
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex: 1; overflow: hidden;">
      <div style="flex: 1; position: relative; overflow: hidden; border: 1px solid #1E293B; border-radius: 6px; background: #05080c; display: flex; align-items: center; justify-content: center;">
        <img src="${region.mapImage}" alt="${region.name}" style="width: 100%; height: 100%; object-fit: contain; display: block;" />

        ${region.locations.map(loc => `
          <button style="position: absolute; left: ${loc.x}%; top: ${loc.y}%; transform: translate(-50%, -50%); background: none; border: none; cursor: pointer; z-index: 5;"
                  onclick="selectMapNode('${regionKey}', '${loc.id}')">
            <span style="display: block; width: 22px; height: 22px; border: 2px solid #FFF; border-radius: 50%; background: ${selectedLocationNode && selectedLocationNode.id === loc.id ? '#FFF' : '#D6A93A'}; box-shadow: 0 0 8px #D6A93A;"></span>
            <span style="display: block; margin-top: 3px; padding: 2px 6px; background: rgba(5,8,12,0.92); border: 1px solid #334155; border-radius: 3px; color: #FFF; font-size: 8px; font-weight: 700; white-space: nowrap;">${loc.name}</span>
          </button>
        `).join('')}
      </div>

      <div style="width: 270px; background: #080C10; border: 1px solid #1E293B; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 9px; color: #D6A93A; font-weight: bold; margin-bottom: 6px; text-transform: uppercase; border-bottom: 1px solid #1E293B; padding-bottom: 4px;">Location Details</div>
          <div style="color: #FFF; font-size: 12px; font-weight: bold; margin-bottom: 2px;">${selectedLocationNode ? selectedLocationNode.name : ''}</div>
          <div style="color: #00D9E8; font-size: 9px; margin-bottom: 8px;">${selectedLocationNode ? selectedLocationNode.category : ''}</div>
          <div style="color: #94A3B8; font-size: 9px; line-height: 1.4; margin-bottom: 12px;">${selectedLocationNode ? selectedLocationNode.desc : ''}</div>
          <div style="display: flex; flex-direction: column; gap: 5px; font-size: 9px; border-top: 1px solid #1E293B; padding-top: 8px;">
            <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Level Range</span><span style="color: #FFF;">${selectedLocationNode ? selectedLocationNode.levelRange : ''}</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: #64748B;">Best For</span><span style="color: #FFF;">${selectedLocationNode ? selectedLocationNode.bestFor : ''}</span></div>
          </div>
        </div>
        <button style="width: 100%; padding: 8px; font-size: 10px; font-weight: bold; background: linear-gradient(135deg, #D6A93A, #B8860B); border: none; border-radius: 4px; cursor: pointer; color: #000;" onclick="openOverlay('village')">NAVIGATE ➔</button>
      </div>
    </div>
  `;
}

function selectMapNode(regionKey, locId) {
  const region = worldRegions[regionKey];
  if (!region) return;
  selectedLocationNode = region.locations.find(l => l.id === locId);
  renderRegionHubUI(regionKey, region);
}

function claimDailyReward() {
  alert("Daily reward claimed successfully!");
}