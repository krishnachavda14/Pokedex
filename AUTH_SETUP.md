# OAuth Authentication Setup Guide

This application uses Google OAuth for user authentication. Follow these steps to set it up:

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
5. If you see a warning "To create an OAuth client ID, you must first configure your consent screen", click **Configure consent screen**
6. On the OAuth consent screen configuration page:
   - **User Type Selection**: You'll see a page asking "What user type do you want to support?"
   - **Choose "External"** - This option is for apps that allow users outside your organization (most common for personal projects)
   - **Note**: "Internal" is only available if you have a Google Workspace account
   - Click **CREATE** after selecting External
7. Fill in the OAuth consent screen information:
   - **App name**: "Pokédex Lite" (or any name you prefer)
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
   - Click **SAVE AND CONTINUE**
8. On the Scopes page:
   - Click **SAVE AND CONTINUE** (default scopes are fine for basic authentication)
9. On the Test users page (if shown):
   - Click **+ ADD USERS**
   - Add your email address as a test user
   - Click **SAVE AND CONTINUE**
10. After completing the consent screen setup:
    - You'll see a notification "OAuth configuration created!" at the bottom
    - You'll be on the **OAuth Overview** page
    - In the **Metrics** section, you'll see a blue button **"Create OAuth client"**
    - **Click the "Create OAuth client" button** (or navigate to **Clients** in the left sidebar and click **+ CREATE CLIENT**)
11. Configure the OAuth client:
    - **Application type**: Select **Web application**
    - **Name**: "Pokédex Lite" (or any name you prefer)
    - **Authorized JavaScript origins**: Click **+ ADD URI** and add:
      - `http://localhost:5173` (for Vite dev server)
      - `http://localhost:3000` (if using different port)
      - Add your production URL when deploying (e.g., `https://yourdomain.com`)
    - **Authorized redirect URIs**: Click **+ ADD URI** and add:
      - `http://localhost:5173` (for Vite dev server)
      - Add your production URL when deploying (e.g., `https://yourdomain.com`)
    - Click **CREATE**
12. Copy your Client ID:
    - After creation, a popup will appear showing your **Client ID** and **Client secret**
    - **Copy the Client ID** (you'll need this in the next step)
    - You can also find it later in **Clients** > your client name

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

3. Replace `your_actual_client_id_here` with the Client ID you copied from Google Cloud Console

## Step 3: Install Dependencies

If you haven't already, install the required dependencies:

```bash
npm install
```

This will install `@react-oauth/google` which is needed for OAuth functionality.

## Step 4: Test the Authentication

1. Start the development server:

```bash
npm run dev
```

2. Click the **Sign In** button in the header
3. You should see the Google login screen
4. Sign in with your Google account
5. You should be redirected back and see your profile in the header

## Features

- **Google OAuth Login**: Secure authentication using Google accounts
- **User Profile Display**: Shows user name, email, and profile picture
- **Persistent Sessions**: Login state is saved in localStorage
- **Logout Functionality**: Users can log out at any time

## Troubleshooting

### "Invalid Client ID" Error

- Make sure your `.env` file exists and contains the correct Client ID
- Restart the development server after creating/modifying `.env`
- Check that the Client ID doesn't have extra spaces or quotes

### "Redirect URI Mismatch" Error

- Verify that `http://localhost:5173` (or your port) is added to Authorized JavaScript origins
- Make sure the redirect URI in Google Console matches your app's URL exactly

### Login Button Not Working

- Check browser console for errors
- Verify that `@react-oauth/google` is installed: `npm list @react-oauth/google`
- Make sure the GoogleOAuthProvider is properly set up in `main.jsx`

## Production Deployment

When deploying to production:

1. Add your production URL to Google Cloud Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

2. Update your production environment variables with the same Client ID (or create a separate OAuth client for production)

3. Make sure your `.env` file is not committed to version control (it should be in `.gitignore`)

## Security Notes

- Never commit your `.env` file or Client ID to version control
- The Client ID is safe to expose in frontend code (it's public)
- The access token is stored in memory and localStorage (consider using httpOnly cookies for production)
- For production, consider implementing token refresh logic

