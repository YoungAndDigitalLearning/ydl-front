// Fictional portfolio data. Do not import the historic database dumps.
// IDs and field shapes match the Django REST serializers used by this Vue app.
const teacher = {
  id: 1, username: "demo_teacher", first_name: "Alex", last_name: "Morgan",
  is_teacher: true, is_student: false, isEmailActivated: true,
  email: "demo_teacher@example.invalid", courses: [1, 2, 3], messages: {},
  date_joined: "2026-11-12T09:00:00Z"
}
const student = {
  id: 2, username: "demo_student", first_name: "Sam", last_name: "Taylor",
  is_teacher: false, is_student: true, isEmailActivated: true,
  email: "demo_student@example.invalid", courses: [1, 2], messages: { "1": [{ id: 1, sender: 1, receiver: 2, text: "Welcome to your German conversation course!", date: "2026-11-12T16:00:00Z" }] },
  date_joined: "2026-11-12T09:00:00Z"
}
const learner = {
  id: 3, username: "demo_learner", first_name: "Jamie", last_name: "Rivera",
  is_teacher: false, is_student: true, isEmailActivated: true,
  email: "demo_learner@example.invalid", courses: [2], messages: {},
  date_joined: "2026-11-12T09:00:00Z"
}

export const seedData = {
  users: [teacher, student, learner],
  courses: [
    {
      id: 1, name: "German Conversation A2", teacher: 1, price: 0, paid: false,
      description: "An interactive A2 conversation course focused on practical German for university and everyday life. Learners practise introducing opinions, making plans, describing experiences and asking follow-up questions through guided discussions, partner exercises and short presentations. Each session includes useful expressions and constructive speaking feedback.",
      deadline: "2027-06-30T18:00:00+02:00", student_count: 14,
      created: "2026-11-12T13:00:00Z", resources: [1, 2], posts: [2, 3], tests: [1], weeks: [],
      events: [
        { id: 1, matter: "HOMEWORK", date: "2027-03-08T15:00:00+01:00", course: 1 },
        { id: 2, matter: "PRESENTATION", date: "2027-03-15T14:00:00+01:00", course: 1 }
      ]
    },
    {
      id: 2, name: "Introduction to Spanish", teacher: 1, price: 0, paid: false,
      description: "A beginner-friendly introduction to Spanish language and culture. The course builds confidence with greetings, introductions, numbers, everyday vocabulary and simple present-tense sentences. Lessons combine listening activities, short dialogues, pronunciation practice and small exercises that prepare learners for real-life conversations.",
      deadline: "2027-06-30T18:00:00+02:00", student_count: 12,
      created: "2026-11-12T13:00:00Z", resources: [3, 4], posts: [4], tests: [], weeks: [],
      events: [{ id: 3, matter: "EXAM", date: "2027-04-12T10:00:00+02:00", course: 2 }]
    },
    {
      id: 3, name: "Intercultural Communication", teacher: 1, price: 0, paid: false,
      description: "Explore how cultural expectations shape communication in international study and work settings. Through short case studies, group discussions and role-playing activities, learners practise active listening, giving feedback, resolving misunderstandings and collaborating effectively across cultural contexts.",
      deadline: "2027-06-30T18:00:00+02:00", student_count: 9,
      created: "2026-11-12T13:00:00Z", resources: [5], posts: [], tests: [], weeks: [], events: []
    }
  ],
  announcements: [
    { id: 1, title: "New semester courses", content: "Our new demonstration course catalogue is now available.", date: "2026-11-12T16:48:00+01:00", author: teacher },
    { id: 2, title: "Welcome to Young & Digital Learning", content: "Discover languages and exchange ideas with fellow learners.", date: "2026-11-12T16:48:00+01:00", author: teacher }
  ],
  posts: [
    { id: 2, title: "Welcome to German Conversation A2", text: "Welcome to the course! Each week we will practise speaking through everyday situations. Please introduce yourself and tell us one conversation topic you would like to explore.", date: "2026-11-12T10:00:00Z", author: 1, author_name: "demo_teacher", course: 1, childs: [5, 6] },
    { id: 3, title: "Preparing for our next speaking session", text: "For next week's session, please prepare a short introduction to a place you enjoy visiting. We will use these examples to practise asking follow-up questions in German.", date: "2026-11-12T11:00:00Z", author: 2, author_name: "demo_student", course: 1, childs: [7] },
    { id: 4, title: "Spanish A1: learning resources and vocabulary", text: "Our first vocabulary set covers greetings, introductions and common expressions. Review the examples before the next class and share a useful phrase you have learned.", date: "2026-11-12T12:00:00Z", author: 1, author_name: "demo_teacher", course: 2, childs: [] },
    { id: 5, title: "My learning goals", text: "I would like to become more confident speaking German at university and in everyday conversations.", date: "2026-11-12T13:00:00Z", author: 2, author_name: "demo_student", course: 1, childs: [] },
    { id: 6, title: "A good starting point", text: "Great goal! We will start with introductions and short role-playing exercises.", date: "2026-11-12T14:00:00Z", author: 1, author_name: "demo_teacher", course: 1, childs: [] },
    { id: 7, title: "My presentation topic", text: "I will prepare a short presentation about my favourite park and why I enjoy spending time there.", date: "2026-11-12T15:00:00Z", author: 3, author_name: "demo_learner", course: 1, childs: [] }
  ],
  quizzes: [
    { id: 1, course: 1, t_id: 1, scored_by: 2, score: 0, max_score: 1,
      tasks: [{ id: 1, test: 1, render_type: "MC", question: "Which phrase is a polite greeting in German?",
        answers: [
          { id: 1, task: 1, answer: "Gute Nacht", checked: false, correct_answer: "Guten Morgen", max_score: 0, score: 0, order: 1 },
          { id: 2, task: 1, answer: "Auf Wiedersehen", checked: false, correct_answer: "Guten Morgen", max_score: 0, score: 0, order: 2 },
          { id: 3, task: 1, answer: "Guten Morgen", checked: false, correct_answer: "Guten Morgen", max_score: 1, score: 0, order: 3 }
        ]
      }]
    }
  ],
  resources: [
    { id: 1, course_id: 1, courseName: "German Conversation A2", name: "Everyday conversation prompts", uploader: 1, uploader_name: "demo_teacher", file: "/static/demo-resources/german-conversation.txt" },
    { id: 2, course_id: 1, courseName: "German Conversation A2", name: "Speaking preparation checklist", uploader: 1, uploader_name: "demo_teacher", file: "/static/demo-resources/german-speaking.txt" },
    { id: 3, course_id: 2, courseName: "Introduction to Spanish", name: "Greetings and introductions", uploader: 1, uploader_name: "demo_teacher", file: "/static/demo-resources/spanish-greetings.txt" },
    { id: 4, course_id: 2, courseName: "Introduction to Spanish", name: "Beginner vocabulary worksheet", uploader: 1, uploader_name: "demo_teacher", file: "/static/demo-resources/spanish-vocabulary.txt" },
    { id: 5, course_id: 3, courseName: "Intercultural Communication", name: "Communication case study", uploader: 1, uploader_name: "demo_teacher", file: "/static/demo-resources/intercultural-case.txt" }
  ],
  messages: [{ id: 1, sender: 1, receiver: 2, text: "Welcome to your German conversation course!", date: "2026-11-12T16:00:00Z" }]
}
