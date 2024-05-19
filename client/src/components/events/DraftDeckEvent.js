import React, {useRef, useState} from 'react';
import OpenPack from './OpenPack';
import GameStateUpdater from '../utility/GameStateUpdater';
import withGameEvent from './framework/withGameEvent';

const DraftDeckEvent = ({numberOfPacksToOpen, gameState, playerId, setGameState, draftData, playerFinishedEvent}) => {
    const currentPackIndex = useRef(0);
    const [selectedCard, setSelectedCard] = useState([]);

    const onEventStart = () => {
        // Custom start event logic for DraftDeckEvent
        console.log('Draft Deck Event Started');
    };

    const handlePackOpened = (selectedCard) => {
        currentPackIndex.current += 1;
        setSelectedCard(selectedCard);
        setGameState(GameStateUpdater.addSelectedCardToDeck(gameState, playerId, selectedCard));

        if (currentPackIndex.current >= numberOfPacksToOpen) {
            playerFinishedEvent(gameState);
        }
    };

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
