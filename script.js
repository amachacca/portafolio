/* ──────────────────────────────────────────────────
    ELEMENTOS DEL DOM
    ────────────────────────────────────────────────── */
const html          = document.documentElement;
const sidebar       = document.getElementById('sidebar');
const main          = document.getElementById('main');
const overlay       = document.getElementById('overlay');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle   = document.getElementById('themeToggle');
const hamburgerBtn  = document.getElementById('hamburgerBtn');
const mobileNav     = document.getElementById('mobileNav');
const isMobile      = () => window.innerWidth <= 768;

/* ──────────────────────────────────────────────────
    TEMA CLARO / OSCURO
    Icono y etiqueta del botón se actualizan aquí
    ────────────────────────────────────────────────── */
const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
const sunSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(theme) {
html.setAttribute('data-theme', theme);
localStorage.setItem('portfolio-theme', theme);
if (theme === 'dark') {
    themeToggle.innerHTML = sunSVG + '<span>Claro</span>';
} else {
    themeToggle.innerHTML = moonSVG + '<span>Oscuro</span>';
}
}

// Cargar tema guardado o usar oscuro por defecto
applyTheme(localStorage.getItem('portfolio-theme') || 'dark');

themeToggle.addEventListener('click', () => {
applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ──────────────────────────────────────────────────
    SIDEBAR — Toggle abrir/cerrar
    ────────────────────────────────────────────────── */
function openSidebar() {
if (isMobile()) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
} else {
    sidebar.classList.remove('hidden');
    main.classList.remove('expanded');
}
}

function closeSidebar() {
if (isMobile()) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
} else {
    sidebar.classList.add('hidden');
    main.classList.add('expanded');
}
}

function sidebarIsOpen() {
return isMobile()
    ? sidebar.classList.contains('open')
    : !sidebar.classList.contains('hidden');
}

sidebarToggle.addEventListener('click', () => {
sidebarIsOpen() ? closeSidebar() : openSidebar();
});

overlay.addEventListener('click', () => {
closeSidebar();
closeHamburger();
});

window.addEventListener('resize', () => {
if (!isMobile()) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    closeHamburger();
}
});

/* ──────────────────────────────────────────────────
    MENÚ HAMBURGER (móvil)
    ────────────────────────────────────────────────── */
function closeHamburger() {
hamburgerBtn.classList.remove('open');
mobileNav.classList.remove('open');
hamburgerBtn.setAttribute('aria-expanded', 'false');
overlay.classList.remove('active');
}

hamburgerBtn.addEventListener('click', () => {
const isOpen = mobileNav.classList.contains('open');
if (isOpen) {
    closeHamburger();
} else {
    hamburgerBtn.classList.add('open');
    mobileNav.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
}
});

// Cerrar menú móvil al hacer click en un link
mobileNav.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', closeHamburger);
});

/* ──────────────────────────────────────────────────
    SCROLL-SPY — Resaltar item activo del menú
    ────────────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links .nav-link, .mobile-nav .nav-link');

function updateActiveNav() {
const scrollY = window.scrollY + 100;
let current = '';

sections.forEach(sec => {
    if (sec.offsetTop <= scrollY) current = sec.id;
});

navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
    link.classList.add('active');
    }
});
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ──────────────────────────────────────────────────
    BARRAS DE HABILIDADES — Animación al hacer scroll
    ────────────────────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
skillFills.forEach(fill => {
    fill.style.width = fill.dataset.level + '%';
});
};

if ('IntersectionObserver' in window) {
const skillObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
    animateSkills();
    skillObserver.disconnect();
    }
}, { threshold: 0.15 });
const firstSkill = document.querySelector('.skill-item');
if (firstSkill) skillObserver.observe(firstSkill);
} else {
animateSkills();
}

/* ──────────────────────────────────────────────────
    FORMULARIO DE CONTACTO — Demo handler
    Reemplaza con Formspree, Netlify Forms, o tu endpoint
    ────────────────────────────────────────────────── */
function handleFormSubmit(e) {
e.preventDefault();
const btn = document.getElementById('formSubmitBtn');
btn.textContent = '✓ Mensaje enviado';
btn.style.opacity = '0.7';
btn.disabled = true;
setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.opacity = '';
    btn.disabled = false;
    e.target.reset();
}, 3000);
}




/* ──────────────────────────────────────────────────
    REEMPLAZA EL MANEJADOR DE FORMULARIO CON EMAILJS
    Asegúrate de configurar tu servicio, plantilla y clave pública en EmailJS
    ────────────────────────────────────────────────── */

// // iniciar EmailJS
// (function(){
//   emailjs.init("wu0L31nsaUbkoCzlV");
// })();

const form = document.getElementById("contact-form");
const btn = document.getElementById("formSubmitBtn");

form.addEventListener("submit", function(event){

    event.preventDefault();

    btn.textContent = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_w3orscm";

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {

    btn.textContent = "Enviar mensaje";

    alert("Mensaje enviado correctamente");

    form.reset();

    })
    .catch((error) => {

        btn.textContent = "Enviar mensaje";

        alert("Error al enviar mensaje");

        console.log(error);

    });

});