const button = document.getElementById("openBtn");
const message = document.getElementById("message");

const finalScreen = document.getElementById("finalScreen");
const restartBtn = document.getElementById("restartBtn");

const photo = document.getElementById("photo");
const photoCaption = document.getElementById("photoCaption");

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

const backBtn = document.getElementById("backBtn");
const introPhoto = document.getElementById("introPhoto");

const container = document.querySelector(".container");
const musicControls = document.querySelector(".music-controls");


let slides = [
    {
        image: "images/photo1.jpg",
        caption: "Это про тебя😊"
    },
    {
        image: "images/photo2.jpg",
        caption: "А это мой любимка😍"
    },
    {
        image: "images/photo3.jpg",
        caption: "О, а это мы🥰"
    }
];

let index = 0;

button.onclick = () => {

    document.body.classList.add("gallery-mode");

    if (introPhoto) {
        introPhoto.classList.add("to-background");
    }

    button.style.display = "none";
    message.classList.remove("hidden");
    message.classList.add("show");

    if (typeof launchFireworks === "function") {
        launchFireworks();
    }
};

next.onclick = () => {

index++

if(index >= slides.length){

message.classList.add("hidden")
finalScreen.classList.remove("hidden")

if(typeof launchFireworks === "function"){
launchFireworks()
}

return
}

updateSlide()

}

prev.onclick = () => {
    index--;

    if (index < 0) {
        index = slides.length - 1;
    }

    updateSlide();
};

backBtn.onclick = () => {

    document.body.classList.remove("gallery-mode");
    
    message.classList.remove("show");
    message.classList.add("hidden");
    button.style.display = "block";

    if (introPhoto) {
        introPhoto.classList.remove("to-background");
    }

    index = 0;
    photo.src = slides[index].image;
    photoCaption.textContent = slides[index].caption;
};

let lastPetalTime = 0;

document.addEventListener("mousemove", (event) => {
    const now = Date.now();

    if (now - lastPetalTime < 120) {
        return;
    }

    lastPetalTime = now;

    if (Math.random() > 0.55) {
        return;
    }

    const petal = document.createElement("div");
    petal.className = "cursor-petal";
    petal.textContent = Math.random() > 0.5 ? "🌸" : "🌷";

    petal.style.left = event.clientX + "px";
    petal.style.top = event.clientY + "px";
    petal.style.fontSize = 12 + Math.random() * 10 + "px";

    const driftX = -30 + Math.random() * 60;
    const driftY = 30 + Math.random() * 70;

    petal.style.setProperty("--driftX", `${driftX}px`);
    petal.style.setProperty("--driftY", `${driftY}px`);

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 1800);
});

function updateSlide() {
    photoCaption.classList.add("changing");

    setTimeout(() => {
        photo.src = slides[index].image;
        photoCaption.textContent = slides[index].caption;
        photoCaption.classList.remove("changing");
    }, 180);
}

let isMusicPlaying = false;

musicToggle.onclick = async () => {
    try {
        if (!isMusicPlaying) {
            await bgMusic.play();
            isMusicPlaying = true;
            musicToggle.textContent = "Выключить музыку ♫";
            musicToggle.classList.add("playing");
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            musicToggle.textContent = "Включить музыку ♫";
            musicToggle.classList.remove("playing");
        }
    } catch (error) {
        console.log("Музыка не запустилась:", error);
    }
};

function createButtonSpark() {
    if (button.style.display === "none") {
        return;
    }

    const rect = button.getBoundingClientRect();
    const spark = document.createElement("div");
    spark.className = "button-spark";

    const side = Math.floor(Math.random() * 4);

    let x = 0;
    let y = 0;

    if (side === 0) {
        x = rect.left + Math.random() * rect.width;
        y = rect.top;
    } else if (side === 1) {
        x = rect.right;
        y = rect.top + Math.random() * rect.height;
    } else if (side === 2) {
        x = rect.left + Math.random() * rect.width;
        y = rect.bottom;
    } else {
        x = rect.left;
        y = rect.top + Math.random() * rect.height;
    }

    spark.style.left = x + "px";
    spark.style.top = y + "px";

    const driftX = -35 + Math.random() * 70;
    const driftY = -35 + Math.random() * 70;

    spark.style.setProperty("--sparkX", `${driftX}px`);
    spark.style.setProperty("--sparkY", `${driftY}px`);

    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 1600);
}

setInterval(createButtonSpark, 320);

restartBtn.onclick = () => {
    finalScreen.classList.add("hidden");
    message.classList.remove("hidden");

    if (introPhoto) {
        introPhoto.classList.add("to-background");
    }

    index = 0;
    photo.src = slides[index].image;
    photoCaption.textContent = slides[index].caption;
};

function isFireworksAllowed() {
    const messageHidden = message.classList.contains("hidden");
    const finalHidden = finalScreen.classList.contains("hidden");
    return messageHidden && finalHidden;
}



function isInsideRect(x, y, element, padding = 0) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();

    return (
        x >= rect.left - padding &&
        x <= rect.right + padding &&
        y >= rect.top - padding &&
        y <= rect.bottom + padding
    );
}

document.addEventListener("click", (event) => {
    if (!isFireworksAllowed()) {
        return;
    }

    if (event.target.closest("button")) {
    return;
}

    const x = event.clientX;
    const y = event.clientY;

const centerSafeZone = {
    left: window.innerWidth * 0.30,
    right: window.innerWidth * 0.70,
    top: window.innerHeight * 0.22,
    bottom: window.innerHeight * 0.72
};

const insideCenterSafeZone =
    x >= centerSafeZone.left &&
    x <= centerSafeZone.right &&
    y >= centerSafeZone.top &&
    y <= centerSafeZone.bottom;

const blocked =
    insideCenterSafeZone ||
    isInsideRect(x, y, button, 55) ||
    isInsideRect(x, y, musicControls, 20) ||
    isInsideRect(x, y, introPhoto, 45);

    if (blocked) {
        return;
    }

console.log("firework click", x, y);

if (typeof createRandomFireworkAt === "function") {
    createRandomFireworkAt(x, y);
}
});