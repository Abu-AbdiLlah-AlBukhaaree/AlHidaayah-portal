const modal = document.getElementById('modal');

window.addEventListener('load', () => {
  modal.style.display = 'flex';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
