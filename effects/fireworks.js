const fireworksCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fireworksCanvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeFireworksCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

resizeFireworksCanvas();
window.addEventListener("resize", resizeFireworksCanvas);

class Particle {
    constructor(x, y, color, angle, speed) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = angle;
        this.speed = speed;
        this.radius = 2 + Math.random() * 2.5;
        this.alpha = 1;
        this.gravity = 0.04;
        this.friction = 0.985;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.013;
    }

    draw() {
        fwCtx.save();
        fwCtx.globalAlpha = Math.max(this.alpha, 0);
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        fwCtx.fillStyle = this.color;
        fwCtx.shadowBlur = 12;
        fwCtx.shadowColor = this.color;
        fwCtx.fill();
        fwCtx.restore();
    }
}

function createBurst(x, y) {
    const colors = ["#ff003c", "#7b2cff", "#ffffff", "#ff2e63", "#b266ff"];
    const count = 70;

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 4.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
    }
}

function createRingBurst(x, y) {
    const colors = ["#ff2e63", "#ffffff", "#b266ff", "#ff7aa8"];
    const count = 36;

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2.4 + Math.random() * 1.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
    }
}

function createHeartBurst(x, y) {
    const colors = ["#ff2e63", "#ff4d88", "#ffffff", "#ff7aa8", "#b266ff"];
    const scale = 7;

    for (let t = 0; t < Math.PI * 2; t += 0.16) {
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        const tx = x + hx * scale;
        const ty = y - hy * scale;

        const angle = Math.atan2(ty - y, tx - x);
        const speed = 2 + Math.random() * 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, color, angle, speed));
    }
}

function createStarBurst(x, y) {
    const colors = ["#ffffff", "#ffd166", "#ff7aa8", "#b266ff"];
    const rays = 10;

    for (let i = 0; i < rays; i++) {
        const angle = (Math.PI * 2 * i) / rays;
        const speed = 3 + Math.random() * 1.4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, color, angle, speed));
        particles.push(new Particle(x, y, color, angle + 0.08, speed * 0.75));
    }
}

function animateFireworks() {
    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationId = requestAnimationFrame(animateFireworks);
    } else {
        cancelAnimationFrame(animationId);
        animationId = null;
        fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
}

function ensureAnimation() {
    if (!animationId) {
        animateFireworks();
    }
}

function createRandomFireworkAt(x, y) {
    const variants = [
        createBurst,
        createRingBurst,
        createHeartBurst,
        createStarBurst
    ];

    const variant = variants[Math.floor(Math.random() * variants.length)];
    variant(x, y);
    ensureAnimation();
}

function launchFireworks() {
const bursts = [
    { x: window.innerWidth * 0.16, y: window.innerHeight * 0.18 },
    { x: window.innerWidth * 0.50, y: window.innerHeight * 0.14 },
    { x: window.innerWidth * 0.84, y: window.innerHeight * 0.18 }
];
    bursts.forEach((burst, index) => {
        setTimeout(() => {
            createBurst(burst.x, burst.y);
            ensureAnimation();
        }, index * 350);
    });
}