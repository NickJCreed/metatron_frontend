# Social Login Setup Guide

This guide explains how to set up social login functionality for Google, GitHub, Twitter, and Facebook in your Metatron frontend application.

## Overview

The social login feature has been implemented using Firebase Authentication with the following providers:
- **Google OAuth 2.0** - Email, profile, and openid scopes
- **GitHub OAuth 2.0** - User email and read:user scopes
- **Twitter OAuth 2.0** - Email, users.read, and tweet.read scopes
- **Facebook OAuth 2.0** - Email and public_profile scopes

## Prerequisites

1. Firebase project with Authentication enabled
2. Firebase configuration in your environment variables
3. OAuth 2.0 credentials for each social provider
4. Thirdweb account and project setup

## Environment Variables Configuration

### Required Firebase Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Optional Firebase Variables

```env
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
```

### Social Login OAuth Variables

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
VITE_TWITTER_API_KEY=your_twitter_api_key
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

### Thirdweb Configuration

```env
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
VITE_THIRDWEB_AUTH_DOMAIN=metatrondao.io
```

### App Configuration

```env
VITE_APP_NAME=Metatron
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

## Firebase Configuration

### 1. Enable Authentication Providers

In your Firebase Console:

1. Go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Google**
   - **GitHub** 
   - **Twitter**
   - **Facebook**

### 2. Google OAuth Setup

1. In Firebase Console, click on **Google** provider
2. Enable it and add your authorized domains
3. Copy the **Web client ID** and **Web client secret**
4. Add the client ID to `VITE_GOOGLE_CLIENT_ID`
5. Configure additional scopes: email, profile, openid

### 3. GitHub OAuth Setup

1. Go to GitHub Developer Settings: https://github.com/settings/developers
2. Create a new OAuth App
3. Set the Authorization callback URL to: `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Copy the **Client ID** and **Client Secret**
5. In Firebase Console, click on **GitHub** provider and enter these credentials
6. Add the client ID to `VITE_GITHUB_CLIENT_ID`
7. Configure scopes: user:email, read:user

### 4. Twitter OAuth Setup

1. Go to Twitter Developer Portal: https://developer.twitter.com/
2. Create a new app
3. Set the Callback URL to: `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Copy the **API Key** and **API Secret Key**
5. In Firebase Console, click on **Twitter** provider and enter these credentials
6. Add the API key to `VITE_TWITTER_API_KEY`
7. Configure scopes: email, users.read, tweet.read

### 5. Facebook OAuth Setup

1. Go to Facebook Developers: https://developers.facebook.com/
2. Create a new app
3. Set the OAuth redirect URI to: `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Copy the **App ID** and **App Secret**
5. In Firebase Console, click on **Facebook** provider and enter these credentials
6. Add the app ID to `VITE_FACEBOOK_APP_ID`
7. Configure scopes: email, public_profile

## Thirdweb Configuration

### 1. Create Thirdweb Project

1. Go to https://thirdweb.com/
2. Create a new project
3. Copy the **Client ID**
4. Add it to `VITE_THIRDWEB_CLIENT_ID`

### 2. Configure Auth Domain

1. Set your custom auth domain in `VITE_THIRDWEB_AUTH_DOMAIN`
2. Default is `metatrondao.io`

## Development vs Production

### Development Environment

- Automatically connects to Firebase emulators
- Uses localhost for development
- Set `VITE_ENVIRONMENT=development`

### Production Environment

- Uses Firebase production services
- Requires HTTPS
- Set `VITE_ENVIRONMENT=production`

## Features Implemented

### 1. Social Login Methods

- **Google Sign-In**: OAuth 2.0 with email, profile, and openid scopes
- **GitHub Sign-In**: OAuth with user:email and read:user scopes
- **Twitter Sign-In**: OAuth with email, users.read, and tweet.read scopes
- **Facebook Sign-In**: OAuth with email and public_profile scopes

### 2. Enhanced User Management

- Automatic user profile creation in Firestore
- Profile information storage (display name, email, photo URL)
- Role-based access control (Investor, Founder, Connector)
- Subscription management integration
- Social provider tracking
- Activity logging

### 3. Advanced UI Components

