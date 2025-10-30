"use client"

import React from 'react';

// Importa o hook que contém TODA a lógica
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameStatus } from '@/types/game.d';

// Importa os componentes de tela de UI
import GameOverScreen from '@/components/screens/GameOverScreen';
import GameScreen from '@/components/screens/GameScreen';
import StartScreen from '@/components/screens/StartScreen';
import WinScreen from '@/components/screens/WinScreen';

// --- Componente de Página Principal (Container) ---

// Recomendação do Next.js para páginas
const HomePage: React.FC = () => {
    // 1. Chama o Custom Hook para obter o estado e as funções
    const {
        playerName, setPlayerName, gameStatus, currentLevelIndex, score,
        timeLeft, cards, currentLevelConfig, isFlippingDisabled, maxLevel,
        startGame, tryAgain, nextLevel, goToStart, handleCardClick,
    } = useGameLogic();

    // 2. Lógica de Seleção de Tela (Display Logic)
    let screenComponent;
    switch (gameStatus) {
        case GameStatus.InitialFlip:
        case GameStatus.Playing:
            screenComponent = (
                <GameScreen
                    playerName={playerName}
                    currentLevelConfig={currentLevelConfig}
                    timeLeft={timeLeft}
                    score={score}
                    cards={cards}
                    isFlippingDisabled={isFlippingDisabled}
                    handleCardClick={handleCardClick}
                />
            );
            break;
        case GameStatus.Win:
            screenComponent = (
                <WinScreen
                    playerName={playerName}
                    score={score}
                    currentLevelConfig={currentLevelConfig}
                    isFinal={currentLevelIndex + 1 === maxLevel}
                    maxLevel={maxLevel}
                    nextLevel={nextLevel}
                    goToStart={goToStart}
                />
            );
            break;
        case GameStatus.Loss:
            screenComponent = (
                <GameOverScreen
                    score={score}
                    currentLevelConfig={currentLevelConfig}
                    tryAgain={tryAgain}
                    goToStart={goToStart}
                />
            );
            break;
        case GameStatus.FinalWin:
            screenComponent = (
                <WinScreen
                    playerName={playerName}
                    score={score}
                    currentLevelConfig={currentLevelConfig}
                    isFinal={true}
                    maxLevel={maxLevel}
                    nextLevel={nextLevel}
                    goToStart={goToStart}
                />
            );
            break;
        case GameStatus.Start:
        default:
            screenComponent = (
                <StartScreen
                    playerName={playerName}
                    setPlayerName={setPlayerName}
                    startGame={startGame}
                />
            );
            break;
    }

    // 3. Renderização do Layout (Next.js requer um arquivo de layout separado, 
    // mas incluímos o estilo de fundo para demonstrar)
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4 font-inter">
            {/* ATENÇÃO: Os estilos CSS foram mantidos aqui por simplicidade, 
          mas em um projeto real, você os colocaria em um arquivo global 
          como `styles/globals.css` ou usaria PostCSS/Tailwind. */}
            <style global jsx>{`
        .font-inter { font-family: 'Inter', sans-serif; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        /* Regras de aspecto para as cartas no grid */
        .grid-cols-6 > * { aspect-ratio: 1 / 1; }
        .grid-cols-4 > * { aspect-ratio: 1 / 1; }
        .grid-cols-2 > * { aspect-ratio: 1 / 1; }
      `}</style>

            {screenComponent}
        </div>
    );
};

export default HomePage;