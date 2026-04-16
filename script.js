// === Konstanten & Variablen ===


const MAX_SLOTS = 3;

const mainMenu = document.getElementById('main-menu');
const slotsScreen = document.getElementById('slots-screen');
const slotsContainer = document.getElementById('slots-container');
const slotsBackBtn = document.getElementById('slots-back-btn');

const menuNewGameBtn = document.getElementById('menu-new-game');
const menuLoadGameBtn = document.getElementById('menu-load-game');
const menuExitBtn = document.getElementById('menu-exit');

const newSlotNameContainer = document.getElementById('new-slot-name-container');
const newSlotNameInput = document.getElementById('new-slot-name');
const confirmNewSlotBtn = document.getElementById('confirm-new-slot');
const cancelNewSlotBtn = document.getElementById('cancel-new-slot');

const gamescreen = document.getElementById('gamescreen');
const sockenCountEl = document.getElementById('socken-count');
const productionCountEl = document.getElementById('production-count');
const wolleImg = document.getElementById('wolle');

const buyCoolaidBtn = document.getElementById('buy-coolaid');

const buyNadelBtn = document.getElementById('buy-nadel');
const buyMaschineBtn = document.getElementById('buy-maschine');
const buyMitarbeiterBtn = document.getElementById('buy-mitarbeiter');
const buyKfcBtn = document.getElementById('buy-kfc');

const backToMenuBtn = document.getElementById('back-to-menu');

// Game State
let currentSlotIndex = null;
let gameData = null;
let autoProductionInterval = null;

// === Funktionen zum Laden/Speichern der Slots ===

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
      loadBtn.textContent = 'Load';
      loadBtn.onclick = () => {
        startGameFromSlot(i);
      };
      slotDiv.appendChild(loadBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-button');
      deleteBtn.onclick = () => {
        if (confirm(`Spielstand "${slotData.name}" fr?`)) {
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
      emptySpan.textContent = 'Empty Slot';
      slotDiv.appendChild(emptySpan);

      const newBtn = document.createElement('button');
      newBtn.textContent = 'New Game';
      newBtn.onclick = () => {
        openNewSlotDialogMenu();
      };
      slotDiv.appendChild(newBtn);
    }
    slotsContainer.appendChild(slotDiv);
  }
}

// === Hauptmenü anzeigen ===

function showMainMenu() {
  mainMenu.style.display = 'block';
  slotsScreen.style.display = 'none';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'none';
  stopAutoProduction();
}

// === Speicherstände-Screen anzeigen ===

function showSlotsScreen() {
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'block';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'none';
  renderSlots();
  stopAutoProduction();
}

// === Neues Spiel Name Eingabe öffnen ===

function openNewSlotDialogMenu() {
  newSlotNameInput.value = '';
  newSlotNameContainer.style.display = 'block';
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'none';
}

// === Neues Spiel erstellen ===

function createNewGame(slotIndex, name) {
  const initialData = {
    name: name,
    socken: 0,
    produktion: 0,
    nadeln: 0,
    maschinen: 0,
    mitarbeiter: 0,
    coolaid: 0,
    kfc: 0,
  };

  // Slot-Übersicht updaten
  const slots = loadSlots();
  slots[slotIndex] = { name: name };
  saveSlots(slots);

  // Spiel-Daten speichern
  saveGameData(slotIndex, initialData);

  startGame(slotIndex);
}

// === Spiel starten ===

function startGame(slotIndex) {
  currentSlotIndex = slotIndex;
  const data = loadGameData(slotIndex);

  if (!data) {
    alert('I AINT ABLE TO LOAD UR SHIT');
    showMainMenu();
    return;
  }
  gameData = data;
  updateUI();
  showGameScreen();
  startAutoProduction();
}

// === Spielbildschirm anzeigen ===

function showGameScreen() {
  mainMenu.style.display = 'none';
  slotsScreen.style.display = 'none';
  newSlotNameContainer.style.display = 'none';
  gamescreen.style.display = 'flex';
}

// === Spiel beenden & zurück zum Menü ===

function quitToMenu() {
  saveGameData(currentSlotIndex, gameData);
  currentSlotIndex = null;
  gameData = null;
  stopAutoProduction();
  showMainMenu();
}

// === UI Update ===

