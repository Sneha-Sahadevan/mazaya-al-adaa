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

    // 3D Carousel Auto-rotation
    const carousel = document.querySelector('.principles-3d-carousel');
    if (carousel) {
        const cards = Array.from(carousel.querySelectorAll('.principle-card-3d'));
        let currentIndex = 0; // Starts with Client Partnership (data-index="0")

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

        // Initialize positions
        updateCarousel();

        // Start auto-rotation (every 4 seconds: 3s display + 1s transition)
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }, 4000);
    }
});
