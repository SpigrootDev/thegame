// === Constants & Variables ===


const MAX_SLOTS = 3;

const mainMenu = document.getElementById('main-menu');
const slotsScreen = document.getElementById('slots-screen');
const slotsContainer = document.getElementById('slots-container');
const slotsBackBtn = document.getElementById('slots-back-btn');

const menuNewGameBtn = document.getElementById('menu-new-game');
const menuLoadGameBtn = document.getElementById('menu-load-game');
const menuSettingsBtn = document.getElementById('menu-settings');
const menuExitBtn = document.getElementById('menu-exit');

const newSlotNameContainer = document.getElementById('new-slot-name-container');
const newSlotNameInput = document.getElementById('new-slot-name');
const confirmNewSlotBtn = document.getElementById('confirm-new-slot');
const cancelNewSlotBtn = document.getElementById('cancel-new-slot');

const settingsScreen = document.getElementById('settings-screen');
const settingsBackBtn = document.getElementById('settings-back-btn');

const gamescreen = document.getElementById('gamescreen');
const sockenCountEl = document.getElementById('socken-count');
const productionCountEl = document.getElementById('production-count');
const wolleImg = document.getElementById('wolle');

const buyNadelBtn = document.getElementById('buy-nadel');
const buyMaschineBtn = document.getElementById('buy-maschine');
const buyMitarbeiterBtn = document.getElementById('buy-mitarbeiter');
const buyKfcBtn = document.getElementById('buy-kfc');

const buyMalikBtn = document.getElementById('buy-malik');
const buyOliverBtn = document.getElementById('buy-oliver');

const backToMenuBtn = document.getElementById('back-to-menu');

// Game State
let currentSlotIndex = null;
let gameData = null;
let autoProductionInterval = null;
let currentOnetimeLevel = -1;
let onetimeBtn = null;

// Current global purchase amount (x1, x10, x100)
let currentBuyAmount = 1;

// Settings
let settings = {
  language: 'en'
};

