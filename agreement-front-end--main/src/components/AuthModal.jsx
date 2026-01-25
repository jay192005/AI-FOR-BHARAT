import React, { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoLogin = () => {
    // Demo login - no database required
    const demoEmail = 'demo@lekha.ai';
    setMessage('✅ Logged in as Demo User!');
    setTimeout(() => {
      onLogin(demoEmail);
    }, 500);
  };

  const fillDemoCredentials = () => {
    // Fill form with demo credentials
    setFormData({
      email: 'demo@lekha.ai',
      password: 'demo123'
    });
    setIsLoginForm(true);
    setMessage('💡 Demo credentials filled! Click Login to continue.');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setMessage(`✅ Signed in with Google as ${user.email}!`);
      
      // Register/login the user in backend
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: user.email, 
            password: user.uid, // Use Firebase UID as password
            displayName: user.displayName,
            photoURL: user.photoURL,
            provider: 'google'
          })
        });

        // Even if backend registration fails, we can still use the app
        if (response.ok) {
          console.log('User registered in backend');
        }
      } catch (backendError) {
        console.log('Backend registration skipped:', backendError);
      }

      // Login the user in frontend
      setTimeout(() => {
        onLogin(user.email);
      }, 500);

    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setMessage('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setMessage('Pop-up blocked. Please allow pop-ups for this site.');
      } else {
        setMessage('Google Sign-In failed. Please try again or use email/password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isLoginForm) {
        // LOGIN with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        const user = userCredential.user;

        setMessage(`✅ Welcome back, ${user.email}!`);
        
        // Sync with backend (optional - for analysis history)
        try {
          await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        } catch (backendError) {
          console.log('Backend sync skipped:', backendError);
        }

        // Login the user in frontend
        setTimeout(() => {
          onLogin(user.email);
        }, 500);

      } else {
        // REGISTER with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        const user = userCredential.user;

        // Update user profile if display name provided
        if (formData.displayName) {
          await updateProfile(user, {
            displayName: formData.displayName
          });
        }

        setMessage(`✅ Account created successfully! Welcome, ${user.email}!`);
        
        // Register in backend (optional - for analysis history)
        try {
          await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              password: formData.password,
              displayName: formData.displayName || '',
              provider: 'email'
            })
          });
        } catch (backendError) {
          console.log('Backend registration skipped:', backendError);
        }

        // Login the user in frontend
        setTimeout(() => {
          onLogin(user.email);
        }, 500);
      }

      setFormData({ email: '', password: '', displayName: '' });

    } catch (error) {
      console.error('Auth Error:', error);
      
      // Handle Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        setMessage('❌ This email is already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('❌ Password should be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('❌ Invalid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('❌ No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        setMessage('❌ Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setMessage('❌ Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/network-request-failed') {
        setMessage('❌ Network error. Please check your internet connection.');
      } else {
        setMessage(`❌ ${error.message || 'Authentication failed. Please try again.'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setMessage('');
    setFormData({ email: '', password: '', displayName: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay show" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isLoginForm ? 'Login' : 'Create Account'}</h2>
          
          {message && (
            <p className={`form-message ${message.includes('❌') ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
          
          {!isLoginForm && (
            <input
              type="text"
              name="displayName"
              placeholder="Display Name (Optional)"
              value={formData.displayName || ''}
              onChange={handleInputChange}
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength="6"
          />
          
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLoginForm ? 'Login' : 'Create Account')}
          </button>

          <div style={{ margin: '15px 0', textAlign: 'center', color: '#666' }}>
            <span>─────── OR ───────</span>
          </div>

          <button 
            type="button" 
            className="btn btn-google" 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#fff',
              color: '#444',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f8f8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleDemoLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            🎯 Try Demo Mode (No Login Required)
          </button>

          <button 
            type="button" 
            className="btn btn-demo-fill" 
            onClick={fillDemoCredentials}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            📝 Fill Demo Credentials (Username & Password)
          </button>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', textAlign: 'center' }}>
            Demo credentials: <strong>demo@lekha.ai</strong> / <strong>demo123</strong>
          </p>
          
          <p className="toggle-form">
            {isLoginForm ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              {isLoginForm ? 'Sign Up' : 'Login'}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;