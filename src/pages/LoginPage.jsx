import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-muted via-[#FAFAF9] to-secondary-muted flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="font-heading text-2xl font-semibold text-stone-800">Peacix</span>
          </Link>
          <h1 className="text-3xl font-heading font-medium text-stone-800">Welcome back</h1>
          <p className="text-stone-500 font-body mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {error && (
            <div data-testid="login-error" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-body">{error}</div>
          )}
          <form onSubmit={handleSubmit} data-testid="login-form" className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                data-testid="login-email-input"
                className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  data-testid="login-password-input"
                  className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none pr-10" placeholder="Your password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} data-testid="login-submit-btn"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6 font-body">
            Don't have an account? <Link to="/register" data-testid="register-link" className="text-primary-dark font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
