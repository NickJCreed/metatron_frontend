# Firebase Setup Guide

## Issue Resolution: auth/argument-error

The `Firebase: Error (auth/argument-error)` occurs when Firebase environment variables are not properly configured.

## Quick Fix

1. **Create a `.env` file** in the root directory of your project with the following content:

```env
# Firebase Configuration (REQUIRED)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

2. **Get your Firebase configuration values** from the Firebase Console:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Copy the config values from your web app

## Detailed Setup Steps

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google, Facebook, Twitter, GitHub as needed
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode

### 2. Web App Configuration

1. In Firebase Console, go to Project Settings
2. In "Your apps" section, add a web app if you haven't already
3. Copy the Firebase SDK configuration
4. Replace the placeholder values in your `.env` file

### 3. Google OAuth Setup

For Google sign-in to work properly:

1. In Firebase Console > Authentication > Sign-in method
2. Click on Google provider
3. Enable it and add your project's domains to authorized domains
4. Make sure your OAuth consent screen is configured in Google Cloud Console

### 4. Environment Variables

Make sure your `.env` file is in the project root and contains all required variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc123
```

### 5. Restart Development Server

After creating/updating the `.env` file:

```bash
npm run dev
# or
yarn dev
```

## Common Issues

1. **Missing .env file**: Create it in the project root
2. **Wrong variable names**: Must start with `VITE_` for Vite to expose them
3. **Incorrect Firebase config**: Double-check values from Firebase Console
4. **OAuth not configured**: Enable providers in Firebase Console
5. **Domain not authorized**: Add your domain to Firebase authorized domains

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file should be in your `.gitignore`
- Use different Firebase projects for development and production
