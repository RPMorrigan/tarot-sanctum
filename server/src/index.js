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
        FROM major_arcana
        ORDER BY id ASC;

        SELECT *
        FROM minor_arcana
        ORDER BY id ASC;
        `);
    
    return result.rows;

};

// 2. Get Major Arcana
const getMajorArcana = async () => {

    let result = await db.query(`
        SELECT *
        FROM major_arcana
        ORDER BY id ASC;
        `);
    
    return result.rows;
};

// 3. Get Minor Arcana
const getMinorArcana = async () => {

    let result = await db.query(`
        SELECT *
        FROM minor_arcana
        ORDER BY id ASC;
        `);
    
    return result.rows;
};

// 4. Get All Cards of Suit
const getCardsBySuit = async (suit) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE card_suit = $1`, [suit]
    );
    
    return result.rows;
};

// 5. Get Minor Arcana by Type
const getCardsByType = async (type) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE card_name LIKE $1 || '%'`, [type]
    );
    
    return result.rows;
};

// 6. Get Major Card by Name
const getMajorCardByName = async (name) => {

    let result = await db.query(
        `SELECT *
        FROM major_arcana
        WHERE card_name = $1`, [name]
    )

    return result.rows[0];
}

// 7. Get Minor Card by Name
const getMinorCardByName = async (name) => {

    let result = await db.query(
        `SELECT *
        FROM minor_arcana
        WHERE card_name = $1`, [name]
    )

    return result.rows[0];
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

        let suit = req.params.suit;

        const result = await getCardsBySuit(suit);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting suit: ${error.message}`)
    }
})

// 5. Get Cards by Type
app.get('/get-cards-by-type/:type', async (req, res) => {
    try {

        let type = req.params.type;

        const result = await getCardsByType(type);

        res.json(result)

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting type: ${error.message}`)
    }
})

// .6 Get Major Card by Name
app.get('/get-major-card-by-name/:name', async (req, res) => {
    try {

        let name = req.params.name;

        const result = await getMajorCardByName(name);
        
        res.json(result);

    } catch (error) {
        log.error(error);
        res.status(500).json(`Error getting major card:, ${ error.message }`);
    }

})

// .7 Get Minor Card by Name
app.get('/get-minor-card-by-name/:name', async (req, res) => {
    try {

        let name = req.params.name;

        const result = await getMinorCardByName(name);

        res.json(result);

    } catch (error) {
        log.error(error);
        res.status(500).json(`Error getting minor card:, ${ error.message }`);
    }

})