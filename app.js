const rarityConfig = {
    milspec: { label: 'Mil-Spec', className: 'rarity-milspec', labelClass: 'rarity-label-milspec', weight: 70 },
    restricted: { label: 'Restricted', className: 'rarity-restricted', labelClass: 'rarity-label-restricted', weight: 20 },
    classified: { label: 'Classified', className: 'rarity-classified', labelClass: 'rarity-label-classified', weight: 7 },
    covert: { label: 'Covert', className: 'rarity-covert', labelClass: 'rarity-label-covert', weight: 2.5 },
    contraband: { label: 'Contraband', className: 'rarity-contraband', labelClass: 'rarity-label-contraband', weight: 0.4 },
    rare: { label: 'Засекреченное', className: 'rarity-rare', labelClass: 'rarity-label-rare', weight: 0.3 },
    legendary: { label: 'Exceedingly Rare', className: 'rarity-legendary', labelClass: 'rarity-label-legendary', weight: 0.1 }
};

const IMAGE_BASE_URL = 'https://steamcommunity.com/economy/image/item/730/';
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyMDAgMjAwJz48cmVjdCB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0nIzExMTgyNycvPjx0ZXh0IHg9JzUwJScgeT0nNTAlJyBmaWxsPScjOWNhM2FmJyBmb250LWZhbWlseT0nUm9ib3RvLEFyaWFsLHNhbnMtc2VyaWYnIGZvbnQtc2l6ZT0nMjQnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnPk5PIElNQUdFPC90ZXh0Pjwvc3ZnPg==';

function toMarketHash({ name, wear, marketHash }) {
    if (marketHash) {
        return marketHash;
    }
    return wear ? `${name} (${wear})` : name;
}

function buildImageUrl(descriptor) {
    if (typeof descriptor === 'string') {
        return `${IMAGE_BASE_URL}${encodeURIComponent(descriptor)}`;
    }
    return `${IMAGE_BASE_URL}${encodeURIComponent(toMarketHash(descriptor))}`;
}

function applyImage(img, src, alt) {
    img.loading = 'lazy';
    img.classList.remove('image-placeholder');
    delete img.dataset.fallbackApplied;
    img.alt = alt;
    img.addEventListener('error', () => {
        if (img.dataset.fallbackApplied) {
            return;
        }
        img.dataset.fallbackApplied = 'true';
        img.src = FALLBACK_IMAGE;
        img.alt = `${alt} (плейсхолдер)`;
        img.classList.add('image-placeholder');
    }, { once: true });
    img.src = src;
}

