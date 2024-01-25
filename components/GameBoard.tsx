"use client";
import React, { useState, useEffect } from "react";
import useGame from "../hooks/useGame";
import Card from "./Card";
import { useGameContext } from "../contexts/gameContext";
import { useUserContext } from "../contexts/userContext";

import img1 from "../public/images/img1.avif";
import img2 from "../public/images/img2.avif";
import img3 from "../public/images/img3.avif";
import img4 from "../public/images/photo-1584282617200-32f377e493ef.avif";
import img5 from "../public/images/photo-1584283626349-5deeb8ef42bc.avif";
import img6 from "../public/images/photo-1579167728798-a1cf3d595960.avif";
import img7 from "../public/images/photo-1584282000369-8b26844c9188.avif";
import img8 from "../public/images/photo-1584282000185-87fb204a83d6.avif";

import styles from "./GameBoard.module.css";

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
  const parts = uuid.split("-");

  // Take the first character from each of the first four parts
  let username = "";
  for (let i = 0; i < 4; i++) {
    username += parts[i][0];
  }

  return username;
}

const cards: Card[] = [
  { id: 1, icon: "👻" },
  { id: 2, icon: "🙈" },
  { id: 3, icon: "🤴🏻" },
];
const cardImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const opponentEmojis = [ "😀", "😃", "😄", "😋", "😝", "🤗",  "😍", "🙃", "🤡", "😺", "👽", "😈", "😎", "🐶", "🐻‍❄️", "🐤", "🧑‍🎤", "🧑‍🎨", "👩‍💻", "🤵‍♂️", "🤵‍♀️", "👩‍🦰", "🤖", "😏" ];

const GameBoard: React.FC = () => {
  const { joinGame, selectCard, setWinner } = useGame();

  const { isFirstPlayer, setIsFirstPlayer } = useGameContext();
  const { opponentId, setOpponentId } = useGameContext();
  const { opponentSelectedCard, setOpponentSelectedCard } = useGameContext();
  const { mySelectedCard, setMySelectedCard } = useGameContext();
  const { userId, setUserId } = useUserContext();

  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [shuffledCardsImages, setShuffledCardsImages] = useState<
    StaticImageData[]
  >([]);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const [opponentEmoji, setOpponentEmoji] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * opponentEmojis.length);
    setOpponentEmoji(opponentEmojis[randomIndex]);
  }, []);

  useEffect(() => {
    setShuffledCards(shuffleArray([...cards]));
    setShuffledCardsImages(shuffleArray([...cardImages]));
  }, []);

  useEffect(() => {
    joinGame();
  }, []);

  useEffect(() => {
    if (opponentSelectedCard && mySelectedCard) {
      setWinner(opponentSelectedCard == 3 ? opponentId : userId);
      setTimeout(() => {
        setIsRevealed(true);
      }, 1000);
    }
  }, [opponentSelectedCard, mySelectedCard]);

  const handleCardSelect = (id: number) => {
    if (mySelectedCard) return;
    setMySelectedCard(id);
    selectCard(id);
  };

  return (
    <>
      <div className={styles.board}>
        {shuffledCards.map((card) => (
          <Card
            key={card.id}
            cardId={card.id}
            cardBackground={shuffledCardsImages[card.id - 1].src}
            isRevealed={isRevealed}
            isSelected={mySelectedCard === card.id}
            isOpponentSelected={opponentSelectedCard === card.id}
            cardIcon={card.icon}
            onSelect={handleCardSelect}
          />
        ))}
      </div>
      <p className="font-thin text-3xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center mt-20">
        {!isRevealed && !mySelectedCard && <span>Pick a card</span>}
        {!opponentSelectedCard && mySelectedCard ? (
          <span>Waiting for opponent to select a card ...</span>
        ) : null}
        {!isRevealed && opponentSelectedCard && mySelectedCard ? (
          <span>The winner is ...</span>
        ) : null}
        {isRevealed && (
          <span>
            {mySelectedCard == 3
              ? "Congratulations! 🎉  +10 Points received."
              : "You lost! Start a new match!"}
          </span>
        )}
      </p>
      {!isRevealed && !mySelectedCard && (
        <p className="font-thin mx-auto max-w-xl text-center mt-4">
          Choosing the king card ensures your victory! 😊
        </p>
      )}

      {opponentId && (
        <div className={`${styles.opponentContainer} animate-in`}>
          <div className={styles.opponentCircle}>{opponentEmoji}</div>
          <div className={styles.opponentMsg}>
            {isRevealed ? (
              mySelectedCard === 3 ? (
                <span>
                  The opponent {createUsernameFromUUID(opponentId)} lost!
                </span>
              ) : (
                <span>
                  The opponent {createUsernameFromUUID(opponentId)} Won!
                </span>
              )
            ) : opponentSelectedCard === 0 ? (
              <span>
                The opponent {createUsernameFromUUID(opponentId)} Joined!
              </span>
            ) : (
              <span>
                The opponent {createUsernameFromUUID(opponentId)} Selected a
                Card!
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameBoard;
