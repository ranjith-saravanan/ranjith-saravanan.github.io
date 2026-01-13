# GitHub Pages Setup Guide

This guide will help you configure your repository to publish your portfolio on GitHub Pages.

## Prerequisites

- A GitHub account
- Repository named `username.github.io` (where `username` is your GitHub username)

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/ranjith-saravanan/ranjith-saravanan.github.io`
2. Click on **Settings** (gear icon) at the top of the repository
3. Scroll down to the **Pages** section in the left sidebar (under "Code and automation")
4. Under **Source**, select the branch you want to deploy from:
   - Choose **main** (or **master**) branch
   - Leave the folder as **/ (root)**
5. Click **Save**

### 2. Wait for Deployment

- GitHub Pages will automatically build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when the deployment is successful
- Your site will be available at: `https://ranjith-saravanan.github.io`

### 3. Verify Your Site

- Click on the URL provided in the GitHub Pages section
- Your portfolio should now be live!

## Custom Domain (Optional)

If you want to use a custom domain:

1. In the GitHub Pages settings, enter your custom domain (e.g., `www.yourname.com`)
2. Configure your domain's DNS settings:
   - Add a CNAME record pointing to `ranjith-saravanan.github.io`
   - Or add A records pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

## Automatic Updates

Any changes you push to your repository will automatically update your site:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Your site will rebuild and redeploy automatically within a few minutes.

## Troubleshooting

### Site Not Loading

- Check that GitHub Pages is enabled in Settings
- Verify you're using the correct branch (main/master)
- Wait a few minutes for the initial deployment
- Clear your browser cache

### 404 Error

- Ensure `index.html` is in the root directory
- Check that the file is named exactly `index.html` (lowercase)
- Verify all referenced files (CSS, JS) have correct paths

### Styling Not Working

- Check browser console for errors
- Verify that `style.css` and `script.js` are in the root directory
- Ensure all file references use relative paths

## Repository Structure

```
ranjith-saravanan.github.io/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript file
├── _config.yml         # Jekyll configuration (optional)
└── README.md          # Documentation
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Jekyll Documentation](https://jekyllrb.com/docs/) (if using Jekyll themes)

## Support

If you encounter any issues:
1. Check the [GitHub Pages status](https://www.githubstatus.com/)
2. Review the [GitHub Community Forum](https://github.community/)
3. Contact GitHub Support if needed

---

**Note**: This portfolio uses vanilla HTML, CSS, and JavaScript, so it works with GitHub Pages without any build process. Changes are reflected immediately after pushing to the repository.
