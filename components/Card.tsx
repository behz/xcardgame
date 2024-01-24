import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";
import Image from 'next/image'
 
import styles from './Card.module.css'

interface CardProps {
    cardId: number;
    cardIcon: string;
    cardBackground: string;
    isRevealed: boolean;
    isSelected: boolean;
    isOpponentSelected: boolean;
    onSelect: (id: number) => void;
}

const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

const Card: React.FC<CardProps> = ({ cardId, cardIcon, cardBackground, isRevealed, isSelected, isOpponentSelected, onSelect }) => {
    // const [isFlipped, setIsFlipped] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCardClick = () => {
        if (!isSelected && !isOpponentSelected) {
            onSelect(cardId);
        }
        // setIsFlipped(!isFlipped);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (cardRef.current) {
            const { width, height, x, y } = cardRef.current.getBoundingClientRect();
            const mouseX = event.clientX - x - width / 2;
            const mouseY = event.clientY - y - height / 2;
            const rotationFactor = 20;
            setRotateX((mouseY / height) * rotationFactor);
            setRotateY(-(mouseX / width) * rotationFactor);
        }
    };

    const handleMouseEnd = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const dx = useSpring(0, springConfig);
    const dy = useSpring(0, springConfig);

    useEffect(() => {
        dx.set(-rotateX);
        dy.set(rotateY);
    }, [rotateX, rotateY, dx, dy]);

    return (
        <motion.div
            className={`${isSelected ? styles.selectd : ''} ${isOpponentSelected ? styles.opponentSelectd : ''} animate-in `}
            onClick={handleCardClick}
            transition={springConfig}
            style={{ perspective: "1200px", transformStyle: "preserve-3d", width: "15em", height: "20em" }}
        >
            <motion.div
                ref={cardRef}
                whileHover={{ scale: isOpponentSelected ? 1 : 1.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseEnd}
                transition={springConfig}
                style={{ width: "100%", height: "100%", rotateX: dx, rotateY: dy, scale: isSelected ? 1.1 : 1 }}
            >
                {/* Card Front */}
                <motion.div
                    className={styles.card}
                    animate={{ rotateY: isRevealed ? -180 : 0 }}
                    transition={springConfig}
                    style={{
                        zIndex: isRevealed ? 0 : 1,
                    }}
                >
                    <div className={styles.cardContent} style={{backgroundImage: cardBackground}}>
                    <Image
                        alt=""
                        src={cardBackground}
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                            objectFit: 'cover', // cover, contain, none
                        }}
                        />
                    </div>
                </motion.div>

                {/* Card Back */}
                <motion.div
                    className={styles.card}
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: isRevealed ? 0 : 180 }}
                    transition={springConfig}
                    style={{
                        zIndex: isRevealed ? 1 : 0,
                    }}
                >
                    <div className={`${styles.cardContent} ${styles.revlealedContent}`}>
                        <span className={styles.icon}>{cardIcon}</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Card;
