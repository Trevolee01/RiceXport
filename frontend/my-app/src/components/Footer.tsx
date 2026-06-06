import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <div className="text-white font-black text-xl">
                  Rice<span className="text-emerald-400">Xport</span>
                </div>
                <div className="text-gray-500 text-xs">Export Management Platform</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nigeria's premier digital rice export management platform connecting quality rice producers with international buyers across 8+ countries.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "f", "📧"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center text-sm transition-colors duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Product Catalog", path: "/products" },
                { label: "Request a Quote", path: "/quote" },
                { label: "Buyer Dashboard", path: "/dashboard" },
                { label: "Market Intelligence", path: "/market" },
                { label: "Export Documents", path: "/documents" },
                { label: "Shipment Tracking", path: "/tracking" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-emerald-500 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Certifications
            </h4>
            <ul className="space-y-3">
              {["NAFDAC Certified", "SGS Verified", "ISO 9001:2015", "ISO 22000", "HACCP Certified", "EU Organic Approved"].map(
                (cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xs">✓</span>
                    <span className="text-gray-400 text-sm">{cert}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-emerald-500 mt-0.5">📍</span>
                <div className="text-gray-400 text-sm">
                  Plot 14, Export Processing Zone<br />
                  Kubwa, Abuja, Nigeria
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500">📞</span>
                <div className="text-gray-400 text-sm">+234 802 4511 587<br /></div>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500">📧</span>
                <div className="text-gray-400 text-sm">kurutsishadrach@gmail.com<br />support@ricexport.ng</div>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500">💬</span>
                <div className="text-gray-400 text-sm">WhatsApp Business<br />+234 802 4511 587</div>
              </div>
            </div>


          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 RiceXport Nigeria Ltd. All rights reserved. RC: 1234567
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
