# Implementation Plan: Frontend-Backend Integration

## Overview

This implementation plan breaks down the frontend-backend integration into discrete, incremental steps. Each task builds on previous work, starting with configuration setup, then API client implementation, followed by component updates, and finally testing and validation.

## Tasks

- [ ] 1. Set up environment configuration infrastructure
  - [ ] 1.1 Create React environment configuration module
    - Create `agreement-front-end--main/src/config/api.js`
    - Implement `getApiBaseUrl()` function with environment detection
    - Export `API_BASE_URL` and `API_ENDPOINTS` constants
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [ ] 1.2 Create standalone HTML configuration file
    - Create `agreement-front-end--main/config.js`
    - Implement environment detection using `window.location.hostname`
    - Export configuration as `window.API_CONFIG`
    - _Requirements: 1.1, 1.2, 10.1_

  - [ ]* 1.3 Write unit tests for environment configuration
    - Test development environment detection
    - Test production environment detection
    - Test fallback to default URLs
    - _Requirements: 1.1, 1.2_

- [ ] 2. Implement centralized API client
  - [ ] 2.1 Create API client class
    - Create `agreement-front-end--main/src/services/apiClient.js`
    - Implement `APIClient` class with constructor and `request()` method
    - Add error handling for network errors and HTTP errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 2.2 Implement authentication API methods
    - Add `register(email, password)` method
    - Add `login(email, password)` method
    - _Requirements: 2.1, 4.1, 4.3_

  - [ ] 2.3 Implement document analysis API method
    - Add `analyzeDocument(formData)` method
    - Handle multipart/form-data for file uploads
    - _Requirements: 2.1, 5.1, 5.2_

  - [ ] 2.4 Implement history API method
    - Add `getHistory(email)` method
    - _Requirements: 2.1, 6.1_

  - [ ] 2.5 Add health check API method
    - Add `healthCheck()` method
    - _Requirements: 2.1_

  - [ ]* 2.6 Write property test for API client URL construction
    - **Property 2: API Client URL Construction**
    - **Validates: Requirements 1.4, 2.2**

  - [ ]* 2.7 Write property test for error response structure
    - **Property 5: Error Response Structure**
    - **Validates: Requirements 2.5, 7.3, 7.4, 7.5**

  - [ ]* 2.8 Write unit tests for API client methods
    - Test each API method with mock responses
    - Test error handling for different error types
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 3. Implement authentication state management
  - [ ] 3.1 Create authentication service
    - Create `agreement-front-end--main/src/services/authService.js`
    - Implement `login()`, `logout()`, `getCurrentUser()`, `isAuthenticated()` methods
    - Add event listener system for auth state changes
    - _Requirements: 4.2, 4.4, 4.5, 4.6_

  - [ ]* 3.2 Write property test for authentication state persistence
    - **Property 6: Authentication State Persistence**
    - **Validates: Requirements 4.2, 4.4, 4.5**

  - [ ]* 3.3 Write unit tests for authentication service
    - Test login stores email in localStorage
    - Test logout removes email from localStorage
    - Test event listener notifications
    - _Requirements: 4.2, 4.4, 4.5, 4.6_

- [ ] 4. Update React components to use new API client
  - [ ] 4.1 Update AuthModal component
    - Import `apiClient` and `authService`
    - Replace hardcoded API_BASE_URL with apiClient methods
    - Update error handling to use new error structure
    - Add loading state management
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.1, 7.2, 7.6_

  - [ ] 4.2 Update App.js component
    - Import `authService` for authentication state
    - Update authentication state management
    - Add auth state change listeners
    - _Requirements: 4.6_

  - [ ] 4.3 Create analyzer page component (if not exists) or update existing
    - Import `apiClient` and `authService`
    - Implement document analysis form submission
    - Add loading states during analysis
    - Display analysis results
    - Handle errors with user-friendly messages
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 7.1, 7.2, 7.6_

  - [ ] 4.4 Create or update history page component
    - Import `apiClient` and `authService`
    - Fetch and display user's analysis history
    - Sort history by date (newest first)
    - Add authentication check
    - Handle errors appropriately
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 4.5 Write property test for UI auth state synchronization
    - **Property 7: UI Auth State Synchronization**
    - **Validates: Requirements 4.6**

  - [ ]* 4.6 Write property test for async operation UI feedback
    - **Property 9: Async Operation UI Feedback**
    - **Validates: Requirements 5.5, 7.1, 7.6**