const translations = {
  en: {
    title: 'Cotton Sim',
    start_new_game: 'Start new game',
    load_game: 'Load Game',
    settings: 'Settings',
    close: 'Close',
    save_load_delete: 'Save, load, delete',
    back_to_menu: 'Back to menu',
    create_new_game: 'Create new Game',
    placeholder_name: 'Name for your save',
    confirm: 'Confirm',
    back: 'Back',
    click_to_farm: 'Click on the cotton to farm cotton!',
    load: 'Load',
    delete: 'Delete',
    empty_slot: 'Empty Slot',
    new_game: 'New Game',
    onetime_upgrades: 'Onetime Upgrades',
    shop: 'Shop',
    buy_amount: 'Buy amount:',
    select_language: 'Select your language',
    settings_title: 'Settings',
    other_settings: 'Other settings coming soon',
    cotton_prefix: 'Cotton:',
    production_prefix: 'Production:',
    cotton_suffix: 'Cotton/sec',
    save_before_quit: 'Do you want to save before quitting?',
    exit_confirm: 'Do you really want to exit?',
    delete_confirm: 'Delete save "{name}"?',
    unable_to_load: 'Unable to load game data',
    enter_valid_name: 'Please enter a valid name',
    no_free_slots: 'No free slots available',
    no_game_loaded: 'No game loaded. Load a game first.',
    blackman: 'Blackman',
    ultra_blackman: 'Ultra Blackman',
    indian_child: 'Indian Child',
    kfc: 'KFC',
    malik: 'Malik',
    oliver: 'Oliver',
    olivia: 'Olivia',
    upgrade_koolaid_name: 'KoolAid',
    upgrade_koolaid_desc: 'Double Click Power',
    upgrade_new_whips_name: 'New Whips',
    upgrade_new_whips_desc: 'All production +50%',
    upgrade_no_more_shower_name: 'No More Shower',
    upgrade_no_more_shower_desc: 'Indian Children produce 2x',
    upgrade_watermelons_name: 'Watermelons at the KFC',
    upgrade_watermelons_desc: 'KFC produces 3x',
    upgrade_malik_glasses_name: 'Malik can see with these glasses',
    upgrade_malik_glasses_desc: 'Malik produces 2x',
    upgrade_oliver_name: 'Oliver turns into Olivia',
    upgrade_oliver_desc: 'Olivia produces 2x',
    english: 'English',
    danish: 'Danish',
    german: 'German',
    placeholder_name: 'Name for your save'
  },
  de: {
    title: 'Cotton Sim',
    start_new_game: 'Neues Spiel',
    load_game: 'Laden',
    settings: 'Einstellungen',
    close: 'Schließen',
    save_load_delete: 'Speichern, laden, löschen',
    back_to_menu: 'Zurück zum Menü',
    create_new_game: 'Neues Spiel erstellen',
    placeholder_name: 'Name für deinen Speicherstand',
    confirm: 'Bestätigen',
    back: 'Zurück',
    click_to_farm: 'Klicke auf die Baumwolle, um Cotton zu farmen!',
    load: 'Laden',
    delete: 'Löschen',
    empty_slot: 'Leerer Slot',
    new_game: 'Neues Spiel',
    onetime_upgrades: 'Einmalige Upgrades',
    shop: 'Shop',
    buy_amount: 'Kaufe Menge:',
    select_language: 'Wähle deine Sprache',
    settings_title: 'Einstellungen',
    other_settings: 'Weitere Einstellungen folgen',
    cotton_prefix: 'Cotton:',
    production_prefix: 'Produktion:',
    cotton_suffix: 'Cotton/Sek',
    save_before_quit: 'Möchtest du vor dem Beenden speichern?',
    exit_confirm: 'Willst du wirklich beenden?',
    delete_confirm: 'Speicherstand "{name}" löschen?',
    unable_to_load: 'Spielstand konnte nicht geladen werden',
    enter_valid_name: 'Bitte gib einen gültigen Namen ein',
    no_free_slots: 'Keine freien Speicherplätze verfügbar',
    no_game_loaded: 'Kein Spiel geladen. Lade zuerst ein Spiel.',
    blackman: 'Blackman',
    ultra_blackman: 'Ultra Blackman',
    indian_child: 'Indian Child',
    kfc: 'KFC',
    malik: 'Malik',
    oliver: 'Oliver',
    olivia: 'Olivia',
    upgrade_koolaid_name: 'KoolAid',
    upgrade_koolaid_desc: 'Doppelte Klickstärke',
    upgrade_new_whips_name: 'Neue Peitschen',
    upgrade_new_whips_desc: 'Alle Produktion +50%',
    upgrade_no_more_shower_name: 'Keine Dusche mehr',
    upgrade_no_more_shower_desc: 'Indian Children produzieren 2x',
    upgrade_watermelons_name: 'Wassermelonen im KFC',
    upgrade_watermelons_desc: 'KFC produziert 3x',
    upgrade_malik_glasses_name: 'Malik kann mit diesen Brillen sehen',
    upgrade_malik_glasses_desc: 'Malik produziert 2x',
    upgrade_oliver_name: 'Oliver wird zu Olivia',
    upgrade_oliver_desc: 'Olivia produziert 2x',
    english: 'Englisch',
    danish: 'Dänisch',
    german: 'Deutsch'
  },
  da: {
    title: 'Cotton Sim',
    start_new_game: 'Start nyt spil',
    load_game: 'Indlæs spil',
    settings: 'Indstillinger',
    close: 'Luk',
    save_load_delete: 'Gem, indlæs, slet',
    back_to_menu: 'Tilbage til menu',
    create_new_game: 'Opret nyt spil',
    placeholder_name: 'Navn til din gemmefil',
    confirm: 'Bekræft',
    back: 'Tilbage',
    click_to_farm: 'Klik på bomulden for at få Cotton!',
    load: 'Indlæs',
    delete: 'Slet',
    empty_slot: 'Tom slot',
    new_game: 'Nyt spil',
    onetime_upgrades: 'Engangs-opgraderinger',
    shop: 'Shop',
    buy_amount: 'Købsantal:',
    select_language: 'Vælg dit sprog',
    settings_title: 'Indstillinger',
    other_settings: 'Flere indstillinger kommer snart',
    cotton_prefix: 'Cotton:',
    production_prefix: 'Produktion:',
    cotton_suffix: 'Cotton/sek',
    save_before_quit: 'Vil du gemme inden du afslutter?',
    exit_confirm: 'Vil du virkelig afslutte?',
    delete_confirm: 'Slet gem "{name}"?',
    unable_to_load: 'Kunne ikke indlæse spillet',
    enter_valid_name: 'Indtast venligst et gyldigt navn',
    no_free_slots: 'Ingen ledige sparingspladser',
    no_game_loaded: 'Intet spil indlæst. Indlæs et spil først.',
    blackman: 'Blackman',
    ultra_blackman: 'Ultra Blackman',
    indian_child: 'Indian Child',
    kfc: 'KFC',
    malik: 'Malik',
    oliver: 'Oliver',
    olivia: 'Olivia',
    upgrade_koolaid_name: 'KoolAid',
    upgrade_koolaid_desc: 'Dobbelt klikstyrke',
    upgrade_new_whips_name: 'Nye piske',
    upgrade_new_whips_desc: 'Al produktion +50%',
    upgrade_no_more_shower_name: 'Ingen bad mere',
    upgrade_no_more_shower_desc: 'Indian Child producerer 2x',
    upgrade_watermelons_name: 'Vandmeloner på KFC',
    upgrade_watermelons_desc: 'KFC producerer 3x',
    upgrade_malik_glasses_name: 'Malik kan se med disse briller',
    upgrade_malik_glasses_desc: 'Malik producerer 2x',
    upgrade_oliver_name: 'Oliver bliver til Olivia',
    upgrade_oliver_desc: 'Olivia producerer 2x',
    english: 'Engelsk',
    danish: 'Dansk',
    german: 'Tysk'
  }
};

