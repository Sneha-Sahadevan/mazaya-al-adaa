document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Header Scroll Effect
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3D Carousel Auto-rotation & Navigation
    const carousel = document.querySelector('.principles-3d-carousel');
    if (carousel) {
        const cards = Array.from(carousel.querySelectorAll('.principle-card-3d'));
        const prevBtn = document.getElementById('principle-prev');
        const nextBtn = document.getElementById('principle-next');

        let currentIndex = 0; // Starts with Client Partnership (data-index="0")
        let autoPlayTimer = null;
        let inactivityTimeout = null;
        const AUTO_PLAY_DELAY = 2000; // 2 seconds display interval
        const RESUME_DELAY = 3000;    // 3 seconds inactivity before resuming

        // Sort cards by data-index to guarantee consistent order
        cards.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));

        const updateCarousel = () => {
            cards.forEach((card, i) => {
                card.classList.remove('card-front', 'card-left', 'card-right');
                
                if (i === currentIndex) {
                    card.classList.add('card-front');
                } else if (i === (currentIndex - 1 + cards.length) % cards.length) {
                    card.classList.add('card-left');
                } else {
                    card.classList.add('card-right');
                }
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        };

        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_DELAY);
        };

        const stopAutoPlay = () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        };

        const handleUserAction = (actionFn) => {
            stopAutoPlay();
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout);
            }
            actionFn();
            inactivityTimeout = setTimeout(() => {
                startAutoPlay();
            }, RESUME_DELAY);
        };

        // Prev & Next Buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleUserAction(nextSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleUserAction(prevSlide);
            });
        }

        // Allow clicking background cards directly to bring them to center
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== currentIndex) {
                    handleUserAction(() => {
                        currentIndex = index;
                        updateCarousel();
                    });
                }
            });
        });

        // Initialize positions and start auto-play
        updateCarousel();
        startAutoPlay();
    }
});
