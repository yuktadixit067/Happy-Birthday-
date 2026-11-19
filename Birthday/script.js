let poppedCount = 0;
let giftBalloons = [];
let giftRevealedCount = 0;
let heartsStarted = false;

const balloonMessages = [
    "Oops! No gift here... but sending you lots of love! 💖",
    "Surprise! Just happiness and a little confetti! 🎉",
    "You found a balloon full of good vibes! ✨",
    "No gift, but you deserve a million smiles! 😊",
    "This balloon was filled with hugs! 🤗",
    "Better luck next balloon! 🎈"
];

function selectGiftBalloons() {
    let numbers = [0, 1, 2, 3, 4, 5];

    for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    giftBalloons = numbers.slice(0, 2);
}

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

function openBalloonScreen() {
    poppedCount = 0;
    giftRevealedCount = 0;

    selectGiftBalloons();

    document.querySelectorAll(".pop-balloon").forEach(balloon => {
        balloon.classList.remove("popped", "shaking");
        balloon.style.pointerEvents = "auto";
    });

    document.getElementById("balloonMessage").innerHTML = "";

    document.getElementById("giftReveal").style.display = "none";
    document.getElementById("interactiveGiftBox").classList.remove("open");
    document.getElementById("giftResult").classList.remove("show");
    document.getElementById("giftTapPrompt").style.display = "block";

    document.getElementById("balloonNext").style.display = "none";

    document.getElementById("balloonCounter").innerHTML = "🎈 0 / 2 popped";

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("balloonScreen").classList.add("active");
}

function popBalloon(balloon, index) {

    // LIMIT: ONLY 2 BALLOONS
    if (poppedCount >= 2) return;

    if (balloon.classList.contains("popped")) return;

    balloon.classList.add("shaking");

    setTimeout(() => {

        if (poppedCount >= 2) return;

        balloon.classList.remove("shaking");
        balloon.classList.add("popped");

        poppedCount++;

        createBurst(balloon);

        document.getElementById("balloonCounter")
            .innerHTML = `🎈 ${poppedCount} / 2 popped`;

        const message = document.getElementById("balloonMessage");
        const giftReveal = document.getElementById("giftReveal");

        message.classList.remove("message-reveal");
        giftReveal.classList.remove("show");
        giftReveal.style.display = "none";

        void message.offsetWidth;

        if (giftBalloons.includes(index)) {

            giftRevealedCount++;

            message.innerHTML = "✨✨ A SPECIAL SURPRISE! ✨✨";
            message.classList.add("message-reveal");

            const giftBox = document.querySelector("#interactiveGiftBox");

            giftBox.classList.remove("open");

            document.getElementById("giftResult").classList.remove("show");
            document.getElementById("giftTapPrompt").style.display = "block";

            document.getElementById("giftSparkles").innerHTML = `
                <span>✨</span>
                <span>⭐</span>
                <span>💖</span>
                <span>✨</span>
                <span>💫</span>
            `;

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

        // WHEN 2 BALLOONS ARE POPPED
        if (poppedCount === 2) {

            // LOCK REMAINING BALLOONS
            document.querySelectorAll(".pop-balloon").forEach(b => {
                if (!b.classList.contains("popped")) {
                    b.style.pointerEvents = "none";
                }
            });

            setTimeout(() => {

                message.innerHTML = "🎊 That's it! Your surprises await! 🎊";

                message.classList.remove("message-reveal");
                void message.offsetWidth;
                message.classList.add("message-reveal");

                // SHOW NEXT BUTTON IMMEDIATELY AFTER 2 POPS
                document.getElementById("balloonNext")
                    .style.display = "inline-block";

                confetti();

            }, 800);
        }

    }, 400);
}

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

function confettiSmall() {

    for (let i = 0; i < 30; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = randomColor();

        piece.style.animationDuration = (1 + Math.random() * 2) + "s";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 3000);
    }
}

function randomColor() {

    const colors = [
        "#ff9dcf",
        "#b79aff",
        "#ffd780",
        "#ffffff",
        "#ff80a5",
        "#a9e7ff"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

function startHearts() {

    if (heartsStarted) return;

    heartsStarted = true;

    setInterval(() => {

        const heart = document.createElement("div");

        heart.classList.add("floating-heart");

        heart.innerHTML = ["💖", "💕", "💗", "❤️", "✨"][
            Math.floor(Math.random() * 5)
        ];

        heart.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);

    }, 500);
}

function createStars() {

    const starsContainer = document.getElementById("stars");

    for (let i = 0; i < 70; i++) {

        const star = document.createElement("span");

        star.classList.add("star");
        star.innerHTML = "✦";

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        star.style.fontSize = (5 + Math.random() * 12) + "px";

        star.style.animationDelay = Math.random() * 3 + "s";

        starsContainer.appendChild(star);
    }
}

function restart() {

    poppedCount = 0;
    giftRevealedCount = 0;
    heartsStarted = false;

    document.querySelectorAll(".pop-balloon").forEach(balloon => {
        balloon.classList.remove("popped", "shaking");
        balloon.style.pointerEvents = "auto";
    });

    document.getElementById("balloonMessage").innerHTML = "";

    document.getElementById("giftReveal").style.display = "none";
    document.getElementById("interactiveGiftBox").classList.remove("open");
    document.getElementById("giftResult").classList.remove("show");
    document.getElementById("giftTapPrompt").style.display = "block";

    document.getElementById("balloonNext").style.display = "none";

    document.getElementById("balloonCounter").innerHTML = "🎈 0 / 2 popped";

    document.getElementById("blowBtn").style.display = "inline-block";

    document.getElementById("finalBtn").style.display = "none";

    document.getElementById("wishMessage").innerHTML = "";

    document.querySelectorAll(".flame").forEach(flame => {
        flame.classList.remove("off");
    });

    nextScreen(1);
}

createStars();
nextScreen(1);