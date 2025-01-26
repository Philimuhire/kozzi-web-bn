import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact'; 

class ContactController {
    static async sendMessage(req: Request, res: Response) {
        const { name, email, phoneNumber, message } = req.body;

        try {
            const contactMessage = await Contact.create({ name, email, phoneNumber, message });
        } catch (error) {
            console.error('Error saving contact message:', error);
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_RECEIVER,
            subject: `Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send message.' });
        }
    }
}

export default ContactController;