// types/game.d.tsx

import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

// --- ENUMS E CONSTANTES ---

/**
 * Enum para o status do jogo.
 */
export enum GameStatus {
    Start = 'start',
    InitialFlip = 'initialFlip',
    Playing = 'playing',
    Win = 'win',
    Loss = 'loss',
    FinalWin = 'finalWin',
}

/**
 * Tipos de Conteúdo de Cartão para o pareamento: Imagem (simulada por Icone) ou Nome.
 */
export type CardContentType = 'image' | 'name';

// --- INTERFACES DE DADOS ---

/**
 * Estrutura base para um par de anatomia.
 */
export interface AnatomyPair {
    key: string;
    name: string;
    // O 'imageContent' agora é um ReactElement, o que é mais seguro com TypeScript
    // do que a tipagem original. Usamos LucideIcon para tipar o ícone em si.
    imageContent: ReactElement<any, LucideIcon>;
}

/**
 * Estrutura de uma carta individual no tabuleiro.
 */
export interface CardData {
    id: number;
    pieceKey: string; // Chave de correspondência (Ex: 'A')
    content: React.ReactNode; // Conteúdo a ser exibido (Icone ou Nome)
    type: CardContentType;
    isFlipped: boolean;
    isMatched: boolean;
}

/**
 * Estrutura das configurações de nível.
 */
export interface LevelConfig {
    level: number;
    pairs: number;
    limit: number; // Limite de tempo em segundos
    cardsPerLevel: number;
}


// --- CONFIGURAÇÃO DE DADOS (AGORA TIPADA) ---
export const ANATOMY_PAIRS: AnatomyPair[] = [
    { key: 'A', name: 'Tubérculo Conóide', imageContent: <img src="/img/Img1.png" /> },
    { key: 'B', name: 'Fossa do olécrano', imageContent: <img src="/img/Img2.png" /> },
    { key: 'C', name: 'Espinha da escápula', imageContent: <img src="/img/Img3.png" /> },
    { key: 'D', name: 'Olécrano', imageContent: <img src="/img/Img4.jpg" /> },
    { key: 'E', name: 'Processo estiloide da ulna', imageContent: <img src="/img/Img5.jpg" /> },
    { key: 'F', name: 'Tuberosidade do rádio', imageContent: <img src="/img/Img6.jpg" /> },
    { key: 'G', name: 'Primeiro metacarpo', imageContent: <img src="/img/Img7.jpg" /> },
    { key: 'H', name: 'Quinta falange distal', imageContent: <img src="/img/Img8.jpg" /> },
    { key: 'I', name: 'Processo coracóide', imageContent: <img src="/img/Img9.jpg" /> },
    { key: 'J', name: 'Tubérculo maior do úmero', imageContent: <img src="/img/Img10.jpg" /> },
    { key: 'K', name: 'Cavidade Glenoidal', imageContent: <img src="/img/Img11.jpg" /> },
    { key: 'L', name: 'Colo cirúrgico', imageContent: <img src="/img/Img12.jpg" /> },
];

export const LEVEL_CONFIGS: LevelConfig[] = [
    { level: 1, pairs: 2, limit: 30, cardsPerLevel: 4 },
    { level: 2, pairs: 4, limit: 60, cardsPerLevel: 8 },
    { level: 3, pairs: 6, limit: 90, cardsPerLevel: 12 },
    { level: 4, pairs: 8, limit: 120, cardsPerLevel: 16 },
    { level: 5, pairs: 12, limit: 180, cardsPerLevel: 24 },
];