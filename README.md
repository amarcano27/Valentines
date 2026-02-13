# Will You Be My Valentine? 💕

A beautiful, animated Valentine's Day website with interactive elements and celebration effects. Perfect for sending to that special someone!

## Features

- Animated gradient background with smooth color transitions
- 10 continuously floating hearts in the background
- Pulsing question box with glowing text
- Animated heart icon with heartbeat effect
- Three interactive response buttons: "Yes", "YES", and "FOREVER"
- Confetti celebration animation when a button is clicked
- 20 floating hearts that appear after selection
- Sparkle effects on button hover
- Fully responsive design for mobile and desktop
- Smooth animations and transitions throughout

## Quick Start

Simply open `index.html` in your web browser to view the Valentine's Day message!

## Deployment to GitHub Pages

Follow these steps to deploy your Valentine's website on GitHub Pages:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Valentine's Day website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/repository-name/`
   - GitHub Pages may take a few minutes to deploy

4. **Keep it private (optional)**
   - To keep the link unlisted, simply don't share the repository publicly
   - The website will only be accessible via the direct link
   - You can also make the repository private in Settings

## Customization

### Changing the Question
Edit the question text in `index.html`:
```html
<h1 class="question">Will you be my Valentine?</h1>
```

### Changing Response Messages
Edit the messages in `script.js`:
```javascript
case 'yes':
    message = "Your custom message here! 💕";
    break;
```

### Changing Colors
Modify the gradient colors in `style.css`:
```css
background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe);
```

### Button Text
Change button labels in `index.html`:
```html
<button class="btn btn-yes" onclick="handleResponse('yes')">
    Your Text Here
</button>
```

## Adding Photos

You can add personal photos to make it more special:

### Option 1: Background Image
Add this to `style.css` in the `.container` class:
```css
background-image: url('your-photo.jpg');
background-size: cover;
background-position: center;
background-blend-mode: overlay;
```

### Option 2: Add Photo in Question Box
Add an `<img>` tag in `index.html` inside the question box:
```html
<div class="question-box">
    <img src="your-photo.jpg" style="max-width: 300px; border-radius: 15px; margin-bottom: 20px;">
    <h1 class="question">Will you be my Valentine?</h1>
    <div class="heart-icon">💖</div>
</div>
```

## File Structure

```
valentine-website/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Technologies Used

- HTML5
- CSS3 (Animations, Gradients, Flexbox)
- Vanilla JavaScript (No dependencies!)

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use this project to ask someone to be your Valentine! 💖

## Tips

- Test the website before sending it to ensure everything works
- Consider adding a custom domain for a more personal touch
- You can add background music by including an `<audio>` tag in the HTML
- Personalize the colors to match your special someone's favorites

---

Made with 💕 for Valentine's Day
