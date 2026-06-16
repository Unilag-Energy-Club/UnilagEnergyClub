import { GraduationCap, Target, Monitor, Trophy } from 'lucide-react';

const features = [
  {
    title: 'Masterclasses',
    description:
      'Sessions by practitioners covering technical, financial, legal, and policy dimensions of energy transition',
    Icon: GraduationCap,
  },
  {
    title: 'Simulations',
    description:
      'Live decision-making exercises where teams respond to real project scenarios under time pressure',
    Icon: Target,
  },
  {
    title: 'Practicals',
    description:
      'Hands-on work including financial modeling, MRV framework design, and tariff calculation',
    Icon: Monitor,
  },
  {
    title: 'Capstone Projects',
    description:
      'Four weeks building a complete, bankable energy project package as a cross-disciplinary team',
    Icon: Trophy,
  },
];

const outcomes = [
  'A completed capstone project package built around a real Nigerian energy challenge',
  'Practical skills across project finance, carbon markets, ESG, energy law, and climate finance',
  'Certificate of completion from the UNILAG Energy Club',
  'Direct exposure to senior energy sector professionals across multiple disciplines',
  'A cohort of 99 peers building careers across the energy transition',
];

const keyDetails = [
  { value: '19 June – 11 July', label: 'Bootcamp Dates' },
  { value: 'Fridays & Saturdays', label: 'Format' },
  { value: '100 Students', label: 'Cohort Size' },
  { value: '₦3,000', label: 'Commitment Fee' },
];

const ET360About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Mission split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20" data-aos="fade-up">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
              About the Programme
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-5 leading-tight">
              What is <span className="text-green-600">ET360°</span>?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              ET360° is a four-week intensive bootcamp preparing carefully selected UNILAG students for
              careers in Nigeria's energy transition economy. The programme integrates technical energy
              systems, infrastructure finance, climate policy, and carbon markets into one connected
              learning experience.
            </p>
            <a
              href="#registration"
              className="inline-block px-7 py-3 bg-green-600 text-white text-sm font-bold rounded-full hover:bg-green-700 transition-all duration-300"
            >
              Apply for a Spot
            </a>
          </div>

          <div className="bg-green-950 rounded-2xl p-8 lg:p-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-yellow-400 mb-4">
              Why It Exists
            </span>
            <p className="text-green-100 leading-relaxed mb-5 text-sm">
              Nigeria's National Carbon Market Framework was approved in January 2026 with a $3 billion
              target by 2030. Sovereign green bonds are being issued. The Electricity Act 2023 has opened
              state-level electricity markets. Renewable energy infrastructure is scaling fast.
            </p>
            <p className="text-white font-semibold leading-relaxed text-sm">
              The demand for skilled talent across energy policy, climate finance, carbon project
              development, and clean technology has never been greater.{' '}
              <span className="text-yellow-400">The missing link is not ambition. It is talent.</span>
            </p>
          </div>
        </div>

        {/* Key details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20" data-aos="fade-up">
          {keyDetails.map(({ value, label }) => (
            <div
              key={label}
              className="border border-gray-100 rounded-2xl p-6 text-center hover:border-green-200 hover:shadow-md transition-all duration-300 bg-gray-50"
            >
              <div className="text-xl font-black text-green-700 mb-2 leading-tight">{value}</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Learning modes */}
        <div className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-3">
              How You Learn
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-green-950">
              What Participants Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ title, description, Icon }, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-100 hover:border-green-200 rounded-2xl p-7 hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-700" strokeWidth={1.75} />
                </div>
                <h4 className="text-base font-bold text-green-950 mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start bg-green-950 rounded-3xl p-10 lg:p-14"
          data-aos="fade-up"
        >
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-yellow-400 mb-3">
              What You Come Out With
            </span>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">Programme Outcomes</h3>
            <p className="text-green-300 text-sm leading-relaxed">
              Every participant who completes ET360° leaves with tangible, career-ready assets — not just
              certificates.
            </p>
          </div>
          <ul className="lg:col-span-3 space-y-4">
            {outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-green-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-green-100 text-sm leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ET360About;
