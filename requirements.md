# Lekha.ai - Requirements Document

## 1. Project Overview

**Project Name**: Lekha.ai - AI-Powered Public Document & Terms Analyzer

**Purpose**: To provide individuals and organizations with an intelligent, automated system for analyzing any public document, terms & conditions, service agreements, contracts, and legal documents, identifying potential risks, unfair clauses, hidden terms, and legal compliance issues using AI technology.

**Target Users**: 
- General public reviewing any legal document or agreement
- Consumers analyzing terms & conditions of online services
- Employees reviewing employment contracts
- Tenants analyzing lease agreements
- Freelancers evaluating client contracts
- Small business owners reviewing vendor agreements
- Students understanding university or housing contracts
- Anyone signing any public document or agreement

---

## 2. Functional Requirements

### 2.1 User Authentication

**FR-2.1.1**: The system shall provide user registration with email and password.

**FR-2.1.2**: The system shall support Firebase authentication for secure login.

**FR-2.1.3**: The system shall provide a demo mode with credentials:
- Email: `demo@lekha.ai`
- Password: `demo123`

**FR-2.1.4**: The system shall allow instant demo access without password entry.

**FR-2.1.5**: The system shall maintain user session state across page refreshes.

### 2.2 Document Upload

**FR-2.2.1**: The system shall support multiple document upload methods:
- File upload (drag-and-drop)
- File upload (browse button)
- Direct text paste

**FR-2.2.2**: The system shall accept the following file formats:
- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Plain Text (.txt)
- Rich Text Format (.rtf)
- Images (.jpg, .jpeg, .png)

**FR-2.2.3**: The system shall enforce a maximum file size limit of 10MB.

**FR-2.2.4**: The system shall validate file types before upload.

**FR-2.2.5**: The system shall display file information after upload:
- File name
- File size
- File type
- Upload status

**FR-2.2.6**: The system shall allow users to remove uploaded files before analysis.

### 2.3 State/Location Selection

**FR-2.3.1**: The system shall provide a dropdown menu for selecting Indian states.

**FR-2.3.2**: The system shall include all 28 states and 8 union territories of India.

**FR-2.3.3**: State selection shall be optional for analysis.

**FR-2.3.4**: The system shall use state information to provide location-specific legal analysis.

### 2.4 AI-Powered Analysis

**FR-2.4.1**: The system shall use Google Gemini 2.5 Flash for document analysis.

**FR-2.4.2**: The system shall perform rule-based pre-analysis using keyword detection.

**FR-2.4.3**: The system shall analyze documents for:
- Risk assessment (0-100 score)
- Red flags (unfair clauses, hidden terms, liability limitations)
- Fair clauses (positive terms, protections)
- Legal compliance issues
- Missing protections or rights
- Hidden fees or charges
- Data privacy concerns
- Cancellation and termination terms
- Liability and indemnification clauses
- Dispute resolution mechanisms
- Recommendations for negotiation or action

**FR-2.4.4**: The system shall complete analysis within 3-10 seconds.

**FR-2.4.5**: The system shall display real-time progress during analysis:
- Processing document (0-20%)
- Analyzing clauses (20-50%)
- Checking legal compliance (50-80%)
- Generating report (80-100%)

**FR-2.4.6**: The system shall handle analysis timeouts gracefully.

**FR-2.4.7**: The system shall provide fallback responses if AI analysis fails.

### 2.5 Risk Assessment System

**FR-2.5.1**: The system shall use a 20-point risk assessment scale (0-100):
- 0-20: CRITICAL (Dark Red)
- 21-45: DANGEROUS (Red)
- 46-70: RISKY (Orange)
- 71-85: CAUTION (Yellow)
- 86-100: STABLE (Green)

**FR-2.5.2**: The system shall display risk score with visual indicators:
- Color-coded rating
- Numerical score
- Progress bar
- Risk category label

**FR-2.5.3**: The system shall identify at least 5 red flags per analysis.

**FR-2.5.4**: The system shall identify at least 4 fair clauses per analysis.

### 2.6 Analysis Results Display

