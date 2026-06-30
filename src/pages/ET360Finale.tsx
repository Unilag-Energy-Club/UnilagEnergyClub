import { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, MessageSquare, Handshake, Star, Info, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import pb from '../lib/pocketbase';

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

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200';
const labelClass = 'block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide';

const ET360Finale = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
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

      // Fire-and-forget the branded confirmation email. A delivery hiccup must
      // never block or fail the registration itself, so we swallow errors here.
      const emailApi =
        import.meta.env.VITE_EMAIL_API_URL || '/et360.dp/api/send-confirmation';
      fetch(emailApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email }),
      }).catch(() => {
        /* non-blocking: confirmation email is best-effort */
      });

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
      <section id="register" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

          {/* Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 mb-4">
              Attendance
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-green-950 mb-4">Register to Attend</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Entry is free and open to the public. Register below to confirm your spot and receive event
              updates.
            </p>
          </div>

          {submitted ? (
            <div
              className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-green-200 p-12 text-center"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-green-950 mb-3">You're Registered!</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Thank you for registering for the ET360° Grand Finale. We look forward to seeing you on
                16 July 2026 at the University of Lagos.
              </p>
              <p className="text-xs text-gray-400">
                Questions?{' '}
                <a href="mailto:unilagenergyclub@gmail.com" className="text-green-600 font-semibold hover:underline">
                  unilagenergyclub@gmail.com
                </a>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start" data-aos="fade-up">

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-green-950 rounded-2xl p-8 text-white">
                  <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-6">
                    Event Details
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
                    <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Open to Everyone</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    The Grand Finale is free and open to all. Students, professionals, policymakers,
                    press, and the general public are all welcome to attend.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-4 h-4 text-green-600" strokeWidth={1.75} />
                    <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Questions?</h3>
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">General Inquiries</p>
                    <a href="mailto:unilagenergyclub@gmail.com" className="text-green-600 font-semibold text-sm hover:underline">
                      unilagenergyclub@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
                >
                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="+234 801 000 0000"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label className={labelClass}>I am attending as *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select your role</option>
                      {roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Referral */}
                  <div>
                    <label className={labelClass}>How did you hear about this event? *</label>
                    <select
                      name="referral_source"
                      value={formData.referral_source}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select an option</option>
                      {referralSources.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                      loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-lg shadow-green-600/20'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Confirm Attendance'
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By registering, you agree to receive updates about the ET360° Grand Finale via email.
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
