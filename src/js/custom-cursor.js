const initCustomCursor = () => {

  const hasRealMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasRealMouse) return;

  const body = document.body;
  if (!body) return;

  // 1. Maak de custom cursor div aan en voeg hem toe aan de body
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  body.appendChild(cursor);

  // 2. Laat de schaar de muispositie volgen
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // 3. Muis ingedrukt -> Schaar knipt dicht (voeg klasse toe)
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });

  // 4. Muis losgelaten -> Schaar gaat weer open (verwijder klasse)
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });

  // 5. Zorg dat de cursor onzichtbaar wordt als je het scherm verlaat
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor, { once: true });
} else {
  initCustomCursor();
}