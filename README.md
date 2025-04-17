# Skills Development Program Website

A modern, responsive website for a skills development program with course modules, registration functionality, and WhatsApp integration.

## Features

- Responsive design that works on all devices
- Interactive course module listings with filtering and search
- Registration form with validation
- WhatsApp integration for communication
- Modern UI with smooth animations and transitions
- Multiple course modules with detailed descriptions

## Enhanced Features

1. **Module Filtering**: Filter modules by category (Technical, Business, Design)
2. **Module Search**: Search for specific modules based on keywords
3. **Form Validation**: Client-side validation for all form fields
4. **Interactive Elements**: Visual feedback when interacting with the site
5. **WhatsApp Integration**: Automatic WhatsApp group linking after registration
6. **Responsive Design**: Optimized for all screen sizes from mobile to desktop

## Setup Instructions

1. Clone the repository to your local machine:
```
git clone <repository-url>
```

2. Open the `index.html` file in your web browser to view the website.

3. For development, you can use any local server like Live Server extension for VS Code.

## File Structure

- `index.html` - Main HTML structure of the website
- `styles.css` - CSS styles for the website design
- `script.js` - JavaScript for interactive functionality
- `README.md` - Project documentation

## Customization

You can customize the website by:

1. Modifying the content in `index.html`
2. Updating colors and styling in `styles.css`
3. Adding or modifying features in `script.js`

### WhatsApp Integration

To update the WhatsApp link, modify the following in `script.js`:

```javascript
const whatsappPopup = document.createElement('div');
whatsappPopup.className = 'whatsapp-popup';
whatsappPopup.innerHTML = `
    <div class="whatsapp-popup-content">
        <span class="close-popup">&times;</span>
        <h3>WhatsApp Group Information</h3>
        <p>Thank you for registering! Please join our WhatsApp group for course updates:</p>
        <p class="whatsapp-link">https://chat.whatsapp.com/YOUR-GROUP-LINK-HERE</p>
        <p>Contact us at: YOUR-PHONE-NUMBER</p>
    </div>
`;
```

### Module Customization

To add or modify modules, update the corresponding HTML in `index.html` and the filters in `script.js`.

## Browser Compatibility

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome) 