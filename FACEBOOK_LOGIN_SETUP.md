# Facebook Login Setup Guide

## Overview
This guide will help you configure Facebook Login for your Firebase project. Facebook login requires setup in both Facebook Developer Console and Firebase Console.

## Step 1: Create a Facebook App

### 1.1 Go to Facebook Developers
1. Visit [Facebook Developers](https://developers.facebook.com/)
2. Click "Get Started" or "My Apps" if you already have an account
3. Log in with your Facebook account

### 1.2 Create New App
1. Click "Create App"
2. Select "Consumer" as the app type (for user authentication)
3. Fill in the app details:
   - **App Name**: Your app name (e.g., "Metatron")
   - **App Contact Email**: Your email
   - **Business Account**: Optional
4. Click "Create App"

### 1.3 Configure Facebook Login
1. In your app dashboard, find "Facebook Login" and click "Set Up"
2. Choose "Web" as the platform
3. Enter your site URL: `http://localhost:3000` (for development)
4. Click "Save" and "Continue"

### 1.4 Get App Credentials
1. Go to Settings > Basic in your Facebook app
2. Copy your **App ID** and **App Secret**
3. Keep these secure - you'll need them for Firebase

## Step 2: Configure Firebase Console

### 2.1 Enable Facebook Provider
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Find **Facebook** in the list and click on it
5. Toggle **Enable** to ON

### 2.2 Add Facebook Credentials
1. Paste your **App ID** from Facebook
2. Paste your **App Secret** from Facebook
3. Copy the **OAuth redirect URI** provided by Firebase
4. Click **Save**

### 2.3 Configure Facebook App with Firebase URI
1. Go back to Facebook Developers Console
2. Navigate to Facebook Login > Settings
3. In **Valid OAuth Redirect URIs**, add the URI you copied from Firebase
   - It should look like: `https://your-project.firebaseapp.com/__/auth/handler`
4. Save changes

## Step 3: Configure Your App Domain

### 3.1 Add Your Domain to Facebook App
1. In Facebook app settings, go to Settings > Basic
2. Add your domain to **App Domains**:
   - For development: `localhost`
   - For production: your actual domain (e.g., `yourapp.com`)

### 3.2 Configure Site URL
1. In Facebook Login settings, add your site URLs:
   - Development: `http://localhost:3000`
   - Production: `https://yourapp.com`

## Step 4: Test Facebook Login

### 4.1 Development Testing
1. Start your development server: `npm run dev`
2. Navigate to the login page
3. Click "Continue with Facebook"
4. You should see the Facebook login popup

### 4.2 Production Setup
For production deployment:
1. Add your production domain to Facebook app settings
2. Update Firebase authorized domains in Firebase Console > Authentication > Settings > Authorized domains
3. Make sure your production URL is HTTPS

## Common Issues & Troubleshooting

### Issue: "App Not Setup: This app is still in development mode"
**Solution**: 
- Your Facebook app is in development mode
- Add test users in Facebook app > Roles > Test Users
- Or make your app live by completing Facebook's review process

### Issue: "Invalid OAuth access token"
**Solution**:
- Check that App ID and App Secret are correct in Firebase
- Ensure OAuth redirect URI is properly set in Facebook app

### Issue: "URL Blocked: This redirect failed because the redirect URI is not whitelisted"
**Solution**:
- Add the Firebase OAuth redirect URI to Facebook Login settings
- Check that your domain is added to App Domains

### Issue: Facebook login works in development but not production
**Solution**:
- Add production domain to Facebook app settings
- Ensure production URL uses HTTPS
- Add production domain to Firebase authorized domains

## Security Best Practices

1. **Keep App Secret secure**: Never expose it in client-side code
2. **Use HTTPS in production**: Facebook requires HTTPS for production apps
3. **Regularly rotate App Secret**: For enhanced security
4. **Review permissions**: Only request necessary user permissions
5. **Monitor usage**: Check Facebook app analytics regularly

## Required Permissions

Your app currently requests:
- `email`: To get user's email address
- Basic profile information is included by default

To add more permissions, update the Facebook provider configuration in your code.

## Next Steps

After setup:
1. Test login functionality thoroughly
2. Handle edge cases (user cancellation, network errors)
3. Consider adding Facebook-specific features if needed
4. Plan for Facebook app review if going to production

## Support Links

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Firebase Facebook Auth Documentation](https://firebase.google.com/docs/auth/web/facebook-login)
- [Facebook App Review Process](https://developers.facebook.com/docs/app-review/)
