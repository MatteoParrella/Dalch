/**
 * Configurazione e Stato dell'Applicazione
 */
const CONFIG = {
    bottiglie: [
        {
            nome: "Tequila",
            modello: "video/Make_Any_Cocktail_Simply_Perfect_Patr_n_Tequila_1080P.mp4",
            links: { storia: "pagine/StoriaT.html", chimica: "pagine/processiT.html", pericolo: "pagine/PericoliT.html" }
        },
        {
            nome: "Vodka",
            modello: "video/Absolut_Vodka_Born_to_mix_-_DC_1080P.mp4",
            links: { storia: "pagine/StoriaV.html", chimica: "pagine/processiV.html", pericolo: "pagine/PericoliV.html" }
        },
        {
            nome: "Jägermeister",
            modello: "video/J_germeister_CINEMATIC_Commercial_2160P.mp4",
            links: { storia: "pagine/StoriaJ.html", chimica: "pagine/processiJ.html", pericolo: "pagine/PericoliJ.html" }
        },
        {
            nome: "Moët & Chandon",
            modello: "video/Moet_Chandon_-_Celebrate_2160P.webm",
            links: { storia: "pagine/StoriaM.html", chimica: "pagine/processiM.html", pericolo: "pagine/PericoliM.html" }
        },
        {
            nome: "Jack Daniel's",
            modello: "video/Jack_Daniels_Whiskey_Commercial_1080P (1).mp4",
            links: { storia: "pagine/StoriaR.html", chimica: "pagine/processiR.html", pericolo: "pagine/PericoliR.html" }
        },
        {
            nome: "Gin",
            modello: "video/BOMBAY_SAPPHIRE_GIN_PROMO_VIDEO_by_Jamie_Bulman_Media_2160P.mp4",
            links: { storia: "pagine/StoriaG.html", chimica: "pagine/processiG.html", pericolo: "pagine/PericoloG.html" }
        }
        // ... aggiungi le altre bottiglie seguendo questa struttura a oggetti per i link
    ],
    get total() { return this.bottiglie.length; }
};

// State management
let state = {
    currentIndex: 0
};

// Cache degli elementi DOM (per evitare di cercarli ogni volta)
const ui = {
    container: document.getElementById('bottle-list'),
    video: document.getElementById('bg-video'),
    videoSource: document.getElementById('video-source'),
    nameDisplay: document.getElementById('bottle-name'),
    navItems: [] // Popolato dinamicamente
};

/**
 * Inizializzazione
 */
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    updateUI();
});

function initUI() {
    if (!ui.container) return;

    // Frammento di documento per migliorare le performance di inserimento
    const fragment = document.createDocumentFragment();

    CONFIG.bottiglie.forEach((b, index) => {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.textContent = b.nome;
        btn.dataset.index = index; // Usiamo i data-attributes
        
        // Event Listener centralizzato o singolo (qui singolo per semplicità)
        btn.addEventListener('click', () => goTo(index));
        
        fragment.appendChild(btn);
        ui.navItems.push(btn); // Salviamo il riferimento
    });

    ui.container.appendChild(fragment);
}

/**
 * Logica di Aggiornamento (Single Source of Truth)
 */
function updateUI() {
    const data = CONFIG.bottiglie[state.currentIndex];
    if (!data) return;

    // 1. Gestione Video con check di sicurezza
    if (ui.video && ui.videoSource) {
        ui.videoSource.src = data.modello;
        ui.video.load();
        // Play ritorna una promise, la gestiamo in modo pulito
        ui.video.play().catch(() => console.warn("Autoplay impedito dal browser"));
    }

    // 2. Titolo
    if (ui.nameDisplay) ui.nameDisplay.textContent = data.nome;

    // 3. Update Classi Navigazione (Ottimizzato)
    ui.navItems.forEach((btn, i) => {
        const isActive = i === state.currentIndex;
        btn.classList.toggle('active', isActive);
        if (isActive) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

/**
 * Navigazione
 */
const navigate = (direction) => {
    state.currentIndex = (state.currentIndex + direction + CONFIG.total) % CONFIG.total;
    updateUI();
};

const goTo = (index) => {
    if (state.currentIndex === index) return;
    state.currentIndex = index;
    updateUI();
};

/**
 * Gestione Tab (Refactored)
 */
function switchTab(type) {
    const bottle = CONFIG.bottiglie[state.currentIndex];
    const url = bottle.links?.[type];

    if (url && url !== "#") {
        window.location.href = url;
    } else {
        console.error(`Link "${type}" non trovato per ${bottle.nome}`);
    }
}