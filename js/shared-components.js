// Select the header and footer elements to be used in the includeNavbar and includeFooter functions
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Function to include the shared navbar HTML
function includeNavbar() {
  // Create an XMLHttpRequest to make an Ajax request for the navbar content
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../includes/navbar.html', true);
  xhr.onreadystatechange = function () {
    // Check if the request is completed successfully
    if (xhr.readyState === 4 && xhr.status === 200) {
      header.innerHTML = xhr.responseText; // Insert the received HTML content into the header element

      handleOtherNavbarFunctionalities(); // Call a function to handle other functionalities related to the navbar
    }
  };
  xhr.send(); // Send the Ajax request to fetch the navbar content
}

// Function to include the shared footer HTML
function includeFooter() {
  // Create an XMLHttpRequest to make an Ajax request for the footer content
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../includes/footer.html', true);
  xhr.onreadystatechange = function () {
    // Check if the request is completed successfully
    if (xhr.readyState === 4 && xhr.status === 200) {
      footer.innerHTML = xhr.responseText; // Insert the received HTML content into the footer element

      displayYear(); // Call a function to display the current year in the footer
    }
  };
  xhr.send(); // Send the Ajax request to fetch the footer content
}

// Call the functions to include the navbar and footer on page load
window.onload = function () {
  includeNavbar(); // Include the shared navbar HTML
  includeFooter(); // Include the shared footer HTML
};

// ********* OTHER FUNCTIONALITIES RELATED TO NAVBAR AND FOOTER **********
function handleOtherNavbarFunctionalities() {
  // Select Elements related to the navbar functionality
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
  // Event listener to toggle the navbar on small screens
  navBtn.addEventListener('click', () => {
    // Toggle the display of the navigation links
    navLinks.classList.toggle('show-links');
    if (!isNavbarOpen) {
      openNav.style.display = 'none';
      closeNav.style.display = 'block';

      isNavbarOpen = true;
    } else {
      openNav.style.display = 'block';
      closeNav.style.display = 'none';

      removeAllShowSublevelClasses(); // Call a function to remove the 'show-sublevel' class from sublevel elements

      isNavbarOpen = false;
    }
  });

  // Event listener for individual navigation links with sublevels
  singleNavLink.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (item.nextElementSibling) {
        e.preventDefault();
        // Show the sublevel on small screens
        if (window.innerWidth < 800) {
          item.nextElementSibling.classList.add('show-sublevel');
        }
        // Event listener for the close button on the sublevel
        closeSublevel.forEach((item) => {
          item.addEventListener('click', () => {
            // Close the sublevel when the close button is clicked
            item.parentElement.parentElement.parentElement.classList.remove(
              'show-sublevel'
            );
          });
        });
      }
    });
  });

  // ********** FUNCTIONS ************
  // Function to remove the 'show-sublevel' class from sublevel elements
  function removeAllShowSublevelClasses() {
    sublevels.forEach((item) => {
      item.classList.remove('show-sublevel');
    });
  }
}

// Function to display the current year in the footer
function displayYear() {
  const yearDOM = document.querySelector('.year');
  const year = new Date().getFullYear();
  yearDOM.innerHTML = year;
}
