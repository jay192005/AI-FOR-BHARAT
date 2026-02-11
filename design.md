# Lekha.ai - AI-Powered Public Document & Terms Analyzer
## Hackathon Idea Submission - Design Document

---

## 🎨 Executive Design Overview

**Project**: Lekha.ai - AI for Bharat Public Document Analyzer  
**Stage**: Hackathon Idea Submission  
**Purpose**: Technical design and architecture proposal for MVP development

This document outlines the proposed system architecture, technology choices, and implementation strategy for building an AI-powered platform that democratizes legal document understanding for all Indians.

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture (Proposed)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │  Mobile App  │  │   API Users  │          │
│  │   (React)    │  │   (Future)   │  │   (Future)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Flask Backend Server                         │   │
│  │  ┌────────────────┐  ┌────────────────┐                 │   │
│  │  │  API Gateway   │  │  Auth Service  │                 │   │
│  │  └────────────────┘  └────────────────┘                 │   │
│  │  ┌────────────────┐  ┌────────────────┐                 │   │
│  │  │ File Processor │  │  Analysis API  │                 │   │
│  │  └────────────────┘  └────────────────┘                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI/ML LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Google Gemini 2.5 Flash API                     │   │
│  │  - Document Understanding                                 │   │
│  │  - Risk Assessment                                        │   │
│  │  - Legal Analysis                                         │   │
│  │  - Plain Language Generation                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Rule-Based Analysis Engine                      │   │
│  │  - Keyword Detection                                      │   │
│  │  - Pattern Matching                                       │   │
│  │  - Quick Risk Scoring                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ (Optional - Future)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              MySQL/PostgreSQL Database                    │   │
│  │  - User Accounts                                          │   │
│  │  - Analysis History                                       │   │
│  │  - Usage Analytics                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack (Proposed)

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Frontend** | React 18+ | Modern, component-based, large ecosystem |
| **Backend** | Python Flask | Lightweight, easy to deploy, AI-friendly |
| **AI Engine** | Google Gemini 2.5 Flash | Latest model, fast, cost-effective |
| **Authentication** | Firebase Auth | Quick setup, secure, scalable |
| **Database** | MySQL (optional) | Reliable, well-documented, free tier |
| **Hosting** | Vercel (Frontend) + Heroku (Backend) | Free tiers, easy deployment |
| **File Storage** | In-memory (MVP) | No storage costs, privacy-first |

---

## 2. Core Components Design

### 2.1 Document Upload & Processing Module

**Purpose**: Handle file uploads and extract text for analysis

**Components**:
```
DocumentUploadModule
├── FileValidator
│   ├── Check file type (PDF, DOC, TXT, images)
│   ├── Validate file size (<10MB)
│   └── Sanitize file name
├── TextExtractor
│   ├── PDF text extraction (PyPDF2/pdfplumber)
│   ├── DOC/DOCX extraction (python-docx)
│   ├── Image OCR (Tesseract/Google Vision API)
│   └── Plain text handling
└── PreProcessor
    ├── Clean extracted text
    ├── Remove formatting artifacts
    └── Normalize whitespace
```

**Key Features**:
- Drag-and-drop interface
- Multiple file format support
- Real-time validation feedback
- Progress indicators
- Error handling with user-friendly messages

**Technical Approach**:
```python
# Pseudocode for file processing
def process_uploaded_file(file):
    # Validate
    if not validate_file(file):
        return error_response("Invalid file type or size")
    
    # Extract text
    text = extract_text(file)
    
    # Clean and normalize
    cleaned_text = preprocess_text(text)
    
    return cleaned_text
```

### 2.2 AI Analysis Engine

**Purpose**: Analyze documents using two-stage approach

**Stage 1: Rule-Based Analysis** (Instant - <1 second)
```
RuleBasedEngine
├── KeywordDictionary
│   ├── High-risk terms (95-98 severity)
│   ├── Medium-risk terms (60-75 severity)
│   └── Low-risk terms (15-30 severity)
├── PatternMatcher
│   ├── Regex patterns for common clauses
│   ├── Phrase detection
│   └── Context analysis
└── QuickScorer
    ├── Calculate preliminary risk score
    ├── Identify obvious red flags
    └── Generate initial insights
```

