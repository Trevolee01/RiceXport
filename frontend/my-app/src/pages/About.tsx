import { Link } from "react-router-dom";
import { certifications, exportStats } from "../data/mockData";

const team = [
  { name: "Kurutsi Shadrach", role: "CEO & Co-Founder", emoji: "👨🏿‍💼", country: "Nigeria", bio: "Studied sales marketing with over 4 yrs of experience " },
  { name: "Kurutsi Mary", role: "Head of Export Operations", emoji: "👩🏾‍💼", country: "Nigeria", bio: "5+ yrs managing import and export of different countries." },
  { name: "Alasan Mubeen", role: "Market Intelligence Lead", emoji: "👨🏻‍💻", country: "UK", bio: "Tech-king, has changed a lot of technical issues into the west-Afica system." },
  { name: "Aisha Bello", role: "Head of Documentation", emoji: "👩🏾‍⚖️", country: "Nigeria", bio: "Expert in export compliance, customs documentation and international trade law." },
];

const milestones = [
  { year: "2026", title: "100 MT Exported", description: "Record-breaking year with 100 MT exported and 5+ verified international buyers." },
];

const values = [
  { icon: "🏆", title: "Quality First", description: "Every batch undergoes rigorous quality testing. We only ship what meets international standards." },
  { icon: "🤝", title: "Trust & Transparency", description: "Full supply chain visibility from farm to port. No hidden fees, no surprises." },
  { icon: "🌱", title: "Sustainability", description: "Supporting sustainable farming practices and fair prices for Nigerian rice farmers." },
  { icon: "⚡", title: "Efficiency", description: "Our technology eliminates paperwork delays. Documents auto-generated within minutes." },
  { icon: "🌍", title: "Global Reach", description: "Specialised knowledge of 30+ import markets, regulations, and shipping requirements." },
  { icon: "🔒", title: "Secure Transactions", description: "Bank-grade security for all payments. Multiple currencies and payment methods supported." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 text-[300px] leading-none">🌾</div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-full mb-6">
            About RiceXport Nigeria
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Connecting Nigerian Farmers to the World
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            We are Nigeria's leading rice export management platform — digitising the entire export workflow to make international rice trade accessible, transparent, and efficient for buyers worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "100 MT", label: "Rice Exported in 2024", icon: "🚢" },
              { value: "5+", label: "Countries Served", icon: "🌍" },
              { value: "20+", label: "Verified Buyers", icon: "✅" },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-emerald-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                Making Nigerian Rice a Global Premium Brand
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Nigeria produces some of the finest rice varieties in the world — from the uniquely aromatic Ofada rice to high-quality parboiled long grain. Yet most of this quality remained unknown to international buyers due to barriers in documentation, logistics, and market access.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                RiceXport was built to break down these barriers. By digitising the entire export workflow — from product discovery through to shipment tracking — we make it as easy to buy Nigerian rice from Singapore as it is from Lagos.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-lg shadow-emerald-600/20"
              >
                Explore Our Products →
              </Link>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-6">Our Journey</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-100" />
                <div className="space-y-6">
                  {milestones.map((m) => (
                    <div key={m.year} className="flex gap-6 relative">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center z-10 flex-shrink-0 shadow-md shadow-emerald-600/30">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="text-emerald-600 font-black text-sm mb-1">{m.year}</div>
                        <div className="text-gray-900 font-bold text-base mb-1">{m.title}</div>
                        <div className="text-gray-400 text-sm leading-relaxed">{m.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-emerald-100">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              Export Specialists You Can Trust
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-3xl p-6 text-center border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-gray-900 font-bold text-base mb-1">{member.name}</h3>
                <div className="text-emerald-600 text-sm font-semibold mb-1">{member.role}</div>
                <div className="text-gray-400 text-xs mb-3">📍 {member.country}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm font-medium mb-10 uppercase tracking-widest">
            Our Certifications & Accreditations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                <div className="text-3xl mb-2">{cert.icon}</div>
                <div className="text-gray-900 font-bold text-sm mb-1">{cert.name}</div>
                <div className="text-gray-400 text-xs">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              🌍 Countries We Export To
            </h2>
            <p className="text-gray-500">Our reach spans 3 continents and 5+ countries</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {exportStats.map((stat) => (
              <div key={stat.country} className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-emerald-50 transition-colors border border-gray-100 hover:border-emerald-200">
                <div className="text-3xl mb-2">{stat.flag}</div>
                <div className="text-gray-900 font-bold text-sm">{stat.country}</div>
                <div className="text-emerald-600 text-xs font-semibold">{stat.volume} MT</div>
                <div className="text-emerald-500 text-xs">+{stat.growth}% ↑</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
            Partner with Nigeria's Leading Rice Exporter
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Register as a verified buyer and get access to Nigeria's finest rice varieties with full export support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-10 py-4 bg-white text-emerald-700 font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Register as Buyer →
            </Link>
            <Link
              to="/quote"
              className="px-10 py-4 bg-white/10 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-1 duration-300 text-lg"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
