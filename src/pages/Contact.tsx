import { useState, type FormEvent } from 'react';
import Layout from '../components/layout/Layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending delay for better UX
    setTimeout(() => {
      const subject = `Contact Form Submission from ${formData.fullName}`;
      const body = `Name: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:unilagenergyclubevents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;

      setLoading(false);
      setSuccess(true);
      setFormData({ fullName: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <Layout activePage="contact">
      <section className="py-16 relative bg-gradient-to-br from-sectionBg2 to-white">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] -z-10" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Section */}
            <div className="order-2 lg:order-1">
              <h1
                className="text-4xl md:text-5xl font-bold text-mainText mb-4 text-center lg:text-left"
                data-aos="fade-down"
              >
                Contact Us
              </h1>
              <p
                className="text-mainText mb-8 text-center lg:text-left"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                Have questions about the Energy Club? We'd love to hear from you! Reach out with inquiries, feedback, or partnership opportunities. Our team is here to help you join our community of energy innovators and sustainability advocates.
              </p>

              {success && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm animate-in fade-in slide-in-from-top-4 duration-300"
                  role="alert"
                >
                  <p className="font-bold">Message Ready!</p>
                  <p>Your email client should open shortly. If not, please email us directly at unilagenergyclubevents@gmail.com</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-mainText mb-2"
                    data-aos="fade-down"
                    data-aos-delay="400"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    data-aos="fade-down"
                    data-aos-delay="500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-mainText mb-2"
                    data-aos="fade-down"
                    data-aos-delay="600"
                  >
                    Email Address
                  </label>
                  <div
                    className="relative"
                    data-aos="fade-down"
                    data-aos-delay="700"
                  >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-subtext">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-.034 6.876l-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
                      </svg>
                    </span>
                    <input
                      required
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seca@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-mainText mb-2"
                    data-aos="fade-down"
                    data-aos-delay="800"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter message"
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    data-aos="fade-down"
                    data-aos-delay="900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-secondary text-primary font-bold py-3 px-8 rounded-[30px] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full">
                {/* Background decorative box */}
                <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3" />

                <div
                  className="relative bg-white border border-border rounded-2xl p-8 lg:p-12 flex flex-col gap-8 shadow-lg transition-all duration-300"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <h3 className="text-2xl font-bold text-mainText border-b border-gray-100 pb-4">
                    Get in Touch
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-mainText text-lg">Visit Us</h4>
                      <p className="text-subtext leading-relaxed">
                        Faculty of Engineering,<br />
                        University of Lagos,<br />
                        Akoka, Yaba, Lagos.
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-mainText text-lg">Email Us</h4>
                      <a href="mailto:info@unilagenergyclub.com" className="text-subtext hover:text-primary transition-colors">
                        info@unilagenergyclub.com
                      </a>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-mainText text-lg">Follow Us</h4>
                      <div className="flex gap-4 mt-2">
                        <a href="https://x.com/uecunilag" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/unilag-energy-club/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                        <a href="https://www.instagram.com/unilagenergyclub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
