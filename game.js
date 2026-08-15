// =========================================================
// SHINOBI CHRONICLES
// CORE WORLD / REGION / OVERLAY SYSTEM
// =========================================================


// =========================================================
// 1. WORLD REGION DATA
// =========================================================

const worldRegions = {

  fire: {

    name: "Land of Fire",

    description:
      "A land of passion and willpower, protected by fierce ninjas and burning spirit.",

    mapImage:
      "Assets/Backgrounds/inside_LOF.png",


    /* =====================================================
       CODED LEFT-SIDEBAR INFORMATION
       ===================================================== */

    progress: {
      exploration: 42,

      lootHotspots: "6/12",
      grindingZones: "5/8",
      missionPoints: "4/10",
      sideActivities: "3/6",
      secretAreas: "2/4"
    },


    locations: [

      /* ===================================================
         NORTHERN CAPITAL
         =================================================== */

      {
        id: "konohagakure",

        name: "Konohagakure (Hidden Leaf)",

        shortName: "Konohagakure",

        type: "village",

        category: "CAPITAL VILLAGE HUB",

        desc:
          "The glorious capital hidden behind giant mountain walls.",

        levelRange: "1-50",

        bestFor:
          "Village Hub, Quests & Progression",

        enemyTypes:
          "Safe Zone",

        rewards: [
          "Quests",
          "Training",
          "Shops"
        ],

        /*
          Corrected position:
          Konoha is at the NORTH of this regional map,
          not at the bottom.
        */
        x: 49,
        y: 12
      },


      /* ===================================================
         BANDIT HIDEOUT

         This replaces the oversized / misplaced red marker.
         =================================================== */

      {
        id: "bandit_hideout",

        name: "Bandit Hideout",

        shortName: "Bandit Hideout",

        type: "battle",

        category: "LOOT HOTSPOT",

        desc:
          "An outlaw encampment hiding stolen scrolls, weapons and valuable materials.",

        levelRange: "15-20",

        bestFor:
          "Ryo, Gear & Materials",

        enemyTypes:
          "Bandits / Rogue Shinobi",

        rewards: [
          "Ryo",
          "Weapons",
          "Materials"
        ],

        x: 27,
        y: 24
      },


      /* ===================================================
         HIDDEN SUPPLY CACHE
         =================================================== */

      {
        id: "hidden_supply_cache",

        name: "Hidden Supply Cache",

        shortName: "Supply Cache",

        type: "battle",

        category: "LOOT HOTSPOT",

        desc:
          "A concealed cache of equipment and supplies hidden along an old shinobi route.",

        levelRange: "25-30",

        bestFor:
          "Equipment & Rare Materials",

        enemyTypes:
          "Rogue Shinobi / Guards",

        rewards: [
          "Gear",
          "Ryo",
          "Materials"
        ],

        x: 68,
        y: 23
      },


      /* ===================================================
         TRAINING GROUNDS
         =================================================== */

      {
        id: "training_grounds",

        name: "Training Grounds",

        shortName: "Training Grounds",

        type: "training",

        category: "EXP GRINDING",

        desc:
          "A woodland training area ideal for repeatable combat practice and character progression.",

        levelRange: "10-16",

        bestFor:
          "EXP & Training",

        enemyTypes:
          "Training Opponents",

        rewards: [
          "EXP",
          "Ryo"
        ],

        x: 29,
        y: 42
      },


      /* ===================================================
         BRIDGE OF TRIALS
         =================================================== */

      {
        id: "bridge_of_trials",

        name: "Bridge of Trials",

        shortName: "Bridge of Trials",

        type: "mission",

        category: "MISSION PROGRESSION",

        desc:
          "A dangerous crossing used for increasingly difficult shinobi assignments.",

        levelRange: "20-28",

        bestFor:
          "Mission Progression",

        enemyTypes:
          "Mission Dependent",

        rewards: [
          "EXP",
          "Ryo",
          "Mission Rewards"
        ],

        x: 50,
        y: 34
      },


      /* ===================================================
         CAVE OF WHISPERS
         =================================================== */

      {
        id: "cave_of_whispers",

        name: "Cave of Whispers",

        shortName: "Cave of Whispers",

        type: "secret",

        category: "SECRET / RARE AREA",

        desc:
          "A mysterious cave network whispered to contain unusual enemies and rare discoveries.",

        levelRange: "25-35",

        bestFor:
          "Rare Drops & Exploration",

        enemyTypes:
          "Unknown",

        rewards: [
          "Rare Loot",
          "Ryo",
          "Secrets"
        ],

        x: 72,
        y: 39
      },


      /* ===================================================
         FOREST OF SILENCE
         =================================================== */

      {
        id: "forest_of_silence",

        name: "Forest of Silence",

        shortName: "Forest of Silence",

        type: "training",

        category: "EXP / GOLD GRINDING",

        desc:
          "A dense forest suited to repeatable encounters for experience and Ryo.",

        levelRange: "16-24",

        bestFor:
          "EXP & Ryo",

        enemyTypes:
          "Wildlife / Rogue Shinobi",

        rewards: [
          "EXP",
          "Ryo"
        ],

        x: 50,
        y: 49
      },


      /* ===================================================
         ESCORT MISSION
         =================================================== */

      {
        id: "escort_mission",

        name: "Escort Mission",

        shortName: "Escort Mission",

        type: "mission",

        category: "MISSION PROGRESSION",

        desc:
          "Protect civilians and traders travelling through dangerous Land of Fire routes.",

        levelRange: "12-18",

        bestFor:
          "Mission Progression",

        enemyTypes:
          "Bandits / Ambushers",

        rewards: [
          "EXP",
          "Ryo"
        ],

        x: 29,
        y: 57
      },


      /* ===================================================
         SCOUTING MISSION
         =================================================== */

      {
        id: "scouting_mission",

        name: "Scouting Mission",

        shortName: "Scouting Mission",

        type: "mission",

        category: "MISSION PROGRESSION",

        desc:
          "Investigate suspicious activity beyond the heavily travelled routes.",

        levelRange: "18-26",

        bestFor:
          "Recon & Mission Progression",

        enemyTypes:
          "Rogue Shinobi",

        rewards: [
          "EXP",
          "Ryo",
          "Mission Rewards"
        ],

        x: 69,
        y: 57
      },


      /* ===================================================
         ABANDONED OUTPOST
         =================================================== */

      {
        id: "abandoned_outpost",

        name: "Abandoned Outpost",

        shortName: "Abandoned Outpost",

        type: "battle",

        category: "LOOT HOTSPOT",

        desc:
          "An abandoned military position now occupied by scavengers and rogue shinobi.",

        levelRange: "18-25",

        bestFor:
          "Loot & Materials",

        enemyTypes:
          "Bandits / Rogue Shinobi",

        rewards: [
          "Weapons",
          "Materials",
          "Ryo"
        ],

        x: 27,
        y: 72
      },


      /* ===================================================
         NINJA WATCHTOWER
         =================================================== */

      {
        id: "ninja_watchtower",

        name: "Ninja Watchtower",

        shortName: "Ninja Watchtower",

        type: "activity",

        category: "SIDE ACTIVITY",

        desc:
          "A regional observation tower offering optional shinobi challenges and reconnaissance tasks.",

        levelRange: "15-22",

        bestFor:
          "Challenge Tasks",

        enemyTypes:
          "Challenge Dependent",

        rewards: [
          "EXP",
          "Challenge Rewards"
        ],

        x: 47,
        y: 69
      },


      /* ===================================================
         RIVERBANK TRAINING
         =================================================== */

      {
        id: "riverbank_training",

        name: "Riverbank Training",

        shortName: "Riverbank Training",

        type: "training",

        category: "EXP / GOLD GRINDING",

        desc:
          "A remote riverside training route used by travelling shinobi.",

        levelRange: "14-20",

        bestFor:
          "EXP & Ryo",

        enemyTypes:
          "Training Opponents",

        rewards: [
          "EXP",
          "Ryo"
        ],

        x: 73,
        y: 75
      },


      /* ===================================================
         SOUTHERN OUTPOST

         IMPORTANT:
         This replaces the incorrect second Konoha marker
         currently appearing at the bottom.
         =================================================== */

      {
        id: "southern_outpost",

        name: "Southern Outpost",

        shortName: "Southern Outpost",

        type: "outpost",

        category: "LAND OF FIRE OUTPOST",

        desc:
          "A fortified checkpoint guarding the southern approach into the Land of Fire.",

        levelRange: "8-14",

        bestFor:
          "Early Progression",

        enemyTypes:
          "Bandits / Scouts",

        rewards: [
          "EXP",
          "Ryo",
          "Supplies"
        ],

        x: 50,
        y: 88
      }

    ]

  }

};


