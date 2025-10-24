import { useState } from "react"


export default function useMemoryGameState() {

    const [name, setName] = useState<string>("")
    const [playing, setPlaying] = useState<boolean>(false)
    const [level, setLevel] = useState<number>(1)
    const [score, setScore] = useState<number>(0)


    return {
        name, playing, level, score,
        setName, setPlaying, setLevel, setScore
    }
}