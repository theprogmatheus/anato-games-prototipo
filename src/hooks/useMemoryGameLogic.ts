import useMemoryGameState from "@/hooks/useMemoryGameState"
import { useState, useEffect } from "react"

import { cards as allCards } from "@/data/cards"

export default function useMemoryGameLogic(timeToSeeCards: number) {

    const {
        name, playing, level, score,
        setName, setPlaying, setLevel, setScore
    } = useMemoryGameState()

    const [cards, setCards] = useState<typeof allCards>([])
    const [allowPlay, setAllowPlay] = useState<boolean>(false)
    const [levelStarted, setLevelStarted] = useState<boolean>(false)
    const [showingCards, setShowingCards] = useState<boolean>(false)
    const [showingCardsTimer, setShowingCardsTimer] = useState<number>(timeToSeeCards)
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [matchedCards, setMatchedCards] = useState<number[]>([])


    useEffect(() => {
        if (playing && !levelStarted) {
            setTimeout(() => {
                startLevel()
            }, 1000);
        }
    }, [level])

    function login(username: string): boolean {
        setName(username)
        return isLogged()
    }

    function logout(): boolean {
        setName("")
        return !isLogged()
    }


    function isLogged(): boolean {
        return name.trim().length > 0;
    }

    function startGame(): void {
        if (playing)
            return

        setPlaying(true)
        startLevel()
    }

    function startLevel(): void {
        if (levelStarted)
            return

        setLevelStarted(true)

        const totalCardPairs = getTotalCardPairsByThisLevel()

        const levelCards = allCards
            .filter(c => c.type === 'image')
            .sort(() => Math.random() - 0.5)
            .slice(0, totalCardPairs)

        for (let i = 0; i < totalCardPairs; i++) {
            const card = allCards
                .filter(c => c.type === 'text' && c.pairId === levelCards[i].pairId)
            levelCards.push(card[0])
        }

        levelCards.sort(() => Math.random() - 0.5)

        setCards(levelCards)
        setTimeout(() => {
            setShowingCards(true)
            let timeLeft = timeToSeeCards
            const showingCardsTimerTask = setInterval(() => {
                timeLeft--;
                setShowingCardsTimer(timeLeft)

                if (timeLeft === 0) {
                    clearInterval(showingCardsTimerTask)
                    setShowingCards(false)
                    setAllowPlay(true)
                    return
                }
            }, 1000);
        }, 1000);

    }

    function nextLevel(): void {
        setAllowPlay(false)
        setLevelStarted(false)
        setFlippedCards([])
        setMatchedCards([])
        setLevel(level + 1)
    }

    function getTotalCardPairsByThisLevel(): number {
        switch (level) {
            case 1:
                return 2
            case 2:
                return 4
            case 3:
                return 6
            case 4:
                return 8

            case 5:
            default:
                return 12
        }
    }

    function handleCard(id: number): void {
        if (!playing || !allowPlay || flippedCards.includes(id) || matchedCards.includes(id))
            return

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {

            const cardA = cards.find(c => c.id === newFlippedCards[0])
            const cardB = cards.find(c => c.id === newFlippedCards[1])

            let newScore = score;
            if (cardA && cardB && cardA.pairId === cardB.pairId) {
                newScore += 10
                setMatchedCards([...matchedCards, cardA.id, cardB.id])

                const totalPairs = getTotalCardPairsByThisLevel()
                if (matchedCards.length + 2 === totalPairs * 2) {
                    setTimeout(() => {
                        nextLevel()
                    }, 1000);
                }
            } else {
                newScore -= 2
            }

            setScore(newScore < 0 ? 0 : newScore)

            setTimeout(() => {
                setFlippedCards([])
            }, 800);
        }

    }

    return {
        name,
        playing,
        level,
        score,
        cards,
        allowPlay,
        levelStarted,
        showingCards,
        showingCardsTimer,
        flippedCards,
        matchedCards,

        login,
        logout,
        isLogged,
        startGame,
        startLevel,
        nextLevel,
        getTotalCardPairsByThisLevel,
        handleCard
    }
}