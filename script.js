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
      free: "Free",
      btn_read_more: "Read more",
      btn_show_less: "Show less"
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
      free: "免費",
      btn_read_more: "閱讀更多",
      btn_show_less: "收起內容"
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


    // If modal is open, update description language
    const modalDesc = document.getElementById("modal-desc");
    const modal = document.getElementById("product-modal");
    if (modalDesc && modal && window.getComputedStyle(modal).display === "block") {
      const descEn = modalDesc.getAttribute('data-desc-en');
      const descZh = modalDesc.getAttribute('data-desc-zh');
      // Re-render description
      if (typeof renderModalDescription === 'function') {
        renderModalDescription(descEn, descZh);
      }
    }
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
        img: "https://vinyl.com/cdn/shop/files/8258505507121_85quality_paramore_riot_silver_vinyl.webp?v=1734325769&width=5760",
        description: "Celebrate a milestone in pop-punk history with Paramore's \"Riot!,\" reissued in a stunning silver vinyl for Fueled By Ramen's 25th anniversary. This album, originally released in 2007, is a powerhouse of high-energy tracks, including the explosive hits \"Misery Business\" and \"That's What You Get.\" The production, led by David Bendeth, captures the vibrant and rebellious spirit of the band, propelling \"Riot!\" to critical acclaim and earning it a place as a genre-defining work. This special edition not only commemorates the album's impact but also celebrates the label's legacy in shaping modern punk music. The 25th Anniversary Edition of \"Riot!\" offers fans both nostalgia and a fresh take on beloved classics, now pressed on silver vinyl that adds a collectible twist. Paramore's breakthrough album features their signature blend of catchy melodies and heartfelt lyrics, now enhanced with premium sound quality. This release is an essential addition to any vinyl collector's library, ensuring that the spirited anthems of Paramore continue to inspire new generations of music lovers. Whether you're rediscovering the album or experiencing it for the first time, \"Riot!\" remains a vibrant testament to Paramore's enduring appeal and influence in the rock scene.",
        description_zh: "慶祝 Paramore 流行龐克歷史上的里程碑，《Riot!》以令人驚豔的銀色黑膠重新發行，紀念 Fueled By Ramen 成立 25 週年。這張專輯最初於 2007 年發行，充滿了高能量的曲目，包括爆炸性的熱門歌曲《Misery Business》和《That's What You Get》。由 David Bendeth 製作，捕捉了樂團充滿活力和叛逆的精神，將《Riot!》推向好評，並奠定了其作為流派定義之作的地位。此特別版不僅紀念了專輯的影響力，也慶祝了該廠牌在塑造現代龐克音樂方面的傳承。《Riot!》25 週年紀念版為粉絲提供了懷舊與對心愛經典的全新詮釋，壓製於銀色黑膠上，增添了收藏價值。Paramore 的突破性專輯展現了他們標誌性的朗朗上口的旋律與真摯歌詞的融合，現在更以優質的音質呈現。此發行是任何黑膠收藏家庫存中的必備之選，確保 Paramore 精神飽滿的頌歌繼續激勵新一代的音樂愛好者。無論您是重新發現這張專輯還是初次體驗，《Riot!》仍然是 Paramore 在搖滾界持久魅力和影響力的生動證明。"
      },
      {
        title: "Nevermind",
        artist: "Nirvana",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://vinyl.com/cdn/shop/files/8258513305905_85quality_Nirvana_Nevermind_Vinyl_LP.webp?v=1734325766&width=5760",
        description: "Step back into the pivotal era of grunge with Nirvana's groundbreaking album \"Nevermind,\" now available on vinyl. This 1991 release catapulted the Seattle trio into the spotlight, embedding their sound as the anthem of Generation X and thrusting alternative rock into the mainstream. Featuring the explosive tracks \"Smells Like Teen Spirit\" and the deeply introspective \"Something in the Way,\" \"Nevermind\" captures the raw emotion and unfiltered angst that defined a generation. The album's powerful dynamic, crafted by producer Butch Vig, showcases Kurt Cobain's raw lyrics, Dave Grohl's intense drumming, and Krist Novoselic's foundational bass lines, making it a must-have in any vinyl enthusiast’s collection. \"Nevermind\" is not just an album; it's a cultural milestone that reshaped the music landscape. From its iconic cover to its blend of melodic hooks and distorted guitars, it offers a visceral portrait of youthful disillusionment and desire for authenticity. Celebrated for its influence and artistry, this vinyl release preserves the gritty essence of Nirvana's vision, making it an essential piece for both long-time fans and new listeners wanting to experience the genesis of modern rock music.",
        description_zh: "重返 Nirvana 開創性專輯《Nevermind》的關鍵油漬搖滾時代，現已推出黑膠版本。這張 1991 年的發行將這支西雅圖三人組推向聚光燈下，將他們的聲音深深烙印為 X 世代的頌歌，並將另類搖滾推向主流。收錄了爆炸性的曲目《Smells Like Teen Spirit》和深刻內省的《Something in the Way》，《Nevermind》捕捉了定義一個世代的原始情感和未經過濾的焦慮。專輯強大的動態由製作人 Butch Vig 打造，展現了 Kurt Cobain 原始的歌詞、Dave Grohl 強烈的鼓聲以及 Krist Novoselic 紮實的貝斯線條，使其成為任何黑膠愛好者收藏中的必備之作。《Nevermind》不僅僅是一張專輯；它是重塑音樂景觀的文化里程碑。從其標誌性的封面到旋律鉤子與失真吉他的融合，它提供了青春幻滅與對真實渴望的直觀寫照。因其影響力和藝術性而備受讚譽，這張黑膠發行保留了 Nirvana 願景的粗獷本質，使其成為渴望體驗現代搖滾音樂起源的資深粉絲與新聽眾的重要作品。"
      },
      {
        title: "The Dark Side Of The Moon (50th Anniversary Edition)",
        artist: "Pink Floyd",
        price: "$31.99",
        img: "https://vinyl.com/cdn/shop/files/9089832321329_85quality_DARK-SIDE-50_1024x1024_9bcc2782-a4d8-46b4-961e-8f28edab9858.webp?v=1734325789&width=5760",
        description: "Celebrate 50 years of Pink Floyd's legendary The Dark Side of the Moon with this special anniversary edition, remastered by James Guthrie on 180g vinyl. Originally released in 1973, this groundbreaking album transcended music, becoming a cultural touchstone for generations of listeners. Tracks like \"Money\" and \"Time\" have become timeless anthems, delivering a sonic experience that blurs the lines between reality and psychedelic imagination. This 50th anniversary edition comes housed in a beautiful gatefold jacket, complete with collectible posters and stickers, enhancing the overall experience for both longtime fans and new listeners. The Dark Side of the Moon remains a cosmic journey through themes of human experience, societal reflection, and existential thought, cementing its place as one of the greatest albums ever created. This remastered edition ensures the album sounds better than ever, allowing you to fully immerse yourself in its profound depths.",
        description_zh: "藉由這張由 James Guthrie 重新修復的 180 克黑膠唱片，慶祝 Pink Floyd 傳奇專輯《The Dark Side of the Moon》發行 50 週年。這張廣受讚譽的專輯最初於 1973 年發行，超越了音樂範疇，成為世世代代聽眾的文化試金石。《Money》和《Time》等曲目已成為永恆的頌歌，傳遞出一種模糊了現實與迷幻想像界限的聲音體驗。此 50 週年紀念版採用精美的摺頁封套包裝，並附有值得收藏的海報和貼紙，提升了資深粉絲和新聽眾的整體體驗。《The Dark Side of the Moon》仍然是一趟穿越人類經驗、社會反思和存在主義思考主題的宇宙之旅，鞏固了其作為有史以來最偉大專輯之一的地位。此重製版本確保專輯的音質比以往任何時候都更好，讓您完全沉浸在其深邃的意境中。"
      },
      {
        title: "AM [180-gram]",
        artist: "Arctic Monkeys",
        price: "$22.99",
        img: "https://vinyl.com/cdn/shop/files/8258500198705_85quality_arctic-monkeys-am-lp_1024x1024_b88bbb6b-9eec-460b-80bb-a00687dfa348.webp?v=1734325742&width=5760",
        description: "Experience the bold and innovative sound of Arctic Monkeys with their critically acclaimed album AM, now available on 180gm vinyl. Released in 2013, AM marks a significant evolution in the band's sound, blending indie rock with hip-hop rhythms and R&B influences to create a uniquely modern soundscape. Featuring standout tracks like \"Do I Wanna Know?\", \"R U Mine?\", and \"Why'd You Only Call Me When You're High?\", this album captures the band's signature wit, sonic experimentation, and Alex Turner's charismatic vocals. Produced by James Ford and co-produced by Ross Orton, AM has been lauded for its sleek production and clever lyrics, solidifying Arctic Monkeys' place in modern rock history. The 180gm vinyl edition of AM offers a rich, immersive listening experience, bringing out the intricate layers and dynamic range that define the album. Whether you're a longtime fan or new to their music, adding AM to your vinyl collection is essential for anyone who appreciates groundbreaking, genre-blending rock.",
        description_zh: "體驗 Arctic Monkeys 廣受好評的專輯《AM》大膽且創新的聲音，現已推出 180 克黑膠版本。於 2013 年發行，《AM》標誌著樂團聲音的重大演變，將獨立搖滾與嘻哈節奏和 R&B 影響融合，創造出獨特的現代音景。專輯收錄了《Do I Wanna Know?》、《R U Mine?》和《Why'd You Only Call Me When You're High?》等傑出曲目，捕捉了樂團標誌性的機智、聲音實驗以及 Alex Turner 充滿魅力的嗓音。由 James Ford 製作，Ross Orton 聯合製作，《AM》因其流暢的製作和巧妙的歌詞而備受讚譽，鞏固了 Arctic Monkeys 在現代搖滾史上的地位。《AM》的 180 克黑膠版本提供了豐富、身歷其境的聆聽體驗，展現了定義這張專輯的複雜層次和動態範圍。無論您是資深粉絲還是初次接觸他們的音樂，對於任何欣賞開創性、融合流派搖滾的人來說，將《AM》加入您的黑膠收藏都是必不可少的。"
      },
      {
        title: "Jar Of Flies",
        artist: "Alice In Chains",
        price: "$21.99",
        img: "https://vinyl.com/cdn/shop/files/9405456810289_85quality_4296473-3098885.webp?v=1734325758&width=5760",
        description: "Dark, moody, and hauntingly beautiful, Jar of Flies shows Alice in Chains at their most introspective. This 1994 EP blends acoustic melancholy with grunge intensity, delivering a sound that's as raw as it is refined. Featuring standout tracks like No Excuses, Nutshell, and I Stay Away, this EP marks a daring shift from the band’s heavier roots. It’s layered with emotional depth, harmonized vocals, and bluesy, acoustic arrangements that set it apart in the '90s rock scene. The band's vulnerability bleeds through every note, creating a deeply personal and immersive listening experience. Pressed on classic black vinyl, this edition captures the textured atmosphere and sonic richness that only analog can deliver. A must-have for fans of grunge, alternative rock, and emotionally driven music.",
        description_zh: "黑暗、情緒化且淒美，《Jar of Flies》展現了 Alice in Chains 最內省的一面。這張 1994 年的 EP 將原聲的憂鬱與油漬搖滾的強烈感融合在一起，傳遞出一種既原始又精緻的聲音。收錄了《No Excuses》、《Nutshell》和《I Stay Away》等傑出曲目，這張 EP 標誌著樂團背離其更重型根源的大膽轉變。它層次分明，充滿情感深度、和聲演唱以及藍調風格的原聲編曲，使其在 90 年代搖滾場景中獨樹一幟。樂團的脆弱感滲透在每一個音符中，創造出極其個人化且身歷其境的聆聽體驗。此版本壓製於經典黑色黑膠上，捕捉了只有類比錄音才能傳遞的質感氛圍和聲音豐富度。這是油漬搖滾、另類搖滾和情感驅動音樂粉絲的必備之作。"
      },
      {
        title: "Moondance [180-gram]",
        artist: "Van Morrison",
        price: "$24.99",
        img: "https://vinyl.com/cdn/shop/files/8258499445041_85quality_Van_Morrison_-_Moondance.webp?v=1734325749&width=5760",
        description: "Experience the timeless magic of Van Morrison's \"Moondance,\" a masterpiece that highlights his extraordinary vocal and songwriting talents. Released in 1970, this album features a captivating mix of jazz, folk, and blues, showcasing Morrison's ability to blend genres seamlessly. With enduring classics like \"Moondance,\" \"Caravan,\" and \"Into the Mystic,\" this album remains a beloved favorite among music enthusiasts. This edition is meticulously crafted, recorded onto 180-gram vinyl at RTI and mastered from the original analog master tapes by Kevin Gray at Acoustech Mastering. The superior sound quality brings out the buoyant rhythms and poetic lyrics that continue to captivate listeners to this day. Adding \"Moondance\" to your vinyl collection ensures you'll always have a touch of Van Morrison's enchanting artistry at your fingertips.",
        description_zh: "體驗 Van Morrison 《Moondance》永恆的魔力，這是一部彰顯他非凡歌聲與創作才華的傑作。這張專輯於 1970 年發行，融合了迷人的爵士、民謠和藍調，展現了 Morrison 無縫融合流派的能力。憑藉《Moondance》、《Caravan》和《Into the Mystic》等不朽經典，這張專輯仍然是音樂愛好者心目中的摯愛。此版本經過精心製作，由 Acoustech Mastering 的 Kevin Gray 從原始類比母帶重製，並於 RTI 壓製成 180 克黑膠。卓越的音質展現了至今仍讓聽眾著迷的輕快節奏與詩意歌詞。將《Moondance》加入您的黑膠收藏，確保您隨時都能觸及 Van Morrison 迷人的藝術造詣。"
      },
      {
        title: "Around The Fur [180-gram]",
        artist: "Deftones",
        price: "$21.99",
        img: "https://vinyl.com/cdn/shop/files/8258509144369_85quality_Deftones_vinyl_around_the_fur_LP.webp?v=1734325750&width=5760",
        description: "Deftones' 'Around the Fur' builds on the raw intensity of their debut 'Adrenaline,' with sinister nuances added to their already aggressive sound. \"My Own Summer (Shove It)\" sets the tone with a blend of sinewy guitars and eerie whispers mixed with explosive crunch. Sepultura's Max Cavalera contributes guitar and vocals on \"Headup,\" while \"MX\" features Chino Moreno trading vocals with Annalynn Cunningham in a scathing critique of rock star mentality. Moreno showcases his vocal range, from breathy and psychotic to hauntingly melodic, while guitarist Stephen Carpenter's heavy sound is muscular yet nimble. Moreno's otherworldly screams drive the album's ferocity, making it a relentless force. This LP version is pressed on 180g vinyl.",
        description_zh: "Deftones 的《Around the Fur》建立在他們首張專輯《Adrenaline》的原始強度之上，為他們原本就極具侵略性的聲音增添了陰險的細微差別。《My Own Summer (Shove It)》以強健的吉他、怪誕的低語與爆炸性的嘎吱聲混合，奠定了基調。Sepultura 的 Max Cavalera 在《Headup》中貢獻了吉他和人聲，而《MX》則由 Chino Moreno 與 Annalynn Cunningham 輪流演唱，對搖滾明星的心態進行了嚴厲的批判。Moreno 展現了他的音域，從氣聲、神經質到令人難以忘懷的旋律，而吉他手 Stephen Carpenter 的沉重聲音既肌肉感十足又靈活。Moreno 超凡脫俗的尖叫聲驅動了專輯的兇猛，使其成為一股無情的所向披靡之力。此 LP 版本壓製於 180 克黑膠上。"
      },
      {
        title: "Hotel California [180-gram]",
        artist: "Eagles",
        price: "$24.99",
        img: "https://vinyl.com/cdn/shop/files/8258506817841_85quality_Eagles_-_Hotel_California.webp?v=1734325795&width=5760",
        description: "Immerse yourself in the timeless rock classic \"Hotel California\" by the Eagles, now available on limited edition 180 gram vinyl LP. Released in late 1976, this fifth studio album marked a pivotal moment for the band, introducing guitarist Joe Walsh and bidding farewell to founding member Bernie Leadon. This iconic album is a masterpiece of storytelling and musical craftsmanship, featuring unforgettable tracks that have defined generations. The album includes the hauntingly beautiful title track \"Hotel California,\" as well as rock anthems like \"Life in the Fast Lane\" and \"New Kid in Town.\" Delve into deeper cuts like \"The Last Resort,\" which showcase the band's unparalleled ability to blend rock, country, and folk influences. This 180 gram vinyl pressing not only offers superior sound quality but also stands as a collector's piece for any music enthusiast. Revisit the magic of \"Hotel California\" and experience the Eagles at their very best.",
        description_zh: "沉浸在 Eagles 永恆的搖滾經典《Hotel California》中，現已推出限量版 180 克黑膠唱片。這張第五張錄音室專輯於 1976 年底發行，是樂團的關鍵時刻，引進了吉他手 Joe Walsh 並告別了創始成員 Bernie Leadon。這張標誌性的專輯是故事敘述和音樂工藝的傑作，收錄了定義了幾代人的難忘曲目。專輯包含淒美的主打歌《Hotel California》，以及《Life in the Fast Lane》和《New Kid in Town》等搖滾頌歌。深入探索像《The Last Resort》這樣的深度曲目，展現了樂團融合搖滾、鄉村和民謠影響的無與倫比的能力。這張 180 克黑膠壓片不僅提供卓越的音質，也是任何音樂愛好者的收藏品。重溫《Hotel California》的魔力，體驗 Eagles 的最佳狀態。"
      }
    ],
    "Hip Hop": [
      {
        title: "CTRL",
        artist: "SZA",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258503573809_85quality_SZA_vinyl_ctrl_2LP.webp?v=1734325779",
        description: "Experience the rich, evocative soundscapes of SZA's debut album \"CTRL\" with this stunning green 2LP vinyl edition. Released in 2017 to both critical acclaim and commercial success, \"CTRL\" features collaborations with top artists like Kendrick Lamar and Travis Scott, and includes chart-topping hits such as \"Love Galore.\" The album's production involved a stellar lineup of talent, including GRAMMY-nominated Carter Lang and multi-platinum producer ThankGod4Cody, who helped craft its opulent sounds and heartfelt storytelling. This limited double-colored vinyl pressing is encased in a gatefold jacket, offering a luxurious visual and auditory experience. \"CTRL\" continues to resonate deeply with listeners, blending smooth R&B vibes with raw, introspective lyrics. A must-have for vinyl collectors and fans of SZA, this edition not only celebrates her groundbreaking work but also ensures the album's timeless appeal is preserved in stunning fidelity.",
        description_zh: "體驗 SZA 首張專輯《CTRL》豐富而引人入勝的音樂景觀，這張令人驚豔的綠色雙黑膠唱片版本絕對值得收藏。於 2017 年發行後獲得各界好評與商業成功，《CTRL》收錄了與 Kendrick Lamar 和 Travis Scott 等頂尖藝人的合作曲目，並包含《Love Galore》等熱門金曲。專輯製作陣容強大，包括葛萊美提名製作人 Carter Lang 和多白金製作人 ThankGod4Cody，他們共同打造了這張專輯奢華的聲音與真摯的故事敘述。這款限量雙色黑膠唱片採用摺頁封套包裝，提供奢華的視覺與聽覺體驗。《CTRL》持續與聽眾產生深刻共鳴，融合了流暢的 R&B 氛圍與原始、內省的歌詞。這是黑膠收藏家和 SZA 粉絲的必備之作，此版本不僅慶祝了她的開創性作品，更確保了專輯永恆的魅力以驚人的保真度得以保存。"
      },
      {
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258502394161_85quality_Kendrick_Lamar_-_good_kid_m_A_A_d_city_2LP.webp?v=1734325785",
        description: "Celebrate a decade of Kendrick Lamar's groundbreaking work with the \"good kid, m.A.A.d city\" now available on double 180-gram vinyl LP. Originally released in 2012, this critically acclaimed album tells a compelling narrative of Lamar's experiences growing up in Compton, blending vivid storytelling with masterful lyricism and innovative production. Featuring standout tracks like \"Swimming Pools (Drank),\" \"Bitch, Don’t Kill My Vibe,\" and \"m.A.A.d city,\" this album has cemented Lamar's status as one of hip-hop's most influential artists. This 10th Anniversary Edition offers superior sound quality with its 180-gram vinyl pressing, providing an immersive listening experience that captures the depth and nuance of Lamar's work. The double LP set is housed in a beautifully designed package, making it a must-have for fans and collectors alike. Add \"good kid, m.A.A.d city (10th Anniversary Edition)\" to your vinyl collection and revisit the raw, unfiltered brilliance of Kendrick Lamar's seminal album, a cornerstone of modern hip-hop.",
        description_zh: "藉由這張現已推出的 180 克雙黑膠唱片，慶祝 Kendrick Lamar 具開創性的作品《good kid, m.A.A.d city》發行十週年。這張廣受好評的專輯最初於 2012 年發行，講述了 Lamar 在康普頓成長的引人入勝故事，將生動的故事敘述與精湛的歌詞和創新的製作完美融合。收錄《Swimming Pools (Drank)》、《Bitch, Don’t Kill My Vibe》和《m.A.A.d city》等傑出曲目，這張專輯鞏固了 Lamar 作為嘻哈界最具影響力藝術家之一的地位。此十週年紀念版採用 180 克黑膠壓製，提供卓越的音質，帶來身歷其境的聆聽體驗，捕捉 Lamar 作品的深度與細微之處。雙 LP 套裝包裝精美，是粉絲和收藏家的必備之選。將《good kid, m.A.A.d city (10th Anniversary Edition)》加入您的黑膠收藏，重溫 Kendrick Lamar 這張奠定現代嘻哈基石的開創性專輯中原始、未經修飾的才華。"
      },
      {
        title: "IGOR",
        artist: "Tyler, The Creator",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8258501869873_85quality_Tyler_the_creator_vinyl_igor_LP.webp?v=1734325769",
        description: "Immerse yourself in the innovative soundscape of Tyler, The Creator's \"IGOR,\" available on vinyl. Released in 2019, this groundbreaking album marked a significant evolution in Tyler's artistic journey, blending elements of funk, rap, and R&B into a cohesive narrative of love and heartbreak. \"IGOR\" earned critical acclaim and a Grammy Award for Best Rap Album, showcasing Tyler's prowess as a producer and his unique approach to music creation, with all songs produced by Tyler himself. The \"IGOR\" vinyl is not just a musical album; it's an auditory experience that invites listeners into Tyler's eclectic and vivid world. This release features hit singles like \"Earfquake\" and \"I Think,\" which exemplify Tyler's signature blend of melodic choruses and innovative production. Owning this vinyl allows fans to appreciate the rich, detailed layers of sound that Tyler meticulously crafted, making it a must-have for collectors and aficionados of forward-thinking music.",
        description_zh: "沉浸在 Tyler, The Creator 的《IGOR》創新音景中，現已推出黑膠版本。這張於 2019 年發行的開創性專輯標誌著 Tyler 藝術旅程的重大演變，將放克、饒舌和 R&B 元素融合成為關於愛與心碎的連貫敘事。《IGOR》贏得了好評並榮獲葛萊美最佳饒舌專輯獎，展現了 Tyler 作為製作人的實力以及他獨特的音樂創作方式——所有歌曲均由 Tyler 親自製作。《IGOR》黑膠不僅是一張音樂專輯，更是一種聽覺體驗，邀請聽眾進入 Tyler 兼收並蓄且生動的世界。此發行版本收錄了《Earfquake》和《I Think》等熱門單曲，這些歌曲體現了 Tyler 標誌性的旋律副歌與創新製作的融合。擁有這張黑膠唱片讓粉絲能夠欣賞 Tyler 精心打造的豐富、細膩的聲音層次，使其成為前衛音樂收藏家和愛好者的必備之作。"
      },
      {
        title: "Swimming",
        artist: "Mac Miller",
        price: "$29.99",
        originalPrice: "$39.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448090997041_85quality_Mac_Miller_-_Swimming_2LP.webp?v=1734325758",
        description: "Dive into the profound depth of Mac Miller's \"Swimming\" with this essential double vinyl release. The album, celebrated for its introspective lyricism and complex production, showcases Miller's evolution as an artist, exploring themes of self-care and personal growth. Notable tracks like \"Self Care\" and \"Ladders\" highlight his unique blend of hip-hop, jazz, and soul, backed by production from notable collaborators such as Jon Brion, who helped to shape the album’s rich, textured soundscapes. \"Swimming\" represents a pivotal moment in Mac Miller’s career, offering a poignant reflection on his struggles and triumphs. This vinyl edition brings the album’s auditory experience to life, making it a must-have for fans and collectors alike. The release not only honors Mac Miller’s artistic legacy but also serves as a reminder of his profound impact on music and culture. It’s a perfect way to experience the album’s lush arrangements and heartfelt lyrics in the highest fidelity.",
        description_zh: "透過這張必備的雙黑膠發行，深入 Mac Miller《Swimming》的深邃意境。這張專輯以其內省的歌詞和複雜的製作而聞名，展現了 Miller 作為藝術家的演變，探索了自我照顧和個人成長的主題。《Self Care》和《Ladders》等著名曲目凸顯了他融合嘻哈、爵士和靈魂樂的獨特風格，並由 Jon Brion 等知名合作者製作，協助塑造了專輯豐富、有質感的音景。《Swimming》代表了 Mac Miller 職業生涯的關鍵時刻，對他的掙扎與勝利提供了深刻的反思。此黑膠版本將專輯的聽覺體驗帶入生活，使其成為粉絲和收藏家的一大必備。這次發行不僅向 Mac Miller 的藝術遺產致敬，也提醒著我們他對音樂和文化的深遠影響。這是以最高保真度體驗專輯豐富編曲和真摯歌詞的完美方式。"
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
        description: "Double vinyl LP pressing. Housed in a gatefold jacket with printed inner sleeves. The Bebop crew is just trying to make a buck. This motley lot of intergalactic loners teams up to track down fugitives and turn them in for cold hard cash. Spike is a hero whose cool façade hides a dark and deadly past. The pilot Jet is a bruiser of a brute who can't wait to collect the next bounty. Faye Valentine is a femme fatale prone to breaking hearts and separating fools from their money. Along for the ride are the brilliant, but weird, hacker Ed and a super-genius Welsh Corgi named Ein. On their own, any one of them is likely to get lost in the sprawl of space, but together, they're they most entertaining gang of bounty hunters in the year 2071. Composed and performed by Yoko Kanno and the band Seatbelts, the music of Cowboy Bebop is one of the signature elements of the series. The energetic jazz-infused pieces rip and roar across the stars and are as indispensable as the crew of the Bebop themselves.",
        description_zh: "雙片黑膠唱片。折頁封套設計，附印刷內套。Bebop 的船員們只是想賺點錢。這個由星際孤獨者組成的雜牌軍聯手追捕逃犯，換取冰冷的現金。史派克是一個外表冷酷但隱藏著黑暗致命過去的英雄。飛行員傑特是一個急於收取下一次賞金的壯漢。菲·范倫汀是一位傾向於讓男人心碎並騙光他們錢財的蛇蠍美人。隨行的還有天才駭客艾德和一隻名叫愛因的超天才柯基犬。單打獨鬥時，他們任何一個都可能迷失在浩瀚的太空中，但在一起，他們是 2071 年最有趣的賞金獵人團夥。由菅野洋子和 Seatbelts 樂團創作與演奏，Cowboy Bebop 的音樂是該系列的標誌性元素之一。充滿活力的爵士風格樂曲在星際間咆哮，與 Bebop 的船員們一樣不可或缺。"
      },
      {
        title: "The Music Never Stopped: The Roots of the Grateful Dead",
        artist: "Various Artists",
        price: "$24.99",
        img: "https://vinyl.com/cdn/shop/files/9405447405873_85quality_4284265-3084959.webp?v=1734326317&width=5760",
        description: "In their long career The Grateful Dead have been inspired by a stunning variety of American musical artists and traditions from blues to country to rock to folk - some of the most exciting and moving music ever recorded. Here are the original versions of The Dead's best loved cover tunes that surprise and delight with their musical depth, originality, and feeling. This collection has been lovingly compiled by a group of Dead scholars and enthusiasts.",
        description_zh: "在其漫長的職業生涯中，The Grateful Dead 受到了從藍調、鄉村、搖滾到民謠等各種美國音樂藝術家和傳統的啟發——這是有史以來最令人興奮和感動的音樂之一。這裡收錄了 The Dead 最受喜愛的翻唱曲目的原始版本，其音樂深度、原創性和情感令人驚喜和愉悅。這個合集由一群 Dead 學者和愛好者精心編製。"
      },
      {
        title: "Electric Ladyland [2LP]",
        artist: "Jimi Hendrix",
        price: "$29.99",
        img: "https://vinyl.com/cdn/shop/files/8258511634737_85quality_Jimi_Hendrix_-_Electric_Ladyland_2LP.webp?v=1734326029&width=5760",
        description: "Dive into the revolutionary sounds of Jimi Hendrix with Electric Ladyland, his third and final studio album, now available on double 180-gram vinyl. Released in 1968, this album is an iconic milestone in rock history, pushing the boundaries of the genre and solidifying Hendrix's status as a guitar virtuoso. Featuring sixteen tracks, including the legendary 'Voodoo Child (Slight Return),' 'Have You Ever Been (To Electric Ladyland),' and Hendrix's renowned cover of Bob Dylan's 'All Along the Watchtower,' Electric Ladyland is a masterclass in blending psychedelic rock, blues, funk, and experimental sounds.",
        description_zh: "深入體驗 Jimi Hendrix 的革命性聲音，《Electric Ladyland》是他的第三張也是最後一張錄音室專輯，現已推出雙 180 克黑膠版本。這張專輯發行於 1968 年，是搖滾史上的標誌性里程碑，突破了流派的界限，鞏固了 Hendrix 作為吉他大師的地位。收錄了十六首曲目，包括傳奇的 'Voodoo Child (Slight Return)'、'Have You Ever Been (To Electric Ladyland)' 以及 Hendrix 著名的 Bob Dylan 翻唱曲 'All Along the Watchtower'，《Electric Ladyland》是融合迷幻搖滾、藍調、放克和實驗聲音的傑作。"
      },
      {
        title: "Sound & Color [2LP Black, Pink & Magenta]",
        artist: "Alabama Shakes",
        price: "$33.99",
        img: "https://vinyl.com/cdn/shop/files/8335081865521_85quality_Alabama_Shakes_-_Sound_Color_Black_Pink_Magenta_2LP.webp?v=1734326083&width=5760",
        description: "Sound & Color is the second studio album by American rock band Alabama Shakes. Released in April 2015 via ATO Records, the album debuted at number one on the US Billboard 200 albums chart. It was nominated for six Grammy Awards, including Album of the Year, and won four, including Best Alternative Music Album.",
        description_zh: "《Sound & Color》是美國搖滾樂團 Alabama Shakes 的第二張錄音室專輯。該專輯於 2015 年 4 月透過 ATO Records 發行，首週即登上美國告示牌 200 強專輯榜冠軍。它獲得了六項葛萊美獎提名，包括年度專輯，並贏得了其中四項，包括最佳另類音樂專輯。"
      },
      {
        title: "Astral Weeks (180-gram)",
        artist: "Van Morrison",
        price: "$22.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8335046869297_85quality_Van_Morrison_-_Astral_Weeks.webp?v=1734326361",
        description: "Astral Weeks is the second studio album by Northern Irish singer-songwriter Van Morrison. It was recorded at Century Sound Studios in New York City during September and October 1968, and released in November of that year by Warner Bros. Records.",
        description_zh: "《Astral Weeks》是北愛爾蘭創作歌手 Van Morrison 的第二張錄音室專輯。於 1968 年 9 月和 10 月在紐約市 Century Sound Studios 錄製，並於同年 11 月由華納兄弟唱片發行。"
      },
      {
        title: "Bridge Of Sighs",
        artist: "Robin Trower",
        price: "$13.99",
        img: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8334903050545_85quality_3840251-2585813.webp?v=1734328057",
        description: "Bridge of Sighs is the second solo album by the English guitarist and songwriter Robin Trower. Released in 1974, it is his most commercially successful album, reaching number 7 on the Billboard 200 chart.",
        description_zh: "《Bridge of Sighs》是英國吉他手兼詞曲作者 Robin Trower 的第二張個人專輯。發行於 1974 年，這是他商業上最成功的專輯，在告示牌 200 強榜單上達到第 7 名。"
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
        openProductModal(product.img, product.title, category, parseFloat(product.price.replace('$', '')), product.description, product.description_zh);
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

  const modalDesc = document.getElementById("modal-desc");
  const renderModalDescription = (description, description_zh) => {
    const modalDesc = document.getElementById("modal-desc");
    if (!modalDesc) return;

    const currentLang = localStorage.getItem('lang') || 'zh';

    // Store descriptions for toggling
    if (description) modalDesc.setAttribute('data-desc-en', description);
    if (description_zh) modalDesc.setAttribute('data-desc-zh', description_zh);

    const defaultDesc = "Experience the uncompressed, raw emotion of analog sound. This piece has been carefully verified for quality and authenticity.";

    let descText = defaultDesc;
    if (currentLang === 'zh' && description_zh) {
      descText = description_zh;
    } else if (description) {
      descText = description;
    }

    modalDesc.innerText = descText;

    // Reset state
    modalDesc.classList.remove('truncated');
    const existingBtn = modal.querySelector('.read-more-btn');
    if (existingBtn) existingBtn.remove();

    // Check if text is long enough to truncate
    if (descText.length > 150) {
      modalDesc.classList.add('truncated');

      const readMoreBtn = document.createElement('button');
      readMoreBtn.className = 'read-more-btn';
      // Use Translations
      readMoreBtn.innerText = translations[currentLang]['btn_read_more'];
      readMoreBtn.setAttribute('data-i18n', 'btn_read_more');

      readMoreBtn.onclick = (e) => {
        e.preventDefault();
        const isTruncated = modalDesc.classList.contains('truncated');

        if (isTruncated) {
          modalDesc.classList.remove('truncated');
          // Switch to Show Less
          const lang = localStorage.getItem('lang') || 'zh';
          readMoreBtn.innerText = translations[lang]['btn_show_less'];
          readMoreBtn.setAttribute('data-i18n', 'btn_show_less');
        } else {
          modalDesc.classList.add('truncated');
          // Switch to Read More
          const lang = localStorage.getItem('lang') || 'zh';
          readMoreBtn.innerText = translations[lang]['btn_read_more'];
          readMoreBtn.setAttribute('data-i18n', 'btn_read_more');
        }
      };

      modalDesc.parentNode.insertBefore(readMoreBtn, modalDesc.nextSibling);
    }
  };

  const openProductModal = (img, title, category, basePrice, description, description_zh) => {
    if (!modal) return;
    modalImg.src = img;
    modalTitle.innerText = title;
    modalCategory.innerText = category;

    renderModalDescription(description, description_zh);

    // Price Update logic
    const priceDisplay = document.getElementById("modal-price");
    priceDisplay.setAttribute('data-base-price', basePrice);
    priceDisplay.innerText = formatPrice(basePrice, currentCurrency);

    // Update Add to Cart Button with specific product info
    const addBtn = modal.querySelector('.btn-primary');
    if (addBtn) {
      // Clone to remove old listeners
      const newBtn = addBtn.cloneNode(true);
      addBtn.parentNode.replaceChild(newBtn, addBtn);

      newBtn.addEventListener('click', () => {
        // Check if CartManager exists, otherwise just log or mock
        if (typeof CartManager !== 'undefined') {
          CartManager.addItem({
            title,
            category,
            price: basePrice,
            img
          });
        } else {
          console.warn("CartManager is not defined");
          // Fallback or just close
        }

        // Hide modal
        if (typeof hideModal === 'function') {
          hideModal();
        } else {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
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
    if (err) err.style.display = 'none';
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
    if (shipHeader) shipHeader.innerText = t.cart_shipping_title;

    const payHeader = paymentSection.querySelector('.section-heading');
    if (payHeader) payHeader.innerText = t.cart_payment_title;

    // Update Dropdown Options (Re-inject to ensure translation)
    const shipSelect = document.getElementById('shipping-method');
    if (shipSelect) {
      // preserve value if possible, or just re-render is fine since we default to 0
      const currentVal = shipSelect.value;
      shipSelect.innerHTML = `
            <option value="0">${t.ship_std} - ${t.free}</option>
            <option value="15">${t.ship_exp} - $15.00</option>
        `;
      shipSelect.value = currentVal;
    }

    const paySelect = document.getElementById('payment-method');
    if (paySelect) {
      const currentVal = paySelect.value;
      paySelect.innerHTML = `
            <option value="" disabled selected>${t.pay_select}</option>
            <option value="credit_card">${t.pay_cc}</option>
            <option value="paypal">${t.pay_paypal}</option>
            <option value="crypto">${t.pay_crypto}</option>
        `;
      // Ensure default selected is respected if value is empty
      if (currentVal) paySelect.value = currentVal;
      else paySelect.selectedIndex = 0;
    }

    // Update Error MSG
    const payError = document.getElementById('payment-error');
    if (payError && t.pay_error) payError.innerText = t.pay_error;

    // Update Summary Labels
    if (summary) {
      // We need to target specific spans. Let's rebuild the summary innerHTML structurally to match
      // But cleaner to just update the text nodes if we can?
      // Actually, re-rendering the logic inside updateCartTotals is better or just static HTML?
      // The summary structure is static in HTML, but headers are text.
      // Let's rely on updateCartTotals to handle value updates, but we need to update LABELS here.
      // Or simpler: Just re-inject the summary structure with translated labels.

      // This part is tricky because buttons have onclick handlers.
      // Use querySelector to update text directly.

      const rows = summary.querySelectorAll('.summary-row');
      if (rows[0]) rows[0].firstElementChild.innerText = t.cart_subtotal + ":";
      if (rows[1]) rows[1].firstElementChild.innerText = t.cart_shipping + ":";
      if (rows[2]) rows[2].firstElementChild.innerText = t.cart_total + ":";

      const btns = summary.querySelectorAll('.checkout-btn');
      if (btns[0]) btns[0].innerText = t.cart_checkout_btn;
      if (btns[1]) btns[1].innerText = t.cart_continue_btn;
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
      if (err) err.style.display = 'block';
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

  // Inject Custom Styles for Dynamic Elements
  // Inject Custom Styles for Dynamic Elements
  const injectStyles = () => {
    const styleInfo = `
        .modal-desc.truncated {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .read-more-btn {
            font-family: 'Quicksand', sans-serif;
            font-size: 0.9rem;
            cursor: pointer;
            color: #aaa;
            text-decoration: underline;
            margin-top: 10px;
            display: inline-block;
        }
      `;
    const style = document.createElement('style');
    style.innerHTML = styleInfo;
    document.head.appendChild(style);
  };

  // Run on load
  injectStyles();
  updateAuthUI();

  // Hook into language dropdown to refresh Auth UI
  document.querySelectorAll('.language-dropdown li').forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(updateAuthUI, 0);
    });
  });

});
