// El menú de navegación se oculta al bajar y reaparece al subir.
// La misma comparación de scrollY se reutiliza más abajo para saber en qué
// dirección va el usuario cuando una tarjeta de servicio entra en pantalla.
let ultimoScroll = 0;
let direccionScroll = 'bajando';
const barraMenu = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const actual = window.scrollY;
  if (actual > ultimoScroll && actual > 80) {
    barraMenu.style.transform = 'translateY(-100%)';
  } else {
    barraMenu.style.transform = 'translateY(0)';
  }
  if (actual !== ultimoScroll) {
    direccionScroll = actual > ultimoScroll ? 'bajando' : 'subiendo';
  }
  ultimoScroll = actual;
});

// Las tarjetas de servicios crecen ligeramente al acercarse al centro de la pantalla
const filasServicios = document.querySelectorAll('.servicio-card');

function actualizarEscalaServicios() {
  const centroVentana = window.innerHeight / 2;
  filasServicios.forEach((fila) => {
    const rect = fila.getBoundingClientRect();
    const centroFila = rect.top + rect.height / 2;
    const distancia = Math.abs(centroVentana - centroFila);
    const proporcion = Math.max(0, 1 - distancia / centroVentana);
    const escala = 0.94 + (proporcion * 0.09);
    fila.style.setProperty('--escala-scroll', escala);
  });
}

window.addEventListener('scroll', actualizarEscalaServicios);
window.addEventListener('resize', actualizarEscalaServicios);
actualizarEscalaServicios();

// Animación en cascada de las tarjetas de Servicios: cada tarjeta anima por
// separado al entrar en pantalla (no toda la sección de golpe), con una
// animación distinta según si el usuario está bajando o subiendo, y se
// repite cada vez que vuelve a entrar (a diferencia del resto de la web,
// donde el fade-in de scroll pasa solo una vez). direccionScroll ya se
// mantiene actualizado más arriba, junto al ocultado del navbar.
const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefiereMenosMovimiento && 'IntersectionObserver' in window) {
  filasServicios.forEach((tarjeta) => tarjeta.classList.add('servicio-card--animable'));

  const observerServicios = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      const tarjeta = entrada.target;
      if (entrada.isIntersecting) {
        // Fija el lado desde el que entra ANTES de mostrarla: si no se
        // fuerza el reflow (offsetWidth) entre fijar --offset-y y añadir
        // "visible", el navegador puede fusionar ambos cambios en un solo
        // repintado y la transición no llega a animarse.
        tarjeta.classList.remove('visible');
        tarjeta.style.setProperty('--offset-y', direccionScroll === 'bajando' ? '28px' : '-28px');
        void tarjeta.offsetWidth;
        requestAnimationFrame(() => tarjeta.classList.add('visible'));
      } else {
        tarjeta.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });

  filasServicios.forEach((tarjeta) => observerServicios.observe(tarjeta));
}
