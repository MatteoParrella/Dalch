const bottiglie = [
    {
        nome: "Tequila",
        modello: "video/Make_Any_Cocktail_Simply_Perfect_Patr_n_Tequila_1080P.mp4",
        link_storia: "pagine/StoriaT.html",
        link_chimica: "pagine/processiT.html",
        link_pericolo: "pagine/PericoliT.html"
    },
    {
        nome: "Vodka",
        modello: "video/Absolut_Vodka_Born_to_mix_-_DC_1080P.mp4",
        link_storia: "pagine/StoriaV.html",
        link_chimica: "pagine/processiV.html",
        link_pericolo: "pagine/PericoliV.html"
    },
    {
        nome: "Jägermeister",
        modello: "video/J_germeister_CINEMATIC_Commercial_2160P.mp4",
        link_storia: "pagine/StoriaJ.html",
        link_chimica: "pagine/processiJ.html",
        link_pericolo: "pagine/PericoliJ.html"
    },
    {
        nome: "Moët & Chandon",
        modello: "video/Moet_Chandon_-_Celebrate_2160P.webm",
        link_storia: "pagine/StoriaM.html",
        link_chimica: "pagine/processiM.html",
        link_pericolo: "pagine/PericoliM.html"
    },
    {
        nome: "Jack Daniel's",
        modello: "video/Jack_Daniels_Whiskey_Commercial_1080P (1).mp4",
        link_storia: "pagine/StoriaR.html",
        link_chimica: "pagine/processiR.html",
        link_pericolo: "pagine/PericoliR.html"
    },
    {
        nome: "Gin",
        modello: "video/BOMBAY_SAPPHIRE_GIN_PROMO_VIDEO_by_Jamie_Bulman_Media_2160P.mp4",
        link_storia: "pagine/StoriaG.html",
        link_chimica: "pagine/processiG.html",
        link_pericolo: "pagine/PericoloG.html"
    }
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    generaListaNomi(); // Crea la lista a sinistra all'avvio
    aggiornaUI();
});

// 1. Crea dinamicamente i pulsanti nella sidebar
function generaListaNomi() {
    const container = document.getElementById('bottle-list');
    if (!container) return;

    container.innerHTML = ''; 

    bottiglie.forEach((b, index) => {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.innerText = b.nome;
        btn.onclick = () => vaiABottiglia(index);
        container.appendChild(btn);
    });
}

// 2. Aggiorna tutto il comparto visivo
function aggiornaUI() {
    const b = bottiglie[currentIndex];
    const videoElement = document.getElementById('bg-video');
    const videoSource = document.getElementById('video-source');
    const nameDisplay = document.getElementById('bottle-name');
    
    // 1. Aggiorna lo sfondo Video
    if (videoSource && videoElement) {
        // Cambiamo la sorgente del video
        // Se nel tuo array l'indirizzo del video è sotto la voce 'modello', usiamo b.modello
        videoSource.setAttribute('src', b.modello); 
        
        // È necessario chiamare .load() per far sì che il browser carichi il nuovo file
        videoElement.load();
        
        // Facciamo ripartire il video
        videoElement.play().catch(error => {
            console.log("Autoplay bloccato o errore nel caricamento:", error);
        });
    }
    
    // 2. Aggiorna Titolo Centrale
    if (nameDisplay) {
        nameDisplay.innerText = b.nome;
    }

    // 3. Aggiorna quale nome è "Attivo" nella sidebar
    document.querySelectorAll('.nav-item').forEach((item, i) => {
        if (i === currentIndex) {
            item.classList.add('active');
            // Scroll fluido se la lista è lunga
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

// 3. Funzioni di navigazione
function cambiaBottiglia(direzione) {
    currentIndex = (currentIndex + direzione + bottiglie.length) % bottiglie.length;
    aggiornaUI();
}

function vaiABottiglia(index) {
    currentIndex = index; 
    aggiornaUI();
}

// 4. Gestione Tab/Documentazione
function switchTab(tabName) {
    const b = bottiglie[currentIndex];
    let targetLink = "";

    if (tabName === 'storia') targetLink = b.link_storia;
    else if (tabName === 'chimica') targetLink = b.link_chimica;
    else if (tabName === 'pericolo') targetLink = b.link_pericolo;

    if (targetLink && targetLink !== "#") {
        window.location.href = targetLink;
    } else {
        console.error("Documentazione non disponibile per " + b.nome);
    }
}