/* 
    !!! TODD !!!
  - Add content subject and scores dynamically
  - Add charts using google API
  - Create bar chart for total score
  - Create pie chart for grade
*/

const resultsTableBody = document.getElementById('results-table-body');
const filterButton = document.getElementById('filter-button');

let examResults = [
  {
    studentName: 'John Doe',
    subject: 'Mathematics',
    testScore: 35,
    examScore: 50,
  },
  {
    studentName: 'John Doe',
    subject: 'English Language',
    testScore: 38,
    examScore: 65,
  },
  {
    studentName: 'John Doe',
    subject: 'Physics',
    testScore: 40,
    examScore: 55,
  },
  // Add more sample data for other subjects
];

// Function to calculate the total score and grade
function calculateTotalScore(testScore, examScore) {
  return testScore + examScore;
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

// Function to generate and display exam results
function displayExamResults() {
  let html = '';
  examResults.forEach((result) => {
    const totalScore = calculateTotalScore(result.testScore, result.examScore);
    const grade = calculateGrade(totalScore);
    html += `
        <tr>
          <td>${result.subject}</td>
          <td>${result.testScore}</td>
          <td>${result.examScore}</td>
          <td>${totalScore}</td>
          <td>${grade}</td>
        </tr>
      `;
  });
  resultsTableBody.innerHTML = html;
}

// Call the function to display exam results on page load
displayExamResults();
