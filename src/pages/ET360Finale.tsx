import { useState } from 'react';
import {
  Calendar, MapPin, Users, Trophy, MessageSquare, Handshake, Star, Info, Phone,
  CheckCircle2, ArrowRight, Mail, ShieldCheck, Sparkles, CalendarPlus, Share2, Clock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import pb from '../lib/pocketbase';

// Google Calendar "add event" link for the Grand Finale (16 July 2026, 10:00–16:00 WAT).
const ADD_TO_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('ET360° Grand Finale — UNILAG Energy Club') +
  '&dates=20260716T090000Z/20260716T150000Z' +
  '&details=' + encodeURIComponent('The Grand Finale of the ET360° energy transition programme. Free and open to the public. #JoinTheTransition') +
  '&location=' + encodeURIComponent('University of Lagos, Akoka, Lagos');

const roles = [
  'UNILAG Student',
  'Student from another university',
  'Industry Professional',
  'Media or Press',
  'General Public',
  'Policymaker or Government Representative',
  'Academic or Researcher',
];

const referralSources = [
  'WhatsApp',
  'Instagram',
  'LinkedIn',
  'From a friend',
  'From an organisation or club',
  'Other',
];

const sideInfo: { Icon: LucideIcon; title: string; value: string }[] = [
  { Icon: Calendar, title: 'Date', value: '16 July 2026' },
  { Icon: MapPin, title: 'Venue', value: 'University of Lagos' },
  { Icon: Users, title: 'Expected Attendance', value: '1,000+ people' },
];

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  referral_source: '',
};

// 16px base text avoids iOS auto-zoom on focus; min-height keeps a ≥44px touch target.
const inputClass =
  'w-full min-h-[48px] px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent hover:border-gray-300 placeholder:text-gray-400 transition-all duration-200';
const labelClass = 'block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide';

