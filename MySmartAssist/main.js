const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;

       // ...existing code...
        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });       
            const data = await response.json();
            appendMessage(
                data.response?.message || data.response?.reply || data.response || "Sorry, I didn't understand that.",
                'bot'
            );
        } catch (err) {
            appendMessage("Error connecting to assistant.", 'bot');
        }
    // ...existing code...
    sendButton.disabled = false;
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});