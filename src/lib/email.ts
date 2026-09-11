import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendBookingEmail = async (bookingData: any) => {
    const { customerName, customerEmail, pickupAddress, dropoffAddress, pickupDate, pickupTime, vehicleType, trackingId, estimatedFare, otp } = bookingData;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Booking Confirmation - Your Ride is Scheduled!',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #f59e0b; text-align: center;">Booking Confirmed!</h2>
        <p>Hello <strong>${customerName}</strong>,</p>
        <p>Thank you for choosing SwiftCab. Your booking has been received and is being processed.</p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #111827;">Ride Details:</h3>
          <p><strong>Tracking ID:</strong> ${trackingId}</p>
          <p><strong>OTP:</strong> ${otp}</p>
          <p><strong>Pickup:</strong> ${pickupAddress}</p>
          <p><strong>Drop-off:</strong> ${dropoffAddress}</p>
          <p><strong>Date:</strong> ${pickupDate}</p>
          <p><strong>Time:</strong> ${pickupTime}</p>
          <p><strong>Vehicle:</strong> ${vehicleType}</p>
          <p><strong>Estimated Fare:</strong> $${estimatedFare}</p>
        </div>
        <p>Our driver will contact you shortly before the pickup time. Share the OTP with your driver for verification.</p>
        <p style="color: #6b7280; font-size: 14px; text-align: center;">If you have any questions, please contact us at ${process.env.EMAIL_USER}</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
