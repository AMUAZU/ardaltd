// All site copy lives here. Facts about the firm come only from the website brief.
// No individuals, founders, directors or employers are named anywhere.
// Government and institutional contracting is deliberately left off the site.

export const firm = {
  name: "Arda Limited",
  rc: "RC 1742713",
  city: "Abuja",
  country: "Nigeria",
  oneLine:
    "Arda advises governments, development institutions, businesses and aviation organisations on strategy, delivery, safety and compliance.",
};

export const frameworks = ["ICAO", "EASA", "UK CAA", "NCAA", "IOGP"];
export const tools = ["Financial modelling", "Market sizing", "Power BI", "Python", "AI workflow automation"];

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const practices = [
  {
    key: "development",
    art: "dev",
    file: "development-public-sector.html",
    title: "Development and public sector",
    short: "Development and public sector",
    parent: "Development and enterprise practice",
    metaDescription:
      "Public policy and planning, programme design, delivery and evaluation, and public sector reform for ministries, state governments, donors and development institutions.",
    deck: "We help governments and development institutions turn policy into programmes, and programmes into measured results.",
    cardText: "We help governments and development institutions turn policy into programmes, and programmes into measured results.",
    statement:
      "From the research behind a plan to the systems that track its delivery, we support public institutions and their partners at every stage.",
    overview:
      "This work is grounded in public sector economics and national planning experience. We can take on a single policy question, a full sector plan or the day-to-day running of a programme.",
    clients: ["Ministries, departments and agencies", "State governments", "Donors and funders", "Development institutions"],
    services: [
      {
        name: "Public policy and planning",
        summary: "Research and planning support for the people who set direction, from a single policy question to a full sector plan.",
        covers: ["Economic and policy research", "National and sector plans", "Alignment with the SDGs and AU Agenda 2063"],
        clients: "Ministries, state governments, donors",
      },
      {
        name: "Programme design, delivery and evaluation",
        summary: "Support across the life of a programme: designing it, running it and measuring its results.",
        covers: ["Programme design and administration", "Project management", "Results frameworks", "Monitoring, evaluation and learning"],
        clients: "Development institutions, funders, agencies",
      },
      {
        name: "Public sector reform and capacity building",
        summary: "Advice and training that help public institutions perform and hold to their own rules.",
        covers: ["Civil service reform", "Governance and anti-corruption advice", "Training"],
        clients: "Ministries, departments and agencies",
      },
    ],
    competencies: {
      training: ["Economics", "Financial data management"],
      experience: ["Macroeconomic analysis inside federal government", "National development planning inside federal government"],
      thirdLabel: "Tools",
      third: ["Financial modelling", "Power BI", "Python", "AI workflow automation"],
    },
    cta: "Planning a policy, a programme or an evaluation?",
  },
  {
    key: "enterprise",
    art: "ent",
    file: "enterprise-advisory.html",
    title: "Enterprise advisory",
    short: "Enterprise advisory",
    parent: "Development and enterprise practice",
    metaDescription:
      "Strategy and go-to-market, enterprise support programmes, investment readiness, and impact, ESG and data advisory for start-ups, SMEs, corporates, funders and investors.",
    deck: "We help founders, companies and the organisations that back them to grow, raise capital and report on impact.",
    cardText: "We help founders, companies and the organisations that back them to grow, raise capital and report on impact.",
    statement:
      "We bring commercial strategy for early-stage companies in fintech, agri-tech and deep-tech, backed by financial modelling, investment readiness and impact reporting.",
    overview:
      "We work directly with founders and management teams. We also work with funders and investors that run support programmes for many businesses at once.",
    clients: ["Founders and start-ups", "SMEs and corporates", "Funders and investors", "SME programmes"],
    services: [
      {
        name: "Strategy and go-to-market",
        summary: "A clear view of the market and a plan for entering it or growing in it.",
        covers: ["Market sizing", "Competitive intelligence", "Commercial strategy", "Pricing", "Partnerships"],
        clients: "Start-ups, SMEs, corporates",
      },
      {
        name: "Enterprise support programmes",
        summary: "Design and delivery of programmes that help groups of businesses start, grow and put investment to work.",
        covers: ["Incubation", "Accelerators", "Technical assistance", "Shared services", "Post-investment support"],
        clients: "Funders, investors, SME programmes",
      },
      {
        name: "Investment readiness",
        summary: "Preparation for a raise, so the numbers, documents and governance stand up to an investor's questions.",
        covers: ["Business plans", "Financial models", "Due diligence support", "Data rooms", "Governance"],
        clients: "Founders, SMEs",
      },
      {
        name: "Impact, ESG and data",
        summary: "Measurement and reporting of social and environmental performance, with tools that make the reporting routine.",
        covers: ["Impact measurement", "ESG reporting", "Environmental and social management systems", "Data and AI reporting tools"],
        clients: "Businesses, funders",
      },
    ],
    competencies: {
      training: ["Economics", "Financial data management"],
      experience: ["Internal strategy consulting", "Founding and scaling early-stage ventures", "Go-to-market strategy and operations"],
      thirdLabel: "Tools",
      third: tools,
    },
    cta: "Entering a market, raising capital or running a support programme?",
  },
  {
    key: "aviation",
    art: "avi",
    file: "aviation.html",
    title: "Aviation",
    short: "Aviation",
    parent: "Aviation practice",
    metaDescription:
      "Safety and quality management, compliance and certification, regulator advisory, airports and air navigation, and airworthiness advisory against ICAO, EASA, UK CAA, NCAA and IOGP frameworks.",
    deck: "We help operators, airports, air navigation service providers and regulators manage safety and quality and meet regulatory requirements.",
    cardText: "We help operators, airports, air navigation service providers and regulators manage safety and quality and meet regulatory requirements.",
    statement:
      "Our aviation practice combines aeronautical engineering training, regulatory inspection experience and hands-on leadership of safety, quality and compliance functions.",
    overview: "We know this work from the regulator's side of the table and from the operator's.",
    clients: [
      "Aircraft operators",
      "Maintenance and training organisations",
      "Airports and air navigation service providers",
      "Civil aviation authorities and ministries",
      "Owners, lessors and financiers",
    ],
    services: [
      {
        name: "Safety and quality management",
        summary: "Management systems designed around how the organisation operates, put into use and then tested by audit.",
        covers: ["Design of safety and quality management systems", "Implementation", "Audit", "Data-driven safety"],
        clients: "Operators, maintenance organisations, airports",
      },
      {
        name: "Compliance and certification",
        summary: "Preparation for the approval you need to gain or keep, from the manuals to the audit.",
        covers: ["Certification and recertification support", "Manuals", "Audit preparation"],
        frameworks: "NCAA, EASA, UK CAA, ICAO, IOGP",
        clients: "Operators, maintenance and training organisations",
      },
      {
        name: "Regulator and government advisory",
        summary: "Support for the bodies that write the rules and oversee compliance with them.",
        covers: ["Regulations", "Guidance material", "Oversight procedures", "Inspector training"],
        clients: "Civil aviation authorities, ministries",
      },
      {
        name: "Airports and air navigation",
        summary: "Studies and project support for airport and air navigation infrastructure.",
        covers: ["Efficiency, capacity, safety and sustainability studies", "Feasibility", "Project management"],
        clients: "Airport operators, air navigation service providers, state governments",
      },
      {
        name: "Airworthiness and technical advisory",
        summary: "Technical review of an aircraft's records and maintenance programme, including before purchase and at delivery.",
        covers: ["Records reviews", "Maintenance programme reviews", "Pre-purchase support", "Delivery support"],
        clients: "Owners, operators, lessors, financiers",
      },
    ],
    competencies: {
      training: ["First-class training in aeronautical engineering"],
      experience: [
        "Airworthiness inspection for a civil aviation authority",
        "Quality and safety management, including certification and recertification with two national authorities",
        "Introduction of a data-driven safety management system for an aircraft operator",
        "Consulting for airports, air navigation service providers and regulators",
      ],
      thirdLabel: "Frameworks",
      third: frameworks,
    },
    cta: "Preparing for an audit, a certification or a study?",
  },
];

