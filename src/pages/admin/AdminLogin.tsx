// pages/admin/AdminLogin.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Church, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Fingerprint,
  Key,
  Smartphone,
  Mail,
  ArrowLeft
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    twoFactorCode: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  // Handle account lock timer
  useEffect(() => {
    if (!isLocked || !lockTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, lockTime - Date.now());
      setTimeLeft(Math.ceil(remaining / 1000));

      if (remaining <= 0) {
        setIsLocked(false);
        setLockTime(null);
        setLoginAttempts(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked, lockTime]);

  // Check for saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_saved_email');
    const savedRemember = localStorage.getItem('admin_remember_me');
    
    if (savedEmail && savedRemember === 'true') {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account is temporarily locked. Try again in ${timeLeft} seconds.`);
      return;
    }

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock credentials - replace with actual API call
      const mockCredentials = {
        email: "admin@church.com",
        password: "church@2024"
      };

      // Check credentials
      if (formData.email !== mockCredentials.email || formData.password !== mockCredentials.password) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 5) {
          const lockDuration = 5 * 60 * 1000; // 5 minutes
          setIsLocked(true);
          setLockTime(Date.now() + lockDuration);
          setError("Too many failed attempts. Account locked for 5 minutes.");
        } else {
          setError(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
        }
        return;
      }

      // For demo, simulate 2FA requirement after 3rd successful login from new device
      const shouldShow2FA = Math.random() > 0.5;
      
      if (shouldShow2FA && !showTwoFactor) {
        setShowTwoFactor(true);
        setSuccess("Please enter your 2FA code sent to your email");
        return;
      }

      // Verify 2FA code if required
      if (showTwoFactor && formData.twoFactorCode !== "123456") {
        setError("Invalid 2FA code. Please try again.");
        return;
      }

      // Save remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('admin_saved_email', formData.email);
        localStorage.setItem('admin_remember_me', 'true');
      } else {
        localStorage.removeItem('admin_saved_email');
        localStorage.removeItem('admin_remember_me');
      }

      // Generate and store token
      const token = `church_admin_${Date.now()}_${Math.random().toString(36).substr(2)}`;
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify({
        email: formData.email,
        name: "Church Admin",
        role: "administrator",
        loginTime: new Date().toISOString()
      }));

      // Reset form
      setFormData({
        email: formData.email,
        password: "",
        rememberMe: formData.rememberMe,
        twoFactorCode: ""
      });

      setSuccess("Login successful! Redirecting...");

      // Redirect to admin dashboard or previous page
      const from = location.state?.from?.pathname || "/admin";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);

    } catch (err) {
      console.error('Login error:', err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setError("Please enter your email address first");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Password reset instructions sent to ${formData.email}`);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-br from-amber-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-linear-to-bl from-blue-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-linear-to-tr from-purple-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4 md:px-8">
        <div className="container mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
            <span className="text-gray-400 group-hover:text-white transition-colors">Back to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-amber-900/30 to-amber-700/20 mb-6 border border-amber-900/30">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-700 rounded-full blur-lg" />
                <div className="relative w-12 h-12 bg-linear-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Church <span className="text-amber-400">CMS</span>
            </h1>
            <p className="text-gray-400">Secure Admin Portal</p>
            
            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">🔐 Secure Connection</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-linear-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-6 md:p-8 shadow-2xl">
            {/* Account Lock Warning */}
            {isLocked && (
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-900/20 to-red-800/10 border border-red-700/30">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-red-300 font-medium">Account Temporarily Locked</div>
                    <div className="text-red-400 text-sm mt-1">
                      Too many failed attempts. Try again in{" "}
                      <span className="font-bold">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div className="text-green-300">{success}</div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-900/20 to-red-800/10 border border-red-700/30">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div className="text-red-300">{error}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Admin Email
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@church.com"
                    disabled={loading || isLocked}
                    className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="email"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  <span className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    disabled={loading || isLocked}
                    className="w-full px-4 py-3 pl-12 pr-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    autoComplete="current-password"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    disabled={loading || isLocked}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              {showTwoFactor && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-white">
                    <span className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4" />
                      Two-Factor Authentication Code
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Enter the 6-digit code sent to your email
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="twoFactorCode"
                      value={formData.twoFactorCode}
                      onChange={handleInputChange}
                      placeholder="123456"
                      disabled={loading || isLocked}
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-center text-xl tracking-widest"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                    />
                    <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={loading || isLocked}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border border-amber-900/30 bg-gray-900/50 peer-checked:bg-linear-to-r peer-checked:from-amber-600 peer-checked:to-amber-700 peer-checked:border-amber-500 transition-all duration-300 group-hover:border-amber-500 flex items-center justify-center">
                      {formData.rememberMe && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading || isLocked}
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || isLocked}
                className="w-full py-3.5 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Sign In to Admin Portal
                  </>
                )}
              </button>

              {/* Security Tips */}
              <div className="pt-4 border-t border-amber-900/30">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Ensure you're on the official church website</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Never share your login credentials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Log out when using public computers</span>
                  </div>
                </div>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 rounded-xl bg-linear-to-r from-blue-900/10 to-blue-800/5 border border-blue-900/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-linear-to-r from-blue-900/20 to-blue-800/10">
                  <Church className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-blue-300 font-medium">Demo Credentials</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email:</span>
                  <code className="px-2 py-1 rounded bg-gray-800/50 text-gray-300">admin@church.com</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Password:</span>
                  <code className="px-2 py-1 rounded bg-gray-800/50 text-gray-300">church@2024</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">2FA Code:</span>
                  <code className="px-2 py-1 rounded bg-gray-800/50 text-gray-300">123456</code>
                </div>
              </div>
            </div>

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && !isLocked && (
              <div className="mt-6 p-3 rounded-lg bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-900/20">
                <div className="text-center text-amber-300 text-sm">
                  ⚠️ Failed attempts: {loginAttempts}/5
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
              <span>© {new Date().getFullYear()} Church CMS</span>
              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
              <span>Version 2.0.1</span>
              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
              <span>Last updated: Today</span>
            </div>
            <div className="text-xs text-gray-600">
              <p>For security assistance, contact your system administrator</p>
              <p className="mt-1">All access is logged and monitored</p>
            </div>
          </div>
        </div>
      </main>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating crosses */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-500/10 animate-float"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              fontSize: '2rem'
            }}
          >
            ✝
          </div>
        ))}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-500/10 animate-float"
            style={{
              top: `${60 + i * 15}%`,
              right: `${15 + i * 25}%`,
              animationDelay: `${i * 1.5}s`,
              fontSize: '1.5rem'
            }}
          >
            ✝
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default AdminLogin;