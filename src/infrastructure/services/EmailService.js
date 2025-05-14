const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplate');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true para porta 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        // Adicione estas opções para evitar problemas de conexão
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 10000 // 10 segundos de timeout
    });
  }

  async send(templateName, recipient, data) {
    try {
      const template = emailTemplates[templateName];
      if (!template) throw new Error(`Template ${templateName} não encontrado`);

      const { subject, html } = this.renderTemplate(template, data);

      await this.transporter.sendMail({
        from: `"Lumibook" <${process.env.EMAIL_FROM}>`,
        to: recipient,
        subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }

  // src/Infrastructure/services/EmailService.js
renderTemplate(template, data) {
  const replacePlaceholders = (str) => {
    return str.replace(/\\?\${([^{}]+)}/g, (match, escaped, key) => {
      // Se tiver barra invertida, mantém o placeholder sem substituir
      if (match.startsWith('\\')) return match.slice(1);
      // Caso contrário, substitui pelo valor do data
      return data[key] || '';
    });
  };

  return {
    subject: replacePlaceholders(template.subject),
    html: replacePlaceholders(template.html)
  };
  }
}

module.exports = new EmailService();