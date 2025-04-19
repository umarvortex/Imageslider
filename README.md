# Mehran University Top 110 MCQs

A web application for Mehran University students to take a timed test of 110 multiple-choice questions (MCQs). The application includes a user registration system with WhatsApp approval, a timed test interface, and a comprehensive results summary.

## Features

- **User Registration**: Collect user's information before granting access to the test
- **WhatsApp Approval**: User details are sent to the administrator's WhatsApp for approval
- **Timed Test**: 1 hour and 30 minutes timer for test completion
- **Interactive UI**: Modern, responsive interface with easy navigation between questions
- **Question Tracking**: Visual indicators to track answered and unanswered questions
- **Results Summary**: Comprehensive results including correct/wrong answers and final score
- **Certificate**: Printable certificate for users who achieve a passing score

## Technologies Used

- HTML5, CSS3, and JavaScript for frontend
- Node.js and Express for backend
- Twilio API for WhatsApp integration

## Setup and Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up Twilio:
   - Create a Twilio account at [twilio.com](https://www.twilio.com)
   - Set up WhatsApp sandbox
   - Update the `accountSid` and `authToken` in `server.js` with your Twilio credentials

4. Start the server:
   ```
   npm start
   ```
   
5. Access the application at `https://umarvortex.github.io/MUET-TEST/landing.html`

## Usage

1. Users enter their information in the popup form
2. Administrator receives the details on WhatsApp and approves access
3. Upon approval, users can access the test and have 1 hour 30 minutes to complete it
4. After completion or when time expires, users see their test results
5. Users with a passing score receive a certificate

## Customization

- Modify the MCQs in the `app.js` file to customize the questions
- Adjust the timer duration by changing the `timeLeft` variable in `app.js`
- Customize the UI by modifying the CSS in `styles.css`

## License

This project is open source and available under the MIT License.

## Author 

Created by Umar vortex for Mehran University students. 