import React, { useState } from "react";
import "./ChatPanel.css";

function ChatPanel() {
  const [isHidden, setIsHidden] = useState(false);

  const handleCloseClick = () => {
    setIsHidden(true);
  };

  const handleOpenClick = () => {
    setIsHidden(false);
  };

  return (
    <>
      {isHidden ? (
        <div className="open-icon" onClick={handleOpenClick}>
          <span>C</span>
        </div>
      ) : (
        <div className="chat-panel">
          Chat
          <span className="close-button" onClick={handleCloseClick}>
            x
          </span>
        </div>
      )}
    </>
  );
}

export default ChatPanel;
