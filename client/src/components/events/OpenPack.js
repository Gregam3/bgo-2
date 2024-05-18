import React from "react";
import Card from "../Card";
import "../styles/OpenPackEvent.css";

const PackPhase = {
    OPEN_PACK: "OPEN_PACK",
    CHOOSE_CARD: "CHOOSE_CARD",
    ADD_CARD_TO_DECK: "ADD_CARD_TO_DECK",
};

class OpenPack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packPhase: PackPhase.OPEN_PACK,
            selectedCard: null,
        };
        this.handleCardSelect = this.handleCardSelect.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({packPhase: PackPhase.CHOOSE_CARD});
        }, 1000);
    }

    handleCardSelect(card) {
        this.setState({packPhase: PackPhase.ADD_CARD_TO_DECK, selectedCard: card}, () => {
            setTimeout(() => {
                this.props.onPackOpened(card);
            }, 500);
        });
    }

    render() {
        const {packData} = this.props;
        const {packPhase, selectedCard} = this.state;

        console.log("Pack Data", packData);

        return (
            <div className={`pack-card-container ${packPhase}`}>
                {packPhase === PackPhase.CHOOSE_CARD && (
                    packData.possibleCards.map((card) => (
                        <div key={card.id} onClick={() => this.handleCardSelect(card)}>
                            <Card card={card}/>
                        </div>
                    ))
                )}
                {packPhase === PackPhase.ADD_CARD_TO_DECK && (
                    <div className="selected-card">
                        <Card card={selectedCard}/>
                    </div>
                )}
            </div>
        );
    }
}

export default OpenPack;