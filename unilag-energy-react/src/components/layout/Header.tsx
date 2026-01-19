import { Link } from 'react-router-dom';

interface HeaderProps {
  activePage?: string;
}

const Header = ({ activePage = 'home' }: HeaderProps) => {
  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/about', label: 'About Us', page: 'about' },
    { href: '/gallery', label: 'Gallery', page: 'gallery' },
    { href: '/blog', label: 'Blog', page: 'blog' },
    { href: '/contact', label: 'Contact', page: 'contact' },
  ];

  const isHome = activePage === 'home';

  return (
    <header
      className={`py-4 flex justify-center w-full transition-all duration-300 z-50 ${isHome ? 'absolute top-0 left-0 bg-transparent' : 'relative bg-white shadow-sm'}`}
      id="v-page-header"
    >
      <div className="mx-auto container px-4 lg:px-8">
        <div className="flex items-center justify-between p-6">
          <div>
            <Link to="/">
              <figure role="img" className="max-w-16 w-full">
                <img
                  src="/assets/media/logos/unilogo.png"
                  alt="Unilag Energy Club"
                  className="w-full h-auto"
                />
              </figure>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <Link
                    to={link.href}
                    className={`text-base font-bold border-b transition-all duration-300 ${activePage === link.page
                      ? 'border-primary'
                      : 'border-transparent hover:opacity-100'
                      }`}
                    style={{
                      color: isHome
                        ? (activePage === link.page ? '#E9C202' : 'rgba(255, 255, 255, 0.9)') // Yellow active, White inactive on Home
                        : (activePage === link.page ? 'rgba(19, 22, 35, 1)' : 'rgba(56, 56, 56, 1)'), // Dark text otherwise
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
