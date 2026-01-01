import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AlertMessage from '../components/shared/AlertMessage';
import Card from '../components/shared/Card';
import FormField from '../components/shared/FormField';
import Button from '../components/Button';
import GoogleIconButton from '../components/shared/GoogleIconButton';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loginWithGoogle, resetPassword, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError('');
    setFieldErrors({});

    try {
      await login(email, password);
    } catch (error) {
      const errorCode = (error as { code?: string })?.code || '';
      const errorMessage = (error as Error).message || 'An error occurred';

      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
        setFieldErrors({ password: 'Invalid email or password' });
      } else if (errorCode === 'auth/user-not-found') {
        setFieldErrors({ email: 'No account found with this email' });
      } else if (errorCode === 'auth/invalid-email') {
        setFieldErrors({ email: 'Invalid email address' });
      } else if (errorCode === 'auth/user-disabled') {
        setError('This account has been disabled');
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (error) {
      const errorCode = (error as { code?: string })?.code || '';
      const errorMessage = (error as Error).message || 'An error occurred';

      if (errorCode === 'auth/popup-closed-by-user') {
        setError('Google sign-in was cancelled');
      } else if (errorCode === 'auth/popup-blocked') {
        setError('Pop-up was blocked. Please allow pop-ups and try again');
      } else if (errorCode === 'auth/account-exists-with-different-credential') {
        setError('An account with this email already exists. Please sign in with password');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    setError('');
    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (error) {
      const errorCode = (error as { code?: string })?.code || '';
      const errorMessage = (error as Error).message || 'An error occurred';

      if (errorCode === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card className="border-t-4 border-t-emerald-600">
          {error && <AlertMessage type="error" message={error} />}
          {success && <AlertMessage type="success" message={success} />}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldErrors.email}
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={loading}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-700">
                Sign up
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-5">
              <GoogleIconButton onClick={handleGoogleLogin} disabled={loading} loading={loading} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
