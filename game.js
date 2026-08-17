// =========================================================
// SHINOBI CHRONICLES
// CORE WORLD / REGION / OVERLAY SYSTEM
// =========================================================

// =========================================================
// PLAYER TEAM DATABASE
// =========================================================

let playerTeam = [

  {
    id: "naruto",
    name: "Kage Naruto",
    rank: "Kage",
    rarity: "Legendary",

    basePL: 105,

    baseStats: {
      nin: 95,
      tai: 82,
      buki: 68,
      fuin: 80,
      kin: 91,
      gen: 62,
      stamina: 96
    },

    stats: {
      nin: 95,
      tai: 82,
      buki: 68,
      fuin: 80,
      kin: 91,
      gen: 62,
      stamina: 96
    },

    permanentPLBonus: 0,
    equipment: [],
    abilities: [],

    image:
      "Assets/Animated Cards/Kage Naruto.png"
  },


  {
    id: "sasuke",
    name: "Jonin Sasuke",
    rank: "Elite Jonin",
    rarity: "Epic",

    basePL: 55,

    baseStats: {
      nin: 94,
      tai: 84,
      buki: 91,
      fuin: 70,
      kin: 86,
      gen: 90,
      stamina: 81
    },

    stats: {
      nin: 94,
      tai: 84,
      buki: 91,
      fuin: 70,
      kin: 86,
      gen: 90,
      stamina: 81
    },

    permanentPLBonus: 0,
    equipment: [],
    abilities: [],

    image:
      "Assets/Animated Cards/Jonin Sasuke.png"
  },


  {
    id: "sakura",
    name: "Sannin Sakura",
    rank: "Sannin",
    rarity: "Rare",

    basePL: 72,

    baseStats: {
      nin: 76,
      tai: 96,
      buki: 58,
      fuin: 70,
      kin: 45,
      gen: 64,
      stamina: 95
    },

    stats: {
      nin: 76,
      tai: 96,
      buki: 58,
      fuin: 70,
      kin: 45,
      gen: 64,
      stamina: 95
    },

    permanentPLBonus: 0,
    equipment: [],
    abilities: [],

    image:
      "Assets/Animated Cards/Sannin Sakura.png"
  },


  {
    id: "nagato",
    name: "Teen Nagato",
    rank: "Kage",
    rarity: "Legendary",

    basePL: 97,

    baseStats: {
      nin: 98,
      tai: 74,
      buki: 64,
      fuin: 94,
      kin: 99,
      gen: 96,
      stamina: 91
    },

    stats: {
      nin: 98,
      tai: 74,
      buki: 64,
      fuin: 94,
      kin: 99,
      gen: 96,
      stamina: 91
    },

    permanentPLBonus: 0,
    equipment: [],
    abilities: [],

    image:
      "Assets/Animated Cards/Teen Nagato.png"
  }

];

// =========================================================
// POWER LEVEL CALCULATION
// =========================================================

const STAT_WEIGHTS = {

  nin: 1.10,
  tai: 1.00,
  buki: 0.90,
  fuin: 1.00,
  kin: 0.75,
  gen: 0.95,
  stamina: 1.10

};


function calculateStatPLGrowth(
  baseStats,
  currentStats
) {

  let weightedGrowth = 0;
  let totalWeight = 0;


  for (const stat in STAT_WEIGHTS) {

    const growth =
      currentStats[stat] -
      baseStats[stat];


    weightedGrowth +=
      growth * STAT_WEIGHTS[stat];


    totalWeight +=
      STAT_WEIGHTS[stat];

  }


  return weightedGrowth / totalWeight;

}


function calculateCurrentPL(character) {

  const statGrowth =
    calculateStatPLGrowth(
      character.baseStats,
      character.stats
    );


  const permanentBonus =
    character.permanentPLBonus || 0;


  return Math.round(
    character.basePL +
    statGrowth +
    permanentBonus
  );

}

// =========================================================
// CHARACTER STAT MODIFICATION
// =========================================================

function increaseCharacterStat(
  characterId,
  statName,
  amount
) {

  const character =
    playerTeam.find(
      member => member.id === characterId
    );


  if (!character) {

    console.log(
      "Character not found:",
      characterId
    );

    return;
  }


  if (
    character.stats[statName] === undefined
  ) {

    console.log(
      "Stat not found:",
      statName
    );

    return;
  }


  character.stats[statName] += amount;


  console.log(
    `${character.name} gained +${amount} ${statName.toUpperCase()}`
  );


  console.log(
    "New Current PL:",
    calculateCurrentPL(character)
  );

}

// =========================================================
// ENEMY DATABASE
// =========================================================

let selectedEnemy = null;


let currentBattle = {

  active: false,

  enemy: null,

  enemyPower: 0,

  enemyMaxPower: 0,

  activePlayer: null,

  lastDamage: 0,

  battleOver: false,

  battleLog: [],

  rewards: {

    generated: false,

    ryo: 0,

    exp: 0,

    items: [],

    rareDrops: [],

    finishingShinobi: null

  }

};


const enemyDatabase = {


  // =========================================
  // ROGUE SCOUT
  // =========================================

  scout: {

    id: "scout",

    name: "Rogue Scout",

    rank: "Rogue Shinobi",

    power: 32,


    stats: {

      stamina: 34

    },


    image:
      "Enemies/Scout.png",


    rewards: {

      ryo: {

        min: 150,

        max: 220

      },


      exp: {

        min: 18,

        max: 28

      },


      commonDrops: [

        {

          name: "Bandit Supplies",

          rarity: "Common",

          chance: 25

        },

        {

          name: "Basic Scroll",

          rarity: "Common",

          chance: 12

        }

      ],


      rareDrops: []

    }

  },


  // =========================================
  // BANDIT
  // =========================================

  bandit: {

    id: "bandit",

    name: "Bandit",

    rank: "Outlaw",

    power: 41,


    stats: {

      stamina: 42

    },


    image:
      "Enemies/Bandit.png",


    rewards: {

      ryo: {

        min: 220,

        max: 320

      },


      exp: {

        min: 25,

        max: 38

      },


      commonDrops: [

        {

          name: "Weapon Materials",

          rarity: "Common",

          chance: 25

        },

        {

          name: "Basic Scroll",

          rarity: "Common",

          chance: 18

        }

      ],


      rareDrops: []

    }

  },


  // =========================================
  // BANDIT LEADER
  // =========================================

  banditLeader: {

    id: "banditLeader",

    name: "Bandit Leader",

    rank: "Elite Rogue",

    power: 56,


    stats: {

      stamina: 58

    },


    image:
      "Enemies/BanditLeader.png",


    rewards: {

      ryo: {

        min: 350,

        max: 450

      },


      exp: {

        min: 45,

        max: 65

      },


      commonDrops: [

        {

          name: "Weapon Materials",

          rarity: "Common",

          chance: 40

        },

        {

          name: "Basic Scroll",

          rarity: "Common",

          chance: 30

        }

      ],


      rareDrops: [

        {

          name: "Bandit Captain's Tanto",

          rarity: "Rare",

          chance: 100

        }

      ]

    }

  }

};


// =========================================================
// ENCOUNTER SYSTEM
// =========================================================

