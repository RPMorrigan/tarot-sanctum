export default function MajorCard({ card }) {

    const { id, card_num, card_name, card_description, upright, reverse } = card;
    const cardImages = import.meta.glob('../assets/tarot_cards/*.jpg', {
        eager: true,
        import: 'default',
    });
    const imageSrc = cardImages[`../assets/tarot_cards/${id}.jpg`];

    return (
        <div className="card-sleeve">
            <div className="card-top">
            <h2 className="card-number">{ card_num }</h2>
            <h2 className="card-title">{card_name}</h2>
            </div>
            <div className="card-frame">
            <img src={imageSrc} alt={card_name} />
            </div>
            <details>
            <summary>Description</summary>
            <p className="description">
                {card_description.trim('"')}
            </p>
            </details>
            <details>
                <summary>Meanings</summary>
                <details>
                <summary>Upright</summary>
                <p className="meaning upright">{upright}</p>
                </details>

                <details>
                <summary>Reverse</summary>
                <p className="meaning reverse">{ reverse }</p>
                </details>
            </details>


        </div>
    )
}