// ********** VARIABLES ***********
const assignmentContainer = document.querySelector(
  '.single-assignment-container'
);
const gradesTableBody = document.getElementById('grade-table-body');
const resultsTableBody = document.getElementById('results-table-body');
const teacherAnnouncement = document.querySelector('.teacher-announcement');
const adminAnnouncement = document.querySelector('.admin-announcement');

// DOM elements for charts
const piechart = document.querySelector('.piechart');
const barchart = document.querySelector('.barchart');

// Contents to be updated to the DOM
const assignments = [
  {
    subject: 'Math',
    datePosted: 'August 9, 2023',
    deadline: 'August 16, 2023',
    question:
      'Write a program to calculate the sum of all even numbers between 1 and 100...',
  },
  {
    subject: 'History',
    datePosted: 'August 10, 2023',
    deadline: 'August 18, 2023',
    question:
      'Write an essay on the causes and consequences of World War II...',
  },
  {
    subject: 'Science',
    datePosted: 'August 11, 2023',
    deadline: 'August 20, 2023',
    question:
      'Conduct an experiment to demonstrate the effects of osmosis in plant cells...',
  },
  {
    subject: 'English',
    datePosted: 'August 12, 2023',
    deadline: 'August 21, 2023',
    question:
      'Read the short story "The Tell-Tale Heart" by Edgar Allan Poe and analyze the narrator\'s descent into madness...',
  },
  // Add more assignment objects here
];
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
const teacherAnnouncements = [
  {
    datePosted: 'August 10, 2023',
    teacherName: 'Jane Smith',
    content:
      'Dear students, there will be a guest speaker in the auditorium tomorrow.',
  },
  {
    datePosted: 'August 11, 2023',
    teacherName: 'Michael Johnson',
    content:
      'Reminder: The science fair project submissions are due on August 20th.',
  },
  {
    datePosted: 'August 12, 2023',
    teacherName: 'Sarah Williams',
    content:
      'The school library will be closed for renovations from August 15th to 25th.',
  },
  // Add more announcement objects here
];
const adminAnnouncements = [
  {
    datePosted: 'August 9, 2023',
    content:
      'The school will be closed on August 15th due to a public holiday. Classes will resume on August 16th.',
  },
  {
    datePosted: 'August 10, 2023',
    content:
      'The annual school sports day is scheduled for September 2nd. All students are encouraged to participate and show their sportsmanship.',
  },
  {
    datePosted: 'August 11, 2023',
    content:
      "Parents-Teacher Meeting will be held on August 18th from 3:00 PM to 6:00 PM. Please ensure your presence for discussing your child's progress.",
  },
  {
    datePosted: 'August 12, 2023',
    content:
      'The science fair exhibition will take place in the school auditorium on August 25th. All students and parents are welcome to attend.',
  },
  // Add more admin announcement objects here
];

// ********** EVENT LISTENERS *********
// Assignment
assignments.forEach((assignment) => {
  const card = document.createElement('article');
  card.classList.add('single-assignment');

  card.innerHTML = `<section class="assignment-header">
      <h3 class="subject-tag">
        ${assignment.subject}
      </h3>
      <article class="dates small-text">
        <span class="date-posted">
          Posted: ${assignment.datePosted}
        </span>
        <span class="deadline">
          Deadline: ${assignment.deadline}
        </span>
      </article>
    </section>
    <article class="assignment-content">
      <h4 class="assignment-question">
        ${assignment.question}<a href="#" class="see-more">see more</a>
      </h4>
    </article>`;

  assignmentContainer.appendChild(card);
});

// Teacher Announcement
teacherAnnouncements.forEach((announcement) => {
  const card = document.createElement('article');
  card.classList.add('announcement-card');

  card.innerHTML = `
      <article class="announcement-header">
        <span class="date-posted small-text">Posted: ${announcement.datePosted}</span>
        <span class="teacher-name small-text">Teacher: ${announcement.teacherName}</span>
      </article>

      <p class="announcement-content">
        ${announcement.content}
      </p>
  `;

  teacherAnnouncement.appendChild(card);
});

// Admin Announcement
adminAnnouncements.forEach((announcement) => {
  const card = document.createElement('article');
  card.classList.add('announcement-card');

  card.innerHTML = `
      <article class="announcement-header">
        <span class="date-posted small-text">Posted: ${announcement.datePosted}</span>

      </article>

      <p class="announcement-content">
        ${announcement.content}
      </p>
  `;

  adminAnnouncement.appendChild(card);
});

// ********* FUNCTIONS **********
// It is important to call 'calculateTotalScore' function before calling 'calculateGrade' function because 'calculateGrade' funtion builds on the result of 'calculateTotalScore' function
// It is important to call 'displayExamResults' function last because it uses the examResult array as value, and this array has been upadated by many other functions

// Call relevant functions
calculateTotalScore();
addGradeToExamResults();
displayExamResults(examResults, 'grade', gradesTableBody);
displayExamResults(examResults, 'total', resultsTableBody);

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
function displayExamResults(arr, data, tableDOM) {
  let html = '';
  arr.forEach((result) => {
    html += `
            <tr>
              <td>${result.subject}</td>
              <td>${result[data]}</td>
            </tr>
          `;
  });

  return (tableDOM.innerHTML = html);
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

// ********* GOOGLE CHARTS **********
// Count the occurrences of each grade for pie chart data
const examResultsGradeOnly = countGrades(examResults);

// Extract subject and total score for bar chart data and convert it to and array
const examResultsTotalOnly = examResults.map((result) => {
  const { subject, total } = result;

  return [subject, total];
});

async function loadChart() {
  const errorDOM = document.querySelectorAll('.error');
  try {
    // Load Google Charts API and draw the pie chart
    await google.charts.load('current', { packages: ['corechart'] });
    await google.charts.setOnLoadCallback(drawPieChart);
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
  } catch (error) {
    console.error('Error:', error);

    piechart.style.display = 'none';
    barchart.style.display = 'none';

    errorDOM.forEach((errorDOM) => {
      errorDOM.classList.add('show-error');
      errorDOM.textContent =
        'Unable to load charts.\nPlease check you internet connection.';
    });
  }
}

loadChart();
