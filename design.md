# Lekha.ai - Design Document

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │           React Frontend Application                │     │
│  │  - Document Upload UI (All Document Types)         │     │
│  │  - Analysis Progress Display                        │     │
│  │  - Results Visualization                            │     │
│  │  - Firebase Authentication                          │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Flask Backend Server                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │              API Layer (app.py)                     │     │
│  │  - /api/analyze endpoint (Universal)                │     │
│  │  - /api/health endpoint                             │     │
│  │  - File upload handling (All formats)              │     │
│  │  - CORS configuration                               │     │
│  └────────────────────────────────────────────────────┘     │
│                            │                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Analysis Engine (ai.py)                     │     │
│  │  - Rule-based pre-analysis (Universal)             │     │
│  │  - Gemini AI integration                            │     │
│  │  - Document type detection                          │     │
│  │  - JSON parsing & validation                        │     │
│  │  - Fallback response generation                     │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API Call
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini 2.5 Flash API                     │
│  - Natural language processing                               │
│  - Universal document analysis                               │
│  - Risk assessment for any document type                     │
│  - Structured JSON response                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (Optional)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL Database                            │
│  - User analysis history (all document types)                │
│  - Document metadata                                         │
│  - Usage statistics                                          │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Diagram

```
Frontend Components:
├── App.jsx (Main application)
├── Header.jsx (Navigation)
├── Hero.jsx (Landing page)
├── Features.jsx (Feature showcase)
├── HowItWorks.jsx (Process explanation)
├── Resources.jsx (Additional resources)
├── Footer.jsx (Footer section)
├── AuthModal.jsx (Login/Register)
├── UserProfile.jsx (User dashboard)
└── DocumentAnalyzer.jsx (Core analysis UI)
    ├── File Upload Section
    ├── Text Input Section
    ├── State Selection
    ├── Analysis Options
    ├── Progress Display
    └── Results Display

Backend Modules:
├── app.py (Flask application)
├── ai.py (Analysis engine)
│   ├── analyze_text_with_rules()
│   ├── analyze_with_gemini()
│   ├── clean_json_response()
│   ├── repair_multiline_json()
│   ├── ensure_complete_response()
│   └── create_detailed_fallback_response()
└── setup_database.py (Database initialization)
```

---

## 2. Data Flow Design

### 2.1 Document Analysis Flow

```
1. User uploads document or pastes text
   ↓
2. Frontend validates file (type, size)
   ↓
3. FormData created with file/text + metadata
   ↓
4. POST request to /api/analyze
   ↓
5. Backend receives and extracts text
   ↓
6. Rule-based pre-analysis (keyword scan)
   ↓
7. Gemini AI analysis request
   ↓
8. AI processes document and returns JSON
   ↓
9. Backend parses and validates JSON
   ↓
10. Fallback response if parsing fails
   ↓
11. Response sent to frontend
   ↓
12. Frontend displays formatted results
   ↓
13. (Optional) Save to database
```

### 2.2 Authentication Flow

```
1. User clicks "Login" or "Try Demo"
   ↓
2. AuthModal opens
   ↓
3a. Demo Mode:
    - Instant access without credentials
    - Mock user object created
    ↓
3b. Email/Password Login:
    - Firebase authentication
    - User credentials validated
    - Session token generated
    ↓
4. User state updated in React
   ↓
5. DocumentAnalyzer becomes accessible
   ↓
6. User email attached to analysis requests
```

---

## 3. Database Design

### 3.1 Entity-Relationship Diagram

```
┌─────────────────────┐
│       Users         │
├─────────────────────┤
│ id (PK)             │
│ email               │
│ created_at          │
│ last_login          │
└─────────────────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐
│  Analysis_History   │
├─────────────────────┤
│ id (PK)             │
│ user_id (FK)        │
│ document_name       │
│ analysis_date       │
│ risk_score          │
│ risk_category       │
│ red_flags_count     │
│ fair_clauses_count  │
│ state               │
│ full_result (JSON)  │
└─────────────────────┘
```

### 3.2 Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

#### Analysis_History Table
```sql
CREATE TABLE analysis_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    document_name VARCHAR(255),
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    risk_score INT,
    risk_category VARCHAR(50),
    red_flags_count INT,
    fair_clauses_count INT,
    state VARCHAR(100),
    full_result JSON,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_analysis_date (analysis_date)
);
```

---

## 4. API Design

### 4.1 REST API Endpoints

