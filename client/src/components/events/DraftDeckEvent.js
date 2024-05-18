import React, { useState } from 'react';
import OpenPack from './OpenPack';
import GameStateUpdater from '../utility/GameStateUpdater';
import withGameEvent from './framework/withGameEvent';

const DraftDeckEvent = ({ numberOfPacksToOpen, gameState, setGameState, draftData, endEvent }) => {
    const [currentPackIndex, setCurrentPackIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState([]);

    const onEventStart = () => {
        // Custom start event logic for DraftDeckEvent
        console.log('Draft Deck Event Started');
    };

    const handlePackOpened = (selectedCard) => {
        if (currentPackIndex + 1 < numberOfPacksToOpen) {
            setCurrentPackIndex(currentPackIndex + 1);
            setSelectedCard(selectedCard);
            setGameState(GameStateUpdater.addSelectedCardToDeck(gameState, selectedCard));
        } else {
            console.log('Draft Deck Event Ended');
            endEvent();
        }
    };

    return (
        <div className="draft-deck-container">
            <h1>Draft Deck</h1>
            <OpenPack
                key={currentPackIndex}
                packData={draftData}
                onPackOpened={handlePackOpened}
            />
        </div>
    );
};

export default withGameEvent(DraftDeckEvent, { onEventStart: () => { console.log('Draft Deck Event Started'); } });