// Onetime Upgrades
const onetimeUpgrades = [
  {
    nameKey: 'upgrade_koolaid_name',
    descKey: 'upgrade_koolaid_desc',
    price: 1000,
    effect: () => {
      gameData.koolaid = 1;
    }
  },
  {
    nameKey: 'upgrade_new_whips_name',
    descKey: 'upgrade_new_whips_desc',
    price: 5000,
    effect: () => {
      gameData.superTools = 1;
    }
  },
  {
    nameKey: 'upgrade_no_more_shower_name',
    descKey: 'upgrade_no_more_shower_desc',
    price: 25000,
    effect: () => {
      gameData.megaFactory = 1;
    }
  },
  {
    nameKey: 'upgrade_watermelons_name',
    descKey: 'upgrade_watermelons_desc',
    price: 125000,
    effect: () => {
      gameData.ultimateBoost = 1;
    }
  },
  {
    nameKey: 'upgrade_malik_glasses_name',
    descKey: 'upgrade_malik_glasses_desc',
    price: 250000,
    effect: () => {
      gameData.malikX2 = 1;
    }
  },
  {
    nameKey: 'upgrade_oliver_name',
    descKey: 'upgrade_oliver_desc',
    price: 500000,
    effect: () => {
      gameData.oliverX2 = 1;
    }
  }
];

// === Functions for Loading/Saving Slots ===

function loadSlots() {
  const slotsJson = localStorage.getItem('haekel_slots');
  if (!slotsJson) {
    return Array(MAX_SLOTS).fill(null);
  }
  try {
    const slots = JSON.parse(slotsJson);
    if (!Array.isArray(slots) || slots.length !== MAX_SLOTS) {
      return Array(MAX_SLOTS).fill(null);
    }
    return slots;
  } catch {
    return Array(MAX_SLOTS).fill(null);
  }
}

function saveSlots(slots) {
  localStorage.setItem('haekel_slots', JSON.stringify(slots));
}