const rawCases = [
    {
        id: 'phoenix-pro',
        name: 'Пламя Феникса',
        price: 6.49,
        description: 'Сбалансированный набор ярких AR и AWP скинов с шансом на редчайшие дропы.',
        showcase: [
            { name: 'AK-47 | Asiimov', wear: 'Field-Tested' },
            { name: 'AWP | Desert Hydra', wear: 'Field-Tested' },
            { name: 'M4A1-S | Player Two', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'AK-47 | Asiimov', wear: 'Field-Tested', rarity: 'covert', price: 48.3, chance: 0.6 },
            { name: 'AWP | Desert Hydra', wear: 'Field-Tested', rarity: 'covert', price: 410.0, chance: 0.15 },
            { name: 'M4A1-S | Player Two', wear: 'Field-Tested', rarity: 'classified', price: 32.4, chance: 2.8 },
            { name: 'AK-47 | Phantom Disruptor', wear: 'Field-Tested', rarity: 'classified', price: 18.7, chance: 3.5 },
            { name: 'USP-S | Cortex', wear: 'Field-Tested', rarity: 'restricted', price: 7.4, chance: 9 },
            { name: 'AWP | Acheron', wear: 'Field-Tested', rarity: 'restricted', price: 9.8, chance: 7 },
            { name: 'MAC-10 | Sakkaku', wear: 'Minimal Wear', rarity: 'restricted', price: 5.6, chance: 9 },
            { name: 'Galil AR | Chromatic Aberration', wear: 'Field-Tested', rarity: 'milspec', price: 2.1, chance: 21 },
            { name: 'FAMAS | Eye of Athena', wear: 'Field-Tested', rarity: 'milspec', price: 1.8, chance: 21 },
            { name: 'MAG-7 | Justice', wear: 'Field-Tested', rarity: 'milspec', price: 1.6, chance: 26 },
            { name: '★ Karambit | Lore', wear: 'Field-Tested', rarity: 'legendary', price: 1250, chance: 0.07 },
            { name: '★ Skeleton Knife | Fade', wear: 'Factory New', rarity: 'legendary', price: 980, chance: 0.08 }
        ]
    },
    {
        id: 'night-operation',
        name: 'Ночная операция',
        price: 9.99,
        description: 'Всё для тактических ночных рейдов — темные и дорогие скины с шансом на нож.',
        showcase: [
            { name: 'M4A1-S | Printstream', wear: 'Field-Tested' },
            { name: 'USP-S | Printstream', wear: 'Field-Tested' },
            { name: 'AK-47 | Nightwish', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'M4A1-S | Printstream', wear: 'Field-Tested', rarity: 'covert', price: 310, chance: 0.2 },
            { name: 'USP-S | Printstream', wear: 'Field-Tested', rarity: 'covert', price: 140, chance: 0.5 },
            { name: 'AK-47 | Nightwish', wear: 'Field-Tested', rarity: 'classified', price: 52, chance: 2.6 },
            { name: 'MP9 | Starlight Protector', wear: 'Minimal Wear', rarity: 'classified', price: 24, chance: 3 },
            { name: 'Desert Eagle | Printstream', wear: 'Field-Tested', rarity: 'classified', price: 160, chance: 0.8 },
            { name: 'AWP | Chromatic Aberration', wear: 'Field-Tested', rarity: 'restricted', price: 19.5, chance: 7 },
            { name: 'P2000 | Dispatch', wear: 'Field-Tested', rarity: 'restricted', price: 4.5, chance: 8 },
            { name: 'M4A4 | In Living Color', wear: 'Field-Tested', rarity: 'restricted', price: 8.9, chance: 6.5 },
            { name: 'Negev | dev_texture', wear: 'Field-Tested', rarity: 'milspec', price: 1.9, chance: 18 },
            { name: 'Five-SeveN | Boost Protocol', wear: 'Field-Tested', rarity: 'milspec', price: 2.2, chance: 18 },
            { name: 'Dual Berettas | Melondrama', wear: 'Minimal Wear', rarity: 'milspec', price: 1.4, chance: 18 },
            { name: '★ Karambit | Doppler', wear: 'Factory New', rarity: 'legendary', price: 1450, chance: 0.05 },
            { name: '★ Butterfly Knife | Marble Fade', wear: 'Factory New', rarity: 'legendary', price: 1675, chance: 0.03 },
            { name: 'MP5-SD | Phosphor', wear: 'Field-Tested', rarity: 'restricted', price: 9.4, chance: 3.2 }
        ]
    },
    {
        id: 'ancient-treasures',
        name: 'Древние сокровища',
        price: 3.99,
        description: 'Доступный кейс с фокусом на окупаемость за счёт редких предметов из древних коллекций.',
        showcase: [
            { name: 'AK-47 | Legion of Anubis', wear: 'Field-Tested' },
            { name: 'M4A1-S | Golden Coil', wear: 'Field-Tested' },
            { name: 'MAC-10 | Gold Brick', wear: 'Minimal Wear' }
        ],
        skins: [
            { name: 'AK-47 | Legion of Anubis', wear: 'Field-Tested', rarity: 'classified', price: 21.5, chance: 1.4 },
            { name: 'M4A1-S | Golden Coil', wear: 'Field-Tested', rarity: 'classified', price: 28.7, chance: 1 },
            { name: 'AK-47 | Aquamarine Revenge', wear: 'Field-Tested', rarity: 'covert', price: 22, chance: 0.8 },
            { name: 'Glock-18 | Neo-Noir', wear: 'Field-Tested', rarity: 'restricted', price: 12.4, chance: 3 },
            { name: 'Desert Eagle | Night Heist', wear: 'Field-Tested', rarity: 'restricted', price: 5.8, chance: 4 },
            { name: 'MAC-10 | Gold Brick', wear: 'Minimal Wear', rarity: 'restricted', price: 4.1, chance: 4 },
            { name: 'P250 | Cyber Shell', wear: 'Field-Tested', rarity: 'milspec', price: 1.2, chance: 12 },
            { name: 'Galil AR | Vandal', wear: 'Field-Tested', rarity: 'milspec', price: 1.3, chance: 12 },
            { name: 'XM1014 | Ancient Lore', wear: 'Field-Tested', rarity: 'milspec', price: 1.1, chance: 12 },
            { name: 'SSG 08 | Prey', wear: 'Field-Tested', rarity: 'milspec', price: 0.85, chance: 12 },
            { name: 'AWP | The Prince', wear: 'Minimal Wear', rarity: 'contraband', price: 1700, chance: 0.04 },
            { name: '★ Talon Knife | Fade', wear: 'Factory New', rarity: 'legendary', price: 1200, chance: 0.03 }
        ]
    },
    {
        id: 'budget-rush',
        name: 'Бюджетный прорыв',
        price: 1.89,
        description: 'Идеальный кейс для старта — много дешёвых дропов и шанс на редкие апгрейды.',
        showcase: [
            { name: 'AK-47 | Slate', wear: 'Field-Tested' },
            { name: 'AWP | Atheris', wear: 'Field-Tested' },
            { name: 'MP7 | Abyssal Apparition', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'AK-47 | Slate', wear: 'Field-Tested', rarity: 'restricted', price: 7.1, chance: 3.2 },
            { name: 'AWP | Atheris', wear: 'Field-Tested', rarity: 'restricted', price: 6.2, chance: 3.4 },
            { name: 'MP7 | Abyssal Apparition', wear: 'Field-Tested', rarity: 'restricted', price: 4.8, chance: 3.5 },
            { name: 'Desert Eagle | Light Rail', wear: 'Field-Tested', rarity: 'restricted', price: 2.4, chance: 5 },
            { name: 'P90 | Cocoa Rampage', wear: 'Field-Tested', rarity: 'milspec', price: 1, chance: 12 },
            { name: 'Five-SeveN | Fairy Tale', wear: 'Field-Tested', rarity: 'milspec', price: 1.3, chance: 12 },
            { name: 'SG 553 | Phantom', wear: 'Field-Tested', rarity: 'milspec', price: 1.1, chance: 12 },
            { name: 'Nova | Windblown', wear: 'Field-Tested', rarity: 'milspec', price: 0.9, chance: 12 },
            { name: 'UMP-45 | Oscillator', wear: 'Field-Tested', rarity: 'milspec', price: 0.6, chance: 15 },
            { name: 'USP-S | Lead Conduit', wear: 'Field-Tested', rarity: 'milspec', price: 0.75, chance: 15 },
            { name: 'M4A4 | Spider Lily', wear: 'Field-Tested', rarity: 'classified', price: 28.5, chance: 0.8 },
            { name: 'AK-47 | Fuel Injector', wear: 'Field-Tested', rarity: 'covert', price: 110, chance: 0.09 }
        ]
    },
    {
        id: 'knife-express',
        name: 'Ножевой экспресс',
        price: 49.99,
        description: 'Максимальные шансы на ножи и топовые covert-предметы. Лучшее для хайроллеров.',
        showcase: [
            { name: '★ Karambit | Gamma Doppler', wear: 'Factory New' },
            { name: '★ Butterfly Knife | Lore', wear: 'Field-Tested' },
            { name: 'AWP | Dragon Lore', wear: 'Factory New' }
        ],
        skins: [
            { name: '★ Karambit | Gamma Doppler', wear: 'Factory New', rarity: 'legendary', price: 1900, chance: 0.5 },
            { name: '★ Butterfly Knife | Lore', wear: 'Field-Tested', rarity: 'legendary', price: 2100, chance: 0.45 },
            { name: '★ Classic Knife | Fade', wear: 'Factory New', rarity: 'legendary', price: 850, chance: 0.9 },
            { name: 'AWP | Dragon Lore', wear: 'Factory New', rarity: 'contraband', price: 4600, chance: 0.1 },
            { name: 'AK-47 | Wild Lotus', wear: 'Field-Tested', rarity: 'covert', price: 2400, chance: 0.2 },
            { name: 'M4A1-S | Hot Rod', wear: 'Factory New', rarity: 'covert', price: 980, chance: 0.35 },
            { name: 'Desert Eagle | Fennec Fox', wear: 'Field-Tested', rarity: 'classified', price: 540, chance: 1.4 },
            { name: 'AK-47 | The Empress', wear: 'Field-Tested', rarity: 'classified', price: 190, chance: 1.6 },
            { name: 'M4A4 | Royal Paladin', wear: 'Field-Tested', rarity: 'restricted', price: 74, chance: 3 },
            { name: 'USP-S | Kill Confirmed', wear: 'Field-Tested', rarity: 'restricted', price: 85, chance: 2.8 },
            { name: 'Five-SeveN | Angry Mob', wear: 'Field-Tested', rarity: 'milspec', price: 16, chance: 6 },
            { name: 'MP9 | Wild Lily', wear: 'Field-Tested', rarity: 'milspec', price: 12, chance: 6 }
        ]
    },
    {
        id: 'awp-sanctum',
        name: 'AWP: Святилище',
        price: 12.49,
        description: 'Коллекция из культовых AWP — от легендарного Dragon Lore до бюджетного Mortis.',
        showcase: [
            { name: 'AWP | Dragon Lore', wear: 'Factory New' },
            { name: 'AWP | Gungnir', wear: 'Factory New' },
            { name: 'AWP | Wildfire', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'AWP | Dragon Lore', wear: 'Factory New', rarity: 'contraband', price: 4600, chance: 0.04 },
            { name: 'AWP | Gungnir', wear: 'Factory New', rarity: 'covert', price: 3100, chance: 0.08 },
            { name: 'AWP | Desert Hydra', wear: 'Factory New', rarity: 'covert', price: 520, chance: 0.3 },
            { name: 'AWP | Oni Taiji', wear: 'Field-Tested', rarity: 'covert', price: 145, chance: 0.7 },
            { name: 'AWP | Wildfire', wear: 'Field-Tested', rarity: 'covert', price: 65, chance: 1.1 },
            { name: 'AWP | Hyper Beast', wear: 'Field-Tested', rarity: 'classified', price: 28, chance: 3 },
            { name: 'AWP | Neo-Noir', wear: 'Field-Tested', rarity: 'classified', price: 24, chance: 4 },
            { name: 'AWP | Atheris', wear: 'Field-Tested', rarity: 'restricted', price: 6.2, chance: 12 },
            { name: 'AWP | Exoskeleton', wear: 'Field-Tested', rarity: 'restricted', price: 6, chance: 12 },
            { name: 'AWP | Mortis', wear: 'Field-Tested', rarity: 'restricted', price: 5, chance: 12 },
            { name: 'AWP | Elite Build', wear: 'Field-Tested', rarity: 'milspec', price: 1.4, chance: 20 },
            { name: 'AWP | PAW', wear: 'Field-Tested', rarity: 'milspec', price: 1.2, chance: 20 }
        ]
    },
    {
        id: 'deagle-syndicate',
        name: 'Синдикат Deagle',
        price: 7.79,
        description: 'Только Desert Eagle — от легендарного Blaze до доступного Oxide Blaze.',
        showcase: [
            { name: 'Desert Eagle | Blaze', wear: 'Factory New' },
            { name: 'Desert Eagle | Fennec Fox', wear: 'Field-Tested' },
            { name: 'Desert Eagle | Printstream', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'Desert Eagle | Blaze', wear: 'Factory New', rarity: 'covert', price: 640, chance: 0.25 },
            { name: 'Desert Eagle | Fennec Fox', wear: 'Field-Tested', rarity: 'classified', price: 540, chance: 0.4 },
            { name: 'Desert Eagle | Printstream', wear: 'Field-Tested', rarity: 'covert', price: 160, chance: 0.7 },
            { name: 'Desert Eagle | Ocean Drive', wear: 'Field-Tested', rarity: 'covert', price: 180, chance: 0.65 },
            { name: 'Desert Eagle | Code Red', wear: 'Field-Tested', rarity: 'classified', price: 68, chance: 1.4 },
            { name: 'Desert Eagle | Mecha Industries', wear: 'Field-Tested', rarity: 'classified', price: 32, chance: 2.2 },
            { name: 'Desert Eagle | Kumicho Dragon', wear: 'Field-Tested', rarity: 'classified', price: 45, chance: 2 },
            { name: 'Desert Eagle | Midnight Storm', wear: 'Field-Tested', rarity: 'restricted', price: 7, chance: 6 },
            { name: 'Desert Eagle | Light Rail', wear: 'Field-Tested', rarity: 'restricted', price: 6, chance: 6 },
            { name: 'Desert Eagle | Conspiracy', wear: 'Field-Tested', rarity: 'restricted', price: 5, chance: 6 },
            { name: 'Desert Eagle | Bronze Deco', wear: 'Field-Tested', rarity: 'milspec', price: 2, chance: 15 },
            { name: 'Desert Eagle | Sputnik', wear: 'Field-Tested', rarity: 'milspec', price: 1.3, chance: 15 },
            { name: 'Desert Eagle | Directive', wear: 'Field-Tested', rarity: 'milspec', price: 1.1, chance: 15 },
            { name: 'Desert Eagle | Oxide Blaze', wear: 'Field-Tested', rarity: 'milspec', price: 0.9, chance: 15 }
        ]
    },
    {
        id: 'usp-blacksite',
        name: 'Черный сектор USP',
        price: 5.89,
        description: 'Коллекция для ценителей USP-S: редкие неонуары и бюджетные варианты.',
        showcase: [
            { name: 'USP-S | Kill Confirmed', wear: 'Field-Tested' },
            { name: 'USP-S | Printstream', wear: 'Field-Tested' },
            { name: 'USP-S | Neo-Noir', wear: 'Field-Tested' }
        ],
        skins: [
            { name: 'USP-S | Printstream', wear: 'Field-Tested', rarity: 'covert', price: 140, chance: 0.9 },
            { name: 'USP-S | Kill Confirmed', wear: 'Field-Tested', rarity: 'classified', price: 85, chance: 1.1 },
            { name: 'USP-S | Neo-Noir', wear: 'Field-Tested', rarity: 'classified', price: 35, chance: 2 },
            { name: 'USP-S | Road Rash', wear: 'Field-Tested', rarity: 'classified', price: 48, chance: 1.5 },
            { name: 'USP-S | Orion', wear: 'Field-Tested', rarity: 'classified', price: 62, chance: 1.1 },
            { name: 'USP-S | Target Acquired', wear: 'Field-Tested', rarity: 'classified', price: 28, chance: 2.4 },
            { name: 'USP-S | Cortex', wear: 'Field-Tested', rarity: 'restricted', price: 7.4, chance: 6 },
            { name: 'USP-S | Black Lotus', wear: 'Field-Tested', rarity: 'restricted', price: 4.6, chance: 6 },
            { name: 'USP-S | Monster Mashup', wear: 'Field-Tested', rarity: 'restricted', price: 6, chance: 6 },
            { name: 'USP-S | Stainless', wear: 'Field-Tested', rarity: 'restricted', price: 3.5, chance: 6 },
            { name: 'USP-S | Ticket to Hell', wear: 'Field-Tested', rarity: 'milspec', price: 2, chance: 15 },
            { name: 'USP-S | Flashback', wear: 'Field-Tested', rarity: 'milspec', price: 1, chance: 15 },
            { name: 'USP-S | Night Ops', wear: 'Field-Tested', rarity: 'milspec', price: 0.8, chance: 15 },
            { name: 'USP-S | Torque', wear: 'Field-Tested', rarity: 'milspec', price: 1.1, chance: 15 }
        ]
    },
    {
        id: 'farm-gold',
        name: 'Фарм кейс: Золотая охота',
        price: 2.59,
        description: 'Один шанс на золотой нож и гора ширпа для фарма контрактов.',
        showcase: [
            { name: '★ Butterfly Knife | Lore', wear: 'Field-Tested' },
            { name: 'AK-47 | Safari Mesh', wear: 'Field-Tested' },
            { name: 'Glock-18 | Groundwater', wear: 'Field-Tested' }
        ],
        skins: [
            { name: '★ Butterfly Knife | Lore', wear: 'Field-Tested', rarity: 'legendary', price: 1600, chance: 0.05 },
            { name: 'AK-47 | Safari Mesh', wear: 'Field-Tested', rarity: 'milspec', price: 0.45, chance: 16.6 },
            { name: 'Five-SeveN | Contractor', wear: 'Field-Tested', rarity: 'milspec', price: 0.12, chance: 16.6 },
            { name: 'Tec-9 | VariCamo', wear: 'Field-Tested', rarity: 'milspec', price: 0.13, chance: 16.6 },
            { name: 'SCAR-20 | Sand Mesh', wear: 'Field-Tested', rarity: 'milspec', price: 0.09, chance: 16.6 },
            { name: 'M249 | Submerged', wear: 'Field-Tested', rarity: 'milspec', price: 0.2, chance: 16.6 },
            { name: 'Glock-18 | Groundwater', wear: 'Field-Tested', rarity: 'milspec', price: 0.35, chance: 16.6 }
        ]
    },
    {
        id: 'farm-emerald',
        name: 'Фарм кейс: Изумрудный миф',
        price: 3.19,
        description: 'Мизерный шанс на изумрудный карамбит и куча дешёвых пушек для апгрейдов.',
        showcase: [
            { name: '★ Karambit | Gamma Doppler', wear: 'Factory New' },
            { name: 'P90 | Sand Spray', wear: 'Field-Tested' },
            { name: 'UMP-45 | Fallout Warning', wear: 'Field-Tested' }
        ],
        skins: [
            { name: '★ Karambit | Gamma Doppler', wear: 'Factory New', rarity: 'legendary', price: 1900, chance: 0.03 },
            { name: 'P90 | Sand Spray', wear: 'Field-Tested', rarity: 'milspec', price: 0.25, chance: 16.2 },
            { name: 'UMP-45 | Fallout Warning', wear: 'Field-Tested', rarity: 'milspec', price: 0.2, chance: 16.2 },
            { name: 'XM1014 | Blue Steel', wear: 'Field-Tested', rarity: 'milspec', price: 0.3, chance: 16.2 },
            { name: 'MAC-10 | Candy Apple', wear: 'Field-Tested', rarity: 'milspec', price: 0.22, chance: 16.2 },
            { name: 'MP9 | Sand Scale', wear: 'Field-Tested', rarity: 'milspec', price: 0.16, chance: 16.2 },
            { name: 'G3SG1 | Desert Storm', wear: 'Field-Tested', rarity: 'milspec', price: 0.18, chance: 16.2 }
        ]
    }
];

