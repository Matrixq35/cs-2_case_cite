const rarityConfig = {
    milspec: { label: 'Mil-Spec', className: 'rarity-milspec', labelClass: 'rarity-label-milspec', weight: 70 },
    restricted: { label: 'Restricted', className: 'rarity-restricted', labelClass: 'rarity-label-restricted', weight: 20 },
    classified: { label: 'Classified', className: 'rarity-classified', labelClass: 'rarity-label-classified', weight: 7 },
    covert: { label: 'Covert', className: 'rarity-covert', labelClass: 'rarity-label-covert', weight: 2.5 },
    contraband: { label: 'Contraband', className: 'rarity-contraband', labelClass: 'rarity-label-contraband', weight: 0.4 },
    rare: { label: 'Засекреченное', className: 'rarity-rare', labelClass: 'rarity-label-rare', weight: 0.3 },
    legendary: { label: 'Exceedingly Rare', className: 'rarity-legendary', labelClass: 'rarity-label-legendary', weight: 0.1 }
};

const cases = [
    {
        id: 'phoenix-pro',
        name: 'Пламя Феникса',
        price: 6.49,
        description: 'Сбалансированный набор ярких AR и AWP скиннов с шансом на редчайшие дропы.',
        showcase: [
            'https://cdn.csgostash.com/img/skin_sideview/s1039.png',
            'https://cdn.csgostash.com/img/skin_sideview/s671.png',
            'https://cdn.csgostash.com/img/skin_sideview/s960.png'
        ],
        skins: [
            { name: 'AK-47 | Asiimov', rarity: 'covert', price: 48.3, image: 'https://cdn.csgostash.com/img/skin_sideview/s671.png', chance: 0.35 },
            { name: 'AWP | Desert Hydra', rarity: 'covert', price: 410.0, image: 'https://cdn.csgostash.com/img/skin_sideview/s1039.png', chance: 0.08 },
            { name: 'M4A1-S | Player Two', rarity: 'classified', price: 32.4, image: 'https://cdn.csgostash.com/img/skin_sideview/s960.png', chance: 1.2 },
            { name: 'AK-47 | Phantom Disruptor', rarity: 'classified', price: 18.7, image: 'https://cdn.csgostash.com/img/skin_sideview/s958.png', chance: 1.5 },
            { name: 'USP-S | Cortex', rarity: 'restricted', price: 7.4, image: 'https://cdn.csgostash.com/img/skin_sideview/s812.png', chance: 4 },
            { name: 'AWP | Acheron', rarity: 'restricted', price: 9.8, image: 'https://cdn.csgostash.com/img/skin_sideview/s1267.png', chance: 3.6 },
            { name: 'MAC-10 | Sakkaku', rarity: 'restricted', price: 5.6, image: 'https://cdn.csgostash.com/img/skin_sideview/s1213.png', chance: 6 },
            { name: 'Galil AR | Chromatic Aberration', rarity: 'milspec', price: 2.1, image: 'https://cdn.csgostash.com/img/skin_sideview/s930.png', chance: 9 },
            { name: 'FAMAS | Eye of Athena', rarity: 'milspec', price: 1.8, image: 'https://cdn.csgostash.com/img/skin_sideview/s719.png', chance: 9.5 },
            { name: 'MAG-7 | Justice', rarity: 'milspec', price: 1.6, image: 'https://cdn.csgostash.com/img/skin_sideview/s720.png', chance: 9.5 },
            { name: 'Градация ножей', rarity: 'legendary', price: 1300, image: 'https://cdn.csgostash.com/img/skin_sideview/s1284.png', chance: 0.04 },
            { name: '★ Гамма-нож | Lore', rarity: 'legendary', price: 950, image: 'https://cdn.csgostash.com/img/skin_sideview/s800.png', chance: 0.03 }
        ]
    },
    {
        id: 'night-operation',
        name: 'Ночная операция',
        price: 9.99,
        description: 'Всё для тактических ночных рейдов — темные и дорогие скины с шансом на нож.',
        showcase: [
            'https://cdn.csgostash.com/img/skin_sideview/s1286.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1175.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1282.png'
        ],
        skins: [
            { name: 'M4A1-S | Printstream', rarity: 'covert', price: 310, image: 'https://cdn.csgostash.com/img/skin_sideview/s1286.png', chance: 0.07 },
            { name: 'USP-S | Printstream', rarity: 'covert', price: 140, image: 'https://cdn.csgostash.com/img/skin_sideview/s1175.png', chance: 0.12 },
            { name: 'AK-47 | Nightwish', rarity: 'classified', price: 52, image: 'https://cdn.csgostash.com/img/skin_sideview/s1182.png', chance: 0.9 },
            { name: 'MP9 | Starlight Protector', rarity: 'classified', price: 24, image: 'https://cdn.csgostash.com/img/skin_sideview/s1183.png', chance: 1.1 },
            { name: 'AWP | Chromatic Aberration', rarity: 'restricted', price: 19.5, image: 'https://cdn.csgostash.com/img/skin_sideview/s930.png', chance: 2.6 },
            { name: 'P2000 | Dispatch', rarity: 'restricted', price: 4.5, image: 'https://cdn.csgostash.com/img/skin_sideview/s1185.png', chance: 3.6 },
            { name: 'M4A4 | In Living Color', rarity: 'restricted', price: 8.9, image: 'https://cdn.csgostash.com/img/skin_sideview/s1125.png', chance: 3 },
            { name: 'Negev | dev_texture', rarity: 'milspec', price: 1.9, image: 'https://cdn.csgostash.com/img/skin_sideview/s1188.png', chance: 8 },
            { name: 'Five-SeveN | Boost Protocol', rarity: 'milspec', price: 2.2, image: 'https://cdn.csgostash.com/img/skin_sideview/s1187.png', chance: 8.5 },
            { name: 'Dual Berettas | Melondrama', rarity: 'milspec', price: 1.4, image: 'https://cdn.csgostash.com/img/skin_sideview/s1186.png', chance: 8.4 },
            { name: '★ Керамбит | Doppler', rarity: 'legendary', price: 1450, image: 'https://cdn.csgostash.com/img/skin_sideview/s141.png', chance: 0.035 },
            { name: '★ Нож-бабочка | Marble Fade', rarity: 'legendary', price: 1675, image: 'https://cdn.csgostash.com/img/skin_sideview/s173.png', chance: 0.025 }
        ]
    },
    {
        id: 'ancient-treasures',
        name: 'Древние сокровища',
        price: 3.99,
        description: 'Доступный кейс с фокусом на окупаемость через редкие предметы из древних коллекций.',
        showcase: [
            'https://cdn.csgostash.com/img/skin_sideview/s1049.png',
            'https://cdn.csgostash.com/img/skin_sideview/s711.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1128.png'
        ],
        skins: [
            { name: 'AK-47 | Legion of Anubis', rarity: 'classified', price: 21.5, image: 'https://cdn.csgostash.com/img/skin_sideview/s1049.png', chance: 1.1 },
            { name: 'M4A1-S | Golden Coil', rarity: 'classified', price: 28.7, image: 'https://cdn.csgostash.com/img/skin_sideview/s711.png', chance: 0.9 },
            { name: 'Glock-18 | Neo-Noir', rarity: 'restricted', price: 12.4, image: 'https://cdn.csgostash.com/img/skin_sideview/s787.png', chance: 2.2 },
            { name: 'Desert Eagle | Night Heist', rarity: 'restricted', price: 5.8, image: 'https://cdn.csgostash.com/img/skin_sideview/s1048.png', chance: 3.2 },
            { name: 'MAC-10 | Gold Brick', rarity: 'restricted', price: 4.1, image: 'https://cdn.csgostash.com/img/skin_sideview/s1128.png', chance: 3.5 },
            { name: 'P250 | Cyber Shell', rarity: 'milspec', price: 1.2, image: 'https://cdn.csgostash.com/img/skin_sideview/s1050.png', chance: 10 },
            { name: 'Galil AR | Vandal', rarity: 'milspec', price: 1.3, image: 'https://cdn.csgostash.com/img/skin_sideview/s1051.png', chance: 10 },
            { name: 'XM1014 | Ancient Lore', rarity: 'milspec', price: 1.1, image: 'https://cdn.csgostash.com/img/skin_sideview/s1047.png', chance: 10 },
            { name: 'AWP | The Prince', rarity: 'contraband', price: 1700, image: 'https://cdn.csgostash.com/img/skin_sideview/s960.png', chance: 0.02 },
            { name: '★ Коготь | Fade', rarity: 'legendary', price: 1200, image: 'https://cdn.csgostash.com/img/skin_sideview/s815.png', chance: 0.015 }
        ]
    },
    {
        id: 'budget-rush',
        name: 'Бюджетный прорыв',
        price: 1.89,
        description: 'Идеальный кейс для старта — высокая частота милспеков и шанс окупиться редкими дропами.',
        showcase: [
            'https://cdn.csgostash.com/img/skin_sideview/s745.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1105.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1222.png'
        ],
        skins: [
            { name: 'AK-47 | Slate', rarity: 'restricted', price: 7.1, image: 'https://cdn.csgostash.com/img/skin_sideview/s1105.png', chance: 2.8 },
            { name: 'AWP | Atheris', rarity: 'restricted', price: 6.2, image: 'https://cdn.csgostash.com/img/skin_sideview/s745.png', chance: 3 },
            { name: 'MP7 | Abyssal Apparition', rarity: 'restricted', price: 4.8, image: 'https://cdn.csgostash.com/img/skin_sideview/s1222.png', chance: 3.2 },
            { name: 'P90 | Cocoa Rampage', rarity: 'milspec', price: 1, image: 'https://cdn.csgostash.com/img/skin_sideview/s1223.png', chance: 12 },
            { name: 'Five-SeveN | Fairy Tale', rarity: 'milspec', price: 1.3, image: 'https://cdn.csgostash.com/img/skin_sideview/s984.png', chance: 12 },
            { name: 'SG 553 | Phantom', rarity: 'milspec', price: 1.1, image: 'https://cdn.csgostash.com/img/skin_sideview/s984.png', chance: 12 },
            { name: 'Nova | Windblown', rarity: 'milspec', price: 0.9, image: 'https://cdn.csgostash.com/img/skin_sideview/s1225.png', chance: 12 },
            { name: 'M4A4 | Spider Lily', rarity: 'classified', price: 28.5, image: 'https://cdn.csgostash.com/img/skin_sideview/s1106.png', chance: 0.6 },
            { name: 'AK-47 | Fuel Injector', rarity: 'covert', price: 110, image: 'https://cdn.csgostash.com/img/skin_sideview/s684.png', chance: 0.09 }
        ]
    },
    {
        id: 'knife-express',
        name: 'Ножевой Экспресс',
        price: 49.99,
        description: 'Максимальные шансы на ножи и топовые covert-предметы. Лучшее для хайроллеров.',
        showcase: [
            'https://cdn.csgostash.com/img/skin_sideview/s141.png',
            'https://cdn.csgostash.com/img/skin_sideview/s173.png',
            'https://cdn.csgostash.com/img/skin_sideview/s1284.png'
        ],
        skins: [
            { name: '★ Керамбит | Gamma Doppler', rarity: 'legendary', price: 1900, image: 'https://cdn.csgostash.com/img/skin_sideview/s141.png', chance: 0.5 },
            { name: '★ Нож-бабочка | Lore', rarity: 'legendary', price: 2100, image: 'https://cdn.csgostash.com/img/skin_sideview/s173.png', chance: 0.45 },
            { name: '★ Классический нож | Fade', rarity: 'legendary', price: 850, image: 'https://cdn.csgostash.com/img/skin_sideview/s1284.png', chance: 0.9 },
            { name: 'AWP | Dragon Lore', rarity: 'contraband', price: 4600, image: 'https://cdn.csgostash.com/img/skin_sideview/s296.png', chance: 0.1 },
            { name: 'AK-47 | Wild Lotus', rarity: 'covert', price: 2400, image: 'https://cdn.csgostash.com/img/skin_sideview/s1280.png', chance: 0.2 },
            { name: 'M4A1-S | Hot Rod', rarity: 'covert', price: 980, image: 'https://cdn.csgostash.com/img/skin_sideview/s193.png', chance: 0.35 },
            { name: 'Desert Eagle | Fennec Fox', rarity: 'classified', price: 540, image: 'https://cdn.csgostash.com/img/skin_sideview/s1169.png', chance: 1.4 },
            { name: 'AK-47 | The Empress', rarity: 'classified', price: 190, image: 'https://cdn.csgostash.com/img/skin_sideview/s731.png', chance: 1.6 },
            { name: 'M4A4 | Royal Paladin', rarity: 'restricted', price: 74, image: 'https://cdn.csgostash.com/img/skin_sideview/s517.png', chance: 3 },
            { name: 'USP-S | Kill Confirmed', rarity: 'restricted', price: 85, image: 'https://cdn.csgostash.com/img/skin_sideview/s587.png', chance: 2.8 },
            { name: 'Five-SeveN | Angry Mob', rarity: 'milspec', price: 16, image: 'https://cdn.csgostash.com/img/skin_sideview/s872.png', chance: 6 },
            { name: 'MP9 | Wild Lily', rarity: 'milspec', price: 12, image: 'https://cdn.csgostash.com/img/skin_sideview/s1005.png', chance: 6 }
        ]
    }
];

