import React, { useState } from 'react';
import { auth, db } from '@/config/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  TwitterAuthProvider, 
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeProvider';

const Login: React.FC = () => {
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Investor' | 'Founder' | 'Connector'>('Investor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: any, providerName: string) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          role: 'Investor', // Default role
          subscription: 'Free',
          watchlist: [],
          createdAt: new Date(),
          provider: providerName
        });
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Social login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        // User creation will be handled by AuthProvider
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      provider: new GoogleAuthProvider(),
      color: 'bg-red-500 hover:bg-red-600',
      icon: '🔍'
    },
    {
      name: 'Facebook',
      provider: new FacebookAuthProvider(),
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: '📘'
    },
    {
      name: 'Twitter',
      provider: new TwitterAuthProvider(),
      color: 'bg-blue-400 hover:bg-blue-500',
      icon: '🐦'
    },
    {
      name: 'GitHub',
      provider: new GithubAuthProvider(),
      color: 'bg-gray-800 hover:bg-gray-900',
      icon: '🐙'
    }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      theme.type === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-300 to-gray-400'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
            {isSignUp ? 'Join metatron to access exclusive content' : 'Welcome back to metatron'}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            {socialProviders.map((social) => (
              <button
                key={social.name}
                onClick={() => handleSocialLogin(social.provider, social.name)}
                disabled={loading}
                className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white ${social.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="mr-2">{social.icon}</span>
                Continue with {social.name}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 transition-colors duration-300" style={{ 
                backgroundColor: theme.colors.secondaryBg,
                color: theme.colors.tertiaryText 
              }}>
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm transition-colors duration-300"
                  style={{
                    borderColor: theme.colors.borderColor,
                    backgroundColor: theme.colors.inputAutofillBg,
                    color: theme.colors.primaryText
                  }}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm transition-colors duration-300"
                  style={{
                    borderColor: theme.colors.borderColor,
                    backgroundColor: theme.colors.inputAutofillBg,
                    color: theme.colors.primaryText
                  }}
                  placeholder="Password"
                />
              </div>
              
              {isSignUp && (
                <div>
                  <label htmlFor="role" className="sr-only">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'Investor' | 'Founder' | 'Connector')}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm transition-colors duration-300"
                    style={{
                      borderColor: theme.colors.borderColor,
                      backgroundColor: theme.colors.inputAutofillBg,
                      color: theme.colors.primaryText
                    }}
                  >
                    <option value="Investor">Investor</option>
                    <option value="Founder">Founder</option>
                    <option value="Connector">Deal-Maker</option>
                  </select>
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm text-center transition-colors duration-300" style={{ color: '#ef4444' }}>
                {error}
              </div>
            )}

            <div>
                          <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1DC071] hover:bg-[#17a65d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DC071] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign up' : 'Sign in')}
            </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: theme.colors.accentButtonBg }}
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
