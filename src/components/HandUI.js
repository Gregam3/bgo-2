import React from "react";


function HandUI({playerHand, selectedHandIndexes}) {
    return (
        <div className={"hand-ui"}>
            <button onClick={() => console.log("Play")}>Play</button>
            <button onClick={() => console.log("Combine")}>Combine</button>
            <button onClick={() => console.log("Combine")}>Discard</button>
        </div>
    );
}

export default HandUI;