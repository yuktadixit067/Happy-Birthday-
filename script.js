let poppedCount = 0;
let giftBalloons = [];
let giftRevealedCount = 0;
let heartsStarted = false;


// BALLOON MESSAGES

const balloonMessages = [
    "🤪 You missed the surprise gift! Better luck next time!",
    "😂 Nope! This balloon was just here to prank you!",
    "😜 Empty balloon! The gift is hiding somewhere else!",
    "Oopsie! No gift here. Your luck is on vacation! 🏖️",
    "🤣 Surprise... absolutely NOTHING! Better luck next time!",
    "🎈 Nice try! The gift escaped this balloon!"
];


// SELECT TWO RANDOM GIFT BALLOONS

function selectGiftBalloons() {

    let numbers = [0, 1, 2, 3, 4, 5];

    for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    giftBalloons = numbers.slice(0, 2);
}


// NAVIGATION

function nextScreen(screenNumber) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById("screen" + screenNumber);

    screen.classList.add("active");
    screen.scrollTop = 0;

    if (screenNumber === 2) confetti();
    if (screenNumber === 7) startHearts();
}


// OPEN BALLOON GAME

function openBalloonScreen() {

    poppedCount = 0;
    giftRevealedCount = 0;

    selectGiftBalloons();

    document.querySelectorAll(".pop-balloon").forEach(balloon => {
        balloon.classList.remove("popped", "shaking", "locked");
    });

    document.getElementById("balloonMessage").innerHTML = "";

    document.getElementById("giftReveal").style.display = "none";
    document.getElementById("interactiveGiftBox").classList.remove("open");
    document.getElementById("giftResult").classList.remove("show");
    document.getElementById("giftTapPrompt").style.display = "block";
    document.getElementById("giftReveal").classList.remove("show");

    document.getElementById("balloonNext").style.display = "none";

    document.getElementById("balloonCounter").innerHTML = "🎈 0 / 2 popped";

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("balloonScreen").classList.add("active");
}


// POP BALLOON

function popBalloon(balloon, index) {

    if (balloon.classList.contains("popped") ||
        poppedCount >= 2 ||
        balloon.classList.contains("locked")) {
        return;
    }

    balloon.classList.add("shaking");

    setTimeout(() => {

        if (poppedCount >= 2 || balloon.classList.contains("popped")) return;

        balloon.classList.remove("shaking");
        balloon.classList.add("popped");

        poppedCount++;

        createBurst(balloon);

        document.getElementById("balloonCounter").innerHTML =
            `🎈 ${poppedCount} / 2 popped`;

        const message = document.getElementById("balloonMessage");
        const giftReveal = document.getElementById("giftReveal");

        message.classList.remove("message-reveal");
        giftReveal.classList.remove("show");
        giftReveal.style.display = "none";

        void message.offsetWidth;

        if (giftBalloons.includes(index)) {

            giftRevealedCount++;

            message.innerHTML =
                "✨✨ YOU FOUND A SECRET GIFT BALLOON! ✨✨";

            message.classList.add("message-reveal");

            const giftBox = document.querySelector("#interactiveGiftBox");

            giftBox.classList.remove("open");

            document.getElementById("giftResult").classList.remove("show");
            document.getElementById("giftTapPrompt").style.display = "block";

            document.getElementById("giftSparkles").innerHTML =
                `<span>✨</span><span>⭐</span><span>💖</span><span>✨</span><span>💫</span>`;

            giftReveal.style.display = "block";

            void giftReveal.offsetWidth;

            giftReveal.classList.add("show");

            confetti();

        } else {

            message.innerHTML =
                balloonMessages[Math.floor(Math.random() * balloonMessages.length)];

            message.classList.add("message-reveal");

            confettiSmall();
        }

        if (poppedCount === 2) {

            document.querySelectorAll(".pop-balloon:not(.popped)")
                .forEach(b => b.classList.add("locked"));

            setTimeout(() => {

                document.getElementById("balloonNext").style.display =
                    "inline-block";

                message.innerHTML +=
                    `<br><br>🎊 That's your 2 tries! Let's continue!`;

                confetti();

            }, 900);
        }

    }, 400);
}


