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

    // ==================================================
    // MAC Machineries Featured Stage + Thumbnail Carousel
    // ==================================================
    const machinerySection = document.getElementById('mac-machineries');
    if (machinerySection) {
        const machinesData = [
            {
                num: "01",
                name: "CAT 246 C",
                category: "Skid Steer",
                img: "assets/CAT 246 C.png",
                desc: "High-performance multi-terrain skid steer loader for precision grading, trench backfilling, and utility site clearance.",
                specs: ["High-Flow Hydraulic System", "Compact Urban Maneuverability", "Multi-Attachment Versatility"]
            },
            {
                num: "02",
                name: "CAT CF 224E",
                category: "Compactor",
                img: "assets/CAT CF 224E.png",
                desc: "Heavy vibratory soil compactor ensuring optimum ground density and asphalt compaction on pipeline and cable routes.",
                specs: ["High Amplitude Vibration", "Dual Drum Compaction", "Optimal Surface Finishing"]
            },
            {
                num: "03",
                name: "D 155A_BULLDOZER",
                category: "Bulldozer",
                img: "assets/D 155A_Bulldozer.png",
                desc: "Heavy-duty crawler bulldozer designed for mass earthmoving, right-of-way corridor preparation, and rock leveling.",
                specs: ["Heavy Blade Capacity", "High Traction Tracks", "Extreme Terrain Capability"]
            },
            {
                num: "04",
                name: "DOOSAN 503 gold",
                category: "Excavator",
                img: "assets/DOOSAN 503 gold.png",
                desc: "Hydraulic crawler excavator for deep utility trenching, pipe-laying, and heavy foundation civil engineering works.",
                specs: ["Deep Reach Boom", "Advanced Hydraulic Controls", "Fuel-Efficient Engine"]
            },
            {
                num: "05",
                name: "HYUNDAI 210 LC",
                category: "Excavator",
                img: "assets/HYUNDAI 210 LC.png",
                desc: "High-efficiency hydraulic excavator engineered for rugged terrain excavation, telecom trench digging, and heavy lifting.",
                specs: ["Heavy Duty Bucket", "Reinforced Undercarriage", "Rapid Cycle Time"]
            },
            {
                num: "06",
                name: "KOMATSU PC 200",
                category: "Excavator",
                img: "assets/KOMATSU PC 200.png",
                desc: "Advanced hydraulic excavator featuring precision control for urban telecom trenching and infrastructure deployment.",
                specs: ["Precision Multi-Valve Hydraulics", "Low Emission Powerplant", "360-Degree Swing Precision"]
            },
            {
                num: "07",
                name: "KOMATSU D-85EX",
                category: "Crawler Dozer",
                img: "assets/KOMATSU D-85EX.png",
                desc: "Heavy crawler dozer for robust land clearing, earth levelling, and pipeline route ground preparation.",
                specs: ["Variable Pitch Blade", "Hydrostatic Steering System", "High Drawbar Pull"]
            },
            {
                num: "08",
                name: "VERMEER RT1250",
                category: "Trencher",
                img: "assets/VERMEER RT1250.png",
                desc: "High-power ride-on rock trencher engineered for high-speed continuous fiber optic micro-duct and cable installation.",
                specs: ["Heavy Rock Wheel & Chain", "Laser Depth Guidance", "High Trenching Speed"]
            },
            {
                num: "09",
                name: "HYUNDAI 210LC",
                category: "Excavator",
                img: "assets/HYUNDAI 210LC.png",
                desc: "High-output crawler excavator for mass civil excavation, rock breaking, and telecom route preparation.",
                specs: ["Heavy Rock Breaker Piping", "Extended Operating Envelope", "High Structural Durability"]
            },
            {
                num: "10",
                name: "JCB",
                category: "Backhoe Loader",
                img: "assets/JCB.png",
                desc: "Versatile utility backhoe loader for municipal trenching, rapid pipe-laying, site loading, and earth backfilling.",
                specs: ["Dual-End Multi-Tasking", "Fast Mobility Between Sites", "Precision Backhoe Reach"]
            },
            {
                num: "11",
                name: "P-185 Renegade",
                category: "Air Compressor",
                img: "assets/P-185 Renegade.png",
                desc: "High-output mobile rotary screw compressor delivering dependable pneumatic power for fiber cable blowing.",
                specs: ["185 CFM High Flow Delivery", "Continuous Heavy Duty Duty Cycle", "Portable Towable Chassis"]
            },
            {
                num: "12",
                name: "Trailer-Benz",
                category: "Heavy Transport",
                img: "assets/Trailer-Benz.png",
                desc: "Heavy-duty Mercedes-Benz transport prime mover for equipment logistics and nationwide machinery mobilization.",
                specs: ["Multi-Axle Heavy Hauling", "High Payload Capacity", "GPS Monitored Fleet"]
            },
            {
                num: "13",
                name: "Trailer-Renault",
                category: "Heavy Transport",
                img: "assets/Trailer-Renault.png",
                desc: "High-capacity commercial transport truck for heavy machinery hauling, cable drum delivery, and civil logistics.",
                specs: ["Low-Bed Heavy Machinery Deck", "Long-Haul Reliability", "Secure Tie-Down Anchors"]
            },
            {
                num: "14",
                name: "VERMEER P-185",
                category: "Utility Trencher",
                img: "assets/VERMEER P-185.png",
                desc: "Specialized utility trencher engineered for fast, clean micro-trenching and optical cable duct routing.",
                specs: ["Clean Trench Profile", "High Speed Micro-Duct Routing", "Minimal Surface Disruption"]
            },
            {
                num: "15",
                name: "VOGELE SUPER 1400",
                category: "Asphalt Paver",
                img: "assets/VOGELE SUPER 1400.png",
                desc: "Compact asphalt paver delivering high paving precision for road reinstatement and trench surface restoration.",
                specs: ["Electric Screed Heating", "High Reinstatement Precision", "Variable Paving Width"]
            },
            {
                num: "16",
                name: "VOGELE SUPER 1400.1",
                category: "Asphalt Paver",
                img: "assets/VOGELE SUPER 1400.1.png",
                desc: "High-performance tracked asphalt paver engineered for highway and urban telecom corridor reinstatement.",
                specs: ["Advanced ErgoPlus Controls", "High Compaction Screed", "Continuous Material Feed"]
            },
            {
                num: "17",
                name: "XTREME-ESCORTS",
                category: "Pick & Carry Crane",
                img: "assets/XTREME-ESCORTS.png",
                desc: "Hydraulic mobile pick and carry crane for agile on-site equipment lifting, duct handling, and machinery rigging.",
                specs: ["Articulated Chassis Maneuverability", "High Telescopic Boom Reach", "Safe Load Indicator (SLI)"]
            }
        ];

        const featuredCard = document.getElementById('featured-card');
        const imgWrap = featuredCard ? featuredCard.querySelector('.featured-img-wrap') : null;
        const infoPane = featuredCard ? featuredCard.querySelector('.featured-info-pane') : null;
        const mainImg = document.getElementById('featured-main-img');
        const indexBadge = document.getElementById('feat-index-badge');
        const categoryTag = document.getElementById('feat-category');
        const positionCounter = document.getElementById('feat-position-counter');
        const titleEl = document.getElementById('feat-name');
        const descEl = document.getElementById('feat-desc');
        const detailsContainer = document.getElementById('feat-details');
        const thumbIndicator = document.getElementById('thumb-current-indicator');

        const prevBtn = document.getElementById('featured-prev');
        const nextBtn = document.getElementById('featured-next');
        const thumbsTrack = document.getElementById('machinery-thumbs-track');
        const thumbCards = Array.from(document.querySelectorAll('.machinery-thumb-card'));
        const thumbScrollLeft = document.getElementById('thumb-scroll-left');
        const thumbScrollRight = document.getElementById('thumb-scroll-right');

        let currentIndex = 0;
        let autoPlayTimer = null;
        let isPaused = false;
        let resumeTimeout = null;
        const ROTATION_INTERVAL = 3800;

        const renderFeaturedMachine = (index) => {
            const data = machinesData[index];
            if (!data) return;

            // Trigger smooth fade transition
            if (imgWrap) imgWrap.classList.add('transitioning');
            if (infoPane) infoPane.classList.add('transitioning');

            setTimeout(() => {
                if (mainImg) {
                    mainImg.src = data.img;
                    mainImg.alt = data.name;
                }
                if (indexBadge) indexBadge.textContent = data.num;
                if (positionCounter) positionCounter.textContent = `${data.num} / ${machinesData.length}`;
                if (titleEl) titleEl.textContent = data.name;
                if (thumbIndicator) thumbIndicator.textContent = `${data.num} / ${machinesData.length}`;

                // Update active thumbnail
                thumbCards.forEach((thumb, i) => {
                    const isActive = (i === index);
                    thumb.classList.toggle('active', isActive);
                    if (isActive) {
                        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });

                if (imgWrap) imgWrap.classList.remove('transitioning');
                if (infoPane) infoPane.classList.remove('transitioning');
            }, 180);
        };

        const setMachine = (index) => {
            if (index < 0) index = machinesData.length - 1;
            if (index >= machinesData.length) index = 0;
            currentIndex = index;
            renderFeaturedMachine(currentIndex);
        };

        const nextMachine = () => setMachine(currentIndex + 1);
        const prevMachine = () => setMachine(currentIndex - 1);

        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => {
                if (!isPaused) {
                    nextMachine();
                }
            }, ROTATION_INTERVAL);
        };

        const stopAutoPlay = () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        };

        const pauseAndResume = (fn) => {
            isPaused = true;
            if (resumeTimeout) clearTimeout(resumeTimeout);
            if (typeof fn === 'function') fn();
            resumeTimeout = setTimeout(() => {
                isPaused = false;
            }, 4000);
        };

        // Navigation button events
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                pauseAndResume(prevMachine);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                pauseAndResume(nextMachine);
            });
        }

        // Thumbnail click events
        thumbCards.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                pauseAndResume(() => setMachine(idx));
            });
        });

        // Thumbnail scroll arrows
        if (thumbScrollLeft && thumbsTrack) {
            thumbScrollLeft.addEventListener('click', () => {
                pauseAndResume(() => {
                    thumbsTrack.scrollBy({ left: -320, behavior: 'smooth' });
                });
            });
        }

        if (thumbScrollRight && thumbsTrack) {
            thumbScrollRight.addEventListener('click', () => {
                pauseAndResume(() => {
                    thumbsTrack.scrollBy({ left: 320, behavior: 'smooth' });
                });
            });
        }

        // Hover pause on stage and carousel
        if (featuredCard) {
            featuredCard.addEventListener('mouseenter', () => {
                isPaused = true;
                if (resumeTimeout) clearTimeout(resumeTimeout);
            });
            featuredCard.addEventListener('mouseleave', () => {
                isPaused = false;
            });
        }

        if (thumbsTrack) {
            thumbsTrack.addEventListener('mouseenter', () => {
                isPaused = true;
                if (resumeTimeout) clearTimeout(resumeTimeout);
            });
            thumbsTrack.addEventListener('mouseleave', () => {
                isPaused = false;
            });

            // Touch swipe support for stage/carousel
            let touchStartX = 0;
            let touchEndX = 0;
            thumbsTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                isPaused = true;
            }, { passive: true });

            thumbsTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    pauseAndResume(nextMachine);
                } else if (touchEndX - touchStartX > 50) {
                    pauseAndResume(prevMachine);
                }
            }, { passive: true });
        }

        // Initialize state
        setMachine(0);
        startAutoPlay();
    }
});
