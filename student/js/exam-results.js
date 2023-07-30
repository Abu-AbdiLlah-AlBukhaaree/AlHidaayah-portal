/* 
    !!! TODD !!!
  - Add content for subject and scores dynamically
*/

// ********** VARIABLES ***********
// DOM elements for filtering and displaying results
const resultsTableBody = document.getElementById('results-table-body');
const filterSubjectDOM = document.getElementById('subject');
const filterTestDOM = document.getElementById('test');
const filterExamDOM = document.getElementById('exam');
const filterTotalDOM = document.getElementById('total');
const filterGradeDOM = document.getElementById('grade');

// DOM elements for charts
const piechart = document.querySelector('.piechart');
const barchart = document.querySelector('.barchart');

// Sample data for exam results
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
// Event listeners for any filter change
filterSubjectDOM.addEventListener('change', handleFilterChange);
filterTestDOM.addEventListener('change', handleFilterChange);
filterExamDOM.addEventListener('change', handleFilterChange);
filterTotalDOM.addEventListener('change', handleFilterChange);
filterGradeDOM.addEventListener('change', handleFilterChange);

// ********* FUNCTIONS **********
// It is important to call 'calculateTotalScore' function before calling 'calculateGrade' function because 'calculateGrade' funtion builds on the result of 'calculateTotalScore' function
// It is important to call 'displayExamResults' function last because it uses the examResult array as value, and this array has been upadated by many other functions

// Call relevant functions
calculateTotalScore();
addGradeToExamResults();
displayExamResults(examResults);

// Calculate the total score for each result entry
function calculateTotalScore() {
  examResults.forEach((result) => {
    const total = result.test + result.exam;
    result.total = total;
  });

  return examResults;
}

// Calculate the grade based on the total score
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

// Assign a numerical grade ID based on the grade
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

// Add grade and gradeID to the examResults array
function addGradeToExamResults() {
  examResults.forEach((result) => {
    const grade = calculateGrade(result.total);
    const gradeID = assignGradeToID(grade);

    result.grade = grade;
    result.gradeID = gradeID;
  });
  return examResults;
}

// Display exam results in the HTML table
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

// Sort subjects by 'General' and then by 'Science'
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

// Sort subjects by department
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

// Filter exam results by subject ('General' or 'Science')
function filterSubjects(value) {
  if (value.toLowerCase() === 'general') {
    return examResults.sort(sortSubjectsByGeneral);
  } else if (value.toLowerCase() === 'science') {
    return examResults.sort(sortSubjectsByDepartment);
  }
}

// Filter exam results numerically (ascending or descending)
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

// To be used as callback for handling changes in DOM to filter table
function handleFilterChange(e) {
  const element = e.currentTarget;
  const previousSibling = element.previousElementSibling;
  let siblingValue = previousSibling.textContent.toLowerCase();

  if (siblingValue === 'subject') {
    return displayExamResults(filterSubjects(element.value));
  } else {
    return displayExamResults(filterNumericResults(element, element.value));
  }
}

// Count occurrences of each grade in the gradeArray
function countGrades(gradeArray) {
  // Create an object to store the count of each grade
  const gradeCount = {};

  // Loop through the input array and count the occurrences of each grade
  for (const entry of gradeArray) {
    const { grade } = entry;
    gradeCount[grade] = (gradeCount[grade] || 0) + 1;
  }

  // Convert the gradeCount object into an array of arrays
  const resultArray = Object.entries(gradeCount);

  return resultArray;
}

// ******** CHART FUNTIONALITY **********
// Count the occurrences of each grade for pie chart data
const examResultsGradeOnly = countGrades(examResults);

// Extract subject and total score for bar chart data and convert it to and array
const examResultsTotalOnly = examResults.map((result) => {
  const { subject, total } = result;

  return [subject, total];
});

// Load Google Charts API and draw the pie chart
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawBarChart);

// Draw the pie chart
function drawPieChart() {
  const data = google.visualization.arrayToDataTable([
    ['Employee Name', 'Salary'],
    ...examResultsGradeOnly,
  ]);

  const options = {
    title: 'Grades Summary',
    titleTextStyle: {
      color: '#022243',
      fontName: 'Montserrat',
    },
    legend: {
      position: 'bottom',
      textStyle: { color: '#222', fontName: 'sans-serif', fontSize: 16 },
    },
    backgroundColor: 'transparent',
    colors: ['#00a651', '#ffc72c'],
    fontSize: 16,
    fontName: 'Open Sans',
    tooltip: { textName: 'Open Sans' },
  };

  const chart = new google.visualization.PieChart(piechart);
  chart.draw(data, options);
}

// Draw the bar chart
function drawBarChart() {
  const data = google.visualization.arrayToDataTable([
    [
      { label: 'Subject', id: 'subject' },
      { label: 'Score', id: 'score', type: 'number' }, // Use object notation to explicitly specify the data type.
    ],

    ...examResultsTotalOnly,
  ]);

  const options = {
    title: 'Subjects and Their Total Scores',
    titleTextStyle: {
      color: '#022243',
      fontName: 'Montserrat',
    },
    legend: {
      position: 'bottom',
      textStyle: { color: '#222', fontName: 'sans-serif', fontSize: 16 },
    },
    backgroundColor: 'transparent',
    colors: ['#00a651', '#ffc72c'],
    fontSize: 16,
    fontName: 'Open Sans',
    animation: { startup: true, duration: 1000, easing: 'inAndOut' },
  };

  const chart = new google.visualization.BarChart(barchart);
  chart.draw(data, options);
}
