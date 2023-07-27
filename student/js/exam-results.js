/* 
    !!! TODD !!!
  - Add content subject and scores dynamically
  - Add charts using google API
  - Create bar chart for total score
  - Create pie chart for grade
*/

// ********** VARIABLES ***********
const resultsTableBody = document.getElementById('results-table-body');
const filterSubjectDOM = document.getElementById('subject');
const filterTestDOM = document.getElementById('test');
const filterExamDOM = document.getElementById('exam');
const filterTotalDOM = document.getElementById('total');
const filterGradeDOM = document.getElementById('grade');
let examResults = [
  {
    studentName: 'John Doe',
    subject: 'Mathematics',
    department: 'General',
    test: 35,
    exam: 50,
    isCompulsory: true,
  },
  {
    studentName: 'John Doe',
    subject: 'English Language',
    department: 'General',
    test: 38,
    exam: 60,
    isCompulsory: true,
  },
  {
    studentName: 'John Doe',
    subject: 'Physics',
    department: 'Science',
    test: 40,
    exam: 55,
    isCompulsory: true,
  },
  {
    studentName: 'John Doe',
    subject: 'Further Maths',
    department: 'Science',
    test: 23,
    exam: 33,
    isCompulsory: false,
  },
  // Add more sample data for other subjects
];

// ********** EVENT LISTENERS *********
filterSubjectDOM.addEventListener('change', (e) => {
  const element = e.currentTarget;
  displayExamResults(filterSubjects(element.value));
});

filterTestDOM.addEventListener('change', (e) => {
  const element = e.currentTarget;
  displayExamResults(filterNumericResults(element, element.value));
});

filterExamDOM.addEventListener('change', (e) => {
  const element = e.currentTarget;
  displayExamResults(filterNumericResults(element, element.value));
});

filterTotalDOM.addEventListener('change', (e) => {
  const element = e.currentTarget;
  displayExamResults(filterNumericResults(element, element.value));
});

filterGradeDOM.addEventListener('change', (e) => {
  const element = e.currentTarget;
  displayExamResults(filterNumericResults(element, element.value));
});

// ********* FUNCTIONS **********
// It is important to call 'calculateTotalScore' function before calling 'calculateGrade' function because 'calculateGrade' funtion builds on the result of 'calculateTotalScore' function
// It is important to call 'displayExamResults' function last because it uses the examResult array as value, and this array has been upadated by many other functions

// Call relevant functions
calculateTotalScore();
addGradeToExamResults();
displayExamResults(examResults);

function calculateTotalScore() {
  examResults.forEach((result) => {
    const total = result.test + result.exam;
    result.total = total;
  });

  return examResults;
}

function calculateGrade(totalScore) {
  if (totalScore >= 75) return 'A1';
  else if (totalScore >= 70) return 'B2';
  else if (totalScore >= 65) return 'B3';
  else if (totalScore >= 60) return 'C4';
  else if (totalScore >= 55) return 'C5';
  else if (totalScore >= 50) return 'C6';
  else if (totalScore >= 45) return 'D7';
  else if (totalScore >= 40) return 'E8';
  else return 'F9';
}

function assignGradeToID(grade) {
  if (grade === 'A1') return 1;
  else if (grade === 'B2') return 2;
  else if (grade === 'B3') return 3;
  else if (grade === 'C4') return 4;
  else if (grade === 'C5') return 5;
  else if (grade === 'C6') return 6;
  else if (grade === 'D7') return 7;
  else if (grade === 'E8') return 8;
  else if (grade === 'F9') return 9;
  else return 'error calculating grade';
}

function addGradeToExamResults() {
  examResults.forEach((result) => {
    const grade = calculateGrade(result.total);
    const gradeID = assignGradeToID(grade);

    result.grade = grade;
    result.gradeID = gradeID;
  });
  return examResults;
}

function displayExamResults(arr) {
  let html = '';
  arr.forEach((result) => {
    html += `
        <tr>
          <td>${result.subject}</td>
          <td>${result.test}</td>
          <td>${result.exam}</td>
          <td>${result.total}</td>
          <td>${result.grade}</td>
        </tr>
      `;
  });

  return (resultsTableBody.innerHTML = html);
}

function sortSubjectsByGeneral(a, b) {
  if (
    a.department.toLowerCase() === 'general' &&
    b.department.toLowerCase() !== 'general'
  )
    return -1;
  if (
    a.department.toLowerCase() !== 'general' &&
    b.department.toLowerCase() === 'general'
  )
    return 1;
  if (a.isCompulsory && !b.isCompulsory) return -1;
  if (!a.isCompulsory && b.isCompulsory) return 1;
  return 0;
}

function sortSubjectsByDepartment(a, b) {
  if (
    a.department.toLowerCase() !== 'general' &&
    b.department.toLowerCase() === 'general'
  )
    return -1;
  if (
    a.department.toLowerCase() === 'general' &&
    b.department.toLowerCase() !== 'general'
  )
    return 1;
  if (a.isCompulsory && !b.isCompulsory) return -1;
  if (!a.isCompulsory && b.isCompulsory) return 1;
  return 0;
}

function filterSubjects(value) {
  if (value.toLowerCase() === 'general') {
    return examResults.sort(sortSubjectsByGeneral);
  } else if (value.toLowerCase() === 'science') {
    return examResults.sort(sortSubjectsByDepartment);
  }
}

function filterNumericResults(element, value) {
  const previousSibling = element.previousElementSibling;
  let siblingValue;
  siblingValue = previousSibling.textContent.toLowerCase();
  if (siblingValue === 'grade') siblingValue = 'gradeID';

  function sortAscendingOrder(a, b) {
    return a[siblingValue] - b[siblingValue];
  }

  function sortDescendingOrder(a, b) {
    return b[siblingValue] - a[siblingValue];
  }

  if (value === 'ascending') {
    return examResults.sort(sortAscendingOrder);
  } else if (value === 'descending') {
    return examResults.sort(sortDescendingOrder);
  }
}