// =========================================================
// 2. ACTIVE REGION / LOCATION STATE
// =========================================================

let selectedRegionKey = null;

let selectedLocationNode = null;


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
// 7. OPEN REGION HUB
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


  /*
    IMPORTANT CHANGE:

    Do NOT automatically select Konoha or any other location.

    The right-hand details panel now remains empty until the
    player actually clicks a marker.
  */
  selectedLocationNode =
    null;


  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.style.display =
    "flex";


  /*
    Add a special class while the region map is open.

    This lets CSS make the regional overlay larger without
    affecting Village, Battle, Training, etc.
  */
  overlay.classList.add(
    "region-map-open"
  );


  renderRegionHubUI(
    regionKey,
    region
  );

}



// =========================================================
// 8. RENDER REGIONAL INTERACTIVE MAP
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

    <div class="region-screen-header">

      <div>

        <h2 class="region-screen-title">
          ${region.name.toUpperCase()}
        </h2>

        <p class="region-screen-description">
          ${region.description}
        </p>

      </div>

    </div>


    <div class="
      region-hub-container
    ">


      <!-- =================================================
           MAP PANE
           ================================================= -->

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



        <!-- ===============================================
             BURNED-IN TOP HUD COVER

             The artwork contains money / currency / energy
             information here.

             We cover it because the actual player HUD belongs
             in HTML/CSS elsewhere.
             =============================================== -->

        <div
          class="
            region-baked-cover
            region-top-hud-cover
          "
          aria-hidden="true"
        >
        </div>



        <!-- ===============================================
             ACTUAL CODED WORLD-MAP X

             Positioned over the gold X burned into the image.
             =============================================== -->

        <button
          type="button"

          class="
            region-world-close
          "

          onclick="
            returnToWorldMap()
          "

          title="
            Return to World Map
          "

          aria-label="
            Return to World Map
          "
        >

          <span>
            ✕
          </span>

        </button>



        <!-- ===============================================
             CODED LEFT NAVIGATION

             This deliberately sits over the left navigation
             artwork that is burned into inside_LOF.png.
             =============================================== -->

        ${renderRegionLeftNavigation(
          region
        )}



        <!-- ===============================================
             CODED INNER LOCATION CARD

             This permanently covers the old right-side
             location card burned into the artwork.

             Its CONTENT appears only after clicking a marker.
             =============================================== -->

        <aside
          class="
            region-map-detail-overlay
            ${selectedLocationNode
              ? "has-location"
              : "waiting-for-location"}
          "
        >

          ${
            selectedLocationNode
              ? renderMapLocationCard(
                  selectedLocationNode
                )
              : `
                  <div
                    class="
                      region-map-detail-placeholder
                    "
                  >

                    <div
                      class="
                        region-map-detail-heading
                      "
                    >
                      LOCATION DETAILS
                    </div>

                    <div
                      class="
                        region-map-detail-waiting
                      "
                    >
                      Select a location marker.
                    </div>

                  </div>
                `
          }

        </aside>



        <!-- ===============================================
             REAL INTERACTIVE MARKERS
             =============================================== -->

        ${region.locations.map(
          location =>
            renderRegionHotspot(
              regionKey,
              location
            )
        ).join("")}



        <!-- ===============================================
             CODED WORLD MAP BUTTON

             Covers / replaces the artwork version in the
             lower-left.
             =============================================== -->

        <button
          type="button"

          class="
            region-world-map-button
          "

          onclick="
            returnToWorldMap()
          "
        >

          <span class="
            world-map-button-icon
          ">
            ◈
          </span>

          <span>
            WORLD MAP
          </span>

        </button>


      </div>



      <!-- =================================================
           ACTUAL PAGE-SIDE LOCATION DETAILS

           This is the panel outside the map.

           It is intentionally empty until a map node has
           actually been clicked.
           ================================================= -->

      ${renderLocationDetailsPane(
        selectedLocationNode
      )}


    </div>

  `;

}



// =========================================================
// 9. CODED LEFT REGIONAL NAVIGATION
// =========================================================

function renderRegionLeftNavigation(
  region
) {

  const progress =
    region.progress || {};


  return `

    <aside class="
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
          "loot",
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
        region-left-section
      ">

        <div class="
          region-left-heading
        ">
          LEGEND
        </div>


        ${renderRegionLegendItem(
          "loot",
          "Loot Hotspot"
        )}

        ${renderRegionLegendItem(
          "training",
          "EXP / Gold Grinding"
        )}

        ${renderRegionLegendItem(
          "mission",
          "Mission Progression"
        )}

        ${renderRegionLegendItem(
          "activity",
          "Side Activity"
        )}

        ${renderRegionLegendItem(
          "secret",
          "Secret / Rare Area"
        )}

        ${renderRegionLegendItem(
          "outpost",
          "Outpost"
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


    </aside>

  `;

}



// =========================================================
// 10. LEFT NAV PROGRESS ITEM
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
// 11. LEGEND ITEM
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
// 12. REGIONAL SYMBOLS
// =========================================================

function getRegionSymbol(type) {

  switch (type) {

    case "loot":
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
// 13. REGION HOTSPOT GENERATOR
// =========================================================

function renderRegionHotspot(
  regionKey,
  location
) {

  const isSelected =
    selectedLocationNode &&
    selectedLocationNode.id ===
      location.id;


  return `

    <button
      type="button"

      class="
        region-hotspot
        ${location.type}
        ${isSelected ? "selected" : ""}
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
        Select ${location.name}
      "
    >


      <span class="
        hotspot-orb
      ">

        ${
          location.type === "training"
            ? "EXP"
            : location.type === "mission"
              ? "◆"
              : location.type === "secret"
                ? "?"
                : location.type === "activity"
                  ? "✦"
                  : location.type === "battle"
                    ? "▣"
                    : location.type === "outpost"
                      ? "▥"
                      : ""
        }

      </span>


      <span class="
        hotspot-label
      ">

        ${location.shortName || location.name}

      </span>


    </button>

  `;

}



// =========================================================
// 14. MAP-SIDE LOCATION CARD
// =========================================================

function renderMapLocationCard(
  location
) {

  return `

    <div class="
      region-map-card-content
    ">


      <div class="
        region-map-detail-heading
      ">
        LOCATION DETAILS
      </div>


      <div class="
        region-map-card-name
      ">
        ${location.name}
      </div>


      <div class="
        region-map-card-category
      ">
        ${location.category}
      </div>


      <p class="
        region-map-card-description
      ">
        ${location.desc}
      </p>


      <div class="
        region-map-card-divider
      ">
      </div>


      ${renderMapDetailRow(
        "Level Range",
        location.levelRange
      )}


      ${renderMapDetailRow(
        "Best For",
        location.bestFor
      )}


      ${renderMapDetailRow(
        "Enemy Types",
        location.enemyTypes
      )}



      ${
        location.rewards &&
        location.rewards.length
          ? `

              <div class="
                region-map-card-divider
              ">
              </div>


              <div class="
                region-map-reward-title
              ">
                POSSIBLE REWARDS
              </div>


              <div class="
                region-map-rewards
              ">

                ${location.rewards.map(
                  reward => `

                    <span>
                      ${reward}
                    </span>

                  `
                ).join("")}

              </div>

            `
          : ""
      }



      <button
        type="button"

        class="
          region-map-navigate-button
        "

        onclick="
          handleNodeNavigation()
        "
      >

        <span>
          NAVIGATE
        </span>

        <span>
          ➤
        </span>

      </button>


    </div>

  `;

}



// =========================================================
// 15. MAP CARD DETAIL ROW
// =========================================================

function renderMapDetailRow(
  label,
  value
) {

  return `

    <div class="
      region-map-card-row
    ">

      <span>
        ${label}
      </span>

      <strong>
        ${value}
      </strong>

    </div>

  `;

}



// =========================================================
// 16. LOCATION DETAILS PANEL
// =========================================================

function renderLocationDetailsPane(
  location
) {

  /*
    IMPORTANT:

    This pane always exists so the layout does not jump around,
    but location information only appears after a marker click.
  */

  if (!location) {

    return `

      <aside class="
        region-details-pane
        region-details-empty
      ">


        <div>

          <div class="
            region-details-heading
          ">
            LOCATION DETAILS
          </div>


          <div class="
            region-details-placeholder
          ">

            <span class="
              region-details-placeholder-icon
            ">
              ◉
            </span>

            <p>
              Select a marker on the map to view its details.
            </p>

          </div>

        </div>


      </aside>

    `;

  }


  return `

    <aside class="
      region-details-pane
    ">


      <div>


        <div class="
          region-details-heading
        ">
          LOCATION DETAILS
        </div>


        <div class="
          region-details-location-name
        ">
          ${location.name}
        </div>


        <div class="
          region-details-category
        ">
          ${location.category}
        </div>


        <p class="
          region-details-description
        ">
          ${location.desc}
        </p>


        <div class="
          region-details-divider
        ">
        </div>


        ${renderDetailRow(
          "Level Range",
          location.levelRange
        )}


        ${renderDetailRow(
          "Best For",
          location.bestFor
        )}


        ${renderDetailRow(
          "Enemy Types",
          location.enemyTypes
        )}


        ${
          location.rewards &&
          location.rewards.length
            ? `

                <div class="
                  region-details-divider
                ">
                </div>


                <div class="
                  region-details-rewards-title
                ">
                  POSSIBLE REWARDS
                </div>


                <div class="
                  region-details-rewards
                ">

                  ${location.rewards.map(
                    reward => `
                      <span>
                        ${reward}
                      </span>
                    `
                  ).join("")}

                </div>

              `
            : ""
        }


      </div>



      <button
        type="button"

        class="
          btn-ninja
        "

        onclick="
          handleNodeNavigation()
        "
      >

        ${getNavigationButtonText(
          location
        )}

      </button>


    </aside>

  `;

}



// =========================================================
// 17. LOCATION DETAIL ROW
// =========================================================

function renderDetailRow(
  label,
  value
) {

  return `

    <div class="
      region-details-row
    ">

      <span>
        ${label}
      </span>

      <strong>
        ${value}
      </strong>

    </div>

  `;

}



// =========================================================
// 18. SELECT REGIONAL MAP NODE
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


  /*
    Re-rendering updates:

    1. selected marker
    2. inner map detail overlay
    3. far-right location details
  */
  renderRegionHubUI(
    regionKey,
    region
  );

}



// =========================================================
// 19. RETURN TO WORLD MAP
// =========================================================

function returnToWorldMap() {

  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  /*
    The world map already lives beneath the overlay,
    so returning simply closes the regional overlay.
  */
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
// 20. LOCATION NAVIGATION
// =========================================================

function handleNodeNavigation() {

  if (!selectedLocationNode) {
    return;
  }


  /*
    Remove the special region-map sizing before opening
    another overlay screen.
  */
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

      /*
        For now this opens a generic battle/area screen.

        Later we can build the Southern Outpost as its own
        dedicated regional hub.
      */

      openOverlay(
        "battle"
      );

      break;



    case "activity":

      openOverlay(
        "training"
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
// 21. NAVIGATION BUTTON TEXT
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
      return "VIEW ACTIVITY ➜";


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
          "Drop Chance: 12%"
        )}


        ${createActivityCard(
          "Bandit Leader",
          "Defeat an elite rogue shinobi.",
          "Ryo: 650",
          "Rare Drop: 8%"
        )}


        ${createActivityCard(
          "Hidden Cache",
          "High-risk encounter protecting stolen equipment.",
          "Ryo: 1,200",
          "Rare Drop: 18%"
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
  requirement
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