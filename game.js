// --- Village & Faction Data ---
const villages = [
    { name: "Konoha", description: "Hidden Leaf Village.", ninjas: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno"] },
    { name: "Suna", description: "Hidden Sand Village.", ninjas: ["Gaara"] },
    { name: "Kiri", description: "Hidden Mist Village.", ninjas: ["Zabuza"] },
    { name: "Kumo", description: "Hidden Cloud Village.", ninjas: ["Killer Bee"] },
    { name: "Iwa", description: "Hidden Stone Village.", ninjas: ["Onoki"] },
    { name: "Oto", description: "Hidden Sound Village.", ninjas: ["Kabuto"] },
    { name: "Taki", description: "Hidden Waterfall Village.", ninjas: ["Fuu"] },
    { name: "Ame", description: "Hidden Rain Village.", ninjas: ["Pain"] },
    { name: "Kusa", description: "Hidden Grass Village.", ninjas: ["Zetsu"] },
    { name: "Yuga", description: "Hidden Moon Village.", ninjas: ["Unknown"] },
    { name: "Yuki", description: "Hidden Snow Village.", ninjas: ["Fubuki"] },
    { name: "Uzushio", description: "Hidden Whirlpool Village.", ninjas: ["Kushina"] },

    { name: "Akatsuki", description: "Rogue shinobi organization.", ninjas: ["Itachi Uchiha"], locked: true },
    { name: "Jinchuriki", description: "Hosts of the tailed beasts.", ninjas: ["Naruto Uzumaki"], locked: true }
];

// --- Login / Register ---
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user && pass) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("journey-page").style.display = "block";
    }
}

function register() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user && pass) {
        alert("Registration successful!");
    }
}

// --- Journey Navigation ---
function goToDifficulty() {
    document.getElementById("journey-page").style.display = "none";
    document.getElementById("difficulty-page").style.display = "block";
}

function goBackToJourney() {
    // From difficulty page → back to journey page
    document.getElementById("difficulty-page").style.display = "none";
    document.getElementById("journey-page").style.display = "block";
}

function goBackToLogin() {
    // From journey page → back to login page
    document.getElementById("journey-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";
}

// --- Difficulty ---
function selectDifficulty(level) {
    console.log("Difficulty selected:", level);

    document.getElementById("difficulty-page").style.display = "none";
    document.getElementById("village-page").style.display = "block";
}

function goBackToDifficulty() {
    document.getElementById("village-page").style.display = "none";
    document.getElementById("difficulty-page").style.display = "block";
}

// --- Village Navigation ---
function goBackToVillage() {
    document.getElementById("ninja-page").style.display = "none";
    document.getElementById("village-page").style.display = "block";
}

// --- Display Villages ---
function displayVillages() {
    const container = document.getElementById("village-list");
    container.innerHTML = "";

    villages.forEach(village => {
        const card = document.createElement("div");
        card.className = "village-card";

        if (village.locked) card.classList.add("locked");

        card.innerHTML = `
            <h2>${village.name}</h2>
            <p>${village.description}</p>
            ${
                village.locked
                ? `<button disabled class="locked-btn">Locked</button>`
                : `<button onclick="previewVillage('${village.name}')">Preview Ninjas</button>`
            }
        `;

        container.appendChild(card);
    });
}

// --- Preview Ninjas ---
function previewVillage(name) {
    const village = villages.find(v => v.name === name);

    document.getElementById("village-page").style.display = "none";
    document.getElementById("ninja-page").style.display = "block";

    document.getElementById("ninja-title").innerText = `${name} Ninja Preview`;

    let html = "";

    village.ninjas.forEach(ninjaName => {
        html += `
        <div class="ninja-card">
            <div class="ninja-header">
                <span class="ninja-name">${ninjaName}</span>
                <span class="ninja-rank">Genin</span>
                <span class="ninja-village">${name}</span>
            </div>

            <div class="ninja-body">
                <div class="ninja-portrait">
                    <div class="portrait-placeholder">Ninja Photo</div>
                </div>

                <div class="ninja-stats">
                    <h3>Combat Profile</h3>
                    <ul class="stat-list">
                        <li><strong>Taijutsu:</strong> 70</li>
                        <li><strong>Ninjutsu:</strong> 60</li>
                        <li><strong>Kenjutsu:</strong> 30</li>
                        <li><strong>Kinjutsu:</strong> 10</li>
                        <li><strong>Fūinjutsu:</strong> 20</li>
                    </ul>
                </div>
            </div>

            <div class="ninja-footer">
                <h3>Jutsu</h3>
                <ul class="jutsu-list">
                    <li><strong>Shadow Clone Technique</strong> — Ninjutsu</li>
                    <li><strong>Basic Taijutsu Combo</strong> — Taijutsu</li>
                    <li><strong>Sealing Tag Practice</strong> — Fūinjutsu</li>
                </ul>
            </div>
        </div>
        `;
    });

    document.getElementById("ninja-container").innerHTML = html;
}

// --- Initialize ---
displayVillages();