function startEncounter(enemyId) {


  console.log(
    "START ENCOUNTER FIRED:",
    enemyId
  );


  const enemy =
    enemyDatabase[enemyId];


  if (!enemy) {

    console.log(
      "Enemy not found"
    );

    return;

  }


  selectedEnemy =
    enemy;


  currentBattle.active =
    true;


  currentBattle.enemy =
    enemy;


  currentBattle.activePlayer =
    playerTeam[0];


  currentBattle.lastDamage =
    0;


  currentBattle.battleOver =
    false;


  currentBattle.battleLog = [

    `${enemy.name} appears!`,

    `${playerTeam[0].name} prepares for battle.`

  ];


  // =========================================
  // RESET BATTLE CONTRIBUTIONS
  // =========================================

  currentBattle.contributions = {};


  playerTeam.forEach(
    member => {

      currentBattle.contributions[
        member.id
      ] = {

        id:
          member.id,

        name:
          member.name,

        power:
          calculateCurrentPL(
            member
          ),

        damage:
          0,

        attacks:
          0,

        ninjutsuDamage:
          0,

        taijutsuDamage:
          0

      };

    }
  );


  // =========================================
  // RESET BATTLE REWARDS
  // =========================================

  currentBattle.rewards = {

    generated: false,

    ryo: 0,

    exp: 0,

    items: [],

    rareDrops: [],

    finishingShinobi: null,

    mvp: null

  };


  const generatedBattlePower =
    calculateBattlePower(
      enemy,
      "standard"
    );


  currentBattle.enemyPower =
    generatedBattlePower;


  currentBattle.enemyMaxPower =
    generatedBattlePower;


  console.log(
    "CURRENT BATTLE:",
    currentBattle
  );


  openOverlay(
    "combat"
  );

}



// =========================================================
// BATTLE CONTRIBUTION SYSTEM
// =========================================================

function recordBattleContribution(
  fighter,
  damage,
  attackType
) {


  if (
    !fighter ||
    !currentBattle.contributions
  ) {

    return;

  }


  const contribution =
    currentBattle.contributions[
      fighter.id
    ];


  if (!contribution) {

    return;

  }


  contribution.damage +=
    damage;


  contribution.attacks +=
    1;


  if (
    attackType === "ninjutsu"
  ) {

    contribution.ninjutsuDamage +=
      damage;

  }


  if (
    attackType === "taijutsu"
  ) {

    contribution.taijutsuDamage +=
      damage;

  }

}



function calculateBattleMVP() {


  const contributions =
    Object.values(
      currentBattle.contributions || {}
    );


  if (
    contributions.length === 0
  ) {

    return null;

  }


  const totalDamage =
    contributions.reduce(
      (
        total,
        fighter
      ) =>
        total +
        fighter.damage,
      0
    );


  if (
    totalDamage <= 0
  ) {

    return null;

  }


  const winner =
    contributions.reduce(
      (
        best,
        fighter
      ) => {

        if (
          !best ||
          fighter.damage >
          best.damage
        ) {

          return fighter;

        }


        return best;

      },
      null
    );


  return {

    id:
      winner.id,

    name:
      winner.name,

    power:
      winner.power,

    damage:
      winner.damage,

    attacks:
      winner.attacks,

    percentage:
      Math.round(
        (
          winner.damage /
          totalDamage
        ) *
        100
      )

  };

}




// =========================================================
// BATTLE REWARD SYSTEM
// =========================================================

function randomRewardNumber(
  min,
  max
) {

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;

}



function rollRewardChance(
  chance
) {

  const roll =
    Math.random() * 100;


  return roll < chance;

}



function generateBattleRewards(
  enemy,
  finishingShinobi
) {


  // =========================================
  // SAFETY CHECK
  // Never generate the same rewards twice
  // =========================================

  if (
    currentBattle.rewards.generated
  ) {

    console.log(
      "Rewards already generated"
    );

    return currentBattle.rewards;

  }


  const rewardTable =
    enemy.rewards;


  if (!rewardTable) {

    console.log(
      "Enemy has no reward table:",
      enemy.name
    );

    return currentBattle.rewards;

  }


  // =========================================
  // RYO
  // =========================================

  const ryo =
    randomRewardNumber(
      rewardTable.ryo.min,
      rewardTable.ryo.max
    );


  // =========================================
  // EXP
  // =========================================

  const exp =
    randomRewardNumber(
      rewardTable.exp.min,
      rewardTable.exp.max
    );


  // =========================================
  // COMMON ITEM DROPS
  // =========================================

  const items = [];


  rewardTable.commonDrops.forEach(
    drop => {

      if (
        rollRewardChance(
          drop.chance
        )
      ) {

        items.push({

          name:
            drop.name,

          rarity:
            drop.rarity,

          chance:
            drop.chance

        });

      }

    }
  );


  // =========================================
  // RARE ITEM DROPS
  // =========================================

  const rareDrops = [];


  rewardTable.rareDrops.forEach(
    drop => {

      if (
        rollRewardChance(
          drop.chance
        )
      ) {

        rareDrops.push({

          name:
            drop.name,

          rarity:
            drop.rarity,

          chance:
            drop.chance

        });

      }

    }
  );


  // =========================================
  // STORE FINAL RESULT
  // =========================================

  currentBattle.rewards = {

    generated: true,

    ryo:
      ryo,

    exp:
      exp,

    items:
      items,

    rareDrops:
      rareDrops,

    finishingShinobi:
      finishingShinobi
        ? finishingShinobi.name
        : null

  };


  console.log(
    "BATTLE REWARDS:",
    currentBattle.rewards
  );


  return currentBattle.rewards;

}


// =========================================================
// 1. WORLD REGION DATA
// =========================================================================================

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
var currentOverlayType = null;


// =========================================================
// 3. GLOBAL OVERLAY SYSTEM
// =========================================================

