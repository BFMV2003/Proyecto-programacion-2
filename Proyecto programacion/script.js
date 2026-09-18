const pesoTierra = document.querySelector('fieldset input');
const tituloPlaneta = document.querySelector('figcaption');
const pesoResultado = document.querySelector('.resultado h1');
const botones = document.querySelectorAll('.planeta');
const planetaGrande = document.querySelector('.planeta-grande');
const subPeso = document.querySelector('.resultado p');
const gravedades = {
    MARTE: { g: 3.71, factor: 0.38, color1: '#ff8c4a', color2: '#a33a10', brillo: '#ff6a2a66' },
    JUPITER: { g: 24.79, factor: 2.53, color1: '#e8c39a', color2: '#7a4a24', brillo: '#e8c39a88' },
    VENUS: { g: 8.87, factor: 0.91, color1: '#f5e6c8', color2: '#8a7a5a', brillo: '#f5e6c888' },
    LUNA: { g: 1.62, factor: 0.17, color1: '#d0d0d0', color2: '#6a6a6a', brillo: '#ffffff66' }
  };

  let planetaActual = 'MARTE';

  function actualizar() {
    let peso = parseFloat(pesoTierra.value) || 0;
    let datos = gravedades[planetaActual];
    let nuevoPeso = (peso * datos.factor).toFixed(1);
    let diferencia = (nuevoPeso - peso).toFixed(1);

    tituloPlaneta.textContent = planetaActual;
    
    pesoResultado.innerHTML = `${nuevoPeso} <span>kg</span>`;
    document.getElementById('g-valor').textContent = datos.g + ' m/s²';
    document.getElementById('dif-valor').textContent = diferencia + ' kg';

    planetaGrande.style.background = `radial-gradient(circle at 30% 30%, ${datos.color1}, ${datos.color2})`;
    planetaGrande.style.boxShadow = `0 0 40px ${datos.brillo}`;
  }

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      planetaActual = btn.textContent.split(' ')[0];
      actualizar();
    });
  });

  pesoTierra.addEventListener('input', actualizar);
  actualizar();