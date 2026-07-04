import { useState } from 'react';
import {
  Calendar, MapPin, Info, Phone,
  CheckCircle2, ArrowRight, Mail, ShieldCheck, CalendarPlus, Share2, Clock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FinaleSponsors from '../components/et360/FinaleSponsors';
import pb from '../lib/pocketbase';

// Google Calendar "add event" link for the Grand Finale (16 July 2026, 9:00 AM–4:00 PM WAT).
// Times are in UTC (Z): 9:00 AM WAT = 08:00Z, 4:00 PM WAT = 15:00Z (Nigeria is UTC+1, no DST).
const ADD_TO_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('ET360° Grand Finale · UNILAG Energy Club') +
  '&dates=20260716T080000Z/20260716T150000Z' +
  '&details=' + encodeURIComponent('The Grand Finale of the ET360° energy transition programme. Free and open to the public. #JoinTheTransition') +
  '&location=' + encodeURIComponent('Multipurpose Hall, University of Lagos, Akoka, Lagos');

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
  { Icon: MapPin, title: 'Venue', value: 'Multipurpose Hall, University of Lagos' },
  { Icon: CheckCircle2, title: 'Admission', value: 'Free · Open to all' },
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
const inputBase =
  'w-full min-h-[48px] px-4 py-3 rounded-xl border bg-white text-gray-900 text-base focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 transition-all duration-200';
const inputClass = `${inputBase} border-gray-200 hover:border-gray-300 focus:ring-green-600`;
const inputErrorClass = `${inputBase} border-red-400 hover:border-red-500 focus:ring-red-500`;
const labelClass = 'block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide';

type FormErrors = Partial<Record<keyof typeof emptyForm, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accept +, spaces, dashes, parentheses; require at least 7 digits overall.
const digitsOf = (s: string) => s.replace(/\D/g, '');

const validateForm = (data: typeof emptyForm): FormErrors => {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'Please enter your first name.';
  if (!data.lastName.trim()) errors.lastName = 'Please enter your last name.';

  const email = data.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  const phoneDigits = digitsOf(data.phone);
  if (!data.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (phoneDigits.length < 7) errors.phone = 'Please enter a valid phone number.';

  if (!data.role) errors.role = 'Please select an option.';
  if (!data.referral_source) errors.referral_source = 'Please select an option.';
  return errors;
};

const ET360Finale = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user starts correcting it.
    setFieldErrors((prev) => {
      if (!prev[name as keyof FormErrors]) return prev;
      const next = { ...prev };
      delete next[name as keyof FormErrors];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate before touching the network — blank/garbage submissions must not
    // create junk registrations (the native `required` attrs are inert here).
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstInvalid = Object.keys(errors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setFieldErrors({});
    setLoading(true);

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
      <section className="relative w-full overflow-hidden min-h-[66vh] md:min-h-[82vh]">
        <img
          src="/assets/media/images/et360_finale.png"
          alt="ET360° Grand Finale"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Atmospheric wash: darkens toward the bottom so the CTA reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />

        <div className="relative z-10 flex min-h-[66vh] md:min-h-[82vh] flex-col justify-end pb-9 sm:pb-12 px-4 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            {/* Gold hairline + kicker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-yellow-400" aria-hidden="true" />
              <span className="text-yellow-400 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                ET360° Grand Finale · 16 July 2026
              </span>
            </div>
            <a
              href="#register"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-yellow-400 text-green-950 font-black rounded-full hover:bg-yellow-300 active:scale-[0.98] transition-all duration-300 text-sm sm:text-base shadow-xl shadow-black/40"
            >
              Register to Attend
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── About the Event ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" data-aos="fade-up">

            {/* What is it */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-green-600" aria-hidden="true" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600">The Event</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-green-950 mb-6 leading-[1.1]">
                A real conversation about <span className="text-green-600">Nigeria's energy future</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                The ET360° Grand Finale brings together professionals, students, and industry leaders for an
                honest look at the energy transition: the realities on the ground, the opportunities opening
                up across the sector, and the ideas shaping what comes next.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                It's free, open to everyone, and built for anyone curious about where energy in Nigeria is
                heading. Come listen, ask questions, and be part of the conversation.
              </p>
              <a
                href="#register"
                className="group inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 active:scale-[0.98] transition-all text-sm shadow-lg shadow-green-600/25"
              >
                Register to Attend
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
              </a>
            </div>

            {/* Why come */}
            <div className="relative bg-green-950 rounded-3xl p-8 lg:p-10 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-7">
                  <span className="h-px w-8 bg-yellow-400" aria-hidden="true" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-400">Why You Should Come</span>
                </div>
                <ul className="space-y-5">
                  {[
                    'Hear directly from seasoned professionals and leaders shaping the energy transition',
                    'Understand where the sector is heading, and the opportunities opening up for your career or business',
                    'Connect with professionals, policymakers, investors, and people who care about the future of energy',
                    'Leave with real insight, new contacts, and ideas you can actually use',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-green-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-green-100 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Registration ── */}
      <section id="register" className="py-20 lg:py-28 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-green-950 mb-4">
              Register for the Grand Finale
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              Free entry, open to everyone. Takes under a minute, and we'll email your
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
                      Doors open <span className="text-white font-semibold">9:00 AM</span> · Arrive early to get a good seat
                    </p>
                  </div>
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
                          autoComplete="given-name" placeholder="John"
                          className={fieldErrors.firstName ? inputErrorClass : inputClass}
                          aria-invalid={!!fieldErrors.firstName}
                          aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
                        />
                        {fieldErrors.firstName && (
                          <p id="firstName-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>
                          Last Name <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="lastName" type="text" name="lastName"
                          value={formData.lastName} onChange={handleChange} required
                          autoComplete="family-name" placeholder="Doe"
                          className={fieldErrors.lastName ? inputErrorClass : inputClass}
                          aria-invalid={!!fieldErrors.lastName}
                          aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
                        />
                        {fieldErrors.lastName && (
                          <p id="lastName-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.lastName}</p>
                        )}
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
                          autoComplete="email" placeholder="john@example.com"
                          className={fieldErrors.email ? inputErrorClass : inputClass}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number <span className="text-yellow-600">*</span>
                        </label>
                        <input
                          id="phone" type="tel" name="phone" inputMode="tel"
                          value={formData.phone} onChange={handleChange} required
                          autoComplete="tel" placeholder="+234 801 000 0000"
                          className={fieldErrors.phone ? inputErrorClass : inputClass}
                          aria-invalid={!!fieldErrors.phone}
                          aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                        />
                        {fieldErrors.phone && (
                          <p id="phone-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.phone}</p>
                        )}
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
                        onChange={handleChange} required
                        className={fieldErrors.role ? inputErrorClass : inputClass}
                        aria-invalid={!!fieldErrors.role}
                        aria-describedby={fieldErrors.role ? 'role-error' : undefined}
                      >
                        <option value="">Select your role</option>
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {fieldErrors.role && (
                        <p id="role-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.role}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="referral_source" className={labelClass}>
                        How did you hear about this? <span className="text-yellow-600">*</span>
                      </label>
                      <select
                        id="referral_source" name="referral_source" value={formData.referral_source}
                        onChange={handleChange} required
                        className={fieldErrors.referral_source ? inputErrorClass : inputClass}
                        aria-invalid={!!fieldErrors.referral_source}
                        aria-describedby={fieldErrors.referral_source ? 'referral_source-error' : undefined}
                      >
                        <option value="">Select an option</option>
                        {referralSources.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {fieldErrors.referral_source && (
                        <p id="referral_source-error" className="mt-1.5 text-xs text-red-600">{fieldErrors.referral_source}</p>
                      )}
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

      {/* ── Sponsors ── */}
      <FinaleSponsors />

    </Layout>
  );
};

export default ET360Finale;