function openOverlay(type) {


  currentOverlayType =
    type;


  const overlay =
    document.getElementById(
      "screen-overlay"
    );


  const container =
    document.getElementById(
      "overlay-content-container"
    );


  if (
    !overlay ||
    !container
  ) {

    return;

  }


  saveTestState();


  overlay.style.display =
    "flex";


  switch (type) {


    case "clan":

      renderClanOverlay(
        container
      );

      break;


    case "village":

      renderVillageOverlay(
        container
      );

      break;


    case "missions":

      renderGenericOverlay(
        container,
        "MISSION BOARD",
        "Choose story missions, side missions and regional assignments."
      );

      break;


    case "battle":

      renderBattleOverlay(
        container
      );

      break;


    case "combat":

      renderCombatOverlay(
        container
      );

      break;


    case "victory":

      renderVictoryOverlay(
        container
      );

      break;


    case "training":

      renderTrainingOverlay(
        container
      );

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
// 4. CLOSE / BACK OVERLAY
// =========================================================

function closeOverlay() {


  // =========================================
  // VICTORY SCREEN
  // Return to encounter selection
  // =========================================

  if (
    currentOverlayType ===
    "victory"
  ) {

    currentBattle.active =
      false;


    openOverlay(
      "battle"
    );


    return;

  }


  // =========================================
  // COMBAT
  // Return to encounter selection
  // =========================================

  if (
    currentOverlayType ===
    "combat"
  ) {

    currentBattle.active =
      false;


    openOverlay(
      "battle"
    );


    return;

  }


  // =========================================
  // BATTLE / LOCATION SCREEN
  // Return to current region map
  // =========================================

  if (
    currentOverlayType ===
      "battle" &&
    selectedRegionKey
  ) {

    openRegionHub(
      selectedRegionKey
    );


    return;

  }


  // =========================================
  // OTHER REGION SUB-SCREENS
  // =========================================

  if (
    selectedRegionKey &&
    currentOverlayType !==
      "region"
  ) {

    openRegionHub(
      selectedRegionKey
    );


    return;

  }


  // =========================================
  // REGION MAP
  // Return to world map
  // =========================================

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


  currentOverlayType =
    null;


  selectedRegionKey =
    null;


  selectedLocationNode =
    null;


  saveTestState();

}

// =========================================================
// DEVELOPMENT TEST STATE
// =========================================================

function saveTestState() {


  const state = {


    overlayType:
      currentOverlayType,


    regionKey:
      selectedRegionKey,


    locationId:
      selectedLocationNode
        ? selectedLocationNode.id
        : null,


    enemyId:
      selectedEnemy
        ? selectedEnemy.id
        : null,


    enemyPower:
      currentBattle.enemyPower,


    enemyMaxPower:
      currentBattle.enemyMaxPower,


    activePlayerId:
      currentBattle.activePlayer
        ? currentBattle.activePlayer.id
        : null,


    lastDamage:
      currentBattle.lastDamage,


    battleOver:
      currentBattle.battleOver,


    battleLog:
      currentBattle.battleLog,


    rewards:
      currentBattle.rewards,


    contributions:
      currentBattle.contributions ||
      {}

  };


  sessionStorage.setItem(
    "shinobiTestState",
    JSON.stringify(
      state
    )
  );

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

  currentOverlayType = "region";

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

  saveTestState();

}



// =========================================================
// RENDER REGION MAP
// =========================================================

function renderRegionHubUI(
  regionKey,
  region
) {

saveTestState();

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
// BATTLE POWER CALCULATION
// =========================================================

function calculateBattlePower(
  character,
  encounterType = "standard"
) {

  const pl =
    character.basePL !== undefined
      ? calculateCurrentPL(character)
      : character.power;


  const stamina =
    character.stats?.stamina || 0;


  // Core Battle Power
  let battlePower =
    pl +
    (stamina * 0.5);


  // Encounter scaling
  const multipliers = {

    standard: 1,

    elite: 1.25,

    groupBoss: 8,

    guardBoss: 50

  };


  battlePower *=
    multipliers[encounterType] || 1;


  // Small ±10% variation
  const variation =
    0.90 +
    (Math.random() * 0.20);


  battlePower *= variation;


  return Math.max(
    1,
    Math.round(battlePower)
  );

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


  console.log("Battle overlay opened");


  const location =
    selectedLocationNode;



  container.innerHTML = `

    <div style="
      display:flex;
      flex-direction:column;
      flex:1;
    ">


      <h2 style="
        color:#D6A93A;
        font-size:16px;
        margin-bottom:5px;
      ">
        ${
          location
            ? location.name.toUpperCase()
            : "COMBAT AREA"
        }
      </h2>



      <p style="
        color:#94A3B8;
        font-size:10px;
        margin-bottom:16px;
      ">
        Choose your opponent.
      </p>




      <div style="
        display:grid;

        grid-template-columns:
          repeat(
            3,
            minmax(0,1fr)
          );

        gap:12px;
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
// CHARACTER CARD RENDERER
// =========================================================


function createCharacterCard(character) {


  return `

    <div style="
      width:120px;
      text-align:center;
      padding:10px;
      border:1px solid #334155;
      border-radius:10px;
      background:#080D18;
    ">


      <img
        src="${character.image}"
        style="
          width:100px;
          height:140px;
          object-fit:cover;
          border-radius:8px;
        "
      >


      <h4 style="
        color:#00D9E8;
        margin:8px 0 3px;
      ">
        ${character.name}
      </h4>


      <p style="
        color:#94A3B8;
        font-size:12px;
      ">
      PL ${
  character.basePL !== undefined
    ? calculateCurrentPL(character)
    : character.power
}
      </p>

    </div>

  `;

}



// =========================================================
// 17. COMBAT ARENA SCREEN
// =========================================================

function renderCombatOverlay(container) {


  const enemy =
    selectedEnemy;


  if (!enemy) {

    container.innerHTML = `

      <h2 style="
        color:#E53935;
      ">
        NO ENEMY SELECTED
      </h2>

    `;

    return;

  }


  const rewards =
    currentBattle.rewards || {

      generated: false,

      ryo: 0,

      exp: 0,

      items: [],

      rareDrops: [],

      finishingShinobi: null,

      mvp: null

    };


  container.innerHTML = `


<div style="
display:flex;
flex-direction:column;
height:100%;
min-height:0;
padding:20px;
overflow-y:auto;
overflow-x:hidden;
box-sizing:border-box;
padding-bottom:80px;
">



<!-- HEADER -->

<div style="
text-align:center;
margin-bottom:20px;
">


<h2 style="
color:#D6A93A;
">
LAND OF FIRE
</h2>


<p style="
color:#94A3B8;
">
BANDIT HIDEOUT
</p>


</div>



<!-- ARENA AREA -->

<div style="
display:flex;
justify-content:space-between;
align-items:center;
flex:1;
">



<!-- PLAYER TEAM -->

${playerTeam.map(member => `

<div
  onclick="
    ${
      currentBattle.battleOver
        ? ""
        : `selectActiveFighter('${member.id}')`
    }
  "

  style="
    cursor:${
      currentBattle.battleOver
        ? "default"
        : "pointer"
    };

    opacity:${
      currentBattle.activePlayer &&
      currentBattle.activePlayer.id === member.id
        ? "1"
        : "0.65"
    };

    transform:${
      currentBattle.activePlayer &&
      currentBattle.activePlayer.id === member.id
        ? "scale(1.05)"
        : "scale(1)"
    };

    transition:0.2s ease;
  "
>

  ${createCharacterCard(member)}

</div>

`).join("")}



<!-- ACTIVE DUEL -->

<div style="
text-align:center;
">


<h2>

${
  currentBattle.battleOver
    ? "⚔ BATTLE COMPLETE ⚔"
    : "⚔ ACTIVE DUEL ⚔"
}

</h2>



<div style="
padding:20px;
border:1px solid #334155;
border-radius:10px;
">


<h2>

${currentBattle.activePlayer
  ? currentBattle.activePlayer.name
  : "NO SHINOBI"}

</h2>


<p>
VS
</p>



${createCharacterCard({

  name:
    enemy.name,

  power:
    enemy.power,

  image:
    enemy.image

})}



${
  currentBattle.lastDamage > 0
    ? `

      <div style="
        color:#E53935;
        font-size:24px;
        font-weight:bold;
        margin-top:6px;
        margin-bottom:6px;
      ">

        -${currentBattle.lastDamage}

      </div>

    `
    : ""
}



<h2 style="
color:#E53935;
">

${enemy.name}

</h2>


<p style="
color:#94A3B8;
">

${enemy.rank}

</p>


</div>


</div>



<!-- ENEMY SIDE -->

<div style="
width:30%;
text-align:center;
">


<h3 style="
color:#E53935;
">
ENEMY TEAM
</h3>


<div class="team-slot">

${enemy.name}

<br>

PL ${enemy.power}

<br>

Battle Power
${currentBattle.enemyPower}
/
${currentBattle.enemyMaxPower}

</div>


</div>


</div>



<!-- VICTORY / REWARD PANEL -->

${
  currentBattle.battleOver
    ? `

      <div style="
        text-align:center;
        margin-top:18px;
        margin-bottom:12px;
        padding:18px;
        border:1px solid #D6A93A;
        border-radius:8px;
        background:
          rgba(
            5,
            7,
            11,
            0.75
          );
      ">


        <!-- VICTORY TITLE -->

        <div style="
          color:#D6A93A;
          font-size:28px;
          font-weight:bold;
          margin-bottom:4px;
        ">

          ⚔ VICTORY ⚔

        </div>


        <div style="
          color:#94A3B8;
          margin-bottom:16px;
        ">

          ${enemy.name}
          has been defeated.

        </div>



        <!-- REWARD TITLE -->

        <div style="
          color:#00D9E8;
          font-size:14px;
          font-weight:bold;
          letter-spacing:2px;
          margin-bottom:12px;
        ">

          BATTLE REWARDS

        </div>



        <!-- REWARD GRID -->

        <div style="
          display:grid;
          grid-template-columns:
            repeat(
              5,
              minmax(110px, 1fr)
            );
          gap:10px;
          max-width:850px;
          margin:0 auto;
        ">



          <!-- RYO -->

          <div style="
            padding:12px;
            border:1px solid #334155;
            border-radius:7px;
            background:#080D18;
          ">

            <div style="
              color:#D6A93A;
              font-size:11px;
              font-weight:bold;
              margin-bottom:5px;
            ">
              RYŌ
            </div>

            <div style="
              color:#FFFFFF;
              font-size:18px;
              font-weight:bold;
            ">
              ${rewards.ryo}
            </div>

          </div>



          <!-- EXP -->

          <div style="
            padding:12px;
            border:1px solid #334155;
            border-radius:7px;
            background:#080D18;
          ">

            <div style="
              color:#00D9E8;
              font-size:11px;
              font-weight:bold;
              margin-bottom:5px;
            ">
              EXP
            </div>

            <div style="
              color:#FFFFFF;
              font-size:18px;
              font-weight:bold;
            ">
              ${rewards.exp}
            </div>

          </div>



          <!-- ITEM -->

          <div style="
            padding:12px;
            border:1px solid #334155;
            border-radius:7px;
            background:#080D18;
          ">

            <div style="
              color:#94A3B8;
              font-size:11px;
              font-weight:bold;
              margin-bottom:5px;
            ">
              ITEM
            </div>

            <div style="
              color:#FFFFFF;
              font-size:12px;
              line-height:1.4;
            ">

              ${
                rewards.items &&
                rewards.items.length > 0

                  ? rewards.items
                      .map(
                        item =>
                          item.name
                      )
                      .join("<br>")

                  : "NO DROP"
              }

            </div>

          </div>



          <!-- RARE DROP -->

          <div style="
            padding:12px;
            border:1px solid #334155;
            border-radius:7px;
            background:#080D18;
          ">

            <div style="
              color:#D6A93A;
              font-size:11px;
              font-weight:bold;
              margin-bottom:5px;
            ">
              RARE DROP
            </div>

            <div style="
              color:${
                rewards.rareDrops &&
                rewards.rareDrops.length > 0
                  ? "#D6A93A"
                  : "#64748B"
              };

              font-size:12px;
              font-weight:bold;
              line-height:1.4;
            ">

              ${
                rewards.rareDrops &&
                rewards.rareDrops.length > 0

                  ? rewards.rareDrops
                      .map(
                        item =>
                          `★ ${item.name}`
                      )
                      .join("<br>")

                  : "NO DROP"
              }

            </div>

          </div>



          <!-- FINAL STRIKE -->

          <div style="
            padding:12px;
            border:1px solid #334155;
            border-radius:7px;
            background:#080D18;
          ">

            <div style="
              color:#00D9E8;
              font-size:11px;
              font-weight:bold;
              margin-bottom:5px;
            ">
              FINAL STRIKE
            </div>

            <div style="
              color:#FFFFFF;
              font-size:12px;
              font-weight:bold;
            ">

              ${
                rewards.finishingShinobi ||
                "UNKNOWN"
              }

            </div>

          </div>


        </div>



        <!-- MVP -->

        ${
          rewards.mvp
            ? `

              <div style="
                max-width:420px;
                margin:16px auto 0 auto;
                padding:12px 18px;
                border-top:1px solid #334155;
              ">


                <div style="
                  color:#D6A93A;
                  font-size:12px;
                  font-weight:bold;
                  letter-spacing:2px;
                ">

                  ★ BATTLE MVP ★

                </div>


                <div style="
                  color:#FFFFFF;
                  font-size:18px;
                  font-weight:bold;
                  margin-top:5px;
                ">

                  ${rewards.mvp.name}

                </div>


                <div style="
                  color:#00D9E8;
                  font-size:12px;
                  margin-top:4px;
                ">

                  ${rewards.mvp.percentage}%
                  TOTAL DAMAGE

                </div>


                <div style="
                  color:#64748B;
                  font-size:10px;
                  margin-top:3px;
                ">

                  ${rewards.mvp.damage}
                  BP DAMAGE
                  •
                  ${rewards.mvp.attacks}
                  ATTACK${
                    rewards.mvp.attacks === 1
                      ? ""
                      : "S"
                  }

                </div>


              </div>

            `
            : ""
        }


      </div>

    `
    : ""
}



<!-- ACTION BUTTONS -->

<div style="
margin-top:20px;
display:flex;
justify-content:center;
gap:12px;
">


<button
  onclick="
    performNinjutsuAttack()
  "

  ${
    currentBattle.battleOver
      ? "disabled"
      : ""
  }
>
NINJUTSU
</button>


<button
  onclick="
    performTaijutsuAttack()
  "

  ${
    currentBattle.battleOver
      ? "disabled"
      : ""
  }
>
TAIJUTSU
</button>


<button
  ${
    currentBattle.battleOver
      ? "disabled"
      : ""
  }
>
ITEM
</button>


<button
  ${
    currentBattle.battleOver
      ? "disabled"
      : ""
  }
>
FORMATION
</button>


</div>



<!-- BATTLE LOG -->

<div style="
margin-top:20px;
padding:10px;
border-top:1px solid #334155;
color:#94A3B8;
max-height:140px;
overflow-y:auto;
">


<strong>
Battle Log:
</strong>


<br><br>


${
  currentBattle.battleLog.length > 0
    ? currentBattle.battleLog
        .map(entry => `

          <div style="
            margin-bottom:5px;
          ">

            ${entry}

          </div>

        `)
        .join("")
    : `

        <div>
          Battle begins...
        </div>

      `
}


</div>



</div>


`;

}

// =========================================================
// 17B. VICTORY RESULTS SCREEN
// =========================================================


// =========================================================
// VICTORY NUMBER ANIMATION
// =========================================================

function animateVictoryNumber(
  element,
  finalValue,
  duration
) {


  if (!element) {

    console.log(
      "Victory number element missing"
    );

    return;

  }


  const target =
    Number(
      finalValue
    );


  if (
    !Number.isFinite(
      target
    )
  ) {

    console.log(
      "Invalid victory reward value:",
      finalValue
    );

    return;

  }


  // Start visibly from zero
  element.textContent =
    "0";


  const startTime =
    performance.now();


  function updateNumber(
    currentTime
  ) {


    const elapsed =
      currentTime -
      startTime;


    const progress =
      Math.min(
        elapsed /
        duration,
        1
      );


    // =========================================
    // EASE-OUT NUMBER MOVEMENT
    // =========================================

    const easedProgress =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const currentValue =
      Math.round(
        target *
        easedProgress
      );


    element.textContent =
      currentValue;


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        updateNumber
      );

    }
    else {

      // =======================================
      // GUARANTEE FINAL VALUE
      // =======================================

      element.textContent =
        String(
          target
        );

    }

  }


  requestAnimationFrame(
    updateNumber
  );

}



// =========================================================
// VICTORY REWARD REVEAL SEQUENCE
// =========================================================

function runVictoryRevealAnimations(
  container,
  rewards
) {


  const ryoElement =
    container.querySelector(
      ".victory-ryo-number"
    );


  const expElement =
    container.querySelector(
      ".victory-exp-number"
    );


  console.log(
    "VICTORY RYO TARGET:",
    rewards.ryo
  );


  console.log(
    "VICTORY EXP TARGET:",
    rewards.exp
  );


  console.log(
    "RYO ELEMENT:",
    ryoElement
  );


  console.log(
    "EXP ELEMENT:",
    expElement
  );


  // =========================================
  // FALLBACK VALUES
  //
  // If animation ever fails, Dave STILL
  // cannot escape without paying.
  // =========================================

  if (ryoElement) {

    ryoElement.textContent =
      String(
        rewards.ryo
      );

  }


  if (expElement) {

    expElement.textContent =
      String(
        rewards.exp
      );

  }


  // =========================================
  // RYO COUNT-UP
  // =========================================

  setTimeout(
    () => {

      animateVictoryNumber(
        ryoElement,
        rewards.ryo,
        650
      );

    },
    950
  );


  // =========================================
  // EXP COUNT-UP
  // =========================================

  setTimeout(
    () => {

      animateVictoryNumber(
        expElement,
        rewards.exp,
        550
      );

    },
    1350
  );


}


// =========================================================
// VICTORY SCREEN RENDERER
// =========================================================

function renderVictoryOverlay(
  container
) {


  const enemy =
    currentBattle.enemy ||
    selectedEnemy;


  const rewards =
    currentBattle.rewards || {

      generated:
        false,

      ryo:
        0,

      exp:
        0,

      items:
        [],

      rareDrops:
        [],

      finishingShinobi:
        null,

      mvp:
        null

    };


  if (!enemy) {

    container.innerHTML = `

      <h2 style="
        color:#E53935;
      ">
        NO BATTLE RESULT AVAILABLE
      </h2>

    `;


    return;

  }



  // =========================================
  // MVP SAFETY CHECK
  // =========================================

  let battleMVP =
    rewards.mvp;


  if (!battleMVP) {

    battleMVP =
      calculateBattleMVP();


    if (battleMVP) {

      currentBattle.rewards.mvp =
        battleMVP;

    }

  }



  // =========================================
  // COMMON ITEM TEXT
  // =========================================

  const itemText =

    rewards.items &&
    rewards.items.length > 0

      ? rewards.items
          .map(
            item =>
              item.name
          )
          .join("<br>")

      : "NO DROP";



  // =========================================
  // RARE DROP TEXT
  // =========================================

  const rareDropText =

    rewards.rareDrops &&
    rewards.rareDrops.length > 0

      ? rewards.rareDrops
          .map(
            item =>
              item.name
          )
          .join("<br>")

      : "NO DROP";



  // =========================================
  // RARE DROP STATUS
  // =========================================

  const hasRareDrop =

    rewards.rareDrops &&
    rewards.rareDrops.length > 0;



  // =========================================
  // MVP DETAILS
  // =========================================

  const mvpName =

    battleMVP
      ? battleMVP.name
      : "NO MVP";


  const mvpPercentage =

    battleMVP
      ? `${battleMVP.percentage}%`
      : "—";


  const mvpDamage =

    battleMVP
      ? battleMVP.damage
      : 0;


  const finalStrike =

    rewards.finishingShinobi ||
    "UNKNOWN";



  container.innerHTML = `


<style>


/* ========================================= */
/* VICTORY ART ENTRANCE */
/* ========================================= */

@keyframes victoryArtEntrance {

  0% {

    opacity:0;

    transform:
      scale(0.96);

    filter:
      brightness(0.5);

  }


  100% {

    opacity:1;

    transform:
      scale(1);

    filter:
      brightness(1);

  }

}



/* ========================================= */
/* STANDARD REWARD REVEAL */
/* ========================================= */

@keyframes victoryRewardReveal {

  0% {

    opacity:0;

    transform:
      translate(
        -50%,
        -42%
      )
      scale(0.82);

    filter:
      blur(3px);

  }


  65% {

    opacity:1;

    transform:
      translate(
        -50%,
        -52%
      )
      scale(1.06);

    filter:
      blur(0px);

  }


  100% {

    opacity:1;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1);

    filter:
      blur(0px);

  }

}



/* ========================================= */
/* GOLD REWARD FLASH */
/* ========================================= */

@keyframes victoryGoldFlash {

  0% {

    text-shadow:
      0 0 0px
      rgba(
        255,
        215,
        100,
        0
      );

  }


  45% {

    text-shadow:
      0 0 24px
      rgba(
        255,
        215,
        100,
        1
      );

  }


  100% {

    text-shadow:
      0 2px 6px
      #000000;

  }

}



/* ========================================= */
/* TEAL REWARD FLASH */
/* ========================================= */

@keyframes victoryTealFlash {

  0% {

    text-shadow:
      0 0 0px
      rgba(
        0,
        217,
        232,
        0
      );

  }


  50% {

    text-shadow:
      0 0 24px
      rgba(
        0,
        217,
        232,
        1
      );

  }


  100% {

    text-shadow:
      0 2px 6px
      #000000;

  }

}



/* ========================================= */
/* RARE DROP EXPLOSION */
/* ========================================= */

@keyframes victoryRareReveal {

  0% {

    opacity:0;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0.55);

    filter:
      brightness(0.4);

  }


  35% {

    opacity:1;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1.18);

    filter:
      brightness(2);

  }


  55% {

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0.94);

  }


  75% {

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1.06);

  }


  100% {

    opacity:1;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1);

    filter:
      brightness(1);

  }

}



