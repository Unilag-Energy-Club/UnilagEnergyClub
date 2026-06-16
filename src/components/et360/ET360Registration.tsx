import { useState } from 'react';
import { Calendar, MapPin, Users, CreditCard, Info, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import pb from '../../lib/pocketbase';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  matric: '',
  institution: 'University of Lagos',
  department: '',
  level: '',
  gender: '',
  expectations: '',
};

const levels = ['100', '200', '300', '400', '500'];

const sideInfo: { Icon: LucideIcon; title: string; value: string }[] = [
  { Icon: Calendar, title: 'Dates', value: '19 June – 11 July 2026' },
  { Icon: MapPin, title: 'Format', value: 'Fridays, Saturdays + one weekday/week' },
  { Icon: Users, title: 'Cohort Size', value: '100 selected participants' },
  { Icon: CreditCard, title: 'Fee (if selected)', value: '₦3,000 non-refundable' },
];

const requirements = [
  'Currently enrolled UNILAG student',
  'All faculties and levels eligible',
  'Commitment to all 11 teaching days',
  '₦3,000 fee paid only after selection',
];

const ET360Registration = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await pb.collection('et360_registrations').create({
        full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email,
        phone_number: formData.phone,
        matric_number: formData.matric,
        institution: formData.institution,
        department: formData.department,
        level: formData.level,
        gender: formData.gender,
        expectations: formData.expectations,
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
        setError('Unable to submit your application. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200';
  const labelClass = 'block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide';

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
            <h3 className="text-2xl font-black text-green-950 mb-3">Application Submitted!</h3>
            <p className="text-gray-500 mb-8 text-sm">
              Thank you — we've received your application and will review it carefully.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Next Steps</p>
              <ol className="space-y-3">
                {[
                  'We will shortlist candidates and send you a task to complete',
                  'Complete the task to demonstrate your curiosity and readiness',
                  "If selected, you'll receive an invoice for the ₦3,000 commitment fee",
                  'Your place is confirmed upon fee payment',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
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
                  <h3 className="text-xs font-bold text-green-950 uppercase tracking-wide">Requirements</h3>
                </div>
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
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

                {/* Academic identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Matric Number *</label>
                    <input
                      type="text"
                      name="matric"
                      value={formData.matric}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="202400000"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Institution *</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="University of Lagos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="e.g. Electrical Engineering"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Current Level *</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select level</option>
                      {levels.map((l) => (
                        <option key={l} value={l}>
                          {l} Level
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className={labelClass}>Gender *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['MALE', 'FEMALE'] as const).map((g) => (
                      <label
                        key={g}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          formData.gender === g
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          required
                          className="accent-green-600"
                        />
                        <span className="text-sm font-medium capitalize">{g.charAt(0) + g.slice(1).toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Expectations */}
                <div>
                  <label className={labelClass}>What are your expectations from ET360°? *</label>
                  <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={inputClass}
                    placeholder="Tell us what you hope to learn and how this programme aligns with your career goals..."
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Be specific — this helps us understand what you're looking for.
                  </p>
                </div>

                {/* Agreement */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs text-gray-600">
                  <span className="font-bold text-gray-800">Agreement: </span>
                  I understand that attendance across all 11 teaching days is mandatory, and that I will
                  pay a non-refundable commitment fee of ₦3,000 only if selected.
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
                    'Submit Application'
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to receive updates about ET360° via email and phone.
                </p>
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default ET360Registration;
