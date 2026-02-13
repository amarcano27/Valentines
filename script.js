// ===== PARTICLE SYSTEM =====
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particles = ['💕', '💖', '💝', '✨', '⭐', '💗'];

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 20000);
    }, 2000);
}

// ===== 3D TILT EFFECT FOR PHOTO CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== IMAGE LOADING =====
function initImageLoading() {
    document.querySelectorAll('.gallery-photo').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            const placeholder = this.parentElement.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });

        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.parentElement.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });

        // Check if image is already loaded (from cache)
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
            const placeholder = img.parentElement.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }
    });
}

// ===== BUTTON HANDLERS =====
function initButtons() {
    const buttons = document.querySelectorAll('.response-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const response = this.getAttribute('data-response');
            handleResponse(response);
        });

        // Enhanced hover effect
        button.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const sparkles = ['✨', '⭐', '💫'];
    const sparkle = document.createElement('span');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1.2rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    sparkle.style.zIndex = '1000';

    element.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// ===== RESPONSE HANDLING =====
function handleResponse(type) {
    const questionSection = document.querySelector('.question-section');
    const responseContainer = document.getElementById('responseContainer');
    const responseMessage = document.getElementById('responseMessage');

    // Fade out question section
    questionSection.style.opacity = '0';
    questionSection.style.transform = 'scale(0.9)';

    setTimeout(() => {
        questionSection.style.display = 'none';

        let message = '';
        switch(type) {
            case 'yes':
                message = "Yay! I'm so happy! 💕";
                break;
            case 'YES':
                message = "YES! This is amazing! 💖✨";
                break;
            case 'forever':
                message = "FOREVER! You've made my day! 💝💖💕";
                break;
        }

        responseMessage.textContent = message;
        responseContainer.classList.add('show');

        // Create celebration effects
        createConfetti();
        createFloatingHearts();

    }, 500);
}

// ===== CONFETTI SYSTEM =====
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];
    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            // Random shapes
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💝', '💗', '💓', '💘'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 40 + 30) + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-100px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.opacity = '0';
            heart.style.transition = 'all 5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heart.style.filter = 'drop-shadow(0 10px 20px rgba(255, 107, 157, 0.4))';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.bottom = '120vh';
                heart.style.opacity = '1';
                heart.style.transform = `
                    translateX(${Math.random() * 300 - 150}px)
                    rotate(${Math.random() * 720 - 360}deg)
                    scale(${Math.random() * 0.5 + 0.5})
                `;
            }, 100);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTiltEffect();
    initImageLoading();
    initButtons();
    initScrollAnimations();

    // Add keyboard support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'y' || e.key === 'Y') {
            const yesBtn = document.querySelector('[data-response="yes"]');
            if (yesBtn) yesBtn.click();
        }
    });
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        createMassiveHeartExplosion();
        konamiCode = [];
    }
});

function createMassiveHeartExplosion() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createFloatingHearts();
        }, i * 100);
    }
}
