import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { signIn } from '../../lib/supabase';
import { cn } from '../../utils/cn';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { data, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    if (data?.user) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <span className="text-2xl font-display font-bold text-white">DZ2Cloud</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Sign in to manage contact submissions</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dz2cloud.com"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3 rounded-xl',
                    'bg-gray-900/50 border border-gray-700',
                    'text-white placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
                    'transition-all duration-200'
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3 rounded-xl',
                    'bg-gray-900/50 border border-gray-700',
                    'text-white placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
                    'transition-all duration-200'
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-3 px-4 rounded-xl font-semibold',
                'bg-gradient-to-r from-brand-500 to-accent-cyan',
                'text-white shadow-lg shadow-brand-500/25',
                'hover:shadow-xl hover:shadow-brand-500/30',
                'focus:outline-none focus:ring-2 focus:ring-brand-500/50',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-200',
                'flex items-center justify-center gap-2'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site link */}
        <p className="text-center mt-6 text-gray-500">
          <a href="/" className="text-brand-400 hover:text-brand-300 transition-colors">
            &larr; Back to main site
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
