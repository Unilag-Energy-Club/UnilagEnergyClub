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
      <section className="bg-sectionBg2 relative py-12" id="v-hero">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="max-w-4xl mx-auto flex flex-col text-center gap-3 relative mb-4">
              <div className="mx-auto" data-aos="fade-down">
                <span className="text-subtext">Welcome to</span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-mainText"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                University Of Lagos Energy Club
              </h1>
              <div className="max-w-3xl mx-auto" data-aos="fade-down" data-aos-delay="400">
                <span className="text-secondary">
                  A student organisation dedicated to fostering an understanding and appreciation of the energy sector and energy-related issues among the University of Lagos community
                </span>
              </div>

              {/* Floating Images */}
              {[
                { src: '/assets/media/images/float-4.png', className: 'top-0 left-0', delay: '500' },
                { src: '/assets/media/images/float-5.png', className: 'top-10 right-10', delay: '500' },
                { src: '/assets/media/images/float-6.png', className: 'bottom-20 left-10', delay: '500' },
                { src: '/assets/media/images/float-4.png', className: 'bottom-20 right-0', delay: '500' },
              ].map((float, index) => (
                <figure
                  key={index}
                  data-aos="fade-down-left"
                  data-aos-delay={float.delay}
                  className={`hidden md:block absolute ${float.className} max-w-[100px] animate-float`}
                >
                  <img src={float.src} alt="" className="w-full" />
                </figure>
              ))}
            </div>

            <div className="mx-auto mt-8">
              <figure>
                <img src="/assets/media/images/about-over.jpg" alt="About Hero" className="w-full h-96 object-cover rounded-lg size-full" />
              </figure>
            </div>
          </div>
        </div>
      </section>


      {/* Reason Section */}
      <section className="py-16" id="v-reason">
        <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-between items-center">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="text-center lg:text-left" data-aos="fade-right">
                <span className="text-[rgba(167,171,182,1)] font-medium">
                  Energy Club, Trusted Programs, and 100% Guaranteed
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-mainText text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right" data-aos-delay="300">
                Who can get into Unilag Energy Club?
              </h1>
              <div className="text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right" data-aos-delay="1100">
                <span className="text-[rgba(167,171,182,1)] font-semibold">
                  Open to all students, faculty, and staff of the University of Lagos interested in energy matters. Members must register with the club and agree to its code of conduct and objectives
                </span>
              </div>
              <div data-aos="fade-down">
                <ActionButton href="https://forms.gle/muTqzYtFmuNhdvhu5">
                  Join Us
                </ActionButton>
              </div>
            </div>
            <div data-aos="fade-left">
              <img src="/assets/media/images/reason.png" alt="Reason" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Club Features Section */}
      <section className="py-16" id="energy-club">
        <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-between items-center">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <h1 className="text-3xl md:text-4xl font-bold text-mainText text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right">
                About Energy Club
              </h1>
              <div className="text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right" data-aos-delay="300">
                <span className="text-[rgba(167,171,182,1)]">
                  The club aims to serve as a platform for discussion, innovation, and collaboration on energy, sustainability, and the environment.
                </span>
              </div>
              <div data-aos="fade-down" data-aos-delay="500">
                <a href="#" className="inline-block bg-secondary text-primary px-10 py-3 rounded-[30px] font-bold transition-all duration-200 hover:shadow-lg">
                  About Us
                </a>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clubFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border border-border flex flex-col gap-3 transition-all duration-300 hover:shadow-lg"
                    data-aos="fade-down"
                    data-aos-delay={300 * (index + 1)}
                  >
                    <div className="w-8 h-8 text-mainText">
                      {feature.icon}
                    </div>
                    <h5 className="text-lg font-bold text-mainText">{feature.title}</h5>
                    <p className="text-subtext text-sm">{feature.description}</p>
                    <button className="text-sm font-medium text-mainText hover:text-primary transition-colors">
                      More details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16" id="our-mission">
        <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-between items-center">
            <div data-aos="fade-right">
              <img src="/assets/media/images/1741281405536.jpeg" alt="Vision" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="text-center lg:text-left" data-aos="fade-left">
                  <span className="text-[rgba(85,85,85,1)] font-semibold text-lg">
                    Club's Vision
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-mainText text-center lg:text-left" data-aos="fade-left" data-aos-delay="300">
                  Our Mission
                </h1>
                <div className="text-center lg:text-left lg:max-w-[90%]" data-aos="fade-left" data-aos-delay="500">
                  <span className="text-[rgba(167,171,182,1)] font-black">
                    To bridge the University of Lagos and the global energy sector by developing knowledgeable, innovative, and principled future energy leaders who understand renewable energy systems, power generation, energy markets, and sustainability as tools for change.
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="text-center lg:text-left" data-aos="fade-left" data-aos-delay="700">
                  <span className="text-[rgba(85,85,85,1)] font-semibold text-lg">
                    Club's Vision
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-mainText text-center lg:text-left" data-aos="fade-left" data-aos-delay="900">
                  Our Vision
                </h1>
                <div className="text-center lg:text-left lg:max-w-[90%]" data-aos="fade-left" data-aos-delay="1100">
                  <span className="text-[rgba(167,171,182,1)] font-black">
                    To become the premier student-led organization fostering energy literacy and innovation across the University of Lagos and beyond, inspiring the next generation of energy professionals and change-makers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Stories Section */}
      <section className="py-16 bg-white" id="v-stories">
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
