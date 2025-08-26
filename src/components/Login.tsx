import React, { useState } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { auth, db } from '../config/firebase';
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

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      if (isSignUp) {
        // Sign up
        const result = await createUserWithEmailAndPassword(auth, email, password);
        
        // Save user data to Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          createdAt: new Date(),
          role: 'user',
          subscription: 'free'
        });
        
        console.log('Successfully signed up');
        setError('Account created successfully! Redirecting to startups...');
        
        // Redirect to startups after successful signup
        setTimeout(() => {
          onNavigate('startups');
        }, 2000);
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Successfully signed in');
        setError('Sign in successful! Redirecting to startups...');
        
        // Redirect to startups after successful signin
        setTimeout(() => {
          onNavigate('startups');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: any, providerName: string) => {
    try {
      setLoading(true);
      setError('');
      
      // Check if Firebase is properly configured
      if (!auth) {
        throw new Error('Firebase authentication is not properly configured. Please check your environment variables.');
      }
      const result = await signInWithPopup(auth, provider);
      
      // Save user data to Firestore
      if (result.user) {
        const userRef = doc(db, 'users', result.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          // New user - create profile
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            provider: providerName,
            createdAt: new Date(),
            role: 'user',
            subscription: 'free'
          });
        }
      }
      
      console.log('Successfully signed in with', providerName);
      setError(`Successfully signed in with ${providerName}! Redirecting to startups...`);
      
      // Redirect to startups after successful social login
      setTimeout(() => {
        onNavigate('startups');
      }, 2000);
    } catch (error: any) {
      console.error('Social login error:', error);
      
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.code === 'auth/argument-error') {
        errorMessage = 'Firebase configuration error. Please ensure all Firebase environment variables are set correctly.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials. Please use your original sign-in method.';
      } else if (error.code === 'auth/auth-domain-config-required') {
        errorMessage = 'Firebase Auth domain configuration is required. Please check your Firebase setup.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Only one popup request is allowed at a time.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = `${providerName} sign-in is not enabled. Please contact support.`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Configure auth providers
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  
  const facebookProvider = new FacebookAuthProvider();
  facebookProvider.addScope('email');
  facebookProvider.addScope('public_profile');
  
  const twitterProvider = new TwitterAuthProvider();
  
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope('user:email');

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.secondaryBg }}>
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg" style={{ backgroundColor: theme.colors.modalBg }}>
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ color: theme.colors.primaryText }}>
            Welcome to metatron
          </h2>
          <p className="mt-2 text-sm" style={{ color: theme.colors.secondaryText }}>
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>
        
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin(googleProvider, 'Google')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          
          <button
            onClick={() => handleSocialLogin(facebookProvider, 'Facebook')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span className="text-blue-600 mr-2">📘</span>
            Continue with Facebook
          </button>
          
          <button
            onClick={() => handleSocialLogin(twitterProvider, 'Twitter')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span className="text-blue-400 mr-2">🐦</span>
            Continue with Twitter
          </button>
          
          <button
            onClick={() => handleSocialLogin(githubProvider, 'GitHub')}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span className="text-blue-800 mr-2">🐙</span>
            Continue with GitHub
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: theme.colors.borderColor }} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2" style={{ backgroundColor: theme.colors.modalBg, color: theme.colors.secondaryText }}>
              Or continue with email
            </span>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: theme.colors.primaryText }}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: theme.colors.modalBg,
                borderColor: theme.colors.borderColor,
                color: theme.colors.primaryText
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium" style={{ color: theme.colors.primaryText }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: theme.colors.modalBg,
                borderColor: theme.colors.borderColor,
                color: theme.colors.primaryText
              }}
              placeholder="Enter your password"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              style={{
                backgroundColor: theme.colors.accentButtonBg,
                color: theme.colors.accentButtonText
              }}
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm" 
            style={{ color: theme.colors.accentButtonBg }}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-sm" 
            style={{ color: theme.colors.accentButtonBg }}
          >
            ← Back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
