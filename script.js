// ========== BEYONCÉ VALENTINE'S - QUEEN BEY JAVASCRIPT ==========

// ===== AUDIO SYSTEM (Web Audio API) =====
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playClickSound() {
    playSound(800, 0.1, 'sine');
    setTimeout(() => playSound(1200, 0.05, 'sine'), 50);
}

function playCelebrationSound() {
    // Ascending notes celebration
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00];
    notes.forEach((note, i) => {
        setTimeout(() => playSound(note, 0.3, 'triangle'), i * 100);
    });
}

function playCrazyInLoveSound() {
    // EPIC sound for Crazy in Love button
    const epicNotes = [
        {freq: 523.25, dur: 0.2},
        {freq: 659.25, dur: 0.2},
        {freq: 783.99, dur: 0.3},
        {freq: 1046.50, dur: 0.4},
        {freq: 1318.51, dur: 0.5}
    ];
    epicNotes.forEach((note, i) => {
        setTimeout(() => playSound(note.freq, note.dur, 'sawtooth'), i * 150);
    });
}

// ===== FLOATING ELEMENTS (Crowns & Hearts) =====
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const elements = ['👑', '💕', '💖', '✨', '🐝'];

    setInterval(() => {
        const elem = document.createElement('div');
        elem.className = 'float-element';
        elem.textContent = elements[Math.floor(Math.random() * elements.length)];
        elem.style.left = Math.random() * 100 + '%';
        elem.style.top = Math.random() * 100 + '%';
        elem.style.animationDelay = Math.random() * 2 + 's';
        elem.style.animationDuration = (Math.random() * 4 + 6) + 's';

        container.appendChild(elem);

        setTimeout(() => elem.remove(), 12000);
    }, 3000);
}

// ===== IMAGE LOADING =====
function initImageLoading() {
    document.querySelectorAll('.photo-img').forEach(img => {
        img.addEventListener('load', function() {
            console.log('Image loaded:', this.src);
            this.classList.add('loaded');
            const placeholder = this.closest('.gold-frame').querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });

        img.addEventListener('error', function() {
            console.log('Image error:', this.src);
            this.style.display = 'none';
        });

        // Check if image is already loaded (from cache)
        if (img.complete && img.naturalWidth > 0) {
            console.log('Image already loaded:', img.src);
            img.classList.add('loaded');
            const placeholder = img.closest('.gold-frame').querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        } else {
            console.log('Image waiting to load:', img.src);
        }
    });
}

// ===== BUTTON HANDLERS =====
let clickCount = 0;

function initButtons() {
    document.querySelectorAll('.bey-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const response = this.getAttribute('data-response');
            const song = this.getAttribute('data-song');

            playClickSound();

            if (response === 'crazy') {
                // SPECIAL CRAZY IN LOVE CELEBRATION
                handleCrazyInLove(song);
            } else {
                handleResponse(response, song);
            }
        });
    });
}

// ===== RESPONSE HANDLING =====
function handleResponse(response, song) {
    const questionSection = document.querySelector('.question-section');
    const responseSection = document.getElementById('responseSection');
    const responseTitle = document.getElementById('responseTitle');
    const responseLyric = document.getElementById('responseLyric');
    const responseIcon = document.getElementById('responseIcon');

    questionSection.style.opacity = '0';
    questionSection.style.transform = 'scale(0.9)';

    setTimeout(() => {
        questionSection.style.display = 'none';

        let title, lyric, icon;

        if (response === 'xo') {
            title = "XO! 💕";
            lyric = '"In the darkest night hour, I\'ll search through the crowd. Your face is all that I see"';
            icon = '💕✨💕';
        } else if (response === 'halo') {
            title = "You're My HALO! ✨";
            lyric = '"Baby, I can feel your halo. You know you\'re my saving grace"';
            icon = '✨👑✨';
        }

        responseTitle.textContent = title;
        responseLyric.textContent = lyric;
        responseIcon.textContent = icon;

        responseSection.classList.add('show');

        playCelebrationSound();
        createGoldConfetti(50);
        createFloatingCrowns(15);

    }, 500);
}