#### POST /api/analyze

**Purpose**: Analyze a lease agreement document

**Request**:
```http
POST /api/analyze HTTP/1.1
Content-Type: multipart/form-data

file: [binary file data]
text: [optional text content]
state: [optional Indian state]
email: [optional user email]
```

**Response** (Success - 200):
```json
{
  "overallScore": 75,
  "ratingScore": 75,
  "colorLabel": "YELLOW",
  "ratingText": "CAUTION",
  "summary": "Comprehensive 15-20 line summary...",
  "shortSummary": "Brief one-sentence summary",
  "aiSummary": "Detailed 15-20 line analysis...",
  "redFlags": [
    {
      "title": "Unfair Termination Clause",
      "issue": "Landlord can terminate lease with only 7 days notice..."
    }
  ],
  "fairClauses": [
    {
      "title": "Refundable Security Deposit",
      "recommendation": "Security deposit is clearly stated as refundable"
    }
  ],
  "recommendations": [
    "Negotiate termination notice period to minimum 30 days",
    "Request reduction of security deposit to legal maximum"
  ],
  "redFlagsCount": 5,
  "fairClausesCount": 4
}
```

**Response** (Error - 400/500):
```json
{
  "error": "Error message describing the issue"
}
```

#### GET /api/health

**Purpose**: Check server health status

**Response** (200):
```json
{
  "status": "ok",
  "timestamp": "2026-02-11T10:30:00Z"
}
```

---

## 5. AI Analysis Design

### 5.1 Two-Stage Analysis Process

#### Stage 1: Rule-Based Pre-Analysis

**Purpose**: Quick keyword-based risk detection

**Implementation**:
```python
DANGER_KEYWORDS = {
    "waive your rights": 95,
    "landlord is not responsible for any injury": 90,
    "access the property without notice": 85,
    "tenant is responsible for all repairs": 80,
    "confess judgment": 98,
    "security deposit is non-refundable": 88,
    "automatic renewal": 70,
    "rent increases may occur": 65,
    "at the landlord's sole discretion": 60,
    "as-is condition": 55,
    "late fees of more than 5%": 68,
    "no pets": 20,
    "no alterations or improvements": 25,
    "subletting requires prior consent": 15
}
```

**Output**:
- List of found dangerous phrases
- Preliminary risk score
- Issue count

#### Stage 2: Gemini AI Analysis

**Purpose**: Deep semantic analysis with legal context

**Model Configuration**:
```python
generation_config = {
    "temperature": 0.7,      # Balanced creativity/consistency
    "top_p": 0.95,           # Nucleus sampling
    "top_k": 40,             # Top-k sampling
    "max_output_tokens": 2048 # Sufficient for detailed analysis
}

model = genai.GenerativeModel(
    'gemini-2.5-flash',
    generation_config=generation_config
)
```

**Prompt Engineering**:
```
You are Kiro, a Legal Risk Auditor. Analyze this lease agreement thoroughly.

RATING: 0-20=CRITICAL, 21-45=DANGEROUS, 46-70=RISKY, 71-85=CAUTION, 86-100=STABLE

Location: {state}, India.

Return ONLY this JSON format (no markdown):
{
  "overallScore": 75,
  "colorLabel": "YELLOW",
  "summary": "Comprehensive 15-20 line summary...",
  "redFlags": [...],
  "fairClauses": [...],
  "recommendations": [...]
}

Document: {text}
```

### 5.2 Risk Scoring Algorithm

**Formula**:
```
Base Score = 100

For each high-risk term found:
  Score -= 15 points

For each medium-risk term found:
  Score -= 8 points

For each positive term found:
  Score += 10 points

Final Score = max(10, min(90, Score))
```

**Risk Categories**:
| Score Range | Category | Color | Label |
|-------------|----------|-------|-------|
| 0-20 | Critical | Dark Red | CRITICAL |
| 21-45 | Dangerous | Red | DANGEROUS |
| 46-70 | Risky | Orange | RISKY |
| 71-85 | Caution | Yellow | CAUTION |
| 86-100 | Stable | Green | STABLE |

### 5.3 JSON Parsing Strategy

**Three-Level Fallback System**:

1. **Direct Parse**: Attempt standard JSON parsing
2. **Advanced Repair**: Fix multiline strings, trailing commas
3. **Fallback Response**: Generate comprehensive default response

