import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, type RegisterData, type LoginData } from "../services/auth";

type AuthMode = "login" | "register";

interface AuthProps {
  mode: AuthMode;
}

export default function Auth({ mode }: AuthProps) {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<AuthMode>(mode);
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginData: LoginData = {
        email: formData.email,
        password: formData.password,
      };
      await authService.login(loginData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const registerData: RegisterData = {
        email: formData.email,
        username: formData.username || formData.email.split("@")[0],
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        company_name: formData.company_name,
        phone: formData.phone,
        country: formData.country,
      };
      await authService.register(registerData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.password?.[0] || err.response?.data?.email?.[0] || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labels: Record<string, Record<string, string>> = {
    en: {
      title: currentMode === "login" ? "Welcome Back" : "Create Buyer Account",
      sub: currentMode === "login"
        ? "Sign in to your RiceXport dashboard"
        : "Join 20+ verified international buyers",
      email: "Business Email",
      password: "Password",
      submit: currentMode === "login" ? "Sign In" : "Continue →",
      toggle: currentMode === "login"
        ? "Don't have an account? Register"
        : "Already have an account? Sign In",
    },
    fr: {
      title: currentMode === "login" ? "Bienvenue" : "Créer un compte acheteur",
      sub: currentMode === "login" ? "Connectez-vous à votre tableau de bord" : "Rejoignez 20+ acheteurs vérifiés",
      email: "Email professionnel",
      password: "Mot de passe",
      submit: currentMode === "login" ? "Se connecter" : "Continuer →",
      toggle: currentMode === "login" ? "Pas de compte ? S'inscrire" : "Déjà inscrit ? Se connecter",
    },
    ar: {
      title: currentMode === "login" ? "مرحباً بعودتك" : "إنشاء حساب مشتري",
      sub: currentMode === "login" ? "سجل دخولك إلى لوحة التحكم" : "انضم إلى 280+ مشتري معتمد",
      email: "البريد الإلكتروني التجاري",
      password: "كلمة المرور",
      submit: currentMode === "login" ? "تسجيل الدخول" : "متابعة →",
      toggle: currentMode === "login" ? "ليس لديك حساب؟ سجل" : "لديك حساب؟ سجل الدخول",
    },
  };

  const t = labels[language];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="w-full max-w-5xl grid lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left panel */}
        <div className="bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 p-10 text-white flex flex-col justify-between hidden lg:flex">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-xl">
                🌾
              </div>
              <div>
                <div className="font-black text-xl">Rice<span className="text-emerald-400">Xport</span></div>
                <div className="text-gray-400 text-xs">Export Management Platform</div>
              </div>
            </Link>

            <h2 className="text-3xl font-black mb-4 leading-snug" style={{ fontFamily: "Playfair Display, serif" }}>
              {currentMode === "login"
                ? "Manage Your Rice Imports Globally"
                : "Source Premium Nigerian Rice Worldwide"}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10">
              {currentMode === "login"
                ? "Access your quotes, track shipments, download documents and monitor market prices all in one place."
                : "Join our platform to access NAFDAC-certified rice varieties, instant quotes, and automated export documentation."}
            </p>

            <div className="space-y-4">
              {[
                { icon: "⚡", text: "Instant quote generation with tiered pricing" },
                { icon: "📋", text: "Auto-generated export documentation" },
                { icon: "🚢", text: "Real-time shipment tracking" },
                { icon: "💱", text: "Multi-currency payment support" },
                { icon: "🌍", text: "Buyers from 5+ countries" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-gray-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex -space-x-2 mb-3">
              {["NG","AE", "GB", "US", "FR", "SN", "SG  `"].map((flag, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-base">
                  {flag}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs">20+ verified buyers from 5+ countries trust RiceXport</p>
          </div>
        </div>

        {/* Right panel — Form */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {/* Language selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-1">
              {(["en", "fr", "ar"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                    language === lang ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <Link to="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
              {t.title}
            </h1>
            <p className="text-gray-400 text-sm">{t.sub}</p>
          </div>

          {/* Login Form */}
          {currentMode === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="company@gmail.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">{t.password}</label>
                  <Link to="#" className="text-sm text-emerald-600 hover:underline">Forgot?</Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors text-base shadow-md shadow-gray-900/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : t.submit}
              </button>

              <div className="relative flex items-center my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="px-4 text-gray-400 text-xs">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button type="button" className="w-full py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <span>🌐</span> Continue with Google
              </button>
            </form>
          )}

          {/* Register Form — Multi-step */}
          {currentMode === "register" && (
            <div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        n < step ? "bg-emerald-600 border-emerald-600 text-white" :
                        n === step ? "border-emerald-600 text-emerald-600 bg-white" :
                        "border-gray-200 text-gray-300 bg-white"
                      }`}
                    >
                      {n < step ? "✓" : n}
                    </div>
                    {n < 3 && <div className={`w-8 h-0.5 ${n < step ? "bg-emerald-500" : "bg-gray-200"}`} />}
                  </div>
                ))}
                <span className="text-xs text-gray-400 ml-2">
                  {step === 1 ? "Account Info" : step === 2 ? "Company Details" : "Preferences"}
                </span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@gmail.com"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.password}</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Min 8 characters"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      value={formData.password2}
                      onChange={handleInputChange}
                      placeholder="Repeat password"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (formData.email && formData.password && formData.password2) {
                        if (formData.password === formData.password2) {
                          setStep(2);
                          setError("");
                        } else {
                          setError("Passwords don't match");
                        }
                      } else {
                        setError("Please fill all fields");
                      }
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="John Doe Trading co."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-600"
                    >
                      <option value="">Select country</option>
                      <option>Nigeria</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>France</option>
                      <option>Senegal</option>
                      <option>Ghana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+123 4567 890"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (formData.first_name && formData.last_name && formData.country) {
                          setStep(3);
                          setError("");
                        } else {
                          setError("Please fill required fields");
                        }
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Language</label>
                    <div className="flex gap-2">
                      {(["en", "fr", "ar"] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setLanguage(lang)}
                          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                            language === lang ? "bg-emerald-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {lang === "en" ? "English" : lang === "fr" ? "Français" : "العربية"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="AED">AED — UAE Dirham</option>
                      <option value="NGN">NGN — Nigerian Naira</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Registration No. (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. CN-1234567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <input type="checkbox" id="agreeTerms" className="accent-emerald-600" required />
                      <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                        I agree to the <Link to="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="agreeUpdates" className="accent-emerald-600" defaultChecked />
                      <label htmlFor="agreeUpdates" className="text-xs text-gray-600">
                        Receive price alerts & market intelligence updates
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      type="button"
                      className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleRegister}
                      disabled={loading}
                      type="button"
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating..." : "Create Account ✓"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="text-center text-gray-500 text-sm mt-6">
            {t.toggle.split("?")[0]}?{" "}
            <button
              onClick={() => {
                setCurrentMode(currentMode === "login" ? "register" : "login");
                setStep(1);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  password2: "",
                  username: "",
                  first_name: "",
                  last_name: "",
                  company_name: "",
                  phone: "",
                  country: "",
                });
              }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              {t.toggle.split("?")[1]?.trim()}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
