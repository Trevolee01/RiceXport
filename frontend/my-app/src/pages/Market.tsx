import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
  } from "recharts";
  import { priceTrendData, exportStats, regulations } from "../data/mockData";
  
  const seasonalData = [
    { month: "Jan", availability: 85, demand: 70 },
    { month: "Feb", availability: 80, demand: 72 },
    { month: "Mar", availability: 75, demand: 78 },
    { month: "Apr", availability: 65, demand: 80 },
    { month: "May", availability: 55, demand: 82 },
    { month: "Jun", availability: 45, demand: 85 },
    { month: "Jul", availability: 40, demand: 80 },
    { month: "Aug", availability: 55, demand: 75 },
    { month: "Sep", availability: 75, demand: 72 },
    { month: "Oct", availability: 90, demand: 68 },
    { month: "Nov", availability: 95, demand: 70 },
    { month: "Dec", availability: 88, demand: 78 },
  ];
  
  const marketNews = [
    {
      title: "Nigerian Rice Exports Surge 35% in Q3 2024",
      date: "Nov 28, 2024",
      category: "Market Update",
      color: "bg-emerald-100 text-emerald-700",
      summary: "Nigeria's rice export volume increased by 35% in Q3 2024, driven by increased demand from UAE and UK markets. Parboiled rice leads the growth.",
    },
    {
      title: "EU Organic Certification Now Available for Nigerian Rice",
      date: "Nov 20, 2024",
      category: "Regulation",
      color: "bg-blue-100 text-blue-700",
      summary: "Following new bilateral agreements, Nigerian certified organic rice can now access EU markets with full organic certification, opening up a premium segment.",
    },
    {
      title: "Global Rice Prices Expected to Stabilise in Q1 2025",
      date: "Nov 15, 2024",
      category: "Forecast",
      color: "bg-purple-100 text-purple-700",
      summary: "FAO analysts predict rice prices will stabilise at current levels in early 2025 as Asian harvests recover. This may slightly reduce Nigerian export margins.",
    },
    {
      title: "New Direct Shipping Route: Lagos–Singapore Launched",
      date: "Nov 8, 2024",
      category: "Logistics",
      color: "bg-amber-100 text-amber-700",
      summary: "A new direct container shipping route from Apapa Port Lagos to Singapore reduces transit time by 8 days, opening new opportunities for Southeast Asian markets.",
    },
  ];
  
  const exportVolumeData = [
    { country: "UAE", volume: 2400 },
    { country: "Senegal", volume: 1800 },
    { country: "Ghana", volume: 1500 },
    { country: "Cameroon", volume: 1200 },
    { country: "UK", volume: 900 },
    { country: "USA", volume: 750 },
    { country: "France", volume: 600 },
    { country: "Singapore", volume: 450 },
  ];
  
  export default function Market() {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white pt-10 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold rounded-full mb-4">
              Market Intelligence
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              International Rice Market Dashboard
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real-time price trends, export regulations, seasonal availability, and market insights to help you make informed sourcing decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-emerald-400">$420/MT</div>
                <div className="text-gray-400 text-xs">Parboiled Rice (Current)</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-blue-400">$390/MT</div>
                <div className="text-gray-400 text-xs">White Rice (Current)</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-amber-400">$580/MT</div>
                <div className="text-gray-400 text-xs">Ofada Rice (Current)</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-purple-400">$650/MT</div>
                <div className="text-gray-400 text-xs">Aromatic Rice (Current)</div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-20 space-y-8">
          {/* Price Trends */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-gray-900 font-black text-xl">Rice Price Trends — 2024</h2>
                <p className="text-gray-400 text-sm mt-1">FOB Lagos Port • USD per Metric Tonne • Updated weekly</p>
              </div>
              <div className="flex gap-2">
                {["1M", "3M", "6M", "1Y"].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                      p === "1Y" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
  
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `$${v}`} domain={[250, 700]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                    formatter={(value) => [`$${value}/MT`]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="parboiled" name="Parboiled" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="white" name="White Rice" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="ofada" name="Ofada" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="aromatic" name="Aromatic" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
  
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { name: "Parboiled", current: 420, change: +7.7, color: "text-emerald-600", bg: "bg-emerald-50" },
                { name: "White Rice", current: 390, change: +11.4, color: "text-blue-600", bg: "bg-blue-50" },
                { name: "Ofada", current: 580, change: +7.4, color: "text-amber-600", bg: "bg-amber-50" },
                { name: "Aromatic", current: 650, change: +6.6, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((item) => (
                <div key={item.name} className={`${item.bg} rounded-2xl p-4`}>
                  <div className="text-gray-500 text-xs mb-1">{item.name}</div>
                  <div className={`text-xl font-black ${item.color}`}>${item.current}/MT</div>
                  <div className="text-emerald-600 text-xs font-semibold mt-1">
                    ↑ +{item.change}% YTD
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Export Volume by Country */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-gray-900 font-black text-lg mb-2">Export Volume by Destination (MT)</h2>
              <p className="text-gray-400 text-xs mb-6">Total shipments Jan–Nov 2024</p>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exportVolumeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis dataKey="country" type="category" width={70} tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb" }}
                      formatter={(value) => [`${value} MT`, "Volume"]}
                    />
                    <Bar dataKey="volume" fill="#10b981" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
  
            {/* Seasonal Calendar */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-gray-900 font-black text-lg mb-2">Seasonal Availability Calendar</h2>
              <p className="text-gray-400 text-xs mb-6">Supply availability vs market demand index</p>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb" }}
                      formatter={(value) => [`${value}%`]}
                    />
                    <Legend />
                    <Bar dataKey="availability" name="Supply %" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="demand" name="Demand %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
  
          {/* Currency Exchange */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 font-black text-lg">Live Currency Exchange Rates</h2>
                <p className="text-gray-400 text-xs mt-1">Base: USD • Updated: Today 14:30 WAT</p>
              </div>
              <span className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { from: "USD", to: "NGN", rate: "1,580.45", change: "+0.8%" },
                { from: "USD", to: "EUR", rate: "0.9215", change: "-0.3%" },
                { from: "USD", to: "GBP", rate: "0.7892", change: "+0.1%" },
                { from: "USD", to: "AED", rate: "3.6728", change: "0.0%" },
                { from: "USD", to: "XOF", rate: "604.21", change: "-0.2%" },
                { from: "USD", to: "GHS", rate: "15.42", change: "+1.2%" },
              ].map((rate) => (
                <div key={rate.to} className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-blue-50 transition-colors">
                  <div className="text-gray-400 text-xs mb-1">1 {rate.from} =</div>
                  <div className="text-gray-900 font-black text-lg">{rate.rate}</div>
                  <div className="text-blue-600 font-bold text-sm">{rate.to}</div>
                  <div className={`text-xs font-semibold mt-1 ${rate.change.startsWith("+") ? "text-emerald-500" : rate.change.startsWith("-") ? "text-red-400" : "text-gray-400"}`}>
                    {rate.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Export Regulations */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 font-black text-lg">Export Regulation Updates</h2>
                <p className="text-gray-400 text-xs mt-1">Latest regulatory changes affecting rice exports</p>
              </div>
              <button className="text-emerald-600 text-sm font-semibold hover:underline">View All →</button>
            </div>
  
            <div className="space-y-3">
              {regulations.map((reg, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-2xl">{reg.flag}</span>
                    <div>
                      <div className="text-gray-700 font-semibold text-sm">{reg.country}</div>
                      <div className="text-gray-400 text-xs">{reg.date}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full flex-shrink-0 ${
                        reg.type === "Tariff" ? "bg-amber-100 text-amber-700" :
                        reg.type === "Documentation" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>
                        {reg.type}
                      </span>
                      <span className="text-gray-800 text-sm font-medium">{reg.title}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      reg.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Market News */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-gray-900 font-black text-lg">Market Intelligence News</h2>
              <button className="text-emerald-600 text-sm font-semibold hover:underline">All News →</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {marketNews.map((news, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${news.color}`}>
                      {news.category}
                    </span>
                    <span className="text-gray-400 text-xs">2026</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-base mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{news.summary}</p>
                  <div className="mt-4 text-emerald-600 text-sm font-semibold">Read More →</div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Export track record table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-gray-900 font-black text-lg">🌍 Export Performance by Country — 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Country</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Region</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Volume (MT)</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Orders</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {exportStats.map((stat) => (
                    <tr key={stat.country} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{stat.flag}</span>
                          <span className="text-gray-900 font-semibold text-sm">{stat.country}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {stat.country === "UAE" || stat.country === "Saudi Arabia" ? "Middle East" :
                         stat.country === "UK" || stat.country === "France" ? "Europe" :
                         stat.country === "Singapore" ? "Southeast Asia" :
                         stat.country === "USA" ? "North America" : "West Africa"}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900 font-bold text-sm">
                        {stat.volume.toLocaleString()} MT
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600 text-sm">{stat.orders}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-600 font-bold text-sm">+{stat.growth}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  