

chrome.runtime.onInstalled.addListener(async () => {
  const { airbxbSettings, airbxbBlocked, airbxbShortlisted, airbxbShortlistDetails, airbxbViewerSettings, airbxbTrips } = await chrome.storage.local.get([
    "airbxbSettings",
    "airbxbBlocked",
    "airbxbShortlisted",
    "airbxbShortlistDetails",
    "airbxbViewerSettings",
    "airbxbTrips"
  ]);

  if (!airbxbSettings) {
    await chrome.storage.local.set({
      airbxbSettings: { 
        enabled: true, 
        mode: "hide",
        glowColor: "#FF8C00",
        hideSimilarBlocks: false,
        hideSplitStays: false,
        autoRetrieveEnabled: false
      }
    });
  }
  if (!airbxbBlocked) {
    await chrome.storage.local.set({ airbxbBlocked: [] });
  }
  if (!airbxbShortlisted) {
    await chrome.storage.local.set({ airbxbShortlisted: [] });
  }
  if (!airbxbShortlistDetails) {
    await chrome.storage.local.set({ airbxbShortlistDetails: {} });
  }
  if (!airbxbViewerSettings) {
    await chrome.storage.local.set({ airbxbViewerSettings: { rowSize: 'medium', imageCount: 1 } });
  }
  if (!airbxbTrips) {
    await chrome.storage.local.set({ airbxbTrips: { trips: [], propertyTrips: {}, activeTrip: null } });
  }

  chrome.contextMenus.create({
    id: "airbxb-use-image",
    title: "Use picture for shortlist",
    contexts: ["image"],
    documentUrlPatterns: [
      "https://*.airbnb.com/*",
      "https://*.airbnb.co.uk/*",
      "https://*.airbnb.ca/*",
      "https://*.airbnb.fr/*",
      "https://*.airbnb.de/*",
      "https://*.airbnb.es/*",
      "https://*.airbnb.it/*",
      "https://*.airbnb.com.au/*",
      "https://*.airbnb.co.nz/*",
      "https://*.airbnb.com.sg/*",
      "https://*.airbnb.co.kr/*",
      "https://*.airbnb.jp/*",
      "https://*.airbnb.com.br/*",
      "https://*.airbnb.com.mx/*",
      "https://*.airbnb.ie/*",
      "https://*.airbnb.nl/*",
      "https://*.airbnb.com.hk/*",
      "https://*.airbnb.in/*",
      "https://*.airbnb.at/*",
      "https://*.airbnb.hu/*",
      "https://*.airbnb.cz/*",
      "https://*.airbnb.ch/*",
      "https://*.airbnb.pl/*",
      "https://*.airbnb.no/*",
      "https://*.airbnb.dk/*",
      "https://*.airbnb.pt/*",
      "https://*.airbnb.be/*",
      "https://*.airbnb.co.in/*",
      "https://*.airbnb.co.id/*",
      "https://*.airbnb.se/*",
      "https://*.airbnb.fi/*",
      "https://*.airbnb.co.za/*",
      "https://*.airbnb.lt/*",
      "https://*.airbnb.lv/*",
      "https://*.airbnb.rs/*",
      "https://*.airbnb.gr/*",
      "https://*.airbnb.is/*",
      "https://*.airbnb.com.ee/*",
      "https://*.airbnb.com.tr/*",
      "https://*.airbnb.com.tw/*",
      "https://*.airbnb.com.ph/*"
    ]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "airbxb-use-image") {
    chrome.tabs.sendMessage(tab.id, {
      action: "setCustomImage",
      imageUrl: info.srcUrl
    });
  }
});

let hiddenTabQueue = [];
let isProcessingHiddenTabs = false;
let retrievalProgress = { total: 0, completed: 0 };

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openHiddenTabForExtraction") {
    const amenitiesUrl = ensureAmenitiesUrl(message.url);
    queueHiddenTabExtraction(message.listingId, amenitiesUrl, message.isRefresh || false);
    sendResponse({ success: true });
    return true;
  }
  
  if (message.action === "hiddenTabExtractionComplete") {
    handleHiddenTabComplete(message.listingId, message.details, sender.tab.id);
    sendResponse({ success: true });
    return true;
  }
  
  if (message.action === "retrieveDataForListings") {
    processMultipleListings(message.listings, message.isRefresh || false);
    sendResponse({ success: true });
    return true;
  }

  if (message.action === "getRetrievalProgress") {
    sendResponse({ progress: retrievalProgress });
    return true;
  }

  return false;
});

