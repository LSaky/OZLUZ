const pages = [
  { id: 'inicio', label: 'Inicio', href: 'index.html', terms: 'personaliza representa productos únicos camisetas estampados calidad premium' },
  { id: 'personalizaciones', label: 'Personalizaciones', href: 'personalizaciones.html', terms: 'diseña prenda personalizar camiseta buso hoodie accesorio talla color producción' },
  { id: 'colecciones', label: 'Colecciones', href: 'colecciones.html', terms: 'camisetas busos hoodies accesorios tote bags gorras termos llaveros diseños' },
  { id: 'nosotros', label: 'Nosotros', href: 'nosotros.html', terms: 'nuestra esencia exclusividad libertad expresión autenticidad vestuario' },
  { id: 'cotizacion', label: 'Cotización', href: 'cotizacion.html', terms: 'precios tarifas vectorización estampado bordado envíos condiciones comerciales' },
  { id: 'contactanos', label: 'Contáctanos', href: 'contactanos.html', terms: 'whatsapp correo electrónico instagram facebook horario bogotá' },
  { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes', href: 'preguntas-frecuentes.html', terms: 'tiempo entrega pedido mínimo prendas diseño' },
];

const currentPage = document.body.dataset.page || 'inicio';
const header = document.querySelector('[data-site-header]');
const navLinks = pages.map((page) => `<a href="${page.href}"${page.id === currentPage ? ' aria-current="page"' : ''}>${page.label}</a>`).join('');

header.innerHTML = `
  <div class="header-inner">
    <button class="icon-button menu-button" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
    <a class="wordmark" href="index.html" aria-label="OSLUZ, inicio">OSLUZ</a>
    <nav class="site-nav" id="site-nav" aria-label="Navegación principal">${navLinks}</nav>
    <button class="icon-button search-button" type="button" aria-label="Abrir búsqueda" aria-expanded="false" aria-controls="site-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"></circle><path d="m16 16 5 5"></path></svg></button>
  </div>
  <form class="site-search" id="site-search" role="search" hidden><label class="visually-hidden" for="site-search-input">Buscar en OSLUZ</label><input id="site-search-input" type="search" placeholder="Buscar en OSLUZ"><button type="submit">Buscar</button><div class="search-results" aria-live="polite"></div></form>`;

const menuButton = header.querySelector('.menu-button');
const nav = header.querySelector('.site-nav');
const searchButton = header.querySelector('.search-button');
const searchForm = header.querySelector('.site-search');
const searchResults = header.querySelector('.search-results');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  nav.classList.toggle('is-open', !expanded);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));

searchButton.addEventListener('click', () => {
  const expanded = searchButton.getAttribute('aria-expanded') === 'true';
  searchButton.setAttribute('aria-expanded', String(!expanded));
  searchButton.setAttribute('aria-label', expanded ? 'Abrir búsqueda' : 'Cerrar búsqueda');
  searchForm.hidden = expanded;
  if (!expanded) searchForm.querySelector('input').focus();
});
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchForm.querySelector('input').value.trim().toLocaleLowerCase('es');
  const matches = pages.filter((page) => `${page.label} ${page.terms}`.toLocaleLowerCase('es').includes(query));
  searchResults.innerHTML = query
    ? (matches.length ? matches.map((page) => `<a href="${page.href}">${page.label}</a>`).join('') : '<span>No se encontraron resultados.</span>')
    : '<span>Escribe un término para buscar.</span>';
});

const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const contactMarkup = `<a class="whatsapp-tile" href="https://wa.link/mg7ycv" target="_blank" rel="noopener noreferrer" aria-label="Escribir a OSLUZ por WhatsApp"><img src="assets/whatsapp-icon.png" alt="WhatsApp" loading="lazy"></a><a class="qr-tile" href="https://wa.link/mg7ycv" target="_blank" rel="noopener noreferrer" aria-label="Abrir enlace de WhatsApp del código QR"><img src="assets/whatsapp-qr.png" alt="Código QR de WhatsApp de OSLUZ" loading="lazy"></a>`;
document.querySelectorAll('[data-contact-links]').forEach((target) => { target.innerHTML = contactMarkup; });

document.querySelectorAll('.faq-row button').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

const info = document.createElement('button');
info.className = 'site-info';
info.type = 'button';
info.setAttribute('aria-label', 'Información del sitio');
info.innerHTML = '<span aria-hidden="true">i</span><span class="site-info-label">Sitio OSLUZ</span>';
info.addEventListener('click', () => info.classList.toggle('is-open'));
document.body.append(info);
