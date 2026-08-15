// =========================================================
// SHINOBI CHRONICLES
// CORE WORLD / REGION / OVERLAY SYSTEM
// =========================================================

// =========================================================
// ENEMY DATABASE
// =========================================================

let selectedEnemy = null;

const enemyDatabase = {

  scout: {

    id: "scout",

    name: "Rogue Scout",

    rank: "Rogue Shinobi",

    image:
      "Assets/Enemies/Scout.png",

    powerRange: {
      min: 350,
      max: 450
    }

  },


  bandit: {

    id: "bandit",

    name: "Bandit",

    rank: "Outlaw",

    image:
      "Assets/Enemies/Bandit.png",

    powerRange: {
      min: 450,
      max: 600
    }

  },


  banditLeader: {

    id: "banditLeader",

    name: "Bandit Leader",

    rank: "Elite Rogue",

    image:
      "Assets/Enemies/BanditLeader.png",

    powerRange: {
      min: 600,
      max: 800
    }

  }

};

// =========================================================
// ENCOUNTER SYSTEM
// =========================================================

function startEncounter(enemyId) {

  const enemy = enemyDatabase[enemyId];

  if (!enemy) {
    console.log("Enemy not found");
    return;
  }

  console.log("⚔️ Starting encounter:", enemy.name);

  selectedEnemy = enemy;

 console.log("Opening battle overlay");
 
openOverlay("battle");

}


// =========================================================
// 1. WORLD REGION DATA
// =========================================================

