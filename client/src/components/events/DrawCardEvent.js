import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';
import {useEffect} from "react";

const DrawCardEvent = ({ eventData, gameState, setGameState, playerId, playerFinishedEvent }) => {
    useEffect(() => {
        console.log('Draw Card Event Started', eventData);

        let newGameState;

        if (eventData) {
            newGameState = GameStateUpdater.drawCardsFromDeck(gameState, playerId, eventData.repeatTimes);
        } else {
            newGameState = GameStateUpdater.drawCardFromDeck(gameState, playerId);
        }
        setGameState(newGameState);
        playerFinishedEvent(newGameState);

        console.log('Draw Card Event Finished');
    }, [eventData]);

    return null;
};

export default withGameEvent(DrawCardEvent);
