import type { Lens, Tag } from "@/components/portfolio/lens";

export const profile = {
  name: "Kshitij Mahajan",
  location: "Sharon, MA",
  email: "kshitijmahajan.ngp@gmail.com",
  linkedin: "https://linkedin.com/in/kshitij-mahajan-17814221a",
  github: "https://github.com/kshitijm23",
  resume: "/kshitij-mahajan-resume.pdf",
};

export const stats = [
  { value: 93, prefix: "", suffix: "%", decimals: 0, caption: "NYS Algebra Regents passing rate for my students" },
  { value: 248, prefix: "1 of ", suffix: "", decimals: 0, caption: "Success Academy Excellence Award recipients across roughly 2,900 employees" },
  { value: 20, prefix: "", suffix: "+", decimals: 0, caption: "Industry workshops and technical training programs organized with tech companies" },
  { value: 15, prefix: "", suffix: "+", decimals: 0, caption: "Concurrent training engagements managed" },
  { value: 60, prefix: "", suffix: "%", decimals: 0, caption: "Rise in student placement rates during my time as Training and Placement Head" },
  { value: 3.92, prefix: "", suffix: "", decimals: 2, caption: "GPA, M.S. Computer Science, Pace University" },
];

export type Role = {
  id: string;
  title: string;
  org: string;
  place: string;
  dates: string;
  bullets: { text: string; tags: Tag[] }[];
};

export const roles: Role[] = [
  {
    id: "zeta",
    title: "High School STEM Teacher",
    org: "Zeta Charter Schools",
    place: "New York, NY",
    dates: "Jul 2026 - Aug 2026",
    bullets: [
      {
        text: "Designed and delivered physics instruction for a founding high school program, translating abstract technical concepts into scaffolded, sequenced lessons for learners with no prior background.",
        tags: ["T"],
      },
      {
        text: "Built classroom systems and routines from the ground up, defining entry procedures, workspace standards, and explicit success criteria.",
        tags: ["T", "P"],
      },
    ],
  },
  {
    id: "success",
    title: "Mathematics Teacher (7th Grade Algebra)",
    org: "Success Academy Charter Schools",
    place: "New York, NY",
    dates: "Jul 2025 - Jul 2026",
    bullets: [
      {
        text: "Planned and delivered daily instructor-led Algebra sessions for 47 students, adjusting pacing and delivery in real time based on comprehension checks.",
        tags: ["T"],
      },
      {
        text: "Ran ongoing needs analysis with exit-ticket, quiz, and interim assessment data to pinpoint skill gaps and choose the right intervention (reteaching, more practice, or new instruction), contributing to a 93% NYS Algebra Regents passing rate.",
        tags: ["T", "P"],
      },
      {
        text: "Measured instructional impact at multiple levels, from session engagement to retained application in later units and cohort outcomes, and revised materials based on what the data showed.",
        tags: ["T", "P"],
      },
      {
        text: "Built AI-powered internal tools that auto-generated assessments and differentiated practice, cutting prep time and increasing the volume of usable student performance data.",
        tags: ["T", "P", "E"],
      },
      {
        text: "Recipient of the Success Academy Excellence Award, one of 248 recipients across a network of about 2,900 employees.",
        tags: ["T", "P", "E"],
      },
    ],
  },
  {
    id: "hspm",
    title: "Contract Software Developer",
    org: "HSPM Solutions LLP",
    place: "Pune, India",
    dates: "Apr 2022 - Jul 2023",
    bullets: [
      {
        text: "Built full-stack web application features with React, Node.js, Express.js, and REST APIs across Agile delivery cycles, owning each feature from requirements through release.",
        tags: ["E", "P"],
      },
      {
        text: "Took part in structured code review and owned version control and release coordination in GitHub, enforcing team conventions and catching defects before production.",
        tags: ["E", "P"],
      },
    ],
  },
  {
    id: "tnp",
    title: "Training & Placement Head / Student Council President",
    org: "Rajiv Gandhi College of Engineering",
    place: "Nagpur, India",
    dates: "May 2020 - May 2022",
    bullets: [
      {
        text: "Planned and ran 20+ industry workshops and technical training programs with leading tech companies, scoping content jointly with external partners and seeing each one through to delivery.",
        tags: ["T", "P"],
      },
      {
        text: "Partnered with recruiting companies to understand the skills they needed, then translated those requirements into structured, transferable learning plans.",
        tags: ["T", "P"],
      },
      {
        text: "Reviewed each learning plan with faculty for validation and curriculum alignment, then delivered the seminars alongside the student team.",
        tags: ["T"],
      },
      {
        text: "Managed 15+ concurrent training engagements, coordinating between faculty and industry representatives, while student placement rates rose 60%.",
        tags: ["T", "P"],
      },
    ],
  },
];

export const roleOrder: Record<Lens, string[]> = {
  training: ["success", "tnp", "zeta", "hspm"],
  product: ["tnp", "success", "hspm", "zeta"],
  engineering: ["hspm", "success", "zeta", "tnp"],
};

