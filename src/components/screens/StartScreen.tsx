// components/screens/StartScreen.tsx

import { LEVEL_CONFIGS } from '@/types/game.d';
import { Zap } from 'lucide-react';
import React from 'react';

interface StartScreenProps {
    playerName: string;
    setPlayerName: (name: string) => void;
    startGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ playerName, setPlayerName, startGame }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-xl rounded-2xl w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">AnatoMatch</h1>  
        <p className="text-gray-600 mb-6 text-center">Jogo da Memória de Anatomia para Estudantes</p>

        <label htmlFor="playerName" className="self-start text-lg font-semibold text-gray-700 mb-2">
            Seu Nome:
        </label>
        <input
            id="playerName"
            type="text"
            placeholder="Insira seu nome aqui"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-3 mb-6 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition duration-150 text-gray-900"
            maxLength={20}
        />

        <button
            onClick={startGame}
            disabled={!playerName.trim()}
            className={`cursor-pointer w-full py-3 px-6 text-xl font-bold rounded-lg transition-all duration-200 shadow-md ${playerName.trim()
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-700/50'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
        >
            <div className="flex items-center justify-center">
                <Zap className="mr-2 h-6 w-6" />
                {`Jogar (Nível 1 - ${LEVEL_CONFIGS[0].cardsPerLevel} Cartas)`}
            </div>
        </button>
        <p className="mt-4 text-sm text-gray-500">Regras: +10 Acerto | -2 Erro</p>
    </div>
);

export default StartScreen;