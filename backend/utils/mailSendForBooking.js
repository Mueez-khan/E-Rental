
const nodeMailer = require("nodemailer");

require("dotenv").config();

const mailSend = async (email , title , body) =>{

    try{

        const transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST, 
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }

        })

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


        const info = {
            from: 'E_rental System' ,
            to: `${email}`,
            subject: `🎉 Booking Confirmed: Plot ${plot._id}`,
            html: `
              <p>Dear ${guestDetails.name},</p>
              <p>We are delighted to inform you that your booking for the plot at <strong>${plot.location}</strong> has been confirmed.</p>
              <p>Here are the details:</p>
              <ul>
                <li>Plot Location: ${plot.location}</li>
                <li>Price: ${plot.price}</li>
                <li>Booking Date: ${new Date().toLocaleDateString()}</li>
              </ul>
              <p>We hope you have an amazing stay!</p>
              <p>Best regards,</p>
              <p>The E-Rental Team</p>
            `,
          };

        
        
        console.log(info);

        return info;
    }
    catch(err)
    {
    console.log(err);
    
    }

}


module.exports = mailSend;