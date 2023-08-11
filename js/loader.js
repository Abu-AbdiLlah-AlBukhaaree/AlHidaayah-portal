window.addEventListener('load', function () {
  const loaderWrapper = document.querySelector('.loader-wrapper');

  // loaderWrapper.style.opacity = 0; // Hide the loader
  loaderWrapper.classList.add('loaded'); // Show the content with fade-in effect
});
