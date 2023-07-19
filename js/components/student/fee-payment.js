/* 
    !!! TODO !!! 
  - Make the CVV option display dots on add
*/
import {
  // varibles
  regNumPattern,
  debitCardPattern,
  expiryDatePattern,
  cvvPattern,
  // functions
  clearInputs,
  clearErrorMessages,
  validatePattern,
  selectErrorElement,
  displayErrorMessage,
} from '../../modules.js';

// *** VARIABLES ***
// some have been imported on line 1
const paymentForm = document.getElementById('payment-form');

// ********** EVENT LISTENERS ***********
// Listen for form submission
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  clearErrorMessages(); // Clear any previous error messages

  const formData = new FormData(e.currentTarget);
  const regNum = e.currentTarget.reg_num.value.trim();
  const term = e.currentTarget.term.value;
  const cardNumber = e.currentTarget.card_number.value.trim();
  const expiryDate = e.currentTarget.expiration_date.value.trim();
  const cvv = e.currentTarget.cvv.value.trim();
  let isError = false;

  // Check form for empty inputs (excluding 'term')
  for (let [name, value] of formData) {
    if (!value && name !== 'term') {
      const element = selectErrorElement(name);
      element.textContent = 'Please enter a value';
      isError = true;
    }
  }

  // Validate registration number format if not empty
  if (regNum && !validatePattern(regNumPattern, regNum)) {
    displayErrorMessage(
      'reg_num',
      `Your registration number should begin with 'ALH' and followed by 8 numbers`
    );
    isError = true;
  }

  // Validate term selection
  if (!term) {
    displayErrorMessage('term', `Please select a term`);
    isError = true;
  }

  // Validate card number format if not empty
  if (cardNumber && !validatePattern(debitCardPattern, cardNumber)) {
    displayErrorMessage('card_number', `Please enter a valid card number`);
    isError = true;
  }

  // Validate expiry date format if not empty
  if (expiryDate && !validatePattern(expiryDatePattern, expiryDate)) {
    displayErrorMessage('expiration_date', `Please enter a valid expiry date`);
    isError = true;
  }

  // Validate CVV format if not empty
  if (cvv && !validatePattern(cvvPattern, cvv)) {
    displayErrorMessage('cvv', `Please enter a correct CVV`);
    isError = true;
  }

  // If no validation errors, clear inputs and submit the form
  if (!isError) {
    clearInputs(); // Clear form inputs
    paymentForm.submit(); // Submit the form
  }
});

// ********** FUNCTIONS ***********
// Some have been imported on line 1
