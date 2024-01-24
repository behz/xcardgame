'use client'
import React, { useState, useEffect } from 'react';
import useGame from '../hooks/useGame';
import Card from './Card';

interface Card {
    id: number;
    icon: string;
}

const shuffleArray = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const cards: Card[] = [
    { id: 1, icon: ':)' },
    { id: 2, icon: ':P' },
    { id: 3, icon: '♔' },
];

const GameBoard: React.FC = () => {
    const { selectCard } = useGame();

    const [selectedCard, setSelectedCard] = useState<number>(0);
    const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    useEffect(() => {
        setShuffledCards(shuffleArray([...cards])); // Shuffle once on component mount
    }, []); 


    const handleCardSelect = (id: number) => {
        if(selectedCard) return
        setSelectedCard(id);
        selectCard(id);
        // Update game state here and send update to Supabase
    };

    return (
        <div>
            {shuffledCards.map((card) => (
                <Card
                    key={card.id}
                    cardId={card.id}
                    isRevealed={isRevealed}
                    isSelected={selectedCard === card.id}
                    cardIcon={card.icon}
                    onSelect={handleCardSelect}
                />
            ))}
            {/* <button onClick={resetGame}>Reset Game</button> */}
        </div>
    );
};

export default GameBoard;