// TAP TO OPEN THE GIFT

function openGift() {

    const box = document.getElementById("interactiveGiftBox");

    if (box.classList.contains("open")) return;

    box.classList.add("open");

    document.getElementById("giftTapPrompt").style.display = "none";

    confetti();
    confettiSmall();

    setTimeout(() => {
        document.getElementById("giftResult").classList.add("show");
    }, 850);
}


// PARTICLE BURST

function createBurst(balloon) {

    const rect = balloon.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ["✨", "💖", "⭐", "💕", "🎉", "💫", "🎁"];

    for (let i = 0; i < 25; i++) {

        const particle = document.createElement("div");

        particle.className = "pop-particle";

        particle.innerHTML =
            particles[Math.floor(Math.random() * particles.length)];

        particle.style.left = centerX + "px";
        particle.style.top = centerY + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150;

        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}


// CAKE

function blowCandles() {

    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.add("off");
    });

    document.getElementById("wishMessage")
        .textContent = "Your wishes are on their way! ✨💖";

    document.getElementById("blowBtn").style.display = "none";

    document.getElementById("finalBtn").style.display = "inline-block";

    confetti();
}


// CONFETTI

function confetti() {

    for (let i = 0; i < 100; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = randomColor();

        piece.style.animationDuration = (2 + Math.random() * 3) + "s";

        piece.style.width = (5 + Math.random() * 10) + "px";
        piece.style.height = (5 + Math.random() * 10) + "px";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5000);
    }
}


// SMALL CONFETTI

function confettiSmall() {

    for (let i = 0; i < 40; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = randomColor();

        piece.style.animationDuration = (1 + Math.random() * 2) + "s";

        piece.style.width = (4 + Math.random() * 8) + "px";
        piece.style.height = (4 + Math.random() * 8) + "px";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 3000);
    }
}


// RANDOM COLORS

function randomColor() {

    const colors = [
        "#ff4f9a",
        "#ffd166",
        "#a78bfa",
        "#7dd3fc",
        "#ff6b6b",
        "#ffffff",
        "#c084fc"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}


// STARS

function createStars() {

    const stars = document.getElementById("stars");

    for (let i = 0; i < 100; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay = Math.random() * 3 + "s";

        stars.appendChild(star);
    }
}


// HEARTS

function startHearts() {

    if (heartsStarted) return;

    heartsStarted = true;

    const container = document.getElementById("finalHearts");

    setInterval(() => {

        const heart = document.createElement("span");

        heart.innerHTML = ["❤️", "💖", "💕", "💗", "💓"][
            Math.floor(Math.random() * 5)
        ];

        heart.style.left = Math.random() * 100 + "%";

        heart.className = "floating-heart";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);

    }, 300);
}


// RESTART

function restart() {

    poppedCount = 0;
    giftRevealedCount = 0;

    document.querySelectorAll(".pop-balloon").forEach(balloon => {
        balloon.classList.remove("popped", "shaking", "locked");
    });

    document.getElementById("balloonMessage").innerHTML = "";

    document.getElementById("giftReveal").style.display = "none";
    document.getElementById("interactiveGiftBox").classList.remove("open");
    document.getElementById("giftResult").classList.remove("show");
    document.getElementById("giftTapPrompt").style.display = "block";

    document.getElementById("balloonNext").style.display = "none";

    document.getElementById("balloonCounter").innerHTML = "🎈 0 / 2 popped";

    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.remove("off");
    });

    document.getElementById("wishMessage").textContent =
        "Make a wish and blow the candles! ✨";

    document.getElementById("blowBtn").style.display = "inline-block";
    document.getElementById("finalBtn").style.display = "none";

    nextScreen(1);
}


// INITIALIZE

createStars();
