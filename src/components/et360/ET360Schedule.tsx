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
        { name: 'Friday · Session 1', topic: 'The Energy Project Development Cycle' },
        { name: 'Friday · Session 2', topic: 'Feasibility Analysis and Project Bankability' },
        { name: 'Friday · Session 3', topic: 'Financial Modelling Fundamentals' },
        { name: 'Saturday · Session 1', topic: 'Capital Markets and Development Finance' },
        { name: 'Saturday · Session 2', topic: 'Green Bonds, Sustainable Finance & Climate Finance Structuring' },
      ],
    },
    week3: {
      title: 'Week 3',
      subtitle: 'Pricing, Carbon Finance & Sustainable Capital',
      sessions: [
        { name: 'Weekday', topic: 'Energy Pricing and Customer Tariffs' },
        { name: 'Friday · Session 1', topic: 'Carbon Markets and Climate Policy' },
        { name: 'Friday · Session 2', topic: 'Project Eligibility, Baselines, and Additionality' },
        { name: 'Friday · Session 3', topic: 'MRV Systems and Carbon Revenue Modelling' },
        { name: 'Saturday · Session 1', topic: 'Corporate ESG and Emissions Baselines' },
        { name: 'Saturday · Session 2', topic: 'E-Mobility and Fleet Electrification' },
        { name: 'Saturday · Session 3', topic: 'Risk Analysis and Integrated Financial Modelling' },
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
        { name: 'Saturday 12 July', topic: 'Final Capstone Presentations and Closing Ceremony' },
      ],
    },
  };

  const capstones = [
    {
      title: 'Rural Community Mini-Grid',
      description:
        'Developing a complete bankable mini-grid package for Tudun Wada, an unserved farming community in Kaduna South — load assessment, system design, financial modeling, and carbon registration.',
      num: '01',
    },
    {
      title: 'Heavy Industry Decarbonisation',
      description:
        'A full industrial transition package for a major manufacturing plant — energy audit, retrofit plan, financial modeling with/without carbon revenue, and ESG framework.',
      num: '02',
    },
    {
      title: 'Urban Transit Fleet Electrification',
      description:
        'A complete e-bus transition package for a 432-bus municipal transit operator — fleet emissions baseline, infrastructure design, and DFI financing package.',
      num: '03',
    },
    {
      title: 'Generation Asset Strategic Refinancing',
      description:
        'A formal investment advisory package for a 972 MW gas plant — emissions baseline, financial scenario models, and carbon management assessment.',
      num: '04',
    },
    {
      title: 'Regional Climate Action Blueprint & Green Bond',
      description:
        'A unified state climate programme — costed mini-grid program, clean cooking intervention, MRV framework, and green bond issuance structure.',
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
    <section className="py-24 bg-white">
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
