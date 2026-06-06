import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { riceProducts, testimonials, exportStats, priceTrendData, certifications } from "../data/mockData";

const heroStats = [
  { label: "Countries Served", value: "5+", icon: "🌍" },
  { label: "MT Exported (2026)", value: "100", icon: "🚢" },
  { label: "Verified Buyers", value: "20+", icon: "✅" },
  { label: "Rice Varieties", value: "10", icon: "🌾" },
];

const features = [
  {
    icon: "📦",
    title: "Product Catalog",
    description: "Browse verified rice varieties with real-time inventory, certifications, and detailed specifications.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: "💬",
    title: "Smart Quote System",
    description: "Get instant preliminary quotes with auto-calculated freight, insurance, and documentation fees.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: "📋",
    title: "Document Automation",
    description: "Auto-generate certificates of origin, phytosanitary certificates, and all export documents.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: "🛸",
    title: "Shipment Tracking",
    description: "Real-time tracking from Nigerian ports to your destination with milestone notifications.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: "💳",
    title: "Multi-Currency Payment",
    description: "Pay in USD, EUR, GBP, or local currencies via Crypto, Mastercard, or bank transfer.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: "📊",
    title: "Market Intelligence",
    description: "Stay ahead with live price trends, export regulations, and seasonal availability data.",
    color: "from-cyan-500 to-sky-500",
  },
];

