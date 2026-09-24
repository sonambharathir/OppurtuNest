// OppurtuNest — Quick Skill Assessment Data
// 5 Core Skill Areas with 12 structured questions each (8 knowledge + 4 confidence)
// Generates authentic qualitative results: Starting, Developing, Comfortable, Strong

export const assessmentSkillAreas = [
  {
    id: "web-dev",
    number: "1",
    tag: "WEB",
    title: "Web Development",
    subtitle: "HTML, CSS, JavaScript, React, and Git fundamentals",
    description: "Assess your front-of-the-web foundations, component architecture, and modern developer workflow.",
    icon: "🌐",
    subSkills: ["HTML & CSS", "JavaScript", "React", "Git"],
    recommendedSkills: [
      {
        name: "TypeScript",
        reason: "Adds static typing to JavaScript, catching errors before runtime in modern codebases.",
        suggestion: "Try typing simple props and state in a small React component.",
      },
      {
        name: "Next.js",
        reason: "Industry-standard React framework offering server-side rendering, routing, and SEO optimization.",
        suggestion: "Build a small multi-page static portfolio using the App Router.",
      },
      {
        name: "Component Testing (Vitest / RTL)",
        reason: "Writing unit tests ensures your UI components remain reliable as features evolve.",
        suggestion: "Write tests for button click events and input changes.",
      },
    ],
    matchingOpportunities: [
      {
        id: "opp-web-1",
        title: "Frontend Development Intern",
        organization: "Starlight Tech Labs",
        category: "Internship",
        workMode: "Remote",
        location: "Bengaluru, India",
        duration: "2 months",
        stipend: "₹25,000 / month",
        matchLabel: "Strong match",
        skills: ["React", "JavaScript", "HTML & CSS", "Git"],
        description: "Build accessible, responsive web interfaces with modern React and reusable component patterns.",
      },
      {
        id: "opp-web-2",
        title: "Open Source Web Hackathon 2026",
        organization: "DevGlobal & OpenCampus",
        category: "Hackathon",
        workMode: "Remote",
        location: "Virtual",
        duration: "48 hours",
        stipend: "₹1,00,000 Prize Pool",
        matchLabel: "Good match",
        skills: ["JavaScript", "HTML & CSS", "React"],
        description: "Build an open-source tool for university students solving campus lifestyle or study challenges.",
      },
      {
        id: "opp-web-3",
        title: "React Web & Mobile Apprentice",
        organization: "Nexus Digital Systems",
        category: "Apprenticeship",
        workMode: "Hybrid",
        location: "Hyderabad, India",
        duration: "3 months",
        stipend: "₹20,000 / month",
        matchLabel: "Skill match",
        skills: ["React", "Git", "REST APIs"],
        description: "Collaborate with senior frontend engineers building customer portals with React.",
      },
    ],
  },
  {
    id: "programming",
    number: "2",
    tag: "CODE",
    title: "Programming",
    subtitle: "Fundamentals, logic, data structures, and problem solving",
    description: "Evaluate your core algorithmic thinking, object-oriented concepts, and debugging skills.",
    icon: "💻",
    subSkills: ["Programming Fundamentals", "Data Structures", "Python & Object-Oriented Code", "Problem Solving & Debugging"],
    recommendedSkills: [
      {
        name: "Algorithms & Time Complexity",
        reason: "Understanding Big-O notation helps you design efficient software that scales smoothly.",
        suggestion: "Practice analyzing the loop complexity of sorting algorithms.",
      },
      {
        name: "Test-Driven Development",
        reason: "Writing tests before logic clarifies requirements and reduces debugging time.",
        suggestion: "Implement a utility function using pytest or unittest.",
      },
      {
        name: "System Design Basics",
        reason: "Understanding how services, databases, and caches connect prepares you for engineering interviews.",
        suggestion: "Map out the architecture of a URL shortener service.",
      },
    ],
    matchingOpportunities: [
      {
        id: "opp-prog-1",
        title: "Junior Software Explorer Program",
        organization: "InnovateLabs India",
        category: "Internship",
        workMode: "Remote",
        location: "Pune, India",
        duration: "6 months",
        stipend: "₹30,000 / month",
        matchLabel: "Strong match",
        skills: ["Python", "Problem Solving", "Git"],
        description: "Hands-on guided rotation covering frontend development, basic APIs, and clean code practices.",
      },
      {
        id: "opp-prog-2",
        title: "National Student Code Championship",
        organization: "CodeNation League",
        category: "Competition",
        workMode: "Remote",
        location: "Online",
        duration: "1 week",
        stipend: "₹50,000 + Tech Interviews",
        matchLabel: "Good match",
        skills: ["Algorithms", "Problem Solving", "Python"],
        description: "Algorithmic problem-solving sprint testing data structures, efficiency, and code elegance.",
      },
    ],
  },
  {
    id: "ai-data",
    number: "3",
    tag: "AI",
    title: "AI & Data",
    subtitle: "Python, data analysis, SQL, and machine learning basics",
    description: "Explore your capabilities across data manipulation, database querying, and intelligent model concepts.",
    icon: "🧠",
    subSkills: ["Python for Data", "Data Handling & SQL", "Machine Learning Foundations", "Model Evaluation & Ethics"],
    recommendedSkills: [
      {
        name: "Deep Learning (PyTorch)",
        reason: "Standard industry framework for training neural networks, vision models, and language representations.",
        suggestion: "Train a simple feedforward neural network on the MNIST dataset.",
      },
      {
        name: "Data Visualization (Tableau/Seaborn)",
        reason: "Communicating insights visually is essential for driving business decisions from raw data.",
        suggestion: "Create an exploratory data dashboard highlighting distributions and outliers.",
      },
      {
        name: "Data Pipelines & ETL",
        reason: "Automating data cleaning and ingestion is required for real-world machine learning systems.",
        suggestion: "Build a script that fetches public weather data and loads it into a clean SQLite table.",
      },
    ],
    matchingOpportunities: [
      {
        id: "opp-ai-1",
        title: "AI Hackathon: NextGen Innovators",
        organization: "DevGlobal & OpenTech",
        category: "Hackathon",
        workMode: "Remote",
        location: "Virtual",
        duration: "48 hours",
        stipend: "₹1,50,000 Prize Pool",
        matchLabel: "Strong match",
        skills: ["Python", "Machine Learning", "Data Handling"],
        description: "Team up to create generative AI solutions for education and sustainable development.",
      },
      {
        id: "opp-ai-2",
        title: "Undergraduate ML Research Fellowship",
        organization: "Indo-Global AI Research Lab",
        category: "Research",
        workMode: "Hybrid",
        location: "Bengaluru, India",
        duration: "6 months",
        stipend: "₹30,000 / month",
        matchLabel: "Good match",
        skills: ["Python", "Machine Learning", "Research"],
        description: "Investigate multimodal computer vision models alongside senior faculty and postgrad researchers.",
      },
    ],
  },
  {
    id: "design",
    number: "4",
    tag: "DESIGN",
    title: "UI/UX & Design",
    subtitle: "UI principles, UX thinking, wireframing, and Figma tools",
    description: "Assess your design sensibilities, visual hierarchy, user journey mapping, and prototyping.",
    icon: "🎨",
    subSkills: ["UI Principles & Visual Hierarchy", "User Research & UX Flow", "Wireframing & Prototyping", "Design Systems & Accessibility"],
    recommendedSkills: [
      {
        name: "Design Systems & Tokens",
        reason: "Creating scalable color, typography, and spacing tokens bridges the gap between Figma and frontend code.",
        suggestion: "Build a mini component library with buttons, cards, and input fields in Figma.",
      },
      {
        name: "Usability Testing & Interviews",
        reason: "Authentic user research helps you validate design decisions and eliminate friction early.",
        suggestion: "Conduct 3 recorded user testing sessions on a campus mobile prototype.",
      },
      {
        name: "Micro-Interactions & Animation",
        reason: "Subtle feedback and motion enhance user delight and make digital products feel alive.",
        suggestion: "Use Figma Smart Animate to prototype a toggle switch and loading spinner.",
      },
    ],
    matchingOpportunities: [
      {
        id: "opp-des-1",
        title: "UI Design & Frontend Workshop",
        organization: "DesignWorks Academy",
        category: "Workshop",
        workMode: "Remote",
        location: "Online",
        duration: "2 weekends",
        stipend: "Certificate + Portfolio Piece",
        matchLabel: "Strong match",
        skills: ["Figma", "UI/UX Design", "Wireframing"],
        description: "Bridge design and code by translating Figma mockups into pixel-perfect responsive components.",
      },
      {
        id: "opp-des-2",
        title: "Product Design Apprentice",
        organization: "Studio Minimal",
        category: "Internship",
        workMode: "Remote",
        location: "Mumbai, India",
        duration: "3 months",
        stipend: "₹22,000 / month",
        matchLabel: "Good match",
        skills: ["Figma", "User Research", "Prototyping"],
        description: "Assist design leads with student journey mapping, component libraries, and client prototypes.",
      },
    ],
  },
  {
    id: "business",
    number: "5",
    tag: "BIZ",
    title: "Business & Management",
    subtitle: "Communication, teamwork, problem solving, and project planning",
    description: "Evaluate your stakeholder communication, Agile workflow understanding, and collaborative problem solving.",
    icon: "💼",
    subSkills: ["Communication & Stakeholders", "Project Planning & Agile", "Problem Solving & Analysis", "Team Collaboration & Leadership"],
    recommendedSkills: [
      {
        name: "Product Management Fundamentals",
        reason: "Translating customer pain points into prioritized product feature roadmaps is highly valued.",
        suggestion: "Draft a 1-page Product Requirement Document (PRD) for a student feature.",
      },
      {
        name: "Data-Driven Decision Making",
        reason: "Using metrics and conversion funnels to justify business decisions sets strategic leaders apart.",
        suggestion: "Analyze user retention or onboarding drop-off in a hypothetical scenario.",
      },
      {
        name: "Public Speaking & Pitching",
        reason: "Concise, persuasive presentation skills inspire teams and win over stakeholders and judges.",
        suggestion: "Prepare a 3-minute lightning pitch explaining a project value proposition.",
      },
    ],
    matchingOpportunities: [
      {
        id: "opp-biz-1",
        title: "Google Generation Scholarship (APAC)",
        organization: "Google",
        category: "Scholarship",
        workMode: "Remote",
        location: "Global / APAC",
        duration: "Academic Year 2026-27",
        stipend: "$1,000 Grant + Mentorship",
        matchLabel: "Strong match",
        skills: ["Communication", "Leadership", "Problem Solving"],
        description: "Financial assistance and community mentorship for undergraduate students demonstrating leadership.",
      },
      {
        id: "opp-biz-2",
        title: "Junior Product Operations Associate",
        organization: "GrowthPath Media",
        category: "Internship",
        workMode: "Hybrid",
        location: "Delhi, India",
        duration: "4 months",
        stipend: "₹24,000 / month",
        matchLabel: "Good match",
        skills: ["Agile Planning", "Communication", "Problem Solving"],
        description: "Collaborate across design and engineering teams to coordinate release schedules and student feedback.",
      },
    ],
  },
];

