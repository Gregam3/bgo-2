import React from "react";
import "./styles/HandUI.css";

function HandUI({playerHand, selectedHandIndexes}) {
    return (
        <div className={"hand-ui"}>
            <button className={"play-button"} onClick={() => console.log("Play")}>Play</button>
            <button className={"combine-button"} onClick={() => console.log("Combine")}>Combine</button>
            <button className={"discard-button"} onClick={() => console.log("Combine")}>Discard</button>
        </div>
    );
}

export default HandUI;