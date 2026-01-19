import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import ActionButton from '../components/shared/ActionButton';
import BlogGrid from '../components/shared/BlogGrid';

const HeroBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Check for small screens (mobile-first performance)
    const isSmallScreen = window.matchMedia('(max-width: 1023px)').matches;

    // 3. Check for slow connection (Network Information API)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection ? (connection.saveData === true || ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) : false;

    if (prefersReducedMotion || isSmallScreen || isSlowConnection) {
      return; // Keep strictly disabled for performance
    }

    // 4. Lazy Load: Only load when entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldPlay(true);
          observer.disconnect(); // Load once
        }
      },
      { rootMargin: '200px' } // Preload slightly before appearing
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* High-quality Poster Image (Immediate Fallback) */}
      <img
        src="/assets/media/images/uec_group.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Video Layer */}
      {shouldPlay && (
        <video
          ref={videoRef}
          preload="none"
          muted
          loop
          playsInline
          autoPlay
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/assets/media/video/uec videos.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <Layout activePage="home">
      {/* Hero Section */}
      <div className=''> {/* Container removed here to allow full bleed */}

        <section className="relative flex flex-col justify-center min-h-[85vh] overflow-hidden" id="v-hero">
          <HeroBackground />

          <div className="container mx-auto px-4 z-20 relative pt-[10rem]">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Hero Content */}
              <div className="w-11/12 md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col items-center gap-6 mb-8">
                {/* <div data-aos="fade-down">
                  <a className="text-gray-200 hover:text-primary transition-colors font-medium tracking-wide" href="https://forms.gle/HZBmQg3Z77fv9bNR6">
                    Join Us
                  </a>
                </div> */}
                <h1
                  className="text-4xl md:text-6xl lg:text-[5vw] font-bold text-white leading-tight drop-shadow-lg"
                  data-aos="fade-down"
                  data-aos-delay="300"
                >
                  University Of Lagos Energy Club
                </h1>
                <div className="w-full md:w-10/12 mx-auto" data-aos="fade-down" data-aos-delay="400">
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed drop-shadow-md">
                    A multidisciplinary student community dedicated to fostering learning, collaboration, and innovation in the energy sector through research, industry exposure, and real-world engagement.
                  </p>
                </div>
                <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
                  <ActionButton href="https://forms.gle/muTqzYtFmuNhdvhu5">
                    Join Us
                  </ActionButton>
                </div>

                {/* Floating Images (Kept but adjusted for new background context) */}
                <figure
                  data-aos="fade-up-right"
                  data-aos-delay="500"
                  className="hidden lg:flex absolute animate-[float_60s_ease-in-out_infinite] opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ top: '20%', left: '-20%' }}
                >
                  <img src="/assets/media/images/float_1.png" alt="" className="w-full max-w-[200px]" />
                </figure>
                <figure
                  data-aos="fade-down-left"
                  data-aos-delay="500"
                  className="hidden lg:flex absolute animate-[float_30s_ease-in-out_infinite] opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ top: '10%', right: '-25%' }}
                >
                  <img src="/assets/media/images/float_2.png" alt="" className="w-full max-w-[200px]" />
                </figure>
              </div>

              {/* Board Presentation (Moved inside hero content flow or kept as footer of hero) */}
            </div>
          </div>

          {/* Board Presentation Section - Kept relative at bottom */}
          {/* <div className="absolute bottom-0 w-full z-20 pb-8 bg-gradient-to-t from-black/80 to-transparent pt-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h5
                  className="text-white/90 text-xl md:text-2xl mb-6 font-medium shadow-black/50 drop-shadow-sm"
                  data-aos="fade-down"
                >
                  We learn, we lead, and <br /> we shape the future of energy together.
                </h5>

                <ul className="flex items-center justify-center gap-4">
                  <li data-aos="fade-up">
                    <a
                      href="https://www.instagram.com/unilagenergyclub/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="w-6 h-6">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                          <path d="M34 6H14a8 8 0 0 0-8 8v20a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V14a8 8 0 0 0-8-8z" />
                          <path d="M24 32a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                          <path d="M35 13h.01" />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li data-aos="fade-up" data-aos-delay="300">
                    <a
                      href="https://www.linkedin.com/company/unilag-energy-club/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                        <g fill="currentColor">
                          <path fillRule="evenodd" d="M12.51 8.796v1.697a3.74 3.74 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766c-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483a1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.6 1.6 0 0 1 1.6 1.606" clipRule="evenodd" />
                          <path d="M7.2 8.809H4V19.5h3.2z" />
                        </g>
                      </svg>
                    </a>
                  </li>
                  <li data-aos="fade-up" data-aos-delay="400">
                    <a
                      href="https://x.com/uecunilag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41 10C41 10 34 18 24 18C14 18 7 10 7 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 10C7 10 14 28 24 28C34 28 41 10 41 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 41C14 41 21 23 24 23C27 23 34 41 34 41" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </section>

        {/* Membership Section */}
        <section className="bg-sectionBg2 my-16" id="v-our-member">
          <div className="container mx-auto px-4 lg:px-8 my-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
              {/* Research and Development Card */}
              <div className="lg:col-span-4">
                <div
                  className="flex flex-col gap-2 relative h-full p-8 lg:p-16 rounded-3xl bg-cover bg-bottom bg-no-repeat"
                  style={{
                    backgroundColor: 'rgba(233, 194, 2, 1)',
                    backgroundImage: 'url(/assets/media/shapes/bg.png)'
                  }}
                  data-aos="fade-right"
                >
                  <span className="text-subtext">Let's promote</span>
                  <h2 className="text-white text-3xl md:text-4xl font-bold lg:max-w-[70%]">
                    Research and development
                  </h2>
                  <span className="text-subtext">In energy technologies...</span>

                  <figure className="absolute bottom-0 right-0 max-w-[115px] w-full" data-aos="fade-down" data-aos-delay="500">
                    <img src="/assets/media/avatars/profile.png" alt="" className="w-full rounded-br-3xl" />
                  </figure>
                </div>
              </div>

              {/* Membership Card */}
              <div className="lg:col-span-8" id="membership">
                <div className="h-full p-8 lg:p-14 rounded-3xl" style={{ backgroundColor: 'rgb(248, 248, 248)' }} data-aos="fade-left" data-aos-delay="300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
                    <div className="lg:col-span-4">
                      <div className="flex flex-col items-center lg:items-center">
                        <h1 className="text-4xl font-bold text-mainText text-center mb-3">Membership</h1>
                        <p className="text-subtext text-center text-sm lg:text-base">
                          Open to all students, faculty, and staff of the University of Lagos passionate about energy, sustainability, and making a real difference.
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-4 lg:mt-0">
                        {/* Technology Division */}
                        <div className="flex flex-col items-center gap-2 p-4">
                          <span className="text-3xl">💻</span>
                          <h3 className="font-bold text-mainText">Technology</h3>
                          <span className="text-[rgba(167,171,182,1)] text-xs text-center">
                            Innovation & R&D
                          </span>
                        </div>

                        {/* Finance Division */}
                        <div className="flex flex-col items-center gap-2 p-4">
                          <span className="text-3xl">📊</span>
                          <h3 className="font-bold text-mainText">Finance</h3>
                          <span className="text-[rgba(167,171,182,1)] text-xs text-center">
                            Markets & Investment
                          </span>
                        </div>

                        {/* Legal Division */}
                        <div className="flex flex-col items-center gap-2 p-4">
                          <span className="text-3xl">⚖️</span>
                          <h3 className="font-bold text-mainText">Legal</h3>
                          <span className="text-[rgba(167,171,182,1)] text-xs text-center">
                            Policy & Regulation
                          </span>
                        </div>
                      </div>
                      {/* Join Us Button */}
                      {/* <div>
                        <ActionButton
                          href="https://forms.gle/muTqzYtFmuNhdvhu5"
                          variant="secondary"
                          className="shadow-custom"
                        >
                          Join Us
                        </ActionButton>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About & Mission Section */}
        <div className="bg-sectionBg1 mt-16">
          {/* About Section */}
          <section className="py-20" id="v-about">
            <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center px-12">
                <div className="flex flex-col items-center lg:items-start gap-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-right">
                    About Us
                  </h1>
                  <div className="lg:max-w-[90%] text-center lg:text-left" data-aos="fade-right" data-aos-delay="300">
                    <span className="text-white text-lg md:text-xl font-medium">
                      The University of Lagos Energy Club is a student community where learning, collaboration, and curiosity come together. We bridge the gap between classroom learning and real-world practice through technical workshops, research, policy discussions, and collaborations with industry experts. Our three divisions—Technology, Finance, and Legal—allow members to grow in areas matching their interests while learning from diverse perspectives.
                    </span>
                  </div>
                  <div data-aos="fade-down" data-aos-delay="500">
                    <a
                      href="/about"
                      className="inline-block bg-white text-primary px-10 py-3 rounded-[30px] font-bold transition-all duration-200 hover:shadow-lg"
                    >
                      Explore
                    </a>
                  </div>
                </div>
                <div className="text-center" data-aos="fade-left">
                  <img src="/assets/media/images/about.png" alt="About" className="w-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-sectionBg2" id="v-mission">
            <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-between items-center px-12">
                <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-1 gap-3 w-full">

                    {/* Top Grid: Top half of the image */}
                    <div
                      data-aos="fade-down"
                      data-aos-delay="300"
                      className="rounded-lg shadow-md"
                      style={{
                        backgroundImage: 'url(/assets/media/images/1.png)',
                        backgroundSize: '100% 200%', // 100% width, 200% height to show only top half
                        backgroundPosition: 'top center',
                        height: '250px',
                        width: '100%',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>

                    {/* Bottom Grid: Split into two */}
                    <div className="grid grid-cols-2 gap-3">

                      {/* Bottom Left: Bottom-left quadrant of the image */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="rounded-lg shadow-md"
                        style={{
                          backgroundImage: 'url(/assets/media/images/1.png)',
                          backgroundSize: '200% 200%', // 200% width (since container is 50%), 200% height
                          backgroundPosition: 'left bottom',
                          height: '250px',
                          width: '100%',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                      </div>

                      {/* Bottom Right: Bottom-right quadrant of the image */}
                      <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="rounded-lg shadow-md"
                        style={{
                          backgroundImage: 'url(/assets/media/images/1.png)',
                          backgroundSize: '200% 200%', // 200% width, 200% height
                          backgroundPosition: 'right bottom',
                          height: '250px',
                          width: '100%',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                      </div>

                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start gap-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-mainText text-center lg:text-left" data-aos="fade-down">
                    Our Mission
                  </h1>
                  <div className="text-center lg:text-left" data-aos="fade-down" data-aos-delay="300">
                    <span className="text-subtext text-lg md:text-xl font-medium">
                      To bridge the University of Lagos and the global energy sector by developing knowledgeable, innovative, and principled future energy leaders who understand renewable energy systems, power generation, energy markets, and sustainability as tools for change.
                    </span>
                  </div>
                  <div data-aos="fade-down" data-aos-delay="500">
                    <ActionButton href="https://forms.gle/muTqzYtFmuNhdvhu5" variant="secondary">
                      Join Us
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Divisions Section */}
        <section className="py-16" id="v-division">
          <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-between items-center px-12">
              <div className="flex flex-col items-center lg:items-start gap-6">
                <div data-aos="fade-down">
                  <span className="text-secondary text-xl font-bold">Our Divisions</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-mainText text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right" data-aos-delay="300">
                  The University of Lagos Energy Club has three (3) divisions: the finance, Legal, and Technology divisions.
                </h1>
                <div className="text-center lg:text-left lg:max-w-[90%]" data-aos="fade-right" data-aos-delay="400">
                  <span className="text-subtext">
                    The club operates through a structure that connects learning with teamwork, ensuring that each member has a clear role and pathway for growth.
                  </span>
                </div>
                <div data-aos="fade-down" data-aos-delay="500">
                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 bg-secondary text-primary px-10 py-2 rounded-[30px] font-bold transition-all duration-200 hover:shadow-custom"
                  >
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m10 17l5-5l-5-5" />
                    </svg>
                  </a>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="500">
                <img src="/assets/media/images/heroimage.png" alt="Divisions" className="w-full" />
              </div>
            </div>
          </div>
        </section>



        {/* Latest News Section */}
        <section className="py-16 bg-white" id="v-news">
          <div className="container mx-auto px-4 lg:px-8 xl:px-0 max-w-7xl">
            <div className="flex flex-col items-center mb-12 text-center">
              <span className="text-secondary text-xl font-bold mb-2" data-aos="fade-down">Our Blog</span>
              <h1 className="text-3xl md:text-4xl font-bold text-mainText" data-aos="fade-down" data-aos-delay="200">
                Latest News & Insights
              </h1>
              <p className="text-subtext mt-4 max-w-2xl" data-aos="fade-down" data-aos-delay="300">
                Stay updated with the latest happenings, articles, and research from our club members.
              </p>
            </div>

            <BlogGrid limit={3} />

            <div className="text-center mt-12" data-aos="fade-up">
              <ActionButton href="/blog" variant="secondary">
                View All News
              </ActionButton>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24" id="testimonials">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="max-w-4xl mx-auto flex flex-col text-center gap-4 relative mb-4">
              <div className="absolute top-0 left-0 md:left-[-5%]" data-aos="fade-right">
                <svg width="59" height="48" viewBox="0 0 59 48" fill="none" className="w-12 h-10">
                  <path d="M0 48V31.9412C0 25.9412 1.05672 20.4118 3.17015 15.3529C5.28358 10.2941 8.86468 5.17647 13.9134 0L23.0716 7.2353C20.1363 10.1765 17.9055 12.9412 16.3791 15.5294C14.8527 18.1177 13.8547 20.7647 13.3851 23.4706H24.6567V48H0ZM34.3433 48V31.9412C34.3433 25.9412 35.4 20.4118 37.5134 15.3529C39.6269 10.2941 43.208 5.17647 48.2567 0L57.4149 7.2353C54.4796 10.1765 52.2488 12.9412 50.7224 15.5294C49.196 18.1177 48.198 20.7647 47.7284 23.4706H59V48H34.3433Z" fill="#E9E9E9" />
                </svg>
              </div>
              <div className="mx-auto" data-aos="fade-down" data-aos-delay="300">
                <span className="text-[rgba(157,157,157,1)] font-medium text-lg">What our members say</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-mainText" data-aos="fade-down" data-aos-delay="400">
                Testimonial
              </h1>
              <div className="max-w-3xl mx-auto" data-aos="fade-down" data-aos-delay="500">
                <span className="text-[rgba(85,85,85,1)] font-medium text-lg">
                  Join us for an interactive session where energy professionals share insights on the future of renewable energy and sustainable development in Nigeria.
                </span>
              </div>
              <div className="max-w-3xl mx-auto mb-4" data-aos="fade-down" data-aos-delay="700">
                <span className="text-secondary text-2xl">
                  Being part of the Energy Club has transformed how I understand the energy sector. The diverse perspectives from the Technology, Finance, and Legal divisions gave me a comprehensive view of real-world challenges and solutions in sustainable energy.
                </span>
              </div>
              <div>
                <h4 className="text-[rgba(2,11,31,1)] font-bold text-xl" data-aos="fade-up" data-aos-delay="300">
                  Chioma Okafor
                </h4>
                <div data-aos="fade-up" data-aos-delay="400">
                  <span className="text-[rgba(2,11,31,1)]">Vice President, Technology Division</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Distinctive Section */}
        <section className="mb-20 container mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline mb-8">
            <div className="md:col-span-7">
              <div className="md:max-w-[83%]">
                <h1 className="text-3xl md:text-4xl font-bold text-mainText">
                  What makes Unilag Energy Club distinctive?
                </h1>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <p className="text-mainText">
                  At Unilag Energy Club, we combine bold ideas, powerful pedagogy, and collaborative cohort-based learning to deliver unparalleled management education and foster lifelong learning networks.
                </p>
                <div>
                  <a href="/about" className="text-black font-bold flex items-center gap-2 hover:text-primary transition-colors">
                    More About Unilag Energy Club
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66" d="M7 7h10m0 0v10m0-10L7 17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Energy Education',
                    text: 'We educate members about renewable and non-renewable energy sources, energy policies, and sustainable practices through comprehensive seminars and workshops.',
                  },
                  {
                    title: 'Innovation & Creativity',
                    text: 'We promote research and development in energy technologies, encouraging practical problem-solving and innovation within the university community.',
                  },
                  {
                    title: 'Industry Immersion',
                    text: 'We create networking opportunities with energy sector professionals, fostering career growth and meaningful connections in the industry.',
                  },
                  {
                    title: 'Community Impact',
                    text: 'We engage in community service and awareness campaigns on energy transition and conservation, participating in policy discussions that shape energy futures.',
                  },
                  {
                    title: 'Partnerships & Collaboration',
                    text: 'We collaborate with government bodies, industry partners, and academic institutions, providing hands-on training to equip members with essential sector skills.',
                  },
                ].map((item, index) => (
                  <li key={index} className="flex flex-col pl-16 relative">
                    <div className="absolute left-0 top-0 w-12 h-px bg-black/50 mt-4"></div>
                    <b className="text-xl text-mainText mb-2">{item.title}</b>
                    <p className="text-subtext">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <figure className="h-[400px]">
                <img
                  src="/assets/media/images/1741281393475.jpeg"
                  alt="Energy Club"
                  className="w-full h-full object-cover object-center"
                />
              </figure>
            </div>
          </div>
        </section>

      </div >
    </Layout >
  );
};

export default Home;