function getGameKey(slotIndex) {
  return `haekel_slot_${slotIndex}`;
}

function loadGameData(slotIndex) {
  const key = getGameKey(slotIndex);
  const dataJson = localStorage.getItem(key);
  if (!dataJson) return null;
  try {
    return JSON.parse(dataJson);
  } catch {
    return null;
  }
}

function saveGameData(slotIndex, data) {
  const key = getGameKey(slotIndex);
  localStorage.setItem(key, JSON.stringify(data));
}

function deleteGameData(slotIndex) {
  const key = getGameKey(slotIndex);
  localStorage.removeItem(key);
}

function loadSettings() {
  const settingsJson = localStorage.getItem('haekel_settings');
  if (!settingsJson) return;
  try {
    const loaded = JSON.parse(settingsJson);
    if (loaded.language && translations[loaded.language]) {
      settings.language = loaded.language;
    }
  } catch {
    // ignore malformed settings
  }
}

function saveSettings() {
  localStorage.setItem('haekel_settings', JSON.stringify(settings));
}

function setLanguage(language) {
  if (!translations[language]) return;
  settings.language = language;
  saveSettings();
  translatePage();
  updateUI();
  updateLanguageButtons();
  document.documentElement.lang = language;
}

function translatePage() {
  const texts = translations[settings.language];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (texts[key]) el.textContent = texts[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (texts[key]) el.placeholder = texts[key];
  });
  if (texts.title) document.title = texts.title;
}

function updateLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === settings.language);
  });
}

function showSettingsScreen() {
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'none';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'none';
  settingsScreen.style.display = 'block';
}

function hideSettingsScreen() {
  settingsScreen.style.display = 'none';
}

// === Slots Rendering & Navigation ===

function renderSlots() {
  slotsContainer.innerHTML = '';
  const slots = loadSlots();

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slotData = slots[i];
    const slotDiv = document.createElement('div');
    slotDiv.className = 'slot';

    if (slotData) {
      // Slot belegt
      const nameSpan = document.createElement('span');
      nameSpan.textContent = slotData.name;
      slotDiv.appendChild(nameSpan);

      const loadBtn = document.createElement('button');
      loadBtn.textContent = translations[settings.language].load;
      loadBtn.onclick = () => {
        startGameFromSlot(i);
      };
      slotDiv.appendChild(loadBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = translations[settings.language].delete;
      deleteBtn.classList.add('delete-button');
      deleteBtn.onclick = () => {
        const message = translations[settings.language].delete_confirm.replace('{name}', slotData.name);
        if (confirm(message)) {
          deleteGameData(i);
          const slots = loadSlots();
          slots[i] = null;
          saveSlots(slots);
          renderSlots();
        }
      };
      slotDiv.appendChild(deleteBtn);

    } else {
      // Slot leer
      const emptySpan = document.createElement('span');
      emptySpan.textContent = translations[settings.language].empty_slot;
      slotDiv.appendChild(emptySpan);

      const newBtn = document.createElement('button');
      newBtn.textContent = translations[settings.language].new_game;
      newBtn.onclick = () => {
        openNewSlotDialogMenu();
      };
      slotDiv.appendChild(newBtn);
    }
    slotsContainer.appendChild(slotDiv);
  }
}

// === Show Main Menu ===

function showMainMenu() {
  mainMenu.style.display = 'block';
  slotsScreen.style.display = 'none';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'none';
  settingsScreen.style.display = 'none';
  stopAutoProduction();
}

// === Show Slots Screen ===

function showSlotsScreen() {
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'block';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'none';
  settingsScreen.style.display = 'none';
  renderSlots();
  stopAutoProduction();
}

// === Open New Game Name Input ===

function openNewSlotDialogMenu() {
  newSlotNameInput.value = '';
  newSlotNameContainer.style.display = 'block';
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'none';
}

// === Create New Game ===