/* ========================================= */
/* RARE DROP GLOW */
/* ========================================= */

@keyframes victoryRareGlow {

  0%,
  100% {

    text-shadow:
      0 0 7px
      rgba(
        255,
        215,
        100,
        0.35
      );

  }


  50% {

    text-shadow:
      0 0 26px
      rgba(
        255,
        215,
        100,
        1
      ),
      0 0 42px
      rgba(
        0,
        217,
        232,
        0.85
      );

  }

}



/* ========================================= */
/* SPARKLE ANIMATION */
/* ========================================= */

@keyframes victorySparkle {

  0% {

    opacity:0;

    transform:
      scale(0.2)
      rotate(0deg);

  }


  40% {

    opacity:1;

    transform:
      scale(1.4)
      rotate(90deg);

  }


  100% {

    opacity:0;

    transform:
      scale(0.4)
      rotate(180deg);

  }

}



/* ========================================= */
/* MVP REVEAL */
/* ========================================= */

@keyframes victoryMVPReveal {

  0% {

    opacity:0;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(0.7);

  }


  50% {

    opacity:1;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1.08);

  }


  100% {

    opacity:1;

    transform:
      translate(
        -50%,
        -50%
      )
      scale(1);

  }

}



/* ========================================= */
/* CONTINUE BUTTON REVEAL */
/* ========================================= */