export const clientGroups = [
  { title: "Governments", body: "Ministries, departments and agencies, state governments and civil aviation authorities." },
  { title: "Development institutions", body: "Donors, funders, development institutions, investors and SME programmes." },
  { title: "Businesses", body: "Founders, start-ups, SMEs and corporates." },
  { title: "Aviation organisations", body: "Operators, maintenance and training organisations, airports, air navigation service providers, owners, lessors and financiers." },
];

export const proofPoints = [
  { title: "Federal government", body: "Macroeconomic analysis and national development planning, done from inside government." },
  { title: "Aviation regulation", body: "Airworthiness inspection for a civil aviation authority." },
  {
    title: "Safety and quality leadership",
    body: "Certification and recertification with two national authorities, and a data-driven safety management system introduced for an aircraft operator.",
  },
  { title: "Early-stage business", body: "Founding and scaling ventures, strategy consulting, and go-to-market strategy and operations." },
];

export const principles = [
  {
    title: "We work from experience",
    body:
      "Our competencies were built inside the kinds of organisations we advise: federal government planning, a civil aviation authority, an aircraft operator's safety and quality functions, and early-stage ventures.",
  },
  {
    title: "We work to a standard",
    body:
      "Aviation assignments start from the applicable framework. Development assignments start from the result the programme is meant to achieve. Each gives the client something to check our work against.",
  },
  {
    title: "We work from evidence",
    body:
      "Financial models, market sizing, Power BI, Python and AI workflow automation are everyday tools for us. In aviation the same habit shows up as data-driven safety management.",
  },
  {
    title: "We stay through delivery",
    body:
      "Our involvement continues after the recommendations. Programme administration, project management, system implementation and audit are all services we offer.",
  },
];

