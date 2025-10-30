// types/game.d.ts

import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

// --- ENUMS E CONSTANTES ---

/**
 * Enum para o status do jogo.
 */
export enum GameStatus {
    Start = 'start',
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

// Usamos LucideIcon como um alias para os ícones, facilitando a tipagem do 'imageContent'.
import { Brain, Heart, Wind, Anchor, Droplet, Microscope, Bone, Beef, Zap, Activity, Feather } from 'lucide-react';

export const ANATOMY_PAIRS: AnatomyPair[] = [
    { key: 'A', name: 'Cérebro', imageContent: <Brain className="w-16 h-16 text-indigo-700" /> },
    { key: 'B', name: 'Coração', imageContent: <Heart className="w-16 h-16 text-red-600" fill="red" /> },
    { key: 'C', name: 'Pulmão', imageContent: <Wind className="w-16 h-16 text-blue-600" /> },
    { key: 'D', name: 'Fígado', imageContent: <Anchor className="w-16 h-16 text-green-700" /> },
    { key: 'E', name: 'Rim', imageContent: <Droplet className="w-16 h-16 text-indigo-700" /> },
    { key: 'F', name: 'Estômago', imageContent: <Microscope className="w-16 h-16 text-yellow-700" /> },
    { key: 'G', name: 'Osso', imageContent: <Bone className="w-16 h-16 text-gray-700" /> },
    { key: 'H', name: 'Músculo', imageContent: <Beef className="w-16 h-16 text-red-700" /> },
    { key: 'I', name: 'Nervo', imageContent: <Zap className="w-16 h-16 text-yellow-500" /> },
    { key: 'J', name: 'Veia', imageContent: <Droplet className="w-16 h-16 text-blue-500" /> }, // Reutilizado - ok para mock
    { key: 'K', name: 'Artéria', imageContent: <Activity className="w-16 h-16 text-red-500" /> },
    { key: 'L', name: 'Pele', imageContent: <Feather className="w-16 h-16 text-yellow-900" /> },
];

export const LEVEL_CONFIGS: LevelConfig[] = [
    { level: 1, pairs: 2, limit: 30, cardsPerLevel: 4 },
    { level: 2, pairs: 4, limit: 60, cardsPerLevel: 8 },
    { level: 3, pairs: 6, limit: 90, cardsPerLevel: 12 },
    { level: 4, pairs: 8, limit: 120, cardsPerLevel: 16 },
    { level: 5, pairs: 12, limit: 180, cardsPerLevel: 24 },
];