export const skillGroups: { title: string; tags: Tag[]; skills: string[] }[] = [
  {
    title: "Technical Training & Enablement",
    tags: ["T"],
    skills: [
      "Needs Analysis",
      "Skill-Gap Identification",
      "Instructional Design",
      "Curriculum Development",
      "Instructor-Led Training",
      "Hands-On Workshop Facilitation",
      "Self-Serve Learning Resources",
      "Learning Impact Measurement",
      "Content Maintenance",
    ],
  },
  {
    title: "Collaboration & Delivery",
    tags: ["P"],
    skills: [
      "Cross-Functional Collaboration",
      "Stakeholder Communication",
      "External Partner Coordination",
      "Requirements Gathering",
      "Agile/Scrum",
      "Sprint Planning",
      "Release Coordination",
      "Change Management",
      "Concurrent Project Management",
      "Presentation",
    ],
  },
  {
    title: "Languages & Frameworks",
    tags: ["E"],
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "SQL",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
    ],
  },
  {
    title: "Tools & Platforms",
    tags: ["E"],
    skills: [
      "Git/GitHub",
      "Docker",
      "Jenkins (CI/CD)",
      "Supabase/PostgreSQL",
      "Firebase",
      "REST APIs",
      "LaTeX",
      "Authentication & Access Control",
      "Technical Documentation",
    ],
  },
];

export const learningLoop = [
  { step: "Assess", detail: "Exit tickets, quizzes, and interim assessments every day" },
  { step: "Diagnose", detail: "Pinpoint the specific skill gap, not just the wrong answer" },
  {
    step: "Choose the intervention",
    detail: "Reteach, add targeted practice, or move to new instruction",
  },
  {
    step: "Measure",
    detail: "Check engagement, immediate results, and whether the skill held up in later units",
  },
  { step: "Revise", detail: "Update materials and delivery based on what the data showed" },
];

export const concepts = ["APIs", "Retrieval-Augmented Generation", "CI/CD"] as const;
export const audiences = ["Complete beginner", "New team member", "Engineer"] as const;

export const explanations: Record<string, Record<string, string>> = {
  APIs: {
    "Complete beginner":
      "An API is like a restaurant menu. You do not walk into the kitchen, you pick something from a short list of things the kitchen agrees to make, and it comes back the same way every time. Software talks to other software the same way, through a menu of allowed requests.",
    "New team member":
      "An API is the agreed contract between our app and another service, so you never have to know how that service works inside. It matters for your work because if you follow the contract your code keeps working when the other team changes their internals, and when something breaks you can tell whose side it broke on.",
    Engineer:
      "An API is a versioned interface that defines endpoints, request and response schemas, authentication, error semantics, and rate limits. In a REST setup that means resource paths, HTTP verbs, status codes, and idempotency expectations, so callers can be written against the contract instead of the implementation.",
  },
  "Retrieval-Augmented Generation": {
    "Complete beginner":
      "Imagine asking a very well read friend a question about your own notebook. If they answer from memory alone they might guess. If you hand them the notebook first and ask them to answer using only those pages, the answer gets a lot more trustworthy. That handing over of the notebook is the retrieval part.",
    "New team member":
      "Retrieval-Augmented Generation means we search our own documents first and give the model that text before it answers. It matters for your work because it is how we keep answers tied to the source material we control, and when an answer looks wrong the first place to look is what got retrieved, not the model.",
    Engineer:
      "RAG pairs a retriever with a generator. Source documents are chunked and embedded into a vector index, the query is embedded and matched by similarity, and the top passages are injected into the prompt context with instructions to answer from them. Quality is driven mostly by chunking strategy, retrieval recall, and reranking, and grounding cuts hallucination but does not eliminate it.",
  },
  "CI/CD": {
    "Complete beginner":
      "Think of a bakery line where every tray gets checked before it reaches the shelf. As soon as someone changes a recipe, the line runs the checks and, if everything passes, the tray goes out to customers automatically. No one has to remember to do it by hand.",
    "New team member":
      "Continuous integration runs our tests and checks on every change, and continuous delivery pushes passing changes out automatically. It matters for your work because small frequent commits get feedback in minutes, and a red pipeline is a signal to stop and fix rather than a formality to override.",
    Engineer:
      "CI runs build, lint, type checks, and test suites on every push against a clean environment so integration problems surface immediately. CD promotes the resulting artifact through environments with automated gates, config kept outside the image, and a rollback path, which keeps deploys small, repeatable, and reversible.",
  },
};

export const education = [
  {
    degree: "M.S., Computer Science",
    school: "Pace University, Seidenberg School",
    place: "New York, NY",
    detail: "GPA 3.92 / 4.0",
    date: "May 2025",
  },
  {
    degree: "B.E., Computer Science & Engineering",
    school: "Rajiv Gandhi College of Engineering",
    place: "Nagpur, India",
    detail: "GPA 9.5 / 10",
    date: "May 2022",
  },
];
