# Lekha.ai - AI-Powered Term And Public Document Analyzer

🏠 **Smart Lease Analysis for Tenants** - Protect yourself from unfair rental agreements with AI-powered legal analysis.

## 🌟 Features

- **AI-Powered Analysis**: Uses Google Gemini 2.5 Flash for comprehensive lease document analysis
- **Risk Assessment**: 20-point risk scoring system (0-100 scale)
- **Red Flag Detection**: Identifies potentially unfair or illegal clauses
- **Legal Compliance**: Checks against local tenant protection laws
- **Multi-Format Support**: PDF, DOC, DOCX, TXT, RTF, JPG, PNG files
- **State-Specific Analysis**: Tailored analysis for different Indian states
- **Demo Mode**: Try the system without registration
- **Real-time Analysis**: Fast processing with progress tracking

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 14+
- Google Gemini API Key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay192005/build_and_grow_hackethon_agreement_checker.git
   cd build_and_grow_hackethon_agreement_checker
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY="your_api_key_here"
   USE_LOCAL_DB_FALLBACK=true
   ```

4. **Start the backend server**
   ```bash
   python app.py
   ```
   
   Server will run on `http://127.0.0.1:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd agreement-front-end--main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the React app**
   ```bash
   npm run build
   ```

4. **Access the application**
   Open `http://127.0.0.1:5000` in your browser

## 🎯 Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: `demo@lekha.ai`
- **Password**: `demo123`

Or click "Try Demo Mode" for instant access.

## 📊 Analysis Features

### Risk Assessment Scale
- **0-20**: 🔴 CRITICAL - Extremely unfair terms
- **21-45**: 🟠 DANGEROUS - High risk clauses
- **46-70**: 🟡 RISKY - Moderate concerns
- **71-85**: 🟡 CAUTION - Minor issues
- **86-100**: 🟢 STABLE - Fair agreement

### What We Analyze
- Security deposit terms
- Rent increase clauses
- Termination procedures
- Maintenance responsibilities
- Privacy rights
- Legal compliance
- Missing tenant protections

## 🛠️ Technology Stack

### Backend
- **Flask** - Python web framework
- **Google Gemini 2.5 Flash** - AI analysis engine
- **MySQL** - Database (optional)
- **Python-dotenv** - Environment management

### Frontend
- **React** - User interface
- **Firebase** - Authentication
- **CSS3** - Styling
- **JavaScript ES6+** - Frontend logic

## 📁 Project Structure

```
├── ai.py                           # Main AI analysis module
├── app.py                          # Flask backend server
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment template
├── agreement-front-end--main/      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── DocumentAnalyzer.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   └── ...
│   │   ├── config/
│   │   └── ...
│   ├── package.json
│   └── build/
├── backend_package/                # Backup backend files
├── databases/                      # Database schemas
└── docs/                          # Documentation
```

## 🔧 Configuration

### Environment Variables

```bash
# API Keys
GEMINI_API_KEY="your_gemini_api_key"

# Database (Optional)
USE_LOCAL_DB_FALLBACK=true
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rent_agreements_db

# Flask
FLASK_ENV=development
DEBUG=True
SECRET_KEY=your_secret_key
```

### Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

## 🚨 Important Notes

- **Database Connection**: The "Database connection failed" message is normal when `USE_LOCAL_DB_FALLBACK=true`
- **Demo Mode**: All analysis features work without database connection
- **File Limits**: Maximum file size is 10MB
- **Supported Formats**: PDF, DOC, DOCX, TXT, RTF, JPG, PNG

## 🧪 Testing

### Test the API Key
```bash
python check_api_key.py
```

### Test Analysis
```bash
python test_analysis.py
```

### Run Backend Tests
```bash
python test_backend_api.py
```

## 🔄 Development Workflow

1. **Start Backend**: `python app.py`
2. **Start Frontend Dev Server**: `cd agreement-front-end--main && npm start`
3. **Build for Production**: `npm run build`
4. **Test Changes**: Use demo credentials or upload test documents

## 📈 Performance

- **Analysis Time**: 3-5 seconds average
- **Success Rate**: 95%+ JSON parsing success
- **Supported Languages**: English (lease documents)
- **Concurrent Users**: Handles multiple simultaneous analyses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues:

1. Check the console logs
2. Verify your Gemini API key
3. Ensure all dependencies are installed
4. Check the GitHub issues page

## 🏆 Hackathon Project

This project was developed for the Build & Grow Hackathon, focusing on AI-powered legal document analysis to help tenants make informed decisions about rental agreements.

---

**Made with ❤️ for safer renting experiences**
