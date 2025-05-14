module.exports = {
  loanReminder: {
    subject: 'Lembrete de Devolução - ${itemTitle}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lembrete de Devolução</title>
      </head>
      <body>
        <h1>Lembrete de Devolução</h1>
        <p>Olá \${userName},</p>
        <p>O item "\${itemTitle}" deve ser devolvido até \${dueDate}.</p>
        <p>Por favor, renove ou devolva o material para evitar multas.</p>
      </body>
      </html>
    `
  },
  reservationAvailable: {
    subject: 'Reserva Disponível - ${itemTitle}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reserva Disponível</title>
      </head>
      <body>
        <h1>Reserva Disponível</h1>
        <p>Olá \${userName},</p>
        <p>O item "\${itemTitle}" que você reservou está agora disponível.</p>
        <p>Você tem 48 horas para retirá-lo na biblioteca.</p>
      </body>
      </html>
    `
  }
};