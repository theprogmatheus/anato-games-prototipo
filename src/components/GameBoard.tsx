"use client"

import useMemoryGameLogic from '@/hooks/useMemoryGameLogic'
import Card from './Card'

export default function GameBoard() {
    const {
        level,
        cards,
        showingCardsTimer,
        showingCards,
        flippedCards,
        matchedCards,
        allowPlay,
        score,
        playing,


        startGame,
        handleCard,
        getTotalCardPairsByThisLevel
    } = useMemoryGameLogic(10);

    return (
        <div className="flex flex-col items-center gap-4">            
            <h1 className="text-2xl font-bold mb-4 uppercase">Jogo da Memória - Nível {level}</h1>

            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={startGame}
                        className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer ${playing ? "hidden" : ""}`}
                    >
                        Iniciar
                    </button>
                    <span>{showingCardsTimer} SEGUNDOS CONTAGEM REGRESSIVA</span>
                    <span>Score: {score}</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            flipped={showingCards || flippedCards.includes(card.id) || matchedCards.includes(card.pairId)}
                            clickable={allowPlay}
                            onClick={() => handleCard(card.id)}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
