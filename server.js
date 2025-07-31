const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://127.0.0.1:5502' }));
app.use(express.json());

// Your send-email route
app.post('/send-email', async (req, res) => {
  const { name, email, subject, comments } = req.body;

  if (!name || !email || !subject || !comments) {
    return res.status(400).send('Please fill all fields.');
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'durgasaivaraprasadchan@gmail.com',
      pass: 'ccjl vnzj orco fhqo'  // use app password
    }
  });

  const mailOptions = {
    from: `"Contact Form" <your-own-gmail@gmail.com>`,
    to: 'mounikaakurathi89@gmail.com',
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${comments}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));