**FR-2.6.1**: The system shall display comprehensive analysis results including:
- Overall risk score
- Risk category and color label
- Summary (15-20 lines)
- Short summary (1 sentence)
- AI detailed analysis
- Red flags list with titles and issues
- Fair clauses list with recommendations
- Actionable recommendations (8+ items)

**FR-2.6.2**: Each red flag shall include:
- Title
- Issue description
- Optional recommendation

**FR-2.6.3**: Each fair clause shall include:
- Title
- Recommendation or explanation

**FR-2.6.4**: The system shall count and display:
- Total red flags found
- Total fair clauses found

**FR-2.6.5**: The system shall format results with:
- Color-coded sections
- Clear headings
- Readable typography
- Proper spacing

### 2.7 Analysis Options

**FR-2.7.1**: The system shall provide analysis option checkboxes:
- Red Flag Detection (default: checked)
- Legal Compliance (default: checked)
- Risk Assessment (default: checked)
- Missing Protections (default: checked)

**FR-2.7.2**: All analysis options shall be enabled by default.

### 2.8 User Actions

**FR-2.8.1**: The system shall allow users to:
- Analyze another document after completion
- Close the analyzer modal
- Cancel analysis in progress
- Remove uploaded files

**FR-2.8.2**: The system shall reset form state after "Analyze Another Document".

**FR-2.8.3**: The system shall disable action buttons during analysis.

### 2.9 Error Handling

**FR-2.9.1**: The system shall display user-friendly error messages for:
- Invalid file types
- File size exceeded
- API key issues
- Network errors
- Analysis timeouts
- JSON parsing failures

**FR-2.9.2**: The system shall log detailed errors to console for debugging.

**FR-2.9.3**: The system shall provide specific error messages:
- "API key expired or invalid"
- "API quota exceeded"
- "Network connection issue"
- "Analysis timed out"

**FR-2.9.4**: The system shall continue functioning with fallback responses if AI fails.

---

## 3. Non-Functional Requirements

### 3.1 Performance

**NFR-3.1.1**: The system shall complete document analysis within 10 seconds for 95% of requests.

**NFR-3.1.2**: The system shall handle concurrent analyses from multiple users.

**NFR-3.1.3**: The system shall maintain 95%+ JSON parsing success rate.

**NFR-3.1.4**: The frontend shall load within 3 seconds on standard broadband.

**NFR-3.1.5**: The system shall process files up to 10MB efficiently.

### 3.2 Reliability

**NFR-3.2.1**: The system shall have 99% uptime during business hours.

**NFR-3.2.2**: The system shall gracefully handle API failures with fallback responses.

**NFR-3.2.3**: The system shall recover from network interruptions.

**NFR-3.2.4**: The system shall maintain data integrity during analysis.

### 3.3 Security

**NFR-3.3.1**: The system shall store API keys in environment variables.

**NFR-3.3.2**: The system shall not expose sensitive data in client-side code.

**NFR-3.3.3**: The system shall use HTTPS for all API communications.

**NFR-3.3.4**: The system shall validate all user inputs.

**NFR-3.3.5**: The system shall sanitize uploaded file content.

**NFR-3.3.6**: The system shall implement Firebase authentication security rules.

### 3.4 Usability

**NFR-3.4.1**: The system shall provide an intuitive user interface.

**NFR-3.4.2**: The system shall display clear instructions for each step.

**NFR-3.4.3**: The system shall use visual feedback for all user actions.

**NFR-3.4.4**: The system shall be accessible on desktop and tablet devices.

**NFR-3.4.5**: The system shall use consistent color coding for risk levels.

**NFR-3.4.6**: The system shall provide helpful tooltips and descriptions.

### 3.5 Maintainability

**NFR-3.5.1**: The code shall follow Python PEP 8 style guidelines.

**NFR-3.5.2**: The code shall follow React best practices.

**NFR-3.5.3**: The system shall use modular, reusable components.

**NFR-3.5.4**: The system shall include comprehensive error logging.

**NFR-3.5.5**: The system shall be version controlled with Git.

### 3.6 Scalability

**NFR-3.6.1**: The system shall support horizontal scaling for increased load.