**Repair Functions**:
- `clean_json_response()`: Remove markdown, extract JSON
- `repair_multiline_json()`: Fix broken multiline strings
- `ensure_complete_response()`: Validate all required fields
- `create_detailed_fallback_response()`: Generate default analysis

---

## 6. Frontend Design

### 6.1 Component Architecture

#### DocumentAnalyzer Component

**State Management**:
```javascript
const [dragActive, setDragActive] = useState(false);
const [uploadedFile, setUploadedFile] = useState(null);
const [textInput, setTextInput] = useState('');
const [uploadMethod, setUploadMethod] = useState('file');
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisProgress, setAnalysisProgress] = useState(0);
const [analysisResult, setAnalysisResult] = useState(null);
const [selectedState, setSelectedState] = useState('');
```

**Key Functions**:
- `handleDrag()`: Drag-and-drop event handling
- `handleDrop()`: File drop processing
- `handleFile()`: File validation
- `startAnalysis()`: Initiate analysis request
- `removeFile()`: Clear uploaded file

**UI Sections**:
1. State Selection Dropdown
2. Upload Method Toggle (File/Text)
3. File Upload Area (Drag & Drop)
4. Text Input Area
5. Analysis Options Checkboxes
6. Progress Display
7. Results Display

### 6.2 Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Layout Strategy**:
- Flexbox for component arrangement
- CSS Grid for results display
- Modal overlay for analyzer
- Responsive typography scaling

### 6.3 Color Scheme

**Primary Colors**:
- Primary Blue: `#007bff`
- Success Green: `#28a745`
- Warning Yellow: `#ffc107`
- Danger Red: `#dc3545`
- Dark Red: `#8b0000`

**Neutral Colors**:
- Background: `#f8f9fa`
- White: `#ffffff`
- Light Gray: `#e0e0e0`
- Dark Gray: `#333333`
- Text: `#212529`

**Risk Colors**:
- Critical: `#8b0000` (Dark Red)
- Dangerous: `#dc3545` (Red)
- Risky: `#ff6b6b` (Orange-Red)
- Caution: `#ffc107` (Yellow)
- Stable: `#28a745` (Green)

---

## 7. Security Design

### 7.1 Authentication Security

**Firebase Authentication**:
- Email/password authentication
- Session token management
- Secure token storage
- Automatic token refresh

**Demo Mode Security**:
- No persistent data storage
- Limited functionality access
- Session-only user state
- No sensitive operations

### 7.2 API Security

**Input Validation**:
- File type whitelist
- File size limits (10MB)
- Text length validation
- State parameter validation

**CORS Configuration**:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:5000"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
```

**Environment Variables**:
- API keys stored in `.env`
- Never committed to version control
- Validated on application startup
- Stripped of quotes/whitespace

### 7.3 Data Security

**File Handling**:
- Files processed in memory
- No permanent storage
- Automatic cleanup after analysis
- Secure file type validation

**Database Security** (when enabled):
- Parameterized queries (SQL injection prevention)
- User data encryption
- Access control
- Regular backups

---

## 8. Error Handling Design

### 8.1 Error Categories

**Client Errors (400-499)**:
- Invalid file type
- File size exceeded
- Missing required parameters
- Invalid state parameter

**Server Errors (500-599)**:
- API key issues
- Gemini API failures
- Database connection errors
- JSON parsing failures

### 8.2 Error Response Format

```json
{
  "error": "User-friendly error message",
  "code": "ERROR_CODE",
  "details": "Technical details for debugging"
}
```

### 8.3 Fallback Mechanisms

**AI Analysis Fallback**:
1. Primary: Gemini AI analysis
2. Secondary: Rule-based analysis
3. Tertiary: Default comprehensive response

**Database Fallback**:
1. Primary: MySQL database
2. Secondary: In-memory storage
3. Tertiary: No storage (analysis only)

---

## 9. Performance Optimization

### 9.1 Backend Optimization

**Caching Strategy**:
- API response caching (future)
- Static file caching
- Database query optimization

**Request Optimization**:
- Async processing for long operations
- Request timeout handling (10s)
- Connection pooling

**Resource Management**:
- Memory-efficient file processing
- Garbage collection optimization
- Connection cleanup

### 9.2 Frontend Optimization

**Code Splitting**:
- Lazy loading components
- Dynamic imports
- Route-based splitting

**Asset Optimization**:
- Image compression
- Minified JavaScript/CSS
- Gzip compression

**Rendering Optimization**:
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Virtual scrolling for long lists

### 9.3 Network Optimization

**Request Optimization**:
- FormData for efficient file upload
- Progress tracking
- Request cancellation
- Retry logic

**Response Optimization**:
- JSON compression
- Minimal response payload
- Streaming for large responses

---

## 10. Testing Strategy

### 10.1 Unit Testing

**Backend Tests**:
```python
# test_ai.py
def test_analyze_text_with_rules():
    text = "security deposit is non-refundable"
    result = analyze_text_with_rules(text)
    assert result['preliminary_score'] == 88

