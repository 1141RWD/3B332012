document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Header Scroll Effect
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Carousel Logic
    const track = document.querySelector('.product-track');
    const prevBtn = document.querySelector('.scroll-arrow.prev');
    const nextBtn = document.querySelector('.scroll-arrow.next');

    if (track && prevBtn && nextBtn) {
        // Dynamic Width Calculation for responsiveness
        const getScrollWidth = () => {
            const card = track.querySelector('.product-card');
            if (!card) return 330;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 0;
            return card.offsetWidth + gap;
        };

        let itemWidth = getScrollWidth();

        // Update on resize
        window.addEventListener('resize', () => {
            itemWidth = getScrollWidth();
        });

        // Helper to smooth scroll
        const smoothScroll = (amount) => {
            track.scrollBy({ left: amount, behavior: 'smooth' });
        };

        // Infinite Loop Logic (Seamless)
        // We have 3 sets. Start at Set 2.
        // Total items = total children.
        // itemsPerSet = total / 3.
        const totalItems = track.children.length;
        const itemsPerSet = totalItems / 3;
        const setWidth = itemsPerSet * itemWidth;

        // Initialize scroll position to middle set
        track.scrollLeft = setWidth;

        // Check bounds on scroll
        track.addEventListener('scroll', () => {
            // If scrolled to end of Set 2 (into Set 3), jump back to Set 2 start
            // Set 1: 0 -> setWidth
            // Set 2: setWidth -> 2*setWidth
            if (track.scrollLeft >= 2 * setWidth) {
                track.scrollLeft = setWidth;
            }
            // If scrolled to start of Set 1, jump to start of Set 2
            else if (track.scrollLeft <= 0) {
                track.scrollLeft = setWidth;
            }
        });


        nextBtn.addEventListener('click', () => {
            smoothScroll(itemWidth);
        });

        prevBtn.addEventListener('click', () => {
            smoothScroll(-itemWidth);
        });

        // Auto Scroll (3 seconds)
        let autoScrollTimer;

        const startAutoScroll = () => {
            stopAutoScroll(); // Clear existing to be safe
            autoScrollTimer = setInterval(() => {
                smoothScroll(itemWidth);
            }, 3000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollTimer);
        };

        // Start initially
        startAutoScroll();

        // Pause on interaction (hover over the whole container)
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoScroll);
            container.addEventListener('mouseleave', startAutoScroll);
            // Also pause on touch for mobile?
            container.addEventListener('touchstart', stopAutoScroll, { passive: true });
            container.addEventListener('touchend', startAutoScroll);
        }
    }

    // 4. Modal Logic
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.querySelector('.close-modal');

    // Open Modal
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            // Extract data
            const imgEl = card.querySelector('img');
            const titleEl = card.querySelector('.product-title');
            const catEl = card.querySelector('.product-category');
            const priceEl = card.querySelector('.product-price');

            if (imgEl && titleEl && catEl && priceEl) {
                modalImg.src = imgEl.src;
                modalTitle.innerText = titleEl.innerText;
                modalCategory.innerText = catEl.innerText;
                modalPrice.innerText = priceEl.innerText;

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    // Close Modal Function
    const hideModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Escape key to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

    // 5. About Slide Show (Simple Fade)
    const slides = document.querySelectorAll('.about-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    // 6. Navigation Dropdown (Click Support)
    const dropdown = document.querySelector('.nav-item-dropdown');
    if (dropdown) {
        const toggle = dropdown.querySelector('a');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                // If it's the main link, prevent default and toggle
                if (window.innerWidth <= 1024 || e.type === 'click') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});
