const starfield = document.querySelector(".star-field");
for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");
    star.classList.add("random-star");
    star.style.left= Math.random() * 100 + "%";
    star.style.top= Math.random() * 100 + "%";
    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.opacity = Math.random() * 0.4 + 0.2;
    starfield.appendChild(star);
}
const today = new Date();
const KnownNewMoon = new Date("2000-01-06t18:14:00Z");
const lunarCycle = 29.530588853;
const daysSinceNewMoon = 
(today - KnownNewMoon) / (1000 * 60 * 60 * 24);
const moonAge =
daysSinceNewMoon % lunarCycle;
let moonPhase;
if (moonAge < 1.84566) {
    moonPhase = "New Moon";
} else if (moonAge < 7.38265) {
    moonPhase = "Waxing Crescent";
} else if (moonAge < 9.22331) {
    moonPhase = "First Quarter";
} else if (moonAge < 14.76529) {
    moonPhase = "Waxing Gibbous";
} else if (moonAge < 16.61096) {
    moonPhase = "Full Moon";
} else if (moonAge < 22.14794) {
    moonPhase = "Waning Gibbous";
} else if (moonAge < 23.99362) {
    moonPhase = "Last Quarter";
} else {
    moonPhase = "Waning Crescent";
}
const moon = document.querySelector(".moon")
if (moonPhase === "Waning Crescent") {
    moon.classList.add("waning-crescent");
}
if (moonPhase === "New Moon") {
    moon.classList.add("new-moon");
}
if (moonPhase === "Waxing Crescent") {
    moon.classList.add("waxing-crescent");
}
if (moonPhase === "First Quarter") {
    moon.classList.add("first-quarter");
}
if (moonPhase === "Waxing Gibbous") {
    moon.classList.add("waxing-gibbous")
}
if (moonPhase === "Full Moon") {
    moon.classList.add("full-moon")
}
if (moonPhase === "Waning Gibbous") { 
    moon.classList.add("waning-gibbous")
}
if (moonPhase === "Last Quarter") {
    moon.classList.add("last-quarter")
}
const moonMessage = document.querySelector(".moon-message");
const birthdayMessage = document.querySelector(".birthday-message");
const constellationStars = document.querySelectorAll(".star");
let constellationStarted = false;
let nextStarIndex = 0;
const moonMessageText = moonMessage.querySelector("p");
function showStarMessage(message) {
    moonMessageText.style.opacity = "0";
    setTimeout(() => {
        moonMessageText.textContent = message;
        moonMessageText.style.opacity = "1";
    }, 180);
}
moon.addEventListener("click", function () {
    if (constellationStarted) return;
    constellationStarted = true;
    moonMessageText.textContent =
        "Some nights are beautiful because of the moon... " +
        "Tap the stars in order to discover their little messages. ✨";
    moonMessage.style.display = "block";
    setTimeout(() => {
        moonMessage.style.opacity = "1";
        moonMessage.style.transform = "translate(-50%, -50%)";
    }, 50);
});
function activateStar(star, index) {
    if (!constellationStarted) return;
    if (index !== nextStarIndex) {
        showStarMessage(
    "Follow the stars in order, starting with the first one. ⭐"
);
        return;
    }
    star.style.opacity = "1";
    star.style.animation = "none";
    star.style.transform = "scale(1.5)";
   showStarMessage(star.dataset.message);
    nextStarIndex++;
    if (nextStarIndex === constellationStars.length) {
        birthdayMessage.style.display = "block";
        setTimeout(() => {
            birthdayMessage.style.opacity = "1";
            birthdayMessage.style.transform = "translate(-50%, 0)";
        }, 50);
    }
}
constellationStars.forEach((star, index) => {
    star.addEventListener("click", function () {
        activateStar(star, index);
    });
    star.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateStar(star, index);
        }
    });
});
const continueBtn = document.querySelector("#continue-btn");
const nextSection = document.querySelector("#next-section");
const closeNextBtn = document.querySelector("#close-next-btn");
closeNextBtn.addEventListener("click", function () {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    nextSection.style.opacity = "0";
    setTimeout(() => {
        nextSection.style.display = "none";
        sky.style.display = "flex";
        birthdayMessage.style.display = "none";
        moonMessage.style.display = "none";
        birthdayMessage.style.opacity = "0";
        moonMessage.style.opacity = "0";
        birthdayMessage.style.transform = "";
        moonMessage.style.transform = "";
        constellationStars.forEach((star) => {
            star.style.opacity = "";
            star.style.animation = "";
            star.style.transform = "";
        });
        constellationStarted = false;
        nextStarIndex = 0;
        letterContent.style.display = "none";
        letterContent.style.opacity = "0";
        letterContent.style.transform = "translate(-50%, 15px)";
        secretStar.style.display = "none";
        secretMessage.style.display = "none";
        secretMessage.style.opacity = "0";
        secretMessage.style.transform = "translateY(15px)";
        finalMessage.style.display = "none";
        anotherSurprise.hidden = true;
anotherSurprise.style.opacity = "0";
        finalMessage.style.opacity = "0";
        finalMessage.style.transform = "translateY(15px) scale(0.95)";
    }, 800);
});
const sky = document.querySelector("#sky");
continueBtn.addEventListener("click", function () {
    sky.style.display = "none";
    nextSection.style.display = "flex";
    setTimeout(() => {
        nextSection.style.opacity = "1";
    }, 50);
    history.pushState({ nextSection: true }, "", "#letter");
});
window.addEventListener("popstate", function () {
    sky.style.display = "flex";
    nextSection.style.display = "none";
    nextSection.style.opacity = "0";
    birthdayMessage.style.display = "none";
    moonMessage.style.display = "none";
    birthdayMessage.style.opacity = "0";
    moonMessage.style.opacity = "0";
    birthdayMessage.style.transform = "";
    moonMessage.style.transform = "";
    constellationStars.forEach((star) => {
        star.style.opacity = "";
        star.style.animation = "";
        star.style.transform = "";
    });
    constellationStarted = false;
    nextStarIndex = 0;
    letterContent.style.display = "none";
    letterContent.style.opacity = "0";
    letterContent.style.transform = "translate(-50%, 15px)";
    secretStar.style.display = "none";
    secretMessage.style.display = "none";
    secretMessage.style.opacity = "0";
    secretMessage.style.transform = "translateY(15px)";
    finalMessage.style.display = "none";
    finalMessage.style.opacity = "0";
    finalMessage.style.transform = "translateY(15px) scale(0.95)";
});
const openLetterBtn = document.querySelector("#open-letter-btn");
const letterContent = document.querySelector("#letter-content");
const secretStar = document.querySelector("#secret-star");
openLetterBtn.addEventListener("click", function () {
    secretMessage.style.display = "none";
finalMessage.style.display = "none";    
secretMessage.style.opacity = "0";
finalMessage.style.opacity = "0";
secretMessage.style.transform = "translateY(15px)";
finalMessage.style.transform = "translateY(15px) scale(0.95)";
    letterContent.style.display = "block";
    secretStar.style.display = "block";
    setTimeout( () => {
        letterContent.style.opacity = "1";
        letterContent.style.transform = "translate(-50%, 0)";
    }, 50);
});
const finalMessage = document.querySelector("#final-message");
const anotherSurprise = document.querySelector("#another-surprise");
const secretStarIcon = document.querySelector("#secret-star span");
const secretMessage = document.querySelector("#secret-message");
secretStarIcon.addEventListener("click", function () {
    if (!anotherSurprise.hidden) return;
    secretMessage.style.display = "block";
    finalMessage.style.display = "block";
    setTimeout(() => {
    anotherSurprise.hidden = false;
    anotherSurprise.style.opacity = "0";
    anotherSurprise.style.transform = "translateY(20px)";

    requestAnimationFrame(() => {
        anotherSurprise.style.opacity = "1";
        anotherSurprise.style.transform = "translateY(0)";
    });
}, 1000);
    setTimeout(() => {
        secretMessage.style.opacity = "1";
        secretMessage.style.transform = "translateY(0)";
        finalMessage.style.opacity = "1";
        finalMessage.style.transform = "translateY(0) scale(1)";
    }, 50);
});
secretStarIcon.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        secretStarIcon.click();
    }
}); 
const unlockForm = document.querySelector("#unlock-form");
const secretCodeInput = document.querySelector("#secret-code");
const lockScreen = document.querySelector("#lock-screen");
const lockError = document.querySelector("#lock-error");
unlockForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (secretCodeInput.value === "2511") {
        lockScreen.style.opacity = "0";
        lockScreen.style.transition = "opacity 0.6s ease";
        setTimeout(() => {
            lockScreen.style.display = "none";
        }, 600);
    } else {
        lockError.textContent = "That isn't the right code. Try again ✨";
        secretCodeInput.value = "";
        secretCodeInput.focus();
    }
});