const worldRegions = {

  fire: {

    name: "Land of Fire",

    description:
      "A land of passion and willpower, protected by fierce ninjas and burning spirit.",

    mapImage:
      "./Assets/Backgrounds/inside_LOF.png",


    progress: {

      exploration: 42,

      lootHotspots: "6/12",

      grindingZones: "5/8",

      missionPoints: "4/10",

      sideActivities: "3/6",

      secretAreas: "2/4"

    },


    locations: [

      // =====================================================
      // KONOHA
      // =====================================================

      {
        id: "konohagakure",

        name: "Konohagakure",

        shortName: "Konohagakure",

        type: "village",

        category: "VILLAGE / CAPITAL HUB",

        icon:
          "Assets/Icons/Village.png",

        desc:
          "The main shinobi settlement of the Land of Fire and the centre of your regional progression.",

        power: {
          recommended: 0,
          enemyMin: 0,
          enemyMax: 0
        },

        encounters: {
          count: 0,
          types: [
            "Safe Zone"
          ]
        },

        rewards: {
          ryo: "—",

          common: [
            "Shops",
            "Training",
            "Village Missions"
          ],

          rareDrops: []
        },

        x: 50,
        y: 18
      },


      // =====================================================
      // BANDIT HIDEOUT
      // =====================================================

      {
        // =====================================================
// BANDIT HIDEOUT
// =====================================================

  id: "bandit_hideout",

  name: "Bandit Hideout",

  shortName: "Bandit Hideout",

  type: "battle",

  category: "LOOT HOTSPOT",

  icon:
    "Assets/Icons/Loot.png",

  desc:
    "An outlaw camp hiding stolen equipment, materials and shinobi supplies.",


  // ============================
  // BATTLE SETTINGS
  // ============================

  battle: {

    difficulty: "EASY",

    recommendedPL: 500,

    enemyPool: {
      min: 350,
      max: 650
    },

    encounters: 4,

    enemyTypes: [
      "Bandit",
      "Rogue Shinobi"
    ]

  },


  // ============================
  // REWARDS
  // ============================

  rewards: {

    ryo: {
      min: 150,
      max: 450
    },

    commonDrops: [
      "Weapons",
      "Materials",
      "Basic Scrolls"
    ],

    rareDrops: [
      {
        name: "Bandit Captain's Tanto",
        rarity: "Rare",
        chance: 6.5
      }
    ]

  },


  x: 19,
  y: 27
      },


      // =====================================================
      // HIDDEN SUPPLY CACHE
      // =====================================================

      {
        id: "hidden_supply_cache",

        name: "Hidden Supply Cache",

        shortName: "Supply Cache",

        type: "battle",

        category: "LOOT HOTSPOT",

        icon:
          "Assets/Icons/Loot.png",

        desc:
          "A concealed supply camp guarded by shinobi and mercenaries.",

        power: {
          recommended: 1500,
          enemyMin: 1200,
          enemyMax: 1850
        },

        encounters: {
          count: 5,
          types: [
            "Mercenaries",
            "Rogue Shinobi",
            "Elite Guard"
          ]
        },

        rewards: {
          ryo: "450 – 1,050",

          common: [
            "Equipment",
            "Rare Materials",
            "Supply Scrolls"
          ],

          rareDrops: [
            {
              name: "Hidden Armour Plate",
              rarity: "Epic",
              chance: 4.2
            }
          ]
        },

        x: 72,
        y: 27
      },


      // =====================================================
      // TRAINING GROUNDS
      // =====================================================

      {
        id: "training_grounds",

        name: "Training Grounds",

        shortName: "Training Grounds",

        type: "training",

        category: "EXP / PL GRINDING",

        icon:
          "Assets/Icons/EXP.png",

        desc:
          "A low-risk combat training area suited to developing weaker shinobi.",

        power: {
          recommended: 400,
          enemyMin: 250,
          enemyMax: 550
        },

        encounters: {
          count: 6,
          types: [
            "Training Opponents",
            "Academy Sparring Teams"
          ]
        },

        rewards: {
          ryo: "80 – 250",

          common: [
            "EXP",
            "Training Points"
          ],

          rareDrops: []
        },

        x: 22,
        y: 45
      },


      // =====================================================
      // BRIDGE OF TRIALS
      // =====================================================

      {
        id: "bridge_of_trials",

        name: "Bridge of Trials",

        shortName: "Bridge of Trials",

        type: "mission",

        category: "MISSION PROGRESSION",

        icon:
          "Assets/Icons/Mission.png",

        desc:
          "A dangerous regional trial that tests whether your shinobi are ready to progress.",

        power: {
          recommended: 1250,
          enemyMin: 950,
          enemyMax: 1600
        },

        encounters: {
          count: 5,
          types: [
            "Mission Shinobi",
            "Ambush Teams"
          ]
        },

        rewards: {
          ryo: "400 – 900",

          common: [
            "Mission EXP",
            "Ryo",
            "Progression Rewards"
          ],

          rareDrops: [
            {
              name: "Trial Seal",
              rarity: "Rare",
              chance: 8
            }
          ]
        },

        x: 45,
        y: 42
      },


      // =====================================================
      // CAVE OF WHISPERS
      // =====================================================

      {
        id: "cave_of_whispers",

        name: "Cave of Whispers",

        shortName: "Cave of Whispers",

        type: "secret",

        category: "SECRET / RARE AREA",

        icon:
          "Assets/Icons/Rare.png",

        desc:
          "A mysterious cave containing dangerous encounters and exceptionally rare rewards.",

        power: {
          recommended: 2200,
          enemyMin: 1750,
          enemyMax: 2700
        },

        encounters: {
          count: 6,
          types: [
            "Cave Assassin",
            "Rogue Shinobi",
            "Rare Encounter"
          ]
        },

        rewards: {
          ryo: "650 – 1,600",

          common: [
            "Rare Materials",
            "Sealed Scroll",
            "Ancient Relic"
          ],

          rareDrops: [
            {
              name: "Whisper Fang",
              rarity: "Legendary",
              chance: 4.5
            },

            {
              name: "Phantom Mask",
              rarity: "Mythic",
              chance: 0.8
            }
          ]
        },

        x: 84,
        y: 31
      },


      // =====================================================
      // FOREST OF SILENCE
      // =====================================================

      {
        id: "forest_of_silence",

        name: "Forest of Silence",

        shortName: "Forest of Silence",

        type: "training",

        category: "EXP / RYO GRINDING",

        icon:
          "Assets/Icons/EXP.png",

        desc:
          "A repeatable combat zone containing stronger roaming opponents.",

        power: {
          recommended: 900,
          enemyMin: 650,
          enemyMax: 1150
        },

        encounters: {
          count: 8,
          types: [
            "Wildlife",
            "Bandits",
            "Rogue Shinobi"
          ]
        },

        rewards: {
          ryo: "250 – 650",

          common: [
            "EXP",
            "Ryo",
            "Basic Materials"
          ],

          rareDrops: [
            {
              name: "Silent Hunter Cloak",
              rarity: "Rare",
              chance: 3.5
            }
          ]
        },

        x: 35,
        y: 65
      },


      // =====================================================
      // ESCORT MISSION
      // =====================================================

      {
        id: "escort_mission",

        name: "Escort Mission",

        shortName: "Escort Mission",

        type: "mission",

        category: "MISSION PROGRESSION",

        icon:
          "Assets/Icons/Mission.png",

        desc:
          "Protect traders and civilians while travelling across hostile territory.",

        power: {
          recommended: 700,
          enemyMin: 500,
          enemyMax: 900
        },

        encounters: {
          count: 4,
          types: [
            "Bandits",
            "Ambushers"
          ]
        },

        rewards: {
          ryo: "300 – 700",

          common: [
            "Mission EXP",
            "Ryo"
          ],

          rareDrops: []
        },

        x: 59,
        y: 43
      },


      // =====================================================
      // SCOUTING MISSION
      // =====================================================

      {
        id: "scouting_mission",

        name: "Scouting Mission",

        shortName: "Scouting Mission",

        type: "mission",

        category: "MISSION PROGRESSION",

        icon:
          "Assets/Icons/Mission.png",

        desc:
          "Reconnaissance missions into more dangerous parts of the Land of Fire.",

        power: {
          recommended: 1650,
          enemyMin: 1250,
          enemyMax: 2000
        },

        encounters: {
          count: 5,
          types: [
            "Rogue Shinobi",
            "Enemy Scouts"
          ]
        },

        rewards: {
          ryo: "500 – 1,000",

          common: [
            "Mission EXP",
            "Ryo",
            "Recon Materials"
          ],

          rareDrops: [
            {
              name: "Scout's Field Kit",
              rarity: "Rare",
              chance: 7.5
            }
          ]
        },

        x: 76,
        y: 53
      },


      // =====================================================
      // ABANDONED OUTPOST
      // =====================================================

      {
        id: "abandoned_outpost",

        name: "Abandoned Outpost",

        shortName: "Abandoned Outpost",

        type: "battle",

        category: "LOOT HOTSPOT",

        icon:
          "Assets/Icons/Loot.png",

        desc:
          "A ruined military position occupied by scavengers and rogue shinobi.",

        power: {
          recommended: 1100,
          enemyMin: 800,
          enemyMax: 1400
        },

        encounters: {
          count: 5,
          types: [
            "Scavengers",
            "Bandits",
            "Rogue Shinobi"
          ]
        },

        rewards: {
          ryo: "350 – 850",

          common: [
            "Weapons",
            "Materials",
            "Supplies"
          ],

          rareDrops: [
            {
              name: "Outpost Commander Blade",
              rarity: "Epic",
              chance: 3.2
            }
          ]
        },

        x: 15,
        y: 70
      },


      // =====================================================
      // NINJA WATCHTOWER
      // =====================================================

      {
        id: "ninja_watchtower",

        name: "Ninja Watchtower",

        shortName: "Ninja Watchtower",

        type: "activity",

        category: "SIDE MISSION",

        icon:
          "Assets/Icons/Side.png",

        desc:
          "Optional reconnaissance, surveillance and regional challenge assignments.",

        power: {
          recommended: 1350,
          enemyMin: 1000,
          enemyMax: 1650
        },

        encounters: {
          count: 3,
          types: [
            "Recon Challenge",
            "Enemy Scouts"
          ]
        },

        rewards: {
          ryo: "350 – 750",

          common: [
            "EXP",
            "Challenge Rewards"
          ],

          rareDrops: [
            {
              name: "Watcher's Lens",
              rarity: "Rare",
              chance: 5
            }
          ]
        },

        x: 49,
        y: 62
      },


      // =====================================================
      // RIVERBANK TRAINING
      // =====================================================

      {
        id: "riverbank_training",

        name: "Riverbank Training",

        shortName: "Riverbank Training",

        type: "training",

        category: "EXP / RYO GRINDING",

        icon:
          "Assets/Icons/EXP.png",

        desc:
          "A tougher repeatable training route along the river network.",

        power: {
          recommended: 1800,
          enemyMin: 1400,
          enemyMax: 2200
        },

        encounters: {
          count: 7,
          types: [
            "Training Teams",
            "Rogue Shinobi"
          ]
        },

        rewards: {
          ryo: "500 – 1,100",

          common: [
            "EXP",
            "Ryo",
            "Training Materials"
          ],

          rareDrops: []
        },

        x: 67,
        y: 70
      },


      // =====================================================
      // SOUTHERN OUTPOST
      // =====================================================

      {
        id: "southern_outpost",

        name: "Southern Outpost",

        shortName: "Southern Outpost",

        type: "outpost",

        category: "LAND OF FIRE OUTPOST",

        icon:
          "Assets/Icons/Outpost.png",

        desc:
          "The fortified southern checkpoint and gateway into the Land of Fire.",

        power: {
          recommended: 300,
          enemyMin: 200,
          enemyMax: 450
        },

        encounters: {
          count: 2,
          types: [
            "Border Patrol",
            "Bandits"
          ]
        },

        rewards: {
          ryo: "100 – 300",

          common: [
            "EXP",
            "Ryo",
            "Supplies"
          ],

          rareDrops: []
        },

        x: 50,
        y: 86
      }

    ]

  }

};


