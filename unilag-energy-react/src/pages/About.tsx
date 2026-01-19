import Layout from '../components/layout/Layout';
import ActionButton from '../components/shared/ActionButton';
import BlogGrid from '../components/shared/BlogGrid';

const About = () => {
  const clubFeatures = [
    {
      title: 'School Facility',
      description: 'To promote research and development in energy technologies and encourage practical problem-solving within the university',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5.17786 19.9978H2.05286C0.948287 19.9978 0.0528564 19.1024 0.0528564 17.9978V10.1409C0.0528564 9.60318 0.269384 9.08811 0.653588 8.7119L2.30212 7.09766C2.68633 6.72145 2.90286 6.20638 2.90286 5.66866V2.32338H5.27786V4.18385L8.15359 1.36795C8.9311 0.606625 10.1746 0.606625 10.9521 1.36795L18.4521 8.7119C18.8363 9.08811 19.0529 9.60318 19.0529 10.1409V17.9978C19.0529 19.1024 18.1574 19.9978 17.0529 19.9978H13.9279C12.8233 19.9978 11.9279 19.1024 11.9279 17.9978V16.4164C11.9279 15.3118 11.0324 14.4164 9.92786 14.4164H9.17786C8.07329 14.4164 7.17786 15.3118 7.17786 16.4164V17.9978C7.17786 19.1024 6.28243 19.9978 5.17786 19.9978Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Address',
      description: 'To create opportunities for members to network with professionals in the energy sector, fostering career growth and industry connections.',
      icon: (
        <svg width="27" height="26" viewBox="0 0 27 26" fill="none">
          <circle cx="18.722" cy="18.1586" r="6.73835" transform="rotate(-60 18.722 18.1586)" fill="currentColor" stroke="#F4F4F4" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Story',
      description: 'To collaborate with government bodies, industry partners, and academic institutions while providing hands-on training to equip members with essential skills for the energy sector',
      icon: (
        <svg width="27" height="26" viewBox="0 0 27 26" fill="none">
          <circle cx="18.722" cy="18.1586" r="6.73835" transform="rotate(-60 18.722 18.1586)" fill="currentColor" stroke="#F4F4F4" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Achievement',
      description: 'To engage in community service, conduct awareness campaigns on energy transition and conservation, and participate in discussions that influence energy policies.',
      icon: (
        <svg width="25" height="30" viewBox="0 0 25 30" fill="none">
          <path d="M10.1122 2.48803C11.5814 1.29526 13.6854 1.29526 15.1546 2.48803L15.5269 2.79027C16.1299 3.27983 16.8624 3.58324 17.635 3.66346L18.1119 3.71298C19.9942 3.90843 21.482 5.39619 21.6774 7.27848L21.7269 7.75543C21.8071 8.52799 22.1106 9.26049 22.6001 9.8635L22.9023 10.2358C24.0951 11.7049 24.0951 13.809 22.9023 15.2781L22.6001 15.6504C22.1106 16.2534 21.8071 16.9859 21.7269 17.7585L21.6774 18.2354C21.482 20.1177 19.9942 21.6055 18.1119 21.8009L17.635 21.8505C16.8624 21.9307 16.1299 22.2341 15.5269 22.7236L15.1546 23.0259C13.6854 24.2187 11.5814 24.2187 10.1122 23.0259L9.73997 22.7236C9.13696 22.2341 8.40446 21.9307 7.63189 21.8505L7.15495 21.8009C5.27266 21.6055 3.78489 20.1177 3.58945 18.2354L3.53992 17.7585C3.45971 16.9859 3.1563 16.2534 2.66673 15.6504L2.3645 15.2781C1.17172 13.809 1.17172 11.7049 2.3645 10.2358L2.66673 9.8635C3.1563 9.26049 3.45971 8.52799 3.53992 7.75543L3.58945 7.27848C3.78489 5.39619 5.27266 3.90843 7.15495 3.71298L7.63189 3.66346C8.40446 3.58324 9.13696 3.27983 9.73997 2.79027L10.1122 2.48803Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <Layout activePage="about">
      {/* Hero Section */}
      <section className="bg-sectionBg2 relative py-20 lg:py-28 overflow-hidden" id="v-hero">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 relative z-10">
              <div data-aos="fade-down">
                <span className="text-secondary font-bold tracking-wider uppercase text-sm">Welcome to</span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-mainText leading-tight"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                University Of Lagos <span className="text-secondary">Energy Club</span>
              </h1>
              <p
                className="text-lg text-subtext leading-relaxed max-w-xl"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                A student organisation dedicated to fostering an understanding and appreciation of the energy sector and energy-related issues among the University of Lagos community.
              </p>

              <div className="flex gap-4 mt-4" data-aos="fade-down" data-aos-delay="400">
                <div className="flex -space-x-4">
                  <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="/assets/media/gallery/PXL_20250902_170706140.PORTRAIT.ORIGINAL.jpg" alt="Member" />
                  <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="/assets/media/gallery/PXL_20250902_170827366.PORTRAIT.jpg" alt="Member" />
                  <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="/assets/media/gallery/PXL_20250902_171015838.PORTRAIT.jpg" alt="Member" />
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-secondary text-primary flex items-center justify-center font-bold text-xs">+100</div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-mainText">Join our Community</span>
                  <span className="text-xs text-subtext">Students & Professionals</span>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-delay="500">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                <img
                  src="/assets/media/gallery/1741281405536.jpeg"
                  alt="About Hero"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-bold text-xl">Building Future Leaders</p>
                  <p className="text-sm opacity-90">In Energy & Sustainability</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Reason Section */}
      <section className="py-20" id="v-reason">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="text-center lg:text-left" data-aos="fade-right">
                <span className="text-secondary font-bold tracking-wider uppercase text-sm">
                  Membership
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-mainText text-center lg:text-left leading-tight" data-aos="fade-right" data-aos-delay="200">
                Who can get into Unilag Energy Club?
              </h2>
              <div className="text-center lg:text-left space-y-6" data-aos="fade-right" data-aos-delay="300">
                <p className="text-subtext text-lg leading-relaxed">
                  We are open to all students, faculty, and staff of the University of Lagos who are passionate about energy matters. Whether you are in engineering, law, finance, or sciences, there is a place for you here.
                </p>
                <div className="flex items-center gap-4 text-mainText font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>Register with the club</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span>Agree to code of conduct</span>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <ActionButton href="https://forms.gle/muTqzYtFmuNhdvhu5">
                  Join Us Today
                </ActionButton>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <img
                src="/assets/media/gallery/PXL_20250902_170827366.PORTRAIT.jpg"
                alt="Club Members"
                className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-bold text-sm">Open for Registration</span>
                </div>
                <p className="text-xs text-subtext">Be part of the next generation of energy leaders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Features Section */}
      <section className="py-20 bg-sectionBg2" id="energy-club">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-6 sticky top-24">
              <span className="text-secondary font-bold tracking-wider uppercase text-sm">What we do</span>
              <h2 className="text-3xl md:text-5xl font-bold text-mainText leading-tight" data-aos="fade-right">
                More than just a<br />student club.
              </h2>
              <p className="text-subtext text-lg leading-relaxed" data-aos="fade-right" data-aos-delay="200">
                The club aims to serve as a platform for discussion, innovation, and collaboration on energy, sustainability, and the environment. We connect ambitious students with industry realities.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {clubFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-transparent hover:border-border shadow-sm hover:shadow-xl transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="w-12 h-12 rounded-full bg-sectionBg2 flex items-center justify-center text-mainText mb-4 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-mainText mb-3">{feature.title}</h3>
                  <p className="text-subtext leading-relaxed mb-4">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20" id="our-mission">
        <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
          <div className="bg-black rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div data-aos="fade-right">
                <img
                  src="/assets/media/gallery/1741281393475.jpeg"
                  alt="Vision"
                  className="w-full h-[500px] object-cover rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>
              <div className="flex flex-col gap-12">
                <div data-aos="fade-left">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-[2px] bg-secondary"></span>
                    <span className="text-secondary font-bold uppercase tracking-wider text-sm">Our Mission</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    To bridge the University of Lagos and the global energy sector.
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    We develop knowledgeable, innovative, and principled future energy leaders who understand renewable energy systems, power generation, energy markets, and sustainability as tools for change.
                  </p>
                </div>

                <div data-aos="fade-left" data-aos-delay="200">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-[2px] bg-secondary"></span>
                    <span className="text-secondary font-bold uppercase tracking-wider text-sm">Our Vision</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    To become the premier student-led energy organization.
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Fostering energy literacy and innovation across the University of Lagos and beyond, inspiring the next generation of energy professionals and change-makers.
                  </p>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32"></div>
          </div>
        </div>
      </section>
      {/* Latest Stories Section */}
      <section className="py-16 bg-white" id="blog">
        <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-secondary text-xl font-bold mb-2" data-aos="fade-down">Our Blog</span>
            <h1 className="text-3xl md:text-4xl font-bold text-mainText" data-aos="fade-down" data-aos-delay="200">
              Latest Stories
            </h1>
          </div>
          <BlogGrid limit={3} />
        </div>
      </section>
    </Layout>
  );
};

export default About;
