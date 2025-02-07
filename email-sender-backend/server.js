const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer Storage for Resume Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Nodemailer Transporter Setup (Use your Gmail credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manishyegurla95@gmail.com',  // Replace with your Gmail
        pass: 'dhxtwnnrswohhrnd'      // Use an App Password
    }
});

// Route to Send Emails
app.post('/send-emails', upload.single('resume'), async (req, res) => {
    try {
        const { subject, body, emails } = req.body;
        const emailList = emails.split(',').map(email => email.trim());
        const resumePath = req.file ? req.file.path : null;

        for (let email of emailList) {
            let mailOptions = {
                from: 'manishyegurla95@gmail.com',
                to: email,
                subject,
                text: body,
                attachments: resumePath ? [{ filename: 'resume.pdf', path: resumePath }] : []
            };

            await transporter.sendMail(mailOptions);
        }
        res.json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending emails' });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
