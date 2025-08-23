# Social Media Login Setup Guide

This guide will help you set up social media authentication for the Metatron frontend using Firebase Authentication.

## Prerequisites

1. Firebase project created
2. Firebase Authentication enabled
3. Firestore database enabled
4. Firebase Functions enabled (for subscription handling)

## Step 1: Firebase Console Setup

### 1.1 Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication > Sign-in method
4. Enable the following providers:
   - Google
   - Facebook
   - Twitter
   - GitHub
   - Email/Password

### 1.2 Configure OAuth Providers

#### Google Authentication
1. Click on Google provider
2. Enable it
3. Add your authorized domain (your-project-id.firebaseapp.com)
4. Copy the Client ID and Client Secret

#### Facebook Authentication
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use existing one
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - `https://your-project-id.firebaseapp.com/__/auth/handler`
5. Copy App ID and App Secret
6. In Firebase, paste the App ID and App Secret

#### Twitter Authentication
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Enable OAuth 2.0
4. Set callback URL: `https://your-project-id.firebaseapp.com/__/auth/handler`
5. Copy API Key and API Secret
6. In Firebase, paste the API Key and API Secret

#### GitHub Authentication
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `https://your-project-id.firebaseapp.com/__/auth/handler`
4. Copy Client ID and Client Secret
5. In Firebase, paste the Client ID and Client Secret

## Step 2: Environment Variables

Update your `.env` file with the actual values:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Social Login OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
VITE_TWITTER_API_KEY=your_twitter_api_key
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

## Step 3: Firestore Security Rules

Update your Firestore security rules to allow authenticated users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own subscriptions
    match /subscriptions/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access to startup/investor/connector data
    match /startups/{document=**} {
      allow read: if request.auth != null;
    }
    
    match /investors/{document=**} {
      allow read: if request.auth != null;
    }
    
    match /connectors/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## Step 4: Firebase Functions Setup

If you want to use Firebase Functions for subscription handling:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize functions: `firebase init functions`
4. Deploy functions: `firebase deploy --only functions`

## Step 5: Testing

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Test each social login provider
4. Verify user creation in Firestore
5. Test protected routes

## Troubleshooting

### Common Issues

1. **"popup_closed_by_user" error**
   - Check if popup blockers are enabled
   - Verify OAuth redirect URIs are correct

2. **"unauthorized_domain" error**
   - Add your domain to Firebase authorized domains
   - For localhost, add `localhost` to authorized domains

3. **"invalid_client" error**
   - Verify OAuth client IDs and secrets
   - Check if OAuth apps are properly configured

4. **Firestore permission denied**
   - Verify security rules are correct
   - Check if user is properly authenticated

### Debug Mode

Enable debug mode in Firebase:

```javascript
// In your firebase config
const auth = getAuth();
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = true; // Development only
```

## Security Considerations

1. **Never expose API keys in client-side code**
   - Use environment variables
   - Implement proper server-side validation

2. **Implement rate limiting**
   - Use Firebase Functions for sensitive operations
   - Add rate limiting to authentication endpoints

3. **Validate user data**
   - Sanitize user inputs
   - Implement proper role-based access control

4. **Monitor authentication logs**
   - Enable Firebase Authentication logging
   - Monitor for suspicious activities

## Next Steps

After setting up social login:

1. Implement user profile management
2. Add role-based access control
3. Set up subscription management
4. Add email verification
5. Implement password reset functionality
6. Add two-factor authentication (optional)

## Support

If you encounter issues:

1. Check Firebase Console logs
2. Review browser console errors
3. Verify environment variables
4. Check Firestore security rules
5. Consult Firebase documentation
6. Review this setup guide again
