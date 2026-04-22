export default function AllCards() {

const cardFiles = [
  'O.jpg','I.jpg','II.jpg','III.jpg','IV.jpg','V.jpg','VI.jpg',
  'VII.jpg','VIII.jpg','IX.jpg','X.jpg','XI.jpg','XII.jpg',
  'XIII.jpg','XIV.jpg','XV.jpg','XVI.jpg','XVII.jpg','XVIII.jpg',
  'XIX.jpg','XX.jpg','XXI.jpg'
];
    return (
        <main>
            <h1>The Cards</h1>
                <div className="cards-grid">
                    {cardFiles.map((file) => (
                    <img
                    key={file}
                    src={`/tarot_cards/${file}`}
                    alt={file.replace('.jpg', '')}
                    />
                    ))}
                </div>
        </main>
    )
}