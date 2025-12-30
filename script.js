document.addEventListener("DOMContentLoaded", () => {
  // 1. Currency Logic
  const exchangeRates = {
      USD: 1,
      TWD: 30,
      EUR: 0.92
  };
  
  let currentCurrency = localStorage.getItem('currency') || 'USD';
  
  const formatPrice = (priceVal, currency) => {
      const rate = exchangeRates[currency];
      const converted = priceVal * rate;
      
      switch(currency) {
          case 'TWD':
              return `NT$ ${Math.round(converted)}`;
          case 'EUR':
              return `€${converted.toFixed(2)}`;
          default: // USD
              return `$${converted.toFixed(2)}`;
      }
  };

  const updatePriceDisplay = () => {
      // Update HTML Header
      document.querySelector('.current-currency').innerText = currentCurrency;

      // Update static elements with data-base-price
      document.querySelectorAll('.product-price').forEach(el => {
          const basePrice = parseFloat(el.getAttribute('data-base-price'));
          if (!isNaN(basePrice)) {
              el.innerText = formatPrice(basePrice, currentCurrency);
          }
      });
      
      // If modal is open, update it
      const modal = document.getElementById("product-modal");
      if (modal && modal.style.display === "block") {
          // We can't easily update modal without base price, 
          // but next time it opens it will be correct. 
          // For best UX, we could store base price on modal too, 
          // but for now re-opening or just letting it be is okay 
          // or we can hack it:
           const modalPrice = document.getElementById("modal-price");
           const base = modalPrice.getAttribute('data-base-price');
           if (base) {
               modalPrice.innerText = formatPrice(parseFloat(base), currentCurrency);
           }
      }
  };

  // Currency Dropdown Event Listener
  document.querySelectorAll('.currency-dropdown li').forEach(item => {
      item.addEventListener('click', () => {
          currentCurrency = item.innerText;
          localStorage.setItem('currency', currentCurrency);
          updatePriceDisplay();
      });
  });

  // Initial Update
  updatePriceDisplay();


  // Initial Update
  updatePriceDisplay();

  // 1.5 Language Logic
  const translations = {
      en: {
          nav_home: "Home",
          nav_sale: "Sale",
          nav_products: "Products",
          nav_cart: "CART",
          cat_jazz: "Jazz",
          cat_country: "Country",
          cat_rock: "Rock",
          cat_hiphop: "Hip Hop",
          cat_classical: "Classical",
          cat_blues: "Blues",
          btn_explore: "Explore",
          section_sale: "Sale Items",
          section_all: "All Products",
          section_desc: "Curated collection of vintage treasures.",
          btn_browse_more: "Browse More Products",
          back_categories: "Back to Categories",
          card_jazz: "Jazz",
          card_country: "Country",
          card_rock: "Rock",
          card_hiphop: "Hip Hop",
          card_classical: "Classical",
          card_blues: "Blues"
      },
      zh: {
          nav_home: "首頁",
          nav_sale: "特價",
          nav_products: "商品",
          nav_cart: "購物車",
          cat_jazz: "爵士 (Jazz)",
          cat_country: "鄉村 (Country)",
          cat_rock: "搖滾 (Rock)",
          cat_hiphop: "嘻哈 (Hip Hop)",
          cat_classical: "古典 (Classical)",
          cat_blues: "藍調 (Blues)",
          btn_explore: "探索商品",
          section_sale: "特價商品",
          section_all: "所有商品",
          section_desc: "精選的復古珍寶系列。",
          btn_browse_more: "瀏覽更多商品",
          footer_explore: "探索",
          footer_connect: "連結",
          modal_add_cart: "加入購物車",
          back_categories: "返回分類",
          card_jazz: "爵士",
          card_country: "鄉村",
          card_rock: "搖滾",
          card_hiphop: "嘻哈",
          card_classical: "古典",
          card_blues: "藍調"
      }
  };

  let currentLang = localStorage.getItem('lang') || 'zh';

  const updateLanguage = (lang) => {
      currentLang = lang;
      localStorage.setItem('lang', lang);
      
      const t = translations[lang];
      if (!t) return;

      document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (t[key]) {
              el.innerText = t[key];
          }
      });
  };

  // Language Dropdown Event Listener
  document.querySelectorAll('.language-dropdown li').forEach(item => {
      item.addEventListener('click', () => {
          const lang = item.getAttribute('data-lang');
          updateLanguage(lang);
      });
  });

  // Initial Language Update
  updateLanguage(currentLang);


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
        title: "Aja",
        artist: "Steely Dan",
        price: "$29.99",
        img: "https://vinyl.com/cdn/shop/files/9036860129585_85quality_4239980-3045661.webp?v=1734325939&width=5760",
      },
      {
        title: "Cowboy Bebop (Original Series Soundtrack) [2LP]",
        artist: "Seatbelts",
        price: "$31.99",
        img: "https://vinyl.com/cdn/shop/files/8258512159025_85quality_Seatbelts_-_Cowboy_Bebop_Original_Series_Soundtrack.webp?v=1734326229&width=5760",
      },
      {
        title: "Kind Of Blue [Blue Marble]",
        artist: "Miles Davis",
        price: "$41.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8449562181937_85quality_Miles_Davis_Kind_Of_Blue_Blue_Marbled_Vinyl.webp?v=1734325891",
      },
      {
        title: "Now Playing (Compilation)",
        artist: "Roberta Flack",
        price: "$19.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/9782071984433_85quality_Roberta_Flack_-_Now_Playing_Compilation.webp?v=1734326213",
      },
      {
        title: "Come Fly with Me",
        artist: "Frank Sinatra",
        price: "$27.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448786989361_85quality_2583017.webp?v=1734326052",
      },
      {
        title: "Getz/Gilberto",
        artist: "Stan Getz & João Gilberto",
        price: "$29.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335054143793_85quality_2800545.webp?v=1734326024",
      },
      {
        title: "Whipped Cream & Other Delights (50th Anniversary Edition)",
        artist: "Herb Alpert",
        price: "$19.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335050899761_85quality_Herb_Alpert_-_Whipped_Cream_Other_Delights_50th_Anniversary_Edition.webp?v=1734327284",
      },
      {
        title: "Astral Weeks (180-gram)",
        artist: "Van Morrison",
        price: "$22.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335046869297_85quality_Van_Morrison_-_Astral_Weeks.webp?v=1734326361",
      },
    ],
    Country: [
      {
        title: "Moondance [180-gram]",
        artist: "Van Morrison",
        price: "$24.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258499445041_85quality_Van_Morrison_-_Moondance.webp?v=1734325749",
      },
      {
        title: "Speak Now (Taylor's Version) [3LP Orchid Marble]",
        artist: "Taylor Swift",
        price: "$47.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8845992919345_85quality_taylor-swift-speak-now-taylors-version-orchid-marbled-vinyl-sealed-uk-3-lp-vinyl-album-record.webp?v=1734325768",
      },
      {
        title: "Red (Taylor's Version) [4LP]",
        artist: "Taylor Swift",
        price: "$49.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258509504817_85quality_4020845-2758936.webp?v=1734325738",
      },
      {
        title: "Golden Hour",
        artist: "Kacey Musgraves",
        price: "$27.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8334924054833_85quality_kacey_musgraves_vinyl_golden_hour_LP_1.webp?v=1734325887",
      },
      {
        title: "Greatest!",
        artist: "Johnny Cash",
        price: "$19.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448577110321_85quality_Johnny_Cash_-_Greatest.webp?v=1734326039",
      },
      {
        title: "The Windstar Greatest Hits",
        artist: "John Denver",
        price: "$15.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335048868145_85quality_3741332.webp?v=1734327311",
      },
    ],
    Rock: [
        {
            title: "Riot! (FBR's 25th Anniversary Edition) [Silver]",
            artist: "Paramore",
            price: "$21.99",
            img: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp?v=1734325769&width=5760"
        },
        {
            title: "Nevermind",
            artist: "Nirvana",
            price: "$29.99",
            img: "https://vinyl.com/cdn/shop/files/8258513305905_85quality_Nirvana_Nevermind_Vinyl_LP.webp?v=1734325766&width=5760"
        },
        {
            title: "The Dark Side Of The Moon (50th Anniversary Edition)",
            artist: "Pink Floyd",
            price: "$31.99",
            img: "https://vinyl.com/cdn/shop/files/9089832321329_85quality_DARK-SIDE-50_1024x1024_9bcc2782-a4d8-46b4-961e-8f28edab9858.webp?v=1734325789&width=5760"
        },
        {
            title: "AM [180-gram]",
            artist: "Arctic Monkeys",
            price: "$22.99",
            img: "https://vinyl.com/cdn/shop/files/8258500198705_85quality_arctic-monkeys-am-lp_1024x1024_b88bbb6b-9eec-460b-80bb-a00687dfa348.webp?v=1734325742&width=5760"
        },
        {
            title: "Jar Of Flies",
            artist: "Alice In Chains",
            price: "$21.99",
            img: "https://vinyl.com/cdn/shop/files/9405456810289_85quality_4296473-3098885.webp?v=1734325758&width=5760"
        },
        {
            title: "Moondance [180-gram]",
            artist: "Van Morrison",
            price: "$24.99",
            img: "https://vinyl.com/cdn/shop/files/8258499445041_85quality_Van_Morrison_-_Moondance.webp?v=1734325749&width=5760"
        },
        {
            title: "Around The Fur [180-gram]",
            artist: "Deftones",
            price: "$21.99",
            img: "https://vinyl.com/cdn/shop/files/8258509144369_85quality_Deftones_vinyl_around_the_fur_LP.webp?v=1734325750&width=5760"
        },
        {
            title: "Hotel California [180-gram]",
            artist: "Eagles",
            price: "$24.99",
            img: "https://vinyl.com/cdn/shop/files/8258506817841_85quality_Eagles_-_Hotel_California.webp?v=1734325795&width=5760"
        }
    ],
    "Hip Hop": [
      {
        title: "CTRL",
        artist: "SZA",
        price: "$24.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp?v=1734325779",
      },
      {
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        price: "$29.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258502394161_85quality_Kendrick_Lamar_-_good_kid_m_A_A_d_city_2LP.webp?v=1734325785",
      },
      {
        title: "IGOR",
        artist: "Tyler, The Creator",
        price: "$27.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp?v=1734325769",
      },
      {
        title: "Swimming",
        artist: "Mac Miller",
        price: "$27.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448090997041_85quality_Mac_Miller_-_Swimming_2LP.webp?v=1734325758",
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
        title: "Cowboy Bebop (Original Series Soundtrack) [2LP]",
        artist: "Seatbelts",
        price: "$31.99",
        img: "https://vinyl.com/cdn/shop/files/8258512159025_85quality_Seatbelts_-_Cowboy_Bebop_Original_Series_Soundtrack.webp?v=1734326229&width=5760",
      },
      {
        title: "The Music Never Stopped: The Roots of the Grateful Dead",
        artist: "Various Artists",
        price: "$24.99",
        img: "https://vinyl.com/cdn/shop/files/9405447405873_85quality_4284265-3084959.webp?v=1734326317&width=5760",
      },
      {
        title: "Electric Ladyland [2LP]",
        artist: "Jimi Hendrix",
        price: "$29.99",
        img: "https://vinyl.com/cdn/shop/files/8258511634737_85quality_Jimi_Hendrix_-_Electric_Ladyland_2LP.webp?v=1734326029&width=5760",
      },
      {
        title: "Sound & Color [2LP Black, Pink & Magenta]",
        artist: "Alabama Shakes",
        price: "$33.99",
        img: "https://vinyl.com/cdn/shop/files/8335081865521_85quality_Alabama_Shakes_-_Sound_Color_Black_Pink_Magenta_2LP.webp?v=1734326083&width=5760",
      },
      {
        title: "Astral Weeks (180-gram)",
        artist: "Van Morrison",
        price: "$22.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335046869297_85quality_Van_Morrison_-_Astral_Weeks.webp?v=1734326361",
      },
      {
        title: "Bridge Of Sighs",
        artist: "Robin Trower",
        price: "$13.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8334903050545_85quality_3840251-2585813.webp?v=1734328057",
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
                    <span class="product-price sale-price" data-base-price="${parseFloat(product.price.replace('$',''))}">${formatPrice(parseFloat(product.price.replace('$','')), currentCurrency)}</span>
                </div>
            `;

      // Allow modal opening for these dynamic cards
      article.addEventListener("click", (e) => {
        e.preventDefault();
        openProductModal(product.img, product.title, category, parseFloat(product.price.replace('$','')));
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

  const openProductModal = (img, title, category, basePrice) => {
    if (!modal) return;
    modalImg.src = img;
    modalTitle.innerText = title;
    modalCategory.innerText = category;
    
    // Store base price for currency switching while open
    modalPrice.setAttribute('data-base-price', basePrice);
    modalPrice.innerText = formatPrice(basePrice, currentCurrency);
    
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
      // Prefer sale price, fallback to any product price
      const priceEl = card.querySelector(".sale-price") || card.querySelector(".product-price");

      if (imgEl && titleEl && catEl && priceEl) {
        const basePrice = parseFloat(priceEl.getAttribute('data-base-price'));
        if (!isNaN(basePrice)) {
            openProductModal(
              imgEl.src,
              titleEl.innerText,
              catEl.innerText,
              basePrice
            );
        }
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
