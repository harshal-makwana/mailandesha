class Email {
    constructor(recipient, senderEmail, subject, body) {
      this.recipient = recipient;
      this.subject = subject;
      this.senderEmail = senderEmail
      this.body = body;
    }
  }
  
  module.exports = Email;