export {
  regNumPattern,
  debitCardPattern,
  expiryDatePattern,
  cvvPattern,
  emailPattern,
  phonePattern,
  dobPattern,
  clearInputs,
  clearErrorMessages,
  validatePattern,
  selectErrorElement,
  displayErrorMessage,
};

// *********** VARIABLES ***************
const regNumPattern = /^ALH\d{8}$/;
const debitCardPattern =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const expiryDatePattern = /^(0[1-9]|1[0-2])\/(2[2-9]|[3-9]\d)$/;
const cvvPattern = /^[0-9]{3,4}$/;
const emailPattern = /^[\w.\-+]+@[\w\-]+\.[\w.]+$/;
const phonePattern =
  /^(?:(?:\+?[1-9]\d{0,2}(?:[\s.-]?\d{2,4}){2,3})|\(?(?:\+?[1-9]\d{0,2}\)?[\s.-]?){2,3}\d{2,4})(?:[\s.-]?x\d{1,5})?$/;
const dobPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;

// *********** FUNCTIONS ***************

function clearInputs() {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.value = '';
  });
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (errorMessage) {
    errorMessage.textContent = '';
  });
}

function validatePattern(pattern, input) {
  return pattern.test(input);
}

function selectErrorElement(element) {
  return document.querySelector(`.${element}-error`);
}

function displayErrorMessage(name, errorMessage) {
  const element = selectErrorElement(name);

  return (element.textContent = errorMessage);
}
