// El menú de navegación se oculta al bajar y reaparece al subir
let ultimoScroll = 0;
const barraMenu = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const actual = window.scrollY;
  if (actual > ultimoScroll && actual > 80) {
    barraMenu.style.transform = 'translateY(-100%)';
  } else {
    barraMenu.style.transform = 'translateY(0)';
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
