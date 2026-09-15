export interface Project {
  id: string;
  title: string;
  status: "BUILDING" | "COMPLETED";
  tagline: string;
  description: string;
  pipeline?: string;
  techStack: string[];
  team?: string[];
  teamName?: string;
  problemStatement?: string;
  achievement?: string;
  links: {
    github?: string;
    live?: string;
    presentation?: string;
  };
}

export const projects: Project[] = [
  {
    id: "mandex",
    title: "MandeX",
    status: "BUILDING",
    tagline: "Making merchants ready for AI buyers.",
    description:
      "A merchant-side infrastructure layer. Merchant Data → Commerce Passport → MCP Tools → Buyer Mandate + Merchant Policy → Razorpay → Verification → Decision Receipt + Audit. The core principle: LLM proposes. Deterministic rules authorize. Razorpay executes.",
    techStack: [
      "FastAPI",
      "Python",
      "SQLite",
      "React",
      "TypeScript",
      "Tailwind",
      "Vite",
      "Firebase Auth",
      "Gemini",
      "MCP Python SDK",
      "Razorpay Orders API",
    ],
    links: {
      github: "https://github.com/jatin-encrypted/MandeX",
      live: "ADD_LIVE_LINK",
    },
  },
  {
    id: "spin2x",
    title: "Spin2X",
    status: "COMPLETED",
    tagline: "Decentralized Spin-the-Wheel Game on Monad.",
    description:
      "On-chain game loop with provably fair randomness via keccak256(blockhash, sender). Chain detection/switching for Monad Testnet, hook-based React Native frontend, MetaMask wallet integration.",
    techStack: [
      "React Native",
      "Solidity",
      "ethers.js",
      "Hardhat",
      "Monad Testnet",
      "Docker",
      "MetaMask",
    ],
    links: {
      github: "https://github.com/jatin-encrypted/Spin2x-Dapp",
      live: "https://spin2x-dapp.vercel.app/",
    },
  },
  {
    id: "lowkey-secure",
    title: "LowKey Secure",
    status: "COMPLETED",
    tagline: "Privacy-First Event Access & Identity Platform.",
    description:
      "Consent-driven identity and event access with tiered RBAC, privacy risk classification, and anonymized attendance tracking. Includes an AI Privacy Advisor powered by Llama-3 via Groq that reasons over aggregate statistics only — never raw attendee data.",
    techStack: ["React 19", "FastAPI", "SQLite", "JWT", "RSA-256", "Tailwind"],
    links: {
      github: "https://github.com/Jay-Dosi/LowKey-secure",
      live: "https://lowkey-secure-noe9.onrender.com/login",
    },
  },
  {
    id: "isro-varna",
    title: "ISRO Bharatiya Antariksh Hackathon 2026 — VARNA",
    status: "COMPLETED",
    tagline: "Making infrared satellite imagery easier to interpret.",
    description:
      "VARNA was our attempt to make infrared satellite imagery easier to interpret. Since raw IR images are essentially colorless, we built a pipeline that enhances the imagery and generates meaningful color representations while using a geospatial AI model to check that the generated colors remain grounded in the original data.",
    pipeline:
      "IR Image → IRSRMamba Super-Resolution → Brownian Bridge Diffusion → Prithvi-EO-2.0 validation",
    techStack: [
      "IRSRMamba",
      "Brownian Bridge Diffusion",
      "Prithvi-EO-2.0",
      "Python",
    ],
    team: ["Jatin Kukreja", "Vaibhav Tandon", "Pari Goyal", "Jay Dosi"],
    teamName: "Sleep Deprived Syntax",
    problemStatement: "PS-10",
    achievement:
      "Selected by ISRO's Space Applications Centre for a direct Solution Review with ISRO evaluators.",
    links: {
      presentation: "ADD_PRESENTATION_LINK",
    },
  },
];

export interface Experience {
  organization: string;
  subtitle: string;
  role: string;
  period: string;
  description: string | null;
}

export const experience: Experience[] = [
  {
    organization: "Cipher LNMIIT",
    subtitle: "Cyber Security & Blockchain Club",
    role: "Web3 Domain Member",
    period: "2024–2026",
    description: null,
  },
];

export interface Leadership {
  role: string;
  period: string;
  description: string | null;
}

export const leadership: Leadership[] = [
  {
    role: "Basketball Club Coordinator",
    period: "2026–Present",
    description: null,
  },
];

export interface TechCategory {
  category: string;
  skills: string[];
}

export const techStackCategories: TechCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript (ES6+)", "Solidity", "SQL", "HTML/CSS"],
  },
  {
    category: "Frameworks / Libraries",
    skills: [
      "React",
      "React Native",
      "FastAPI",
      "Streamlit",
      "Tailwind",
      "Vite",
      "ethers.js",
      "SQLAlchemy",
      "Pydantic",
      "scikit-learn",
    ],
  },
  {
    category: "Security / Auth",
    skills: ["Firebase Auth", "JWT", "RBAC", "Bcrypt", "RSA-256", "SHA-256"],
  },
  {
    category: "Databases",
    skills: ["SQLite", "PostgreSQL"],
  },
  {
    category: "AI / ML",
    skills: ["Gemini API", "Vertex AI", "HuggingFace Transformers", "PyTorch", "Groq"],
  },
  {
    category: "Web3 / Dev Tools",
    skills: ["Hardhat", "Foundry", "Git", "GitHub", "Docker", "EAS Build"],
  },
];

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/jatin-encrypted", icon: "GithubLogo" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jatin-kukreja-833883m/", icon: "LinkedinLogo" },
  { name: "X", href: "https://x.com/Jatink_8", icon: "XLogo" },
  { name: "Email", href: "mailto:jkukreja407@gmail.com", icon: "EnvelopeSimple" },
];

export const isRealLink = (value?: string | null): boolean => {
  return Boolean(
    value &&
    !value.startsWith("ADD_") &&
    !value.includes("ADD_") &&
    value.trim() !== ""
  );
};
