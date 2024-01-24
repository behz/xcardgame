'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface GameContextType {
    gameId: string | null;
    isFirstPlayer: boolean;
    opponentId: string | null;
    opponentSelectedCard: number;
    mySelectedCard: number;
    setGameId: React.Dispatch<React.SetStateAction<string | null>>;
    setIsFirstPlayer: React.Dispatch<React.SetStateAction<boolean>>;
    setOpponentId: React.Dispatch<React.SetStateAction<string | null>>;
    setOpponentSelectedCard: React.Dispatch<React.SetStateAction<number>>;
    setMySelectedCard: React.Dispatch<React.SetStateAction<number>>;
}

// Creating the context with an initial undefined value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Custom hook for using the game context
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

// GameProvider component props type
interface GameProviderProps {
    children: ReactNode;
}

// GameProvider component
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [gameId, setGameId] = useState<string | null>(null);
    const [isFirstPlayer, setIsFirstPlayer] = useState<boolean>(false);
    const [opponentId, setOpponentId] = useState<string | null>(null);
    const [opponentSelectedCard, setOpponentSelectedCard] = useState<number>(0);
    const [mySelectedCard, setMySelectedCard] = useState<number>(0);

    // The value that will be supplied to the descendants
    const value = { gameId, setGameId, isFirstPlayer, setIsFirstPlayer, opponentId, setOpponentId, opponentSelectedCard, setOpponentSelectedCard, mySelectedCard, setMySelectedCard };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
