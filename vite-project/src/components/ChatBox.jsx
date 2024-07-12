import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css';
const ChatBox = ({ socket, roomCode, userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        typeof msg === 'string' ? { text: msg } : msg
      ]);
    });

    return () => socket.off('chat message');
  }, [socket]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage && socket) {
      socket.emit('chat message', { text: inputMessage, username: userId }, roomCode);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.username && <strong>{msg.username}:</strong>} {msg.text || msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;