const steps = [
  { step: "01", title: "Register & Verify", description: "Create your buyer account, verify your company details and get certified.", icon: "👤" },
  { step: "02", title: "Browse & Select", description: "Explore our catalogue, review certifications and check live inventory.", icon: "🔍" },
  { step: "03", title: "Request Quote", description: "Submit your order requirements and receive an instant preliminary quote.", icon: "💬" },
  { step: "04", title: "Place Order & Pay", description: "Accept the formal quote, choose payment method and confirm your order.", icon: "✅" },
  { step: "05", title: "Receive Documents", description: "Download all export documents auto-generated for your shipment.", icon: "📋" },
  { step: "06", title: "Track Shipment", description: "Monitor your cargo from Lagos to your port of destination in real time.", icon: "🚢" },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="overflow-x-hidden">
    
      <section className="relative min-h-screen flex items-center overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0tNiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

        
        <div className="absolute top-32 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Nigeria's #1 Rice Export Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                Export Nigerian{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  Premium Rice
                </span>{" "}
                to the World
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                Connect with certified Nigerian rice producers. Get instant quotes, automated export documentation, real-time shipment tracking, and secure multi-currency payments — all in one platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 text-base"
                >
                  Browse Products 🌾
                </Link>
                <Link
                  to="/quote"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 text-base"
                >
                  Request a Quote
                </Link>
              </div>

             
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-500 text-sm">Accepted payments:</span>
                {["₿ Crypto", "💳 Mastercard", "🏦 Bank Transfer", "🌐 Flutterwave"].map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs font-medium"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

           
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-black text-emerald-400">{stat.value}</div>
                      <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm font-semibold">Live Inventory</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Updated now
                    </span>
                  </div>
                  <div className="space-y-2">
                    {riceProducts.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center justify-between">
                        <span className="text-gray-300 text-xs">{p.name.substring(0, 28)}…</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              p.availability === "In Stock"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {p.availableQty} MT
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["NG","AE", "GB", "US", "FR", "SN"].map((flag, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-sm"
                      >
                        {flag}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">Active buyers from 5+ countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 fill-gray-50">
            <path d="M0,80L1440,0L1440,80L0,80Z" />
          </svg>
        </div>
      </section>

      
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm font-medium mb-8 uppercase tracking-widest">
            Trusted by buyers in 5+ countries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
            {exportStats.map((stat) => (
              <div
                key={stat.country}
                className="flex flex-col items-center gap-1 group"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform duration-200">
                  {stat.flag}
                </span>
                <span className="text-gray-500 text-xs font-medium">{stat.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
              Platform Features
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Everything You Need to Export Rice
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From product discovery to doorstep delivery, our end-to-end platform digitises every step of the rice export process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
                Featured Products
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black text-gray-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Premium Rice Varieties
              </h2>
            </div>
            <Link
              to="/products"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-200"
            >
              View All Products →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {riceProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0tNiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-full mb-4">
              How It Works
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Your Journey from Browse to Delivery
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A streamlined 6-step process designed to make international rice procurement effortless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-emerald-700 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Start Exporting Today 🚀
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              Market Intelligence
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              International Rice Price Trends 2024
            </h2>
            <p className="text-gray-500">
              Live pricing data updated weekly. Prices in USD per metric tonne (FOB Lagos).
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    {[
                      { id: "parboiled", color: "#10b981" },
                      { id: "white", color: "#3b82f6" },
                      { id: "ofada", color: "#f59e0b" },
                      { id: "aromatic", color: "#8b5cf6" },
                    ].map(({ id, color }) => (
                      <linearGradient key={id} id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                    formatter={(value) => [`$${value}/MT`, ""]}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="parboiled" name="Parboiled" stroke="#10b981" fill="url(#grad-parboiled)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="white" name="White Rice" stroke="#3b82f6" fill="url(#grad-white)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="ofada" name="Ofada" stroke="#f59e0b" fill="url(#grad-ofada)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="aromatic" name="Aromatic" stroke="#8b5cf6" fill="url(#grad-aromatic)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              >
                📊 Full Market Report →
              </Link>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm font-medium mb-10 uppercase tracking-widest">
            Quality Certifications & Standards
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <div className="text-gray-900 font-bold text-sm mb-1">{cert.name}</div>
                <div className="text-gray-400 text-xs leading-tight">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full mb-4">
              Verified Testimonials
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-gray-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              What Our Buyers Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                onClick={() => setActiveTestimonial(i)}
                className={`cursor-pointer bg-white rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  activeTestimonial === i
                    ? "border-emerald-500 shadow-xl shadow-emerald-500/10"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl">
                    {t.flag}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className={si < t.rating ? "text-amber-400" : "text-gray-200"}>
                      ★
                    </span>
                  ))}
                  {t.verified && (
                    <span className="ml-2 text-emerald-500 text-xs font-medium">✓ Verified</span>
                  )}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  "{t.text}"
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{t.country}</span>
                  <span className="text-emerald-600 text-xs font-semibold">{t.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full text-[200px] leading-none text-center text-white font-black opacity-5">
            🌾🌾🌾
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Ready to Source Premium Nigerian Rice?
          </h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            Join 20+ verified international buyers. Register today and get your first quote within minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-10 py-4 bg-white text-emerald-700 font-black rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Register as a Buyer →
            </Link>
            <Link
              to="/quote"
              className="px-10 py-4 bg-white/10 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Get Instant Quote
            </Link>
          </div>
          <p className="mt-6 text-emerald-200 text-sm">
            🔒 Secure • 🌍 Multi-language • 💱 Multi-currency • 📋 Auto-documentation
          </p>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: typeof riceProducts[0] }) {
  const badgeColors: Record<string, string> = {
    "Best Seller": "bg-emerald-100 text-emerald-700",
    Premium: "bg-purple-100 text-purple-700",
    "High Volume": "bg-blue-100 text-blue-700",
    Limited: "bg-red-100 text-red-700",
    Organic: "bg-lime-100 text-lime-700",
    "Value Buy": "bg-amber-100 text-amber-700",
  };

  const emojiMap: Record<string, string> = {
    "1": "/src/pics/PL.jpg",
    "2": "/src/pics/OR.jpg",
    "3": "/src/pics/WPR.jpg",
    "4": "/src/pics/ABR.jpg",
    "5": "/src/pics/BR.jpg",
    "6": "/src/pics/BRR.jpg",
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2">
      {/* Image area */}
      <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center overflow-hidden">
        <img 
          src={emojiMap[product.id] || "/src/pics/PL.jpg"} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${badgeColors[product.badge] || "bg-gray-100 text-gray-600"}`}>
            {product.badge}
          </span>
        </div>

        {/* Availability */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              product.availability === "In Stock"
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {product.availability}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Category */}
        <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">
          {product.category} • {product.origin}
        </div>

        {/* Name */}
        <h3 className="text-gray-900 font-bold text-base mb-3 leading-tight">
          {product.name}
        </h3>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.certifications.slice(0, 3).map((cert) => (
            <span
              key={cert}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Price & MOQ */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-2xl font-black text-gray-900">
              ${product.pricePerTon}
              <span className="text-gray-400 text-sm font-normal">/MT</span>
            </div>
            <div className="text-gray-400 text-xs mt-0.5">
              MOQ: {product.moq} {product.moqUnit}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <span className="text-amber-400">★</span>
              <span className="text-gray-700 text-sm font-semibold">{product.rating}</span>
              <span className="text-gray-400 text-xs">({product.reviews})</span>
            </div>
            <div className="text-gray-400 text-xs">{product.availableQty} MT available</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 py-2.5 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => {
              alert(`Purchasing ${product.name}. Redirecting to checkout...`);
            }}
            className="flex-1 py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
