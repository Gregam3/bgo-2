import React, {useRef, useState} from 'react';
import OpenPack from './OpenPack';
import GameStateUpdater from '../utility/GameStateUpdater';
import withGameEvent from './framework/withGameEvent';
import {WaitingForOtherPlayers} from "./WaitingForOtherPlayers";
import {gameStateUpdater} from "../../App";

const DraftDeckEvent = ({numberOfPacksToOpen, gameState, playerId, draftData, playerFinishedEvent}) => {
    const currentPackIndex = useRef(0);
    const [selectedCard, setSelectedCard] = useState([]);

    const onEventStart = () => {
        // Custom start event logic for DraftDeckEvent
        console.log('Draft Deck Event Started');
    };

    const handlePackOpened = (selectedCard) => {
        setSelectedCard(selectedCard);
        const newState = gameStateUpdater.addSelectedCardToDeck(gameState, playerId, selectedCard);

        if (currentPackIndex.current + 1 >= numberOfPacksToOpen) {
            playerFinishedEvent(newState);
        }

        currentPackIndex.current += 1;
    };

    if (currentPackIndex.current > numberOfPacksToOpen) {
        return <WaitingForOtherPlayers/>;
    }

    return (
        <div className="draft-deck-container">
            <h1>Draft Deck</h1>
            <OpenPack
                key={currentPackIndex.current}
                packData={draftData}
                onPackOpened={handlePackOpened}
            />
        </div>
    );
};

export default withGameEvent(DraftDeckEvent, {
    onEventStart: () => {
        console.log('Draft Deck Event Started');
    }
});