**Stage 2: AI Semantic Analysis** (3-10 seconds)
```
AIAnalysisEngine
├── PromptGenerator
│   ├── Create context-aware prompts
│   ├── Include document type hints
│   └── Add Indian legal context
├── GeminiIntegration
│   ├── API call with optimized config
│   ├── JSON mode for structured output
│   └── Timeout and retry handling
├── ResponseParser
│   ├── Parse JSON response
│   ├── Validate required fields
│   └── Handle malformed responses
└── FallbackMechanism
    ├── Use rule-based results if AI fails
    ├── Generate default comprehensive response
    └── Log errors for improvement
```

**AI Prompt Strategy**:
```
System Role: "You are Kiro, a Legal Document Auditor specializing in Indian law"

Context: "Analyze this [document_type] for an Indian user"

Instructions:
- Identify unfair terms
- Check legal compliance
- Explain in simple language
- Provide actionable recommendations

Output Format: Structured JSON with:
- overallScore (0-100)
- riskCategory (CRITICAL/DANGEROUS/RISKY/CAUTION/STABLE)
- summary (15-20 lines in simple language)
- redFlags (array of issues with titles and descriptions)
- fairClauses (array of positive aspects)
- recommendations (array of actionable advice)
```

### 2.3 Risk Assessment Module

**Purpose**: Calculate and categorize document risk

**Risk Scoring Algorithm**:
```
Base Score = 100

For each high-risk term found:
    Score -= 15 points

For each medium-risk term found:
    Score -= 8 points

For each positive term found:
    Score += 10 points

AI Adjustment:
    Score = (Score * 0.6) + (AI_Score * 0.4)

Final Score = max(0, min(100, Score))
```

**Risk Categories**:
| Score Range | Category | Color | User Action |
|-------------|----------|-------|-------------|
| 0-20 | CRITICAL | Dark Red | Do not sign, seek legal help |
| 21-45 | DANGEROUS | Red | Major concerns, negotiate heavily |
| 46-70 | RISKY | Orange | Review carefully, negotiate |
| 71-85 | CAUTION | Yellow | Minor issues, clarify terms |
| 86-100 | STABLE | Green | Generally fair, proceed with confidence |

### 2.4 Results Presentation Module

**Purpose**: Display analysis in user-friendly format

**Components**:
```
ResultsDisplay
├── RiskScoreCard
│   ├── Numerical score (75/100)
│   ├── Color-coded indicator
│   ├── Risk category label
│   └── Visual progress bar
├── SummarySection
│   ├── Plain language overview (15-20 lines)
│   ├── Key findings highlight
│   └── Overall recommendation
├── RedFlagsSection
│   ├── List of concerning clauses
│   ├── Severity indicators
│   ├── Explanation for each
│   └── Recommended actions
├── FairClausesSection
│   ├── Positive aspects
│   ├── Balanced terms
│   └── Legal protections present
└── RecommendationsSection
    ├── Actionable advice (8+ items)
    ├── Negotiation strategies
    ├── Legal compliance checks
    └── Next steps
```

**Visual Design Principles**:
- Color-coding for quick understanding
- Icons for visual clarity
- Expandable sections for details
- Mobile-responsive layout
- Print-friendly format (future)

---

## 3. Data Flow Design

### 3.1 Complete Analysis Flow

```
1. User uploads document
   ↓
2. Frontend validates file (type, size)
   ↓
3. File sent to backend via POST /api/analyze
   ↓
4. Backend extracts text from document
   ↓
5. Rule-based analysis (Stage 1) - Instant
   ├── Keyword scanning
   ├── Pattern matching
   └── Preliminary score
   ↓
6. AI analysis (Stage 2) - 3-10 seconds
   ├── Generate context-aware prompt
   ├── Call Gemini API
   ├── Parse JSON response
   └── Validate and enrich data
   ↓
7. Combine results from both stages
   ↓
8. Generate final analysis report
   ↓
9. Return JSON response to frontend
   ↓
10. Frontend displays formatted results
   ↓
11. (Optional) Save to database if user logged in
```

### 3.2 Error Handling Flow

```
Error Occurs
   ↓
Identify Error Type
   ├── File Upload Error
   │   └── Show user-friendly message
   ├── Text Extraction Error
   │   └── Suggest alternative format
   ├── AI API Error
   │   ├── Retry once
   │   └── Fall back to rule-based only
   ├── Timeout Error
   │   └── Suggest shorter document
   └── Unknown Error
       └── Log for debugging, show generic message
```

---

## 4. API Design

### 4.1 Core Endpoints (MVP)

#### POST /api/analyze
**Purpose**: Analyze uploaded document

**Request**:
```http
POST /api/analyze
Content-Type: multipart/form-data

file: [binary file data]
OR
text: [plain text content]

Optional:
state: [Indian state for context]
email: [user email if logged in]
```

