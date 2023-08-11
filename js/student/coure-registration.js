/* 
    !!! TODO !!!
  - Validate Number of subjects to be 4 + Compulsory subjects (After updating contentful list)
*/

import { space, accessToken } from '../config.js';
import {
  // varibles
  regNumPattern,
  // functions
  clearInputs,
  clearErrorMessages,
  validatePattern,
  selectErrorElement,
  displayErrorMessage,
} from '../modules.js';

// ***********  VARIABLES ************
// Some have been imported on line 1
const form = document.querySelector('form');
const departmentName = document.getElementById('department');
const subjectsContainer = document.querySelector('.subjects-container');
const departmentSelect = document.getElementById('department');

// Contentful API
const client = contentful.createClient({
  space: space,
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
  e.preventDefault(); // Prevent default form submission behavior
  clearErrorMessages(); // Clear any previous error messages

  const formData = new FormData(e.currentTarget);
  const regNum = e.currentTarget.reg_num.value.trim();
  let isError = false;

  // Check if all form fields are filled (excluding 'reg_num')
  for (let [name, value] of formData) {
    if (!value && name !== 'reg_num') {
      const element = selectErrorElement(name);
      element.textContent = `Please select a ${name}`;
      isError = true;
    } else if (!value && name === 'reg_num') {
      const element = selectErrorElement(name);
      element.textContent = `Please enter value`;
      isError = true;
    }
  }

  // Validate registration number format if not empty
  if (regNum && !validatePattern(regNumPattern, regNum)) {
    displayErrorMessage(
      'reg_num',
      `Your registration number should beging with 'ALH' and followed by 8 numbers`
    );
    isError = true;
  }

  // Custom validation for number of subjects (TODO)
  // TODO: Validate Number of subjects to be 4 + Compulsory subjects (After updating contentful list)

  if (!isError) {
    clearInputs();
    e.currentTarget.submit();
  }
});

// ********** FUNCTIONS ***********
// some have been imported on line 1

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
