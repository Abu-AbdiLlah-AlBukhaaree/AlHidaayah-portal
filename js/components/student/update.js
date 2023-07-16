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
updateForm.addEventListener('submit', function (event) {
  event.preventDefault();
  clearErrorMessages();
  const formDate = new FormData(event.currentTarget);

  for (let [name, value] of formDate) {
    console.log(`${name} = ${value}`);

    if (!value) {
      const element = selectErrorElement(name);

      element.textContent = 'Please enter value';
    }
  }

  // Update student details with form values
  studentName.textContent = updateForm.name.value;
  studentEmail.textContent = updateForm.email.value;
  studentPhone.textContent = updateForm.phone.value;
  studentAddress.textContent = updateForm.address.value;
  // Show success modal
  // successModal.style.display = 'block';
});

// Close success modal
closeModalButton.addEventListener('click', function () {
  successModal.style.display = 'none';
});

// *********** FUNCTIONS **************
import {
  clearInputs,
  clearErrorMessages,
  selectErrorElement,
} from '../../modules.js';

// const errorMessage = document.querySelectorAll('.error-message');
// const errorMessageContent = [];
// errorMessage.forEach((item) => {
//   console.log(item.textContent);
//   if (item.textContent) {
//     errorMessageContent.push('error');
//   }
// });
// if (errorMessageContent.includes('')) {
//   console.log('AlhamduliLlah');
// }

// console.log(errorMessageContent);
