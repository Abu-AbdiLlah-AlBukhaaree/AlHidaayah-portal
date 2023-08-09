const assignmentContainer = document.querySelector(
  '.single-assignment-container'
);
const teacherAnnouncement = document.querySelector('.teacher-announcement');
const adminAnnouncement = document.querySelector('.admin-announcement');

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

teacherAnnouncements.forEach((announcement) => {
  const card = document.createElement('article');
  card.classList.add('announcement-card');

  card.innerHTML = `
      <article class="announcement-header">
        <span class="date-posted small-text">Posted: ${announcement.datePosted}</span>
        <span class="teacher-name small-text">Teacher: John Doe</span>
      </article>

      <p class="announcement-content">
        ${announcement.content}
      </p>
  `;

  teacherAnnouncement.appendChild(card);
});

adminAnnouncements.forEach((announcement) => {
  const card = document.createElement('article');
  card.classList.add('announcement-card');

  card.innerHTML = `
      <article class="announcement-header">
        <span class="date-posted small-text">Posted: ${announcement.datePosted}</span>
        <span class="teacher-name small-text">Teacher: John Doe</span>
      </article>

      <p class="announcement-content">
        ${announcement.content}
      </p>
  `;

  adminAnnouncement.appendChild(card);
});