// =========================================================
// 2. ACTIVE REGION / LOCATION STATE
// =========================================================

var selectedRegionKey = null;
var selectedLocationNode = null;
var regionInfoOpen = false;
var playerPowerLevel = 2450;


// =========================================================
// 3. GLOBAL OVERLAY SYSTEM
// =========================================================

function openOverlay(type) {

  const overlay =
    document.getElementById("screen-overlay");

  const container =
    document.getElementById("overlay-content-container");


  if (!overlay || !container) {
    return;
  }


  overlay.style.display = "flex";


  switch (type) {

    case "clan":
  renderClanOverlay(container);
  break;

    case "village":
      renderVillageOverlay(container);
      break;


    case "missions":
      renderGenericOverlay(
        container,
        "MISSION BOARD",
        "Choose story missions, side missions and regional assignments."
      );
      break;


    case "battle":
      renderBattleOverlay(container);
      break;


    case "training":
      renderTrainingOverlay(container);
      break;


    case "events":
      renderGenericOverlay(
        container,
        "WORLD EVENTS",
        "Limited-time regional encounters and special rewards will appear here."
      );
      break;


    case "roster":
      renderGenericOverlay(
        container,
        "SHINOBI ROSTER",
        "Manage your recruited ninja, team composition and character progression."
      );
      break;


    case "shop":
      renderGenericOverlay(
        container,
        "SPECIAL SHOP",
        "Purchase rare scrolls, equipment and special items."
      );
      break;


    case "exams":
      renderGenericOverlay(
        container,
        "SHINOBI EXAMS",
        "Take rank exams to progress through the shinobi hierarchy."
      );
      break;


    case "practical":
      renderGenericOverlay(
        container,
        "PRACTICAL TRAINING",
        "Complete tactical tests and practical shinobi exercises."
      );
      break;


    case "group":
      renderGenericOverlay(
        container,
        "GROUP",
        "Manage squads, teams and future clan-based activities."
      );
      break;


    case "defend":
      renderGenericOverlay(
        container,
        "VILLAGE DEFENCE",
        "Defend your territory from invading rogue shinobi and hostile factions."
      );
      break;


    case "kage":
      renderGenericOverlay(
        container,
        "KAGE",
        "Endgame leadership systems and Kage-level responsibilities."
      );
      break;


    default:
      renderGenericOverlay(
        container,
        "SYSTEM ACTIVE",
        "This Shinobi Chronicles module is currently under development."
      );
      break;
  }
}


