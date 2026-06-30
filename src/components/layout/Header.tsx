import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, Trophy } from 'lucide-react';

interface NavChild {
  href: string;
  label: string;
  page: string;
  description: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface NavLink {
  href: string;
  label: string;
  page: string;
  children?: NavChild[];
}

interface HeaderProps {
  activePage?: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', page: 'home' },
  {
    href: '/et360',
    label: 'ET360°',
    page: 'et360',
    children: [
      {
        href: '/et360',
        label: 'ET360 Bootcamp',
        page: 'et360',
        description: '4-week intensive programme',
        Icon: GraduationCap,
      },
      {
        href: '/et360/finale',
        label: 'ET360 Finale',
        page: 'et360-finale',
        description: '17 July 2026 · Open to public',
        Icon: Trophy,
      },
    ],
  },
  { href: '/about', label: 'About Us', page: 'about' },
  { href: '/gallery', label: 'Gallery', page: 'gallery' },
  { href: '/blog', label: 'Blog', page: 'blog' },
  { href: '/contact', label: 'Contact', page: 'contact' },
];

const Header = ({ activePage = 'home' }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isDarkHero =
    activePage === 'home' || activePage === 'et360' || activePage === 'et360-finale';

  const isNavItemActive = (link: NavLink) => {
    if (link.children) return link.children.some((c) => c.page === activePage);
    return activePage === link.page;
  };

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
                {navLinks.map((link) => {
                  const active = isNavItemActive(link);
                  const textColor = isDarkHero
                    ? active ? '#E9C202' : 'rgba(255, 255, 255, 0.9)'
                    : active ? 'rgba(19, 22, 35, 1)' : 'rgba(56, 56, 56, 1)';

                  if (link.children) {
                    return (
                      <li key={link.page} className="relative group">
                        {/* Trigger */}
                        <button
                          className={`flex items-center gap-1 text-base font-bold border-b pb-0.5 transition-all duration-300 cursor-default ${
                            active ? 'border-primary' : 'border-transparent'
                          }`}
                          style={{ color: textColor }}
                          tabIndex={0}
                        >
                          {link.label}
                          <ChevronDown
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                            strokeWidth={2.5}
                          />
                        </button>

                        {/* Invisible bridge so mouse can travel from trigger to panel */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 h-3" />

                        {/* Dropdown panel */}
                        <div
                          className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-60 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50"
                        >
                          {/* Small arrow notch */}
                          <div className="flex justify-center mb-1">
                            <div className="w-2.5 h-2.5 bg-white border-l border-t border-gray-100 rotate-45 shadow-sm" />
                          </div>
                          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                ET360°
                              </p>
                            </div>
                            <div className="p-2">
                              {link.children.map((child) => {
                                const childActive = activePage === child.page;
                                return (
                                  <Link
                                    key={child.page}
                                    to={child.href}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group/item ${
                                      childActive
                                        ? 'bg-green-50'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <div
                                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                                        childActive
                                          ? 'bg-green-600'
                                          : 'bg-gray-100 group-hover/item:bg-green-100'
                                      }`}
                                    >
                                      <child.Icon
                                        className={`w-4 h-4 transition-colors duration-150 ${
                                          childActive
                                            ? 'text-white'
                                            : 'text-gray-500 group-hover/item:text-green-700'
                                        }`}
                                        strokeWidth={1.75}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p
                                        className={`text-sm font-bold leading-tight ${
                                          childActive ? 'text-green-700' : 'text-gray-800 group-hover/item:text-green-700'
                                        }`}
                                      >
                                        {child.label}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-0.5">{child.description}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={link.page}>
                      <Link
                        to={link.href}
                        className={`text-base font-bold border-b pb-0.5 transition-all duration-300 ${
                          active ? 'border-primary' : 'border-transparent hover:opacity-80'
                        }`}
                        style={{ color: textColor }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Hamburger (mobile) */}
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

      {/* ── Mobile drawer ── */}
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

        {/* Drawer */}
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
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-0.5">
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <li key={link.page}>
                      <p className="px-3 pt-5 pb-2 text-xs font-bold text-green-400 uppercase tracking-widest">
                        {link.label}
                      </p>
                      <ul className="space-y-0.5">
                        {link.children.map((child) => {
                          const childActive = activePage === child.page;
                          return (
                            <li key={child.page}>
                              <Link
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                                  childActive
                                    ? 'bg-white/10 text-yellow-400'
                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <div
                                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                                    childActive ? 'bg-yellow-400/20' : 'bg-white/10'
                                  }`}
                                >
                                  <child.Icon
                                    className={`w-3.5 h-3.5 ${childActive ? 'text-yellow-400' : 'text-white/60'}`}
                                    strokeWidth={1.75}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-bold leading-tight">{child.label}</p>
                                  <p className={`text-xs mt-0.5 ${childActive ? 'text-yellow-300/70' : 'text-white/40'}`}>
                                    {child.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }

                const isActive = activePage === link.page;
                return (
                  <li key={link.page}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-3 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
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

          {/* CTA */}
          <div className="px-5 py-6 border-t border-white/10">
            <Link
              to="/et360/finale"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-6 py-3 bg-yellow-400 text-green-950 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 text-sm"
            >
              Attend the Grand Finale
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
