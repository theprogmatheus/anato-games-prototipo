// components/screens/GameOverScreen.tsx

import { LevelConfig } from '@/types/game.d';
import { Home, RotateCw, XCircle } from 'lucide-react';
import React from 'react';

interface GameOverScreenProps {
    score: number;
    currentLevelConfig: LevelConfig;
    tryAgain: () => void;
    goToStart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
    score,
    currentLevelConfig,
    tryAgain,
    goToStart
}) => (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-2xl rounded-2xl w-full max-w-md text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-extrabold text-red-700 mb-2">Game Over!</h1>
        <p className="text-xl text-gray-700 mb-6">
            O tempo acabou no Nível {currentLevelConfig.level}. Sua pontuação final: {score}.
        </p>
        <button
            onClick={tryAgain}
            className="w-full py-3 px-6 text-xl font-bold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-gray-800 transition-all duration-200 shadow-lg mb-4"
        >
            <RotateCw className="inline-block mr-2" /> Tentar Novamente (Nível {currentLevelConfig.level})
        </button>
        <button
            onClick={goToStart}
            className="w-full py-2 px-6 text-md font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200"
        >
            <Home className="inline-block mr-2 h-5 w-5" /> Ir para a Tela Inicial
        </button>
    </div>
);

export default GameOverScreen;