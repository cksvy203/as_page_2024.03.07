// app.js 또는 서버 측 코드

const express = require('express');
const bodyParser = require('body-parser');
const Coolsms = require('coolsms-node-sdk');

const app = express();
const coolsms = new Coolsms({
    apiKey: 'YOUR_COOLSMS_API_KEY',
    apiSecret: 'YOUR_COOLSMS_API_SECRET'
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', async (req, res) => {
    // Process form data
    const formData = req.body;
    
    // Compose message
    const message = `접수 완료: ${formData.product}에 대한 접수가 완료되었습니다. 감사합니다.`;

    try {
        // Send SMS
        const response = await coolsms.send({
            type: 'SMS',
            text: message,
            to: formData.phoneNumber, // 고객 전화번호
            from: 'YOUR_COOLSMS_SENDER_NUMBER' // 발신자 전화번호
        });

        console.log('SMS sent:', response);
        // Redirect to the confirmation page
        res.redirect('/confirmation');
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).send('Error sending SMS');
    }
});

// Confirmation page route
app.get('/confirmation', (req, res) => {
    res.sendFile(__dirname + '/confirmation.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