**NFR-3.6.2**: The system shall handle 100+ concurrent users.

**NFR-3.6.3**: The system shall support database integration for history storage.

**NFR-3.6.4**: The system shall work with or without database connection.

### 3.7 Compatibility

**NFR-3.7.1**: The system shall support modern web browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**NFR-3.7.2**: The system shall be compatible with Python 3.8+.

**NFR-3.7.3**: The system shall be compatible with Node.js 14+.

**NFR-3.7.4**: The system shall work on Windows, macOS, and Linux.

---

## 4. Technical Requirements

### 4.1 Backend Requirements

**TR-4.1.1**: Backend shall be built with Flask framework.

**TR-4.1.2**: Backend shall use Google Generative AI SDK.

**TR-4.1.3**: Backend shall support CORS for frontend communication.

**TR-4.1.4**: Backend shall implement RESTful API endpoints.

**TR-4.1.5**: Backend shall use python-dotenv for configuration.

### 4.2 Frontend Requirements

**TR-4.2.1**: Frontend shall be built with React 18+.

**TR-4.2.2**: Frontend shall use functional components with hooks.

**TR-4.2.3**: Frontend shall implement responsive design.

**TR-4.2.4**: Frontend shall use Firebase SDK for authentication.

**TR-4.2.5**: Frontend shall handle file uploads with FormData.

### 4.3 AI/ML Requirements

**TR-4.3.1**: System shall use Google Gemini 2.5 Flash model.

**TR-4.3.2**: System shall configure AI with:
- Temperature: 0.7
- Top P: 0.95
- Top K: 40
- Max output tokens: 2048

**TR-4.3.3**: System shall implement JSON mode for structured responses.

**TR-4.3.4**: System shall include fallback analysis logic.

### 4.4 Database Requirements (Optional)

**TR-4.4.1**: System shall support MySQL database.

**TR-4.4.2**: System shall work without database (fallback mode).

**TR-4.4.3**: System shall store analysis history when database is available.

**TR-4.4.4**: System shall use environment variable for database toggle.

---

## 5. API Requirements

### 5.1 Analysis Endpoint

**API-5.1.1**: POST `/api/analyze`
- Accepts: multipart/form-data
- Parameters:
  - `file`: Document file (optional)
  - `text`: Text content (optional)
  - `state`: Indian state (optional)
  - `email`: User email (optional)
- Returns: JSON analysis result

**API-5.1.2**: Response format:
```json
{
  "overallScore": 75,
  "ratingScore": 75,
  "colorLabel": "YELLOW",
  "ratingText": "CAUTION",
  "summary": "Comprehensive summary...",
  "shortSummary": "Brief summary...",
  "aiSummary": "Detailed analysis...",
  "redFlags": [...],
  "fairClauses": [...],
  "recommendations": [...],
  "redFlagsCount": 5,
  "fairClausesCount": 4
}
```

### 5.2 Health Check Endpoint

**API-5.2.1**: GET `/api/health`
- Returns: Server status
- Response: `{"status": "ok"}`

---

## 6. Data Requirements

### 6.1 Input Data

**DR-6.1.1**: System shall accept lease agreement text in English.

**DR-6.1.2**: System shall process documents up to 10MB.

**DR-6.1.3**: System shall extract text from images using OCR (if applicable).

**DR-6.1.4**: System shall handle various document formats.

### 6.2 Output Data

**DR-6.2.1**: System shall generate structured JSON responses.

**DR-6.2.2**: System shall provide human-readable analysis text.

**DR-6.2.3**: System shall include actionable recommendations.

**DR-6.2.4**: System shall categorize findings by severity.

---

## 7. Compliance Requirements

### 7.1 Legal Compliance

**CR-7.1.1**: System shall analyze against applicable Indian laws and regulations.

**CR-7.1.2**: System shall identify state-specific legal requirements when applicable.

**CR-7.1.3**: System shall flag potentially illegal or unenforceable clauses.

**CR-7.1.4**: System shall provide legal disclaimers that analysis is for informational purposes only.

**CR-7.1.5**: System shall analyze consumer protection laws compliance.

