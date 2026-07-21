const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasAlpineBindings = document.querySelector('[x-data], [x-show], [x-bind], [x-for]') !== null;

if (!prefersReducedMotion) {
    import('/src/js/custom-cursor.js');
}

if (!prefersReducedMotion && window.innerWidth >= 768) {
    import('/src/js/bg-flowers.js');
}

if (hasAlpineBindings) {
    import('alpinejs').then(({ default: Alpine }) => {
        window.Alpine = Alpine;
        Alpine.start();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const logoBg = document.getElementById('logo-bg');
    const logoTop = document.getElementById('logo-top');
    
    if (!header || !logoBg || !logoTop) return;

    const sections = document.querySelectorAll('[data-header-bg]');

    const observerOptions = {
        root: null,
        rootMargin: '-112px 0px -80% 0px', 
        threshold: 0
    };

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Zodra een sectie de header-grens passeert
            if (entry.isIntersecting) {
                const targetHeaderColor = entry.target.getAttribute('data-header-bg');
                
                header.classList.remove('bg-brand-cream', 'bg-brand-rose-solid');
                logoBg.classList.remove('bg-brand-cream', 'bg-brand-rose-solid');
                logoTop.classList.remove('bg-brand-cream', 'bg-brand-rose-solid');
                
                header.classList.add(targetHeaderColor);
                logoBg.classList.add(targetHeaderColor);
                logoTop.classList.add(targetHeaderColor);
            }
        });
    }, observerOptions);

    sections.forEach(section => headerObserver.observe(section));
});

