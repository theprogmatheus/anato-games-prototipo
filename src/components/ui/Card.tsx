// components/ui/Card.tsx

import { CardData } from '@/types/game.d';
import { CheckCircle, Zap } from 'lucide-react'; // Importação do Lucide-React
import React from 'react';

// Define as props tipadas
interface CardProps {
    card: CardData;
    onClick: (id: number) => void;
    isFlippingDisabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isFlippingDisabled }) => {
    const isFlipped = card.isFlipped || card.isMatched;

    // 1. Define o conteúdo e classes baseados no estado
    let content: React.ReactNode;
    let backFaceClass = '';

    if (card.isMatched) {
        backFaceClass = 'bg-green-500 text-white shadow-green-700/50';
        content = (
            <div className="flex flex-col items-center">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white mb-1" />
                <span className="text-xs md:text-sm">Encontrado!</span>
            </div>
        );
    } else {
        backFaceClass = 'bg-yellow-400 text-gray-800 shadow-yellow-600/50';
        if (card.type === 'image') {
            content = <div className="flex items-center justify-center w-full h-full text-gray-800">{card.content}</div>;
        } else {
            content = <span className="text-lg md:text-2xl font-extrabold p-1 text-gray-800">{card.content}</span>;
        }
    }

    // 2. Renderização do Componente de Carta
    return (
        <div
            className="perspective-1000 min-h-[120px] md:min-h-[140px] h-full"
            onClick={() => !isFlippingDisabled && !isFlipped && onClick(card.id)}
            style={{
                // A lógica de desabilitar o clique está no hook, mas reforçamos o estilo
                pointerEvents: isFlippingDisabled || isFlipped ? 'none' : 'auto',
            }}
        >
            <div
                className={`relative transition-transform duration-500 ease-in-out transform w-full h-full preserve-3d ${isFlipped ? 'rotate-y-180' : 'hover:scale-[1.02] cursor-pointer'}`}
            >
                {/* Face Front (Carta Virada) */}
                <div className="absolute w-full h-full backface-hidden rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-800/50 flex items-center justify-center p-2">
                    <div className="flex flex-col items-center">
                        <Zap className="w-8 h-8 md:w-10 md:h-10" />
                        <span className="text-sm font-semibold">Anatomia</span>
                    </div>
                </div>

                {/* Face Back (Conteúdo da Carta) */}
                <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-lg ${backFaceClass} flex items-center justify-center p-2 rotate-y-180`}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Card;