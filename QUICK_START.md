# 🚀 Quick Start Guide - Lekha.AI

## ✅ What's Running Now

### Backend (Flask) - ✅ RUNNING
- **URL**: http://127.0.0.1:5000
- **Status**: Active and ready
- **Note**: Database connection shows as disconnected because you're using Firebase instead of MySQL (this is normal)

## 📋 What You Need to Do

### 1. Install Node.js (Required for Frontend)

**Download**: https://nodejs.org/

1. Click the **LTS** (Long Term Support) button
2. Run the installer
3. Follow the installation wizard
4. **Restart your terminal** after installation

**Verify installation**:
```powershell
node --version
npm --version
```

### 2. Install Frontend Dependencies

```powershell
cd agreement-front-end--main
npm install
```

### 3. Start the Frontend

```powershell
npm start
```

Your React app will open at: **http://localhost:3000**

### 4. Enable Firebase Services

1. Go to: https://console.firebase.google.com/
2. Select project: **lekha-ai-backend**
3. Click **Authentication** → **Get Started**
4. Enable **Email/Password** sign-in method
5. Enable **Google** sign-in method (optional)
6. Click **Firestore Database** → **Create database**
7. Choose **Start in test mode**
8. Click **Enable**

## 🎯 Testing Your Application

### Test Backend (Already Running)
```powershell
# Health check
Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/health" -Method GET
```

### Test Frontend (After npm start)
1. Open http://localhost:3000
2. Click "Log In" button
3. Try creating a new account
4. Try logging in
5. Try Google Sign-In

## 🔧 Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend                  │
│      (http://localhost:3000)            │
│                                         │
│  - Firebase Authentication              │
│  - Firebase Firestore Database          │
│  - User Interface                       │
└──────────────┬──────────────────────────┘
               │
               │ API Calls for Analysis
               ▼
┌─────────────────────────────────────────┐
│         Flask Backend                   │
│      (http://127.0.0.1:5000)            │
│                                         │
│  - Document Processing (PDF, DOCX)      │
│  - AI Analysis (Gemini API)             │
│  - Business Logic                       │
└─────────────────────────────────────────┘
```

## 📝 Important Configuration

### Update Backend URL in Frontend

Once both are running, you may need to update the API URL in your frontend code.

The backend is currently configured to accept requests from:
- http://localhost:5000
- http://127.0.0.1:5000

You'll need to add frontend URLs. Update `app.py`:

```python
allowed_origins = [
    "http://localhost:5000", 
    "http://127.0.0.1:5000", 
    "http://192.168.1.17:5000",
    "http://localhost:3000",      # Add this
    "http://127.0.0.1:3000"       # Add this
]
```

### Add Gemini API Key

Update `.env` file with your actual API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

Get it from: https://makersuite.google.com/app/apikey

## 🎉 What You'll Be Able to Do

Once everything is running:

1. ✅ **User Registration**: Create account with email/password
2. ✅ **User Login**: Sign in with credentials
3. ✅ **Google Sign-In**: One-click authentication
4. ✅ **Upload Documents**: PDF, DOCX, or paste text
5. ✅ **AI Analysis**: Get AI-powered analysis of agreements
6. ✅ **Save Results**: Automatically saved to Firebase
7. ✅ **View History**: See all past analyses
8. ✅ **Secure Data**: Each user's data is private

## 🔄 Current Status

| Component | Status | Action Required |
|-----------|--------|-----------------|
| Flask Backend | ✅ Running | None - Ready! |
| Python Packages | ✅ Installed | None |
| Firebase Config | ✅ Complete | Enable services in console |
| React Code | ✅ Updated | None |
| Node.js | ⏳ Pending | Install from nodejs.org |
| npm install | ⏳ Pending | Run after Node.js install |
| Frontend Server | ⏳ Pending | Run `npm start` |

## 🛑 Stopping Servers

### Stop Backend
Press `CTRL+C` in the terminal where Flask is running

### Stop Frontend
Press `CTRL+C` in the terminal where React is running

## 📚 Documentation Files

- `START_APPLICATION.md` - Detailed startup guide
- `FIREBASE_CONNECTION_SUMMARY.md` - Firebase integration summary
- `FIREBASE_INTEGRATION.md` - Integration examples
- `FIREBASE_SETUP_GUIDE.md` - Complete Firebase setup
- `QUICK_START.md` - This file

## 🆘 Need Help?

### Backend Issues
- Check if port 5000 is available
- Verify `.env` file exists
- Check virtual environment is activated

### Frontend Issues
- Ensure Node.js is installed
- Run `npm install` before `npm start`
- Check for error messages in terminal

### Firebase Issues
- Verify services are enabled in console
- Check Firebase configuration in `firebase.js`
- Review security rules in Firestore

---

## 🎯 Your Next Step

**Install Node.js**: https://nodejs.org/

Then run:
```powershell
cd agreement-front-end--main
npm install
npm start
```

**Backend is already running and waiting for you!** ✅
