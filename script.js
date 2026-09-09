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
