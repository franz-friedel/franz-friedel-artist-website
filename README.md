# Franz Friedel - Personal Artist Website

A modern, responsive website for showcasing and selling contemporary art. Built with HTML5, CSS3, and JavaScript.

## Features

### 🎨 **Sections**
- **Home**: Hero section with call-to-action buttons
- **About**: Artist biography and artistic highlights
- **Collections**: Filterable artwork gallery with purchase options
- **Contact**: Contact form and social media links

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation

### ⚡ **Interactive Features**
- Smooth scrolling navigation
- Animated elements on scroll
- Collection filtering system
- Modal popups for artwork details
- Contact form with validation
- Mobile hamburger menu

### 🔍 **SEO Optimized**
- Meta tags and Open Graph data
- Structured data (JSON-LD)
- Semantic HTML structure
- Fast loading performance

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### 1. **Replace Placeholder Content**

#### Artist Information
- Update the artist name in the navigation and throughout the site
- Replace the artist bio in the About section
- Update contact information (email, phone, location)
- Add your actual social media links

#### Artwork
- Replace placeholder artwork with your actual pieces
- Update artwork titles, descriptions, prices, and dimensions
- Add high-quality images of your artwork

### 2. **Adding Real Images**

Replace the placeholder artwork divs with actual images:

```html
<!-- Replace this -->
<div class="artwork-placeholder">
    <i class="fas fa-palette"></i>
</div>

<!-- With this -->
<img src="path/to/your/artwork.jpg" alt="Artwork Title" class="artwork-image">
```

### 3. **Customizing Colors**

The main color scheme uses CSS custom properties. Update these in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --background-color: #fafafa;
}
```

### 4. **Contact Form Integration**

The contact form currently shows a success message. To make it functional:

1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form submission handler in `script.js`
3. Replace the simulated submission with actual API calls

### 5. **Payment Integration**

For selling artwork, integrate with:
- Stripe for credit card payments
- PayPal for alternative payment methods
- Square for in-person transactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minify Files**: Compress CSS and JavaScript for production
3. **Use CDN**: Serve static assets from a CDN
4. **Enable Caching**: Set appropriate cache headers

## Deployment

### Option 1: Static Hosting
- Upload files to services like Netlify, Vercel, or GitHub Pages
- No server configuration needed

### Option 2: Traditional Hosting
- Upload files to your web server
- Ensure proper file permissions

### Option 3: Custom Domain
- Point your domain to the hosting service
- Update the canonical URL in the HTML head

## Maintenance

### Regular Updates
- Keep artwork collections current
- Update contact information
- Add new pieces regularly
- Monitor contact form submissions

### Analytics
Consider adding Google Analytics or similar to track:
- Page views
- User engagement
- Contact form submissions
- Popular artwork pieces

## Support

For questions or customization help, refer to:
- HTML/CSS documentation
- JavaScript MDN resources
- Web development communities

## License

This website template is created for Franz Friedel's personal use. Feel free to adapt and modify as needed.

---

**Built with ❤️ for artists who want to showcase their work online**
