type CardProps = {
    card: { id: number; type: string; content: string }
    flipped: boolean
    clickable: boolean
    onClick: () => void
}

export default function Card({ card, flipped, clickable, onClick }: CardProps) {
    return (
        <div className="w-32 h-32 [perspective:1000px]" onClick={onClick}        >
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]         ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>

                <div className={`absolute inset-0 flex items-center justify-center text-5xl bg-gray-950 text-white rounded-lg 
          border border-gray-700 ${clickable ? 'cursor-pointer' : ''} [backface-visibility:hidden]`}>
                    ❓
                </div>

                <div className={`absolute inset-0 flex items-center justify-center bg-white border border-gray-700 rounded-lg 
          ${clickable ? 'cursor-pointer' : ''} [transform:rotateY(180deg)] [backface-visibility:hidden]`} >
                    {card.type === 'image' ? (
                        <img
                            src={card.content}
                            alt=""
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    ) : (
                        <span className="font-bold text-gray-900 text-sm uppercase text-center">
                            {card.content}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
