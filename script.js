function handleResponse(type) {
    const buttonsContainer = document.querySelector('.buttons-container');
    const responseMessage = document.getElementById('response-message');
    const responseText = document.getElementById('response-text');

    buttonsContainer.classList.add('fade-out');

    setTimeout(() => {
        buttonsContainer.style.display = 'none';

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

        responseText.textContent = message;
        responseMessage.classList.remove('hidden');

        createCelebration();
    }, 500);
}

function createCelebration() {
    const numberOfHearts = 20;

    for (let i = 0; i < numberOfHearts; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    heart.textContent = ['💕', '💖', '💝', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.opacity = '0';
    heart.style.transition = 'all 4s ease-out';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.bottom = '120vh';
        heart.style.opacity = '1';
        heart.style.transform = `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
    }, 10);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 0.5s ease-out';
        this.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 500);
    });
});

// Handle image loading for photo gallery
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