@keyframes victoryContinueReveal {

  0% {

    opacity:0;

    transform:
      translateY(
        12px
      );

  }


  100% {

    opacity:1;

    transform:
      translateY(
        0
      );

  }

}



/* ========================================= */
/* ENEMY DEFEATED REVEAL */
/* ========================================= */

@keyframes victoryDefeatedReveal {

  0% {

    opacity:0;

    letter-spacing:5px;

  }


  100% {

    opacity:1;

    letter-spacing:1px;

  }

}



.victory-art {

  opacity:0;

  animation:
    victoryArtEntrance
    0.55s
    ease-out
    0.1s
    forwards;

}


.victory-defeated {

  opacity:0;

  animation:
    victoryDefeatedReveal
    0.45s
    ease-out
    0.6s
    forwards;

}


.victory-slot {

  opacity:0;

}


.victory-slot-ryo {

  animation:
    victoryRewardReveal
    0.5s
    ease-out
    0.9s
    forwards;

}


.victory-slot-exp {

  animation:
    victoryRewardReveal
    0.5s
    ease-out
    1.3s
    forwards;

}


.victory-slot-item {

  animation:
    victoryRewardReveal
    0.5s
    ease-out
    1.7s
    forwards;

}


.victory-slot-rare-normal {

  animation:
    victoryRewardReveal
    0.5s
    ease-out
    2.15s
    forwards;

}


