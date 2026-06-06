import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/mockData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileOpen
          ? "bg-white shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">🌾</span>
            </div>
            <div>
              <span
                className={`font-black text-xl tracking-tight transition-colors ${
                  isScrolled || mobileOpen ? "text-gray-900" : "text-white"
                }`}
              >
                Rice<span className="text-emerald-500">Xport</span>
              </span>
              <div
                className={`text-xs font-medium transition-colors ${
                  isScrolled || mobileOpen ? "text-gray-400" : "text-white/70"
                }`}
              >
                Export Management Platform
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-emerald-600 text-white"
                    : isScrolled
                    ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    : "text-black/80 hover:bg-white/10 hover:text-blue-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Register as Buyer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled || mobileOpen
                ? "text-gray-600 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || mobileOpen ? "bg-gray-600" : "bg-white"
                } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || mobileOpen ? "bg-gray-600" : "bg-white"
                } ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled || mobileOpen ? "bg-gray-600" : "bg-white"
                } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="block text-center px-4 py-2.5 border border-black-200 text-black text-sm font-medium rounded-lg hover:bg-black-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block text-center px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg"
              >
                Register as Buyer
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
