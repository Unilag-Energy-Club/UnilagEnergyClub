const Footer = () => {
  return (
    <footer className="bg-[rgba(239,239,239,1)]" id="v-page-footer">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        {/* Banner Section */}
        <div className="bg-primary rounded-custom min-h-[400px] -mt-48 overflow-hidden p-8 relative">
          <div className="flex flex-col gap-4 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white text-balance">
              Join the Energy Revolution at Unilag!
            </h2>
            <p className="text-white text-lg max-w-2xl">
              Be part of a community that's shaping the future of energy in Nigeria and beyond.
            </p>
            <div className="mt-4">
              <a
                href="https://forms.gle/muTqzYtFmuNhdvhu5"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:shadow-lg"
              >
                <span>Join Us Today</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="M16 5c0 .742.733 1.85 1.475 2.78c.954 1.2 2.094 2.247 3.401 3.046C21.856 11.425 23.044 12 24 12m0 0c-.956 0-2.145.575-3.124 1.174c-1.307.8-2.447 1.847-3.401 3.045C16.733 17.15 16 18.26 16 19m8-7H0"
                    strokeWidth="1.4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <figure className="max-w-16 w-full mb-4">
                <img
                  src="/assets/media/logos/unilogo.png"
                  alt="Unilag Energy Club"
                  className="w-full h-auto"
                />
              </figure>
              <p className="text-subtext text-sm">
                A multidisciplinary student community dedicated to fostering learning, collaboration, 
                and innovation in the energy sector.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-mainText mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-subtext hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-subtext hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-subtext hover:text-primary transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-subtext hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-mainText mb-4">Contact</h3>
              <ul className="space-y-2 text-subtext text-sm">
                <li>University of Lagos</li>
                <li>Akoka, Yaba</li>
                <li>Lagos, Nigeria</li>
                <li>
                  <a href="mailto:info@unilagenergyclub.com" className="hover:text-primary transition-colors">
                    info@unilagenergyclub.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-bold text-mainText mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/unilagenergyclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-socialIconLinkClr hover:bg-primary hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="w-5 h-5">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                      <path d="M34 6H14a8 8 0 0 0-8 8v20a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V14a8 8 0 0 0-8-8z" />
                      <path d="M24 32a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                      <path d="M35 13h.01" />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/unilag-energy-club/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-socialIconLinkClr hover:bg-primary hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5">
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.51 8.796v1.697a3.74 3.74 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766c-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483a1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.6 1.6 0 0 1 1.6 1.606"
                        clipRule="evenodd"
                      />
                      <path d="M7.2 8.809H4V19.5h3.2z" />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://x.com/uecunilag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-socialIconLinkClr hover:bg-primary hover:text-white transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41 10C41 10 34 18 24 18C14 18 7 10 7 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10C7 10 14 28 24 28C34 28 41 10 41 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 41C14 41 21 23 24 23C27 23 34 41 34 41" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-subtext text-sm">
              © {new Date().getFullYear()} University of Lagos Energy Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
