 const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Configure nodemailer with your Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'umarvortex@gmail.com',
        pass: 'YOUR_APP_SPECIFIC_PASSWORD' // Use an App Password from Gmail
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Email content
    const mailOptions = {
        from: 'YOUR_GMAIL@gmail.com',
        to: 'YOUR_GMAIL@gmail.com',
        subject: 'New Registration Request',
        html: `
            <h3>New Registration Request</h3>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
        `
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Registration submitted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error processing registration' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});