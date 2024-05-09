import React from "react";
import "./styles/HandUI.css";

function HandUI({playerHand, selectedHandIndexes}) {
    return (
        <div className={"hand-ui"}>
            <button className={"play-button"} disabled={selectedHandIndexes.length !== 1}
                    onClick={() => console.log("Play")}>Play
            </button>
            <button className={"combine-button"} disabled={selectedHandIndexes.length !== 2}
                    onClick={() => console.log("Combine")}>Combine
            </button>
        </div>
    );
}

export default HandUI;