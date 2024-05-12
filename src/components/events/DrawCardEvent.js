import GameEventComponent from "./GameEventComponent";
import GameStateUpdater from "../utility/GameStateUpdater";

class DrawCardEvent extends GameEventComponent {
    onEventStart() {
        console.log("Draw Card Event Started");
        const {gameState} = this.props;
        this.props.setGameState(GameStateUpdater.drawCardToHand(gameState, gameState.playerDeck[0]));
        this.endEvent();
    }

    render() {
        console.log("Draw Card Event Rendered");
        return null;
    }
}

export default DrawCardEvent;