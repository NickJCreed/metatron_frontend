# Metatron Frontend Authentication System

This document describes the authentication system implemented for the Metatron frontend application.

## Overview

The application now uses Firebase Authentication with social media login support and protected routes. Users must authenticate before accessing any content pages.

## Features

### 🔐 Authentication Methods
- **Social Media Login**: Google, Facebook, Twitter, GitHub
- **Email/Password**: Traditional email and password authentication
- **Role-based Access**: Users can select roles (Investor, Founder, Connector)

### 🛡️ Security Features
- **Protected Routes**: All content pages require authentication
- **Firebase Security**: Server-side authentication validation
- **Session Management**: Persistent authentication state
- **Role-based Permissions**: Different access levels based on user role

## Architecture

### Components

1. **AuthProvider** (`src/context/AuthProvider.tsx`)
   - Manages authentication state
   - Handles user login/logout
   - Manages user data and subscriptions

2. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Wraps content pages
   - Redirects unauthenticated users to login
   - Shows loading state during authentication check

3. **Login** (`src/components/Login.tsx`)
   - Social media login buttons
   - Email/password form
   - User registration with role selection

4. **LandingPage** (`src/components/LandingPage.tsx`)
   - Public landing page for unauthenticated users
   - Call-to-action to sign in

### Routing Structure

```
/ (LandingPage) - Public, no authentication required
/login (Login) - Public, no authentication required
/dashboard (Gallery) - Protected, requires authentication
/investors (Gallery) - Protected, requires authentication
/connectors (ConnectorsPage) - Protected, requires authentication
/nft/:id (NFTPage) - Protected, requires authentication
/investor/:id (InvestorProfilePage) - Protected, requires authentication
/vote (VotingPage) - Protected, requires authentication
/proposal/:id (ProposalPage) - Protected, requires authentication
/profile (ProfilePage) - Protected, requires authentication
```

## Setup Instructions

### 1. Environment Variables

Ensure your `.env` file contains the required Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Firebase Console Setup

1. Enable Authentication in Firebase Console
2. Configure OAuth providers (Google, Facebook, Twitter, GitHub)
3. Set up Firestore database
4. Configure security rules

### 3. OAuth Provider Setup

Follow the detailed setup guide in `SOCIAL_LOGIN_SETUP.md` for configuring each social media provider.

## Usage

### For Users

1. **First Visit**: Users see the landing page
2. **Authentication**: Click "Sign In" to access the login page
3. **Social Login**: Choose a social media provider or use email/password
4. **Role Selection**: New users select their role during registration
5. **Access**: After authentication, users can access all content pages

### For Developers

#### Adding New Protected Routes

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

<Route 
  path="/new-page" 
  element={
    <ProtectedRoute>
      <Layout>
        <NewPageComponent />
      </Layout>
    </ProtectedRoute>
  } 
/>
```

#### Accessing Authentication State

```tsx
import { useAuth } from '@/context/AuthProvider';

const { isAuthorized, userId, userRole, subscription } = useAuth();
```

#### User Management

```tsx
const { signIn, signUp, signOut } = useAuth();

// Sign in
await signIn(email, password);

// Sign up
await signUp(email, password, 'Investor');

// Sign out
await signOut();
```

## Data Flow

1. **User visits protected route**
2. **ProtectedRoute checks authentication**
3. **If not authenticated**: Redirect to `/login`
4. **User authenticates**: Firebase creates/updates user
5. **AuthProvider updates state**: Sets `isAuthorized = true`
6. **User redirected**: Back to intended page or dashboard
7. **Content displayed**: User can now access protected content

## User Roles

- **Investor**: Can view startups, investors, and connectors
- **Founder**: Can view investors and connectors, manage startup profile
- **Connector**: Can view startups and investors, manage connector profile

## Subscription Tiers

- **Free**: Basic access to platform
- **Pro**: Enhanced features and analytics
- **Enterprise**: Full platform access with premium features

## Security Considerations

1. **Client-side Protection**: Routes are protected at the component level
2. **Server-side Validation**: Firebase handles authentication validation
3. **Data Access**: Firestore security rules enforce user permissions
4. **Session Management**: Firebase manages authentication tokens

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check Firebase configuration
   - Verify OAuth provider setup
   - Check browser console for errors

2. **"Route not found"**
   - Ensure route is properly wrapped with ProtectedRoute
   - Check route path configuration

3. **"User not authorized"**
   - Verify user is properly authenticated
   - Check Firebase Authentication logs
   - Verify user document exists in Firestore

### Debug Mode

Enable debug logging in the browser console:

```javascript
// In browser console
localStorage.setItem('debug', 'firebase:*');
```

## Future Enhancements

1. **Two-factor Authentication**
2. **Email Verification**
3. **Password Reset**
4. **Advanced Role Management**
5. **Audit Logging**
6. **Rate Limiting**

## Support

For authentication issues:

1. Check Firebase Console logs
2. Review browser console errors
3. Verify environment variables
4. Check Firestore security rules
5. Consult Firebase documentation

## Dependencies

- Firebase Authentication
- Firebase Firestore
- React Router DOM
- React Context API
- Tailwind CSS
