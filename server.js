const express = require('express');
const path = require('path');
const app = express();
const webhook = require("./webhook");


app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/message', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const webhookResponse = await webhook(userMessage);

        // If webhookResponse is an array with an object containing 'output'
        let reply = webhookResponse;
        if (Array.isArray(webhookResponse) && webhookResponse[0]?.output) {
            reply = webhookResponse[0].output;
        } else if (webhookResponse.output) {
            reply = webhookResponse.output;
        } else if (webhookResponse.message) {
            reply = webhookResponse.message;
        } else if (webhookResponse.reply) {
            reply = webhookResponse.reply;
        } else if (typeof webhookResponse === 'object') {
            reply = JSON.stringify(webhookResponse);
        }

        res.json({ response: reply });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message to webhook' });
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
