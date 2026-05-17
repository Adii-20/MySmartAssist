const axios = require('axios');

module.exports = async function sendToN8N(message) {
    const webhookUrl = 'https://aditya7211.app.n8n.cloud/webhook-test/chatbot'; // Use /webhook/ not /webhook-test/
    const response = await axios.post(webhookUrl, { message });
    return response.data;
};