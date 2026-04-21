import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true // use SSL encryption when connecting to the database
})

app.use(express.json());

app.listen(port, () => {
    console.log("...We're in.");
})

// ------------------------------------------------
// Helper Functions

// 1. Get All Cards
const getAllCards = async () => {

    let result = await db.query(`
        SELECT *
        FROM major_arcana;

        SELECT *
        FROM minor_arcana;
        `);
    
    return result;

};

// 2. Get Major Arcana
const getMajorArcana = async () => {

    let result = await db.query(`
        SELECT *
        FROM major_arcana;
        `);
    
    return result;
};

// 3. Get Minor Arcana
const getMinorArcana = async () => {

    let result = await db.query(`
        SELECT *
        FROM minor_arcana;
        `);
    
    return result;
};

// 4. Get All Cards of Suit
const getCardsBySuit = async (suit) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE suit = 1$;`, [suit]
    );
    
    return result;
};

// 5. Get Minor Arcana by Type
const getCardsByType = async (suit) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE suit = 1$;`, [suit]
    );
    
    return result;
};

// 6. Get Cards by Suit and Type
const getCardsBySuitAndType = async (suit, type) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE suit = $1
        AND card_name LIKE '%$2%'`, [suit, type]
    )

    return result;
}

// 7. Get Major Card by Name
const getMajorCardByName = async (name) => {

    let result = await db.query(
        `SELECT *
        FROM major_arcana
        WHERE card_name = $1`, [name]
    )

    return result;
}

// 8. Get Minor Card by Name
const getMinorCardByName = async (name) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE card_name = $1`, [name]
    )

    return result;
}

// ------------------------------------------------
// Endpoints

// 1. Get All Cards
app.get('/get-all-cards', async (req, res) => {
    try {

        const result = await getAllCards();
    
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting cards: ${error.message}`);
    }
});

// 2. Get Major Arcana
app.get('/get-major-arcana', async (req, res) => {
    try {

        const result = await getMajorArcana();
    
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting cards: ${error.message}`);
    }
});

// 3. Get Minor Arcana
app.get('/get-minor-arcana', async (req, res) => {
    try {

        const result = await getMinorArcana();
    
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting cards: ${error.message}`);
    }
});

// 4. Get All Cards of Suit
app.get('/get-cards-by-suit/:suit', async (req, res) => {
    try {

        let suit = req.query.suit;

        const result = await getCardsBySuit(suit);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting suit: ${error.message}`)
    }
})

// 5. Get Cards by Type
app.get('/get-cards-by-type', async (req, res) => {
    try {

        let type = req.query.type;

        const result = await getCardsByType(type);

        res.json(result)

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting type: ${error.message}`)
    }
})

// 6. Get Cards by Suit and Type
app.get('/get-cards-by-suit-and-type', async (req, res) => {
    try {

        let suit = req.query.suit;
        let type = req.query.type;

        const result = await getCardsBySuitAndType(suit, type);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting type and suit: ${error.message}`)
    }
})

// .7 Get Major Card by Name
app.get('/get-major-card-by-name/:name', async (req, res) => {
    try {

        let name = req.query.name;

        const result = await getMajorCardByName(name);
        
        res.json(result);

    } catch (error) {
        log.error(error);
        res.status(500).json(`Error getting major card:, ${ error.message }`);
    }

})

// .8 Get Minor Card by Name
app.get('/get-minor-card-by-name/:name', async (req, res) => {
    try {

        let name = req.query.name;

        const result = await getMinorCardByName(name);

        res.json(result);

    } catch (error) {
        log.error(error);
        res.status(500).json(`Error getting minor card:, ${ error.message }`);
    }

})