function queueHiddenTabExtraction(listingId, url, isRefresh) {
  hiddenTabQueue.push({ listingId, url, isRefresh });
  if (!isProcessingHiddenTabs) {
    retrievalProgress = { total: hiddenTabQueue.length, completed: 0 };
  } else {
    retrievalProgress.total = retrievalProgress.completed + hiddenTabQueue.length;
  }
  sendProgressUpdate();
  processHiddenTabQueue();
}

async function processMultipleListings(listings, isRefresh) {
  retrievalProgress = { total: listings.length, completed: 0 };
  sendProgressUpdate();
  
  for (const listing of listings) {
    const amenitiesUrl = ensureAmenitiesUrl(listing.url);
    hiddenTabQueue.push({ 
      listingId: listing.listingId, 
      url: amenitiesUrl, 
      isRefresh 
    });
  }
  processHiddenTabQueue();
}

function sendProgressUpdate() {
  chrome.runtime.sendMessage({ 
    action: "retrievalProgress", 
    progress: retrievalProgress 
  }).catch(() => {});
}

async function processHiddenTabQueue() {
  if (isProcessingHiddenTabs || hiddenTabQueue.length === 0) {
    return;
  }
  
  isProcessingHiddenTabs = true;
  
  while (hiddenTabQueue.length > 0) {
    const { listingId, url, isRefresh } = hiddenTabQueue.shift();
    
    try {
      await openHiddenTabAndExtract(listingId, url, isRefresh);
      retrievalProgress.completed++;
      sendProgressUpdate();
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      console.error("[AirbXb] Error processing hidden tab:", err);
      retrievalProgress.completed++;
      sendProgressUpdate();
    }
  }
  
  isProcessingHiddenTabs = false;
  
  chrome.runtime.sendMessage({ action: "retrievalQueueEmpty" }).catch(() => {});
}

async function openHiddenTabAndExtract(listingId, url, isRefresh) {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ 
      url: url, 
      active: false,
      pinned: false
    }, (tab) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      
      const tabId = tab.id;
      const timeout = setTimeout(() => {
        chrome.tabs.onUpdated.removeListener(listener);
        chrome.tabs.remove(tabId).catch(() => {});
        reject(new Error("Timeout waiting for extraction"));
      }, 60000);
      
      const listener = (changedTabId, changeInfo) => {
        if (changedTabId === tabId && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          
          setTimeout(() => {
            attemptExtraction(tabId, listingId, isRefresh, 0, 3).then(() => {
              clearTimeout(timeout);
              setTimeout(() => {
                chrome.tabs.remove(tabId).catch(() => {});
                resolve();
              }, 500);
            }).catch((err) => {
              clearTimeout(timeout);
              chrome.tabs.remove(tabId).catch(() => {});
              reject(err);
            });
          }, 5000);
        }
      };
      
      chrome.tabs.onUpdated.addListener(listener);
    });
  });
}

async function attemptExtraction(tabId, listingId, isRefresh, attempt, maxAttempts) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { 
      action: "extractForHiddenTab",
      listingId: listingId,
      isRefresh: isRefresh
    }).then((response) => {
      if (response && response.success && response.hasData) {
        resolve();
      } else if (attempt < maxAttempts - 1) {
        setTimeout(() => {
          attemptExtraction(tabId, listingId, isRefresh, attempt + 1, maxAttempts)
            .then(resolve)
            .catch(reject);
        }, 3000);
      } else {
        resolve();
      }
    }).catch((err) => {
      if (attempt < maxAttempts - 1) {
        setTimeout(() => {
          attemptExtraction(tabId, listingId, isRefresh, attempt + 1, maxAttempts)
            .then(resolve)
            .catch(reject);
        }, 3000);
      } else {
        reject(err);
      }
    });
  });
}

