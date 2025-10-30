// components/screens/WinScreen.tsx

import { LevelConfig } from '@/types/game.d';
import { Award, CheckCircle, Home } from 'lucide-react';
import React from 'react';

interface WinScreenProps {
    playerName: string;
    score: number;
    currentLevelConfig: LevelConfig;
    isFinal: boolean;
    maxLevel: number;
    nextLevel: () => void;
    goToStart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({
    playerName,
    score,
    currentLevelConfig,
    isFinal,
    maxLevel,
    nextLevel,
    goToStart
}) => (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-2xl rounded-2xl w-full max-w-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">Parabéns, {playerName}!</h1>
        <p className="text-xl text-gray-700 mb-6">
            Você completou o Nível {currentLevelConfig.level} com {score} pontos!
        </p>

        {isFinal ? (
            <>
                <h2 className="text-2xl font-bold text-blue-600 mb-8">
                    Você é um MESTRE da Anatomia!
                </h2>
                <button
                    onClick={goToStart}
                    className="w-full py-3 px-6 text-lg font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg mb-4"
                >
                    <Home className="inline-block mr-2" /> Ir para a Tela Inicial
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={nextLevel}
                    className="w-full py-3 px-6 text-xl font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 shadow-lg mb-4"
                >
                    <Award className="inline-block mr-2" /> Próximo Nível (Nível {currentLevelConfig.level + 1})
                </button>
                <button
                    onClick={goToStart}
                    className="w-full py-2 px-6 text-md font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200"
                >
                    <Home className="inline-block mr-2 h-5 w-5" /> Voltar ao Início
                </button>
            </>
        )}
    </div>
);

export default WinScreen;