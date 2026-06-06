import { useState } from "react";
import { Link } from "react-router-dom";
import { riceProducts } from "../data/mockData";

const categories = [
  { id: "all", label: "All Varieties", icon: "🌾" },
  { id: "parboiled", label: "Parboiled", icon: "🍚" },
  { id: "white", label: "White Rice", icon: "⬜" },
  { id: "ofada", label: "Ofada", icon: "🟤" },
  { id: "aromatic", label: "Aromatic", icon: "✨" },
  { id: "brown", label: "Brown Rice", icon: "🌰" },
  { id: "broken", label: "Broken Rice", icon: "💛" },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "moq-asc", label: "MOQ: Low to High" },
  { value: "rating-desc", label: "Highest Rated" },
];

const emojiMap: Record<string, string> = {
  "1": "/src/pics/PL.jpg",
  "2": "/src/pics/OR.jpg",
  "3": "/src/pics/WPR.jpg",
  "4": "/src/pics/ABR.jpg",
  "5": "/src/pics/BRR.jpg",
  "6": "/src/pics/BR.jpg",
};

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-emerald-100 text-emerald-700",
  Premium: "bg-purple-100 text-purple-700",
  "High Volume": "bg-blue-100 text-blue-700",
  Limited: "bg-red-100 text-red-700",
  Organic: "bg-lime-100 text-lime-700",
  "Value Buy": "bg-amber-100 text-amber-700",
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof riceProducts[0] | null>(null);

  const filtered = riceProducts
    .filter((p) =>
      (selectedCategory === "all" || p.categoryId === selectedCategory) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice;
      if (sortBy === "price-desc") return b.basePrice - a.basePrice;
      if (sortBy === "moq-asc") return a.moq - b.moq;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-full mb-4">
              Product Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              Premium Nigerian Rice Varieties
            </h1>
            <p className="text-gray-300 max-w-2xl">
              NAFDAC-certified, SGS-verified rice varieties available for bulk international export. All products include full certification documentation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-20">
        {/* Search + Sort */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search rice varieties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-4 text-gray-500 text-sm">
          Showing <strong className="text-gray-900">{filtered.length}</strong> varieties
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={emojiMap[product.id] || "/src/pics/PL.jpg"} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${badgeColors[product.badge] || "bg-gray-100 text-gray-600"}`}>
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${product.availability === "In Stock" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>
                      {product.availability}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">
                    {product.category} • {product.origin}
                  </div>
                  <h3 className="text-gray-900 font-bold text-base mb-2 leading-snug">{product.name}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-50 rounded-xl p-3">
                    <div>
                      <div className="text-gray-400 text-xs">Moisture</div>
                      <div className="text-gray-700 text-xs font-semibold">{product.specifications.moisture}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Broken</div>
                      <div className="text-gray-700 text-xs font-semibold">{product.specifications.brokenGrains}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Batch #</div>
                      <div className="text-gray-700 text-xs font-semibold">{product.batchNo}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Harvest</div>
                      <div className="text-gray-700 text-xs font-semibold">{product.harvestDate}</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.certifications.map((cert) => (
                      <span key={cert} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium border border-emerald-100">
                        ✓ {cert}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-2xl font-black text-gray-900">
                          ${product.pricePerTon}
                          <span className="text-gray-400 text-sm font-normal">/MT</span>
                        </div>
                        <div className="text-gray-400 text-xs">MOQ: {product.moq} {product.moqUnit}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-amber-400">★</span>
                          <span className="text-gray-700 text-sm font-semibold">{product.rating}</span>
                          <span className="text-gray-400 text-xs">({product.reviews})</span>
                        </div>
                        <div className="text-gray-400 text-xs">{product.availableQty} MT avail.</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                      >
                        Details
                      </button>
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-gray-900 font-semibold text-lg mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center overflow-hidden">
              <img 
                src={emojiMap[selectedProduct.id] || "/src/pics/PL.jpg"} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-sm"
              >
                ✕
              </button>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${badgeColors[selectedProduct.badge] || ""}`}>
                  {selectedProduct.badge}
                </span>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${selectedProduct.availability === "In Stock" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>
                  {selectedProduct.availability}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-emerald-600 text-sm font-semibold mb-1">{selectedProduct.category} • {selectedProduct.origin}</div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">{selectedProduct.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>

              {/* Price & Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-600">${selectedProduct.pricePerTon}</div>
                  <div className="text-gray-400 text-xs">Per Metric Tonne</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-black text-gray-900">{selectedProduct.moq}</div>
                  <div className="text-gray-400 text-xs">Min Order ({selectedProduct.moqUnit})</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-600">{selectedProduct.availableQty}</div>
                  <div className="text-gray-400 text-xs">MT Available</div>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-3">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                      <span className="text-gray-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-gray-900 text-sm font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.certifications.map((cert) => (
                    <span key={cert} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-xl border border-emerald-100">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Batch info */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                  📋 Current Batch Information
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-blue-500">Batch #:</span> <span className="text-blue-800 font-medium">{selectedProduct.batchNo}</span></div>
                  <div><span className="text-blue-500">Harvest:</span> <span className="text-blue-800 font-medium">{selectedProduct.harvestDate}</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert(`Purchasing ${selectedProduct.name}. Redirecting to checkout...`);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-4 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors text-base"
                >
                  Buy Now →
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
