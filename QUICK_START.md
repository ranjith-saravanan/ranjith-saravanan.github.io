# Quick Start Guide

## 🎯 Your Portfolio is Ready!

This repository now contains a fully functional portfolio website ready for GitHub Pages deployment.

## 📋 Quick Checklist

### 1. Enable GitHub Pages (2 minutes)
- [ ] Go to repository **Settings**
- [ ] Click **Pages** in the left sidebar
- [ ] Under **Source**, select **main** branch
- [ ] Click **Save**
- [ ] Wait 1-2 minutes for deployment
- [ ] Visit: https://ranjith-saravanan.github.io

### 2. Customize Your Portfolio (10 minutes)
Open `index.html` and update:
- [ ] Contact email (search for `your.email@example.com`)
- [ ] LinkedIn URL (search for `yourprofile`)
- [ ] Twitter handle in footer
- [ ] Project links (replace `#` with actual URLs)
- [ ] About section with your story
- [ ] Skills to match your expertise
- [ ] Projects with your actual work

### 3. Optional Enhancements
- [ ] Add your profile photo (replace icon in About section)
- [ ] Customize color scheme in `style.css` (`:root` section)
- [ ] Add more projects
- [ ] Set up custom domain
- [ ] Add Google Analytics

## 🎨 Customization Examples

### Change Color Scheme
Edit the `:root` section in `style.css`:
```css
:root {
    --primary-color: #667eea;  /* Change this */
    --secondary-color: #764ba2; /* And this */
}
```

### Add Your Photo
Replace this in the About section of `index.html`:
```html
<div class="image-placeholder">
    <i class="fas fa-user fa-5x"></i>
</div>
```

With this:
```html
<div class="about-image">
    <img src="your-photo.jpg" alt="Your Name" style="border-radius: 50%; width: 300px; height: 300px; object-fit: cover;">
</div>
```

### Update Projects
Each project card in `index.html` has this structure:
```html
<div class="project-card">
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Description here</p>
        <div class="project-tags">
            <span class="tag">Tech1</span>
            <span class="tag">Tech2</span>
        </div>
        <div class="project-links">
            <a href="YOUR_GITHUB_URL" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="YOUR_DEMO_URL" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

## 📚 Documentation

- **GITHUB_PAGES_SETUP.md** - Complete GitHub Pages setup instructions
- **README.md** - Project overview and features

## 🚀 Making Updates

After making changes:
```bash
git add .
git commit -m "Update portfolio content"
git push
```

Your site will automatically update within 1-2 minutes!

## 🆘 Need Help?

Check these resources:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [HTML/CSS Tutorial](https://www.w3schools.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## ✨ Features Included

✅ Responsive design (mobile, tablet, desktop)
✅ Smooth scrolling navigation
✅ Animated sections
✅ Professional gradient design
✅ Contact form structure
✅ Social media links
✅ Project showcase
✅ Skills display
✅ Optimized performance
✅ SEO-friendly structure

---

**🎉 Congratulations! Your portfolio is ready to go live!**
