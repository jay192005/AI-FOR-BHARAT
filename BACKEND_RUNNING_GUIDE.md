# 🚀 Keep Backend Running - Quick Guide

## ⚠️ Common Issue: "Analysis failed: Failed to fetch"

This error means the **backend server is not running** or the frontend can't reach it.

## ✅ Solution: Keep Backend Running

### Check if Backend is Running:

```powershell
# Check if port 5000 is in use
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

If you see output, backend is running ✅  
If empty, backend is NOT running ❌

### Start Backend Server:

```powershell
# Option 1: Regular backend (MySQL - but works with fallback)
python app.py

# Option 2: Firebase backend (recommended if you set up Firebase)
python app_firebase.py
```

You should see:
```
* Running on http://127.0.0.1:5000
* Running on http://10.125.160.65:5000
```

### Keep Backend Running:

**IMPORTANT:** Don't close the terminal where backend is running!

- Backend runs in the terminal
- Closing terminal = backend stops
- Keep terminal open while using the app

### Run Both Servers:

You need **2 terminals**:

**Terminal 1: Backend**
```powershell
python app.py
# Keep this terminal open!
```

**Terminal 2: Frontend**
```powershell
cd agreement-front-end--main
npm start
# Keep this terminal open too!
```

## 🧪 Test Backend is Working:

### Quick Test:

```powershell
# In a NEW terminal (don't close backend terminal!)
curl http://127.0.0.1:5000/api/health
```

Should return JSON with status.

### Full Test:

```powershell
python test_file_upload.py
```

Should show: "✅ FILE UPLOAD SUCCESS!"

## 🔧 Troubleshooting

### Error: "Failed to fetch"

**Cause:** Backend not running  
**Solution:** Start backend with `python app.py`

### Error: "Address already in use"

**Cause:** Backend already running or port 5000 is used  
**Solution:** 
```powershell
# Find what's using port 5000
Get-NetTCPConnection -LocalPort 5000
# Kill the process or use a different port
```

### Error: "Connection refused"

**Cause:** Backend crashed or stopped  
**Solution:** Check backend terminal for errors, restart backend

### Backend Keeps Stopping

**Cause:** Terminal closed or error in code  
**Solution:** 
- Keep terminal open
- Check for Python errors in terminal
- Fix any errors and restart

## 📊 Backend Status Indicators

### Backend Running ✅
- Terminal shows: "Running on http://127.0.0.1:5000"
- Port 5000 is listening
- Frontend can analyze documents
- No "Failed to fetch" errors

### Backend Stopped ❌
- Terminal closed or shows error
- Port 5000 not listening
- Frontend shows "Failed to fetch"
- Can't analyze documents

## 🎯 Best Practices

### During Development:

1. **Start backend first:**
   ```powershell
   python app.py
   ```

2. **Then start frontend:**
   ```powershell
   cd agreement-front-end--main
   npm start
   ```

3. **Keep both terminals open**

4. **Test backend is responding:**
   - Try analyzing a document
   - Check backend terminal for logs

### If Backend Crashes:

1. Check backend terminal for error messages
2. Fix the error
3. Restart backend: `python app.py`
4. Refresh frontend in browser

### If You Need to Restart:

```powershell
# Stop backend: Press Ctrl+C in backend terminal
# Start backend again:
python app.py
```

## 🚀 Production Deployment

For production, use a proper WSGI server:

```powershell
# Install gunicorn (Linux/Mac) or waitress (Windows)
pip install waitress

# Run with waitress
waitress-serve --port=5000 app:app
```

This keeps the server running even if terminal closes.

## 📝 Quick Checklist

Before analyzing documents:

- [ ] Backend terminal is open
- [ ] Backend shows "Running on http://127.0.0.1:5000"
- [ ] Frontend is open at http://localhost:3000
- [ ] No "Failed to fetch" errors
- [ ] Test with demo mode first

## 🔍 Debug Commands

```powershell
# Check if backend is running
Get-NetTCPConnection -LocalPort 5000

# Test backend health
curl http://127.0.0.1:5000/api/health

# Test file upload
python test_file_upload.py

# Check backend logs
# (Look at the terminal where backend is running)
```

## ✨ Current Status

**Backend:** ✅ Running on http://127.0.0.1:5000  
**Frontend:** ✅ Running on http://localhost:3000  
**Gemini API:** ✅ Working (model: gemini-2.5-flash)  
**File Upload:** ✅ Tested and working  

**You can now analyze documents!** 🎉

Just make sure to keep the backend terminal open while using the app.

---

**Remember:** Backend must be running for document analysis to work!
