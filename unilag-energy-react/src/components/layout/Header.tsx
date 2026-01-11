import { Link } from 'react-router-dom';

interface HeaderProps {
  activePage?: string;
}

const Header = ({ activePage = 'home' }: HeaderProps) => {
  const navLinks = [
    { href: '/', label: 'Home', page: 'home' },
    { href: '/about', label: 'About Us', page: 'about' },
    { href: '/gallery', label: 'Gallery', page: 'gallery' },
    { href: '/contact', label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="py-4" id="v-page-header">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
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
                    className={`text-base font-bold border-b transition-all duration-300 hover:text-black hover:opacity-100 ${
                      activePage === link.page
                        ? 'text-mainText border-b-2 border-primary'
                        : 'text-[rgba(19,22,35,1)] border-transparent'
                    }`}
                    style={{
                      color: activePage === link.page ? 'rgba(19, 22, 35, 1)' : 'rgba(56, 56, 56, 1)',
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
