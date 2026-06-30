const ET360Tutors = () => {
  const weeks = [
    {
      week: 'Week 1',
      title: 'Energy Systems, Technologies & Baselines',
      color: 'bg-green-500',
      sessions: [
        { session: 'The Energy Value Chain', specialty: 'Energy Economics & Policy' },
        { session: 'Energy Efficiency and Industrial Auditing', specialty: 'Energy Efficiency' },
        { session: 'Solar PV, Load Assessment & System Sizing', specialty: 'Renewable Energy Technology' },
      ],
    },
    {
      week: 'Week 2',
      title: 'Gas Strategy & Project Development',
      color: 'bg-blue-500',
      sessions: [
        { session: "Gas Strategy and Nigeria's Energy Transition", specialty: 'Gas Strategy & Policy' },
        { session: 'The Energy Project Development Cycle', specialty: 'Project Development' },
        { session: 'Financial Modelling Fundamentals', specialty: 'Energy Finance' },
        { session: 'Capital Markets and Development Finance', specialty: 'Development Finance' },
        { session: 'Green Bonds, Sustainable Finance & Climate Finance Structuring', specialty: 'Green Finance' },
      ],
    },
    {
      week: 'Week 3',
      title: 'Pricing, Carbon Finance & Sustainable Capital',
      color: 'bg-amber-500',
      sessions: [
        { session: 'Carbon Markets and Climate Policy', specialty: 'Carbon Markets' },
        { session: 'MRV Systems and Carbon Revenue Modelling', specialty: 'Carbon MRV' },
        { session: 'Corporate ESG and Emissions Baselines', specialty: 'ESG & Sustainability' },
        { session: 'E-Mobility and Fleet Electrification', specialty: 'Electrification' },
      ],
    },
    {
      week: 'Week 4',
      title: 'Compliance, Execution & Final Presentations',
      color: 'bg-purple-500',
      sessions: [
        { session: "Project Permitting and Nigeria's Energy Legal Framework", specialty: 'Energy Law' },
        { session: 'Business Case Development and Investor Pitching', specialty: 'Business Development' },
        { session: 'The Energy Transition Industry and Career Pathways', specialty: 'Industry Insights' },
      ],
    },
  ];

  const tutorSources = [
    'Development Finance Institutions (DFIs)',
    'Energy Project Development Firms',
    'Carbon Credit & Climate Finance Companies',
    'Energy Law and Policy Consultants',
    'Renewable Energy & Energy Efficiency Leaders',
    'Government and Regulatory Bodies',
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
            Instructors
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-4">
            Programme Tutors
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Learn from experienced practitioners and industry leaders across Nigeria's energy sector.
          </p>
        </div>

        {/* Week panels */}
        <div className="space-y-10 mb-20">
          {weeks.map((weekData, wi) => (
            <div
              key={wi}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={wi * 80}
            >
              {/* Week header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-100">
                <div className={`w-3 h-10 rounded-full ${weekData.color}`} />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{weekData.week}</p>
                  <h3 className="text-lg font-bold text-green-950">{weekData.title}</h3>
                </div>
              </div>

              {/* Sessions grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {weekData.sessions.map((item, si) => (
                  <div
                    key={si}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-green-300 hover:shadow-sm transition-all duration-200"
                  >
                    <p className="text-gray-900 font-semibold text-sm mb-3 leading-snug">{item.session}</p>
                    <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {item.specialty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* About our tutors */}
        <div
          className="bg-green-950 rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          data-aos="fade-up"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">About Our Tutors</h3>
            <p className="text-green-200 text-sm leading-relaxed">
              All sessions are delivered by practicing professionals from Nigeria's energy sector with deep
              expertise in their respective domains. Our tutors bring real-world experience from across the
              industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tutorSources.map((source, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-200 text-sm">{source}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ET360Tutors;
