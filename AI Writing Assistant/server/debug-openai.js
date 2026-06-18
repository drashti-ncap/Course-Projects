const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Test spell check.' }
        ],
        max_tokens: 10,
        n: 1,
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('success', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('status', error.response?.status);
    console.error('data', JSON.stringify(error.response?.data, null, 2));
    console.error('message', error.message);
  }
})();