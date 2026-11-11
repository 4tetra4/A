(function() {
  'use strict';
  
  const STORAGE_KEYS = {
    SETTINGS: "airbxbSettings",
    BLOCKED: "airbxbBlocked",
    SHORTLISTED: "airbxbShortlisted",
    SHORTLIST_DETAILS: "airbxbShortlistDetails",
    SHORTLIST_COMMENTS: "airbxbShortlistComments",
    TRIPS: "airbxbTrips"
  };

  const AMENITY_CATEGORIES = {
    "Views & Outdoors": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/></svg>',
      amenities: [
        { id: "154", name: "Mountain view" },
        { id: "132", name: "Waterfront" },
        { id: "133", name: "Lake access" },
        { id: "381", name: "Beach" },
        { id: "155", name: "Beach view" },
        { id: "674", name: "Beach access" },
        { id: "134", name: "Beachfront" },
        { id: "528", name: "Resort access" },
        { id: "255", name: "Garden" },
        { id: "101", name: "Backyard" },
        { id: "180", name: "Terrace" },
        { id: "181", name: "Balcony" },
        { id: "100", name: "Patio or balcony" },
        { id: "179", name: "Outdoor dining area" },
        { id: "182", name: "Pergola" },
        { id: "183", name: "Gazebo" },
        { id: "280", name: "Outdoor furniture" },
        { id: "510", name: "Patio" },
        { id: "577", name: "Veranda" },
        { id: "575", name: "Trellised courtyard" },
        { id: "532", name: "Rooftop" },
        { id: "549", name: "Sliding glass walls" },
        { id: "153", name: "Hammock" },
        { id: "99", name: "BBQ grill" },
        { id: "219", name: "Fire pit" },
        { id: "176", name: "Beach chairs" },
        { id: "184", name: "Outdoor kitchen" },
        { id: "186", name: "Brick oven" },
        { id: "216", name: "Natural gas barbeque" },
        { id: "217", name: "Charcoal barbeque" },
        { id: "218", name: "Propane barbeque" },
        { id: "332", name: "Grill" },
        { id: "448", name: "Gas burning stove" },
        { id: "449", name: "Gas fireplace" },
        { id: "450", name: "Gas grill" },
        { id: "193", name: "Stables" },
        { id: "195", name: "Greenhouse" },
        { id: "203", name: "Misting system" },
        { id: "207", name: "Fountain" },
        { id: "208", name: "Pond" },
        { id: "210", name: "Outdoor shower" },
        { id: "211", name: "Mosquito net" },
        { id: "102", name: "Beach essentials" },
        { id: "382", name: "Beach bar" },
        { id: "383", name: "Beach club" },
        { id: "384", name: "Beach house" },
        { id: "385", name: "Beach towels" },
        { id: "386", name: "Beach umbrella" },
        { id: "420", name: "Courtyard" },
        { id: "433", name: "Dock" },
        { id: "478", name: "Lanai" },
        { id: "481", name: "Lookout point" },
        { id: "482", name: "Lounge chairs" },
        { id: "504", name: "Outdoor adapter" },
        { id: "506", name: "Palapa" },
        { id: "508", name: "Parasols" },
        { id: "565", name: "Sun bed" },
        { id: "566", name: "Sun deck" },
        { id: "578", name: "View tower" },
        { id: "473", name: "Juliet balcony" },
        { id: "194", name: "Grotto" },
        { id: "135", name: "Ski-in/Ski-out" }
      ]
    },
    "Pool": {
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 16.99c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.6.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.6.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-4.5c-1.35 0-2.2.43-2.95.8-.65.32-1.18.59-2.05.59-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.59-2.05.59v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.6.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.6.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-8.08c-.75-.38-1.6-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.59-2.05.59-.9 0-1.4-.25-2.05-.6-.75-.37-1.6-.79-2.95-.79s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.37 1.6.79 2.95.79s2.2-.42 2.95-.8c.65-.32 1.18-.59 2.05-.59.9 0 1.4.25 2.05.6.75.38 1.6.8 2.95.8V4.36c-.9 0-1.4-.25-2.05-.59zM17 8.09c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.6-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.59 2.05-.59s1.4.25 2.05.6c.75.37 1.6.79 2.95.79s2.2-.42 2.95-.8c.65-.32 1.18-.59 2.05-.59.9 0 1.4.25 2.05.6.75.38 1.6.8 2.95.8V8.89c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z"/></svg>',
      amenities: [
        { id: "7", name: "Pool" },
        { id: "239", name: "Swimming pool" },
        { id: "258", name: "Private pool" },
        { id: "259", name: "Shared pool" },
        { id: "367", name: "Indoor pool" },
        { id: "254", name: "Heated pool" },
        { id: "240", name: "Infinity pool" },
        { id: "458", name: "Heated infinity pool" },
        { id: "538", name: "Saltwater infinity pool" },
        { id: "539", name: "Saltwater pool" },
        { id: "238", name: "Olympic size pool" },
        { id: "241", name: "Plunge pool" },
        { id: "242", name: "Lap pool" },
        { id: "243", name: "Children's pool" },
        { id: "498", name: "Multi-level pool" },
        { id: "584", name: "Wave pool" },
        { id: "244", name: "Pool house" },
        { id: "519", name: "Pool bar" },
        { id: "245", name: "Pool waterslide" },
        { id: "246", name: "Pool waterfall" },
        { id: "248", name: "Sun loungers" },
        { id: "249", name: "Day bed" },
        { id: "250", name: "Pool toys" },
        { id: "278", name: "Pool cover" },
        { id: "520", name: "Pool safety fence" },
        { id: "247", name: "Swim up bar" },
        { id: "340", name: "Baby pool safety fence" },
        { id: "26", name: "Jacuzzi tub" }
      ]
    },
"Entertainment & Media": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>',
      amenities: [
        { id: "1", name: "Television" },
        { id: "58", name: "TV - No clue what is the difference ;)" },
        { id: "151", name: "Smart TV" }, 
        { id: "354", name: "Streaming services" },
        { id: "265", name: "Netflix" },
        { id: "266", name: "HBO GO" },
        { id: "370", name: "Apple TV" },
        { id: "2", name: "Cable TV" },
        { id: "542", name: "Satellite TV" },
        { id: "75", name: "Game console" },
        { id: "596", name: "Xbox" },
        { id: "517", name: "PlayStation" },
        { id: "503", name: "Nintendo Wii" },
        { id: "355", name: "Video games" },
        { id: "347", name: "Piano" },
        { id: "348", name: "Guitar" },
        { id: "442", name: "Foosball table" },
        { id: "152", name: "DVD player" },
        { id: "185", name: "Sound system" },
        { id: "267", name: "Amazon Echo" },
        { id: "333", name: "Entertainment system" },
        { id: "334", name: "Music system" },
        { id: "335", name: "Movie collection" },
        { id: "349", name: "Games" },
        { id: "356", name: "Smart technology" },
        { id: "452", name: "Google Home" },
        { id: "369", name: "Air hockey table" },
        { id: "371", name: "Arcade games" },
        { id: "390", name: "Bluetooth speaker" },
        { id: "391", name: "Blu-Ray player" },
        { id: "392", name: "Board games" },
        { id: "394", name: "Books and reading material" },
        { id: "397", name: "Bose sound system" },
        { id: "398", name: "Bose stereo" },
        { id: "405", name: "CD player" },
        { id: "410", name: "Children's books" },
        { id: "411", name: "Children's toys" },
        { id: "419", name: "Cordless phone" },
        { id: "426", name: "Darts" },
        { id: "434", name: "DVR" },
        { id: "443", name: "Formula 1 simulator" },
        { id: "446", name: "Game room" },
        { id: "447", name: "Game table" },
        { id: "459", name: "Movie theater, Cinema" },
        { id: "466", name: "iPad" },
        { id: "467", name: "iPhone dock" },
        { id: "468", name: "iPhone speaker" },
        { id: "469", name: "iPod dock" },
        { id: "470", name: "iPod speaker" },
        { id: "472", name: "Jukebox" },
        { id: "474", name: "Karaoke machine" },
        { id: "479", name: "Laptop" },
        { id: "484", name: "Mahjong table" },
        { id: "490", name: "Media room" },
        { id: "493", name: "Monitor" },
        { id: "496", name: "MP3 player" },
        { id: "499", name: "Music room" },
        { id: "514", name: "Pinball machine" },
        { id: "515", name: "Ping pong table" },
        { id: "518", name: "Poker table" },
        { id: "521", name: "Pool table" },
        { id: "525", name: "Projector" },
        { id: "527", name: "Record player" },
        { id: "541", name: "Satellite radio" },
        { id: "545", name: "Shuffleboard" },
        { id: "550", name: "Smart home technology" },
        { id: "551", name: "Smart lighting" },
        { id: "553", name: "Snooker table" },
        { id: "555", name: "Sonos sound system" },
        { id: "567", name: "Surround sound system" },
        { id: "569", name: "Tablet" },
        { id: "572", name: "Tivo" },
        { id: "338", name: "Walkie talkie" },
        { id: "359", name: "Arts and crafts" },
        { id: "377", name: "Backgammon" },
        { id: "346", name: "Telescope" },
        { id: "389", name: "Binoculars" }
      ]
    },
    "Check-in & Building": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
      amenities: [
        { id: "43", name: "24-hour check-in" },
        { id: "51", name: "Self check-in" },
        { id: "52", name: "Smart lock" },
        { id: "53", name: "Keypad" },
        { id: "54", name: "Lockbox" },
        { id: "103", name: "Luggage dropoff allowed" },
        { id: "483", name: "Luggage storage" },
        { id: "14", name: "Doorman" },
        { id: "21", name: "Elevator" },
        { id: "28", name: "Buzzer/wireless intercom" },
        { id: "55", name: "Building staff" },
        { id: "57", name: "Private entrance" },
        { id: "106", name: "Pick up service" },
        { id: "129", name: "Host greets you" },
        { id: "220", name: "Generator" },
        { id: "209", name: "Solar power" },
        { id: "284", name: "Mudroom" },
        { id: "307", name: "Dumbwaiter" },
        { id: "401", name: "Business center" },
        { id: "414", name: "Coatroom" },
        { id: "526", name: "Reception area" },
        { id: "454", name: "Guesthouse" },
        { id: "591", name: "Wireless intercom" }
      ]
    },
    "Special Features": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
      amenities: [
        { id: "374", name: "Attic" },
        { id: "27", name: "Indoor fireplace" },
        { id: "592", name: "Wood-burning fireplace" },
        { id: "56", name: "Private living room" },
        { id: "98", name: "Single level home" },
        { id: "104", name: "Long term stays allowed" },
        { id: "107", name: "Cleaning available during stay" },
        { id: "131", name: "Other" },
        { id: "215", name: "Chapel" },
        { id: "276", name: "Warming drawer" },
        { id: "299", name: "Slippers" },
        { id: "300", name: "Daily newspaper" },
        { id: "303", name: "Clock radio" },
        { id: "396", name: "Boot dryers" },
        { id: "461", name: "Hospital" },
        { id: "509", name: "Party lighting" },
        { id: "357", name: "Lighting" }
      ]
    },
    "Kitchen & Dining": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>',
      amenities: [
        { id: "8", name: "Kitchen" },
        { id: "285", name: "Full kitchen" },
        { id: "89", name: "Microwave" },
        { id: "90", name: "Coffee maker" },
        { id: "91", name: "Refrigerator" },
        { id: "92", name: "Dishwasher" },
        { id: "93", name: "Dishes and silverware" },
        { id: "94", name: "Cooking basics" },
        { id: "95", name: "Oven" },
        { id: "187", name: "Gas oven" },
        { id: "96", name: "Stove" },
        { id: "188", name: "Bar" },
        { id: "137", name: "Hot water kettle" },
        { id: "145", name: "Kitchenette" },
        { id: "146", name: "Mini fridge" },
        { id: "233", name: "Breakfast bar" },
        { id: "234", name: "Breakfast table" },
        { id: "235", name: "Espresso machine" },
        { id: "236", name: "Dining table" },
        { id: "237", name: "Formal dining area" },
        { id: "251", name: "Toaster" },
        { id: "262", name: "Steam oven" },
        { id: "263", name: "Double oven" },
        { id: "264", name: "Convection oven" },
        { id: "274", name: "Wine cooler" },
        { id: "301", name: "Coffee grinder" },
        { id: "302", name: "Coffee beans" },
        { id: "308", name: "Freezer" },
        { id: "309", name: "Toaster oven" },
        { id: "310", name: "Asian steamer pots" },
        { id: "311", name: "Deep fryer" },
        { id: "312", name: "Dough maker" },
        { id: "313", name: "Food mixer" },
        { id: "314", name: "Food processor" },
        { id: "315", name: "Rice maker" },
        { id: "316", name: "Popcorn maker" },
        { id: "317", name: "Cotton candy machine" },
        { id: "318", name: "Frozen yogurt machine" },
        { id: "319", name: "Slow cooker" },
        { id: "320", name: "Juicer" },
        { id: "321", name: "Sodamaster" },
        { id: "322", name: "Blender" },
        { id: "325", name: "Ice cream maker" },
        { id: "326", name: "Water cooler" },
        { id: "327", name: "Water filtration system" },
        { id: "328", name: "Water filter" },
        { id: "329", name: "Ice cooler" },
        { id: "330", name: "Ice machine" },
        { id: "331", name: "Pour-over coffee" },
        { id: "408", name: "Chef's kitchen" },
        { id: "415", name: "Coffee" },
        { id: "428", name: "Dining area" },
        { id: "440", name: "Flattop grill" },
        { id: "463", name: "Immersion blender" },
        { id: "464", name: "Induction cooker" },
        { id: "476", name: "Keurig coffee machine" },
        { id: "500", name: "Nespresso machine" },
        { id: "507", name: "Pantry" },
        { id: "524", name: "Pressure cooker" },
        { id: "561", name: "Staff kitchen" },
        { id: "564", name: "Sub-Zero refrigerator" },
        { id: "579", name: "Vitamix blender" },
        { id: "582", name: "Walk-in pantry" },
        { id: "625", name: "Baking sheet" },
        { id: "626", name: "BBQ utensils" },
        { id: "672", name: "Wine glasses" },
        { id: "516", name: "Pizza oven" },
        { id: "593", name: "Wood-burning oven" },
        { id: "594", name: "Wood-burning stove" },
        { id: "387", name: "Belgian wafflemaker" },
        { id: "350", name: "Tea" },
        { id: "324", name: "Margarita machine" },
        { id: "306", name: "Serving platters" },
        { id: "323", name: "Portable cooler" },
        { id: "252", name: "Stainless steel appliances" },
        { id: "16", name: "Breakfast" },
        { id: "585", name: "Wet bar" }
      ]
    },
    "Bedroom & Laundry": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>',
      amenities: [
        { id: "1000", name: "King Bed" },
        { id: "1005", name: "Futon" },
        { id: "33", name: "Washer" },
        { id: "34", name: "Dryer" },
        { id: "42", name: "Lock on bedroom door" },
        { id: "44", name: "Hangers" },
        { id: "45", name: "Hair dryer" },
        { id: "46", name: "Iron" },
        { id: "73", name: "Room-darkening shades" },
        { id: "117", name: "Extra space around bed" },
        { id: "118", name: "Accessible-height bed" },
        { id: "144", name: "Walk in closet" },
        { id: "147", name: "Lounge area" },
        { id: "148", name: "Dressing area" },
        { id: "149", name: "Desk" },
        { id: "150", name: "Reading nook" },
        { id: "268", name: "Standing valet" },
        { id: "269", name: "Pillow-top mattress" },
        { id: "270", name: "Memory foam mattress" },
        { id: "273", name: "Murphy bed" },
        { id: "304", name: "Ironing board" },
        { id: "305", name: "Blinds" },
        { id: "351", name: "Clothing steamer" },
        { id: "413", name: "Clothes steamer" },
        { id: "435", name: "Electric blinds" },
        { id: "444", name: "Frette sheets" },
        { id: "513", name: "Pillow menu" },
        { id: "531", name: "Rocking chair" },
        { id: "663", name: "Laundromat nearby" },
        { id: "665", name: "Cleaning products" },
        { id: "667", name: "Drying rack for clothing" },
        { id: "671", name: "Clothing storage" }
      ]
    },
    "Bathroom": {
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 14v2h-3v-1.72l3-.28m0-1c0-1.1-1-2-2.2-2H10v-1H5v11h5v-7.09l9-.91M5 9h5V7l5.36-1.79a.932.932 0 1 0-.61-1.76L5 7v2Z"/></svg>',
      amenities: [
        { id: "41", name: "Shampoo" },
        { id: "61", name: "Bathtub" },
        { id: "62", name: "Baby bath" },
        { id: "78", name: "Private bathroom" },
        { id: "79", name: "Body soap" },
        { id: "136", name: "Handheld shower head" },
        { id: "156", name: "Triple vanity" },
        { id: "157", name: "Dual vanity" },
        { id: "158", name: "Stand alone jetted bathtub" },
        { id: "159", name: "Stand alone shower" },
        { id: "160", name: "Stand alone rain shower" },
        { id: "161", name: "Stand alone steam shower" },
        { id: "162", name: "Stand alone bathtub" },
        { id: "163", name: "Shower bathtub combo" },
        { id: "164", name: "Rain shower" },
        { id: "165", name: "Jetted tub" },
        { id: "166", name: "Alfresco bathtub" },
        { id: "167", name: "Bidet" },
        { id: "168", name: "Heated towel rack" },
        { id: "253", name: "Large mirror" },
        { id: "275", name: "En suite bathroom" },
        { id: "281", name: "Soaking tub" },
        { id: "283", name: "Walk-in shower" },
        { id: "294", name: "Fixed grab bars for shower" },
        { id: "295", name: "Fixed grab bars for toilet" },
        { id: "296", name: "Step-free shower" },
        { id: "297", name: "Shower or bath chair" },
        { id: "298", name: "Bathrobe" },
        { id: "380", name: "Bathrobes" },
        { id: "497", name: "Multi-jet shower" },
        { id: "523", name: "Powder room" },
        { id: "611", name: "Shower gel" },
        { id: "657", name: "Conditioner" },
        { id: "277", name: "Touchless faucets" }
      ]
    },
    "Sports & Recreation": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>',
      amenities: [
        { id: "196", name: "Beach volleyball" },
        { id: "197", name: "Golf simulator" },
        { id: "198", name: "Golf cart" },
        { id: "199", name: "UTV" },
        { id: "200", name: "ATV" },
        { id: "201", name: "Bikes" },
        { id: "202", name: "Putting green" },
        { id: "204", name: "Climbing wall" },
        { id: "205", name: "Badminton" },
        { id: "206", name: "Croquet" },
        { id: "214", name: "Tennis court" },
        { id: "343", name: "Seabob" },
        { id: "344", name: "Boat" },
        { id: "368", name: "Golf" },
        { id: "177", name: "Boogie boards" },
        { id: "178", name: "Snorkeling equipment" },
        { id: "378", name: "Badminton field" },
        { id: "393", name: "Bocce ball court" },
        { id: "439", name: "Fishing boat" },
        { id: "451", name: "Golf course access" },
        { id: "453", name: "Grass tennis court" },
        { id: "460", name: "Horseshoes" },
        { id: "475", name: "Kayaks" },
        { id: "505", name: "Paddle boats" },
        { id: "511", name: "Petanque court" },
        { id: "530", name: "Riding arena" },
        { id: "559", name: "Speed boat" },
        { id: "571", name: "Tennis club" },
        { id: "573", name: "Trail access" },
        { id: "581", name: "Volleyball court" },
        { id: "583", name: "Water skis" },
        { id: "598", name: "Zip-line" },
        { id: "664", name: "Boat slip" },
        { id: "400", name: "Boxing ring" },
        { id: "546", name: "Ski locker" },
        { id: "547", name: "Ski rack" },
        { id: "548", name: "Ski room" }
      ]
    },
    "Fitness & Wellness": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>',
      amenities: [
        { id: "15", name: "Gym" },
        { id: "25", name: "Hot tub" },
        { id: "537", name: "Saltwater hot tub" },
        { id: "260", name: "Private hot tub" },
        { id: "261", name: "Shared hot tub" },
        { id: "223", name: "Sauna" },
        { id: "224", name: "Steam room" },
        { id: "225", name: "Hammam" },
        { id: "226", name: "Massage table" },
        { id: "227", name: "Exercise equipment" },
        { id: "256", name: "Private gym" },
        { id: "257", name: "Shared gym" },
        { id: "352", name: "Spa equipment" },
        { id: "423", name: "Cross trainer" },
        { id: "436", name: "Exercise balls" },
        { id: "437", name: "Exercise bike" },
        { id: "438", name: "Exercise mat" },
        { id: "465", name: "Infrared sauna" },
        { id: "471", name: "Jogging track" },
        { id: "485", name: "Massage bale" },
        { id: "486", name: "Massage bed" },
        { id: "487", name: "Massage chair" },
        { id: "488", name: "Massage couch" },
        { id: "489", name: "Massage room" },
        { id: "491", name: "Meditation room" },
        { id: "512", name: "Pilates room" },
        { id: "533", name: "Rowing machine" },
        { id: "556", name: "Spa" },
        { id: "557", name: "Spa access" },
        { id: "558", name: "Spa room" },
        { id: "562", name: "Steam bath" },
        { id: "574", name: "Treadmill" },
        { id: "576", name: "Turkish bath" },
        { id: "595", name: "Workout bench" },
        { id: "597", name: "Yoga studio" }
      ]
    },
    "Internet & Office": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>',
      amenities: [
        { id: "3", name: "Internet" },
        { id: "4", name: "Wifi" },
        { id: "47", name: "Dedicated workspace" },
        { id: "87", name: "Ethernet connection" },
        { id: "88", name: "Pocket wifi" },
        { id: "221", name: "Computer" },
        { id: "222", name: "Printer" },
        { id: "271", name: "High-resolution computer monitor" },
        { id: "272", name: "Fax machine" },
        { id: "336", name: "Phone" },
        { id: "337", name: "Cell reception" },
        { id: "358", name: "Device chargers" },
        { id: "416", name: "Conference center" },
        { id: "417", name: "Conference room" },
        { id: "418", name: "Copier" },
        { id: "543", name: "Scanner" },
        { id: "580", name: "VoIP phone" }
      ]
    },
    "Essentials": {
      icon: '<svg viewBox="0 0 42.6 98.1" fill="currentColor"><path d="M33,25c0,0-.2,0-.2,0h0c-.5,0-1-.1-1.6-.1H10.6c-.5,0-1,0-1.5.1,0,0,0,0,0,0,0,0-.2,0-.2,0C3.8,25.9,0,30.4,0,35.9v3.3h41.8v-3.3c0-5.4-3.8-10-8.8-10.9h0Z"/><path d="M26.4,16.1h-10.9c-2.5,0-4.6,2.2-4.6,4.8v.8h20.1v-.8c0-2.7-2.1-4.8-4.6-4.8h0Z"/><path d="M40.4,0H12.7c-1.2,0-2.3,1-2.3,2.3s1,2.3,2.3,2.3h6v8.4h4.5V4.5h17.2c1.2,0,2.3-1,2.3-2.3s-1-2.2-2.3-2.2h0Z"/><path d="M0,87C0,93.2,4.8,98.1,10.6,98.1h20.5c5.9,0,10.6-5,10.6-11.1v-3.3H0v3.3Z"/><path d="M0,42.3h41.8v38.4H0v-38.4Z"/></svg>',
      amenities: [
        { id: "40", name: "Essentials" },
        { id: "77", name: "Hot water" },
        { id: "80", name: "Hand soap" },
        { id: "81", name: "Bath towel" },
        { id: "82", name: "Hand or paper towel" },
        { id: "83", name: "Toilet paper" },
        { id: "84", name: "Feminine hygiene products" },
        { id: "85", name: "Bed linens" },
        { id: "86", name: "Extra pillows and blankets" },
        { id: "292", name: "Bedroom comforts" },
        { id: "293", name: "Bathroom essentials" }
      ]
    },
    "Family & Children": {
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7" r="3"/><path d="M12 11c-3.333 0-6 2-6 5v1h12v-1c0-3-2.667-5-6-5z"/><circle cx="6" cy="9" r="2"/><path d="M6 12c-2 0-3 1-3 3v1h6v-1c0-2-1-3-3-3z"/><circle cx="18" cy="9" r="2"/><path d="M18 12c2 0 3 1 3 3v1h-6v-1c0-2 1-3 3-3z"/></svg>',
      amenities: [
        { id: "31", name: "Family/kid friendly" },
        { id: "59", name: "Baby monitor" },
        { id: "60", name: "Outlet covers" },
        { id: "63", name: "Changing table" },
        { id: "64", name: "High chair" },
        { id: "65", name: "Baby safety gates" },
        { id: "66", name: "Children's books and toys" },
        { id: "67", name: "Window guards" },
        { id: "68", name: "Table corner guards" },
        { id: "69", name: "Fireplace guards" },
        { id: "70", name: "Babysitter recommendations" },
        { id: "71", name: "Crib" },
        { id: "72", name: "Pack 'n play/Travel crib" },
        { id: "74", name: "Children's dinnerware" },
        { id: "286", name: "Crib" },
        { id: "339", name: "Baby safety gate" },
        { id: "341", name: "Baby car seat" },
        { id: "342", name: "Baby stroller" },
        { id: "345", name: "Jungle gym" },
        { id: "360", name: "Playpen" },
        { id: "361", name: "Kids TV room" },
        { id: "362", name: "Playhouse" },
        { id: "363", name: "Children's playroom" },
        { id: "364", name: "Outdoor playground" },
        { id: "365", name: "Bottle warmers" },
        { id: "375", name: "Baby bath kit" },
        { id: "376", name: "Baby equipment" },
        { id: "395", name: "Booster seat" },
        { id: "404", name: "Car seat" },
        { id: "409", name: "Childproof bedroom" },
        { id: "421", name: "Cradle" },
        { id: "477", name: "Kids' club" },
        { id: "540", name: "Sandbox" },
        { id: "563", name: "Stroller" },
        { id: "568", name: "Swings" }
      ]
    },
    "Heating & Cooling": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z"/></svg>',
      amenities: [
        { id: "5", name: "Air conditioning" },
        { id: "30", name: "Heating" },
        { id: "138", name: "Air purifier" },
        { id: "139", name: "Ceiling fan" },
        { id: "140", name: "Central air conditioning" },
        { id: "141", name: "Radiant heating" },
        { id: "142", name: "Portable air conditioning" },
        { id: "143", name: "Heated floors" },
        { id: "279", name: "Heat lamps" },
        { id: "406", name: "Ceiling fans" },
        { id: "441", name: "Floor cooling" },
        { id: "456", name: "Heated boot rack" },
        { id: "457", name: "Heated floor" },
        { id: "462", name: "Humidifier" },
        { id: "494", name: "Mosquito misting system" },
        { id: "495", name: "Mosquito trap" },
        { id: "501", name: "Nest thermometer" },
        { id: "522", name: "Portable fans" }
      ]
    },
    "Luxury & Premium": {
      icon: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M0 6h4l3 8.6L0 6zm16 0h-4l-3 8.6L16 6zm-8 9L5 6h6l-3 9zM4 5H0l2-3l2 3zm12 0h-4l2-3l2 3zm-6 0H6l2-3l2 3zM3.34 2H7L5 5L3.34 2zM9 2h4l-2 3l-2-3z"/></svg>',
      amenities: [
        { id: "192", name: "Helipad" },
        { id: "228", name: "Wine cellar" },
        { id: "372", name: "Art gallery" },
        { id: "373", name: "Art studio" },
        { id: "379", name: "Banquet hall" },
        { id: "399", name: "Boutique" },
        { id: "402", name: "Card room" },
        { id: "403", name: "Card table" },
        { id: "407", name: "Champagne bar" },
        { id: "412", name: "Cigar room" },
        { id: "424", name: "Dance floor" },
        { id: "425", name: "Dance room" },
        { id: "429", name: "Discotheque" },
        { id: "430", name: "DJ booth" },
        { id: "431", name: "DJ platform" },
        { id: "432", name: "DJ turntables" },
        { id: "455", name: "Hair salon" },
        { id: "480", name: "Library" },
        { id: "492", name: "Minibar" },
        { id: "502", name: "Nightclub" },
        { id: "529", name: "Restaurant" },
        { id: "552", name: "Smoking parlor" },
        { id: "554", name: "Solarium" },
        { id: "560", name: "Sports bar" },
        { id: "570", name: "Tasting room" },
        { id: "586", name: "Wine bar" },
        { id: "587", name: "Wine cave" },
        { id: "588", name: "Wine collection" },
        { id: "589", name: "Wine room" },
        { id: "590", name: "Wine storage" }
      ]
    },
    "Parking & Transport": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>',
      amenities: [
        { id: "9", name: "Free parking on premises" },
        { id: "10", name: "Paid parking off premises" },
        { id: "22", name: "Garage parking" },
        { id: "23", name: "Free street parking" },
        { id: "24", name: "Permit parking" },
        { id: "97", name: "EV charger" },
        { id: "212", name: "Driveway parking" },
        { id: "213", name: "Underground parking" },
        { id: "282", name: "Outdoor parking" },
        { id: "287", name: "Paid parking on premises" },
        { id: "388", name: "Bike storage" },
        { id: "599", name: "Covered parking" }
      ]
    },
    "Safety & Security": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
      amenities: [
        { id: "35", name: "Smoke alarm" },
        { id: "36", name: "Carbon monoxide alarm" },
        { id: "37", name: "First aid kit" },
        { id: "38", name: "Safety card" },
        { id: "39", name: "Fire extinguisher" },
        { id: "229", name: "Security cameras" },
        { id: "230", name: "Security monitors" },
        { id: "231", name: "Alarm system" },
        { id: "232", name: "Safe" },
        { id: "534", name: "Safety deposit box" },
        { id: "535", name: "Safety gate" },
        { id: "536", name: "Safe room" },
        { id: "190", name: "Gated property" },
        { id: "191", name: "Gated community" },
        { id: "544", name: "Security system" }
      ]
    },
    "Accessibility": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
      amenities: [
        { id: "6", name: "Wheelchair accessible" },
        { id: "109", name: "Wide hallways" },
        { id: "110", name: "Step-free guest entrance" },
        { id: "111", name: "Guest entrance wider than 32 inches" },
        { id: "112", name: "Step-free path to the guest entrance" },
        { id: "113", name: "Lit path to the guest entrance" },
        { id: "114", name: "Accessible parking spot" },
        { id: "115", name: "Step-free access" },
        { id: "116", name: "Wide entrance" },
        { id: "120", name: "Step-free access" },
        { id: "121", name: "Wide doorway to guest bathroom" },
        { id: "122", name: "Fixed grab bars for shower, toilet" },
        { id: "123", name: "Bathtub with bath chair" },
        { id: "124", name: "Roll-in shower with chair" },
        { id: "125", name: "Accessible-height toilet" },
        { id: "126", name: "Wide clearance to shower, toilet" },
        { id: "127", name: "Step-free access" },
        { id: "128", name: "Wide entryway" },
        { id: "288", name: "Electric profiling bed" },
        { id: "289", name: "Mobile hoist" },
        { id: "290", name: "Swimming pool or hot tub hoist" },
        { id: "291", name: "Ceiling or mobile hoist" },
        { id: "366", name: "Wheelchair" }
      ]
    },
    "Pets & Policies": {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.61 7.24 8.32 6.87 6.54C6.5 4.77 7.17 3.19 8.35 3M15.5 3C16.69 3.19 17.35 4.77 17 6.54C16.62 8.32 15.37 9.61 14.19 9.43C13 9.25 12.35 7.67 12.72 5.9C13.08 4.12 14.33 2.83 15.5 3M3 7.6C4.14 7.11 5.69 8 6.5 9.55C7.26 11.13 7 12.79 5.87 13.28C4.74 13.77 3.2 12.89 2.41 11.32C1.62 9.75 1.9 8.08 3 7.6M21 7.6C22.1 8.08 22.38 9.75 21.59 11.32C20.8 12.89 19.26 13.77 18.13 13.28C17 12.79 16.74 11.13 17.5 9.55C18.31 8 19.86 7.11 21 7.6M19.33 18.38C19.37 19.32 18.65 20.36 17.79 20.75C16 21.57 13.88 19.87 11.89 19.87C9.9 19.87 7.76 21.64 6 20.75C5 20.26 4.31 18.96 4.44 17.88C4.62 16.39 6.41 15.59 7.47 14.5C8.88 13.06 9.88 11.75 12 11.75C14.12 11.75 15.12 13.06 16.53 14.5C17.59 15.59 19.28 16.5 19.33 18.38Z"/></svg>',
      amenities: [
        { id: "11", name: "Smoking allowed" },
        { id: "12", name: "Pets allowed" },
        { id: "17", name: "Pets live on this property" },
        { id: "18", name: "Dog(s)" },
        { id: "19", name: "Cat(s)" },
        { id: "20", name: "Other pet(s)" },
        { id: "32", name: "Suitable for events" }
      ]
    }
  };


  const $ = (sel) => document.querySelector(sel);
  const getStore = (keys) => new Promise((res) => chrome.storage.local.get(keys, (v) => res(v)));
  const setStore = (obj) => new Promise((res) => chrome.storage.local.set(obj, () => res()));

  let settings = { enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, hiResImages: false };
  let currentFilterMode = "hide";
  let currentColor = "#FF8C00";
  let selectedAmenities = new Set();
  

  let blockedSet = new Set();
  let shortlistedSet = new Set();
  let shortlistDetails = {};
  let shortlistComments = {};
  let tripsData = { trips: [], propertyTrips: {}, activeTrip: null };

  const normalizeModeFromStorage = (mode) => (mode === "grey" || mode === "greyout" ? "greyout" : "hide");
  const normalizeModeToStorage = (mode) => (mode === "greyout" ? "greyout" : "hide");

  function openInNewTab(url) {
    chrome.tabs.create({ url: url });
  }

  function openShortlistViewer() {
    const viewerUrl = chrome.runtime.getURL('shortlist/viewer.html');
    chrome.tabs.create({ url: viewerUrl });
  }

  function updateUIForBlocked(count) {
    const blockedCountEl = $("#blockedCount");
    const clearBtn = $("#clearBtn");
    
    if (blockedCountEl) blockedCountEl.textContent = String(count);
    if (clearBtn) clearBtn.disabled = count === 0;
  }

  function updateUIForShortlisted(count) {
    const shortlistedCountEl = $("#shortlistedCount");
    const clearShortlistBtn = $("#clearShortlistBtn");
    
    if (shortlistedCountEl) shortlistedCountEl.textContent = String(count);
    if (clearShortlistBtn) clearShortlistBtn.disabled = count === 0;
  }

  async function saveSettings() {
    await setStore({
      [STORAGE_KEYS.SETTINGS]: { 
        enabled: settings.enabled, 
        mode: settings.mode,
        glowColor: settings.glowColor,
        hideSimilarBlocks: settings.hideSimilarBlocks,
        hideSplitStays: settings.hideSplitStays,
        hiResImages: settings.hiResImages
      }
    });
  }


  function showConfirmationModal(message, onConfirm) {
      const modal = $("#confirmationModal");
      const msgEl = $("#confirmationMessage");
      const confirmBtn = $("#confirmActionBtn");
      const cancelBtn = $("#cancelConfirmationBtn");
      const closeBtn = $("#closeConfirmationModal");

      if (!modal) return;

      msgEl.textContent = message;
      
      const closeModal = () => {
          modal.classList.remove("show");

          confirmBtn.replaceWith(confirmBtn.cloneNode(true));
          cancelBtn.replaceWith(cancelBtn.cloneNode(true));
          closeBtn.replaceWith(closeBtn.cloneNode(true));
      };


      const newConfirmBtn = $("#confirmActionBtn");
      const newCancelBtn = $("#cancelConfirmationBtn");
      const newCloseBtn = $("#closeConfirmationModal");

      newConfirmBtn.addEventListener("click", () => {
          onConfirm();
          closeModal();
      });

      newCancelBtn.addEventListener("click", closeModal);
      newCloseBtn.addEventListener("click", closeModal);

      modal.addEventListener("click", (e) => {
          if (e.target === modal) closeModal();
      });

      modal.classList.add("show");
  }

  function showAlertModal(title, message) {
      const modal = $("#alertModal");
      const titleEl = $("#alertTitle");
      const msgEl = $("#alertMessage");
      const okBtn = $("#closeAlertBtn");
      const closeBtn = $("#closeAlertModal");

      if (!modal) return;

      titleEl.textContent = title;
      msgEl.textContent = message;

      const closeModal = () => {
          modal.classList.remove("show");
      };

      okBtn.onclick = closeModal;
      closeBtn.onclick = closeModal;
      
      modal.onclick = (e) => {
          if (e.target === modal) closeModal();
      };

      modal.classList.add("show");
  }


  function initAmenityList() {
    const amenityList = $("#amenityList");
    if (!amenityList) return;
    
    amenityList.innerHTML = '';
    
    Object.entries(AMENITY_CATEGORIES).forEach(([categoryName, categoryData]) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'amenity-category';
      categoryDiv.dataset.category = categoryName;
      
      const categoryTitle = document.createElement('div');
      categoryTitle.className = 'amenity-category-title';
      categoryTitle.innerHTML = `
        <span class="category-icon">${categoryData.icon}</span>
        <span class="category-name">${categoryName}</span>
      `;
      
      const categoryItems = document.createElement('div');
      categoryItems.className = 'amenity-category-items';
      
      categoryData.amenities.forEach(({ id, name }) => {
        const item = document.createElement('div');
        item.className = 'amenity-item';
        item.dataset.amenityId = id;
        item.dataset.amenityName = name.toLowerCase();
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `amenity-${id}`;
        checkbox.value = id;
        
        const label = document.createElement('label');
        label.htmlFor = `amenity-${id}`;
        label.textContent = name;
        
        item.appendChild(checkbox);
        item.appendChild(label);
        
        item.addEventListener('click', (e) => {
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
          }
          if (checkbox.checked) {
            selectedAmenities.add(id);
          } else {
            selectedAmenities.delete(id);
          }
        });
        
        categoryItems.appendChild(item);
      });
      
      categoryDiv.appendChild(categoryTitle);
      categoryDiv.appendChild(categoryItems);
      amenityList.appendChild(categoryDiv);
    });
  }

  async function loadCurrentAmenities() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) return;
      
      const url = new URL(tab.url);
      
      selectedAmenities.clear();
      const params = new URLSearchParams(url.search);
      params.forEach((value, key) => {
        if (key === 'amenities[]') {
          selectedAmenities.add(value);
        }
      });
      
      document.querySelectorAll('.amenity-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = selectedAmenities.has(checkbox.value);
      });
    } catch (err) {
      console.error('Error loading amenities:', err);
    }
  }

  async function applyAmenityFilters() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) return;
      
      const url = new URL(tab.url);
      
      if (!url.hostname.includes('airbnb')) {
        alert('This feature only works on Airbnb search pages');
        return;
      }
      
      const params = new URLSearchParams();
      url.searchParams.forEach((value, key) => {
        if (key !== 'amenities[]' && key !== 'selected_filter_order[]') {
          params.append(key, value);
        }
      });
      
      selectedAmenities.forEach(amenityId => {
        params.append('amenities[]', amenityId);
      });
      
      selectedAmenities.forEach(amenityId => {
        params.append('selected_filter_order[]', `amenities:${amenityId}`);
      });
      
      if (selectedAmenities.size > 0) {
        params.set('update_selected_filters', 'true');
      }
      
      const newUrl = `${url.origin}${url.pathname}?${params.toString()}`;
      
      await chrome.tabs.update(tab.id, { url: newUrl });
      
      const amenityModal = $("#amenityModal");
      if (amenityModal) amenityModal.classList.remove('show');
    } catch (err) {
      console.error('Error applying amenities:', err);
      alert('Error applying filters. Please try again.');
    }
  }


  function escapeCSV(str) {
    if (str === null || str === undefined) return '';
    const stringValue = String(str);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  async function exportToCSV() {
    await load();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `AirbXb ${timestamp}.csv`;
    

    let csvContent = "listingId,status,url,price,rating,notes,trip,details_json\n";
    

    for (const id of blockedSet) {
      csvContent += `${escapeCSV(id)},blocked,,,,,,\n`;
    }
    

    for (const id of shortlistedSet) {
      const details = shortlistDetails[id] || {};
      const note = shortlistComments[id] || "";
      const tripId = tripsData.propertyTrips[id];
      const trip = tripsData.trips.find(t => t.id === tripId);
      const tripName = trip ? trip.name : "";
      const detailsJson = JSON.stringify(details);
      
      csvContent += `${escapeCSV(id)},shortlisted,${escapeCSV(details.url)},${escapeCSV(details.price)},${escapeCSV(details.rating)},${escapeCSV(note)},${escapeCSV(tripName)},${escapeCSV(detailsJson)}\n`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuote = false;
    
    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];
      
      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === ',' && !insideQuote) {
        currentRow.push(currentCell);
        currentCell = '';
      } else if ((char === '\r' || char === '\n') && !insideQuote) {
        if (char === '\r' && nextChar === '\n') i++;
        currentRow.push(currentCell);
        if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
            rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell);
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
          rows.push(currentRow);
      }
    }
    
    return rows;
  }

  async function importFromCSV(file, options) {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const rows = parseCSV(text);
        
        if (rows.length < 2) {
            throw new Error("Invalid CSV: No data found");
        }
        

        const header = rows.shift().map(h => h.trim().toLowerCase());
        const colMap = {
            id: header.indexOf('listingid'),
            status: header.indexOf('status'),
            url: header.indexOf('url'),
            price: header.indexOf('price'),
            rating: header.indexOf('rating'),
            notes: header.indexOf('notes'),
            trip: header.indexOf('trip'),
            details: header.indexOf('details_json')
        };
        
        if (colMap.id === -1 || colMap.status === -1) {
             throw new Error("Invalid CSV: Missing required columns (listingId, status)");
        }
        

        if (options.method === 'replace') {
            blockedSet = new Set();
            shortlistedSet = new Set();
            shortlistDetails = {};
            shortlistComments = {};
            tripsData.propertyTrips = {};
        }

        let blockedCount = 0;
        let shortlistedCount = 0;
        
        for (const row of rows) {
            if (row.length <= colMap.id) continue;
            
            const id = row[colMap.id].trim();
            const status = row[colMap.status].trim().toLowerCase();
            
            if (!id) continue;
            
            if (options.importBlocked && status.includes('blocked')) {
                blockedSet.add(id);
                blockedCount++;
            }
            
            if ((options.importShortlist || options.importEverything) && status.includes('shortlisted')) {
                shortlistedSet.add(id);
                shortlistedCount++;
                
                if (options.importEverything) {

                    if (colMap.details !== -1 && row[colMap.details]) {
                        try {
                            const details = JSON.parse(row[colMap.details]);
                            shortlistDetails[id] = details;
                        } catch (e) {
                            console.warn("Failed to parse details for", id);
                        }
                    }
                    

                    if (colMap.notes !== -1 && row[colMap.notes]) {
                        shortlistComments[id] = row[colMap.notes];
                    }
                    

                    if (colMap.trip !== -1 && row[colMap.trip]) {
                        const tripName = row[colMap.trip].trim();
                        if (tripName) {
                            let trip = tripsData.trips.find(t => t.name === tripName);
                            if (!trip) {
                                trip = { id: 'trip_' + Date.now() + Math.random().toString(36).substr(2, 5), name: tripName };
                                tripsData.trips.push(trip);
                            }
                            tripsData.propertyTrips[id] = trip.id;
                        }
                    }
                } else {
                    if (colMap.url !== -1 && row[colMap.url]) {
                        const url = row[colMap.url].trim();
                        if (url) {
                            if (!shortlistDetails[id]) {
                                shortlistDetails[id] = { addedAt: new Date().toISOString() };
                            }
                            shortlistDetails[id].url = url;
                        }
                    }
                }
            }
        }
        

        await setStore({
            [STORAGE_KEYS.BLOCKED]: Array.from(blockedSet),
            [STORAGE_KEYS.SHORTLISTED]: Array.from(shortlistedSet),
            [STORAGE_KEYS.SHORTLIST_DETAILS]: shortlistDetails,
            [STORAGE_KEYS.SHORTLIST_COMMENTS]: shortlistComments,
            [STORAGE_KEYS.TRIPS]: tripsData
        });
        

        updateUIForBlocked(blockedSet.size);
        updateUIForShortlisted(shortlistedSet.size);
        

        const dataModal = $("#dataModal");
        if (dataModal) dataModal.classList.remove("show");
        
        showAlertModal("Import Successful", `Blocked: ${blockedCount}\nShortlisted: ${shortlistedCount}`);

      } catch (err) {
        console.error("Import error:", err);
        showAlertModal("Import Error", err.message);
      }
    };
    
    reader.readAsText(file);
  }

  function setupEventListeners() {
    const filterModeSelect = $("#filterModeSelect");
    const filterModeDropdown = $("#filterModeDropdown");
    const filterModeValue = filterModeSelect ? filterModeSelect.querySelector(".custom-select-value") : null;

    if (filterModeSelect && filterModeDropdown) {
      filterModeSelect.addEventListener("click", (e) => {
        e.stopPropagation();
        filterModeDropdown.classList.toggle("show");
        filterModeSelect.classList.toggle("open");
        
        const colorPicker = $("#colorPicker");
        if (colorPicker) colorPicker.classList.remove("show");
      });

      filterModeDropdown.addEventListener("click", async (e) => {
        if (e.target.classList.contains("custom-select-option")) {
          const value = e.target.dataset.value;
          const text = e.target.textContent;
          
          if (filterModeValue) filterModeValue.textContent = text;
          filterModeDropdown.querySelectorAll(".custom-select-option").forEach(opt => {
            opt.classList.remove("selected");
          });
          e.target.classList.add("selected");
          
          currentFilterMode = value;
          settings.mode = normalizeModeToStorage(value);
          await saveSettings();
          
          filterModeDropdown.classList.remove("show");
          filterModeSelect.classList.remove("open");
        }
      });
    }

    const colorTrigger = $("#colorTrigger");
    const colorPreview = $("#colorPreview");
    const colorPicker = $("#colorPicker");

    if (colorTrigger && colorPicker) {
      colorTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        colorPicker.classList.toggle("show");
        
        if (filterModeDropdown) filterModeDropdown.classList.remove("show");
        if (filterModeSelect) filterModeSelect.classList.remove("open");
      });

      colorPicker.addEventListener("click", async (e) => {
        if (e.target.classList.contains("color-option")) {
          const color = e.target.dataset.color;
          
          if (colorPreview) colorPreview.style.background = color;
          colorPicker.querySelectorAll(".color-option").forEach(opt => {
            opt.classList.remove("selected");
          });
          e.target.classList.add("selected");
          
          currentColor = color;
          settings.glowColor = color;
          await saveSettings();
          
          colorPicker.classList.remove("show");
        }
      });
    }


    const openDataModalBtn = $("#openDataModalBtn");
    const dataModal = $("#dataModal");
    const closeDataModal = $("#closeDataModal");
    const exportDataBtn = $("#exportDataBtn");
    const importDataBtn = $("#importDataBtn");
    const importFile = $("#importFile");
    const importEverything = $("#importEverything");
    const importBlocked = $("#importBlocked");
    const importShortlist = $("#importShortlist");
    const mergeMethodRadios = document.querySelectorAll('input[name="importMethod"]');
    const mergeWarning = $("#mergeWarning");
    const replaceWarning = $("#replaceWarning");

    if (openDataModalBtn && dataModal) {
      openDataModalBtn.addEventListener("click", () => {
        dataModal.classList.add("show");
      });
    }

    if (closeDataModal && dataModal) {
      closeDataModal.addEventListener("click", () => {
        dataModal.classList.remove("show");
      });
    }
    
    if (dataModal) {
      dataModal.addEventListener('click', (e) => {
        if (e.target === dataModal) {
          dataModal.classList.remove('show');
        }
      });
    }

    if (exportDataBtn) {
      exportDataBtn.addEventListener("click", () => {
        exportToCSV();
      });
    }

    if (importFile) {
      importFile.addEventListener("change", () => {
         if (importDataBtn) importDataBtn.disabled = !importFile.files.length;
      });
    }

    if (importEverything) {
      importEverything.addEventListener("change", () => {
         if (importEverything.checked) {
             if(importBlocked) importBlocked.checked = true;
             if(importShortlist) importShortlist.checked = true;
         }
      });
    }
    
    if (importBlocked && importShortlist && importEverything) {
        const updateEverythingCheck = () => {
            if (!importBlocked.checked || !importShortlist.checked) {
                importEverything.checked = false;
            }
        };
        importBlocked.addEventListener("change", updateEverythingCheck);
        importShortlist.addEventListener("change", updateEverythingCheck);
    }

    if (mergeMethodRadios) {
        mergeMethodRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'merge') {
                    if(mergeWarning) mergeWarning.style.display = 'flex';
                    if(replaceWarning) replaceWarning.style.display = 'none';
                } else {
                    if(mergeWarning) mergeWarning.style.display = 'none';
                    if(replaceWarning) replaceWarning.style.display = 'flex';
                }
            });
        });
    }

    if (importDataBtn) {
      importDataBtn.addEventListener("click", () => {
        if (!importFile.files.length) return;
        
        const method = document.querySelector('input[name="importMethod"]:checked').value;
        const options = {
            importBlocked: $("#importBlocked").checked,
            importShortlist: $("#importShortlist").checked,
            importEverything: $("#importEverything").checked,
            method: method
        };
        
        importFromCSV(importFile.files[0], options);
      });
    }

    document.addEventListener("click", () => {
      if (filterModeDropdown) filterModeDropdown.classList.remove("show");
      if (filterModeSelect) filterModeSelect.classList.remove("open");
      if (colorPicker) colorPicker.classList.remove("show");
    });

    const shortlistLabel = $("#shortlistLabel");
    if (shortlistLabel) {
      shortlistLabel.addEventListener('click', () => {
        openShortlistViewer();
      });
    }

    const coffeeButton = $("#coffeeButton");
    const currencyButtons = $("#currencyButtons");
    const usdBtn = $("#usdBtn");
    const gbpBtn = $("#gbpBtn");
    const eurBtn = $("#eurBtn");

    if (coffeeButton && currencyButtons) {
      coffeeButton.addEventListener("click", (e) => {
        e.preventDefault();
        coffeeButton.style.display = "none";
        currencyButtons.classList.add("show");
      });

      [usdBtn, gbpBtn, eurBtn].forEach(btn => {
        if (btn) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const url = btn.dataset.url;
            if (url) {
              openInNewTab(url);
            }
            setTimeout(() => {
              currencyButtons.classList.remove("show");
              coffeeButton.style.display = "inline-flex";
            }, 300);
          });
        }
      });
    }

    const amenityFilterCard = $("#amenityFilterCard");
    const amenityModal = $("#amenityModal");
    const closeModal = $("#closeModal");
    const amenitySearch = $("#amenitySearch");
    const clearAmenities = $("#clearAmenities");
    const applyAmenitiesBtn = $("#applyAmenities");

    if (amenityFilterCard && amenityModal) {
      amenityFilterCard.addEventListener('click', async () => {
        await loadCurrentAmenities();
        amenityModal.classList.add('show');
      });
    }

    if (closeModal && amenityModal) {
      closeModal.addEventListener('click', () => {
        amenityModal.classList.remove('show');
      });
    }

    if (amenityModal) {
      amenityModal.addEventListener('click', (e) => {
        if (e.target === amenityModal) {
          amenityModal.classList.remove('show');
        }
      });
    }

    if (amenitySearch) {
      amenitySearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        document.querySelectorAll('.amenity-category').forEach(category => {
          let hasVisibleItems = false;
          
          category.querySelectorAll('.amenity-item').forEach(item => {
            const amenityName = item.dataset.amenityName || '';
            if (searchTerm === '' || amenityName.includes(searchTerm)) {
              item.classList.remove('hidden');
              hasVisibleItems = true;
            } else {
              item.classList.add('hidden');
            }
          });
          
          if (hasVisibleItems || searchTerm === '') {
            category.classList.remove('hidden');
          } else {
            category.classList.add('hidden');
          }
        });
      });
    }

    if (clearAmenities) {
      clearAmenities.addEventListener('click', () => {
        selectedAmenities.clear();
        document.querySelectorAll('.amenity-item input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
        });
      });
    }

    if (applyAmenitiesBtn) {
      applyAmenitiesBtn.addEventListener('click', applyAmenityFilters);
    }

    const isEnabledEl = $("#isEnabled");
    if (isEnabledEl) {
      isEnabledEl.addEventListener("change", async () => {
        settings.enabled = isEnabledEl.checked;
        await saveSettings();
      });
    }

    const hideSimilarBlocksEl = $("#hideSimilarBlocks");
    if (hideSimilarBlocksEl) {
      hideSimilarBlocksEl.addEventListener("change", async () => {
        settings.hideSimilarBlocks = hideSimilarBlocksEl.checked;
        await saveSettings();
      });
    }

    const hideSplitStaysEl = $("#hideSplitStays");
    if (hideSplitStaysEl) {
      hideSplitStaysEl.addEventListener("change", async () => {
        settings.hideSplitStays = hideSplitStaysEl.checked;
        await saveSettings();
      });
    }

    const hiResImagesEl = $("#hiResImages");
    if (hiResImagesEl) {
      hiResImagesEl.addEventListener("change", async () => {
        settings.hiResImages = hiResImagesEl.checked;
        await saveSettings();
      });
    }

    const clearBtn = $("#clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", async () => {
        if (clearBtn.disabled) return;
        
        showConfirmationModal("Are you sure you want to clear all blocked listings?", async () => {
            await setStore({ [STORAGE_KEYS.BLOCKED]: [] });
        });
      });
    }

    const clearShortlistBtn = $("#clearShortlistBtn");
    if (clearShortlistBtn) {
      clearShortlistBtn.addEventListener("click", async () => {
        if (clearShortlistBtn.disabled) return;
        
        showConfirmationModal("Are you sure you want to clear your shortlist?", async () => {
            await setStore({ [STORAGE_KEYS.SHORTLISTED]: [] });
        });
      });
    }
  }

  async function load() {
    const data = await getStore([
        STORAGE_KEYS.SETTINGS, 
        STORAGE_KEYS.BLOCKED, 
        STORAGE_KEYS.SHORTLISTED, 
        STORAGE_KEYS.SHORTLIST_DETAILS,
        STORAGE_KEYS.SHORTLIST_COMMENTS,
        STORAGE_KEYS.TRIPS
    ]);
    
    settings = Object.assign({ enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, hiResImages: false }, data[STORAGE_KEYS.SETTINGS] || {});
    blockedSet = new Set(data[STORAGE_KEYS.BLOCKED] || []);
    shortlistedSet = new Set(data[STORAGE_KEYS.SHORTLISTED] || []);
    shortlistDetails = data[STORAGE_KEYS.SHORTLIST_DETAILS] || {};
    shortlistComments = data[STORAGE_KEYS.SHORTLIST_COMMENTS] || {};
    tripsData = data[STORAGE_KEYS.TRIPS] || { trips: [], propertyTrips: {}, activeTrip: null };

    const isEnabledEl = $("#isEnabled");
    const hideSimilarBlocksEl = $("#hideSimilarBlocks");
    const hideSplitStaysEl = $("#hideSplitStays");
    const hiResImagesEl = $("#hiResImages");
    const filterModeValue = $("#filterModeSelect") ? $("#filterModeSelect").querySelector(".custom-select-value") : null;
    const filterModeDropdown = $("#filterModeDropdown");
    const colorPreview = $("#colorPreview");
    const colorPicker = $("#colorPicker");

    if (isEnabledEl) isEnabledEl.checked = !!settings.enabled;
    if (hideSimilarBlocksEl) hideSimilarBlocksEl.checked = !!settings.hideSimilarBlocks;
    if (hideSplitStaysEl) hideSplitStaysEl.checked = !!settings.hideSplitStays;
    if (hiResImagesEl) hiResImagesEl.checked = !!settings.hiResImages;
    
    currentFilterMode = normalizeModeFromStorage(settings.mode);
    const modeText = currentFilterMode === "hide" ? "Hide Them" : "Grey Them Out";
    if (filterModeValue) filterModeValue.textContent = modeText;
    if (filterModeDropdown) {
      const selectedOption = filterModeDropdown.querySelector(`[data-value="${currentFilterMode}"]`);
      if (selectedOption) selectedOption.classList.add("selected");
    }
    
    currentColor = settings.glowColor;
    if (colorPreview) colorPreview.style.background = currentColor;
    if (colorPicker) {
      const selectedColor = colorPicker.querySelector(`[data-color="${currentColor}"]`);
      if (selectedColor) selectedColor.classList.add("selected");
    }
    
    updateUIForBlocked(blockedSet.size);
    updateUIForShortlisted(shortlistedSet.size);
    
    initAmenityList();
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes[STORAGE_KEYS.BLOCKED]) {
      const newVal = changes[STORAGE_KEYS.BLOCKED].newValue || [];
      blockedSet = new Set(newVal);
      updateUIForBlocked(newVal.length);
    }
    if (changes[STORAGE_KEYS.SHORTLISTED]) {
      const newVal = changes[STORAGE_KEYS.SHORTLISTED].newValue || [];
      shortlistedSet = new Set(newVal);
      updateUIForShortlisted(newVal.length);
    }
    if (changes[STORAGE_KEYS.SHORTLIST_DETAILS]) {
        shortlistDetails = changes[STORAGE_KEYS.SHORTLIST_DETAILS].newValue || {};
    }
    if (changes[STORAGE_KEYS.SHORTLIST_COMMENTS]) {
        shortlistComments = changes[STORAGE_KEYS.SHORTLIST_COMMENTS].newValue || {};
    }
    if (changes[STORAGE_KEYS.TRIPS]) {
        tripsData = changes[STORAGE_KEYS.TRIPS].newValue || { trips: [], propertyTrips: {}, activeTrip: null };
    }
    if (changes[STORAGE_KEYS.SETTINGS]) {
      const s = Object.assign({ enabled: true, mode: "hide", glowColor: "#FF8C00", hideSimilarBlocks: false, hideSplitStays: false, hiResImages: false }, changes[STORAGE_KEYS.SETTINGS].newValue || {});
      
      const isEnabledEl = $("#isEnabled");
      const hideSimilarBlocksEl = $("#hideSimilarBlocks");
      const hideSplitStaysEl = $("#hideSplitStays");
      const hiResImagesEl = $("#hiResImages");
      const filterModeValue = $("#filterModeSelect") ? $("#filterModeSelect").querySelector(".custom-select-value") : null;
      const colorPreview = $("#colorPreview");
      
      if (isEnabledEl) isEnabledEl.checked = !!s.enabled;
      if (hideSimilarBlocksEl) hideSimilarBlocksEl.checked = !!s.hideSimilarBlocks;
      if (hideSplitStaysEl) hideSplitStaysEl.checked = !!s.hideSplitStays;
      if (hiResImagesEl) hiResImagesEl.checked = !!s.hiResImages;
      
      currentFilterMode = normalizeModeFromStorage(s.mode);
      const modeText = currentFilterMode === "hide" ? "Hide Them" : "Grey Them Out";
      if (filterModeValue) filterModeValue.textContent = modeText;
      
      currentColor = s.glowColor;
      if (colorPreview) colorPreview.style.background = currentColor;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupEventListeners();
      load();
    });
  } else {
    setupEventListeners();
    load();
  }
})();