def test_clean_json_response():
    json_text = '```json\n{"score": 75}\n```'
    result = clean_json_response(json_text)
    assert result['score'] == 75
```

**Frontend Tests**:
```javascript
// DocumentAnalyzer.test.jsx
test('validates file size', () => {
  const largeFile = new File(['x'.repeat(11*1024*1024)], 'large.pdf');
  const result = handleFile(largeFile);
  expect(result).toBe(false);
});

test('displays analysis results', () => {
  const result = { ratingScore: 75, ratingText: 'CAUTION' };
  render(<DocumentAnalyzer analysisResult={result} />);
  expect(screen.getByText('CAUTION')).toBeInTheDocument();
});
```

### 10.2 Integration Testing

**API Tests**:
```python
def test_analyze_endpoint():
    with open('test_lease.pdf', 'rb') as f:
        response = client.post('/api/analyze', data={'file': f})
    assert response.status_code == 200
    assert 'overallScore' in response.json
```

### 10.3 End-to-End Testing

**User Workflows**:
1. Upload document → Analyze → View results
2. Paste text → Select state → Analyze → View results
3. Demo login → Upload → Analyze → Logout
4. Error handling → Invalid file → Error message

---

## 11. Deployment Design

### 11.1 Development Environment

**Setup**:
```bash
# Backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py

# Frontend
cd agreement-front-end--main
npm install
npm start
```

**Configuration**:
- `.env` for environment variables
- `config.py` for application settings
- `firebase.js` for Firebase config

### 11.2 Production Environment

**Deployment Platforms**:
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify
- **Database**: Aiven, PlanetScale, AWS RDS

**Environment Variables**:
```bash
GEMINI_API_KEY=production_key
FLASK_ENV=production
DEBUG=False
DATABASE_URL=production_db_url
ALLOWED_ORIGINS=https://lekha.ai
```

**Build Process**:
```bash
# Frontend build
npm run build

# Backend deployment
gunicorn app:app --bind 0.0.0.0:$PORT
```

### 11.3 Monitoring & Logging

**Logging Strategy**:
- Application logs (Flask)
- Error logs (exceptions)
- Access logs (requests)
- Performance logs (timing)

**Monitoring Tools**:
- Server health checks
- API response times
- Error rate tracking
- User analytics

---

## 12. Future Enhancements

### 12.1 Planned Features

**Phase 2**:
- PDF report generation
- Email notifications
- Analysis history dashboard
- Document comparison

**Phase 3**:
- Multi-language support
- Mobile applications
- Advanced analytics
- Legal consultation integration

**Phase 4**:
- Machine learning model training
- Custom risk profiles
- Automated clause suggestions
- Blockchain verification

### 12.2 Scalability Considerations

**Horizontal Scaling**:
- Load balancer configuration
- Multiple backend instances
- Database replication
- CDN for static assets

**Vertical Scaling**:
- Increased server resources
- Database optimization
- Caching layers
- Queue systems for async processing

---

## Document Control

**Version**: 1.0  
**Last Updated**: February 11, 2026  
**Author**: Lekha.ai Development Team  
**Status**: Approved  
**Next Review**: March 2026

---

## Appendix

### A. Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | React | 18+ | UI framework |
| Frontend | Firebase | 9+ | Authentication |
| Backend | Flask | 2.3+ | Web framework |
| Backend | Python | 3.8+ | Programming language |
| AI | Google Gemini | 2.5 Flash | Document analysis |
| Database | MySQL | 8.0+ | Data storage |
| Deployment | Vercel/Heroku | - | Hosting |

### B. File Structure

```
lekha.ai/
├── agreement-front-end--main/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   └── ...
│   ├── package.json
│   └── build/
├── backend_package/
│   ├── ai.py
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── databases/
│   ├── analysis_history.sql
│   └── data.sql
├── .env.example
├── .gitignore
├── README.md
├── requirements.md
├── design.md
└── ...
```