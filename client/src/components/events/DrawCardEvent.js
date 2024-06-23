import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';
import {useEffect} from "react";
import {gameStateUpdater} from "../../App";

const DrawCardEvent = ({eventData, gameState, playerId, playerFinishedEvent}) => {
    useEffect(() => {
        gameStateUpdater.drawCardsFromDeck(gameState, playerId, eventData.repeatTimes);
        playerFinishedEvent(null);
    }, []);

    return null;
};

export default withGameEvent(DrawCardEvent);
