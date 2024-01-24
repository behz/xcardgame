import React from 'react';
import { useState } from 'react';

interface CardProps {
    cardId: number;
    cardIcon: string;
    isRevealed: boolean;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ cardId, cardIcon, isRevealed, isSelected, onSelect }) => {

    const handleClick = () => {
        if (!isSelected) {
            onSelect(cardId);
        }
    };

    return (
        <div onClick={handleClick}> {cardId}
            {isRevealed ? `Card ${cardId}` : 'Face Down'} {isSelected ? `selected` : ''}
        </div>
    );
};

export default Card;