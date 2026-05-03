export type Category =
  | "License Law and Qualifications"
  | "Real Estate Commission Rules"
  | "Authorized Relationships and Disclosures"
  | "Brokerage Activities and Procedures"
  | "Violations and Penalties"
  | "Property Rights and Ownership"
  | "Titles, Deeds, and Restrictions"
  | "Real Estate Contracts"
  | "Residential Mortgages and Finance"
  | "Appraisal and Property Value"
  | "Real Estate Taxes and Investment"
  | "Planning, Zoning, and Hazards"
  | "Math Calculations";

export interface Question {
  id: string; // Added this property
  cat: Category;
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  isMarked?: boolean;
}

export const questions: Question[] = [
  {
    id: "q1",
    cat: "Residential Mortgages and Finance",
    q: "In a 'Title Theory' state, which party retains the equitable title during the mortgage period?",
    options: ["The mortgagee", "The mortgagor", "The trustee", "The vendor"],
    correct: 1,
    explanation:
      "Key Point: In Title Theory states, the lender (mortgagee) holds legal title, while the borrower (mortgagor) retains equitable title. Note: Florida is a Lien Theory state where the borrower holds both.",
  },
  {
    id: "q2",
    cat: "Real Estate Contracts",
    q: "Which of the following activities is considered the 'practice of law' and is prohibited for a sales associate who is not an attorney?",
    options: [
      "Filling in blanks on a pre-printed sales contract",
      "Drafting a contract from scratch",
      "Assisting with a Florida Supreme Court approved lease",
      "Using a pre-printed listing agreement",
    ],
    correct: 1,
    explanation:
      "Key Point: Drafting a contract between two parties is considered the practice of law; sales associates may only fill in blanks on forms drafted by attorneys.",
  },
  {
    id: "q3",
    cat: "Authorized Relationships and Disclosures",
    q: "What type of agency relationship is illegal in the state of Florida?",
    options: [
      "Single Agency",
      "Transaction Brokerage",
      "Dual Agency",
      "No Brokerage Relationship",
    ],
    correct: 2,
    explanation:
      "Key Point: Florida Stat. § 475.278(1)(a) explicitly prohibits a licensee from acting as a dual agent. You must either represent one party as a Single Agent or both parties as a Transaction Broker.",
  },
  {
    id: "q4",
    cat: "Math Calculations",
    q: "If a buyer has a loan of $275,000 and the lender charges a 2% loan origination fee, what is the dollar amount of the fee?",
    options: ["$2,750", "$5,500", "$4,125", "$6,000"],
    correct: 1,
    explanation:
      "Calculation: The loan origination fee is calculated by multiplying the loan amount by the percentage: $275,000 x 0.02 = $5,500.",
  },
  {
    id: "q5",
    cat: "Real Estate Taxes and Investment",
    q: "What is the common range for the percentage of a purchase price allocated to land, which cannot be depreciated?",
    options: ["5% to 10%", "10% to 15%", "20% to 25%", "30% to 40%"],
    correct: 1,
    explanation:
      "Key Point: It is common practice to allocate between 10% and 15% of the purchase price to the land, as land cannot be depreciated.",
  },
  {
    id: "q6",
    cat: "License Law and Qualifications",
    q: "To become a licensed Florida real estate broker, a sales associate must have been registered as active for at least how many months during the preceding five years?",
    options: ["12 months", "18 months", "24 months", "36 months"],
    correct: 2,
    explanation:
      "Key Point: Applicants must show proof of being registered as an active sales associate for at least 24 months during the preceding five years.",
  },
  {
    id: "q7",
    cat: "Titles, Deeds, and Restrictions",
    q: "Where would a real estate professional most likely find the legal description of a property?",
    options: [
      "The property's mailing address",
      "A utility bill",
      "A deed of conveyance",
      "A homeowner's association flyer",
    ],
    correct: 2,
    explanation:
      "Key Point: Legal descriptions appear in deeds of conveyance, mortgages, and title insurance policies.",
  },
  {
    id: "q8",
    cat: "Math Calculations",
    q: "An acre of land contains how many square feet?",
    options: ["40,000", "43,560", "45,000", "48,200"],
    correct: 1,
    explanation: "Calculation: An acre of land contains 43,560 square feet.",
  },
  {
    id: "q9",
    cat: "Residential Mortgages and Finance",
    q: "What is 'hypothecation' in the context of residential mortgages?",
    options: [
      "The transfer of title to a third party",
      "Pledging property as collateral without giving up possession",
      "The process of foreclosing on a property",
      "The payment of discount points to lower interest rates",
    ],
    correct: 1,
    explanation:
      "Key Point: Hypothecation is the pledging of property as collateral for a loan.",
  },
  {
    id: "q10",
    cat: "Real Estate Contracts",
    q: "A homeowner's association disclosure must inform the buyer that failure to receive the summary before signing makes the contract:",
    options: [
      "Void",
      "Voidable by the buyer",
      "Enforceable only by the seller",
      "Subject to automatic extension",
    ],
    correct: 1,
    explanation:
      "Key Point: Not receiving the homeowner's disclosure summary makes the contract voidable by the buyer.",
  },
  {
    id: "q11",
    cat: "Violations and Penalties",
    q: "Within how many days must a licensee report a conviction or plea of nolo contendere to the FREC?",
    options: ["10 days", "15 days", "30 days", "60 days"],
    correct: 2,
    explanation:
      "Key Point: A licensee must report a conviction or plea of nolo contendere of any crime in any jurisdiction within 30 days.",
  },
  {
    id: "q12",
    cat: "Property Rights and Ownership",
    q: "Which type of lien is considered second in priority only to property taxes?",
    options: [
      "Mortgage lien",
      "Special assessment lien",
      "Mechanic's lien",
      "Income tax lien",
    ],
    correct: 1,
    explanation:
      "Key Point: Special Assessment Liens are second in priority to property taxes.",
  },
  {
    id: "q13",
    cat: "License Law and Qualifications",
    q: "Which of the following is a requirement for a Florida sales associate applicant?",
    options: [
      "Must be a Florida resident",
      "Must be a U.S. citizen",
      "Must have a high school diploma or equivalent",
      "Must be at least 21 years old",
    ],
    correct: 2,
    explanation:
      "Key Point: Applicants must be at least 18 years old and have a high school diploma or equivalent. Florida residency and U.S. citizenship are not requirements.",
  },
  {
    id: "q14",
    cat: "Real Estate Commission Rules",
    q: "The FREC consists of seven members. How many of these members must be licensed brokers with at least five years of experience?",
    options: ["Two", "Three", "Four", "Five"],
    correct: 2,
    explanation:
      "Key Point: The Commission is comprised of four brokers (active for 5 years), one broker or sales associate (active for 2 years), and two consumer members.",
  },
  {
    id: "q15",
    cat: "Authorized Relationships and Disclosures",
    q: "In which authorized brokerage relationship is the licensee required to provide 'Limited Confidentiality'?",
    options: [
      "Single Agent",
      "Transaction Broker",
      "No Brokerage Relationship",
      "Dual Agent",
    ],
    correct: 1,
    explanation:
      "Key Point: A transaction broker provides limited representation to a buyer, a seller, or both, which includes the duty of limited confidentiality.",
  },
  {
    id: "q16",
    cat: "Brokerage Activities and Procedures",
    q: "A sales associate receives an earnest money deposit on Monday. By what day must the broker deposit the funds into an escrow account?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correct: 2,
    explanation:
      "Key Point: The sales associate must deliver the deposit to the broker by the end of the next business day (Tuesday). The broker must deposit it by the end of the third business day after receipt (Thursday).",
  },
  {
    id: "q17",
    cat: "Violations and Penalties",
    q: "Which of the following is considered a third-degree felony under Florida real estate law?",
    options: [
      "Operating without a valid and current license",
      "Filing a false application for licensure",
      "Stealing a real estate exam",
      "All of the above",
    ],
    correct: 3,
    explanation:
      "Key Point: Unlicensed activity, filing false applications, and theft of an exam are all classified as third-degree felonies.",
  },
  {
    id: "q18",
    cat: "Property Rights and Ownership",
    q: "What type of tenancy is characterized by the 'right of survivorship'?",
    options: [
      "Tenancy in common",
      "Joint tenancy",
      "Tenancy at will",
      "Tenancy at sufferance",
    ],
    correct: 1,
    explanation:
      "Key Point: Joint tenancy includes the right of survivorship, meaning if one owner dies, their interest passes to the surviving owner(s).",
  },
  {
    id: "q19",
    cat: "Titles, Deeds, and Restrictions",
    q: "Which clause in a deed contains the 'to have and to hold' wording and specifies the type of estate being conveyed?",
    options: [
      "Granting clause",
      "Habendum clause",
      "Redendum clause",
      "Seisin clause",
    ],
    correct: 1,
    explanation:
      "Key Point: The Habendum clause begins with 'to have and to hold' and defines the bundle of legal rights being transferred.",
  },
  {
    id: "q20",
    cat: "Real Estate Contracts",
    q: "Under the Statute of Frauds, which of the following real estate contracts must be in writing to be enforceable?",
    options: [
      "A 6-month lease",
      "A listing agreement for 3 months",
      "An option contract",
      "A buyer representation agreement for 1 month",
    ],
    correct: 2,
    explanation:
      "Key Point: The Statute of Frauds requires purchase and sale contracts, option contracts, and leases for more than one year to be in writing.",
  },
  {
    id: "q21",
    cat: "Residential Mortgages and Finance",
    q: "What is the purpose of a 'Defeasance Clause' in a mortgage?",
    options: [
      "It allows the lender to accelerate the debt upon default.",
      "It prevents the borrower from selling the property without paying the loan.",
      "It requires the lender to release the mortgage lien once the debt is paid in full.",
      "It allows the borrower to pay off the loan early without penalty.",
    ],
    correct: 2,
    explanation:
      "Key Point: The defeasance clause 'defeats' the prior right of the lender to the property once the mortgage is paid.",
  },
  {
    id: "q22",
    cat: "Appraisal and Property Value",
    q: "The principle of 'Substitution' is the primary basis for which appraisal approach?",
    options: [
      "Cost Approach",
      "Income Approach",
      "Sales Comparison Approach",
      "Depreciation Approach",
    ],
    correct: 2,
    explanation:
      "Key Point: The Sales Comparison Approach relies on the principle of substitution: a prudent buyer will pay no more for a property than the cost of an equally desirable substitute.",
  },
  {
    id: "q23",
    cat: "Real Estate Taxes and Investment",
    q: "For a primary residence, what is the maximum standard Homestead exemption amount for a property valued over $75,000?",
    options: ["$25,000", "$50,000", "$75,000", "$100,000"],
    correct: 1,
    explanation:
      "Key Point: The first $25,000 applies to all taxes; the second $25,000 applies to city and county taxes (but not school taxes) for properties valued over $75,000.",
  },
  {
    id: "q24",
    cat: "Planning, Zoning, and Hazards",
    q: "A 'Variance' is typically requested when a property owner:",
    options: [
      "Wants to change the zoning of an entire neighborhood.",
      "Suffers a hardship due to current zoning that is unique to their specific land.",
      "Wants to build a commercial building in a residential area.",
      "Wants to subdivide a large tract of land.",
    ],
    correct: 1,
    explanation:
      "Key Point: A variance is granted when a property owner can prove that strict enforcement of zoning creates an undue hardship.",
  },
  {
    id: "q25",
    cat: "Math Calculations",
    q: "A property is sold for $200,000. How much are the documentary stamp taxes on the deed? (Rate: $0.70 per $100)",
    options: ["$700", "$1,400", "$2,000", "$14,000"],
    correct: 1,
    explanation:
      "Calculation: ($200,000 / 100) * 0.70 = 2,000 * 0.70 = $1,400.",
  },
  {
    id: "q26",
    cat: "Titles, Deeds, and Restrictions",
    q: "Which type of deed provides the greatest protection to the grantee?",
    options: [
      "Quitclaim deed",
      "Special warranty deed",
      "General warranty deed",
      "Bargain and sale deed",
    ],
    correct: 2,
    explanation:
      "Key Point: The General Warranty deed is the most common type of deed and provides the most comprehensive protection to the buyer.",
  },
  {
    id: "q27",
    cat: "Real Estate Contracts",
    q: "Which of the following is an example of a unilateral contract?",
    options: [
      "An exclusive right of sale listing",
      "A purchase and sale agreement",
      "An option contract",
      "A lease agreement",
    ],
    correct: 2,
    explanation:
      "Key Point: An option contract is unilateral because only one party (the optionor) is legally bound to perform if the other party chooses to exercise the option.",
  },
  {
    id: "q28",
    cat: "Math Calculations",
    q: "How many acres are in the following legal description: The NW 1/4 of the NE 1/4 of the SW 1/4 of Section 10?",
    options: ["5 acres", "10 acres", "20 acres", "40 acres"],
    correct: 1,
    explanation:
      "Calculation: : Start with 640 acres (a full section) and divide by the denominators: 640 / 4 / 4 / 4 = 10 acres.",
  },
  {
    id: "q29",
    cat: "Residential Mortgages and Finance",
    q: "What is the primary difference between a FHA loan and a VA loan?",
    options: [
      "FHA loans are guaranteed while VA loans are insured.",
      "FHA loans are insured while VA loans are guaranteed.",
      "VA loans require a 3.5% down payment.",
      "FHA loans are only for luxury properties.",
    ],
    correct: 1,
    explanation:
      "Key Point: FHA (Federal Housing Administration) insures loans, whereas the VA (Department of Veterans Affairs) guarantees loans for eligible veterans.",
  },
  {
    id: "q30",
    cat: "Real Estate Taxes and Investment",
    q: "When property taxes are delinquent in Florida, what is the first step in the collection process?",
    options: [
      "A foreclosure lawsuit is filed.",
      "A tax certificate is auctioned to the lowest interest rate bidder.",
      "The property is immediately sold at a public sheriff's sale.",
      "The owner is evicted from the property.",
    ],
    correct: 1,
    explanation:
      "Key Point: If property taxes are not paid, a tax certificate is issued and auctioned off. Bidders compete by offering the lowest interest rate they will accept.",
  },
  {
    id: "q31",
    cat: "Planning, Zoning, and Hazards",
    q: "What is the name of the strip of land that separates one land use from another, such as a park between a residential and commercial area?",
    options: ["Setback", "Easement", "Buffer zone", "Encroachment"],
    correct: 2,
    explanation:
      "Key Point: A buffer zone is a neutral space, like a park or greenbelt, used to separate conflicting land uses.",
  },
  {
    id: "q32",
    cat: "Property Rights and Ownership",
    q: "An individual who has been granted the right to use a property for the duration of their life holds which type of estate?",
    options: [
      "Fee simple estate",
      "Life estate",
      "Estate for years",
      "Tenancy at will",
    ],
    correct: 1,
    explanation:
      "Key Point: A life estate is a freehold estate limited in duration to the life of the owner or another designated person.",
  },
  {
    id: "q33",
    cat: "Brokerage Activities and Procedures",
    q: "Which of the following is a requirement for a broker's business sign at the entrance of the office?",
    options: [
      "The name of the brokerage and the name of at least one broker.",
      "The names of all sales associates employed at the branch.",
      "The phone number and email address of the broker.",
      "The license numbers of every licensee in the firm.",
    ],
    correct: 0,
    explanation:
      "Key Point: The sign must contain the name of the broker, the trade name (if any), and the words 'Licensed Real Estate Broker' or 'Lic. Real Estate Broker'.",
  },
  {
    id: "q34",
    cat: "Authorized Relationships and Disclosures",
    q: "Which disclosure notice must be signed by the buyer and seller in a non-residential transaction where the parties have assets of $1 million or more?",
    options: [
      "Consent to Transition to Transaction Broker",
      "Designated Sales Associate notice",
      "Single Agent Notice",
      "No Brokerage Relationship notice",
    ],
    correct: 1,
    explanation:
      "Key Point: In non-residential transactions where both parties have assets of $1 million or more, the broker may designate separate sales associates to act as single agents for each party.",
  },
  {
    id: "q35",
    cat: "Violations and Penalties",
    q: "What is the maximum administrative fine the FREC can impose for a single violation of Chapter 475?",
    options: ["$1,000", "$2,500", "$5,000", "$10,000"],
    correct: 2,
    explanation:
      "Key Point: The Florida Real Estate Commission may impose an administrative fine of up to $5,000 per violation.",
  },
  {
    id: "q36",
    cat: "Math Calculations",
    q: "A seller wants to net $150,000 after paying a 6% commission. What must the property sell for?",
    options: ["$159,000", "$159,574", "$160,000", "$162,340"],
    correct: 1,
    explanation:
      "Calculation: Net Amount / (100% - Commission %) = $150,000 / 0.94 = $159,574.47.",
  },
  {
    id: "q37",
    cat: "Appraisal and Property Value",
    q: "The loss in value due to a poorly designed floor plan is known as:",
    options: [
      "Physical deterioration",
      "Functional obsolescence",
      "External obsolescence",
      "Economic depreciation",
    ],
    correct: 1,
    explanation:
      "Key Point: Functional obsolescence refers to a loss in value due to factors within the property, such as an outdated design or poor layout.",
  },
  {
    id: "q38",
    cat: "Real Estate Contracts",
    q: "Which of the following is NOT a required element of a valid real estate contract?",
    options: [
      "Offer and acceptance",
      "Consideration",
      "Notarization",
      "Legality of object",
    ],
    correct: 2,
    explanation:
      "Key Point: While many contracts are notarized for recording purposes, notarization is not a requirement for a contract to be legally valid and binding.",
  },
  {
    id: "q39",
    cat: "Property Rights and Ownership",
    q: "In Florida, the Homestead Act provides which of the following protections?",
    options: [
      "Exemption from all property taxes regardless of value",
      "Protection of the family home from forced sale by most creditors",
      "The right to build on any land regardless of zoning",
      "A guaranteed low-interest mortgage rate",
    ],
    correct: 1,
    explanation:
      "Key Point: The Florida Constitution protects a homestead from forced sale for the payment of most personal debts, such as credit card debt or medical bills.",
  },
  {
    id: "q40",
    cat: "Math Calculations",
    q: "A lender is charging 3 discount points on a $250,000 loan. What is the cost of the points to the borrower?",
    options: ["$2,500", "$5,000", "$7,500", "$10,000"],
    correct: 2,
    explanation:
      "Calculation: Each point is 1% of the loan amount. $250,000 x 0.03 = $7,500.",
  },
  {
    id: "q41",
    cat: "Authorized Relationships and Disclosures",
    q: "Which duty is unique to a Single Agent relationship and is NOT required in a Transaction Broker relationship?",
    options: [
      "Exercise limited confidentiality",
      "Full disclosure",
      "Account for all funds",
      "Deal honestly and fairly",
    ],
    correct: 1,
    explanation:
      "Key Point: Full disclosure is a fiduciary duty required of a Single Agent; a Transaction Broker provides limited confidentiality and does not have the duty of full disclosure.",
  },
  {
    id: "q42",
    cat: "Titles, Deeds, and Restrictions",
    q: "What is the primary purpose of recording a deed in the public records?",
    options: [
      "To make the deed valid between the parties",
      "To provide constructive notice of ownership",
      "To ensure the property taxes are paid",
      "To guarantee the title is clear",
    ],
    correct: 1,
    explanation:
      "Key Point: Recording a deed provides constructive notice to the world that the grantee has a legal interest in the property.",
  },
  {
    id: "q43",
    cat: "Residential Mortgages and Finance",
    q: "What does the 'LTV' (Loan-to-Value) ratio represent to a lender?",
    options: [
      "The interest rate compared to the inflation rate",
      "The relationship between the loan amount and the appraised value",
      "The borrower's debt-to-income ratio",
      "The length of the loan in years",
    ],
    correct: 1,
    explanation:
      "Key Point: LTV is the percentage of the property value that the lender is willing to finance; it measures the risk of the loan.",
  },
  {
    id: "q44",
    cat: "Real Estate Taxes and Investment",
    q: "Which of the following is considered an 'Ad Valorem' tax?",
    options: [
      "Income tax",
      "Special assessment tax",
      "Property tax",
      "Sales tax",
    ],
    correct: 2,
    explanation:
      "Key Point: Ad Valorem means 'according to value.' Real estate property taxes are based on the assessed value of the property.",
  },
  {
    id: "q45",
    cat: "Planning, Zoning, and Hazards",
    q: "What federal law requires the disclosure of lead-based paint hazards for homes built prior to 1978?",
    options: [
      "The Clean Air Act",
      "The Residential Lead-Based Paint Hazard Reduction Act",
      "The Fair Housing Act",
      "The Environmental Protection Act",
    ],
    correct: 1,
    explanation:
      "Key Point: Sellers and landlords of residential dwellings built before 1978 must disclose the presence of known lead-based paint.",
  },
  {
    id: "q46",
    cat: "Math Calculations",
    q: "A rectangular lot measures 150 feet by 300 feet. What is the total acreage of the lot?",
    options: ["0.55 acres", "1.03 acres", "1.50 acres", "2.00 acres"],
    correct: 1,
    explanation:
      "150 x 300 = 45, 000 sq ft. 45, 000 / 43, 560 (sq ft in an acre) = 1.032 acres.",
  },
  {
    id: "q47",
    cat: "Violations and Penalties",
    q: "If a sales associate makes a false statement to a client, they may be guilty of:",
    options: [
      "Commingling",
      "Culpable negligence",
      "Fraud or misrepresentation",
      "Conversion",
    ],
    correct: 2,
    explanation:
      "Key Point: Misrepresentation is the act of making a false or misleading statement that can lead to a violation of license law.",
  },
  {
    id: "q48",
    cat: "Brokerage Activities and Procedures",
    q: "What is the maximum amount of personal or business funds a broker can maintain in a sales escrow account?",
    options: ["$500", "$1,000", "$5,000", "$10,000"],
    correct: 1,
    explanation:
      "Key Point: A broker is permitted to keep up to $1,000 of personal or business funds in a sales escrow account to cover bank service charges.",
  },
  {
    id: "q49",
    cat: "Appraisal and Property Value",
    q: "In the Cost-Depreciation Approach, what is the 'Replacement Cost'?",
    options: [
      "The cost to build an exact replica with the same materials",
      "The cost to build a building with similar utility using modern materials",
      "The original purchase price adjusted for inflation",
      "The current market value of the building",
    ],
    correct: 1,
    explanation:
      "Key Point: Replacement cost is the current cost to construct a building with the same utility, whereas reproduction cost is for an exact replica.",
  },
  {
    id: "q50",
    cat: "License Law and Qualifications",
    q: "A license is considered 'Involuntary Inactive' when:",
    options: [
      "The licensee chooses not to practice and pays the required fees",
      "The licensee fails to renew their license before the expiration date",
      "The licensee is under investigation by the FREC",
      "The licensee moves out of state",
    ],
    correct: 1,
    explanation:
      "Key Point: Failure to renew a license results in it becoming involuntary inactive for up to two years.",
  },
  {
    id: "q51",
    cat: "License Law and Qualifications",
    q: "Which of the following is an example of a 'Prima Facie' evidence in real estate licensing?",
    options: [
      "A recommendation letter from a broker",
      "A valid real estate license certificate",
      "A signed employment agreement",
      "A passing grade on a practice exam",
    ],
    correct: 1,
    explanation:
      "Key Point: A real estate license is considered prima facie evidence that the person named on the license is entitled to the rights and privileges of a licensee.",
  },
  {
    id: "q52",
    cat: "Real Estate Commission Rules",
    q: "The FREC's power to enact rules and regulations is an exercise of which type of power?",
    options: [
      "Executive power",
      "Quasi-legislative power",
      "Quasi-judicial power",
      "Ministerial power",
    ],
    correct: 1,
    explanation:
      "Key Point: Quasi-legislative power gives the FREC the authority to adopt rules and regulations that interpret or apply the license law.",
  },
  {
    id: "q53",
    cat: "Authorized Relationships and Disclosures",
    q: "A residential sale is defined in Florida law as the sale of improved residential property of how many units or fewer?",
    options: ["Two", "Three", "Four", "Five"],
    correct: 2,
    explanation:
      "Key Point: Florida law defines residential sales as property of four or fewer units, or agricultural property of 10 or fewer acres.",
  },
  {
    id: "q54",
    cat: "Brokerage Activities and Procedures",
    q: "If a broker has a 'conflicting demand' for escrowed funds, within how many days must they notify the FREC?",
    options: [
      "5 business days",
      "10 business days",
      "15 business days",
      "30 business days",
    ],
    correct: 2,
    explanation:
      "Key Point: The broker must notify the FREC in writing within 15 business days of receiving conflicting demands for escrowed funds.",
  },
  {
    id: "q55",
    cat: "Violations and Penalties",
    q: "The Real Estate Recovery Fund is maintained by fees and fines paid by licensees. What is the maximum payment allowed for a single judgment?",
    options: ["$10,000", "$25,000", "$50,000", "$150,000"],
    correct: 2,
    explanation:
      "Key Point: The maximum payment from the Recovery Fund for a single judgment is $50,000 (or the unsatisfied portion of the judgment, whichever is less).",
  },
  {
    id: "q56",
    cat: "Property Rights and Ownership",
    q: "Which type of ownership involves a proprietary lease and the purchase of stock in a corporation?",
    options: ["Condominium", "Cooperative", "Time-share", "Fee Simple"],
    correct: 1,
    explanation:
      "Key Point: In a cooperative, a corporation holds title to the land/improvements, and owners buy shares and receive a proprietary lease.",
  },
  {
    id: "q57",
    cat: "Titles, Deeds, and Restrictions",
    q: "Which of the following is a 'voluntary' alienation of legal title?",
    options: ["Eminent domain", "Adverse possession", "Deed", "Escheat"],
    correct: 2,
    explanation:
      "Key Point: Alienation by deed or will is voluntary. Eminent domain, escheat, and adverse possession are involuntary.",
  },
  {
    id: "q58",
    cat: "Real Estate Contracts",
    q: "What is the status of a contract that has been fully performed by all parties?",
    options: ["Executory", "Executed", "Voidable", "Unenforceable"],
    correct: 1,
    explanation:
      "Key Point: An executed contract is one where all parties have fulfilled their promises and performed all duties.",
  },
  {
    id: "q59",
    cat: "Residential Mortgages and Finance",
    q: "A 'Balloon Payment' is most commonly associated with which type of mortgage?",
    options: [
      "Fully amortized mortgage",
      "Partially amortized mortgage",
      "Adjustable-rate mortgage",
      "FHA insured mortgage",
    ],
    correct: 1,
    explanation:
      "Key Point: A partially amortized mortgage includes a larger final payment (balloon payment) because the monthly payments don't fully pay off the principal.",
  },
  {
    id: "q60",
    cat: "Appraisal and Property Value",
    q: "When appraising a unique property like a church or a school, which approach is most appropriate?",
    options: [
      "Sales Comparison Approach",
      "Cost Approach",
      "Income Approach",
      "Gross Rent Multiplier",
    ],
    correct: 1,
    explanation:
      "Key Point: The Cost Approach is best for special-purpose properties where comparable sales or income data are limited.",
  },
  {
    id: "q61",
    cat: "Real Estate Taxes and Investment",
    q: "What is the established 'useful life' for residential income-producing property under current IRS rules?",
    options: ["15 years", "27.5 years", "39 years", "50 years"],
    correct: 1,
    explanation:
      "Key Point: Residential rental property is depreciated over a useful life of 27.5 years.",
  },
  {
    id: "q62",
    cat: "Planning, Zoning, and Hazards",
    q: "The authority of the government to enact laws to protect the public health, safety, and welfare is known as:",
    options: ["Eminent domain", "Police power", "Condemnation", "Right of way"],
    correct: 1,
    explanation:
      "Key Point: Police power is the constitutional authority of state and local governments to regulate land use.",
  },
  {
    id: "q63",
    cat: "Math Calculations",
    q: "How many total square feet are in a property that is 200 feet wide and 400 feet deep?",
    options: ["60, 000", "80, 000", "100, 000", "120, 000"],
    correct: 1,
    explanation: "Calculation: Area = Width x Depth. 200 x 400 = 80, 000 square feet.",
  },
  {
    id: "q64",
    cat: "License Law and Qualifications",
    q: "A sales associate changed their residential address. Within how many days must they notify the DBPR?",
    options: ["5 days", "10 days", "15 days", "30 days"],
    correct: 1,
    explanation:
      "Key Point: Licensees must notify the DBPR of a change in residential mailing address within 10 days.",
  },
  {
    id: "q65",
    cat: "Brokerage Activities and Procedures",
    q: "Which of the following is considered 'conversion' of escrow funds?",
    options: [
      "Placing deposit money in an interest-bearing account",
      "Using escrow funds for personal or business expenses",
      "Maintaining $1,000 of personal funds in the escrow account",
      "Transferring funds to a title company",
    ],
    correct: 1,
    explanation:
      "Key Point: Conversion is the unauthorized use or retention of money or property that belongs to another party.",
  },
  {
    id: "q66",
    cat: "Real Estate Commission Rules",
    q: "The FREC is authorized to deny an application for licensure, and may also take which of the following actions against a licensee?",
    options: [
      "Suspend a license for up to 10 years",
      "Sentence a licensee to 1 year in jail",
      "Impose a fine of up to $25,000",
      "Require the licensee to perform 1,000 hours of community service",
    ],
    correct: 0,
    explanation:
      "Key Point: The FREC has the authority to suspend a license for a period not exceeding 10 years. They cannot impose jail time, as that is a criminal penalty.",
  },
  {
    id: "q67",
    cat: "Authorized Relationships and Disclosures",
    q: "Which of the following duties is required in all three authorized brokerage relationships (Single Agent, Transaction Broker, and No Brokerage)?",
    options: [
      "Loyalty",
      "Accounting for all funds",
      "Confidentiality",
      "Obedience",
    ],
    correct: 1,
    explanation:
      "Key Point: Accounting for all funds and dealing honestly and fairly are duties required in all brokerage relationships in Florida.",
  },
  {
    id: "q68",
    cat: "Brokerage Activities and Procedures",
    q: "A sales associate wants to advertise a property in their own name without including the name of the brokerage. This is known as a:",
    options: [
      "Blind advertisement",
      "Net advertisement",
      "General advertisement",
      "Limited advertisement",
    ],
    correct: 0,
    explanation:
      "Key Point: A blind advertisement is any real estate advertisement that does not reveal the licensed name of the brokerage firm.",
  },
  {
    id: "q69",
    cat: "Violations and Penalties",
    q: "A person who provides rental information for a fee must provide a contract that specifies the person is entitled to a refund of what percentage if the information is not current or is inaccurate?",
    options: ["25%", "50%", "75%", "100%"],
    correct: 3,
    explanation:
      "Key Point: If the rental information provided is not current or is inaccurate in any material respect, the full 100% fee must be repaid to the prospective tenant upon demand.",
  },
  {
    id: "q70",
    cat: "Property Rights and Ownership",
    q: "The process of 'Escheat' occurs when:",
    options: [
      "A property owner dies without a will and has no known heirs.",
      "The government takes private land for public use.",
      "A neighbor uses someone else's land for a statutory period.",
      "A person loses property due to non-payment of taxes.",
    ],
    correct: 0,
    explanation:
      "Key Point: Escheat is the reversion of property to the state when an owner dies intestate and without heirs.",
  },
  {
    id: "q71",
    cat: "Titles, Deeds, and Restrictions",
    q: "Which of the following is a physical encumbrance on a property?",
    options: ["A mortgage", "A property tax lien", "An easement", "A judgment"],
    correct: 2,
    explanation:
      "Key Point: An easement is an encumbrance that affects the physical use or condition of the land, whereas liens and judgments are financial encumbrances.",
  },
  {
    id: "q72",
    cat: "Real Estate Contracts",
    q: "A 'Meeting of the Minds' is a term used to describe which element of a contract?",
    options: [
      "Legality of object",
      "Consideration",
      "Offer and acceptance",
      "Competency of parties",
    ],
    correct: 2,
    explanation:
      "Key Point: Offer and acceptance, or mutual assent, is often referred to as a meeting of the minds between the parties.",
  },
  {
    id: "q73",
    cat: "Residential Mortgages and Finance",
    q: "The 'Acceleration Clause' in a mortgage allows the lender to:",
    options: [
      "Increase the interest rate if market rates rise.",
      "Declare the entire unpaid balance due immediately upon default.",
      "Charge a penalty for early payoff.",
      "Transfer the mortgage to another lender.",
    ],
    correct: 1,
    explanation:
      "Key Point: The acceleration clause gives the lender the right to 'accelerate' the maturity of the debt if the borrower defaults on the mortgage terms.",
  },
  {
    id: "q74",
    cat: "Appraisal and Property Value",
    q: "What is the first step in the appraisal process?",
    options: [
      "Gather and analyze data",
      "Define the problem",
      "Determine the highest and best use",
      "Apply the three approaches to value",
    ],
    correct: 1,
    explanation:
      "Key Point: Defining the problem (identifying the property, the rights to be appraised, and the purpose of the appraisal) is the essential first step.",
  },
  {
    id: "q75",
    cat: "Real Estate Taxes and Investment",
    q: "A 'Special Assessment' tax is typically levied to pay for:",
    options: [
      "General city services like police and fire.",
      "Improvements that benefit a specific property, such as new sidewalks.",
      "State-wide educational programs.",
      "Federal income tax deficits.",
    ],
    correct: 1,
    explanation:
      "Key Point: Special assessments are taxes levied against specific properties to pay for public improvements that increase the value of those properties.",
  },
  {
    id: "q76",
    cat: "Planning, Zoning, and Hazards",
    q: "If a property owner is allowed to continue a use that was lawful before a zoning change but no longer complies, this is called:",
    options: [
      "A variance",
      "A special exception",
      "A nonconforming use",
      "A buffer zone",
    ],
    correct: 2,
    explanation:
      "Key Point: A nonconforming use is a 'grandfathered' use that is allowed to continue even though it doesn't meet current zoning requirements.",
  },
  {
    id: "q77",
    cat: "Math Calculations",
    q: "A property has a net operating income (NOI) of $40,000 and the market capitalization rate is 8%. What is the estimated value of the property?",
    options: ["$320,000", "$400,000", "$500,000", "$600,000"],
    correct: 2,
    explanation: "Calculation: Value = Income / Rate. $40,000 / 0.08 = $500,000.",
  },
  {
    id: "q78",
    cat: "License Law and Qualifications",
    q: "An applicant for a Florida real estate license is NOT required to disclose which of the following?",
    options: [
      "A prior criminal conviction",
      "A plea of nolo contendere",
      "A speeding ticket that did not result in a license suspension",
      "A professional license disciplinary action in another state",
    ],
    correct: 2,
    explanation:
      "Key Point: Applicants must disclose criminal history and disciplinary actions, but minor traffic violations like speeding tickets generally do not need to be disclosed.",
  },
  {
    id: "q79",
    cat: "Brokerage Activities and Procedures",
    q: "Which of the following is a legal way for a broker to handle a dispute over escrowed funds?",
    options: [
      "Keep the money until the parties stop arguing.",
      "Give the money to the party the broker thinks is right.",
      "Request an Escrow Disbursement Order (EDO) from the FREC.",
      "Immediately transfer the money to the broker's business account.",
    ],
    correct: 2,
    explanation:
      "Key Point: One of the four settlement procedures for conflicting demands is requesting an EDO from the Commission.",
  },
  {
    id: "q80",
    cat: "Math Calculations",
    q: "What are the documentary stamp taxes on a $150,000 mortgage note in Florida? (Rate: $0.35 per $100)",
    options: ["$350", "$525", "$750", "$1,050"],
    correct: 1,
    explanation: "Calculation: ($150,000 / 100) * 0.35 = 1,500 * 0.35 = $525.",
  },
  {
    id: "q81",
    cat: "License Law and Qualifications",
    q: "If a Florida real estate licensee moves out of state and becomes a non-resident, they must notify the Commission of the change in residency within how many days?",
    options: ["10 days", "30 days", "60 days", "90 days"],
    correct: 2,
    explanation:
      "Key Point: A licensee who moves out of state must notify the Commission of their change in residency within 60 days.",
  },
  {
    id: "q82",
    cat: "Real Estate Commission Rules",
    q: "Which specific power of the FREC allows them to impose disciplinary penalties such as license revocation or suspension?",
    options: [
      "Executive powers",
      "Quasi-legislative powers",
      "Quasi-judicial powers",
      "Ministerial powers",
    ],
    correct: 2,
    explanation:
      "Key Point: The quasi-judicial power involves the power to hear complaints, evaluate evidence, and impose punishments for violations of license law.",
  },
  {
    id: "q83",
    cat: "Authorized Relationships and Disclosures",
    q: "Which type of agent has the authority to perform all acts that can be lawfully delegated to another, such as through a Power of Attorney?",
    options: [
      "Special Agent",
      "General Agent",
      "Universal Agent",
      "Transaction Agent",
    ],
    correct: 2,
    explanation:
      "Key Point: A universal agent is authorized by the principal to perform all acts that the principal can personally perform and that may be lawfully delegated.",
  },
  {
    id: "q84",
    cat: "Brokerage Activities and Procedures",
    q: "A real estate brokerage's primary office must consist of at least how many enclosed rooms?",
    options: [
      "Zero; it can be a virtual office",
      "One enclosed room in a building of stationary construction",
      "Two rooms (one for records, one for meetings)",
      "Three rooms to ensure privacy for clients",
    ],
    correct: 1,
    explanation:
      "Key Point: Florida law requires a broker's office to consist of at least one enclosed room in a building of stationary construction that will provide privacy to conduct negotiations and close transactions.",
  },
  {
    id: "q85",
    cat: "Violations and Penalties",
    q: "What is the maximum penalty for a first-degree misdemeanor under Florida real estate law (such as providing inaccurate rental lists)?",
    options: [
      "$500 fine and/or 30 days in jail",
      "$1,000 fine and/or one year in jail",
      "$5,000 fine and/or five years in jail",
      "License revocation and a $10,000 fine",
    ],
    correct: 1,
    explanation:
      "Key Point: A first-degree misdemeanor is punishable by a fine of up to $1,000 and/or imprisonment for up to one year.",
  },
  {
    id: "q86",
    cat: "Property Rights and Ownership",
    q: "Which of the following is an example of an 'incorporeal' interest in real property?",
    options: ["A building", "A fence", "An easement", "A tree"],
    correct: 2,
    explanation:
      "Key Point: Incorporeal interests are non-physical rights in real property, such as an easement; physical things like buildings are corporeal.",
  },
  {
    id: "q87",
    cat: "Titles, Deeds, and Restrictions",
    q: "When a property owner dies 'testate, ' it means they died:",
    options: [
      "Without a will",
      "With a valid will",
      "Without heirs",
      "While in debt",
    ],
    correct: 1,
    explanation:
      "Key Point: Testate refers to dying with a valid will, whereas intestate refers to dying without one.",
  },
  {
    id: "q88",
    cat: "Real Estate Contracts",
    q: "A contract that is missing an essential element, such as a legal objective, is considered:",
    options: ["Void", "Voidable", "Unenforceable", "Valid"],
    correct: 0,
    explanation:
      "Key Point: A void contract lacks one or more of the essential elements required by law and has no legal force or effect.",
  },
  {
    id: "q89",
    cat: "Residential Mortgages and Finance",
    q: "The 'Right of Redemption' allows a borrower to save their property from foreclosure by:",
    options: [
      "Paying only the missed payments plus interest.",
      "Paying the entire mortgage balance plus interest and costs before the sale.",
      "Finding a new buyer for the property within 30 days.",
      "Filing for bankruptcy.",
    ],
    correct: 1,
    explanation:
      "Key Point: Equity of redemption is the right of a mortgagor to prevent foreclosure by paying the full amount of the debt before the foreclosure sale.",
  },
  {
    id: "q90",
    cat: "Appraisal and Property Value",
    q: "What is the formula for the Gross Rent Multiplier (GRM)?",
    options: [
      "Sales Price / Annual Gross Income",
      "Sales Price / Monthly Gross Rent",
      "Net Operating Income / Sales Price",
      "Monthly Gross Rent / Sales Price",
    ],
    correct: 1,
    explanation:
      "Key Point: The GRM is calculated by dividing the sales price by the monthly gross rent of a property.",
  },
  {
    id: "q91",
    cat: "Real Estate Taxes and Investment",
    q: "Which of the following is NOT a deductible expense for a homeowner when filing federal income taxes?",
    options: [
      "Mortgage interest",
      "Property taxes",
      "Homeowner's insurance premiums",
      "Loan origination points",
    ],
    correct: 2,
    explanation:
      "Key Point: While mortgage interest and property taxes are generally deductible for a primary residence, homeowner's insurance premiums are not.",
  },
  {
    id: "q92",
    cat: "Planning, Zoning, and Hazards",
    q: "Which type of zoning is intended to encourage a mix of residential and commercial uses within a single development?",
    options: [
      "Inclusionary zoning",
      "Exclusionary zoning",
      "Planned Unit Development (PUD)",
      "Bulk zoning",
    ],
    correct: 2,
    explanation:
      "Key Point: PUD zoning allows for a variety of land uses and higher densities than traditional zoning.",
  },
  {
    id: "q93",
    cat: "Math Calculations",
    q: "A property was purchased for $180,000 and sold for $216,000. What was the percentage of profit?",
    options: ["15%", "20%", "25%", "30%"],
    correct: 1,
    explanation:
      "Key Point: Profit = $216,000 - $180,000 = $36,000. Profit % = $36,000 / $180,000 = 0.20 or 20%.",
  },
  {
    id: "q94",
    cat: "Math Calculations",
    q: "If a property's assessed value is $200,000 and the tax rate is 25 mills, what is the annual property tax bill?",
    options: ["$500", "$2,500", "$5,000", "$7,500"],
    correct: 2,
    explanation:
      "Key Point: A mill is $1 per $1,000. Calculation: ($200,000 / 1,000) * 25 = 200 * 25 = $5,000.",
  },
  {
    id: "q95",
    cat: "License Law and Qualifications",
    q: "What is the status of a sales associate's license if their employing broker's license is revoked?",
    options: [
      "The license is also revoked",
      "Involuntary Inactive",
      "Voluntary Inactive",
      "Null and Void",
    ],
    correct: 1,
    explanation:
      "Key Point: When a broker's license is suspended or revoked, all licenses of associates under them are placed on involuntary inactive status until they find a new employer.",
  },
  {
    id: "q96",
    cat: "Brokerage Activities and Procedures",
    q: "How long must a broker retain brokerage relationship disclosure documents and real estate contracts?",
    options: ["2 years", "3 years", "5 years", "10 years"],
    correct: 2,
    explanation:
      "Key Point: Brokers must retain all documents related to real estate transactions for at least five years.",
  },
  {
    id: "q97",
    cat: "Real Estate Contracts",
    q: "Which clause in a sales contract allows for the cancellation of the contract if the buyer cannot obtain financing?",
    options: [
      "Escalation clause",
      "Contingency clause",
      "Arbitration clause",
      "Exculpatory clause",
    ],
    correct: 1,
    explanation:
      "Key Point: A contingency clause makes the enforcement of the contract dependent on the completion of a certain event, such as securing a loan.",
  },
  {
    id: "q98",
    cat: "Residential Mortgages and Finance",
    q: "What is 'Negative Amortization'?",
    options: [
      "When the interest rate on a loan decreases over time.",
      "When the monthly payment is less than the interest due, causing the principal balance to increase.",
      "When a borrower pays off a loan early.",
      "When a lender forecloses on a property.",
    ],
    correct: 1,
    explanation:
      "Key Point: Negative amortization occurs when the loan balance grows because the payments don't cover the full interest charge.",
  },
  {
    id: "q99",
    cat: "Appraisal and Property Value",
    q: "The value of a property based on its use as a specific business, rather than its market value, is called:",
    options: [
      "Liquidation value",
      "Going-concern value",
      "Salvage value",
      "Assessed value",
    ],
    correct: 1,
    explanation:
      "Key Point: Going-concern value is the value of an income-producing property that includes the value of the business operation itself.",
  },
  {
    id: "q100",
    cat: "Math Calculations",
    q: "A developer purchased 4 acres of land. If the developer wants to create 8 equal lots, how many square feet will each lot be (ignoring roads/setbacks)?",
    options: ["20,000 sq ft", "21,780 sq ft", "43,560 sq ft", "87,120 sq ft"],
    correct: 1,
    explanation:
      "Calculation: Total sq ft = 4 acres * 43,560 sq ft/acre = 174,240 sq ft. Each lot = 174,240 / 8 = 21,780 sq ft.",
  },
];
