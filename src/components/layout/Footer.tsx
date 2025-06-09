import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'; // Example social/contact icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping & Returns' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  const socialLinks = [
    { href: '#', label: 'Twitter', icon: Twitter },
    { href: '#', label: 'LinkedIn', icon: Linkedin },
    { href: '#', label: 'GitHub', icon: Github },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand/About */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-primary">YourLogo</Link>
            <p className="text-sm text-muted-foreground">
              High-quality products delivered to your doorstep. Excellence in every detail.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact/Newsletter (Example) */}
           <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter for updates.</p>
            {/* Simple newsletter form placeholder */}
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="flex-grow p-2 border rounded-md text-sm focus:ring-primary focus:border-primary" />
                <Button type="submit" size="sm">Subscribe</Button>
            </form>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <span>support@yourlogo.com</span>
            </div>
          </div>


          {/* Column 4: Social Media */}
          <div>
             <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Follow Us</h3>
             <div className="flex space-x-4">
               {socialLinks.map(link => (
                 <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.label}>
                   <link.icon className="h-5 w-5" />
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} YourLogo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;