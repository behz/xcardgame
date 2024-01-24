'use client'
import React, { useEffect } from 'react';
import useGame from '../hooks/useGame';
import GameBoard from './GameBoard';

const Game: React.FC = () => {
    const { joinGame } = useGame();

    useEffect(() => {
        joinGame();
    }, [joinGame]);

    return (
        <div>
           <GameBoard />
        </div>
    );
};

export default Game;