export const assessmentQuestionsByArea = {
  "web-dev": [
    {
      id: "wd-q1",
      skill: "HTML & CSS",
      type: "knowledge",
      question: "Which technology is primarily used to style and layout webpages?",
      options: ["JavaScript", "CSS", "Python", "Git"],
      correctAnswer: 1,
      explanation: "CSS (Cascading Style Sheets) is dedicated to styling, colors, layout, and visual presentation.",
    },
    {
      id: "wd-q2",
      skill: "HTML & CSS",
      type: "knowledge",
      question: "Which HTML element is the most semantically appropriate for a website's primary navigation links?",
      options: ["<div>", "<nav>", "<section>", "<span>"],
      correctAnswer: 1,
      explanation: "The <nav> element clearly conveys navigation landmark semantics to browsers and screen readers.",
    },
    {
      id: "wd-q3",
      skill: "HTML & CSS",
      type: "confidence",
      question: "How comfortable do you feel creating responsive layouts using Flexbox or CSS Grid?",
      options: [
        { text: "I'm just starting out with CSS layout models", points: 0 },
        { text: "I can build basic layouts with reference guides or documentation", points: 1 },
        { text: "I can structure responsive layouts independently", points: 2 },
        { text: "Very comfortable — I can design complex responsive grids easily", points: 3 },
      ],
    },
    {
      id: "wd-q4",
      skill: "JavaScript",
      type: "knowledge",
      question: "What does the array method `map()` return in JavaScript?",
      options: [
        "A single accumulated value",
        "A new array containing the results of transforming each element",
        "The index of the first matching element",
        "The original array modified in place",
      ],
      correctAnswer: 1,
      explanation: "The `map()` method creates a brand new array populated with the results of calling a provided function on every element.",
    },
    {
      id: "wd-q5",
      skill: "JavaScript",
      type: "knowledge",
      question: "Which keyword allows you to declare a block-scoped variable that can be reassigned later?",
      options: ["const", "let", "var", "function"],
      correctAnswer: 1,
      explanation: "`let` signals a block-scoped mutable variable, whereas `const` cannot be reassigned.",
    },
    {
      id: "wd-q6",
      skill: "JavaScript",
      type: "confidence",
      question: "How comfortable are you working with asynchronous JavaScript (Promises or `async/await`)?",
      options: [
        { text: "I'm still learning how asynchronous code behaves", points: 0 },
        { text: "I can follow examples to fetch and display API data", points: 1 },
        { text: "I can write async functions and handle error states independently", points: 2 },
        { text: "Very comfortable handling async data, race conditions, and loading states", points: 3 },
      ],
    },
    {
      id: "wd-q7",
      skill: "React",
      type: "knowledge",
      question: "In React, what is the primary purpose of a component's `state`?",
      options: [
        "To define static CSS colors",
        "To hold data that can change over time and trigger component re-renders",
        "To configure server database tables",
        "To register domain names",
      ],
      correctAnswer: 1,
      explanation: "State holds dynamic component data. Whenever state is updated, React re-renders the component to reflect changes.",
    },
    {
      id: "wd-q8",
      skill: "React",
      type: "knowledge",
      question: "Which React hook is used to declare and update local state in functional components?",
      options: ["useEffect", "useReducer", "useState", "useContext"],
      correctAnswer: 2,
      explanation: "`useState` is the foundational hook that returns a stateful value and a function to update it.",
    },
    {
      id: "wd-q9",
      skill: "React",
      type: "confidence",
      question: "How comfortable are you building a React component from scratch and passing data via props?",
      options: [
        { text: "I'm just beginning to explore React components", points: 0 },
        { text: "I can create basic components with guided examples", points: 1 },
        { text: "I can build modular components and manage props independently", points: 2 },
        { text: "Very comfortable architecting reusable components and custom hooks", points: 3 },
      ],
    },
    {
      id: "wd-q10",
      skill: "Git",
      type: "knowledge",
      question: "Which Git command records your staged snapshot to the local project history?",
      options: ["git push", "git commit", "git pull", "git status"],
      correctAnswer: 1,
      explanation: "`git commit` saves a snapshot of staged changes into your local repository history.",
    },
    {
      id: "wd-q11",
      skill: "Git",
      type: "knowledge",
      question: "What is the primary benefit of creating a Git branch for a new feature?",
      options: [
        "It permanently deletes older revisions",
        "It lets you work on changes in isolation without disrupting main project code",
        "It sends code directly to cloud production servers",
        "It reduces the size of video assets",
      ],
      correctAnswer: 1,
      explanation: "Branches isolate changes until they are reviewed, tested, and ready to be merged into main.",
    },
    {
      id: "wd-q12",
      skill: "Git",
      type: "confidence",
      question: "How comfortable are you collaborating on GitHub using branches, commits, and pull requests?",
      options: [
        { text: "I'm still getting comfortable with git commands", points: 0 },
        { text: "I can commit and push with reminders of commands", points: 1 },
        { text: "I can create branches, commit cleanly, and open PRs independently", points: 2 },
        { text: "Very comfortable managing branches, merging, and resolving conflicts", points: 3 },
      ],
    },
  ],

  "programming": [
    {
      id: "pr-q1",
      skill: "Programming Fundamentals",
      type: "knowledge",
      question: "What is the result of the integer division `7 // 2` in Python?",
      options: ["3.5", "3", "4", "Error"],
      correctAnswer: 1,
      explanation: "The `//` floor division operator discards the fractional part and returns integer 3.",
    },
    {
      id: "pr-q2",
      skill: "Programming Fundamentals",
      type: "knowledge",
      question: "Which control flow construct is best suited when code must repeat a known number of times?",
      options: ["for loop", "if-else statement", "switch case", "try-catch block"],
      correctAnswer: 0,
      explanation: "A `for` loop iterates over a fixed sequence or range of known length.",
    },
    {
      id: "pr-q3",
      skill: "Programming Fundamentals",
      type: "confidence",
      question: "How confident do you feel reading and writing core logic like loops, functions, and conditional branches?",
      options: [
        { text: "I'm still learning basic programming syntax", points: 0 },
        { text: "I understand logic conceptually with simple examples", points: 1 },
        { text: "I can write modular functions and algorithms independently", points: 2 },
        { text: "Very comfortable writing clean, efficient, well-structured logic", points: 3 },
      ],
    },
    {
      id: "pr-q4",
      skill: "Data Structures",
      type: "knowledge",
      question: "Which data structure follows a First-In, First-Out (FIFO) access order?",
      options: ["Stack", "Queue", "Binary Tree", "Hash Map"],
      correctAnswer: 1,
      explanation: "A Queue serves elements in the exact order they arrived (FIFO).",
    },
    {
      id: "pr-q5",
      skill: "Data Structures",
      type: "knowledge",
      question: "What is the average time complexity of looking up a key in a Hash Map (or Python dictionary)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      correctAnswer: 2,
      explanation: "Hash maps provide constant average time O(1) key lookups via hash indexing.",
    },
    {
      id: "pr-q6",
      skill: "Data Structures",
      type: "confidence",
      question: "How comfortable are you choosing between lists, sets, and dictionaries for storing data?",
      options: [
        { text: "I usually default to standard lists or arrays", points: 0 },
        { text: "I can choose the right structure with a little thought", points: 1 },
        { text: "I understand their tradeoffs and choose appropriately", points: 2 },
        { text: "Very comfortable analyzing time and space efficiency tradeoffs", points: 3 },
      ],
    },
    {
      id: "pr-q7",
      skill: "Python & Object-Oriented Code",
      type: "knowledge",
      question: "In Object-Oriented Programming, what is it called when a child class derives attributes from a parent class?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
      correctAnswer: 1,
      explanation: "Inheritance allows subclasses to inherit and extend methods and attributes of a base class.",
    },
    {
      id: "pr-q8",
      skill: "Python & Object-Oriented Code",
      type: "knowledge",
      question: "In Python, which method acts as the initializer constructor when an object is instantiated?",
      options: ["def __init__(self):", "def __start__(self):", "def __create__(self):", "def constructor():"],
      correctAnswer: 0,
      explanation: "`__init__` is Python's constructor method called immediately upon instance creation.",
    },
    {
      id: "pr-q9",
      skill: "Python & Object-Oriented Code",
      type: "confidence",
      question: "How comfortable are you designing and writing classes and methods to model real-world concepts?",
      options: [
        { text: "I haven't written many classes yet", points: 0 },
        { text: "I understand the concept but prefer procedural scripting", points: 1 },
        { text: "I can define classes and instantiate objects comfortably", points: 2 },
        { text: "Very comfortable applying object-oriented principles and clean architecture", points: 3 },
      ],
    },
    {
      id: "pr-q10",
      skill: "Problem Solving & Debugging",
      type: "knowledge",
      question: "When a program throws an 'IndexError' or 'IndexOutOfBounds', what is the typical root cause?",
      options: [
        "A variable name was misspelled",
        "The code attempted to access an element beyond the valid range of the collection",
        "The computer ran out of memory",
        "An infinite loop occurred",
      ],
      correctAnswer: 1,
      explanation: "Index errors happen when referencing an index less than 0 or greater than the collection length - 1.",
    },
    {
      id: "pr-q11",
      skill: "Problem Solving & Debugging",
      type: "knowledge",
      question: "What is the primary benefit of writing unit tests for your functions?",
      options: [
        "It makes the program compile faster",
        "It verifies functions produce expected outputs and prevents regressions",
        "It compresses code files automatically",
        "It guarantees zero server downtime",
      ],
      correctAnswer: 1,
      explanation: "Unit tests validate individual logic blocks and ensure future changes do not break existing functionality.",
    },
    {
      id: "pr-q12",
      skill: "Problem Solving & Debugging",
      type: "confidence",
      question: "When your code throws an error or unexpected output, how comfortable are you diagnosing it?",
      options: [
        { text: "Error messages often feel confusing or stressful", points: 0 },
        { text: "I can search error messages online to find clues", points: 1 },
        { text: "I read stack traces and use print statements comfortably", points: 2 },
        { text: "Very comfortable systematically isolating root causes with debuggers and tests", points: 3 },
      ],
    },
  ],

  "ai-data": [
    {
      id: "ai-q1",
      skill: "Python for Data",
      type: "knowledge",
      question: "Which Python library is the standard choice for multi-dimensional numerical array computation?",
      options: ["NumPy", "Flask", "Pygame", "BeautifulSoup"],
      correctAnswer: 0,
      explanation: "NumPy provides vector operations, multidimensional arrays, and fast mathematical functions.",
    },
    {
      id: "ai-q2",
      skill: "Python for Data",
      type: "knowledge",
      question: "In Pandas, what is the two-dimensional tabular data structure with labeled axes called?",
      options: ["Series", "DataFrame", "Tensor", "Matrix"],
      correctAnswer: 1,
      explanation: "A Pandas DataFrame represents tabular data arranged in rows and columns.",
    },
    {
      id: "ai-q3",
      skill: "Python for Data",
      type: "confidence",
      question: "How comfortable are you cleaning and preparing datasets using Pandas or NumPy?",
      options: [
        { text: "I'm new to data libraries in Python", points: 0 },
        { text: "I can run basic filtering and summary functions", points: 1 },
        { text: "I can clean missing values and manipulate columns comfortably", points: 2 },
        { text: "Very comfortable performing complex transformations, joins, and aggregations", points: 3 },
      ],
    },
    {
      id: "ai-q4",
      skill: "Data Handling & SQL",
      type: "knowledge",
      question: "Which SQL clause is used to filter records that satisfy a specific condition?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "LIMIT"],
      correctAnswer: 2,
      explanation: "The `WHERE` clause filters rows before grouping or ordering takes place.",
    },
    {
      id: "ai-q5",
      skill: "Data Handling & SQL",
      type: "knowledge",
      question: "What does an `INNER JOIN` in SQL return?",
      options: [
        "All rows from both tables unconditionally",
        "Only rows that have matching values in both tables",
        "All rows from the left table only",
        "A random subset of records",
      ],
      correctAnswer: 1,
      explanation: "`INNER JOIN` returns records where the join predicate matches in both the left and right tables.",
    },
    {
      id: "ai-q6",
      skill: "Data Handling & SQL",
      type: "confidence",
      question: "How comfortable do you feel writing SQL queries to extract insights from relational tables?",
      options: [
        { text: "I'm still learning fundamental SQL syntax", points: 0 },
        { text: "I can write basic SELECT and WHERE queries", points: 1 },
        { text: "I can write multi-table JOINs and aggregations independently", points: 2 },
        { text: "Very comfortable with complex subqueries, window functions, and indexing", points: 3 },
      ],
    },
    {
      id: "ai-q7",
      skill: "Machine Learning Foundations",
      type: "knowledge",
      question: "In Supervised Learning, what is the task called when predicting a continuous numerical value?",
      options: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"],
      correctAnswer: 1,
      explanation: "Regression predicts continuous numerical quantities (e.g. price, temperature), while classification predicts discrete labels.",
    },
    {
      id: "ai-q8",
      skill: "Machine Learning Foundations",
      type: "knowledge",
      question: "Why do data scientists split data into training and test sets?",
      options: [
        "To make file downloads faster",
        "To evaluate how well the trained model generalizes to new, unseen data",
        "To increase the total dataset size",
        "To prevent disk fragmentation",
      ],
      correctAnswer: 1,
      explanation: "Testing on a held-out set verifies that the model learned true patterns rather than just memorizing training examples.",
    },
    {
      id: "ai-q9",
      skill: "Machine Learning Foundations",
      type: "confidence",
      question: "How comfortable are you training a baseline machine learning model on structured data?",
      options: [
        { text: "I'm still exploring core machine learning concepts", points: 0 },
        { text: "I can train a model following an online tutorial", points: 1 },
        { text: "I can fit models, make predictions, and tune basic hyperparameters", points: 2 },
        { text: "Very comfortable with full end-to-end model pipelines and cross-validation", points: 3 },
      ],
    },
    {
      id: "ai-q10",
      skill: "Model Evaluation & Ethics",
      type: "knowledge",
      question: "What term describes a model that achieves near-perfect training accuracy but performs poorly on new test data?",
      options: ["Underfitting", "Overfitting", "Gradient descent", "Feature scaling"],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model captures random noise in the training set instead of underlying generalizable patterns.",
    },
    {
      id: "ai-q11",
      skill: "Model Evaluation & Ethics",
      type: "knowledge",
      question: "When evaluating an imbalanced dataset where false negatives are dangerous (e.g. disease diagnosis), which metric is critical?",
      options: ["Recall / Sensitivity", "File compression ratio", "Epoch count", "Learning rate"],
      correctAnswer: 0,
      explanation: "Recall measures the proportion of actual positive cases successfully identified, minimizing critical missed diagnoses.",
    },
    {
      id: "ai-q12",
      skill: "Model Evaluation & Ethics",
      type: "confidence",
      question: "How confident are you interpreting evaluation metrics (Precision, Recall, F1) beyond simple accuracy?",
      options: [
        { text: "I mostly rely on raw accuracy right now", points: 0 },
        { text: "I understand them conceptually with formulas", points: 1 },
        { text: "I can select appropriate metrics for different problem types", points: 2 },
        { text: "Very comfortable auditing models for bias, trade-offs, and edge cases", points: 3 },
      ],
    },
  ],

  "design": [
    {
      id: "de-q1",
      skill: "UI Principles & Visual Hierarchy",
      type: "knowledge",
      question: "Which technique is most effective for establishing visual hierarchy on a screen?",
      options: [
        "Using all capitalized text across the entire page",
        "Varying font sizes, weights, contrast, and spacing intentionally",
        "Filling every empty pixel with decorative graphics",
        "Using as many contrasting colors as possible",
      ],
      correctAnswer: 1,
      explanation: "Intentional variations in scale, weight, contrast, and whitespace guide user attention to the most important content first.",
    },
    {
      id: "de-q2",
      skill: "UI Principles & Visual Hierarchy",
      type: "knowledge",
      question: "What is the primary role of whitespace (negative space) in interface design?",
      options: [
        "Filling wasted browser space",
        "Providing breathing room, grouping related items, and reducing cognitive load",
        "Decreasing network bandwidth",
        "Satisfying browser margin defaults",
      ],
      correctAnswer: 1,
      explanation: "Whitespace separates unrelated elements, creates visual clarity, and makes interfaces effortless to scan.",
    },
    {
      id: "de-q3",
      skill: "UI Principles & Visual Hierarchy",
      type: "confidence",
      question: "How comfortable are you arranging typography and layout so the primary action is immediately obvious?",
      options: [
        { text: "I'm still developing my visual design eye", points: 0 },
        { text: "I can follow design templates or established patterns", points: 1 },
        { text: "I can structure cohesive visual hierarchy independently", points: 2 },
        { text: "Very comfortable creating polished, aesthetic, intentional layouts", points: 3 },
      ],
    },
    {
      id: "de-q4",
      skill: "User Research & UX Flow",
      type: "knowledge",
      question: "What is a 'User Journey Map' in UX design?",
      options: [
        "A GPS travel map for commuters",
        "A visual timeline of the steps and emotional touchpoints a user experiences to reach a goal",
        "A relational database schema",
        "A list of marketing email addresses",
      ],
      correctAnswer: 1,
      explanation: "User journey maps visualize the user's sequential steps, motivations, and pain points across an entire experience.",
    },
    {
      id: "de-q5",
      skill: "User Research & UX Flow",
      type: "knowledge",
      question: "What is the main goal of conducting usability testing on an early prototype?",
      options: [
        "Testing the user's internet connection speed",
        "Observing real users interacting with the design to uncover points of confusion",
        "Pitching the startup to venture capitalists",
        "Testing database indexing speeds",
      ],
      correctAnswer: 1,
      explanation: "Usability testing reveals whether users can accomplish their goals and where friction occurs in practice.",
    },
    {
      id: "de-q6",
      skill: "User Research & UX Flow",
      type: "confidence",
      question: "How comfortable do you feel mapping out user flows and identifying confusion points in an app?",
      options: [
        { text: "I usually jump straight into designing visual screens", points: 0 },
        { text: "I can sketch simple step-by-step wireflows", points: 1 },
        { text: "I can map out comprehensive user journeys and edge cases", points: 2 },
        { text: "Very comfortable conducting usability studies and streamlining friction", points: 3 },
      ],
    },
    {
      id: "de-q7",
      skill: "Wireframing & Prototyping",
      type: "knowledge",
      question: "What are low-fidelity wireframes primarily used for during the design process?",
      options: [
        "Final pixel-perfect client deliverables",
        "Quickly exploring layout ideas, content structure, and flow without visual distractions",
        "Testing server rendering benchmarks",
        "Exporting final print production files",
      ],
      correctAnswer: 1,
      explanation: "Low-fidelity wireframes allow rapid experimentation with page structure and user flow before investing time in visual details.",
    },
    {
      id: "de-q8",
      skill: "Wireframing & Prototyping",
      type: "knowledge",
      question: "In Figma, which feature allows components to dynamically resize and adapt as text or container sizes change?",
      options: ["Auto Layout", "Pen Tool", "Masking", "Rasterize"],
      correctAnswer: 0,
      explanation: "Auto Layout automatically controls padding, gap spacing, and responsive resizing inside frames.",
    },
    {
      id: "de-q9",
      skill: "Wireframing & Prototyping",
      type: "confidence",
      question: "How comfortable are you using modern tools like Figma to create clickable prototypes?",
      options: [
        { text: "I'm just beginning to explore design tools", points: 0 },
        { text: "I can create basic static artboards and shapes", points: 1 },
        { text: "I can build interactive clickable prototypes with components", points: 2 },
        { text: "Very comfortable leveraging components, variants, and smart animations", points: 3 },
      ],
    },
    {
      id: "de-q10",
      skill: "Design Systems & Accessibility",
      type: "knowledge",
      question: "According to WCAG guidelines, why is color contrast between text and background critical?",
      options: [
        "To save device battery power",
        "To ensure text remains readable for users with visual impairments or varying screen brightness",
        "To make stylesheets compress better",
        "To increase browser caching speeds",
      ],
      correctAnswer: 1,
      explanation: "Adequate contrast ensures readability for individuals with low vision, color blindness, or in high-glare environments.",
    },
    {
      id: "de-q11",
      skill: "Design Systems & Accessibility",
      type: "knowledge",
      question: "What are design tokens in a design system?",
      options: [
        "Cryptocurrency reward tokens for designers",
        "Named variables (like colors, spacing, and font sizes) that synchronize design and code",
        "Temporary preview passwords",
        "Stock icon licenses",
      ],
      correctAnswer: 1,
      explanation: "Design tokens are the single source of truth for design decisions (e.g. `color-brand-primary`) across platforms.",
    },
    {
      id: "de-q12",
      skill: "Design Systems & Accessibility",
      type: "confidence",
      question: "How comfortable are you designing inclusive interfaces with accessible tap targets and readable text?",
      options: [
        { text: "Accessibility is still new to me", points: 0 },
        { text: "I know the basic principles and check contrast occasionally", points: 1 },
        { text: "I actively check accessibility guidelines during design", points: 2 },
        { text: "Very comfortable designing systematic, fully WCAG-compliant design systems", points: 3 },
      ],
    },
  ],

  "business": [
    {
      id: "biz-q1",
      skill: "Communication & Stakeholders",
      type: "knowledge",
      question: "When presenting technical progress to non-technical stakeholders, what is the best practice?",
      options: [
        "Explain internal algorithms and line-by-line code",
        "Focus on user impact, milestone outcomes, and clear next steps",
        "Avoid sharing progress until the entire product is finished",
        "Use technical jargon to sound authoritative",
      ],
      correctAnswer: 1,
      explanation: "Stakeholders care about user value, timeline impact, and actionable decisions rather than low-level implementation details.",
    },
    {
      id: "biz-q2",
      skill: "Communication & Stakeholders",
      type: "knowledge",
      question: "What is active listening in team communication?",
      options: [
        "Waiting for your turn to speak without paying attention",
        "Fully focusing, understanding, and summarizing key points to ensure alignment",
        "Taking audio recordings silently without speaking",
        "Multitasking while attending team meetings",
      ],
      correctAnswer: 1,
      explanation: "Active listening fosters trust and mutual understanding by verifying what was communicated before proposing solutions.",
    },
    {
      id: "biz-q3",
      skill: "Communication & Stakeholders",
      type: "confidence",
      question: "How comfortable do you feel explaining a project or concept clearly to someone outside your field?",
      options: [
        { text: "I often struggle to find simple non-technical terms", points: 0 },
        { text: "I can explain it if given time to prepare notes", points: 1 },
        { text: "I can articulate ideas clearly and adapt to the audience", points: 2 },
        { text: "Very comfortable presenting compelling, concise summaries to any stakeholder", points: 3 },
      ],
    },
    {
      id: "biz-q4",
      skill: "Project Planning & Agile",
      type: "knowledge",
      question: "In Agile methodology, what is a 'Sprint'?",
      options: [
        "A physical race during team retreats",
        "A time-boxed iteration (usually 1-2 weeks) where a team delivers focused deliverables",
        "An unchangeable multi-year contract",
        "An annual compensation review cycle",
      ],
      correctAnswer: 1,
      explanation: "Sprints provide regular, incremental delivery cycles that allow teams to inspect and adapt quickly.",
    },
    {
      id: "biz-q5",
      skill: "Project Planning & Agile",
      type: "knowledge",
      question: "What is the primary purpose of a Daily Standup meeting in Agile?",
      options: [
        "To micro-manage how many minutes each person worked",
        "To briefly align on progress, today's goals, and any blockers preventing work",
        "To conduct long architecture debates",
        "To assign blame for delayed tasks",
      ],
      correctAnswer: 1,
      explanation: "Standups keep everyone informed of daily momentum and surface roadblocks early so team members can unblock each other.",
    },
    {
      id: "biz-q6",
      skill: "Project Planning & Agile",
      type: "confidence",
      question: "How comfortable are you breaking down a large semester project into prioritized milestones?",
      options: [
        { text: "I tend to work on tasks as they come without a structured plan", points: 0 },
        { text: "I can make simple to-do lists for upcoming deadlines", points: 1 },
        { text: "I can break down complex deliverables into roadmap phases and track them", points: 2 },
        { text: "Very comfortable managing scope, dependencies, and team timelines", points: 3 },
      ],
    },
    {
      id: "biz-q7",
      skill: "Problem Solving & Analysis",
      type: "knowledge",
      question: "What is the '5 Whys' technique used for in problem analysis?",
      options: [
        "Conducting customer surveys with 5 questions",
        "Iteratively asking 'why' to drill down from surface symptoms to the root cause",
        "Listing 5 rival company features",
        "Evaluating 5 job candidates",
      ],
      correctAnswer: 1,
      explanation: "By asking 'why' repeatedly, teams uncover the underlying systemic cause rather than just patching surface symptoms.",
    },
    {
      id: "biz-q8",
      skill: "Problem Solving & Analysis",
      type: "knowledge",
      question: "In a SWOT analysis, which two components represent external market influences?",
      options: [
        "Strengths and Weaknesses",
        "Opportunities and Threats",
        "Strengths and Opportunities",
        "Weaknesses and Threats",
      ],
      correctAnswer: 1,
      explanation: "Strengths and Weaknesses are internal factors; Opportunities and Threats stem from the external landscape.",
    },
    {
      id: "biz-q9",
      skill: "Problem Solving & Analysis",
      type: "confidence",
      question: "When faced with an ambiguous challenge or unexpected bottleneck, how confident are you structuring an actionable plan?",
      options: [
        { text: "I usually wait for explicit instructions from a lead or mentor", points: 0 },
        { text: "I can brainstorm ideas once the problem is clarified", points: 1 },
        { text: "I can analyze alternatives and propose practical solutions independently", points: 2 },
        { text: "Very confident synthesizing data, weighing trade-offs, and driving solutions", points: 3 },
      ],
    },
    {
      id: "biz-q10",
      skill: "Team Collaboration & Leadership",
      type: "knowledge",
      question: "What is 'psychological safety' in a team culture?",
      options: [
        "Having security personnel on site",
        "A climate where team members feel safe taking risks, asking questions, and admitting mistakes without fear of humiliation",
        "Discouraging open debate on project ideas",
        "Eliminating all project deadlines",
      ],
      correctAnswer: 1,
      explanation: "Psychological safety encourages honest feedback, creative innovation, and collaborative problem-solving without fear.",
    },
    {
      id: "biz-q11",
      skill: "Team Collaboration & Leadership",
      type: "knowledge",
      question: "When constructive disagreements arise within a team, which mindset produces the best outcome?",
      options: [
        "Winning the debate at all costs",
        "Focusing on shared goals, separating people from the problem, and seeking collaborative win-win solutions",
        "Ignoring the conflict completely",
        "Demanding immediate escalation to executive management",
      ],
      correctAnswer: 1,
      explanation: "Focusing on common objectives and problem-solving rather than personal defense creates durable alignment.",
    },
    {
      id: "biz-q12",
      skill: "Team Collaboration & Leadership",
      type: "confidence",
      question: "How comfortable are you giving and receiving constructive peer feedback on project deliverables?",
      options: [
        { text: "Giving or receiving feedback makes me uncomfortable", points: 0 },
        { text: "I can provide feedback if asked directly", points: 1 },
        { text: "I actively seek feedback and share supportive, actionable critique", points: 2 },
        { text: "Very comfortable facilitating candid, empathetic peer reviews that elevate the team", points: 3 },
      ],
    },
  ],
};