// =========================================================
// 4. CLOSE OVERLAY
// =========================================================

function closeOverlay() {

  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.style.display =
    "none";


  overlay.classList.remove(
    "region-map-open"
  );


  selectedRegionKey =
    null;


  selectedLocationNode =
    null;

}

// =========================================================
// 5. GENERIC OVERLAY
// =========================================================

function renderGenericOverlay(
  container,
  title,
  description
) {

  container.innerHTML = `

    <div style="
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    ">

      <h2 style="
        color: #D6A93A;
        font-size: 16px;
        letter-spacing: 1px;
        margin-bottom: 8px;
      ">
        ${title}
      </h2>


      <p style="
        color: #94A3B8;
        font-size: 11px;
        line-height: 1.5;
      ">
        ${description}
      </p>

    </div>

  `;
}


// =========================================================
// 6. VILLAGE OVERLAY
// =========================================================

function renderVillageOverlay(container) {

  container.innerHTML = `

    <div style="
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    ">


      <div style="
        margin-bottom: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #1E293B;
      ">

        <h2 style="
          color: #D6A93A;
          font-size: 16px;
          margin-bottom: 4px;
        ">
          HIDDEN LEAF VILLAGE
        </h2>


        <p style="
          color: #94A3B8;
          font-size: 10px;
        ">
          Konohagakure • Land of Fire
        </p>

      </div>



      <div style="
        display: grid;
        grid-template-columns:
          repeat(
            auto-fit,
            minmax(220px, 1fr)
          );

        gap: 12px;

        flex: 1;

        overflow-y: auto;
      ">


        ${createVillageCard(
          "Hokage Office",
          "Accept high-rank missions, squad assignments and village objectives."
        )}


        ${createVillageCard(
          "Ichiraku Ramen",
          "Restore stamina and purchase temporary combat buffs."
        )}


        ${createVillageCard(
          "Ninja Academy",
          "Train techniques, improve stats and unlock new progression paths."
        )}


        ${createVillageCard(
          "Hospital",
          "Recover injured ninja and remove battle exhaustion effects."
        )}


        ${createVillageCard(
          "Shinobi Market",
          "Purchase weapons, scrolls, equipment and consumables."
        )}


        ${createVillageCard(
          "Mission District",
          "Access story progression and village-based missions."
        )}


      </div>

    </div>

  `;
}

// =========================================================
// YOUR CLAN / SHINOBI ROSTER
// =========================================================

function renderClanOverlay(container) {

  container.innerHTML = `

    <div class="clan-screen">

      <div class="clan-header">

        <div>

          <h2 class="clan-title">
            YOUR CLAN
          </h2>

          <p class="clan-description">
            View, manage and organise the shinobi currently under your command.
          </p>

        </div>

        <div class="clan-count">
          <span>SHINOBI</span>
          <strong id="clan-roster-count">3</strong>
        </div>

      </div>


      <div class="clan-toolbar">

        <button
          type="button"
          class="clan-filter-btn active"
        >
          ALL
        </button>

        <button
          type="button"
          class="clan-filter-btn"
        >
          ACTIVE TEAM
        </button>

        <button
          type="button"
          class="clan-filter-btn"
        >
          RESERVE
        </button>

        <button
          type="button"
          class="clan-filter-btn"
        >
          FAVOURITES
        </button>

      </div>


      <div class="clan-roster-grid">

        ${createClanCard({
          name: "Naruto",
          rank: "Kage",
          power: "2,450",
          role: "Ninjutsu",
          status: "ACTIVE"
        })}

        ${createClanCard({
          name: "Sasuke",
          rank: "Jonin",
          power: "2,280",
          role: "Bukishi",
          status: "ACTIVE"
        })}

        ${createClanCard({
          name: "Sakura",
          rank: "Sannin",
          power: "2,050",
          role: "Taijutsu",
          status: "RESERVE"
        })}

      </div>

    </div>

  `;

}


