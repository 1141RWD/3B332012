document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 2. Header Scroll Effect
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
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

  // 4. Product Category Logic

  // Product Data (Mocking data based on available images/themes)
  const productsData = {
    Jazz: [
      {
        title: "Portrait In Jazz",
        artist: "Bill Evans Trio",
        price: "$19.99",
        img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Blue Train",
        artist: "John Coltrane",
        price: "$24.99",
        img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Kind of Blue",
        artist: "Miles Davis",
        price: "$29.99",
        img: "https://images.unsplash.com/photo-1621360841013-c768371e93cf?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Time Out",
        artist: "The Dave Brubeck Quartet",
        price: "$22.99",
        img: "https://images.unsplash.com/photo-1503856241197-0bb0a7df064f?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    Country: [
      {
        title: "Golden Hour",
        artist: "Kacey Musgraves",
        price: "$24.99",
        img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Red Headed Stranger",
        artist: "Willie Nelson",
        price: "$19.99",
        img: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Traveller",
        artist: "Chris Stapleton",
        price: "$27.99",
        img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    Rock: [
      {
        title: "The Dark Side Of The Moon",
        artist: "Pink Floyd",
        price: "$35.99",
        img: "image/The Dark Side Of The Moon.webp",
      },
      {
        title: "Nevermind",
        artist: "Nirvana",
        price: "$32.99",
        img: "image/nervermind.webp",
      },
      {
        title: "Riot!",
        artist: "Paramore",
        price: "$24.99",
        img: "image/riot.jpg",
      },
      {
        title: "1984",
        artist: "Van Halen",
        price: "$27.99",
        img: "image/1984.webp",
      },
      {
        title: "Facelift",
        artist: "Alice in Chains",
        price: "$33.99",
        img: "image/Facelift.webp",
      },
    ],
    "Hip Hop": [
      { title: "CTRL", artist: "SZA", price: "$29.99", img: "image/Ctrl.webp" },
      {
        title: "To Pimp a Butterfly",
        artist: "Kendrick Lamar",
        price: "$34.99",
        img: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Illmatic",
        artist: "Nas",
        price: "$29.99",
        img: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    Classical: [
      {
        title: "The Four Seasons",
        artist: "Vivaldi",
        price: "$19.99",
        img: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Nocturnes",
        artist: "Chopin",
        price: "$18.99",
        img: "https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?q=80&w=1000&auto=format&fit=crop",
      },
    ],
    Blues: [
      {
        title: "King of the Delta Blues",
        artist: "Robert Johnson",
        price: "$21.99",
        img: "https://images.unsplash.com/photo-1453282716202-de94e528067c?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "At Last!",
        artist: "Etta James",
        price: "$23.99",
        img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  };

  const categoryCards = document.querySelectorAll(".category-card");
  const productsContainer = document.getElementById("category-products");

  const renderProducts = (category) => {
    // Clear existing
    productsContainer.innerHTML = "";
    productsContainer.classList.remove("visible");

    // Remove active class from all cards
    categoryCards.forEach((c) => c.classList.remove("active"));

    const products = productsData[category];
    if (!products) return;

    // Create Product Cards
    products.forEach((product, index) => {
      const article = document.createElement("article");
      article.className = "product-card";
      article.style.animationDelay = `${index * 100}ms`; // Staggered delay

      article.innerHTML = `
                <div class="product-image">
                    <img src="${product.img}" loading="lazy" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-category">${category}</p>
                    <span class="product-price sale-price">${product.price}</span>
                </div>
            `;

      // Allow modal opening for these dynamic cards
      article.addEventListener("click", (e) => {
        e.preventDefault();
        openProductModal(product.img, product.title, category, product.price);
      });

      productsContainer.appendChild(article);
    });

    // Show Container with animation
    // Slight delay to allow DOM update
    setTimeout(() => {
      productsContainer.classList.add("visible");

      // Scroll to products if on mobile or if needed
      const yOffset = -100; // Header offset
      const y =
        productsContainer.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      if (window.innerWidth < 992) {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

    const backBtn = document.getElementById('back-to-categories');

    // Back to Categories Logic
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Reset Grid
            const grid = document.querySelector('.category-grid');
            if (grid) grid.classList.remove('has-active');

            // Reset Cards
            categoryCards.forEach(c => c.classList.remove('active'));

            // Hide Products
            productsContainer.classList.remove('visible');
            setTimeout(() => {
                productsContainer.innerHTML = ''; // Clean up after fade out
            }, 600); // Match CSS transition

            // Hide Back Button
            backBtn.classList.remove('visible');

            // Scroll to top of grid
            if (grid) {
                const y = grid.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    }

    if (categoryCards && productsContainer) {
        categoryCards.forEach((card) => {
            card.addEventListener("click", () => {
                const category = card.getAttribute("data-category");

                // Check if already active
                if (card.classList.contains("active")) {
                    return;
                }

                // Add class to parent to trigger Focus Mode
                const grid = card.closest('.category-grid');
                if (grid) {
                    grid.classList.add('has-active');
                }

                // Show Back Button
                if (backBtn) backBtn.classList.add('visible');

                card.classList.add("active");
                renderProducts(category);
                
                // Scroll to top of the banner to frame it nicely
                // Slight delay to allow CSS reflow
                setTimeout(() => {
                    const y = card.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }, 100);
            });
        });
    }

  // 5. Modal Logic (Refactored to be reusable)
  const modal = document.getElementById("product-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalPrice = document.getElementById("modal-price");
  const closeModal = document.querySelector(".close-modal");

  const openProductModal = (img, title, category, price) => {
    if (!modal) return;
    modalImg.src = img;
    modalTitle.innerText = title;
    modalCategory.innerText = category;
    modalPrice.innerText = price;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  // Keep existing event listeners for static cards if any remain,
  // but we replaced them. Kept for safety if user adds static ones back.
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const imgEl = card.querySelector("img");
      const titleEl = card.querySelector(".product-title");
      const catEl = card.querySelector(".product-category");
      const priceEl = card.querySelector(".product-price");

      if (imgEl && titleEl && catEl && priceEl) {
        openProductModal(
          imgEl.src,
          titleEl.innerText,
          catEl.innerText,
          priceEl.innerText
        );
      }
    });
  });

  // Close Modal Function
  const hideModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  if (closeModal) {
    closeModal.addEventListener("click", hideModal);
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Escape key to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      hideModal();
    }
  });

  // Auto-select 'Rock' on load to show something initially?
  // Or leave empty. User asked to "Click to expand". So easier if empty initially.

  // 5. About Slide Show (Simple Fade)
  const slides = document.querySelectorAll(".about-slide");
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4000);
  }

  // 6. Navigation Dropdown (Click Support)
  const dropdown = document.querySelector(".nav-item-dropdown");
  if (dropdown) {
    const toggle = dropdown.querySelector("a");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        // If it's the main link, prevent default and toggle
        if (window.innerWidth <= 1024 || e.type === "click") {
          e.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    }
  }

  // Close dropdown when clicking outside
  window.addEventListener("click", (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // 7. Handle URL Query Parameters (Deep Linking)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam && typeof categoryCards !== 'undefined') {
      const targetCard = document.querySelector(`.category-card[data-category="${categoryParam}"]`);
      if (targetCard) {
          setTimeout(() => {
              targetCard.click();
          }, 300);
      }
  }
});