function createNewGame(slotIndex, name) {
  const initialData = {
    name: name,
    cotton: 0,
    production: 0,
    needles: 0,
    machines: 0,
    employees: 0,
    koolaid: 0,
    kfc: 0,
    onetimeUpgradeLevel: 0,
    superTools: 0,
    megaFactory: 0,
    ultimateBoost: 0,
    malik: 0,
    oliver: 0,
    malikX2: 0,
    oliverX2: 0,
  };

  // Slot-Übersicht updaten
  const slots = loadSlots();
  slots[slotIndex] = { name: name };
  saveSlots(slots);

  // Spiel-Daten speichern
  saveGameData(slotIndex, initialData);

  startGame(slotIndex);
}

// === Start Game ===

function startGame(slotIndex) {
  currentSlotIndex = slotIndex;
  const data = loadGameData(slotIndex);

  if (!data) {
    alert(translations[settings.language].unable_to_load);
    showMainMenu();
    return;
  }
  gameData = data;

  // Add missing fields for backward compatibility
  if (gameData.onetimeUpgradeLevel === undefined) gameData.onetimeUpgradeLevel = 0;
  if (gameData.superTools === undefined) gameData.superTools = 0;
  if (gameData.megaFactory === undefined) gameData.megaFactory = 0;
  if (gameData.ultimateBoost === undefined) gameData.ultimateBoost = 0;
  if (gameData.malik === undefined) gameData.malik = 0;
  if (gameData.oliver === undefined) gameData.oliver = 0;
  if (gameData.malikX2 === undefined) gameData.malikX2 = 0;
  if (gameData.oliverX2 === undefined) gameData.oliverX2 = 0;

  updateUI();
  showGameScreen();
  startAutoProduction();
}

// === Show Game Screen ===

function showGameScreen() {
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'none';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'flex';
}

// === Quit Game & Back to Menu ===

function quitToMenu() {
  saveGameData(currentSlotIndex, gameData);
  currentSlotIndex = null;
  gameData = null;
  stopAutoProduction();
  showMainMenu();
}

// === UI Update ===