const selectors = {
    balance: document.getElementById('balance'),
    inventoryGrid: document.getElementById('inventoryGrid'),
    inventoryValue: document.getElementById('inventoryValue'),
    inventoryCount: document.getElementById('inventoryCount'),
    caseList: document.getElementById('caseList'),
    caseModal: document.getElementById('caseModal'),
    overlay: document.getElementById('overlay'),
    modalCaseName: document.getElementById('modalCaseName'),
    modalCaseDescription: document.getElementById('modalCaseDescription'),
    modalCasePrice: document.getElementById('modalCasePrice'),
    caseSkinsGrid: document.getElementById('caseSkinsGrid'),
    openCaseBtn: document.getElementById('openCaseBtn'),
    rouletteStrip: document.getElementById('rouletteStrip'),
    rouletteResult: document.getElementById('rouletteResult'),
    closeModal: document.getElementById('closeModal'),
    depositBtn: document.getElementById('depositBtn'),
    heroDeposit: document.getElementById('heroDeposit'),
};

let currentBalance = Number(localStorage.getItem('cs2-case-balance')) || 150.00;
let inventory = JSON.parse(localStorage.getItem('cs2-case-inventory') || '[]');
let activeCase = null;
let isSpinning = false;

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function saveState() {
    localStorage.setItem('cs2-case-balance', currentBalance.toFixed(2));
    localStorage.setItem('cs2-case-inventory', JSON.stringify(inventory));
}

