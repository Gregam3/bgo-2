import React from 'react';
import OpenPack from './OpenPack';
import '../styles/OpenPackEvent.css';
import withGameEvent from './framework/withGameEvent';
import GameStateUpdater from '../utility/GameStateUpdater';

const OpenPackEvent = ({ gameState, setGameState, packData, endEvent }) => {
    const handlePackOpened = (selectedCard) => {
        setGameState(GameStateUpdater.addPlayerCardToDeck(gameState, selectedCard));
        endEvent();
    };

    return (
        <div className="open-pack-container">
            <h1>Open Pack</h1>
            <OpenPack packData={packData} onPackOpened={handlePackOpened} />
            <h4>Click a card to add it to your deck</h4>
        </div>
    );
};

export default withGameEvent(OpenPackEvent);