function createClanCard(shinobi) {

  return `

    <button
      type="button"
      class="clan-card"
    >

      <div class="clan-card-portrait">

        <span class="clan-card-placeholder">
          忍
        </span>

      </div>


      <div class="clan-card-body">

        <div class="clan-card-top">

          <div>

            <div class="clan-card-name">
              ${shinobi.name}
            </div>

            <div class="clan-card-rank">
              ${shinobi.rank}
            </div>

          </div>


          <span class="
            clan-card-status
            ${shinobi.status.toLowerCase()}
          ">
            ${shinobi.status}
          </span>

        </div>


        <div class="clan-card-stats">

          <div>
            <span>POWER</span>
            <strong>
              ${shinobi.power}
            </strong>
          </div>

          <div>
            <span>SPECIALITY</span>
            <strong>
              ${shinobi.role}
            </strong>
          </div>

        </div>

      </div>

    </button>

  `;

}


function createVillageCard(
  title,
  description
) {

  return `

    <div style="
      background:
        linear-gradient(
          180deg,
          #111827,
          #0B111B
        );

      border: 1px solid #1E293B;

      padding: 14px;

      border-radius: 7px;

      cursor: pointer;
    ">

      <h3 style="
        color: #00D9E8;
        font-size: 11px;
        margin-bottom: 6px;
      ">
        ${title}
      </h3>


      <p style="
        color: #64748B;
        font-size: 9px;
        line-height: 1.45;
      ">
        ${description}
      </p>

    </div>

  `;
}


// =========================================================
// OPEN REGION HUB
// =========================================================

function openRegionHub(regionKey) {

  const region =
    worldRegions[regionKey];


  if (!region) {

    console.warn(
      `Region "${regionKey}" does not exist.`
    );

    return;
  }


  selectedRegionKey =
    regionKey;


  selectedLocationNode =
    null;


  regionInfoOpen =
    false;


  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.style.display =
    "flex";


  overlay.classList.add(
    "region-map-open"
  );


  renderRegionHubUI(
    regionKey,
    region
  );

}



// =========================================================
// RENDER REGION MAP
// =========================================================