**Response** (Success - 200):
```json
{
  "success": true,
  "analysis": {
    "overallScore": 75,
    "riskCategory": "CAUTION",
    "colorLabel": "YELLOW",
    "summary": "This document shows moderate risk...",
    "redFlags": [
      {
        "title": "Automatic Renewal Clause",
        "issue": "Service auto-renews without clear notification",
        "severity": "medium"
      }
    ],
    "fairClauses": [
      {
        "title": "Clear Payment Terms",
        "description": "Payment amount and schedule clearly specified"
      }
    ],
    "recommendations": [
      "Review cancellation policy carefully",
      "Set calendar reminder before renewal date"
    ],
    "processingTime": 4.2,
    "documentType": "terms_and_conditions"
  }
}
```

**Response** (Error - 400/500):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "Please upload a PDF, DOC, or image file",
    "details": "Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG"
  }
}
```

#### GET /api/health
**Purpose**: Check server status

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-11T10:30:00Z",
  "version": "1.0.0"
}
```

### 4.2 Future Endpoints (Post-MVP)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/history` - Get user's analysis history
- `GET /api/analysis/:id` - Get specific analysis
- `POST /api/compare` - Compare two documents
- `GET /api/export/:id` - Export analysis as PDF

---

## 5. Frontend Design

### 5.1 Component Architecture

```
App (Root)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── AuthButton
├── Hero
│   ├── Headline
│   ├── Subheadline
│   └── CTAButton
├── DocumentAnalyzer (Main Component)
│   ├── UploadSection
│   │   ├── DragDropZone
│   │   ├── FileInput
│   │   └── TextInput
│   ├── OptionsSection
│   │   ├── StateSelector
│   │   └── AnalysisOptions
│   ├── ProgressSection
│   │   ├── ProgressBar
│   │   └── StatusMessages
│   └── ResultsSection
│       ├── RiskScoreCard
│       ├── SummaryCard
│       ├── RedFlagsCard
│       ├── FairClausesCard
│       └── RecommendationsCard
├── Features
│   └── FeatureCards (3-4 key features)
├── HowItWorks
│   └── StepCards (3-step process)
└── Footer
    ├── Links
    ├── Social
    └── Copyright
```

### 5.2 User Interface Design

**Design Principles**:
- **Simplicity**: Clean, uncluttered interface
- **Clarity**: Clear labels and instructions
- **Feedback**: Visual feedback for all actions
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Mobile-first design

**Color Palette**:
- Primary: #007bff (Blue - Trust, Technology)
- Success: #28a745 (Green - Safe, Positive)
- Warning: #ffc107 (Yellow - Caution)
- Danger: #dc3545 (Red - Risk, Alert)
- Dark: #343a40 (Text, Headers)
- Light: #f8f9fa (Background)

**Typography**:
- Headings: Inter/Roboto (Bold, Clear)
- Body: Open Sans/Lato (Readable, Professional)
- Code: Fira Code/Monaco (Monospace for technical)

### 5.3 User Experience Flow

```
Landing Page
   ↓
[Try Demo] or [Sign Up]
   ↓
Document Upload Screen
   ├── Drag & Drop
   ├── Browse Files
   └── Paste Text
   ↓
Optional: Select State
   ↓
Click "Analyze"
   ↓
Progress Screen (3-10 seconds)
   ├── Animated progress bar
   ├── Status messages
   └── Fun facts about legal rights
   ↓
Results Screen
   ├── Risk Score (prominent)
   ├── Summary (easy to read)
   ├── Red Flags (expandable)
   ├── Fair Clauses (expandable)
   └── Recommendations (actionable)
   ↓
Actions
   ├── Analyze Another Document
   ├── Download Report (future)
   ├── Share Results (future)
   └── Get Legal Help (future)
```

---

## 6. Security & Privacy Design

### 6.1 Data Protection Strategy

**Privacy-First Approach**:
- Documents processed in memory only
- No permanent storage without explicit consent
- Automatic deletion after analysis
- No tracking or profiling in free tier

**Data Flow**:
```
User uploads document
   ↓
Stored in server memory (RAM)
   ↓
Text extracted and analyzed
   ↓
Results generated
   ↓
Document deleted from memory
   ↓
Only results returned to user
```

### 6.2 Security Measures

**Input Validation**:
- File type whitelist
- File size limits (10MB)
- Content sanitization
- Malware scanning (future)

**API Security**:
- HTTPS only (TLS 1.3)
- Rate limiting (10 requests/minute for free tier)
- API key authentication for premium
- CORS configuration