export const articles = [
  {
    slug: "four-components-of-a-safety-management-system",
    practice: "Aviation",
    practiceKey: "aviation",
    art: "avi",
    title: "The four components of a safety management system",
    read: "4 min read",
    summary:
      "ICAO's safety management framework describes a safety management system through four components. Each one can be checked with a few plain questions.",
    body: `
      <p>ICAO's safety management framework, set out in Annex 19, describes a safety management system through four components. National civil aviation regulations build on the same structure. Each component can be checked with a few plain questions.</p>
      <h2>Safety policy and objectives</h2>
      <p>This component covers management commitment, safety accountabilities, the appointment of key safety personnel, coordination of emergency response planning and the system's documentation.</p>
      <p class="check"><strong>Check:</strong> can staff name the accountable executive or manager, and do the stated objectives appear in management meetings?</p>
      <h2>Safety risk management</h2>
      <p>Hazards are identified, the risks they create are assessed, and mitigations are put in place and recorded.</p>
      <p class="check"><strong>Check:</strong> does the hazard log show recent entries from several departments, with owners and closure dates?</p>
      <h2>Safety assurance</h2>
      <p>The organisation monitors and measures its safety performance, manages the safety effects of change and works on continuous improvement of the system.</p>
      <p class="check"><strong>Check:</strong> are the safety performance indicators fed by actual data, such as occurrence reports and audit findings, and has a recent change been assessed before it took effect?</p>
      <h2>Safety promotion</h2>
      <p>Training and education give people the competence to play their part. Safety communication keeps them informed of hazards, lessons and changes.</p>
      <p class="check"><strong>Check:</strong> do reporters hear what happened to their reports?</p>
      <h2>How the components fit together</h2>
      <p>Reports raised through promotion feed risk management. Risk controls are tested by assurance. Assurance results go back to the managers who set policy. An organisation that can show each component working, with records, is well placed for an audit.</p>`,
  },
  {
    slug: "five-questions-before-collecting-data",
    practice: "Development and public sector",
    practiceKey: "development",
    art: "dev",
    title: "Five questions to settle before a programme starts collecting data",
    read: "3 min read",
    summary:
      "Monitoring and evaluation often begins with a list of indicators. A short set of decisions about what the data is for makes a stronger start.",
    body: `
      <p>Monitoring and evaluation often begins with a list of indicators. A short set of decisions about what the data is for makes a stronger start. These five questions are a useful test of any results framework before the first survey goes out.</p>
      <h2>1. What decision will this information change?</h2>
      <p>Tie every indicator to a decision someone has to make: continue, adjust, scale up or stop. Indicators with no decision attached add cost and are rarely read.</p>
      <h2>2. What is the result, in one sentence?</h2>
      <p>If the intended change cannot be stated plainly, the framework will drift towards counting activity. Outputs record what the programme did. Outcomes describe what changed for people or institutions because of it. A framework needs both, and needs to keep them apart.</p>
      <h2>3. Where does the baseline come from?</h2>
      <p>A target means little without a starting point. Settle early whether the baseline will come from existing administrative data, a new survey or a documented estimate, and record the choice.</p>
      <h2>4. Who collects the data, and how often?</h2>
      <p>Reporting that depends on frontline staff with full workloads tends to arrive late or incomplete. Match the frequency of collection to the pace at which the result can change, and give the task to people who have time for it.</p>
      <h2>5. When will the team stop and learn?</h2>
      <p>Schedule review points at which the data is examined and the plan can change. Learning that waits for the final evaluation arrives too late to help the programme it describes.</p>
      <p>A framework that answers all five questions is usually shorter than its first draft, and more likely to be used.</p>`,
  },
  {
    slug: "what-goes-in-a-data-room",
    practice: "Enterprise advisory",
    practiceKey: "enterprise",
    art: "ent",
    title: "What goes in a data room, and why investors ask for it",
    read: "3 min read",
    summary:
      "A data room is the organised set of documents a company shares with a prospective investor. Preparing it before a raise shortens due diligence.",
    body: `
      <p>A data room is the organised set of documents a company shares with a prospective investor during due diligence. Preparing it before a raise shortens the process and shows how the business is run.</p>
      <h2>Corporate records</h2>
      <p>Incorporation documents, the shareholder register and board resolutions. An investor wants to confirm who owns the company and who can sign on its behalf.</p>
      <h2>Financial information</h2>
      <p>Historical accounts, recent management accounts and the financial model with its assumptions listed. The model should trace back to actual figures, so a reader can see where the forecast departs from the record and why.</p>
      <h2>Commercial evidence</h2>
      <p>Key customer and supplier contracts, the sales pipeline and the pricing structure. These show that revenue is real and that it can be repeated.</p>
      <h2>People and governance</h2>
      <p>The organisation structure, key employment terms, board composition and the policies the company works to. Governance gaps are easier to close before an investor finds them.</p>
      <h2>Legal and compliance</h2>
      <p>Licences, tax filings, ownership of intellectual property and any disputes. Disclose known problems with an explanation. A gap that is explained costs less trust than one that is discovered.</p>
      <h2>Keeping it usable</h2>
      <ul>
        <li>Number the folders and keep an index.</li>
        <li>Use consistent file names and one current version of each document.</li>
        <li>Record who has been given access and when.</li>
      </ul>`,
  },
];