// Calculates qualitative results from the student's actual answers
export function calculateAssessmentResults(skillAreaId, userAnswers) {
  const area = assessmentSkillAreas.find((a) => a.id === skillAreaId) || assessmentSkillAreas[0];
  const questions = assessmentQuestionsByArea[area.id] || [];

  const skillScores = {};
  area.subSkills.forEach((subSkill) => {
    skillScores[subSkill] = {
      name: subSkill,
      knowledgeCorrect: 0,
      knowledgeTotal: 0,
      confidenceScore: 0,
    };
  });

  questions.forEach((q) => {
    const selectedIdx = userAnswers[q.id];
    if (selectedIdx === undefined || selectedIdx === null) return;

    const skillGroup = skillScores[q.skill];
    if (!skillGroup) return;

    if (q.type === "knowledge") {
      skillGroup.knowledgeTotal += 1;
      if (selectedIdx === q.correctAnswer) {
        skillGroup.knowledgeCorrect += 1;
      }
    } else if (q.type === "confidence") {
      const optionPoints = q.options[selectedIdx]?.points ?? selectedIdx;
      skillGroup.confidenceScore = optionPoints;
    }
  });

  // Calculate qualitative tier for each subSkill:
  // Points: knowledgeCorrect (0-2) + confidenceScore (0-3) = 0 to 5
  // Tier thresholds:
  // 0-1 -> Starting
  // 2 -> Developing
  // 3-4 -> Comfortable
  // 5 -> Strong
  const snapshot = Object.values(skillScores).map((item) => {
    const totalPoints = item.knowledgeCorrect + item.confidenceScore;
    let level = "Starting";
    let levelClass = "level-starting";

    if (totalPoints >= 5) {
      level = "Strong";
      levelClass = "level-strong";
    } else if (totalPoints >= 3) {
      level = "Comfortable";
      levelClass = "level-comfortable";
    } else if (totalPoints >= 2) {
      level = "Developing";
      levelClass = "level-developing";
    } else {
      level = "Starting";
      levelClass = "level-starting";
    }

    return {
      skill: item.name,
      level,
      levelClass,
      knowledgeScore: `${item.knowledgeCorrect}/${item.knowledgeTotal}`,
    };
  });

  const recommendedSkills = area.recommendedSkills || [];
  const opportunities = area.matchingOpportunities || [];

  return {
    skillArea: area.title,
    skillAreaId: area.id,
    snapshot,
    recommendedSkills,
    opportunities,
    completedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}
