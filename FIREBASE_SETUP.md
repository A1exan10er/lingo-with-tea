# Firebase Setup Guide

To connect your project to Firebase, follow these steps:

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** and follow the setup steps.

## 2. Register Your App
1. In your project overview, click the **Web** icon (`</>`) to add a web app.
2. Give it a nickname (e.g., "LingoWithTea").
3. Click **"Register app"**.

## 3. Get Configuration
You will see a `firebaseConfig` object. You need to copy the values to your `.env` file.

Open your `.env` file and add the following (replace the values with yours):

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 4. Enable Authentication
1. Go to **Build** > **Authentication** in the left sidebar.
2. Click **"Get started"**.
3. Select **"Email/Password"** from the Sign-in method tab.
4. Enable **"Email/Password"** and click **"Save"**.

## 5. Enable Firestore Database
1. Go to **Build** > **Firestore Database**.
2. Click **"Create database"**.
3. Choose a location.
4. Start in **Test mode** (for development) or **Production mode** (you'll need to set up rules).
   - *Recommendation for now: Test mode.*

## 6. Restart Application
After updating the `.env` file, restart your development server:
```bash
npm start
```