**CR-7.1.6**: System shall check data privacy and protection regulations (if applicable).

**CR-7.1.7**: System shall identify employment law compliance issues (for employment contracts).

### 7.2 Data Privacy

**CR-7.2.1**: System shall not store uploaded documents permanently.

**CR-7.2.2**: System shall process documents in memory.

**CR-7.2.3**: System shall comply with data protection regulations.

**CR-7.2.4**: System shall allow anonymous demo usage.

---

## 8. User Interface Requirements

### 8.1 Layout

**UI-8.1.1**: System shall use modal overlay for document analyzer.

**UI-8.1.2**: System shall display clear section headers.

**UI-8.1.3**: System shall use consistent spacing and padding.

**UI-8.1.4**: System shall implement responsive grid layouts.

### 8.2 Visual Design

**UI-8.2.1**: System shall use color-coded risk indicators:
- Red: High risk
- Orange: Medium risk
- Yellow: Caution
- Green: Low risk

**UI-8.2.2**: System shall use icons for visual clarity.

**UI-8.2.3**: System shall implement smooth animations.

**UI-8.2.4**: System shall use readable fonts and sizes.

### 8.3 Interaction

**UI-8.3.1**: System shall provide hover effects on interactive elements.

**UI-8.3.2**: System shall disable buttons during processing.

**UI-8.3.3**: System shall show loading indicators.

**UI-8.3.4**: System shall provide click feedback.

---

## 9. Testing Requirements

### 9.1 Unit Testing

**TEST-9.1.1**: Backend functions shall have unit tests.

**TEST-9.1.2**: Frontend components shall have unit tests.

**TEST-9.1.3**: API endpoints shall have integration tests.

### 9.2 Functional Testing

**TEST-9.2.1**: All user workflows shall be tested end-to-end.

**TEST-9.2.2**: File upload functionality shall be tested with various formats.

**TEST-9.2.3**: Analysis accuracy shall be validated with sample documents.

### 9.3 Performance Testing

**TEST-9.3.1**: System shall be load tested with concurrent users.

**TEST-9.3.2**: Response times shall be measured and optimized.

**TEST-9.3.3**: Memory usage shall be monitored.

---

## 10. Deployment Requirements

### 10.1 Environment

**DEP-10.1.1**: System shall support local development environment.

**DEP-10.1.2**: System shall be deployable to cloud platforms (Vercel, Heroku).

**DEP-10.1.3**: System shall use environment variables for configuration.

**DEP-10.1.4**: System shall include deployment documentation.

### 10.2 Configuration

**DEP-10.2.1**: System shall provide `.env.example` template.

**DEP-10.2.2**: System shall document all required environment variables.

**DEP-10.2.3**: System shall validate configuration on startup.

---

## 11. Documentation Requirements

### 11.1 User Documentation

**DOC-11.1.1**: System shall include README with setup instructions.

**DOC-11.1.2**: System shall provide quick start guide.

**DOC-11.1.3**: System shall document demo credentials.

**DOC-11.1.4**: System shall include troubleshooting guide.

### 11.2 Developer Documentation

**DOC-11.2.1**: Code shall include inline comments.

**DOC-11.2.2**: API endpoints shall be documented.

**DOC-11.2.3**: System architecture shall be documented.

**DOC-11.2.4**: Database schema shall be documented.

---

## 12. Future Enhancements

### 12.1 Planned Features

**FE-12.1.1**: Multi-language support (Hindi, regional languages).

**FE-12.1.2**: PDF report generation and download.

**FE-12.1.3**: Comparison of multiple lease agreements.

**FE-12.1.4**: Email notifications for analysis completion.

**FE-12.1.5**: User dashboard with analysis history.

**FE-12.1.6**: Mobile application (iOS/Android).

**FE-12.1.7**: Integration with legal consultation services.

**FE-12.1.8**: Clause-by-clause annotation in original document.

---

## Document Control

**Version**: 1.0  
**Last Updated**: February 11, 2026  
**Author**: Lekha.ai Development Team  
**Status**: Approved  
**Next Review**: March 2026