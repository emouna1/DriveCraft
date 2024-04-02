
// controllers/forgotPasswordController.js
const crypto = require('crypto');
const PasswordResetToken = require('../models/Password');
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails
const bcrypt = require('bcryptjs');
const {User} = require('../models/user')

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        // Generate token
        const token = crypto.randomBytes(20).toString('hex');
        
        // Store token in database
        await PasswordResetToken.create({ email, token });

        // Send password reset email
        await sendResetEmail(email, token);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error('Error requesting password reset:', err);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body;
    try {
        // Find token in database
        const resetToken = await PasswordResetToken.findOne({ where: { email, token } });
        if (!resetToken) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user's password (you need to implement this part)
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
         // Hash the new password
             const hashedPassword = await bcrypt.hash(newPassword, 12);

          // Update user's password with the hashed password
             user.password = hashedPassword;
             await user.save();
        

        // Delete the token from the database
        await resetToken.destroy();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

async function sendResetEmail(email, token) {
    try {
        // Create a nodemailer transporter
            const transporter = nodemailer.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: "emnachrif@isticbc.org",
                    pass: "IUNX2Bf46mMZbstY",
                },
            });

        // Compose email message
        const mailOptions = {
            from: 'emnachrif@isticbc.org', // Sender address
            to: email, // List of recipients
            subject: 'Password Reset', // Subject line
            html: `
                    <p>Hello,</p>
                    <p>You recently requested a password reset.
                    Code is token= ${token} Please click the link below to reset your password:</p>
                    <p><a href="http://localhost:4200/auth/Forgot?debug=true#email-code?">Reset Password</a></p>
                    <p>If you did not request a password reset, you can safely ignore this email.</p>
                    <p>Best regards,</p>
                    <p>Your Application Team</p>
                  ` // HTML body
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('An error occurred while sending the password reset email');
    }
}
