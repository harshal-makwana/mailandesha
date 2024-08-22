const express = require('express');
const router = express.Router();
const EmailService = require('../services/email.service');
const Email = require('../models/email.model');

const emailService = new EmailService(); // Create an instance of EmailService

router.post('/email', async (req, res) => {
   
  const {recipients,subject,senderEmail,emailHtml} = req.body.data

  try {  
    recipients.pop()
    const email = new Email(recipients,subject,senderEmail,emailHtml);
    await emailService.sendEmail(email); // Call sendEmail on the instance
    res.status(201).send({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error sending email' });
  }
});

router.post('/generate-email', async (req, res) => {
  const { prompt } = req.body;
  try {
    const generatedText = await emailService.generateEmailContent(prompt);
    res.json({ generatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;