import { useState, useEffect, useCallback } from 'react';
import {
  Sun, Briefcase, Zap, BarChart2, Globe, GraduationCap, Landmark,
  UserCheck, Star, Megaphone, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Sponsor {
  name: string;
  role: string;
  tier: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badgeClass: string;
}

const sponsors: Sponsor[] = [
  { name: 'Felicity Solar Nigeria Limited', role: 'Renewable Energy', tier: 'Flagship', Icon: Sun, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', badgeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'Chapel Hill Denham', role: 'Investment Banking', tier: 'Flagship', Icon: Briefcase, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', badgeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'LPV Technologies', role: 'Energy Technology', tier: 'Flagship', Icon: Zap, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', badgeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'DataCamp', role: 'Data & AI Training', tier: 'Knowledge', Icon: BarChart2, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', badgeClass: 'bg-blue-100 text-blue-800' },
  { name: 'Energy Transition Leaders', role: 'Sector Expertise', tier: 'Knowledge', Icon: Globe, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', badgeClass: 'bg-blue-100 text-blue-800' },
  { name: 'University of Lagos', role: 'Institutional Support', tier: 'Supporting', Icon: GraduationCap, iconBg: 'bg-green-100', iconColor: 'text-green-700', badgeClass: 'bg-green-100 text-green-800' },
  { name: 'Development Finance Institutions', role: 'Financial Support', tier: 'Supporting', Icon: Landmark, iconBg: 'bg-green-100', iconColor: 'text-green-700', badgeClass: 'bg-green-100 text-green-800' },
];

const perks = [
  { title: 'Recruitment', desc: 'Direct access to top-performing bootcamp graduates', Icon: UserCheck },
  { title: 'Brand Visibility', desc: 'Prominent placement across programme materials and events', Icon: Star },
  { title: 'Thought Leadership', desc: 'Opportunity to deliver masterclasses and mentor students', Icon: Megaphone },
];

const ET360Sponsors = () => {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, sponsors.length - perView);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
    [maxIndex]
  );

  // Clamp when perView changes on resize
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
            Partners
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-4">
            Our Sponsors &amp; Partners
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            ET360° is made possible through the support of leading organizations in Nigeria's energy
            sector.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-aos="fade-up"
        >
          {/* Track */}
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
            >
              {sponsors.map((sponsor, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-14 h-14 rounded-2xl ${sponsor.iconBg} flex items-center justify-center mb-4`}>
                      <sponsor.Icon className={`w-7 h-7 ${sponsor.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <span className={`text-xs font-bold px-3 py-0.5 rounded-full mb-3 ${sponsor.badgeClass}`}>
                      {sponsor.tier}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{sponsor.name}</h4>
                    <p className="text-gray-400 text-xs">{sponsor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow prev */}
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-700 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Arrow next */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-700 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8" data-aos="fade-up">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-green-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Sponsorship CTA */}
        <div
          className="mt-20 bg-green-950 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
          data-aos="fade-up"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Partner with ET360°</h3>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              ET360° offers unique opportunities for organizations to connect with Nigeria's next
              generation of energy transition leaders and shape the future of the industry.
            </p>
            <div className="space-y-5">
              {perks.map(({ title, desc, Icon }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-yellow-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{title}</p>
                    <p className="text-green-300 text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-4">
              Contact Sponsorship
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-white font-bold text-sm">Olubo Olamilekan</p>
                <p className="text-green-300 text-xs mb-1">Director of Sponsorship &amp; Partnership</p>
                <a href="tel:08127672112" className="text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors">
                  08127672112
                </a>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Samuel Olubi</p>
                <p className="text-green-300 text-xs mb-1">Deputy Director of Sponsorship &amp; Partnership</p>
                <a href="tel:09065602408" className="text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors">
                  09065602408
                </a>
              </div>
              <a
                href="mailto:unilagenergyclub@gmail.com"
                className="inline-block w-full text-center px-6 py-3 bg-yellow-400 text-green-950 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ET360Sponsors;
