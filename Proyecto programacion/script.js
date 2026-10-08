// 1. VARIABLES GLOBALES E IDIOMA (SIEMPRE ARRIBA)
let idiomaActual = 'es';
let planetaActual = 'MARTE';

const traducciones = {
  es: {
    menu_calc: "Calculadora",
    menu_planets: "Planetas",
    menu_physics: "Física Gravitacional",
    card_sub: "CALCULADORA GRAVITACIONAL",
    card_title: "Parámetros de Masa",
    label_weight: "Tu peso en la Tierra",
    dest_title: "Destino Gravitacional",
    lbl_gravity: "Gravedad",
    lbl_diff: "Diferencia",
    lbl_sub_weight: "Tu peso en Marte",
    MARTE: "MARTE", JUPITER: "JÚPITER", VENUS: "VENUS", LUNA: "LUNA",
    MERCURIO: "MERCURIO", URANO: "URANO", NEPTUNO: "NEPTUNO", SATURNO: "SATURNO"
  },
  en: {
    menu_calc: "Calculator",
    menu_planets: "Planets",
    menu_physics: "Gravitational Physics",
    card_sub: "GRAVITATIONAL CALCULATOR",
    card_title: "Mass Parameters",
    label_weight: "Your weight on Earth",
    dest_title: "Gravitational Destination",
    lbl_gravity: "Gravity",
    lbl_diff: "Difference",
    lbl_sub_weight: "Your weight on Mars",
    MARTE: "MARS", JUPITER: "JUPITER", VENUS: "VENUS", LUNA: "MOON",
    MERCURIO: "MERCURY", URANO: "URANUS", NEPTUNO: "NEPTUNE", SATURNO: "SATURN"
  }
};

// 2. ELEMENTOS DEL DOM
const pesoTierra = document.querySelector('fieldset input');
const tituloPlaneta = document.querySelector('figcaption');
const pesoResultado = document.getElementById('peso_resultado');

const botones = document.querySelectorAll('.planeta');
const planetaGrande = document.querySelector('.planeta-visual');

const gravedades = {
  MARTE: { g: 3.71, factor: 0.38, color1: '#ff5c4a', color2: '#a33a2d', brillo: '#ff5c4a88' },
  JUPITER: { g: 24.79, factor: 2.53, color1: '#e8c298', color2: '#a78464', brillo: '#e8c29888' },
  VENUS: { g: 8.87, factor: 0.91, color1: '#f5e2bb', color2: '#bda27a', brillo: '#f5e2bb88' },
  LUNA: { g: 1.62, factor: 0.17, color1: '#d8dede', color2: '#6a6a6a', brillo: '#ffffff44' },
  MERCURIO: { g: 3.7, factor: 0.38, color1: '#95a1a6', color2: '#707a7d', brillo: '#a6b5bb88' },
  URANO: { g: 8.87, factor: 0.9, color1: '#aae2e6', color2: '#4b7a8d', brillo: '#aae2e688' },
  NEPTUNO: { g: 11.15, factor: 1.14, color1: '#4f8eff', color2: '#213359', brillo: '#3d6bff88' },
  SATURNO: { g: 10.44, factor: 1.06, color1: '#f4e3b1', color2: '#9c7c4b', brillo: '#fbc88a88' }
};

// 3. FUNCIÓN DE ACTUALIZACIÓN
function actualizar() {
  let peso = parseFloat(pesoTierra.value) || 0;
  let datos = gravedades[planetaActual];
  let nuevoPeso = (peso * datos.factor).toFixed(1);
  let diferencia = (nuevoPeso - peso).toFixed(1);
  
  const nombrePlanetaTraducido = traducciones[idiomaActual][planetaActual] || planetaActual;
  tituloPlaneta.textContent = nombrePlanetaTraducido;

  const elSubTexto = document.querySelector('[data-key="lbl_sub_weight"]');
  if (elSubTexto) {
    elSubTexto.textContent = idiomaActual === 'es' ? `Tu peso en ${nombrePlanetaTraducido}` : `Your weight on ${nombrePlanetaTraducido}`;
  }

  if (pesoResultado) {
    pesoResultado.innerHTML = `${nuevoPeso} <span>kg</span>`;
  }
  
  const gVal = document.getElementById('g_valor');
  const difVal = document.getElementById('dif_valor');
  if (gVal) gVal.textContent = datos.g + ' m/s²';
  if (difVal) difVal.textContent = diferencia + ' kg';

  if (planetaGrande) {
    planetaGrande.style.background = `radial-gradient(circle at 50% 30%, ${datos.color1}, ${datos.color2})`;
    planetaGrande.style.boxShadow = `0 0 40px ${datos.brillo}`;
  }
}

// 4. LOGICA DE TRADUCCIÓN
function cambiarIdioma(lang) {
  idiomaActual = lang;

  const elementos = document.querySelectorAll('[data-key]');
  elementos.forEach(el => {
    const key = el.getAttribute('data-key');
    if (traducciones[lang] && traducciones[lang][key]) {
      el.textContent = traducciones[lang][key];
    }
  });

  const btnEs = document.getElementById('btn-es');
  const btnEn = document.getElementById('btn-en');
  if (btnEs) btnEs.classList.toggle('active', lang === 'es');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  actualizar();
}

// 5. EVENTOS (AL FINAL)
botones.forEach(btn => {
  btn.addEventListener('click', () => {
    botones.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    planetaActual = btn.textContent.trim().split(' ')[0].toUpperCase();
    
    // Quitar tildes para mapear correctamente con el objeto gravedades
    if(planetaActual === "JÚPITER") planetaActual = "JUPITER";
    
    actualizar();
  });
});

pesoTierra.addEventListener('input', actualizar);

document.addEventListener("DOMContentLoaded", () => {
  const btnEs = document.getElementById('btn-es');
  const btnEn = document.getElementById('btn-en');
  if (btnEs) btnEs.addEventListener('click', () => cambiarIdioma('es'));
  if (btnEn) btnEn.addEventListener('click', () => cambiarIdioma('en'));
});

// Arrancar la app
actualizar();