function updateUI() {
  if (!gameData) return; // No game loaded
  if (!sockenCountEl || !productionCountEl) return; // Wait for DOM to be ready

  const texts = translations[settings.language];
  sockenCountEl.textContent = `${texts.cotton_prefix || 'Cotton:'} ${Math.floor(gameData.cotton)}`;
  productionCountEl.textContent = `${texts.production_prefix || 'Production:'} ${gameData.production.toFixed(1)} ${texts.cotton_suffix || 'Cotton/sec'}`;

  const buyNadelLabel = document.getElementById('buy-nadel-label');
  if (buyNadelLabel) buyNadelLabel.textContent = texts.blackman;

  const buyMaschineLabel = document.getElementById('buy-maschine-label');
  if (buyMaschineLabel) buyMaschineLabel.textContent = texts.ultra_blackman;

  const buyMitarbeiterLabel = document.getElementById('buy-mitarbeiter-label');
  if (buyMitarbeiterLabel) buyMitarbeiterLabel.textContent = texts.indian_child;

  const buyKfcLabel = document.getElementById('buy-kfc-label');
  if (buyKfcLabel) buyKfcLabel.textContent = texts.kfc;

  const buyMalikLabel = document.getElementById('buy-malik-label');
  if (buyMalikLabel) buyMalikLabel.textContent = texts.malik;

  // Render onetime upgrades
  const onetimeContainer = document.getElementById('onetime-container');
  if (gameData.onetimeUpgradeLevel !== currentOnetimeLevel) {
    onetimeContainer.innerHTML = '';
    onetimeBtn = null;
    if (gameData.onetimeUpgradeLevel < onetimeUpgrades.length) {
      const upgrade = onetimeUpgrades[gameData.onetimeUpgradeLevel];
      onetimeBtn = document.createElement('button');
      onetimeBtn.className = 'shop-item';
      onetimeBtn.style.width = '100%';
      onetimeBtn.textContent = `${texts[upgrade.nameKey]} (${texts[upgrade.descKey]}) — Price: ${upgrade.price}`;
      onetimeBtn.disabled = gameData.cotton < upgrade.price;
      onetimeBtn.onclick = () => {
        if (gameData.cotton >= upgrade.price) {
          gameData.cotton -= upgrade.price;
          upgrade.effect();
          gameData.onetimeUpgradeLevel++;
          updateUI();
        }
      };
      onetimeContainer.appendChild(onetimeBtn);
    }
    currentOnetimeLevel = gameData.onetimeUpgradeLevel;
  } else if (onetimeBtn && gameData.onetimeUpgradeLevel < onetimeUpgrades.length) {
    const upgrade = onetimeUpgrades[gameData.onetimeUpgradeLevel];
    onetimeBtn.disabled = gameData.cotton < upgrade.price;
  }

  // Update prices
  buyNadelBtn.disabled = gameData.cotton < getBulkPrice('nadel', currentBuyAmount);
  buyMaschineBtn.disabled = gameData.cotton < getBulkPrice('maschine', currentBuyAmount);
  buyMitarbeiterBtn.disabled = gameData.cotton < getBulkPrice('mitarbeiter', currentBuyAmount);
  buyKfcBtn.disabled = gameData.cotton < getBulkPrice('kfc', currentBuyAmount);
  buyMalikBtn.disabled = gameData.cotton < getBulkPrice('malik', currentBuyAmount);
  buyOliverBtn.disabled = gameData.cotton < getBulkPrice('oliver', currentBuyAmount);

  document.getElementById('price-nadel').textContent = getBulkPrice('nadel', currentBuyAmount);
  document.getElementById('price-maschine').textContent = getBulkPrice('maschine', currentBuyAmount);
  document.getElementById('price-mitarbeiter').textContent = getBulkPrice('mitarbeiter', currentBuyAmount);
  document.getElementById('price-kfc').textContent = getBulkPrice('kfc', currentBuyAmount);
  document.getElementById('price-malik').textContent = getBulkPrice('malik', currentBuyAmount);
  document.getElementById('price-oliver').textContent = getBulkPrice('oliver', currentBuyAmount);

  // Update button texts with amount
  buyNadelBtn.innerHTML = `Blackman x${currentBuyAmount} (+${(0.1 * currentBuyAmount).toFixed(1)} Cotton/Sec) — Price: <span id="price-nadel">${getBulkPrice('nadel', currentBuyAmount)}</span> Cotton`;
  buyMaschineBtn.innerHTML = `Ultra Blackman x${currentBuyAmount} (+${1 * currentBuyAmount} Cotton/Sec) — Price: <span id="price-maschine">${getBulkPrice('maschine', currentBuyAmount)}</span> Cotton`;
  buyMitarbeiterBtn.innerHTML = `Indian Child x${currentBuyAmount} (+${5 * currentBuyAmount} Cotton/Sec) — Price: <span id="price-mitarbeiter">${getBulkPrice('mitarbeiter', currentBuyAmount)}</span> Cotton`;
  buyKfcBtn.innerHTML = `KFC x${currentBuyAmount} (+${10 * currentBuyAmount} Cotton/Sec) — Price: <span id="price-kfc">${getBulkPrice('kfc', currentBuyAmount)}</span> Cotton`;
  buyMalikBtn.innerHTML = `Malik x${currentBuyAmount} (+${20 * currentBuyAmount} Cotton/Sec) — Price: <span id="price-malik">${getBulkPrice('malik', currentBuyAmount)}</span> Cotton`;

  // Update Oliver button name if upgrade purchased
  const oliverBtn = document.getElementById('buy-oliver');

  oliverBtn.innerHTML = `${gameData.oliverX2 ? texts.olivia : texts.oliver} x${currentBuyAmount} (+${50 * currentBuyAmount} Cotton/Sec) — Price: <span id="price-oliver">${getBulkPrice('oliver', currentBuyAmount)}</span> Cotton`;

  // Update buy amount selector buttons
  document.querySelectorAll('.buy-amount').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.amount) === currentBuyAmount);
  });
}

// === Click on Wool (manual knitting) ===

