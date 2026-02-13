# Will You Be My Valentine? 💕

A beautiful, animated Valentine's Day website with interactive elements and celebration effects. Perfect for sending to that special someone!

## Features

- **Photo Gallery**: Display 3 personal photos in beautiful heart and circle frames
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

## Adding Your Personal Photos

The website includes a beautiful photo gallery that displays 3 photos in themed frames!

### How to Add Photos:

1. **Place your photos** in the `images/` directory
2. **Name them** as follows:
   - `photo1.jpg` - First photo (heart frame)
   - `photo2.jpg` - Second photo (circle frame)
   - `photo3.jpg` - Third photo (heart frame)
3. **Refresh** your browser and the photos will appear automatically!

### Photo Guidelines:

- **Formats**: JPG, PNG, or GIF
- **Size**: Keep under 2MB per image for fast loading
- **Dimensions**: 800x800px or larger recommended
- **Orientation**: Square or portrait photos work best

### Features:

- **Animated Frames**: Photos appear in pulsing heart and circle frames
- **Hover Effects**: Frames lift and scale when you hover over them
- **Smart Placeholders**: Heart emojis show when photos aren't uploaded yet
- **Responsive**: Frames adapt beautifully to mobile and desktop screens

### Additional Customization Options:

#### Option 1: Background Image
Add a romantic background photo in `style.css`:
```css
.container {
    background-image: url('images/background.jpg');
    background-size: cover;
    background-position: center;
    background-blend-mode: overlay;
}
```

#### Option 2: More Photos
To add more photos, duplicate a photo frame in `index.html`:
```html
<div class="photo-frame heart-frame">
    <img src="images/photo4.jpg" alt="Special moment" class="gallery-photo" id="photo4">
    <div class="photo-placeholder">
        <span>💕</span>
        <p>Add photo4.jpg</p>
    </div>
</div>
```

## File Structure

```
valentine-website/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
├── README.md           # This file
└── images/             # Photo gallery directory
    ├── README.md       # Image upload instructions
    ├── photo1.jpg      # Your first photo (add here)
    ├── photo2.jpg      # Your second photo (add here)
    └── photo3.jpg      # Your third photo (add here)
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
