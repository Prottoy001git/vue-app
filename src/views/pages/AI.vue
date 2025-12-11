<script setup>
const BASE_API_URL = 'http://127.0.0.1:8000/api';
import { ref, nextTick } from 'vue';
import axios from 'axios';

// Reactive state for the entire chat application
const messages = ref([]);
const userMessage = ref('');
const isLoading = ref(false);
const chatboxRef = ref(null); // Ref for scrolling

/**
 * Scrolls the chat area to the bottom after new messages are added.
 */
function scrollToBottom() {
    nextTick(() => {
        if (chatboxRef.value) {
            chatboxRef.value.scrollTop = chatboxRef.value.scrollHeight;
        }
    });
}

/**
 * Sends the user message and conversation history to the Laravel backend.
 */
async function sendMessage() {
    if (!userMessage.value.trim() || isLoading.value) {
        return;
    }

    const currentMessage = userMessage.value.trim();
    userMessage.value = ''; // Clear input immediately
    isLoading.value = true;

    // 1. Add the user's message to the history
    messages.value.push({
        sender: 'User',
        text: currentMessage,
        id: Date.now() + 1
    });
    scrollToBottom();

    // 2. Prepare the payload for the API
    // We send the entire current chat history to the backend
    // The backend will convert this into the format required by the Gemini API (e.g., Parts/Contents)
    const payload = {
        messages: messages.value
            .filter(msg => msg.sender === 'User' || (msg.sender === 'Gemini' && !msg.loading))
            .map(msg => ({
                role: msg.sender === 'User' ? 'user' : 'model',
                text: msg.text
            }))
    };


    // 3. Add a temporary loading message for Gemini's response
    const geminiLoadingId = Date.now() + 2;
    messages.value.push({
        sender: 'Gemini',
        text: '...', // Placeholder for loading
        id: geminiLoadingId,
        loading: true
    });
    scrollToBottom();

    try {
        // 4. API Call to your Laravel Backend
        // You'll need a new route for chat: e.g., POST /api/ai/chat
        const response = await axios.post(`${BASE_API_URL}/ai/chat`, payload);
        const aiResponseText = response.data.ai_response;

        // 5. Replace the temporary loading message with the actual response
        const loadingMessageIndex = messages.value.findIndex(m => m.id === geminiLoadingId);
        if (loadingMessageIndex !== -1) {
            messages.value[loadingMessageIndex].text = aiResponseText;
            messages.value[loadingMessageIndex].loading = false;
        } else {
            // Fallback: add as a new message if somehow the index was lost
            messages.value.push({ sender: 'Gemini', text: aiResponseText, id: Date.now() + 3 });
        }

    } catch (error) {
        // 6. Handle errors
        const loadingMessageIndex = messages.value.findIndex(m => m.id === geminiLoadingId);
        if (loadingMessageIndex !== -1) {
            messages.value[loadingMessageIndex].text = 'Sorry, an error occurred while connecting to Gemini.';
            messages.value[loadingMessageIndex].loading = false;
            messages.value[loadingMessageIndex].error = true;
        }
        console.error('Chat API call failed:', error);
    } finally {
        isLoading.value = false;
        scrollToBottom();
    }
}
</script>

<template>
    <div class="chat-container">
        <header class="chat-header">
            <h2>🤖 Gemini Chat Assistant</h2>
        </header>

        <div class="chat-messages" ref="chatboxRef">
            <div v-for="msg in messages" :key="msg.id" :class="['message', msg.sender.toLowerCase()]">
                <span class="sender-name">{{ msg.sender }}:</span>
                <div :class="['message-bubble', { 'is-loading': msg.loading, 'is-error': msg.error }]">
                    <span v-if="msg.loading" class="typing-indicator">... thinking</span>
                    <p v-else>{{ msg.text }}</p>
                </div>
            </div>
        </div>

        <form @submit.prevent="sendMessage" class="chat-input-form">
            <input type="text" v-model="userMessage" placeholder="Type your message here..." :disabled="isLoading"
                required />
            <button type="submit" :disabled="!userMessage.trim() || isLoading">
                <span v-if="isLoading">💬</span>
                <span v-else>Send</span>
            </button>
        </form>
    </div>
</template>

<style scoped>
/* --- Styles for Chatbox Interface --- */
.chat-container {
    max-width: 700px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    height: 80vh;
    /* Set a fixed height for the chat area */
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

.chat-header {
    background-color: #007bff;
    color: white;
    padding: 15px;
    text-align: center;
}

.chat-messages {
    flex-grow: 1;
    /* Takes up all available space */
    padding: 20px;
    overflow-y: auto;
    /* Enable scrolling for history */
    background-color: #f8f8f8;
}

.message {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
}

.sender-name {
    font-weight: bold;
    min-width: 60px;
    text-align: right;
    margin-right: 10px;
}

.message-bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 18px;
    line-height: 1.4;
    word-break: break-word;
}

/* User Messages */
.message.user {
    justify-content: flex-end;
    flex-direction: row-reverse;
}

.message.user .sender-name {
    display: none;
}

.message.user .message-bubble {
    background-color: #dcf8c6;
    /* Light green */
    color: #000;
    border-bottom-right-radius: 2px;
}

/* Gemini Messages */
.message.gemini {
    justify-content: flex-start;
}

.message.gemini .message-bubble {
    background-color: #e5e5ea;
    /* Light gray */
    color: #000;
    border-bottom-left-radius: 2px;
}

/* Loading/Error States */
.message-bubble.is-loading {
    background-color: #ffeaa7;
    /* Yellowish for loading */
}

.typing-indicator {
    font-style: italic;
    color: #666;
}

.message-bubble.is-error {
    background-color: #ff7675;
    /* Reddish for error */
    color: white;
}


/* Input Form */
.chat-input-form {
    display: flex;
    padding: 15px;
    background-color: white;
    border-top: 1px solid #eee;
}

.chat-input-form input {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 16px;
}

.chat-input-form button {
    background-color: #42b983;
    /* Vue Green */
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-input-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>