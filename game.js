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

    locations: [

      {
        id: "konohagakure",

        name: "Konohagakure (Hidden Leaf)",

        type: "village",

        category: "CAPITAL VILLAGE HUB",

        desc:
          "The glorious capital hidden behind giant mountain walls.",

        levelRange: "1-50",

        bestFor:
          "Village Hub, Quests & Progression",

        enemyTypes:
          "Safe Zone",

        x: 50,
        y: 86
      },


      {
        id: "training_grounds",

        name: "Training Grounds",

        type: "training",

        category: "EXP GRINDING",

        desc:
          "High-density wildlife and rogue ninja scouting grounds. Ideal for repeatable EXP farming.",

        levelRange:
          "10-16",

        bestFor:
          "EXP & Training",

        enemyTypes:
          "Bandits / Wildlife",

        x: 30,
        y: 44
      },


      {
        id: "bandit_hideout",

        name: "Bandit Hideout",

        type: "battle",

        category: "LOOT HOTSPOT",

        desc:
          "An outlaw encampment hiding stolen scrolls, weapons and valuable materials.",

        levelRange:
          "15-20",

        bestFor:
          "Ryo, Gear & Materials",

        enemyTypes:
          "Rogue Shinobi",

        x: 26,
        y: 22
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
    document.getElementById("screen-overlay");


  if (!overlay) {
    return;
  }


  overlay.style.display = "none";
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


  selectedLocationNode =
    region.locations[0] || null;


  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  if (!overlay) {
    return;
  }


  overlay.style.display =
    "flex";


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

    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 10px;

      padding-bottom: 8px;

      border-bottom:
        1px solid #1E293B;
    ">


      <div>

        <h2 style="
          margin: 0;

          color: #D6A93A;

          font-size: 14px;

          letter-spacing: 1px;
        ">
          ${region.name.toUpperCase()}
        </h2>


        <p style="
          margin-top: 3px;

          color: #94A3B8;

          font-size: 9px;
        ">
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



        ${region.locations.map(
          location =>
            renderRegionHotspot(
              regionKey,
              location
            )
        ).join("")}


      </div>



      <!-- =================================================
           LOCATION DETAILS
           ================================================= -->

      ${renderLocationDetailsPane(
        selectedLocationNode
      )}


    </div>

  `;
}


// =========================================================
// 9. REGION HOTSPOT GENERATOR
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
      </span>


      <span class="
        hotspot-label
      ">
        ${location.name}
      </span>


    </button>

  `;
}


// =========================================================
// 10. LOCATION DETAILS PANEL
// =========================================================

function renderLocationDetailsPane(
  location
) {

  if (!location) {

    return `

      <div class="
        region-details-pane
      ">

        <p style="
          color: #64748B;
          font-size: 10px;
        ">
          No location selected.
        </p>

      </div>

    `;
  }


  return `

    <div class="
      region-details-pane
    ">


      <div>


        <div style="
          margin-bottom: 8px;

          padding-bottom: 5px;

          color: #D6A93A;

          border-bottom:
            1px solid #1E293B;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 1px;
        ">
          LOCATION DETAILS
        </div>



        <div style="
          color: #FFFFFF;

          font-size: 13px;

          font-weight: 900;

          margin-bottom: 3px;
        ">
          ${location.name}
        </div>



        <div style="
          color: #00D9E8;

          font-size: 9px;

          font-weight: 800;

          margin-bottom: 10px;
        ">
          ${location.category}
        </div>



        <p style="
          color: #94A3B8;

          font-size: 9px;

          line-height: 1.5;

          margin-bottom: 14px;
        ">
          ${location.desc}
        </p>



        <div style="
          display: flex;

          flex-direction: column;

          gap: 7px;

          padding-top: 10px;

          border-top:
            1px solid #1E293B;

          font-size: 9px;
        ">


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


        </div>


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


    </div>

  `;
}


// =========================================================
// 11. LOCATION DETAIL ROW
// =========================================================

function renderDetailRow(
  label,
  value
) {

  return `

    <div style="
      display: flex;

      justify-content:
        space-between;

      gap: 10px;
    ">


      <span style="
        color: #64748B;
      ">
        ${label}
      </span>


      <span style="
        color: #FFFFFF;

        text-align: right;
      ">
        ${value}
      </span>


    </div>

  `;
}


// =========================================================
// 12. SELECT REGIONAL MAP NODE
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


  renderRegionHubUI(
    regionKey,
    region
  );
}


// =========================================================
// 13. LOCATION NAVIGATION
// =========================================================

function handleNodeNavigation() {

  if (!selectedLocationNode) {
    return;
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


    default:

      openOverlay(
        "battle"
      );

      break;
  }
}


// =========================================================
// 14. NAVIGATION BUTTON TEXT
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