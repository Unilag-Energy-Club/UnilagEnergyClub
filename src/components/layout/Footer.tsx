const Footer = () => {
  return (
    <footer className="bg-[#efefef] pb-10 mt-[12rem] relative">
      <div className="container mx-auto px-4 lg:px-20">

        {/* ET360 Grand Finale Banner */}
        <div className="relative bg-green-950 rounded-[40px] min-h-[400px] p-10 lg:p-16 flex items-center overflow-hidden -translate-y-1/3 shadow-xl z-20">
          {/* Dot grid background */}
          <div
            className="absolute inset-0 rounded-[40px] z-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #4ade80 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <p className="text-[#ebc000] text-xs font-bold uppercase tracking-widest mb-4">
              UNILAG Energy Club presents
            </p>
            <h2 className="text-white text-4xl lg:text-6xl font-black mb-2 leading-tight">
              ET360° <br />
              <span className="text-[#ebc000]">Grand Finale</span>
            </h2>
            <p className="text-green-300 text-base font-medium mb-6 leading-relaxed max-w-lg">
              An honest look at the realities of Nigeria's energy transition and the opportunities ahead.
              Free and open to the public on 16 July 2026 at the University of Lagos.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['16 July 2026', 'University of Lagos', 'Free Entry'].map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="/et360/finale"
              className="inline-flex items-center gap-3 bg-[#ebc000] text-green-950 px-8 py-4 rounded-full font-bold text-base hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Register to Attend
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Decorative "360°" right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-10 lg:opacity-20 pr-8">
            <span
              className="text-white font-black leading-none"
              style={{ fontSize: 'clamp(8rem, 18vw, 16rem)' }}
            >
              360°
            </span>
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