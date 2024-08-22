const nodemailer = require('nodemailer');
const config = require("../config/mailConfig")
const axios = require('axios')
const { GoogleGenerativeAI } = require("@google/generative-ai")


class EmailService {
  async sendEmail(email) {
    const transporter = nodemailer.createTransport(config.smtp);
    const mailOptions = {
      from: email.senderEmail,
      to: email.recipient,
      subject: email.subject,
      html: email.body
    };
    await transporter.sendMail(mailOptions);
  }

  async generateEmailContent(prompt) {
    try {
      console.log("Service is called with prompt:", prompt);
      // Access your API key as an environment variable (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI("AIzaSyDhy8ufIQ4yXJ6lkOIILlA-6X5LSc9njzs");
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const text = `generate professional content to write in email from this prompt: \n${prompt} ,use '\n' if necessary`
       const result = await model.generateContent(text);
      const response = await result.response; 
      return response.text()
          
    } catch (error) {
      console.error('Error occurred:', error.response?.data || error.message);
      throw new Error(`Failed to generate email content: ${error.message}`);
    }
  }
}

module.exports = EmailService;