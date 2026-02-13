// ============================================================
// BEYONCE VALENTINE'S - INTERACTIVE ENGINE
// Canvas particles, Spotify player, themes, sound FX, easter eggs
// ============================================================

(function () {
    'use strict';

    // ---------- AUDIO SYSTEM ----------
    let audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTone(freq, duration, type, volume) {
        try {
            const ctx = getAudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = type || 'sine';
            gain.gain.setValueAtTime(volume || 0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            // Audio not available
        }
    }

    function sfxClick() {
        playTone(880, 0.06, 'sine', 0.1);
        setTimeout(function () { playTone(1320, 0.04, 'sine', 0.08); }, 40);
    }

    function sfxCelebration() {
        var notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach(function (n, i) {
            setTimeout(function () { playTone(n, 0.25, 'triangle', 0.12); }, i * 90);
        });
    }

    function sfxEpic() {
        var chords = [
            { f: 261.63, d: 0.15 }, { f: 329.63, d: 0.15 },
            { f: 392.00, d: 0.2 }, { f: 523.25, d: 0.25 },
            { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.35 },
            { f: 1046.50, d: 0.4 }
        ];
        chords.forEach(function (c, i) {
            setTimeout(function () { playTone(c.f, c.d, 'sawtooth', 0.08); }, i * 120);
        });
    }

    function sfxThemeSwitch() {
        playTone(660, 0.1, 'sine', 0.08);
        setTimeout(function () { playTone(880, 0.1, 'sine', 0.08); }, 80);
        setTimeout(function () { playTone(1100, 0.15, 'triangle', 0.06); }, 160);
    }

    // ---------- SPOTIFY MUSIC PLAYER ----------
    var spotifyTracks = [
        '5KojFwnZ1EcftHOwCSe71S', // Crazy in Love (feat. JAY-Z) - Single Version
        '4JehYebiI9JE8sR8MisGVb', // Halo
        '40xhyfAPDoMtv494MfPevP', // XO
        '1z6WtY7X4HQJvzxC4UgkSf', // Love on Top
        '0KFuXEdOp5QfIfxHR6TJSm'  // Dangerously in Love 2
    ];

    var currentTrack = 0;
    var playerOpen = false;

    function initMusicPlayer() {
        var toggle = document.getElementById('playerToggle');
        var drawer = document.getElementById('playerDrawer');
        var close = document.getElementById('playerClose');
        var tracks = document.querySelectorAll('.track');

        toggle.addEventListener('click', function () {
            playerOpen = !playerOpen;
            drawer.classList.toggle('open', playerOpen);
            sfxClick();
        });

        close.addEventListener('click', function () {
            playerOpen = false;
            drawer.classList.remove('open');
        });

        tracks.forEach(function (track) {
            track.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-track'));
                selectTrack(idx);
                sfxClick();
            });
        });
    }

    function selectTrack(idx) {
        currentTrack = idx;
        var iframe = document.getElementById('spotifyPlayer');
        iframe.src = 'https://open.spotify.com/embed/track/' + spotifyTracks[idx] + '?utm_source=generator&theme=0&autoplay=1';

        document.querySelectorAll('.track').forEach(function (t, i) {
            t.classList.toggle('active', i === idx);
        });

        // Spin vinyl when track selected
        var vinyl = document.getElementById('vinylRecord');
        vinyl.classList.add('spinning');
    }

    // ---------- THEME SYSTEM ----------
    function initThemes() {
        var toggle = document.getElementById('themeToggle');
        var menu = document.getElementById('themeMenu');
        var options = document.querySelectorAll('.theme-option');

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            menu.classList.toggle('open');
            sfxClick();
        });

        options.forEach(function (opt) {
            opt.addEventListener('click', function () {
                var theme = this.getAttribute('data-theme');
                document.body.setAttribute('data-theme', theme);

                options.forEach(function (o) { o.classList.remove('active'); });
                this.classList.add('active');

                menu.classList.remove('open');
                sfxThemeSwitch();

                // Reinit particles with new colors
                initParticles();
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function () {
            menu.classList.remove('open');
        });
    }

    // ---------- CANVAS PARTICLE SYSTEM ----------
    var canvas, ctx, particles, animId;
    var PARTICLE_COUNT = 60;

    function getThemeColors() {
        var style = getComputedStyle(document.body);
        return {
            a: style.getPropertyValue('--particle-a').trim() || 'rgba(255,215,0,0.6)',
            b: style.getPropertyValue('--particle-b').trim() || 'rgba(255,20,147,0.4)'
        };
    }

    function initParticles() {
        canvas = document.getElementById('particleCanvas');
        ctx = canvas.getContext('2d');
        resizeCanvas();

        var colors = getThemeColors();
        particles = [];
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle(colors));
        }

        if (animId) cancelAnimationFrame(animId);
        animateParticles();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(colors) {
        var useA = Math.random() > 0.5;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            color: useA ? colors.a : colors.b,
            alpha: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.005
        };
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += p.pulseSpeed;

            // Wrap edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            var currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/, currentAlpha + ')');
            ctx.fill();
        });

        animId = requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    // ---------- SCROLL REVEAL (Intersection Observer) ----------
    function initScrollReveal() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.gallery-item').forEach(function (item) {
            observer.observe(item);
        });
    }

    // ---------- IMAGE LOADING ----------
    function initImages() {
        document.querySelectorAll('.gallery-img').forEach(function (img) {
            function onLoaded() {
                img.classList.add('loaded');
                var placeholder = img.closest('.item-frame').querySelector('.img-placeholder');
                if (placeholder) placeholder.classList.add('hidden');
            }

            img.addEventListener('load', onLoaded);
            img.addEventListener('error', function () {
                img.style.display = 'none';
            });

            if (img.complete && img.naturalWidth > 0) {
                onLoaded();
            }
        });
    }

    // ---------- CONFETTI ----------
    function spawnConfetti(count) {
        var container = document.getElementById('confetti-container');
        var themeColors = getComputedStyle(document.body);
        var primary = themeColors.getPropertyValue('--primary').trim();
        var secondary = themeColors.getPropertyValue('--secondary').trim();
        var accent = themeColors.getPropertyValue('--accent').trim();
        var colors = [primary, secondary, accent, '#FFB6C1', '#FFD700', '#FF69B4'];

        for (var i = 0; i < count; i++) {
            (function (index) {
                setTimeout(function () {
                    var piece = document.createElement('div');
                    piece.className = 'confetti-piece';
                    var w = Math.random() * 10 + 4;
                    var h = Math.random() * 12 + 4;
                    piece.style.left = Math.random() * 100 + '%';
                    piece.style.width = w + 'px';
                    piece.style.height = h + 'px';
                    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                    piece.style.opacity = '1';

                    if (Math.random() > 0.5) piece.style.borderRadius = '50%';

                    var duration = Math.random() * 1.5 + 1.5;
                    var drift = (Math.random() - 0.5) * 200;
                    var rotation = Math.random() * 720;
                    piece.style.transition = 'all ' + duration + 's cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                    container.appendChild(piece);

                    requestAnimationFrame(function () {
                        piece.style.transform = 'translateY(' + window.innerHeight + 'px) translateX(' + drift + 'px) rotate(' + rotation + 'deg)';
                        piece.style.opacity = '0';
                    });

                    setTimeout(function () { piece.remove(); }, (duration + 0.5) * 1000);
                }, index * 15);
            })(i);
        }
    }

    // ---------- FLOATING EMOJIS ----------
    function floatEmojis(emojis, count) {
        for (var i = 0; i < count; i++) {
            (function (index) {
                setTimeout(function () {
                    var el = document.createElement('div');
                    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    el.style.cssText = 'position:fixed;font-size:' + (Math.random() * 30 + 20) + 'px;left:' + (Math.random() * 100) + '%;bottom:-60px;z-index:9999;pointer-events:none;transition:all 3.5s cubic-bezier(0.25,0.46,0.45,0.94);filter:drop-shadow(0 0 8px rgba(255,215,0,0.5));';
                    document.body.appendChild(el);

                    requestAnimationFrame(function () {
                        el.style.bottom = '110vh';
                        el.style.transform = 'translateX(' + (Math.random() * 150 - 75) + 'px) rotate(' + (Math.random() * 360) + 'deg)';
                    });

                    setTimeout(function () { el.remove(); }, 4000);
                }, index * 60);
            })(i);
        }
    }

    // ---------- SPARKLE BURST ----------
    function sparkleBurst() {
        var sparkles = ['\u2728', '\u2B50', '\uD83D\uDCAB', '\uD83C\uDF1F'];
        for (var i = 0; i < 24; i++) {
            (function (index) {
                setTimeout(function () {
                    var s = document.createElement('div');
                    s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                    s.style.cssText = 'position:fixed;font-size:1.5rem;left:50%;top:50%;z-index:9999;pointer-events:none;transition:all 1.2s ease-out;opacity:1;';
                    document.body.appendChild(s);

                    var angle = (Math.PI * 2 * index) / 24;
                    var dist = Math.random() * 200 + 150;

                    requestAnimationFrame(function () {
                        s.style.transform = 'translate(' + (Math.cos(angle) * dist) + 'px,' + (Math.sin(angle) * dist) + 'px) rotate(' + (Math.random() * 360) + 'deg)';
                        s.style.opacity = '0';
                    });

                    setTimeout(function () { s.remove(); }, 1500);
                }, index * 25);
            })(i);
        }
    }

    // ---------- FLASH EFFECT ----------
    function flash() {
        var overlay = document.getElementById('flashOverlay');
        overlay.classList.add('active');
        setTimeout(function () { overlay.classList.remove('active'); }, 600);
    }

    // ---------- EASTER EGG OVERLAY ----------
    function showEgg(text) {
        var overlay = document.getElementById('eggOverlay');
        var content = document.getElementById('eggContent');
        content.innerHTML = text;
        overlay.classList.add('show');

        setTimeout(function () {
            overlay.classList.remove('show');
        }, 2800);

        // Allow closing by tap
        overlay.addEventListener('click', function handler() {
            overlay.classList.remove('show');
            overlay.removeEventListener('click', handler);
        });
    }

    // ---------- RESPONSE BUTTONS ----------
    function initButtons() {
        document.querySelectorAll('.btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var response = this.getAttribute('data-response');
                sfxClick();

                if (response === 'crazy') {
                    handleCrazy();
                } else {
                    handleResponse(response);
                }
            });
        });
    }

    function handleResponse(type) {
        var proposal = document.getElementById('proposal');
        var celebration = document.getElementById('celebration');
        var title = document.getElementById('celebrationTitle');
        var lyric = document.getElementById('celebrationLyric');
        var icon = document.getElementById('celebrationIcon');

        proposal.style.opacity = '0';
        proposal.style.transform = 'scale(0.95)';
        proposal.style.transition = 'all 0.5s ease';

        setTimeout(function () {
            proposal.style.display = 'none';

            if (type === 'xo') {
                title.textContent = 'XO';
                lyric.textContent = '"In the darkest night hour, I\'ll search through the crowd. Your face is all that I see."';
                icon.textContent = '\uD83D\uDC95\u2728\uD83D\uDC95';
                selectTrack(2); // XO
            } else if (type === 'halo') {
                title.textContent = 'You\'re My Halo';
                lyric.textContent = '"Baby, I can feel your halo. You know you\'re my saving grace."';
                icon.textContent = '\u2728\uD83D\uDC51\u2728';
                selectTrack(1); // Halo
            }

            celebration.classList.add('show');
            celebration.scrollIntoView({ behavior: 'smooth', block: 'center' });

            sfxCelebration();
            spawnConfetti(80);
            floatEmojis(['\uD83D\uDC51', '\uD83D\uDC95', '\u2728', '\uD83D\uDC96'], 20);

            // Open music player
            var drawer = document.getElementById('playerDrawer');
            drawer.classList.add('open');
            playerOpen = true;
        }, 500);
    }

    function handleCrazy() {
        var proposal = document.getElementById('proposal');
        var celebration = document.getElementById('celebration');
        var title = document.getElementById('celebrationTitle');
        var lyric = document.getElementById('celebrationLyric');
        var icon = document.getElementById('celebrationIcon');

        // Screen shake
        document.body.style.animation = 'screenShake 0.5s ease-in-out';
        setTimeout(function () { document.body.style.animation = ''; }, 500);

        flash();
        sfxEpic();

        proposal.style.opacity = '0';
        proposal.style.transform = 'scale(0.95)';
        proposal.style.transition = 'all 0.5s ease';

        setTimeout(function () {
            proposal.style.display = 'none';

            title.textContent = 'CRAZY IN LOVE';
            lyric.textContent = '"Got me looking so crazy right now, your love\'s got me looking so crazy right now!"';
            icon.textContent = '\uD83D\uDC51\uD83D\uDC95\uD83C\uDFA4\u2728\uD83D\uDC96';

            celebration.classList.add('show');
            celebration.scrollIntoView({ behavior: 'smooth', block: 'center' });

            selectTrack(0); // Crazy in Love

            // MEGA celebration
            spawnConfetti(150);
            floatEmojis(['\uD83D\uDC51', '\uD83D\uDC95', '\u2728', '\uD83D\uDC96', '\uD83D\uDC9B'], 40);
            sparkleBurst();

            // Wave 2
            setTimeout(function () {
                spawnConfetti(80);
                sfxCelebration();
            }, 2000);

            // Wave 3
            setTimeout(function () {
                spawnConfetti(60);
                floatEmojis(['\uD83D\uDC51', '\u2764\uFE0F', '\uD83D\uDC8D'], 20);
            }, 3500);

            // Open player
            var drawer = document.getElementById('playerDrawer');
            drawer.classList.add('open');
            playerOpen = true;
        }, 600);
    }

    // ---------- EASTER EGGS ----------
    var crownClicks = 0;
    var beyhiveClicks = 0;

    function initEasterEggs() {
        // Crown tap
        var crown = document.getElementById('crownIcon');
        crown.addEventListener('click', function () {
            crownClicks++;
            playTone(800 + crownClicks * 100, 0.08, 'square', 0.06);

            if (crownClicks >= 5) {
                showEgg('BEYHIVE ACTIVATED');
                floatEmojis(['\uD83D\uDC1D', '\uD83D\uDC51', '\uD83C\uDF6F'], 15);
                sfxCelebration();
                crownClicks = 0;
            }
        });

        // Beyhive label
        var label = document.getElementById('beyhiveLabel');
        label.addEventListener('click', function () {
            beyhiveClicks++;
            if (beyhiveClicks >= 3) {
                showEgg('"Who run the world? GIRLS!"');
                floatEmojis(['\uD83D\uDC51', '\uD83D\uDCAA', '\u2728'], 10);
                sfxCelebration();
                beyhiveClicks = 0;
            }
        });

        // Vinyl tap
        var vinyl = document.getElementById('vinylRecord');
        vinyl.addEventListener('click', function () {
            vinyl.classList.toggle('spinning');
            playTone(440, 0.2, 'sine', 0.1);
            showEgg('"Check on it!"');
        });

        // Photo cards
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                sfxClick();
                var album = this.getAttribute('data-album');
                if (album === 'dangerously') {
                    showEgg('"Dangerously in Love"');
                } else if (album === 'halo') {
                    showEgg('"Remember those walls I built? Baby, they\'re tumbling down!"');
                } else if (album === 'renaissance') {
                    showEgg('"RENAISSANCE"\nA New Era of Love');
                }
            });
        });

        // Konami code
        var konamiBuffer = [];
        var konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        document.addEventListener('keydown', function (e) {
            konamiBuffer.push(e.key);
            konamiBuffer = konamiBuffer.slice(-10);
            if (konamiBuffer.join(',') === konamiSeq.join(',')) {
                showEgg('FORMATION\nOKAY LADIES NOW LET\'S GET IN FORMATION!');
                flash();
                sfxEpic();
                for (var w = 0; w < 5; w++) {
                    (function (wave) {
                        setTimeout(function () {
                            spawnConfetti(40);
                            floatEmojis(['\uD83D\uDC51', '\uD83D\uDC1D', '\u2728'], 10);
                        }, wave * 500);
                    })(w);
                }
                konamiBuffer = [];
            }
        });
    }

    // ---------- INIT ----------
    document.addEventListener('DOMContentLoaded', function () {
        initParticles();
        initScrollReveal();
        initImages();
        initButtons();
        initMusicPlayer();
        initThemes();
        initEasterEggs();

        // Soft welcome tone
        setTimeout(function () {
            playTone(659.25, 0.4, 'triangle', 0.06);
        }, 1500);
    });

})();
