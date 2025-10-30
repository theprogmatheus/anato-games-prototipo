// hooks/useGameLogic.ts

import { ANATOMY_PAIRS, CardData, GameStatus, LEVEL_CONFIGS, LevelConfig } from '@/types/game.d';
import { createCards } from '@/utils/game-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface GameLogic {
    playerName: string;
    setPlayerName: (name: string) => void;
    gameStatus: GameStatus;
    currentLevelIndex: number;
    score: number;
    timeLeft: number;
    cards: CardData[];
    currentLevelConfig: LevelConfig;
    isFlippingDisabled: boolean;
    maxLevel: number;

    startGame: () => void;
    tryAgain: () => void;
    nextLevel: () => void;
    goToStart: () => void;
    handleCardClick: (id: number) => void;
}

export const useGameLogic = (): GameLogic => {
    const [gameStatus, setGameStatus] = useState(GameStatus.Start);
    const [playerName, setPlayerName] = useState('');
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [cards, setCards] = useState<CardData[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // IDs das cartas viradas
    const [isFlippingDisabled, setIsFlippingDisabled] = useState(false);

    const maxLevel = LEVEL_CONFIGS.length;
    const currentLevelConfig = useMemo(() => LEVEL_CONFIGS[currentLevelIndex], [currentLevelIndex]);

    // --- Lógica de Inicialização e Reinício ---

    const initGame = useCallback((levelIndex: number, keepScore: boolean = false) => {
        const config = LEVEL_CONFIGS[levelIndex];
        if (!config) return;

        setCards(createCards(config, ANATOMY_PAIRS));
        setFlippedCards([]);
        setTimeLeft(config.limit);
        setCurrentLevelIndex(levelIndex);
        if (!keepScore) setScore(0);
        setGameStatus(GameStatus.Playing);
        setIsFlippingDisabled(false);
    }, []);

    const startGame = useCallback(() => {
        if (playerName.trim()) {
            initGame(0);
        }
    }, [playerName, initGame]);

    const tryAgain = useCallback(() => {
        // Reinicia o nível atual
        initGame(currentLevelIndex, true);
    }, [currentLevelIndex, initGame]);

    const nextLevel = useCallback(() => {
        if (currentLevelIndex + 1 < maxLevel) {
            // Passa para o próximo nível, mantendo a pontuação
            initGame(currentLevelIndex + 1, true);
        } else {
            setGameStatus(GameStatus.FinalWin);
        }
    }, [currentLevelIndex, maxLevel, initGame]);

    const goToStart = useCallback(() => {
        setGameStatus(GameStatus.Start);
        setPlayerName('');
        setScore(0);
    }, []);


    // --- Lógica do Jogo da Memória ---

    const handleCardClick = useCallback((id: number) => {
        if (isFlippingDisabled || flippedCards.length === 2) return;

        // 1. Encontra a carta clicada e evita cliques em cartas já viradas/combinadas
        const cardToFlip = cards.find(c => c.id === id);
        if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) return;

        // 2. Vira a carta
        setCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, isFlipped: true } : card
            )
        );

        // 3. Atualiza as cartas viradas e checa o match
        setFlippedCards(prevFlipped => {
            const newFlipped = [...prevFlipped, id];

            if (newFlipped.length === 2) {
                setIsFlippingDisabled(true);

                const [id1, id2] = newFlipped;
                // Busca as cartas no array de estado atualizado (melhor usar a referência do clique, mas o estado atual é suficiente aqui)
                const card1 = cards.find(c => c.id === id1);
                const card2 = cards.find(c => c.id === id2);

                if (card1?.pieceKey === card2?.pieceKey && id1 !== id2) {
                    // ACERTO (+10 Pontos)
                    setTimeout(() => {
                        setScore(s => s + 10);
                        setCards(prev =>
                            prev.map(card =>
                                card.id === id1 || card.id === id2
                                    ? { ...card, isMatched: true, isFlipped: true }
                                    : card
                            )
                        );
                        setFlippedCards([]);
                        setIsFlippingDisabled(false);
                    }, 1000);
                } else {
                    // ERRO (-2 Pontos)
                    setTimeout(() => {
                        setScore(s => Math.max(0, s - 2));
                        setCards(prev =>
                            prev.map(card =>
                                card.id === id1 || card.id === id2
                                    ? { ...card, isFlipped: false } // Vira as cartas de volta
                                    : card
                            )
                        );
                        setFlippedCards([]);
                        setIsFlippingDisabled(false);
                    }, 1500);
                }
            }
            return newFlipped;
        });
    }, [isFlippingDisabled, flippedCards, cards]);


    // --- Efeitos Colaterais (Timers e Checagem de Vitória) ---

    // Timer
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (gameStatus === GameStatus.Playing && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameStatus === GameStatus.Playing) {
            // Tempo esgotado
            setGameStatus(GameStatus.Loss);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameStatus, timeLeft]);

    // Checar Vitória
    useEffect(() => {
        if (gameStatus === GameStatus.Playing && cards.length > 0) {
            const allMatched = cards.every(card => card.isMatched);
            if (allMatched) {
                setGameStatus(GameStatus.Win);
            }
        }
    }, [cards, gameStatus]);


    return {
        playerName,
        setPlayerName,
        gameStatus,
        currentLevelIndex,
        score,
        timeLeft,
        cards,
        currentLevelConfig,
        isFlippingDisabled,
        maxLevel,

        startGame,
        tryAgain,
        nextLevel,
        goToStart,
        handleCardClick,
    };
};