const cases = rawCases.map((caseData) => ({
    ...caseData,
    showcase: caseData.showcase.map((entry) => buildImageUrl(entry)),
    skins: caseData.skins.map((skin) => {
        const marketHash = toMarketHash(skin);
        const fullName = skin.displayName || (skin.wear ? `${skin.name} (${skin.wear})` : skin.name);
        return {
            ...skin,
            wear: skin.wear ?? null,
            marketHash,
            fullName,
            image: buildImageUrl(marketHash)
        };
    })
}));

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
let legacyInventoryMigrated = false;
inventory = inventory.map((item) => {
    const fullName = item.fullName || (item.wear ? `${item.name} (${item.wear})` : item.name);
    const needsImageRefresh = !item.image || /csgostash|skin_sideview/.test(item.image);
    if (needsImageRefresh) {
        legacyInventoryMigrated = true;
    }
    return {
        ...item,
        fullName,
        marketHash: item.marketHash || fullName,
        image: needsImageRefresh ? buildImageUrl(fullName) : item.image
    };
});
if (legacyInventoryMigrated) {
    saveState();
}
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
        applyImage(img, src, `${caseData.name} превью`);
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

        applyImage(img, item.image, item.fullName);
        title.textContent = item.fullName;
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

        const image = document.createElement('img');
        applyImage(image, skin.image, skin.fullName);

        const info = document.createElement('div');
        info.className = 'skin-info';
        const title = document.createElement('h5');
        title.textContent = skin.fullName;
        const rarityBadge = document.createElement('span');
        rarityBadge.className = `rarity ${rarityConfig[skin.rarity].labelClass}`;
        rarityBadge.textContent = rarityConfig[skin.rarity].label;
        info.append(title, rarityBadge);

        const price = document.createElement('div');
        price.className = 'skin-price';
        price.textContent = formatCurrency(skin.price);

        const chance = document.createElement('div');
        chance.className = 'drop-chance';
        chance.textContent = `Шанс: ${(skin.chance).toFixed(2)}%`;

        card.append(image, info, price, chance);
        selectors.caseSkinsGrid.appendChild(card);
    });
}

