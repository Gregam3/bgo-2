import React from "react";
import OpenPack from "./OpenPack";
import "../styles/OpenPackEvent.css";
import GameEventComponent from "./GameEventComponent";
import GameStateUpdater from "../utility/GameStateUpdater";

class OpenPackEvent extends GameEventComponent {
    handlePackOpened = (selectedCard) => {
        const {gameState} = this.props;
        this.props.setGameState(GameStateUpdater.addPlayerCardToDeck(gameState, selectedCard));
        // this.endEvent();
    };

    render() {
        const {packData} = this.props;
        return (
            <div className="open-pack-container">
                <h1>Open Pack</h1>
                <OpenPack packData={packData} onPackOpened={this.handlePackOpened}/>
                <h4>Click a card to add it to your deck</h4>
            </div>
        );
    }
}

export default OpenPackEvent;