import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';

const DrawCardEvent = ({ gameState, setGameState, endEvent }) => {
    const onEventStart = () => {
        console.log('Draw Card Event Started');
        setGameState(GameStateUpdater.drawCardToHand(gameState, gameState.playerDeck[0]));
        endEvent();
    };

    return null;
};

export default withGameEvent(DrawCardEvent);