wolleImg.addEventListener('click', () => {
  const multiplier = gameData.koolaid > 0 ? 2 : 1;
  gameData.cotton += multiplier;
  updateUI();
});

// === Automatic Production ===

function calculateProduction() {
  // Based on upgrades
  let prod = (gameData.needles * 0.1) + (gameData.machines * 1) + (gameData.employees * 5) + (gameData.kfc * 10) + (gameData.malik * 20) + (gameData.oliver * 50);

  // Apply onetime upgrades
  if (gameData.superTools) prod *= 1.5;
  if (gameData.megaFactory) prod += gameData.employees * 5; // additional 5 per employee
  if (gameData.ultimateBoost) prod += gameData.kfc * 20; // additional 20 per kfc
  if (gameData.malikX2) prod += gameData.malik * 20; // additional 20 per malik
  if (gameData.oliverX2) prod += gameData.oliver * 50; // additional 50 per oliver

  return prod;
}

function startAutoProduction() {
  if (autoProductionInterval) clearInterval(autoProductionInterval);

  autoProductionInterval = setInterval(() => {
    gameData.production = calculateProduction();
    gameData.cotton += gameData.production / 10; // small steps every 100ms
    updateUI();
  }, 100);
}

function stopAutoProduction() {
  if (autoProductionInterval) {
    clearInterval(autoProductionInterval);
    autoProductionInterval = null;
  }
}

// === Shop Buy Functions ===

function getPriceForCount(item, count) {
  // Prices increase with each purchase
  switch (item) {
    case 'nadel':
      return 10 + (count * 15);
    case 'maschine':
      return 50 + (count * 60);
    case 'mitarbeiter':
      return 200 + (count * 500);
    case 'kfc':
      return 1000 + (count * 2000);
    case 'malik':
      return 500 + (count * 1000);
    case 'oliver':
      return 2000 + (count * 3000);
  }
  return 0;
}

function getPrice(item) {
  // Price for the next item
  const count = gameData[item + 's'] || gameData[item.replace('nadel', 'needles').replace('maschine', 'machines').replace('mitarbeiter', 'employees').replace('kfc', 'kfc').replace('malik', 'malik').replace('oliver', 'oliver')];
  return getPriceForCount(item, count);
}

function getBulkPrice(item, amount) {
  let total = 0;
  let currentCount = gameData[item + 's'] || gameData[item.replace('nadel', 'needles').replace('maschine', 'machines').replace('mitarbeiter', 'employees').replace('kfc', 'kfc').replace('malik', 'malik').replace('oliver', 'oliver')];
  for (let i = 0; i < amount; i++) {
    total += getPriceForCount(item, currentCount + i);
  }
  return total;
}

// Removed: KoolAid now handled in onetime upgrades

buyNadelBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('nadel', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.needles += amount;
    updateUI();
  }
});

buyMaschineBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('maschine', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.machines += amount;
    updateUI();
  }
});

buyMitarbeiterBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('mitarbeiter', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.employees += amount;
    updateUI();
  }
});

buyKfcBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('kfc', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.kfc += amount;
    updateUI();
  }
});

buyMalikBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('malik', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.malik += amount;
    updateUI();
  }
});

buyOliverBtn.addEventListener('click', () => {
  const amount = currentBuyAmount;
  const price = getBulkPrice('oliver', amount);
  if (gameData.cotton >= price) {
    gameData.cotton -= price;
    gameData.oliver += amount;
    updateUI();
  }
});

// === Button Events Hauptmenü ===

menuNewGameBtn.addEventListener('click', () => {
  openNewSlotDialogMenu();
});

menuLoadGameBtn.addEventListener('click', () => {
  showSlotsScreen();
});

menuSettingsBtn.addEventListener('click', () => {
  showSettingsScreen();
});

menuExitBtn.addEventListener('click', () => {
  if (confirm(translations[settings.language].exit_confirm || 'Do you really want to exit?')) {
    window.close(); // May not work in browser, but okay
  }
});

