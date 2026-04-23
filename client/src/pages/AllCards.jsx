import { useState, useEffect } from 'react';
import MajorCard from '../components/MajorCard';

export default function AllCards() {
    const [majorCards, setMajorCards] = useState([]);

    const theCards = async () => {
        const res = await fetch('/api/get-major-arcana/');
        const data = await res.json();
        setMajorCards(data);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        theCards()
    }, []);

    return (
        <main>
            <div className="h1-wrapper">
            <h1>The Cards</h1>
            </div>
                <div className="cards">
                    {majorCards.map((card) => (
                        <MajorCard key={card.id} card={card} />
                    ))}
                </div>
        </main>
    )
}