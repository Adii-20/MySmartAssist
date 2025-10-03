# Chatbot Application

This project is a chatbot application that integrates with n8n to provide intelligent responses to user queries. The application features a dark-themed interface and communicates with a webhook to send and receive messages.

## Project Structure

```
chatbot-app
├── src
│   ├── server.js         # Entry point of the application, sets up the Express server
│   └── n8n
│       └── webhook.js    # Logic to send user messages to the n8n webhook
├── public
│   ├── index.html        # Main HTML frontend page with chat interface
│   ├── styles.css        # CSS styles implementing a dark theme
│   └── main.js           # JavaScript logic for handling user input and responses
├── package.json          # Configuration file for npm with project dependencies
└── README.md             # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chatbot-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   node src/server.js
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to access the chatbot interface.

## Usage

- The chatbot will greet you with the message: "How can I help you today? I'm a smart genius assistant."
- You can type your queries in the chat interface, and the chatbot will respond using the n8n webhook.

## Technologies Used

- Node.js
- Express
- n8n
- HTML/CSS/JavaScript

## License

This project is licensed under the MIT License.