// components/screens/GameScreen.tsx

import Card from '@/components/ui/Card';
import { CardData, LevelConfig } from '@/types/game.d';
import { getGameGridCols } from '@/utils/game-utils';
import { Award, Clock } from 'lucide-react';
import React from 'react';

interface GameScreenProps {
    playerName: string;
    currentLevelConfig: LevelConfig;
    timeLeft: number;
    score: number;
    cards: CardData[];
    isFlippingDisabled: boolean;
    handleCardClick: (id: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
    playerName,
    currentLevelConfig,
    timeLeft,
    score,
    cards,
    isFlippingDisabled,
    handleCardClick,
}) => {
    const gameGridCols = getGameGridCols(currentLevelConfig.cardsPerLevel);

    return (
        <div className="flex flex-col w-full h-full max-w-6xl p-4 md:p-8 bg-white shadow-2xl rounded-2xl border-2 border-amber-700">
            <header className="flex flex-wrap justify-between items-center mb-6 p-4 bg-blue-100 rounded-xl shadow-inner">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 w-full md:w-auto mb-2 md:mb-0">
                    Nível {currentLevelConfig.level} - {playerName}
                </h2>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center p-2 rounded-full bg-blue-600 text-white font-mono text-xl shadow-md">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="min-w-[40px] text-center">{timeLeft}s</span>
                    </div>
                    <div className="flex items-center p-2 rounded-full bg-yellow-600 text-white font-mono text-xl shadow-md">
                        <Award className="w-5 h-5 mr-2" />
                        <span className="min-w-[40px] text-center">{score}</span>
                    </div>
                </div>
            </header>

            <div className={`grid ${gameGridCols} gap-3 md:gap-4 flex-grow p-2`}>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={handleCardClick}
                        isFlippingDisabled={isFlippingDisabled}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameScreen;