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
app.get('/get-minor- arcana', async (req, res) => {
    try {

        const result = await getMinorArcana();
    
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting cards: ${error.message}`);
    }
});
