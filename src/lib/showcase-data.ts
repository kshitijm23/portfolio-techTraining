/**
 * Data for the "Selected work" 3D carousel.
 * Everything shown in the cards and the expanded case studies lives here,
 * so copy can be edited without touching component code.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "flow"; items: string[] }
  | { kind: "steps"; items: { label: string; title: string; body?: string }[] }
  | { kind: "table"; head: [string, string]; rows: [string, string][] }
  | { kind: "pairs"; items: { term: string; def: string }[] }
  | { kind: "list"; items: string[] }
  | { kind: "note"; text: string }
  | { kind: "code"; text: string }
  | { kind: "screens"; items: { label: string; body: string }[] }
  | { kind: "quote"; text: string };

export type VisualType =
  | "typography"
  | "explainer"
  | "lms"
  | "analytics"
  | "product"
  | "workflow"
  | "roadmap"
  | "systemmap"
  | "dashboard"
  | "editorial";

export type PortfolioItem = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  tags?: string[];
  visualType: VisualType;
  /** Short strings used by the card face visual. */
  cardContent: { headline?: string; terms?: string[]; flow?: string[]; note?: string; lines?: string[] };
  caseStudy: { headline: string; blocks: Block[]; link?: { label: string; href: string }[] };
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "complex-clear",
    number: "01",
    category: "Philosophy",
    title: "Complex \u2192 Clear",
    subtitle: "Turning difficult ideas into something people can understand, remember, and use.",
    visualType: "typography",
    cardContent: {
      terms: ["API", "CI/CD", "Threat Modeling", "Authentication", "Dependencies", "Linear Regression", "AI"],
      flow: ["Understand", "Deconstruct", "Connect", "Demonstrate", "Practice", "Apply"],
    },
    caseStudy: {
      headline: "Complexity isn't the problem. How we introduce it is.",
      blocks: [
        {
          kind: "p",
          text: "Whether I am explaining linear regression to students, introducing a technical workflow, or designing learning around software concepts, I start with the same question.",
        },
        { kind: "quote", text: "What does the learner actually need to understand in order to do something differently?" },
        {
          kind: "p",
          text: "I break complex topics into mental models, examples, demonstrations, practice, and feedback before introducing unnecessary terminology.",
        },
        { kind: "h", text: "The process" },
        {
          kind: "steps",
          items: [
            { label: "01", title: "Understand the learner", body: "What do they already know? What are they trying to accomplish?" },
            { label: "02", title: "Find the essential idea", body: "Strip away everything that is not necessary yet." },
            { label: "03", title: "Build a mental model", body: "Use analogies, diagrams, examples, and demonstrations." },
            { label: "04", title: "Let them practice", body: "Learning should require the learner to actually do something." },
            { label: "05", title: "Check understanding", body: "Questions, scenarios, demonstrations, or exit tickets." },
            { label: "06", title: "Improve", body: "Use feedback and performance data to redesign the experience." },
          ],
        },
        { kind: "h", text: "A small example" },
        {
          kind: "pairs",
          items: [
            { term: "Authentication", def: "Who are you?" },
            { term: "Authorization", def: "What are you allowed to do?" },
          ],
        },
      ],
    },
  },
  {
    id: "teaching-technical",
    number: "02",
    category: "Technical Education",
    title: "Teaching Technical Concepts",
    subtitle: "Intuition first. Terminology second.",
    tags: ["Explainers", "Developer education"],
    visualType: "explainer",
    cardContent: { lines: ["API", "Git", "Authentication", "CI/CD"] },
    caseStudy: {
      headline: "Technical doesn't have to mean complicated.",
      blocks: [
        {
          kind: "p",
          text: "The first explanation is rarely the most technical one. I prefer to build intuition first and terminology second.",
        },
        { kind: "h", text: "API" },
        { kind: "p", text: "Technical idea: an API allows software systems to communicate through defined requests and responses." },
        {
          kind: "p",
          text: "How I would introduce it: think of a restaurant. You do not walk into the kitchen and prepare your own meal. You tell the waiter what you want. The waiter carries the request to the kitchen and brings the response back.",
        },
        { kind: "flow", items: ["You", "API", "System"] },
        {
          kind: "pairs",
          items: [
            { term: "GET", def: "ask for something" },
            { term: "POST", def: "create something" },
            { term: "PUT / PATCH", def: "change something" },
            { term: "DELETE", def: "remove something" },
          ],
        },
        { kind: "h", text: "Git branches" },
        { kind: "code", text: "main    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25cf\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25cf\n           \\\nfeature   \u25cf\u2500\u2500\u25cf\u2500\u2500\u25cf" },
        {
          kind: "p",
          text: "A branch lets you work on a change without immediately changing the version everyone else relies on.",
        },
        { kind: "h", text: "Authentication vs authorization" },
        {
          kind: "pairs",
          items: [
            { term: "Authentication", def: "Who are you? An ID check." },
            { term: "Authorization", def: "What are you allowed to do? An access wristband." },
          ],
        },
        { kind: "h", text: "CI/CD" },
        { kind: "flow", items: ["Developer pushes code", "Automated build", "Automated tests", "Quality checks", "Deployment"] },
        {
          kind: "p",
          text: "CI/CD reduces the manual effort required to repeatedly validate and release software changes.",
        },
      ],
    },
  },
  {
    id: "learning-design",
    number: "03",
    category: "Learning Design",
    title: "Learning Experience Design",
    subtitle: "Designing training for performance, not completion.",
    tags: ["Instructional design", "Microlearning"],
    visualType: "lms",
    cardContent: {
      headline: "Secure Code Review",
      lines: ["Spot the Risk", "12 min"],
      flow: ["Scenario", "Learn", "Practice", "Check"],
      note: "Concept learning experience",
    },
    caseStudy: {
      headline: "Training should help someone perform, not simply finish a course.",
      blocks: [
        { kind: "h", text: "1. Performance goal" },
        { kind: "p", text: "Instead of: understand secure code reviews." },
        {
          kind: "quote",
          text: "After the training, the learner should be able to identify common security risks during a code review and explain why the code should be changed.",
        },
        { kind: "h", text: "2. Context" },
        {
          kind: "p",
          text: "Place the learner in a realistic situation. You are reviewing a pull request before release. One function builds a database query using raw user input. Would you approve it?",
        },
        { kind: "h", text: "The rest of the design" },
        {
          kind: "steps",
          items: [
            { label: "03", title: "Minimal instruction", body: "Explain only what the learner needs at that moment." },
            { label: "04", title: "Guided example" },
            { label: "05", title: "Learner decision" },
            { label: "06", title: "Feedback" },
            { label: "07", title: "Knowledge check" },
          ],
        },
        { kind: "h", text: "Mock module" },
        {
          kind: "screens",
          items: [
            { label: "Screen 1", body: "You're reviewing this pull request." },
            { label: "Screen 2", body: "query = \"SELECT * FROM users WHERE name = '\" + input + \"'\"" },
            { label: "Screen 3", body: "What concerns you most? A. Function name  B. User input used directly in query  C. Variable naming  D. File length" },
            { label: "Screen 4", body: "Correct. Unvalidated input can allow an attacker to modify the intended database query." },
            { label: "Screen 5", body: "What would you recommend instead?" },
          ],
        },
        { kind: "note", text: "Concept sample built to show the design approach, not a client deliverable." },
      ],
    },
  },
  {
    id: "algebra",
    number: "04",
    category: "Learning Analytics",
    title: "Algebra Class Transformation",
    subtitle: "Using data to find where learning was actually breaking down.",
    tags: ["Assessment", "Intervention design"],
    visualType: "analytics",
    cardContent: {
      headline: "47 learners. One question: where is the learning breaking down?",
      flow: ["Diagnostic", "Targeted Practice", "Reteach", "Reassessment"],
    },
    caseStudy: {
      headline: "Assessment data is only useful if it changes what happens next.",
      blocks: [
        {
          kind: "p",
          text: "Students were expected to solve increasingly complex algebra problems, but assessment patterns showed that many errors were caused by prerequisite skills and misconceptions rather than the new algebra concept itself.",
        },
        { kind: "flow", items: ["Assess", "Find patterns", "Identify misconception", "Reteach", "Practice", "Assess again"] },
        { kind: "p", text: "Different students could fail the same algebra problem for very different reasons." },
        {
          kind: "list",
          items: [
            "Some understood the equation structure but struggled with fraction operations.",
            "Others could calculate correctly but struggled to translate verbal situations into equations.",
          ],
        },
        { kind: "p", text: "They required different interventions." },
        { kind: "note", text: "Display labels below are qualitative. No exact figures beyond what is published elsewhere on this site." },
        { kind: "h", text: "What this taught me about technical learning" },
        { kind: "p", text: "Poor performance does not automatically mean more training. Sometimes:" },
        {
          kind: "list",
          items: [
            "prerequisite knowledge is missing",
            "instructions are unclear",
            "learners understand the concept but cannot apply it",
            "the workflow itself creates friction",
          ],
        },
        { kind: "p", text: "Effective learning design starts by identifying which problem actually exists." },
      ],
    },
  },
  {
    id: "prompt2print",
    number: "05",
    category: "AI + EdTech",
    title: "Prompt2Print",
    subtitle: "From a teaching idea to a printable worksheet in minutes.",
    tags: ["AI", "EdTech", "Learning Tools", "Product Design"],
    visualType: "product",
    cardContent: {
      headline: "Create 8 questions on solving two-step equations for Grade 7. Start simple and gradually increase difficulty.",
      flow: ["Teacher prompt", "AI generation", "Printable PDF"],
    },
    caseStudy: {
      headline: "Reducing the work around teaching so educators can focus on the learning.",
      blocks: [
        { kind: "h", text: "Problem" },
        {
          kind: "p",
          text: "Creating differentiated worksheets requires more than writing questions. Teachers also need to structure difficulty, format equations, arrange the page, create answer keys, and prepare everything for printing.",
        },
        { kind: "h", text: "Core idea" },
        {
          kind: "p",
          text: "Prompt2Print converts a natural-language teacher request into structured educational content, turns it into LaTeX, and produces a printable PDF.",
        },
        {
          kind: "flow",
          items: ["Teacher prompt", "AI content generation", "Structured questions", "LaTeX generation", "PDF", "Edit / save / print"],
        },
        { kind: "h", text: "The learning design part" },
        {
          kind: "p",
          text: "Building the technology was only part of the challenge. The larger question was how to translate a teacher's intent into useful instructional material. A request such as give me fraction practice is incomplete. Difficulty, progression, cognitive load, quantity, and expected learner behavior all influence whether the worksheet is actually useful.",
        },
        { kind: "note", text: "Card visual is a placeholder frame. Real product screenshots can be dropped in later." },
      ],
      link: [
        { label: "View full project", href: "https://prompt2print.vercel.app" },
        { label: "GitHub", href: "https://github.com/kshitijm23/Prompt2Print" },
      ],
    },
  },
  {
    id: "ai-for-learning",
    number: "06",
    category: "AI + Learning",
    title: "AI for Learning",
    subtitle: "Use AI to reduce the busywork, not the thinking.",
    tags: ["AI enablement", "Teaching workflow"],
    visualType: "workflow",
    cardContent: { flow: ["Plan", "Create", "Teach", "Assess", "Analyze", "Adapt"] },
    caseStudy: {
      headline: "AI should give educators more time to understand learners.",
      blocks: [
        {
          kind: "p",
          text: "My interest in AI for education is not replacing the teacher. It is reducing repetitive work around teaching so more time can go toward understanding what learners need.",
        },
        {
          kind: "steps",
          items: [
            { label: "Plan", title: "Generate lesson structures or examples" },
            { label: "Create", title: "Generate practice material and worksheets" },
            { label: "Assess", title: "Create quizzes or exit tickets" },
            { label: "Analyze", title: "Identify common patterns and misconceptions" },
            { label: "Adapt", title: "Generate differentiated practice" },
          ],
        },
        { kind: "h", text: "A scenario" },
        {
          kind: "p",
          text: "A class finishes a lesson on linear equations. Instead of manually creating an exit ticket, the teacher generates five questions aligned to the day's objective. Student responses reveal that most errors happen when negative numbers are introduced. The next day's practice can then focus specifically on that misconception.",
        },
      ],
    },
  },
  {
    id: "training-placement",
    number: "07",
    category: "Enablement",
    title: "Training & Placement",
    subtitle: "Turning employer requirements into learner readiness.",
    tags: ["Enablement", "Curriculum", "Facilitation"],
    visualType: "roadmap",
    cardContent: {
      flow: ["Employer need", "Skill requirements", "Learning plan", "Practice", "Mock assessment", "Interview ready"],
    },
    caseStudy: {
      headline: "Different opportunities required different preparation. One-size-fits-all training did not work.",
      blocks: [
        {
          kind: "p",
          text: "As part of Training and Placement, I worked with students preparing for companies with different hiring requirements. Some opportunities emphasized programming fundamentals, particular technologies, aptitude, communication, technical interviews, or role-specific preparation. The work involved translating employer expectations into targeted learning and practice.",
        },
        {
          kind: "table",
          head: ["Employer requirement", "Training response"],
          rows: [
            ["Python fundamentals", "Topic review and coding exercises"],
            ["Aptitude screening", "Timed practice and problem-solving strategy"],
            ["Technical interview", "Mock interviews"],
            ["Communication", "Speaking and interview simulations"],
            ["Role understanding", "Job briefing and expectations"],
          ],
        },
        {
          kind: "flow",
          items: ["Employer conversation", "Requirement mapping", "Learner gap", "Training", "Practice", "Feedback"],
        },
      ],
    },
  },
  {
    id: "hearts-paws",
    number: "08",
    category: "Product Leadership",
    title: "Hearts & Paws",
    subtitle: "Turning stakeholder needs into something a 10-person team could build.",
    tags: ["Product Management", "Cross-functional", "React", "Node", "PostgreSQL"],
    visualType: "systemmap",
    cardContent: { flow: ["Stakeholder", "Requirements", "Backlog", "Design", "Development", "QA", "Release"] },
    caseStudy: {
      headline: "Building the product meant translating between people who spoke very different languages.",
      blocks: [
        {
          kind: "p",
          text: "Stakeholders describe problems in terms of what they need. Developers think in systems and implementation. Designers think in interactions. QA thinks in expected and unexpected behavior. Product work sits between those perspectives.",
        },
        { kind: "flow", items: ["Stakeholder", "Requirements", "Backlog", "Design", "Development", "QA", "Release"] },
        { kind: "h", text: "The translation" },
        {
          kind: "steps",
          items: [
            { label: "Stakeholder", title: "We need an easier way to manage this." },
            { label: "Product", title: "Users need this capability within this workflow." },
            { label: "Engineering", title: "Build the endpoint, UI state, validation, and data model required to support it." },
          ],
        },
        { kind: "h", text: "My role" },
        {
          kind: "list",
          items: [
            "requirements",
            "backlog organization",
            "sprint planning",
            "stakeholder communication",
            "coordinating a 10-person team",
            "feature validation",
            "delivery",
          ],
        },
        { kind: "note", text: "No product screenshot available for this project, so the card uses a system map instead." },
      ],
    },
  },
  {
    id: "feedback",
    number: "09",
    category: "Measurement",
    title: "Feedback \u2192 Better Training",
    subtitle: "Course completion is not the same as learning.",
    tags: ["Measurement", "Evaluation"],
    visualType: "dashboard",
    cardContent: { lines: ["Did they attend?", "Can they do it?"] },
    caseStudy: {
      headline: "Completion tells me someone reached the final screen. It does not tell me whether learning happened.",
      blocks: [
        { kind: "flow", items: ["Train", "Check", "Observe", "Diagnose", "Adjust", "Recheck"] },
        { kind: "h", text: "Four levels of evidence" },
        {
          kind: "steps",
          items: [
            { label: "Reaction", title: "Did learners find it useful?" },
            { label: "Knowledge", title: "Can they explain the concept?" },
            { label: "Application", title: "Can they make the right decision in a realistic situation?" },
            { label: "Performance", title: "Is behavior actually improving?" },
          ],
        },
        { kind: "h", text: "Example scenario" },
        {
          kind: "note",
          text: "Example scenario, not my historical results: a secure coding module has 95% course completion, but only 42% correctly identify the risky code example.",
        },
        {
          kind: "p",
          text: "The solution is not automatically to repeat the course. The next step is to determine whether the issue is knowledge, practice, tooling, workflow, or unclear expectations, and then adjust the intervention.",
        },
      ],
    },
  },
  {
    id: "about",
    number: "10",
    category: "About",
    title: "About Me",
    subtitle: "Engineer. Educator. Builder. Communicator.",
    visualType: "editorial",
    cardContent: {
      lines: [
        "I learned to code.",
        "Then I learned to teach.",
        "Somewhere in between, I realized I love translating between the two.",
      ],
      note: "Photo placeholders, ready for your images",
    },
    caseStudy: {
      headline: "Understand something deeply. Find what matters. Make it clear.",
      blocks: [
        { kind: "p", text: "I started in computer science because I liked understanding how things worked." },
        {
          kind: "p",
          text: "Teaching showed me something I enjoyed even more: helping someone else understand how something worked.",
        },
        {
          kind: "p",
          text: "Since then, my work has moved across software development, product leadership, mathematics education, AI tools, and training. They may look like different experiences on a resume. To me, they are variations of the same work.",
        },
        { kind: "quote", text: "Understand something deeply. Find what matters. Make it clear. Help someone use it." },
        {
          kind: "steps",
          items: [
            { label: "Builder", title: "Full-stack development, AI tools, product systems, and technical workflows." },
            { label: "Educator", title: "Instruction, assessment, learning interventions, curriculum, and learning experience design." },
            { label: "Communicator", title: "Training, leadership, facilitation, public speaking, and live performance." },
          ],
        },
        {
          kind: "p",
          text: "What I'm interested in: Technical Learning, Developer Education, Learning Experience Design, Enablement, AI-assisted Learning.",
        },
      ],
    },
  },
];