async function handleHiddenTabComplete(listingId, details, tabId) {
  if (!details) return;
  
  const { airbxbShortlistDetails } = await chrome.storage.local.get("airbxbShortlistDetails");
  const shortlistDetails = airbxbShortlistDetails || {};
  
  const existingDetails = shortlistDetails[listingId] || {};
  
  const mergedDetails = {
    addedAt: existingDetails.addedAt || new Date().toISOString(),
    url: details.url || existingDetails.url,
    extractedFromPage: true
  };
  
  if (details.price && typeof details.price === 'string' && details.price.trim() !== '') {
    mergedDetails.price = details.price;
  } else if (existingDetails.price) {
    mergedDetails.price = existingDetails.price;
  }
  
  if (details.rating !== null && details.rating !== undefined && !isNaN(details.rating)) {
    mergedDetails.rating = details.rating;
  } else if (existingDetails.rating) {
    mergedDetails.rating = existingDetails.rating;
  }
  
  if (details.reviewCount !== null && details.reviewCount !== undefined && !isNaN(details.reviewCount)) {
    mergedDetails.reviewCount = details.reviewCount;
  } else if (existingDetails.reviewCount) {
    mergedDetails.reviewCount = existingDetails.reviewCount;
  }
  
  if (details.images && details.images.length > 0) {
    mergedDetails.images = details.images;
    mergedDetails.imageUrl = details.images[0];
  } else if (existingDetails.images && existingDetails.images.length > 0) {
    mergedDetails.images = existingDetails.images;
    mergedDetails.imageUrl = existingDetails.imageUrl;
  }
  
  if (details.bookingPeriod && details.bookingPeriod.checkin && details.bookingPeriod.checkout) {
    mergedDetails.bookingPeriod = details.bookingPeriod;
  } else if (existingDetails.bookingPeriod) {
    mergedDetails.bookingPeriod = existingDetails.bookingPeriod;
  }
  
  if (details.freeCancellation !== null && details.freeCancellation !== undefined) {
    mergedDetails.freeCancellation = details.freeCancellation;
  } else if (existingDetails.freeCancellation) {
    mergedDetails.freeCancellation = existingDetails.freeCancellation;
  }
  
  if (details.selfCheckin === true) {
    mergedDetails.selfCheckin = true;
  } else if (existingDetails.selfCheckin === true) {
    mergedDetails.selfCheckin = true;
  } else {
    mergedDetails.selfCheckin = false;
  }
  
  if (details.hasNetflix === true) {
    mergedDetails.hasNetflix = true;
  } else if (existingDetails.hasNetflix === true) {
    mergedDetails.hasNetflix = true;
  }
  
  if (details.amenityCodes && details.amenityCodes.length > 0) {
    mergedDetails.amenityCodes = details.amenityCodes;
  } else if (existingDetails.amenityCodes && existingDetails.amenityCodes.length > 0) {
    mergedDetails.amenityCodes = existingDetails.amenityCodes;
  } else {
    mergedDetails.amenityCodes = [];
  }

  if (details.beds) {
    mergedDetails.beds = details.beds;
  } else if (existingDetails.beds) {
    mergedDetails.beds = existingDetails.beds;
  }

  if (existingDetails.userBeds) {
    mergedDetails.userBeds = existingDetails.userBeds;
  }
  
  if (existingDetails.customImage) {
    mergedDetails.customImage = true;
    mergedDetails.imageUrl = existingDetails.imageUrl;
    if (existingDetails.images && existingDetails.images.length > 0) {
      mergedDetails.images = existingDetails.images;
    }
  }
  
  shortlistDetails[listingId] = mergedDetails;
  
  await chrome.storage.local.set({ airbxbShortlistDetails: shortlistDetails });
  
  chrome.runtime.sendMessage({ 
    action: "listingDataUpdated", 
    listingId: listingId 
  }).catch(() => {});
}
