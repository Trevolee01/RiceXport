import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { riceProducts, destinations } from "../data/mockData";

const pricingTiers = [
  { min: 0, max: 50, label: "Standard", discount: 0 },
  { min: 51, max: 200, label: "Volume", discount: 3 },
  { min: 201, max: 500, label: "Bulk", discount: 5 },
  { min: 501, max: 1000, label: "Large Bulk", discount: 8 },
  { min: 1001, max: Infinity, label: "Enterprise", discount: 12 },
];

const freightRates: Record<string, number> = {
  "1": 45,   // UAE
  "2": 55,   // UK
  "3": 65,   // USA
  "4": 52,   // France
  "5": 28,   // Senegal
  "6": 25,   // Ghana
  "7": 30,   // Cameroon
  "8": 75,   // Singapore
  "9": 48,   // Saudi Arabia
  "10": 26,  // Guinea
};

export default function Quote() {
  const [searchParams] = useSearchParams();
  const productIdFromUrl = searchParams.get("product");

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    productId: productIdFromUrl || "",
    quantity: "",
    unit: "ton",
    destinationId: "",
    destinationPort: "",
    deliveryDate: "",
    requirements: "",
    packaging: "50kg bags",
  });

  const [quote, setQuote] = useState<{
    productPrice: number;
    freight: number;
    insurance: number;
    documentation: number;
    total: number;
    pricePerTon: number;
    discount: number;
    tier: string;
    validUntil: string;
  } | null>(null);

  const selectedProduct = riceProducts.find((p) => p.id === form.productId);
  const selectedDestination = destinations.find((d) => d.id === form.destinationId);

  useEffect(() => {
    if (productIdFromUrl) {
      setForm((f) => ({ ...f, productId: productIdFromUrl }));
    }
  }, [productIdFromUrl]);

  const calculateQuote = () => {
    if (!selectedProduct || !form.quantity || !form.destinationId) return;

    const qty = parseFloat(form.quantity);
    const tier = pricingTiers.find((t) => qty >= t.min && qty <= t.max);
    const discount = tier?.discount || 0;
    const discountedPrice = selectedProduct.pricePerTon * (1 - discount / 100);
    const productPrice = discountedPrice * qty;
    const freightPerTon = freightRates[form.destinationId] || 50;
    const freight = freightPerTon * qty;
    const insurance = productPrice * 0.005;
    const documentation = 850;
    const total = productPrice + freight + insurance + documentation;

    const validDate = new Date();
    validDate.setDate(validDate.getDate() + 30);

    setQuote({
      productPrice: Math.round(productPrice),
      freight: Math.round(freight),
      insurance: Math.round(insurance),
      documentation,
      total: Math.round(total),
      pricePerTon: Math.round(discountedPrice),
      discount,
      tier: tier?.label || "Standard",
      validUntil: validDate.toLocaleDateString("en-GB"),
    });

    setStep(2);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Quote Request Submitted!</h2>
          <p className="text-gray-500 mb-2">
            Your formal quote request has been received. Our export team will review and send a confirmed quote within <strong>24 hours</strong>.
          </p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 my-6 text-left">
            <div className="text-emerald-700 font-semibold text-sm mb-2">📋 What happens next?</div>
            <ul className="space-y-1 text-emerald-600 text-sm">
              <li>✓ Quote reviewed by our export team</li>
              <li>✓ Formal quote sent via email & SMS</li>
              <li>✓ View in your buyer dashboard</li>
              <li>✓ Accept & place order online</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 mb-6 text-sm text-gray-500">
            Reference: <strong className="text-gray-900 font-mono">QR-{Date.now().toString().slice(-8)}</strong>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/products"
              className="py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 text-white pt-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-full mb-4">
            Smart Quote System
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
            Request an Export Quote
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Get an instant preliminary quote with auto-calculated freight, insurance and documentation fees. Our team will confirm within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-20">
        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { n: 1, label: "Order Details" },
            { n: 2, label: "Quote Preview" },
            { n: 3, label: "Confirm" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${n <= step ? "opacity-100" : "opacity-40"}`}>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    n < step
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : n === step
                      ? "border-emerald-600 text-emerald-600 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {n < step ? "✓" : n}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${n === step ? "text-gray-900" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
              {n < 3 && <div className={`w-16 sm:w-24 h-0.5 ${n < step ? "bg-emerald-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <>
                {/* Product Selection */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 font-bold text-lg mb-5 flex items-center gap-2">
                    🌾 Select Product
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {riceProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setForm({ ...form, productId: product.id })}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                          form.productId === product.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-200 bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl flex-shrink-0">
                          {["🍚","🌾","⬜","✨","🟤","💛"][parseInt(product.id) - 1]}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-sm font-bold truncate ${form.productId === product.id ? "text-emerald-700" : "text-gray-700"}`}>
                            {product.name.substring(0, 30)}
                            {product.name.length > 30 ? "…" : ""}
                          </div>
                          <div className="text-xs text-gray-400">${product.pricePerTon}/MT • MOQ: {product.moq}MT</div>
                        </div>
                        {form.productId === product.id && (
                          <span className="ml-auto text-emerald-600 flex-shrink-0">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 font-bold text-lg mb-5 flex items-center gap-2">
                    📦 Order Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Quantity Required <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          placeholder="e.g. 200"
                          value={form.quantity}
                          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          min="1"
                        />
                        <select
                          value={form.unit}
                          onChange={(e) => setForm({ ...form, unit: e.target.value })}
                          className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="ton">Metric Tonnes (MT)</option>
                          <option value="kg">Kilograms (kg)</option>
                        </select>
                      </div>
                      {form.quantity && selectedProduct && parseFloat(form.quantity) < selectedProduct.moq && (
                        <p className="text-amber-600 text-xs mt-1.5">
                          ⚠️ Minimum order is {selectedProduct.moq} MT for this product
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Packaging Preference
                      </label>
                      <select
                        value={form.packaging}
                        onChange={(e) => setForm({ ...form, packaging: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="50kg bags">50kg Polypropylene Bags</option>
                        <option value="25kg bags">25kg Bags</option>
                        <option value="bulk">Bulk (no packaging)</option>
                        <option value="custom">Custom Branding</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Destination Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.destinationId}
                        onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      >
                        <option value="">Select country…</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {d.days} days transit
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Destination Port
                      </label>
                      <input
                        type="text"
                        placeholder={selectedDestination?.port || "e.g. Port of Jebel Ali"}
                        value={form.destinationPort || selectedDestination?.port || ""}
                        onChange={(e) => setForm({ ...form, destinationPort: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Preferred Delivery Date
                      </label>
                      <input
                        type="date"
                        value={form.deliveryDate}
                        onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Additional Requirements / Special Requests
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Custom labelling, specific certifications, quality inspection requirements…"
                        value={form.requirements}
                        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={calculateQuote}
                    disabled={!form.productId || !form.quantity || !form.destinationId}
                    className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-2xl transition-all text-base shadow-lg shadow-emerald-600/20 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    ⚡ Calculate Instant Quote →
                  </button>
                </div>
              </>
            )}

            {step === 2 && quote && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                    💼 Your Preliminary Quote
                  </h2>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">
                    {quote.tier} Pricing
                  </span>
                </div>

                {/* Quote breakdown */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Product Price", value: quote.productPrice, note: `${form.quantity} MT × $${quote.pricePerTon}/MT${quote.discount > 0 ? ` (${quote.discount}% bulk discount)` : ""}` },
                    { label: "Freight (Ocean)", value: quote.freight, note: `To ${selectedDestination?.name} — ${selectedDestination?.days} days` },
                    { label: "Marine Insurance", value: quote.insurance, note: "0.5% of cargo value" },
                    { label: "Documentation Fees", value: quote.documentation, note: "Certificates, customs, compliance" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="text-gray-700 text-sm font-semibold">{item.label}</div>
                        <div className="text-gray-400 text-xs">{item.note}</div>
                      </div>
                      <div className="text-gray-900 font-bold">${item.value.toLocaleString()}</div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 mt-2">
                    <div>
                      <div className="text-emerald-800 font-black text-lg">TOTAL</div>
                      <div className="text-emerald-600 text-xs">Quote valid until {quote.validUntil}</div>
                    </div>
                    <div className="text-emerald-700 font-black text-2xl">${quote.total.toLocaleString()}</div>
                  </div>
                </div>

                {/* Savings if any */}
                {quote.discount > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <div className="text-amber-800 font-semibold text-sm">Bulk Discount Applied!</div>
                      <div className="text-amber-600 text-xs">
                        You save ${Math.round((selectedProduct?.pricePerTon || 0) * parseFloat(form.quantity) * quote.discount / 100).toLocaleString()} with {quote.tier} pricing ({quote.discount}% off product price)
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents included */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="text-gray-700 font-semibold text-sm mb-3">📋 Documents Included</div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Certificate of Origin", "Phytosanitary Cert.", "Commercial Invoice", "Bill of Lading", "Packing List", "Customs Declaration"].map((doc) => (
                      <div key={doc} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-emerald-500">✓</span> {doc}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    ← Edit Details
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors"
                  >
                    Request Formal Quote →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-gray-900 font-bold text-lg mb-5 flex items-center gap-2">
                  📤 Submit Quote Request
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Please provide your contact details so our export team can send you the confirmed formal quote.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Company Name", placeholder: "Your company name", type: "text" },
                    { label: "Contact Person", placeholder: "Your full name", type: "text" },
                    { label: "Business Email", placeholder: "you@company.com", type: "email" },
                    { label: "WhatsApp Number", placeholder: "+1 234 567 8900", type: "tel" },
                    { label: "Country", placeholder: "Your country", type: "text" },
                    { label: "Business Reg. No.", placeholder: "Optional", type: "text" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <input type="checkbox" id="terms" className="accent-emerald-600" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link to="/terms" className="text-emerald-600 hover:underline">Terms & Conditions</Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="updates" className="accent-emerald-600" defaultChecked />
                    <label htmlFor="updates" className="text-sm text-gray-600">
                      Receive price alerts and inventory updates via email/WhatsApp
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors"
                  >
                    Submit Quote Request ✓
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected Product Summary */}
            {selectedProduct && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">Selected Product</h3>
                <div className="bg-emerald-50 rounded-2xl p-4 mb-4">
                  <div className="text-3xl mb-2 text-center">
                    {["🍚","🌾","⬜","✨","🟤","💛"][parseInt(selectedProduct.id) - 1]}
                  </div>
                  <div className="text-emerald-800 font-bold text-sm text-center">{selectedProduct.name}</div>
                  <div className="text-emerald-600 text-xs text-center mt-1">{selectedProduct.origin}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Price</span>
                    <span className="font-semibold text-gray-900">${selectedProduct.pricePerTon}/MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">MOQ</span>
                    <span className="font-semibold text-gray-900">{selectedProduct.moq} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available</span>
                    <span className="font-semibold text-emerald-600">{selectedProduct.availableQty} MT</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tiers */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wide">💰 Pricing Tiers</h3>
              <div className="space-y-2">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.label}
                    className={`flex items-center justify-between text-xs p-3 rounded-xl ${
                      form.quantity && parseFloat(form.quantity) >= tier.min &&
                      (tier.max === Infinity || parseFloat(form.quantity) <= tier.max)
                        ? "bg-emerald-100 border border-emerald-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-gray-700">{tier.label}</div>
                      <div className="text-gray-400">
                        {tier.min}–{tier.max === Infinity ? "∞" : tier.max} MT
                      </div>
                    </div>
                    <div className={`font-bold ${tier.discount > 0 ? "text-emerald-600" : "text-gray-400"}`}>
                      {tier.discount > 0 ? `-${tier.discount}%` : "Base Price"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transit Time */}
            {selectedDestination && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-gray-900 font-bold text-sm mb-3 uppercase tracking-wide">🚢 Shipping Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Destination</span>
                    <span className="font-semibold text-gray-900">{selectedDestination.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Port</span>
                    <span className="font-semibold text-gray-900">{selectedDestination.port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transit Time</span>
                    <span className="font-semibold text-emerald-600">{selectedDestination.days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Freight Rate</span>
                    <span className="font-semibold text-gray-900">${freightRates[selectedDestination.id]}/MT</span>
                  </div>
                </div>
              </div>
            )}

            {/* Support */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-5 text-white">
              <div className="text-xl mb-2">💬</div>
              <div className="font-bold text-base mb-1">Need Help?</div>
              <p className="text-emerald-100 text-xs mb-4 leading-relaxed">
                Our export specialists are available 24/7 to assist with your quote.
              </p>
              <div className="space-y-2">
                <div className="text-xs text-emerald-100">📞 +234 812 345 6789</div>
                <div className="text-xs text-emerald-100">💬 WhatsApp Available</div>
                <div className="text-xs text-emerald-100">📧 export@ricexport.ng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
