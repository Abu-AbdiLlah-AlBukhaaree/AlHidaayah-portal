const paymentForm = document.getElementById('payment-form');
const errorMessage = document.querySelectorAll('.error-message');
let regNumError = false;
let termError = false;
let cardNumberError = false;
let expirationDateError = false;
let cvvError = false;

/* 
    !!! TODO !!! 
  - Undo e.preventDefaule();
  - Remove all nested ifs and create a function for each of them
  - Make the CVV option display dots on add
  - Look for a way to check for any errors and use that to validate your form for submission
*/

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrorMessages();

  const formData = new FormData(e.currentTarget);

  // Check form for empty inputs
  for (let [name, value] of formData) {
    if (!value && name !== 'term') {
      const element = selectErrorElement(name);
      element.textContent = 'Please enter value';

      regNumError = true;
      cardNumberError = true;
      expirationDateError = true;
      cvvError = true;
    } else if (!value && name === 'term') {
      const element = selectErrorElement(name);
      element.textContent = `Please select a ${name}`;

      termError = true;
    } else if (name === 'reg-num' && validatePattern(/^ALH\d{8}$/)) {
      validateInput(
        /^ALH\d{8}$/,
        value,
        name,
        validatePattern,
        `Your registration number should beging with 'ALH' and followed by 8 numbers`
      );

      regNumError = true;
    } else if (name === 'cardholder-name') {
      regNumError = true;
    } else if (name === 'card-number') {
      validateInput(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        value,
        name,
        validatePattern,
        `Please enter a vaild card number`
      );

      cardNumberError = true;
    } else if (name === 'expiration-date') {
      validateInput(
        /^(0[1-9]|1[0-2])\/(2[2-9]|[3-9]\d)$/,
        value,
        name,
        validatePattern,
        `Please enter a valid expiry date`
      );

      expirationDateError = true;
    } else if (name === 'cvv') {
      validateInput(
        /^[0-9]{3,4}$/,
        value,
        name,
        validatePattern,
        'Please enter a valid cvv'
      );

      cvvError = true;
    } else {
      regNumError = false;
      termError = false;
      cardNumberError = false;
      expirationDateError = false;
      cvvError = false;
    }
  }
  console.log(regNumError);
  console.log(termError);
  console.log(cardNumberError);
  console.log(expirationDateError);
  console.log(cvvError);

  if (
    !regNumError &&
    !termError &&
    !cardNumberError &&
    !expirationDateError &&
    !cvvError
  ) {
    clearInputs();
    paymentForm.submit();
  }
});

// ********** FUNCTIONS ***********
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (errorMessage) {
    errorMessage.textContent = '';
  });
}

function clearInputs() {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.value = '';
  });
}

function selectErrorElement(element) {
  return document.querySelector(`.${element}-error`);
}

function validatePattern(pattern, input) {
  return pattern.test(input);
}

function validateInput(pattern, value, name, isValid, message) {
  if (!isValid(pattern, value)) {
    const element = selectErrorElement(name);

    element.textContent = message;
    hasError = true;
  } else {
    hasError = false;
  }
}

// paymentForm.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Clear previous error messages
//   clearErrorMessages();

//   // Validate form inputs
//   const cardholderName = document
//     .getElementById('cardholder-name')
//     .value.trim();
//   const cardNumber = document.getElementById('card-number').value.trim();
//   const expirationDate = document
//     .getElementById('expiration-date')
//     .value.trim();
//   const cvv = document.getElementById('cvv').value.trim();

//   let isValid = true;

//   if (cardholderName === '') {
//     displayErrorMessage('cardholder-error', 'Cardholder name is required.');
//     isValid = false;
//   }

//   if (cardNumber === '') {
//     displayErrorMessage('card-number-error', 'Card number is required.');
//     isValid = false;
//   } else if (!isValidCardNumber(cardNumber)) {
//     displayErrorMessage('card-number-error', 'Invalid card number.');
//     isValid = false;
//   }

//   if (expirationDate === '') {
//     displayErrorMessage(
//       'expiration-date-error',
//       'Expiration date is required.'
//     );
//     isValid = false;
//   }

//   if (cvv === '') {
//     displayErrorMessage('cvv-error', 'CVV is required.');
//     isValid = false;
//   }

//   if (isValid) {
//     // Perform payment processing logic
//     // You can display a success message, redirect to a confirmation page, or perform any desired actions
//     console.log('Payment processed successfully!');
//   }
// });

// function displayErrorMessage(elementId, message) {
//   const errorMessage = document.getElementById(elementId);
//   errorMessage.textContent = message;
// }

// function isValidCardNumber(cardNumber) {
//   // Implement card number validation logic based on your requirements
//   // You can use a regular expression or a library like Luhn algorithm to validate the card number
//   return true; // Placeholder for demonstration
// }
