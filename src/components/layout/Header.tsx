import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activePage?: string;
}

const Header = ({ activePage = 'home' }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/et360', label: 'ET360°', page: 'et360' },
    { href: '/about', label: 'About Us', page: 'about' },
    { href: '/gallery', label: 'Gallery', page: 'gallery' },
    { href: '/blog', label: 'Blog', page: 'blog' },
    { href: '/contact', label: 'Contact', page: 'contact' },
  ];

  const isDarkHero = activePage === 'home' || activePage === 'et360';

  return (
    <>
      <header
        className={`py-4 flex justify-center w-full transition-all duration-300 z-50 ${
          isDarkHero ? 'absolute top-0 left-0 bg-transparent' : 'relative bg-white shadow-sm'
        }`}
        id="v-page-header"
      >
        <div className="mx-auto container px-4 lg:px-8">
          <div className="flex items-center justify-between p-6">
            {/* Logo */}
            <Link to="/">
              <figure role="img" className="max-w-16 w-full">
                <img
                  src="/assets/media/logos/unilogo.png"
                  alt="Unilag Energy Club"
                  className="w-full h-auto"
                />
              </figure>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link
                      to={link.href}
                      className={`text-base font-bold border-b transition-all duration-300 ${
                        activePage === link.page ? 'border-primary' : 'border-transparent hover:opacity-100'
                      }`}
                      style={{
                        color: isDarkHero
                          ? activePage === link.page ? '#E9C202' : 'rgba(255, 255, 255, 0.9)'
                          : activePage === link.page ? 'rgba(19, 22, 35, 1)' : 'rgba(56, 56, 56, 1)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
              style={{ color: isDarkHero ? 'rgba(255,255,255,0.9)' : 'rgba(19,22,35,1)' }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer — slides in from the right */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-green-950 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-7 border-b border-white/10">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <figure role="img" className="max-w-12 w-full">
                <img
                  src="/assets/media/logos/unilogo.png"
                  alt="Unilag Energy Club"
                  className="w-full h-auto"
                />
              </figure>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <li key={link.page}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 text-yellow-400'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA at bottom */}
          <div className="px-6 py-6 border-t border-white/10">
            <Link
              to="/et360"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-6 py-3 bg-yellow-400 text-green-950 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 text-sm"
            >
              Apply for ET360°
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
