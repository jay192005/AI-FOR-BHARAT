# 🚀 How to Use Your Application

## ✅ Backend is Running!
```
URL: http://127.0.0.1:5000
Status: 🟢 ACTIVE
```

## 📂 Frontend Files Location
```
D:\lekha.ai\agreement-front-end--main\
```

## 🌐 How to Access

### Method 1: Direct File Access (Recommended)
Simply double-click these files:

1. **Landing Page**
   ```
   D:\lekha.ai\agreement-front-end--main\index.html
   ```

2. **Analyzer Page** (Main Feature)
   ```
   D:\lekha.ai\agreement-front-end--main\analyzer.html
   ```

3. **History Page**
   ```
   D:\lekha.ai\agreement-front-end--main\history.html
   ```

### Method 2: Through Flask Server
Open in browser:

1. **Landing Page**
   ```
   http://127.0.0.1:5000/index.html
   ```

2. **Analyzer Page**
   ```
   http://127.0.0.1:5000/analyzer.html
   ```

3. **History Page**
   ```
   http://127.0.0.1:5000/history.html
   ```

## 🎯 Quick Test Steps

### Test the Analyzer (Main Feature)

1. **Open Analyzer**
   - Double-click: `D:\lekha.ai\agreement-front-end--main\analyzer.html`
   - Or visit: `http://127.0.0.1:5000/analyzer.html`

2. **Upload a Document**
   - Click "Choose File" or drag & drop
   - Supported formats: PDF, DOCX, TXT
   - Or paste text directly

3. **Select State**
   - Choose your state from dropdown
   - Example: Maharashtra, Delhi, etc.

4. **Analyze**
   - Click "Analyze Document"
   - Wait for AI analysis
   - View results with red flags and recommendations

### Test Authentication (Optional)

1. **Open Landing Page**
   - Double-click: `D:\lekha.ai\agreement-front-end--main\index.html`

2. **Register**
   - Click "Log In" button
   - Click "Sign Up"
   - Enter email and password
   - Click "Create Account"

3. **Login**
   - Enter credentials
   - Click "Login"

## 🔧 Files Being Used

### Analyzer Files (Main Feature)
- ✅ `analyzer.html` - Document upload interface
- ✅ `analyzer.css` - Styling for analyzer
- ✅ `analyzer.js` - Logic and API calls (✅ Connected to backend)

### Landing Page Files
- ✅ `index.html` - Home page
- ✅ `style.css` - Home page styling
- ✅ `script.js` - Authentication logic (✅ Connected to backend)

### History Page Files
- ✅ `history.html` - Analysis history
- ✅ `history.js` - History logic

## 🔗 API Connection Status

### Backend API: ✅ CONNECTED
```javascript
// analyzer.js (Line 6)
const API_BASE_URL = 'http://127.0.0.1:5000';
```

### Available Endpoints:
- ✅ `POST /api/analyze` - Document analysis
- ✅ `POST /api/register` - User registration
- ✅ `POST /api/login` - User login
- ✅ `GET /api/history/<email>` - Get history
- ✅ `GET /api/health` - Health check

## 🧪 Test the Connection

### Test 1: Health Check
Open in browser:
```
http://127.0.0.1:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "disconnected",
  "error": "Could not establish database connection"
}
```
(Database disconnected is normal if using Firebase)

### Test 2: Open Analyzer
```
http://127.0.0.1:5000/analyzer.html
```

You should see:
- Document upload area
- State dropdown
- Analyze button

### Test 3: Upload and Analyze
1. Upload a sample document
2. Select a state
3. Click "Analyze Document"
4. Check browser console (F12) for API calls

## 📊 What Happens When You Analyze

```
1. User uploads document
   ↓
2. analyzer.js sends to backend
   ↓
3. Flask backend (app.py)
   ↓
4. AI analysis (ai.py + Gemini API)
   ↓
5. Results returned to frontend
   ↓
6. analyzer.js displays results
```

## 🎨 Analyzer Features

### Upload Options
- 📄 Upload PDF file
- 📄 Upload DOCX file
- 📝 Paste text directly

### Analysis Results
- 📊 Overall rating (0-100)
- 🚩 Red flags with priority
- ✅ Fair clauses
- 💡 AI recommendations
- 📋 Next steps

### State-Specific Analysis
- Different rules for each state
- Customized recommendations
- Local law compliance

## ⚙️ Configuration

### Backend Configuration (app.py)
```python
# Serves files from agreement-front-end--main folder
app = Flask(__name__, 
            static_folder='agreement-front-end--main',
            static_url_path='')
```

### Frontend Configuration (analyzer.js)
```javascript
// Points to local Flask backend
const API_BASE_URL = 'http://127.0.0.1:5000';
```

## 🔥 No Node.js Required!

Since you're using plain HTML/CSS/JS:
- ✅ No installation needed
- ✅ No build process
- ✅ No npm commands
- ✅ Just open and use!

## 🛑 Troubleshooting

### Issue: "Could not connect to server"
**Solution**: Make sure Flask backend is running
```powershell
cd D:\lekha.ai
.\venv\Scripts\Activate.ps1
python app.py
```

### Issue: "CORS error"
**Solution**: Backend already configured for CORS
Check that you're accessing from:
- `file:///` (local file)
- `http://127.0.0.1:5000`
- `http://localhost:5000`

### Issue: "Analysis failed"
**Solution**: Check if Gemini API key is set in `.env` file
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Issue: Page not loading
**Solution**: 
1. Check backend is running
2. Try direct file access instead of Flask URL
3. Check browser console (F12) for errors

## 📝 Quick Commands

### Start Backend
```powershell
cd D:\lekha.ai
.\venv\Scripts\Activate.ps1
python app.py
```

### Open Analyzer
```powershell
start D:\lekha.ai\agreement-front-end--main\analyzer.html
```

### Stop Backend
Press `CTRL+C` in the terminal

## ✅ Summary

**Status**: 🟢 FULLY CONNECTED AND READY

**Backend**: Running on http://127.0.0.1:5000

**Frontend**: Located in `agreement-front-end--main/`

**Main Files**:
- ✅ analyzer.html
- ✅ analyzer.css
- ✅ analyzer.js (Connected to backend)

**How to Use**:
1. Backend is running ✅
2. Open `analyzer.html` in browser
3. Upload document and analyze!

---

**Next Step**: Double-click `D:\lekha.ai\agreement-front-end--main\analyzer.html` to start!