// ===== CRAZY IN LOVE MEGA CELEBRATION =====
function handleCrazyInLove(song) {
    const questionSection = document.querySelector('.question-section');
    const responseSection = document.getElementById('responseSection');
    const responseTitle = document.getElementById('responseTitle');
    const responseLyric = document.getElementById('responseLyric');
    const responseIcon = document.getElementById('responseIcon');
    const formationFlash = document.getElementById('formationFlash');

    // SCREEN SHAKE
    document.body.style.animation = 'screenShake 0.5s ease-in-out';

    // FORMATION FLASH
    formationFlash.classList.add('active');
    setTimeout(() => formationFlash.classList.remove('active'), 500);

    // PLAY EPIC SOUND
    playCrazyInLoveSound();

    questionSection.style.opacity = '0';
    questionSection.style.transform = 'scale(0.9)';

    setTimeout(() => {
        questionSection.style.display = 'none';

        responseTitle.textContent = "CRAZY IN LOVE! 👑💕👑";
        responseLyric.textContent = '"Got me looking so crazy right now, your love\'s got me looking so crazy right now!"';
        responseIcon.textContent = '👑💕🎤✨💖';

        responseSection.classList.add('show');

        // MASSIVE CELEBRATION
        createGoldConfetti(200);
        createFloatingCrowns(50);
        createFloatingHearts(30);
        createSparkleExplosion();

        // Continue celebration
        setTimeout(() => {
            createGoldConfetti(100);
            playCelebrationSound();
        }, 2000);

        setTimeout(() => {
            createGoldConfetti(100);
            createFloatingCrowns(30);
        }, 4000);

    }, 600);
}

