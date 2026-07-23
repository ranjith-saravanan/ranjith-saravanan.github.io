# Enhanced AI & Data Science Portfolio (HTML5 + CSS3 + Vanilla JS)

A high-performance, dark-themed glassmorphism personal portfolio built for an AI & Data Science student using **plain HTML5, CSS3, and vanilla JavaScript**. Zero frameworks, zero build steps, instant page load speeds, and effortless deployment on GitHub Pages.

![Portfolio Preview](assets/images/PROFILE.jpeg)

---

## 🌟 Key Features

- **Framework-Free & High Performance:** Fast rendering with zero JavaScript framework overhead.
- **Glassmorphism Design:** Styled with CSS backdrops (`backdrop-filter: blur()`), custom glowing borders, and dark/light mode CSS variables.
- **Interactive Canvas Particles:** Custom HTML5 canvas rendering interactive node connections that respond to cursor movement.
- **Dynamic Terminal Typing Effect:** Cycles through professional titles automatically.
- **Scroll Reveal Animations:** Powered by native `Intersection Observer` API.
- **Filterable Projects Grid:** Client-side category filtering (AI/ML, Computer Vision, Web) using vanilla DOM selection.
- **EmailJS Contact Form:** Functional contact form with validation, submit loading state, and user alerts without a backend server.
- **Custom Cursor Follower:** Interactive ring and dot cursor for desktop viewports.
- **Fully Responsive:** Fluid layouts designed using mobile-first CSS Flexbox and Grid.
- **SEO & Accessibility Ready:** Complete with Open Graph metadata, semantic HTML5 structure, and ARIA attributes.

---

## 📂 File Structure

```text
/
├── index.html              # Main landing page containing all 11 sections
├── 404.html                # Custom 404 page for GitHub Pages
├── robots.txt              # Search crawler directives
├── sitemap.xml             # Search engine sitemap
├── README.md               # Documentation and setup guide
├── css/
│   ├── variables.css       # Theme variables, colors, glassmorphism tokens
│   └── style.css           # Global layout, section styles, utility animations
├── js/
│   ├── main.js             # Mobile nav, theme toggle, cursor follower, scroll spy
│   ├── animations.js       # Canvas particles, typing effect, scroll reveals, filters
│   └── contact-form.js     # Form validation and EmailJS submission
└── assets/
    ├── images/             # WebP/PNG images (e.g. profile.png)
    └── icons/              # SVG icons (if needed)
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` to open it in your browser. No `npm install` or build step required!

### Option 2: Local Web Server (Recommended)
If using VS Code, install the **Live Server** extension and click **Go Live**, or run:

```bash
# Using Python (Built-in)
python -m http.server 8000

# Using Node.js npx
npx serve .
```

Open `http://localhost:8000` in your browser.

---

## ✉️ Setting Up EmailJS (Optional)

To enable direct email notifications from the contact form:

1. Create a free account at [EmailJS.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g., Gmail) and create an **Email Template**.
3. In `js/contact-form.js`, replace:
   ```javascript
   await window.emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
   ```
   with your actual EmailJS Service ID and Template ID.

---

## 🌐 Deploying to GitHub Pages

1. **Initialize Git & Push Files to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` directory, then click **Save**.

Your portfolio will be live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` within 1-2 minutes!
