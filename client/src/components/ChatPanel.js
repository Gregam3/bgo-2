import React, { useState, useRef, useEffect } from "react";
import "./styles/ChatPanel.css";

function ChatPanel() {
  const [isHidden, setIsHidden] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleCloseClick = () => {
    setIsHidden(true);
  };

  const handleOpenClick = () => {
    setIsHidden(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setMessages([...messages, inputText]);
      setInputText("");
    }
  };

  return (
    <>
      {isHidden ? (
        <div className="open-icon" onClick={handleOpenClick}>
          <span>C</span>
        </div>
      ) : (
        <div className="chat-panel">
          <span className="close-button" onClick={handleCloseClick}>
            x
          </span>
          <div className="messages-container" ref={messagesContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className="message-bubble">
                {message}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="text-input"
            placeholder="Enter text..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}
    </>
  );
}

export default ChatPanel;
