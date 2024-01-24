'use client'
import React, { useState, useEffect } from 'react';
import useGame from '../hooks/useGame';
import Card from './Card';

import img1 from '../public/images/img1.avif'
import img2 from '../public/images/img2.avif'
import img3 from '../public/images/img3.avif'
import img4 from '../public/images/photo-1584282617200-32f377e493ef.avif'
import img5 from '../public/images/photo-1584283626349-5deeb8ef42bc.avif'
import img6 from '../public/images/photo-1579167728798-a1cf3d595960.avif'
import img7 from '../public/images/photo-1584282000369-8b26844c9188.avif'
import img8 from '../public/images/photo-1584282000185-87fb204a83d6.avif'

import styles from './GameBoard.module.css';

interface Card {
    id: number;
    icon: string;
}

const shuffleArray = (array: any[]): [] => {
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
const cardImages = [ img1, img2, img3, img4, img5, img6, img7, img8 ];


const GameBoard: React.FC = () => {

    const { joinGame, selectCard } = useGame();

    const [selectedCard, setSelectedCard] = useState<number>(0);
    const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
    const [shuffledCardsImages, setShuffledCardsImages] = useState<[]>([]);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    useEffect(() => {
        setShuffledCards(shuffleArray([...cards]));
        setShuffledCardsImages(shuffleArray([...cardImages]));
    }, []); 

    useEffect(() => {
        joinGame();
    }, [joinGame]);

    const handleCardSelect = (id: number) => {
        if(selectedCard) return
        setSelectedCard(id);
        selectCard(id);
        // Update game state here and send update to Supabase
    };

    return (
        <div
            className={styles.board}
            // className="relative flex flex-row justify-center"
        >
            {shuffledCards.map((card) => (
                <Card
                    key={card.id}
                    cardId={card.id}
                    cardBackground={shuffledCardsImages[card.id-1]}
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