function renderRegionHubUI(
  regionKey,
  region
) {

  const container =
    document.getElementById(
      "overlay-content-container"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="
      region-screen-header
    ">

      <div>

        <h2 class="
          region-screen-title
        ">
          ${region.name.toUpperCase()}
        </h2>

        <p class="
          region-screen-description
        ">
          ${region.description}
        </p>

      </div>

    </div>


    <div class="
      region-hub-container
      region-hub-full
    ">


      <div class="
        region-map-pane
      ">


        <img
          src="${region.mapImage}"

          alt="${region.name}"

          class="
            region-map-image
          "
        >


        <!-- WORLD MAP CLOSE -->

        <button
          type="button"

          class="
            region-world-close
          "

          onclick="
            returnToWorldMap()
          "

          aria-label="
            Return to World Map
          "

          title="
            Return to World Map
          "
        >

          ✕

        </button>


        <!-- REGION INFORMATION BUTTON -->

        <button
          type="button"

          class="
            region-info-toggle
            ${regionInfoOpen
              ? "active"
              : ""}
          "

          onclick="
            toggleRegionInfo()
          "
        >

          <span>
            ◈
          </span>

          REGION INFO

        </button>


        <!-- COLLAPSIBLE REGION PANEL -->

        <aside class="
          region-info-drawer
          ${regionInfoOpen
            ? "open"
            : ""}
        ">

          ${renderRegionLeftNavigation(
            region
          )}

        </aside>


        <!-- ALL INTERACTIVE HOTSPOTS -->

        ${region.locations.map(
          location =>
            renderRegionHotspot(
              regionKey,
              location
            )
        ).join("")}


        <!-- CLICKABLE WORLD MAP AREA -->

        <button
          type="button"

          class="
            region-world-map-button
          "

          onclick="
            returnToWorldMap()
          "

          aria-label="
            Return to World Map
          "
        >

          WORLD MAP

        </button>


      </div>


    </div>

  `;

}



// =========================================================
// TOGGLE REGION INFORMATION
// =========================================================

function toggleRegionInfo() {

  regionInfoOpen =
    !regionInfoOpen;


  if (
    selectedRegionKey &&
    worldRegions[selectedRegionKey]
  ) {

    renderRegionHubUI(
      selectedRegionKey,
      worldRegions[selectedRegionKey]
    );

  }

}



// =========================================================
// REGION PROGRESS / LEGEND
// =========================================================

function renderRegionLeftNavigation(
  region
) {

  const progress =
    region.progress || {};


  return `

    <div class="
      region-left-overlay
    ">


      <div class="
        region-left-section
      ">

        <div class="
          region-left-heading
        ">
          REGION PROGRESS
        </div>


        <div class="
          region-exploration-row
        ">

          <span>
            Exploration
          </span>

          <strong>
            ${progress.exploration || 0}%
          </strong>

        </div>


        <div class="
          region-exploration-track
        ">

          <span
            style="
              width:
              ${progress.exploration || 0}%;
            "
          >
          </span>

        </div>

      </div>


      <div class="
        region-progress-list
      ">

        ${renderRegionProgressItem(
          "battle",
          "Loot Hotspots",
          progress.lootHotspots || "0/0"
        )}

        ${renderRegionProgressItem(
          "training",
          "Grinding Zones",
          progress.grindingZones || "0/0"
        )}

        ${renderRegionProgressItem(
          "mission",
          "Mission Points",
          progress.missionPoints || "0/0"
        )}

        ${renderRegionProgressItem(
          "activity",
          "Side Activities",
          progress.sideActivities || "0/0"
        )}

        ${renderRegionProgressItem(
          "secret",
          "Secret Areas",
          progress.secretAreas || "0/0"
        )}

      </div>


      <div class="
        region-left-divider
      ">
      </div>


      <div class="
        region-left-heading
      ">
        LEGEND
      </div>


      ${renderRegionLegendItem(
        "battle",
        "Loot Hotspot"
      )}

      ${renderRegionLegendItem(
        "training",
        "EXP / Ryo Grinding"
      )}

      ${renderRegionLegendItem(
        "mission",
        "Mission Progression"
      )}

      ${renderRegionLegendItem(
        "activity",
        "Side Mission"
      )}

      ${renderRegionLegendItem(
        "secret",
        "Secret / Rare Area"
      )}

      ${renderRegionLegendItem(
        "outpost",
        "Outpost"
      )}

      ${renderRegionLegendItem(
        "village",
        "Village / Hub"
      )}


      <div class="
        region-legend-row
      ">

        <span class="
          region-path-symbol
        ">
        </span>

        <span>
          Path
        </span>

      </div>


    </div>

  `;

}



// =========================================================
// REGION PROGRESS ITEM
// =========================================================

function renderRegionProgressItem(
  type,
  label,
  value
) {

  return `

    <div class="
      region-progress-item
    ">

      <span class="
        region-small-symbol
        ${type}
      ">

        ${getRegionSymbol(type)}

      </span>

      <span class="
        region-progress-label
      ">
        ${label}
      </span>

      <strong>
        ${value}
      </strong>

    </div>

  `;

}



// =========================================================
// REGION LEGEND ITEM
// =========================================================

function renderRegionLegendItem(
  type,
  label
) {

  return `

    <div class="
      region-legend-row
    ">

      <span class="
        region-small-symbol
        ${type}
      ">
        ${getRegionSymbol(type)}
      </span>

      <span>
        ${label}
      </span>

    </div>

  `;

}



// =========================================================
// REGIONAL SYMBOL
// =========================================================

function getRegionSymbol(type) {

  switch (type) {

    case "battle":
      return "▣";

    case "training":
      return "EXP";

    case "mission":
      return "◆";

    case "activity":
      return "✦";

    case "secret":
      return "?";

    case "outpost":
      return "▥";

    case "village":
      return "●";

    default:
      return "•";
  }

}



// =========================================================
// HOTSPOT GENERATOR
// =========================================================

function renderRegionHotspot(
  regionKey,
  location
) {

  const hoverSide =
    getHotspotHoverSide(
      location
    );


  return `

    <button
      type="button"

      class="
        region-hotspot
        region-hotspot-image
        ${location.type}
        ${hoverSide}
      "

      style="
        left: ${location.x}%;
        top: ${location.y}%;
      "

      onclick="
        selectMapNode(
          '${regionKey}',
          '${location.id}'
        )
      "

      aria-label="
        ${location.name}
      "
    >


      <span class="
        hotspot-icon-shell
      ">

        <img
          src="${location.icon}"

          alt=""

          class="
            hotspot-icon-image
          "
        >

      </span>


      <span class="
        hotspot-nameplate
      ">

        ${location.shortName || location.name}

      </span>


      ${renderHotspotHoverCard(
        location
      )}


    </button>

  `;

}



// =========================================================
// AUTOMATIC HOVER-CARD DIRECTION
// =========================================================

function getHotspotHoverSide(
  location
) {

  if (location.y > 76) {

    return "hover-up";
  }


  if (location.x >= 66) {

    return "hover-left";
  }


  return "hover-right";

}



// =========================================================
// HOVER INFORMATION CARD
// =========================================================

function renderHotspotHoverCard(
  location
) {

  const power =
    location.power || {};


  const encounters =
    location.encounters || {};


  const rewards =
    location.rewards || {};


  const threat =
    getLocationThreat(
      location
    );


  return `

    <span class="
      hotspot-hover-card
    ">


      <span class="
        hover-card-top
      ">

        <span>

          <strong class="
            hover-card-name
          ">
            ${location.name}
          </strong>

          <small class="
            hover-card-category
          ">
            ${location.category}
          </small>

        </span>


        <span class="
          hover-threat
          ${threat.className}
        ">

          ${threat.label}

        </span>

      </span>


      <span class="
        hover-card-divider
      ">
      </span>


      <span class="
        hover-pl-grid
      ">

        <span>

          <small>
            YOUR PL
          </small>

          <strong>
            ${formatPL(
              playerPowerLevel
            )}
          </strong>

        </span>


        <span>

          <small>
            RECOMMENDED
          </small>

          <strong>
            ${
              power.recommended
                ? formatPL(
                    power.recommended
                  )
                : "SAFE"
            }
          </strong>

        </span>

      </span>


      ${
        power.enemyMax
          ? `

              <span class="
                hover-info-row
              ">

                <small>
                  Enemy PL
                </small>

                <strong>
                  ${formatPL(
                    power.enemyMin
                  )}
                  –
                  ${formatPL(
                    power.enemyMax
                  )}
                </strong>

              </span>

            `
          : ""
      }


      <span class="
        hover-info-row
      ">

        <small>
          Encounters
        </small>

        <strong>
          ${encounters.count || 0}
        </strong>

      </span>


      ${
        encounters.types &&
        encounters.types.length
          ? `

              <span class="
                hover-tags
              ">

                ${encounters.types.map(
                  enemy => `

                    <span>
                      ${enemy}
                    </span>

                  `
                ).join("")}

              </span>

            `
          : ""
      }


      <span class="
        hover-card-divider
      ">
      </span>


      <span class="
        hover-info-row
      ">

        <small>
          Ryō
        </small>

        <strong>
          ${rewards.ryo || "—"}
        </strong>

      </span>


      ${
        rewards.common &&
        rewards.common.length
          ? `

              <span class="
                hover-reward-title
              ">
                POSSIBLE LOOT
              </span>


              <span class="
                hover-tags
                rewards
              ">

                ${rewards.common.map(
                  reward => `

                    <span>
                      ${reward}
                    </span>

                  `
                ).join("")}

              </span>

            `
          : ""
      }


      ${
        rewards.rareDrops &&
        rewards.rareDrops.length
          ? `

              <span class="
                hover-rare-title
              ">
                RARE DROPS
              </span>


              <span class="
                hover-rare-list
              ">

                ${rewards.rareDrops.map(
                  drop => `

                    <span class="
                      hover-rare-row
                    ">

                      <span>

                        <strong>
                          ${drop.name}
                        </strong>

                        <small>
                          ${drop.rarity}
                        </small>

                      </span>


                      <b>
                        ${drop.chance}%
                      </b>

                    </span>

                  `
                ).join("")}

              </span>

            `
          : ""
      }


      <span class="
        hover-card-footer
      ">
        CLICK TO ENTER / SELECT
      </span>


    </span>

  `;

}



// =========================================================
// PLAYER-TO-LOCATION THREAT
// =========================================================

function getLocationThreat(
  location
) {

  const recommended =
    location.power?.recommended || 0;


  if (
    recommended === 0
  ) {

    return {
      label: "SAFE ZONE",
      className: "safe"
    };
  }


  const ratio =
    playerPowerLevel /
    recommended;


  if (ratio < 0.75) {

    return {
      label: "EXTREME RISK",
      className: "extreme"
    };
  }


  if (ratio < 1) {

    return {
      label: "HIGH RISK",
      className: "high"
    };
  }


  if (ratio < 1.45) {

    return {
      label: "SUITABLE",
      className: "suitable"
    };
  }


  return {
    label: "LOW RISK",
    className: "low"
  };

}



// =========================================================
// PL NUMBER FORMATTING
// =========================================================

function formatPL(value) {

  return Number(
    value || 0
  ).toLocaleString();

}



// =========================================================
// SELECT / ENTER HOTSPOT
// =========================================================

function selectMapNode(
  regionKey,
  locationId
) {

  const region =
    worldRegions[regionKey];


  if (!region) {
    return;
  }


  const location =
    region.locations.find(
      item =>
        item.id ===
        locationId
    );


  if (!location) {
    return;
  }


  selectedRegionKey =
    regionKey;


  selectedLocationNode =
    location;


  handleNodeNavigation();

}



// =========================================================
// RETURN TO WORLD MAP
// =========================================================

function returnToWorldMap() {

  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.style.display =
    "none";


  overlay.classList.remove(
    "region-map-open"
  );


  selectedRegionKey =
    null;


  selectedLocationNode =
    null;


  regionInfoOpen =
    false;

}



// =========================================================
// LOCATION NAVIGATION
// =========================================================

function handleNodeNavigation() {

  if (!selectedLocationNode) {
    return;
  }


  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (overlay) {

    overlay.classList.remove(
      "region-map-open"
    );

  }


  switch (
    selectedLocationNode.type
  ) {

    case "village":

      openOverlay(
        "village"
      );

      break;


    case "training":

      openOverlay(
        "training"
      );

      break;


    case "battle":

      openOverlay(
        "battle"
      );

      break;


    case "mission":

      openOverlay(
        "missions"
      );

      break;


    case "outpost":

      openOverlay(
        "battle"
      );

      break;


    case "activity":

      openOverlay(
        "missions"
      );

      break;


    case "secret":

      openOverlay(
        "battle"
      );

      break;


    default:

      openOverlay(
        "battle"
      );

      break;

  }

}



// =========================================================
// BUTTON TEXT
// =========================================================

function getNavigationButtonText(
  location
) {

  switch (
    location.type
  ) {

    case "village":
      return "ENTER VILLAGE ➜";

    case "training":
      return "BEGIN TRAINING ➜";

    case "battle":
      return "ENTER AREA ➜";

    case "mission":
      return "VIEW MISSION ➜";

    case "outpost":
      return "ENTER OUTPOST ➜";

    case "activity":
      return "VIEW SIDE MISSION ➜";

    case "secret":
      return "EXPLORE AREA ➜";

    default:
      return "NAVIGATE ➜";
  }
}


// =========================================================
// 15. TRAINING OVERLAY
// =========================================================

function renderTrainingOverlay(
  container
) {

  const location =
    selectedLocationNode;


  container.innerHTML = `

    <div style="
      display: flex;
      flex-direction: column;
      flex: 1;
    ">


      <h2 style="
        color: #D6A93A;
        font-size: 16px;
        margin-bottom: 5px;
      ">
        ${
          location
            ? location.name.toUpperCase()
            : "TRAINING AREA"
        }
      </h2>


      <p style="
        color: #94A3B8;
        font-size: 10px;
        margin-bottom: 16px;
      ">
        Repeatable encounters for EXP,
        training points and character progression.
      </p>



      <div style="
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(0, 1fr)
          );

        gap: 12px;
      ">


        ${createActivityCard(
          "Light Training",
          "Low-risk encounter.",
          "EXP: 120",
          "Recommended PL: 400"
        )}


        ${createActivityCard(
          "Advanced Training",
          "Stronger opponents with higher EXP rewards.",
          "EXP: 320",
          "Recommended PL: 900"
        )}


        ${createActivityCard(
          "Elite Training",
          "High-level challenge with rare training rewards.",
          "EXP: 650",
          "Recommended PL: 1,800"
        )}


      </div>


    </div>

  `;
}


// =========================================================
// 16. BATTLE / LOOT OVERLAY
// =========================================================

function renderBattleOverlay(
  container
) {

  const location =
    selectedLocationNode;


  container.innerHTML = `

    <div style="
      display: flex;
      flex-direction: column;
      flex: 1;
    ">


      <h2 style="
        color: #D6A93A;
        font-size: 16px;
        margin-bottom: 5px;
      ">
        ${
          location
            ? location.name.toUpperCase()
            : "COMBAT AREA"
        }
      </h2>


      <p style="
        color: #94A3B8;
        font-size: 10px;
        margin-bottom: 16px;
      ">
        Prepare your shinobi before entering battle.
      </p>



      <div style="
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(0, 1fr)
          );

        gap: 12px;
      ">


  ${createActivityCard(
  "Scout Patrol",
  "Fight a small rogue patrol.",
  "Ryo: 250",
  "Drop Chance: 12%",
  "startEncounter('scout')"
)}


   ${createActivityCard(
  "Bandit Leader",
  "Defeat an elite rogue shinobi.",
  "Ryo: 650",
  "Rare Drop: 8%",
  "startEncounter('banditLeader')"
)}


   ${createActivityCard(
  "Hidden Cache",
  "High-risk encounter protecting stolen equipment.",
  "Ryo: 1,200",
  "Rare Drop: 18%",
  "startEncounter('bandit')"
)}


      </div>


    </div>

  `;
}


// =========================================================
// 17. ACTIVITY CARD
// =========================================================

function createActivityCard(
  title,
  description,
  reward,
  requirement,
  action
) {

  return `

    <div style="
      padding: 14px;

      background:
        linear-gradient(
          180deg,
          #111827,
          #0B111B
        );

      border:
        1px solid #1E293B;

      border-radius: 7px;
    ">


      <h3 style="
        color: #00D9E8;

        font-size: 11px;

        margin-bottom: 6px;
      ">
        ${title}
      </h3>



      <p style="
        color: #64748B;

        font-size: 9px;

        line-height: 1.45;

        margin-bottom: 10px;
      ">
        ${description}
      </p>



      <div style="
        color: #D6A93A;

        font-size: 9px;

        margin-bottom: 4px;
      ">
        ${reward}
      </div>



      <div style="
        color: #94A3B8;

        font-size: 8px;
      ">
        ${requirement}
      </div>

      <button
onclick="${action}"
style="
margin-top:12px;
width:100%;
padding:8px;

background:#D6A93A;
color:#05070B;

border:none;
border-radius:5px;

font-size:9px;
font-weight:bold;

cursor:pointer;
">
ENTER
</button>


    </div>

  `;
}


// =========================================================
// 18. DAILY REWARD
// =========================================================

function claimDailyReward() {

  alert(
    "Daily reward claimed successfully!"
  );
}

// =========================================================
// START ENCOUNTER
// =========================================================


function startEncounter(enemyId) {


  const enemy = enemyDatabase[enemyId];


  if (!enemy) {
    console.log("Enemy not found");
    return;
  }


  openOverlay("battle");

}