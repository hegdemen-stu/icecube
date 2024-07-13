import React, { useState, useEffect, useRef, useCallback } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './Chatbox.css';

const ChatBox = ({ socket, roomCode, userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.off('chat message');
  }, [socket]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (inputMessage && socket) {
      socket.emit('chat message', inputMessage, roomCode);
      setInputMessage('');
      setShowEmojiPicker(false);
    }
  }, [inputMessage, socket, roomCode]);

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prevInput) => prevInput + emojiObject.emoji);
    inputRef.current?.focus();
  };

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  return (
    <div className="chat-box">
      <div className="chat-messages" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <div className="emoji-picker-container" ref={emojiPickerRef}>
          <button type="button" className="chatbox_emoji" onClick={toggleEmojiPicker}>
            😊
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;