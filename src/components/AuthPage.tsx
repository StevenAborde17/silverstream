import { useState } from "react";
import { Train, User, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronLeft } from "lucide-react";

interface AuthPageProps {
  onComplete: (userData: any) => void;
  onBack: () => void;
}

export function AuthPage({ onComplete, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<"choose" | "login" | "register">("choose");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const update = (field: string, val: string) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const validateRegister = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const e = mode === "login" ? validateLogin() : validateRegister();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete({ name: form.name || form.email.split("@")[0], email: form.email });
    }, 1200);
  };

  if (mode === "choose") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center px-4 font-sans">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-white/70 hover:text-white flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4">
              <Train className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-white" style={{ fontWeight: 800, fontSize: "2rem" }}>Almost there!</h1>
            <p className="text-blue-200 mt-2">Save your booking by creating an account or signing in</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setMode("register")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-colors flex items-center justify-between px-5"
              style={{ fontWeight: 600 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div style={{ fontWeight: 700 }}>Create an Account</div>
                  <div className="text-blue-200 text-xs" style={{ fontWeight: 400 }}>Save bookings, track history</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full border-2 border-blue-200 hover:border-blue-400 text-blue-700 py-4 rounded-xl transition-colors flex items-center justify-between px-5"
              style={{ fontWeight: 600 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div style={{ fontWeight: 700 }}>Sign In</div>
                  <div className="text-gray-400 text-xs" style={{ fontWeight: 400 }}>Already have an account</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-blue-300 text-xs mt-4">
            Your booking is secured regardless of your choice
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <button
          onClick={() => setMode("choose")}
          className="text-white/70 hover:text-white flex items-center gap-1 text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 pt-8 pb-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
              {mode === "login" ? <Lock className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
            </div>
            <h2 className="text-white" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              {mode === "login" ? "Sign in to your SilverStream account" : "Join SilverStream to manage your trips"}
            </p>
          </div>

          <div className="p-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs text-gray-600 mb-1.5" style={{ fontWeight: 600 }}>Full Name</label>
                <div className={`flex items-center gap-2 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-300 px-3 py-3 ${errors.name ? "border-red-400" : "border-gray-200"}`}>
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text" placeholder="Juan dela Cruz"
                    value={form.name} onChange={e => update("name", e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm min-w-0"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-600 mb-1.5" style={{ fontWeight: 600 }}>Email Address</label>
              <div className={`flex items-center gap-2 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-300 px-3 py-3 ${errors.email ? "border-red-400" : "border-gray-200"}`}>
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="email" placeholder="juan@email.com"
                  value={form.email} onChange={e => update("email", e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm min-w-0"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1.5" style={{ fontWeight: 600 }}>Password</label>
              <div className={`flex items-center gap-2 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-300 px-3 py-3 ${errors.password ? "border-red-400" : "border-gray-200"}`}>
                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={form.password} onChange={e => update("password", e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm min-w-0"
                />
                <button onClick={() => setShowPass(v => !v)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-xs text-gray-600 mb-1.5" style={{ fontWeight: 600 }}>Confirm Password</label>
                <div className={`flex items-center gap-2 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-300 px-3 py-3 ${errors.confirmPassword ? "border-red-400" : "border-gray-200"}`}>
                  <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type={showConfirmPass ? "text" : "password"} placeholder="••••••••"
                    value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm min-w-0"
                  />
                  <button onClick={() => setShowConfirmPass(v => !v)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
              style={{ fontWeight: 700 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                <>{mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-gray-500 text-sm">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); }}
                className="text-blue-600 hover:underline"
                style={{ fontWeight: 600 }}
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}