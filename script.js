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

    switch (currency) {
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
      card_blues: "Blues",
      // FAQ
      faq_title: "Frequently Asked Questions",
      faq_shipping_title: "Shipping & Delivery",
      faq_q1: "Where do you ship?",
      faq_a1: "We ship worldwide. Shipping costs will apply, and will be added at checkout.",
      faq_q2: "How long will it take to get my order?",
      faq_a2: "It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email.",
      faq_orders_title: "Orders & Returns",
      faq_q3: "Can I return my product?",
      faq_a3: "We aim to make sure our customers love our products, but if you do need to return an order, we’re happy to help. Just email us within 14 days of receiving your order and we’ll take you through the process. Please note that vintage items must be returned in the same condition they were received.",
      faq_q4: "What payment methods do you accept?",
      faq_a4: "We accept all major credit cards (VISA, Mastercard, AMEX) and PayPal.",
      faq_info_title: "Product Info",
      faq_q5: "Are your vintage records authentic?",
      faq_a5: "Absolutely. Every record we sell is verified by our team of experts for authenticity and graded conservatively.",
      // Terms
      terms_title: "Terms of Service",
      terms_1_title: "1. Overview",
      terms_1_text: "This website is operated by Analog Soul. Throughout the site, the terms “we”, “us” and “our” refer to Analog Soul. Analog Soul offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
      terms_2_title: "2. General Conditions",
      terms_2_text: "We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.",
      terms_3_title: "3. Privacy Policy",
      terms_3_text: "Your submission of personal information through the store is governed by our Privacy Policy. We do not sell or share your personal data with third parties for marketing purposes.",
      terms_4_title: "4. Modifications to the Service and Prices",
      terms_4_text: "Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
      terms_5_title: "5. Contact Information",
      terms_5_text: "Questions about the Terms of Service should be sent to us at support@analogsoul.com.",
      // Auth
      auth_login: "Login / Sign Up",
      auth_register: "Sign Up",
      auth_name: "Full Name",
      auth_email: "Email",
      auth_password: "Password",
      auth_login_btn: "Login",
      auth_register_btn: "Create Account",
      auth_welcome: "Hi, ",
      auth_logout: "Logout",
      auth_failed: "Invalid email or password",
      auth_exists: "Account already exists",
      cart_login_prompt: "Please login or register to view your cart.",
      // New Cart UI
      cart_shipping_title: "Shipping Method",
      cart_payment_title: "Payment Method",
      cart_subtotal: "Subtotal",
      cart_shipping: "Shipping",
      cart_total: "Total",
      cart_checkout_btn: "Complete Order",
      cart_continue_btn: "Continue Shopping",
      ship_std: "Standard Shipping (5-7 Business Days)",
      ship_exp: "Express Shipping (1-3 Business Days)",
      pay_select: "Select Payment Method",
      pay_cc: "Credit Card (Visa, Mastercard, Amex)",
      pay_paypal: "PayPal",
      pay_crypto: "Crypto (USDT, BTC, ETH)",
      pay_error: "Please select a payment method.",
      free: "Free"
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
      card_blues: "藍調",
      // FAQ
      faq_title: "常見問題",
      faq_shipping_title: "運送與寄送",
      faq_q1: "你們運送至哪裡？",
      faq_a1: "我們提供全球運送。結帳時將會計算運費。",
      faq_q2: "收到訂單需要多久？",
      faq_a2: "這取決於您所在的地區。本地訂單約需 5-7 個工作天，海外運送約需 7-16 天。詳細資訊將包含在確認郵件中。",
      faq_orders_title: "訂單與退貨",
      faq_q3: "我可以退貨嗎？",
      faq_a3: "我們致力於確保客戶喜愛我們的產品。若您需要退貨，請在收到訂單後 14 天內透過電子郵件聯繫我們，我們將協助您處理。請注意，復古商品必須保持原狀退回。",
      faq_q4: "接受哪些付款方式？",
      faq_a4: "我們接受所有主要信用卡 (VISA, Mastercard, AMEX) 以及 PayPal。",
      faq_info_title: "商品資訊",
      faq_q5: "你們的唱片是正版嗎？",
      faq_a5: "絕對是。我們販售的每一張唱片都經過專家團隊驗證並嚴格分級。",
      // Terms
      terms_title: "服務條款",
      terms_1_title: "1. 總覽",
      terms_1_text: "本網站由 Analog Soul 營運。在整個網站中，「我們」和「我們的」均指 Analog Soul。Analog Soul 向您（使用者）提供本網站，包括本網站提供的所有資訊、工具和服務，前提是您接受此處所述的所有條款、條件、政策和聲明。",
      terms_2_title: "2. 一般條款",
      terms_2_text: "我們保留隨時以任何理由拒絕向任何人提供服務的權利。您了解您的內容（不包括信用卡資訊）可能會在未加密的情況下傳輸，並涉及 (a) 透過各種網路傳輸；以及 (b) 為了符合和適應連接網路或裝置的技術要求而進行的變更。",
      terms_3_title: "3. 隱私政策",
      terms_3_text: "您透過商店提交的個人資訊受我們的隱私政策管轄。我們不會將您的個人數據出售或分享給第三方用於行銷目的。",
      terms_4_title: "4. 服務與價格修改",
      terms_4_text: "我們產品的價格如有變更，恕不另行通知。我們保留隨時修改或終止服務（或其任何部分或內容）的權利，恕不另行通知。",
      terms_5_title: "5. 聯絡資訊",
      terms_5_text: "關於服務條款的問題應發送至 support@analogsoul.com。",
      // Auth
      auth_login: "登入 / 註冊",
      auth_register: "註冊",
      auth_name: "全名",
      auth_email: "電子郵件",
      auth_password: "密碼",
      auth_login_btn: "登入",
      auth_register_btn: "建立帳戶",
      auth_welcome: "嗨, ",
      auth_logout: "登出",
      auth_failed: "電子郵件或密碼錯誤",
      auth_exists: "帳戶已存在",
      cart_login_prompt: "請先登入或註冊帳號以檢視購物車。",
      cart_empty: "您的購物車是空的。",
      cart_checkout_success: "感謝您的購買！",
      // New Cart UI
      cart_shipping_title: "運送方式",
      cart_payment_title: "付款方式",
      cart_subtotal: "小計",
      cart_shipping: "運費",
      cart_total: "總計",
      cart_checkout_btn: "完成訂單",
      cart_continue_btn: "繼續購物",
      ship_std: "標準運送 (5-7 工作天)",
      ship_exp: "快速運送 (1-3 工作天)",
      pay_select: "選擇付款方式",
      pay_cc: "信用卡 (Visa, Mastercard, Amex)",
      pay_paypal: "PayPal",
      pay_crypto: "加密貨幣 (USDT, BTC, ETH)",
      pay_error: "請選擇付款方式。",
      free: "免費"
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
        img: "https://vinyl.com/cdn/shop/files/8258499445041_85quality_Van_Morrison_-_Moondance.webp?v=1734325749&width=5760",
      },
      {
        title: "Speak Now (Taylor's Version) [3LP Orchid Marble]",
        artist: "Taylor Swift",
        price: "$47.99",
        img: "https://vinyl.com/cdn/shop/files/8845992919345_85quality_taylor-swift-speak-now-taylors-version-orchid-marbled-vinyl-sealed-uk-3-lp-vinyl-album-record.webp?v=1734325768&width=5760",
      },
      {
        title: "Red (Taylor's Version) [4LP]",
        artist: "Taylor Swift",
        price: "$49.99",
        img: "https://vinyl.com/cdn/shop/files/8258509504817_85quality_4020845-2758936.webp?v=1734325738&width=5760",
      },
      {
        title: "Golden Hour",
        artist: "Kacey Musgraves",
        price: "$27.99",
        img: "https://vinyl.com/cdn/shop/files/8334924054833_85quality_kacey_musgraves_vinyl_golden_hour_LP_1.webp?v=1734325887&width=5760",
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
      {
        title: "Greatest Hits [2LP]",
        artist: "Willie Nelson",
        price: "$35.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/9158627131697_85quality_Willie_Nelson_-_Greatest_Hits.webp?v=1734326065",
      },
      {
        title: "Road Music [2LP]",
        artist: "Various Artists",
        price: "$12.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/3579399.jpg?v=1684182480",
      },
    ],
    Rock: [
      {
        title: "Riot! (FBR's 25th Anniversary Edition) [Silver]",
        artist: "Paramore",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp?v=1734325769&width=5760"
      },
      {
        title: "Nevermind",
        artist: "Nirvana",
        price: "$29.99",
        originalPrice: "$39.99",
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
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp?v=1734325779",
      },
      {
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258502394161_85quality_Kendrick_Lamar_-_good_kid_m_A_A_d_city_2LP.webp?v=1734325785",
      },
      {
        title: "IGOR",
        artist: "Tyler, The Creator",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp?v=1734325769",
      },
      {
        title: "Swimming",
        artist: "Mac Miller",
        price: "$29.99",
        originalPrice: "$39.99",
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

      let priceHtml = '';
      const basePrice = parseFloat(product.price.replace('$', ''));

      if (product.originalPrice) {
        const originalBase = parseFloat(product.originalPrice.replace('$', ''));
        priceHtml = `
              <span class="product-price original-price" data-base-price="${originalBase}">${formatPrice(originalBase, currentCurrency)}</span>
              <span class="product-price sale-price" data-base-price="${basePrice}">${formatPrice(basePrice, currentCurrency)}</span>
          `;
      } else {
        priceHtml = `<span class="product-price" data-base-price="${basePrice}">${formatPrice(basePrice, currentCurrency)}</span>`;
      }

      article.innerHTML = `
                <div class="product-image">
                    <img src="${product.img}" loading="lazy" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-category">${category}</p>
                    ${priceHtml}
                </div>
            `;

      // Allow modal opening for these dynamic cards
      article.addEventListener("click", (e) => {
        e.preventDefault();
        openProductModal(product.img, product.title, category, parseFloat(product.price.replace('$', '')));
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
        window.scrollTo({ top: y, behavior: 'smooth' });
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
          window.scrollTo({ top: y, behavior: 'smooth' });
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

    // Update Add to Cart Button with specific product info
    const addBtn = modal.querySelector('.btn-primary');
    if (addBtn) {
      // Clone to remove old listeners
      const newBtn = addBtn.cloneNode(true);
      addBtn.parentNode.replaceChild(newBtn, addBtn);

      newBtn.addEventListener('click', () => {
        CartManager.addItem({
          title,
          category,
          price: basePrice,
          img
        });
        hideModal();
      });
    }

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
    // Just finding the category card provided it exists, logic for targetCard seems missing in original snippet 
    // but preserving context.
    const targetCard = document.querySelector(`.category-card[data-category="${categoryParam}"]`);
    if (targetCard) {
      setTimeout(() => {
        targetCard.click();
      }, 300);
    }
  }

  // 7.5 Shopping Cart Auth Check
  const cartLink = document.querySelector('a.cart-icon[href="#"]');
  if (cartLink) {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault(); // Always prevent default # behavior

      const user = localStorage.getItem('currentUser');
      if (!user) {
        window.location.href = 'login.html';
      } else {
        window.location.href = 'cart.html';
      }
    });
  }

  // 8. Cart Manager
  const CartManager = {
    getKey: () => {
      const userStr = localStorage.getItem('currentUser');
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      return 'cart_' + user.email;
    },
    addItem: (product) => {
      const key = CartManager.getKey();
      if (!key) {
        window.location.href = 'login.html';
        return;
      }
      let cart = JSON.parse(localStorage.getItem(key) || '[]');
      cart.push(product);
      localStorage.setItem(key, JSON.stringify(cart));
      updateCartCount();

      alert("Added to Cart!"); // Simple feedback
    },
    getItems: () => {
      const key = CartManager.getKey();
      if (!key) return [];
      return JSON.parse(localStorage.getItem(key) || '[]');
    },
    removeItem: (index) => {
      const key = CartManager.getKey();
      if (!key) return;
      let cart = JSON.parse(localStorage.getItem(key) || '[]');
      cart.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(cart));
      updateCartCount();

      if (window.renderCart) window.renderCart();
    },
    clear: () => {
      const key = CartManager.getKey();
      if (key) localStorage.removeItem(key);
      updateCartCount();

    }
  };

  // Helper to update header count
  const updateCartCount = () => {
    const items = CartManager.getItems();
    const countEl = document.querySelector('.cart-icon span');
    const countText = document.querySelector('.cart-icon');

    // Update the text node with (N)
    // Note: Current HTML is <a ...><span>CART</span> (0)</a>
    // Need care not to wipe the SPAN
    if (countText) {
      // Reconstruct for safety
      const t = translations[currentLang] || translations['en'];
      countText.innerHTML = `<span data-i18n="nav_cart">${t.nav_cart}</span> (${items.length})`;
    }
  };

  // Expose for UI
  window.CartManager = CartManager;


  // Render function for cart.html
  // Render function for cart.html
  let currentShippingCost = 0;
  let selectedPaymentMethod = null;

  // Expose selection functions globally
  window.handleShippingChange = (selectElement) => {
    currentShippingCost = parseFloat(selectElement.value);
    
    // Re-render totals only
    updateCartTotals();
  };

  window.handlePaymentChange = (selectElement) => {
    selectedPaymentMethod = selectElement.value;
    // Hide error on selection
    const err = document.getElementById('payment-error');
    if(err) err.style.display = 'none';
  };

  const updateCartTotals = () => {
     const items = CartManager.getItems();
     let subtotal = 0;
     items.forEach(item => subtotal += item.price);
     
     const total = subtotal + currentShippingCost;
     
     const subtotalEl = document.getElementById('cart-subtotal');
     const shippingEl = document.getElementById('cart-shipping');
     const totalEl = document.getElementById('cart-total');
     
     if (subtotalEl) subtotalEl.innerText = formatPrice(subtotal, currentCurrency);
     if (shippingEl) shippingEl.innerText = currentShippingCost === 0 ? 'Free' : formatPrice(currentShippingCost, currentCurrency);
     if (totalEl) totalEl.innerText = formatPrice(total, currentCurrency);
  };

  window.renderCart = () => {
    const container = document.getElementById('cart-items-container');
    const summary = document.getElementById('cart-summary');
    const shippingSection = document.getElementById('shipping-section');
    const paymentSection = document.getElementById('payment-section');

    if (!container) return;

    const items = CartManager.getItems();
    const t = translations[currentLang] || translations['en'];

    if (items.length === 0) {
      container.innerHTML = `<div class="empty-cart-msg">${t.cart_empty || "Your cart is empty."}</div>`;
      if (summary) summary.style.display = 'none';
      if (shippingSection) shippingSection.style.display = 'none';
      if (paymentSection) paymentSection.style.display = 'none';
      return;
    }

    // Show sections
    if (summary) summary.style.display = 'block';
    if (shippingSection) shippingSection.style.display = 'block';
    if (paymentSection) paymentSection.style.display = 'block';

    // Update Section Headers
    const shipHeader = shippingSection.querySelector('.section-heading');
    if(shipHeader) shipHeader.innerText = t.cart_shipping_title;

    const payHeader = paymentSection.querySelector('.section-heading');
    if(payHeader) payHeader.innerText = t.cart_payment_title;

    // Update Dropdown Options (Re-inject to ensure translation)
    const shipSelect = document.getElementById('shipping-method');
    if(shipSelect) {
        // preserve value if possible, or just re-render is fine since we default to 0
        const currentVal = shipSelect.value; 
        shipSelect.innerHTML = `
            <option value="0">${t.ship_std} - ${t.free}</option>
            <option value="15">${t.ship_exp} - $15.00</option>
        `;
        shipSelect.value = currentVal;
    }

    const paySelect = document.getElementById('payment-method');
    if(paySelect) {
        const currentVal = paySelect.value;
        paySelect.innerHTML = `
            <option value="" disabled selected>${t.pay_select}</option>
            <option value="credit_card">${t.pay_cc}</option>
            <option value="paypal">${t.pay_paypal}</option>
            <option value="crypto">${t.pay_crypto}</option>
        `;
        // Ensure default selected is respected if value is empty
        if(currentVal) paySelect.value = currentVal;
        else paySelect.selectedIndex = 0; 
    }
    
    // Update Error MSG
    const payError = document.getElementById('payment-error');
    if(payError && t.pay_error) payError.innerText = t.pay_error;

    // Update Summary Labels
    if(summary) {
        // We need to target specific spans. Let's rebuild the summary innerHTML structurally to match
        // But cleaner to just update the text nodes if we can?
        // Actually, re-rendering the logic inside updateCartTotals is better or just static HTML?
        // The summary structure is static in HTML, but headers are text.
        // Let's rely on updateCartTotals to handle value updates, but we need to update LABELS here.
        // Or simpler: Just re-inject the summary structure with translated labels.
        
        // This part is tricky because buttons have onclick handlers.
        // Use querySelector to update text directly.
        
        const rows = summary.querySelectorAll('.summary-row');
        if(rows[0]) rows[0].firstElementChild.innerText = t.cart_subtotal + ":";
        if(rows[1]) rows[1].firstElementChild.innerText = t.cart_shipping + ":";
        if(rows[2]) rows[2].firstElementChild.innerText = t.cart_total + ":";
        
        const btns = summary.querySelectorAll('.checkout-btn');
        if(btns[0]) btns[0].innerText = t.cart_checkout_btn;
        if(btns[1]) btns[1].innerText = t.cart_continue_btn;
    }

    container.innerHTML = '';
    
    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-subtitle">${item.category}</div>
                </div>
            </div>
            <div style="display:flex; align-items:center;">
                <div class="cart-item-price" data-base-price="${item.price}">${formatPrice(item.price, currentCurrency)}</div>
                <button class="remove-btn" onclick="CartManager.removeItem(${index})"><i class="fas fa-trash"></i></button>
            </div>
          `;
      container.appendChild(div);
    });

    updateCartTotals();
  };
  
  window.handleCheckout = () => {
    const t = translations[currentLang] || translations['en'];
    
    if (!selectedPaymentMethod) {
        // Show inline error
        const err = document.getElementById('payment-error');
        if(err) err.style.display = 'block';
        return;
    }
    
    CartManager.clear();
    alert(t.cart_checkout_success || "Thank you for your purchase!");
    
    // Reset state
    selectedPaymentMethod = null;
    currentShippingCost = 0; // Reset to default
    
    if (window.renderCart) window.renderCart();
  };

  // Initial header count update
  updateCartCount();

  // 4. Auth Logic
  window.handleRegister = (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const existing = localStorage.getItem('user_' + email);
    const errorEl = document.getElementById('reg-error');
    if (errorEl) errorEl.innerText = "";

    if (existing) {
      const t = translations[currentLang] || translations['en'];
      if (errorEl) {
        errorEl.innerText = t.auth_exists;
      } else {
        alert("Account already exists");
      }
      return;
    }

    const user = { name, email, password };
    localStorage.setItem('user_' + email, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
  };

  window.handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    if (errorEl) errorEl.innerText = ""; // Clear previous error

    const stored = localStorage.getItem('user_' + email);
    if (stored) {
      const user = JSON.parse(stored);
      if (user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
        return;
      }
    }

    // Show inline error
    if (errorEl) {
      const t = translations[currentLang] || translations['en'];
      errorEl.innerText = t.auth_failed;
    } else {
      // Fallback if element not found (should not happen)
      alert("Invalid email or password");
    }
  };

  window.handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const updateAuthUI = () => {
    const userStr = localStorage.getItem('currentUser');
    const authContainer = document.getElementById('header-auth');
    if (!authContainer) return;

    const t = translations[currentLang];
    if (userStr) {
      const user = JSON.parse(userStr);
      authContainer.innerHTML = `
              <span style="color: #fff; margin-right: 15px;">${t.auth_welcome}${user.name}</span>
              <a href="#" onclick="handleLogout()" style="color: #999; font-size: 0.9rem;">${t.auth_logout}</a>
          `;
    } else {
      authContainer.innerHTML = `
               <a href="login.html" class="cart-icon">${t.auth_login}</a>
           `;
    }
  };




  // Run on load
  updateAuthUI();

  // Hook into language dropdown to refresh Auth UI
  document.querySelectorAll('.language-dropdown li').forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(updateAuthUI, 0);
    });
  });

});