document.addEventListener('DOMContentLoaded', () => {
  const checkNav = setInterval(() => {
    const links = document.querySelectorAll('nav a');
    if (links.length === 0) return;
    
    clearInterval(checkNav);
    
    const currentPath = window.location.pathname.replace(/\/$/, ''); // Haal eventuele trailing slash weg

    links.forEach(link => {
      const linkPath = link.getAttribute('href');
      const underline = link.querySelector('span');

      // Schoon de linkPath op (haal .html en ./ weg voor de vergelijking)
      const cleanLinkPath = linkPath.replace(/^\.\//, '').replace(/\.html$/, '');
      const cleanCurrentPath = currentPath.replace(/\.html$/, '');

      // Check of we op home zijn
      const isCurrentPageHome = cleanCurrentPath === '' || cleanCurrentPath.endsWith('/Alanas-hair-boutique') || cleanCurrentPath.endsWith('/index');
      const isLinkHome = cleanLinkPath === '' || cleanLinkPath === '/' || cleanLinkPath === 'index';

      // Match check
      const isMatch = (isCurrentPageHome && isLinkHome) || (!isLinkHome && cleanCurrentPath.endsWith('/' + cleanLinkPath));

      if (isMatch) {
        link.classList.remove('text-brand-bronze/60');
        link.classList.add('text-brand-bronze');
        
        if (underline) {
          underline.classList.remove('w-0', 'group-hover:w-full');
          underline.classList.add('w-full');
        }
      } else {
        link.classList.remove('text-brand-bronze');
        link.classList.add('text-brand-bronze/60');
        
        if (underline) {
          underline.classList.remove('w-full');
          underline.classList.add('w-0', 'group-hover:w-full');
        }
      }
    });
  }, 50);
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35 // Het element animeert als 35% in beeld is
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Voeg de zichtbaarheidsklasse toe
                entry.target.classList.add('is-visible');
                // Stop met observeren zodat de animatie maar één keer afspeelt (geeft rust)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Zoek alle elementen met de klasse 'editorial-fade'
    const fadeElements = document.querySelectorAll('.editorial-fade');
    fadeElements.forEach(el => scrollObserver.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    // Enkel uitvoeren op mobiel (kleiner dan 768px)
    if (window.innerWidth < 768) {
        const observerOptions = { threshold: 0.35 };

        const hoverObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Voeg de highlight klasse toe voor het effect
                    el.classList.add('is-mobile-hover');
                    
                    // Verwijder het effect na 3 seconden
                    setTimeout(() => {
                        el.classList.remove('is-mobile-hover');
                    }, 3000);

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.editorial-fade').forEach(el => hoverObserver.observe(el));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    const headerHeight = 160; 

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Voorkom de standaard harde browser-sprong

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Bereken de exacte positie van het element min de header-hoogte
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // Forceer een vloeiende scroll naar de juiste positie
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update de URL subtiel zonder de pagina te verspringen
                history.pushState(null, null, targetId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // We selecteren zowel de submenu links (.nav-item) als eventuele externe preview links
    const navLinks = document.querySelectorAll('.nav-item, a[href*="/services#"]');
    
    // De opgetelde hoogte van HOOFDHEADER + SUBMENU zodat de titels perfect vrijkomen
    const totalStickyHeight = 220; 

    // HULPFUNCTIE: Berekent de perfecte scrollpositie en voert de smooth scroll uit
    const scrollToTarget = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Geef de browser heel even de tijd om lay-out/sticky hoogtes te berekenen
            setTimeout(() => {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - totalStickyHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 50);
        }
    };

    // 1. AFHANDELING BIJ BINNENKOMST VANAF DE HOMEPAGE (Deep-linking)
    // Als de URL eindigt op bijvoorbeeld #kleuring, voeren we direct de gecorrigeerde scroll uit
    if (window.location.hash) {
        scrollToTarget(window.location.hash);
    }

    // 2. SMOOTH SCROLL LOGICA BINNEN DE PAGINA
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Controleer of de link naar een anker op deze pagina verwijst (# of /services#)
            if (href.includes('#')) {
                const targetId = href.substring(href.indexOf('#'));
                const targetElement = document.querySelector(targetId);

                // Als het element op deze pagina bestaat, voorkomen we de standaard sprong
                if (targetElement) {
                    e.preventDefault();
                    scrollToTarget(targetId);
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 3. ACTIVE STATE LOGICA BIJ SCROLLEN (Alleen uitvoeren als de secties bestaan)
    const sections = document.querySelectorAll('#brushing, #snit, #kleuring, #balayage, #extras');
    
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: `-${totalStickyHeight}px 0px -50% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Reset alle actieve statussen
                    navLinks.forEach(link => {
                        link.classList.remove('text-brand-bronze');
                        const line = link.querySelector('.nav-line');
                        if (line) line.classList.remove('w-full');
                    });
                    
                    // Activeer de juiste link (zoekt zowel op "#id" als "/services#id")
                    const activeLinks = document.querySelectorAll(`.nav-item[href="#${id}"], .nav-item[href="/services#${id}"]`);
                    activeLinks.forEach(activeLink => {
                        activeLink.classList.add('text-brand-bronze');
                        const activeLine = activeLink.querySelector('.nav-line');
                        if (activeLine) activeLine.classList.add('w-full');
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});
const stickyNav = document.querySelector('#sticky-services-nav');

if (stickyNav) {
    const stickyObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.intersectionRatio < 1) {
                stickyNav.classList.add('is-pinned', 'bg-brand-cream/85', 'backdrop-blur-md', 'shadow-sm');
            } else {
                stickyNav.classList.remove('is-pinned', 'bg-brand-cream/85', 'backdrop-blur-md', 'shadow-sm');
            }
        },
        { 
            threshold: [1],
            rootMargin: '-101px 0px 0px 0px' 
        }
    );

    stickyObserver.observe(stickyNav);
}
document.addEventListener("DOMContentLoaded", () => {
    // Zoek alle CTA secties
    document.querySelectorAll('.cta-section').forEach(section => {
        const titleEl = section.querySelector('#cta-title');
        
        const customText = section.getAttribute('data-tekst') || 
                           "Klaar voor jouw moment van <em>rust</em>?";
        
        titleEl.innerHTML = customText;
    });
});