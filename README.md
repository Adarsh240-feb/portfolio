# Modern Portfolio Website - React & Tailwind CSS

A beautiful, modern, and fully responsive portfolio website built with React and Tailwind CSS, featuring smooth animations powered by Framer Motion.

## ✨ Features

- 🎨 **Modern Design** - Clean and professional UI with gradient effects
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized React components
- 🎭 **Smooth Animations** - Beautiful transitions with Framer Motion
- 🎯 **Easy Customization** - Well-organized component structure
- 🔧 **Tailwind CSS** - Utility-first CSS framework
- 📦 **Production Ready** - Optimized build configuration

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd portfolio-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar component
│   │   ├── Hero.jsx         # Hero/landing section
│   │   ├── About.jsx        # About section
│   │   ├── TechStack.jsx    # Tech stack showcase
│   │   ├── Projects.jsx     # Projects gallery
│   │   ├── Contact.jsx      # Contact section
│   │   └── Footer.jsx       # Footer component
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   └── index.css            # Global styles & Tailwind imports
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization Guide

### 1. **Personal Information**

#### Update Your Name and Branding
- **Navbar Logo** (`src/components/Navbar.jsx`, line 53): Change "YN" to your initials
- **Hero Section** (`src/components/Hero.jsx`, line 34): Update your name and title
- **Footer** (`src/components/Footer.jsx`): Update copyright and links

```jsx
// Example: Navbar.jsx
<a href="#home" className="text-2xl font-bold...">
  JD  {/* Change to your initials */}
</a>
```

### 2. **Colors & Theme**

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#667eea',  // Main color
    dark: '#5a67d8',
    light: '#7c8df0',
  },
  secondary: {
    DEFAULT: '#764ba2',  // Secondary color
    dark: '#6b3f92',
    light: '#8558b2',
  },
}
```

### 3. **Tech Stack Icons**

Update `src/components/TechStack.jsx`:

```jsx
const technologies = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  // Add or remove technologies here
];
```

Find more icons at: [React Icons](https://react-icons.github.io/react-icons/)

### 4. **Projects**

Edit `src/components/Projects.jsx`:

```jsx
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description...',
    image: 'your-image-url',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'github-url',
    demo: 'demo-url',
    gradient: 'from-blue-500 to-purple-600',
  },
  // Add more projects
];
```

**Image Sources:**
- Use [Unsplash](https://unsplash.com/) for high-quality free images
- Or upload your own project screenshots

### 5. **About Section Stats**

Update `src/components/About.jsx` to reflect your actual stats:

```jsx
<div className="p-6 bg-gradient-to-br...">
  <h3 className="text-4xl font-bold...">5+</h3>
  <p className="text-gray-600...">Years Experience</p>
</div>
```

### 6. **Contact Information**

Update email in `src/components/Contact.jsx`:

```jsx
<a href="mailto:your.email@example.com">
  your.email@example.com
</a>
```

### 7. **Social Media Links**

Update `src/components/Footer.jsx`:

```jsx
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile',
    icon: FaLinkedin,
  },
  // Update all URLs
];
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `build` folder to [Netlify](https://www.netlify.com/)

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🎯 Optimization Tips

1. **Images:** Optimize images using tools like [TinyPNG](https://tinypng.com/)
2. **Performance:** Use lazy loading for images
3. **SEO:** Update meta tags in `public/index.html`
4. **Analytics:** Add Google Analytics or similar
5. **Accessibility:** Test with screen readers

## 📚 Technologies Used

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **PostCSS** - CSS transformations

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
Make sure `index.css` has:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

Need help? Feel free to reach out or open an issue!

---

**Built with ❤️ using React & Tailwind CSS**
