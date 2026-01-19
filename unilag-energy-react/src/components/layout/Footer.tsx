const Footer = () => {
  return (
    <footer className="bg-[#efefef] pb-10 mt-[12rem] relative">
      <div className="container mx-auto px-4 lg:px-20">

        {/* Yellow Banner Section */}
        <div className="relative bg-[#ebc000] rounded-[40px] min-h-[400px] p-10 lg:p-16 flex items-center overflow-hidden -translate-y-1/3 shadow-xl z-20">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-white text-4xl lg:text-6xl mb-6 leading-tight">
              Join University Of <br /> Lagos Energy Club
            </h2>
            <p className="text-white text-lg font-medium mb-10 leading-loose opacity-95 max-w-xl">
              The club aims to serve as a platform for discussion, innovation, and collaboration on energy, sustainability, and the environment.
            </p>
            <a
              href="https://forms.gle/muTqzYtFmuNhdvhu5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#ebc000] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Register Now
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Large Lightbulb Graphic (Right Side) */}
          <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 opacity-30 lg:opacity-100 pointer-events-none">
            <svg width="450" height="450" viewBox="0 0 200 200" className="text-white/30 fill-white/20">
              {/* Simplified bulb shape matching the image style */}
              <path d="M100 20 C70 20 45 45 45 75 C45 100 60 115 65 125 L65 150 L135 150 L135 125 C140 115 155 100 155 75 C155 45 130 20 100 20Z" fill="white" fillOpacity="0.2" />
              {/* Base of bulb */}
              <rect x="75" y="155" width="50" height="8" rx="4" fill="white" fillOpacity="0.3" />
              <rect x="80" y="165" width="40" height="8" rx="4" fill="white" fillOpacity="0.3" />
              <rect x="90" y="175" width="20" height="8" rx="4" fill="white" fillOpacity="0.3" />
              {/* Inner icons (Hardhat/Gear representation) */}
              <circle cx="100" cy="75" r="30" stroke="white" strokeWidth="4" fill="none" />
              <path d="M85 70 L115 70 L110 55 C110 55 100 50 90 55 Z" fill="white" />
              {/* Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line key={deg} x1="100" y1="10" x2="100" y2="0" stroke="white" strokeWidth="5" strokeLinecap="round" transform={`rotate(${deg} 100 100)`} />
              ))}
            </svg>
          </div>
        </div>

        {/* Footer Navigation Section */}
        {/* Adjusted top margin to account for the banner's negative translate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 -mt-10 pb-12">

          {/* Column 1: Intro */}
          <div className="space-y-6">
            <h3 className="text-xl text-gray-800">Unilag Energy Club</h3>
            <p className="text-gray-500 leading-loose text-sm pr-4">
              Members must register with the club and agree to its code of conduct and objectives.
              Each membership term is for one academic session.
            </p>
            <div className="flex gap-4 text-gray-800">
              {/* Instagram */}
              <a href="https://www.instagram.com/unilagenergyclub/" className="hover:text-[#ebc000] hover:-translate-y-1 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/unilag-energy-club/" className="hover:text-[#ebc000] hover:-translate-y-1 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              {/* X/Twitter */}
              <a href="https://x.com/uecunilag" className="hover:text-[#ebc000] hover:-translate-y-1 transition-transform"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
            </div>
          </div>

          {/* Column 2: Home */}
          <div className="lg:pl-8">
            <h3 className="text-xl text-gray-800 mb-6">Home</h3>
            <ul className="space-y-4 font-medium text-gray-600 leading-loose">
              <li><a href="/#v-our-member" className="hover:text-[#ebc000] transition-colors">Membership</a></li>
              <li><a href="/about#our-mission" className="hover:text-[#ebc000] transition-colors">Our Mission</a></li>
              <li><a href="/#testimonials" className="hover:text-[#ebc000] transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h3 className="text-xl text-gray-800 mb-6">About</h3>
            <ul className="space-y-4 font-medium text-gray-600 leading-loose">
              <li><a href="/about#v-reason" className="hover:text-[#ebc000] transition-colors">For Who?</a></li>
              <li><a href="/blog" className="hover:text-[#ebc000] transition-colors">Blog</a></li>
              {/* TODO: Add board of directors page */}
              {/* <li><a href="/about#board-of-directors" className="hover:text-[#ebc000] transition-colors">Board of Directors</a></li> */}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl text-gray-800 mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-600 font-medium text-sm leading-loose">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[#ebc000] shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </div>
                <span className="break-all">unilagenergyclub@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[#ebc000] shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </div>
                <span>University Of Lagos</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 py-8 flex justify-center">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Information Technology Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;