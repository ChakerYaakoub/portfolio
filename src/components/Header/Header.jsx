import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const navItems = [
  { href: "#home", text: "Home" },
  { href: "#portfolio", text: "Overview" },
  { href: "#skills", text: "Skills" },
  { href: "#timeline", text: "Timeline" },
  { href: "#about", text: "About" },
  { href: "#Solutions", text: "Solutions" },
  { href: "#contact", text: "Contact" },
];

function Header({ data }) {
  console.log(data.userInfo[0]);
  const logoPath = data.userInfo[0].logoPath;
  return (
    <header className="header" data-header>
      <div className="container">
        <Link to={"/"}>
          <img
            src={logoPath}
            alt="Bilal Logo"
            className="logoImage"
          />
        </Link>

        <nav className="navbar" data-navbar>
          <ul className="navbar-list">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="navbar-link" data-nav-link>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="nav-toggle-btn"
          aria-label="toggle menu"
          data-nav-toggler
        >
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
