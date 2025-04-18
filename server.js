const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Twilio configuration
const accountSid = 'your_account_sid'; // Replace with your Twilio Account SID
const authToken = 'your_auth_token'; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/api/submit-details', (req, res) => {
    const { name, email } = req.body;
    // Send details to WhatsApp
    client.messages
        .create({
            body: `New user request: Name: ${name}, Email: ${email}`,
            from: 'whatsapp:+14155238886', // Twilio sandbox number
            to: 'whatsapp:+923455370104'
        })
        .then(message => {
            console.log(`Message sent: ${message.sid}`);
            // For now, auto-approve for testing
            res.json({ approved: true });
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.status(500).json({ approved: false });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 