// -----------------------------
// Utility: Show / Hide Pages
// -----------------------------
function showPage(pageId) {
    const pages = [
        "login-page",
        "journey-page",
        "difficulty-page",
        "village-page",
        "ninja-page"
    ];

    pages.forEach(id => {
        document.getElementById(id).style.display = (id === pageId) ? "block" : "none";
    });
}

// -----------------------------
// Login & Registration
// -----------------------------
function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Please enter both username and password.");
        return;
    }

    // Later you can add real authentication here
    showPage("journey-page");
}

function register() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Please enter both username and password.");
        return;
    }

    alert("Registration successful!");
}

// -----------------------------
// Navigation: Journey → Difficulty
// -----------------------------
function goToDifficulty() {
    showPage("difficulty-page");
}

function goBackToJourney() {
    showPage("journey-page");
}

function goBackToLogin() {
    showPage("login-page");
}

// -----------------------------
// Difficulty Selection
// -----------------------------
function selectDifficulty(level) {
    console.log("Difficulty selected:", level);

    // Later you can store difficulty in localStorage or a variable
    showPage("village-page");
}

function goBackToDifficulty() {
    showPage("difficulty-page");
}

// -----------------------------
// Village → Ninja Selection
// -----------------------------
function goBackToVillage() {
    showPage("village-page");
}
