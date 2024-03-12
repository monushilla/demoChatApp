document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    const socket = io();

    // Send message
    function sendMessage(messageText) {
        socket.emit('chat message', messageText);
    }

    // Receive message
    socket.on('chat message', (message) => {
        const messageElement = document.createElement("div");
        const messageElementChild = document.createElement("div");
        messageElementChild.textContent = message;
        messageElementChild.classList.add("msg");
        messageElement.classList.add("msg-push");
        messageElement.appendChild(messageElementChild);
        chatMessages.appendChild(messageElement);

        // Scroll to bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Add event listener for the send button
    sendButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {
            const messageElement = document.createElement("div");
            const messageElementChild = document.createElement("div");
            messageElementChild.textContent = messageText;
            messageElementChild.classList.add("msg");
            messageElement.classList.add("msg-pop");
            messageElement.appendChild(messageElementChild);
            chatMessages.appendChild(messageElement);

            // Scroll to bottom of chat messages
            chatMessages.scrollTop = chatMessages.scrollHeight;
            sendMessage(messageText);

            // Clear input field after sending message
            messageInput.value = "";
        }
    });
});
