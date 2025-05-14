const EmailService = require('../../src/infrastructure/services/EmailService');
const nodemailer = require('nodemailer');

// Mock do nodemailer
jest.mock('nodemailer');

describe('EmailService', () => {
  let mockSendMail;

  beforeEach(() => {
    mockSendMail = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail
    });
  });

  it('deve enviar e-mail de lembrete corretamente', async () => {
    const testData = {
      userName: 'Teste',
      itemTitle: 'Livro Teste',
      dueDate: '01/01/2023'
    };

    await EmailService.send('loanReminder', 'test@example.com', testData);
    
    expect(mockSendMail).toHaveBeenCalled();
    const sentMail = mockSendMail.mock.calls[0][0];
    
    expect(sentMail.to).toBe('test@example.com');
    expect(sentMail.subject).toContain('Livro Teste');
    expect(sentMail.html).toContain('Teste');
  });

  it('deve lançar erro quando o template não existe', async () => {
    await expect(
      EmailService.send('templateInexistente', 'test@example.com', {})
    ).rejects.toThrow('Template templateInexistente não encontrado');
  });

  it('deve lançar erro quando o envio falha', async () => {
    mockSendMail.mockRejectedValue(new Error('Falha SMTP'));
    
    await expect(
      EmailService.send('loanReminder', 'test@example.com', {})
    ).rejects.toThrow('Falha SMTP');
  });
});