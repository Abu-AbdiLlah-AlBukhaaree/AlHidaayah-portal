const form = document.querySelector('form');
const departmentName = document.getElementById('department');
const subjectsContainer = document.querySelector('.subjects-container');
const departmentSelect = document.getElementById('department');
const errorMessage = document.querySelectorAll('.error-message');

let isError = false;

/* 

!!! TODO !!!
- Validate Number of subjects to be 4 + Compulsory subjects (After updating contentful list)
- Look for a way to check for any errors and use that to validate your form for submission
*/

import { space, accessToken } from '../../../config.js';

// Contentful API
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: space,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: accessToken,
});

// working with the API's response
async function getSubjects() {
  try {
    let contentful = await client.getEntries({
      content_type: 'subjects',
    });

    let subjects = await contentful.items;
    subjects = subjects.map((singleSubject) => singleSubject.fields);
    // sort the subjects in order of 'General' first, then 'compulsory', then others follow
    subjects.sort(sortDepartments);

    departmentSelect.addEventListener('change', () => {
      subjectsContainer.classList.add('form__section__subjects-grid');
      subjectsContainer.innerHTML = showSubjects(subjects).join('');
    });

    // I don't know why I'm returning subjects.
    // If you discover contact me on Whatsapp with your explanation
    // WhatsApp Number = +2349136226502
    return subjects;
  } catch (error) {
    console.log(error);
  }
}
getSubjects();

// ********** EVENT LISTENERS ***********
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrorMessages();
  const formData = new FormData(e.currentTarget);

  for (let [name, value] of formData) {
    if (!value && name === 'reg-num') {
      const element = selectErrorElement(name);
      element.textContent = 'Please enter value';

      isError = true;
    } else if (!value && (name === 'term' || name === 'department')) {
      const element = selectErrorElement(name);
      element.textContent = `Please select a ${name}`;

      isError = true;
    } else if (name === 'reg-num') {
      validateInput(
        /^ALH\d{8}$/,
        value,
        name,
        validatePattern,
        `Your registration number should beging with 'ALH' and followed by 8 numbers`
      );

      isError = true;
    } else {
      isError = false;
    }
  }

  if (isError) {
    clearInputs();
    e.currentTarget.submit();
  }
});

// ********** FUNCTIONS ***********
// for generating html content from array of subjects
function displaySubjects(subject_name, isCompulsory, subject_id) {
  if (isCompulsory) {
    return `<div class="form__section__subject">
                <input id="${subject_id}" name="${subject_id.toLowerCase()}" type="checkbox" value="${subject_id}" checked disabled />
                <label for="${subject_id}">${subject_name}</label>
            </div>`;
  } else {
    return `<div class="form__section__subject">
                <input id="${subject_id}" name="${subject_id.toLowerCase()}" type="checkbox" value="${subject_id}" />
                <label for="${subject_id}">${subject_name}</label>
              </div>`;
  }
}

// for filtering the subjects array for general subjects and the user selected subject then generate an html content for the subjects available to be selected
// toLowerCase() in 'filter' method is important because the department values are capitalised(CSS) by default
function showSubjects(subjectsArr) {
  const department_name = departmentName.value;
  const display = subjectsArr.filter(
    (subject) =>
      subject.department.toLowerCase().trim() === 'general' ||
      subject.department.toLowerCase().trim() === department_name
  );
  const newDisplay = display.map((item) => {
    const { subject, isCompulsory, subjectId } = item;
    return displaySubjects(subject, isCompulsory, subjectId);
  });

  return newDisplay;
}

// for sorting the subjects in order of 'General' first, then 'compulsory', then others follow
function sortDepartments(a, b) {
  if (a.department === 'General' && b.department !== 'General') {
    return -1;
  }
  if (a.department !== 'General' && b.department === 'General') {
    return 1;
  }
  if (a.isCompulsory && !b.isCompulsory) {
    return -1;
  }
  if (!a.isCompulsory && b.isCompulsory) {
    return 1;
  }
  return 0;
}

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

function validateInput(pattern, value, name, isValid, message) {
  if (!isValid(pattern, value)) {
    const element = selectErrorElement(name);

    element.textContent = message;
  } else {
  }
}

// ********** RESOURCES **********
// Custom array to experiment with, if you can't access the API
const arr = [
  {
    department: 'Art',
    subject: 'Government',
    isCompulsory: true,
    subjectId: 'government',
  },
  {
    department: 'General',
    subject: 'English Language',
    isCompulsory: true,
    subjectId: 'english',
  },
  {
    department: 'General',
    subject: 'Mathematics',
    isCompulsory: true,
    subjectId: 'mathematics',
  },
  {
    department: 'Science',
    subject: 'Physcis',
    isCompulsory: true,
    subjectId: 'physics',
  },
  {
    department: 'Science',
    subject: 'Geography',
    isCompulsory: false,
    subjectId: 'geography',
  },
  {
    department: 'Commercial',
    subject: 'Accounting',
    isCompulsory: true,
    subjectId: 'accounting',
  },
  {
    department: 'Art',
    subject: 'History',
    isCompulsory: false,
    subjectId: 'history',
  },
];
