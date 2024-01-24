'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Link from "next/link";

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

interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
}


const shuffleArray = <T extends unknown>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function createUsernameFromUUID(uuid: string): string {
    // Split the UUID into parts
    const parts = uuid.split('-');
  
    // Take the first character from each of the first four parts
    let username = '';
    for (let i = 0; i < 4; i++) {
      username += parts[i][0];
    }
  
    return username;
  }

const cards: Card[] = [
    { id: 1, icon: '👻' },
    { id: 2, icon: '🙈' },
    { id: 3, icon: '🤴🏻' },
];
const cardImages = [ img1, img2, img3, img4, img5, img6, img7, img8 ];


const GameBoard: React.FC = () => {
    const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
    const [shuffledCardsImages, setShuffledCardsImages] = useState<StaticImageData[]>([]);

    useEffect(() => {
        setShuffledCards(shuffleArray([...cards]));
        setShuffledCardsImages(shuffleArray([...cardImages]));
    }, []); 

    return (
        <>
            <div className={styles.board}>
                {shuffledCards.map((card) => (
                    <Card
                        key={card.id}
                        cardId={card.id}
                        cardBackground={shuffledCardsImages[card.id-1].src}
                        isRevealed={false}
                        isSelected={false}
                        isOpponentSelected={false}
                        cardIcon={card.icon}
                        onSelect={() => {}}
                    />
                ))}
            </div>
            <p className="font-thin text-3xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center mt-6">
                Login to Join a match!
            </p>
            <Link
                href="/login"
                className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                >
                Login
            </Link>
        </>
    );
};

export default GameBoard;