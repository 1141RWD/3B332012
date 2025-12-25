document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // About Us Slideshow
    const slides = document.querySelectorAll('.about-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Change every 3 seconds
    }

    // Transparent to Solid Header on Scroll
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            header.style.padding = '0'; // Slightly compact
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    // Carousel Logic
    const track = document.querySelector('.product-track');
    const prevBtn = document.querySelector('.scroll-arrow.prev');
    const nextBtn = document.querySelector('.scroll-arrow.next');

    if (track && prevBtn && nextBtn) {
        const itemWidth = 340; // 300px card + 40px gap
        const totalItems = track.children.length;
        const singleSetCount = totalItems / 3; // We now have 3 sets
        const singleSetWidth = singleSetCount * itemWidth;
        const scrollAmount = itemWidth;

        // Start in the middle set (Set 2)
        // Set 1: 0 to W
        // Set 2: W to 2W
        // Set 3: 2W to 3W
        track.scrollLeft = singleSetWidth;

        // Helper to smooth scroll
        const smoothScroll = (amount) => {
            track.scrollBy({ left: amount, behavior: 'smooth' });
        };

        // Check for loop condition after scroll finishes
        const checkLoop = () => {
             // If we scroll past end of Set 2 (start of Set 3), jump back to start of Set 2
             if (track.scrollLeft >= 2 * singleSetWidth) {
                track.scrollLeft -= singleSetWidth;
            }
            // If we scroll past start of Set 2 (into Set 1), wait...
            // If we reach start of Set 1 (0), jump to start of Set 2
            else if (track.scrollLeft <= 0) {
                 track.scrollLeft = singleSetWidth;
            }
        };

        // We need to attach scroll listener to detect when to jump silently
        track.addEventListener('scroll', () => {
             // Forward Loop: If we reach start of Set 3 (2W), jump to start of Set 2 (W)
           if (track.scrollLeft >= 2 * singleSetWidth) {
               track.scrollLeft -= singleSetWidth;
           } 
           // Backward Loop: If we reach start of Set 1 (0), jump to start of Set 2 (W)
           else if (track.scrollLeft <= 0) {
               track.scrollLeft = singleSetWidth;
           }
        });

        nextBtn.addEventListener('click', () => {
            smoothScroll(scrollAmount);
        });

        prevBtn.addEventListener('click', () => {
            smoothScroll(-scrollAmount);
        });
    }

    // Modal Logic
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.querySelector('.close-modal');
    
    // Open Modal
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // prevent any default
            
            const img = card.querySelector('img').src;
            const title = card.querySelector('.product-title').innerText;
            const category = card.querySelector('.product-category').innerText;
            const price = card.querySelector('.product-price').innerText;

            modalImg.src = img;
            modalTitle.innerText = title;
            modalCategory.innerText = category;
            modalPrice.innerText = price;
            
            modal.style.display = 'block';
        });
    });

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
             modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