// Add screen shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-5px, 2px) rotate(-1deg); }
        20% { transform: translate(5px, -2px) rotate(1deg); }
        30% { transform: translate(-5px, 2px) rotate(-1deg); }
        40% { transform: translate(5px, -2px) rotate(1deg); }
        50% { transform: translate(-5px, 2px) rotate(-1deg); }
        60% { transform: translate(5px, -2px) rotate(1deg); }
        70% { transform: translate(-5px, 2px) rotate(-1deg); }
        80% { transform: translate(5px, -2px) rotate(1deg); }
        90% { transform: translate(-5px, 2px) rotate(-1deg); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== GOLD CONFETTI =====
function createGoldConfetti(count) {
    const container = document.getElementById('confetti-container');
    const colors = ['#FFD700', '#DAA520', '#FFA500', '#FF1493', '#B76E79', '#FFB6C1'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 15 + 5) + 'px';
            confetti.style.height = (Math.random() * 15 + 5) + 'px';
            confetti.style.opacity = '1';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s ease-out forwards`;

            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ===== FLOATING CROWNS =====
function createFloatingCrowns(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const crown = document.createElement('div');
            crown.textContent = '👑';
            crown.style.position = 'fixed';
            crown.style.fontSize = (Math.random() * 40 + 30) + 'px';
            crown.style.left = Math.random() * 100 + '%';
            crown.style.bottom = '-100px';
            crown.style.zIndex = '9999';
            crown.style.pointerEvents = 'none';
            crown.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))';
            crown.style.transition = 'all 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            document.body.appendChild(crown);

            setTimeout(() => {
                crown.style.bottom = '120vh';
                crown.style.transform = `
                    translateX(${Math.random() * 200 - 100}px)
                    rotate(${Math.random() * 720}deg)
                    scale(${Math.random() * 0.5 + 0.8})
                `;
                crown.style.opacity = '1';
            }, 50);

            setTimeout(() => crown.remove(), 4500);
        }, i * 80);
    }
}

// ===== FLOATING HEARTS =====
function createFloatingHearts(count) {
    const hearts = ['💕', '💖', '💝', '💗', '💓', '❤️'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 35 + 25) + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-100px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.filter = 'drop-shadow(0 0 12px rgba(255, 20, 147, 0.6))';
            heart.style.transition = 'all 4s ease-out';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.bottom = '120vh';
                heart.style.transform = `
                    translateX(${Math.random() * 150 - 75}px)
                    rotate(${Math.random() * 360}deg)
                `;
                heart.style.opacity = '1';
            }, 50);

            setTimeout(() => heart.remove(), 4500);
        }, i * 100);
    }
}

// ===== SPARKLE EXPLOSION =====
function createSparkleExplosion() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = '2rem';
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.zIndex = '9999';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.transition = 'all 1.5s ease-out';
            sparkle.style.opacity = '1';

            document.body.appendChild(sparkle);

            const angle = (Math.PI * 2 * i) / 30;
            const distance = Math.random() * 300 + 200;

            setTimeout(() => {
                sparkle.style.transform = `
                    translate(
                        ${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance}px
                    )
                    rotate(${Math.random() * 720}deg)
                `;
                sparkle.style.opacity = '0';
            }, 50);

            setTimeout(() => sparkle.remove(), 2000);
        }, i * 30);
    }
}

// ===== CROWN CLICK EASTER EGG =====
function initCrownEasterEgg() {
    const crown = document.querySelector('.crown-top');

    crown.addEventListener('click', function() {
        clickCount++;
        playSound(1000 + (clickCount * 100), 0.1, 'square');

        if (clickCount === 5) {
            showEasterEggMessage("🐝 BEYHIVE ACTIVATED! 🐝");
            createFloatingCrowns(20);
            playCelebrationSound();
            clickCount = 0;
        }
    });
}

// ===== KONAMI CODE: FORMATION MODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateFormationMode();
        konamiCode = [];
    }
});

function activateFormationMode() {
    const formationFlash = document.getElementById('formationFlash');

    showEasterEggMessage("👑 FORMATION! 👑<br>OKAY LADIES NOW LET'S GET IN FORMATION!");

    // Flash effect
    formationFlash.classList.add('active');
    setTimeout(() => formationFlash.classList.remove('active'), 500);

    // Massive celebration
    playCrazyInLoveSound();

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createGoldConfetti(50);
            createFloatingCrowns(15);
            playSound(523.25 + (i * 100), 0.3, 'sawtooth');
        }, i * 500);
    }
}

// ===== EASTER EGG MESSAGE DISPLAY =====
function showEasterEggMessage(message) {
    const eggMessage = document.getElementById('easterEggMessage');
    eggMessage.innerHTML = message;
    eggMessage.classList.add('show');

    setTimeout(() => {
        eggMessage.classList.remove('show');
    }, 3000);
}

// ===== PHOTO CARD INTERACTIONS =====
function initPhotoCardEffects() {
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', function() {
            playClickSound();
            const album = this.getAttribute('data-album');

            let message = '';
            if (album === 'dangerously') {
                message = '🎵 "Dangerously in Love" 🎵';
            } else if (album === 'halo') {
                message = '✨ "Remember those walls I built? Well, baby, they\'re tumbling down!" ✨';
            } else if (album === 'renaissance') {
                message = '🌟 "RENAISSANCE" 🌟<br>A New Era of Love!';
            }

            if (message) {
                showEasterEggMessage(message);
            }
        });
    });
}

// ===== HIDDEN LYRICS EASTER EGG =====
let secretClicks = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('beyhive-text')) {
        secretClicks++;
        if (secretClicks === 3) {
            showEasterEggMessage('🐝 "Who run the world? GIRLS!" 🐝');
            createFloatingCrowns(10);
            playCelebrationSound();
            secretClicks = 0;
        }
    }
});

// ===== MICROPHONE EASTER EGG =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('microphone-icon')) {
        playSound(800, 0.3, 'sine');
        showEasterEggMessage('🎤 "Check on it!" 🎤');
        e.target.style.animation = 'none';
        setTimeout(() => {
            e.target.style.animation = 'micSwing 2s ease-in-out infinite';
        }, 100);
    }
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    initImageLoading();
    initButtons();
    initCrownEasterEgg();
    initPhotoCardEffects();

    // Welcome message
    setTimeout(() => {
        playSound(659.25, 0.5, 'triangle');
    }, 1000);

    console.log('👑 BEYONCÉ VALENTINE\'S LOADED 👑');
    console.log('🐝 MOBILE EASTER EGGS:');
    console.log('- TAP the crown 5 times → Beyhive!');
    console.log('- TAP "Welcome to the Beyhive" 3 times → Formation!');
    console.log('- TAP the microphone → Surprise!');
    console.log('- TAP any photo → Lyrics!');
    console.log('- TAP "CRAZY IN LOVE" → ULTIMATE CELEBRATION!');
    console.log('💕 Enjoy the Queen Bey experience!');
});
