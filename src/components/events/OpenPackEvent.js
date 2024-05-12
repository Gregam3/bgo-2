import React from "react";
import Card from "../Card";
import "../styles/OpenPackEvent.css";
import GameEventComponent from "./GameEventComponent";
import GameStateUpdater from "../utility/GameStateUpdater";

class OpenPackEvent extends GameEventComponent {
    constructor(props) {
        super(props);
        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    handleCardSelect(card) {
        const { gameState } = this.props;
        GameStateUpdater.addPlayerCardToDeck(gameState, card);
        this.endEvent();
    }

    render() {
        const { packData } = this.props;
        return (
            <div className="open-pack-container">
                {packData.possibleCards.map((card) => (
                    <div key={card.id} onClick={() => this.handleCardSelect(card)}>
                        <Card card={card}/>
                    </div>
                ))}
            </div>
        );
    }
}

export default OpenPackEvent;