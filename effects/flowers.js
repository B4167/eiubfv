function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = Math.random() > 0.5 ? "🌸" : "🌷";

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = 6 + Math.random() * 7 + "s";
    petal.style.animationDelay = Math.random() * 4 + "s";
    petal.style.fontSize = 16 + Math.random() * 18 + "px";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 14000);
}

setInterval(createPetal, 450);