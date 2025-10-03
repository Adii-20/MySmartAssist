const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to append messages
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send message to backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    appendMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;

    try {
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Handle bot reply safely
        let botReply = "Sorry, I didn't understand that.";
        if (typeof data.response === "string") {
            botReply = data.response;
        } else if (data.response?.message) {
            botReply = data.response.message;
        } else if (data.response?.reply) {
            botReply = data.response.reply;
        }

        appendMessage(botReply, 'bot');

    } catch (err) {
        console.error("Error:", err);
        appendMessage("⚠️ Error connecting to assistant.", 'bot');
    }

    sendButton.disabled = false;
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});
