const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Function to include the shared navbar HTML
function includeNavbar() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../includes/navbar.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      header.innerHTML = xhr.responseText;

      handleOtherNavbarFunctionalities();
    }
  };
  xhr.send();
}

// Function to include the shared footer HTML
function includeFooter() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../includes/footer.html', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      footer.innerHTML = xhr.responseText;

      displayYear();
    }
  };
  xhr.send();
}

// Call the functions to include the navbar and footer on page load
window.onload = function () {
  includeNavbar();
  includeFooter();
};

// ********* OTHER FUNCTIONALITIES RELATED TO NAVBAR AND FOOTER **********
function handleOtherNavbarFunctionalities() {
  // Select Elements
  const navBtn = document.querySelector('.nav-btn');
  const navLinks = document.querySelector('.nav-links');
  const openNav = document.querySelector('.open-nav');
  const closeNav = document.querySelector('.close-nav');
  const singleNavLink = document.querySelectorAll('.single-nav-link');
  const sublevels = document.querySelectorAll('.sublevel');
  const closeSublevel = document.querySelectorAll('.close-sublevel');

  let isNavbarOpen = false;
  let isSubleveOpen = false;

  // ********* EVENT LISTENERS *************
  navBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
    if (!isNavbarOpen) {
      openNav.style.display = 'none';
      closeNav.style.display = 'block';

      isNavbarOpen = true;
    } else {
      openNav.style.display = 'block';
      closeNav.style.display = 'none';

      removeAllShowSublevelClasses();

      isNavbarOpen = false;
    }
  });

  singleNavLink.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.nextElementSibling) {
        e.preventDefault();
        if (window.innerWidth < 800) {
          item.nextElementSibling.classList.add('show-sublevel');
        }
        closeSublevel.forEach((item) => {
          item.addEventListener('click', () => {
            item.parentElement.parentElement.parentElement.classList.remove(
              'show-sublevel'
            );
          });
        });
      }
    });
  });

  // ********** FUNCTIONS ************
  function removeAllShowSublevelClasses() {
    sublevels.forEach((item) => {
      item.classList.remove('show-sublevel');
    });
  }
}

function displayYear() {
  const yearDOM = document.querySelector('.year');
  const year = new Date().getFullYear();
  yearDOM.innerHTML = year;
}
