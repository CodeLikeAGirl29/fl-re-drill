export interface FlashcardData {
  id: string;
  category: "Law" | "Principles" | "Brokerage" | "Finance";
  question: string;
  answer: string;
}

export const flashcards: FlashcardData[] = [
  {
    id: "fl-re-001",
    category: "Principles",
    question:
      "What is the primary purpose of the Florida Real Estate Commission (FREC)?",
    answer:
      "To protect the public through regulation and education of licensees.",
  },
  {
    id: "fl-re-002",
    category: "Law",
    question:
      "Which Florida Statute governs the administrative rules of the FREC?",
    answer: "Chapter 61J2.",
  },
  {
    id: "fl-re-003",
    category: "Principles",
    question:
      "How many days does a landlord have to return a security deposit if no claim is made?",
    answer: "15 days.",
  },
  {
    id: "fl-re-004",
    category: "Finance",
    question:
      "What is the homestead tax exemption for a property valued at $75,000 or more?",
    answer:
      "$50,000 (standard $25,000 plus an additional $25,000 for non-school taxes).",
  },
  {
    id: "fl-re-005",
    category: "Law",
    question: "Define 'Culpable Negligence' in Florida real estate.",
    answer:
      "Failing to use reasonable care or caution, even if the mistake was unintentional.",
  },
  {
    id: "fl-re-006",
    category: "Principles",
    question:
      "What is the size of a standard 'section' in a government survey system?",
    answer: "One square mile or 640 acres.",
  },
  {
    id: "fl-re-007",
    category: "Brokerage",
    question:
      "Which brokerage relationship is presumed in Florida unless otherwise stated?",
    answer: "Transaction Broker.",
  },
  {
    id: "fl-re-008",
    category: "Law",
    question:
      "What is the maximum fine the FREC can impose for a single violation?",
    answer: "$5,000 per violation.",
  },
  {
    id: "fl-re-009",
    category: "Principles",
    question: "How many acres are in a quarter-section?",
    answer: "160 acres.",
  },
  {
    id: "fl-re-010",
    category: "Principles",
    question:
      "What type of notice is provided by recording a document in the public records?",
    answer: "Constructive Notice.",
  },
  {
    id: "fl-re-011",
    category: "Law",
    question:
      "What are the three categories of real estate licenses in Florida?",
    answer: "Sales Associate, Broker, and Broker Associate.",
  },
  {
    id: "fl-re-012",
    category: "Principles",
    question:
      "How long is the rescission period for the purchase of a NEW condominium from a developer?",
    answer: "15 calendar days.",
  },
  {
    id: "fl-re-013",
    category: "Principles",
    question:
      "What is the right of a government to take private property for public use?",
    answer: "Eminent Domain.",
  },
  {
    id: "fl-re-014",
    category: "Finance",
    question:
      "What does the acronym 'P.I.T.I.' stand for in a mortgage payment?",
    answer: "Principal, Interest, Taxes, and Insurance.",
  },
  {
    id: "fl-re-015",
    category: "Law",
    question: "Which Florida Statute governs the Real Estate License Law?",
    answer: "Chapter 475.",
  },
  {
    id: "fl-re-016",
    category: "Brokerage",
    question:
      "What is the term for a property owner who does not reside on the property?",
    answer: "Absentee Owner.",
  },
  {
    id: "fl-re-017",
    category: "Law",
    question:
      "How long is the post-license education requirement for a new Sales Associate?",
    answer: "45 hours.",
  },
  {
    id: "fl-re-018",
    category: "Principles",
    question: "Define 'Steering' under the Fair Housing Act.",
    answer:
      "Channeling homeseekers to or away from particular neighborhoods based on race or religion.",
  },
  {
    id: "fl-re-019",
    category: "Brokerage",
    question: "What is a 'Kickback' in real estate?",
    answer:
      "An unearned fee paid for referrals; generally illegal under RESPA.",
  },
  {
    id: "fl-re-020",
    category: "Finance",
    question: "What is the secondary mortgage market's primary purpose?",
    answer:
      "To provide liquidity to the primary market by purchasing mortgages.",
  },
  {
    id: "fl-re-021",
    category: "Brokerage",
    question: "In a Single Agent relationship, what are the fiduciary duties?",
    answer: "Confidentiality, Obedience, Loyalty, and Full Disclosure (COLD).",
  },
  {
    id: "fl-re-022",
    category: "Principles",
    question: "What is 'Blockbusting'?",
    answer:
      "Persuading owners to sell by telling them minorities are moving into the area.",
  },
  {
    id: "fl-re-023",
    category: "Principles",
    question: "What is a 'Tenancy by the Entireties'?",
    answer: "A form of joint ownership specifically for married couples.",
  },
  {
    id: "fl-re-024",
    category: "Finance",
    question: "What is the 'Save Our Homes' amendment?",
    answer:
      "It limits the annual increase in assessed value of homesteaded property to 3% or the CPI.",
  },
  {
    id: "fl-re-025",
    category: "Finance",
    question: "How much is one 'point' in mortgage lending?",
    answer: "1% of the loan amount.",
  },
];
