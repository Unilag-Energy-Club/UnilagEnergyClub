import { useState, type FormEvent } from 'react';
import Layout from '../components/layout/Layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
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
                  className="w-full bg-secondary text-primary font-bold py-3 px-8 rounded-[30px] hover:shadow-lg transition-all duration-200"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  SEND
                </button>
              </form>
            </div>

            {/* Upload Section */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative">
                {/* Background decorative box */}
                <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6" />
                
                <div 
                  className="relative bg-white border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-secondary"
                  >
                    <path
                      opacity="0.4"
                      d="M14.2499 15.8333C15.9988 15.8333 17.4166 14.4156 17.4166 12.6667C17.4166 10.9178 15.9988 9.5 14.2499 9.5C12.501 9.5 11.0833 10.9178 11.0833 12.6667C11.0833 14.4156 12.501 15.8333 14.2499 15.8333Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5834 3.16675H14.2501C6.33341 3.16675 3.16675 6.33341 3.16675 14.2501V23.7501C3.16675 31.6667 6.33341 34.8334 14.2501 34.8334H23.7501C31.6667 34.8334 34.8334 31.6667 34.8334 23.7501V15.8334"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g opacity="0.4">
                      <path
                        d="M28.5 12.6667V3.16675L31.6667 6.33341"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.4999 3.16675L25.3333 6.33341"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <path
                      opacity="0.4"
                      d="M4.22754 30.0042L12.0334 24.7634C13.2842 23.9242 15.0892 24.0192 16.2134 24.9851L16.7359 25.4442C17.9709 26.5051 19.9659 26.5051 21.2009 25.4442L27.7875 19.7917C29.0225 18.7309 31.0175 18.7309 32.2525 19.7917L34.8334 22.0084"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-secondary font-medium text-lg">Upload photo</p>
                  <p className="text-subtext text-sm">accepted formats: jpeg, pdf, png</p>
                  <input
                    type="file"
                    className="hidden"
                    id="fileUpload"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
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
