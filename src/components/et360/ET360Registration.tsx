import { Calendar, MapPin, Users, Info, Phone, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const sideInfo: { Icon: LucideIcon; title: string; value: string }[] = [
  { Icon: Calendar, title: 'Dates', value: '19 June to 11 July 2026' },
  { Icon: MapPin, title: 'Format', value: 'Fridays, Saturdays + one weekday/week' },
  { Icon: Users, title: 'Cohort Size', value: '100 selected participants' },
];

const nextSteps = [
  'Shortlisted applicants will receive a task to complete by email',
  'Complete the task to demonstrate your curiosity and readiness',
  'Successful applicants will be notified and onboarded before the bootcamp begins',
];

const ET360Registration = () => {
  return (
    <section id="registration" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
            Applications
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-4">Join ET360°</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Only 100 carefully selected students will be admitted to Nigeria's most ambitious energy
            transition bootcamp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start" data-aos="fade-up">

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-green-950 rounded-2xl p-8 text-white">
              <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-6">
                Programme Details
              </h3>
              <div className="space-y-5">
                {sideInfo.map(({ Icon, title, value }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-green-300" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs text-green-400 font-semibold uppercase tracking-wide">{title}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-green-600" strokeWidth={1.75} />
                <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Who It Is For</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Currently enrolled UNILAG student (any level)',
                  'All faculties and disciplines eligible',
                  'Minimum 40% female participation target',
                  'Commitment to all 11 teaching days required',
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-green-600" strokeWidth={1.75} />
                <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Questions?</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-900 font-bold text-sm">Boluwatife Kolade</p>
                  <p className="text-gray-400 text-xs mb-1">President, UNILAG Energy Club</p>
                  <a href="tel:09157221573" className="text-green-600 font-semibold text-sm hover:underline">
                    09157221573
                  </a>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">General Inquiries</p>
                  <a href="mailto:unilagenergyclub@gmail.com" className="text-green-600 font-semibold text-sm hover:underline">
                    unilagenergyclub@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Closed state panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-gray-400" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-black text-green-950 mb-3">Applications Closed</h3>
              <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                Applications for ET360° 2026 are now closed. Thank you to everyone who applied. We received
                an exceptional response and are working through selections carefully.
              </p>

              <div className="bg-gray-50 rounded-2xl p-7 text-left mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                  What Happens Next (for applicants)
                </p>
                <ol className="space-y-4">
                  {nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-green-950 rounded-xl px-6 py-4 text-center mb-6">
                <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-1">
                  Bootcamp Begins
                </p>
                <p className="text-white font-bold text-lg">19 June 2026</p>
              </div>

              <p className="text-xs text-gray-400">
                Questions about your application?{' '}
                <a href="mailto:unilagenergyclub@gmail.com" className="text-green-600 font-semibold hover:underline">
                  unilagenergyclub@gmail.com
                </a>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ET360Registration;
