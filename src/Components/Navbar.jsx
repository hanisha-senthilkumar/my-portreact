import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll & active link
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (anchor) {
        e.preventDefault();
        const section = document.querySelector(anchor.getAttribute("href"));
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: "smooth",
          });
          setActive(anchor.textContent);
          setMenuOpen(false); // close mobile menu
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="logo">
          Hanisha's Portfolio<span className="primary-dot">.</span>
        </h1>

        {/* Desktop nav */}
        <div className="nav-items">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-item ${active === item.name ? "active" : ""}`}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={`mobile-nav-item ${
                active === item.name ? "active" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* ThemeToggle fixed and separate */}
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
