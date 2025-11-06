// ===== CẤU HÌNH ẢNH - Chỉ cần thêm tên file vào đây =====
const photos = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg'
];
// ========================================================

let currentPhotoIndex = 0;
let currentThumbScroll = 0;
let photoAutoSlideInterval;
let musicInitialized = false;

// Initialize particles
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Generate thumbnails dynamically
function generateThumbnails() {
    const container = document.getElementById('thumbsContainer');
    container.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb' + (index === 0 ? ' active' : '');
        thumb.onclick = () => changePhoto(index);
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Photo ${index + 1}`;
        
        thumb.appendChild(img);
        container.appendChild(thumb);
    });
    
    updateThumbNav();
}

// Update thumbnail navigation visibility
function updateThumbNav() {
    const prevBtn = document.getElementById('thumbPrev');
    const nextBtn = document.getElementById('thumbNext');
    
    if (photos.length <= 5) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// Scroll thumbnails
function scrollThumbs(direction) {
    const container = document.getElementById('thumbsContainer');
    const thumbWidth = 80 + 12; // width + gap
    const maxScroll = Math.max(0, (photos.length - 5) * thumbWidth);
    
    currentThumbScroll += direction * thumbWidth;
    currentThumbScroll = Math.max(0, Math.min(currentThumbScroll, maxScroll));
    
    container.style.transform = `translateX(-${currentThumbScroll}px)`;
}

// Auto slide photos
function startPhotoAutoSlide() {
    photoAutoSlideInterval = setInterval(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        changePhoto(currentPhotoIndex);
    }, 4000); // Change every 4 seconds
}

function stopPhotoAutoSlide() {
    clearInterval(photoAutoSlideInterval);
}

// Change main photo
function changePhoto(index) {
    const mainPhoto = document.getElementById('mainPhoto');
    const thumbs = document.querySelectorAll('.thumb');
    
    currentPhotoIndex = index;
    
    // Update main photo with fade effect
    mainPhoto.style.opacity = '0';
    setTimeout(() => {
        mainPhoto.src = photos[index];
        mainPhoto.style.opacity = '1';
    }, 300);
    
    // Update active thumbnail
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[index].classList.add('active');
    
    // Restart auto slide timer
    stopPhotoAutoSlide();
    startPhotoAutoSlide();
    
    // Auto scroll thumbnails if needed
    if (photos.length > 5) {
        const container = document.getElementById('thumbsContainer');
        const thumbWidth = 80 + 12;
        
        // Calculate position to show current thumbnail
        if (index >= 5) {
            currentThumbScroll = (index - 4) * thumbWidth;
        } else {
            currentThumbScroll = 0;
        }
        
        const maxScroll = Math.max(0, (photos.length - 5) * thumbWidth);
        currentThumbScroll = Math.min(currentThumbScroll, maxScroll);
        
        container.style.transform = `translateX(-${currentThumbScroll}px)`;
    }
}

// Slideshow functionality (background)
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlideIndex = n;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function currentSlide(n) {
    showSlide(n);
}

// Auto slideshow for background
setInterval(nextSlide, 5000);

// Celebrate function
let isBlowing = false;

function celebrate() {
    if (isBlowing) return;
    isBlowing = true;
    
    const button = document.querySelector('.button span');
    const originalText = button.textContent;
    button.textContent = '🥳 Chúc mừng sinh nhật! 🥳';
    
    // Blow out candles
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add('blown');
        }, index * 200);
    });
    
    // Confetti explosion
    setTimeout(() => {
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 20);
        }
    }, 800);

    // Hearts
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
    }, 1000);

    // Reset everything
    setTimeout(() => {
        button.textContent = originalText;
        candles.forEach(candle => {
            candle.classList.remove('blown');
        });
        isBlowing = false;
    }, 6000);
}

// Create confetti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti confetti-fall';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    
    const colors = [
        '#ff6b6b', '#4ecdc4', '#f7b731', 
        '#a29bfe', '#fd79a8', '#00b894',
        '#ff7675', '#74b9ff', '#ffeaa7'
    ];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, 5000);
}

// Create heart
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const hearts = ['❤️', '💖', '💕', '💗', '💝', '💓'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = (Math.random() * 80 + 10) + '%';
    heart.style.bottom = '0';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 3000);
}

// Initialize background music
function initBackgroundMusic() {
    if (musicInitialized) return;
    musicInitialized = true;

    const bgMusic = document.getElementById('bgMusic');
    const playButton = document.getElementById('playMusic');
    
    if (!bgMusic || !playButton) return;

    // Thiết lập âm lượng
    bgMusic.volume = 0.5;
    
    // Hàm phát nhạc
    const playMusic = () => {
        bgMusic.play().then(() => {
            playButton.textContent = '🔊';
        }).catch(() => {
            playButton.textContent = '🔇';
        });
    };

    // Hàm dừng nhạc
    const pauseMusic = () => {
        bgMusic.pause();
        playButton.textContent = '🔇';
    };

    // Xử lý lỗi file nhạc
    bgMusic.addEventListener('error', () => {
        playButton.textContent = '❌';
        playButton.style.backgroundColor = '#ff6b6b';
    });

    // Xử lý click nút phát nhạc
    playButton.addEventListener('click', () => {
        if (bgMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    // Tự động phát nhạc
    const attemptAutoPlay = () => {
        playMusic();
        document.removeEventListener('click', attemptAutoPlay);
    };

    // Thử phát nhạc khi trang web tải xong
    if (bgMusic.readyState >= 2) {
        playMusic();
    } else {
        bgMusic.addEventListener('canplaythrough', playMusic);
    }

    // Thêm xử lý click cho toàn trang
    document.addEventListener('click', attemptAutoPlay);
}

// Initialize on load
window.addEventListener('load', () => {
    initBackgroundMusic();
    initParticles();
    generateThumbnails();
    startPhotoAutoSlide();
    
    // Set first photo
    document.getElementById('mainPhoto').src = photos[0];
    
    // Setup thumbnail navigation
    const prevBtn = document.getElementById('thumbPrev');
    const nextBtn = document.getElementById('thumbNext');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => scrollThumbs(-1));
        nextBtn.addEventListener('click', () => scrollThumbs(1));
        updateThumbNav();
    }
    
    // Initial confetti
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createConfetti(), i * 50);
        }
    }, 1500);
    
    // Add transitions
    const mainPhoto = document.getElementById('mainPhoto');
    const thumbsContainer = document.getElementById('thumbsContainer');
    
    if (mainPhoto) {
        mainPhoto.style.transition = 'opacity 0.3s ease';
    }
    
    if (thumbsContainer) {
        thumbsContainer.style.transition = 'transform 0.3s ease';
    }
});

// Sparkle effects on mouse move
let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        if (Math.random() > 0.8) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = 'gold';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleAnim 1s ease-out';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1000);
        }
    }, 50);
});

// Sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cleanup on unload
window.addEventListener('beforeunload', () => {
    stopPhotoAutoSlide();
    document.querySelectorAll('.confetti, .heart').forEach(el => el.remove());
});