function updateUI() {
  sockenCountEl.textContent = `Cotton: ${Math.floor(gameData.socken)}`;
  productionCountEl.textContent = `Production: ${gameData.produktion.toFixed(1)} Cotton/Sek`;

  // Preise aktualisieren
  buyNadelBtn.disabled = gameData.socken < getPrice('nadel');
  buyMaschineBtn.disabled = gameData.socken < getPrice('maschine');
  buyMitarbeiterBtn.disabled = gameData.socken < getPrice('mitarbeiter');
  buyKfcBtn.disabled = gameData.socken < getPrice('kfc')

  document.getElementById('price-nadel').textContent = getPrice('nadel');
  document.getElementById('price-maschine').textContent = getPrice('maschine');
  document.getElementById('price-mitarbeiter').textContent = getPrice('mitarbeiter');
  document.getElementById('price-kfc').textContent = getPrice('kfc');
}

// === Klick auf Wolle (manuelles Häckeln) ===

wolleImg.addEventListener('click', () => {
  if(gameData.coolaid === 0){
    gameData.socken += 1;
    updateUI();
  }else{
    if(gameData.coolaid === 1){
    gameData.socken += 2;
    updateUI();
    }
  }
});

// === Automatische Produktion ===

function calculateProduction() {
  // Basierend auf Upgrades
  return (gameData.nadeln * 0.1) + (gameData.maschinen * 1) + (gameData.mitarbeiter * 5) + (gameData.kfc * 10);
}

function startAutoProduction() {
  if (autoProductionInterval) clearInterval(autoProductionInterval);

  autoProductionInterval = setInterval(() => {
    gameData.produktion = calculateProduction();
    gameData.socken += gameData.produktion / 10; // alle 100ms kleine Schritte
    updateUI();
  }, 100);
}

function stopAutoProduction() {
  if (autoProductionInterval) {
    clearInterval(autoProductionInterval);
    autoProductionInterval = null;
  }
}

// === Shop Kaufen Funktionen ===

function getPrice(item) {
  // Preise steigen bei jedem Kauf
  switch (item) {
    case 'nadel':
      return 10 + (gameData.nadeln * 5);
    case 'maschine':
      return 50 + (gameData.maschinen * 20);
    case 'mitarbeiter':
      return 200 + (gameData.mitarbeiter * 150);
    case 'kfc':
      return 1000 + (gameData.kfc * 500);
  }
  return 0;
}

buyCoolaidBtn.addEventListener('click', () => {
  if(gameData.coolaid === 0){
    const price = 2000;
    if(gameData.socken >= price){
      gameData.socken -= price;
      coolaid = 1;
      updateUI();
    }
  }
});

buyNadelBtn.addEventListener('click', () => {
  const price = getPrice('nadel');
  if (gameData.socken >= price) {
    gameData.socken -= price;
    gameData.nadeln++;
    updateUI();
  }
});

buyMaschineBtn.addEventListener('click', () => {
  const price = getPrice('maschine');
  if (gameData.socken >= price) {
    gameData.socken -= price;
    gameData.maschinen++;
    updateUI();
  }
});

buyMitarbeiterBtn.addEventListener('click', () => {
  const price = getPrice('mitarbeiter');
  if (gameData.socken >= price) {
    gameData.socken -= price;
    gameData.mitarbeiter++;
    updateUI();
  }
});

buyKfcBtn.addEventListener('click', () => {
  const price = getPrice('kfc');
  if (gameData.socken >= price) {
    gameData.socken -= price;
    gameData.kfc++;
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

menuExitBtn.addEventListener('click', () => {
  if (confirm('U REALLY WANNA LEAVE ME?')) {
    window.close(); // Geht im Browser nicht immer, aber okay
  }
});

// === Slots-Screen Buttons ===

slotsBackBtn.addEventListener('click', () => {
  showMainMenu();
});

// === Neues Spiel Dialog Buttons ===

confirmNewSlotBtn.addEventListener('click', () => {
  const name = newSlotNameInput.value.trim();
  if (!name) {
    alert('YOU AINT PUTTIN A REAL NAME, I AINT CONNA CREATE IT');
    return;
  }

  // Finde ersten freien Slot
  const slots = loadSlots();
  const freeSlotIndex = slots.findIndex(slot => slot === null);

  if (freeSlotIndex === -1) {
    alert('THERE AINT NO SPACE');
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
  if (confirm('U WANNA SAVE?')) {
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

// === Beim Laden Seite Menü zeigen ===

showMainMenu();
