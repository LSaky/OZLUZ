const pages = [
  { id: 'inicio', label: 'Inicio', href: 'index.html', terms: 'personaliza representa productos únicos camisetas estampados calidad premium hoodie buso' },
  { id: 'personalizaciones', label: 'Personaliza', href: 'personalizaciones.html', terms: 'diseña prenda personalizar camiseta buso hoodie accesorio talla color producción cotizar' },
  { id: 'colecciones', label: 'Colecciones', href: 'colecciones.html', terms: 'camisetas busos hoodies accesorios tote bags gorras termos llaveros diseños catálogo' },
  { id: 'nosotros', label: 'Nosotros', href: 'nosotros.html', terms: 'nuestra esencia exclusividad libertad expresión autenticidad vestuario' },
  { id: 'cotizacion', label: 'Cotización', href: 'cotizacion.html', terms: 'precios tarifas vectorización estampado bordado envíos condiciones comerciales' },
  { id: 'contactanos', label: 'Contáctanos', href: 'contactanos.html', terms: 'whatsapp correo electrónico instagram facebook horario bogotá' },
  { id: 'preguntas-frecuentes', label: 'Preguntas frecuentes', href: 'preguntas-frecuentes.html', terms: 'tiempo entrega pedido mínimo prendas diseño' },
];

const currentPage = document.body.dataset.page || 'inicio';
const heroTitle = document.querySelector('.hero-home h1');
if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroTitle.setAttribute('aria-label', 'Tu idea, hecha prenda.');
  heroTitle.querySelectorAll('.hero-title-line').forEach((line) => {
    line.setAttribute('aria-hidden', 'true');
    const letters = Array.from(line.textContent);
    line.replaceChildren(...letters.map((character, index) => {
      const letter = document.createElement('span');
      letter.className = 'hero-letter';
      letter.style.setProperty('--letter-index', index);
      letter.textContent = character === ' ' ? '\u00a0' : character;
      return letter;
    }));
  });
}
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

const whatsappUrl = (message) => `https://wa.me/573138070645?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-whatsapp-message]').forEach((link) => {
  link.href = whatsappUrl(link.dataset.whatsappMessage);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(quoteForm);
  const message = [
    'Hola OSLUZ, quiero cotizar un producto personalizado.',
    `Producto: ${formData.get('producto')}`,
    `Técnica: ${formData.get('tecnica')}`,
    `Cantidad: ${formData.get('cantidad')}`,
    `Ciudad: ${formData.get('ciudad') || 'Por confirmar'}`,
    '¿Me ayudan con las opciones y el valor final?'
  ].join('\n');
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('.gallery-filters [data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.gallery-filters [data-filter]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.design-item[data-category]').forEach((card) => {
      card.hidden = filter !== 'todos' && card.dataset.category !== filter;
    });
  });
});

const floatingWhatsapp = document.createElement('a');
floatingWhatsapp.className = 'whatsapp-float';
floatingWhatsapp.href = whatsappUrl('Hola OSLUZ, quiero recibir asesoría para personalizar un producto.');
floatingWhatsapp.target = '_blank';
floatingWhatsapp.rel = 'noopener noreferrer';
floatingWhatsapp.setAttribute('aria-label', 'Hablar con OSLUZ por WhatsApp');
floatingWhatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12 12 0 0 0-10.2 18.3L4.2 28l6.5-1.7A12 12 0 1 0 16 3.5Z"/><path d="M12 10.3c.4-.4 1-.3 1.3.2l1.5 2.4c.3.5.2.9-.2 1.3l-.8.8c.8 1.7 2.1 3 3.8 3.8l.8-.8c.4-.4.8-.5 1.3-.2l2.4 1.4c.5.3.6.9.2 1.3-.7 1-1.7 1.5-2.9 1.5-2.1 0-4.6-1.4-6.6-3.4s-3.4-4.5-3.4-6.6c0-.7.7-1.4 1.6-1.7Z"/></svg><span>Escríbenos</span>';
document.body.append(floatingWhatsapp);

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