- **AuthPage**: Comprehensive login/signup with all social providers
- **ProfilePage**: Enhanced profile display with social login information
- **Header**: Smart navigation with conditional authentication states
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 4. Robust Authentication Flow

1. User selects social login provider
2. Firebase redirects to provider's OAuth page
3. User authorizes the application
4. Firebase creates/updates user account
5. User profile is created/updated in Firestore
6. Automatic redirect back to application
7. Fallback authentication if OAuth fails

### 5. Error Handling & Fallbacks

- Comprehensive error handling with user-friendly messages
- Fallback to anonymous authentication if social login fails
- Automatic retry mechanisms
- Detailed logging for debugging

## Usage

### For Users

1. Navigate to `/auth` or click "Sign In" in the header
2. Choose a social login provider (Google, GitHub, Twitter, or Facebook)
3. Complete OAuth authorization
4. User is automatically signed in and redirected to the home page

### For Developers

The social login methods are available through the `useAuth` hook:

```typescript
import { useAuth } from '@/context/AuthProvider';

const { 
  signInWithGoogle, 
  signInWithGithub, 
  signInWithTwitter,
  signInWithFacebook 
} = useAuth();

// Trigger social login
await signInWithGoogle();
await signInWithGithub();
await signInWithTwitter();
await signInWithFacebook();
```

### Thirdweb Integration

```typescript
import { handleLogin, handleLogout } from '@/config/thirdwebAuth';

// Wallet-based authentication
const userId = await handleLogin();

// Logout
await handleLogout();
```

## Security Considerations

1. **OAuth Scopes**: Only request necessary scopes for each provider
2. **Domain Restrictions**: Configure authorized domains in Firebase
3. **HTTPS Required**: Social login only works over HTTPS in production
4. **Token Management**: Firebase handles token refresh automatically
5. **Environment Variables**: Never commit sensitive keys to version control
6. **Provider Validation**: Verify OAuth app settings in each provider dashboard

## Troubleshooting

### Common Issues

1. **Popup Blocked**: The app falls back to redirect-based authentication
2. **Domain Mismatch**: Ensure OAuth callback URLs match exactly
3. **Scope Issues**: Verify required scopes are enabled in provider settings
4. **Firebase Rules**: Ensure Firestore security rules allow user document creation
5. **Environment Variables**: Check that all required variables are set

### Debug Steps

1. Check browser console for authentication errors
2. Verify Firebase configuration in browser console
3. Check Firebase Console for authentication logs
4. Verify OAuth app settings in provider dashboards
5. Test with Firebase emulators in development

### Emulator Setup

For local development, the app automatically connects to Firebase emulators:

```bash
# Start Firebase emulators
firebase emulators:start

# The app will automatically connect to:
# - Auth: localhost:9099
# - Firestore: localhost:8080
# - Functions: localhost:5001
# - Storage: localhost:9199
```

## Future Enhancements

- Email verification for social login accounts
- Additional social providers (LinkedIn, Discord, etc.)
- Custom user profile fields and validation
- Social login analytics and metrics
- Multi-factor authentication integration
- Advanced role-based permissions
- Social login federation across multiple apps

## Support

For issues related to:
- **Firebase Configuration**: Check [Firebase documentation](https://firebase.google.com/docs)
- **OAuth Setup**: Refer to provider-specific documentation
- **Thirdweb Integration**: Visit [Thirdweb docs](https://portal.thirdweb.com/)
- **Application Code**: Review the implementation in:
  - `src/config/firebase.ts` - Firebase configuration
  - `src/config/thirdwebAuth.ts` - Thirdweb authentication
  - `src/context/AuthProvider.tsx` - Authentication context
  - `src/pages/AuthPage.tsx` - Login/signup UI

## Configuration Checklist

- [ ] Firebase project created and configured
- [ ] Authentication enabled in Firebase Console
- [ ] OAuth providers configured (Google, GitHub, Twitter, Facebook)
- [ ] Environment variables set in `.env` file
- [ ] Thirdweb project created and client ID obtained
- [ ] OAuth apps configured in provider developer consoles
- [ ] Callback URLs set correctly
- [ ] Firebase security rules configured
- [ ] Tested in development environment
- [ ] Verified production deployment
