

(function() {
  'use strict';

  const STORAGE_KEYS = {
    SHORTLISTED: "airbxbShortlisted",
    SHORTLIST_DETAILS: "airbxbShortlistDetails",
    SHORTLIST_COMMENTS: "airbxbShortlistComments",
    COLUMN_CONFIG: "airbxbColumnConfig",
    VIEWER_SETTINGS: "airbxbViewerSettings",
    SETTINGS: "airbxbSettings",
    TRIPS: "airbxbTrips"
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
    terrace: [180, 181, 577, 532, 100],
    garden: [255, 280, 179, 182, 183, 184, 510, 575],
    firepit: [219],
    iron: [46],
    dishwasher: [92],
    beach: [381, 155, 674, 134, 132, 133],
    checkin: [51, 52, 53, 54, 43],
    kingbed: [1000],
    psxbox: [75, 596, 517, 503],
    desk: [149, 47], 
    attic: [374],
    bikes: [201]
  };

  const BED_TYPES = ['king', 'queen', 'double', 'sofa', 'bunk', 'single'];

  const DEFAULT_COLUMNS = [
    { id: 'grabber', label: '', shortLabel: '', visible: true, sortable: false, filterable: false, width: 40, minWidth: 40, align: 'center' },
    { id: 'number', label: '#', shortLabel: '#', visible: true, sortable: true, filterable: false, width: 55, minWidth: 55, align: 'center' },
    { id: 'image', label: '', shortLabel: '', visible: true, sortable: false, filterable: false, width: null, minWidth: 80, align: 'left' },
    { id: 'price', label: 'Price', shortLabel: 'Price', visible: true, sortable: true, filterable: true, filterType: 'number-range', width: null, minWidth: 90, align: 'center' },
    { id: 'rating', label: 'Rating', shortLabel: 'Rating', visible: true, sortable: true, filterable: true, filterType: 'number', width: null, minWidth: 85, align: 'left' },
    { id: 'booking', label: 'Booking Period', shortLabel: 'Period', visible: true, sortable: false, filterable: false, width: null, minWidth: 120, align: 'left' },
    { id: 'cancellation', label: 'Cancellation', shortLabel: 'Cancellation', visible: true, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 100, align: 'left' },
    { id: 'checkin', label: 'Self Check-in', shortLabel: 'S. Check-in', visible: true, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'kingbed', label: 'King Bed', shortLabel: 'King Bed', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'parking', label: 'Free Parking', shortLabel: 'Parking', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'washer', label: 'Washing Machine', shortLabel: 'Washing M.', visible: true, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'netflix', label: 'Netflix', shortLabel: 'Netflix', visible: true, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'psxbox', label: 'PS/Xbox', shortLabel: 'Console', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'desk', label: 'Desk', shortLabel: 'Desk', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'evcharger', label: 'EV Charger', shortLabel: 'EV', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'aircon', label: 'Air Conditioning', shortLabel: 'A/C', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'fireplace', label: 'Fireplace', shortLabel: 'Fireplace', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'pool', label: 'Pool', shortLabel: 'Pool', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'luggage', label: 'Luggage Storage', shortLabel: 'Luggage', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'bbq', label: 'BBQ/Grill', shortLabel: 'BBQ', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'terrace', label: 'Terrace', shortLabel: 'Terrace', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'garden', label: 'Garden', shortLabel: 'Garden', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'firepit', label: 'Fire Pit', shortLabel: 'Fire Pit', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'iron', label: 'Iron', shortLabel: 'Iron', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'dishwasher', label: 'Dishwasher', shortLabel: 'Dishwasher', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'attic', label: 'Attic', shortLabel: 'Attic', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'bikes', label: 'Bikes', shortLabel: 'Bikes', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'beach', label: 'Beach', shortLabel: 'Beach', visible: false, sortable: true, filterable: true, filterType: 'checkbox', width: null, minWidth: 80, align: 'center' },
    { id: 'beds', label: 'Beds', shortLabel: 'Beds', visible: true, sortable: true, filterable: true, filterType: 'text', width: null, minWidth: 120, align: 'left' },
    { id: 'comments', label: 'Comments', shortLabel: 'Notes', visible: true, sortable: false, filterable: true, filterType: 'text', width: null, minWidth: 150, align: 'left' },
    { id: 'actions', label: '', shortLabel: '', visible: true, sortable: false, filterable: false, width: 100, minWidth: 100, align: 'center' }
  ];

  let shortlistedIds = [];
  let shortlistDetails = {};
  let comments = {};
  let columns = [];
  let currentSort = { column: null, direction: null };
  let filters = {};
  let resizing = null;
  let activeFilterModal = null;
  let imageCount = 1;
  let rowSize = 'medium';
  let isRefreshMode = false;
  let autoRetrieveEnabled = false;
  let retrievalTotal = 0;
  let trips = [];
  let propertyTrips = {};
  let activeTrip = null;
  let activeBedPopupListingId = null;

  const getStore = (keys) => new Promise((res) => chrome.storage.local.get(keys, (v) => res(v)));
  const setStore = (obj) => new Promise((res) => chrome.storage.local.set(obj, () => res()));

  async function init() {
    const data = await getStore([
      STORAGE_KEYS.SHORTLISTED, 
      STORAGE_KEYS.SHORTLIST_DETAILS, 
      STORAGE_KEYS.SHORTLIST_COMMENTS,
      STORAGE_KEYS.COLUMN_CONFIG,
      STORAGE_KEYS.VIEWER_SETTINGS,
      STORAGE_KEYS.SETTINGS,
      STORAGE_KEYS.TRIPS
    ]);
    
    shortlistedIds = data[STORAGE_KEYS.SHORTLISTED] || [];
    shortlistDetails = data[STORAGE_KEYS.SHORTLIST_DETAILS] || {};
    comments = data[STORAGE_KEYS.SHORTLIST_COMMENTS] || {};
    columns = data[STORAGE_KEYS.COLUMN_CONFIG] || JSON.parse(JSON.stringify(DEFAULT_COLUMNS));
    
    if (columns.length > 0 && !columns.some(c => c.id === 'beds')) {
        const bedsCol = DEFAULT_COLUMNS.find(c => c.id === 'beds');
        const commentsIndex = columns.findIndex(c => c.id === 'comments');
        if (commentsIndex !== -1) {
            columns.splice(commentsIndex, 0, bedsCol);
        } else {

            columns.splice(Math.max(0, columns.length - 1), 0, bedsCol);
        }
    }
    
    if (columns.length > 0) {
      const currentColumnIds = new Set(columns.map(c => c.id));
      const newColumns = DEFAULT_COLUMNS.filter(c => !currentColumnIds.has(c.id));
      if (newColumns.length > 0) {
         const commentsIndex = columns.findIndex(c => c.id === 'comments');
         if (commentsIndex !== -1) {
           columns.splice(commentsIndex, 0, ...newColumns);
         } else {
           columns = [...columns, ...newColumns];
         }
         await setStore({ [STORAGE_KEYS.COLUMN_CONFIG]: columns });
      }
    } else {
      columns = JSON.parse(JSON.stringify(DEFAULT_COLUMNS));
    }

    if (columns.length > 0 && !columns[0].hasOwnProperty('align')) {
      columns = JSON.parse(JSON.stringify(DEFAULT_COLUMNS));
      await setStore({ [STORAGE_KEYS.COLUMN_CONFIG]: columns });
    }

    const viewerSettings = data[STORAGE_KEYS.VIEWER_SETTINGS] || { rowSize: 'medium', imageCount: 1, visitCount: 0 };
    rowSize = viewerSettings.rowSize || 'medium';
    imageCount = viewerSettings.imageCount || 1;
    
    const settings = data[STORAGE_KEYS.SETTINGS] || {};
    autoRetrieveEnabled = settings.autoRetrieveEnabled || false;

    const tripsData = data[STORAGE_KEYS.TRIPS] || { trips: [], propertyTrips: {}, activeTrip: null };
    trips = tripsData.trips || [];
    propertyTrips = tripsData.propertyTrips || {};
    activeTrip = tripsData.activeTrip || null;

    applyViewerSettings();
    setupEventListeners();
    updateTripsDropdown();
    renderTable();

    if (shortlistedIds.length > 0 && (viewerSettings.visitCount || 0) < 2) {
      showTipPopup();
      viewerSettings.visitCount = (viewerSettings.visitCount || 0) + 1;
      await setStore({ [STORAGE_KEYS.VIEWER_SETTINGS]: viewerSettings });
    }
  }

  function showTipPopup() {
    const popup = document.getElementById('tipPopup');
    if (popup) {
      popup.classList.add('show');
      
      const closeBtn = document.getElementById('closeTipBtn');
      if (closeBtn) {
        closeBtn.onclick = () => {
          popup.classList.remove('show');
        };
      }
      
      setTimeout(() => {
          popup.classList.remove('show');
      }, 15000);
    }
  }

  function applyViewerSettings() {
    const table = document.querySelector('.shortlist-table');
    if (table) {
      table.dataset.rowSize = rowSize;
    }
    
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.size === rowSize);
    });
    
    const imageCountOptions = document.querySelectorAll('.image-count-option');
    imageCountOptions.forEach(opt => {
      opt.classList.toggle('active', parseInt(opt.dataset.count) === imageCount);
    });
    
    const autoRetrieveToggle = document.getElementById('autoRetrieveToggle');
    if (autoRetrieveToggle) {
      autoRetrieveToggle.classList.toggle('active', autoRetrieveEnabled);
    }
  }

  async function saveViewerSettings() {
    const data = await getStore([STORAGE_KEYS.VIEWER_SETTINGS]);
    const currentSettings = data[STORAGE_KEYS.VIEWER_SETTINGS] || { visitCount: 0 };
    
    await setStore({
      [STORAGE_KEYS.VIEWER_SETTINGS]: { 
        rowSize, 
        imageCount,
        visitCount: currentSettings.visitCount
      }
    });
  }

  async function saveTripsData() {
    await setStore({
      [STORAGE_KEYS.TRIPS]: {
        trips: trips,
        propertyTrips: propertyTrips,
        activeTrip: activeTrip
      }
    });
  }

  function calculateOptimalImageCount() {
    const imageCol = document.querySelector('.col-image');
    if (!imageCol) return imageCount;
    
    const imageColWidth = imageCol.clientWidth;
    const availableWidth = imageColWidth - 8;
    
    let imageSize;
    switch (rowSize) {
      case 'small':
        imageSize = 60;
        break;
      case 'large':
        imageSize = 324;
        break;
      default:
        imageSize = 162;
    }
    
    const gap = 4;
    const maxImages = Math.floor((availableWidth + gap) / (imageSize + gap));
    
    return Math.max(1, Math.min(5, maxImages));
  }

  function adjustImageColumnForSpace() {
    requestAnimationFrame(() => {
      const optimalCount = calculateOptimalImageCount();
      
      if (optimalCount !== imageCount) {
        imageCount = optimalCount;
        
        const imageCountOptions = document.querySelectorAll('.image-count-option');
        imageCountOptions.forEach(opt => {
          opt.classList.toggle('active', parseInt(opt.dataset.count) === imageCount);
        });
        
        updateImageContainers();
        saveViewerSettings();
      }
    });
  }

  function updateTripsDropdown() {
    const tripsSelectorText = document.getElementById('tripsSelectorText');
    const tripsList = document.getElementById('tripsList');
    const allPropertiesCount = document.getElementById('allPropertiesCount');
    const unassignedPropertiesCount = document.getElementById('unassignedPropertiesCount');

    if (tripsSelectorText) {
      if (activeTrip === 'unassigned') {
        tripsSelectorText.textContent = 'Unassigned';
      } else if (activeTrip) {
        const trip = trips.find(t => t.id === activeTrip);
        tripsSelectorText.textContent = trip ? trip.name : 'All Properties';
      } else {
        tripsSelectorText.textContent = 'All Properties';
      }
    }

    if (allPropertiesCount) {
      allPropertiesCount.textContent = `(${shortlistedIds.length})`;
    }

    if (unassignedPropertiesCount) {
      const count = shortlistedIds.filter(id => !propertyTrips[id]).length;
      unassignedPropertiesCount.textContent = `(${count})`;
    }

    if (tripsList) {
      tripsList.innerHTML = '';
      
      trips.forEach(trip => {
        const count = Object.values(propertyTrips).filter(t => t === trip.id).length;
        
        const tripOption = document.createElement('div');
        tripOption.className = 'trip-option';
        if (activeTrip === trip.id) {
          tripOption.classList.add('active');
        }
        tripOption.dataset.tripId = trip.id;
        
        tripOption.innerHTML = `
          <span class="trip-option-name">${trip.name}</span>
          <span class="trip-option-count">(${count})</span>
        `;
        
        tripOption.addEventListener('click', async (e) => {
          if (e.target.closest('.trip-option-delete')) return;
          
          activeTrip = trip.id;
          await saveTripsData();
          
          document.querySelectorAll('.trip-option').forEach(opt => opt.classList.remove('active'));
          tripOption.classList.add('active');
          
          if (tripsSelectorText) {
            tripsSelectorText.textContent = trip.name;
          }
          
          hideTripsDropdown();
          renderTable();
        });
        
        tripsList.appendChild(tripOption);
      });
    }

    const allOption = document.querySelector('.trip-option[data-trip-id="all"]');
    if (allOption) {
      allOption.classList.toggle('active', activeTrip === null);
      
      allOption.onclick = async () => {
        activeTrip = null;
        await saveTripsData();
        
        document.querySelectorAll('.trip-option').forEach(opt => opt.classList.remove('active'));
        allOption.classList.add('active');
        
        if (tripsSelectorText) {
          tripsSelectorText.textContent = 'All Properties';
        }
        
        hideTripsDropdown();
        renderTable();
      };
    }

    const unassignedOption = document.querySelector('.trip-option[data-trip-id="unassigned"]');
    if (unassignedOption) {
      unassignedOption.classList.toggle('active', activeTrip === 'unassigned');
      
      unassignedOption.onclick = async () => {
        activeTrip = 'unassigned';
        await saveTripsData();
        
        document.querySelectorAll('.trip-option').forEach(opt => opt.classList.remove('active'));
        unassignedOption.classList.add('active');
        
        if (tripsSelectorText) {
          tripsSelectorText.textContent = 'Unassigned';
        }
        
        hideTripsDropdown();
        renderTable();
      };
    }
  }

  function hideTripsDropdown() {
    const dropdown = document.getElementById('tripsDropdown');
    const selector = document.getElementById('tripsSelector');
    if (dropdown) dropdown.classList.remove('show');
    if (selector) selector.classList.remove('open');
  }

  function updateTripManagementList() {
    const list = document.getElementById('tripManagementList');
    if (!list) return;

    list.innerHTML = '';

    trips.forEach(trip => {
      const item = document.createElement('div');
      item.className = 'trip-list-item';
      
      const count = Object.values(propertyTrips).filter(t => t === trip.id).length;
      
      item.innerHTML = `
        <span class="trip-list-item-name">${trip.name}</span>
        <div class="trip-list-item-actions">
          <button class="trip-list-item-btn rename" data-trip-id="${trip.id}">Rename</button>
          <button class="trip-list-item-btn delete" data-trip-id="${trip.id}">Delete (${count})</button>
        </div>
      `;

      const renameBtn = item.querySelector('.rename');
      const deleteBtn = item.querySelector('.delete');

      renameBtn.addEventListener('click', async () => {
        const newName = prompt('Enter new trip name:', trip.name);
        if (newName && newName.trim()) {
          trip.name = newName.trim();
          await saveTripsData();
          updateTripManagementList();
          updateTripsDropdown();
        }
      });

      deleteBtn.addEventListener('click', async () => {
        const propertiesToRemove = [];
        Object.keys(propertyTrips).forEach(listingId => {
          if (propertyTrips[listingId] === trip.id) {
            propertiesToRemove.push(listingId);
          }
        });
        
        const count = propertiesToRemove.length;
        let message = `Are you sure you want to delete "${trip.name}"?`;
        
        if (count > 0) {
          message = `Are you sure you want to delete "${trip.name}"?\n\nThis will also remove ${count} ${count === 1 ? 'property' : 'properties'} from your shortlist.`;
        }
        
        if (confirm(message)) {
          trips = trips.filter(t => t.id !== trip.id);
          
          propertiesToRemove.forEach(listingId => {
            delete propertyTrips[listingId];
            shortlistedIds = shortlistedIds.filter(id => id !== listingId);
            delete shortlistDetails[listingId];
            delete comments[listingId];
          });
          
          if (activeTrip === trip.id) {
            activeTrip = null;
          }
          
          await setStore({
            [STORAGE_KEYS.SHORTLISTED]: shortlistedIds,
            [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails,
            [STORAGE_KEYS.SHORTLIST_COMMENTS]: comments
          });
          
          await saveTripsData();
          updateTripManagementList();
          updateTripsDropdown();
          renderTable();
        }
      });

      list.appendChild(item);
    });
  }

  function formatBedString(beds) {
    if (!beds) return '';
    const order = ['king', 'queen', 'double', 'single', 'sofa', 'bunk'];
    const parts = [];
    
    order.forEach(type => {
        if (beds[type] > 0) {
            const label = type.charAt(0).toUpperCase() + type.slice(1);
            parts.push(`${beds[type]} ${label}`);
        }
    });
    
    return parts.join(', ');
  }

  function showBedPopup(listingId, target) {
    activeBedPopupListingId = listingId;
    const popup = document.getElementById('bedPopup');
    const rowsContainer = document.getElementById('bedPopupRows');
    
    rowsContainer.innerHTML = '';
    const details = shortlistDetails[listingId] || {};
    const currentBeds = details.beds || {};
    
    const bedTypesDisplay = [
        { id: 'king', label: 'King bed' },
        { id: 'queen', label: 'Queen bed' },
        { id: 'double', label: 'Double bed' },
        { id: 'sofa', label: 'Sofa bed' },
        { id: 'bunk', label: 'Bunk bed' },
        { id: 'single', label: 'Single bed' }
    ];
    
    bedTypesDisplay.forEach(type => {
        const row = document.createElement('div');
        row.className = 'bed-row';
        const val = currentBeds[type.id] || '';
        row.innerHTML = `
            <input type="number" min="0" class="bed-popup-input" data-bed-type="${type.id}" value="${val}">
            <span>${type.label}</span>
        `;
        rowsContainer.appendChild(row);
    });

    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    popup.style.top = `${rect.top + scrollTop}px`;
    popup.style.left = `${rect.left + scrollLeft}px`;
    popup.classList.add('show');
    
    const firstInput = popup.querySelector('input');
    if(firstInput) firstInput.focus();
  }

  function saveBedPopup() {
    if (!activeBedPopupListingId) return;
    
    const popup = document.getElementById('bedPopup');
    const inputs = popup.querySelectorAll('.bed-popup-input');
    const newBeds = {};
    
    inputs.forEach(input => {
        const type = input.dataset.bedType;
        const val = parseInt(input.value);
        if (!isNaN(val) && val > 0) {
            newBeds[type] = val;
        }
    });
    
    if (!shortlistDetails[activeBedPopupListingId]) shortlistDetails[activeBedPopupListingId] = {};
    shortlistDetails[activeBedPopupListingId].beds = newBeds;

    delete shortlistDetails[activeBedPopupListingId].userBeds;
    
    setStore({ [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails });
    renderTable();
    popup.classList.remove('show');
    activeBedPopupListingId = null;
  }

  function setupEventListeners() {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', async () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        rowSize = option.dataset.size;
        const table = document.querySelector('.shortlist-table');
        if (table) {
          table.dataset.rowSize = rowSize;
        }
        await saveViewerSettings();
        adjustImageColumnForSpace();
      });
    });

    const imageCountOptions = document.querySelectorAll('.image-count-option');
    imageCountOptions.forEach(option => {
      option.addEventListener('click', async () => {
        imageCountOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        imageCount = parseInt(option.dataset.count);
        updateImageContainers();
        await saveViewerSettings();
      });
    });

    window.addEventListener('resize', () => {
      adjustImageColumnForSpace();
    });

    const tripsSelector = document.getElementById('tripsSelector');
    const tripsDropdown = document.getElementById('tripsDropdown');

    if (tripsSelector && tripsDropdown) {
      tripsSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        tripsDropdown.classList.toggle('show');
        tripsSelector.classList.toggle('open');
      });
    }

    const manageTripsBtn = document.getElementById('manageTripsBtn');
    const tripsModal = document.getElementById('tripsModal');
    const closeTripsModal = document.getElementById('closeTripsModal');
    const closeTripsModalBtn = document.getElementById('closeTripsModalBtn');
    const addTripBtn = document.getElementById('addTripBtn');
    const newTripInput = document.getElementById('newTripInput');

    if (manageTripsBtn && tripsModal) {
      manageTripsBtn.addEventListener('click', () => {
        hideTripsDropdown();
        tripsModal.classList.add('show');
        updateTripManagementList();
      });
    }

    if (closeTripsModal) {
      closeTripsModal.addEventListener('click', () => {
        if (tripsModal) tripsModal.classList.remove('show');
      });
    }

    if (closeTripsModalBtn) {
      closeTripsModalBtn.addEventListener('click', () => {
        if (tripsModal) tripsModal.classList.remove('show');
      });
    }

    if (tripsModal) {
      tripsModal.addEventListener('click', (e) => {
        if (e.target === tripsModal) {
          tripsModal.classList.remove('show');
        }
      });
    }

    if (addTripBtn && newTripInput) {
      const addTrip = async () => {
        const tripName = newTripInput.value.trim();
        if (tripName) {
          const newTrip = {
            id: 'trip_' + Date.now(),
            name: tripName
          };
          trips.push(newTrip);
          await saveTripsData();
          newTripInput.value = '';
          updateTripManagementList();
          updateTripsDropdown();
        }
      };

      addTripBtn.addEventListener('click', addTrip);
      newTripInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          addTrip();
        }
      });
    }

    const columnManager = document.getElementById('columnManager');
    const columnModal = document.getElementById('columnModal');
    const closeColumnModal = document.getElementById('closeColumnModal');
    const applyColumns = document.getElementById('applyColumns');
    const resetColumns = document.getElementById('resetColumns');

    if (columnManager) {
      columnManager.addEventListener('click', () => {
        showColumnModal();
      });
    }

    if (closeColumnModal) {
      closeColumnModal.addEventListener('click', () => {
        if (columnModal) columnModal.classList.remove('show');
      });
    }

    if (columnModal) {
      columnModal.addEventListener('click', (e) => {
        if (e.target === columnModal) {
          columnModal.classList.remove('show');
        }
      });
    }

    if (applyColumns) {
      applyColumns.addEventListener('click', async () => {
        await saveColumnConfig();
        if (columnModal) columnModal.classList.remove('show');
        renderTable();
        setTimeout(() => adjustImageColumnForSpace(), 100);
      });
    }

    if (resetColumns) {
      resetColumns.addEventListener('click', async () => {
        columns = JSON.parse(JSON.stringify(DEFAULT_COLUMNS));
        await setStore({ [STORAGE_KEYS.COLUMN_CONFIG]: columns });
        if (columnModal) columnModal.classList.remove('show');
        renderTable();
        setTimeout(() => adjustImageColumnForSpace(), 100);
      });
    }

    const retrieveDataBtn = document.getElementById('retrieveDataBtn');
    const refreshToggle = document.getElementById('refreshToggle');
    const autoRetrieveToggle = document.getElementById('autoRetrieveToggle');

    if (refreshToggle) {
      refreshToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isRefreshMode = !isRefreshMode;
        refreshToggle.classList.toggle('active', isRefreshMode);
        const btnText = document.getElementById('retrieveBtnText');
        if (btnText) {
          btnText.textContent = isRefreshMode ? 'Refresh all data' : 'Retrieve data';
        }
      });
    }

    if (retrieveDataBtn) {
      retrieveDataBtn.addEventListener('click', () => {
        startDataRetrieval();
      });
    }

    if (autoRetrieveToggle) {
      autoRetrieveToggle.addEventListener('click', async () => {
        autoRetrieveEnabled = !autoRetrieveEnabled;
        autoRetrieveToggle.classList.toggle('active', autoRetrieveEnabled);
        
        const data = await getStore([STORAGE_KEYS.SETTINGS]);
        const settings = data[STORAGE_KEYS.SETTINGS] || {};
        settings.autoRetrieveEnabled = autoRetrieveEnabled;
        await setStore({ [STORAGE_KEYS.SETTINGS]: settings });
      });
    }

    const saveBedsBtn = document.getElementById('saveBedsBtn');
    if (saveBedsBtn) {
        saveBedsBtn.addEventListener('click', saveBedPopup);
    }

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    
    document.addEventListener('click', (e) => {
      const filterModal = document.getElementById('filterModal');
      if (filterModal && !filterModal.contains(e.target) && !e.target.closest('.th-content')) {
        hideFilterModal();
      }
      
      if (tripsDropdown && !tripsDropdown.contains(e.target) && !tripsSelector.contains(e.target)) {
        hideTripsDropdown();
      }

      const bedPopup = document.getElementById('bedPopup');
      if (bedPopup && bedPopup.classList.contains('show') && !bedPopup.contains(e.target) && !e.target.closest('.col-beds')) {
        bedPopup.classList.remove('show');
        activeBedPopupListingId = null;
      }
    });

    document.addEventListener('keydown', (e) => {
      const bedPopup = document.getElementById('bedPopup');
      if (bedPopup && bedPopup.classList.contains('show')) {
        if (e.key === 'Escape') {
            bedPopup.classList.remove('show');
            activeBedPopupListingId = null;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            saveBedPopup();
        }
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') return;
      if (changes[STORAGE_KEYS.SHORTLISTED] || changes[STORAGE_KEYS.SHORTLIST_DETAILS]) {
        loadDataAndRender();
      }
      if (changes[STORAGE_KEYS.SETTINGS]) {
        const settings = changes[STORAGE_KEYS.SETTINGS].newValue || {};
        autoRetrieveEnabled = settings.autoRetrieveEnabled || false;
        const toggle = document.getElementById('autoRetrieveToggle');
        if (toggle) {
          toggle.classList.toggle('active', autoRetrieveEnabled);
        }
      }
      if (changes[STORAGE_KEYS.TRIPS]) {
        const tripsData = changes[STORAGE_KEYS.TRIPS].newValue || { trips: [], propertyTrips: {}, activeTrip: null };
        trips = tripsData.trips || [];
        propertyTrips = tripsData.propertyTrips || {};
        activeTrip = tripsData.activeTrip || null;
        updateTripsDropdown();
        renderTable();
      }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "listingDataUpdated") {
        loadDataAndRender();
        sendResponse({ success: true });
        return true;
      }
      if (message.action === "retrievalProgress") {
        updateProgressDisplay(message.progress);
        sendResponse({ success: true });
        return true;
      }
      if (message.action === "retrievalQueueEmpty") {
        hideRetrievingOverlay();
        sendResponse({ success: true });
        return true;
      }
      return false;
    });
  }

  async function loadDataAndRender() {
    const data = await getStore([
      STORAGE_KEYS.SHORTLISTED, 
      STORAGE_KEYS.SHORTLIST_DETAILS, 
      STORAGE_KEYS.SHORTLIST_COMMENTS
    ]);
    
    shortlistedIds = data[STORAGE_KEYS.SHORTLISTED] || [];
    shortlistDetails = data[STORAGE_KEYS.SHORTLIST_DETAILS] || {};
    comments = data[STORAGE_KEYS.SHORTLIST_COMMENTS] || {};
    
    updateTripsDropdown();
    renderTable();
  }

  function startDataRetrieval() {
    const listingsToRetrieve = [];
    
    const idsToProcess = getFilteredIds();
    
    idsToProcess.forEach(listingId => {
      const details = shortlistDetails[listingId] || {};
      
      if (isRefreshMode) {
        if (details.url) {
          listingsToRetrieve.push({
            listingId: listingId,
            url: details.url
          });
        }
      } else {
        if (!details.extractedFromPage && details.url) {
          listingsToRetrieve.push({
            listingId: listingId,
            url: details.url
          });
        }
      }
    });

    if (listingsToRetrieve.length === 0) {
      alert(isRefreshMode ? 'No properties with URLs to refresh.' : 'All properties already have complete data.');
      return;
    }

    retrievalTotal = listingsToRetrieve.length;
    showRetrievingOverlay(retrievalTotal);
    
    chrome.runtime.sendMessage({
      action: "retrieveDataForListings",
      listings: listingsToRetrieve,
      isRefresh: isRefreshMode
    });
  }

  function showRetrievingOverlay(total) {
    const overlay = document.getElementById('retrievingOverlay');
    const progress = document.getElementById('retrievingProgress');
    if (overlay) {
      overlay.classList.add('show');
    }
    if (progress) {
      progress.textContent = `0 / ${total}`;
    }
  }

  function updateProgressDisplay(progress) {
    const progressEl = document.getElementById('retrievingProgress');
    if (progressEl && progress) {
      progressEl.textContent = `${progress.completed} / ${progress.total}`;
    }
  }

  function hideRetrievingOverlay() {
    const overlay = document.getElementById('retrievingOverlay');
    if (overlay) {
      overlay.classList.remove('show');
    }
  }

  function updateImageContainers() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
      const row = container.closest('tr');
      if (!row) return;
      
      const listingId = row.dataset.listingId;
      const details = shortlistDetails[listingId] || {};
      
      container.style.gridTemplateColumns = `repeat(${imageCount}, 1fr)`;
      container.innerHTML = '';
      
      const images = details.images || (details.imageUrl ? [details.imageUrl] : []);
      const imagesToShow = images.slice(0, imageCount);
      
      if (imagesToShow.length > 0 && details.url) {
        imagesToShow.forEach((imgUrl, idx) => {
          const link = document.createElement('a');
          link.href = details.url;
          link.className = 'property-image-link';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          
          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = `Property ${idx + 1}`;
          img.className = 'property-image';
          img.loading = 'lazy';
          img.decoding = 'async';
          
          link.appendChild(img);
          container.appendChild(link);
        });
      } else if (imagesToShow.length > 0) {
        imagesToShow.forEach((imgUrl, idx) => {
          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = `Property ${idx + 1}`;
          img.className = 'property-image';
          img.loading = 'lazy';
          img.decoding = 'async';
          container.appendChild(img);
        });
      } else {
        container.innerHTML = '<span style="color: #9ca3af;">No image</span>';
      }
    });
  }

  function showColumnModal() {
    const modal = document.getElementById('columnModal');
    const columnList = document.getElementById('columnList');
    
    if (!columnList) return;
    
    columnList.innerHTML = '';
    
    columns.forEach((col, index) => {
      if (col.id === 'grabber' || col.id === 'number' || col.id === 'actions') {
        return;
      }
      
      const item = document.createElement('div');
      item.className = 'column-item';
      item.draggable = true;
      item.dataset.columnId = col.id;
      
      item.innerHTML = `
        <span class="column-item-drag">⋮⋮</span>
        <div class="column-item-toggle">
          <input type="checkbox" ${col.visible ? 'checked' : ''} data-column-id="${col.id}">
        </div>
        <span class="column-item-label">${col.label || col.id}</span>
      `;
      
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', (e) => {
        const columnId = e.target.dataset.columnId;
        const column = columns.find(c => c.id === columnId);
        if (column) {
          column.visible = e.target.checked;
        }
      });
      
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        item.classList.add('dragging');
        e.dataTransfer.setData('columnId', col.id);
      });
      
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
      
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = columnList.querySelector('.dragging');
        if (!draggingItem || draggingItem === item) return;
        
        const items = Array.from(columnList.querySelectorAll('.column-item:not(.dragging)'));
        const currentIndex = items.indexOf(item);
        
        if (currentIndex >= 0) {
          columnList.insertBefore(draggingItem, item);
        }
      });
      
      item.addEventListener('drop', (e) => {
        e.preventDefault();
      });
      
      columnList.appendChild(item);
    });
    
    if (modal) modal.classList.add('show');
  }

  async function saveColumnConfig() {
    const columnList = document.getElementById('columnList');
    if (!columnList) return;
    
    const items = Array.from(columnList.querySelectorAll('.column-item'));
    const newOrder = items.map(item => item.dataset.columnId);
    
    const reorderedColumns = [];
    reorderedColumns.push(columns.find(c => c.id === 'grabber'));
    reorderedColumns.push(columns.find(c => c.id === 'number'));
    
    newOrder.forEach(id => {
      const col = columns.find(c => c.id === id);
      if (col) reorderedColumns.push(col);
    });
    
    const actionsCol = columns.find(c => c.id === 'actions');
    if (actionsCol) reorderedColumns.push(actionsCol);
    
    columns = reorderedColumns;
    await setStore({ [STORAGE_KEYS.COLUMN_CONFIG]: columns });
  }

  function showFilterModal(columnId, thElement) {
    const filterModal = document.getElementById('filterModal');
    if (!filterModal) return;

    activeFilterModal = columnId;
    const column = columns.find(c => c.id === columnId);
    if (!column) return;

    const sortSection = document.getElementById('sortSection');
    const filterSection = document.getElementById('filterSection');
    const filterInputContainer = document.getElementById('filterInputContainer');

    filterInputContainer.innerHTML = '';
    filterInputContainer.className = '';
    
    const existingCheckboxes = filterSection.querySelectorAll('.filter-checkbox-option');
    existingCheckboxes.forEach(cb => cb.remove());

    if (column.sortable) {
      sortSection.style.display = 'block';
      setupSortButtons(columnId);
    } else {
      sortSection.style.display = 'none';
    }

    if (column.filterable) {
      if (column.filterType === 'text') {
        filterSection.style.display = 'none';
        filterInputContainer.classList.add('comment-search');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Search ${column.label.toLowerCase()}...`;
        input.value = filters[columnId] || '';
        input.addEventListener('input', (e) => {
          filters[columnId] = e.target.value;
          applyFilters();
          updateFilterIndicator(columnId);
        });
        filterInputContainer.appendChild(input);
        filterSection.parentElement.appendChild(filterInputContainer);
      } else {
        filterSection.style.display = 'block';
        const filterSectionTitle = filterSection.querySelector('.filter-section-title');
        
        if (column.filterType === 'number') {
          if (filterSectionTitle) filterSectionTitle.style.display = 'block';
          filterSection.appendChild(filterInputContainer);
          
          const input = document.createElement('input');
          input.type = 'number';
          input.placeholder = `Min ${column.label.toLowerCase()}...`;
          input.value = filters[columnId] || '';
          input.addEventListener('input', (e) => {
            filters[columnId] = e.target.value;
            applyFilters();
            updateFilterIndicator(columnId);
          });
          filterInputContainer.appendChild(input);
        } else if (column.filterType === 'number-range') {
          if (filterSectionTitle) filterSectionTitle.style.display = 'block';
          filterSection.appendChild(filterInputContainer);
          
          const minInput = document.createElement('input');
          minInput.type = 'number';
          minInput.placeholder = 'Min price...';
          minInput.style.marginBottom = '8px';
          const filterValue = filters[columnId] || {};
          minInput.value = filterValue.min || '';
          minInput.addEventListener('input', (e) => {
            if (!filters[columnId]) filters[columnId] = {};
            filters[columnId].min = e.target.value;
            applyFilters();
            updateFilterIndicator(columnId);
          });
          
          const maxInput = document.createElement('input');
          maxInput.type = 'number';
          maxInput.placeholder = 'Max price...';
          maxInput.value = filterValue.max || '';
          maxInput.addEventListener('input', (e) => {
            if (!filters[columnId]) filters[columnId] = {};
            filters[columnId].max = e.target.value;
            applyFilters();
            updateFilterIndicator(columnId);
          });
          
          filterInputContainer.appendChild(minInput);
          filterInputContainer.appendChild(maxInput);
        } else if (column.filterType === 'checkbox') {
          if (filterSectionTitle) filterSectionTitle.style.display = 'block';
          
          const filterValue = filters[columnId] || { yes: false, no: false };
          
          const yesOption = document.createElement('div');
          yesOption.className = 'filter-checkbox-option';
          yesOption.innerHTML = `
            <input type="checkbox" id="filter-${columnId}-yes" ${filterValue.yes ? 'checked' : ''}>
            <label for="filter-${columnId}-yes">Yes</label>
          `;
          
          const noOption = document.createElement('div');
          noOption.className = 'filter-checkbox-option';
          noOption.innerHTML = `
            <input type="checkbox" id="filter-${columnId}-no" ${filterValue.no ? 'checked' : ''}>
            <label for="filter-${columnId}-no">No</label>
          `;
          
          const yesCheckbox = yesOption.querySelector('input');
          const noCheckbox = noOption.querySelector('input');
          
          yesCheckbox.addEventListener('change', (e) => {
            if (!filters[columnId]) filters[columnId] = { yes: false, no: false };
            filters[columnId].yes = e.target.checked;
            applyFilters();
            updateFilterIndicator(columnId);
          });
          
          noCheckbox.addEventListener('change', (e) => {
            if (!filters[columnId]) filters[columnId] = { yes: false, no: false };
            filters[columnId].no = e.target.checked;
            applyFilters();
            updateFilterIndicator(columnId);
          });
          
          filterSection.appendChild(yesOption);
          filterSection.appendChild(noOption);
        }
      }
    } else {
      filterSection.style.display = 'none';
    }

    const rect = thElement.getBoundingClientRect();
    filterModal.style.left = `${rect.left}px`;
    filterModal.style.top = `${rect.bottom + 4}px`;
    filterModal.classList.add('show');
  }

  function hideFilterModal() {
    const filterModal = document.getElementById('filterModal');
    if (filterModal) {
      filterModal.classList.remove('show');
      
      const filterSection = document.getElementById('filterSection');
      const checkboxOptions = filterSection.querySelectorAll('.filter-checkbox-option');
      checkboxOptions.forEach(option => option.remove());
      
      const filterInputContainer = document.getElementById('filterInputContainer');
      filterInputContainer.innerHTML = '';
      filterInputContainer.className = '';
    }
    activeFilterModal = null;
  }

  function setupSortButtons(columnId) {
    const sortButtons = document.querySelectorAll('.filter-option[data-action^="sort"]');
    sortButtons.forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.action;
        if (action === 'sort-asc') {
          currentSort = { column: columnId, direction: 'asc' };
        } else if (action === 'sort-desc') {
          currentSort = { column: columnId, direction: 'desc' };
        } else if (action === 'sort-clear') {
          currentSort = { column: null, direction: null };
        }
        updateSortIndicators();
        renderTable();
        hideFilterModal();
      };
    });
  }

  function updateFilterIndicator(columnId) {
    const thContent = document.querySelector(`.th-content[data-column-id="${columnId}"]`);
    if (!thContent) return;
    
    const filterValue = filters[columnId];
    let hasFilter = false;
    
    if (typeof filterValue === 'object' && filterValue !== null) {
      if (filterValue.min || filterValue.max) {
        hasFilter = true;
      } else if (filterValue.yes || filterValue.no) {
        hasFilter = true;
      }
    } else {
      hasFilter = !!filterValue;
    }
    
    const existingFilterIcon = thContent.querySelector('.filter-icon');
    
    if (hasFilter) {
      thContent.classList.add('has-filter');
      
      if (!existingFilterIcon) {
        const filterIcon = document.createElement('span');
        filterIcon.className = 'filter-icon';
        filterIcon.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.5h18M7.5 9h9M10.5 13.5h3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        `;
        thContent.appendChild(filterIcon);
      }
    } else {
      thContent.classList.remove('has-filter');
      
      if (existingFilterIcon) {
        existingFilterIcon.remove();
      }
    }
  }

  function startResize(e, columnId) {
    e.preventDefault();
    e.stopPropagation();
    
    const th = document.querySelector(`th[data-column-id="${columnId}"]`);
    if (!th) return;

    resizing = {
      columnId: columnId,
      startX: e.pageX,
      startWidth: th.offsetWidth
    };
    e.target.classList.add('resizing');
  }

  function handleResize(e) {
    if (!resizing) return;
    
    const column = columns.find(c => c.id === resizing.columnId);
    if (!column) return;
    
    const diff = e.pageX - resizing.startX;
    const newWidth = Math.max(column.minWidth, resizing.startWidth + diff);
    column.width = newWidth; 
    
    const th = document.querySelector(`th[data-column-id="${resizing.columnId}"]`);
    if (th) {
      th.style.width = `${newWidth}px`;
    }
  }

  async function stopResize(e) {
    if (!resizing) return;
    
    const handle = document.querySelector('.resize-handle.resizing');
    if (handle) handle.classList.remove('resizing');
    
    await setStore({ [STORAGE_KEYS.COLUMN_CONFIG]: columns });
    resizing = null;
    
    setTimeout(() => adjustImageColumnForSpace(), 100);
  }

  function updateSortIndicators() {
    document.querySelectorAll('.th-content').forEach(content => {
      const indicator = content.querySelector('.sort-indicator');
      if (indicator) {
        if (content.dataset.columnId === currentSort.column) {
          content.classList.add('has-sort');
          indicator.textContent = currentSort.direction === 'asc' ? '▲' : '▼';
        } else {
          content.classList.remove('has-sort');
          indicator.textContent = '';
        }
      }
    });
  }

  function getBedText(details) {
    if (details.userBeds !== undefined && details.userBeds !== null) {
      return details.userBeds;
    }
    
    const beds = details.beds || {};
    const parts = [];
    
    BED_TYPES.forEach(type => {
      const count = beds[type];
      if (count > 0) {
        const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
        parts.push(`${count} ${typeCapitalized}`);
      }
    });
    
    return parts.join(', ');
  }

  function getTotalBeds(details) {
    if (details.userBeds) {
      return 1;
    }
    
    const beds = details.beds || {};
    return BED_TYPES.reduce((acc, type) => acc + (beds[type] || 0), 0);
  }

  function getFilteredIds() {
    if (activeTrip === null) {
      return shortlistedIds;
    }
    
    if (activeTrip === 'unassigned') {
      return shortlistedIds.filter(id => !propertyTrips[id]);
    }
    
    return shortlistedIds.filter(id => propertyTrips[id] === activeTrip);
  }

  function applyFilters() {
    const rows = document.querySelectorAll('#shortlistBody tr');
    rows.forEach(row => {
      const listingId = row.dataset.listingId;
      const currentDetails = shortlistDetails[listingId];
      const comment = comments[listingId] || '';
      
      let show = true;

      Object.entries(filters).forEach(([columnId, filterValue]) => {
        if (!filterValue) return;
        
        if (typeof filterValue === 'object' && filterValue !== null) {
          if (filterValue.min || filterValue.max) {
            if (columnId === 'price' && currentDetails?.price) {
              const priceValue = extractNumericPrice(currentDetails.price);
              if (filterValue.min) {
                const minPrice = parseFloat(filterValue.min);
                if (minPrice && priceValue && priceValue < minPrice) {
                  show = false;
                }
              }
              if (filterValue.max) {
                const maxPrice = parseFloat(filterValue.max);
                if (maxPrice && priceValue && priceValue > maxPrice) {
                  show = false;
                }
              }
            }
          } else if (filterValue.yes || filterValue.no) {
            const amenityValue = getAmenityValue(currentDetails, columnId);
            if (filterValue.yes && filterValue.no) {
              return;
            } else if (filterValue.yes && amenityValue !== true) {
              show = false;
            } else if (filterValue.no && amenityValue !== false) {
              show = false;
            }
          }
        } else {
          switch (columnId) {
            case 'rating':
              if (currentDetails?.rating) {
                const minRating = parseFloat(filterValue);
                if (currentDetails.rating < minRating) {
                  show = false;
                }
              }
              break;
            
            case 'beds':
              if (filterValue) {
                const searchTerm = filterValue.toLowerCase();
                const bedText = getBedText(currentDetails).toLowerCase();
                if (!bedText.includes(searchTerm)) {
                  show = false;
                }
              }
              break;

            case 'comments':
              if (filterValue) {
                const searchTerm = filterValue.toLowerCase();
                if (!comment.toLowerCase().includes(searchTerm)) {
                  show = false;
                }
              }
              break;
          }
        }
      });

      if (show) {
        row.classList.remove('row-hidden');
      } else {
        row.classList.add('row-hidden');
      }
    });
  }

  function extractNumericPrice(priceString) {
    if (!priceString) return null;
    if (typeof priceString !== 'string') return null;
    
    const cleanedPrice = priceString.replace(/\s+/g, '').replace(/\u00A0/g, '');
    
    const match = cleanedPrice.match(/[\d.,]+/);
    if (match) {
      const numberPart = match[0].replace(/,/g, '').replace(/\./g, (m, offset, str) => {
        const dotCount = (str.match(/\./g) || []).length;
        if (dotCount > 1 || (str.length - offset - 1) > 2) {
          return '';
        }
        return '.';
      });
      return parseFloat(numberPart);
    }
    return null;
  }

  function extractCurrency(priceString) {
    if (!priceString) return '$';
    if (typeof priceString !== 'string') return '$';
    
    const currencyMap = [
      { symbol: 'R$', regex: /R\$/ },
      { symbol: 'CA$', regex: /CA\$/ },
      { symbol: 'A$', regex: /A\$/ },
      { symbol: 'NZ$', regex: /NZ\$/ },
      { symbol: 'MX$', regex: /MX\$/ },
      { symbol: 'HK$', regex: /HK\$/ },
      { symbol: 'S$', regex: /S\$/ },
      { symbol: 'NT$', regex: /NT\$/ },
      { symbol: '$', regex: /\$/ },
      { symbol: '€', regex: /€/ },
      { symbol: '£', regex: /£/ },
      { symbol: '¥', regex: /¥/ },
      { symbol: '₹', regex: /₹/ },
      { symbol: 'CHF', regex: /CHF/ },
      { symbol: 'kr', regex: /kr/ },
      { symbol: 'SEK', regex: /SEK/ },
      { symbol: 'NOK', regex: /NOK/ },
      { symbol: 'DKK', regex: /DKK/ },
      { symbol: 'zł', regex: /zł/ },
      { symbol: 'Kč', regex: /Kč/ },
      { symbol: 'HUF', regex: /HUF/ },
      { symbol: 'Ft', regex: /Ft/ },
      { symbol: 'руб', regex: /руб/ },
      { symbol: '₪', regex: /₪/ },
      { symbol: '฿', regex: /฿/ },
      { symbol: 'RM', regex: /RM/ }
    ];
    
    for (const { symbol, regex } of currencyMap) {
      if (regex.test(priceString)) {
        return symbol;
      }
    }
    
    return '$';
  }

  function extractBookingPeriodFromUrl(url) {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      let checkin = urlObj.searchParams.get('check_in');
      let checkout = urlObj.searchParams.get('check_out');
      
      if (!checkin) checkin = urlObj.searchParams.get('checkin');
      if (!checkout) checkout = urlObj.searchParams.get('checkout');
      
      if (checkin && checkout) {
        return { checkin, checkout };
      }
    } catch (e) {}
    
    return null;
  }

  function getAmenityValue(details, amenityType) {
    if (!details) return null;
    
    const amenityCodes = details.amenityCodes || [];
    const hasExtractedData = details.extractedFromPage === true;
    
    if (amenityType === 'cancellation') {
      if (details.freeCancellation) return true;
      if (hasExtractedData) return false;
      return null;
    }
    
    if (amenityType === 'checkin') {
      if (details.selfCheckin === true) return true;
      if (hasExtractedData) {
        const checkinCodes = AMENITY_GROUPS.checkin;
        for (const code of checkinCodes) {
          if (amenityCodes.includes(code)) return true;
        }
        return false;
      }
      return null;
    }
    
    if (amenityType === 'netflix') {
      if (details.hasNetflix) return true;
      if (hasExtractedData) return false;
      return null;
    }
    
    const groupCodes = AMENITY_GROUPS[amenityType];
    if (groupCodes && amenityCodes.length > 0) {
      for (const code of groupCodes) {
        if (amenityCodes.includes(code)) return true;
      }
      if (hasExtractedData) return false;
    }
    
    if (!hasExtractedData) return null;
    
    return false;
  }

  function getSortedIds() {
    const filteredIds = getFilteredIds();
    
    if (!currentSort.column) {
      return [...filteredIds];
    }

    const idsWithIndex = filteredIds.map((id, index) => ({ id, originalIndex: shortlistedIds.indexOf(id) }));

    return idsWithIndex.sort((a, b) => {
      const detailsA = shortlistDetails[a.id] || {};
      const detailsB = shortlistDetails[b.id] || {};

      let valueA, valueB;

      switch (currentSort.column) {
        case 'number':
          valueA = a.originalIndex;
          valueB = b.originalIndex;
          break;
        case 'price':
          valueA = extractNumericPrice(detailsA?.price) || 0;
          valueB = extractNumericPrice(detailsB?.price) || 0;
          break;
        case 'rating':
          valueA = detailsA?.rating || 0;
          valueB = detailsB?.rating || 0;
          break;
        case 'beds':
          valueA = getTotalBeds(detailsA);
          valueB = getTotalBeds(detailsB);
          break;
        case 'cancellation':
        case 'checkin':
        case 'parking':
        case 'washer':
        case 'netflix':
        case 'evcharger':
        case 'aircon':
        case 'fireplace':
        case 'pool':
        case 'luggage':
        case 'bbq':
        case 'terrace':
        case 'garden':
        case 'firepit':
        case 'iron':
        case 'dishwasher':
        case 'beach':
        case 'kingbed':
        case 'psxbox':
        case 'desk':
        case 'attic':
        case 'bikes':
          const valA = getAmenityValue(detailsA, currentSort.column);
          const valB = getAmenityValue(detailsB, currentSort.column);
          valueA = valA === true ? 2 : valA === false ? 1 : 0;
          valueB = valB === true ? 2 : valB === false ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (currentSort.direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }).map(item => item.id);
  }

  async function moveToTop(listingId) {
    shortlistedIds = shortlistedIds.filter(id => id !== listingId);
    shortlistedIds.unshift(listingId);
    await setStore({ [STORAGE_KEYS.SHORTLISTED]: shortlistedIds });
    renderTable();
  }

  async function moveToBottom(listingId) {
    shortlistedIds = shortlistedIds.filter(id => id !== listingId);
    shortlistedIds.push(listingId);
    await setStore({ [STORAGE_KEYS.SHORTLISTED]: shortlistedIds });
    renderTable();
  }

  function renderTable() {
    const headerRow = document.getElementById('headerRow');
    const tbody = document.getElementById('shortlistBody');
    const emptyState = document.getElementById('emptyState');
    const tableWrapper = document.querySelector('.table-wrapper');
    const table = document.querySelector('.shortlist-table');

    if (!headerRow || !tbody) return;

    if (table) {
      table.dataset.rowSize = rowSize;
    }

    headerRow.innerHTML = '';
    tbody.innerHTML = '';

    const idsToShow = getFilteredIds();

    if (idsToShow.length === 0) {
      if (emptyState) emptyState.classList.add('show');
      if (tableWrapper) tableWrapper.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.classList.remove('show');
    if (tableWrapper) tableWrapper.style.display = 'block';

    const visibleColumns = columns.filter(col => col.visible);

    visibleColumns.forEach((col, index) => {
      const th = document.createElement('th');
      th.className = `col-${col.id}`;
      th.dataset.columnId = col.id;
      
      if (col.width !== null && col.width !== undefined) {
         th.style.width = `${col.width}px`;
      }
      
      const wrapper = document.createElement('div');
      wrapper.className = `th-wrapper align-${col.align}`;
      
      const content = document.createElement('div');
      content.className = 'th-content';
      content.dataset.columnId = col.id;
      
      if (col.sortable || col.filterable) {
        content.style.cursor = 'pointer';
        content.addEventListener('click', (e) => {
          e.stopPropagation();
          showFilterModal(col.id, th);
        });
      }
      
      const label = document.createElement('span');
      label.textContent = col.shortLabel || col.label;
      content.appendChild(label);
      
      if (col.sortable) {
        const indicator = document.createElement('span');
        indicator.className = 'sort-indicator';
        content.appendChild(indicator);
      }
      
      wrapper.appendChild(content);
      
      if (col.id !== 'grabber' && col.id !== 'number' && col.id !== 'actions') {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        resizeHandle.addEventListener('mousedown', (e) => startResize(e, col.id));
        wrapper.appendChild(resizeHandle);
      }
      
      th.appendChild(wrapper);
      
      th.addEventListener('mouseenter', () => {
        const currentHandle = th.querySelector('.resize-handle');
        if (currentHandle) currentHandle.classList.add('highlight');
        
        const prevTh = th.previousElementSibling;
        if (prevTh) {
          const prevHandle = prevTh.querySelector('.resize-handle');
          if (prevHandle) prevHandle.classList.add('highlight');
        }
      });
      
      th.addEventListener('mouseleave', () => {
        const currentHandle = th.querySelector('.resize-handle');
        if (currentHandle) currentHandle.classList.remove('highlight');
        
        const prevTh = th.previousElementSibling;
        if (prevTh) {
          const prevHandle = prevTh.querySelector('.resize-handle');
          if (prevHandle) prevHandle.classList.remove('highlight');
        }
      });
      
      headerRow.appendChild(th);
    });

    const sortedIds = getSortedIds();

    sortedIds.forEach((listingId, index) => {
      const originalIndex = shortlistedIds.indexOf(listingId);
      const details = shortlistDetails[listingId] || {};
      const comment = comments[listingId] || '';
      
      const bookingPeriod = details.bookingPeriod || extractBookingPeriodFromUrl(details.url);
      
      const currentPrice = details.price;
      const currentUrl = details.url;
      const currentImages = details.images || (details.imageUrl ? [details.imageUrl] : []);

      const row = document.createElement('tr');
      row.dataset.listingId = listingId;
      row.draggable = true;

      visibleColumns.forEach(col => {
        const td = document.createElement('td');
        td.className = `col-${col.id} align-${col.align}`;
        
        switch (col.id) {
          case 'grabber':
            const grabberDiv = document.createElement('div');
            grabberDiv.className = 'grabber-container';
            
            const upChevron = document.createElement('button');
            upChevron.className = 'chevron-btn chevron-up';
            upChevron.title = 'Move to top';
            upChevron.addEventListener('click', (e) => {
              e.stopPropagation();
              moveToTop(listingId);
            });
            
            const grabber = document.createElement('span');
            grabber.className = 'grabber';
            grabber.textContent = '⋮⋮';
            
            const downChevron = document.createElement('button');
            downChevron.className = 'chevron-btn chevron-down';
            downChevron.title = 'Move to bottom';
            downChevron.addEventListener('click', (e) => {
              e.stopPropagation();
              moveToBottom(listingId);
            });
            
            grabberDiv.appendChild(upChevron);
            grabberDiv.appendChild(grabber);
            grabberDiv.appendChild(downChevron);
            td.appendChild(grabberDiv);
            break;
            
          case 'number':
            td.innerHTML = `<div class="number-cell">#${index + 1}</div>`;
            break;
            
          case 'image':
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.style.gridTemplateColumns = `repeat(${imageCount}, 1fr)`;
            
            const imagesToShow = currentImages.slice(0, imageCount);
            
            if (imagesToShow.length > 0 && currentUrl) {
              imagesToShow.forEach((imgUrl, idx) => {
                const link = document.createElement('a');
                link.href = details.url;
                link.className = 'property-image-link';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `Property ${idx + 1}`;
                img.className = 'property-image';
                img.loading = 'lazy';
                img.decoding = 'async';
                
                link.appendChild(img);
                imageContainer.appendChild(link);
              });
            } else if (imagesToShow.length > 0) {
              imagesToShow.forEach((imgUrl, idx) => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `Property ${idx + 1}`;
                img.className = 'property-image';
                img.loading = 'lazy';
                img.decoding = 'async';
                imageContainer.appendChild(img);
              });
            } else {
              imageContainer.innerHTML = '<span style="color: #9ca3af;">No image</span>';
            }
            
            td.appendChild(imageContainer);
            break;
            
          case 'price':
            if (currentPrice && typeof currentPrice === 'string') {
              const priceNum = extractNumericPrice(currentPrice);
              const currency = extractCurrency(currentPrice);
              const formattedPrice = priceNum ? formatPrice(priceNum, currency) : currentPrice;
              if (currentUrl) {
                td.innerHTML = `<a href="${currentUrl}" class="price-link" target="_blank" rel="noopener noreferrer">${formattedPrice}</a>`;
              } else {
                td.innerHTML = `<span class="price-value">${formattedPrice}</span>`;
              }
            } else {
              td.innerHTML = `<span class="price-value" style="color: #9ca3af;">N/A</span>`;
            }
            break;
            
          case 'rating':
            if (details.rating) {
              const reviewText = details.reviewCount ? ` (${details.reviewCount})` : '';
              td.innerHTML = `
                <div class="rating-value">
                  <span class="star-icon">★</span>
                  <span class="rating-text">${details.rating.toFixed(2)}</span>
                  <span class="review-count">${reviewText}</span>
                </div>
              `;
            } else {
              td.innerHTML = '<span style="color: #9ca3af;">N/A</span>';
            }
            break;
          
          case 'beds':
            const formattedBeds = formatBedString(details.beds);
            if (formattedBeds) {
                const parts = formattedBeds.split(', ');
                td.innerHTML = parts.map(p => `<span class="bed-tag">${p}</span>`).join(' ');
            } else {
                td.innerHTML = '<span style="color: #9ca3af; font-size: 13px; cursor: pointer;">Add beds...</span>';
            }
            td.style.cursor = 'pointer';
            td.addEventListener('click', (e) => {
                e.stopPropagation(); 
                showBedPopup(listingId, td);
            });
            break;
            
          case 'booking':
            if (bookingPeriod) {
              td.innerHTML = `<div class="booking-dates">${formatDateRange(bookingPeriod.checkin, bookingPeriod.checkout)}</div>`;
            } else {
              td.innerHTML = '<span style="color: #9ca3af;">N/A</span>';
            }
            break;
            
          case 'cancellation':
            const cancellationValue = details.freeCancellation;
            if (cancellationValue && cancellationValue !== 'Available' && cancellationValue !== true) {
              td.innerHTML = `<span class="cancellation-badge yes">${cancellationValue}</span>`;
            } else if (cancellationValue) {
              td.innerHTML = `<span class="cancellation-badge yes">Yes</span>`;
            } else if (details.extractedFromPage) {
              td.innerHTML = `<span class="cancellation-badge no">No</span>`;
            } else {
              td.innerHTML = `<span class="amenity-badge unknown">?</span>`;
            }
            break;
            
          case 'checkin':
          case 'parking':
          case 'washer':
          case 'netflix':
          case 'evcharger':
          case 'aircon':
          case 'fireplace':
          case 'pool':
          case 'luggage':
          case 'bbq':
          case 'terrace':
          case 'garden':
          case 'firepit':
          case 'iron':
          case 'dishwasher':
          case 'beach':
          case 'kingbed':
          case 'psxbox':
          case 'desk':
          case 'attic':
          case 'bikes':
            const amenityValue = getAmenityValue(details, col.id);
            if (amenityValue === true) {
              td.innerHTML = `<span class="amenity-badge yes">Yes</span>`;
            } else if (amenityValue === false) {
              td.innerHTML = `<span class="amenity-badge no">No</span>`;
            } else {
              td.innerHTML = `<span class="amenity-badge unknown">?</span>`;
            }
            break;
            
          case 'comments':
            td.innerHTML = `<textarea class="comment-input" data-listing-id="${listingId}" placeholder="Add your notes...">${comment}</textarea>`;
            break;
            
          case 'actions':
            const actionsCell = document.createElement('div');
            actionsCell.className = 'actions-cell';
            
            if (trips.length > 1) {
              actionsCell.classList.remove('actions-cell-no-trip');
              
              const tripSelectWrapper = document.createElement('div');
              tripSelectWrapper.className = 'trip-select-wrapper';
              
              const tripSelect = document.createElement('select');
              tripSelect.className = 'trip-select';
              tripSelect.dataset.listingId = listingId;
              
              const noneOption = document.createElement('option');
              noneOption.value = '';
              noneOption.textContent = 'No trip';
              tripSelect.appendChild(noneOption);
              
              trips.forEach(trip => {
                const option = document.createElement('option');
                option.value = trip.id;
                option.textContent = trip.name;
                if (propertyTrips[listingId] === trip.id) {
                  option.selected = true;
                }
                tripSelect.appendChild(option);
              });
              
              tripSelect.addEventListener('change', async (e) => {
                const selectedTripId = e.target.value;
                
                shortlistedIds = shortlistedIds.filter(id => id !== listingId);
                shortlistedIds.push(listingId);

                if (selectedTripId) {
                  propertyTrips[listingId] = selectedTripId;
                } else {
                  delete propertyTrips[listingId];
                }

                await saveTripsData();
                await setStore({ [STORAGE_KEYS.SHORTLISTED]: shortlistedIds });
                updateTripsDropdown();
                renderTable();
              });
              
              tripSelectWrapper.appendChild(tripSelect);
              actionsCell.appendChild(tripSelectWrapper);
            } else {
              actionsCell.classList.add('actions-cell-no-trip');
            }
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn-remove';
            removeBtn.dataset.listingId = listingId;
            removeBtn.textContent = 'Remove';
            actionsCell.appendChild(removeBtn);
            
            td.appendChild(actionsCell);
            break;
        }
        
        row.appendChild(td);
      });

      tbody.appendChild(row);

      const commentInput = row.querySelector('.comment-input');
      if (commentInput) {
        commentInput.addEventListener('blur', async (e) => {
          const id = e.target.dataset.listingId;
          const value = e.target.value;
          comments[id] = value;
          await setStore({ [STORAGE_KEYS.SHORTLIST_COMMENTS]: comments });
        });
      }

      const removeBtn = row.querySelector('.btn-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', async (e) => {
          const id = e.target.dataset.listingId;
          await removeFromShortlist(id);
        });
      }

      setupRowDragAndDrop(row);
    });

    applyFilters();
    updateSortIndicators();
    
    Object.keys(filters).forEach(columnId => {
      updateFilterIndicator(columnId);
    });
    
    setTimeout(() => adjustImageColumnForSpace(), 100);
  }

  function formatPrice(num, currency) {
    const formatted = num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    if (currency === 'Ft') {
      return `${currency}${formatted}`;
    }
    
    return `${currency}${formatted}`;
  }

  function formatDateRange(checkinStr, checkoutStr) {
    if (!checkinStr || !checkoutStr) return 'N/A';
    
    const checkin = new Date(checkinStr);
    const checkout = new Date(checkoutStr);
    
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) return 'N/A';
    
    const checkinDay = checkin.getDate();
    const checkoutDay = checkout.getDate();
    const checkinMonth = checkin.toLocaleDateString('en-US', { month: 'short' });
    const checkoutMonth = checkout.toLocaleDateString('en-US', { month: 'short' });
    const checkinYear = checkin.getFullYear();
    const checkoutYear = checkout.getFullYear();
    
    if (checkinYear === checkoutYear && checkinMonth === checkoutMonth) {
      return `${checkinDay}-${checkoutDay} ${checkinMonth} ${checkinYear}`;
    } else if (checkinYear === checkoutYear) {
      return `${checkinDay} ${checkinMonth} - ${checkoutDay} ${checkoutMonth} ${checkinYear}`;
    } else {
      return `${checkinDay} ${checkinMonth} ${checkinYear} - ${checkoutDay} ${checkoutMonth} ${checkoutYear}`;
    }
  }

  async function removeFromShortlist(listingId) {
    shortlistedIds = shortlistedIds.filter(id => id !== listingId);
    delete shortlistDetails[listingId];
    delete comments[listingId];
    delete propertyTrips[listingId];

    await setStore({
      [STORAGE_KEYS.SHORTLISTED]: shortlistedIds,
      [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails,
      [STORAGE_KEYS.SHORTLIST_COMMENTS]: comments
    });
    
    await saveTripsData();
    updateTripsDropdown();
    renderTable();
  }

  function setupRowDragAndDrop(row) {
    row.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', row.innerHTML);
      row.classList.add('dragging');
      e.dataTransfer.setData('listingId', row.dataset.listingId);
    });

    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
    });

    row.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      const draggingRow = document.querySelector('.dragging');
      if (!draggingRow || draggingRow === row) return;

      const tbody = row.parentNode;
      const rows = Array.from(tbody.querySelectorAll('tr:not(.dragging)'));
      const currentIndex = rows.indexOf(row);
      const draggingIndex = rows.indexOf(draggingRow);

      if (currentIndex > draggingIndex) {
        row.parentNode.insertBefore(draggingRow, row.nextSibling);
      } else {
        row.parentNode.insertBefore(draggingRow, row);
      }
    });

    row.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const tbody = document.getElementById('shortlistBody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      
      const newVisibleOrder = rows.map(r => r.dataset.listingId);
      
      const hiddenIds = shortlistedIds.filter(id => !newVisibleOrder.includes(id));
      shortlistedIds = [...newVisibleOrder, ...hiddenIds];

      await setStore({ [STORAGE_KEYS.SHORTLISTED]: shortlistedIds });
      renderTable();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();