settingsBackBtn.addEventListener('click', () => {
  showMainMenu();
});

// === Slots-Screen Buttons ===

slotsBackBtn.addEventListener('click', () => {
  showMainMenu();
});

// === Neues Spiel Dialog Buttons ===

confirmNewSlotBtn.addEventListener('click', () => {
  const name = newSlotNameInput.value.trim();
  if (!name) {
    alert(translations[settings.language].enter_valid_name);
    return;
  }

  // Finde ersten freien Slot
  const slots = loadSlots();
  const freeSlotIndex = slots.findIndex(slot => slot === null);

  if (freeSlotIndex === -1) {
    alert(translations[settings.language].no_free_slots);
    showSlotsScreen();
    return;
  }

  createNewGame(freeSlotIndex, name);
});

cancelNewSlotBtn.addEventListener('click', () => {
  showMainMenu();
});

// === Spiel Zurück zum Menü Button ===

backToMenuBtn.addEventListener('click', () => {
  if (confirm(translations[settings.language].save_before_quit)) {
    saveGameData(currentSlotIndex, gameData);
    quitToMenu();
  }
});

// === Spiel aus Slot starten (z.B. über Slot Laden Button) ===

function startGameFromSlot(slotIndex) {
  startGame(slotIndex);
}

// === Automatisches Speichern alle 5 Sekunden ===

setInterval(() => {
  if (currentSlotIndex !== null && gameData !== null) {
    saveGameData(currentSlotIndex, gameData);
    // console.log('Automatisch gespeichert!');
  }
}, 5000);

// === Cheat Functions for Console (Protected) ===

// Enable cheats with password
window.Admin = function(password) {
  if (password !== "7439") {
    console.log("Access denied: Wrong password");
    return;
  }

  console.log("Cheats enabled! Use the functions below:");

  // Set cotton amount
  window.setCotton = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.cotton = parseFloat(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Cotton set to ${gameData.cotton}`);
  };

  // Set production
  window.setProduction = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.production = parseFloat(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Production set to ${gameData.production}`);
  };

  // Set needles
  window.setNeedles = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.needles = parseInt(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Needles set to ${gameData.needles}`);
  };

  // Set machines
  window.setMachines = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.machines = parseInt(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Machines set to ${gameData.machines}`);
  };

  // Set employees
  window.setEmployees = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.employees = parseInt(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Employees set to ${gameData.employees}`);
  };

  // Set koolaid (0 or 1)
  window.setKoolaid = function(value) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.koolaid = value ? 1 : 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Koolaid set to ${gameData.koolaid}`);
  };

  // Set onetime upgrade level
  window.setOnetimeLevel = function(level) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.onetimeUpgradeLevel = parseInt(level) || 0;
    // Apply effects up to this level
    for (let i = 0; i < Math.min(level, onetimeUpgrades.length); i++) {
      onetimeUpgrades[i].effect();
    }
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`Onetime upgrade level set to ${gameData.onetimeUpgradeLevel}`);
  };

  // Set kfc
  window.setKfc = function(amount) {
    if (!gameData) {
      console.log('No game loaded. Load a game first.');
      return;
    }
    gameData.kfc = parseInt(amount) || 0;
    updateUI();
    saveGameData(currentSlotIndex, gameData);
    console.log(`KFC set to ${gameData.kfc}`);
  };

  // Get current game data
  window.getGameData = function() {
    if (!gameData) {
      console.log('No game loaded.');
      return null;
    }
    console.log(gameData);
    return gameData;
  };
};

// === Beim Laden Seite Menü zeigen ===

loadSettings();
translatePage();
updateLanguageButtons();
document.documentElement.lang = settings.language;
showMainMenu();

// === Buy Amount Buttons ===

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-amount')) {
    const amount = parseInt(e.target.dataset.amount);
    if (!isNaN(amount)) {
      currentBuyAmount = amount;
      updateUI();
    }
  }
  if (e.target.classList.contains('lang-btn')) {
    setLanguage(e.target.dataset.lang);
  }
});