**Authentication Security**:
- Firebase Auth (industry standard)
- Password hashing (bcrypt)
- Session management
- JWT tokens

### 6.3 Compliance

**Legal Compliance**:
- Terms of Service (clear disclaimers)
- Privacy Policy (transparent data practices)
- GDPR compliance (for EU users)
- Indian IT Act compliance

**Disclaimers**:
- "For informational purposes only"
- "Not a substitute for legal advice"
- "Consult a lawyer for legal matters"
- "AI analysis may have limitations"

---

## 7. Performance Optimization

### 7.1 Backend Optimization

**Strategies**:
- Async processing for file uploads
- Connection pooling for database
- Caching for common analyses (future)
- CDN for static assets
- Gzip compression for responses

**Target Metrics**:
- API response time: <5 seconds (95th percentile)
- File upload: <2 seconds for 5MB file
- Text extraction: <1 second
- AI analysis: 3-10 seconds

### 7.2 Frontend Optimization

**Strategies**:
- Code splitting (React.lazy)
- Image optimization (WebP format)
- Lazy loading for below-fold content
- Service worker for caching (PWA)
- Minification and bundling

**Target Metrics**:
- First Contentful Paint: <1.5 seconds
- Time to Interactive: <3 seconds
- Lighthouse score: >90

### 7.3 AI Optimization

**Strategies**:
- Optimized prompts (shorter, clearer)
- JSON mode for structured output
- Timeout handling (10 seconds max)
- Fallback to rule-based if AI fails
- Batch processing for multiple documents (future)

---

## 8. Scalability Design

### 8.1 Horizontal Scaling

**Architecture**:
```
Load Balancer
   ↓
┌─────────┬─────────┬─────────┐
│ Server 1│ Server 2│ Server 3│
└─────────┴─────────┴─────────┘
   ↓
Database (with replication)
```

**Scaling Strategy**:
- Stateless backend (no session storage)
- Database connection pooling
- Auto-scaling based on CPU/memory
- Queue system for peak loads (Celery/RabbitMQ)

### 8.2 Cost Optimization

**Free Tier Strategy**:
- Vercel (Frontend): Free for personal projects
- Heroku (Backend): Free dyno (limited hours)
- Firebase Auth: Free up to 10K users
- Gemini API: Pay-per-use (optimize prompts)

**Scaling Costs** (Estimated):
- 1,000 users/month: ~$50/month
- 10,000 users/month: ~$200/month
- 100,000 users/month: ~$1,500/month

---

## 9. Testing Strategy

### 9.1 Testing Pyramid

```
        /\
       /  \
      / E2E \
     /--------\
    /Integration\
   /--------------\
  /   Unit Tests   \
 /------------------\
```

**Unit Tests** (70% coverage target):
- File validation functions
- Text extraction functions
- Risk scoring algorithm
- JSON parsing functions

**Integration Tests** (20% coverage):
- API endpoints
- Database operations
- AI API integration
- Authentication flow

**End-to-End Tests** (10% coverage):
- Complete user workflows
- Document upload to results
- Error scenarios
- Cross-browser testing

### 9.2 Test Cases (Sample)

**Functional Tests**:
- ✅ Upload valid PDF and get analysis
- ✅ Upload invalid file and get error
- ✅ Paste text and get analysis
- ✅ Analysis completes in <10 seconds
- ✅ Results display correctly
- ✅ Demo mode works without login

**Non-Functional Tests**:
- ⚡ Load test: 100 concurrent users
- 🔒 Security test: SQL injection, XSS
- 📱 Mobile responsiveness test
- ♿ Accessibility test (WCAG 2.1)

---

## 10. Deployment Strategy

### 10.1 Development Environment

**Local Setup**:
```bash
# Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm start
```

**Environment Variables**:
```
GEMINI_API_KEY=your_api_key
FLASK_ENV=development
DEBUG=True
DATABASE_URL=optional
FIREBASE_CONFIG=your_firebase_config
```

### 10.2 Production Deployment

**Frontend (Vercel)**:
```bash
# Build
npm run build

# Deploy
vercel --prod
```

**Backend (Heroku)**:
```bash
# Create app
heroku create lekha-ai-backend

# Set environment variables
heroku config:set GEMINI_API_KEY=xxx

# Deploy
git push heroku main
```

**CI/CD Pipeline** (Future):
```
GitHub Push
   ↓
Run Tests (GitHub Actions)
   ↓
Build (if tests pass)
   ↓
Deploy to Staging
   ↓
Manual Approval
   ↓
Deploy to Production
```

