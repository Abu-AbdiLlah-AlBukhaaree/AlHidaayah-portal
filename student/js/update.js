import {
  // variables
  emailPattern,
  phonePattern,
  dobPattern,
  // functions
  clearErrorMessages,
  selectErrorElement,
  validatePattern,
  displayErrorMessage,
} from '../../js/modules.js';

// ********** VARIABLES **********
// Some have been imported in line 1
const studentName = document.querySelector('.student-name');
const studentEmail = document.querySelector('.student-email');
const studentPhone = document.querySelector('.student-phone');
const studentAddress = document.querySelector('.student-address');
const studentDOB = document.querySelector('.student-dob');
const updateForm = document.querySelector('.update-form');
const successModal = document.getElementById('success-modal');
const closeModalButton = document.getElementById('close-modal');

// Pre-fill form with existing student details
updateForm.name.value = studentName.textContent;
updateForm.email.value = studentEmail.textContent;
updateForm.phone.value = studentPhone.textContent;
updateForm.address.value = studentAddress.textContent;
updateForm.dob.value = studentDOB.textContent;

// *********** EVENT LISTENERS **************
// Listen for form submission
updateForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission behavior
  clearErrorMessages(); // Clear any previous error messages

  const formData = new FormData(event.currentTarget);
  const email = e.currentTarget.email.value.trim();
  const phone = e.currentTarget.phone.value.trim();
  const dob = e.currentTarget.dob.value.trim();
  let isError = false;

  // Loop through form data to check for empty fields (excluding 'term')
  for (let [name, value] of formData) {
    if (!value && name !== 'term') {
      const element = selectErrorElement(name);
      element.textContent = 'Please enter a value';
      isError = true;
    }
  }

  // Validate email field if not empty
  if (email && !validatePattern(emailPattern, email)) {
    displayErrorMessage('email', `Please enter a valid email`);
    isError = true;
  }

  // Validate phone number field if not empty
  if (phone && !validatePattern(phonePattern, phone)) {
    displayErrorMessage('phone', `Please enter a valid phone number`);
    isError = true;
  }

  // Validate date of birth field if not empty
  if (dob && !validatePattern(dobPattern, dob)) {
    displayErrorMessage('dob', `Please enter a valid date of birth`);
    isError = true;
  }

  // If no validation errors, update student details and show success modal
  if (!isError) {
    studentName.textContent = updateForm.name.value;
    document.querySelector('.student').textContent = updateForm.name.value;
    studentEmail.textContent = updateForm.email.value;
    studentPhone.textContent = updateForm.phone.value;
    studentAddress.textContent = updateForm.address.value;
    studentDOB.textContent = updateForm.dob.value;
    successModal.style.display = 'block'; // Show success modal
  }
});

// Close success modal when the close button is clicked
closeModalButton.addEventListener('click', function () {
  successModal.style.display = 'none';
});

// *********** FUNCTIONS **************
// Some have been imported on the first line
