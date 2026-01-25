# lekha.ai Frontend - React App for AI-Powered Rent Agreement Analyzer

![lekha.ai](https://img.shields.io/badge/lekha.ai-Frontend-blue)
![React](https://img.shields.io/badge/React-18.2.3-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

A modern React frontend for lekha.ai - an intelligent web application that analyzes rent agreements using AI to identify potential red flags, unfair clauses, and provides recommendations for tenants in India.

## 🚀 Tech Stack

- **React 18.2.3** - Modern React with hooks and functional components
- **JSX** - Component-based architecture
- **CSS3** - Custom styling with CSS variables
- **JavaScript ES6+** - Modern JavaScript features
- **Create React App** - Development tooling

## 🌟 React Features

### 🎨 **Component Architecture**
- **Header Component** - Navigation and user authentication
- **Hero Component** - Landing page hero section
- **Features Component** - Feature showcase grid
- **HowItWorks Component** - Process explanation
- **Resources Component** - Educational resources
- **Footer Component** - Site footer
- **AuthModal Component** - Login/signup modal

### 📱 **Modern React Patterns**
- **Functional Components** with hooks
- **State Management** with useState and useEffect
- **Event Handling** with modern patterns
- **Conditional Rendering** for dynamic UI
- **Component Props** for data flow
- **Local Storage Integration** for user sessions

## 🚀 Quick Start

### Prerequisites
- **Node.js** (14.0.0 or higher)
- **npm** or **yarn**
- Modern web browser

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay192005/agreement-front-end-.git
   cd agreement-front-end-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 React Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation component
│   ├── Hero.jsx           # Hero section component
│   ├── Features.jsx       # Features grid component
│   ├── HowItWorks.jsx     # Process explanation component
│   ├── Resources.jsx      # Resources section component
│   ├── Footer.jsx         # Footer component
│   └── AuthModal.jsx      # Authentication modal component
├── App.jsx                # Main App component
├── App.css               # App-specific styles
├── index.jsx             # React entry point
└── index.css             # Global styles

public/
├── index.html            # HTML template
└── favicon.ico           # Site icon

package.json              # Dependencies and scripts
```

## 🎨 Component Details

### Header Component
```jsx
<Header 
  user={user} 
  onLogin={openAuthModal} 
  onLogout={handleLogout} 
/>
```
- Responsive navigation
- User authentication state
- Dynamic menu items

### Hero Component
```jsx
<Hero 
  onAnalyzeClick={navigateToAnalyzer} 
  onLearnMoreClick={openAuthModal} 
/>
```
- Call-to-action buttons
- Responsive layout
- Hover effects

### AuthModal Component
```jsx
<AuthModal 
  isOpen={isAuthModalOpen} 
  onClose={closeAuthModal} 
  onLogin={handleLogin} 
/>
```
- Login/signup forms
- Form validation
- API integration

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## 🎯 React Hooks Used

### useState
```javascript
const [user, setUser] = useState(null);
const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
```

### useEffect
```javascript
useEffect(() => {
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail) {
    setUser({ email: userEmail });
  }
}, []);
```

## 🌐 API Integration

The React app integrates with the backend API:

```javascript
const API_BASE_URL = 'https://agreement-checker-backend.vercel.app';

// Login example
const handleLogin = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  // Handle response...
};
```

## 📱 Responsive Design

The React app is fully responsive with:
- **Mobile-first approach**
- **Flexible grid layouts**
- **Responsive typography**
- **Touch-friendly interactions**

```css
/* Responsive breakpoints */
@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `build/` folder with optimized production files.

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload build/ folder to Netlify
```

## 🔒 Security Features

- **Input sanitization** in forms
- **XSS prevention** with React's built-in protection
- **Secure API communication** with HTTPS
- **Local storage security** for user sessions

## 🎯 Performance Optimizations

- **Code splitting** with React.lazy (future enhancement)
- **Optimized images** and assets
- **Efficient re-renders** with proper key props
- **Memoization** opportunities for complex components

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes in the React components
4. Test your changes (`npm test`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Guidelines
- Use functional components with hooks
- Follow React best practices
- Write clean, readable JSX
- Use proper prop types (consider adding PropTypes)
- Maintain component separation of concerns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Repositories

- **Backend API**: [Rent_Agreement_Checker](https://github.com/jay192005/Rent_Agreement_Checker)

## 📞 Support

For React frontend issues:
- Create an issue on GitHub
- Check React documentation: https://reactjs.org/

---

**Built with ⚛️ React and ❤️ for Indian tenants by lekha.ai**

*Modern React architecture for beautiful, accessible web interfaces*