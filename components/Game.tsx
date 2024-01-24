'use client'
import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import { GameProvider } from '../contexts/gameContext';

const Game: React.FC = () => {
    return (
        <GameProvider>
           <GameBoard />
        </GameProvider>
    );
};

export default Game;
