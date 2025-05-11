// templates/emailTemplates.js
const bookingConfirmationEmail = (guestDetails, plotId) => `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 80%;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4CAF50;
        color: #ffffff;
        padding: 10px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 0.8em;
        color: #777;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #ffffff;
        background-color: #4CAF50;
        text-decoration: none;
        border-radius: 5px;
      }
      .button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Booking Confirmed!</h1>
      </div>
      <div class="content">
        <p>Dear ${guestDetails.name},</p>
        <p>We are pleased to inform you that your booking for Plot ${plotId} has been confirmed.</p>
        <p>Thank you for choosing our service!</p>
        <a href="#" class="button">View Your Booking</a>
      </div>
      <div class="footer">
        <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
      </div>
    </div>
  </body>
  </html>
`;

const bookingNotificationEmail = (ownerDetails, guestDetails, plotId) => `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 80%;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #2196F3;
        color: #ffffff;
        padding: 10px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 0.8em;
        color: #777;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #ffffff;
        background-color: #2196F3;
        text-decoration: none;
        border-radius: 5px;
      }
      .button:hover {
        background-color: #1976D2;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Booking Alert!</h1>
      </div>
      <div class="content">
        <p>Dear ${ownerDetails.owner.userName},</p>
        <p>Your plot (ID: ${plotId}) has been booked by ${guestDetails.name}.</p>
        <p>Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${guestDetails.name}</li>
          <li><strong>Email:</strong> ${guestDetails.email}</li>
          <li><strong>Phone:</strong> ${guestDetails.phone}</li>
        </ul>
        <p>Thank you for using our service!</p>
        <a href="#" class="button">View Booking Details</a>
      </div>
      <div class="footer">
        <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
      </div>
    </div>
  </body>
  </html>
`;

module.exports = {
  bookingConfirmationEmail,
  bookingNotificationEmail
};