const ET360Finale = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const email = formData.email.trim();

    try {
      await pb.collection('et360_finale_registrations').create({
        full_name: fullName,
        email,
        phone_number: formData.phone,
        role: formData.role,
        referral_source: formData.referral_source,
      });

      // Fire-and-forget the branded confirmation email (served by the DP service
      // at /uecdp). A delivery hiccup must never block or fail the registration.
      const emailApi =
        import.meta.env.VITE_EMAIL_API_URL || '/uecdp/api/send-confirmation';
      fetch(emailApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email }),
      }).catch(() => {
        /* best-effort: confirmation email is non-blocking */
      });

      setRegisteredName(formData.firstName.trim());
      setSubmitted(true);
      setFormData(emptyForm);
    } catch (err: unknown) {
      const pbErr = err as {
        data?: { data?: Record<string, { message: string }> };
        message?: string;
      };

      if (pbErr?.data?.data) {
        const fieldErrors = Object.values(pbErr.data.data)
          .map((f) => f.message)
          .filter(Boolean)
          .join(' ');
        setError(fieldErrors || 'Submission failed. Please check your details and try again.');
      } else {
        setError('Unable to submit your registration. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout activePage="et360-finale">

      {/* ── Banner ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '560px' }}>
        <img
          src="/assets/media/images/et360_finale.png"
          alt="ET360° Grand Finale"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-4 lg:px-8" style={{ minHeight: '560px' }}>
          <div className="container mx-auto max-w-6xl">
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-3">
              UNILAG Energy Club presents
            </p>
            <h1 className="font-black text-white leading-none mb-6">
              <span className="block text-4xl md:text-5xl lg:text-6xl mb-1">ET360°</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-yellow-400">Grand Finale</span>
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full">
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                16 July 2026
              </span>
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
                University of Lagos
              </span>
              <span className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-4 py-2 rounded-full">
                <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
                Open to the Public
              </span>
            </div>
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-green-950 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm shadow-lg shadow-black/20"
            >
              Register to Attend
            </a>
          </div>
        </div>
      </section>

      {/* ── About the Event ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

          {/* Two-column intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20" data-aos="fade-up">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
                The Event
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-5 leading-tight">
                What is the <span className="text-green-600">Grand Finale</span>?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The ET360° Grand Finale is the culmination of four weeks of intensive bootcamp work. Five
                winning capstone teams, one from each of the five real-world energy scenarios, present
                their solutions before a senior industry panel competing for the overall programme prize.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This is a public event. Whether you are a student, a professional, or someone curious
                about Nigeria's energy future, you are welcome to attend and witness the next generation
                of energy transition leaders in action.
              </p>
            </div>

            <div className="bg-green-950 rounded-2xl p-8 lg:p-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-yellow-400 mb-5">
                Why Attend
              </span>
              <ul className="space-y-4">
                {[
                  'Watch five cross-disciplinary teams compete with real, bankable energy project solutions',
                  'Hear from a senior panel of industry practitioners and investors as they evaluate the work',
                  'Network with energy professionals, policymakers, and climate finance experts',
                  "Be part of a landmark moment for Nigeria's energy transition community",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-green-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-green-100 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key details strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20" data-aos="fade-up">
            {[
              { value: '16 July 2026', label: 'Date' },
              { value: 'University of Lagos', label: 'Venue' },
              { value: '1,000+', label: 'Expected Attendees' },
              { value: 'Free Entry', label: 'Admission' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="border border-gray-100 rounded-2xl p-6 text-center hover:border-green-200 hover:shadow-md transition-all duration-300 bg-gray-50"
              >
                <div className="text-lg font-black text-green-700 mb-2 leading-tight">{value}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          {/* What to expect */}
          <div data-aos="fade-up">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-3">
                Programme
              </span>
              <h3 className="text-3xl lg:text-4xl font-black text-green-950">What to Expect</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  Icon: Trophy,
                  title: 'Capstone Competition',
                  desc: 'Five winning teams, one from each capstone track, present their complete project solutions in a final round before an expert panel.',
                },
                {
                  Icon: MessageSquare,
                  title: 'Industry Panel',
                  desc: 'Senior practitioners from energy finance, climate policy, project development, and legal practice evaluate and interrogate each team.',
                },
                {
                  Icon: Handshake,
                  title: 'Networking',
                  desc: 'Connect with energy professionals, investors, and policymakers alongside a new cohort of 100 trained energy transition practitioners.',
                },
                {
                  Icon: Star,
                  title: 'Awards Ceremony',
                  desc: 'The overall winning team is announced before a 1,000-strong audience, and all 100 bootcamp participants receive their certificates.',
                },
              ].map(({ Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-100 hover:border-green-200 rounded-2xl p-7 hover:shadow-lg transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-700" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-base font-bold text-green-950 mb-2">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Registration ── */}
      <section id="register" className="py-20 lg:py-28 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-green-700 bg-green-100 px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              Reserve Your Seat
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-950 mb-4">
              Register for the Grand Finale
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              Free entry, open to everyone. Takes under a minute — we'll email your
              confirmation and event details right away.
            </p>
          </div>

          {submitted ? (
            /* ── Success state ── */
            <div
              className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-green-100 overflow-hidden"
              data-aos="fade-up"
              role="status"
              aria-live="polite"
            >
              <div className="bg-green-950 px-8 py-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #facc15 0, transparent 45%)' }} />
                <div className="relative">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-yellow-400/30">
                    <CheckCircle2 className="w-11 h-11 text-green-950" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    You're in{registeredName ? `, ${registeredName}` : ''}! 🎉
                  </h3>
                  <p className="text-green-200 text-sm max-w-md mx-auto">
                    Your seat at the ET360° Grand Finale is reserved.
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                  <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
                  <p className="text-sm text-green-900 leading-relaxed">
                    A confirmation email is on its way. Don't see it in a few minutes? Check your
                    spam folder, or email us at{' '}
                    <a href="mailto:unilagenergyclub@gmail.com" className="font-semibold underline">unilagenergyclub@gmail.com</a>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={ADD_TO_CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-bold text-sm bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-green-600/20"
                  >
                    <CalendarPlus className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    Add to Calendar
                  </a>
                  <a
                    href="/uecdp"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-bold text-sm bg-yellow-400 text-green-950 hover:bg-yellow-300 active:scale-[0.98] transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    Create Your DP
                  </a>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                  See you on <span className="font-semibold text-gray-500">16 July 2026</span> at the University of Lagos.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start" data-aos="fade-up">

              {/* Sidebar */}
              <aside className="lg:col-span-2 space-y-5 lg:sticky lg:top-24">
                <div className="bg-green-950 rounded-2xl p-7 lg:p-8 text-white relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" aria-hidden="true" />
                  <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-6 relative">
                    Event Details
                  </h3>
                  <div className="space-y-5 relative">
                    {sideInfo.map(({ Icon, title, value }) => (
                      <div key={title} className="flex items-start gap-3.5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-yellow-400" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[11px] text-green-400 font-semibold uppercase tracking-wide">{title}</p>
                          <p className="text-white text-sm font-semibold">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 pt-6 border-t border-white/10 flex items-center gap-2.5 relative">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-400/15">
                      <Clock className="w-4 h-4 text-yellow-400" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <p className="text-green-200 text-xs leading-snug">
                      Doors open <span className="text-white font-semibold">10:00 AM</span> · Arrive early to get a good seat
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-green-600" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Open to Everyone</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Students, professionals, policymakers, press, and the general public are all
                    welcome. No ticket or fee required.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-green-600" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Questions?</h3>
                  </div>
                  <a href="mailto:unilagenergyclub@gmail.com" className="text-green-600 font-semibold text-sm hover:underline break-all">
                    unilagenergyclub@gmail.com
                  </a>
                </div>
              </aside>

              {/* Form */}
              <div className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6"
                >
                  {/* Your details */}
                  <fieldset className="space-y-5 border-0 p-0 m-0">
                    <legend className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Your details
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          First Name <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="firstName" type="text" name="firstName"
                          value={formData.firstName} onChange={handleChange} required
                          autoComplete="given-name" className={inputClass} placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          Last Name <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="lastName" type="text" name="lastName"
                          value={formData.lastName} onChange={handleChange} required
                          autoComplete="family-name" className={inputClass} placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email Address <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="email" type="email" name="email" inputMode="email"
                          value={formData.email} onChange={handleChange} required
                          autoComplete="email" className={inputClass} placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="phone" type="tel" name="phone" inputMode="tel"
                          value={formData.phone} onChange={handleChange} required
                          autoComplete="tel" className={inputClass} placeholder="+234 801 000 0000"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* A bit about you */}
                  <fieldset className="space-y-5 border-0 p-0 m-0 pt-1">
                    <legend className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      A bit about you
                    </legend>

                    <div>
                      <label htmlFor="role" className={labelClass}>
                        I'm attending as <span className="text-yellow-600">*</span>
                      </label>
                      <select
                        id="role" name="role" value={formData.role}
                        onChange={handleChange} required className={inputClass}
                      >
                        <option value="">Select your role</option>
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="referral_source" className={labelClass}>
                        How did you hear about this? <span className="text-yellow-600">*</span>
                      </label>
                      <select
                        id="referral_source" name="referral_source" value={formData.referral_source}
                        onChange={handleChange} required className={inputClass}
                      >
                        <option value="">Select an option</option>
                        {referralSources.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </fieldset>

                  {/* Error */}
                  {error && (
                    <div
                      className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700"
                      role="alert"
                      aria-live="assertive"
                    >
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group w-full min-h-[52px] py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      loading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] shadow-lg shadow-green-600/25'
                    }`}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Confirming your seat…
                      </>
                    ) : (
                      <>
                        Confirm My Attendance
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    We'll only email you about the Grand Finale. No spam, ever.
                  </p>
                </form>
              </div>

            </div>
          )}

        </div>
      </section>

    </Layout>
  );
};

export default ET360Finale;