function renderRouletteSlot(container, skin) {
    container.innerHTML = '';
    const image = document.createElement('img');
    applyImage(image, skin.image, skin.fullName);
    const title = document.createElement('strong');
    title.textContent = skin.fullName;
    const rarityBadge = document.createElement('span');
    rarityBadge.className = `rarity ${rarityConfig[skin.rarity].labelClass}`;
    rarityBadge.textContent = rarityConfig[skin.rarity].label;
    container.append(image, title, rarityBadge);
}

function populateRoulette(caseData) {
    selectors.rouletteStrip.innerHTML = '';
    const sample = buildRouletteSample(caseData.skins);
    sample.forEach((skin) => {
        const card = document.createElement('div');
        card.className = 'roulette-card';
        renderRouletteSlot(card, skin);
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

    renderRouletteSlot(sample[winningIndex], winningSkin);

    const targetOffset = -(winningIndex * 160) + (selectors.rouletteStrip.parentElement.offsetWidth / 2) - 70;
    requestAnimationFrame(() => {
        selectors.rouletteStrip.style.transition = 'transform 4s cubic-bezier(0.22, 1, 0.36, 1)';
        selectors.rouletteStrip.style.transform = `translateX(${targetOffset}px)`;
    });

    setTimeout(() => {
        selectors.rouletteResult.innerHTML = `Вам выпал <strong>${winningSkin.fullName}</strong> (${formatCurrency(winningSkin.price)})!`;
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
    document.querySelectorAll('[data-apply-fallback]').forEach((img) => {
        const src = img.getAttribute('src');
        if (!src) return;
        const alt = img.getAttribute('alt') || 'Skin preview';
        applyImage(img, src, alt);
    });
    updateBalanceDisplay();
    updateInventorySummary();
    renderInventory();
    renderCases();
    registerEvents();
}

init();
