import React from "react";
import OpenPack from "./OpenPack";
import GameStateUpdater from "../utility/GameStateUpdater";
import GameEventComponent from "./GameEventComponent";

class DraftDeckEvent extends GameEventComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentPackIndex: 0,
            selectedCard: [],
        };
    }

    handlePackOpened = (selectedCard) => {
        const {currentPackIndex} = this.state;
        const {numberOfPacksToOpen, gameState} = this.props;

        if (currentPackIndex + 1 < numberOfPacksToOpen) {
            this.setState({currentPackIndex: currentPackIndex + 1, selectedCard});
            // Add selected cards to the player's deck in the game state
            this.props.setGameState(GameStateUpdater.addSelectedCardToDeck(gameState, selectedCard));
        } else {
            console.log("Draft Deck Event Ended");
            this.onEventEnd();
        }
    };

    render() {
        const {currentPackIndex} = this.state;
        const {draftData} = this.props;

        return (
            <div className="draft-deck-container">
                <h1>Draft Deck</h1>
                <OpenPack
                    key={currentPackIndex}
                    packData={draftData}
                    onPackOpened={this.handlePackOpened}
                />
            </div>
        );
    }
}

export default DraftDeckEvent;