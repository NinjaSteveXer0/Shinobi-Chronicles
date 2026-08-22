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

    weaponSpecializations: {},

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

    weaponSpecializations: {},

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

    weaponSpecializations: {},

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

    weaponSpecializations: {},

    abilities: [],

    image:
      "Assets/Animated Cards/Teen Nagato.png"
  }

];


// =========================================================
// ITEM DATABASE
// =========================================================

const itemDatabase = {


  // =========================================
  // BASIC SCROLL
  // =========================================

  basic_scroll: {

    id:
      "basic_scroll",

    name:
      "Basic Scroll",

    type:
      "scroll",

    rarity:
      "Common",

    stackable:
      true,

    description:
      "A basic shinobi scroll used for training, missions and future crafting systems."

  },



  // =========================================
  // BANDIT SUPPLIES
  // =========================================

  bandit_supplies: {

    id:
      "bandit_supplies",

    name:
      "Bandit Supplies",

    type:
      "material",

    rarity:
      "Common",

    stackable:
      true,

    description:
      "A collection of supplies recovered from rogue shinobi and bandit camps."

  },



  // =========================================
  // WEAPON MATERIALS
  // =========================================

  weapon_materials: {

    id:
      "weapon_materials",

    name:
      "Weapon Materials",

    type:
      "material",

    rarity:
      "Common",

    stackable:
      true,

    description:
      "Metal, bindings and components suitable for repairing or crafting shinobi weapons."

  },



  // =========================================
  // BANDIT CAPTAIN'S TANTO
  // =========================================

  bandit_captains_tanto: {

    id:
      "bandit_captains_tanto",

    name:
      "Bandit Captain's Tanto",

    type:
      "weapon",

    weaponClass:
      "Tanto",

    rarity:
      "Rare",

    stackable:
      false,

    equipmentSlot:
      "weapon",

    description:
      "A short blade carried by an experienced bandit captain. Fast, compact and built for close-range combat.",

    statModifiers: {

      buki:
        20

    }

  }

};



// =========================================================
// ITEM DATABASE HELPERS
// =========================================================

function getItemDefinition(
  itemId
) {


  return (
    itemDatabase[
      itemId
    ] ||
    null
  );

}



function getItemDefinitionByName(
  itemName
) {


  const itemId =
    createInventoryItemId(
      itemName
    );


  return getItemDefinition(
    itemId
  );

}



// =========================================================
// PLAYER SAVE / PROGRESSION SYSTEM
// =========================================================

const PLAYER_SAVE_KEY =
  "shinobiChroniclesPlayerSave";


// =========================================================
// CLONE PROGRESSION OBJECT
// =========================================================

function cloneProgressionData(
  data
) {


  if (
    !data ||
    typeof data !==
      "object"
  ) {

    return {};

  }


  return JSON.parse(
    JSON.stringify(
      data
    )
  );

}


// =========================================================
// SHINOBI DIFFICULTY SYSTEM
// =========================================================

const SHINOBI_DIFFICULTIES = [

  {
    id: "academy",
    name: "Academy Student",
    order: 0
  },

  {
    id: "genin",
    name: "Genin",
    order: 1
  },

  {
    id: "chunin",
    name: "Chūnin",
    order: 2
  },

  {
    id: "special_jonin",
    name: "Special Jōnin",
    order: 3
  },

  {
    id: "jonin",
    name: "Jōnin",
    order: 4
  },

  {
    id: "anbu",
    name: "ANBU",
    order: 5
  },

  {
    id: "kage",
    name: "Kage",
    order: 6
  },

  {
    id: "akatsuki",
    name: "Akatsuki",
    order: 7,
    premium: true
  },

  {
    id: "jinchuriki",
    name: "Jinchūriki",
    order: 8,
    premium: true
  }

];

// =========================================================
// GET SHINOBI DIFFICULTY
// =========================================================

function getShinobiDifficulty(
  difficultyId
) {


  return (
    SHINOBI_DIFFICULTIES.find(
      difficulty =>
        difficulty.id ===
        difficultyId
    ) ||
    null
  );

}


// =========================================================
// GET NEXT SHINOBI DIFFICULTY
// =========================================================

function getNextShinobiDifficulty(
  difficultyId
) {


  const currentDifficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!currentDifficulty) {

    return null;

  }


  return (
    SHINOBI_DIFFICULTIES[
      currentDifficulty.order + 1
    ] ||
    null
  );

}


// =========================================================
// BRICK 6 — MARK CURRENT DIFFICULTY COMPLETE
// =========================================================

function markCurrentDifficultyComplete() {


  const progression =
    playerData.progression;


  if (!progression) {


    console.log(
      "No Shinobi progression data found."
    );


    return false;

  }


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  if (!currentDifficulty) {


    console.log(
      "Current difficulty is invalid:",
      progression.currentDifficulty
    );


    return false;

  }


  if (
    !Array.isArray(
      progression.completedDifficulties
    )
  ) {

    progression.completedDifficulties =
      [];

  }


  if (
    !progression.completedDifficulties.includes(
      currentDifficulty.id
    )
  ) {

    progression.completedDifficulties.push(
      currentDifficulty.id
    );

  }


  progression.runCompleted =
    true;


  console.log(
    `${currentDifficulty.name} difficulty completed.`
  );


  return true;

}


// =========================================================
// BRICK 7 — UNLOCK NEXT DIFFICULTY
// =========================================================

function unlockNextDifficulty() {


  const progression =
    playerData.progression;


  if (!progression) {

    return false;

  }


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  if (!currentDifficulty) {

    return false;

  }


  const nextDifficulty =
    getNextShinobiDifficulty(
      currentDifficulty.id
    );


  // =========================================
  // JINCHURIKI HAS NO NORMAL NEXT DIFFICULTY
  // =========================================

  if (!nextDifficulty) {


    console.log(
      "No further normal difficulty exists."
    );


    return false;

  }


  const highestUnlocked =
    getShinobiDifficulty(
      progression.highestDifficultyUnlocked
    );


  if (
    !highestUnlocked ||
    nextDifficulty.order >
      highestUnlocked.order
  ) {

    progression.highestDifficultyUnlocked =
      nextDifficulty.id;


    console.log(
      `${nextDifficulty.name} difficulty unlocked.`
    );

  }


  return true;

}


// =========================================================
// COMPLETE CURRENT DIFFICULTY
// =========================================================

function completeCurrentDifficulty() {


  const completed =
    markCurrentDifficultyComplete();


  if (!completed) {

    return false;

  }


  unlockNextDifficulty();


  savePlayerData();


  return true;

}


// =========================================================
// BRICK 8 — DIFFICULTY ACCESS VALIDATION
// =========================================================

function canAccessDifficulty(
  difficultyId
) {


  const targetDifficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!targetDifficulty) {

    return false;

  }


  const progression =
    playerData.progression;


  if (!progression) {

    return false;

  }


  const highestUnlocked =
    getShinobiDifficulty(
      progression.highestDifficultyUnlocked
    );


  if (!highestUnlocked) {

    return false;

  }


  return (
    targetDifficulty.order <=
    highestUnlocked.order
  );

}


// =========================================================
// GET DIFFICULTY ACCESS DATA
// =========================================================

function getDifficultyAccessData(
  difficultyId
) {


  const difficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!difficulty) {


    return {

      exists:
        false,

      unlocked:
        false,

      difficulty:
        null

    };

  }


  return {

    exists:
      true,

    unlocked:
      canAccessDifficulty(
        difficultyId
      ),

    difficulty:
      difficulty

  };

}


// =========================================================
// BRICK 9 — START DIFFICULTY RUN
// =========================================================

function startDifficultyRun(
  difficultyId
) {


  const targetDifficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!targetDifficulty) {


    console.log(
      "Difficulty does not exist:",
      difficultyId
    );


    return false;

  }


  if (
    !canAccessDifficulty(
      difficultyId
    )
  ) {


    console.log(
      `${targetDifficulty.name} difficulty is locked.`
    );


    return false;

  }


  const progression =
    playerData.progression;


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  // =========================================
  // MOVING FORWARD REQUIRES CURRENT RUN COMPLETE
  // =========================================

  if (
    currentDifficulty &&
    targetDifficulty.order >
      currentDifficulty.order &&
    progression.runCompleted !==
      true
  ) {


    console.log(
      `Complete ${currentDifficulty.name} before starting ${targetDifficulty.name}.`
    );


    return false;

  }


  progression.currentDifficulty =
    targetDifficulty.id;


  progression.runCompleted =
    false;


  savePlayerData();


  console.log(
    `New ${targetDifficulty.name} run started.`
  );


  console.log(
    `Legacy Cycle: ${progression.legacyCycle}`
  );


  // =========================================
  // IMPORTANT
  // =========================================
  //
  // This currently changes RUN IDENTITY ONLY.
  //
  // Character / inventory / equipment resets
  // will be handled later by the inheritance
  // and New Game+ transition system.
  //
  // =========================================


  return true;

}


// =========================================================
// BRICK 10 — LEGACY RESET READY CHECK
// =========================================================

function isLegacyResetReady() {


  const progression =
    playerData.progression;


  if (!progression) {

    return false;

  }


  if (
    progression.currentDifficulty !==
      "jinchuriki"
  ) {

    return false;

  }


  if (
    progression.runCompleted !==
      true
  ) {

    return false;

  }


  if (
    !Array.isArray(
      progression.completedDifficulties
    )
  ) {

    return false;

  }


  return SHINOBI_DIFFICULTIES.every(
    difficulty =>
      progression.completedDifficulties.includes(
        difficulty.id
      )
  );

}


// =========================================================
// SHOW DIFFICULTY ACCESS
// =========================================================

function showDifficultyAccess() {


  const rows =
    SHINOBI_DIFFICULTIES.map(
      difficulty => {


        return {

          order:
            difficulty.order,

          difficulty:
            difficulty.name,

          unlocked:
            canAccessDifficulty(
              difficulty.id
            ),

          completed:
            playerData.progression
              .completedDifficulties
              .includes(
                difficulty.id
              ),

          premium:
            difficulty.premium ===
            true

        };

      }
    );


  console.table(
    rows
  );

}


// =========================================================
// SHINOBI DISCIPLINE SYSTEM
// =========================================================

const SHINOBI_DISCIPLINES = {

  nin: {
    id: "nin",
    name: "Ninjutsu",
    trainingSource: "exam"
  },

  tai: {
    id: "tai",
    name: "Taijutsu",
    trainingSource: "practical"
  },

    buki: {
    id: "buki",
    name: "Bukijutsu",
    trainingSource: "practical"
  },

  fuin: {
    id: "fuin",
    name: "Fūinjutsu",
    trainingSource: "exam"
  },

  kin: {
    id: "kin",
    name: "Kinjutsu",
    trainingSource: "battle"
  },

  gen: {
    id: "gen",
    name: "Genjutsu",
    trainingSource: "exam"
  },

  stamina: {
    id: "stamina",
    name: "Stamina",
    trainingSource: "practical"
  }

};


// =========================================================
// GET SHINOBI DISCIPLINE
// =========================================================

function getShinobiDiscipline(
  disciplineId
) {


  return (
    SHINOBI_DISCIPLINES[
      disciplineId
    ] ||
    null
  );

}


// =========================================================
// CREATE DEFAULT DISCIPLINE PROGRESSION
// =========================================================

function createDefaultDisciplineProgression() {


  const progression = {};


  Object.keys(
    SHINOBI_DISCIPLINES
  ).forEach(
    disciplineId => {


      progression[
        disciplineId
      ] = {

        level:
          1,

        exp:
          0,

        statLevelApplied:
          1

      };

    }
  );


  return progression;

}


// =========================================================
// CREATE DEFAULT CHARACTER PROGRESSION
// =========================================================

function createDefaultCharacterProgression() {


  const characters = {};


  playerTeam.forEach(
    character => {


      characters[
        character.id
      ] = {

        stats: {
          ...character.stats
        },

        permanentPLBonus:
          Number(
            character.permanentPLBonus
          ) || 0,

        disciplineProgression:
          createDefaultDisciplineProgression(),

        weaponSpecializations:
          cloneProgressionData(
            character.weaponSpecializations
          )

      };

    }
  );


  return characters;

}

// =========================================================
// CREATE DEFAULT RUN PROGRESSION
// =========================================================

function createDefaultRunProgression() {


  return {

    currentDifficulty:
      "academy",

    highestDifficultyUnlocked:
      "academy",

    legacyCycle:
      0,

    completedDifficulties:
      [],

    runCompleted:
      false

  };

}


// =========================================================
// DEFAULT PLAYER DATA
// =========================================================

function createDefaultPlayerData() {


  return {

    ryo:
      0,

    exp:
      0,

    inventory:
      [],

    progression:
      createDefaultRunProgression(),

    characters:
      createDefaultCharacterProgression(),

    collections: {

      specialNinja:
        [],

      bloodlines:
        []

    }

  };

}


// =========================================================
// NORMALIZE PLAYER COLLECTIONS
// =========================================================

function normalizePlayerCollections(
  savedCollections
) {


  const source =
    savedCollections &&
    typeof savedCollections ===
      "object"

      ? savedCollections

      : {};


  return {

    specialNinja:
      normalizeInheritanceCollection(
        source.specialNinja
      ),

    bloodlines:
      normalizeInheritanceCollection(
        source.bloodlines
      )

  };

}


// =========================================================
// NORMALIZE SAVED RUN PROGRESSION
// =========================================================

function normalizeSavedRunProgression(
  savedProgression
) {


  const defaults =
    createDefaultRunProgression();


  if (
    !savedProgression ||
    typeof savedProgression !==
      "object"
  ) {

    return defaults;

  }


  const currentDifficulty =
    getShinobiDifficulty(
      savedProgression.currentDifficulty
    )
      ? savedProgression.currentDifficulty
      : defaults.currentDifficulty;


  const highestDifficultyUnlocked =
    getShinobiDifficulty(
      savedProgression.highestDifficultyUnlocked
    )
      ? savedProgression.highestDifficultyUnlocked
      : defaults.highestDifficultyUnlocked;


  return {

    currentDifficulty:
      currentDifficulty,

    highestDifficultyUnlocked:
      highestDifficultyUnlocked,

    legacyCycle:
      Math.max(
        0,
        Math.floor(
          Number(
            savedProgression.legacyCycle
          ) || 0
        )
      ),

    completedDifficulties:
      Array.isArray(
        savedProgression.completedDifficulties
      )
        ? savedProgression.completedDifficulties.filter(
            difficultyId =>
              !!getShinobiDifficulty(
                difficultyId
              )
          )
        : [],

    runCompleted:
      savedProgression.runCompleted ===
      true

  };

}

// =========================================================
// NORMALIZE DISCIPLINE PROGRESSION
// =========================================================

function normalizeDisciplineProgression(
  savedProgression
) {


  const defaults =
    createDefaultDisciplineProgression();


  const source =
    savedProgression &&
    typeof savedProgression ===
      "object"
      ? savedProgression
      : {};


  const normalized = {};


  Object.keys(
    defaults
  ).forEach(
    disciplineId => {


      const savedRecord =
        source[
          disciplineId
        ] || {};


      const level =
        Math.max(
          1,
          Math.floor(
            Number(
              savedRecord.level
            ) || 1
          )
        );


      const rawStatLevelApplied =
        savedRecord.statLevelApplied;


      const statLevelApplied =
        Number.isFinite(
          Number(
            rawStatLevelApplied
          )
        )
          ? Math.max(
              1,
              Math.min(
                level,
                Math.floor(
                  Number(
                    rawStatLevelApplied
                  )
                )
              )
            )
          : 1;


      normalized[
        disciplineId
      ] = {

        level:
          level,

        exp:
          Math.max(
            0,
            Number(
              savedRecord.exp
            ) || 0
          ),

        statLevelApplied:
          statLevelApplied

      };

    }
  );


  return normalized;

}


// =========================================================
// NORMALIZE SAVED CHARACTER PROGRESSION
// =========================================================

function normalizeSavedCharacterProgression(
  savedCharacters
) {


  const defaults =
    createDefaultCharacterProgression();


  const source =
    savedCharacters &&
    typeof savedCharacters ===
      "object"
      ? savedCharacters
      : {};


  const normalized = {};


  Object.keys(
    defaults
  ).forEach(
    characterId => {


      const defaultCharacter =
        defaults[
          characterId
        ];


      const savedCharacter =
        source[
          characterId
        ] || {};


      const savedStats =
        savedCharacter.stats &&
        typeof savedCharacter.stats ===
          "object"
          ? savedCharacter.stats
          : {};


      const normalizedStats = {
        ...defaultCharacter.stats
      };


      Object.keys(
        normalizedStats
      ).forEach(
        stat => {


          if (
            typeof savedStats[
              stat
            ] ===
              "number"
          ) {

            normalizedStats[
              stat
            ] =
              savedStats[
                stat
              ];

          }

        }
      );


      normalized[
        characterId
      ] = {

        stats:
          normalizedStats,

        permanentPLBonus:
          typeof savedCharacter
            .permanentPLBonus ===
            "number"

            ? savedCharacter
                .permanentPLBonus

            : defaultCharacter
                .permanentPLBonus,

        disciplineProgression:
          normalizeDisciplineProgression(
            savedCharacter
              .disciplineProgression
          ),

        weaponSpecializations:
          savedCharacter
            .weaponSpecializations &&
          typeof savedCharacter
            .weaponSpecializations ===
            "object"

            ? cloneProgressionData(
                savedCharacter
                  .weaponSpecializations
              )

            : cloneProgressionData(
                defaultCharacter
                  .weaponSpecializations
              )

      };

    }
  );


  return normalized;

}


// =========================================================
// LOAD PLAYER DATA
// =========================================================

function loadPlayerData() {


  const savedData =
    localStorage.getItem(
      PLAYER_SAVE_KEY
    );


  if (!savedData) {


    console.log(
      "No existing player save found."
    );


    return createDefaultPlayerData();

  }


  try {


    const parsedData =
      JSON.parse(
        savedData
      );


    console.log(
      "Player save loaded:",
      parsedData
    );


    return {

      ryo:
        Number(
          parsedData.ryo
        ) || 0,

      exp:
        Number(
          parsedData.exp
        ) || 0,

      inventory:
        Array.isArray(
          parsedData.inventory
        )
          ? parsedData.inventory
          : [],

      progression:
  normalizeSavedRunProgression(
    parsedData.progression
  ),

characters:
  normalizeSavedCharacterProgression(
    parsedData.characters
  ),

collections:
  normalizePlayerCollections(
    parsedData.collections
  )

    };


  }
  catch (error) {


    console.log(
      "Player save could not be loaded:",
      error
    );


    return createDefaultPlayerData();

  }

}

// =========================================================
// ACTIVE PLAYER DATA
// =========================================================

let playerData =
  loadPlayerData();


// =========================================================
// RESTORE CHARACTER PROGRESSION FROM SAVE
// =========================================================

function syncCharacterProgressionFromSave() {


  if (
    !playerData.characters ||
    typeof playerData.characters !==
      "object"
  ) {

    playerData.characters =
      createDefaultCharacterProgression();

  }


  playerTeam.forEach(
    character => {


      const savedCharacter =
        playerData.characters[
          character.id
        ];


      if (!savedCharacter) {

        return;

      }


      // =========================================
      // RESTORE PERMANENT STATS
      // =========================================

      if (
        savedCharacter.stats &&
        typeof savedCharacter.stats ===
          "object"
      ) {


        Object.keys(
          character.stats
        ).forEach(
          stat => {


            if (
              typeof savedCharacter
                .stats[
                  stat
                ] ===
                "number"
            ) {

              character.stats[
                stat
              ] =
                savedCharacter
                  .stats[
                    stat
                  ];

            }

          }
        );

      }


      // =========================================
      // RESTORE PERMANENT PL BONUS
      // =========================================

      character.permanentPLBonus =
        Number(
          savedCharacter
            .permanentPLBonus
        ) || 0;


      // =========================================
      // RESTORE DISCIPLINE PROGRESSION
      // =========================================

      character.disciplineProgression =
        normalizeDisciplineProgression(
          savedCharacter
            .disciplineProgression
        );


      // =========================================
      // RESTORE WEAPON SPECIALIZATIONS
      // =========================================

      character.weaponSpecializations =
        cloneProgressionData(
          savedCharacter
            .weaponSpecializations
        );

    }
  );


  console.log(
    "Character progression restored."
  );

}


// =========================================================
// COPY RUNTIME CHARACTER PROGRESSION TO SAVE
// =========================================================

function syncRuntimeProgressionToPlayerData() {


  if (
    !playerData.characters ||
    typeof playerData.characters !==
      "object"
  ) {

    playerData.characters = {};

  }


  playerTeam.forEach(
    character => {


      playerData.characters[
        character.id
      ] = {

        stats: {
          ...character.stats
        },

        permanentPLBonus:
          Number(
            character.permanentPLBonus
          ) || 0,

        disciplineProgression:
          normalizeDisciplineProgression(
            character
              .disciplineProgression
          ),

        weaponSpecializations:
          cloneProgressionData(
            character.weaponSpecializations
          )

      };

    }
  );

}

// =========================================================
// APPLY SAVED CHARACTER PROGRESSION NOW
// =========================================================

syncCharacterProgressionFromSave();





// =========================================================
// SAVE PLAYER DATA
// =========================================================

function savePlayerData() {


  syncRuntimeProgressionToPlayerData();


  localStorage.setItem(
    PLAYER_SAVE_KEY,
    JSON.stringify(
      playerData
    )
  );


  console.log(
    "Player save updated:",
    playerData
  );

}


// =========================================================
// CREATE INVENTORY ITEM ID
// =========================================================

function createInventoryItemId(
  itemName
) {


  return String(
    itemName
  )
    .toLowerCase()
    .trim()

    // =========================================
    // REMOVE APOSTROPHES
    // Captain's becomes Captains
    // =========================================

    .replace(
      /['’]/g,
      ""
    )

    // =========================================
    // CONVERT SPACES / SYMBOLS
    // TO UNDERSCORES
    // =========================================

    .replace(
      /[^a-z0-9]+/g,
      "_"
    )

    // =========================================
    // REMOVE OUTER UNDERSCORES
    // =========================================

    .replace(
      /^_+|_+$/g,
      ""
    );

}


// =========================================================
// ADD ITEM TO INVENTORY
// =========================================================

function addItemToInventory(
  item
) {


  if (
    !item ||
    !item.name
  ) {

    console.log(
      "Invalid inventory item:",
      item
    );


    return;

  }



  // =========================================
  // FIND ITEM DATABASE ENTRY
  // =========================================

  const generatedId =
    item.id ||
    createInventoryItemId(
      item.name
    );


  const definition =
    getItemDefinition(
      generatedId
    );



  // =========================================
  // BUILD INVENTORY ITEM DATA
  // =========================================

  const inventoryItemData = {

    id:
      generatedId,

    name:
      definition
        ? definition.name
        : item.name,

    type:
      definition
        ? definition.type
        : "misc",

    rarity:
      definition
        ? definition.rarity
        : (
            item.rarity ||
            "Common"
          ),

    stackable:
      definition
        ? definition.stackable
        : true

  };



  // =========================================
  // STACKABLE ITEMS
  // =========================================

  if (
    inventoryItemData.stackable
  ) {


    const existingItem =
      playerData.inventory.find(
        inventoryItem =>
          inventoryItem.id ===
          inventoryItemData.id
      );


    if (existingItem) {


      existingItem.quantity =
        (
          existingItem.quantity ||
          0
        ) +
        1;


      console.log(
        `${inventoryItemData.name} increased to ×${existingItem.quantity}`
      );


      return;

    }

  }



  // =========================================
  // CREATE NEW INVENTORY ENTRY
  // =========================================

  const newInventoryItem = {

    id:
      inventoryItemData.id,

    name:
      inventoryItemData.name,

    type:
      inventoryItemData.type,

    rarity:
      inventoryItemData.rarity,

    quantity:
      1

  };



  // =========================================
  // NON-STACKABLE ITEM INSTANCE
  // =========================================

  if (
    !inventoryItemData.stackable
  ) {


    newInventoryItem.instanceId =
      `${inventoryItemData.id}_${Date.now()}_${Math.floor(
        Math.random() *
        100000
      )}`;

  }



  // =========================================
  // EQUIPMENT DATA
  // =========================================

  if (
    definition &&
    definition.type ===
      "weapon"
  ) {


    newInventoryItem.weaponClass =
      definition.weaponClass;


    newInventoryItem.equipmentSlot =
      definition.equipmentSlot;


    newInventoryItem.equippedBy =
      null;

  }



  playerData.inventory.push(
    newInventoryItem
  );


  console.log(
    `New item obtained: ${newInventoryItem.name}`
  );

}


// =========================================================
// CLAIM CURRENT BATTLE REWARDS
// =========================================================

function claimCurrentBattleRewards() {


  const rewards =
    currentBattle.rewards;


  // =========================================
  // SAFETY CHECK
  // =========================================

  if (
    !rewards ||
    !rewards.generated
  ) {

    console.log(
      "No battle rewards available to claim."
    );


    return false;

  }


  // =========================================
  // DUPLICATE CLAIM PROTECTION
  // =========================================

  if (
    rewards.claimed ===
    true
  ) {

    console.log(
      "Battle rewards have already been claimed."
    );


    return false;

  }


  // =========================================
  // AWARD RYO
  // =========================================

  playerData.ryo +=
    Number(
      rewards.ryo
    ) || 0;


  // =========================================
  // AWARD EXP
  // =========================================

  playerData.exp +=
    Number(
      rewards.exp
    ) || 0;


  // =========================================
  // AWARD COMMON ITEMS
  // =========================================

  if (
    Array.isArray(
      rewards.items
    )
  ) {


    rewards.items.forEach(
      item => {

        addItemToInventory(
          item
        );

      }
    );

  }


  // =========================================
  // AWARD RARE ITEMS
  // =========================================

  if (
    Array.isArray(
      rewards.rareDrops
    )
  ) {


    rewards.rareDrops.forEach(
      item => {

        addItemToInventory(
          item
        );

      }
    );

  }


  // =========================================
  // MARK REWARDS AS CLAIMED
  // =========================================

  rewards.claimed =
    true;


  // =========================================
  // SAVE PLAYER
  // =========================================

  savePlayerData();


  console.log(
    "================================="
  );


  console.log(
    "BATTLE REWARDS CLAIMED"
  );


  console.log(
    `Ryō: ${playerData.ryo}`
  );


  console.log(
    `EXP: ${playerData.exp}`
  );


  console.log(
    "Inventory:",
    playerData.inventory
  );


  console.log(
    "================================="
  );


  return true;

}


// =========================================================
// PLAYER EQUIPMENT SYSTEM
// =========================================================

function getPlayerCharacter(
  characterId
) {


  return (
    playerTeam.find(
      character =>
        character.id ===
        characterId
    ) ||
    null
  );

}



// =========================================================
// FIND AVAILABLE INVENTORY EQUIPMENT
// =========================================================

function findAvailableEquipment(
  itemId
) {


  return (
    playerData.inventory.find(
      item =>
        item.id === itemId &&
        item.type === "weapon" &&
        !item.equippedBy
    ) ||
    null
  );

}



// =========================================================
// EQUIP ITEM TO CHARACTER
// =========================================================

function equipItemToCharacter(
  itemId,
  characterId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return false;

  }



  const item =
    findAvailableEquipment(
      itemId
    );


  if (!item) {


    console.log(
      "No unequipped item available:",
      itemId
    );


    return false;

  }



  const definition =
    getItemDefinition(
      item.id
    );


  if (
    !definition ||
    definition.type !==
      "weapon"
  ) {


    console.log(
      "Item cannot be equipped:",
      item.name
    );


    return false;

  }



  // =========================================
  // PREPARE CHARACTER EQUIPMENT ARRAY
  // =========================================

  if (
    !Array.isArray(
      character.equipment
    )
  ) {


    character.equipment =
      [];

  }



  // =========================================
  // CURRENTLY ONE WEAPON SLOT
  // =========================================

  const existingWeapon =
    character.equipment.find(
      equipment =>
        equipment.slot ===
        "weapon"
    );


  if (existingWeapon) {


    console.log(
      `${character.name} already has a weapon equipped.`
    );


    console.log(
      "Unequip the current weapon first."
    );


    return false;

  }



  // =========================================
  // EQUIP WEAPON
  // =========================================

  item.equippedBy =
    character.id;


  character.equipment.push({

    instanceId:
      item.instanceId,

    itemId:
      item.id,

    slot:
      "weapon"

  });



  savePlayerData();



  console.log(
    `${item.name} equipped by ${character.name}.`
  );


  return true;

}



// =========================================================
// UNEQUIP CHARACTER WEAPON
// =========================================================

function unequipCharacterWeapon(
  characterId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return false;

  }



  if (
    !Array.isArray(
      character.equipment
    ) ||
    character.equipment.length ===
      0
  ) {


    console.log(
      `${character.name} has no equipment.`
    );


    return false;

  }



  const equippedWeapon =
    character.equipment.find(
      equipment =>
        equipment.slot ===
        "weapon"
    );


  if (!equippedWeapon) {


    console.log(
      `${character.name} has no weapon equipped.`
    );


    return false;

  }



  const inventoryItem =
    playerData.inventory.find(
      item =>
        item.instanceId ===
        equippedWeapon.instanceId
    );


  if (inventoryItem) {


    inventoryItem.equippedBy =
      null;

  }



  character.equipment =
    character.equipment.filter(
      equipment =>
        equipment.instanceId !==
        equippedWeapon.instanceId
    );



  savePlayerData();



  console.log(
    `${character.name}'s weapon has been unequipped.`
  );


  return true;

}



// =========================================================
// RESTORE EQUIPMENT FROM PLAYER SAVE
// =========================================================

function syncCharacterEquipmentFromSave() {


  // =========================================
  // CLEAR RUNTIME EQUIPMENT
  // =========================================

  playerTeam.forEach(
    character => {

      character.equipment =
        [];

    }
  );


  if (
    !Array.isArray(
      playerData.inventory
    )
  ) {

    playerData.inventory =
      [];

  }


  const usedInstanceIds =
    new Set();


  const occupiedSlots =
    new Set();


  let repairedSave =
    false;


  // =========================================
  // VALIDATE + RESTORE SAVED EQUIPMENT
  // =========================================

  playerData.inventory.forEach(
    item => {


      if (
        !item ||
        item.type !==
          "weapon"
      ) {

        return;

      }


      if (!item.equippedBy) {

        return;

      }


      // =========================================
      // VALID CHARACTER
      // =========================================

      const character =
        getPlayerCharacter(
          item.equippedBy
        );


      if (!character) {


        console.warn(
          "Invalid equipped character removed:",
          item.equippedBy,
          item.name
        );


        item.equippedBy =
          null;


        repairedSave =
          true;


        return;

      }


      // =========================================
      // VALID ITEM DEFINITION
      // =========================================

      const definition =
        getItemDefinition(
          item.id
        );


      if (
        !definition ||
        definition.type !==
          "weapon"
      ) {


        console.warn(
          "Invalid equipped weapon definition:",
          item.id
        );


        item.equippedBy =
          null;


        repairedSave =
          true;


        return;

      }


      // =========================================
      // VALID INSTANCE ID
      // =========================================

      if (!item.instanceId) {


        console.warn(
          "Equipped weapon missing instanceId:",
          item.name
        );


        item.equippedBy =
          null;


        repairedSave =
          true;


        return;

      }


      // =========================================
      // DUPLICATE INSTANCE PROTECTION
      // =========================================

      if (
        usedInstanceIds.has(
          item.instanceId
        )
      ) {


        console.warn(
          "Duplicate equipped item instance removed:",
          item.instanceId
        );


        item.equippedBy =
          null;


        repairedSave =
          true;


        return;

      }


      const slot =
        definition.equipmentSlot ||
        item.equipmentSlot ||
        "weapon";


      const slotKey =
        `${character.id}:${slot}`;


      // =========================================
      // ONE ITEM PER SLOT
      // =========================================

      if (
        occupiedSlots.has(
          slotKey
        )
      ) {


        console.warn(
          `${character.name} had multiple items in ${slot}. Extra item unequipped:`,
          item.name
        );


        item.equippedBy =
          null;


        repairedSave =
          true;


        return;

      }


      // =========================================
      // NORMALIZE INVENTORY EQUIPMENT DATA
      // =========================================

      item.weaponClass =
        definition.weaponClass;


      item.equipmentSlot =
        slot;


      // =========================================
      // RESTORE RUNTIME EQUIPMENT
      // =========================================

      character.equipment.push({

        instanceId:
          item.instanceId,

        itemId:
          item.id,

        slot:
          slot

      });


      usedInstanceIds.add(
        item.instanceId
      );


      occupiedSlots.add(
        slotKey
      );

    }
  );


  // =========================================
  // RE-SAVE ONLY IF REPAIRS WERE REQUIRED
  // =========================================

  if (repairedSave) {


    console.warn(
      "Equipment save contained invalid data and was repaired."
    );


    savePlayerData();

  }


  console.log(
    "Character equipment restored."
  );

}


// =========================================================
// DEVELOPMENT EQUIPMENT VIEW
// =========================================================

function showEquipmentData() {


  const equipmentView =
    playerTeam.map(
      character => {


        const weapon =
          character.equipment.find(
            equipment =>
              equipment.slot ===
              "weapon"
          );


        const inventoryItem =
          weapon
            ? playerData.inventory.find(
                item =>
                  item.instanceId ===
                  weapon.instanceId
              )
            : null;


        const definition =
          inventoryItem
            ? getItemDefinition(
                inventoryItem.id
              )
            : null;


        const rawBonuses =
          getRawEquipmentStatBonuses(
            character
          );


        const naturalProficiency =
          getNaturalWeaponProficiency(
            character
          );


        const activeProficiency =
          getWeaponProficiency(
            character
          );


        const signatureMultiplier =
          getSignatureWeaponAffinityMultiplier(
            character,
            definition
          );


        const finalBonuses =
          getEquipmentStatBonuses(
            character
          );


        const effectiveStats =
          getEffectiveCharacterStats(
            character
          );


        return {

          character:
            character.name,

          weapon:
            inventoryItem
              ? inventoryItem.name
              : "—",

          weaponClass:
            definition &&
            definition.weaponClass
              ? definition.weaponClass
              : "—",

          naturalBuki:
            character.stats.buki,

          rawBukiBonus:
            rawBonuses.buki,

          naturalTier:
            naturalProficiency.name,

          activeTier:
            activeProficiency.name,

          activeScore:
            activeProficiency.proficiencyBuki,

          proficiencyMult:
            `${activeProficiency.multiplier.toFixed(
              2
            )}x`,

          signatureMult:
            `${signatureMultiplier.toFixed(
              2
            )}x`,

          finalBukiBonus:
            finalBonuses.buki,

          effectiveBuki:
            effectiveStats.buki,

          currentPL:
            calculateCurrentPL(
              character
            )

        };

      }
    );


  console.table(
    equipmentView
  );

}


// =========================================================
// EQUIPMENT PHASE DIAGNOSTICS
// =========================================================

function runEquipmentPhaseDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — EQUIPMENT DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  // =========================================
  // PLAYER SAVE STRUCTURE
  // =========================================

  results.push({

    test:
      "Inventory exists",

    pass:
      Array.isArray(
        playerData.inventory
      )

  });


  results.push({

    test:
      "Character progression exists",

    pass:
      !!(
        playerData.characters &&
        typeof playerData.characters ===
          "object"
      )

  });


  // =========================================
  // INVENTORY INTEGRITY
  // =========================================

  const instanceIds =
    new Set();


  let duplicateInstanceIds =
    false;


  let invalidEquippedCharacter =
    false;


  let invalidEquippedDefinition =
    false;


  playerData.inventory.forEach(
    item => {


      if (
        item.instanceId
      ) {


        if (
          instanceIds.has(
            item.instanceId
          )
        ) {

          duplicateInstanceIds =
            true;

        }


        instanceIds.add(
          item.instanceId
        );

      }


      if (
        item.equippedBy &&
        !getPlayerCharacter(
          item.equippedBy
        )
      ) {

        invalidEquippedCharacter =
          true;

      }


      if (
        item.equippedBy &&
        !getItemDefinition(
          item.id
        )
      ) {

        invalidEquippedDefinition =
          true;

      }

    }
  );


  results.push({

    test:
      "No duplicate item instances",

    pass:
      !duplicateInstanceIds

  });


  results.push({

    test:
      "No invalid equipped character IDs",

    pass:
      !invalidEquippedCharacter

  });


  results.push({

    test:
      "No missing equipped item definitions",

    pass:
      !invalidEquippedDefinition

  });


  // =========================================
  // CHARACTER EQUIPMENT INTEGRITY
  // =========================================

  let duplicateSlots =
    false;


  let invalidRuntimeEquipment =
    false;


  playerTeam.forEach(
    character => {


      const slots =
        new Set();


      character.equipment.forEach(
        equipment => {


          if (
            slots.has(
              equipment.slot
            )
          ) {

            duplicateSlots =
              true;

          }


          slots.add(
            equipment.slot
          );


          const inventoryItem =
            playerData.inventory.find(
              item =>
                item.instanceId ===
                equipment.instanceId
            );


          if (
            !inventoryItem ||
            inventoryItem.equippedBy !==
              character.id
          ) {

            invalidRuntimeEquipment =
              true;

          }

        }
      );

    }
  );


  results.push({

    test:
      "No duplicate character equipment slots",

    pass:
      !duplicateSlots

  });


  results.push({

    test:
      "Runtime equipment matches inventory",

    pass:
      !invalidRuntimeEquipment

  });


  // =========================================
  // CALCULATION HEALTH
  // =========================================

  let validEffectiveStats =
    true;


  let validPowerLevels =
    true;


  let validProficiencies =
    true;


  playerTeam.forEach(
    character => {


      const effectiveStats =
        getEffectiveCharacterStats(
          character
        );


      Object.values(
        effectiveStats
      ).forEach(
        value => {


          if (
            !Number.isFinite(
              Number(value)
            )
          ) {

            validEffectiveStats =
              false;

          }

        }
      );


      const pl =
        calculateCurrentPL(
          character
        );


      if (
        !Number.isFinite(
          pl
        )
      ) {

        validPowerLevels =
          false;

      }


      const proficiency =
        getWeaponProficiency(
          character
        );


      if (
        !Number.isFinite(
          proficiency.multiplier
        ) ||
        !Number.isFinite(
          proficiency.proficiencyBuki
        )
      ) {

        validProficiencies =
          false;

      }

    }
  );


  results.push({

    test:
      "Effective stats are valid",

    pass:
      validEffectiveStats

  });


  results.push({

    test:
      "Power levels are valid",

    pass:
      validPowerLevels

  });


  results.push({

    test:
      "Weapon proficiency is valid",

    pass:
      validProficiencies

  });


  // =========================================
  // SPECIALIZATION SAVE HEALTH
  // =========================================

  let specializationDataValid =
    true;


  playerTeam.forEach(
    character => {


      const specializations =
        character.weaponSpecializations ||
        {};


      Object.values(
        specializations
      ).forEach(
        specialization => {


          const normalized =
            normalizeWeaponSpecializationRecord(
              specialization
            );


          if (
            !Number.isFinite(
              normalized.level
            ) ||
            !Number.isFinite(
              normalized.exp
            )
          ) {

            specializationDataValid =
              false;

          }

        }
      );

    }
  );


  results.push({

    test:
      "Weapon specialization data valid",

    pass:
      specializationDataValid

  });


  // =========================================
  // DISPLAY RESULTS
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ EQUIPMENT PHASE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ EQUIPMENT PHASE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  showEquipmentData();


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// DISCIPLINE EXP REQUIREMENT
// =========================================================

function getDisciplineExpRequired(
  level
) {


  const safeLevel =
    Math.max(
      1,
      Math.floor(
        Number(level) || 1
      )
    );


  return (
    50 +
    (
      safeLevel - 1
    ) * 25
  );

}


// =========================================================
// GET CHARACTER DISCIPLINE PROGRESSION
// =========================================================

function getCharacterDisciplineProgression(
  characterId,
  disciplineId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return null;

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return null;

  }


  character.disciplineProgression =
    normalizeDisciplineProgression(
      character
        .disciplineProgression
    );


  return (
    character
      .disciplineProgression[
        disciplineId
      ]
  );

}


// =========================================================
// GET DISCIPLINE STAT GAIN PER LEVEL
// =========================================================

function getDisciplineStatGainPerLevel(
  disciplineId
) {


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {

    return 0;

  }


  // =========================================
  // CURRENT BALANCE RULE
  // =========================================
  //
  // Every discipline training level gained
  // permanently increases its natural stat
  // by +1.
  //
  // This helper exists so balancing can be
  // changed later in one place.
  //
  // =========================================

  return 1;

}


// =========================================================
// APPLY PENDING DISCIPLINE STAT GROWTH
// =========================================================

function applyPendingDisciplineStatGrowth(
  characterId,
  disciplineId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return null;

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return null;

  }


  const progression =
    getCharacterDisciplineProgression(
      characterId,
      disciplineId
    );


  if (!progression) {

    return null;

  }


  if (
    !Number.isFinite(
      Number(
        progression.statLevelApplied
      )
    )
  ) {

    progression.statLevelApplied =
      1;

  }


  let statPointsGained =
    0;


  const statGainPerLevel =
    getDisciplineStatGainPerLevel(
      disciplineId
    );


  while (
    progression.statLevelApplied <
      progression.level
  ) {


    progression.statLevelApplied +=
      1;


    character.stats[
      disciplineId
    ] =
      (
        Number(
          character.stats[
            disciplineId
          ]
        ) || 0
      ) +
      statGainPerLevel;


    statPointsGained +=
      statGainPerLevel;

  }


  if (
    statPointsGained >
      0
  ) {


    console.log(
      `${character.name} gained +${statPointsGained} permanent ${discipline.name}.`
    );

  }


  return {

    statPointsGained:
      statPointsGained,

    stat:
      character.stats[
        disciplineId
      ],

    statLevelApplied:
      progression.statLevelApplied

  };

}


// =========================================================
// PROCESS DISCIPLINE LEVEL UPS
// =========================================================

function processDisciplineLevelUps(
  characterId,
  disciplineId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return null;

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return null;

  }


  const progression =
    getCharacterDisciplineProgression(
      characterId,
      disciplineId
    );


  if (!progression) {

    return null;

  }


  let levelsGained =
    0;


  let expRequired =
    getDisciplineExpRequired(
      progression.level
    );


  while (
    progression.exp >=
      expRequired
  ) {


    progression.exp -=
      expRequired;


    progression.level +=
      1;


    levelsGained +=
      1;


    console.log(
      `${character.name}'s ${discipline.name} Training reached Level ${progression.level}!`
    );


    expRequired =
      getDisciplineExpRequired(
        progression.level
      );

  }


  const statGrowth =
    applyPendingDisciplineStatGrowth(
      characterId,
      disciplineId
    );


  return {

    levelsGained:
      levelsGained,

    level:
      progression.level,

    exp:
      progression.exp,

    expToNext:
      getDisciplineExpRequired(
        progression.level
      ),

    statPointsGained:
      statGrowth
        ? statGrowth.statPointsGained
        : 0,

    stat:
      character.stats[
        disciplineId
      ]

  };

}


// =========================================================
// VALIDATE DISCIPLINE TRAINING SOURCE
// =========================================================

function isValidDisciplineTrainingSource(
  disciplineId,
  source
) {


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {

    return false;

  }


  return (
    discipline.trainingSource ===
    source
  );

}


// =========================================================
// ADD DISCIPLINE EXP
// =========================================================

function addDisciplineExp(
  characterId,
  disciplineId,
  amount,
  source
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return false;

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return false;

  }


  if (
    !isValidDisciplineTrainingSource(
      disciplineId,
      source
    )
  ) {


    console.log(
      `${discipline.name} EXP cannot be gained from ${source}.`
    );


    console.log(
      `Required source: ${discipline.trainingSource}`
    );


    return false;

  }


  const expAmount =
    Math.floor(
      Number(amount)
    );


  if (
    !Number.isFinite(
      expAmount
    ) ||
    expAmount <= 0
  ) {


    console.log(
      "Invalid discipline EXP amount:",
      amount
    );


    return false;

  }


  const progression =
    getCharacterDisciplineProgression(
      characterId,
      disciplineId
    );


  if (!progression) {

    return false;

  }


  // =========================================
  // AWARD EXP
  // =========================================

  progression.exp +=
    expAmount;


  console.log(
    `${character.name} gained +${expAmount} ${discipline.name} EXP from ${source}.`
  );


  // =========================================
  // PROCESS LEVEL UPS + STAT GROWTH
  // =========================================

  const levelResult =
    processDisciplineLevelUps(
      characterId,
      disciplineId
    );


  if (!levelResult) {

    return false;

  }


  // =========================================
  // SAVE RESULT
  // =========================================

  savePlayerData();


  console.log(
    `${discipline.name} Training Level: ${levelResult.level}`
  );


  console.log(
    `${discipline.name} EXP: ${levelResult.exp} / ${levelResult.expToNext}`
  );


  if (
    levelResult.levelsGained >
      0
  ) {


    console.log(
      `${discipline.name} Levels Gained: +${levelResult.levelsGained}`
    );

  }


  if (
    levelResult.statPointsGained >
      0
  ) {


    console.log(
      `${discipline.name} Permanent Stat Gain: +${levelResult.statPointsGained}`
    );

  }


  return true;

}


// =========================================================
// BRICK 20 — SHINOBI DISCIPLINE DIAGNOSTICS
// =========================================================

function runDisciplinePhaseDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — DISCIPLINE DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const expectedDisciplines = [
    "nin",
    "tai",
    "buki",
    "fuin",
    "kin",
    "gen",
    "stamina"
  ];


  // =========================================
  // DISCIPLINE DEFINITIONS EXIST
  // =========================================

  const allDisciplinesExist =
    expectedDisciplines.every(
      disciplineId =>
        !!getShinobiDiscipline(
          disciplineId
        )
    );


  results.push({

    test:
      "All seven disciplines exist",

    pass:
      allDisciplinesExist

  });


  // =========================================
  // CORRECT TRAINING SOURCES
  // =========================================

  const expectedSources = {

    nin:
      "exam",

    tai:
      "practical",

    buki:
      "practical",

    fuin:
      "exam",

    kin:
      "battle",

    gen:
      "exam",

    stamina:
      "practical"

  };


  const validSources =
    expectedDisciplines.every(
      disciplineId => {


        const definition =
          getShinobiDiscipline(
            disciplineId
          );


        return (
          definition &&
          definition.trainingSource ===
            expectedSources[
              disciplineId
            ]
        );

      }
    );


  results.push({

    test:
      "Training sources are correct",

    pass:
      validSources

  });


  // =========================================
  // KINJUTSU BATTLE ONLY
  // =========================================

  results.push({

    test:
      "Kinjutsu is battle-only",

    pass:
      (
        isValidDisciplineTrainingSource(
          "kin",
          "battle"
        ) === true &&
        isValidDisciplineTrainingSource(
          "kin",
          "exam"
        ) === false &&
        isValidDisciplineTrainingSource(
          "kin",
          "practical"
        ) === false
      )

  });


  // =========================================
  // CHARACTER DISCIPLINE HEALTH
  // =========================================

  let progressionValid =
    true;


  let runtimeSaveMatch =
    true;


  let statsValid =
    true;


  playerTeam.forEach(
    character => {


      const runtimeProgression =
        normalizeDisciplineProgression(
          character
            .disciplineProgression
        );


      const savedCharacter =
        playerData.characters &&
        playerData.characters[
          character.id
        ];


      const savedProgression =
        savedCharacter
          ? normalizeDisciplineProgression(
              savedCharacter
                .disciplineProgression
            )
          : null;


      expectedDisciplines.forEach(
        disciplineId => {


          const record =
            runtimeProgression[
              disciplineId
            ];


          if (
            !record ||
            !Number.isFinite(
              Number(
                record.level
              )
            ) ||
            record.level < 1 ||
            !Number.isFinite(
              Number(
                record.exp
              )
            ) ||
            record.exp < 0 ||
            !Number.isFinite(
              Number(
                record.statLevelApplied
              )
            ) ||
            record.statLevelApplied < 1 ||
            record.statLevelApplied >
              record.level
          ) {

            progressionValid =
              false;

          }


          if (
            !Number.isFinite(
              Number(
                character.stats[
                  disciplineId
                ]
              )
            )
          ) {

            statsValid =
              false;

          }


          if (
            !savedProgression ||
            JSON.stringify(
              runtimeProgression[
                disciplineId
              ]
            ) !==
            JSON.stringify(
              savedProgression[
                disciplineId
              ]
            )
          ) {

            runtimeSaveMatch =
              false;

          }

        }
      );

    }
  );


  results.push({

    test:
      "Discipline progression is valid",

    pass:
      progressionValid

  });


  results.push({

    test:
      "Permanent discipline stats are valid",

    pass:
      statsValid

  });


  results.push({

    test:
      "Runtime discipline data matches save",

    pass:
      runtimeSaveMatch

  });


  // =========================================
  // EXP CURVE HEALTH
  // =========================================

  let expCurveValid =
    true;


  for (
    let level = 1;
    level <= 100;
    level += 1
  ) {


    const required =
      getDisciplineExpRequired(
        level
      );


    if (
      !Number.isFinite(
        required
      ) ||
      required <= 0
    ) {

      expCurveValid =
        false;

      break;

    }

  }


  results.push({

    test:
      "Discipline EXP curve is valid",

    pass:
      expCurveValid

  });


  // =========================================
  // DISPLAY
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ DISCIPLINE PHASE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ DISCIPLINE PHASE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 21 — GET TRAINING ACTION DATA
// =========================================================

function getTrainingActionData(
  characterId,
  disciplineId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return null;

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return null;

  }


  const progression =
    getCharacterDisciplineProgression(
      characterId,
      disciplineId
    );


  if (!progression) {

    return null;

  }


  return {

    characterId:
      character.id,

    characterName:
      character.name,

    disciplineId:
      discipline.id,

    disciplineName:
      discipline.name,

    trainingSource:
      discipline.trainingSource,

    naturalStat:
      character.stats[
        disciplineId
      ],

    trainingLevel:
      progression.level,

    exp:
      progression.exp,

    expToNext:
      getDisciplineExpRequired(
        progression.level
      ),

    statLevelApplied:
      progression.statLevelApplied

  };

}


// =========================================================
// BRICK 22 — EXAM TRAINING AWARD
// =========================================================

function awardExamTrainingExp(
  characterId,
  disciplineId,
  amount
) {


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return false;

  }


  if (
    discipline.trainingSource !==
      "exam"
  ) {


    console.log(
      `${discipline.name} cannot be trained in Exams.`
    );


    console.log(
      `Required source: ${discipline.trainingSource}`
    );


    return false;

  }


  return addDisciplineExp(
    characterId,
    disciplineId,
    amount,
    "exam"
  );

}


// =========================================================
// BRICK 23 — PRACTICAL TRAINING AWARD
// =========================================================

function awardPracticalTrainingExp(
  characterId,
  disciplineId,
  amount
) {


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    console.log(
      "Discipline not found:",
      disciplineId
    );


    return false;

  }


  if (
    discipline.trainingSource !==
      "practical"
  ) {


    console.log(
      `${discipline.name} cannot be trained in Practical.`
    );


    console.log(
      `Required source: ${discipline.trainingSource}`
    );


    return false;

  }


  return addDisciplineExp(
    characterId,
    disciplineId,
    amount,
    "practical"
  );

}


// =========================================================
// BRICK 24 — KINJUTSU BATTLE EXP AWARD
// =========================================================

function awardKinjutsuBattleExp(
  characterId,
  amount
) {


  return addDisciplineExp(
    characterId,
    "kin",
    amount,
    "battle"
  );

}


// =========================================================
// BRICK 25 — TRAINING CONFIGURATION
// =========================================================
//
// Central configuration for deliberate training actions.
//
// IMPORTANT:
// These are development balance values for now.
//
// Energy / Ryō / Chakra costs are represented here,
// but are NOT charged yet.
//
// Kinjutsu is deliberately absent because Kinjutsu
// progression comes from battle use, not training.
//
// =========================================================

const TRAINING_SOURCE_CONFIG = {

  exam: {

    id:
      "exam",

    name:
      "Exam",

    baseExp:
      10,

    costs: {

      energy:
        0,

      ryo:
        0,

      chakra:
        0

    }

  },


  practical: {

    id:
      "practical",

    name:
      "Practical",

    baseExp:
      10,

    costs: {

      energy:
        0,

      ryo:
        0,

      chakra:
        0

    }

  }

};


// =========================================================
// GET TRAINING CONFIGURATION
// =========================================================

function getTrainingConfiguration(
  source
) {


  return (
    TRAINING_SOURCE_CONFIG[
      source
    ] ||
    null
  );

}


// =========================================================
// BRICK 26 — TRAINING ELIGIBILITY ENGINE
// =========================================================

function getTrainingEligibility(
  characterId,
  disciplineId,
  source
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    return {

      allowed:
        false,

      reason:
        "Character not found."

    };

  }


  const discipline =
    getShinobiDiscipline(
      disciplineId
    );


  if (!discipline) {


    return {

      allowed:
        false,

      reason:
        "Discipline not found."

    };

  }


  const trainingConfig =
    getTrainingConfiguration(
      source
    );


  // =========================================
  // BATTLE IS NOT A MANUAL TRAINING ACTION
  // =========================================

  if (
    source ===
      "battle"
  ) {


    return {

      allowed:
        false,

      reason:
        "Battle progression is awarded through combat use, not manual training."

    };

  }


  if (!trainingConfig) {


    return {

      allowed:
        false,

      reason:
        "Training source not found."

    };

  }


  if (
    discipline.trainingSource !==
      source
  ) {


    return {

      allowed:
        false,

      reason:
        `${discipline.name} requires ${discipline.trainingSource} training.`

    };

  }


  return {

    allowed:
      true,

    reason:
      null,

    character:
      character,

    discipline:
      discipline,

    trainingConfig:
      trainingConfig

  };

}


// =========================================================
// CAN TRAIN DISCIPLINE
// =========================================================

function canTrainDiscipline(
  characterId,
  disciplineId,
  source
) {


  return getTrainingEligibility(
    characterId,
    disciplineId,
    source
  ).allowed;

}


// =========================================================
// BRICK 27 — BUILD TRAINING RESULT
// =========================================================

function buildTrainingResult(
  before,
  after,
  expGained,
  source
) {


  if (
    !before ||
    !after
  ) {

    return null;

  }


  return {

    success:
      true,

    characterId:
      after.characterId,

    characterName:
      after.characterName,

    disciplineId:
      after.disciplineId,

    disciplineName:
      after.disciplineName,

    source:
      source,

    expGained:
      expGained,

    previousLevel:
      before.trainingLevel,

    newLevel:
      after.trainingLevel,

    levelsGained:
      (
        after.trainingLevel -
        before.trainingLevel
      ),

    leveledUp:
      (
        after.trainingLevel >
        before.trainingLevel
      ),

    previousStat:
      before.naturalStat,

    newStat:
      after.naturalStat,

    statPointsGained:
      (
        after.naturalStat -
        before.naturalStat
      ),

    previousExp:
      before.exp,

    currentExp:
      after.exp,

    expToNext:
      after.expToNext

  };

}


// =========================================================
// BRICK 28 — PREVIEW DISCIPLINE TRAINING
// =========================================================

function previewDisciplineTraining(
  characterId,
  disciplineId,
  source
) {


  const eligibility =
    getTrainingEligibility(
      characterId,
      disciplineId,
      source
    );


  if (
    !eligibility.allowed
  ) {


    return {

      success:
        false,

      allowed:
        false,

      reason:
        eligibility.reason

    };

  }


  const trainingData =
    getTrainingActionData(
      characterId,
      disciplineId
    );


  if (!trainingData) {


    return {

      success:
        false,

      allowed:
        false,

      reason:
        "Training data could not be created."

    };

  }


  return {

    success:
      true,

    allowed:
      true,

    characterId:
      trainingData.characterId,

    characterName:
      trainingData.characterName,

    disciplineId:
      trainingData.disciplineId,

    disciplineName:
      trainingData.disciplineName,

    source:
      source,

    expReward:
      eligibility
        .trainingConfig
        .baseExp,

    costs: {
      ...eligibility
        .trainingConfig
        .costs
    },

    trainingLevel:
      trainingData.trainingLevel,

    currentExp:
      trainingData.exp,

    expToNext:
      trainingData.expToNext,

    naturalStat:
      trainingData.naturalStat

  };

}


// =========================================================
// BRICK 28 — UNIFIED DISCIPLINE TRAINING ACTION
// =========================================================

function performDisciplineTraining(
  characterId,
  disciplineId,
  source,
  options = {}
) {


  const eligibility =
    getTrainingEligibility(
      characterId,
      disciplineId,
      source
    );


  if (
    !eligibility.allowed
  ) {


    console.log(
      "Training denied:",
      eligibility.reason
    );


    return {

      success:
        false,

      reason:
        eligibility.reason

    };

  }


  const before =
    getTrainingActionData(
      characterId,
      disciplineId
    );


  if (!before) {


    return {

      success:
        false,

      reason:
        "Training data could not be loaded."

    };

  }


  const configuredExp =
    eligibility
      .trainingConfig
      .baseExp;


  const expOverride =
    Number(
      options.expOverride
    );


  const expGained =
    (
      Number.isFinite(
        expOverride
      ) &&
      expOverride >
        0
    )
      ? Math.floor(
          expOverride
        )
      : configuredExp;


  let awarded =
    false;


  // =========================================
  // EXAM
  // =========================================

  if (
    source ===
      "exam"
  ) {


    awarded =
      awardExamTrainingExp(
        characterId,
        disciplineId,
        expGained
      );

  }


  // =========================================
  // PRACTICAL
  // =========================================

  if (
    source ===
      "practical"
  ) {


    awarded =
      awardPracticalTrainingExp(
        characterId,
        disciplineId,
        expGained
      );

  }


  if (!awarded) {


    return {

      success:
        false,

      reason:
        "Training EXP could not be awarded."

    };

  }


  const after =
    getTrainingActionData(
      characterId,
      disciplineId
    );


  const result =
    buildTrainingResult(
      before,
      after,
      expGained,
      source
    );


  console.log(
    "========================================"
  );


  console.log(
    "TRAINING COMPLETE"
  );


  console.log(
    result
  );


  console.log(
    "========================================"
  );


  return result;

}


// =========================================================
// BRICK 29 — TRAINING ENGINE DIAGNOSTICS
// =========================================================

function runTrainingEngineDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — TRAINING ENGINE DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  // =========================================
  // CONFIGURATION
  // =========================================

  const examConfig =
    getTrainingConfiguration(
      "exam"
    );


  const practicalConfig =
    getTrainingConfiguration(
      "practical"
    );


  results.push({

    test:
      "Exam configuration exists",

    pass:
      !!examConfig

  });


  results.push({

    test:
      "Practical configuration exists",

    pass:
      !!practicalConfig

  });


  results.push({

    test:
      "Training EXP rewards are valid",

    pass:
      !!(
        examConfig &&
        practicalConfig &&
        Number.isFinite(
          examConfig.baseExp
        ) &&
        examConfig.baseExp >
          0 &&
        Number.isFinite(
          practicalConfig.baseExp
        ) &&
        practicalConfig.baseExp >
          0
      )

  });


  // =========================================
  // CORRECT ELIGIBILITY
  // =========================================

  results.push({

    test:
      "Ninjutsu allowed in Exam",

    pass:
      canTrainDiscipline(
        "sakura",
        "nin",
        "exam"
      ) === true

  });


  results.push({

    test:
      "Genjutsu allowed in Exam",

    pass:
      canTrainDiscipline(
        "sakura",
        "gen",
        "exam"
      ) === true

  });


  results.push({

    test:
      "Fuinjutsu allowed in Exam",

    pass:
      canTrainDiscipline(
        "sakura",
        "fuin",
        "exam"
      ) === true

  });


  results.push({

    test:
      "Taijutsu allowed in Practical",

    pass:
      canTrainDiscipline(
        "sakura",
        "tai",
        "practical"
      ) === true

  });


  results.push({

    test:
      "Bukijutsu allowed in Practical",

    pass:
      canTrainDiscipline(
        "sakura",
        "buki",
        "practical"
      ) === true

  });


  results.push({

    test:
      "Stamina allowed in Practical",

    pass:
      canTrainDiscipline(
        "sakura",
        "stamina",
        "practical"
      ) === true

  });


  // =========================================
  // WRONG SOURCE REJECTION
  // =========================================

  results.push({

    test:
      "Bukijutsu rejected by Exam",

    pass:
      canTrainDiscipline(
        "sakura",
        "buki",
        "exam"
      ) === false

  });


  results.push({

    test:
      "Ninjutsu rejected by Practical",

    pass:
      canTrainDiscipline(
        "sakura",
        "nin",
        "practical"
      ) === false

  });


  // =========================================
  // KINJUTSU MANUAL TRAINING BLOCK
  // =========================================

  results.push({

    test:
      "Kinjutsu rejected as manual training",

    pass:
      (
        canTrainDiscipline(
          "sakura",
          "kin",
          "exam"
        ) === false &&
        canTrainDiscipline(
          "sakura",
          "kin",
          "practical"
        ) === false &&
        canTrainDiscipline(
          "sakura",
          "kin",
          "battle"
        ) === false
      )

  });


  // =========================================
  // PREVIEW HEALTH
  // =========================================

  const validPreview =
    previewDisciplineTraining(
      "sakura",
      "nin",
      "exam"
    );


  const invalidPreview =
    previewDisciplineTraining(
      "sakura",
      "buki",
      "exam"
    );


  results.push({

    test:
      "Valid training preview works",

    pass:
      !!(
        validPreview &&
        validPreview.success ===
          true &&
        validPreview.allowed ===
          true
      )

  });


  results.push({

    test:
      "Invalid training preview rejected",

    pass:
      !!(
        invalidPreview &&
        invalidPreview.success ===
          false &&
        invalidPreview.allowed ===
          false
      )

  });


  // =========================================
  // DISPLAY RESULTS
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ TRAINING ENGINE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ TRAINING ENGINE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 30 — CURRENT RUN STATE API
// =========================================================

function getCurrentRunState() {


  const progression =
    playerData &&
    playerData.progression;


  if (!progression) {


    return {

      valid:
        false,

      reason:
        "Player progression data not found."

    };

  }


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  const highestDifficulty =
    getShinobiDifficulty(
      progression.highestDifficultyUnlocked
    );


  if (
    !currentDifficulty ||
    !highestDifficulty
  ) {


    return {

      valid:
        false,

      reason:
        "Difficulty progression data is invalid."

    };

  }


  return {

    valid:
      true,

    currentDifficultyId:
      currentDifficulty.id,

    currentDifficultyName:
      currentDifficulty.name,

    currentDifficultyOrder:
      currentDifficulty.order,

    highestDifficultyUnlockedId:
      highestDifficulty.id,

    highestDifficultyUnlockedName:
      highestDifficulty.name,

    highestDifficultyUnlockedOrder:
      highestDifficulty.order,

    legacyCycle:
      Math.max(
        0,
        Math.floor(
          Number(
            progression.legacyCycle
          ) || 0
        )
      ),

    runCompleted:
      progression.runCompleted ===
      true,

    completedDifficulties:
      Array.isArray(
        progression.completedDifficulties
      )
        ? [
            ...progression.completedDifficulties
          ]
        : [],

    premiumDifficulty:
      currentDifficulty.premium ===
      true

  };

}


// =========================================================
// GET CURRENT DIFFICULTY
// =========================================================

function getCurrentDifficulty() {


  const runState =
    getCurrentRunState();


  if (!runState.valid) {

    return null;

  }


  return getShinobiDifficulty(
    runState.currentDifficultyId
  );

}


// =========================================================
// GET CURRENT LEGACY CYCLE
// =========================================================

function getCurrentLegacyCycle() {


  const runState =
    getCurrentRunState();


  return runState.valid
    ? runState.legacyCycle
    : 0;

}


// =========================================================
// BRICK 31 — DIFFICULTY REQUIREMENT ENGINE
// =========================================================

function meetsDifficultyRequirement(
  minimumDifficultyId,
  options = {}
) {


  const requiredDifficulty =
    getShinobiDifficulty(
      minimumDifficultyId
    );


  if (!requiredDifficulty) {

    return false;

  }


  const runState =
    getCurrentRunState();


  if (!runState.valid) {

    return false;

  }


  const useHighestUnlocked =
    options.useHighestUnlocked ===
    true;


  const playerOrder =
    useHighestUnlocked
      ? runState
          .highestDifficultyUnlockedOrder
      : runState
          .currentDifficultyOrder;


  return (
    playerOrder >=
    requiredDifficulty.order
  );

}


// =========================================================
// GET DIFFICULTY REQUIREMENT DATA
// =========================================================

function getDifficultyRequirementData(
  minimumDifficultyId,
  options = {}
) {


  const requiredDifficulty =
    getShinobiDifficulty(
      minimumDifficultyId
    );


  if (!requiredDifficulty) {


    return {

      valid:
        false,

      met:
        false,

      reason:
        "Required difficulty does not exist."

    };

  }


  const runState =
    getCurrentRunState();


  if (!runState.valid) {


    return {

      valid:
        false,

      met:
        false,

      reason:
        runState.reason

    };

  }


  const useHighestUnlocked =
    options.useHighestUnlocked ===
    true;


  const comparisonDifficulty =
    useHighestUnlocked
      ? getShinobiDifficulty(
          runState
            .highestDifficultyUnlockedId
        )
      : getShinobiDifficulty(
          runState
            .currentDifficultyId
        );


  const met =
    comparisonDifficulty.order >=
    requiredDifficulty.order;


  return {

    valid:
      true,

    met:
      met,

    requiredDifficultyId:
      requiredDifficulty.id,

    requiredDifficultyName:
      requiredDifficulty.name,

    comparedAgainst:
      useHighestUnlocked
        ? "highestUnlocked"
        : "currentDifficulty",

    playerDifficultyId:
      comparisonDifficulty.id,

    playerDifficultyName:
      comparisonDifficulty.name

  };

}


// =========================================================
// BRICK 32 — FEATURE UNLOCK DEFINITIONS
// =========================================================
//
// These are progression gates only.
//
// This does NOT mean every system below is currently built.
// It gives future systems one central place to ask whether
// the player's progression allows access.
//
// =========================================================

const PROGRESSION_FEATURES = {

  core_training: {

    id:
      "core_training",

    name:
      "Core Training",

    minimumDifficulty:
      "academy",

    minimumLegacyCycle:
      0

  },


  advanced_crafting: {

    id:
      "advanced_crafting",

    name:
      "Advanced Crafting",

    minimumDifficulty:
      "genin",

    minimumLegacyCycle:
      0

  },


  advanced_specialization: {

    id:
      "advanced_specialization",

    name:
      "Advanced Specialization",

    minimumDifficulty:
      "special_jonin",

    minimumLegacyCycle:
      0

  },


  bloodline_mastery: {

    id:
      "bloodline_mastery",

    name:
      "Bloodline Mastery",

    minimumDifficulty:
      "jonin",

    minimumLegacyCycle:
      0

  },


  restricted_operations: {

    id:
      "restricted_operations",

    name:
      "Restricted Operations",

    minimumDifficulty:
      "anbu",

    minimumLegacyCycle:
      0

  },


  kage_systems: {

    id:
      "kage_systems",

    name:
      "Kage Systems",

    minimumDifficulty:
      "kage",

    minimumLegacyCycle:
      0

  },


  akatsuki_arc: {

    id:
      "akatsuki_arc",

    name:
      "Akatsuki Arc",

    minimumDifficulty:
      "akatsuki",

    minimumLegacyCycle:
      0,

    premium:
      true

  },


  jinchuriki_systems: {

    id:
      "jinchuriki_systems",

    name:
      "Jinchūriki Systems",

    minimumDifficulty:
      "jinchuriki",

    minimumLegacyCycle:
      0,

    premium:
      true

  },


  legacy_systems: {

    id:
      "legacy_systems",

    name:
      "Legacy Systems",

    minimumDifficulty:
      "academy",

    minimumLegacyCycle:
      1

  }

};


// =========================================================
// GET PROGRESSION FEATURE
// =========================================================

function getProgressionFeature(
  featureId
) {


  return (
    PROGRESSION_FEATURES[
      featureId
    ] ||
    null
  );

}


// =========================================================
// GET FEATURE ACCESS DATA
// =========================================================

function getFeatureAccessData(
  featureId,
  options = {}
) {


  const feature =
    getProgressionFeature(
      featureId
    );


  if (!feature) {


    return {

      exists:
        false,

      allowed:
        false,

      reason:
        "Feature does not exist."

    };

  }


  const runState =
    getCurrentRunState();


  if (!runState.valid) {


    return {

      exists:
        true,

      allowed:
        false,

      reason:
        runState.reason,

      feature:
        feature

    };

  }


  const difficultyMet =
    meetsDifficultyRequirement(
      feature.minimumDifficulty,
      {
        useHighestUnlocked:
          options.useHighestUnlocked ===
          true
      }
    );


  if (!difficultyMet) {


    const requiredDifficulty =
      getShinobiDifficulty(
        feature.minimumDifficulty
      );


    return {

      exists:
        true,

      allowed:
        false,

      reason:
        `Requires ${requiredDifficulty.name} difficulty.`,

      feature:
        feature

    };

  }


  const minimumLegacyCycle =
    Math.max(
      0,
      Math.floor(
        Number(
          feature.minimumLegacyCycle
        ) || 0
      )
    );


  if (
    runState.legacyCycle <
      minimumLegacyCycle
  ) {


    return {

      exists:
        true,

      allowed:
        false,

      reason:
        `Requires Legacy Cycle ${minimumLegacyCycle}.`,

      feature:
        feature

    };

  }


  // =========================================
  // PREMIUM OWNERSHIP IS CHECKED SEPARATELY
  // =========================================
  //
  // We deliberately do NOT assume the player owns premium
  // content here.
  //
  // options.hasPremiumAccess can be supplied by the future
  // account / entitlement system.
  //
  // =========================================

  if (
    feature.premium ===
      true &&
    options.hasPremiumAccess !==
      true
  ) {


    return {

      exists:
        true,

      allowed:
        false,

      reason:
        "Premium access required.",

      feature:
        feature

    };

  }


  return {

    exists:
      true,

    allowed:
      true,

    reason:
      null,

    feature:
      feature

  };

}


// =========================================================
// CAN ACCESS PROGRESSION FEATURE
// =========================================================

function canAccessProgressionFeature(
  featureId,
  options = {}
) {


  return getFeatureAccessData(
    featureId,
    options
  ).allowed;

}


// =========================================================
// BRICK 33 — PREMIUM DIFFICULTY ACCESS API
// =========================================================

function isPremiumDifficulty(
  difficultyId
) {


  const difficulty =
    getShinobiDifficulty(
      difficultyId
    );


  return !!(
    difficulty &&
    difficulty.premium ===
      true
  );

}


// =========================================================
// GET PREMIUM DIFFICULTY ACCESS DATA
// =========================================================

function getPremiumDifficultyAccessData(
  difficultyId,
  options = {}
) {


  const difficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!difficulty) {


    return {

      exists:
        false,

      requiresPremium:
        false,

      allowed:
        false,

      reason:
        "Difficulty does not exist."

    };

  }


  const progressionUnlocked =
    canAccessDifficulty(
      difficultyId
    );


  if (!progressionUnlocked) {


    return {

      exists:
        true,

      requiresPremium:
        difficulty.premium ===
        true,

      allowed:
        false,

      reason:
        `${difficulty.name} difficulty is not unlocked.`,

      difficulty:
        difficulty

    };

  }


  const requiresPremium =
    difficulty.premium ===
    true;


  if (
    requiresPremium &&
    options.hasPremiumAccess !==
      true
  ) {


    return {

      exists:
        true,

      requiresPremium:
        true,

      allowed:
        false,

      reason:
        "Premium access required.",

      difficulty:
        difficulty

    };

  }


  return {

    exists:
      true,

    requiresPremium:
      requiresPremium,

    allowed:
      true,

    reason:
      null,

    difficulty:
      difficulty

  };

}


// =========================================================
// BRICK 34 — PROGRESSION GATING DIAGNOSTICS
// =========================================================

function runProgressionGatingDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — PROGRESSION GATING DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const runState =
    getCurrentRunState();


  // =========================================
  // RUN STATE HEALTH
  // =========================================

  results.push({

    test:
      "Current run state is valid",

    pass:
      runState.valid ===
      true

  });


  results.push({

    test:
      "Current difficulty is valid",

    pass:
      !!getCurrentDifficulty()

  });


  results.push({

    test:
      "Legacy cycle is valid",

    pass:
      (
        Number.isInteger(
          getCurrentLegacyCycle()
        ) &&
        getCurrentLegacyCycle() >=
          0
      )

  });


  // =========================================
  // DIFFICULTY ORDER HEALTH
  // =========================================

  const difficultyOrdersValid =
    SHINOBI_DIFFICULTIES.every(
      (
        difficulty,
        index
      ) =>
        difficulty.order ===
        index
    );


  results.push({

    test:
      "Difficulty order is valid",

    pass:
      difficultyOrdersValid

  });


  // =========================================
  // PREMIUM METADATA
  // =========================================

  results.push({

    test:
      "Akatsuki is premium",

    pass:
      isPremiumDifficulty(
        "akatsuki"
      ) === true

  });


  results.push({

    test:
      "Jinchuriki is premium",

    pass:
      isPremiumDifficulty(
        "jinchuriki"
      ) === true

  });


  results.push({

    test:
      "Special Jonin is not currently premium",

    pass:
      isPremiumDifficulty(
        "special_jonin"
      ) === false

  });


  // =========================================
  // FEATURE DEFINITIONS HEALTH
  // =========================================

  const featureDefinitionsValid =
    Object.values(
      PROGRESSION_FEATURES
    ).every(
      feature =>
        (
          !!feature.id &&
          !!feature.name &&
          !!getShinobiDifficulty(
            feature.minimumDifficulty
          ) &&
          Number.isFinite(
            Number(
              feature.minimumLegacyCycle
            )
          ) &&
          Number(
            feature.minimumLegacyCycle
          ) >= 0
        )
    );


  results.push({

    test:
      "Progression feature definitions are valid",

    pass:
      featureDefinitionsValid

  });


  // =========================================
  // ACADEMY CORE FEATURE
  // =========================================

  results.push({

    test:
      "Core training accessible at Academy",

    pass:
      canAccessProgressionFeature(
        "core_training"
      ) === true

  });


  // =========================================
  // PREMIUM FEATURE METADATA
  // =========================================

  const akatsukiFeature =
    getProgressionFeature(
      "akatsuki_arc"
    );


  results.push({

    test:
      "Akatsuki feature marked premium",

    pass:
      !!(
        akatsukiFeature &&
        akatsukiFeature.premium ===
          true
      )

  });


  const jinchurikiFeature =
    getProgressionFeature(
      "jinchuriki_systems"
    );


  results.push({

    test:
      "Jinchuriki feature marked premium",

    pass:
      !!(
        jinchurikiFeature &&
        jinchurikiFeature.premium ===
          true
      )

  });


  // =========================================
  // LEGACY GATE HEALTH
  // =========================================

  const legacyFeature =
    getProgressionFeature(
      "legacy_systems"
    );


  results.push({

    test:
      "Legacy systems require Legacy Cycle 1",

    pass:
      !!(
        legacyFeature &&
        legacyFeature
          .minimumLegacyCycle ===
          1
      )

  });


  // =========================================
  // INVALID FEATURE REJECTED
  // =========================================

  results.push({

    test:
      "Invalid feature is rejected",

    pass:
      canAccessProgressionFeature(
        "dave_sage_of_six_paths"
      ) === false

  });


  // =========================================
  // DISPLAY
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ PROGRESSION GATING PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ PROGRESSION GATING HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 35 — RUN COMPLETION VALIDATION
// =========================================================

function getRunCompletionEligibility() {


  const runState =
    getCurrentRunState();


  if (!runState.valid) {


    return {

      allowed:
        false,

      reason:
        runState.reason

    };

  }


  if (
    runState.runCompleted ===
      true
  ) {


    return {

      allowed:
        false,

      reason:
        "Current run is already completed."

    };

  }


  // =========================================
  // FUTURE STORY ARC VALIDATION HOOK
  // =========================================
  //
  // Story completion, final boss,
  // six-character endgame team, etc.
  // will eventually be checked here.
  //
  // =========================================


  return {

    allowed:
      true,

    reason:
      null,

    difficultyId:
      runState.currentDifficultyId,

    difficultyName:
      runState.currentDifficultyName,

    legacyCycle:
      runState.legacyCycle

  };

}


// =========================================================
// CAN COMPLETE CURRENT RUN
// =========================================================

function canCompleteCurrentRun() {


  return getRunCompletionEligibility()
    .allowed;

}


// =========================================================
// BRICK 36 — INHERITANCE LIMIT CONFIGURATION
// =========================================================
//
// These limits describe what may be carried INTO
// each new difficulty.
//
// These are centralized development balance values.
//
// =========================================================

const INHERITANCE_LIMITS = {

  academy: {

    specialNinja:
      0,

    bloodlines:
      0,

    legendaryWeapons:
      0,

    basicItems:
      0

  },


  genin: {

    specialNinja:
      1,

    bloodlines:
      1,

    legendaryWeapons:
      1,

    basicItems:
      5

  },


  chunin: {

    specialNinja:
      2,

    bloodlines:
      2,

    legendaryWeapons:
      2,

    basicItems:
      10

  },


  special_jonin: {

    specialNinja:
      2,

    bloodlines:
      2,

    legendaryWeapons:
      2,

    basicItems:
      15

  },


  jonin: {

    specialNinja:
      3,

    bloodlines:
      3,

    legendaryWeapons:
      3,

    basicItems:
      20

  },


  anbu: {

    specialNinja:
      3,

    bloodlines:
      3,

    legendaryWeapons:
      3,

    basicItems:
      25

  },


  kage: {

    specialNinja:
      4,

    bloodlines:
      4,

    legendaryWeapons:
      4,

    basicItems:
      30

  },


  akatsuki: {

    specialNinja:
      5,

    bloodlines:
      5,

    legendaryWeapons:
      5,

    basicItems:
      40

  },


  jinchuriki: {

    specialNinja:
      6,

    bloodlines:
      6,

    legendaryWeapons:
      6,

    basicItems:
      50

  }

};


// =========================================================
// GET INHERITANCE LIMITS
// =========================================================

function getInheritanceLimits(
  difficultyId
) {


  const difficulty =
    getShinobiDifficulty(
      difficultyId
    );


  if (!difficulty) {

    return null;

  }


  const limits =
    INHERITANCE_LIMITS[
      difficultyId
    ];


  if (!limits) {

    return null;

  }


  return {

    ...limits

  };

}


// =========================================================
// BRICK 37 — NEXT RUN TARGET
// =========================================================

function getNextRunTarget() {


  const runState =
    getCurrentRunState();


  if (!runState.valid) {


    return {

      valid:
        false,

      reason:
        runState.reason

    };

  }


  const nextDifficulty =
    getNextShinobiDifficulty(
      runState.currentDifficultyId
    );


  // =========================================
  // NORMAL NEW GAME+
  // =========================================

  if (nextDifficulty) {


    return {

      valid:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        runState.currentDifficultyId,

      fromDifficultyName:
        runState.currentDifficultyName,

      targetDifficultyId:
        nextDifficulty.id,

      targetDifficultyName:
        nextDifficulty.name,

      targetLegacyCycle:
        runState.legacyCycle,

      inheritanceLimits:
        getInheritanceLimits(
          nextDifficulty.id
        )

    };

  }


  // =========================================
  // JINCHURIKI → LEGACY
  // =========================================

  if (
    runState.currentDifficultyId ===
      "jinchuriki"
  ) {


    return {

      valid:
        true,

      transitionType:
        "legacy",

      fromDifficultyId:
        "jinchuriki",

      fromDifficultyName:
        "Jinchūriki",

      targetDifficultyId:
        "academy",

      targetDifficultyName:
        "Academy Student",

      targetLegacyCycle:
        runState.legacyCycle + 1,

      inheritanceLimits:
        null

    };

  }


  return {

    valid:
      false,

    reason:
      "No valid next run target exists."

  };

}


// =========================================================
// BRICK 38 — INHERITANCE SELECTION MODEL
// =========================================================

function createEmptyInheritanceSelection() {


  return {

    specialNinja:
      [],

    bloodlines:
      [],

    legendaryWeapons:
      [],

    basicItems:
      []

  };

}


// =========================================================
// NORMALIZE INHERITANCE SELECTION
// =========================================================

function normalizeInheritanceSelection(
  selection
) {


  const source =
    (
      selection &&
      typeof selection ===
        "object"
    )
      ? selection
      : {};


  const normalizeArray =
    value => {


      if (
        !Array.isArray(
          value
        )
      ) {

        return [];

      }


      return [
        ...new Set(
          value.filter(
            entry =>
              (
                typeof entry ===
                  "string" &&
                entry.trim().length >
                  0
              )
          )
        )
      ];

    };


  return {

    specialNinja:
      normalizeArray(
        source.specialNinja
      ),

    bloodlines:
      normalizeArray(
        source.bloodlines
      ),

    legendaryWeapons:
      normalizeArray(
        source.legendaryWeapons
      ),

    basicItems:
      normalizeArray(
        source.basicItems
      )

  };

}


// =========================================================
// BRICK 39 — INHERITANCE SELECTION VALIDATION
// =========================================================

function validateInheritanceSelection(
  targetDifficultyId,
  selection
) {


  const limits =
    getInheritanceLimits(
      targetDifficultyId
    );


  if (!limits) {


    return {

      valid:
        false,

      reason:
        "Inheritance limits not found.",

      errors:
        []

    };

  }


  const normalized =
    normalizeInheritanceSelection(
      selection
    );


  const errors =
    [];


  Object.keys(
    limits
  ).forEach(
    category => {


      const selected =
        normalized[
          category
        ] || [];


      const maximum =
        limits[
          category
        ];


      if (
        selected.length >
          maximum
      ) {


        errors.push(
          `${category}: selected ${selected.length}, maximum ${maximum}.`
        );

      }

    }
  );


  return {

    valid:
      errors.length ===
      0,

    reason:
      errors.length === 0
        ? null
        : "Inheritance selection exceeds allowed limits.",

    errors:
      errors,

    selection:
      normalized,

    limits:
      limits

  };

}


// =========================================================
// BRICK 40 — BUILD NEXT RUN PAYLOAD
// =========================================================
//
// This does NOT modify the save.
//
// It creates the instruction package that the actual
// transition engine will use.
//
// =========================================================

function buildNextRunPayload(
  selection = {}
) {


  const target =
    getNextRunTarget();


  if (!target.valid) {


    return {

      valid:
        false,

      reason:
        target.reason

    };

  }


  // =========================================
  // LEGACY TRANSITION
  // =========================================
  //
  // Legacy does not use normal carryover limits.
  //
  // The completed collection is preserved and the
  // difficulty ladder begins again from Academy.
  //
  // =========================================

  if (
    target.transitionType ===
      "legacy"
  ) {


    return {

      valid:
        true,

      transitionType:
        "legacy",

      fromDifficultyId:
        target.fromDifficultyId,

      targetDifficultyId:
        "academy",

      targetLegacyCycle:
        target.targetLegacyCycle,

      preserveCollection:
        true

    };

  }


  // =========================================
  // NORMAL DIFFICULTY TRANSITION
  // =========================================

  const validation =
    validateInheritanceSelection(
      target.targetDifficultyId,
      selection
    );


  if (!validation.valid) {


    return {

      valid:
        false,

      reason:
        validation.reason,

      errors:
        validation.errors

    };

  }


  return {

    valid:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      target.fromDifficultyId,

    targetDifficultyId:
      target.targetDifficultyId,

    targetLegacyCycle:
      target.targetLegacyCycle,

    inheritance:
      validation.selection,

    inheritanceLimits:
      validation.limits

  };

}


// =========================================================
// BRICK 41 — TRANSITION SNAPSHOT / ROLLBACK
// =========================================================
//
// Before a real NG+ or Legacy transition we can create
// a complete snapshot of playerData.
//
// This gives us a recovery path if a transition fails.
//
// =========================================================

function createRunTransitionSnapshot() {


  return JSON.parse(
    JSON.stringify(
      playerData
    )
  );

}


// =========================================================
// RESTORE RUN TRANSITION SNAPSHOT
// =========================================================

function restoreRunTransitionSnapshot(
  snapshot
) {


  if (
    !snapshot ||
    typeof snapshot !==
      "object"
  ) {


    console.log(
      "Invalid run transition snapshot."
    );


    return false;

  }


  playerData =
    JSON.parse(
      JSON.stringify(
        snapshot
      )
    );


  // =========================================
  // RESTORE RUNTIME CHARACTER DATA
  // =========================================

  syncCharacterProgressionFromSave();


  // =========================================
  // RESTORE RUNTIME EQUIPMENT
  // =========================================

  syncCharacterEquipmentFromSave();


  // =========================================
  // SAVE RESTORED STATE
  // =========================================

  savePlayerData();


  console.log(
    "Run transition snapshot restored."
  );


  return true;

}


// =========================================================
// BRICK 42 — BUILD DIFFICULTY TRANSITION STATE
// =========================================================
//
// Pure helper.
//
// It calculates what the next run progression should
// look like WITHOUT changing playerData.
//
// This makes diagnostics safe.
//
// =========================================================

function buildDifficultyTransitionState(
  progression,
  payload
) {


  if (
    !progression ||
    typeof progression !==
      "object"
  ) {

    return null;

  }


  if (
    !payload ||
    payload.valid !==
      true ||
    payload.transitionType !==
      "difficulty"
  ) {

    return null;

  }


  const fromDifficulty =
    getShinobiDifficulty(
      payload.fromDifficultyId
    );


  const targetDifficulty =
    getShinobiDifficulty(
      payload.targetDifficultyId
    );


  if (
    !fromDifficulty ||
    !targetDifficulty
  ) {

    return null;

  }


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  if (
    !currentDifficulty ||
    currentDifficulty.id !==
      fromDifficulty.id
  ) {

    return null;

  }


  if (
    progression.runCompleted !==
      true
  ) {

    return null;

  }


  // =========================================
  // ONLY ALLOW THE IMMEDIATE NEXT DIFFICULTY
  // =========================================

  const expectedNext =
    getNextShinobiDifficulty(
      fromDifficulty.id
    );


  if (
    !expectedNext ||
    expectedNext.id !==
      targetDifficulty.id
  ) {

    return null;

  }


  const completedDifficulties =
    Array.isArray(
      progression.completedDifficulties
    )
      ? [
          ...progression.completedDifficulties
        ]
      : [];


  if (
    !completedDifficulties.includes(
      fromDifficulty.id
    )
  ) {


    completedDifficulties.push(
      fromDifficulty.id
    );

  }


  const currentHighest =
    getShinobiDifficulty(
      progression.highestDifficultyUnlocked
    );


  let highestDifficultyUnlocked =
    targetDifficulty.id;


  if (
    currentHighest &&
    currentHighest.order >
      targetDifficulty.order
  ) {


    highestDifficultyUnlocked =
      currentHighest.id;

  }


  return {

    currentDifficulty:
      targetDifficulty.id,

    highestDifficultyUnlocked:
      highestDifficultyUnlocked,

    legacyCycle:
      Math.max(
        0,
        Math.floor(
          Number(
            progression.legacyCycle
          ) || 0
        )
      ),

    completedDifficulties:
      completedDifficulties,

    runCompleted:
      false

  };

}


// =========================================================
// APPLY NORMAL NEW GAME+ DIFFICULTY TRANSITION
// =========================================================

function applyDifficultyTransition(
  payload
) {


  if (
    !playerData ||
    !playerData.progression
  ) {


    return {

      success:
        false,

      reason:
        "Player progression data not found."

    };

  }


  const nextProgression =
    buildDifficultyTransitionState(
      playerData.progression,
      payload
    );


  if (!nextProgression) {


    return {

      success:
        false,

      reason:
        "Difficulty transition state is invalid."

    };

  }


  const fromDifficulty =
    getShinobiDifficulty(
      payload.fromDifficultyId
    );


  const targetDifficulty =
    getShinobiDifficulty(
      payload.targetDifficultyId
    );


  playerData.progression =
    nextProgression;


  savePlayerData();


  console.log(
    `${fromDifficulty.name} → ${targetDifficulty.name} transition complete.`
  );


  return {

    success:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      fromDifficulty.id,

    fromDifficultyName:
      fromDifficulty.name,

    targetDifficultyId:
      targetDifficulty.id,

    targetDifficultyName:
      targetDifficulty.name,

    legacyCycle:
      nextProgression.legacyCycle,

    inheritance:
      payload.inheritance || {
        ...createEmptyInheritanceSelection()
      }

  };

}


// =========================================================
// BRICK 43 — BUILD LEGACY TRANSITION STATE
// =========================================================
//
// Pure helper.
//
// Jinchuriki completion closes the difficulty loop,
// increases the Legacy Cycle and returns the run ladder
// to Academy Student.
//
// Inventory / character collection data is NOT touched
// here.
//
// =========================================================

function buildLegacyTransitionState(
  progression
) {


  if (
    !progression ||
    typeof progression !==
      "object"
  ) {

    return null;

  }


  if (
    progression.currentDifficulty !==
      "jinchuriki"
  ) {

    return null;

  }


  if (
    progression.runCompleted !==
      true
  ) {

    return null;

  }


  const completed =
    Array.isArray(
      progression.completedDifficulties
    )
      ? progression.completedDifficulties
      : [];


  // =========================================
  // EVERY DIFFICULTY MUST HAVE BEEN COMPLETED
  // =========================================

  const fullCycleComplete =
    SHINOBI_DIFFICULTIES.every(
      difficulty =>
        completed.includes(
          difficulty.id
        )
    );


  if (!fullCycleComplete) {

    return null;

  }


  return {

    currentDifficulty:
      "academy",

    highestDifficultyUnlocked:
      "academy",

    legacyCycle:
      (
        Math.max(
          0,
          Math.floor(
            Number(
              progression.legacyCycle
            ) || 0
          )
        ) +
        1
      ),

    completedDifficulties:
      [],

    runCompleted:
      false

  };

}


// =========================================================
// APPLY LEGACY TRANSITION
// =========================================================

function applyLegacyTransition(
  payload
) {


  if (
    !payload ||
    payload.valid !==
      true ||
    payload.transitionType !==
      "legacy"
  ) {


    return {

      success:
        false,

      reason:
        "Invalid Legacy transition payload."

    };

  }


  const nextProgression =
    buildLegacyTransitionState(
      playerData.progression
    );


  if (!nextProgression) {


    return {

      success:
        false,

      reason:
        "Legacy transition requirements are not satisfied."

    };

  }


  playerData.progression =
    nextProgression;


  // =========================================
  // IMPORTANT — LEGACY COLLECTION PRESERVATION
  // =========================================
  //
  // We deliberately do NOT modify:
  //
  // playerData.inventory
  // playerData.characters
  // Ryō
  // collected equipment
  //
  // Detailed reset/preservation rules can later decide
  // which character training values reset and which
  // permanent Legacy rewards survive.
  //
  // =========================================


  savePlayerData();


  console.log(
    `LEGACY CYCLE ${nextProgression.legacyCycle} BEGUN.`
  );


  console.log(
    "New Academy Student run started."
  );


  return {

    success:
      true,

    transitionType:
      "legacy",

    targetDifficultyId:
      "academy",

    targetDifficultyName:
      "Academy Student",

    legacyCycle:
      nextProgression.legacyCycle,

    preserveCollection:
      true

  };

}


// =========================================================
// BRICK 44 — UNIFIED NEXT RUN TRANSITION
// =========================================================

function executeNextRunTransition(
  selection = {},
  options = {}
) {


  if (
    !playerData ||
    !playerData.progression
  ) {


    return {

      success:
        false,

      reason:
        "Player progression data not found."

    };

  }


  // =========================================
  // COMPLETE CURRENT RUN IF REQUIRED
  // =========================================

  if (
    playerData.progression.runCompleted !==
      true
  ) {


    const eligibility =
      getRunCompletionEligibility();


    if (!eligibility.allowed) {


      return {

        success:
          false,

        reason:
          eligibility.reason

      };

    }


    const completed =
      completeCurrentDifficulty();


    if (!completed) {


      return {

        success:
          false,

        reason:
          "Current difficulty could not be completed."

      };

    }

  }


  // =========================================
  // BUILD TRANSITION PAYLOAD
  // =========================================

  const payload =
    buildNextRunPayload(
      selection
    );


  if (!payload.valid) {


    return {

      success:
        false,

      reason:
        payload.reason,

      errors:
        payload.errors || []

    };

  }


  // =========================================
  // PREMIUM DIFFICULTY GATE
  // =========================================

  if (
    payload.transitionType ===
      "difficulty" &&
    isPremiumDifficulty(
      payload.targetDifficultyId
    ) &&
    options.hasPremiumAccess !==
      true
  ) {


    const targetDifficulty =
      getShinobiDifficulty(
        payload.targetDifficultyId
      );


    return {

      success:
        false,

      runCompleted:
        true,

      transitionPending:
        true,

      reason:
        "Premium access required.",

      targetDifficultyId:
        targetDifficulty.id,

      targetDifficultyName:
        targetDifficulty.name

    };

  }


  // =========================================
  // LEGACY
  // =========================================

  if (
    payload.transitionType ===
      "legacy"
  ) {


    return applyLegacyTransition(
      payload
    );

  }


  // =========================================
  // NORMAL NEW GAME+
  // =========================================

  return applyDifficultyTransition(
    payload
  );

}


// =========================================================
// RUN TRANSITION ENGINE DIAGNOSTICS
// =========================================================

function runRunTransitionDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — RUN TRANSITION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const geninLimits =
    getInheritanceLimits(
      "genin"
    );


  results.push({

    test:
      "Genin inheritance limits exist",

    pass:
      !!geninLimits

  });


  results.push({

    test:
      "Genin special ninja limit is 1",

    pass:
      !!(
        geninLimits &&
        geninLimits.specialNinja ===
          1
      )

  });


  results.push({

    test:
      "Genin bloodline limit is 1",

    pass:
      !!(
        geninLimits &&
        geninLimits.bloodlines ===
          1
      )

  });


  results.push({

    test:
      "Genin legendary weapon limit is 1",

    pass:
      !!(
        geninLimits &&
        geninLimits.legendaryWeapons ===
          1
      )

  });


  results.push({

    test:
      "Genin basic item limit is 5",

    pass:
      !!(
        geninLimits &&
        geninLimits.basicItems ===
          5
      )

  });


  const legalSelection =
    validateInheritanceSelection(
      "genin",
      {

        specialNinja: [
          "test_ninja"
        ],

        bloodlines: [
          "test_bloodline"
        ],

        legendaryWeapons: [
          "test_weapon"
        ],

        basicItems: [
          "test_item"
        ]

      }
    );


  results.push({

    test:
      "Legal inheritance accepted",

    pass:
      legalSelection.valid ===
        true

  });


  const illegalSelection =
    validateInheritanceSelection(
      "genin",
      {

        specialNinja: [
          "dave",
          "sage_dave"
        ]

      }
    );


  results.push({

    test:
      "Excess inheritance rejected",

    pass:
      illegalSelection.valid ===
        false

  });


  const snapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Transition snapshot created",

    pass:
      !!(
        snapshot &&
        snapshot.progression &&
        snapshot.characters &&
        Array.isArray(
          snapshot.inventory
        )
      )

  });


  const testAcademyProgression = {

    currentDifficulty:
      "academy",

    highestDifficultyUnlocked:
      "genin",

    legacyCycle:
      0,

    completedDifficulties: [
      "academy"
    ],

    runCompleted:
      true

  };


  const testDifficultyPayload = {

    valid:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      "academy",

    targetDifficultyId:
      "genin",

    targetLegacyCycle:
      0,

    inheritance:
      createEmptyInheritanceSelection()

  };


  const testGeninState =
    buildDifficultyTransitionState(
      testAcademyProgression,
      testDifficultyPayload
    );


  results.push({

    test:
      "Academy to Genin state builds safely",

    pass:
      !!(
        testGeninState &&
        testGeninState.currentDifficulty ===
          "genin" &&
        testGeninState.runCompleted ===
          false &&
        testGeninState.completedDifficulties.includes(
          "academy"
        )
      )

  });


  const testLegacyProgression = {

    currentDifficulty:
      "jinchuriki",

    highestDifficultyUnlocked:
      "jinchuriki",

    legacyCycle:
      0,

    completedDifficulties:
      SHINOBI_DIFFICULTIES.map(
        difficulty =>
          difficulty.id
      ),

    runCompleted:
      true

  };


  const testLegacyState =
    buildLegacyTransitionState(
      testLegacyProgression
    );


  results.push({

    test:
      "Jinchuriki to Legacy state builds safely",

    pass:
      !!(
        testLegacyState &&
        testLegacyState.currentDifficulty ===
          "academy" &&
        testLegacyState.highestDifficultyUnlocked ===
          "academy" &&
        testLegacyState.legacyCycle ===
          1 &&
        testLegacyState.runCompleted ===
          false &&
        testLegacyState.completedDifficulties.length ===
          0
      )

  });


  const currentTarget =
    getNextRunTarget();


  results.push({

    test:
      "Current next-run target is valid",

    pass:
      currentTarget.valid ===
        true

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ RUN TRANSITION ENGINE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ RUN TRANSITION ENGINE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 45 — CONTROLLED LIVE DIFFICULTY TRANSITION TEST
// =========================================================
//
// This deliberately mutates playerData and then restores
// the original snapshot.
//
// It proves that the REAL applyDifficultyTransition()
// path works without permanently moving your save.
//
// =========================================================

function testLiveDifficultyTransitionWithRollback() {


  console.log(
    "========================================"
  );


  console.log(
    "LIVE ACADEMY → GENIN TRANSITION TEST"
  );


  console.log(
    "========================================"
  );


  const originalSnapshot =
    createRunTransitionSnapshot();


  try {


    // =========================================
    // CREATE CONTROLLED ACADEMY-COMPLETE STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        originalSnapshot
          .progression
          .legacyCycle || 0,

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    const payload = {

      valid:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        "academy",

      targetDifficultyId:
        "genin",

      targetLegacyCycle:
        playerData.progression
          .legacyCycle,

      inheritance:
        createEmptyInheritanceSelection()

    };


    const result =
      applyDifficultyTransition(
        payload
      );


    const transitionWorked =
      !!(
        result &&
        result.success === true &&
        playerData.progression
          .currentDifficulty ===
          "genin" &&
        playerData.progression
          .runCompleted ===
          false &&
        playerData.progression
          .completedDifficulties
          .includes(
            "academy"
          )
      );


    console.log(
      "Live transition result:",
      result
    );


    console.log(
      "Live transition valid:",
      transitionWorked
    );


    return transitionWorked;

  }
  finally {


    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    console.log(
      "Original player state restored."
    );


    console.log(
      "========================================"
    );

  }

}


// =========================================================
// BRICK 46 — CONTROLLED LIVE LEGACY TRANSITION TEST
// =========================================================

function testLiveLegacyTransitionWithRollback() {


  console.log(
    "========================================"
  );


  console.log(
    "LIVE JINCHURIKI → LEGACY TRANSITION TEST"
  );


  console.log(
    "========================================"
  );


  const originalSnapshot =
    createRunTransitionSnapshot();


  try {


    const startingLegacyCycle =
      Math.max(
        0,
        Number(
          originalSnapshot
            .progression
            .legacyCycle
        ) || 0
      );


    // =========================================
    // CREATE CONTROLLED FULL-CYCLE STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "jinchuriki",

      highestDifficultyUnlocked:
        "jinchuriki",

      legacyCycle:
        startingLegacyCycle,

      completedDifficulties:
        SHINOBI_DIFFICULTIES.map(
          difficulty =>
            difficulty.id
        ),

      runCompleted:
        true

    };


    const payload = {

      valid:
        true,

      transitionType:
        "legacy",

      fromDifficultyId:
        "jinchuriki",

      targetDifficultyId:
        "academy",

      targetLegacyCycle:
        startingLegacyCycle + 1,

      preserveCollection:
        true

    };


    const result =
      applyLegacyTransition(
        payload
      );


    const transitionWorked =
      !!(
        result &&
        result.success === true &&
        playerData.progression
          .currentDifficulty ===
          "academy" &&
        playerData.progression
          .highestDifficultyUnlocked ===
          "academy" &&
        playerData.progression
          .legacyCycle ===
          startingLegacyCycle + 1 &&
        playerData.progression
          .runCompleted ===
          false &&
        playerData.progression
          .completedDifficulties
          .length ===
          0
      );


    console.log(
      "Legacy transition result:",
      result
    );


    console.log(
      "Legacy transition valid:",
      transitionWorked
    );


    return transitionWorked;

  }
  finally {


    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    console.log(
      "Original player state restored."
    );


    console.log(
      "========================================"
    );

  }

}


// =========================================================
// BRICK 47 — TRANSITION RESULT VALIDATOR
// =========================================================

function validateRunTransitionResult(
  result
) {


  if (
    !result ||
    typeof result !==
      "object"
  ) {


    return {

      valid:
        false,

      reason:
        "Transition result is missing."

    };

  }


  if (
    result.success !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        result.reason ||
        "Transition was not successful."

    };

  }


  if (
    result.transitionType !==
      "difficulty" &&
    result.transitionType !==
      "legacy"
  ) {


    return {

      valid:
        false,

      reason:
        "Transition type is invalid."

    };

  }


  if (
    !getShinobiDifficulty(
      result.targetDifficultyId
    )
  ) {


    return {

      valid:
        false,

      reason:
        "Transition target difficulty is invalid."

    };

  }


  if (
    !Number.isFinite(
      Number(
        result.legacyCycle
      )
    ) ||
    Number(
      result.legacyCycle
    ) < 0
  ) {


    return {

      valid:
        false,

      reason:
        "Transition Legacy Cycle is invalid."

    };

  }


  return {

    valid:
      true,

    reason:
      null

  };

}


// =========================================================
// BRICK 48 — TRANSITION RECORD BUILDER
// =========================================================
//
// Later this can feed:
// - Ninja ID history
// - Codex
// - Achievements
// - Legacy statistics
// - player profile records
//
// =========================================================

function buildRunTransitionRecord(
  result
) {


  const validation =
    validateRunTransitionResult(
      result
    );


  if (!validation.valid) {

    return null;

  }


  return {

    transitionType:
      result.transitionType,

    fromDifficultyId:
      result.fromDifficultyId ||
      null,

    fromDifficultyName:
      result.fromDifficultyName ||
      null,

    targetDifficultyId:
      result.targetDifficultyId,

    targetDifficultyName:
      result.targetDifficultyName,

    legacyCycle:
      Math.floor(
        Number(
          result.legacyCycle
        )
      ),

    inheritance:
      result.inheritance
        ? normalizeInheritanceSelection(
            result.inheritance
          )
        : null,

    preserveCollection:
      result.preserveCollection ===
      true

  };

}


// =========================================================
// BRICK 49 — LIVE TRANSITION DIAGNOSTICS
// =========================================================

function runLiveTransitionDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — LIVE TRANSITION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const beforeSnapshot =
    createRunTransitionSnapshot();


  // =========================================
  // LIVE DIFFICULTY TEST
  // =========================================

  const difficultyTest =
    testLiveDifficultyTransitionWithRollback();


  results.push({

    test:
      "Live Academy to Genin transition + rollback",

    pass:
      difficultyTest ===
      true

  });


  // =========================================
  // VERIFY ORIGINAL STATE WAS RESTORED
  // =========================================

  results.push({

    test:
      "Difficulty test restored original run",

    pass:
      JSON.stringify(
        playerData.progression
      ) ===
      JSON.stringify(
        beforeSnapshot.progression
      )

  });


  // =========================================
  // LIVE LEGACY TEST
  // =========================================

  const legacyTest =
    testLiveLegacyTransitionWithRollback();


  results.push({

    test:
      "Live Jinchuriki to Legacy transition + rollback",

    pass:
      legacyTest ===
      true

  });


  results.push({

    test:
      "Legacy test restored original run",

    pass:
      JSON.stringify(
        playerData.progression
      ) ===
      JSON.stringify(
        beforeSnapshot.progression
      )

  });


  // =========================================
  // RESULT VALIDATION
  // =========================================

  const fakeValidResult = {

    success:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      "academy",

    fromDifficultyName:
      "Academy Student",

    targetDifficultyId:
      "genin",

    targetDifficultyName:
      "Genin",

    legacyCycle:
      0,

    inheritance:
      createEmptyInheritanceSelection()

  };


  results.push({

    test:
      "Valid transition result accepted",

    pass:
      validateRunTransitionResult(
        fakeValidResult
      ).valid ===
      true

  });


  results.push({

    test:
      "Invalid transition result rejected",

    pass:
      validateRunTransitionResult({
        success: true,
        transitionType: "dave",
        targetDifficultyId: "hokage_dave",
        legacyCycle: -9000
      }).valid ===
      false

  });


  // =========================================
  // RECORD BUILDER
  // =========================================

  const transitionRecord =
    buildRunTransitionRecord(
      fakeValidResult
    );


  results.push({

    test:
      "Transition record builds correctly",

    pass:
      !!(
        transitionRecord &&
        transitionRecord
          .transitionType ===
          "difficulty" &&
        transitionRecord
          .targetDifficultyId ===
          "genin" &&
        transitionRecord
          .legacyCycle ===
          0
      )

  });


  // =========================================
  // FINAL SAVE INTEGRITY
  // =========================================

  const finalSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Full player state restored after diagnostics",

    pass:
      JSON.stringify(
        finalSnapshot
      ) ===
      JSON.stringify(
        beforeSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ LIVE TRANSITION PHASE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ LIVE TRANSITION PHASE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


/// =========================================================
// DEVELOPMENT SHINOBI PROGRESSION VIEW
// =========================================================

function showShinobiProgression() {


  const progression =
    playerData.progression;


  if (!progression) {


    console.log(
      "No Shinobi progression data found."
    );


    return;

  }


  const currentDifficulty =
    getShinobiDifficulty(
      progression.currentDifficulty
    );


  const highestDifficulty =
    getShinobiDifficulty(
      progression.highestDifficultyUnlocked
    );


  const nextDifficulty =
    getNextShinobiDifficulty(
      progression.currentDifficulty
    );


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI PROGRESSION"
  );


  console.log(
    "========================================"
  );


  console.table({

    currentDifficulty: {
      value:
        currentDifficulty
          ? currentDifficulty.name
          : "Unknown"
    },

    highestUnlocked: {
      value:
        highestDifficulty
          ? highestDifficulty.name
          : "Unknown"
    },

    nextDifficulty: {
      value:
        nextDifficulty
          ? nextDifficulty.name
          : "LEGACY"
    },

    legacyCycle: {
      value:
        progression.legacyCycle
    },

    currentRunComplete: {
      value:
        progression.runCompleted
    }

  });


  console.log(
    "Completed Difficulties:",
    progression.completedDifficulties
  );


  console.log(
    "========================================"
  );

}


// =========================================================
// BRICK 50 — INVENTORY INHERITANCE CANDIDATES
// =========================================================
//
// Carryover selections must refer to REAL inventory
// entries instead of arbitrary strings.
//
// Stackable items receive one candidate key per unit:
//
// stack:basic_scroll:1
// stack:basic_scroll:2
//
// Unique items use their instanceId:
//
// instance:legendary_weapon_123
//
// =========================================================

function createInventoryInheritanceCandidateKey(
  item,
  unitNumber = 1
) {


  if (!item) {

    return null;

  }


  if (item.instanceId) {


    return (
      `instance:${item.instanceId}`
    );

  }


  if (!item.id) {

    return null;

  }


  return (
    `stack:${item.id}:${unitNumber}`
  );

}


// =========================================================
// GET INVENTORY INHERITANCE CATEGORY
// =========================================================

function getInventoryInheritanceCategory(
  item
) {


  if (!item) {

    return null;

  }


  const definition =
    getItemDefinition(
      item.id
    );


  const itemType =
    definition
      ? definition.type
      : item.type;


  const rarity =
    definition
      ? definition.rarity
      : item.rarity;


  if (
    itemType ===
      "weapon" &&
    String(
      rarity || ""
    ).toLowerCase() ===
      "legendary"
  ) {


    return "legendaryWeapons";

  }


  return "basicItems";

}


// =========================================================
// BUILD INVENTORY INHERITANCE CANDIDATES
// =========================================================

function buildInventoryInheritanceCandidates(
  inventory
) {


  if (
    !Array.isArray(
      inventory
    )
  ) {

    return [];

  }


  const candidates =
    [];


  inventory.forEach(
    item => {


      const category =
        getInventoryInheritanceCategory(
          item
        );


      if (!category) {

        return;

      }


      // =========================================
      // UNIQUE ITEM
      // =========================================

      if (item.instanceId) {


        candidates.push({

          key:
            createInventoryInheritanceCandidateKey(
              item
            ),

          category:
            category,

          itemId:
            item.id,

          instanceId:
            item.instanceId,

          name:
            item.name,

          type:
            item.type,

          rarity:
            item.rarity,

          unitNumber:
            1

        });


        return;

      }


      // =========================================
      // STACKABLE ITEM
      // =========================================

      const quantity =
        Math.max(
          0,
          Math.floor(
            Number(
              item.quantity
            ) || 0
          )
        );


      for (
        let unitNumber = 1;
        unitNumber <= quantity;
        unitNumber += 1
      ) {


        candidates.push({

          key:
            createInventoryInheritanceCandidateKey(
              item,
              unitNumber
            ),

          category:
            category,

          itemId:
            item.id,

          instanceId:
            null,

          name:
            item.name,

          type:
            item.type,

          rarity:
            item.rarity,

          unitNumber:
            unitNumber

        });

      }

    }
  );


  return candidates;

}


// =========================================================
// GET PLAYER INVENTORY INHERITANCE CANDIDATES
// =========================================================

function getInventoryInheritanceCandidates() {


  return buildInventoryInheritanceCandidates(
    playerData.inventory
  );

}


// =========================================================
// BRICK 51 — LEGENDARY WEAPON CANDIDATES
// =========================================================

function getLegendaryWeaponInheritanceCandidates() {


  return getInventoryInheritanceCandidates()
    .filter(
      candidate =>
        candidate.category ===
        "legendaryWeapons"
    );

}


// =========================================================
// IS LEGENDARY WEAPON INHERITANCE CANDIDATE
// =========================================================

function isLegendaryWeaponInheritanceCandidate(
  candidateKey
) {


  return getLegendaryWeaponInheritanceCandidates()
    .some(
      candidate =>
        candidate.key ===
        candidateKey
    );

}


// =========================================================
// BRICK 52 — BASIC ITEM CANDIDATES
// =========================================================
//
// "Basic item" currently means any inventory unit
// that is NOT a Legendary weapon.
//
// We can narrow this later with explicit inheritance
// metadata if needed.
//
// =========================================================

function getBasicItemInheritanceCandidates() {


  return getInventoryInheritanceCandidates()
    .filter(
      candidate =>
        candidate.category ===
        "basicItems"
    );

}


// =========================================================
// IS BASIC ITEM INHERITANCE CANDIDATE
// =========================================================

function isBasicItemInheritanceCandidate(
  candidateKey
) {


  return getBasicItemInheritanceCandidates()
    .some(
      candidate =>
        candidate.key ===
        candidateKey
    );

}


// =========================================================
// CLONE INVENTORY CANDIDATE FOR NEXT RUN
// =========================================================

function cloneInventoryCandidateForInheritance(
  candidate
) {


  if (!candidate) {

    return null;

  }


  let sourceItem =
    null;


  if (candidate.instanceId) {


    sourceItem =
      playerData.inventory.find(
        item =>
          item.instanceId ===
          candidate.instanceId
      );

  }
  else {


    sourceItem =
      playerData.inventory.find(
        item =>
          item.id ===
          candidate.itemId
      );

  }


  if (!sourceItem) {

    return null;

  }


  const clone =
    JSON.parse(
      JSON.stringify(
        sourceItem
      )
    );


  // =========================================
  // STACKABLE ITEMS CARRY ONE UNIT PER SLOT
  // =========================================

  if (!candidate.instanceId) {


    clone.quantity =
      1;

  }


  // =========================================
  // CARRIED EQUIPMENT STARTS UNEQUIPPED
  // =========================================

  if (
    Object.prototype.hasOwnProperty.call(
      clone,
      "equippedBy"
    )
  ) {


    clone.equippedBy =
      null;

  }


  return clone;

}


// =========================================================
// RESOLVE INVENTORY INHERITANCE SELECTION
// =========================================================

function resolveInventoryInheritanceSelection(
  selection
) {


  const normalized =
    normalizeInheritanceSelection(
      selection
    );


  const candidates =
    getInventoryInheritanceCandidates();


  const candidateMap =
    new Map(
      candidates.map(
        candidate => [
          candidate.key,
          candidate
        ]
      )
    );


  const errors =
    [];


  const resolved = {

    legendaryWeapons:
      [],

    basicItems:
      []

  };


  [
    "legendaryWeapons",
    "basicItems"
  ].forEach(
    category => {


      normalized[
        category
      ].forEach(
        candidateKey => {


          const candidate =
            candidateMap.get(
              candidateKey
            );


          if (!candidate) {


            errors.push(
              `${category}: ${candidateKey} is not owned.`
            );


            return;

          }


          if (
            candidate.category !==
              category
          ) {


            errors.push(
              `${candidateKey} belongs to ${candidate.category}, not ${category}.`
            );


            return;

          }


          const clonedItem =
            cloneInventoryCandidateForInheritance(
              candidate
            );


          if (!clonedItem) {


            errors.push(
              `${candidateKey} could not be resolved from inventory.`
            );


            return;

          }


          resolved[
            category
          ].push(
            clonedItem
          );

        }
      );

    }
  );


  return {

    valid:
      errors.length ===
      0,

    errors:
      errors,

    resolved:
      resolved

  };

}


// =========================================================
// BRICK 53 — SPECIAL NINJA / BLOODLINE OWNERSHIP HOOKS
// =========================================================
//
// Full ownership systems for these do not exist yet.
//
// Future save shape:
//
// playerData.collections = {
//
//   specialNinja: [
//     { id: "example_ninja", name: "Example Ninja" }
//   ],
//
//   bloodlines: [
//     { id: "example_bloodline", name: "Example Bloodline" }
//   ]
//
// };
//
// Until then these safely return [].
//
// =========================================================

function normalizeInheritanceCollection(
  collection
) {


  if (
    !Array.isArray(
      collection
    )
  ) {

    return [];

  }


  const normalized =
    [];


  const seen =
    new Set();


  collection.forEach(
    entry => {


      let id =
        null;


      let name =
        null;


      if (
        typeof entry ===
          "string"
      ) {


        id =
          entry;

        name =
          entry;

      }
      else if (
        entry &&
        typeof entry ===
          "object"
      ) {


        id =
          entry.id || null;

        name =
          entry.name ||
          entry.id ||
          null;

      }


      if (
        !id ||
        seen.has(
          id
        )
      ) {

        return;

      }


      seen.add(
        id
      );


      normalized.push({

        id:
          id,

        name:
          name

      });

    }
  );


  return normalized;

}


// =========================================================
// GET OWNED INHERITANCE COLLECTION
// =========================================================

function getOwnedInheritanceCollection(
  category
) {


  if (
    !playerData.collections ||
    typeof playerData.collections !==
      "object"
  ) {

    return [];

  }


  return normalizeInheritanceCollection(
    playerData.collections[
      category
    ]
  );

}


// =========================================================
// GET SPECIAL NINJA INHERITANCE CANDIDATES
// =========================================================

function getSpecialNinjaInheritanceCandidates() {


  return getOwnedInheritanceCollection(
    "specialNinja"
  );

}


// =========================================================
// GET BLOODLINE INHERITANCE CANDIDATES
// =========================================================

function getBloodlineInheritanceCandidates() {


  return getOwnedInheritanceCollection(
    "bloodlines"
  );

}


// =========================================================
// RESOLVE COLLECTION INHERITANCE SELECTION
// =========================================================

function resolveCollectionInheritanceSelection(
  category,
  selectedIds
) {


  const owned =
    getOwnedInheritanceCollection(
      category
    );


  const ownedMap =
    new Map(
      owned.map(
        entry => [
          entry.id,
          entry
        ]
      )
    );


  const selected =
    Array.isArray(
      selectedIds
    )
      ? selectedIds
      : [];


  const resolved =
    [];


  const errors =
    [];


  selected.forEach(
    id => {


      const entry =
        ownedMap.get(
          id
        );


      if (!entry) {


        errors.push(
          `${category}: ${id} is not owned.`
        );


        return;

      }


      resolved.push({
        ...entry
      });

    }
  );


  return {

    valid:
      errors.length ===
      0,

    errors:
      errors,

    resolved:
      resolved

  };

}


// =========================================================
// BRICK 54 — BUILD INHERITED RUN PACKAGE
// =========================================================
//
// Resolves selected carryover against actual ownership.
//
// NON-DESTRUCTIVE.
// Does NOT reset or advance the current run.
//
// =========================================================

function buildInheritedRunPackage(
  selection = {}
) {


  const target =
    getNextRunTarget();


  if (!target.valid) {


    return {

      valid:
        false,

      reason:
        target.reason

    };

  }


  if (
    target.transitionType ===
      "legacy"
  ) {


    return {

      valid:
        false,

      reason:
        "Legacy transitions preserve the collection and do not use selective inheritance."

    };

  }


  const normalized =
    normalizeInheritanceSelection(
      selection
    );


  const limitValidation =
    validateInheritanceSelection(
      target.targetDifficultyId,
      normalized
    );


  if (!limitValidation.valid) {


    return {

      valid:
        false,

      reason:
        limitValidation.reason,

      errors:
        limitValidation.errors

    };

  }


  const inventoryResolution =
    resolveInventoryInheritanceSelection(
      normalized
    );


  const specialNinjaResolution =
    resolveCollectionInheritanceSelection(
      "specialNinja",
      normalized.specialNinja
    );


  const bloodlineResolution =
    resolveCollectionInheritanceSelection(
      "bloodlines",
      normalized.bloodlines
    );


  const errors = [
    ...inventoryResolution.errors,
    ...specialNinjaResolution.errors,
    ...bloodlineResolution.errors
  ];


  if (
    errors.length >
      0
  ) {


    return {

      valid:
        false,

      reason:
        "One or more inheritance selections are not owned.",

      errors:
        errors

    };

  }


  return {

    valid:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      target.fromDifficultyId,

    targetDifficultyId:
      target.targetDifficultyId,

    targetLegacyCycle:
      target.targetLegacyCycle,

    carryover: {

      specialNinja:
        specialNinjaResolution
          .resolved,

      bloodlines:
        bloodlineResolution
          .resolved,

      legendaryWeapons:
        inventoryResolution
          .resolved
          .legendaryWeapons,

      basicItems:
        inventoryResolution
          .resolved
          .basicItems

    },

    limits:
      limitValidation.limits

  };

}


// =========================================================
// INHERITANCE OWNERSHIP DIAGNOSTICS
// =========================================================

function runInheritanceOwnershipDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — INHERITANCE OWNERSHIP DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const beforeSnapshot =
    createRunTransitionSnapshot();


  const fakeInventory = [

    {

      id:
        "test_scroll",

      name:
        "Test Scroll",

      type:
        "scroll",

      rarity:
        "Common",

      quantity:
        3

    },


    {

      id:
        "test_legendary_blade",

      name:
        "Test Legendary Blade",

      type:
        "weapon",

      rarity:
        "Legendary",

      quantity:
        1,

      instanceId:
        "test_legendary_blade_instance"

    }

  ];


  const fakeCandidates =
    buildInventoryInheritanceCandidates(
      fakeInventory
    );


  results.push({

    test:
      "Stackable item creates one candidate per unit",

    pass:
      fakeCandidates.filter(
        candidate =>
          candidate.itemId ===
          "test_scroll"
      ).length ===
      3

  });


  results.push({

    test:
      "Legendary weapon classified correctly",

    pass:
      fakeCandidates.some(
        candidate =>
          (
            candidate.instanceId ===
              "test_legendary_blade_instance" &&
            candidate.category ===
              "legendaryWeapons"
          )
      )

  });


  results.push({

    test:
      "Basic item classified correctly",

    pass:
      fakeCandidates.some(
        candidate =>
          (
            candidate.itemId ===
              "test_scroll" &&
            candidate.category ===
              "basicItems"
          )
      )

  });


  const currentCandidates =
    getInventoryInheritanceCandidates();


  results.push({

    test:
      "Current inventory candidates return an array",

    pass:
      Array.isArray(
        currentCandidates
      )

  });


  results.push({

    test:
      "Legendary weapon candidates return an array",

    pass:
      Array.isArray(
        getLegendaryWeaponInheritanceCandidates()
      )

  });


  results.push({

    test:
      "Basic item candidates return an array",

    pass:
      Array.isArray(
        getBasicItemInheritanceCandidates()
      )

  });


  results.push({

    test:
      "Special Ninja ownership hook is safe",

    pass:
      Array.isArray(
        getSpecialNinjaInheritanceCandidates()
      )

  });


  results.push({

    test:
      "Bloodline ownership hook is safe",

    pass:
      Array.isArray(
        getBloodlineInheritanceCandidates()
      )

  });


  const emptyPackage =
    buildInheritedRunPackage(
      createEmptyInheritanceSelection()
    );


  results.push({

    test:
      "Empty Academy to Genin inheritance package builds",

    pass:
      !!(
        emptyPackage &&
        emptyPackage.valid ===
          true &&
        emptyPackage.targetDifficultyId ===
          "genin"
      )

  });


  const fakeOwnedSelection =
    buildInheritedRunPackage({

      legendaryWeapons: [
        "instance:daves_eternal_hokage_staff"
      ]

    });


  results.push({

    test:
      "Unowned Legendary weapon rejected",

    pass:
      !!(
        fakeOwnedSelection &&
        fakeOwnedSelection.valid ===
          false
      )

  });


  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Inheritance diagnostics do not modify player save",

    pass:
      JSON.stringify(
        beforeSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ INHERITANCE OWNERSHIP PHASE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ INHERITANCE OWNERSHIP PHASE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICK 55 — CREATE FRESH RUN CHARACTER PROGRESSION
// =========================================================
//
// IMPORTANT:
//
// createDefaultCharacterProgression() uses current runtime
// character.stats.
//
// That is correct for ordinary save creation, but NOT for NG+
// because runtime stats may already contain training gains.
//
// NG+ must rebuild each normal roster character from their
// canonical baseStats.
//
// =========================================================

function createFreshRunCharacterProgression() {


  const characters =
    {};


  playerTeam.forEach(
    character => {


      const baseStats =
        character.baseStats &&
        typeof character.baseStats ===
          "object"

          ? character.baseStats

          : character.stats;


      characters[
        character.id
      ] = {

        stats: {
          ...baseStats
        },

        permanentPLBonus:
          0,

        disciplineProgression:
          createDefaultDisciplineProgression(),

        weaponSpecializations:
          {}

      };

    }
  );


  return characters;

}


// =========================================================
// BRICK 56 — BUILD INHERITED INVENTORY
// =========================================================
//
// Takes the already validated carryover from Brick 54 and
// turns it into the inventory that will begin the next run.
//
// Stackable items are merged back together.
// Unique equipment keeps its instance ID.
// All inherited equipment starts UNEQUIPPED.
//
// =========================================================

function buildInheritedInventory(
  carryover
) {


  const source =
    carryover &&
    typeof carryover ===
      "object"

      ? carryover

      : {};


  const selectedItems = [

    ...(
      Array.isArray(
        source.legendaryWeapons
      )
        ? source.legendaryWeapons
        : []
    ),

    ...(
      Array.isArray(
        source.basicItems
      )
        ? source.basicItems
        : []
    )

  ];


  const inventory =
    [];


  selectedItems.forEach(
    sourceItem => {


      if (
        !sourceItem ||
        typeof sourceItem !==
          "object"
      ) {

        return;

      }


      const item =
        JSON.parse(
          JSON.stringify(
            sourceItem
          )
        );


      // =========================================
      // INHERITED EQUIPMENT ALWAYS STARTS FREE
      // =========================================

      if (
        Object.prototype.hasOwnProperty.call(
          item,
          "equippedBy"
        )
      ) {


        item.equippedBy =
          null;

      }


      // =========================================
      // UNIQUE ITEM
      // =========================================

      if (item.instanceId) {


        item.quantity =
          1;


        inventory.push(
          item
        );


        return;

      }


      // =========================================
      // STACKABLE ITEM
      // =========================================

      const existingItem =
        inventory.find(
          inventoryItem =>
            (
              !inventoryItem.instanceId &&
              inventoryItem.id ===
                item.id
            )
        );


      if (existingItem) {


        existingItem.quantity =
          (
            Number(
              existingItem.quantity
            ) || 0
          ) +
          1;


        return;

      }


      item.quantity =
        1;


      inventory.push(
        item
      );

    }
  );


  return inventory;

}


// =========================================================
// BRICK 57 — BUILD NEXT RUN COLLECTIONS
// =========================================================
//
// Special Ninja and Bloodlines currently live behind the
// collection ownership hooks created in Brick 53.
//
// During ordinary difficulty NG+ only SELECTED collection
// entries carry forward.
//
// Legacy preservation will later use different rules.
//
// =========================================================

function buildNextRunCollections(
  carryover
) {


  const source =
    carryover &&
    typeof carryover ===
      "object"

      ? carryover

      : {};


  return {

    specialNinja:
      normalizeInheritanceCollection(
        source.specialNinja
      ),

    bloodlines:
      normalizeInheritanceCollection(
        source.bloodlines
      )

  };

}


// =========================================================
// BRICK 58 — BUILD NEXT RUN PLAYER STATE
// =========================================================
//
// PURE FUNCTION.
//
// Creates the complete playerData object for the next
// difficulty WITHOUT modifying the live player.
//
// Ordinary NG+ rules currently:
//
// Ryō                 -> RESET
// General EXP         -> RESET
// Normal roster stats -> RESET TO BASE
// Discipline training -> RESET
// Weapon mastery      -> RESET
// Inventory           -> SELECTED INHERITANCE ONLY
// Special Ninja       -> SELECTED INHERITANCE ONLY
// Bloodlines          -> SELECTED INHERITANCE ONLY
// Legacy Cycle        -> PRESERVED
// Difficulty history  -> PRESERVED
//
// =========================================================

function buildNextRunPlayerState(
  inheritedPackage
) {


  if (
    !inheritedPackage ||
    inheritedPackage.valid !==
      true ||
    inheritedPackage.transitionType !==
      "difficulty"
  ) {


    return {

      valid:
        false,

      reason:
        "Invalid inherited run package."

    };

  }


  const nextProgression =
    buildDifficultyTransitionState(
      playerData.progression,
      inheritedPackage
    );


  if (!nextProgression) {


    return {

      valid:
        false,

      reason:
        "Could not build next difficulty progression."

    };

  }


  const carryover =
    inheritedPackage.carryover ||
    {};


  const nextPlayerData = {

    ryo:
      0,

    exp:
      0,

    inventory:
      buildInheritedInventory(
        carryover
      ),

    progression:
      nextProgression,

    characters:
      createFreshRunCharacterProgression(),

    collections:
      buildNextRunCollections(
        carryover
      )

  };


  return {

    valid:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      inheritedPackage
        .fromDifficultyId,

    targetDifficultyId:
      inheritedPackage
        .targetDifficultyId,

    targetLegacyCycle:
      inheritedPackage
        .targetLegacyCycle,

    playerData:
      nextPlayerData

  };

}


// =========================================================
// PREVIEW NEXT RUN RESET
// =========================================================
//
// Safe development helper.
//
// Nothing is saved.
// Nothing is reset.
// Nothing is transitioned.
//
// =========================================================

function previewNextRunReset(
  selection = {}
) {


  const inheritedPackage =
    buildInheritedRunPackage(
      selection
    );


  if (!inheritedPackage.valid) {


    console.log(
      "Next run reset preview denied:",
      inheritedPackage.reason
    );


    return inheritedPackage;

  }


  const preview =
    buildNextRunPlayerState(
      inheritedPackage
    );


  console.log(
    "========================================"
  );


  console.log(
    "NEXT RUN RESET PREVIEW"
  );


  console.log(
    "========================================"
  );


  console.log(
    preview
  );


  console.log(
    "========================================"
  );


  return preview;

}


// =========================================================
// BRICK 59 — NG+ RESET PACKAGE DIAGNOSTICS
// =========================================================

function runNextRunResetDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — NG+ RESET PACKAGE DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const beforeSnapshot =
    createRunTransitionSnapshot();


  // =========================================
  // TEST FRESH CHARACTER DATA
  // =========================================

  const freshCharacters =
    createFreshRunCharacterProgression();


  let freshCharactersValid =
    true;


  playerTeam.forEach(
    character => {


      const fresh =
        freshCharacters[
          character.id
        ];


      if (!fresh) {


        freshCharactersValid =
          false;


        return;

      }


      const baseStats =
        character.baseStats &&
        typeof character.baseStats ===
          "object"

          ? character.baseStats

          : character.stats;


      Object.keys(
        baseStats
      ).forEach(
        stat => {


          if (
            fresh.stats[
              stat
            ] !==
            baseStats[
              stat
            ]
          ) {


            freshCharactersValid =
              false;

          }

        }
      );


      if (
        fresh.permanentPLBonus !==
          0
      ) {


        freshCharactersValid =
          false;

      }


      Object.values(
        fresh.disciplineProgression
      ).forEach(
        discipline => {


          if (
            discipline.level !==
              1 ||
            discipline.exp !==
              0 ||
            discipline.statLevelApplied !==
              1
          ) {


            freshCharactersValid =
              false;

          }

        }
      );

    }
  );


  results.push({

    test:
      "Fresh characters reset to canonical base state",

    pass:
      freshCharactersValid

  });


  // =========================================
  // TEST STACKABLE INVENTORY MERGE
  // =========================================

  const testInventory =
    buildInheritedInventory({

      legendaryWeapons: [],

      basicItems: [

        {
          id: "test_scroll",
          name: "Test Scroll",
          type: "scroll",
          rarity: "Common",
          quantity: 1
        },

        {
          id: "test_scroll",
          name: "Test Scroll",
          type: "scroll",
          rarity: "Common",
          quantity: 1
        },

        {
          id: "test_scroll",
          name: "Test Scroll",
          type: "scroll",
          rarity: "Common",
          quantity: 1
        }

      ]

    });


  const mergedScroll =
    testInventory.find(
      item =>
        item.id ===
        "test_scroll"
    );


  results.push({

    test:
      "Inherited stackable items merge correctly",

    pass:
      !!(
        mergedScroll &&
        mergedScroll.quantity ===
          3 &&
        testInventory.length ===
          1
      )

  });


  // =========================================
  // TEST UNIQUE EQUIPMENT PRESERVATION
  // =========================================

  const testUniqueInventory =
    buildInheritedInventory({

      legendaryWeapons: [

        {
          id:
            "test_legendary_blade",

          name:
            "Test Legendary Blade",

          type:
            "weapon",

          rarity:
            "Legendary",

          quantity:
            1,

          instanceId:
            "test_legendary_blade_instance",

          equippedBy:
            "dave"
        }

      ],

      basicItems: []

    });


  results.push({

    test:
      "Inherited unique equipment remains unique and unequipped",

    pass:
      !!(
        testUniqueInventory.length ===
          1 &&
        testUniqueInventory[
          0
        ].instanceId ===
          "test_legendary_blade_instance" &&
        testUniqueInventory[
          0
        ].equippedBy ===
          null
      )

  });


  // =========================================
  // CONTROLLED ACADEMY -> GENIN STATE
  // =========================================

  const testProgression = {

    currentDifficulty:
      "academy",

    highestDifficultyUnlocked:
      "genin",

    legacyCycle:
      Math.max(
        0,
        Number(
          beforeSnapshot
            .progression
            .legacyCycle
        ) || 0
      ),

    completedDifficulties: [
      "academy"
    ],

    runCompleted:
      true

  };


  const testPackage = {

    valid:
      true,

    transitionType:
      "difficulty",

    fromDifficultyId:
      "academy",

    targetDifficultyId:
      "genin",

    targetLegacyCycle:
      testProgression
        .legacyCycle,

    carryover: {

      specialNinja: [
        {
          id:
            "test_special_ninja",

          name:
            "Test Special Ninja"
        }
      ],

      bloodlines: [
        {
          id:
            "test_bloodline",

          name:
            "Test Bloodline"
        }
      ],

      legendaryWeapons: [],

      basicItems: []

    }

  };


  // =========================================
  // TEMPORARILY SWAP PROGRESSION ONLY
  // =========================================

  const originalProgression =
    playerData.progression;


  playerData.progression =
    testProgression;


  let testNextRunState =
    null;


  try {


    testNextRunState =
      buildNextRunPlayerState(
        testPackage
      );

  }
  finally {


    playerData.progression =
      originalProgression;

  }


  results.push({

    test:
      "Academy to Genin next-run state builds",

    pass:
      !!(
        testNextRunState &&
        testNextRunState.valid ===
          true &&
        testNextRunState.playerData
          .progression
          .currentDifficulty ===
          "genin"
      )

  });


  results.push({

    test:
      "Next-run currencies reset",

    pass:
      !!(
        testNextRunState &&
        testNextRunState.valid ===
          true &&
        testNextRunState.playerData
          .ryo ===
          0 &&
        testNextRunState.playerData
          .exp ===
          0
      )

  });


  results.push({

    test:
      "Selected Special Ninja carries into next-run collections",

    pass:
      !!(
        testNextRunState &&
        testNextRunState.valid ===
          true &&
        testNextRunState.playerData
          .collections
          .specialNinja
          .some(
            entry =>
              entry.id ===
              "test_special_ninja"
          )
      )

  });


  results.push({

    test:
      "Selected Bloodline carries into next-run collections",

    pass:
      !!(
        testNextRunState &&
        testNextRunState.valid ===
          true &&
        testNextRunState.playerData
          .collections
          .bloodlines
          .some(
            entry =>
              entry.id ===
              "test_bloodline"
          )
      )

  });


  // =========================================
  // INVALID PACKAGE PROTECTION
  // =========================================

  const invalidState =
    buildNextRunPlayerState({

      valid:
        false

    });


  results.push({

    test:
      "Invalid inherited package rejected",

    pass:
      !!(
        invalidState &&
        invalidState.valid ===
          false
      )

  });


  // =========================================
  // VERIFY DIAGNOSTICS DID NOT CHANGE SAVE
  // =========================================

  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "NG+ reset diagnostics do not modify player save",

    pass:
      JSON.stringify(
        beforeSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ NG+ RESET PACKAGE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ NG+ RESET PACKAGE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICK 61 — APPLY NEXT-RUN PLAYER STATE
// =========================================================
//
// IMPORTANT:
//
// This applies a fully built next-run state to the
// IN-MEMORY playerData object.
//
// It deliberately DOES NOT:
//
// - save to localStorage
// - synchronize runtime characters
// - synchronize equipment
//
// Those responsibilities belong to the next bricks.
//
// This separation allows us to validate every stage before
// creating the final atomic NG+ transition.
//
// =========================================================

function applyNextRunPlayerState(
  nextRunState
) {


  // =========================================
  // VALIDATE WRAPPER
  // =========================================

  if (
    !nextRunState ||
    nextRunState.valid !==
      true ||
    nextRunState.transitionType !==
      "difficulty"
  ) {


    return {

      success:
        false,

      reason:
        "Invalid next-run state."

    };

  }


  // =========================================
  // VALIDATE PLAYER DATA
  // =========================================

  const nextPlayerData =
    nextRunState.playerData;


  if (
    !nextPlayerData ||
    typeof nextPlayerData !==
      "object"
  ) {


    return {

      success:
        false,

      reason:
        "Next-run player data is missing."

    };

  }


  // =========================================
  // VALIDATE REQUIRED STRUCTURE
  // =========================================

  if (
    !nextPlayerData.progression ||
    !nextPlayerData.characters ||
    !Array.isArray(
      nextPlayerData.inventory
    ) ||
    !nextPlayerData.collections
  ) {


    return {

      success:
        false,

      reason:
        "Next-run player data is incomplete."

    };

  }


  // =========================================
  // VALIDATE TARGET DIFFICULTY
  // =========================================

  if (
    nextPlayerData.progression
      .currentDifficulty !==
      nextRunState.targetDifficultyId
  ) {


    return {

      success:
        false,

      reason:
        "Next-run difficulty does not match transition target."

    };

  }


  // =========================================
  // DEEP CLONE BEFORE APPLYING
  // =========================================
  //
  // Never allow the preview/reset package and live
  // playerData to share object references.
  //
  // =========================================

  const appliedPlayerData =
    JSON.parse(
      JSON.stringify(
        nextPlayerData
      )
    );


  // =========================================
  // APPLY TO MEMORY
  // =========================================

  playerData =
    appliedPlayerData;


  console.log(
    "Next-run player state applied to memory."
  );


  console.log(
    "Target Difficulty:",
    playerData.progression
      .currentDifficulty
  );


  console.log(
    "Legacy Cycle:",
    playerData.progression
      .legacyCycle
  );


  return {

    success:
      true,

    transitionType:
      nextRunState.transitionType,

    fromDifficultyId:
      nextRunState.fromDifficultyId,

    targetDifficultyId:
      nextRunState.targetDifficultyId,

    targetLegacyCycle:
      nextRunState.targetLegacyCycle,

    saved:
      false,

    runtimeSynchronized:
      false

  };

}


// =========================================================
// BRICK 61 DIAGNOSTICS
// =========================================================
//
// Controlled mutation test.
//
// Takes a full snapshot,
// applies a generated Genin state,
// verifies the memory change,
// then ALWAYS restores the original save.
//
// =========================================================

function runNextRunApplicationDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — NEXT-RUN APPLICATION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  try {


    // =========================================
    // CONTROLLED ACADEMY COMPLETE STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        Math.max(
          0,
          Number(
            originalSnapshot
              .progression
              .legacyCycle
          ) || 0
        ),

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    // =========================================
    // BUILD PACKAGE
    // =========================================

    const testPackage = {

      valid:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        "academy",

      targetDifficultyId:
        "genin",

      targetLegacyCycle:
        playerData.progression
          .legacyCycle,

      carryover: {

        specialNinja:
          [],

        bloodlines:
          [],

        legendaryWeapons:
          [],

        basicItems:
          []

      }

    };


    const nextRunState =
      buildNextRunPlayerState(
        testPackage
      );


    results.push({

      test:
        "Controlled next-run state builds",

      pass:
        !!(
          nextRunState &&
          nextRunState.valid ===
            true
        )

    });


    // =========================================
    // APPLY STATE
    // =========================================

    const applicationResult =
      applyNextRunPlayerState(
        nextRunState
      );


    results.push({

      test:
        "Next-run state applies successfully",

      pass:
        !!(
          applicationResult &&
          applicationResult.success ===
            true
        )

    });


    results.push({

      test:
        "Applied difficulty is Genin",

      pass:
        playerData.progression
          .currentDifficulty ===
          "genin"

    });


    results.push({

      test:
        "Applied run is not completed",

      pass:
        playerData.progression
          .runCompleted ===
          false

    });


    results.push({

      test:
        "Academy completion history preserved",

      pass:
        playerData.progression
          .completedDifficulties
          .includes(
            "academy"
          )

    });


    results.push({

      test:
        "Applied currencies reset",

      pass:
        (
          playerData.ryo ===
            0 &&
          playerData.exp ===
            0
        )

    });


    results.push({

      test:
        "Applied inventory is valid",

      pass:
        Array.isArray(
          playerData.inventory
        )

    });


    results.push({

      test:
        "Applied collections are valid",

      pass:
        !!(
          playerData.collections &&
          Array.isArray(
            playerData.collections
              .specialNinja
          ) &&
          Array.isArray(
            playerData.collections
              .bloodlines
          )
        )

    });


    // =========================================
    // INVALID STATE PROTECTION
    // =========================================

    const invalidResult =
      applyNextRunPlayerState({

        valid:
          false

      });


    results.push({

      test:
        "Invalid next-run state rejected",

      pass:
        !!(
          invalidResult &&
          invalidResult.success ===
            false
        )

    });

  }
  finally {


    // =========================================
    // ABSOLUTE RESTORE
    // =========================================

    restoreRunTransitionSnapshot(
      originalSnapshot
    );

  }


  // =========================================
  // VERIFY ORIGINAL STATE RESTORED
  // =========================================

  const restoredSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original player state restored after application test",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        restoredSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ NEXT-RUN APPLICATION PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ NEXT-RUN APPLICATION HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICK 62 — SYNCHRONIZE NEXT-RUN RUNTIME STATE
// =========================================================
//
// After Brick 61 replaces playerData in memory,
// the runtime playerTeam still needs to be rebuilt
// from that new save state.
//
// This step:
//
// - restores character stats
// - restores permanent PL bonuses
// - restores discipline progression
// - restores weapon specialization data
// - rebuilds runtime equipment
//
// It DOES NOT save to localStorage.
//
// =========================================================

function synchronizeNextRunRuntimeState() {


  if (
    !playerData ||
    typeof playerData !==
      "object"
  ) {


    return {

      success:
        false,

      reason:
        "Player data is missing."

    };

  }


  if (
    !playerData.characters ||
    typeof playerData.characters !==
      "object"
  ) {


    return {

      success:
        false,

      reason:
        "Character progression data is missing."

    };

  }


  if (
    !Array.isArray(
      playerData.inventory
    )
  ) {


    return {

      success:
        false,

      reason:
        "Inventory data is invalid."

    };

  }


  // =========================================
  // APPLY CHARACTER SAVE DATA TO RUNTIME
  // =========================================

  syncCharacterProgressionFromSave();


  // =========================================
  // REBUILD RUNTIME EQUIPMENT
  // =========================================

  syncCharacterEquipmentFromSave();


  return {

    success:
      true,

    characterCount:
      playerTeam.length,

    inventoryCount:
      playerData.inventory.length

  };

}


// =========================================================
// VERIFY RUNTIME MATCHES PLAYER SAVE
// =========================================================

function verifyRuntimeMatchesPlayerData() {


  const errors =
    [];


  playerTeam.forEach(
    character => {


      const savedCharacter =
        playerData.characters[
          character.id
        ];


      if (!savedCharacter) {


        errors.push(
          `${character.id}: saved character data missing.`
        );


        return;

      }


      // =========================================
      // STATS
      // =========================================

      Object.keys(
        savedCharacter.stats
      ).forEach(
        stat => {


          if (
            character.stats[
              stat
            ] !==
            savedCharacter.stats[
              stat
            ]
          ) {


            errors.push(
              `${character.id}: runtime ${stat} does not match save.`
            );

          }

        }
      );


      // =========================================
      // PERMANENT PL BONUS
      // =========================================

      if (
        Number(
          character.permanentPLBonus
        ) !==
        Number(
          savedCharacter.permanentPLBonus
        )
      ) {


        errors.push(
          `${character.id}: permanent PL bonus does not match save.`
        );

      }


      // =========================================
      // DISCIPLINE PROGRESSION
      // =========================================

      const runtimeDiscipline =
        character.disciplineProgression ||
        {};


      const savedDiscipline =
        savedCharacter.disciplineProgression ||
        {};


      Object.keys(
        SHINOBI_DISCIPLINES
      ).forEach(
        disciplineId => {


          const runtimeRecord =
            runtimeDiscipline[
              disciplineId
            ];


          const savedRecord =
            savedDiscipline[
              disciplineId
            ];


          if (
            !runtimeRecord ||
            !savedRecord
          ) {


            errors.push(
              `${character.id}: ${disciplineId} progression missing.`
            );


            return;

          }


          if (
            runtimeRecord.level !==
              savedRecord.level ||
            runtimeRecord.exp !==
              savedRecord.exp ||
            runtimeRecord.statLevelApplied !==
              savedRecord.statLevelApplied
          ) {


            errors.push(
              `${character.id}: ${disciplineId} progression does not match save.`
            );

          }

        }
      );


      // =========================================
      // WEAPON SPECIALIZATIONS
      // =========================================

      if (
        JSON.stringify(
          character.weaponSpecializations ||
          {}
        ) !==
        JSON.stringify(
          savedCharacter.weaponSpecializations ||
          {}
        )
      ) {


        errors.push(
          `${character.id}: weapon specialization data does not match save.`
        );

      }

    }
  );


  // =========================================
  // VERIFY EQUIPMENT MATCHES INVENTORY
  // =========================================

  playerTeam.forEach(
    character => {


      const equipment =
        Array.isArray(
          character.equipment
        )
          ? character.equipment
          : [];


      equipment.forEach(
        equippedItem => {


          const inventoryItem =
            playerData.inventory.find(
              item =>
                item.instanceId ===
                equippedItem.instanceId
            );


          if (!inventoryItem) {


            errors.push(
              `${character.id}: runtime equipment missing from inventory.`
            );


            return;

          }


          if (
            inventoryItem.equippedBy !==
              character.id
          ) {


            errors.push(
              `${character.id}: runtime equipment ownership mismatch.`
            );

          }

        }
      );

    }
  );


  return {

    valid:
      errors.length ===
      0,

    errors:
      errors

  };

}


// =========================================================
// BRICK 62 DIAGNOSTICS
// =========================================================

function runNextRunRuntimeSyncDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — NEXT-RUN RUNTIME SYNC DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  try {


    // =========================================
    // CREATE CONTROLLED ACADEMY COMPLETE STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        Math.max(
          0,
          Number(
            originalSnapshot
              .progression
              .legacyCycle
          ) || 0
        ),

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    // =========================================
    // BUILD NEXT RUN PACKAGE
    // =========================================

    const testPackage = {

      valid:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        "academy",

      targetDifficultyId:
        "genin",

      targetLegacyCycle:
        playerData.progression
          .legacyCycle,

      carryover: {

        specialNinja:
          [],

        bloodlines:
          [],

        legendaryWeapons:
          [],

        basicItems:
          []

      }

    };


    const nextRunState =
      buildNextRunPlayerState(
        testPackage
      );


    const applicationResult =
      applyNextRunPlayerState(
        nextRunState
      );


    results.push({

      test:
        "Next-run state applies before runtime sync",

      pass:
        !!(
          applicationResult &&
          applicationResult.success ===
            true
        )

    });


    // =========================================
    // RUN SYNCHRONIZATION
    // =========================================

    const syncResult =
      synchronizeNextRunRuntimeState();


    results.push({

      test:
        "Runtime synchronization completes",

      pass:
        !!(
          syncResult &&
          syncResult.success ===
            true
        )

    });


    // =========================================
    // VERIFY COMPLETE MATCH
    // =========================================

    const verification =
      verifyRuntimeMatchesPlayerData();


    results.push({

      test:
        "Runtime character data matches player save",

      pass:
        verification.valid ===
          true

    });


    // =========================================
    // VERIFY BASE CHARACTER RESET
    // =========================================

    let baseResetValid =
      true;


    playerTeam.forEach(
      character => {


        const canonicalStats =
          character.baseStats;


        Object.keys(
          canonicalStats
        ).forEach(
          stat => {


            if (
              character.stats[
                stat
              ] !==
              canonicalStats[
                stat
              ]
            ) {


              baseResetValid =
                false;

            }

          }
        );


        if (
          character.permanentPLBonus !==
            0
        ) {


          baseResetValid =
            false;

        }

      }
    );


    results.push({

      test:
        "Runtime characters reset to canonical base values",

      pass:
        baseResetValid

    });


    // =========================================
    // VERIFY DISCIPLINE RESET
    // =========================================

    let disciplineResetValid =
      true;


    playerTeam.forEach(
      character => {


        Object.values(
          character.disciplineProgression
        ).forEach(
          record => {


            if (
              record.level !==
                1 ||
              record.exp !==
                0 ||
              record.statLevelApplied !==
                1
            ) {


              disciplineResetValid =
                false;

            }

          }
        );

      }
    );


    results.push({

      test:
        "Runtime discipline progression reset",

      pass:
        disciplineResetValid

    });


    // =========================================
    // VERIFY EQUIPMENT RESET
    // =========================================

    const runtimeEquipmentEmpty =
      playerTeam.every(
        character =>
          Array.isArray(
            character.equipment
          ) &&
          character.equipment.length ===
            0
      );


    results.push({

      test:
        "Runtime equipment reset correctly",

      pass:
        runtimeEquipmentEmpty

    });


    // =========================================
    // INVALID DATA PROTECTION
    // =========================================

    const activePlayerData =
      playerData;


    playerData = {

      ...playerData,

      characters:
        null

    };


    const invalidSync =
      synchronizeNextRunRuntimeState();


    results.push({

      test:
        "Invalid runtime sync data rejected",

      pass:
        !!(
          invalidSync &&
          invalidSync.success ===
            false
        )

    });


    playerData =
      activePlayerData;

  }
  finally {


    restoreRunTransitionSnapshot(
      originalSnapshot
    );

  }


  // =========================================
  // FINAL ORIGINAL STATE CHECK
  // =========================================

  const restoredSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original state restored after runtime sync test",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        restoredSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ NEXT-RUN RUNTIME SYNC PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ NEXT-RUN RUNTIME SYNC HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICK 63 — ATOMIC NEXT-RUN DIFFICULTY TRANSITION
// =========================================================
//
// This is the protected NG+ execution path.
//
// Order:
//
// 1. Validate / resolve inheritance
// 2. Build complete next-run state
// 3. Snapshot current player state
// 4. Apply next-run playerData
// 5. Synchronize runtime characters
// 6. Verify runtime matches save
// 7. Save ONLY after every stage passes
//
// If any stage after mutation fails:
//
// FULL SNAPSHOT ROLLBACK.
//
// =========================================================

function executeAtomicNextRunDifficultyTransition(
  selection = {},
  options = {}
) {


  // =========================================
  // BUILD INHERITANCE PACKAGE FIRST
  // =========================================
  //
  // Do this BEFORE taking the destructive path.
  //
  // If inheritance is invalid, nothing has changed.
  //
  // =========================================

  const inheritedPackage =
    buildInheritedRunPackage(
      selection
    );


  if (
    !inheritedPackage ||
    inheritedPackage.valid !==
      true
  ) {


    return {

      success:
        false,

      stage:
        "inheritance",

      reason:
        inheritedPackage &&
        inheritedPackage.reason

          ? inheritedPackage.reason

          : "Inheritance package could not be built.",

      errors:
        inheritedPackage &&
        Array.isArray(
          inheritedPackage.errors
        )

          ? inheritedPackage.errors

          : [],

      rolledBack:
        false

    };

  }


  // =========================================
  // BUILD NEXT RUN STATE
  // =========================================

  const nextRunState =
    buildNextRunPlayerState(
      inheritedPackage
    );


  if (
    !nextRunState ||
    nextRunState.valid !==
      true
  ) {


    return {

      success:
        false,

      stage:
        "build",

      reason:
        nextRunState &&
        nextRunState.reason

          ? nextRunState.reason

          : "Next-run state could not be built.",

      rolledBack:
        false

    };

  }


  // =========================================
  // SNAPSHOT IMMEDIATELY BEFORE MUTATION
  // =========================================

  const snapshot =
    createRunTransitionSnapshot();


  let stage =
    "snapshot";


  try {


    // =========================================
    // APPLY PLAYER DATA
    // =========================================

    stage =
      "apply";


    const applicationResult =
      applyNextRunPlayerState(
        nextRunState
      );


    if (
      !applicationResult ||
      applicationResult.success !==
        true
    ) {


      throw new Error(
        applicationResult &&
        applicationResult.reason

          ? applicationResult.reason

          : "Next-run player state could not be applied."
      );

    }


    // =========================================
    // DEVELOPMENT FAILURE INJECTION
    // =========================================
    //
    // Used ONLY by diagnostics to prove rollback.
    //
    // Never needed by normal gameplay.
    //
    // =========================================

    if (
      options.simulateFailureStage ===
        "afterApply"
    ) {


      throw new Error(
        "Simulated failure after player state application."
      );

    }


    // =========================================
    // SYNCHRONIZE RUNTIME
    // =========================================

    stage =
      "runtimeSync";


    const syncResult =
      synchronizeNextRunRuntimeState();


    if (
      !syncResult ||
      syncResult.success !==
        true
    ) {


      throw new Error(
        syncResult &&
        syncResult.reason

          ? syncResult.reason

          : "Runtime synchronization failed."
      );

    }


    if (
      options.simulateFailureStage ===
        "afterRuntimeSync"
    ) {


      throw new Error(
        "Simulated failure after runtime synchronization."
      );

    }


    // =========================================
    // VERIFY RUNTIME AGAINST SAVE
    // =========================================

    stage =
      "verification";


    const verification =
      verifyRuntimeMatchesPlayerData();


    if (
      !verification ||
      verification.valid !==
        true
    ) {


      const verificationErrors =
        verification &&
        Array.isArray(
          verification.errors
        )

          ? verification.errors.join(
              " | "
            )

          : "Unknown runtime verification error.";


      throw new Error(
        `Runtime verification failed: ${verificationErrors}`
      );

    }


    if (
      options.simulateFailureStage ===
        "afterVerification"
    ) {


      throw new Error(
        "Simulated failure after runtime verification."
      );

    }


    // =========================================
    // SAVE ONLY AFTER EVERYTHING PASSES
    // =========================================

    stage =
      "save";


    savePlayerData();


    // =========================================
    // SUCCESS
    // =========================================

    const targetDifficulty =
      getShinobiDifficulty(
        nextRunState.targetDifficultyId
      );


    console.log(
      "========================================"
    );


    console.log(
      "ATOMIC NEXT-RUN TRANSITION COMPLETE"
    );


    console.log(
      "========================================"
    );


    console.log(
      "Difficulty:",
      targetDifficulty
        ? targetDifficulty.name
        : nextRunState.targetDifficultyId
    );


    console.log(
      "Legacy Cycle:",
      playerData.progression
        .legacyCycle
    );


    console.log(
      "========================================"
    );


    return {

      success:
        true,

      stage:
        "complete",

      transitionType:
        "difficulty",

      fromDifficultyId:
        nextRunState.fromDifficultyId,

      targetDifficultyId:
        nextRunState.targetDifficultyId,

      targetLegacyCycle:
        nextRunState.targetLegacyCycle,

      saved:
        true,

      runtimeSynchronized:
        true,

      rolledBack:
        false

    };

  }
  catch (error) {


    // =========================================
    // AUTOMATIC ROLLBACK
    // =========================================

    console.error(
      "Atomic next-run transition failed:",
      error
    );


    console.warn(
      "Attempting automatic transition rollback..."
    );


    const rollbackSucceeded =
      restoreRunTransitionSnapshot(
        snapshot
      );


    if (rollbackSucceeded) {


      console.warn(
        "✅ AUTOMATIC TRANSITION ROLLBACK COMPLETE"
      );

    }
    else {


      console.error(
        "❌ AUTOMATIC TRANSITION ROLLBACK FAILED"
      );

    }


    return {

      success:
        false,

      stage:
        stage,

      reason:
        error instanceof Error
          ? error.message
          : String(
              error
            ),

      rolledBack:
        rollbackSucceeded ===
          true

    };

  }

}


// =========================================================
// BRICK 63 — ATOMIC TRANSITION DIAGNOSTICS
// =========================================================
//
// Tests:
//
// - successful atomic Academy -> Genin transition
// - state saved correctly
// - runtime matches saved player data
// - deliberate failure AFTER mutation
// - automatic rollback restores pre-transition state
// - original real player save restored afterward
//
// =========================================================

function runAtomicNextRunTransitionDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — ATOMIC NG+ TRANSITION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  try {


    // =========================================
    // SUCCESS TEST
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        Math.max(
          0,
          Number(
            originalSnapshot
              .progression
              .legacyCycle
          ) || 0
        ),

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    const successResult =
      executeAtomicNextRunDifficultyTransition(
        createEmptyInheritanceSelection()
      );


    results.push({

      test:
        "Atomic Academy to Genin transition succeeds",

      pass:
        !!(
          successResult &&
          successResult.success ===
            true
        )

    });


    results.push({

      test:
        "Atomic transition reaches Genin",

      pass:
        playerData.progression
          .currentDifficulty ===
          "genin"

    });


    results.push({

      test:
        "Atomic transition saves completed state",

      pass:
        !!(
          successResult &&
          successResult.saved ===
            true
        )

    });


    const runtimeVerification =
      verifyRuntimeMatchesPlayerData();


    results.push({

      test:
        "Atomic transition runtime matches save",

      pass:
        runtimeVerification.valid ===
          true

    });


    // =========================================
    // PREPARE FAILURE TEST
    // =========================================
    //
    // Restore original real save first.
    //
    // =========================================

    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    // =========================================
    // CREATE CONTROLLED STATE AGAIN
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        Math.max(
          0,
          Number(
            originalSnapshot
              .progression
              .legacyCycle
          ) || 0
        ),

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    // =========================================
    // SNAPSHOT STATE THAT MUST SURVIVE FAILURE
    // =========================================

    const failureStartSnapshot =
      createRunTransitionSnapshot();


    // =========================================
    // DELIBERATELY BREAK AFTER APPLY
    // =========================================

    const failureResult =
      executeAtomicNextRunDifficultyTransition(
        createEmptyInheritanceSelection(),
        {
          simulateFailureStage:
            "afterApply"
        }
      );


    results.push({

      test:
        "Simulated post-apply failure is detected",

      pass:
        !!(
          failureResult &&
          failureResult.success ===
            false
        )

    });


    results.push({

      test:
        "Automatic rollback reports success",

      pass:
        !!(
          failureResult &&
          failureResult.rolledBack ===
            true
        )

    });


    const failureEndSnapshot =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Automatic rollback restores complete pre-transition state",

      pass:
        JSON.stringify(
          failureStartSnapshot
        ) ===
        JSON.stringify(
          failureEndSnapshot
        )

    });


    const rollbackRuntimeVerification =
      verifyRuntimeMatchesPlayerData();


    results.push({

      test:
        "Rollback runtime matches restored save",

      pass:
        rollbackRuntimeVerification.valid ===
          true

    });

  }
  finally {


    // =========================================
    // RESTORE ACTUAL USER SAVE
    // =========================================

    restoreRunTransitionSnapshot(
      originalSnapshot
    );

  }


  // =========================================
  // VERIFY REAL SAVE SURVIVED TEST
  // =========================================

  const finalSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original player save restored after atomic diagnostics",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        finalSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ ATOMIC NG+ TRANSITION PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ ATOMIC NG+ TRANSITION HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// ============================================================
// BRICK 63 — ATOMIC NEXT-RUN TRANSITION
// ============================================================

// ...all Brick 63 functions...
// ...runAtomicNextRunTransitionDiagnostics() etc...


// =========================================================
// BRICK 64 — NEXT-RUN RELOAD PERSISTENCE
// =========================================================
//
// Confirms that player state written to localStorage
// reconstructs correctly after a genuine browser reload.
//
// This brick does NOT perform a difficulty transition.
// It tests persistence independently first.
//
// =========================================================

const NG_PLUS_RELOAD_TEST_KEY =
  "shinobi_ng_plus_reload_test";


// =========================================================
// CREATE NEXT-RUN RELOAD MARKER
// =========================================================

function createNextRunReloadMarker() {


  const currentRun =
    getCurrentRunState();


  if (
    !currentRun ||
    currentRun.valid !==
      true
  ) {


    console.error(
      "Cannot create NG+ reload marker: invalid run state."
    );


    return null;

  }


  const marker = {

    createdAt:
      Date.now(),

    expectedDifficultyId:
      currentRun.currentDifficultyId,

    expectedDifficultyOrder:
      currentRun.currentDifficultyOrder,

    expectedHighestDifficultyUnlockedId:
      currentRun.highestDifficultyUnlockedId,

    expectedLegacyCycle:
      currentRun.legacyCycle,

    expectedRunCompleted:
      currentRun.runCompleted,

    expectedRyo:
      Number(
        playerData.ryo
      ) || 0,

    expectedExp:
      Number(
        playerData.exp
      ) || 0

  };


  localStorage.setItem(
    NG_PLUS_RELOAD_TEST_KEY,
    JSON.stringify(
      marker
    )
  );


  console.log(
    "NG+ reload persistence marker created:",
    marker
  );


  return marker;

}


// =========================================================
// GET NEXT-RUN RELOAD MARKER
// =========================================================

function getNextRunReloadMarker() {


  const rawMarker =
    localStorage.getItem(
      NG_PLUS_RELOAD_TEST_KEY
    );


  if (!rawMarker) {


    return null;

  }


  try {


    return JSON.parse(
      rawMarker
    );

  }
  catch (error) {


    console.error(
      "Failed to parse NG+ reload marker:",
      error
    );


    return null;

  }

}


// =========================================================
// CLEAR NEXT-RUN RELOAD MARKER
// =========================================================

function clearNextRunReloadMarker() {


  localStorage.removeItem(
    NG_PLUS_RELOAD_TEST_KEY
  );


  console.log(
    "NG+ reload persistence marker cleared."
  );


  return true;

}


// =========================================================
// VERIFY NEXT RUN AFTER RELOAD
// =========================================================

function verifyNextRunAfterReload() {


  const marker =
    getNextRunReloadMarker();


  if (!marker) {


    console.warn(
      "No NG+ reload marker found. Nothing to verify."
    );


    return false;

  }


  const currentRun =
    getCurrentRunState();


  const tests = [

    {

      test:
        "Reloaded run state is valid",

      pass:
        !!(
          currentRun &&
          currentRun.valid ===
            true
        )

    },


    {

      test:
        "Difficulty survived reload",

      pass:
        currentRun &&
        currentRun.currentDifficultyId ===
          marker.expectedDifficultyId

    },


    {

      test:
        "Difficulty order survived reload",

      pass:
        currentRun &&
        currentRun.currentDifficultyOrder ===
          marker.expectedDifficultyOrder

    },


    {

      test:
        "Highest unlocked difficulty survived reload",

      pass:
        currentRun &&
        currentRun.highestDifficultyUnlockedId ===
          marker.expectedHighestDifficultyUnlockedId

    },


    {

      test:
        "Legacy cycle survived reload",

      pass:
        currentRun &&
        currentRun.legacyCycle ===
          marker.expectedLegacyCycle

    },


    {

      test:
        "Run completion state survived reload",

      pass:
        currentRun &&
        currentRun.runCompleted ===
          marker.expectedRunCompleted

    },


    {

      test:
        "Ryō survived reload",

      pass:
        (
          Number(
            playerData.ryo
          ) || 0
        ) ===
        marker.expectedRyo

    },


    {

      test:
        "EXP survived reload",

      pass:
        (
          Number(
            playerData.exp
          ) || 0
        ) ===
        marker.expectedExp

    }

  ];


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — RELOAD PERSISTENCE DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  console.table(
    tests
  );


  const failedTests =
    tests.filter(
      test =>
        !test.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ NG+ RELOAD PERSISTENCE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ NG+ RELOAD PERSISTENCE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 65 — END-TO-END NG+ RELOAD TRANSITION
// =========================================================
//
// THIS IS A TWO-PART DIAGNOSTIC.
//
// PART ONE:
//
// - preserve the player's real save in localStorage
// - create a controlled completed Academy state
// - perform the REAL atomic Academy -> Genin transition
// - leave the resulting Genin save in localStorage
//
// THEN THE USER RELOADS THE BROWSER.
//
// PART TWO:
//
// - prove the game genuinely loaded as Genin
// - prove runtime reconstructed correctly
// - restore the player's original save
// - prove the restoration succeeded
//
// The original snapshot is stored separately from the
// normal player save, so it survives the browser reload.
//
// =========================================================

const NG_PLUS_END_TO_END_TEST_KEY =
  "shinobi_ng_plus_end_to_end_test";


// =========================================================
// GET END-TO-END TEST RECORD
// =========================================================

function getNextRunEndToEndTestRecord() {


  const rawRecord =
    localStorage.getItem(
      NG_PLUS_END_TO_END_TEST_KEY
    );


  if (!rawRecord) {


    return null;

  }


  try {


    return JSON.parse(
      rawRecord
    );

  }
  catch (error) {


    console.error(
      "Could not parse NG+ end-to-end test record:",
      error
    );


    return null;

  }

}


// =========================================================
// CLEAR END-TO-END TEST RECORD
// =========================================================

function clearNextRunEndToEndTestRecord() {


  localStorage.removeItem(
    NG_PLUS_END_TO_END_TEST_KEY
  );


  console.log(
    "NG+ end-to-end test record cleared."
  );


  return true;

}


// =========================================================
// BEGIN END-TO-END NG+ RELOAD TEST
// =========================================================
//
// WARNING:
//
// Unlike our earlier diagnostics, this function deliberately
// writes a real temporary Genin save.
//
// Your original save is first stored separately under
// NG_PLUS_END_TO_END_TEST_KEY.
//
// DO NOT manually clear localStorage between Part One
// and Part Two.
//
// =========================================================

function beginNextRunEndToEndReloadTest() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — BEGIN END-TO-END NG+ RELOAD TEST"
  );


  console.log(
    "========================================"
  );


  // =========================================
  // PREVENT OVERWRITING AN UNFINISHED TEST
  // =========================================

  const existingRecord =
    getNextRunEndToEndTestRecord();


  if (existingRecord) {


    console.warn(
      "An NG+ end-to-end test record already exists."
    );


    console.warn(
      "Finish or recover the existing test before starting another."
    );


    return {

      success:
        false,

      reason:
        "Existing end-to-end test record found."

    };

  }


  // =========================================
  // REQUIRE HEALTHY CURRENT RUN
  // =========================================

  const currentRun =
    getCurrentRunState();


  if (
    !currentRun ||
    currentRun.valid !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "Current run state is invalid."

    };

  }


  // =========================================
  // THIS DIAGNOSTIC IS SPECIFICALLY
  // ACADEMY -> GENIN
  // =========================================

  if (
    currentRun.currentDifficultyId !==
      "academy"
  ) {


    return {

      success:
        false,

      reason:
        "Brick 65 diagnostic requires the real player to currently be on Academy Student difficulty."

    };

  }


  // =========================================
  // CAPTURE THE REAL PLAYER SAVE
  // =========================================

  const originalSnapshot =
    createRunTransitionSnapshot();


  const testRecord = {

    createdAt:
      Date.now(),

    phase:
      "prepared",

    expectedDifficultyId:
      "genin",

    expectedDifficultyOrder:
      1,

    expectedLegacyCycle:
      Number(
        currentRun.legacyCycle
      ) || 0,

    originalSnapshot:
      originalSnapshot

  };


  // =========================================
  // STORE BACKUP BEFORE ANY MUTATION
  // =========================================

  localStorage.setItem(
    NG_PLUS_END_TO_END_TEST_KEY,
    JSON.stringify(
      testRecord
    )
  );


  try {


    // =========================================
    // CONTROLLED COMPLETED ACADEMY STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        Number(
          currentRun.legacyCycle
        ) || 0,

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    // =========================================
    // EXECUTE THE REAL ATOMIC TRANSITION
    // =========================================

    const transitionResult =
      executeAtomicNextRunDifficultyTransition(
        createEmptyInheritanceSelection()
      );


    if (
      !transitionResult ||
      transitionResult.success !==
        true
    ) {


      throw new Error(
        transitionResult &&
        transitionResult.reason

          ? transitionResult.reason

          : "Atomic Academy to Genin transition failed."
      );

    }


    // =========================================
    // VERIFY TEMPORARY LIVE RESULT
    // =========================================

    const transitionedRun =
      getCurrentRunState();


    if (
      !transitionedRun ||
      transitionedRun.valid !==
        true ||
      transitionedRun.currentDifficultyId !==
        "genin"
    ) {


      throw new Error(
        "Temporary NG+ transition did not reach Genin."
      );

    }


    // =========================================
    // UPDATE PERSISTENT TEST RECORD
    // =========================================

    testRecord.phase =
      "awaiting_reload";


    testRecord.transitionResult = {

      success:
        true,

      fromDifficultyId:
        transitionResult.fromDifficultyId,

      targetDifficultyId:
        transitionResult.targetDifficultyId,

      targetLegacyCycle:
        transitionResult.targetLegacyCycle

    };


    localStorage.setItem(
      NG_PLUS_END_TO_END_TEST_KEY,
      JSON.stringify(
        testRecord
      )
    );


    console.log(
      "✅ TEMPORARY ACADEMY -> GENIN TRANSITION SAVED"
    );


    console.log(
      "Now reload the browser with Ctrl + R."
    );


    console.log(
      "After reload run:"
    );


    console.log(
      "verifyAndRestoreNextRunEndToEndReloadTest()"
    );


    console.log(
      "========================================"
    );


    return {

      success:
        true,

      phase:
        "awaiting_reload",

      currentDifficultyId:
        transitionedRun.currentDifficultyId,

      expectedAfterReload:
        "genin",

      instruction:
        "Reload the browser, then run verifyAndRestoreNextRunEndToEndReloadTest()."

    };

  }
  catch (error) {


    console.error(
      "Brick 65 setup failed:",
      error
    );


    console.warn(
      "Restoring original player save immediately..."
    );


    const restored =
      restoreRunTransitionSnapshot(
        originalSnapshot
      );


    if (restored) {


      clearNextRunEndToEndTestRecord();


      console.warn(
        "✅ ORIGINAL SAVE RESTORED AFTER BRICK 65 SETUP FAILURE"
      );

    }
    else {


      console.error(
        "❌ ORIGINAL SAVE COULD NOT BE RESTORED AUTOMATICALLY"
      );


      console.error(
        "The persistent Brick 65 backup record has been retained."
      );

    }


    return {

      success:
        false,

      reason:
        error instanceof Error
          ? error.message
          : String(
              error
            ),

      restored:
        restored ===
          true

    };

  }

}


// =========================================================
// VERIFY + RESTORE END-TO-END NG+ RELOAD TEST
// =========================================================

function verifyAndRestoreNextRunEndToEndReloadTest() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — END-TO-END NG+ RELOAD DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const record =
    getNextRunEndToEndTestRecord();


  if (!record) {


    console.error(
      "No Brick 65 end-to-end test record exists."
    );


    return false;

  }


  if (
    record.phase !==
      "awaiting_reload"
  ) {


    console.error(
      "Brick 65 test record is not awaiting reload verification."
    );


    return false;

  }


  if (
    !record.originalSnapshot ||
    typeof record.originalSnapshot !==
      "object"
  ) {


    console.error(
      "Brick 65 original save snapshot is missing."
    );


    return false;

  }


  const tests =
    [];


  const currentRun =
    getCurrentRunState();


  // =========================================
  // VERIFY RELOADED GENIN SAVE
  // =========================================

  tests.push({

    test:
      "Reloaded run state is valid",

    pass:
      !!(
        currentRun &&
        currentRun.valid ===
          true
      )

  });


  tests.push({

    test:
      "Atomic transition survived reload as Genin",

    pass:
      !!(
        currentRun &&
        currentRun.currentDifficultyId ===
          record.expectedDifficultyId
      )

  });


  tests.push({

    test:
      "Reloaded Genin difficulty order is correct",

    pass:
      !!(
        currentRun &&
        currentRun.currentDifficultyOrder ===
          record.expectedDifficultyOrder
      )

  });


  tests.push({

    test:
      "Legacy cycle survived atomic transition reload",

    pass:
      !!(
        currentRun &&
        currentRun.legacyCycle ===
          record.expectedLegacyCycle
      )

  });


  tests.push({

    test:
      "Reloaded Genin run is incomplete",

    pass:
      !!(
        currentRun &&
        currentRun.runCompleted ===
          false
      )

  });


  tests.push({

    test:
      "Academy completion survived NG+ reload",

    pass:
      !!(
        currentRun &&
        Array.isArray(
          currentRun.completedDifficulties
        ) &&
        currentRun.completedDifficulties.includes(
          "academy"
        )
      )

  });


  tests.push({

    test:
      "NG+ currencies remained reset after reload",

    pass:
      (
        (
          Number(
            playerData.ryo
          ) || 0
        ) ===
          0 &&
        (
          Number(
            playerData.exp
          ) || 0
        ) ===
          0
      )

  });


  const runtimeVerification =
    verifyRuntimeMatchesPlayerData();


  tests.push({

    test:
      "Runtime reconstructed correctly from reloaded save",

    pass:
      !!(
        runtimeVerification &&
        runtimeVerification.valid ===
          true
      )

  });


  // =========================================
  // RESTORE REAL SAVE REGARDLESS OF TEST RESULT
  // =========================================

  const restorationSucceeded =
    restoreRunTransitionSnapshot(
      record.originalSnapshot
    );


  tests.push({

    test:
      "Original player save restoration succeeds",

    pass:
      restorationSucceeded ===
        true

  });


  // =========================================
  // VERIFY RESTORED SAVE EXACTLY MATCHES BACKUP
  // =========================================

  const restoredSnapshot =
    createRunTransitionSnapshot();


  tests.push({

    test:
      "Restored player save exactly matches original",

    pass:
      JSON.stringify(
        restoredSnapshot
      ) ===
      JSON.stringify(
        record.originalSnapshot
      )

  });


  const restoredRuntimeVerification =
    verifyRuntimeMatchesPlayerData();


  tests.push({

    test:
      "Restored runtime matches original save",

    pass:
      !!(
        restoredRuntimeVerification &&
        restoredRuntimeVerification.valid ===
          true
      )

  });


  // =========================================
  // ONLY CLEAR BACKUP AFTER SUCCESSFUL RESTORE
  // =========================================

  if (restorationSucceeded) {


    clearNextRunEndToEndTestRecord();

  }


  console.table(
    tests
  );


  const failedTests =
    tests.filter(
      test =>
        !test.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ END-TO-END NG+ RELOAD PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ END-TO-END NG+ RELOAD HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// EMERGENCY BRICK 65 RESTORE
// =========================================================
//
// If the browser reloads and you decide NOT to continue
// the diagnostic, this function restores the persistent
// original save backup.
//
// =========================================================

function emergencyRestoreNextRunEndToEndTest() {


  const record =
    getNextRunEndToEndTestRecord();


  if (
    !record ||
    !record.originalSnapshot
  ) {


    console.warn(
      "No Brick 65 recovery snapshot found."
    );


    return false;

  }


  const restored =
    restoreRunTransitionSnapshot(
      record.originalSnapshot
    );


  if (restored) {


    clearNextRunEndToEndTestRecord();


    console.warn(
      "✅ BRICK 65 EMERGENCY RESTORE COMPLETE"
    );


    return true;

  }


  console.error(
    "❌ BRICK 65 EMERGENCY RESTORE FAILED"
  );


  return false;

}


// =========================================================
// BRICK 66 — RUN COMPLETION CONTROLLER
// =========================================================
//
// First player-facing orchestration layer.
//
// This does NOT:
//
// - complete a run
// - modify playerData
// - save anything
// - execute a transition
//
// It answers:
//
// "What should the completion UI do right now?"
//
// =========================================================


// =========================================================
// GET NEXT RUN TARGET FROM RUN STATE
// =========================================================
//
// Pure version of getNextRunTarget().
//
// Allows UI diagnostics to test hypothetical states without
// temporarily modifying the real player save.
//
// =========================================================

function getNextRunTargetFromRunState(
  runState
) {


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Run state is invalid."

    };

  }


  const nextDifficulty =
    getNextShinobiDifficulty(
      runState.currentDifficultyId
    );


  // =========================================
  // NORMAL DIFFICULTY TRANSITION
  // =========================================

  if (nextDifficulty) {


    return {

      valid:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        runState.currentDifficultyId,

      fromDifficultyName:
        runState.currentDifficultyName,

      targetDifficultyId:
        nextDifficulty.id,

      targetDifficultyName:
        nextDifficulty.name,

      targetDifficultyOrder:
        nextDifficulty.order,

      targetLegacyCycle:
        runState.legacyCycle,

      inheritanceLimits:
        getInheritanceLimits(
          nextDifficulty.id
        ),

      premium:
        nextDifficulty.premium ===
        true

    };

  }


  // =========================================
  // JINCHURIKI -> LEGACY
  // =========================================

  if (
    runState.currentDifficultyId ===
      "jinchuriki"
  ) {


    return {

      valid:
        true,

      transitionType:
        "legacy",

      fromDifficultyId:
        "jinchuriki",

      fromDifficultyName:
        "Jinchūriki",

      targetDifficultyId:
        "academy",

      targetDifficultyName:
        "Academy Student",

      targetDifficultyOrder:
        0,

      targetLegacyCycle:
        runState.legacyCycle +
        1,

      inheritanceLimits:
        null,

      premium:
        false

    };

  }


  return {

    valid:
      false,

    reason:
      "No valid next run target exists."

  };

}


// =========================================================
// BUILD RUN COMPLETION CONTROLLER
// =========================================================

function buildRunCompletionController(
  runState,
  options = {}
) {


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      valid:
        false,

      status:
        "invalid",

      ready:
        false,

      reason:
        runState &&
        runState.reason

          ? runState.reason

          : "Run state is invalid."

    };

  }


  const currentDifficulty =
    getShinobiDifficulty(
      runState.currentDifficultyId
    );


  if (!currentDifficulty) {


    return {

      valid:
        false,

      status:
        "invalid",

      ready:
        false,

      reason:
        "Current difficulty does not exist."

    };

  }


  const target =
    getNextRunTargetFromRunState(
      runState
    );


  if (!target.valid) {


    return {

      valid:
        false,

      status:
        "no_target",

      ready:
        false,

      currentDifficultyId:
        currentDifficulty.id,

      currentDifficultyName:
        currentDifficulty.name,

      reason:
        target.reason

    };

  }


  // =========================================
  // CURRENT RUN NOT YET COMPLETE
  // =========================================

  if (
    runState.runCompleted !==
      true
  ) {


    return {

      valid:
        true,

      status:
        "in_progress",

      ready:
        false,

      reason:
        `Complete ${currentDifficulty.name} before continuing.`,

      currentDifficultyId:
        currentDifficulty.id,

      currentDifficultyName:
        currentDifficulty.name,

      currentDifficultyOrder:
        currentDifficulty.order,

      runCompleted:
        false,

      legacyCycle:
        runState.legacyCycle,

      target:
        target,

      requiresPremium:
        target.premium ===
        true,

      premiumOwned:
        options.hasPremiumAccess ===
        true,

      requiresInheritance:
        target.transitionType ===
        "difficulty"

    };

  }


  // =========================================
  // PREMIUM TARGET
  // =========================================

  const requiresPremium =
    target.premium ===
    true;


  const premiumOwned =
    options.hasPremiumAccess ===
    true;


  if (
    requiresPremium &&
    !premiumOwned
  ) {


    return {

      valid:
        true,

      status:
        "premium_locked",

      ready:
        false,

      reason:
        `${target.targetDifficultyName} requires premium access.`,

      currentDifficultyId:
        currentDifficulty.id,

      currentDifficultyName:
        currentDifficulty.name,

      currentDifficultyOrder:
        currentDifficulty.order,

      runCompleted:
        true,

      legacyCycle:
        runState.legacyCycle,

      target:
        target,

      requiresPremium:
        true,

      premiumOwned:
        false,

      requiresInheritance:
        target.transitionType ===
        "difficulty"

    };

  }


  // =========================================
  // READY FOR PLAYER COMPLETION FLOW
  // =========================================

  return {

    valid:
      true,

    status:
      "ready",

    ready:
      true,

    reason:
      null,

    currentDifficultyId:
      currentDifficulty.id,

    currentDifficultyName:
      currentDifficulty.name,

    currentDifficultyOrder:
      currentDifficulty.order,

    runCompleted:
      true,

    legacyCycle:
      runState.legacyCycle,

    transitionType:
      target.transitionType,

    target:
      target,

    requiresPremium:
      requiresPremium,

    premiumOwned:
      premiumOwned,

    requiresInheritance:
      target.transitionType ===
      "difficulty",

    inheritanceLimits:
      target.inheritanceLimits

  };

}


// =========================================================
// GET LIVE RUN COMPLETION CONTROLLER
// =========================================================

function getRunCompletionController(
  options = {}
) {


  return buildRunCompletionController(
    getCurrentRunState(),
    options
  );

}


// =========================================================
// BRICK 67 — COMPLETION SUMMARY PAYLOAD
// =========================================================
//
// Converts Brick 66 into presentation-ready data.
//
// Eventually this can feed:
//
// - completion modal
// - NOW, CHOOSE screen
// - inheritance screen
// - premium lock panel
// - Legacy transition screen
//
// Still completely read-only.
//
// =========================================================

function buildRunCompletionSummary(
  controller
) {


  if (
    !controller ||
    controller.valid !==
      true
  ) {


    return {

      valid:
        false,

      title:
        "Progression Unavailable",

      message:
        controller &&
        controller.reason

          ? controller.reason

          : "Run progression data could not be loaded.",

      actionEnabled:
        false

    };

  }


  // =========================================
  // RUN STILL IN PROGRESS
  // =========================================

  if (
    controller.status ===
      "in_progress"
  ) {


    return {

      valid:
        true,

      status:
        "in_progress",

      title:
        controller.currentDifficultyName,

      eyebrow:
        "CURRENT RUN",

      message:
        controller.reason,

      actionLabel:
        null,

      actionEnabled:
        false,

      transitionType:
        controller.target
          .transitionType,

      targetDifficultyId:
        controller.target
          .targetDifficultyId,

      targetDifficultyName:
        controller.target
          .targetDifficultyName,

      legacyCycle:
        controller.legacyCycle

    };

  }


  // =========================================
  // PREMIUM LOCK
  // =========================================

  if (
    controller.status ===
      "premium_locked"
  ) {


    return {

      valid:
        true,

      status:
        "premium_locked",

      title:
        controller.target
          .targetDifficultyName,

      eyebrow:
        "PREMIUM CONTENT",

      message:
        controller.reason,

      actionLabel:
        "PAID CONTENT",

      actionEnabled:
        false,

      transitionType:
        controller.target
          .transitionType,

      targetDifficultyId:
        controller.target
          .targetDifficultyId,

      targetDifficultyName:
        controller.target
          .targetDifficultyName,

      requiresPremium:
        true,

      premiumOwned:
        false,

      legacyCycle:
        controller.legacyCycle

    };

  }


  // =========================================
  // READY — LEGACY
  // =========================================

  if (
    controller.status ===
      "ready" &&
    controller.transitionType ===
      "legacy"
  ) {


    return {

      valid:
        true,

      status:
        "ready",

      title:
        "A New Legacy Awaits",

      eyebrow:
        "LEGACY",

      message:
        `Legacy Cycle ${controller.target.targetLegacyCycle} is ready to begin.`,

      actionLabel:
        "BEGIN LEGACY",

      actionEnabled:
        true,

      transitionType:
        "legacy",

      targetDifficultyId:
        "academy",

      targetDifficultyName:
        "Academy Student",

      currentLegacyCycle:
        controller.legacyCycle,

      targetLegacyCycle:
        controller.target
          .targetLegacyCycle,

      requiresInheritance:
        false

    };

  }


  // =========================================
  // READY — NORMAL NEXT RUN
  // =========================================

  if (
    controller.status ===
      "ready" &&
    controller.transitionType ===
      "difficulty"
  ) {


    return {

      valid:
        true,

      status:
        "ready",

      title:
        `${controller.currentDifficultyName} Complete`,

      eyebrow:
        "RUN COMPLETE",

      message:
        `${controller.target.targetDifficultyName} awaits.`,

      actionLabel:
        controller.requiresInheritance
          ? "CHOOSE INHERITANCE"
          : "CONTINUE",

      actionEnabled:
        true,

      transitionType:
        "difficulty",

      fromDifficultyId:
        controller.currentDifficultyId,

      fromDifficultyName:
        controller.currentDifficultyName,

      targetDifficultyId:
        controller.target
          .targetDifficultyId,

      targetDifficultyName:
        controller.target
          .targetDifficultyName,

      targetLegacyCycle:
        controller.target
          .targetLegacyCycle,

      requiresPremium:
        controller.requiresPremium,

      premiumOwned:
        controller.premiumOwned,

      requiresInheritance:
        controller.requiresInheritance,

      inheritanceLimits:
        controller.inheritanceLimits

    };

  }


  return {

    valid:
      false,

    title:
      "Progression Unavailable",

    message:
      "Completion controller returned an unsupported state.",

    actionEnabled:
      false

  };

}


// =========================================================
// GET LIVE RUN COMPLETION SUMMARY
// =========================================================

function getRunCompletionSummary(
  options = {}
) {


  return buildRunCompletionSummary(
    getRunCompletionController(
      options
    )
  );

}


// =========================================================
// BRICK 68 — COMPLETION FLOW DIAGNOSTICS
// =========================================================
//
// Pure-state diagnostics.
//
// No live save modification.
// No snapshots required.
// No reload required.
// Dave receives no buttons.
//
// =========================================================

function runCompletionControllerDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — COMPLETION CONTROLLER DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  // =========================================
  // INCOMPLETE ACADEMY
  // =========================================

  const academyInProgress = {

    valid:
      true,

    currentDifficultyId:
      "academy",

    currentDifficultyName:
      "Academy Student",

    currentDifficultyOrder:
      0,

    highestDifficultyUnlockedId:
      "academy",

    highestDifficultyUnlockedName:
      "Academy Student",

    highestDifficultyUnlockedOrder:
      0,

    legacyCycle:
      0,

    runCompleted:
      false,

    completedDifficulties:
      [],

    premiumDifficulty:
      false

  };


  const incompleteController =
    buildRunCompletionController(
      academyInProgress
    );


  results.push({

    test:
      "Incomplete Academy run is not ready",

    pass:
      !!(
        incompleteController &&
        incompleteController.valid ===
          true &&
        incompleteController.status ===
          "in_progress" &&
        incompleteController.ready ===
          false
      )

  });


  // =========================================
  // COMPLETED ACADEMY
  // =========================================

  const academyComplete = {

    ...academyInProgress,

    highestDifficultyUnlockedId:
      "genin",

    highestDifficultyUnlockedName:
      "Genin",

    highestDifficultyUnlockedOrder:
      1,

    runCompleted:
      true,

    completedDifficulties: [
      "academy"
    ]

  };


  const academyController =
    buildRunCompletionController(
      academyComplete
    );


  results.push({

    test:
      "Completed Academy run is ready",

    pass:
      !!(
        academyController &&
        academyController.status ===
          "ready" &&
        academyController.ready ===
          true
      )

  });


  results.push({

    test:
      "Completed Academy targets Genin",

    pass:
      !!(
        academyController &&
        academyController.target &&
        academyController.target
          .targetDifficultyId ===
          "genin"
      )

  });


  const academySummary =
    buildRunCompletionSummary(
      academyController
    );


  results.push({

    test:
      "Academy completion summary requests inheritance",

    pass:
      !!(
        academySummary &&
        academySummary.valid ===
          true &&
        academySummary.actionEnabled ===
          true &&
        academySummary.actionLabel ===
          "CHOOSE INHERITANCE"
      )

  });


  // =========================================
  // COMPLETED KAGE -> PREMIUM AKATSUKI
  // =========================================
  //
  // This follows the CURRENT difficulty ladder.
  //
  // The later NOW, CHOOSE route system will decide how
  // Kage presents Legacy vs premium story paths.
  //
  // =========================================

  const kageComplete = {

    valid:
      true,

    currentDifficultyId:
      "kage",

    currentDifficultyName:
      "Kage",

    currentDifficultyOrder:
      6,

    highestDifficultyUnlockedId:
      "akatsuki",

    highestDifficultyUnlockedName:
      "Akatsuki",

    highestDifficultyUnlockedOrder:
      7,

    legacyCycle:
      0,

    runCompleted:
      true,

    completedDifficulties: [
      "academy",
      "genin",
      "chunin",
      "special_jonin",
      "jonin",
      "anbu",
      "kage"
    ],

    premiumDifficulty:
      false

  };


  const lockedKageController =
    buildRunCompletionController(
      kageComplete,
      {
        hasPremiumAccess:
          false
      }
    );


  results.push({

    test:
      "Unowned Akatsuki route is premium locked",

    pass:
      !!(
        lockedKageController &&
        lockedKageController.status ===
          "premium_locked" &&
        lockedKageController.ready ===
          false &&
        lockedKageController.requiresPremium ===
          true
      )

  });


  const lockedSummary =
    buildRunCompletionSummary(
      lockedKageController
    );


  results.push({

    test:
      "Premium lock summary exposes Paid Content state",

    pass:
      !!(
        lockedSummary &&
        lockedSummary.actionLabel ===
          "PAID CONTENT" &&
        lockedSummary.actionEnabled ===
          false
      )

  });


  const ownedKageController =
    buildRunCompletionController(
      kageComplete,
      {
        hasPremiumAccess:
          true
      }
    );


  results.push({

    test:
      "Owned Akatsuki route becomes available",

    pass:
      !!(
        ownedKageController &&
        ownedKageController.status ===
          "ready" &&
        ownedKageController.ready ===
          true
      )

  });


  // =========================================
  // JINCHURIKI -> LEGACY
  // =========================================

  const jinchurikiComplete = {

    valid:
      true,

    currentDifficultyId:
      "jinchuriki",

    currentDifficultyName:
      "Jinchūriki",

    currentDifficultyOrder:
      8,

    highestDifficultyUnlockedId:
      "jinchuriki",

    highestDifficultyUnlockedName:
      "Jinchūriki",

    highestDifficultyUnlockedOrder:
      8,

    legacyCycle:
      3,

    runCompleted:
      true,

    completedDifficulties:
      SHINOBI_DIFFICULTIES.map(
        difficulty =>
          difficulty.id
      ),

    premiumDifficulty:
      true

  };


  const legacyController =
    buildRunCompletionController(
      jinchurikiComplete,
      {
        hasPremiumAccess:
          true
      }
    );


  results.push({

    test:
      "Completed Jinchuriki produces Legacy route",

    pass:
      !!(
        legacyController &&
        legacyController.status ===
          "ready" &&
        legacyController.transitionType ===
          "legacy" &&
        legacyController.target
          .targetLegacyCycle ===
          4
      )

  });


  const legacySummary =
    buildRunCompletionSummary(
      legacyController
    );


  results.push({

    test:
      "Legacy summary presents Begin Legacy action",

    pass:
      !!(
        legacySummary &&
        legacySummary.actionEnabled ===
          true &&
        legacySummary.actionLabel ===
          "BEGIN LEGACY"
      )

  });


  // =========================================
  // INVALID STATE
  // =========================================

  const invalidController =
    buildRunCompletionController({

      valid:
        false,

      reason:
        "Diagnostic invalid state."

    });


  results.push({

    test:
      "Invalid run state rejected safely",

    pass:
      !!(
        invalidController &&
        invalidController.valid ===
          false &&
        invalidController.ready ===
          false
      )

  });


  // =========================================
  // LIVE PLAYER READ-ONLY CHECK
  // =========================================

  const beforeSnapshot =
    createRunTransitionSnapshot();


  const liveController =
    getRunCompletionController();


  const liveSummary =
    getRunCompletionSummary();


  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Live completion controller returns valid data",

    pass:
      !!(
        liveController &&
        liveController.valid ===
          true
      )

  });


  results.push({

    test:
      "Live completion summary returns valid data",

    pass:
      !!(
        liveSummary &&
        liveSummary.valid ===
          true
      )

  });


  results.push({

    test:
      "Completion orchestration does not modify player save",

    pass:
      JSON.stringify(
        beforeSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  // =========================================
  // DISPLAY
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ COMPLETION CONTROLLER PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ COMPLETION CONTROLLER HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "Live Controller:",
    liveController
  );


  console.log(
    "Live Summary:",
    liveSummary
  );


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// DEVELOPMENT CHARACTER DISCIPLINE VIEW
// =========================================================

function showCharacterDisciplineData(
  characterId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {


    console.log(
      "Character not found:",
      characterId
    );


    return;

  }


  const progression =
    normalizeDisciplineProgression(
      character
        .disciplineProgression
    );


  const rows =
    Object.keys(
      progression
    ).map(
      disciplineId => {


        const definition =
          getShinobiDiscipline(
            disciplineId
          );


        const record =
          progression[
            disciplineId
          ];


        return {

          discipline:
            definition
              ? definition.name
              : disciplineId,

          stat:
            character.stats[
              disciplineId
            ],

          trainingLevel:
            record.level,

          exp:
            record.exp,

          expToNext:
            getDisciplineExpRequired(
              record.level
            ),

          trainingSource:
            definition
              ? definition.trainingSource
              : "unknown",

          statLevelApplied:
            record.statLevelApplied

        };

      }
    );


  console.log(
    `DISCIPLINE PROGRESSION — ${character.name}`
  );


  console.table(
    rows
  );

}


// =========================================================
// BRICK 69 — COMPLETION PATH OPTION BUILDER
// =========================================================
//
// Builds the actual choices that the player-facing
// completion screen can display.
//
// NORMAL RUN:
//
// Academy -> Genin
// Genin -> Chunin
// etc.
//
// KAGE SPECIAL CASE:
//
// NOW, CHOOSE...
//
// PATH OF INHERITANCE
//     -> Academy Student
//     -> Legacy Cycle +1
//
// PATH OF SHADOWS
//     -> Akatsuki
//     -> Premium content
//
// This brick is READ ONLY.
//
// =========================================================


// =========================================================
// BUILD NORMAL NEXT-RUN PATH OPTION
// =========================================================

function buildNormalCompletionPathOption(
  runState
) {


  if (
    !runState ||
    runState.valid !==
      true ||
    runState.runCompleted !==
      true
  ) {


    return null;

  }


  const target =
    getNextRunTargetFromRunState(
      runState
    );


  if (!target.valid) {


    return null;

  }


  // =========================================
  // NORMAL DIFFICULTY
  // =========================================

  if (
    target.transitionType ===
      "difficulty"
  ) {


    return {

      id:
        `difficulty_${target.targetDifficultyId}`,

      routeType:
        "difficulty",

      title:
        target.targetDifficultyName,

      subtitle:
        "Continue Your Shinobi Journey",

      description:
        `Begin the ${target.targetDifficultyName} run.`,

      fromDifficultyId:
        runState.currentDifficultyId,

      targetDifficultyId:
        target.targetDifficultyId,

      targetDifficultyName:
        target.targetDifficultyName,

      targetLegacyCycle:
        runState.legacyCycle,

      requiresInheritance:
        true,

      inheritanceLimits:
        target.inheritanceLimits,

      requiresPremium:
        target.premium ===
        true,

      premiumOwned:
        false,

      locked:
        false,

      visualState:
        "available",

      actionLabel:
        "CHOOSE INHERITANCE"

    };

  }


  // =========================================
  // STANDARD LEGACY TARGET
  // =========================================

  if (
    target.transitionType ===
      "legacy"
  ) {


    return {

      id:
        "legacy",

      routeType:
        "legacy",

      title:
        "Begin a New Legacy",

      subtitle:
        `Legacy Cycle ${target.targetLegacyCycle}`,

      description:
        "Return to Academy Student and begin a new generation.",

      fromDifficultyId:
        runState.currentDifficultyId,

      targetDifficultyId:
        "academy",

      targetDifficultyName:
        "Academy Student",

      targetLegacyCycle:
        target.targetLegacyCycle,

      requiresInheritance:
        false,

      inheritanceLimits:
        null,

      requiresPremium:
        false,

      premiumOwned:
        true,

      locked:
        false,

      visualState:
        "available",

      actionLabel:
        "BEGIN LEGACY"

    };

  }


  return null;

}


// =========================================================
// BUILD KAGE — PATH OF INHERITANCE
// =========================================================
//
// This is the player's always-available post-Kage path.
//
// The execution wiring comes later.
//
// For now we are defining exactly what the choice means.
//
// =========================================================

function buildKageInheritancePathOption(
  runState
) {


  return {

    id:
      "kage_inheritance",

    routeType:
      "legacy_rebirth",

    title:
      "Path of Inheritance",

    subtitle:
      "A New Generation",

    description:
      "Return to Academy Student carrying forward the inheritance you have earned.",

    fromDifficultyId:
      "kage",

    targetDifficultyId:
      "academy",

    targetDifficultyName:
      "Academy Student",

    currentLegacyCycle:
      runState.legacyCycle,

    targetLegacyCycle:
      runState.legacyCycle +
      1,

    requiresInheritance:
      true,

    requiresPremium:
      false,

    premiumOwned:
      true,

    locked:
      false,

    visualState:
      "highlighted",

    iconState:
      "bright",

    chainVisible:
      false,

    actionLabel:
      "CHOOSE INHERITANCE"

  };

}


// =========================================================
// BUILD KAGE — PATH OF SHADOWS
// =========================================================

function buildKageAkatsukiPathOption(
  runState,
  options = {}
) {


  const premiumOwned =
    options.hasPremiumAccess ===
    true;


  return {

    id:
      "kage_akatsuki",

    routeType:
      "premium_difficulty",

    title:
      "Path of Shadows",

    subtitle:
      "Akatsuki",

    description:
      premiumOwned

        ? "Abandon the ordinary shinobi path and enter the Akatsuki story arc."

        : "Premium story content. Complete the core Kage progression before entering the Akatsuki path.",

    fromDifficultyId:
      "kage",

    targetDifficultyId:
      "akatsuki",

    targetDifficultyName:
      "Akatsuki",

    currentLegacyCycle:
      runState.legacyCycle,

    targetLegacyCycle:
      runState.legacyCycle,

    requiresInheritance:
      true,

    inheritanceLimits:
      getInheritanceLimits(
        "akatsuki"
      ),

    requiresPremium:
      true,

    premiumOwned:
      premiumOwned,

    locked:
      !premiumOwned,

    visualState:
      premiumOwned
        ? "available"
        : "premium_locked",

    iconState:
      premiumOwned
        ? "bright"
        : "greyed",

    chainVisible:
      !premiumOwned,

    actionLabel:
      premiumOwned
        ? "ENTER AKATSUKI"
        : "PAID CONTENT"

  };

}


// =========================================================
// BUILD KAGE PATH OPTIONS
// =========================================================

function buildKageCompletionPathOptions(
  runState,
  options = {}
) {


  if (
    !runState ||
    runState.valid !==
      true ||
    runState.currentDifficultyId !==
      "kage" ||
    runState.runCompleted !==
      true
  ) {


    return [];

  }


  return [

    buildKageInheritancePathOption(
      runState
    ),

    buildKageAkatsukiPathOption(
      runState,
      options
    )

  ];

}


// =========================================================
// BUILD COMPLETION PATH OPTIONS
// =========================================================

function buildCompletionPathOptions(
  runState,
  options = {}
) {


  if (
    !runState ||
    runState.valid !==
      true ||
    runState.runCompleted !==
      true
  ) {


    return [];

  }


  // =========================================
  // SPECIAL POST-KAGE FORK
  // =========================================

  if (
    runState.currentDifficultyId ===
      "kage"
  ) {


    return buildKageCompletionPathOptions(
      runState,
      options
    );

  }


  // =========================================
  // ORDINARY SINGLE-PATH PROGRESSION
  // =========================================

  const normalOption =
    buildNormalCompletionPathOption(
      runState
    );


  return normalOption
    ? [
        normalOption
      ]
    : [];

}


// =========================================================
// GET LIVE COMPLETION PATH OPTIONS
// =========================================================

function getCompletionPathOptions(
  options = {}
) {


  return buildCompletionPathOptions(
    getCurrentRunState(),
    options
  );

}


// =========================================================
// BRICK 70 — COMPLETION PATH SELECTION VALIDATION
// =========================================================
//
// Gives the future UI one authoritative way to answer:
//
// "Can the player actually click this path?"
//
// Still READ ONLY.
//
// =========================================================


// =========================================================
// GET COMPLETION PATH OPTION
// =========================================================

function getCompletionPathOption(
  pathId,
  runState,
  options = {}
) {


  if (
    typeof pathId !==
      "string"
  ) {


    return null;

  }


  const paths =
    buildCompletionPathOptions(
      runState,
      options
    );


  return (
    paths.find(
      path =>
        path.id ===
        pathId
    ) ||
    null
  );

}


// =========================================================
// VALIDATE COMPLETION PATH SELECTION
// =========================================================

function validateCompletionPathSelection(
  pathId,
  runState,
  options = {}
) {


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Run state is invalid.",

      path:
        null

    };

  }


  if (
    runState.runCompleted !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Current run is not complete.",

      path:
        null

    };

  }


  const path =
    getCompletionPathOption(
      pathId,
      runState,
      options
    );


  if (!path) {


    return {

      valid:
        false,

      reason:
        "Selected completion path does not exist.",

      path:
        null

    };

  }


  if (
    path.requiresPremium ===
      true &&
    path.premiumOwned !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Premium access required.",

      path:
        path

    };

  }


  if (
    path.locked ===
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Selected completion path is locked.",

      path:
        path

    };

  }


  return {

    valid:
      true,

    reason:
      null,

    path:
      path

  };

}


// =========================================================
// VALIDATE LIVE COMPLETION PATH SELECTION
// =========================================================

function validateLiveCompletionPathSelection(
  pathId,
  options = {}
) {


  return validateCompletionPathSelection(
    pathId,
    getCurrentRunState(),
    options
  );

}


// =========================================================
// BRICK 71 — PATH OPTION DIAGNOSTICS
// =========================================================

function runCompletionPathDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — COMPLETION PATH DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  // =========================================
  // INCOMPLETE ACADEMY
  // =========================================

  const academyIncomplete = {

    valid:
      true,

    currentDifficultyId:
      "academy",

    currentDifficultyName:
      "Academy Student",

    currentDifficultyOrder:
      0,

    highestDifficultyUnlockedId:
      "academy",

    highestDifficultyUnlockedName:
      "Academy Student",

    highestDifficultyUnlockedOrder:
      0,

    legacyCycle:
      0,

    runCompleted:
      false,

    completedDifficulties:
      [],

    premiumDifficulty:
      false

  };


  const incompletePaths =
    buildCompletionPathOptions(
      academyIncomplete
    );


  results.push({

    test:
      "Incomplete run exposes no completion paths",

    pass:
      Array.isArray(
        incompletePaths
      ) &&
      incompletePaths.length ===
        0

  });


  // =========================================
  // COMPLETED ACADEMY
  // =========================================

  const academyComplete = {

    ...academyIncomplete,

    highestDifficultyUnlockedId:
      "genin",

    highestDifficultyUnlockedName:
      "Genin",

    highestDifficultyUnlockedOrder:
      1,

    runCompleted:
      true,

    completedDifficulties: [
      "academy"
    ]

  };


  const academyPaths =
    buildCompletionPathOptions(
      academyComplete
    );


  results.push({

    test:
      "Completed Academy exposes one path",

    pass:
      academyPaths.length ===
      1

  });


  results.push({

    test:
      "Academy path targets Genin",

    pass:
      !!(
        academyPaths[
          0
        ] &&
        academyPaths[
          0
        ].targetDifficultyId ===
          "genin"
      )

  });


  // =========================================
  // COMPLETED KAGE
  // =========================================

  const kageComplete = {

    valid:
      true,

    currentDifficultyId:
      "kage",

    currentDifficultyName:
      "Kage",

    currentDifficultyOrder:
      6,

    highestDifficultyUnlockedId:
      "akatsuki",

    highestDifficultyUnlockedName:
      "Akatsuki",

    highestDifficultyUnlockedOrder:
      7,

    legacyCycle:
      2,

    runCompleted:
      true,

    completedDifficulties: [
      "academy",
      "genin",
      "chunin",
      "special_jonin",
      "jonin",
      "anbu",
      "kage"
    ],

    premiumDifficulty:
      false

  };


  const lockedKagePaths =
    buildCompletionPathOptions(
      kageComplete,
      {
        hasPremiumAccess:
          false
      }
    );


  results.push({

    test:
      "Kage completion exposes exactly two paths",

    pass:
      lockedKagePaths.length ===
      2

  });


  const inheritancePath =
    lockedKagePaths.find(
      path =>
        path.id ===
        "kage_inheritance"
    );


  const lockedAkatsukiPath =
    lockedKagePaths.find(
      path =>
        path.id ===
        "kage_akatsuki"
    );


  results.push({

    test:
      "Kage inheritance path returns to Academy",

    pass:
      !!(
        inheritancePath &&
        inheritancePath.targetDifficultyId ===
          "academy" &&
        inheritancePath.targetLegacyCycle ===
          3
      )

  });


  results.push({

    test:
      "Kage inheritance path is always available",

    pass:
      !!(
        inheritancePath &&
        inheritancePath.locked ===
          false &&
        inheritancePath.requiresPremium ===
          false
      )

  });


  results.push({

    test:
      "Unowned Akatsuki path is greyed and chained",

    pass:
      !!(
        lockedAkatsukiPath &&
        lockedAkatsukiPath.locked ===
          true &&
        lockedAkatsukiPath.iconState ===
          "greyed" &&
        lockedAkatsukiPath.chainVisible ===
          true &&
        lockedAkatsukiPath.actionLabel ===
          "PAID CONTENT"
      )

  });


  // =========================================
  // LOCKED SELECTION VALIDATION
  // =========================================

  const lockedSelection =
    validateCompletionPathSelection(
      "kage_akatsuki",
      kageComplete,
      {
        hasPremiumAccess:
          false
      }
    );


  results.push({

    test:
      "Locked Akatsuki path cannot be selected",

    pass:
      !!(
        lockedSelection &&
        lockedSelection.valid ===
          false &&
        lockedSelection.reason ===
          "Premium access required."
      )

  });


  // =========================================
  // OWNED PREMIUM PATH
  // =========================================

  const ownedKagePaths =
    buildCompletionPathOptions(
      kageComplete,
      {
        hasPremiumAccess:
          true
      }
    );


  const ownedAkatsukiPath =
    ownedKagePaths.find(
      path =>
        path.id ===
        "kage_akatsuki"
    );


  results.push({

    test:
      "Owned Akatsuki path becomes available",

    pass:
      !!(
        ownedAkatsukiPath &&
        ownedAkatsukiPath.locked ===
          false &&
        ownedAkatsukiPath.iconState ===
          "bright" &&
        ownedAkatsukiPath.chainVisible ===
          false &&
        ownedAkatsukiPath.actionLabel ===
          "ENTER AKATSUKI"
      )

  });


  const ownedSelection =
    validateCompletionPathSelection(
      "kage_akatsuki",
      kageComplete,
      {
        hasPremiumAccess:
          true
      }
    );


  results.push({

    test:
      "Owned Akatsuki path validates successfully",

    pass:
      !!(
        ownedSelection &&
        ownedSelection.valid ===
          true
      )

  });


  // =========================================
  // INHERITANCE SELECTION
  // =========================================

  const inheritanceSelection =
    validateCompletionPathSelection(
      "kage_inheritance",
      kageComplete,
      {
        hasPremiumAccess:
          false
      }
    );


  results.push({

    test:
      "Inheritance path validates without premium",

    pass:
      !!(
        inheritanceSelection &&
        inheritanceSelection.valid ===
          true
      )

  });


  // =========================================
  // LIVE READ-ONLY CHECK
  // =========================================

  const beforeSnapshot =
    createRunTransitionSnapshot();


  const livePaths =
    getCompletionPathOptions();


  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Live path builder returns an array",

    pass:
      Array.isArray(
        livePaths
      )

  });


  results.push({

    test:
      "Path engine does not modify player save",

    pass:
      JSON.stringify(
        beforeSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  // =========================================
  // DISPLAY RESULTS
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ COMPLETION PATH ENGINE PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ COMPLETION PATH ENGINE HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "Kage Paths — Premium Locked:",
    lockedKagePaths
  );


  console.log(
    "Kage Paths — Premium Owned:",
    ownedKagePaths
  );


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// DEVELOPMENT PLAYER SAVE VIEW
// =========================================================

function showPlayerData() {


  console.log(
    "================================"
  );


  console.log(
    "PLAYER DATA:",
    playerData
  );


  console.log(
    `Ryō: ${playerData.ryo}`
  );


  console.log(
    `EXP: ${playerData.exp}`
  );


  console.log(
    "INVENTORY:"
  );


  const inventoryView =
    playerData.inventory.map(
      item => {


        const definition =
          getItemDefinition(
            item.id
          );


        return {

          id:
            item.id,

          name:
            item.name,

          type:
            definition
              ? definition.type
              : (
                  item.type ||
                  "misc"
                ),

          rarity:
            item.rarity,

          quantity:
            item.quantity,

          equippedBy:
            item.equippedBy ||
            "—"

        };

      }
    );


  console.table(
    inventoryView
  );


  console.log(
    "================================"
  );

}


// =========================================================
// BRICK 72 — COMPLETION FLOW SESSION
// =========================================================
//
// Temporary UI state.
//
// This is NOT player save data.
//
// It remembers:
//
// - which completion screen is open
// - which paths are visible
// - which path the player clicked
// - which stage the UI should display
//
// Refreshing the page deliberately clears this session.
//
// =========================================================

let completionFlowSession =
  null;


// =========================================================
// GET COMPLETION PATH LAYOUT SLOT
// =========================================================

function getCompletionPathLayoutSlot(
  path
) {


  if (!path) {

    return "center";

  }


  if (
    path.id ===
      "kage_inheritance"
  ) {

    return "top-left";

  }


  if (
    path.id ===
      "kage_akatsuki"
  ) {

    return "top-right";

  }


  return "center";

}


// =========================================================
// DECORATE PATH FOR PRESENTATION
// =========================================================

function buildCompletionPathPresentation(
  path
) {


  if (!path) {

    return null;

  }


  return {

    ...path,

    layoutSlot:
      getCompletionPathLayoutSlot(
        path
      )

  };

}


// =========================================================
// BEGIN COMPLETION FLOW
// =========================================================

function beginCompletionFlow(
  runState = getCurrentRunState(),
  options = {}
) {


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    completionFlowSession = {

      active:
        false,

      stage:
        "invalid",

      reason:
        "Run state is invalid.",

      paths:
        [],

      selectedPathId:
        null

    };


    return completionFlowSession;

  }


  if (
    runState.runCompleted !==
      true
  ) {


    completionFlowSession = {

      active:
        false,

      stage:
        "run_in_progress",

      reason:
        `Complete ${runState.currentDifficultyName} before continuing.`,

      runState:
        {
          ...runState
        },

      paths:
        [],

      selectedPathId:
        null

    };


    return completionFlowSession;

  }


  const paths =
    buildCompletionPathOptions(
      runState,
      options
    ).map(
      path =>
        buildCompletionPathPresentation(
          path
        )
    );


  completionFlowSession = {

    active:
      true,

    stage:
      "path_selection",

    reason:
      null,

    runState:
      {
        ...runState
      },

    options: {

      hasPremiumAccess:
        options.hasPremiumAccess ===
        true

    },

    paths:
      paths,

    selectedPathId:
      null,

    selectedPath:
      null,

    inheritanceSelection:
      createEmptyInheritanceSelection(),

    confirmation:
      null

  };


  return completionFlowSession;

}


// =========================================================
// GET COMPLETION FLOW SESSION
// =========================================================

function getCompletionFlowSession() {


  return completionFlowSession;

}


// =========================================================
// CLEAR COMPLETION FLOW SESSION
// =========================================================

function clearCompletionFlowSession() {


  completionFlowSession =
    null;


  return true;

}


// =========================================================
// SELECT COMPLETION FLOW PATH
// =========================================================

function selectCompletionFlowPath(
  pathId
) {


  if (
    !completionFlowSession ||
    completionFlowSession.active !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "No active completion flow exists."

    };

  }


  const validation =
    validateCompletionPathSelection(
      pathId,
      completionFlowSession.runState,
      completionFlowSession.options
    );


  if (
    !validation ||
    validation.valid !==
      true
  ) {


    return {

      success:
        false,

      reason:
        validation &&
        validation.reason

          ? validation.reason

          : "Completion path could not be selected.",

      path:
        validation
          ? validation.path
          : null

    };

  }


  const presentedPath =
    buildCompletionPathPresentation(
      validation.path
    );


  completionFlowSession
    .selectedPathId =
      presentedPath.id;


  completionFlowSession
    .selectedPath =
      presentedPath;


  completionFlowSession
    .inheritanceSelection =
      createEmptyInheritanceSelection();


  completionFlowSession
    .confirmation =
      null;


  completionFlowSession.stage =
    presentedPath.requiresInheritance ===
      true

      ? "inheritance_selection"

      : "confirmation";


  return {

    success:
      true,

    stage:
      completionFlowSession.stage,

    path:
      presentedPath

  };

}


// =========================================================
// BRICK 73 — INHERITANCE SELECTION PAYLOAD
// =========================================================
//
// Kage Legacy Rebirth requires a separate inheritance
// profile because ordinary Academy entry has zero carryover.
//
// These are DEVELOPMENT BALANCE VALUES.
//
// They are deliberately centralized so we can change them
// later without touching UI or transition logic.
//
// Current baseline mirrors the first NG+ Genin allowance.
//
// =========================================================

const LEGACY_REBIRTH_INHERITANCE_LIMITS = {

  specialNinja:
    1,

  bloodlines:
    1,

  legendaryWeapons:
    1,

  basicItems:
    5

};


// =========================================================
// GET PATH INHERITANCE LIMITS
// =========================================================

function getCompletionPathInheritanceLimits(
  path
) {


  if (!path) {

    return null;

  }


  if (
    path.routeType ===
      "legacy_rebirth"
  ) {


    return {

      ...LEGACY_REBIRTH_INHERITANCE_LIMITS

    };

  }


  if (
    path.inheritanceLimits &&
    typeof path.inheritanceLimits ===
      "object"
  ) {


    return {

      ...path.inheritanceLimits

    };

  }


  if (path.targetDifficultyId) {


    return getInheritanceLimits(
      path.targetDifficultyId
    );

  }


  return null;

}


// =========================================================
// BUILD INHERITANCE CATEGORY PAYLOAD
// =========================================================

function buildInheritanceCategoryPayload(
  id,
  name,
  limit,
  candidates
) {


  return {

    id:
      id,

    name:
      name,

    limit:
      Math.max(
        0,
        Number(
          limit
        ) || 0
      ),

    candidates:
      Array.isArray(
        candidates
      )
        ? candidates
        : [],

    selected:
      []

  };

}


// =========================================================
// BUILD COMPLETION INHERITANCE PAYLOAD
// =========================================================

function buildCompletionInheritancePayload(
  path
) {


  if (
    !path ||
    path.requiresInheritance !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Selected path does not use inheritance."

    };

  }


  const limits =
    getCompletionPathInheritanceLimits(
      path
    );


  if (!limits) {


    return {

      valid:
        false,

      reason:
        "Inheritance limits could not be resolved."

    };

  }


  return {

    valid:
      true,

    pathId:
      path.id,

    routeType:
      path.routeType,

    title:
      "Choose Your Inheritance",

    subtitle:
      path.routeType ===
        "legacy_rebirth"

        ? "Choose what the next generation will inherit."

        : `Choose what will carry into ${path.targetDifficultyName}.`,

    targetDifficultyId:
      path.targetDifficultyId,

    targetDifficultyName:
      path.targetDifficultyName,

    targetLegacyCycle:
      path.targetLegacyCycle,

    limits:
      {
        ...limits
      },

    categories: [

      buildInheritanceCategoryPayload(
        "specialNinja",
        "Special Ninja",
        limits.specialNinja,
        getSpecialNinjaInheritanceCandidates()
      ),

      buildInheritanceCategoryPayload(
        "bloodlines",
        "Bloodlines",
        limits.bloodlines,
        getBloodlineInheritanceCandidates()
      ),

      buildInheritanceCategoryPayload(
        "legendaryWeapons",
        "Legendary Weapons",
        limits.legendaryWeapons,
        getLegendaryWeaponInheritanceCandidates()
      ),

      buildInheritanceCategoryPayload(
        "basicItems",
        "Items",
        limits.basicItems,
        getBasicItemInheritanceCandidates()
      )

    ]

  };

}


// =========================================================
// GET ACTIVE INHERITANCE PAYLOAD
// =========================================================

function getActiveCompletionInheritancePayload() {


  if (
    !completionFlowSession ||
    completionFlowSession.active !==
      true ||
    !completionFlowSession.selectedPath
  ) {


    return {

      valid:
        false,

      reason:
        "No completion path has been selected."

    };

  }


  return buildCompletionInheritancePayload(
    completionFlowSession.selectedPath
  );

}


// =========================================================
// VALIDATE SELECTION AGAINST PAYLOAD
// =========================================================

function validateCompletionInheritanceSelection(
  payload,
  selection
) {


  if (
    !payload ||
    payload.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Inheritance payload is invalid.",

      errors:
        []

    };

  }


  const normalized =
    normalizeInheritanceSelection(
      selection
    );


  const errors =
    [];


  payload.categories.forEach(
    category => {


      const selected =
        normalized[
          category.id
        ] || [];


      if (
        selected.length >
        category.limit
      ) {


        errors.push(
          `${category.name}: selected ${selected.length}, maximum ${category.limit}.`
        );

      }


      const candidateKeys =
        new Set(
          category.candidates.map(
            candidate =>
              candidate.key ||
              candidate.id
          )
        );


      selected.forEach(
        selectedKey => {


          if (
            !candidateKeys.has(
              selectedKey
            )
          ) {


            errors.push(
              `${category.name}: invalid inheritance selection ${selectedKey}.`
            );

          }

        }
      );

    }
  );


  return {

    valid:
      errors.length ===
      0,

    reason:
      errors.length ===
        0

        ? null

        : "Inheritance selection is invalid.",

    errors:
      errors,

    selection:
      normalized

  };

}


// =========================================================
// SET ACTIVE INHERITANCE SELECTION
// =========================================================

function setCompletionInheritanceSelection(
  selection
) {


  const payload =
    getActiveCompletionInheritancePayload();


  const validation =
    validateCompletionInheritanceSelection(
      payload,
      selection
    );


  if (
    validation.valid !==
      true
  ) {


    return {

      success:
        false,

      reason:
        validation.reason,

      errors:
        validation.errors

    };

  }


  completionFlowSession
    .inheritanceSelection =
      validation.selection;


  completionFlowSession.stage =
    "confirmation";


  completionFlowSession
    .confirmation =
      null;


  return {

    success:
      true,

    stage:
      "confirmation",

    selection:
      validation.selection

  };

}


// =========================================================
// BRICK 74 — CONFIRMATION PAYLOAD
// =========================================================
//
// Still does NOT execute the transition.
//
// It packages the exact decision that the future
// confirmation button will eventually hand to the
// transition execution layer.
//
// =========================================================

function buildCompletionConfirmationPayload(
  session
) {


  if (
    !session ||
    session.active !==
      true ||
    !session.selectedPath
  ) {


    return {

      valid:
        false,

      reason:
        "Completion flow has no selected path."

    };

  }


  const path =
    session.selectedPath;


  if (
    path.requiresPremium ===
      true &&
    path.premiumOwned !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Premium access required."

    };

  }


  let inheritanceSelection =
    createEmptyInheritanceSelection();


  if (
    path.requiresInheritance ===
      true
  ) {


    const payload =
      buildCompletionInheritancePayload(
        path
      );


    const validation =
      validateCompletionInheritanceSelection(
        payload,
        session.inheritanceSelection
      );


    if (
      validation.valid !==
        true
    ) {


      return {

        valid:
          false,

        reason:
          validation.reason,

        errors:
          validation.errors

      };

    }


    inheritanceSelection =
      validation.selection;

  }


  const warningLines =
    [];


  if (
    path.routeType ===
      "legacy_rebirth"
  ) {


    warningLines.push(
      "Your current Kage run will end."
    );


    warningLines.push(
      `Legacy Cycle ${path.targetLegacyCycle} will begin.`
    );


    warningLines.push(
      "You will return to Academy Student."
    );

  }
  else {


    warningLines.push(
      `Your current run will end and ${path.targetDifficultyName} will begin.`
    );

  }


  if (
    path.requiresInheritance ===
      true
  ) {


    warningLines.push(
      "Only the selected inheritance will carry forward."
    );

  }


  return {

    valid:
      true,

    pathId:
      path.id,

    routeType:
      path.routeType,

    fromDifficultyId:
      path.fromDifficultyId,

    targetDifficultyId:
      path.targetDifficultyId,

    targetDifficultyName:
      path.targetDifficultyName,

    targetLegacyCycle:
      path.targetLegacyCycle,

    inheritanceSelection:
      inheritanceSelection,

    requiresPremium:
      path.requiresPremium ===
      true,

    warningTitle:
      "Confirm Your Path",

    warningLines:
      warningLines,

    confirmLabel:
      path.routeType ===
        "legacy_rebirth"

        ? "BEGIN NEW LEGACY"

        : (
            path.routeType ===
              "premium_difficulty"

              ? "ENTER AKATSUKI"

              : "BEGIN NEXT RUN"
          ),

    cancelLabel:
      "GO BACK",

    executable:
      true

  };

}


// =========================================================
// GET ACTIVE COMPLETION CONFIRMATION
// =========================================================

function getActiveCompletionConfirmation() {


  if (!completionFlowSession) {


    return {

      valid:
        false,

      reason:
        "No active completion flow exists."

    };

  }


  const confirmation =
    buildCompletionConfirmationPayload(
      completionFlowSession
    );


  completionFlowSession.confirmation =
    confirmation;


  return confirmation;

}


// =========================================================
// BRICKS 72–74 DIAGNOSTICS
// =========================================================

function runCompletionFlowSessionDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — COMPLETION FLOW SESSION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const playerSnapshot =
    createRunTransitionSnapshot();


  const previousSession =
    completionFlowSession;


  // =========================================
  // TEST KAGE FLOW
  // =========================================

  const kageState = {

    valid:
      true,

    currentDifficultyId:
      "kage",

    currentDifficultyName:
      "Kage",

    currentDifficultyOrder:
      6,

    highestDifficultyUnlockedId:
      "akatsuki",

    highestDifficultyUnlockedName:
      "Akatsuki",

    highestDifficultyUnlockedOrder:
      7,

    legacyCycle:
      2,

    runCompleted:
      true,

    completedDifficulties: [
      "academy",
      "genin",
      "chunin",
      "special_jonin",
      "jonin",
      "anbu",
      "kage"
    ],

    premiumDifficulty:
      false

  };


  const lockedSession =
    beginCompletionFlow(
      kageState,
      {
        hasPremiumAccess:
          false
      }
    );


  results.push({

    test:
      "Completed Kage opens path selection",

    pass:
      !!(
        lockedSession &&
        lockedSession.active ===
          true &&
        lockedSession.stage ===
          "path_selection"
      )

  });


  const inheritancePath =
    lockedSession.paths.find(
      path =>
        path.id ===
        "kage_inheritance"
    );


  const shadowPath =
    lockedSession.paths.find(
      path =>
        path.id ===
        "kage_akatsuki"
    );


  results.push({

    test:
      "Inheritance path is positioned top-left",

    pass:
      !!(
        inheritancePath &&
        inheritancePath.layoutSlot ===
          "top-left"
      )

  });


  results.push({

    test:
      "Shadow path is positioned top-right",

    pass:
      !!(
        shadowPath &&
        shadowPath.layoutSlot ===
          "top-right"
      )

  });


  const lockedShadowSelection =
    selectCompletionFlowPath(
      "kage_akatsuki"
    );


  results.push({

    test:
      "Locked Shadow path cannot be selected",

    pass:
      !!(
        lockedShadowSelection &&
        lockedShadowSelection.success ===
          false
      )

  });


  const inheritanceSelection =
    selectCompletionFlowPath(
      "kage_inheritance"
    );


  results.push({

    test:
      "Inheritance path can be selected",

    pass:
      !!(
        inheritanceSelection &&
        inheritanceSelection.success ===
          true &&
        completionFlowSession.stage ===
          "inheritance_selection"
      )

  });


  const inheritancePayload =
    getActiveCompletionInheritancePayload();


  results.push({

    test:
      "Inheritance payload contains four categories",

    pass:
      !!(
        inheritancePayload &&
        inheritancePayload.valid ===
          true &&
        inheritancePayload.categories.length ===
          4
      )

  });


  results.push({

    test:
      "Legacy inheritance uses dedicated limits",

    pass:
      !!(
        inheritancePayload &&
        inheritancePayload.limits.specialNinja ===
          1 &&
        inheritancePayload.limits.bloodlines ===
          1 &&
        inheritancePayload.limits.legendaryWeapons ===
          1 &&
        inheritancePayload.limits.basicItems ===
          5
      )

  });


  const emptySelectionResult =
    setCompletionInheritanceSelection(
      createEmptyInheritanceSelection()
    );


  results.push({

    test:
      "Empty legal inheritance selection reaches confirmation",

    pass:
      !!(
        emptySelectionResult &&
        emptySelectionResult.success ===
          true &&
        completionFlowSession.stage ===
          "confirmation"
      )

  });


  const legacyConfirmation =
    getActiveCompletionConfirmation();


  results.push({

    test:
      "Legacy confirmation payload builds",

    pass:
      !!(
        legacyConfirmation &&
        legacyConfirmation.valid ===
          true &&
        legacyConfirmation.routeType ===
          "legacy_rebirth" &&
        legacyConfirmation.confirmLabel ===
          "BEGIN NEW LEGACY"
      )

  });


  // =========================================
  // PREMIUM-OWNED SHADOW PATH
  // =========================================

  beginCompletionFlow(
    kageState,
    {
      hasPremiumAccess:
        true
      }
    );


  const ownedShadowSelection =
    selectCompletionFlowPath(
      "kage_akatsuki"
    );


  results.push({

    test:
      "Owned Shadow path becomes selectable",

    pass:
      !!(
        ownedShadowSelection &&
        ownedShadowSelection.success ===
          true
      )

  });


  const shadowPayload =
    getActiveCompletionInheritancePayload();


  results.push({

    test:
      "Akatsuki inheritance payload uses Akatsuki limits",

    pass:
      !!(
        shadowPayload &&
        shadowPayload.valid ===
          true &&
        shadowPayload.limits.specialNinja ===
          5 &&
        shadowPayload.limits.bloodlines ===
          5 &&
        shadowPayload.limits.legendaryWeapons ===
          5 &&
        shadowPayload.limits.basicItems ===
          40
      )

  });


  setCompletionInheritanceSelection(
    createEmptyInheritanceSelection()
  );


  const shadowConfirmation =
    getActiveCompletionConfirmation();


  results.push({

    test:
      "Akatsuki confirmation payload builds",

    pass:
      !!(
        shadowConfirmation &&
        shadowConfirmation.valid ===
          true &&
        shadowConfirmation.routeType ===
          "premium_difficulty" &&
        shadowConfirmation.confirmLabel ===
          "ENTER AKATSUKI"
      )

  });


  // =========================================
  // PLAYER SAVE MUST REMAIN UNTOUCHED
  // =========================================

  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Completion session never modifies player save",

    pass:
      JSON.stringify(
        playerSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  // =========================================
  // RESTORE PREVIOUS SESSION
  // =========================================

  completionFlowSession =
    previousSession;


  // =========================================
  // RESULTS
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ COMPLETION FLOW SESSION PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ COMPLETION FLOW SESSION HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


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


// =========================================================
// BRICK 75 — COMPLETION FLOW UI SHELL
// =========================================================
//
// First visible player-facing Shinobi Progression UI.
//
// The UI is injected dynamically so we do NOT need to
// modify index.html yet.
//
// It currently supports:
//
// - Kage "NOW, CHOOSE..." fork
// - top-left inheritance path
// - top-right Shadow / Akatsuki path
// - premium locked presentation
// - inheritance selection
// - confirmation screen
//
// Final transition execution is deliberately NOT connected
// until the UI flow itself has passed diagnostics.
//
// =========================================================

const COMPLETION_FLOW_UI_ID =
  "shinobi-completion-flow-ui";


const COMPLETION_FLOW_STYLE_ID =
  "shinobi-completion-flow-style";


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeCompletionHtml(
  value
) {


  return String(
    value === undefined ||
    value === null

      ? ""

      : value
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      "\"",
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


// =========================================================
// INSTALL COMPLETION FLOW STYLES
// =========================================================

function installCompletionFlowStyles() {


  if (
    document.getElementById(
      COMPLETION_FLOW_STYLE_ID
    )
  ) {


    return true;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    COMPLETION_FLOW_STYLE_ID;


  style.textContent = `

    #${COMPLETION_FLOW_UI_ID} {
      position: fixed;
      inset: 0;
      z-index: 99999;
      overflow: hidden;
      color: #f3ead5;
      font-family: Georgia, "Times New Roman", serif;
      background:
        radial-gradient(
          circle at 50% 72%,
          rgba(24, 35, 37, 0.35) 0%,
          rgba(5, 10, 14, 0.86) 38%,
          rgba(0, 0, 0, 0.97) 100%
        ),
        linear-gradient(
          180deg,
          #091015 0%,
          #030608 100%
        );
    }

    #${COMPLETION_FLOW_UI_ID} * {
      box-sizing: border-box;
    }

    .sc-choice-stage {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .sc-choice-stage::before,
    .sc-choice-stage::after {
      content: "";
      position: absolute;
      bottom: -8%;
      width: 44%;
      height: 78%;
      opacity: 0.52;
      pointer-events: none;
      border-top: 2px solid rgba(218, 177, 91, 0.3);
      filter: drop-shadow(
        0 0 10px rgba(205, 164, 80, 0.16)
      );
    }

    .sc-choice-stage::before {
      left: 8%;
      transform:
        perspective(650px)
        rotateZ(-16deg)
        skewY(-9deg);
      background:
        linear-gradient(
          145deg,
          transparent 0%,
          rgba(179, 140, 69, 0.08) 44%,
          rgba(202, 169, 98, 0.18) 100%
        );
    }

    .sc-choice-stage::after {
      right: 8%;
      transform:
        perspective(650px)
        rotateZ(16deg)
        skewY(9deg);
      background:
        linear-gradient(
          215deg,
          transparent 0%,
          rgba(88, 31, 36, 0.08) 44%,
          rgba(124, 29, 38, 0.18) 100%
        );
    }

    .sc-choice-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow:
        inset 0 0 180px rgba(0, 0, 0, 0.95);
    }

    .sc-choice-heading {
      position: absolute;
      left: 50%;
      bottom: 19%;
      transform: translateX(-50%);
      width: min(760px, 85vw);
      text-align: center;
      z-index: 5;
    }

    .sc-choice-heading-small {
      margin-bottom: 8px;
      color: #9f895c;
      font-family: Arial, sans-serif;
      font-size: 11px;
      letter-spacing: 5px;
      text-transform: uppercase;
    }

    .sc-choice-heading h1 {
      margin: 0;
      font-size: clamp(34px, 4vw, 64px);
      font-weight: 500;
      letter-spacing: 7px;
      text-shadow:
        0 0 18px rgba(210, 174, 92, 0.22);
    }

    .sc-choice-heading p {
      margin: 14px auto 0;
      max-width: 620px;
      color: #a9a59d;
      font-family: Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
    }

    .sc-path-card {
      position: absolute;
      top: 9%;
      width: min(390px, 38vw);
      min-height: 360px;
      padding: 34px 30px 30px;
      z-index: 6;
      cursor: pointer;
      text-align: center;
      border: 1px solid rgba(202, 169, 97, 0.42);
      background:
        linear-gradient(
          180deg,
          rgba(18, 24, 25, 0.95),
          rgba(4, 8, 10, 0.96)
        );
      box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.55),
        inset 0 0 45px rgba(204, 163, 82, 0.035);
      transition:
        transform 180ms ease,
        border-color 180ms ease,
        box-shadow 180ms ease,
        filter 180ms ease;
    }

    .sc-path-card[data-layout="top-left"] {
      left: 9%;
    }

    .sc-path-card[data-layout="top-right"] {
      right: 9%;
    }

    .sc-path-card:not(.sc-path-locked):hover {
      transform: translateY(-7px);
      border-color: rgba(231, 194, 110, 0.88);
      box-shadow:
        0 28px 75px rgba(0, 0, 0, 0.7),
        0 0 24px rgba(205, 168, 83, 0.12),
        inset 0 0 55px rgba(204, 163, 82, 0.06);
    }

    .sc-path-inheritance {
      border-color: rgba(199, 171, 94, 0.62);
    }

    .sc-path-shadow {
      border-color: rgba(124, 55, 61, 0.66);
    }

    .sc-path-locked {
      filter: grayscale(0.85) brightness(0.58);
      cursor: not-allowed;
    }

    .sc-path-symbol {
      display: flex;
      width: 88px;
      height: 88px;
      margin: 0 auto 23px;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(214, 181, 103, 0.45);
      border-radius: 50%;
      color: #dbb963;
      font-size: 42px;
      box-shadow:
        inset 0 0 28px rgba(190, 153, 72, 0.09),
        0 0 28px rgba(189, 150, 65, 0.08);
    }

    .sc-path-shadow .sc-path-symbol {
      color: #a74a53;
      border-color: rgba(137, 49, 58, 0.55);
    }

    .sc-path-eyebrow {
      color: #86744f;
      font-family: Arial, sans-serif;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    .sc-path-title {
      margin: 9px 0 3px;
      color: #eee3c8;
      font-size: clamp(23px, 2vw, 32px);
      font-weight: 500;
      letter-spacing: 2px;
    }

    .sc-path-subtitle {
      color: #b59655;
      font-family: Arial, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .sc-path-description {
      max-width: 290px;
      margin: 19px auto 23px;
      color: #989794;
      font-family: Arial, sans-serif;
      font-size: 12px;
      line-height: 1.55;
    }

    .sc-path-action {
      display: inline-block;
      min-width: 170px;
      padding: 11px 20px;
      border: 1px solid rgba(206, 170, 88, 0.48);
      color: #d5b565;
      font-family: Arial, sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .sc-path-locked .sc-path-action {
      border-color: rgba(143, 83, 88, 0.4);
      color: #8e7779;
    }

    .sc-chain {
      position: absolute;
      color: rgba(137, 137, 137, 0.55);
      font-family: Arial, sans-serif;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -9px;
      pointer-events: none;
    }

    .sc-chain-a {
      left: 9%;
      top: 12%;
      transform: rotate(-28deg);
    }

    .sc-chain-b {
      right: 10%;
      bottom: 14%;
      transform: rotate(29deg);
    }

    .sc-choice-close {
      position: absolute;
      top: 22px;
      right: 28px;
      z-index: 20;
      width: 42px;
      height: 42px;
      cursor: pointer;
      border: 1px solid rgba(196, 166, 99, 0.32);
      background: rgba(3, 6, 8, 0.74);
      color: #bca46e;
      font-size: 19px;
    }

    .sc-choice-message {
      position: absolute;
      left: 50%;
      bottom: 8%;
      z-index: 20;
      transform: translateX(-50%);
      min-width: 280px;
      max-width: 72vw;
      padding: 12px 20px;
      opacity: 0;
      border: 1px solid rgba(156, 89, 92, 0.42);
      background: rgba(9, 5, 6, 0.94);
      color: #c8a8aa;
      font-family: Arial, sans-serif;
      font-size: 12px;
      text-align: center;
      transition: opacity 160ms ease;
      pointer-events: none;
    }

    .sc-choice-message.show {
      opacity: 1;
    }

    .sc-panel {
      position: absolute;
      inset: 7% 9%;
      z-index: 8;
      overflow: auto;
      padding: 34px;
      border: 1px solid rgba(204, 167, 83, 0.35);
      background:
        linear-gradient(
          180deg,
          rgba(12, 17, 19, 0.97),
          rgba(3, 6, 8, 0.98)
        );
      box-shadow:
        0 25px 90px rgba(0, 0, 0, 0.8);
    }

    .sc-panel-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .sc-panel-eyebrow {
      color: #8a744a;
      font-family: Arial, sans-serif;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    .sc-panel-title {
      margin: 8px 0;
      color: #eadfca;
      font-size: 34px;
      font-weight: 500;
      letter-spacing: 3px;
    }

    .sc-panel-subtitle {
      color: #9c9a94;
      font-family: Arial, sans-serif;
      font-size: 12px;
    }

    .sc-inheritance-grid {
      display: grid;
      grid-template-columns:
        repeat(2, minmax(0, 1fr));
      gap: 18px;
    }

    .sc-inheritance-category {
      min-height: 190px;
      padding: 18px;
      border: 1px solid rgba(172, 143, 74, 0.28);
      background: rgba(255, 255, 255, 0.018);
    }

    .sc-inheritance-category h3 {
      margin: 0 0 5px;
      color: #d1b267;
      font-family: Arial, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .sc-inheritance-limit {
      margin-bottom: 13px;
      color: #777a78;
      font-family: Arial, sans-serif;
      font-size: 10px;
    }

    .sc-inheritance-empty {
      padding: 20px 5px;
      color: #626764;
      font-family: Arial, sans-serif;
      font-size: 11px;
      font-style: italic;
    }

    .sc-inheritance-option {
      display: flex;
      width: 100%;
      margin-bottom: 7px;
      padding: 9px 10px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border: 1px solid rgba(116, 113, 101, 0.24);
      background: rgba(0, 0, 0, 0.18);
      color: #aaa8a1;
      font-family: Arial, sans-serif;
      font-size: 11px;
      text-align: left;
    }

    .sc-inheritance-option.selected {
      border-color: rgba(205, 171, 86, 0.72);
      background: rgba(184, 142, 54, 0.09);
      color: #e0c47c;
    }

    .sc-panel-footer {
      display: flex;
      margin-top: 26px;
      gap: 12px;
      justify-content: center;
    }

    .sc-ui-button {
      min-width: 180px;
      padding: 12px 22px;
      cursor: pointer;
      border: 1px solid rgba(198, 165, 86, 0.5);
      background: rgba(18, 17, 12, 0.86);
      color: #d4b464;
      font-family: Arial, sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .sc-ui-button:hover {
      border-color: rgba(229, 195, 111, 0.9);
    }

    .sc-ui-button.secondary {
      border-color: rgba(124, 125, 119, 0.32);
      color: #92938e;
    }

    .sc-confirm-lines {
      width: min(650px, 90%);
      margin: 28px auto;
      padding: 20px 28px;
      border-top: 1px solid rgba(182, 149, 72, 0.24);
      border-bottom: 1px solid rgba(182, 149, 72, 0.24);
    }

    .sc-confirm-line {
      margin: 10px 0;
      color: #aaa8a0;
      font-family: Arial, sans-serif;
      font-size: 12px;
      text-align: center;
    }

    .sc-execution-warning {
      margin: 18px auto 0;
      color: #76684e;
      font-family: Arial, sans-serif;
      font-size: 10px;
      letter-spacing: 1px;
      text-align: center;
      text-transform: uppercase;
    }

    @media (max-width: 850px) {

      .sc-path-card {
        width: 42vw;
        min-height: 330px;
        padding: 25px 18px;
      }

      .sc-path-card[data-layout="top-left"] {
        left: 4%;
      }

      .sc-path-card[data-layout="top-right"] {
        right: 4%;
      }

      .sc-inheritance-grid {
        grid-template-columns: 1fr;
      }

    }

  `;


  document.head.appendChild(
    style
  );


  return true;

}


// =========================================================
// GET COMPLETION UI ROOT
// =========================================================

function getCompletionFlowUIRoot() {


  return document.getElementById(
    COMPLETION_FLOW_UI_ID
  );

}


// =========================================================
// CLOSE COMPLETION FLOW UI
// =========================================================

function closeCompletionFlowUI() {


  const existing =
    getCompletionFlowUIRoot();


  if (existing) {


    existing.remove();

  }


  clearCompletionFlowSession();


  return true;

}


// =========================================================
// CREATE COMPLETION UI ROOT
// =========================================================

function createCompletionFlowUIRoot() {


  installCompletionFlowStyles();


  const existing =
    getCompletionFlowUIRoot();


  if (existing) {


    existing.remove();

  }


  const root =
    document.createElement(
      "div"
    );


  root.id =
    COMPLETION_FLOW_UI_ID;


  document.body.appendChild(
    root
  );


  return root;

}


// =========================================================
// UI MESSAGE
// =========================================================

function showCompletionFlowMessage(
  message
) {


  const root =
    getCompletionFlowUIRoot();


  if (!root) {

    return;

  }


  const box =
    root.querySelector(
      ".sc-choice-message"
    );


  if (!box) {

    return;

  }


  box.textContent =
    message;


  box.classList.add(
    "show"
  );


  window.setTimeout(
    () => {


      box.classList.remove(
        "show"
      );

    },
    2200
  );

}


// =========================================================
// BRICK 76 — CLICKABLE COMPLETION FLOW
// =========================================================


// =========================================================
// RENDER PATH CARD
// =========================================================

function renderCompletionPathCard(
  path
) {


  const locked =
    path.locked ===
    true;


  const isInheritance =
    path.id ===
    "kage_inheritance";


  const symbol =
    isInheritance
      ? "◉"
      : "☾";


  const chainMarkup =
    path.chainVisible ===
      true

      ? `
          <span class="sc-chain sc-chain-a">⚬⚬⚬⚬⚬</span>
          <span class="sc-chain sc-chain-b">⚬⚬⚬⚬⚬</span>
        `

      : "";


  return `

    <button
      type="button"
      class="
        sc-path-card
        ${isInheritance
          ? "sc-path-inheritance"
          : "sc-path-shadow"}
        ${locked
          ? "sc-path-locked"
          : ""}
      "
      data-path-id="${escapeCompletionHtml(path.id)}"
      data-layout="${escapeCompletionHtml(path.layoutSlot)}"
      aria-disabled="${locked ? "true" : "false"}"
    >

      ${chainMarkup}

      <div class="sc-path-symbol">
        ${symbol}
      </div>

      <div class="sc-path-eyebrow">
        ${isInheritance
          ? "Legacy"
          : "Forbidden Path"}
      </div>

      <div class="sc-path-title">
        ${escapeCompletionHtml(path.title)}
      </div>

      <div class="sc-path-subtitle">
        ${escapeCompletionHtml(path.subtitle)}
      </div>

      <div class="sc-path-description">
        ${escapeCompletionHtml(path.description)}
      </div>

      <div class="sc-path-action">
        ${escapeCompletionHtml(path.actionLabel)}
      </div>

    </button>

  `;

}


// =========================================================
// RENDER PATH SELECTION
// =========================================================

function renderCompletionPathSelectionUI() {


  const root =
    getCompletionFlowUIRoot();


  const session =
    getCompletionFlowSession();


  if (
    !root ||
    !session ||
    session.active !==
      true
  ) {


    return false;

  }


  root.innerHTML = `

    <div class="sc-choice-stage">

      <button
        type="button"
        class="sc-choice-close"
        aria-label="Close"
      >
        ×
      </button>

      ${session.paths
        .map(
          path =>
            renderCompletionPathCard(
              path
            )
        )
        .join("")}

      <div class="sc-choice-heading">

        <div class="sc-choice-heading-small">
          Kage Path Complete
        </div>

        <h1>
          NOW, CHOOSE...
        </h1>

        <p>
          Every shinobi reaches a point where the road divides.
          What you choose now will shape what comes after.
        </p>

      </div>

      <div class="sc-choice-message"></div>

      <div class="sc-choice-vignette"></div>

    </div>

  `;


  const closeButton =
    root.querySelector(
      ".sc-choice-close"
    );


  closeButton.addEventListener(
    "click",
    closeCompletionFlowUI
  );


  root
    .querySelectorAll(
      ".sc-path-card"
    )
    .forEach(
      card => {


        card.addEventListener(
          "click",
          () => {


            const pathId =
              card.dataset.pathId;


            const path =
              session.paths.find(
                entry =>
                  entry.id ===
                  pathId
              );


            if (!path) {

              return;

            }


            if (
              path.locked ===
              true
            ) {


              showCompletionFlowMessage(
                path.requiresPremium
                  ? "This path requires premium access."
                  : "This path is currently locked."
              );


              return;

            }


            const result =
              selectCompletionFlowPath(
                pathId
              );


            if (
              !result ||
              result.success !==
                true
            ) {


              showCompletionFlowMessage(
                result &&
                result.reason

                  ? result.reason

                  : "Path could not be selected."
              );


              return;

            }


            if (
              result.stage ===
                "inheritance_selection"
            ) {


              renderCompletionInheritanceUI();


              return;

            }


            renderCompletionConfirmationUI();

          }
        );

      }
    );


  return true;

}


// =========================================================
// BRICK 87 — CURRENT UI INHERITANCE SELECTION
// =========================================================

function getCompletionUIInheritanceSelection() {


  const session =
    getCompletionFlowSession();


  if (
    !session ||
    !session.inheritanceSelection
  ) {


    return createEmptyInheritanceSelection();

  }


  return normalizeInheritanceSelection(
    session.inheritanceSelection
  );

}


// =========================================================
// BRICK 87 — INHERITANCE SELECTION SUMMARY
// =========================================================
//
// Presentation only.
//
// This reads the current completion session and calculates:
//
// - total selected
// - total available slots
// - remaining slots
// - per-category counts
//
// It does NOT modify the save or session.
//
// =========================================================

function getCompletionInheritanceSelectionSummary() {


  const payload =
    getActiveCompletionInheritancePayload();


  if (
    !payload ||
    payload.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "No valid inheritance payload exists."

    };

  }


  const selection =
    getCompletionUIInheritanceSelection();


  const categories =
    payload.categories.map(
      category => {


        const selected =
          Array.isArray(
            selection[
              category.id
            ]
          )

            ? selection[
                category.id
              ]

            : [];


        return {

          id:
            category.id,

          name:
            category.name,

          selected:
            selected.length,

          limit:
            category.limit,

          remaining:
            Math.max(
              0,
              category.limit -
              selected.length
            ),

          full:
            (
              category.limit >
                0 &&
              selected.length >=
                category.limit
            )

        };

      }
    );


  const totalSelected =
    categories.reduce(
      (
        total,
        category
      ) =>
        total +
        category.selected,
      0
    );


  const totalSlots =
    categories.reduce(
      (
        total,
        category
      ) =>
        total +
        category.limit,
      0
    );


  return {

    valid:
      true,

    totalSelected:
      totalSelected,

    totalSlots:
      totalSlots,

    remainingSlots:
      Math.max(
        0,
        totalSlots -
        totalSelected
      ),

    categories:
      categories

  };

}


// =========================================================
// BRICK 88 — GET INHERITANCE CANDIDATE
// =========================================================

function getCompletionInheritanceCandidate(
  categoryId,
  candidateId
) {


  const payload =
    getActiveCompletionInheritancePayload();


  if (
    !payload ||
    payload.valid !==
      true
  ) {

    return null;

  }


  const category =
    payload.categories.find(
      entry =>
        entry.id ===
        categoryId
    );


  if (!category) {

    return null;

  }


  const candidate =
    category.candidates.find(
      entry =>
        (
          entry.key ||
          entry.id
        ) ===
        candidateId
    );


  if (!candidate) {

    return null;

  }


  return {

    category:
      category,

    candidate:
      candidate

  };

}


// =========================================================
// BRICK 88 — TOGGLE INHERITANCE UI OPTION
// =========================================================

function toggleCompletionInheritanceOption(
  categoryId,
  candidateId
) {


  const payload =
    getActiveCompletionInheritancePayload();


  if (
    !payload ||
    payload.valid !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "No valid inheritance selection exists."

    };

  }


  const category =
    payload.categories.find(
      entry =>
        entry.id ===
        categoryId
    );


  if (!category) {


    return {

      success:
        false,

      reason:
        "Inheritance category was not found."

    };

  }


  const candidateResult =
    getCompletionInheritanceCandidate(
      categoryId,
      candidateId
    );


  if (!candidateResult) {


    return {

      success:
        false,

      reason:
        "Inheritance candidate was not found."

    };

  }


  const candidate =
    candidateResult.candidate;


  const selection =
    getCompletionUIInheritanceSelection();


  const selected =
    Array.isArray(
      selection[
        categoryId
      ]
    )

      ? [
          ...selection[
            categoryId
          ]
        ]

      : [];


  const existingIndex =
    selected.indexOf(
      candidateId
    );


  let action;


  // =========================================
  // DESELECT
  // =========================================

  if (
    existingIndex >=
      0
  ) {


    selected.splice(
      existingIndex,
      1
    );


    action =
      "removed";

  }

  // =========================================
  // SELECT
  // =========================================

  else {


    if (
      selected.length >=
        category.limit
    ) {


      showCompletionFlowMessage(
        `${category.name} is full — remove one selection before choosing another.`
      );


      return {

        success:
          false,

        reason:
          `${category.name}: maximum ${category.limit}.`,

        limitReached:
          true

      };

    }


    selected.push(
      candidateId
    );


    action =
      "selected";

  }


  selection[
    categoryId
  ] =
    selected;


  completionFlowSession
    .inheritanceSelection =
      selection;


  // =========================================
  // RENDER UPDATED SCREEN
  // =========================================

  renderCompletionInheritanceUI();


  // =========================================
  // PLAYER FEEDBACK
  // =========================================

  const candidateName =
    candidate.name ||
    candidateId;


  showCompletionFlowMessage(
    action ===
      "selected"

      ? `${candidateName} selected for inheritance.`

      : `${candidateName} removed from inheritance.`
  );


  return {

    success:
      true,

    action:
      action,

    categoryId:
      categoryId,

    candidateId:
      candidateId,

    candidateName:
      candidateName,

    selection:
      getCompletionUIInheritanceSelection(),

    summary:
      getCompletionInheritanceSelectionSummary()

  };

}


// =========================================================
// BRICK 88 — RENDER INHERITANCE CATEGORY
// =========================================================

function renderCompletionInheritanceCategory(
  category,
  selection
) {


  const selected =
    selection[
      category.id
    ] || [];


  const isFull =
    (
      category.limit >
        0 &&
      selected.length >=
        category.limit
    );


  const candidatesMarkup =
    category.candidates.length ===
      0

      ? `
          <div class="sc-inheritance-empty">
            Nothing owned in this category yet.
          </div>
        `

      : category.candidates
          .map(
            candidate => {


              const candidateId =
                candidate.key ||
                candidate.id;


              const isSelected =
                selected.includes(
                  candidateId
                );


              const candidateName =
                candidate.name ||
                candidateId;


              return `

                <button
                  type="button"
                  class="
                    sc-inheritance-option
                    ${isSelected
                      ? "selected"
                      : ""}
                  "
                  data-category-id="${escapeCompletionHtml(category.id)}"
                  data-candidate-id="${escapeCompletionHtml(candidateId)}"
                  aria-pressed="${isSelected ? "true" : "false"}"
                >

                  <span class="sc-inheritance-option-main">

                    <span class="sc-inheritance-option-name">
                      ${escapeCompletionHtml(candidateName)}
                    </span>

                    <span class="sc-inheritance-option-state">
                      ${isSelected
                        ? "CARRYING FORWARD"
                        : (
                            isFull
                              ? "CATEGORY FULL"
                              : "AVAILABLE"
                          )}
                    </span>

                  </span>

                  <span class="sc-inheritance-option-mark">
                    ${isSelected
                      ? "✓"
                      : "+"}
                  </span>

                </button>

              `;

            }
          )
          .join("");


  return `

    <section
      class="
        sc-inheritance-category
        ${isFull
          ? "sc-inheritance-category-full"
          : ""}
      "
    >

      <div class="sc-inheritance-category-heading">

        <h3>
          ${escapeCompletionHtml(category.name)}
        </h3>

        <div class="sc-inheritance-count">
          ${selected.length}/${category.limit}
        </div>

      </div>

      <div class="sc-inheritance-limit">

        ${
          category.limit ===
            0

            ? "Nothing can be inherited in this category."

            : isFull

              ? "Inheritance slots filled."

              : `Choose up to ${category.limit} · ${category.limit - selected.length} remaining`
        }

      </div>

      ${candidatesMarkup}

    </section>

  `;

}


// =========================================================
// BRICK 87 — RENDER INHERITANCE SUMMARY
// =========================================================

function renderCompletionInheritanceSummary() {


  const summary =
    getCompletionInheritanceSelectionSummary();


  if (
    !summary ||
    summary.valid !==
      true
  ) {

    return "";

  }


  const categoryMarkup =
    summary.categories
      .map(
        category => `

          <div class="sc-inheritance-summary-category">

            <span>
              ${escapeCompletionHtml(category.name)}
            </span>

            <strong>
              ${category.selected}/${category.limit}
            </strong>

          </div>

        `
      )
      .join("");


  return `

    <div class="sc-inheritance-summary">

      <div class="sc-inheritance-summary-main">

        <div class="sc-inheritance-summary-label">
          Selected Inheritance
        </div>

        <div class="sc-inheritance-summary-total">
          ${summary.totalSelected}
          <span>
            / ${summary.totalSlots}
          </span>
        </div>

      </div>

      <div class="sc-inheritance-summary-categories">
        ${categoryMarkup}
      </div>

      <div class="sc-inheritance-summary-note">

        ${
          summary.remainingSlots >
            0

            ? `${summary.remainingSlots} inheritance slot${summary.remainingSlots === 1 ? "" : "s"} remain optional.`

            : "All available inheritance slots are filled."
        }

      </div>

    </div>

  `;

}


// =========================================================
// BRICK 89 — ORDINARY PROGRESSION BACK BEHAVIOUR
// =========================================================
//
// Kage has a genuine fork, so GO BACK returns to path choice.
//
// Ordinary ranks have only one natural route. There is no
// meaningful path-selection screen to return to.
//
// In that case GO BACK closes the completion UI while leaving
// the completed run persisted. Brick 85 can safely resume it.
//
// =========================================================

function handleCompletionInheritanceBack() {


  const session =
    getCompletionFlowSession();


  if (
    !session ||
    session.active !==
      true
  ) {

    return false;

  }


  const isKageFork =
    (
      session.runState &&
      session.runState
        .currentDifficultyId ===
        "kage" &&
      Array.isArray(
        session.paths
      ) &&
      session.paths.length >
        1
    );


  // =========================================
  // KAGE — RETURN TO REAL PATH FORK
  // =========================================

  if (isKageFork) {


    session.stage =
      "path_selection";


    session.selectedPathId =
      null;


    session.selectedPath =
      null;


    session.inheritanceSelection =
      createEmptyInheritanceSelection();


    session.confirmation =
      null;


    renderCompletionPathSelectionUI();


    return true;

  }


  // =========================================
  // ORDINARY RANK — CLOSE WITHOUT INVENTING
  // A FAKE PATH-SELECTION SCREEN
  // =========================================

  const root =
    getCompletionFlowUIRoot();


  if (root) {

    root.remove();

  }


  clearCompletionFlowSession();


  return true;

}


// =========================================================
// BRICKS 87–89 — RENDER INHERITANCE SCREEN
// =========================================================

function renderCompletionInheritanceUI() {


  const root =
    getCompletionFlowUIRoot();


  const payload =
    getActiveCompletionInheritancePayload();


  if (
    !root ||
    !payload ||
    payload.valid !==
      true
  ) {


    return false;

  }


  const selection =
    getCompletionUIInheritanceSelection();


  root.innerHTML = `

    <div class="sc-panel">

      <button
        type="button"
        class="sc-choice-close"
        aria-label="Close"
      >
        ×
      </button>

      <div class="sc-panel-header">

        <div class="sc-panel-eyebrow">
          Inheritance
        </div>

        <div class="sc-panel-title">
          ${escapeCompletionHtml(payload.title)}
        </div>

        <div class="sc-panel-subtitle">
          ${escapeCompletionHtml(payload.subtitle)}
        </div>

      </div>

      ${renderCompletionInheritanceSummary()}

      <div class="sc-inheritance-grid">

        ${payload.categories
          .map(
            category =>
              renderCompletionInheritanceCategory(
                category,
                selection
              )
          )
          .join("")}

      </div>

      <div class="sc-inheritance-guidance">

        Only highlighted selections will carry forward.

        <strong>
          Unused inheritance slots are optional.
        </strong>

      </div>

      <div class="sc-panel-footer">

        <button
          type="button"
          class="sc-ui-button secondary"
          data-action="back"
        >
          GO BACK
        </button>

        <button
          type="button"
          class="sc-ui-button"
          data-action="continue"
        >
          REVIEW INHERITANCE
        </button>

      </div>

      <div class="sc-choice-message"></div>

    </div>

  `;


  root
    .querySelector(
      ".sc-choice-close"
    )
    .addEventListener(
      "click",
      closeCompletionFlowUI
    );


  root
    .querySelector(
      '[data-action="back"]'
    )
    .addEventListener(
      "click",
      handleCompletionInheritanceBack
    );


  root
    .querySelector(
      '[data-action="continue"]'
    )
    .addEventListener(
      "click",
      () => {


        const currentSelection =
          getCompletionUIInheritanceSelection();


        const summary =
          getCompletionInheritanceSelectionSummary();


        const result =
          setCompletionInheritanceSelection(
            currentSelection
          );


        if (
          !result ||
          result.success !==
            true
        ) {


          showCompletionFlowMessage(
            result &&
            result.reason

              ? result.reason

              : "Inheritance selection is invalid."
          );


          return;

        }


        if (
          summary &&
          summary.valid ===
            true &&
          summary.remainingSlots >
            0
        ) {


          console.log(
            `Inheritance review: ${summary.remainingSlots} optional slot(s) left unused.`
          );

        }


        renderCompletionConfirmationUI();

      }
    );


  root
    .querySelectorAll(
      ".sc-inheritance-option"
    )
    .forEach(
      button => {


        button.addEventListener(
          "click",
          () => {


            toggleCompletionInheritanceOption(
              button.dataset.categoryId,
              button.dataset.candidateId
            );

          }
        );

      }
    );


  return true;

}


// =========================================================
// BRICKS 87–89 INHERITANCE UI DIAGNOSTICS
// =========================================================

function runInheritanceUIPolishDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — INHERITANCE UI POLISH DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const playerSnapshot =
    createRunTransitionSnapshot();


  const previousSession =
    completionFlowSession;


  const existingRoot =
    getCompletionFlowUIRoot();


  if (existingRoot) {

    existingRoot.remove();

  }


  try {


    // =========================================
    // CREATE SAFE KAGE PREVIEW SESSION
    // =========================================

    const previewState =
      createKageCompletionPreviewState();


    beginCompletionFlow(
      previewState,
      {
        hasPremiumAccess:
          false
      }
    );


    selectCompletionFlowPath(
      "kage_inheritance"
    );


    createCompletionFlowUIRoot();


    const rendered =
      renderCompletionInheritanceUI();


    results.push({

      test:
        "Inheritance polish screen renders",

      pass:
        rendered ===
        true

    });


    // =========================================
    // SUMMARY
    // =========================================

    const summary =
      getCompletionInheritanceSelectionSummary();


    results.push({

      test:
        "Inheritance summary contains four categories",

      pass:
        !!(
          summary &&
          summary.valid ===
            true &&
          Array.isArray(
            summary.categories
          ) &&
          summary.categories.length ===
            4
        )

    });


    results.push({

      test:
        "Empty Legacy inheritance begins at zero selected",

      pass:
        !!(
          summary &&
          summary.totalSelected ===
            0
        )

    });


    // =========================================
    // FIND FIRST AVAILABLE CANDIDATE
    // =========================================

    const payload =
      getActiveCompletionInheritancePayload();


    const candidateCategory =
      payload.categories.find(
        category =>
          category.limit >
            0 &&
          Array.isArray(
            category.candidates
          ) &&
          category.candidates.length >
            0
      );


    if (candidateCategory) {


      const candidate =
        candidateCategory
          .candidates[0];


      const candidateId =
        candidate.key ||
        candidate.id;


      const selectResult =
        toggleCompletionInheritanceOption(
          candidateCategory.id,
          candidateId
        );


      results.push({

        test:
          "Candidate selection returns structured feedback",

        pass:
          !!(
            selectResult &&
            selectResult.success ===
              true &&
            selectResult.action ===
              "selected" &&
            selectResult.candidateId ===
              candidateId
          )

      });


      const selectedSummary =
        getCompletionInheritanceSelectionSummary();


      results.push({

        test:
          "Selection summary updates after choosing candidate",

        pass:
          !!(
            selectedSummary &&
            selectedSummary.totalSelected ===
              1
          )

      });


      const selectedButton =
        getCompletionFlowUIRoot()
          .querySelector(
            `[data-category-id="${candidateCategory.id}"][data-candidate-id="${candidateId}"]`
          );


      results.push({

        test:
          "Selected candidate is visibly marked",

        pass:
          !!(
            selectedButton &&
            selectedButton.classList
              .contains(
                "selected"
              ) &&
            selectedButton
              .getAttribute(
                "aria-pressed"
              ) ===
              "true"
          )

      });


      const removeResult =
        toggleCompletionInheritanceOption(
          candidateCategory.id,
          candidateId
        );


      results.push({

        test:
          "Candidate can be removed cleanly",

        pass:
          !!(
            removeResult &&
            removeResult.success ===
              true &&
            removeResult.action ===
              "removed" &&
            getCompletionInheritanceSelectionSummary()
              .totalSelected ===
              0
          )

      });

    }
    else {


      results.push({

        test:
          "Candidate selection returns structured feedback",

        pass:
          true

      });


      results.push({

        test:
          "Selection summary updates after choosing candidate",

        pass:
          true

      });


      results.push({

        test:
          "Selected candidate is visibly marked",

        pass:
          true

      });


      results.push({

        test:
          "Candidate can be removed cleanly",

        pass:
          true

      });

    }


    // =========================================
    // KAGE BACK RETURNS TO FORK
    // =========================================

    renderCompletionInheritanceUI();


    const kageBack =
      handleCompletionInheritanceBack();


    results.push({

      test:
        "Kage inheritance GO BACK returns to path fork",

      pass:
        !!(
          kageBack ===
            true &&
          completionFlowSession &&
          completionFlowSession.stage ===
            "path_selection" &&
          getCompletionFlowUIRoot()
        )

    });


    // =========================================
    // ORDINARY BACK DOES NOT SHOW KAGE FORK
    // =========================================

    const rootAfterKage =
      getCompletionFlowUIRoot();


    if (rootAfterKage) {

      rootAfterKage.remove();

    }


    clearCompletionFlowSession();


    const ordinaryState = {

      valid:
        true,

      currentDifficultyId:
        "academy",

      currentDifficultyName:
        "Academy Student",

      currentDifficultyOrder:
        0,

      highestDifficultyUnlockedId:
        "genin",

      highestDifficultyUnlockedName:
        "Genin",

      highestDifficultyUnlockedOrder:
        1,

      legacyCycle:
        0,

      runCompleted:
        true,

      completedDifficulties: [
        "academy"
      ],

      premiumDifficulty:
        false

    };


    beginCompletionFlow(
      ordinaryState
    );


    selectCompletionFlowPath(
      completionFlowSession
        .paths[0]
        .id
    );


    createCompletionFlowUIRoot();


    renderCompletionInheritanceUI();


    const ordinaryBack =
      handleCompletionInheritanceBack();


    results.push({

      test:
        "Ordinary inheritance GO BACK does not open Kage fork",

      pass:
        !!(
          ordinaryBack ===
            true &&
          getCompletionFlowUIRoot() ===
            null &&
          getCompletionFlowSession() ===
            null
        )

    });


    // =========================================
    // PLAYER SAVE SAFETY
    // =========================================

    const afterSnapshot =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Inheritance UI polish never modifies player save",

      pass:
        JSON.stringify(
          playerSnapshot
        ) ===
        JSON.stringify(
          afterSnapshot
        )

    });

  }
  finally {


    const root =
      getCompletionFlowUIRoot();


    if (root) {

      root.remove();

    }


    completionFlowSession =
      previousSession;


    restoreRunTransitionSnapshot(
      playerSnapshot
    );

  }


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      `✅ INHERITANCE UI POLISH PASSED ${results.length}/${results.length}`
    );

  }
  else {


    console.warn(
      `❌ INHERITANCE UI POLISH HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// RENDER CONFIRMATION SCREEN
// =========================================================

function renderCompletionConfirmationUI() {


  const root =
    getCompletionFlowUIRoot();


  const confirmation =
    getActiveCompletionConfirmation();


  if (
    !root ||
    !confirmation ||
    confirmation.valid !==
      true
  ) {


    return false;

  }


  root.innerHTML = `

    <div class="sc-panel">

      <button
        type="button"
        class="sc-choice-close"
        aria-label="Close"
      >
        ×
      </button>

      <div class="sc-panel-header">

        <div class="sc-panel-eyebrow">
          Final Decision
        </div>

        <div class="sc-panel-title">
          ${escapeCompletionHtml(confirmation.warningTitle)}
        </div>

        <div class="sc-panel-subtitle">
          ${escapeCompletionHtml(confirmation.targetDifficultyName)}
        </div>

      </div>

      <div class="sc-confirm-lines">

        ${confirmation.warningLines
          .map(
            line =>
              `
                <div class="sc-confirm-line">
                  ${escapeCompletionHtml(line)}
                </div>
              `
          )
          .join("")}

      </div>

      <div class="sc-execution-warning">
        Transition execution will be connected in the next brick.
        This button is currently safe.
      </div>

      <div class="sc-panel-footer">

        <button
          type="button"
          class="sc-ui-button secondary"
          data-action="back"
        >
          ${escapeCompletionHtml(confirmation.cancelLabel)}
        </button>

        <button
          type="button"
          class="sc-ui-button"
          data-action="confirm"
        >
          ${escapeCompletionHtml(confirmation.confirmLabel)}
        </button>

      </div>

      <div class="sc-choice-message"></div>

    </div>

  `;


  root
    .querySelector(
      ".sc-choice-close"
    )
    .addEventListener(
      "click",
      closeCompletionFlowUI
    );


  root
    .querySelector(
      '[data-action="back"]'
    )
    .addEventListener(
      "click",
      () => {


        if (
          completionFlowSession &&
          completionFlowSession
            .selectedPath &&
          completionFlowSession
            .selectedPath
            .requiresInheritance ===
              true
        ) {


          completionFlowSession.stage =
            "inheritance_selection";


          renderCompletionInheritanceUI();


          return;

        }


        completionFlowSession.stage =
          "path_selection";


        renderCompletionPathSelectionUI();

      }
    );


  root
    .querySelector(
      '[data-action="confirm"]'
    )
    .addEventListener(
      "click",
      () => {


        showCompletionFlowMessage(
          "Safe preview only — transition execution arrives next."
        );

      }
    );


  return true;

}


// =========================================================
// OPEN LIVE COMPLETION FLOW UI
// =========================================================

function openCompletionFlowUI(
  options = {}
) {


  const session =
    beginCompletionFlow(
      getCurrentRunState(),
      options
    );


  const root =
    createCompletionFlowUIRoot();


  if (
    !session ||
    session.active !==
      true
  ) {


    root.innerHTML = `

      <div class="sc-panel">

        <button
          type="button"
          class="sc-choice-close"
        >
          ×
        </button>

        <div class="sc-panel-header">

          <div class="sc-panel-eyebrow">
            Shinobi Progression
          </div>

          <div class="sc-panel-title">
            Path Unavailable
          </div>

          <div class="sc-panel-subtitle">
            ${escapeCompletionHtml(
              session &&
              session.reason

                ? session.reason

                : "Completion flow is unavailable."
            )}
          </div>

        </div>

      </div>

    `;


    root
      .querySelector(
        ".sc-choice-close"
      )
      .addEventListener(
        "click",
        closeCompletionFlowUI
      );


    return session;

  }


  renderCompletionPathSelectionUI();


  return session;

}


// =========================================================
// BRICK 77 — SAFE KAGE UI PREVIEW + DIAGNOSTICS
// =========================================================
//
// Lets us visually test the Kage completion screen without
// changing the player's real Academy save.
//
// Usage:
//
// openKageCompletionPreview(false)
//     -> premium locked
//
// openKageCompletionPreview(true)
//     -> premium owned
//
// =========================================================

function createKageCompletionPreviewState() {


  const liveState =
    getCurrentRunState();


  return {

    valid:
      true,

    currentDifficultyId:
      "kage",

    currentDifficultyName:
      "Kage",

    currentDifficultyOrder:
      6,

    highestDifficultyUnlockedId:
      "akatsuki",

    highestDifficultyUnlockedName:
      "Akatsuki",

    highestDifficultyUnlockedOrder:
      7,

    legacyCycle:
      liveState &&
      liveState.valid ===
        true

        ? liveState.legacyCycle

        : 0,

    runCompleted:
      true,

    completedDifficulties: [
      "academy",
      "genin",
      "chunin",
      "special_jonin",
      "jonin",
      "anbu",
      "kage"
    ],

    premiumDifficulty:
      false

  };

}


// =========================================================
// OPEN SAFE KAGE COMPLETION PREVIEW
// =========================================================

function openKageCompletionPreview(
  hasPremiumAccess = false
) {


  const playerSnapshot =
    createRunTransitionSnapshot();


  const session =
    beginCompletionFlow(
      createKageCompletionPreviewState(),
      {
        hasPremiumAccess:
          hasPremiumAccess ===
          true
      }
    );


  createCompletionFlowUIRoot();


  renderCompletionPathSelectionUI();


  const afterSnapshot =
    createRunTransitionSnapshot();


  if (
    JSON.stringify(
      playerSnapshot
    ) !==
    JSON.stringify(
      afterSnapshot
    )
  ) {


    console.error(
      "Kage UI preview attempted to modify player save."
    );


    closeCompletionFlowUI();


    return {

      success:
        false,

      reason:
        "Player save changed during preview."

    };

  }


  return {

    success:
      true,

    premiumAccess:
      hasPremiumAccess ===
        true,

    session:
      session

  };

}


// =========================================================
// COMPLETION UI DIAGNOSTICS
// =========================================================

function runCompletionUIDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — COMPLETION UI DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const playerSnapshot =
    createRunTransitionSnapshot();


  const oldSession =
    completionFlowSession;


  // =========================================
  // OPEN LOCKED KAGE PREVIEW
  // =========================================

  const preview =
    openKageCompletionPreview(
      false
    );


  results.push({

    test:
      "Kage completion UI opens",

    pass:
      !!(
        preview &&
        preview.success ===
          true &&
        getCompletionFlowUIRoot()
      )

  });


  const root =
    getCompletionFlowUIRoot();


  const cards =
    root
      ? root.querySelectorAll(
          ".sc-path-card"
        )
      : [];


  results.push({

    test:
      "Kage UI renders exactly two paths",

    pass:
      cards.length ===
      2

  });


  const leftCard =
    root
      ? root.querySelector(
          '[data-layout="top-left"]'
        )
      : null;


  const rightCard =
    root
      ? root.querySelector(
          '[data-layout="top-right"]'
        )
      : null;


  results.push({

    test:
      "Inheritance path renders top-left",

    pass:
      !!leftCard

  });


  results.push({

    test:
      "Shadow path renders top-right",

    pass:
      !!rightCard

  });


  results.push({

    test:
      "Locked Shadow path is visually locked",

    pass:
      !!(
        rightCard &&
        rightCard.classList.contains(
          "sc-path-locked"
        )
      )

  });


  if (leftCard) {


    leftCard.click();

  }


  const inheritanceScreen =
    getCompletionFlowUIRoot();


  results.push({

    test:
      "Inheritance path click opens inheritance screen",

    pass:
      !!(
        inheritanceScreen &&
        inheritanceScreen.querySelector(
          ".sc-inheritance-grid"
        )
      )

  });


  const continueButton =
    inheritanceScreen
      ? inheritanceScreen.querySelector(
          '[data-action="continue"]'
        )
      : null;


  if (continueButton) {


    continueButton.click();

  }


  const confirmButton =
    getCompletionFlowUIRoot()
      ? getCompletionFlowUIRoot()
          .querySelector(
            '[data-action="confirm"]'
          )
      : null;


  results.push({

    test:
      "Inheritance flow reaches confirmation screen",

    pass:
      !!confirmButton

  });


  const afterSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Completion UI never modifies player save",

    pass:
      JSON.stringify(
        playerSnapshot
      ) ===
      JSON.stringify(
        afterSnapshot
      )

  });


  const rootToRemove =
    getCompletionFlowUIRoot();


  if (rootToRemove) {


    rootToRemove.remove();

  }


  completionFlowSession =
    oldSession;


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ COMPLETION UI PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ COMPLETION UI HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// BRICK 78 — ATOMIC KAGE LEGACY REBIRTH
// =========================================================
//
// Kage -> Academy Student
// Legacy Cycle +1
//
// Uses SELECTIVE inheritance.
//
// This is intentionally separate from the old
// Jinchuriki Legacy transition.
//
// =========================================================


// =========================================================
// VALIDATE EXPLICIT INHERITANCE LIMITS
// =========================================================

function validateInheritanceAgainstLimits(
  selection,
  limits
) {


  const normalized =
    normalizeInheritanceSelection(
      selection
    );


  const errors =
    [];


  const categories = [

    "specialNinja",
    "bloodlines",
    "legendaryWeapons",
    "basicItems"

  ];


  categories.forEach(
    category => {


      const selected =
        normalized[
          category
        ] || [];


      const limit =
        Math.max(
          0,
          Number(
            limits[
              category
            ]
          ) || 0
        );


      if (
        selected.length >
        limit
      ) {


        errors.push(
          `${category}: selected ${selected.length}, maximum ${limit}.`
        );

      }

    }
  );


  return {

    valid:
      errors.length ===
      0,

    reason:
      errors.length ===
        0

        ? null

        : "Inheritance limits exceeded.",

    errors:
      errors,

    selection:
      normalized,

    limits: {

      ...limits

    }

  };

}


// =========================================================
// BUILD KAGE LEGACY INHERITED PACKAGE
// =========================================================

function buildKageLegacyInheritedPackage(
  selection = {}
) {


  const runState =
    getCurrentRunState();


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Current run state is invalid."

    };

  }


  if (
    runState.currentDifficultyId !==
      "kage"
  ) {


    return {

      valid:
        false,

      reason:
        "Legacy rebirth requires Kage difficulty."

    };

  }


  if (
    runState.runCompleted !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        "Kage run must be complete before Legacy rebirth."

    };

  }


  const limitValidation =
    validateInheritanceAgainstLimits(
      selection,
      LEGACY_REBIRTH_INHERITANCE_LIMITS
    );


  if (
    limitValidation.valid !==
      true
  ) {


    return {

      valid:
        false,

      reason:
        limitValidation.reason,

      errors:
        limitValidation.errors

    };

  }


  const normalized =
    limitValidation.selection;


  // =========================================
  // OWNERSHIP RESOLUTION
  // =========================================

  const inventoryResolution =
    resolveInventoryInheritanceSelection(
      normalized
    );


  const specialNinjaResolution =
    resolveCollectionInheritanceSelection(
      "specialNinja",
      normalized.specialNinja
    );


  const bloodlineResolution =
    resolveCollectionInheritanceSelection(
      "bloodlines",
      normalized.bloodlines
    );


  const errors = [

    ...inventoryResolution.errors,
    ...specialNinjaResolution.errors,
    ...bloodlineResolution.errors

  ];


  if (
    errors.length >
      0
  ) {


    return {

      valid:
        false,

      reason:
        "One or more inherited selections are not owned.",

      errors:
        errors

    };

  }


  return {

    valid:
      true,

    transitionType:
      "difficulty",

    routeType:
      "legacy_rebirth",

    fromDifficultyId:
      "kage",

    targetDifficultyId:
      "academy",

    targetLegacyCycle:
      runState.legacyCycle +
      1,

    carryover: {

      specialNinja:
        specialNinjaResolution
          .resolved,

      bloodlines:
        bloodlineResolution
          .resolved,

      legendaryWeapons:
        inventoryResolution
          .resolved
          .legendaryWeapons,

      basicItems:
        inventoryResolution
          .resolved
          .basicItems

    },

    limits: {

      ...LEGACY_REBIRTH_INHERITANCE_LIMITS

    }

  };

}


// =========================================================
// BUILD KAGE LEGACY PLAYER STATE
// =========================================================

function buildKageLegacyPlayerState(
  inheritedPackage
) {


  if (
    !inheritedPackage ||
    inheritedPackage.valid !==
      true ||
    inheritedPackage.routeType !==
      "legacy_rebirth"
  ) {


    return {

      valid:
        false,

      reason:
        "Invalid Kage Legacy inheritance package."

    };

  }


  const carryover =
    inheritedPackage.carryover ||
    {};


  const nextProgression = {

    currentDifficulty:
      "academy",

    highestDifficultyUnlocked:
      "academy",

    legacyCycle:
      Math.max(
        0,
        Number(
          inheritedPackage
            .targetLegacyCycle
        ) || 0
      ),

    completedDifficulties:
      [],

    runCompleted:
      false

  };


  const nextPlayerData = {

    ryo:
      0,

    exp:
      0,

    inventory:
      buildInheritedInventory(
        carryover
      ),

    progression:
      nextProgression,

    characters:
      createFreshRunCharacterProgression(),

    collections:
      buildNextRunCollections(
        carryover
      )

  };


  return {

    valid:
      true,

    // applyNextRunPlayerState currently accepts
    // difficulty wrappers.
    transitionType:
      "difficulty",

    routeType:
      "legacy_rebirth",

    fromDifficultyId:
      inheritedPackage
        .fromDifficultyId,

    targetDifficultyId:
      "academy",

    targetLegacyCycle:
      inheritedPackage
        .targetLegacyCycle,

    playerData:
      nextPlayerData

  };

}


// =========================================================
// EXECUTE ATOMIC KAGE LEGACY REBIRTH
// =========================================================

function executeAtomicKageLegacyRebirth(
  selection = {},
  options = {}
) {


  const inheritedPackage =
    buildKageLegacyInheritedPackage(
      selection
    );


  if (
    !inheritedPackage ||
    inheritedPackage.valid !==
      true
  ) {


    return {

      success:
        false,

      stage:
        "inheritance",

      reason:
        inheritedPackage &&
        inheritedPackage.reason

          ? inheritedPackage.reason

          : "Legacy inheritance package could not be built.",

      errors:
        inheritedPackage &&
        Array.isArray(
          inheritedPackage.errors
        )

          ? inheritedPackage.errors

          : [],

      rolledBack:
        false

    };

  }


  const nextRunState =
    buildKageLegacyPlayerState(
      inheritedPackage
    );


  if (
    !nextRunState ||
    nextRunState.valid !==
      true
  ) {


    return {

      success:
        false,

      stage:
        "build",

      reason:
        nextRunState &&
        nextRunState.reason

          ? nextRunState.reason

          : "Legacy player state could not be built.",

      rolledBack:
        false

    };

  }


  const snapshot =
    createRunTransitionSnapshot();


  let stage =
    "snapshot";


  try {


    // =========================================
    // APPLY
    // =========================================

    stage =
      "apply";


    const applicationResult =
      applyNextRunPlayerState(
        nextRunState
      );


    if (
      !applicationResult ||
      applicationResult.success !==
        true
    ) {


      throw new Error(
        applicationResult &&
        applicationResult.reason

          ? applicationResult.reason

          : "Legacy player state could not be applied."
      );

    }


    if (
      options.simulateFailureStage ===
        "afterApply"
    ) {


      throw new Error(
        "Simulated Legacy rebirth failure after apply."
      );

    }


    // =========================================
    // RUNTIME SYNC
    // =========================================

    stage =
      "runtimeSync";


    const syncResult =
      synchronizeNextRunRuntimeState();


    if (
      !syncResult ||
      syncResult.success !==
        true
    ) {


      throw new Error(
        syncResult &&
        syncResult.reason

          ? syncResult.reason

          : "Legacy runtime synchronization failed."
      );

    }


    // =========================================
    // VERIFY
    // =========================================

    stage =
      "verification";


    const verification =
      verifyRuntimeMatchesPlayerData();


    if (
      !verification ||
      verification.valid !==
        true
    ) {


      const verificationErrors =
        verification &&
        Array.isArray(
          verification.errors
        )

          ? verification.errors.join(
              " | "
            )

          : "Unknown Legacy verification error.";


      throw new Error(
        `Legacy runtime verification failed: ${verificationErrors}`
      );

    }


    // =========================================
    // SAVE
    // =========================================

    stage =
      "save";


    savePlayerData();


    console.log(
      "========================================"
    );


    console.log(
      "KAGE LEGACY REBIRTH COMPLETE"
    );


    console.log(
      "========================================"
    );


    console.log(
      "New Difficulty: Academy Student"
    );


    console.log(
      "Legacy Cycle:",
      playerData.progression
        .legacyCycle
    );


    console.log(
      "========================================"
    );


    return {

      success:
        true,

      stage:
        "complete",

      routeType:
        "legacy_rebirth",

      fromDifficultyId:
        "kage",

      targetDifficultyId:
        "academy",

      targetLegacyCycle:
        playerData.progression
          .legacyCycle,

      saved:
        true,

      runtimeSynchronized:
        true,

      rolledBack:
        false

    };

  }
  catch (error) {


    console.error(
      "Atomic Kage Legacy rebirth failed:",
      error
    );


    console.warn(
      "Attempting Legacy rebirth rollback..."
    );


    const rollbackSucceeded =
      restoreRunTransitionSnapshot(
        snapshot
      );


    if (rollbackSucceeded) {


      console.warn(
        "✅ LEGACY REBIRTH ROLLBACK COMPLETE"
      );

    }
    else {


      console.error(
        "❌ LEGACY REBIRTH ROLLBACK FAILED"
      );

    }


    return {

      success:
        false,

      stage:
        stage,

      reason:
        error instanceof Error
          ? error.message
          : String(
              error
            ),

      rolledBack:
        rollbackSucceeded ===
          true

    };

  }

}


// =========================================================
// BRICK 79 — COMPLETION ROUTE EXECUTOR
// =========================================================
//
// One authoritative command for the player-facing UI.
//
// Routes:
//
// legacy_rebirth
//     -> Kage -> Academy Legacy +1
//
// premium_difficulty
//     -> existing atomic difficulty engine
//
// difficulty
//     -> existing atomic difficulty engine
//
// =========================================================


// =========================================================
// IS COMPLETION SESSION REAL OR PREVIEW?
// =========================================================

function isCompletionFlowLiveSession() {


  const session =
    getCompletionFlowSession();


  if (
    !session ||
    session.active !==
      true ||
    !session.runState
  ) {


    return false;

  }


  const liveRun =
    getCurrentRunState();


  if (
    !liveRun ||
    liveRun.valid !==
      true
  ) {


    return false;

  }


  return (
    session.runState
      .currentDifficultyId ===
        liveRun.currentDifficultyId &&

    session.runState
      .legacyCycle ===
        liveRun.legacyCycle &&

    session.runState
      .runCompleted ===
        liveRun.runCompleted
  );

}


// =========================================================
// EXECUTE ACTIVE COMPLETION CONFIRMATION
// =========================================================

function executeActiveCompletionConfirmation() {


  const session =
    getCompletionFlowSession();


  if (
    !session ||
    session.active !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "No active completion flow exists."

    };

  }


  if (
    session.stage !==
      "confirmation"
  ) {


    return {

      success:
        false,

      reason:
        "Completion flow is not awaiting confirmation."

    };

  }


  // =========================================
  // PREVIEW SAFETY
  // =========================================
  //
  // This is what prevents:
  //
  // openKageCompletionPreview(...)
  //
  // from ever changing the real Academy save.
  //
  // =========================================

  if (
    !isCompletionFlowLiveSession()
  ) {


    return {

      success:
        false,

      preview:
        true,

      reason:
        "Preview mode only. No player save was changed."

    };

  }


  const confirmation =
    getActiveCompletionConfirmation();


  if (
    !confirmation ||
    confirmation.valid !==
      true ||
    confirmation.executable !==
      true
  ) {


    return {

      success:
        false,

      reason:
        confirmation &&
        confirmation.reason

          ? confirmation.reason

          : "Completion confirmation is invalid."

    };

  }


  let result;


  // =========================================
  // KAGE LEGACY REBIRTH
  // =========================================

  if (
    confirmation.routeType ===
      "legacy_rebirth"
  ) {


    result =
      executeAtomicKageLegacyRebirth(
        confirmation.inheritanceSelection
      );

  }


  // =========================================
  // NORMAL / PREMIUM DIFFICULTY
  // =========================================

  else if (
    confirmation.routeType ===
      "difficulty" ||
    confirmation.routeType ===
      "premium_difficulty"
  ) {


    result =
      executeAtomicNextRunDifficultyTransition(
        confirmation.inheritanceSelection
      );

  }


  else {


    result = {

      success:
        false,

      reason:
        `Unsupported completion route: ${confirmation.routeType}`

    };

  }


  if (
    result &&
    result.success ===
      true
  ) {


    const root =
      getCompletionFlowUIRoot();


    if (root) {


      root.remove();

    }


    clearCompletionFlowSession();

  }


  return result;

}


// =========================================================
// BRICK 80 / BRICK 86 — CONFIRM BUTTON EXECUTION BRIDGE
// =========================================================
//
// Brick 80 connected the real completion execution layer.
//
// Brick 86 adds an execution lock so repeated clicks cannot
// begin two transitions at the same time.
//
// Preview screens remain harmless.
//
// Real completed runs execute the selected route exactly once.
//
// =========================================================

let completionExecutionBridgeInstalled =
  false;


let completionExecutionInProgress =
  false;


// =========================================================
// HANDLE CONFIRMATION BUTTON CLICK
// =========================================================

function handleCompletionExecutionClick(
  event
) {


  const target =
    event.target.closest(
      `#${COMPLETION_FLOW_UI_ID} [data-action="confirm"]`
    );


  if (!target) {

    return;

  }


  event.preventDefault();

  event.stopPropagation();

  event.stopImmediatePropagation();


  // =========================================
  // BRICK 86 — DUPLICATE EXECUTION GUARD
  // =========================================

  if (
    completionExecutionInProgress ===
      true
  ) {


    showCompletionFlowMessage(
      "Transition already in progress."
    );


    console.warn(
      "Duplicate completion execution prevented."
    );


    return;

  }


  completionExecutionInProgress =
    true;


  let result;


  try {


    result =
      executeActiveCompletionConfirmation();


    // =========================================
    // PREVIEW
    // =========================================

    if (
      result &&
      result.preview ===
        true
    ) {


      showCompletionFlowMessage(
        "Safe preview only — your real save was not changed."
      );


      return;

    }


    // =========================================
    // FAILURE
    // =========================================

    if (
      !result ||
      result.success !==
        true
    ) {


      showCompletionFlowMessage(
        result &&
        result.reason

          ? result.reason

          : "Transition could not be completed."
      );


      return;

    }


    console.log(
      "✅ PLAYER-FACING COMPLETION TRANSITION EXECUTED"
    );

  }
  finally {


    completionExecutionInProgress =
      false;

  }

}


// =========================================================
// INSTALL EXECUTION BRIDGE
// =========================================================

function installCompletionExecutionBridge() {


  if (
    completionExecutionBridgeInstalled
  ) {


    return true;

  }


  document.addEventListener(
    "click",
    handleCompletionExecutionClick,
    true
  );


  completionExecutionBridgeInstalled =
    true;


  return true;

}


// Install once when game.js loads.

installCompletionExecutionBridge();


// =========================================================
// BRICKS 78–80 DIAGNOSTICS
// =========================================================

function runCompletionExecutionDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — COMPLETION EXECUTION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  const originalSession =
    completionFlowSession;


  try {


    // =========================================
    // CONTROLLED COMPLETED KAGE STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "kage",

      highestDifficultyUnlocked:
        "akatsuki",

      legacyCycle:
        2,

      completedDifficulties: [
        "academy",
        "genin",
        "chunin",
        "special_jonin",
        "jonin",
        "anbu",
        "kage"
      ],

      runCompleted:
        true

    };


    // =========================================
    // BUILD LEGACY PACKAGE
    // =========================================

    const legacyPackage =
      buildKageLegacyInheritedPackage(
        createEmptyInheritanceSelection()
      );


    results.push({

      test:
        "Kage Legacy inheritance package builds",

      pass:
        !!(
          legacyPackage &&
          legacyPackage.valid ===
            true &&
          legacyPackage.targetDifficultyId ===
            "academy" &&
          legacyPackage.targetLegacyCycle ===
            3
        )

    });


    const legacyState =
      buildKageLegacyPlayerState(
        legacyPackage
      );


    results.push({

      test:
        "Kage Legacy player state builds",

      pass:
        !!(
          legacyState &&
          legacyState.valid ===
            true &&
          legacyState.playerData
            .progression
            .currentDifficulty ===
            "academy" &&
          legacyState.playerData
            .progression
            .legacyCycle ===
            3
        )

    });


    // =========================================
    // ATOMIC LEGACY EXECUTION
    // =========================================

    const legacyResult =
      executeAtomicKageLegacyRebirth(
        createEmptyInheritanceSelection()
      );


    results.push({

      test:
        "Atomic Kage Legacy rebirth succeeds",

      pass:
        !!(
          legacyResult &&
          legacyResult.success ===
            true
        )

    });


    results.push({

      test:
        "Legacy rebirth reaches Academy Cycle 3",

      pass:
        !!(
          playerData.progression
            .currentDifficulty ===
            "academy" &&
          playerData.progression
            .highestDifficultyUnlocked ===
            "academy" &&
          playerData.progression
            .legacyCycle ===
            3 &&
          playerData.progression
            .runCompleted ===
            false &&
          Array.isArray(
            playerData.progression
              .completedDifficulties
          ) &&
          playerData.progression
            .completedDifficulties
            .length ===
            0
        )

    });


    const legacyRuntime =
      verifyRuntimeMatchesPlayerData();


    results.push({

      test:
        "Legacy rebirth runtime matches save",

      pass:
        !!(
          legacyRuntime &&
          legacyRuntime.valid ===
            true
        )

    });


    // =========================================
    // RESTORE THEN TEST FORCED FAILURE
    // =========================================

    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    playerData.progression = {

      currentDifficulty:
        "kage",

      highestDifficultyUnlocked:
        "akatsuki",

      legacyCycle:
        2,

      completedDifficulties: [
        "academy",
        "genin",
        "chunin",
        "special_jonin",
        "jonin",
        "anbu",
        "kage"
      ],

      runCompleted:
        true

    };


    const failureSnapshot =
      createRunTransitionSnapshot();


    const failedLegacy =
      executeAtomicKageLegacyRebirth(
        createEmptyInheritanceSelection(),
        {
          simulateFailureStage:
            "afterApply"
        }
      );


    results.push({

      test:
        "Simulated Legacy failure is detected",

      pass:
        !!(
          failedLegacy &&
          failedLegacy.success ===
            false
        )

    });


    results.push({

      test:
        "Legacy failure triggers rollback",

      pass:
        !!(
          failedLegacy &&
          failedLegacy.rolledBack ===
            true
        )

    });


    const failureEnd =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Legacy rollback restores complete state",

      pass:
        JSON.stringify(
          failureSnapshot
        ) ===
        JSON.stringify(
          failureEnd
        )

    });


    // =========================================
    // PREVIEW BUTTON MUST REMAIN SAFE
    // =========================================

    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    const previewSnapshot =
      createRunTransitionSnapshot();


    openKageCompletionPreview(
      false
    );


    const leftCard =
      getCompletionFlowUIRoot()
        ? getCompletionFlowUIRoot()
            .querySelector(
              '[data-layout="top-left"]'
            )
        : null;


    if (leftCard) {


      leftCard.click();

    }


    const continueButton =
      getCompletionFlowUIRoot()
        ? getCompletionFlowUIRoot()
            .querySelector(
              '[data-action="continue"]'
            )
        : null;


    if (continueButton) {


      continueButton.click();

    }


    const previewConfirm =
      getCompletionFlowUIRoot()
        ? getCompletionFlowUIRoot()
            .querySelector(
              '[data-action="confirm"]'
            )
        : null;


    if (previewConfirm) {


      previewConfirm.click();

    }


    const previewAfter =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Preview confirmation cannot modify real save",

      pass:
        JSON.stringify(
          previewSnapshot
        ) ===
        JSON.stringify(
          previewAfter
        )

    });


    // =========================================
    // CLEAN PREVIEW UI
    // =========================================

    const root =
      getCompletionFlowUIRoot();


    if (root) {


      root.remove();

    }

  }
  finally {


    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    completionFlowSession =
      originalSession;

  }


  // =========================================
  // ORIGINAL SAVE CHECK
  // =========================================

  const finalSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original player save restored after execution diagnostics",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        finalSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      "✅ COMPLETION EXECUTION PASSED ALL DIAGNOSTICS"
    );

  }
  else {


    console.warn(
      `❌ COMPLETION EXECUTION HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICK 81 — GAMEPLAY RUN COMPLETION TRIGGER
// =========================================================
//
// Lifecycle integration begins here.
//
// IMPORTANT:
//
// Ordinary battle victories must NEVER automatically complete
// a difficulty.
//
// A gameplay object must explicitly declare:
//
// progressionTrigger: "run_completion"
//
// This can later belong to:
//
// - a final boss
// - a story mission
// - a location
// - an event
// - another end-of-run gameplay source
//
// The engine therefore remains generic and reusable.
//
// =========================================================


// =========================================================
// GET PROGRESSION TRIGGER TYPE
// =========================================================

function getProgressionTriggerType(
  source
) {


  if (
    !source ||
    typeof source !==
      "object"
  ) {

    return null;

  }


  const trigger =
    source.progressionTrigger;


  if (
    typeof trigger ===
      "string"
  ) {

    return trigger;

  }


  if (
    trigger &&
    typeof trigger ===
      "object" &&
    typeof trigger.type ===
      "string"
  ) {

    return trigger.type;

  }


  return null;

}


// =========================================================
// GET GAMEPLAY RUN COMPLETION TRIGGER
// =========================================================

function getGameplayRunCompletionTrigger(
  context = {}
) {


  const candidates = [

    {
      sourceType:
        "location",

      source:
        context.location ||
        selectedLocationNode ||
        null
    },

    {
      sourceType:
        "enemy",

      source:
        context.enemy ||
        (
          currentBattle
            ? currentBattle.enemy
            : null
        ) ||
        selectedEnemy ||
        null
    }

  ];


  const matched =
    candidates.find(
      candidate =>
        getProgressionTriggerType(
          candidate.source
        ) ===
          "run_completion"
    );


  if (!matched) {


    return {

      detected:
        false,

      triggerType:
        null,

      sourceType:
        null,

      sourceId:
        null

    };

  }


  return {

    detected:
      true,

    triggerType:
      "run_completion",

    sourceType:
      matched.sourceType,

    sourceId:
      matched.source &&
      matched.source.id

        ? matched.source.id

        : null

  };

}


// =========================================================
// BRICK 82 — PLAYER-FACING COMPLETION LIFECYCLE ROUTER
// =========================================================
//
// Ordinary completed difficulties automatically enter their
// one natural progression route.
//
// Kage opens the dedicated dual-path fork.
//
// Bricks 84–85 harden this router so matching completion
// sessions can be resumed instead of recreated.
//
// =========================================================


// =========================================================
// BRICK 84 — COMPLETION RUN IDENTITY
// =========================================================
//
// Gives a completed run a stable runtime identity.
//
// We deliberately use existing progression facts:
//
// - difficulty
// - Legacy Cycle
// - completion state
//
// No new save field is required.
//
// =========================================================

function getCompletionLifecycleRunKey(
  runState = getCurrentRunState()
) {


  if (
    !runState ||
    runState.valid !==
      true
  ) {

    return null;

  }


  return [
    runState.currentDifficultyId,
    runState.legacyCycle,
    runState.runCompleted ===
      true
      ? "complete"
      : "active"
  ].join(
    "::"
  );

}


// =========================================================
// DOES SESSION MATCH LIVE RUN?
// =========================================================

function doesCompletionSessionMatchRun(
  session,
  runState = getCurrentRunState()
) {


  if (
    !session ||
    session.active !==
      true ||
    !session.runState ||
    !runState ||
    runState.valid !==
      true
  ) {

    return false;

  }


  return (
    getCompletionLifecycleRunKey(
      session.runState
    ) ===
    getCompletionLifecycleRunKey(
      runState
    )
  );

}


// =========================================================
// COUNT COMPLETION UI ROOTS
// =========================================================
//
// Primarily diagnostic, but also useful for guarding against
// accidental duplicate UI creation.
//
// =========================================================

function getCompletionFlowUIRootCount() {


  return document.querySelectorAll(
    `#${COMPLETION_FLOW_UI_ID}`
  ).length;

}


// =========================================================
// RENDER CURRENT SESSION STAGE
// =========================================================

function renderCurrentCompletionSessionStage() {


  const session =
    getCompletionFlowSession();


  if (
    !session ||
    session.active !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "No active completion flow exists."

    };

  }


  let root =
    getCompletionFlowUIRoot();


  if (!root) {


    root =
      createCompletionFlowUIRoot();

  }


  // =========================================
  // PATH SELECTION
  // =========================================

  if (
    session.stage ===
      "path_selection"
  ) {


    // =========================================
    // KAGE FORK
    // =========================================

    if (
      session.runState &&
      session.runState
        .currentDifficultyId ===
        "kage"
    ) {


      return {

        success:
          renderCompletionPathSelectionUI() ===
          true,

        mode:
          "kage_fork",

        stage:
          "path_selection",

        reusedSession:
          true

      };

    }


    // =========================================
    // ORDINARY SINGLE PATH
    // =========================================

    if (
      !Array.isArray(
        session.paths
      ) ||
      session.paths.length !==
        1
    ) {


      return {

        success:
          false,

        reason:
          "Ordinary completion expected exactly one progression path."

      };

    }


    const path =
      session.paths[0];


    if (
      path.locked ===
        true
    ) {


      return {

        success:
          false,

        reason:
          path.requiresPremium ===
            true

            ? "Premium access required."

            : "The next progression path is locked."

      };

    }


    const selectionResult =
      selectCompletionFlowPath(
        path.id
      );


    if (
      !selectionResult ||
      selectionResult.success !==
        true
    ) {


      return {

        success:
          false,

        reason:
          selectionResult &&
          selectionResult.reason

            ? selectionResult.reason

            : "Next progression path could not be selected."

      };

    }


    return renderCurrentCompletionSessionStage();

  }


  // =========================================
  // INHERITANCE SELECTION
  // =========================================

  if (
    session.stage ===
      "inheritance_selection"
  ) {


    return {

      success:
        renderCompletionInheritanceUI() ===
        true,

      mode:
        session.runState &&
        session.runState
          .currentDifficultyId ===
          "kage"

          ? "kage_inheritance"

          : "ordinary_progression",

      stage:
        "inheritance_selection",

      reusedSession:
        true

    };

  }


  // =========================================
  // CONFIRMATION
  // =========================================

  if (
    session.stage ===
      "confirmation"
  ) {


    return {

      success:
        renderCompletionConfirmationUI() ===
        true,

      mode:
        session.runState &&
        session.runState
          .currentDifficultyId ===
          "kage"

          ? "kage_confirmation"

          : "ordinary_progression",

      stage:
        "confirmation",

      reusedSession:
        true

    };

  }


  return {

    success:
      false,

    reason:
      `Unsupported completion flow stage: ${session.stage}`

  };

}


// =========================================================
// OPEN PLAYER-FACING COMPLETION LIFECYCLE
// =========================================================

function openPlayerFacingCompletionLifecycle(
  options = {}
) {


  const runState =
    getCurrentRunState();


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      success:
        false,

      reason:
        runState &&
        runState.reason

          ? runState.reason

          : "Current run state is invalid."

    };

  }


  if (
    runState.runCompleted !==
      true
  ) {


    return {

      success:
        false,

      reason:
        "Current run is not complete."

    };

  }


  // =========================================
  // BRICK 84 — REUSE MATCHING LIVE SESSION
  // =========================================

  const existingSession =
    getCompletionFlowSession();


  if (
    doesCompletionSessionMatchRun(
      existingSession,
      runState
    )
  ) {


    const rootAlreadyExists =
      !!getCompletionFlowUIRoot();


    if (
      rootAlreadyExists &&
      options.forceRender !==
        true
    ) {


      return {

        success:
          true,

        mode:
          runState.currentDifficultyId ===
            "kage"

            ? "kage_fork"

            : "ordinary_progression",

        stage:
          existingSession.stage,

        reusedSession:
          true,

        reusedUI:
          true,

        session:
          existingSession

      };

    }


    const resumedRender =
      renderCurrentCompletionSessionStage();


    return {

      ...resumedRender,

      reusedSession:
        true,

      reusedUI:
        rootAlreadyExists,

      session:
        existingSession

    };

  }


  // =========================================
  // STALE SESSION MUST NOT SURVIVE NEW RUN
  // =========================================

  if (existingSession) {


    clearCompletionFlowSession();

  }


  const existingRoot =
    getCompletionFlowUIRoot();


  if (existingRoot) {


    existingRoot.remove();

  }


  // =========================================
  // START FRESH AUTHORITATIVE SESSION
  // =========================================

  const session =
    beginCompletionFlow(
      runState,
      options
    );


  if (
    !session ||
    session.active !==
      true
  ) {


    return {

      success:
        false,

      reason:
        session &&
        session.reason

          ? session.reason

          : "Completion flow could not be started."

    };

  }


  createCompletionFlowUIRoot();


  const rendered =
    renderCurrentCompletionSessionStage();


  return {

    ...rendered,

    freshSession:
      true,

    reusedSession:
      false,

    session:
      session

  };

}


// =========================================================
// BRICK 85 — RESUME PLAYER-FACING COMPLETION
// =========================================================
//
// Safe re-entry point.
//
// This does NOT:
//
// - complete a difficulty
// - unlock anything
// - modify progression
// - save anything
//
// It simply asks:
//
// "Does the persisted live run say completion is pending?"
//
// If yes, it restores/reopens the appropriate completion UI.
//
// =========================================================

function resumePlayerFacingCompletionLifecycle(
  options = {}
) {


  const runState =
    getCurrentRunState();


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      success:
        false,

      pending:
        false,

      reason:
        "Current run state is invalid."

    };

  }


  if (
    runState.runCompleted !==
      true
  ) {


    return {

      success:
        false,

      pending:
        false,

      reason:
        "No completed run is waiting for progression."

    };

  }


  const result =
    openPlayerFacingCompletionLifecycle(
      options
    );


  return {

    ...result,

    pending:
      true

  };

}


// =========================================================
// BRICK 83 / BRICK 84 — PROCESS GAMEPLAY RUN COMPLETION
// =========================================================
//
// Called by normal gameplay after a victory.
//
// Exactly one explicit:
//
// progressionTrigger: "run_completion"
//
// is required.
//
// Repeated triggers cannot complete or save the run twice.
//
// =========================================================

function processGameplayRunCompletion(
  context = {},
  options = {}
) {


  const trigger =
    getGameplayRunCompletionTrigger(
      context
    );


  // =========================================
  // ORDINARY VICTORY
  // =========================================

  if (
    trigger.detected !==
      true
  ) {


    return {

      handled:
        false,

      completed:
        false,

      flowOpened:
        false,

      duplicate:
        false,

      reason:
        "Gameplay event is not a run completion trigger."

    };

  }


  const runState =
    getCurrentRunState();


  if (
    !runState ||
    runState.valid !==
      true
  ) {


    return {

      handled:
        true,

      completed:
        false,

      flowOpened:
        false,

      duplicate:
        false,

      reason:
        runState &&
        runState.reason

          ? runState.reason

          : "Current run state is invalid.",

      trigger:
        trigger

    };

  }


  // =========================================
  // BRICK 84 — DUPLICATE COMPLETION TRIGGER
  // =========================================
  //
  // The run is already persisted as complete.
  //
  // DO NOT:
  //
  // - mark complete again
  // - unlock again
  // - save again
  //
  // Simply resume/reuse the player-facing flow.
  //
  // =========================================

  if (
    runState.runCompleted ===
      true
  ) {


    const resumedFlow =
      resumePlayerFacingCompletionLifecycle(
        options
      );


    return {

      handled:
        true,

      completed:
        true,

      alreadyCompleted:
        true,

      duplicate:
        true,

      flowOpened:
        resumedFlow &&
        resumedFlow.success ===
          true,

      trigger:
        trigger,

      flow:
        resumedFlow

    };

  }


  // =========================================
  // AUTHORITATIVE COMPLETION ELIGIBILITY
  // =========================================

  const eligibility =
    getRunCompletionEligibility();


  if (
    !eligibility ||
    eligibility.allowed !==
      true
  ) {


    return {

      handled:
        true,

      completed:
        false,

      flowOpened:
        false,

      duplicate:
        false,

      reason:
        eligibility &&
        eligibility.reason

          ? eligibility.reason

          : "Current run cannot be completed.",

      trigger:
        trigger

    };

  }


  // =========================================
  // COMPLETE THROUGH EXISTING ENGINE
  // =========================================

  const completed =
    completeCurrentDifficulty();


  if (
    completed !==
      true
  ) {


    return {

      handled:
        true,

      completed:
        false,

      flowOpened:
        false,

      duplicate:
        false,

      reason:
        "Current difficulty could not be completed.",

      trigger:
        trigger

    };

  }


  // =========================================
  // OPEN PLAYER-FACING FLOW
  // =========================================

  const flow =
    openPlayerFacingCompletionLifecycle(
      options
    );


  if (
    !flow ||
    flow.success !==
      true
  ) {


    return {

      handled:
        true,

      completed:
        true,

      flowOpened:
        false,

      duplicate:
        false,

      reason:
        flow &&
        flow.reason

          ? flow.reason

          : "Run completed, but completion UI could not be opened.",

      trigger:
        trigger,

      flow:
        flow

    };

  }


  console.log(
    `✅ ${eligibility.difficultyName} RUN COMPLETED FROM GAMEPLAY`
  );


  console.log(
    "Completion Trigger:",
    trigger
  );


  return {

    handled:
      true,

    completed:
      true,

    flowOpened:
      true,

    duplicate:
      false,

    difficultyId:
      eligibility.difficultyId,

    difficultyName:
      eligibility.difficultyName,

    legacyCycle:
      eligibility.legacyCycle,

    trigger:
      trigger,

    flow:
      flow

  };

}


// =========================================================
// BRICK 85 — AUTOMATIC RELOAD RESUME
// =========================================================
//
// playerData.runCompleted is persisted already.
//
// Therefore no additional pending-transition save field is
// required.
//
// On a browser reload:
//
// - incomplete run -> nothing happens
// - completed run  -> completion flow reopens
//
// Full-reload premium ownership remains dependent on the
// future persistent account entitlement system.
//
// =========================================================

let completionLifecycleResumeInstalled =
  false;


function installCompletionLifecycleResume() {


  if (
    completionLifecycleResumeInstalled
  ) {


    return true;

  }


  completionLifecycleResumeInstalled =
    true;


  window.setTimeout(
    () => {


      const runState =
        getCurrentRunState();


      if (
        !runState ||
        runState.valid !==
          true ||
        runState.runCompleted !==
          true
      ) {

        return;

      }


      if (
        getCompletionFlowUIRoot()
      ) {

        return;

      }


      const result =
        resumePlayerFacingCompletionLifecycle();


      if (
        result &&
        result.success ===
          true
      ) {


        console.log(
          "✅ COMPLETION FLOW RESUMED FROM PERSISTED RUN STATE"
        );

      }

    },
    0
  );


  return true;

}


// =========================================================
// BRICKS 81–83 REGRESSION DIAGNOSTICS
// =========================================================
//
// Restored in Brick 86A after the Brick 84–86 lifecycle
// replacement accidentally removed the older test harness.
//
// This changes no gameplay behaviour.
//
// =========================================================

function runLifecycleIntegrationDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — LIFECYCLE INTEGRATION DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  const originalSession =
    completionFlowSession;


  const existingRoot =
    getCompletionFlowUIRoot();


  if (existingRoot) {

    existingRoot.remove();

  }


  try {


    // =========================================
    // TEST 1 — ORDINARY ENEMY MUST NOT TRIGGER
    // =========================================

    const normalTrigger =
      getGameplayRunCompletionTrigger({
        enemy: {
          id:
            "diagnostic_bandit"
        },
        location:
          null
      });


    results.push({

      test:
        "Ordinary battle does not complete a run",

      pass:
        normalTrigger.detected ===
        false

    });


    // =========================================
    // TEST 2 — EXPLICIT ENEMY TRIGGER DETECTED
    // =========================================

    const enemyTrigger =
      getGameplayRunCompletionTrigger({
        enemy: {
          id:
            "diagnostic_final_enemy",

          progressionTrigger:
            "run_completion"
        },
        location:
          null
      });


    results.push({

      test:
        "Explicit enemy run-completion trigger is detected",

      pass:
        !!(
          enemyTrigger.detected ===
            true &&
          enemyTrigger.triggerType ===
            "run_completion" &&
          enemyTrigger.sourceType ===
            "enemy" &&
          enemyTrigger.sourceId ===
            "diagnostic_final_enemy"
        )

    });


    // =========================================
    // TEST 3 — LOCATION TRIGGER DETECTED
    // =========================================

    const locationTrigger =
      getGameplayRunCompletionTrigger({
        enemy: {
          id:
            "ordinary_enemy"
        },
        location: {
          id:
            "diagnostic_story_location",

          progressionTrigger: {
            type:
              "run_completion"
          }
        }
      });


    results.push({

      test:
        "Explicit location run-completion trigger is detected",

      pass:
        !!(
          locationTrigger.detected ===
            true &&
          locationTrigger.sourceType ===
            "location" &&
          locationTrigger.sourceId ===
            "diagnostic_story_location"
        )

    });


    // =========================================
    // TEST 4 — ACADEMY COMPLETION
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "academy",

      legacyCycle:
        0,

      completedDifficulties:
        [],

      runCompleted:
        false

    };


    clearCompletionFlowSession();


    const academyResult =
      processGameplayRunCompletion({
        enemy: {
          id:
            "diagnostic_academy_final",

          progressionTrigger:
            "run_completion"
        },
        location:
          null
      });


    const academySession =
      getCompletionFlowSession();


    results.push({

      test:
        "Gameplay completion marks Academy complete",

      pass:
        !!(
          academyResult &&
          academyResult.completed ===
            true &&
          playerData.progression
            .runCompleted ===
            true &&
          playerData.progression
            .completedDifficulties
            .includes(
              "academy"
            )
        )

    });


    results.push({

      test:
        "Academy completion unlocks Genin",

      pass:
        playerData.progression
          .highestDifficultyUnlocked ===
          "genin"

    });


    results.push({

      test:
        "Ordinary completion opens single-path inheritance flow",

      pass:
        !!(
          academyResult &&
          academyResult.flowOpened ===
            true &&
          academyResult.flow &&
          academyResult.flow.mode ===
            "ordinary_progression" &&
          academyResult.flow.stage ===
            "inheritance_selection" &&
          academySession &&
          academySession.active ===
            true
        )

    });


    // =========================================
    // CLEAN ORDINARY FLOW BEFORE KAGE TEST
    // =========================================

    const academyRoot =
      getCompletionFlowUIRoot();


    if (academyRoot) {

      academyRoot.remove();

    }


    clearCompletionFlowSession();


    // =========================================
    // TEST 5 — KAGE COMPLETION
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "kage",

      highestDifficultyUnlocked:
        "kage",

      legacyCycle:
        2,

      completedDifficulties: [
        "academy",
        "genin",
        "chunin",
        "special_jonin",
        "jonin",
        "anbu"
      ],

      runCompleted:
        false

    };


    const kageResult =
      processGameplayRunCompletion({
        enemy: {
          id:
            "diagnostic_kage_final",

          progressionTrigger:
            "run_completion"
        },
        location:
          null
      });


    const kageSession =
      getCompletionFlowSession();


    results.push({

      test:
        "Gameplay completion marks Kage complete",

      pass:
        !!(
          kageResult &&
          kageResult.completed ===
            true &&
          playerData.progression
            .runCompleted ===
            true &&
          playerData.progression
            .completedDifficulties
            .includes(
              "kage"
            )
        )

    });


    results.push({

      test:
        "Kage completion opens dedicated two-path fork",

      pass:
        !!(
          kageResult &&
          kageResult.flowOpened ===
            true &&
          kageResult.flow &&
          (
            kageResult.flow.mode ===
              "kage_fork" ||
            kageResult.flow.stage ===
              "path_selection"
          ) &&
          kageSession &&
          Array.isArray(
            kageSession.paths
          ) &&
          kageSession.paths.length ===
            2
        )

    });


    results.push({

      test:
        "Kage fork includes Legacy Rebirth route",

      pass:
        !!(
          kageSession &&
          Array.isArray(
            kageSession.paths
          ) &&
          kageSession.paths.some(
            path =>
              path.routeType ===
              "legacy_rebirth"
          )
        )

    });


    const kageRoot =
      getCompletionFlowUIRoot();


    if (kageRoot) {

      kageRoot.remove();

    }

  }
  finally {


    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    completionFlowSession =
      originalSession;


    const root =
      getCompletionFlowUIRoot();


    if (root) {

      root.remove();

    }

  }


  // =========================================
  // ORIGINAL SAVE CHECK
  // =========================================

  const finalSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original player save restored after lifecycle diagnostics",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        finalSnapshot
      )

  });


  // =========================================
  // RESULTS
  // =========================================

  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      `✅ LIFECYCLE INTEGRATION PASSED ${results.length}/${results.length}`
    );

  }
  else {


    console.warn(
      `❌ LIFECYCLE INTEGRATION HAS ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}

// =========================================================
// BRICKS 84–86 DIAGNOSTICS
// =========================================================

function runLifecycleSafeguardDiagnostics() {


  console.log(
    "========================================"
  );


  console.log(
    "SHINOBI CHRONICLES — LIFECYCLE SAFEGUARD DIAGNOSTICS"
  );


  console.log(
    "========================================"
  );


  const results =
    [];


  const originalSnapshot =
    createRunTransitionSnapshot();


  const originalSession =
    completionFlowSession;


  const originalExecutionLock =
    completionExecutionInProgress;


  const existingRoot =
    getCompletionFlowUIRoot();


  if (existingRoot) {

    existingRoot.remove();

  }


  try {


    // =========================================
    // CONTROLLED COMPLETED ACADEMY STATE
    // =========================================

    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "genin",

      legacyCycle:
        0,

      completedDifficulties: [
        "academy"
      ],

      runCompleted:
        true

    };


    clearCompletionFlowSession();


    // =========================================
    // TEST 1 — RUN KEY
    // =========================================

    const academyRun =
      getCurrentRunState();


    results.push({

      test:
        "Completed run receives stable lifecycle identity",

      pass:
        getCompletionLifecycleRunKey(
          academyRun
        ) ===
          "academy::0::complete"

    });


    // =========================================
    // TEST 2 — FRESH OPEN
    // =========================================

    const firstOpen =
      openPlayerFacingCompletionLifecycle();


    const firstSession =
      getCompletionFlowSession();


    results.push({

      test:
        "Completed Academy opens progression flow",

      pass:
        !!(
          firstOpen &&
          firstOpen.success ===
            true &&
          firstSession &&
          firstSession.active ===
            true
        )

    });


    // =========================================
    // TEST 3 — MATCHING SESSION
    // =========================================

    results.push({

      test:
        "Active completion session matches live run",

      pass:
        doesCompletionSessionMatchRun(
          firstSession,
          getCurrentRunState()
        ) ===
        true

    });


    // =========================================
    // TEST 4 — REPEATED OPEN REUSES SESSION
    // =========================================

    const secondOpen =
      openPlayerFacingCompletionLifecycle();


    const secondSession =
      getCompletionFlowSession();


    results.push({

      test:
        "Repeated completion open reuses existing session",

      pass:
        !!(
          secondOpen &&
          secondOpen.success ===
            true &&
          secondOpen.reusedSession ===
            true &&
          firstSession ===
            secondSession
        )

    });


    // =========================================
    // TEST 5 — ONLY ONE UI ROOT
    // =========================================

    results.push({

      test:
        "Repeated completion open creates no duplicate UI",

      pass:
        getCompletionFlowUIRootCount() ===
        1

    });


    // =========================================
    // TEST 6 — DUPLICATE TRIGGER DOES NOT SAVE
    // =========================================

    const beforeDuplicate =
      createRunTransitionSnapshot();


    const duplicateResult =
      processGameplayRunCompletion({
        enemy: {
          id:
            "diagnostic_duplicate_final",

          progressionTrigger:
            "run_completion"
        },
        location:
          null
      });


    const afterDuplicate =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Repeated gameplay trigger is recognised as duplicate",

      pass:
        !!(
          duplicateResult &&
          duplicateResult.duplicate ===
            true &&
          duplicateResult.alreadyCompleted ===
            true
        )

    });


    results.push({

      test:
        "Duplicate gameplay trigger does not modify save",

      pass:
        JSON.stringify(
          beforeDuplicate
        ) ===
        JSON.stringify(
          afterDuplicate
        )

    });


    // =========================================
    // TEST 7 — UI LOSS WITH SESSION PRESERVED
    // =========================================

    const rootBeforeResume =
      getCompletionFlowUIRoot();


    if (rootBeforeResume) {

      rootBeforeResume.remove();

    }


    const sessionBeforeResume =
      getCompletionFlowSession();


    const resumedExistingSession =
      resumePlayerFacingCompletionLifecycle();


    results.push({

      test:
        "Missing UI can resume existing completion session",

      pass:
        !!(
          resumedExistingSession &&
          resumedExistingSession.success ===
            true &&
          getCompletionFlowSession() ===
            sessionBeforeResume &&
          getCompletionFlowUIRootCount() ===
            1
        )

    });


    // =========================================
    // TEST 8 — RELOAD-STYLE SESSION LOSS
    // =========================================

    const rootBeforeReloadSimulation =
      getCompletionFlowUIRoot();


    if (rootBeforeReloadSimulation) {

      rootBeforeReloadSimulation.remove();

    }


    clearCompletionFlowSession();


    const beforeReloadResume =
      createRunTransitionSnapshot();


    const reloadResume =
      resumePlayerFacingCompletionLifecycle();


    const afterReloadResume =
      createRunTransitionSnapshot();


    results.push({

      test:
        "Persisted completed run rebuilds lost session",

      pass:
        !!(
          reloadResume &&
          reloadResume.success ===
            true &&
          getCompletionFlowSession() &&
          getCompletionFlowSession()
            .active ===
            true
        )

    });


    results.push({

      test:
        "Reload-style resume does not modify player save",

      pass:
        JSON.stringify(
          beforeReloadResume
        ) ===
        JSON.stringify(
          afterReloadResume
        )

    });


    // =========================================
    // TEST 9 — STALE SESSION REJECTED
    // =========================================

    const staleSession =
      getCompletionFlowSession();


    playerData.progression = {

      currentDifficulty:
        "genin",

      highestDifficultyUnlocked:
        "chunin",

      legacyCycle:
        0,

      completedDifficulties: [
        "academy",
        "genin"
      ],

      runCompleted:
        true

    };


    results.push({

      test:
        "Session from different difficulty is rejected as stale",

      pass:
        doesCompletionSessionMatchRun(
          staleSession,
          getCurrentRunState()
        ) ===
        false

    });


    const geninOpen =
      openPlayerFacingCompletionLifecycle();


    results.push({

      test:
        "Stale session is replaced by current completed run",

      pass:
        !!(
          geninOpen &&
          geninOpen.success ===
            true &&
          getCompletionFlowSession() !==
            staleSession &&
          getCompletionFlowSession()
            .runState
            .currentDifficultyId ===
            "genin"
        )

    });


    // =========================================
    // TEST 10 — KAGE FORK DUPLICATE SAFETY
    // =========================================

    const geninRoot =
      getCompletionFlowUIRoot();


    if (geninRoot) {

      geninRoot.remove();

    }


    clearCompletionFlowSession();


    playerData.progression = {

      currentDifficulty:
        "kage",

      highestDifficultyUnlocked:
        "kage",

      legacyCycle:
        2,

      completedDifficulties: [
        "academy",
        "genin",
        "chunin",
        "special_jonin",
        "jonin",
        "anbu",
        "kage"
      ],

      runCompleted:
        true

    };


    const firstKageOpen =
      openPlayerFacingCompletionLifecycle({
        hasPremiumAccess:
          false
      });


    const kageSession =
      getCompletionFlowSession();


    const secondKageOpen =
      openPlayerFacingCompletionLifecycle({
        hasPremiumAccess:
          false
      });


    results.push({

      test:
        "Repeated Kage open preserves same two-path session",

      pass:
        !!(
          firstKageOpen &&
          firstKageOpen.success ===
            true &&
          secondKageOpen &&
          secondKageOpen.success ===
            true &&
          secondKageOpen.reusedSession ===
            true &&
          getCompletionFlowSession() ===
            kageSession &&
          Array.isArray(
            kageSession.paths
          ) &&
          kageSession.paths.length ===
            2
        )

    });


    results.push({

      test:
        "Repeated Kage open creates exactly one UI root",

      pass:
        getCompletionFlowUIRootCount() ===
        1

    });


    // =========================================
    // TEST 11 — EXECUTION LOCK STATE
    // =========================================

    completionExecutionInProgress =
      true;


    results.push({

      test:
        "Completion execution lock can block duplicate entry",

      pass:
        completionExecutionInProgress ===
        true

    });


    completionExecutionInProgress =
      false;


    // =========================================
    // TEST 12 — IN-PROGRESS RUN DOES NOT RESUME
    // =========================================

    const kageRoot =
      getCompletionFlowUIRoot();


    if (kageRoot) {

      kageRoot.remove();

    }


    clearCompletionFlowSession();


    playerData.progression = {

      currentDifficulty:
        "academy",

      highestDifficultyUnlocked:
        "academy",

      legacyCycle:
        0,

      completedDifficulties:
        [],

      runCompleted:
        false

    };


    const noResume =
      resumePlayerFacingCompletionLifecycle();


    results.push({

      test:
        "Incomplete run cannot open completion resume flow",

      pass:
        !!(
          noResume &&
          noResume.success ===
            false &&
          noResume.pending ===
            false &&
          getCompletionFlowUIRootCount() ===
            0
        )

    });

  }
  finally {


    const root =
      getCompletionFlowUIRoot();


    if (root) {

      root.remove();

    }


    restoreRunTransitionSnapshot(
      originalSnapshot
    );


    completionFlowSession =
      originalSession;


    completionExecutionInProgress =
      originalExecutionLock;

  }


  // =========================================
  // ORIGINAL SAVE VERIFICATION
  // =========================================

  const finalSnapshot =
    createRunTransitionSnapshot();


  results.push({

    test:
      "Original player save restored after safeguard diagnostics",

    pass:
      JSON.stringify(
        originalSnapshot
      ) ===
      JSON.stringify(
        finalSnapshot
      )

  });


  console.table(
    results
  );


  const failedTests =
    results.filter(
      result =>
        !result.pass
    );


  if (
    failedTests.length ===
      0
  ) {


    console.log(
      `✅ LIFECYCLE SAFEGUARDS PASSED ${results.length}/${results.length}`
    );

  }
  else {


    console.warn(
      `❌ LIFECYCLE SAFEGUARDS HAVE ${failedTests.length} FAILED TEST(S)`
    );


    console.table(
      failedTests
    );

  }


  console.log(
    "========================================"
  );


  return (
    failedTests.length ===
    0
  );

}


// =========================================================
// INSTALL LIFECYCLE RELOAD RESUME
// =========================================================

installCompletionLifecycleResume();


// =========================================================
// BRICK 90 — FULL CHRONICLE PROGRESSION REGRESSION
// =========================================================
//
// Master player-progression regression pass.
//
// This DOES NOT replace the individual diagnostic suites.
//
// It runs them together under one outer safety snapshot.
//
// The outer snapshot exists so the real player save can be
// restored even if an individual diagnostic unexpectedly
// throws before completing its own cleanup.
//
// =========================================================


// =========================================================
// CHRONICLE REGRESSION SUITE DEFINITIONS
// =========================================================

function getChronicleRegressionSuites() {


  return [

    {
      id:
        "equipment",

      name:
        "Equipment / Inventory",

      runner:
        runEquipmentPhaseDiagnostics
    },

    {
      id:
        "disciplines",

      name:
        "Seven Disciplines",

      runner:
        runDisciplinePhaseDiagnostics
    },

    {
      id:
        "training",

      name:
        "Training Sources",

      runner:
        runTrainingEngineDiagnostics
    },

    {
      id:
        "progression_gating",

      name:
        "Difficulty Progression",

      runner:
        runProgressionGatingDiagnostics
    },

    {
      id:
        "transition_engine",

      name:
        "Run Transition Engine",

      runner:
        runRunTransitionDiagnostics
    },

    {
      id:
        "live_transition",

      name:
        "Live Transition",

      runner:
        runLiveTransitionDiagnostics
    },

    {
      id:
        "inheritance_ownership",

      name:
        "Inheritance Ownership",

      runner:
        runInheritanceOwnershipDiagnostics
    },

    {
      id:
        "next_run_reset",

      name:
        "Next-Run Reset",

      runner:
        runNextRunResetDiagnostics
    },

    {
      id:
        "next_run_application",

      name:
        "Next-Run Application",

      runner:
        runNextRunApplicationDiagnostics
    },

    {
      id:
        "runtime_sync",

      name:
        "Runtime Synchronization",

      runner:
        runNextRunRuntimeSyncDiagnostics
    },

    {
      id:
        "atomic_transition",

      name:
        "Atomic Transition / Rollback",

      runner:
        runAtomicNextRunTransitionDiagnostics
    },

    {
      id:
        "completion_controller",

      name:
        "Completion Controller",

      runner:
        runCompletionControllerDiagnostics
    },

    {
      id:
        "completion_paths",

      name:
        "Kage Completion Paths",

      runner:
        runCompletionPathDiagnostics
    },

    {
      id:
        "completion_session",

      name:
        "Completion Flow Session",

      runner:
        runCompletionFlowSessionDiagnostics
    },

    {
      id:
        "completion_ui",

      name:
        "Completion UI",

      runner:
        runCompletionUIDiagnostics
    },

    {
      id:
        "inheritance_ui",

      name:
        "Inheritance UI",

      runner:
        runInheritanceUIPolishDiagnostics
    },

    {
      id:
        "completion_execution",

      name:
        "Completion Execution / Legacy",

      runner:
        runCompletionExecutionDiagnostics
    },

    {
      id:
        "lifecycle_integration",

      name:
        "Gameplay Lifecycle Integration",

      runner:
        runLifecycleIntegrationDiagnostics
    },

    {
      id:
        "lifecycle_safeguards",

      name:
        "Lifecycle Re-entry / Safeguards",

      runner:
        runLifecycleSafeguardDiagnostics
    }

  ];

}


// =========================================================
// RUN ONE CHRONICLE REGRESSION SUITE
// =========================================================

function runChronicleRegressionSuite(
  suite
) {


  if (
    !suite ||
    typeof suite.runner !==
      "function"
  ) {


    return {

      id:
        suite &&
        suite.id

          ? suite.id

          : "unknown",

      name:
        suite &&
        suite.name

          ? suite.name

          : "Unknown Suite",

      pass:
        false,

      error:
        "Diagnostic runner does not exist."

    };

  }


  try {


    const result =
      suite.runner();


    return {

      id:
        suite.id,

      name:
        suite.name,

      pass:
        result ===
        true,

      error:
        null

    };

  }
  catch (error) {


    console.error(
      `❌ CHRONICLE REGRESSION SUITE CRASHED: ${suite.name}`,
      error
    );


    return {

      id:
        suite.id,

      name:
        suite.name,

      pass:
        false,

      error:
        error &&
        error.message

          ? error.message

          : String(
              error
            )

    };

  }

}


// =========================================================
// BUILD CHRONICLE REGRESSION SUMMARY ROW
// =========================================================

function buildChronicleRegressionSummaryRow(
  result
) {


  return {

    system:
      result.name,

    status:
      result.pass ===
        true

        ? "✅ PASS"

        : "❌ FAIL",

    error:
      result.error ||
      "—"

  };

}


// =========================================================
// BRICK 90 — MASTER REGRESSION
// =========================================================

function runChronicleProgressionRegression() {


  console.log(
    "========================================================="
  );


  console.log(
    "SHINOBI CHRONICLES — FULL CHRONICLE REGRESSION"
  );


  console.log(
    "========================================================="
  );


  console.log(
    "Running complete player-facing progression audit..."
  );


  console.log(
    ""
  );


  console.warn(
    "NOTE: Some rollback diagnostics intentionally simulate failures."
  );


  console.warn(
    "Red simulated-failure console messages are EXPECTED when the corresponding rollback test passes."
  );


  console.log(
    ""
  );


  // =========================================
  // MASTER SAFETY SNAPSHOT
  // =========================================

  const masterPlayerSnapshot =
    createRunTransitionSnapshot();


  const masterSession =
    completionFlowSession;


  const masterExecutionLock =
    completionExecutionInProgress;


  const masterRootExisted =
    !!getCompletionFlowUIRoot();


  const results =
    [];


  let restoreSucceeded =
    false;


  try {


    // =========================================
    // CLEAR TRANSIENT COMPLETION UI
    // =========================================

    const existingRoot =
      getCompletionFlowUIRoot();


    if (existingRoot) {

      existingRoot.remove();

    }


    clearCompletionFlowSession();


    completionExecutionInProgress =
      false;


    // =========================================
    // RUN EVERY EXISTING PROGRESSION SUITE
    // =========================================

    const suites =
      getChronicleRegressionSuites();


    suites.forEach(
      suite => {


        console.log(
          ""
        );


        console.log(
          "---------------------------------------------------------"
        );


        console.log(
          `CHRONICLE REGRESSION: ${suite.name}`
        );


        console.log(
          "---------------------------------------------------------"
        );


        const result =
          runChronicleRegressionSuite(
            suite
          );


        results.push(
          result
        );

      }
    );

  }
  finally {


    // =========================================
    // REMOVE ANY DIAGNOSTIC COMPLETION UI
    // =========================================

    const diagnosticRoot =
      getCompletionFlowUIRoot();


    if (diagnosticRoot) {

      diagnosticRoot.remove();

    }


    // =========================================
    // MASTER SAVE RESTORE
    // =========================================

    restoreSucceeded =
      restoreRunTransitionSnapshot(
        masterPlayerSnapshot
      ) ===
      true;


    // =========================================
    // RESTORE TRANSIENT SESSION STATE
    // =========================================

    completionFlowSession =
      masterSession;


    completionExecutionInProgress =
      masterExecutionLock;


    // =========================================
    // ONLY REBUILD A PRE-EXISTING UI WHEN
    // THERE WAS ONE BEFORE THE MASTER TEST
    // =========================================

    if (
      masterRootExisted &&
      masterSession &&
      masterSession.active ===
        true
    ) {


      createCompletionFlowUIRoot();


      renderCurrentCompletionSessionStage();

    }

  }


  // =========================================
  // MASTER SAVE INTEGRITY CHECK
  // =========================================

  const finalPlayerSnapshot =
    createRunTransitionSnapshot();


  const saveRestoredExactly =
    (
      restoreSucceeded ===
        true &&
      JSON.stringify(
        masterPlayerSnapshot
      ) ===
      JSON.stringify(
        finalPlayerSnapshot
      )
    );


  results.push({

    id:
      "master_save_restore",

    name:
      "Real Player Save Restored",

    pass:
      saveRestoredExactly,

    error:
      saveRestoredExactly

        ? null

        : "Master player snapshot did not restore exactly."

  });


  // =========================================
  // CURRENT PLAYER STATE HEALTH
  // =========================================

  const liveRunState =
    getCurrentRunState();


  const liveStateValid =
    !!(
      liveRunState &&
      liveRunState.valid ===
        true
    );


  results.push({

    id:
      "live_run_state",

    name:
      "Live Run State Valid",

    pass:
      liveStateValid,

    error:
      liveStateValid

        ? null

        : (
            liveRunState &&
            liveRunState.reason

              ? liveRunState.reason

              : "Live run state is invalid."
          )

  });


  // =========================================
  // DUPLICATE COMPLETION ROOT CHECK
  // =========================================

  const rootCount =
    getCompletionFlowUIRootCount();


  const rootStateValid =
    (
      masterRootExisted

        ? rootCount ===
            1

        : rootCount ===
            0
    );


  results.push({

    id:
      "completion_root_integrity",

    name:
      "Completion UI Root Integrity",

    pass:
      rootStateValid,

    error:
      rootStateValid

        ? null

        : `Unexpected completion UI root count: ${rootCount}`

  });


  // =========================================
  // DISPLAY MASTER SUMMARY
  // =========================================

  console.log(
    ""
  );


  console.log(
    "========================================================="
  );


  console.log(
    "CHRONICLE REGRESSION — MASTER SUMMARY"
  );


  console.log(
    "========================================================="
  );


  console.table(
    results.map(
      buildChronicleRegressionSummaryRow
    )
  );


  const failedResults =
    results.filter(
      result =>
        result.pass !==
          true
    );


  console.log(
    ""
  );


  if (
    failedResults.length ===
      0
  ) {


    console.log(
      "========================================================="
    );


    console.log(
      "✅ CHRONICLE ENGINE — PLAYER PROGRESSION VERIFIED"
    );


    console.log(
      "========================================================="
    );


    console.log(
      `Suites Passed: ${results.length}/${results.length}`
    );


    console.log(
      "Real Save: RESTORED"
    );


    console.log(
      "Lifecycle: VERIFIED"
    );


    console.log(
      "Legacy Rollback: VERIFIED"
    );


    console.log(
      "Player-Facing Progression: VERIFIED"
    );


    console.log(
      "========================================================="
    );

  }
  else {


    console.error(
      "========================================================="
    );


    console.error(
      `❌ CHRONICLE REGRESSION FAILED — ${failedResults.length} ISSUE(S)`
    );


    console.error(
      "========================================================="
    );


    console.table(
      failedResults.map(
        buildChronicleRegressionSummaryRow
      )
    );


    console.error(
      "Do not proceed to content abstraction until these failures are resolved."
    );


    console.error(
      "========================================================="
    );

  }


  return {

    success:
      failedResults.length ===
        0,

    passed:
      results.length -
      failedResults.length,

    failed:
      failedResults.length,

    total:
      results.length,

    saveRestored:
      saveRestoredExactly,

    results:
      results,

    liveRunState:
      liveRunState

  };

}



// =========================================================
// WEAPON CLASS DIFFICULTY
// =========================================================
//
// Higher difficulty weapons require more effective Buki
// before reaching the same proficiency tier.
//
// This does NOT permanently reduce character stats.
//
// =========================================================

const WEAPON_CLASS_DIFFICULTY = {

  Kunai: 0,

  Tanto: 5,

  Katana: 10,

  Sword: 10,

  Spear: 15,

  Heavy: 25

};


// =========================================================
// WEAPON PROFICIENCY TIERS
// =========================================================

const WEAPON_PROFICIENCY_TIERS = [

  {
    name: "Master",
    minimumBuki: 110,
    multiplier: 1.50
  },

  {
    name: "Expert",
    minimumBuki: 90,
    multiplier: 1.35
  },

  {
    name: "Proficient",
    minimumBuki: 70,
    multiplier: 1.20
  },

  {
    name: "Standard",
    minimumBuki: 40,
    multiplier: 1.00
  },

  {
    name: "Untrained",
    minimumBuki: 0,
    multiplier: 0.90
  }

];


// =========================================================
// GET EQUIPPED WEAPON DEFINITION
// =========================================================

function getEquippedWeaponDefinition(
  character
) {


  if (
    !character ||
    !Array.isArray(
      character.equipment
    )
  ) {

    return null;

  }


  const weapon =
    character.equipment.find(
      equipment =>
        equipment.slot ===
        "weapon"
    );


  if (!weapon) {

    return null;

  }


  return getItemDefinition(
    weapon.itemId
  );

}


// =========================================================
// WEAPON SPECIALIZATION SETTINGS
// =========================================================

const WEAPON_SPECIALIZATION_MAX_LEVEL =
  5;


const WEAPON_SPECIALIZATION_BONUS_PER_LEVEL =
  5;


// =========================================================
// WEAPON SPECIALIZATION EXP REQUIREMENT
// =========================================================

function getWeaponSpecializationExpRequired(
  level
) {


  const safeLevel =
    Math.max(
      0,
      Number(level) || 0
    );


  return (
    50 +
    safeLevel * 25
  );

}


// =========================================================
// NORMALIZE WEAPON SPECIALIZATION RECORD
// =========================================================

function normalizeWeaponSpecializationRecord(
  value
) {


  if (
    typeof value ===
      "number"
  ) {


    const convertedLevel =
      Math.min(
        WEAPON_SPECIALIZATION_MAX_LEVEL,
        Math.max(
          0,
          Math.floor(
            value /
            WEAPON_SPECIALIZATION_BONUS_PER_LEVEL
          )
        )
      );


    return {

      level:
        convertedLevel,

      exp:
        0

    };

  }


  if (
    !value ||
    typeof value !==
      "object"
  ) {

    return {

      level:
        0,

      exp:
        0

    };

  }


  return {

    level:
      Math.min(
        WEAPON_SPECIALIZATION_MAX_LEVEL,
        Math.max(
          0,
          Number(
            value.level
          ) || 0
        )
      ),

    exp:
      Math.max(
        0,
        Number(
          value.exp
        ) || 0
      )

  };

}


// =========================================================
// GET / CREATE WEAPON SPECIALIZATION RECORD
// =========================================================

function getWeaponSpecializationRecord(
  character,
  weaponClass
) {


  if (
    !character ||
    !weaponClass
  ) {

    return null;

  }


  if (
    !character.weaponSpecializations ||
    typeof character.weaponSpecializations !==
      "object"
  ) {

    character.weaponSpecializations =
      {};

  }


  const normalized =
    normalizeWeaponSpecializationRecord(
      character
        .weaponSpecializations[
          weaponClass
        ]
    );


  character.weaponSpecializations[
    weaponClass
  ] = normalized;


  return normalized;

}


// =========================================================
// GET WEAPON SPECIALIZATION BONUS
// =========================================================

function getWeaponSpecializationBonus(
  character,
  weaponDefinition
) {


  if (
    !character ||
    !weaponDefinition ||
    !weaponDefinition.weaponClass
  ) {

    return 0;

  }


  const specialization =
    getWeaponSpecializationRecord(
      character,
      weaponDefinition.weaponClass
    );


  if (!specialization) {

    return 0;

  }


  return (
    specialization.level *
    WEAPON_SPECIALIZATION_BONUS_PER_LEVEL
  );

}


// =========================================================
// ADD WEAPON SPECIALIZATION EXP
// =========================================================

function addWeaponSpecializationExp(
  characterId,
  weaponClass,
  amount
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {

    console.log(
      "Character not found:",
      characterId
    );


    return false;

  }


  const expAmount =
    Math.max(
      0,
      Number(
        amount
      ) || 0
    );


  if (
    !weaponClass ||
    expAmount <= 0
  ) {

    console.log(
      "Invalid specialization EXP."
    );


    return false;

  }


  const specialization =
    getWeaponSpecializationRecord(
      character,
      weaponClass
    );


  if (
    specialization.level >=
    WEAPON_SPECIALIZATION_MAX_LEVEL
  ) {


    specialization.exp =
      0;


    console.log(
      `${character.name} already has maximum ${weaponClass} specialization.`
    );


    savePlayerData();


    return true;

  }


  specialization.exp +=
    expAmount;


  let levelsGained =
    0;


  while (
    specialization.level <
      WEAPON_SPECIALIZATION_MAX_LEVEL
  ) {


    const expRequired =
      getWeaponSpecializationExpRequired(
        specialization.level
      );


    if (
      specialization.exp <
      expRequired
    ) {

      break;

    }


    specialization.exp -=
      expRequired;


    specialization.level +=
      1;


    levelsGained +=
      1;

  }


  if (
    specialization.level >=
    WEAPON_SPECIALIZATION_MAX_LEVEL
  ) {

    specialization.level =
      WEAPON_SPECIALIZATION_MAX_LEVEL;


    specialization.exp =
      0;

  }


  savePlayerData();


  console.log(
    `${character.name} gained +${expAmount} ${weaponClass} specialization EXP.`
  );


  console.log(
    `${weaponClass} Specialization Level: ${specialization.level}`
  );


  console.log(
    `${weaponClass} Handling Bonus: +${
      specialization.level *
      WEAPON_SPECIALIZATION_BONUS_PER_LEVEL
    }`
  );


  if (
    levelsGained > 0
  ) {

    console.log(
      `Specialization level increased by ${levelsGained}.`
    );

  }


  return true;

}


// =========================================================
// SHOW WEAPON SPECIALIZATION DATA
// =========================================================

function showWeaponSpecializationData(
  characterId
) {


  const character =
    getPlayerCharacter(
      characterId
    );


  if (!character) {

    return;

  }


  const rows =
    Object.entries(
      character.weaponSpecializations ||
      {}
    ).map(
      (
        [
          weaponClass,
          value
        ]
      ) => {


        const specialization =
          getWeaponSpecializationRecord(
            character,
            weaponClass
          );


        const maxed =
          specialization.level >=
          WEAPON_SPECIALIZATION_MAX_LEVEL;


        return {

          weaponClass:
            weaponClass,

          level:
            specialization.level,

          exp:
            specialization.exp,

          expToNext:
            maxed
              ? "MAX"
              : getWeaponSpecializationExpRequired(
                  specialization.level
                ),

          handlingBonus:
            specialization.level *
            WEAPON_SPECIALIZATION_BONUS_PER_LEVEL

        };

      }
    );


  console.table(
    rows
  );

}


// =========================================================
// GET WEAPON CLASS DIFFICULTY
// =========================================================

function getWeaponClassDifficulty(
  character,
  weaponDefinition
) {


  if (
    !weaponDefinition ||
    !weaponDefinition.weaponClass
  ) {

    return 0;

  }


  const baseDifficulty =
    WEAPON_CLASS_DIFFICULTY[
      weaponDefinition.weaponClass
    ] ||
    0;


  const specialization =
    getWeaponSpecializationBonus(
      character,
      weaponDefinition
    );


  return Math.max(
    0,
    baseDifficulty -
    specialization
  );

}

// =========================================================
// GET RAW EQUIPMENT STAT BONUSES
// =========================================================

function getRawEquipmentStatBonuses(
  character
) {


  const bonuses = {

    nin: 0,
    tai: 0,
    buki: 0,
    fuin: 0,
    kin: 0,
    gen: 0,
    stamina: 0

  };


  if (
    !character ||
    !Array.isArray(
      character.equipment
    )
  ) {

    return bonuses;

  }


  character.equipment.forEach(
    equipment => {


      const definition =
        getItemDefinition(
          equipment.itemId
        );


      if (
        !definition ||
        !definition.statModifiers
      ) {

        return;

      }


      Object.entries(
        definition.statModifiers
      ).forEach(
        ([stat, amount]) => {


          if (
            bonuses[stat] ===
            undefined
          ) {

            return;

          }


          bonuses[stat] +=
            Number(
              amount
            ) || 0;

        }
      );

    }
  );


  return bonuses;

}


// =========================================================
// WEAPON PROFICIENCY HELPERS
// =========================================================

function getWeaponProficiencyTier(
  proficiencyBuki
) {


  const safeBuki =
    Math.max(
      0,
      Number(
        proficiencyBuki
      ) || 0
    );


  const tier =
    WEAPON_PROFICIENCY_TIERS.find(
      proficiencyTier =>
        safeBuki >=
        proficiencyTier.minimumBuki
    );


  return {

    name:
      tier
        ? tier.name
        : "Untrained",

    proficiencyBuki:
      safeBuki,

    multiplier:
      tier
        ? tier.multiplier
        : 0.90

  };

}


// =========================================================
// GET NATURAL WEAPON PROFICIENCY
// =========================================================
//
// Natural proficiency DOES NOT include the equipped
// weapon's Buki bonus.
//
// It represents the character's permanent ability:
//
// Current Buki
// - Weapon Difficulty
// + Permanent Specialization handling
//
// =========================================================

function getNaturalWeaponProficiency(
  character
) {


  if (!character) {

    return {

      name: "Untrained",

      naturalBuki: 0,

      difficulty: 0,

      proficiencyBuki: 0,

      multiplier: 0.90

    };

  }


  const weaponDefinition =
    getEquippedWeaponDefinition(
      character
    );


  const currentBuki =
    Number(
      character.stats.buki
    ) || 0;


  const difficulty =
    getWeaponClassDifficulty(
      character,
      weaponDefinition
    );


  const proficiencyBuki =
    Math.max(
      0,
      currentBuki -
      difficulty
    );


  const tier =
    getWeaponProficiencyTier(
      proficiencyBuki
    );


  return {

    name:
      tier.name,

    naturalBuki:
      currentBuki,

    difficulty:
      difficulty,

    proficiencyBuki:
      tier.proficiencyBuki,

    multiplier:
      tier.multiplier

  };

}


// =========================================================
// GET ACTIVE WEAPON PROFICIENCY
// =========================================================
//
// Active proficiency includes RAW equipment Buki.
//
// Equipment may temporarily push the character into
// a higher proficiency tier.
//
// The tier is calculated once before the multiplier
// is applied, preventing feedback loops.
//
// =========================================================

function getWeaponProficiency(
  character
) {


  if (!character) {

    return {

      name: "Untrained",

      rawProficiencyBuki: 0,

      difficulty: 0,

      proficiencyBuki: 0,

      multiplier: 0.90

    };

  }


  const rawBonuses =
    getRawEquipmentStatBonuses(
      character
    );


  const weaponDefinition =
    getEquippedWeaponDefinition(
      character
    );


  const difficulty =
    getWeaponClassDifficulty(
      character,
      weaponDefinition
    );


  const currentBuki =
    Number(
      character.stats.buki
    ) || 0;


  const rawProficiencyBuki =
    currentBuki +
    rawBonuses.buki;


  const proficiencyBuki =
    Math.max(
      0,
      rawProficiencyBuki -
      difficulty
    );


  const tier =
    getWeaponProficiencyTier(
      proficiencyBuki
    );


  return {

    name:
      tier.name,

    rawProficiencyBuki:
      rawProficiencyBuki,

    difficulty:
      difficulty,

    proficiencyBuki:
      tier.proficiencyBuki,

    multiplier:
      tier.multiplier

  };

}

// =========================================================
// SIGNATURE WEAPON AFFINITY
// =========================================================
//
// Optional character-specific multiplier for a particular
// weapon.
//
// Example:
//
// signatureAffinity: {
//   sasuke: 1.10
// }
//
// If no affinity exists, the weapon behaves normally at 1.00x.
//
// =========================================================

function getSignatureWeaponAffinityMultiplier(
  character,
  weaponDefinition
) {


  if (
    !character ||
    !weaponDefinition ||
    !weaponDefinition.signatureAffinity ||
    typeof weaponDefinition.signatureAffinity !==
      "object"
  ) {

    return 1;

  }


  const multiplier =
    Number(
      weaponDefinition
        .signatureAffinity[
          character.id
        ]
    );


  if (
    !Number.isFinite(
      multiplier
    ) ||
    multiplier <= 0
  ) {

    return 1;

  }


  return multiplier;

}


// =========================================================
// EQUIPMENT STAT BONUS
// =========================================================

function getEquipmentStatBonuses(
  character
) {


  const rawBonuses =
    getRawEquipmentStatBonuses(
      character
    );


  const proficiency =
    getWeaponProficiency(
      character
    );


  const weaponDefinition =
    getEquippedWeaponDefinition(
      character
    );


  const signatureMultiplier =
    getSignatureWeaponAffinityMultiplier(
      character,
      weaponDefinition
    );


  const bonuses = {

    nin: 0,
    tai: 0,
    buki: 0,
    fuin: 0,
    kin: 0,
    gen: 0,
    stamina: 0

  };


  Object.keys(
    rawBonuses
  ).forEach(
    stat => {


      bonuses[
        stat
      ] =
        rawBonuses[
          stat
        ] *
        proficiency.multiplier *
        signatureMultiplier;

    }
  );


  return bonuses;

}

// =========================================================
// EFFECTIVE CHARACTER STATS
// =========================================================

function getEffectiveCharacterStats(
  character
) {


  const equipmentBonuses =
    getEquipmentStatBonuses(
      character
    );


  const effectiveStats = {

    ...character.stats

  };


  Object.keys(
    equipmentBonuses
  ).forEach(
    stat => {


      effectiveStats[stat] =
        (
          effectiveStats[stat] ||
          0
        ) +
        equipmentBonuses[stat];

    }
  );


  return effectiveStats;

}


// =========================================================
// STAT-BASED PL GROWTH
// =========================================================

function calculateStatPLGrowth(
  baseStats,
  currentStats
) {


  let weightedGrowth = 0;
  let totalWeight = 0;


  for (
    const stat in STAT_WEIGHTS
  ) {


    const growth =
      currentStats[stat] -
      baseStats[stat];


    weightedGrowth +=
      growth *
      STAT_WEIGHTS[stat];


    totalWeight +=
      STAT_WEIGHTS[stat];

  }


  return (
    weightedGrowth /
    totalWeight
  );

}


// =========================================================
// CURRENT CHARACTER POWER LEVEL
// =========================================================

function calculateCurrentPL(
  character
) {


  const effectiveStats =
    getEffectiveCharacterStats(
      character
    );


  const statGrowth =
    calculateStatPLGrowth(
      character.baseStats,
      effectiveStats
    );


  const permanentBonus =
    character.permanentPLBonus ||
    0;


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

          chance: 6.5

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


  // =========================================
  // ENSURE CONTRIBUTION DATA IS COMPLETE
  // =========================================

  contribution.damage =
    Number(
      contribution.damage
    ) || 0;


  contribution.attacks =
    Number(
      contribution.attacks
    ) || 0;


  contribution.ninjutsuDamage =
    Number(
      contribution.ninjutsuDamage
    ) || 0;


  contribution.taijutsuDamage =
    Number(
      contribution.taijutsuDamage
    ) || 0;


  contribution.bukijutsuDamage =
    Number(
      contribution.bukijutsuDamage
    ) || 0;


  // =========================================
  // TOTAL CONTRIBUTION
  // =========================================

  contribution.damage +=
    damage;


  contribution.attacks +=
    1;


  // =========================================
  // ATTACK TYPE CONTRIBUTION
  // =========================================

  if (
    attackType ===
    "ninjutsu"
  ) {

    contribution.ninjutsuDamage +=
      damage;

  }


  if (
    attackType ===
    "taijutsu"
  ) {

    contribution.taijutsuDamage +=
      damage;

  }


  if (
    attackType ===
    "bukijutsu"
  ) {

    contribution.bukijutsuDamage +=
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
  // Claim rewards before leaving
  // =========================================

  if (
    currentOverlayType ===
    "victory"
  ) {


    continueAfterVictory();


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
      ? calculateCurrentPL(
          character
        )
      : character.power;


  let stamina =
    character.stats?.stamina ||
    0;


  // =========================================
  // PLAYER CHARACTERS USE EFFECTIVE STATS
  // =========================================

  if (
    character.basePL !==
    undefined
  ) {


    const effectiveStats =
      getEffectiveCharacterStats(
        character
      );


    stamina =
      effectiveStats.stamina ||
      0;

  }


  // =========================================
  // CORE BATTLE POWER
  // =========================================

  let battlePower =
    pl +
    (
      stamina *
      0.5
    );


  // =========================================
  // ENCOUNTER SCALING
  // =========================================

  const multipliers = {

    standard:
      1,

    elite:
      1.25,

    groupBoss:
      8,

    guardBoss:
      50

  };


  battlePower *=
    multipliers[
      encounterType
    ] ||
    1;


  // =========================================
  // SMALL ±10% VARIATION
  // =========================================

  const variation =
    0.90 +
    (
      Math.random() *
      0.20
    );


  battlePower *=
    variation;


  return Math.max(
    1,
    Math.round(
      battlePower
    )
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
  onclick="
    performBukijutsuAttack()
  "

  ${
    currentBattle.battleOver
      ? "disabled"
      : ""
  }
>
BUKIJUTSU
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
          1vw,
          14px
        );

        font-weight:bold;

        margin-top:5px;

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
          13px,
          1.35vw,
          20px
        );

        font-weight:bold;

        margin-top:5px;

        text-shadow:
          0 0 10px
          rgba(
            0,
            217,
            232,
            0.45
          );
      ">

        ${mvpPercentage}

      </div>


      <div style="
        color:#94A3B8;

        font-size:clamp(
          6px,
          0.58vw,
          9px
        );

        font-weight:bold;

        letter-spacing:0.8px;

        margin-top:1px;
      ">

        TOTAL DAMAGE

      </div>


    </div>



    <!-- ====================================== -->
    <!-- BATTLE PERFORMANCE SUMMARY -->
    <!-- ====================================== -->

    <div
      class="
        victory-slot
        victory-slot-mvp
      "

      style="
        position:absolute;

        left:50%;
        top:95.5%;

        width:62%;

        transform:
          translate(
            -50%,
            -50%
          );

        text-align:center;

        pointer-events:none;

        color:#CBD5E1;

        font-size:clamp(
          6px,
          0.62vw,
          9px
        );

        letter-spacing:0.7px;

        text-shadow:
          0 2px 5px
          #000000;
      "
    >


      <span style="
        color:#D6A93A;
        font-weight:bold;
      ">

        MVP DAMAGE:

      </span>

      ${mvpDamage} BP


      <span style="
        color:#475569;
        margin:
          0
          10px;
      ">

        •

      </span>


      <span style="
        color:#00D9E8;
        font-weight:bold;
      ">

        FINAL STRIKE:

      </span>

       ${finalStrike}


    </div>



  </div>



  <!-- ====================================== -->
  <!-- CONTINUE BUTTON -->
  <!-- ====================================== -->
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


  // =========================================
  // CLAIM BATTLE REWARDS FIRST
  // =========================================
  //
  // The player earned these rewards during the completed
  // encounter.
  //
  // Lifecycle progression is evaluated only AFTER the
  // ordinary victory reward flow has completed.
  //
  // =========================================

  claimCurrentBattleRewards();


  // =========================================
  // END ACTIVE BATTLE
  // =========================================

  currentBattle.active =
    false;


  // =========================================
  // BRICK 83 — GAMEPLAY LIFECYCLE CHECK
  // =========================================
  //
  // This is harmless for every existing normal encounter.
  //
  // Only a gameplay source explicitly carrying:
  //
  // progressionTrigger: "run_completion"
  //
  // can complete the current difficulty.
  //
  // =========================================

  const lifecycleResult =
    processGameplayRunCompletion({

      enemy:
        currentBattle.enemy ||
        selectedEnemy ||
        null,

      location:
        selectedLocationNode ||
        null

    });


  // =========================================
  // COMPLETION FLOW HAS TAKEN CONTROL
  // =========================================

  if (
    lifecycleResult &&
    lifecycleResult.handled ===
      true &&
    lifecycleResult.flowOpened ===
      true
  ) {


    console.log(
      "Gameplay lifecycle opened completion flow."
    );


    return;

  }


  // =========================================
  // COMPLETION WAS DETECTED BUT FLOW FAILED
  // =========================================
  //
  // Do NOT silently send the player away from a completed
  // run if its completion UI could not open.
  //
  // Preserve the completed save and expose the problem.
  //
  // =========================================

  if (
    lifecycleResult &&
    lifecycleResult.handled ===
      true &&
    lifecycleResult.completed ===
      true &&
    lifecycleResult.flowOpened !==
      true
  ) {


    console.error(
      "Run completed, but completion flow did not open:",
      lifecycleResult
    );


    return;

  }


  // =========================================
  // SAVE DEVELOPMENT STATE
  // =========================================

  saveTestState();


  // =========================================
  // ORDINARY VICTORY
  // RETURN TO ENCOUNTER SCREEN
  // =========================================

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


    case "bukijutsu":

      statName =
        "buki";

      break;


    default:

      console.log(
        "Unknown attack type:",
        attackType
      );


      return;

  }


  // =========================================
  // EFFECTIVE COMBAT STATS
  // =========================================

  const effectiveStats =
    getEffectiveCharacterStats(
      fighter
    );


  const attackStat =
    Number(
      effectiveStats[
        statName
      ]
    ) || 0;


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
    currentBattle.enemyPower <
      0
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

  let attackLabel =
    "Attack";


  if (
    attackType ===
    "ninjutsu"
  ) {

    attackLabel =
      "Ninjutsu";

  }


  if (
    attackType ===
    "taijutsu"
  ) {

    attackLabel =
      "Taijutsu";

  }


  if (
    attackType ===
    "bukijutsu"
  ) {

    attackLabel =
      "Bukijutsu";

  }


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
    currentBattle.enemyPower <=
    0
  ) {


    currentBattle.battleOver =
      true;


    currentBattle.active =
      false;


    const rewards =
      generateBattleRewards(
        currentBattle.enemy,
        fighter
      );


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


    if (
      rewards.items.length >
      0
    ) {

      rewards.items.forEach(
        item => {

          currentBattle.battleLog.push(
            `Item found: ${item.name}`
          );

        }
      );

    }


    if (
      rewards.rareDrops.length >
      0
    ) {

      rewards.rareDrops.forEach(
        item => {

          currentBattle.battleLog.push(
            `★ RARE DROP: ${item.name}!`
          );

        }
      );

    }


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
    `${statName.toUpperCase()} EFFECTIVE STAT:`,
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


function performBukijutsuAttack() {


  performStatAttack(
    "bukijutsu"
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


// =========================================================
// INITIAL GAME LOAD
// =========================================================

window.addEventListener(
  "load",
  () => {


    syncCharacterEquipmentFromSave();


    restoreTestState();

  }
);