.victory-slot-rare-win {

  animation:
    victoryRareReveal
    0.8s
    ease-out
    2.15s
    forwards;

}


.victory-slot-mvp {

  animation:
    victoryMVPReveal
    0.65s
    ease-out
    2.8s
    forwards;

}


.victory-ryo-number {

  animation:
    victoryGoldFlash
    0.8s
    ease-out
    1.0s;

}


.victory-exp-number {

  animation:
    victoryTealFlash
    0.8s
    ease-out
    1.4s;

}


.victory-rare-win-text {

  animation:
    victoryRareGlow
    1.15s
    ease-in-out
    2.15s
    2;

}


.victory-sparkle {

  position:absolute;

  color:#FFD76A;

  opacity:0;

  font-size:
    clamp(
      10px,
      1.4vw,
      22px
    );

  pointer-events:none;

}


.victory-sparkle-one {

  left:8%;
  top:8%;

  animation:
    victorySparkle
    0.8s
    ease-out
    2.3s;

}


.victory-sparkle-two {

  right:5%;
  top:25%;

  animation:
    victorySparkle
    0.9s
    ease-out
    2.5s;

}


.victory-sparkle-three {

  left:42%;
  bottom:4%;

  animation:
    victorySparkle
    0.85s
    ease-out
    2.7s;

}


.victory-continue {

  opacity:0;

  animation:
    victoryContinueReveal
    0.45s
    ease-out
    3.35s
    forwards;

}


</style>