function updateBalanceDisplay() {
    selectors.balance.textContent = formatCurrency(currentBalance);
}

function updateInventorySummary() {
    const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
    selectors.inventoryValue.textContent = formatCurrency(totalValue);
    selectors.inventoryCount.textContent = inventory.length.toString();
}

function createCaseCard(caseData) {
    const card = document.createElement('article');
    card.className = 'case-card';

    const header = document.createElement('div');
    header.className = 'case-header';
    header.innerHTML = `<h3>${caseData.name}</h3>`;

    const meta = document.createElement('div');
    meta.className = 'case-meta';
    meta.innerHTML = `<span>${caseData.skins.length} предметов</span><span>${formatCurrency(caseData.price)}</span>`;

    const preview = document.createElement('div');
    preview.className = 'case-preview';
    caseData.showcase.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${caseData.name} skin preview`;
        preview.appendChild(img);
    });

    const description = document.createElement('p');
    description.textContent = caseData.description;
    description.className = 'case-description';

    const openBtn = document.createElement('button');
    openBtn.className = 'btn primary';
    openBtn.textContent = `Открыть за ${formatCurrency(caseData.price)}`;
    openBtn.addEventListener('click', () => openCaseModal(caseData));

    card.append(header, meta, preview, description, openBtn);
    card.addEventListener('click', (event) => {
        if (event.target === openBtn) return;
        openCaseModal(caseData);
    });

    return card;
}

function renderCases() {
    selectors.caseList.innerHTML = '';
    cases.forEach((caseData) => {
        selectors.caseList.appendChild(createCaseCard(caseData));
    });
}

function renderInventory() {
    selectors.inventoryGrid.innerHTML = '';
    if (!inventory.length) {
        selectors.inventoryGrid.classList.add('empty-state');
        selectors.inventoryGrid.innerHTML = `
            <div class="empty-message">
                <h3>Инвентарь пуст</h3>
                <p>Открой кейс, чтобы начать коллекцию.</p>
            </div>
        `;
        return;
    }

    selectors.inventoryGrid.classList.remove('empty-state');
    inventory.forEach((item, index) => {
        const card = document.getElementById('skinCardTemplate').content.firstElementChild.cloneNode(true);
        const img = card.querySelector('img');
        const title = card.querySelector('h5');
        const rarity = card.querySelector('.rarity');
        const price = card.querySelector('.skin-price');
        const sellBtn = card.querySelector('.sell-btn');
        const withdrawBtn = card.querySelector('.withdraw-btn');

        img.src = item.image;
        img.alt = item.name;
        title.textContent = item.name;
        rarity.textContent = rarityConfig[item.rarity].label;
        rarity.classList.add(rarityConfig[item.rarity].labelClass);
        price.textContent = formatCurrency(item.price);

        sellBtn.addEventListener('click', () => {
            currentBalance += item.price;
            inventory.splice(index, 1);
            updateBalanceDisplay();
            updateInventorySummary();
            renderInventory();
            saveState();
        });

        withdrawBtn.addEventListener('click', () => {
            inventory.splice(index, 1);
            updateInventorySummary();
            renderInventory();
            saveState();
        });

        selectors.inventoryGrid.appendChild(card);
    });
}

function openCaseModal(caseData) {
    if (isSpinning) return;
    activeCase = caseData;
    selectors.modalCaseName.textContent = caseData.name;
    selectors.modalCaseDescription.textContent = caseData.description;
    selectors.modalCasePrice.textContent = formatCurrency(caseData.price);
    selectors.openCaseBtn.textContent = `Открыть за ${formatCurrency(caseData.price)}`;
    selectors.rouletteResult.textContent = '';
    populateCaseSkins(caseData);
    populateRoulette(caseData);
    selectors.caseModal.classList.remove('hidden');
    selectors.overlay.classList.remove('hidden');
    selectors.caseModal.setAttribute('aria-hidden', 'false');
}

function closeCaseModal() {
    if (isSpinning) return;
    selectors.caseModal.classList.add('hidden');
    selectors.overlay.classList.add('hidden');
    selectors.caseModal.setAttribute('aria-hidden', 'true');
    activeCase = null;
}

function populateCaseSkins(caseData) {
    selectors.caseSkinsGrid.innerHTML = '';
    caseData.skins.forEach((skin) => {
        const card = document.createElement('div');
        card.className = `skin-card ${rarityConfig[skin.rarity].className}`;
        card.innerHTML = `
            <img src="${skin.image}" alt="${skin.name}">
            <div class="skin-info">
                <h5>${skin.name}</h5>
                <span class="rarity ${rarityConfig[skin.rarity].labelClass}">${rarityConfig[skin.rarity].label}</span>
            </div>
            <div class="skin-price">${formatCurrency(skin.price)}</div>
            <div class="drop-chance">Шанс: ${(skin.chance).toFixed(2)}%</div>
        `;
        selectors.caseSkinsGrid.appendChild(card);
    });
}

function populateRoulette(caseData) {
    selectors.rouletteStrip.innerHTML = '';
    const sample = buildRouletteSample(caseData.skins);
    sample.forEach((skin) => {
        const card = document.createElement('div');
        card.className = 'roulette-card';
        card.innerHTML = `
            <img src="${skin.image}" alt="${skin.name}">
            <strong>${skin.name}</strong>
            <span class="rarity ${rarityConfig[skin.rarity].labelClass}">${rarityConfig[skin.rarity].label}</span>
        `;
        selectors.rouletteStrip.appendChild(card);
    });
}

function buildRouletteSample(skins) {
    const sample = [];
    for (let i = 0; i < 60; i++) {
        sample.push(weightedRandomSkin(skins));
    }
    return sample;
}

function weightedRandomSkin(skins) {
    const totalWeight = skins.reduce((sum, skin) => sum + skin.chance, 0);
    const roll = Math.random() * totalWeight;
    let cumulative = 0;
    for (const skin of skins) {
        cumulative += skin.chance;
        if (roll <= cumulative) {
            return skin;
        }
    }
    return skins[skins.length - 1];
}

function spinRoulette() {
    if (!activeCase || isSpinning) return;
    if (currentBalance < activeCase.price) {
        selectors.rouletteResult.textContent = 'Недостаточно средств. Пополните баланс.';
        return;
    }

    currentBalance -= activeCase.price;
    updateBalanceDisplay();
    saveState();

    isSpinning = true;
    selectors.openCaseBtn.disabled = true;
    selectors.openCaseBtn.textContent = 'Открываем...';

    const sample = Array.from(selectors.rouletteStrip.children);
    const winningSkin = weightedRandomSkin(activeCase.skins);
    const winningIndex = Math.floor(Math.random() * (sample.length - 10)) + 5;

    sample[winningIndex].innerHTML = `
        <img src="${winningSkin.image}" alt="${winningSkin.name}">
        <strong>${winningSkin.name}</strong>
        <span class="rarity ${rarityConfig[winningSkin.rarity].labelClass}">${rarityConfig[winningSkin.rarity].label}</span>
    `;

    const targetOffset = -(winningIndex * 160) + (selectors.rouletteStrip.parentElement.offsetWidth / 2) - 70;
    requestAnimationFrame(() => {
        selectors.rouletteStrip.style.transition = 'transform 4s cubic-bezier(0.22, 1, 0.36, 1)';
        selectors.rouletteStrip.style.transform = `translateX(${targetOffset}px)`;
    });

    setTimeout(() => {
        selectors.rouletteResult.innerHTML = `Вам выпал <strong>${winningSkin.name}</strong> (${formatCurrency(winningSkin.price)})!`;
        addToInventory(winningSkin);
        selectors.openCaseBtn.disabled = false;
        selectors.openCaseBtn.textContent = `Открыть за ${formatCurrency(activeCase.price)}`;
        isSpinning = false;
        selectors.rouletteStrip.style.transition = 'none';
        selectors.rouletteStrip.style.transform = 'translateX(0)';
        populateRoulette(activeCase);
        saveState();
    }, 4200);
}

function addToInventory(skin) {
    const newSkin = { ...skin, id: crypto.randomUUID() };
    inventory.unshift(newSkin);
    updateInventorySummary();
    renderInventory();
}

function handleDeposit() {
    const input = prompt('Введите сумму пополнения (USD):', '50');
    if (!input) return;
    const amount = Number(input);
    if (Number.isNaN(amount) || amount <= 0) {
        alert('Введите корректную сумму.');
        return;
    }
    currentBalance += amount;
    updateBalanceDisplay();
    saveState();
}

function registerEvents() {
    selectors.closeModal.addEventListener('click', closeCaseModal);
    selectors.overlay.addEventListener('click', closeCaseModal);
    selectors.openCaseBtn.addEventListener('click', spinRoulette);
    selectors.depositBtn.addEventListener('click', handleDeposit);
    selectors.heroDeposit.addEventListener('click', handleDeposit);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCaseModal();
        }
    });
}

function init() {
    updateBalanceDisplay();
    updateInventorySummary();
    renderInventory();
    renderCases();
    registerEvents();
}

init();
