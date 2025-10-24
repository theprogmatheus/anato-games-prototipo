import { useState } from 'react';
import { cards as initialCards } from '@/data/cards';

export default function useMemoryGame() {

    const DISPLAY_TIME = 10;

    const [level, setLevel] = useState<number>(1)
    const [playing, setPlaying] = useState<boolean>(false)
    const [startingLevel, setStartingLevel] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(DISPLAY_TIME)

    const [cards, setCards] = useState(getCardsByLevel())
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])

    function flipCard(id: number) {
        if (!playing)
            return

        if (flipped.length === 2 || flipped.includes(id))
            return

        const newFlipped = [...flipped, id]

        setFlipped(newFlipped)

        if (newFlipped.length === 2) {

            // verificar se essa carta é a escolhida

            const cardA = cards.find(card => card.id === newFlipped[0]);
            const cardB = cards.find(card => card.id === newFlipped[1])

            if ((cardA && cardB) && cardA.pairId === cardB.pairId) {

                const newMatched = [...matched, cardA.pairId]
                setMatched(newMatched)
                if (newMatched.length === getPairsAmountByLevel()) {
                    // levelUP
                    setTimeout(() => levelUp(), 1000)

                }
            }

            setTimeout(() => setFlipped([]), 800)
        }



    }

    function levelUp() {
        if (!playing)
            return

        setLevel(lvl => lvl + 1)
        goToNextLevel()
    }

    function goToNextLevel() {
        setStartingLevel(false)
        setPlaying(false)
        setMatched([])
        setCards(getCardsByLevel())
        setTimeout(() => {
            startGame()
        }, 1000);
    }


    function getPairsAmountByLevel() {
        return level * 2;
    }

    function getCardsByLevel() {
        const total = getPairsAmountByLevel();
        let imageCards = shuffle(initialCards.filter(card => card.type == 'image'))
        imageCards = imageCards.slice(0, total)
        let textCards = initialCards.filter(card => card.type == 'text' && imageCards.map(c => c.id).includes(card.pairId))
        return shuffle([...imageCards, ...textCards])
    }

    function shuffle<T>(array: T[]): T[] {
        return [...array].sort(() => Math.random() - 0.5)
    }


    function startGame() {
        if (!startingLevel && !playing) {

            alert('startGame')
            setStartingLevel(true);
            setTimer(DISPLAY_TIME);

            const counter = setInterval(() => {
                setTimer(v => {
                    if (v < 2) {
                        setStartingLevel(false)
                        setPlaying(true)
                        clearInterval(counter)
                        return DISPLAY_TIME
                    }
                    return v - 1;
                })
            }, 1000);
        }
    }

    return {
        cards,
        flipped,
        matched,
        level,
        playing,
        startingLevel,
        timer,

        flipCard,
        startGame,
    }
}
