// utils/game-utils.ts

import { AnatomyPair, CardData, LevelConfig } from '@/types/game.d';

/**
 * Embaralha um array (algoritmo Fisher-Yates).
 * @param array O array a ser embaralhado.
 * @returns O array embaralhado.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffledArray = [...array]; // Clona o array para evitar mutação direta
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

/**
 * Cria o array de cartas para o nível atual.
 * @param config A configuração do nível.
 * @param anatomyPairs O array de pares de anatomia.
 * @returns O array de cartas pronto para o jogo.
 */
export const createCards = (config: LevelConfig, anatomyPairs: AnatomyPair[]): CardData[] => {
    if (!config) return [];

    // 1. Seleciona o número correto de pares para o nível
    const selectedPairs = anatomyPairs.slice(0, config.pairs);
    let cards: CardData[] = [];
    let idCounter = 1;

    // 2. Cria o par de cartas (Imagem e Nome)
    selectedPairs.forEach(pair => {
        // Cartão 1: Imagem (simulada por ícone SVG)
        cards.push({
            id: idCounter++,
            pieceKey: pair.key,
            content: pair.imageContent,
            type: 'image',
            isFlipped: false,
            isMatched: false,
        });
        // Cartão 2: Nome (Texto)
        cards.push({
            id: idCounter++,
            pieceKey: pair.key,
            content: pair.name,
            type: 'name',
            isFlipped: false,
            isMatched: false,
        });
    });

    // 3. Embaralha as cartas
    return shuffleArray(cards);
};

/**
 * Lógica para determinar a classe de grid do jogo.
 */
export const getGameGridCols = (totalCards: number): string => {
    // Lógica para grid: Nível 1 (2x2), Nível 2 (4x2), Nível 3 (4x3), Nível 4 (4x4), Nível 5 (6x4)
    if (totalCards === 4) return 'grid-cols-2';
    if (totalCards === 8) return 'grid-cols-4';
    if (totalCards === 12) return 'grid-cols-4';
    if (totalCards === 16) return 'grid-cols-4';
    if (totalCards === 24) return 'grid-cols-6';
    return 'grid-cols-4';
};