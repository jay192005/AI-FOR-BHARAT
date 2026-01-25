# 🔥 Firebase Database - Quick Start Guide

## ✅ What's Done

- ✅ Frontend Firebase packages installed (`firebase`)
- ✅ Backend Firebase Admin SDK installed (`firebase-admin`)
- ✅ Firebase config updated in `agreement-front-end--main/src/firebase.js`
- ✅ `.gitignore` updated to protect service account key

## ⚠️ What You Need To Do

### Step 1: Download Firebase Service Account Key (REQUIRED)

1. **Go to Firebase Console:**
   ```
   https://console.firebase.google.com/
   ```

2. **Select your project:** `kiro-ai-backend`

3. **Navigate to Settings:**
   - Click the ⚙️ gear icon next to "Project Overview"
   - Click "Project settings"

4. **Go to Service Accounts:**
   - Click "Service accounts" tab
   - You'll see "Firebase Admin SDK" section

5. **Generate Key:**
   - Click "Generate new private key" button
   - Click "Generate key" in confirmation dialog
   - A JSON file will download

6. **Save the File:**
   - Rename it to: `firebase-service-account.json`
   - Place it in: `D:\lekha.ai\firebase-service-account.json`
   - ⚠️ **NEVER commit this file to git!** (already in .gitignore)

### Step 2: Enable Firebase Services

#### Enable Firestore Database:
1. Go to: https://console.firebase.google.com/project/kiro-ai-backend/firestore
2. Click "Create database"
3. Choose "Start in **test mode**" (for development)
4. Select location: `us-central` (or closest to you)
5. Click "Enable"

#### Enable Authentication:
1. Go to: https://console.firebase.google.com/project/kiro-ai-backend/authentication
2. Click "Get started"
3. Click "Sign-in method" tab
4. Click "Email/Password"
5. Enable the toggle
6. Click "Save"

### Step 3: Start Firebase Backend

1. **Stop current backend** (if running):
   - Press `Ctrl+C` in the terminal where backend is running

2. **Start Firebase backend:**
   ```powershell
   python app_firebase.py
   ```

3. **Look for success messages:**
   ```
   ✅ Firebase initialized with service account
   ✅ Firestore client initialized
   * Running on http://127.0.0.1:5000
   ```

### Step 4: Test Your Application

1. **Open browser:** `http://localhost:3000`

2. **Try Demo Mode first:**
   - Click "Login" button
   - Click "🎯 Try Demo Mode"
   - Test document analysis

3. **Try Registration:**
   - Click "Sign Up"
   - Enter email and password
   - Create account (will be saved to Firebase!)

4. **Try Login:**
   - Login with your registered account
   - Your analysis history will be saved

## 🎯 What Firebase Gives You

### With Firebase Connected:

✅ **User Registration** - Create accounts that persist  
✅ **User Login** - Secure authentication  
✅ **Analysis History** - Save and view past analyses  
✅ **Data Persistence** - Data survives server restarts  
✅ **Cloud Storage** - No local database needed  
✅ **Scalability** - Ready for production deployment  

### Without Firebase (Current Demo Mode):

✅ **Document Analysis** - Still works!  
✅ **AI-powered insights** - Still works!  
❌ **User accounts** - Not saved  
❌ **Analysis history** - Not saved  
❌ **Data persistence** - Lost on refresh  

## 📁 Project Structure

```
D:\lekha.ai\
├── firebase-service-account.json  ← YOU NEED TO ADD THIS
├── app_firebase.py                ← Firebase backend (use this)
├── app.py                         ← MySQL backend (old)
├── agreement-front-end--main/
│   └── src/
│       └── firebase.js            ← ✅ Already configured
└── .env                           ← ✅ Already has Gemini API key
```

## 🔧 Troubleshooting

### Error: "Firebase initialization failed"
- Make sure `firebase-service-account.json` exists in project root
- Check file is valid JSON (not corrupted)

### Error: "Firestore client initialization failed"
- Enable Firestore Database in Firebase Console
- Check internet connection

### Error: "Permission denied"
- Update Firestore security rules to "test mode"
- Or add proper security rules

### Backend still using MySQL
- Make sure you're running `python app_firebase.py` (not `app.py`)
- Check terminal output for Firebase success messages

## 📚 Additional Resources

- **Detailed Instructions:** `FIREBASE_SETUP_INSTRUCTIONS.md`
- **Firebase Console:** https://console.firebase.google.com/
- **Firebase Docs:** https://firebase.google.com/docs

## 🚀 Quick Commands

```powershell
# Install packages (already done)
./setup_firebase.ps1

# Start Firebase backend
python app_firebase.py

# Start frontend (in another terminal)
cd agreement-front-end--main
npm start
```

---

**Current Status:** Firebase packages installed, waiting for service account key.

**Next Action:** Download `firebase-service-account.json` from Firebase Console.
