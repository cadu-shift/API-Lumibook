module.exports = {
  createTestTransport() {
    return {
      sendMail: jest.fn().mockImplementation((mailOptions, callback) => {
        console.log('E-mail simulado enviado para:', mailOptions.to);
        callback(null, { response: '250 OK' });
      })
    };
  },

  validateEmailContent(content, expectedStrings) {
    expectedStrings.forEach(str => {
      if (!content.includes(str)) {
        throw new Error(`Conteúdo de e-mail não contém: "${str}"`);
      }
    });
  }
};