- [ ] 5. Update standalone JavaScript files
  - [ ] 5.1 Update script.js to use config module
    - Add `<script src="config.js"></script>` to index.html
    - Replace hardcoded `API_BASE_URL` with `window.API_CONFIG.BASE_URL`
    - Update all API calls to use configured URL
    - Update error handling to match new patterns
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ] 5.2 Update analyzer.js to use config module
    - Add `<script src="config.js"></script>` to analyzer.html
    - Replace hardcoded `API_BASE_URL` with `window.API_CONFIG.BASE_URL`
    - Update all API calls to use configured URL
    - Update error handling to match new patterns
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ] 5.3 Update history.js to use config module (if exists)
    - Add `<script src="config.js"></script>` to history.html
    - Replace hardcoded `API_BASE_URL` with `window.API_CONFIG.BASE_URL`
    - Update all API calls to use configured URL
    - Update error handling to match new patterns
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 5.4 Write property test for standalone file configuration consistency
    - **Property 14: Standalone File Configuration Consistency**
    - **Validates: Requirements 10.2, 10.3, 10.4**

- [ ] 6. Update backend CORS configuration
  - [ ] 6.1 Update CORS allowed origins in app.py
    - Add `http://localhost:3000` to allowed origins
    - Add environment variable support for production frontend URL
    - Update CORS configuration to include all required methods and headers
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 6.2 Add environment variables to backend
    - Create or update `.env` file with `PRODUCTION_FRONTEND_URL`
    - Update `ENVIRONMENT` variable handling
    - _Requirements: 3.2_

  - [ ]* 6.3 Write unit tests for CORS configuration
    - Test development origins are allowed
    - Test production origins are allowed
    - Test required methods are allowed
    - Test required headers are allowed
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7. Set up development proxy configuration
  - [ ] 7.1 Configure React development proxy
    - Install `http-proxy-middleware` if not already installed
    - Create `agreement-front-end--main/src/setupProxy.js`
    - Configure proxy to forward `/api/*` to `http://localhost:5000`
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 7.2 Test proxy configuration in development
    - Start backend server on localhost:5000
    - Start frontend dev server on localhost:3000
    - Verify API requests are proxied correctly
    - _Requirements: 8.1, 8.4_

- [ ] 8. Checkpoint - Test local development setup
  - Start both backend and frontend servers
  - Test registration flow end-to-end
  - Test login flow end-to-end
  - Test document analysis flow end-to-end
  - Test history retrieval flow end-to-end
  - Verify all error handling works correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Configure production build and deployment
  - [ ] 9.1 Update package.json for production build
    - Ensure build script is configured correctly
    - Add environment variable support for production API URL
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 9.2 Create environment variable documentation
    - Document required environment variables for frontend
    - Document required environment variables for backend
    - Create example `.env` files
    - _Requirements: 9.1_

  - [ ] 9.3 Update deployment configuration files
    - Update `vercel.json` or deployment config for frontend
    - Update `vercel.json` or deployment config for backend
    - Ensure environment variables are properly configured
    - _Requirements: 9.4_

  - [ ]* 9.4 Test production build locally
    - Build frontend with production configuration
    - Verify built files are optimized (minified, bundled)
    - Test production build connects to backend
    - _Requirements: 9.2, 9.3, 9.4_

- [ ] 10. Integration testing and validation
  - [ ]* 10.1 Write integration tests for authentication flow
    - Test complete registration flow
    - Test complete login flow
    - Test logout flow
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 10.2 Write integration tests for document analysis flow
    - Test file upload analysis
    - Test text paste analysis
    - Test results display
    - Test error handling
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 10.3 Write integration tests for history flow
    - Test history retrieval for logged-in users
    - Test history access control for logged-out users
    - Test history sorting
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 10.4 Write property test for history data ordering
    - **Property 12: History Data Ordering**
    - **Validates: Requirements 6.2**

  - [ ]* 10.5 Write property test for protected route access control
    - **Property 13: Protected Route Access Control**
    - **Validates: Requirements 6.4**

- [ ] 11. Final checkpoint - Complete system validation
  - Run all unit tests and verify they pass
  - Run all property tests and verify they pass
  - Run all integration tests and verify they pass
  - Test complete user journey in development environment
  - Test complete user journey in production environment (if deployed)
  - Verify error handling works correctly for all scenarios
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows across frontend and backend
