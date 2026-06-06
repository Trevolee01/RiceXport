import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sampleOrders, documentTypes, exportStats, riceProducts } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { authService, type User } from "../services/auth";

const tabs = ["Overview", "Products", "My Orders", "Quotes", "Documents", "Tracking", "Payment History"];

const statusColors: Record<string, string> = {
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Confirmed: "bg-purple-100 text-purple-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-gray-100 text-gray-600",
};

const paymentColors: Record<string, string> = {
  Paid: "text-emerald-600",
  Partial: "text-amber-600",
  Unpaid: "text-red-500",
  Refunded: "text-blue-600",
};

const monthlyData = [
  { month: "Jul", orders: 2, value: 84 },
  { month: "Aug", orders: 1, value: 42 },
  { month: "Sep", orders: 3, value: 156 },
  { month: "Oct", orders: 2, value: 98 },
  { month: "Nov", orders: 4, value: 348 },
  { month: "Dec", orders: 1, value: 41 },
];

const trackingSteps = [
  { label: "Order Confirmed", date: "Nov 20, 2024", done: true, icon: "✅" },
  { label: "Quality Inspection", date: "Nov 22, 2024", done: true, icon: "🔬" },
  { label: "Documentation Ready", date: "Nov 25, 2024", done: true, icon: "📋" },
  { label: "Container Loaded", date: "Nov 28, 2024", done: true, icon: "📦" },
  { label: "Vessel Departed Lagos", date: "Nov 30, 2024", done: true, icon: "🚢" },
  { label: "In Transit", date: "Est. Dec 10, 2024", done: false, icon: "⛵", active: true },
  { label: "Arrived Destination Port", date: "Est. Dec 22, 2024", done: false, icon: "⚓" },
  { label: "Customs Clearance", date: "Est. Dec 24, 2024", done: false, icon: "🏛️" },
  { label: "Delivered", date: "Est. Dec 26, 2024", done: false, icon: "🏠" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [trackingId, setTrackingId] = useState("ORD-2024-0876");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Get user data
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Orders", value: "12", change: "+3 this month", icon: "📦", color: "bg-blue-50 border-blue-100", textColor: "text-blue-600" },
    { label: "Active Shipments", value: "3", change: "Tracking now", icon: "🚢", color: "bg-emerald-50 border-emerald-100", textColor: "text-emerald-600" },
    { label: "Total Spent (USD)", value: "$349K", change: "+18% YTD", icon: "💰", color: "bg-amber-50 border-amber-100", textColor: "text-amber-600" },
    { label: "Pending Quotes", value: "2", change: "Awaiting review", icon: "💬", color: "bg-purple-50 border-purple-100", textColor: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl shadow-md">
                  {user.first_name?.[0]?.toUpperCase() || "👤"}
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-900">
                    {user.company_name || `${user.first_name} ${user.last_name}`}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {user.first_name} {user.last_name} • {user.country || "Global"} • {user.is_verified ? "Verified Buyer ✓" : "Pending Verification"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors group flex items-center gap-2"
                title="Logout"
              >
                <span className="text-gray-600 group-hover:text-red-600">🚪</span>
                <span className="text-gray-700 group-hover:text-red-600 font-semibold text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ─── OVERVIEW ─── */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className={`bg-white rounded-2xl p-5 border ${stat.color} shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`text-2xl font-black ${stat.textColor}`}>{stat.value}</span>
                  </div>
                  <div className="text-gray-700 text-sm font-semibold">{stat.label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-5">Monthly Order Value (USD Thousands)</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `$${v}K`} />
                      <Tooltip
                        formatter={(value) => [`$${value}K`, "Value"]}
                        contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                      />
                      <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-5">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: "🌾", label: "Browse Products", action: () => setActiveTab("Products"), color: "text-emerald-600" },
                    { icon: "�", label: "My Documents", action: () => setActiveTab("Documents"), color: "text-purple-600" },
                    { icon: "�", label: "Market Prices", path: "/market", color: "text-amber-600" },
                    { icon: "�", label: "Track Shipment", action: () => setActiveTab("Tracking"), color: "text-cyan-600" },
                    { icon: "�", label: "Payment History", action: () => setActiveTab("Payment History"), color: "text-pink-600" },
                    { icon: "�", label: "My Orders", action: () => setActiveTab("My Orders"), color: "text-blue-600" },
                  ].map((action) => (
                    action.path ? (
                      <Link
                        key={action.label}
                        to={action.path}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <span className={`text-xl ${action.color}`}>{action.icon}</span>
                        <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900">{action.label}</span>
                        <span className="ml-auto text-gray-300 group-hover:text-gray-500">→</span>
                      </Link>
                    ) : (
                      <button
                        key={action.label}
                        onClick={action.action}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group w-full text-left"
                      >
                        <span className={`text-xl ${action.color}`}>{action.icon}</span>
                        <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900">{action.label}</span>
                        <span className="ml-auto text-gray-300 group-hover:text-gray-500">→</span>
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-gray-900 font-bold">Recent Orders</h3>
                <button onClick={() => setActiveTab("My Orders")} className="text-emerald-600 text-sm font-semibold hover:underline">
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sampleOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-emerald-600 font-medium">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900 max-w-[200px] truncate">{order.product}</div>
                          <div className="text-xs text-gray-400">{order.flag} {order.destination}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── PRODUCTS ─── */}
        {activeTab === "Products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">Available Rice Products</h2>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-600">
                  <option>All Categories</option>
                  <option>Parboiled</option>
                  <option>White Rice</option>
                  <option>Ofada</option>
                  <option>Brown Rice</option>
                  <option>Aromatic</option>
                </select>
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-600">
                  <option>Sort by: Price</option>
                  <option>Sort by: Rating</option>
                  <option>Sort by: Availability</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {riceProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary-100 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image area */}
                  <div className="relative h-44 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
                        {product.badge}
                      </span>
                    </div>

                    {/* Availability */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-500 text-white">
                        {product.availability}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <div className="text-primary-600 text-xs font-semibold uppercase tracking-wider mb-1">
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
                          // In real app, this would open a checkout modal or redirect
                        }}
                        className="flex-1 py-2.5 text-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Products */}
            <div className="text-center pt-4">
              <Link
                to="/products"
                className="inline-block px-8 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-200"
              >
                View All Products →
              </Link>
            </div>
          </div>
        )}

        {/* ─── MY ORDERS ─── */}
        {activeTab === "My Orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">All Orders (12)</h2>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Statuses</option>
                  <option>Shipped</option>
                  <option>Processing</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            {sampleOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {order.flag}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-emerald-600 font-bold">{order.id}</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-gray-900 font-semibold text-sm">{order.product}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {order.quantity} • {order.destination} • {order.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-lg font-black text-gray-900">{order.amount}</div>
                      <div className={`text-xs font-semibold ${paymentColors[order.paymentStatus]}`}>
                        {order.paymentStatus}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("Tracking")}
                        className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        🚢 Track
                      </button>
                      <button
                        onClick={() => setActiveTab("Documents")}
                        className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        📋 Docs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── DOCUMENTS ─── */}
        {activeTab === "Documents" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">Export Documents</h2>
              <span className="text-sm text-gray-500">Order: <strong>ORD-2024-0891</strong></span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {documentTypes.map((doc) => (
                <div
                  key={doc.name}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group hover:border-emerald-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{doc.icon}</div>
                    {doc.required ? (
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">Required</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-xs rounded-full">Optional</span>
                    )}
                  </div>
                  <h4 className="text-gray-900 font-bold text-sm mb-1 leading-snug">{doc.name}</h4>
                  <p className="text-gray-400 text-xs mb-4">{doc.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Ready
                    </span>
                    <a
                      href="#"
                      download
                      onClick={(e) => {
                        e.preventDefault();
                        // Simulate download
                        alert(`Downloading ${doc.name}...`);
                      }}
                      className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      ⬇ Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TRACKING ─── */}
        {activeTab === "Tracking" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 font-bold mb-4">Track Shipment</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Order ID or Bill of Lading..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                  Track →
                </button>
              </div>
            </div>

            {/* Tracking Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-emerald-100 text-sm mb-1">Tracking ID</div>
                    <div className="font-mono text-xl font-black">{trackingId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-100 text-sm mb-1">Status</div>
                    <div className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold">In Transit 🚢</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div>
                    <div className="text-emerald-100 text-xs">Origin</div>
                    <div className="font-semibold text-sm">Lagos, Nigeria</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-100 text-xs">Destination</div>
                    <div className="font-semibold text-sm">Felixstowe, UK</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid sm:grid-cols-3 gap-4 mb-8 text-sm">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-1">Product</div>
                    <div className="font-semibold text-gray-900">White Polished Rice</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-1">Quantity</div>
                    <div className="font-semibold text-gray-900">500 Metric Tonnes</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-1">Est. Arrival</div>
                    <div className="font-semibold text-emerald-600">Jul 22, 2026</div>
                  </div>
                </div>

                {/* Timeline */}
                <h4 className="text-gray-900 font-bold text-sm mb-5">Shipment Journey</h4>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
                  <div className="space-y-4">
                    {trackingSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 border-2 text-sm ${
                            step.done
                              ? "bg-emerald-600 border-emerald-600"
                              : (step as typeof step & { active?: boolean }).active
                              ? "bg-amber-500 border-amber-500 animate-pulse"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div className={`flex-1 pb-4 ${i < trackingSteps.length - 1 ? "border-b border-gray-50" : ""}`}>
                          <div className={`text-sm font-semibold ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                            {step.label}
                            {(step as typeof step & { active?: boolean }).active && (
                              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Current</span>
                            )}
                          </div>
                          <div className={`text-xs mt-0.5 ${step.done ? "text-emerald-600" : "text-gray-400"}`}>
                            {step.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── QUOTES ─── */}
        {activeTab === "Quotes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">My Quote Requests</h2>
              <button
                onClick={() => setActiveTab("Products")}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors"
              >
                + Browse Products
              </button>
            </div>

            {[
              { id: "QR-20261189", product: "Premium Parboiled Rice", qty: "200 MT", destination: "UAE 🇦🇪", amount: "$92,350", status: "Pending Review", date: "2026-01-20", validUntil: "2024-12-20" },
              { id: "QR-20251145", product: "Ofada Rice", qty: "50 MT", destination: "France 🇫🇷", amount: "$31,250", status: "Under Review", date: "2025-11-10", validUntil: "2024-12-10" },
              { id: "QR-20251089", product: "White Rice (5%)", qty: "1000 MT", destination: "UK 🇬🇧", amount: "$415,000", status: "Submitted", date: "2025-10-25", validUntil: "2024-12-25" },
            ].map((quote) => (
              <div key={quote.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-emerald-600 font-bold">{quote.id}</span>
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
                        {quote.status}
                      </span>
                    </div>
                    <div className="text-gray-900 font-semibold">{quote.product}</div>
                    <div className="text-gray-400 text-sm">{quote.qty} → {quote.destination} • Requested {quote.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-gray-900">{quote.amount}</div>
                    <div className="text-gray-400 text-xs">Awaiting response</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state if no quotes */}
            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center mt-6">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-gray-900 font-bold mb-2">No quote requests yet</h3>
              <p className="text-gray-500 text-sm mb-4">Browse our products to start purchasing</p>
              <button
                onClick={() => setActiveTab("Products")}
                className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
              >
                Browse Products
              </button>
            </div>
          </div>
        )}

        {/* ─── PAYMENT HISTORY ─── */}
        {activeTab === "Payment History" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">Payment History</h2>
              <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-600">
                <option>All Transactions</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Payment Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-gray-500 text-sm mb-1">Total Paid (2024)</div>
                <div className="text-2xl font-black text-emerald-600">$349,000</div>
                <div className="text-xs text-gray-400 mt-1">12 transactions</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-gray-500 text-sm mb-1">Pending Payments</div>
                <div className="text-2xl font-black text-amber-600">$29,000</div>
                <div className="text-xs text-gray-400 mt-1">1 transaction</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-gray-500 text-sm mb-1">Last Payment</div>
                <div className="text-2xl font-black text-gray-900">$195,000</div>
                <div className="text-xs text-gray-400 mt-1">Feb 10, 2026</div>
              </div>
            </div>

            {/* Payment Transactions */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { date: "Nov 01, 2025", orderId: "ORD-2025-0891", product: "Premium Parboiled Rice (200 MT)", method: "Bank Transfer", amount: "$84,000", status: "Paid", currency: "USD" },
                      { date: "Nov 15, 2025", orderId: "ORD-2025-0831", product: "Brown Rice (80 MT)", method: "Mastercard", amount: "$40,800", status: "Paid", currency: "USD" },
                      { date: "Dec 22, 2025", orderId: "ORD-2025-0754", product: "Ofada Rice (50 MT)", method: "Crypto (USDT)", amount: "$29,000", status: "Paid", currency: "USD" },
                      { date: "Feb 10, 2026", orderId: "ORD-2026-0689", product: "White Rice (500 MT)", method: "Bank Transfer", amount: "$195,000", status: "Paid", currency: "USD" },
                      { date: "Mar 22, 2026", orderId: "ORD-2026-0854", product: "Ofada Rice (50 MT)", method: "Pending", amount: "$29,000", status: "Unpaid", currency: "USD" },
                    ].map((payment, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
                        <td className="px-6 py-4 text-sm font-mono text-emerald-600 font-medium">{payment.orderId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">{payment.product}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium">
                            {payment.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{payment.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            payment.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {payment.status === "Paid" ? (
                            <button
                              onClick={() => alert(`Downloading receipt for ${payment.orderId}...`)}
                              className="text-xs text-blue-600 font-semibold hover:underline"
                            >
                              ⬇ Download
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 font-bold mb-4">Payment Methods Used</h3>
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { method: "Bank Transfer", count: 7, icon: "🏦" },
                  { method: "Mastercard", count: 3, icon: "💳" },
                  { method: "Crypto (USDT)", count: 2, icon: "₿" },
                  { method: "Flutterwave", count: 0, icon: "🌐" },
                ].map((pm) => (
                  <div key={pm.method} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{pm.icon}</div>
                    <div className="text-sm font-semibold text-gray-900">{pm.method}</div>
                    <div className="text-xs text-gray-500 mt-1">{pm.count} payments</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export track record */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-gray-900 font-bold mb-5">🌍 Our Export Track Record</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {exportStats.map((stat) => (
              <div key={stat.country} className="text-center p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                <div className="text-2xl mb-1">{stat.flag}</div>
                <div className="text-xs font-bold text-gray-700">{stat.country}</div>
                <div className="text-xs text-emerald-600 font-semibold">{stat.volume} MT</div>
                <div className="text-xs text-gray-400">+{stat.growth}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
