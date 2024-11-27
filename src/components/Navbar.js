'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-logo">
        Mo's  Express GP Services
        </Link>
        <div className="navbar-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link href="/ship" className={pathname === '/ship' ? 'active' : ''}>
            Ship a Package
          </Link>
          <Link href="/enquiry" className={pathname === '/enquiry' ? 'active' : ''}>
            Enquiries
          </Link>
        </div>
      </div>
    </nav>
  );
}