<div style="
width:100%;
height:100%;
min-height:0;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
box-sizing:border-box;
padding:10px 18px 18px 18px;
overflow:hidden;
">



  <!-- ====================================== -->
  <!-- VICTORY ART WRAPPER -->
  <!-- ====================================== -->

  <div
    class="victory-art"

    style="
      position:relative;

      width:min(
        94vw,
        calc(76vh * 1.3333)
      );

      aspect-ratio:4 / 3;

      max-width:1180px;

      flex-shrink:1;
    "
  >



    <!-- BACKGROUND ART -->

    <img
      src="Assets/Backgrounds/Victory.png"

      alt="Victory"

      style="
        position:absolute;

        inset:0;

        width:100%;
        height:100%;

        object-fit:contain;

        display:block;
      "
    >



    <!-- ====================================== -->
    <!-- DEFEATED ENEMY -->
    <!-- ====================================== -->

    <div
      class="
        victory-defeated
      "

      style="
        position:absolute;

        top:64%;
        left:50%;

        transform:
          translate(
            -50%,
            -50%
          );

        width:50%;

        color:#CBD5E1;

        font-size:clamp(
          8px,
          0.85vw,
          13px
        );

        font-weight:bold;

        text-align:center;

        text-transform:uppercase;

        text-shadow:
          0 2px 6px
          #000000;

        pointer-events:none;
      "
    >

      ${enemy.name}
      DEFEATED

    </div>



    <!-- ====================================== -->
    <!-- REWARD SLOT 1 -->
    <!-- RYO -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot
        victory-slot-ryo
      "

      style="
        position:absolute;

        left:12%;
        top:82%;

        width:14%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;
      "
    >


      <div style="
        color:#D6A93A;

        font-size:clamp(
          8px,
          0.85vw,
          12px
        );

        font-weight:bold;

        letter-spacing:1px;
      ">

        RYŌ

      </div>


      <div
        id="
          victory-ryo-value
        "

        class="
          victory-ryo-number
        "

        style="
          color:#FFFFFF;

          font-size:clamp(
            14px,
            1.65vw,
            24px
          );

          font-weight:bold;

          margin-top:3px;

          text-shadow:
            0 2px 6px
            #000000;
        "
      >

        0

      </div>


    </div>



    <!-- ====================================== -->
    <!-- REWARD SLOT 2 -->
    <!-- EXP -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot
        victory-slot-exp
      "

      style="
        position:absolute;

        left:28.5%;
        top:82%;

        width:14%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;
      "
    >


      <div style="
        color:#00D9E8;

        font-size:clamp(
          8px,
          0.85vw,
          12px
        );

        font-weight:bold;

        letter-spacing:1px;
      ">

        EXP

      </div>


      <div
        id="
          victory-exp-value
        "

        class="
          victory-exp-number
        "

        style="
          color:#FFFFFF;

          font-size:clamp(
            14px,
            1.65vw,
            24px
          );

          font-weight:bold;

          margin-top:3px;

          text-shadow:
            0 2px 6px
            #000000;
        "
      >

        0

      </div>


    </div>



    <!-- ====================================== -->
    <!-- REWARD SLOT 3 -->
    <!-- COMMON ITEM -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot
        victory-slot-item
      "

      style="
        position:absolute;

        left:45%;
        top:82%;

        width:14%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;
      "
    >


      <div style="
        color:#94A3B8;

        font-size:clamp(
          8px,
          0.85vw,
          12px
        );

        font-weight:bold;

        letter-spacing:1px;
      ">

        ITEM

      </div>


      <div style="
        color:${
          rewards.items &&
          rewards.items.length > 0

            ? "#FFFFFF"

            : "#64748B"
        };

        font-size:clamp(
          8px,
          0.9vw,
          13px
        );

        font-weight:bold;

        margin-top:4px;

        line-height:1.25;

        text-shadow:
          0 2px 6px
          #000000;
      ">

        ${itemText}

      </div>


    </div>



    <!-- ====================================== -->
    <!-- REWARD SLOT 4 -->
    <!-- RARE DROP -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot

        ${
          hasRareDrop

            ? "victory-slot-rare-win"

            : "victory-slot-rare-normal"
        }
      "

      style="
        position:absolute;

        left:61.5%;
        top:82%;

        width:14%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;
      "
    >


      ${
        hasRareDrop
          ? `

            <span
              class="
                victory-sparkle
                victory-sparkle-one
              "
            >
              ✦
            </span>


            <span
              class="
                victory-sparkle
                victory-sparkle-two
              "
            >
              ✦
            </span>


            <span
              class="
                victory-sparkle
                victory-sparkle-three
              "
            >
              ✦
            </span>

          `
          : ""
      }


      <div style="
        color:#D6A93A;

        font-size:clamp(
          8px,
          0.85vw,
          12px
        );

        font-weight:bold;

        letter-spacing:1px;
      ">

        ${
          hasRareDrop

            ? "★ RARE DROP ★"

            : "RARE DROP"
        }

      </div>


      <div
        class="
          ${
            hasRareDrop

              ? "victory-rare-win-text"

              : ""
          }
        "

        style="
          color:${
            hasRareDrop

              ? "#FFD76A"

              : "#64748B"
          };

          font-size:clamp(
            8px,
            0.9vw,
            13px
          );

          font-weight:bold;

          margin-top:4px;

          line-height:1.25;

          text-shadow:
            0 2px 6px
            #000000;
        "
      >

        ${rareDropText}

      </div>


    </div>



    <!-- ====================================== -->
    <!-- REWARD SLOT 5 -->
    <!-- BATTLE MVP -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot
        victory-slot-mvp
      "

      style="
        position:absolute;

        left:78%;
        top:81.5%;

        width:15%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;
      "
    >


      <div style="
        color:#D6A93A;

        font-size:clamp(
          7px,
          0.78vw,
          11px
        );

        font-weight:bold;

        letter-spacing:1px;
      ">

        ★ BATTLE MVP ★

      </div>


      <div style="
        color:#FFFFFF;

        font-size:clamp(
          9px,
          0.95vw,
          14px
        );

        font-weight:bold;

        margin-top:3px;

        line-height:1.15;

        text-shadow:
          0 2px 6px
          #000000;
      ">

        ${mvpName}

      </div>


      <div style="
        color:#00D9E8;

        font-size:clamp(
          7px,
          0.72vw,
          10px
        );

        font-weight:bold;

        margin-top:3px;
      ">

        ${mvpPercentage}
        DAMAGE

      </div>


      ${
        battleMVP
          ? `

            <div style="
              color:#94A3B8;

              font-size:clamp(
                6px,
                0.58vw,
                8px
              );

              margin-top:2px;
            ">

              ${mvpDamage}
              BP

            </div>

          `
          : ""
      }


      <div style="
        color:#CBD5E1;

        font-size:clamp(
          6px,
          0.55vw,
          8px
        );

        margin-top:4px;
      ">

        FINAL:
        ${finalStrike}

      </div>


    </div>



  </div>



  <!-- ====================================== -->
  <!-- CONTINUE BUTTON -->
  <!-- ====================================== -->

  <button

    class="
      victory-continue
    "

    onclick="
      continueAfterVictory()
    "

    style="
      margin-top:10px;

      min-width:200px;

      padding:
        11px
        26px;

      background:
        linear-gradient(
          180deg,
          #E4BD52,
          #B98B25
        );

      color:#05070B;

      border:
        1px solid
        #F3D675;

      border-radius:5px;

      font-size:11px;

      font-weight:bold;

      letter-spacing:1.5px;

      cursor:pointer;

      box-shadow:
        0 0 18px
        rgba(
          214,
          169,
          58,
          0.22
        );
    "
  >

    CONTINUE

  </button>



</div>


