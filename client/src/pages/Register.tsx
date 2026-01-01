import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AlertMessage from '../components/shared/AlertMessage';
import Card from '../components/shared/Card';
import FormField from '../components/shared/FormField';
import Button from '../components/Button';
import GoogleIconButton from '../components/shared/GoogleIconButton';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { register, loginWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    const errors: { email?: string; password?: string; confirmPassword?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      await register(email, password);
      setSuccess('Registration successful! Redirecting...');
    } catch (error) {
      const errorCode = (error as { code?: string })?.code || '';
      const errorMessage = (error as Error).message || 'An error occurred';

      if (errorCode === 'auth/email-already-in-use') {
        setFieldErrors({ email: 'An account with this email already exists' });
      } else if (errorCode === 'auth/weak-password') {
        setFieldErrors({ password: 'Password is too weak (min 6 characters)' });
      } else if (errorCode === 'auth/invalid-email') {
        setFieldErrors({ email: 'Invalid email address' });
      } else if (errorCode === 'auth/operation-not-allowed') {
        setError('Email/password accounts are not enabled');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleGoogleRegister = async () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join to find your perfect college</p>
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

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={fieldErrors.confirmPassword}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
                Sign in
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
              <GoogleIconButton onClick={handleGoogleRegister} disabled={loading} loading={loading} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
