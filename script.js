// Las maquinillas del hero se desvanecen, se acercan hacia el centro
// y se inclinan levemente hacia ese lado a medida que se hace scroll
const hero = document.querySelector('.hero');
const heroClipperIzq = document.querySelector('.hero-clipper--izq');
const heroClipperDer = document.querySelector('.hero-clipper--der');

const AMPLITUD_ADENTRO = 50; // px que se acercan hacia el centro
const INCLINACION_MAX = 60; // grados de inclinación al moverse
const VELOCIDAD = 1.5; // completa el movimiento antes de que el hero termine de salir

function actualizarOpacidadHero() {
  const rect = hero.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, rect.bottom / rect.height));
  const progreso = Math.min(1, (1 - ratio) * VELOCIDAD); // 0 al inicio, 1 al completar el giro

  heroClipperIzq.style.opacity = ratio;
  heroClipperIzq.style.transform = `translateY(-50%) translateX(${progreso * AMPLITUD_ADENTRO}px) rotate(${progreso * INCLINACION_MAX}deg)`;

  heroClipperDer.style.opacity = ratio;
  heroClipperDer.style.transform = `translateY(-50%) translateX(${-progreso * AMPLITUD_ADENTRO}px) rotate(${-progreso * INCLINACION_MAX}deg)`;
}

window.addEventListener('scroll', actualizarOpacidadHero);
actualizarOpacidadHero();