`;


  // =========================================
  // START NUMBER ANIMATIONS
  // =========================================

  requestAnimationFrame(
    () => {

      runVictoryRevealAnimations(
  container,
  rewards
);

    }
  );

}


// =========================================================
// VICTORY CONTINUE
// =========================================================

function continueAfterVictory() {


  currentBattle.active =
    false;


  openOverlay(
    "battle"
  );

}



// =========================================================
// 18. SELECT ACTIVE FIGHTER
// =========================================================

function selectActiveFighter(playerId) {

  const fighter =
    playerTeam.find(
      member => member.id === playerId
    );


  if (!fighter) {

    console.log("Fighter not found");

    return;

  }


  currentBattle.activePlayer = fighter;


  console.log(
    "ACTIVE FIGHTER:",
    currentBattle.activePlayer
  );


  openOverlay("combat");

}

// =========================================================
// 19. STAT-BASED COMBAT ATTACK
// =========================================================

function performStatAttack(
  attackType
) {


  const fighter =
    currentBattle.activePlayer;


  if (!fighter) {

    console.log(
      "No active fighter selected"
    );

    return;

  }


  if (
    !currentBattle.enemy
  ) {

    console.log(
      "No enemy in battle"
    );

    return;

  }


  if (
    currentBattle.battleOver
  ) {

    console.log(
      "Battle is already over"
    );

    return;

  }


  let statName;


  switch (
    attackType
  ) {


    case "ninjutsu":

      statName =
        "nin";

      break;


    case "taijutsu":

      statName =
        "tai";

      break;


    default:

      console.log(
        "Unknown attack type:",
        attackType
      );

      return;

  }


  const attackStat =
    fighter.stats[
      statName
    ];


  // =========================================
  // DAMAGE FORMULA
  // =========================================

  const baseDamage =
    attackStat *
    0.20;


  const variation =
    0.90 +
    Math.random() *
    0.20;


  const calculatedDamage =
    Math.max(
      1,
      Math.round(
        baseDamage *
        variation
      )
    );


  // =========================================
  // ACTUAL DAMAGE
  // Prevent overkill inflating contribution
  // =========================================

  const enemyPowerBeforeAttack =
    currentBattle.enemyPower;


  const actualDamage =
    Math.min(
      calculatedDamage,
      enemyPowerBeforeAttack
    );


  currentBattle.lastDamage =
    actualDamage;


  currentBattle.enemyPower -=
    actualDamage;


  if (
    currentBattle.enemyPower < 0
  ) {

    currentBattle.enemyPower =
      0;

  }


  // =========================================
  // RECORD CONTRIBUTION
  // =========================================

  recordBattleContribution(
    fighter,
    actualDamage,
    attackType
  );


  // =========================================
  // BATTLE LOG
  // =========================================

  const attackLabel =

    attackType ===
      "ninjutsu"

      ? "Ninjutsu"

      : "Taijutsu";


  currentBattle.battleLog.push(
    `${fighter.name} used ${attackLabel}!`
  );


  currentBattle.battleLog.push(
    `${currentBattle.enemy.name} lost ${actualDamage} Battle Power.`
  );


  // =========================================
  // VICTORY CHECK
  // =========================================

  if (
    currentBattle.enemyPower <= 0
  ) {


    currentBattle.battleOver =
      true;


    currentBattle.active =
      false;


    // =======================================
    // GENERATE REWARDS
    // =======================================

    const rewards =
      generateBattleRewards(
        currentBattle.enemy,
        fighter
      );


    // =======================================
    // CALCULATE MVP
    // =======================================

    const mvp =
      calculateBattleMVP();


    currentBattle.rewards.mvp =
      mvp;


    currentBattle.battleLog.push(
      `${currentBattle.enemy.name} has been defeated!`
    );


    currentBattle.battleLog.push(
      "VICTORY!"
    );


    currentBattle.battleLog.push(
      `Reward: ${rewards.ryo} Ryō`
    );


    currentBattle.battleLog.push(
      `EXP gained: ${rewards.exp}`
    );


    if (mvp) {

      currentBattle.battleLog.push(
        `★ MVP: ${mvp.name} — ${mvp.percentage}% Total Damage`
      );

    }


    // =======================================
    // COMMON DROPS
    // =======================================

    if (
      rewards.items.length > 0
    ) {

      rewards.items.forEach(
        item => {

          currentBattle.battleLog.push(
            `Item found: ${item.name}`
          );

        }
      );

    }


    // =======================================
    // RARE DROPS
    // =======================================

    if (
      rewards.rareDrops.length > 0
    ) {

      rewards.rareDrops.forEach(
        item => {

          currentBattle.battleLog.push(
            `★ RARE DROP: ${item.name}!`
          );

        }
      );

    }


    // =======================================
    // OPEN DEDICATED VICTORY SCREEN
    // =======================================

    openOverlay(
      "victory"
    );


    return;

  }


  // =========================================
  // BATTLE CONTINUES
  // =========================================

  currentBattle.battleLog.push(
    `${currentBattle.enemy.name} has ${currentBattle.enemyPower} BP remaining.`
  );


  // =========================================
  // DEBUG LOGGING
  // =========================================

  console.log(
    `${fighter.name} used ${attackLabel}`
  );


  console.log(
    `${statName.toUpperCase()}:`,
    attackStat
  );


  console.log(
    "Calculated Damage:",
    calculatedDamage
  );


  console.log(
    "Actual Damage:",
    actualDamage
  );


  console.log(
    "Battle Contributions:",
    currentBattle.contributions
  );


  console.log(
    "Enemy Battle Power remaining:",
    currentBattle.enemyPower
  );


  openOverlay(
    "combat"
  );

}



// =========================================================
// ATTACK BUTTON WRAPPERS
// =========================================================

function performNinjutsuAttack() {

  performStatAttack(
    "ninjutsu"
  );

}



function performTaijutsuAttack() {

  performStatAttack(
    "taijutsu"
  );

}


// =========================================================
// 19. ACTIVITY CARD
// =========================================================

function createActivityCard(
  title,
  description,
  reward,
  requirement,
  action
) {

  console.log("CARD ACTION:", action);

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
onclick="${action}; console.log('AFTER ACTION')"
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
// 20. DAILY REWARD
// =========================================================

function claimDailyReward() {

  alert(
    "Daily reward claimed successfully!"
  );
}

// =========================================================
// RESTORE DEVELOPMENT TEST STATE
// =========================================================

function restoreTestState() {


  const saved =
    sessionStorage.getItem(
      "shinobiTestState"
    );


  if (!saved) {

    return;

  }


  const state =
    JSON.parse(
      saved
    );


  // =========================================
  // RESTORE REGION
  // =========================================

  if (
    state.regionKey &&
    worldRegions[
      state.regionKey
    ]
  ) {


    selectedRegionKey =
      state.regionKey;


    if (
      state.locationId
    ) {

      selectedLocationNode =
        worldRegions[
          state.regionKey
        ]
          .locations
          .find(
            location =>
              location.id ===
              state.locationId
          ) ||
        null;

    }

  }


  // =========================================
  // RESTORE ENEMY
  // =========================================

  if (
    state.enemyId &&
    enemyDatabase[
      state.enemyId
    ]
  ) {

    selectedEnemy =
      enemyDatabase[
        state.enemyId
      ];


    currentBattle.enemy =
      selectedEnemy;

  }


  // =========================================
  // RESTORE BATTLE POWER
  // =========================================

  if (
    typeof
      state.enemyPower ===
    "number"
  ) {

    currentBattle.enemyPower =
      state.enemyPower;

  }


  if (
    typeof
      state.enemyMaxPower ===
    "number"
  ) {

    currentBattle.enemyMaxPower =
      state.enemyMaxPower;

  }


  // =========================================
  // RESTORE ACTIVE PLAYER
  // =========================================

  if (
    state.activePlayerId
  ) {

    currentBattle.activePlayer =
      playerTeam.find(
        member =>
          member.id ===
          state.activePlayerId
      ) ||
      playerTeam[0];

  }


  // =========================================
  // RESTORE BATTLE DATA
  // =========================================

  currentBattle.lastDamage =

    typeof state.lastDamage ===
      "number"

      ? state.lastDamage

      : 0;


  currentBattle.battleOver =
    state.battleOver ===
    true;


  currentBattle.battleLog =

    Array.isArray(
      state.battleLog
    )

      ? state.battleLog

      : [];


  currentBattle.rewards =

    state.rewards &&
    typeof state.rewards ===
      "object"

      ? state.rewards

      : currentBattle.rewards;


  currentBattle.contributions =

    state.contributions &&
    typeof state.contributions ===
      "object"

      ? state.contributions

      : {};


  // =========================================
  // RESTORE SCREEN
  // =========================================

  if (
    state.overlayType ===
      "victory" &&
    selectedEnemy
  ) {

    currentBattle.active =
      false;


    currentBattle.battleOver =
      true;


    openOverlay(
      "victory"
    );


    return;

  }


  if (
    state.overlayType ===
      "combat" &&
    selectedEnemy
  ) {

    currentBattle.active =
      true;


    openOverlay(
      "combat"
    );


    return;

  }


  if (
    state.overlayType ===
      "battle" &&
    selectedRegionKey
  ) {

    openOverlay(
      "battle"
    );


    return;

  }


  if (
    state.overlayType ===
      "region" &&
    selectedRegionKey
  ) {

    openRegionHub(
      selectedRegionKey
    );

  }

}



window.addEventListener(
  "load",
  restoreTestState
);
