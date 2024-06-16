import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';
import {useEffect} from "react";
import {gameStateUpdater} from "../../App";

const DrawCardEvent = ({ eventData, gameState, playerId, playerFinishedEvent }) => {
    useEffect(() => {
        let newGameState;

        if (eventData) {
            newGameState = gameStateUpdater.drawCardsFromDeck(gameState, playerId, eventData.repeatTimes);
        } else {
            newGameState = gameStateUpdater.drawCardFromDeck(gameState, playerId);
        }
        playerFinishedEvent(newGameState);
    }, [eventData]);

    return null;
};

export default withGameEvent(DrawCardEvent);
