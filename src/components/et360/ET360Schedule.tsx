import { useState } from 'react';

interface WeekContent {
  title: string;
  subtitle: string;
  sessions: { name: string; topic: string }[];
}

const ET360Schedule = () => {
  const [activeWeek, setActiveWeek] = useState('week1');

  const schedule: Record<string, WeekContent> = {
    week1: {
      title: 'Week 1',
      subtitle: 'Energy Systems, Technologies & Baselines',
      sessions: [
        { name: 'Friday · Session 1', topic: 'The Energy Value Chain' },
        { name: 'Friday · Session 2', topic: 'The Transition Landscape, Just Transition & The Debate' },
        { name: 'Friday · Session 3', topic: 'Capstone Project Launch and Scenario Design' },
        { name: 'Saturday · Session 1', topic: 'Energy Efficiency and Industrial Auditing' },
        { name: 'Saturday · Session 2', topic: 'Solar PV, Load Assessment, and System Sizing' },
      ],
    },
    week2: {
      title: 'Week 2',
      subtitle: 'Gas Strategy & Project Development',
      sessions: [
        { name: 'Weekday', topic: "Gas Strategy and Nigeria's Energy Transition" },
        { name: 'Friday · Session 1', topic: 'E-Mobility and Fleet Electrification' },
        { name: 'Friday · Session 2', topic: 'The Energy Project Development Cycle' },
        { name: 'Friday · Session 3', topic: 'Feasibility Analysis and Project Bankability' },
        { name: 'Saturday · Session 1', topic: 'Carbon Markets and Climate Policy' },
        { name: 'Saturday · Session 2', topic: 'Capital Markets and Development Finance' },
        { name: 'Saturday · Session 3', topic: 'Green Bonds, Sustainable Finance, and Climate Finance Structuring' },
      ],
    },
    week3: {
      title: 'Week 3',
      subtitle: 'Pricing, Carbon Finance & Sustainable Capital',
      sessions: [
        { name: 'Weekday', topic: 'Energy Pricing and Customer Tariffs' },
        { name: 'Friday · Session 1', topic: 'Financial Modelling Fundamentals' },
        { name: 'Friday · Session 2', topic: 'Risk Analysis and Integrated Financial Modelling' },
        { name: 'Saturday · Session 1', topic: 'Project Eligibility, Baselines, and Additionality' },
        { name: 'Saturday · Session 2', topic: 'MRV Systems and Carbon Revenue Modelling' },
        { name: 'Saturday · Session 3', topic: 'Corporate ESG and Emissions Baselines' },
      ],
    },
    week4: {
      title: 'Week 4',
      subtitle: 'Compliance, Execution & Final Presentations',
      sessions: [
        { name: 'Weekday', topic: "Project Permitting and Nigeria's Energy Legal Framework" },
        { name: 'Friday · Session 1', topic: 'Business Case Development and Investor Pitching' },
        { name: 'Friday · Session 2', topic: 'The Energy Transition Industry and Career Pathways' },
        { name: 'Friday · Session 3', topic: 'Professional Development and Job Readiness' },
        { name: 'Saturday 11 July', topic: 'Final Capstone Presentations and Closing Ceremony' },
      ],
    },
  };

  const capstones = [
    {
      title: 'Rural Community Mini-Grid',
      description:
        'Tudun Wada is an unserved farming community of 11,400 people in Kaduna South. A grid line passes 800 metres away but the distribution company has no capital budget for extensions. The community spends ₦840,000 monthly on diesel, and households spend up to ₦18,000 monthly on kerosene. Teams develop a bankable mini-grid package: load assessment, financial model with viable tariff, blended finance stack, carbon registration pathway with a seven-year credit projection, and a legal framework addressing grid-arrival risk.',
      num: '01',
    },
    {
      title: 'Heavy Industry Decarbonisation',
      description:
        'A manufacturing plant producing three million tonnes of structural goods per year runs on pipeline gas, suffers nine days of supply disruptions monthly, and spends 41% of operating costs on energy. A European DFI declined a €150 million green loan due to missing emissions data. Teams develop a full industrial transition package: energy audit, retrofit plan with Capex estimates, financial model with and without carbon revenue, ISSB-aligned MRV framework, and green loan instrument.',
      num: '02',
    },
    {
      title: 'Urban Transit Fleet Electrification',
      description:
        'A municipal transit operator runs 432 diesel buses carrying 63,000 daily passengers. Following subsidy removal, diesel costs surged 140%, leaving a ₦2.3 billion operating deficit. Government bailouts stop in 18 months. Teams develop a complete e-bus transition package: fleet emissions baseline, depot infrastructure design for three sites, lifecycle cost comparison, Gross Cost Contract structure, EV carbon MRV plan, and a blended DFI financing package.',
      num: '03',
    },
    {
      title: 'Generation Asset Strategic Refinancing',
      description:
        'A 972MW gas plant averages only 340MW due to aging infrastructure. The central clearing house owes ₦352.7 billion in legacy receivables and the current lender refuses to refinance in four months. Two paths are on the table: a $180M infrastructure fund with harsh covenants, or a European transition consortium offering lower-cost capital for partial rehabilitation plus 80MW solar. Teams develop a formal advisory package: emissions baseline, financial scenarios for both options, carbon management assessment, legal structure, and a data-backed recommendation.',
      num: '04',
    },
    {
      title: 'Regional Climate Action Blueprint & Green Bond',
      description:
        'A regional government has 60 days to submit a Concept Note to a global climate fund. The governor has committed to electricity access for 280 communities, clean cooking for 380,000 households, and 90,000 hectares of mangrove restoration. A planned green bond was blocked by securities regulators. Teams develop a unified state climate programme: costed mini-grid electrification plan, clean cooking intervention with emissions baseline, multi-workstream MRV framework, debt service model backed by carbon revenues, green bond issuance framework, and a completed Concept Note.',
      num: '05',
    },
  ];

  const weeks = [
    { id: 'week1', label: 'Week 1' },
    { id: 'week2', label: 'Week 2' },
    { id: 'week3', label: 'Week 3' },
    { id: 'week4', label: 'Week 4' },
  ];

  const active = schedule[activeWeek];

  return (
    <section id="schedule" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
            Curriculum
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-4">
            Programme Schedule
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A comprehensive curriculum covering all aspects of the energy transition.
          </p>
        </div>

        {/* Week tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10" data-aos="fade-up">
          {weeks.map((week) => (
            <button
              key={week.id}
              onClick={() => setActiveWeek(week.id)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeWeek === week.id
                  ? 'bg-green-950 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {week.label}
            </button>
          ))}
        </div>

        {/* Schedule card */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-20" data-aos="fade-up">
          {/* Card header */}
          <div className="bg-green-950 px-8 py-6">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-1">
              {active.title}
            </p>
            <h3 className="text-xl lg:text-2xl font-bold text-white">{active.subtitle}</h3>
          </div>

          {/* Sessions */}
          <div className="p-8">
            <div className="space-y-3">
              {active.sessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 bg-white rounded-xl p-5 border border-gray-100 hover:border-green-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-green-950 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold text-xs">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                      {session.name}
                    </p>
                    <p className="text-gray-800 font-medium">{session.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capstone projects */}
        <div data-aos="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-3">
              Capstone Work
            </span>
            <h3 className="text-3xl font-black text-green-950">The Five Capstone Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capstones.map((cap, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-7 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 ${
                  index === capstones.length - 1 && capstones.length % 2 !== 0
                    ? 'md:col-span-2 md:max-w-2xl md:mx-auto md:w-full'
                    : ''
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 70}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-950 text-yellow-400 text-xs font-black mb-4">
                  {cap.num}
                </span>
                <h4 className="text-base font-bold text-gray-900 mb-2">{cap.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ET360Schedule;
