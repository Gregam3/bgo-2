import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';
import {useEffect} from "react";

const DrawCardEvent = ({ eventData, gameState, setGameState, playerId, playerFinishedEvent }) => {
    useEffect(() => {
        console.log('Draw Card Event Started');
        let newGameState = GameStateUpdater.drawCardsFromDeck(gameState, playerId, eventData.repeatTimes);
        setGameState(newGameState);
        playerFinishedEvent(newGameState);
    }, []);

    return null;
};

export default withGameEvent(DrawCardEvent);
