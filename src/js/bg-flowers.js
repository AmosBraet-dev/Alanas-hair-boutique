const initBgFlowers = () => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsHover || prefersReducedMotion || window.innerWidth < 768) {
        return;
    }

    const config = {
        defaultImage: '/images/bg-flower.png',
        // Beschikbare assets voor de dynamische verlenging
        pool: [
            '/images/bg-leaf.png',
            '/images/bg-flowerpart.png',
            '/images/bg-flowerpart-2.png'
        ]
    };

    // 1. Je vaste redactionele basiscompositie (voor de eerste zones)
    const flowerPositions = [
        // === ZONE 1: HERO SECTIE ===
        { image: '/images/bg-leaf.png', top: '15vh', left: '20%', width: '80px', rotation: '35', opacity: '0.20' },
        { image: '/images/bg-flowerpart.png', top: '26vh', left: '10%', width: '130px', rotation: '-15', opacity: '0.15' },
        { image: '/images/bg-leaf.png', top: '38vh', left: '35%', width: '70px', rotation: '75', opacity: '0.06' }, 
        { image: '/images/bg-flowerpart-2.png', top: '60vh', right: '22%', width: '110px', rotation: '20', opacity: '0.15' },
        { image: '/images/bg-leaf.png', top: '74vh', right: '12%', width: '90px', rotation: '-60', opacity: '0.2' },
        { image: '/images/bg-flowerpart.png', top: '88vh', left: '18%', width: '120px', rotation: '140', opacity: '0.14' },

        // === ZONE 2: DE OVERGANG ===
        { image: '/images/bg-leaf.png', top: '96vh', left: '28%', width: '90px', rotation: '-40', opacity: '0.20' },
        { image: '/images/bg-flowerpart-2.png', top: '103vh', left: '72%', width: '130px', rotation: '85', opacity: '0.12' },
        { image: '/images/bg-flowerpart.png', top: '116vh', left: '38%', width: '140px', rotation: '15', opacity: '0.15' },
        { image: '/images/bg-leaf.png', top: '123vh', left: '60%', width: '95px', rotation: '-15', opacity: '0.15' },
        { image: '/images/bg-leaf.png', top: '130vh', left: '44%', width: '75px', rotation: '60', opacity: '0.10' },
        { image: '/images/bg-flowerpart.png', top: '137vh', left: '68%', width: '120px', rotation: '110', opacity: '0.2' },
        { image: '/images/bg-flowerpart-2.png', top: '146vh', left: '22%', width: '110px', rotation: '-85', opacity: '0.08' },
        { image: '/images/bg-leaf.png', top: '154vh', left: '76%', width: '80px', rotation: '45', opacity: '0.16' },

        // === ZONE 3: REVIEW / MIDDEN SECTIE ===
        { image: '/images/bg-flower.png', top: '165vh', left: '-100px', width: '420px', rotation: '60', opacity: '0.15' },
        { image: '/images/bg-leaf.png', top: '173vh', left: '25%', width: '90px', rotation: '125', opacity: '0.18' },
        { image: '/images/bg-flowerpart.png', top: '182vh', left: '14%', width: '150px', rotation: '-30', opacity: '0.13' },
        { image: '/images/bg-leaf.png', top: '191vh', left: '30%', width: '75px', rotation: '15', opacity: '0.16' },
        { image: '/images/bg-flowerpart-2.png', top: '200vh', left: '16%', width: '130px', rotation: '95', opacity: '0.18' },
        { image: '/images/bg-leaf.png', top: '209vh', right: '28%', width: '100px', rotation: '-75', opacity: '0.18' },
        { image: '/images/bg-flower.png', top: '218vh', right: '-160px', width: '550px', rotation: '165', opacity: '0.20' },
        { image: '/images/bg-flowerpart.png', top: '228vh', right: '15%', width: '140px', rotation: '40', opacity: '0.13' },
        { image: '/images/bg-leaf.png', top: '238vh', right: '32%', width: '80px', rotation: '150', opacity: '0.16' },
        { image: '/images/bg-flowerpart-2.png', top: '248vh', right: '45%', width: '120px', rotation: '-10', opacity: '0.18' }
    ];

    // 2. Bereken de totale hoogte van de pagina in pixels én in Viewport Height (vh)
    const bodyHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.clientHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight
    );
    
    const viewportHeight = window.innerHeight;
    const totalPageInVh = Math.ceil(bodyHeight / viewportHeight);

    // 3. AUTOMATISCHE VERLENGING: Als de pagina langer is dan 250vh (zoals de NAK pagina), vul hem aan!
    let currentVh = 265; // We starten met genereren net na je vaste opzet
    const step = 20;     // Om de hoeveel vh mag er gemiddeld een nieuw blaadje vallen (behoudt ademruimte)

    while (currentVh < (totalPageInVh * 100) - 15) {
        // Wissel links en rechts organisch af
        const side = Math.random() > 0.5 ? 'left' : 'right';
        // Geef het een natuurlijke afwijking van de rand (tussen 10% en 38%)
        const percentagePosition = Math.floor(Math.random() * 28) + 10;
        
        // Kies een willekeurige asset uit de pool (blaadjes en bloemstukjes)
        const randomAsset = config.pool[Math.floor(Math.random() * config.pool.length)];
        // Willekeurige subtiele rotatie en grootte
        const randomWidth = Math.floor(Math.random() * 70) + 75; // Tussen 75px en 145px
        const randomRotation = Math.floor(Math.random() * 360);
        const randomOpacity = (Math.random() * (0.20 - 0.08) + 0.08).toFixed(2); // Subtiel tussen 0.08 en 0.20

        const dynamicDecoration = {
            image: randomAsset,
            top: `${currentVh}vh`,
            width: `${randomWidth}px`,
            rotation: String(randomRotation),
            opacity: randomOpacity
        };

        if (side === 'left') {
            dynamicDecoration.left = `${percentagePosition}%`;
        } else {
            dynamicDecoration.right = `${percentagePosition}%`;
        }

        flowerPositions.push(dynamicDecoration);
        
        // Voeg de stap toe + een klein beetje willekeurige variatie zodat het ritme organisch blijft
        currentVh += step + Math.floor(Math.random() * 15);
    }

    // 4. Grote afsluiter onderaan de pagina (Indien de pagina héél lang is, plaatsen we aan het einde een grote sfeermaker)
    if (totalPageInVh > 3) {
        flowerPositions.push({
            image: '/images/bg-flower.png',
            top: `${(totalPageInVh * 100) - 30}vh`,
            right: '-120px',
            width: '480px',
            rotation: '210',
            opacity: '0.15'
        });
    }

    // 5. Maak de onzichtbare achtergrondlaag aan
    const flowerContainer = document.createElement('div');
    flowerContainer.style.position = 'absolute';
    flowerContainer.style.top = '0';
    flowerContainer.style.left = '0';
    flowerContainer.style.width = '100%';
    flowerContainer.style.height = `${bodyHeight}px`;
    flowerContainer.style.overflow = 'hidden';
    flowerContainer.style.pointerEvents = 'none';
    flowerContainer.style.zIndex = '1';
    
    document.body.style.position = 'relative';

    // 6. Bouw alle elementen op in de DOM
    flowerPositions.forEach(pos => {
        const flower = document.createElement('img');
        
        flower.src = pos.image ? pos.image : config.defaultImage;
        flower.alt = '';
        flower.style.position = 'absolute';
        flower.style.pointerEvents = 'none';
        flower.style.userSelect = 'none';
        
        flower.style.width = pos.width;
        flower.style.height = 'auto';
        flower.style.opacity = pos.opacity;
        flower.style.top = pos.top;

        if (pos.transform) {
            flower.style.transform = `${pos.transform} rotate(${pos.rotation}deg)`;
        } else {
            flower.style.transform = `rotate(${pos.rotation}deg)`;
        }

        if (pos.left) flower.style.left = pos.left;
        if (pos.right) flower.style.right = pos.right;

        flowerContainer.appendChild(flower);
    });

    document.body.appendChild(flowerContainer);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBgFlowers, { once: true });
} else {
    initBgFlowers();
}