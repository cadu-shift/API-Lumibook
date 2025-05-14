class Notification {
  constructor({ type, recipient, content, status = 'pending' }) {
    this.type = type; //Tipo de notificacao (sms, email, etc)
    this.recipient = recipient; //Destinatario da notificacao
    this.content = content; //Conteudo da notificacao
    this.status = status; //Status da notificacao (pending, sent, failed)
    this.createdAt = new Date(); //Data de criacao da notificacao
  }

  markAsSent() {
    this.status = 'sent';
    this.sentAt = new Date();
  }

  markAsFailed() {
    this.status = 'failed';
  }
}

module.exports = Notification;