---

## 11. Monitoring & Analytics

### 11.1 Application Monitoring

**Metrics to Track**:
- API response times
- Error rates
- Uptime percentage
- AI API usage and costs
- User engagement

**Tools** (Proposed):
- Sentry (Error tracking)
- Google Analytics (User behavior)
- Heroku Metrics (Server performance)
- Custom dashboard (Usage stats)

### 11.2 User Analytics

**Key Metrics**:
- Daily/Monthly Active Users (DAU/MAU)
- Documents analyzed per day
- Average analysis time
- User satisfaction (ratings)
- Feature usage
- Conversion rate (free to premium)

---

## 12. Future Enhancements

### 12.1 Phase 2 Features

**Mobile App**:
- Native Android/iOS apps
- Camera document scanning
- Offline analysis (cached models)
- Push notifications

**Advanced AI**:
- Fine-tuned model for Indian legal documents
- Multi-document comparison
- Clause-by-clause annotation
- Legal precedent matching

**Multilingual**:
- Hindi UI and analysis
- Regional language support (5 languages)
- Voice input/output
- Translation of legal terms

### 12.2 Phase 3 Features

**Enterprise**:
- Team accounts
- Bulk document processing
- API access for integration
- Custom risk profiles
- White-label solutions

**Marketplace**:
- Connect with lawyers
- Legal consultation booking
- Document templates
- Educational resources

**AI Enhancements**:
- Predictive risk modeling
- Personalized recommendations
- Contract negotiation assistant
- Automated clause suggestions

---

## 13. Technical Challenges & Solutions

### 13.1 Challenge: AI Accuracy

**Problem**: AI may misinterpret legal clauses

**Solutions**:
- Two-stage analysis (rule-based + AI)
- Human review option for premium users
- Continuous model improvement with feedback
- Clear disclaimers about limitations

### 13.2 Challenge: Processing Speed

**Problem**: Large documents take time to analyze

**Solutions**:
- Optimize text extraction
- Efficient AI prompts
- Parallel processing
- Progress indicators for user patience

### 13.3 Challenge: Cost Management

**Problem**: AI API costs can scale quickly

**Solutions**:
- Optimize prompts to reduce tokens
- Implement caching for similar documents
- Rate limiting for free tier
- Batch processing for efficiency

### 13.4 Challenge: Legal Liability

**Problem**: Users may rely solely on AI analysis

**Solutions**:
- Clear disclaimers everywhere
- "Informational purposes only" messaging
- Encourage professional legal consultation
- Terms of Service with liability limits

---

## 14. Success Criteria

### 14.1 Technical Success

- ✅ MVP deployed and accessible online
- ✅ 95% uptime in first 3 months
- ✅ <5 second analysis time for 90% of documents
- ✅ 90%+ user satisfaction with accuracy
- ✅ Zero critical security vulnerabilities

### 14.2 User Success

- ✅ 10,000+ users in first 3 months
- ✅ 50,000+ documents analyzed
- ✅ 4+ star average rating
- ✅ 30%+ return user rate
- ✅ Positive user testimonials

### 14.3 Social Impact Success

- ✅ Help 100,000+ Indians understand documents
- ✅ Prevent ₹10 crore+ in potential losses
- ✅ Partnerships with 5+ NGOs
- ✅ Media coverage and recognition
- ✅ Measurable improvement in legal literacy

---

## 15. Conclusion

Lekha.ai is designed as a scalable, user-friendly, and impactful solution to democratize legal document understanding in India. The proposed architecture balances simplicity for MVP development with extensibility for future growth.

**Key Design Principles**:
1. **User-First**: Simple, accessible, no legal expertise required
2. **Privacy-First**: No data storage, transparent practices
3. **AI-Powered**: Latest technology for accuracy and speed
4. **Scalable**: Cloud-native, ready for millions of users
5. **Impact-Focused**: Free tier, social mission, measurable outcomes

**Next Steps**:
1. Finalize technology choices
2. Set up development environment
3. Build MVP (2 months)
4. Beta testing with 100 users
5. Public launch and iteration

---

## Document Information

**Version**: 1.0 (Hackathon Idea Submission)  
**Date**: February 11, 2026  
**Team**: Lekha.ai  
**Hackathon**: AI for Bharat  
**Status**: Design Proposal Stage  

---

**Note**: This is a design document for hackathon idea submission. The project is in conceptual stage. Technical specifications are proposed based on best practices and may be refined during implementation.