

(() => {
  const CARD_SELECTOR = "[data-testid='card-container']";
  const SAVE_BTN_SELECTOR = "[data-testid='listing-card-save-button']";
  const SIMILAR_BLOCK_SELECTOR = "[data-testid='content-scroller'][aria-labelledby='carousel-label']";
  const SPLIT_STAYS_SELECTOR = "[data-testid='split-stays']";
  const HT87D5E_SELECTOR = ".ht87d5e";
  const TITLE_SECTION_SELECTOR = "[data-section-id='TITLE_DEFAULT']";
  const HERO_SECTION_SELECTOR = "[data-section-id='HERO_DEFAULT'], [data-plugin-in-point-id='HERO_DEFAULT']";
  
  const STORAGE_KEYS = { 
    SETTINGS: "airbxbSettings", 
    BLOCKED: "airbxbBlocked",
    SHORTLISTED: "airbxbShortlisted",
    SHORTLIST_DETAILS: "airbxbShortlistDetails"
  };

  const AMENITY_GROUPS = {
    parking: [9, 22, 23, 282, 212, 213],
    washer: [33],
    evcharger: [97],
    aircon: [5, 140, 142],
    fireplace: [27, 592, 449],
    pool: [7, 239, 258, 259, 367, 254, 240, 458, 538, 539, 238, 241, 242, 243, 498, 584],
    luggage: [103, 483],
    bbq: [99, 216, 217, 218, 332, 184, 186],
    terrace: [180],
    garden: [255],
    firepit: [219],
    iron: [46],
    dishwasher: [92],
    beach: [381, 155, 674, 134, 132, 133],
    checkin: [51, 52, 53, 54, 43]
  };

  const MONTHS_REGEX = (function() {
    const months = [
      "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",
      "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
      "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "aout", "septembre", "octobre", "novembre", "décembre",
      "januar", "februar", "märz", "maerz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember",
      "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
      "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
      "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december",
      "január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december",
      "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
      "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień",
      "ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince",
      "leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec",
      "januar", "februar", "marts", "mars", "april", "maj", "juni", "juli", "august", "augusti", "september", "oktober", "november", "december",
      "tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu",
      "tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta",
      "ocak", "şubat", "mart", "nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık",
      "sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis",
      "sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio", 
      "janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris",
      "janvāra", "februāra", "marta", "aprīļa", "maija", "jūnija", "jūlija", "augusta", "septembra", "oktobra", "novembra", "decembra",
      "jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember",
      "jaanuari", "veebruari", "märtsi", "aprilli", "juuni", "juuli", "augusti", "septembri", "oktoobri", "novembri", "detsembri",
      "janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember",
      "siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac",
      "siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca",
      "ιανουάριος", "φεβρουάριος", "μάρτιος", "απρίλιος", "μάιος", "ιούνιος", "ιούλιος", "αύγουστος", "σεπτέμβριος", "οκτώβριος", "νοέμβριος", "δεκέμβριος",
      "ιανουαρίου", "φεβρουαρίου", "μαρτίου", "απριλίου", "μαΐου", "ιουνίου", "ιουλίου", "αυγούστου", "σεπτεμβρίου", "οκτωβρίου", "νοεμβρίου", "δεκεμβρίου",
      "ιανουάριο", "φεβρουάριο", "μάρτιο", "απρίλιο", "μάιο", "ιούνιο", "ιούλιο", "αύγουστο", "σεπτέμβριο", "οκτώβριο", "νοέμβριο", "δεκέμβριο",
      "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
      "januara", "februara", "marta", "aprila", "maja", "juna", "jula", "avgusta", "septembra", "oktobra", "novembra", "decembra",
      "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар",
      "јануара", "фебруара", "марта", "априла", "маја", "јуна", "јула", "августа", "септембра", "октобра", "новембра", "децембра",
      "януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември",
      "januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december",
      "januarja", "februarja", "marca", "aprila", "maja", "junija", "julija", "avgusta", "septembra", "oktobra", "novembra", "decembra",
      "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
      "كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
    ];
    months.sort((a, b) => b.length - a.length);
    return months.join("|");
  })();

  const DEBUG = false;
  const log = (...args) => DEBUG && console.info("[AirbXb]", ...args);

  let settings = { enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, autoRetrieveEnabled: false, hiResImages: false };
  let blockedSet = new Set();
  let shortlistedSet = new Set();
  let shortlistDetails = {};
  let scanScheduled = false;
  let currentListingId = null;

  const getStore = (keys) => new Promise((res) => chrome.storage.local.get(keys, (v) => res(v)));
  const setStore = (obj) => new Promise((res) => chrome.storage.local.set(obj, () => res()));

  function ensureAmenitiesUrl(url) {
    if (!url) return url;
    
    try {
      const urlObj = new URL(url);
      if (urlObj.pathname.match(/\/rooms\/\d+\/?$/)) {
        urlObj.pathname = urlObj.pathname.replace(/\/?$/, '/amenities');
      } else if (!urlObj.pathname.includes('/amenities')) {
        urlObj.pathname = urlObj.pathname.replace(/\/?$/, '/amenities');
      }
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  }

  async function init() {
    const data = await getStore([STORAGE_KEYS.SETTINGS, STORAGE_KEYS.BLOCKED, STORAGE_KEYS.SHORTLISTED, STORAGE_KEYS.SHORTLIST_DETAILS]);
    settings = Object.assign({ enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, autoRetrieveEnabled: false, hiResImages: false }, data[STORAGE_KEYS.SETTINGS] || {});
    blockedSet = new Set(data[STORAGE_KEYS.BLOCKED] || []);
    shortlistedSet = new Set(data[STORAGE_KEYS.SHORTLISTED] || []);
    shortlistDetails = data[STORAGE_KEYS.SHORTLIST_DETAILS] || {};

    updateGlowColorCSS(settings.glowColor);
    scanAndEnhance();
    
    setTimeout(() => initListingPageButtons(), 500);
    setTimeout(() => initListingPageButtons(), 1000);
    setTimeout(() => initListingPageButtons(), 2000);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes || []) {
          if (n.nodeType !== 1) continue;
          if (
            n.matches?.(CARD_SELECTOR) ||
            n.querySelector?.(CARD_SELECTOR) ||
            n.matches?.(SAVE_BTN_SELECTOR) ||
            n.querySelector?.(SAVE_BTN_SELECTOR) ||
            n.matches?.(SIMILAR_BLOCK_SELECTOR) ||
            n.querySelector?.(SIMILAR_BLOCK_SELECTOR) ||
            n.matches?.(SPLIT_STAYS_SELECTOR) ||
            n.querySelector?.(SPLIT_STAYS_SELECTOR) ||
            n.matches?.(HT87D5E_SELECTOR) ||
            n.querySelector?.(HT87D5E_SELECTOR) ||
            n.matches?.(TITLE_SECTION_SELECTOR) ||
            n.querySelector?.(TITLE_SECTION_SELECTOR)
          ) {
            scheduleScan();
            break;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let last = location.href;
    const urlObs = new MutationObserver(() => {
      const now = location.href;
      if (now !== last) {
        last = now;
        currentListingId = null;
        scheduleScan();
        setTimeout(() => initListingPageButtons(), 500);
        setTimeout(() => initListingPageButtons(), 1000);
      }
    });
    urlObs.observe(document, { childList: true, subtree: true });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      if (changes[STORAGE_KEYS.SETTINGS]) {
        settings = Object.assign({ enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, autoRetrieveEnabled: false, hiResImages: false }, changes[STORAGE_KEYS.SETTINGS].newValue || {});
        updateGlowColorCSS(settings.glowColor);
        updateAllCards();
        updateSimilarBlocks();
        updateSplitStays();
        updateListingPageButtons();
      }
      if (changes[STORAGE_KEYS.BLOCKED]) {
        blockedSet = new Set(changes[STORAGE_KEYS.BLOCKED].newValue || []);
        updateAllCards();
        updateListingPageButtons();
      }
      if (changes[STORAGE_KEYS.SHORTLISTED]) {
        shortlistedSet = new Set(changes[STORAGE_KEYS.SHORTLISTED].newValue || []);
        updateAllCards();
        updateListingPageButtons();
      }
      if (changes[STORAGE_KEYS.SHORTLIST_DETAILS]) {
        shortlistDetails = changes[STORAGE_KEYS.SHORTLIST_DETAILS].newValue || {};
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "setCustomImage") {
        handleSetCustomImage(message.imageUrl);
        sendResponse({ success: true });
        return true;
      }
      if (message.action === "extractForHiddenTab") {
        const details = extractFullDetailsFromPage();
        const hasData = !!(details.price || details.rating || (details.amenityCodes && details.amenityCodes.length > 0) || (details.beds && Object.keys(details.beds).some(k => details.beds[k] > 0)));
        chrome.runtime.sendMessage({
          action: "hiddenTabExtractionComplete",
          listingId: message.listingId,
          details: details
        });
        sendResponse({ success: true, hasData: hasData });
        return true;
      }
      return false;
    });
  }

  async function handleSetCustomImage(imageUrl) {
    const listingId = findListingIdForImage(imageUrl);
    
    if (!listingId) {
      log("Could not find listing ID for image:", imageUrl);
      return;
    }

    if (!shortlistedSet.has(listingId)) {
      log("Listing not in shortlist:", listingId);
      return;
    }

    if (!shortlistDetails[listingId]) {
      shortlistDetails[listingId] = {};
    }

    const existingImages = shortlistDetails[listingId].images || [];
    
    if (existingImages.length > 0) {
      existingImages[0] = imageUrl;
    } else {
      existingImages.push(imageUrl);
    }
    
    shortlistDetails[listingId].images = existingImages;
    shortlistDetails[listingId].imageUrl = imageUrl;
    shortlistDetails[listingId].customImage = true;

    await setStore({ [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails });
    
    log("Custom image set for listing:", listingId, imageUrl);
  }

  function findListingIdForImage(imageUrl) {
    const urlMatch = window.location.pathname.match(/\/rooms\/(\d+)/);
    if (urlMatch) {
      return "listing_" + urlMatch[1];
    }

    const imgElements = document.querySelectorAll(`img[src="${imageUrl}"], img[data-original-uri="${imageUrl}"]`);
    
    for (const img of imgElements) {
      let element = img;
      let attempts = 0;
      
      while (element && attempts < 20) {
        if (element.matches && element.matches(CARD_SELECTOR)) {
          const listingId = getListingId(element);
          if (listingId) {
            return listingId;
          }
        }
        element = element.parentElement;
        attempts++;
      }
    }

    return null;
  }

  function extractBookingPeriodFromURL(urlString) {
    try {
      const url = new URL(urlString || window.location.href);
      let checkin = url.searchParams.get('check_in');
      let checkout = url.searchParams.get('check_out');
      
      if (!checkin) checkin = url.searchParams.get('checkin');
      if (!checkout) checkout = url.searchParams.get('checkout');
      
      if (checkin && checkout) {
        return { checkin, checkout };
      }
    } catch (e) {}
    return null;
  }

  function getListingUrlFromCard(card) {
    const link = card.querySelector("a[href*='/rooms/']");
    if (link) {
      return link.href;
    }
    return null;
  }

  function extractPropertyIdFromImageUrl(imgUrl) {
    if (!imgUrl) return null;
    const match = imgUrl.match(/\/(\d{10,})\//);
    if (match) return match[1];
    return null;
  }

  function isPropertyImage(imgUrl, expectedPropertyId) {
    if (!imgUrl) return false;
    if (!imgUrl.includes('muscache')) return false;
    if (imgUrl.includes('/icons/')) return false;
    if (imgUrl.includes('/static/')) return false;
    
    if (expectedPropertyId) {
      return imgUrl.includes('/' + expectedPropertyId + '/');
    }
    
    const extractedId = extractPropertyIdFromImageUrl(imgUrl);
    return extractedId && extractedId.length >= 10;
  }

  function extractImagesFromCard(card) {
    const images = [];
    const listingId = getListingId(card);
    const propertyId = listingId ? listingId.replace('listing_', '') : null;
    
    const imgElements = card.querySelectorAll('img');
    imgElements.forEach(img => {
      const imgUrl = img.getAttribute('data-original-uri') || img.src;
      if (isPropertyImage(imgUrl, propertyId) && !images.includes(imgUrl)) {
        images.push(imgUrl);
      }
    });
    
    return images;
  }

  function isStrikethrough(element) {
    try {
      const style = window.getComputedStyle(element);
      return (style.textDecorationLine && style.textDecorationLine.includes('line-through')) || 
             (style.textDecoration && style.textDecoration.includes('line-through'));
    } catch (e) {
      return false;
    }
  }

  function containsStrikethrough(element) {
    if (!element.children || element.children.length === 0) return false;
    const allDescendants = element.querySelectorAll('*');
    for (const descendant of allDescendants) {
      if (isStrikethrough(descendant)) return true;
    }
    return false;
  }

  function extractPriceFromCard(card) {
    const priceSpans = card.querySelectorAll('span');
    for (const span of priceSpans) {
      const text = span.textContent.trim();
      if ((/^[\$€£¥₹][\d,\s.]+/.test(text) || 
          /^[\d,\s.]+\s*(kr|zł|Kč|HUF|CHF|SEK|NOK|DKK)/.test(text) || 
          /^Ft[\d,\s.]+/.test(text)) &&
          !isStrikethrough(span) &&
          !containsStrikethrough(span)) {
        return text;
      }
    }
    
    const priceDiv = card.querySelector('[class*="price"]');
    if (priceDiv) {
      const text = priceDiv.textContent.trim();
      const match = text.match(/[\$€£¥₹][\d,\s.]+|[\d,\s.]+\s*(?:kr|zł|Kč|HUF|CHF|SEK|NOK|DKK)|Ft[\d,\s.]+/);
      if (match && !isStrikethrough(priceDiv) && !containsStrikethrough(priceDiv)) return match[0];
    }
    
    return null;
  }

  function extractDetailsFromCard(card) {
    const listingUrl = getListingUrlFromCard(card);
    const bookingPeriod = extractBookingPeriodFromURL(listingUrl);
    const images = extractImagesFromCard(card);
    const price = extractPriceFromCard(card);
    
    return {
      addedAt: new Date().toISOString(),
      url: listingUrl,
      price: price,
      rating: null,
      reviewCount: null,
      imageUrl: images.length > 0 ? images[0] : null,
      images: images,
      selfCheckin: null,
      freeCancellation: null,
      bookingPeriod: bookingPeriod,
      amenityCodes: [],
      beds: {},
      extractedFromPage: false
    };
  }

  function extractPriceFromPage() {
    const selectors = [
      '[data-testid="book-it-default"] span',
      '._wgmchy span',
      '._1k1ce2w span'
    ];
    
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        const text = el.textContent.trim();
        if ((/^[\$€£¥₹][\d,\s.]+$/.test(text) || 
            /^[\d,\s.]+\s*(?:kr|zł|Kč|HUF|CHF|SEK|NOK|DKK|€|£|\$)$/.test(text) || 
            /^Ft[\d,\s.]+$/.test(text)) &&
            !isStrikethrough(el) &&
            !containsStrikethrough(el)) {
          return text;
        }
      }
    }
    
    const bookItSection = document.querySelector('[data-testid="book-it-default"]');
    if (bookItSection) {
      const allSpans = bookItSection.querySelectorAll('span');
      for (const span of allSpans) {
        const text = span.textContent.trim();
        const match = text.match(/^([\$€£¥₹][\d,\s.]+)$|^([\d,\s.]+\s*(?:kr|zł|Kč|HUF|CHF|SEK|NOK|DKK))$|^(Ft[\d,\s.]+)$/);
        if (match && !isStrikethrough(span) && !containsStrikethrough(span)) {
          return match[1] || match[2] || match[3];
        }
      }
    }
    
    return null;
  }

  function extractRatingFromPage() {
    let rating = null;
    let reviewCount = null;
    
    const guestFavRatingContainer = document.querySelector('[data-testid="pdp-reviews-highlight-banner-host-rating"]');
    if (guestFavRatingContainer) {
      const ratingDiv = guestFavRatingContainer.querySelector('div[aria-hidden="true"]');
      if (ratingDiv) {
        const ratingText = ratingDiv.textContent.trim();
        const ratingValue = parseFloat(ratingText);
        if (!isNaN(ratingValue) && ratingValue > 0 && ratingValue <= 5) {
          rating = ratingValue;
        }
      }
    }
    
    if (!rating) {
      const regularRatingEl = document.querySelector('.rmtgcc3[aria-hidden="true"]');
      if (regularRatingEl) {
        const ratingText = regularRatingEl.textContent.trim();
        const ratingValue = parseFloat(ratingText);
        if (!isNaN(ratingValue) && ratingValue > 0 && ratingValue <= 5) {
          rating = ratingValue;
        }
      }
    }
    
    if (!rating) {
      const srOnlyRating = document.querySelector('span.a8jt5op');
      if (srOnlyRating) {
        const text = srOnlyRating.textContent;
        const match = text.match(/Rated\s+([\d.]+)\s+out\s+of\s+5/i);
        if (match) {
          const val = parseFloat(match[1]);
          if (!isNaN(val) && val > 0 && val <= 5) {
            rating = val;
          }
        }
      }
    }
    
    const guestFavReviewContainer = document.querySelector('[data-testid="pdp-reviews-highlight-banner-host-review"]');
    if (guestFavReviewContainer) {
      const reviewCountDiv = guestFavReviewContainer.querySelector('.rn4plgm[aria-hidden="true"]');
      if (reviewCountDiv) {
        const countText = reviewCountDiv.textContent.trim();
        const countValue = parseInt(countText.replace(/,/g, ''));
        if (!isNaN(countValue)) {
          reviewCount = countValue;
        }
      }
      
      if (!reviewCount) {
        const srOnlyReview = guestFavReviewContainer.querySelector('span.a8jt5op');
        if (srOnlyReview) {
          const text = srOnlyReview.textContent;
          const match = text.match(/(\d+)\s*reviews?/i);
          if (match) {
            reviewCount = parseInt(match[1]);
          }
        }
      }
    }
    
    if (!reviewCount) {
      const reviewLink = document.querySelector('a[href*="/reviews"]');
      if (reviewLink) {
        const text = reviewLink.textContent;
        const match = text.match(/(\d+)\s*reviews?/i);
        if (match) {
          reviewCount = parseInt(match[1]);
        }
      }
    }
    
    return { rating, reviewCount };
  }

  function extractImagesFromPage() {
    const images = [];
    
    const heroSelectors = [
      '._skzmvy img',
      '[data-section-id="HERO_DEFAULT"] img',
      '[data-plugin-in-point-id="HERO_DEFAULT"] img',
      '[data-testid="photo-viewer"] img',
      'button[data-testid*="photo"] img'
    ];
    
    for (const selector of heroSelectors) {
      const imgElements = document.querySelectorAll(selector);
      imgElements.forEach((imgEl, index) => {
        if (index < 5) {
          const imgUrl = imgEl.getAttribute('data-original-uri') || imgEl.src;
          if (imgUrl && imgUrl.includes('muscache') && !images.includes(imgUrl)) {
            images.push(imgUrl);
          }
        }
      });
      
      if (images.length > 0) break;
    }
    
    if (images.length === 0) {
      const allImages = document.querySelectorAll('img[src*="muscache"]');
      allImages.forEach((imgEl, index) => {
        if (index < 5 && images.length < 5) {
          const imgUrl = imgEl.getAttribute('data-original-uri') || imgEl.src;
          if (imgUrl && !images.includes(imgUrl) && !imgUrl.includes('/icons/') && !imgUrl.includes('/static/')) {
            const propertyIdMatch = imgUrl.match(/\/(\d{10,})\//);
            if (propertyIdMatch) {
              images.push(imgUrl);
            }
          }
        }
      });
    }
    
    return images;
  }

  function extractAmenityCodesFromPage() {
    const availableCodes = [];
    const unavailableCodes = [];
    
    const allElementsWithId = document.querySelectorAll('[id^="pdp_"]');
    
    allElementsWithId.forEach(el => {
      const id = el.id;
      
      const isUnavailable = id.includes('unavailable');
      
      const match = id.match(/_(\d{1,3})_(\d{16,})/);
      
      if (match) {
        const amenityCode = parseInt(match[1]);
        
        if (!isNaN(amenityCode) && amenityCode > 0 && amenityCode < 1000) {
          if (isUnavailable) {
            if (!unavailableCodes.includes(amenityCode)) {
              unavailableCodes.push(amenityCode);
            }
          } else {
            if (!availableCodes.includes(amenityCode)) {
              availableCodes.push(amenityCode);
            }
          }
        }
      }
    });
    
    const finalCodes = availableCodes.filter(code => !unavailableCodes.includes(code));
    
    return finalCodes;
  }

  function extractCancellationInfo() {
    const targetSelectors = ['.cfdy3dj', '.cmrrfxs'];
    let container = null;

    for (const sel of targetSelectors) {
       const el = document.querySelector(sel);
       if (el) {
          container = el;
          break;
       }
    }

    if (!container) return null;

    const text = container.textContent;
    
    const regex = new RegExp(`(?:(\\d{1,2})\\.?\\s+(?:de\\s+)?(${MONTHS_REGEX}))|(?:(${MONTHS_REGEX})\\s+(\\d{1,2})\\.?)`, 'i');
    
    const match = text.match(regex);
    
    if (match) {
        let day, month;
        if (match[1] && match[2]) {
            day = match[1];
            month = match[2];
        } else if (match[3] && match[4]) {
            month = match[3];
            day = match[4];
        }
        
        if (day && month) {
           const monthCap = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
           return `${day} ${monthCap}`;
        }
    }
    
    return null;
  }

  function extractBedData() {
    const bedTypes = ['king', 'queen', 'double', 'sofa', 'bunk', 'single'];
    const counts = { king: 0, queen: 0, double: 0, sofa: 0, bunk: 0, single: 0 };
    
    let searchScope = document.body;
    const sleepingSection = document.querySelector('[data-section-id="SLEEPING_ARRANGEMENT_DEFAULT"]');
    if (sleepingSection) {
      searchScope = sleepingSection;
    }

    const text = searchScope.innerText;
    const regex = new RegExp(`(?:(\\d+)\\s*)?(${bedTypes.join('|')})\\s*beds?`, 'gi');
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      const count = match[1] ? parseInt(match[1]) : 1;
      const type = match[2].toLowerCase();
      if (counts.hasOwnProperty(type)) {
        counts[type] += count;
      }
    }
    
    return counts;
  }

  function extractFullDetailsFromPage() {
    const isAmenitiesPage = window.location.pathname.includes('/amenities');
    
    const details = {
      price: null,
      rating: null,
      reviewCount: null,
      imageUrl: null,
      images: [],
      selfCheckin: false,
      freeCancellation: null,
      bookingPeriod: extractBookingPeriodFromURL(window.location.href),
      url: window.location.href.replace('/amenities', ''),
      amenityCodes: [],
      extractedFromPage: isAmenitiesPage,
      hasNetflix: false,
      beds: {}
    };

    details.price = extractPriceFromPage();

    const ratingInfo = extractRatingFromPage();
    details.rating = ratingInfo.rating;
    details.reviewCount = ratingInfo.reviewCount;

    details.images = extractImagesFromPage();
    if (details.images.length > 0) {
      details.imageUrl = details.images[0];
    }

    const amenityCodes = extractAmenityCodesFromPage();
    details.amenityCodes = amenityCodes;

    for (const code of AMENITY_GROUPS.checkin) {
      if (amenityCodes.includes(code)) {
        details.selfCheckin = true;
        break;
      }
    }

    details.freeCancellation = extractCancellationInfo();

    details.beds = extractBedData();

    const pageText = document.body.innerText.toLowerCase();
    if (pageText.includes('netflix')) {
      const amenitySections = document.querySelectorAll('[data-section-id*="AMENITIES"], [id*="amenities"]');
      for (const section of amenitySections) {
        if (section.textContent.toLowerCase().includes('netflix')) {
          details.hasNetflix = true;
          break;
        }
      }
      
      if (!details.hasNetflix) {
        const allElementsWithId = document.querySelectorAll('[id^="pdp_"]');
        for (const el of allElementsWithId) {
          if (el.textContent.toLowerCase().includes('netflix') && !el.id.includes('unavailable')) {
            details.hasNetflix = true;
            break;
          }
        }
      }
    }

    return details;
  }

  async function addToShortlist(listingId, card = null) {
    let details;
    
    if (card) {
      details = extractDetailsFromCard(card);
      
      if (settings.autoRetrieveEnabled && details.url) {
        const amenitiesUrl = ensureAmenitiesUrl(details.url);
        chrome.runtime.sendMessage({
          action: "openHiddenTabForExtraction",
          listingId: listingId,
          url: amenitiesUrl
        });
      }
    } else {
      details = extractFullDetailsFromPage();
      details.addedAt = new Date().toISOString();
    }
    
    if (shortlistDetails[listingId] && shortlistDetails[listingId].customImage) {
      const customImages = shortlistDetails[listingId].images || [];
      if (customImages.length > 0) {
        details.images = [...customImages];
      }
      details.imageUrl = shortlistDetails[listingId].imageUrl;
      details.customImage = true;
    }
    
    shortlistDetails[listingId] = Object.assign({}, shortlistDetails[listingId] || {}, details);
    await setStore({ [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails });
  }

  async function removeFromShortlist(listingId) {
    delete shortlistDetails[listingId];
    await setStore({ [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails });
  }

  function updateGlowColorCSS(color) {
    let styleEl = document.getElementById('airbxb-glow-style');
    if (styleEl) {
      styleEl.remove();
    }

    styleEl = document.createElement('style');
    styleEl.id = 'airbxb-glow-style';
    
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    styleEl.textContent = `
      .airbxb-card-shortlisted {
        box-shadow: 
          0 0 0 2px rgba(${r}, ${g}, ${b}, 0.8),
          0 0 8px 2px rgba(${r}, ${g}, ${b}, 0.6),
          0 0 16px 4px rgba(${r}, ${g}, ${b}, 0.4),
          0 0 24px 6px rgba(${r}, ${g}, ${b}, 0.2),
          0 0 32px 8px rgba(${r}, ${g}, ${b}, 0.1) !important;
        border-radius: 12px;
        transition: box-shadow 0.3s ease;
      }
      
      .airbxb-shortlist-btn.airbxb-active:not(.airbxb-map-btn) {
        background: rgba(${r}, ${g}, ${b}, 0.85) !important;
      }
      
      .airbxb-shortlist-btn.airbxb-active:hover:not(.airbxb-map-btn) {
        background: rgba(${r}, ${g}, ${b}, 0.95) !important;
      }
      
      .airbxb-map-btn.airbxb-shortlist-btn.airbxb-active {
        background: rgb(${r}, ${g}, ${b}) !important;
      }
      
      .airbxb-map-btn.airbxb-shortlist-btn.airbxb-active svg {
        stroke: rgb(255, 255, 255) !important;
      }
      
      .airbxb-listing-btn.shortlist-active {
        color: rgb(${r}, ${g}, ${b}) !important;
      }
      
      .airbxb-listing-btn.shortlist-active svg {
        stroke: rgb(${r}, ${g}, ${b});
      }
    `;
    
    document.head.appendChild(styleEl);
  }

  function scheduleScan() {
    if (scanScheduled) return;
    scanScheduled = true;
    setTimeout(() => {
      scanScheduled = false;
      scanAndEnhance();
    }, 120);
  }

  function upgradeImagesToHiRes(card) {
    const imgs = card.querySelectorAll("img");
    imgs.forEach(img => {
      if (img.src && img.src.includes("?im_w=")) {
        img.src = img.src.replace(/\?im_w=\d+/, "");
      }
      if (img.srcset && img.srcset.includes("?im_w=")) {
        img.srcset = img.srcset.replace(/\?im_w=\d+/g, "");
      }
      
      const pic = img.parentElement;
      if (pic && pic.tagName === "PICTURE") {
        const sources = pic.querySelectorAll("source");
        sources.forEach(source => {
            if (source.srcset && source.srcset.includes("?im_w=")) {
                source.srcset = source.srcset.replace(/\?im_w=\d+/g, "");
            }
        });
      }
    });
  }

  function scanAndEnhance() {
    const cards = document.querySelectorAll(CARD_SELECTOR);
    log("scan", cards.length);
    cards.forEach((card) => {
      ensureButtons(card);
      applyActionToCard(card);
      
      if (settings.hiResImages) {
        upgradeImagesToHiRes(card);
      }
    });
    
    updateSimilarBlocks();
    updateSplitStays();
  }

  function updateSimilarBlocks() {
    const similarBlocks = document.querySelectorAll(SIMILAR_BLOCK_SELECTOR);
    similarBlocks.forEach((block) => {
      let container = block.closest('[data-pageslot="true"]');
      if (!container) {
        container = block.closest('.f1rykmw3');
      }
      if (!container) {
        container = block.parentElement?.parentElement?.parentElement;
      }
      
      if (container) {
        if (settings.hideSimilarBlocks) {
          container.classList.add('airbxb-similar-hide');
        } else {
          container.classList.remove('airbxb-similar-hide');
        }
      }
    });
  }

  function updateSplitStays() {
    const splitStays = document.querySelectorAll(SPLIT_STAYS_SELECTOR);
    splitStays.forEach((splitStay) => {
      if (settings.hideSplitStays) {
        splitStay.classList.add('airbxb-split-stays-hide');
      } else {
        splitStay.classList.remove('airbxb-split-stays-hide');
      }
    });
    
    const splitStayContainers = document.querySelectorAll('[data-section-id*="SPLIT_STAY"]');
    splitStayContainers.forEach((container) => {
      if (settings.hideSplitStays) {
        container.classList.add('airbxb-split-stays-hide');
      } else {
        container.classList.remove('airbxb-split-stays-hide');
      }
    });
    
    const ht87d5eElements = document.querySelectorAll(HT87D5E_SELECTOR);
    ht87d5eElements.forEach((element) => {
      if (settings.hideSplitStays) {
        element.classList.add('airbxb-split-stays-hide');
      } else {
        element.classList.remove('airbxb-split-stays-hide');
      }
    });
  }

  function getCurrentListingId() {
    if (currentListingId) return currentListingId;
    
    const urlMatch = window.location.pathname.match(/\/rooms\/(\d+)/);
    if (urlMatch) {
      currentListingId = "listing_" + urlMatch[1];
      return currentListingId;
    }
    
    return null;
  }

  function initListingPageButtons() {
    log("Attempting to init listing page buttons...");
    
    const titleSection = document.querySelector(TITLE_SECTION_SELECTOR);
    log("Title section found:", !!titleSection);
    
    if (!titleSection) {
      log("No title section, not a listing page");
      return;
    }
    
    if (titleSection.querySelector('.airbxb-listing-btn')) {
      log("Buttons already exist, skipping");
      return;
    }
    
    const listingId = getCurrentListingId();
    log("Listing ID:", listingId);
    
    if (!listingId) {
      log("Could not determine listing ID");
      return;
    }
    
    const shortlistBtn = createListingButton('shortlist', listingId);
    const hideBtn = createListingButton('hide', listingId);
    
    const buttonContainer = titleSection.querySelector('.s1fsx08p, ._4c6tf4');
    
    if (buttonContainer) {
      log("Button container found:", buttonContainer.className);
      
      const shareButton = buttonContainer.querySelector('._3hmsj, button[class*="_3hmsj"]');
      
      if (shareButton) {
        log("Share button found, inserting before it");
        shareButton.parentNode.insertBefore(hideBtn, shareButton);
        shareButton.parentNode.insertBefore(shortlistBtn, shareButton);
      } else {
        log("Share button not found, appending to container");
        buttonContainer.insertBefore(hideBtn, buttonContainer.firstChild);
        buttonContainer.insertBefore(shortlistBtn, buttonContainer.firstChild);
      }
    } else {
      log("Button container not found, using fallback");
      
      const s1fsx08p = titleSection.querySelector('.s1fsx08p');
      if (s1fsx08p) {
        s1fsx08p.appendChild(shortlistBtn);
        s1fsx08p.appendChild(hideBtn);
      } else {
        const tuj3gk2 = titleSection.querySelector('.tuj3gk2');
        if (tuj3gk2) {
          const newContainer = document.createElement('div');
          newContainer.className = 's1fsx08p atm_ax_idpfg4 atm_e2_1f4h9lt dir dir-ltr';
          newContainer.appendChild(shortlistBtn);
          newContainer.appendChild(hideBtn);
          tuj3gk2.appendChild(newContainer);
        }
      }
    }
    
    updateHeroSection(listingId);
  }

  function createListingButton(type, listingId) {
    const isShortlist = type === 'shortlist';
    const btn = document.createElement('button');
    btn.className = `airbxb-listing-btn airbxb-listing-${type}`;
    btn.type = 'button';
    
    if (isShortlist) {
      btn.innerHTML = `
        <div class="_5kaapu">
          <span class="_14tkmhr">
            <svg viewBox="0 0 87.9 87.9" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; overflow: visible;">
              <polyline points="25 39.3 40.1 55.7 78.3 17.6"/>
              <path d="M79.7,44.4c0,20.3-16.5,36.8-36.8,36.8S6.1,64.7,6.1,44.4,22.6,7.6,42.9,7.6"/>
            </svg>
          </span>
          Shortlist
        </div>
      `;
      
      if (shortlistedSet.has(listingId)) {
        btn.classList.add('shortlist-active');
      }
      
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (shortlistedSet.has(listingId)) {
          shortlistedSet.delete(listingId);
          btn.classList.remove('shortlist-active');
          await removeFromShortlist(listingId);
        } else {
          shortlistedSet.add(listingId);
          btn.classList.add('shortlist-active');
          await addToShortlist(listingId, null);
        }
        
        await setStore({ [STORAGE_KEYS.SHORTLISTED]: Array.from(shortlistedSet) });
      });
    } else {
      btn.innerHTML = `
        <div class="_5kaapu">
          <span class="_14tkmhr">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
              <path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9-14-9-14-9z"></path>
              <circle cx="16" cy="16" r="4"></circle>
              <path d="M3 3l26 26"></path>
            </svg>
          </span>
          Hide
        </div>
      `;
      
      if (blockedSet.has(listingId)) {
        btn.classList.add('hide-active');
      }
      
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const heroSection = document.querySelector(HERO_SECTION_SELECTOR);
        
        if (blockedSet.has(listingId)) {
          blockedSet.delete(listingId);
          btn.classList.remove('hide-active');
          if (heroSection) {
            heroSection.classList.remove('airbxb-hero-greyed');
          }
        } else {
          blockedSet.add(listingId);
          btn.classList.add('hide-active');
          if (heroSection) {
            heroSection.classList.add('airbxb-hero-greyed');
          }
        }
        
        await setStore({ [STORAGE_KEYS.BLOCKED]: Array.from(blockedSet) });
      });
    }
    
    return btn;
  }

  function updateListingPageButtons() {
    const listingId = getCurrentListingId();
    if (!listingId) return;
    
    const shortlistBtn = document.querySelector('.airbxb-listing-shortlist');
    const hideBtn = document.querySelector('.airbxb-listing-hide');
    
    if (shortlistBtn) {
      if (shortlistedSet.has(listingId)) {
        shortlistBtn.classList.add('shortlist-active');
      } else {
        shortlistBtn.classList.remove('shortlist-active');
      }
    }
    
    if (hideBtn) {
      if (blockedSet.has(listingId)) {
        hideBtn.classList.add('hide-active');
      } else {
        hideBtn.classList.remove('hide-active');
      }
    }
    
    updateHeroSection(listingId);
  }

  function updateHeroSection(listingId) {
    const heroSection = document.querySelector(HERO_SECTION_SELECTOR);
    if (!heroSection || !listingId) return;
    
    if (blockedSet.has(listingId)) {
      heroSection.classList.add('airbxb-hero-greyed');
    } else {
      heroSection.classList.remove('airbxb-hero-greyed');
    }
  }

  function isMapCard(card) {
    const saveBtn = card.querySelector(SAVE_BTN_SELECTOR);
    if (!saveBtn) return false;
    
    const container = saveBtn.closest('.ts9x1g6') || saveBtn.closest('.t1r2duip');
    if (!container) return false;
    
    const closeBtn = card.querySelector('[data-testid="listing-card-close-button"]');
    return !!closeBtn;
  }
  
  function isCompactCard(card) {
    const saveBtn = card.querySelector(SAVE_BTN_SELECTOR);
    if (!saveBtn) return false;
    
    const container = saveBtn.closest('.t1r2duip');
    if (!container) return false;
    
    const closeBtn = card.querySelector('[data-testid="listing-card-close-button"]');
    return !closeBtn;
  }

  function matchAirbnbButtonSize(ourButton, airbnbButton) {
    if (!airbnbButton) return;
    
    const computedStyle = window.getComputedStyle(airbnbButton);
    const width = computedStyle.width;
    const height = computedStyle.height;
    
    ourButton.style.width = width;
    ourButton.style.height = height;
    
    const airbnbSvg = airbnbButton.querySelector('svg');
    const ourSvg = ourButton.querySelector('svg');
    
    if (airbnbSvg && ourSvg) {
      const svgStyle = window.getComputedStyle(airbnbSvg);
      const svgWidth = svgStyle.width;
      const svgHeight = svgStyle.height;
      
      ourSvg.style.width = svgWidth;
      ourSvg.style.height = svgHeight;
    }
  }

  function ensureButtons(card) {
    if (!card || card.nodeType !== 1) return;
    if (card.querySelector(".airbxb-dislike-btn")) return;

    const saveBtn = card.querySelector(SAVE_BTN_SELECTOR);
    const isMap = isMapCard(card);
    const isCompact = isCompactCard(card);

    if (saveBtn) {
      if (isMap) {
        injectButtons(card, "map", saveBtn);
      } else if (isCompact) {
        injectButtons(card, "compact", saveBtn);
      } else {
        injectButtons(card, "under-save", saveBtn);
      }
      return;
    }

    injectButtons(card, "fallback");

    if (!card.__airbxbSaveWatch) {
      const obs = new MutationObserver(() => {
        const sb = card.querySelector(SAVE_BTN_SELECTOR);
        const dislikeBtn = card.querySelector(".airbxb-dislike-btn");
        const shortlistBtn = card.querySelector(".airbxb-shortlist-btn");
        if (sb && dislikeBtn && shortlistBtn) {
          try {
            const isMapAfter = isMapCard(card);
            const isCompactAfter = isCompactCard(card);
            
            if (isMapAfter) {
              const container = sb.parentNode;
              container.insertBefore(dislikeBtn, sb);
              container.insertBefore(shortlistBtn, sb);
              
              shortlistBtn.classList.add('airbxb-map-btn');
              dislikeBtn.classList.add('airbxb-map-btn');
              
              matchAirbnbButtonSize(shortlistBtn, sb);
              matchAirbnbButtonSize(dislikeBtn, sb);
            } else if (isCompactAfter) {
              shortlistBtn.classList.add('airbxb-compact-btn');
              dislikeBtn.classList.add('airbxb-compact-btn');
            } else {
              const wrapper = document.createElement('div');
              wrapper.className = 'airbxb-btn-wrapper';
              
              sb.parentNode.insertBefore(wrapper, sb);
              wrapper.appendChild(sb);
              wrapper.appendChild(shortlistBtn);
              wrapper.appendChild(dislikeBtn);
              
              shortlistBtn.classList.remove('airbxb-map-btn', 'airbxb-compact-btn');
              dislikeBtn.classList.remove('airbxb-map-btn', 'airbxb-compact-btn');
            }

            const slot = card.querySelector(".airbxb-slot");
            if (slot) slot.remove();
            dislikeBtn.classList.remove("airbxb-fallback");
            shortlistBtn.classList.remove("airbxb-fallback");
          } catch (e) {
            if(DEBUG) console.error("[AirbXb] Error moving buttons:", e);
          }
          obs.disconnect();
          card.__airbxbSaveWatch = null;
        }
      });
      obs.observe(card, { childList: true, subtree: true });
      card.__airbxbSaveWatch = obs;

      setTimeout(() => {
        if (card.__airbxbSaveWatch) {
          card.__airbxbSaveWatch.disconnect();
          card.__airbxbSaveWatch = null;
        }
      }, 20000);
    }
  }

  function getSvgForButton(type, isMap) {
    const strokeColor = isMap ? "currentColor" : "white";
    const size = isMap ? "100%" : "13px";
    
    if (type === 'shortlist') {
      return `<svg viewBox="0 0 87.9 87.9" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: ${size}; width: ${size}; stroke: ${strokeColor}; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; overflow: visible;">
        <polyline points="25 39.3 40.1 55.7 78.3 17.6"></polyline>
        <path d="M79.7,44.4c0,20.3-16.5,36.8-36.8,36.8S6.1,64.7,6.1,44.4,22.6,7.6,42.9,7.6"></path>
      </svg>`;
    } else {
      return `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: ${size}; width: ${size}; stroke: ${strokeColor}; stroke-width: 2; overflow: visible;">
        <path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9-14-9-14-9z"></path>
        <circle cx="16" cy="16" r="4"></circle>
        <path d="M3 3l26 26"></path>
      </svg>`;
    }
  }

  function injectButtons(card, mode, saveBtn) {
    if (card.querySelector(".airbxb-dislike-btn")) return;

    const isMap = mode === "map";
    const isCompact = mode === "compact";

    const shortlistBtn = document.createElement("button");
    shortlistBtn.className = isMap ? "airbxb-shortlist-btn airbxb-map-btn" : 
                             isCompact ? "airbxb-shortlist-btn airbxb-compact-btn" : 
                             "airbxb-shortlist-btn";
    shortlistBtn.type = "button";
    shortlistBtn.title = "Add to shortlist";
    shortlistBtn.setAttribute("aria-label", "Add to shortlist");

    shortlistBtn.innerHTML = getSvgForButton('shortlist', isMap);

    shortlistBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = getListingId(card);
      if (!id) return;
      
      if (shortlistedSet.has(id)) {
        shortlistedSet.delete(id);
        await removeFromShortlist(id);
      } else {
        shortlistedSet.add(id);
        await addToShortlist(id, card);
      }
      
      await setStore({ [STORAGE_KEYS.SHORTLISTED]: Array.from(shortlistedSet) });
    });

    const dislikeBtn = document.createElement("button");
    dislikeBtn.className = isMap ? "airbxb-dislike-btn airbxb-map-btn" : 
                            isCompact ? "airbxb-dislike-btn airbxb-compact-btn" :
                            "airbxb-dislike-btn";
    dislikeBtn.type = "button";
    dislikeBtn.title = "Hide this listing";
    dislikeBtn.setAttribute("aria-label", "Hide this listing");

    dislikeBtn.innerHTML = getSvgForButton('hide', isMap);

    dislikeBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = getListingId(card);
      if (!id) return;
      if (blockedSet.has(id)) blockedSet.delete(id);
      else blockedSet.add(id);
      await setStore({ [STORAGE_KEYS.BLOCKED]: Array.from(blockedSet) });
    });

    if (isMap && saveBtn) {
      const container = saveBtn.parentNode;
      container.insertBefore(dislikeBtn, saveBtn);
      container.insertBefore(shortlistBtn, saveBtn);
      
      matchAirbnbButtonSize(shortlistBtn, saveBtn);
      matchAirbnbButtonSize(dislikeBtn, saveBtn);
    } else if (isCompact && saveBtn) {
      const container = saveBtn.parentNode;
      if (!container.style.position || container.style.position === 'static') {
        container.style.position = 'relative';
      }
      container.appendChild(shortlistBtn);
      container.appendChild(dislikeBtn);
    } else if (mode === "under-save" && saveBtn) {
      const wrapper = document.createElement('div');
      wrapper.className = 'airbxb-btn-wrapper';

      saveBtn.parentNode.insertBefore(wrapper, saveBtn);
      wrapper.appendChild(saveBtn);
      wrapper.appendChild(shortlistBtn);
      wrapper.appendChild(dislikeBtn);
    } else {
      const slot = ensureFallbackSlot(card);
      slot.appendChild(shortlistBtn);
      slot.appendChild(dislikeBtn);
      shortlistBtn.classList.add("airbxb-fallback");
      dislikeBtn.classList.add("airbxb-fallback");
    }

    const id = getListingId(card);
    if (id) {
      if (blockedSet.has(id)) dislikeBtn.classList.add("airbxb-active");
      if (shortlistedSet.has(id)) shortlistBtn.classList.add("airbxb-active");
    }
  }

  function ensureFallbackSlot(card) {
    const cs = getComputedStyle(card);
    if (cs.position === "static") card.classList.add("airbxb-card-rel");
    let slot = card.querySelector(".airbxb-slot");
    if (!slot) {
      slot = document.createElement("div");
      slot.className = "airbxb-slot";
      card.appendChild(slot);
    }
    return slot;
  }

  function getListingId(card) {
    const a1 = card.querySelector("a[target^='listing_']");
    if (a1) return a1.getAttribute("target");
    const a2 = card.querySelector("a[href*='/rooms/']");
    if (a2) {
      const m = a2.getAttribute("href").match(/\/rooms\/(\d+)/);
      if (m) return "listing_" + m[1];
    }
    return null;
  }

  function applyActionToCard(card) {
    const id = getListingId(card);
    const isBlocked = !!(id && blockedSet.has(id));
    const isShortlisted = !!(id && shortlistedSet.has(id));

    const dislikeBtn = card.querySelector(".airbxb-dislike-btn");
    const shortlistBtn = card.querySelector(".airbxb-shortlist-btn");
    
    if (dislikeBtn) dislikeBtn.classList.toggle("airbxb-active", isBlocked);
    if (shortlistBtn) shortlistBtn.classList.toggle("airbxb-active", isShortlisted);

    card.classList.remove("airbxb-card-grey", "airbxb-card-grey-map", "airbxb-card-hide", "airbxb-card-shortlisted");
    
    const gridItem = card.closest('.c965t3n');
    if (gridItem) {
      gridItem.classList.remove("airbxb-card-grey", "airbxb-card-grey-map", "airbxb-card-hide");
    }

    if (isShortlisted) {
      card.classList.add("airbxb-card-shortlisted");
    }

    if (!settings.enabled || !isBlocked) return;

    const isMap = isMapCard(card);
    
    if (isMap) {
      card.classList.add("airbxb-card-grey-map");
    } else {
      const mode = settings.mode;
      if (mode === "grey" || mode === "greyout") {
        if (gridItem) {
          gridItem.classList.add("airbxb-card-grey");
        } else {
          card.classList.add("airbxb-card-grey");
        }
      } else {
        if (gridItem) {
          gridItem.classList.add("airbxb-card-hide");
        } else {
          card.classList.add("airbxb-card-hide");
        }
      }
    }
  }

  function updateAllCards() {
    document.querySelectorAll(CARD_SELECTOR).forEach(applyActionToCard);
  }

  init();
})();
