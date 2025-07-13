import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css'; // ← CSS externe

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setConversationStarted(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box className={`chatbot-container ${isDarkMode ? 'dark' : ''}`}>
      <IconButton onClick={toggleDarkMode} className="toggle-theme-btn">
        <Brightness4Icon />
      </IconButton>

      <Box className="chatbot-header">
        <ChatBubbleOutlineIcon className="chat-icon" />
        <Box className="chatbot-title">
          Bonjour, comment puis-je vous aider ? <span role="img" aria-label="help">🙋‍♂👋</span>
        </Box>
      </Box>

      {conversationStarted && (
        <Box className={`chatbot-messages ${isDarkMode ? 'dark' : ''}`}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
            >
              <strong>{msg.sender === 'user' ? 'Vous' : 'Bot'}:</strong> {msg.text}
            </div>
          ))}
        </Box>
      )}

      <form onSubmit={handleSend} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez votre message..."
          required
          className={`chatbot-input ${isDarkMode ? 'dark' : ''}`}
        />
        <button type="submit" className="chatbot-send-btn">
          <SendIcon />
        </button>
      </form>
    </Box>
  );
};

export default ChatBot;
