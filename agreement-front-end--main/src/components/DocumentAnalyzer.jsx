import React, { useState, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const DocumentAnalyzer = ({ isOpen, onClose, user }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'text'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { type: 'PDF', icon: '📄', color: '#e74c3c' },
    { type: 'DOC/DOCX', icon: '📝', color: '#2980b9' },
    { type: 'TXT', icon: '📃', color: '#27ae60' },
    { type: 'JPG/PNG', icon: '🖼️', color: '#f39c12' },
    { type: 'RTF', icon: '📋', color: '#9b59b6' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/rtf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a supported file format (PDF, DOC, DOCX, TXT, RTF, JPG, PNG)');
      return;
    }

    setUploadedFile(file);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('text')) return '📃';
    if (fileType.includes('image')) return '🖼️';
    return '📋';
  };

  const startAnalysis = async () => {
    if (!uploadedFile && !textInput.trim()) {
      alert('Please upload a file or enter text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      } else {
        formData.append('text', textInput);
      }
      
      // Add state and user email
      if (selectedState) {
        formData.append('state', selectedState);
      }
      
      if (user && user.email) {
        formData.append('email', user.email);
      }

      // Simulate progress while waiting for response
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      // Make API call
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ANALYZE}`, {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      
      setAnalysisProgress(100);
      setAnalysisResult(result);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        console.log('Analysis Result:', result);
      }, 500);

    } catch (error) {
      console.error('Analysis Error:', error);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      alert(`Analysis failed: ${error.message}`);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="analyzer-overlay" onClick={onClose}>
      <div className="analyzer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="analyzer-header">
          <h2>📊 Analyze Your Lease Agreement</h2>
          <p>Upload your lease document or paste the text for AI-powered analysis</p>
          <button className="analyzer-close" onClick={onClose}>×</button>
        </div>

        <div className="analyzer-content">
          {/* State Selection */}
          <div className="state-selection">
            <label htmlFor="state-select">State/Location (Optional):</label>
            <select 
              id="state-select" 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-dropdown"
            >
              <option value="">Select your state...</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          {/* Upload Method Selector */}
          <div className="method-selector">
            <button 
              className={`method-btn ${uploadMethod === 'file' ? 'active' : ''}`}
              onClick={() => setUploadMethod('file')}
            >
              📁 Upload File
            </button>
            <button 
              className={`method-btn ${uploadMethod === 'text' ? 'active' : ''}`}
              onClick={() => setUploadMethod('text')}
            >
              📝 Paste Text
            </button>
          </div>

          {uploadMethod === 'file' ? (
            <div className="file-upload-section">
              {/* Supported Formats */}
              <div className="supported-formats">
                <h4>Supported Formats:</h4>
                <div className="format-list">
                  {supportedFormats.map((format, index) => (
                    <div key={index} className="format-item" style={{ borderColor: format.color }}>
                      <span className="format-icon">{format.icon}</span>
                      <span className="format-type">{format.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div 
                className={`drop-zone ${dragActive ? 'drag-active' : ''} ${uploadedFile ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />

                {!uploadedFile ? (
                  <div className="drop-zone-content">
                    <div className="upload-icon">📤</div>
                    <h3>Drag & Drop Your Lease Document</h3>
                    <p>or <span className="click-text">click here to browse</span></p>
                    <div className="file-limits">
                      <span>Maximum file size: 10MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="uploaded-file">
                    <div className="file-info">
                      <div className="file-icon">{getFileIcon(uploadedFile.type)}</div>
                      <div className="file-details">
                        <div className="file-name">{uploadedFile.name}</div>
                        <div className="file-meta">
                          <span className="file-size">{formatFileSize(uploadedFile.size)}</span>
                          <span className="file-type">{uploadedFile.type.split('/')[1].toUpperCase()}</span>
                        </div>
                      </div>
                      <button className="remove-file" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                        🗑️
                      </button>
                    </div>
                    <div className="file-status">
                      <span className="status-icon">✅</span>
                      <span>Ready for analysis</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-input-section">
              <div className="text-input-header">
                <h4>📝 Paste Your Lease Text</h4>
                <p>Copy and paste the text content of your lease agreement below</p>
              </div>
              <textarea
                className="lease-text-input"
                placeholder="Paste your lease agreement text here...

Example:
RESIDENTIAL LEASE AGREEMENT

This lease agreement is entered into on [Date] between [Landlord Name] and [Tenant Name] for the property located at [Address]...

Terms and Conditions:
1. Rent Amount: $[Amount] per month
2. Security Deposit: $[Amount]
3. Lease Term: [Duration]
..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={12}
              />
              <div className="text-stats">
                <span className="char-count">{textInput.length} characters</span>
                <span className="word-count">{textInput.trim().split(/\s+/).filter(word => word.length > 0).length} words</span>
              </div>
            </div>
          )}

          {/* Analysis Options */}
          <div className="analysis-options">
            <h4>🔍 Analysis Options</h4>
            <div className="options-grid">
              <label className="option-item">
                <input type="checkbox" defaultChecked />
                <span className="checkmark">✓</span>
                <div className="option-content">
                  <div className="option-title">Red Flag Detection</div>
                  <div className="option-desc">Identify potentially unfair clauses</div>
                </div>
              </label>
              <label className="option-item">
                <input type="checkbox" defaultChecked />
                <span className="checkmark">✓</span>
                <div className="option-content">
                  <div className="option-title">Legal Compliance</div>
                  <div className="option-desc">Check against local tenant laws</div>
                </div>
              </label>
              <label className="option-item">
                <input type="checkbox" defaultChecked />
                <span className="checkmark">✓</span>
                <div className="option-content">
                  <div className="option-title">Risk Assessment</div>
                  <div className="option-desc">Overall risk score and recommendations</div>
                </div>
              </label>
              <label className="option-item">
                <input type="checkbox" defaultChecked />
                <span className="checkmark">✓</span>
                <div className="option-content">
                  <div className="option-title">Missing Protections</div>
                  <div className="option-desc">Identify absent tenant protections</div>
                </div>
              </label>
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="analysis-progress">
              <div className="progress-header">
                <h4>🤖 AI Analysis in Progress...</h4>
                <span className="progress-percentage">{Math.round(analysisProgress)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                <div className={`step ${analysisProgress > 20 ? 'completed' : 'active'}`}>
                  📄 Processing document...
                </div>
                <div className={`step ${analysisProgress > 50 ? 'completed' : analysisProgress > 20 ? 'active' : ''}`}>
                  🔍 Analyzing clauses...
                </div>
                <div className={`step ${analysisProgress > 80 ? 'completed' : analysisProgress > 50 ? 'active' : ''}`}>
                  ⚖️ Checking legal compliance...
                </div>
                <div className={`step ${analysisProgress > 95 ? 'completed' : analysisProgress > 80 ? 'active' : ''}`}>
                  📊 Generating report...
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <div className="analysis-results" style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #28a745'
            }}>
              <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
                ✅ Analysis Complete!
              </h3>
              
              {/* Risk Rating */}
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                marginBottom: '15px',
                borderLeft: `4px solid ${
                  analysisResult.ratingScore >= 70 ? '#dc3545' : 
                  analysisResult.ratingScore >= 40 ? '#ffc107' : '#28a745'
                }`
              }}>
                <h4 style={{ margin: '0 0 10px 0' }}>
                  📊 Risk Assessment: {analysisResult.ratingText || 'N/A'}
                </h4>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                  Score: {analysisResult.ratingScore || 0}/100
                </p>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '5px',
                  marginTop: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${analysisResult.ratingScore || 0}%`,
                    height: '100%',
                    backgroundColor: analysisResult.ratingScore >= 70 ? '#dc3545' : 
                                   analysisResult.ratingScore >= 40 ? '#ffc107' : '#28a745',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              {/* Summary */}
              {analysisResult.shortSummary && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>📝 Summary</h4>
                  <p style={{ margin: '0', lineHeight: '1.6' }}>{analysisResult.shortSummary}</p>
                </div>
              )}

              {/* Red Flags */}
              {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #dc3545'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>
                    🚩 Red Flags ({analysisResult.redFlagsCount || analysisResult.redFlags.length})
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {analysisResult.redFlags.map((flag, index) => (
                      <li key={index} style={{ marginBottom: '10px', lineHeight: '1.5' }}>
                        <strong>{flag.title || `Red Flag ${index + 1}`}:</strong> {flag.issue || flag}
                        {flag.recommendation && (
                          <div style={{ marginTop: '5px', color: '#666', fontSize: '14px' }}>
                            💡 {flag.recommendation}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fair Clauses */}
              {analysisResult.fairClauses && analysisResult.fairClauses.length > 0 && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>
                    ✅ Fair Clauses ({analysisResult.fairClausesCount || analysisResult.fairClauses.length})
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {analysisResult.fairClauses.map((clause, index) => (
                      <li key={index} style={{ marginBottom: '10px', lineHeight: '1.5' }}>
                        <strong>{clause.title || `Fair Clause ${index + 1}`}</strong>
                        {clause.recommendation && (
                          <div style={{ marginTop: '5px', color: '#666', fontSize: '14px' }}>
                            {clause.recommendation}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #007bff'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                    💡 Recommendations
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Summary */}
              {analysisResult.aiSummary && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>🤖 AI Analysis</h4>
                  <p style={{ margin: '0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {analysisResult.aiSummary}
                  </p>
                </div>
              )}

              {/* High Risk Findings (NEW - 50-Point Analysis) */}
              {analysisResult.highRiskFindings && analysisResult.highRiskFindings.length > 0 && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #ff6b6b'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>
                    ⚠️ High Risk Findings ({analysisResult.highRiskFindings.length} vectors detected)
                  </h4>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    Based on 50-point risk vector analysis
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {analysisResult.highRiskFindings.map((finding, index) => (
                      <li key={index} style={{ marginBottom: '12px', lineHeight: '1.5' }}>
                        <strong style={{ color: '#d32f2f' }}>{finding.term}</strong>
                        <span style={{ 
                          marginLeft: '8px', 
                          padding: '2px 8px', 
                          backgroundColor: '#ffebee', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#d32f2f'
                        }}>
                          -{finding.deduction} points
                        </span>
                        <div style={{ marginTop: '5px', color: '#555', fontSize: '14px' }}>
                          {finding.explanation}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Negotiation Strategy (NEW) */}
              {analysisResult.negotiationStrategy && analysisResult.negotiationStrategy.length > 0 && (
                <div style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #9c27b0'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#9c27b0' }}>
                    🎯 Negotiation Strategy
                  </h4>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    Tactical approaches to address high-risk items
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {analysisResult.negotiationStrategy.map((strategy, index) => (
                      <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5', color: '#555' }}>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons for Results */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setAnalysisResult(null);
                    setUploadedFile(null);
                    setTextInput('');
                  }}
                  style={{ flex: 1 }}
                >
                  🔄 Analyze Another Document
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={onClose}
                  style={{ flex: 1 }}
                >
                  ✓ Done
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!analysisResult && (
            <div className="analyzer-actions">
              <button className="btn btn-secondary" onClick={onClose} disabled={isAnalyzing}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={startAnalysis}
                disabled={isAnalyzing || (!uploadedFile && !textInput.trim())}
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner">⏳</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    🚀 Start Analysis
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;