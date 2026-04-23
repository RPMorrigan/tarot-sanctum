export default function MajorCard({ card }) {

    const { card_num, card_name, card_description, upright, reverse } = card;
    const imageSrc = `/tarot_cards/${card_num}.jpg`;

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