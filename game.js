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

function goToDifficulty() {
    document.getElementById("journey-page").style.display = "none";
    document.getElementById("difficulty-page").style.display = "block";
}

function goBackToJourney() {
    document.getElementById("difficulty-page").style.display = "none";
    document.getElementById("journey-page").style.display = "block";
}

function goBackToLogin() {
    document.getElementById("journey-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";
}

function selectDifficulty(level) {
    console.log("Difficulty selected:", level);

    document.getElementById("difficulty-page").style.display = "none";
    document.getElementById("village-page").style.display = "block";
}

function goBackToDifficulty() {
    document.getElementById("village-page").style.display = "none";
    document.getElementById("difficulty-page").style.display = "block";
}

function goBackToVillage() {
    document.getElementById("ninja-page").style.display = "none";
    document.getElementById("village-page").style.display = "block";
}
