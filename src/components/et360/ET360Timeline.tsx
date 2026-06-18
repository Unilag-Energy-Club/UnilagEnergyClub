const phases = [
  {
    label: 'Week 1',
    title: 'Energy Systems, Technologies & Baselines',
    description:
      'Energy value chain, transition landscape, energy efficiency, solar PV, and capstone project launch.',
    date: '19 June 2026',
    isLeft: true,
    isHighlight: false,
  },
  {
    label: 'Week 2',
    title: 'Gas Strategy & Project Development',
    description:
      'Gas strategy, project development cycle, feasibility analysis, financial modelling, and sustainable finance.',
    date: '27 June 2026',
    isLeft: false,
    isHighlight: false,
  },
  {
    label: 'Week 3',
    title: 'Pricing, Carbon Finance & Sustainable Capital',
    description:
      'Energy pricing, carbon markets, MRV systems, corporate ESG, e-mobility, and integrated financial modelling.',
    date: '4 July 2026',
    isLeft: true,
    isHighlight: false,
  },
  {
    label: 'Week 4',
    title: 'Compliance, Execution & Final Presentations',
    description:
      'Energy legal framework, investor pitching, career pathways, professional development, and capstone presentations.',
    date: '11 July 2026',
    isLeft: false,
    isHighlight: false,
  },
  {
    label: 'Grand Finale',
    title: 'Five Teams. One Stage.',
    description:
      'The five winning capstone teams compete before 1,000+ attendees at the ET360° Grand Finale.',
    date: '16 July 2026',
    isLeft: false,
    isHighlight: true,
  },
];

const ET360Timeline = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
            Programme Milestones
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-green-950">Timeline</h2>
        </div>

        {/* Desktop timeline (alternating) */}
        <div className="hidden md:block relative">
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-200 -translate-x-1/2" />

          <div>
            {phases.map((phase, i) => (
              <div
                key={i}
                className="relative flex items-start"
                style={{ paddingTop: i === 0 ? 0 : '4rem' }}
                data-aos={phase.isLeft ? 'fade-right' : 'fade-left'}
                data-aos-delay={i * 80}
              >
                {/* Left slot */}
                <div className="w-1/2 pr-16">
                  {phase.isLeft && (
                    <div className="text-right">
                      <p className="text-xs font-bold tracking-widest uppercase text-green-600 mb-1">
                        {phase.label}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{phase.description}</p>
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          phase.isHighlight
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {phase.date}
                      </span>
                    </div>
                  )}
                </div>

                {/* Dot (pinned to spine) */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 mt-1 w-4 h-4 rounded-full z-10 flex-shrink-0 ${
                    phase.isHighlight
                      ? 'bg-yellow-400'
                      : 'bg-white ring-2 ring-green-500'
                  }`}
                />

                {/* Right slot */}
                <div className="w-1/2 pl-16">
                  {!phase.isLeft && (
                    <div className="text-left">
                      <p className="text-xs font-bold tracking-widest uppercase text-green-600 mb-1">
                        {phase.label}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{phase.description}</p>
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          phase.isHighlight
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {phase.date}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline (left-spine list) */}
        <div className="md:hidden relative pl-8 border-l border-green-200 space-y-12">
          {phases.map((phase, i) => (
            <div key={i} className="relative" data-aos="fade-up" data-aos-delay={i * 70}>
              {/* Dot */}
              <div
                className={`absolute -left-[2.125rem] top-1 w-4 h-4 rounded-full z-10 ${
                  phase.isHighlight ? 'bg-yellow-400' : 'bg-white ring-2 ring-green-500'
                }`}
              />
              <p className="text-xs font-bold tracking-widest uppercase text-green-600 mb-1">
                {phase.label}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{phase.description}</p>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                  phase.isHighlight ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'
                }`}
              >
                {phase.date}
              </span>
            </div>
          ))}
        </div>

        {/* Key dates strip */}
        <div
          className="mt-24 bg-green-950 rounded-2xl p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-aos="fade-up"
        >
          <div className="sm:col-span-2 lg:col-span-4 mb-2">
            <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Key Dates</h3>
          </div>
          {[
            { label: 'Bootcamp Duration', value: '19 June to 11 July 2026' },
            { label: 'Format', value: 'Fridays, Saturdays + one weekday/week' },
            { label: 'Total Teaching Days', value: '11 days' },
            { label: 'Grand Finale', value: '16 July 2026' },
          ].map(({ label, value }) => (
            <div key={label} className="border-l-2 border-green-700 pl-4">
              <div className="text-xs text-green-400 font-semibold uppercase tracking-wide mb-1">{label}</div>
              <div className="text-white font-bold text-sm">{value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ET360Timeline;
