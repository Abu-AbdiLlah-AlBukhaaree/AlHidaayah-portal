export { clearInputs, clearErrorMessages, selectErrorElement };

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

function selectErrorElement(element) {
  return document.querySelector(`.${element}-error`);
}
