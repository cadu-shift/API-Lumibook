// tests/notifications/notificationManualTest.js
require('dotenv').config();
const EmailService = require('../../src/Infrastructure/services/EmailService');

async function testConnection() {
  try {
    console.log('Verificando conexão com servidor SMTP...');
    await EmailService.transporter.verify();
    console.log('✅ Conexão SMTP estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Falha na conexão SMTP:');
    console.error('Código:', error.code);
    console.error('Mensagem:', error.message);
    
    if (error.code === 'ESOCKET') {
      console.log('\nSoluções possíveis:');
      console.log('1. Verifique se o servidor SMTP está correto');
      console.log('2. Confira se a porta não está bloqueada');
      console.log('3. Teste com Mailtrap (recomendado para desenvolvimento)');
    }
    
    return false;
  }
}

async function testEmailSending() {
  const connectionOk = await testConnection();
  if (!connectionOk) return;

  try {
    console.log('\nEnviando e-mail de teste...');
    await EmailService.send('loanReminder', process.env.TEST_EMAIL, {
      userName: 'Usuário Teste',
      itemTitle: 'Livro de Exemplo',
      dueDate: new Date().toLocaleDateString()
    });
    console.log('✅ E-mail enviado com sucesso!');
  } catch (error) {
    console.error('❌ Falha no envio:');
    console.error(error);
  }
}

testEmailSending();