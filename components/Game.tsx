'use client'
import React, { useEffect } from 'react';
import GameBoard from './GameBoard';
import GamePlaceholder from './GamePlaceholder';
import { GameProvider } from '../contexts/gameContext';
import { useUserContext } from '../contexts/userContext';

const Game: React.FC = () => {
    const { userId, setUserId } = useUserContext();

    return (
        <GameProvider>
                <div className="flex flex-col items-center">
                <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center">
                Who is the king?
                </p>
                <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            </div>

           { userId ? <GameBoard /> : <GamePlaceholder/>}
        </GameProvider>
    );
};

export default Game;
