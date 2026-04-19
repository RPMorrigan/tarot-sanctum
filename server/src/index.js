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

const getAllCards = async () => {

    let result = db.query(`
        SELECT *
        FROM major_arcana
        AND FROM minor_arcana
        `);
    
    return result;

}

// ------------------------------------------------
// Endpoints

app.get('/get-all-cards', async (req, res) => {
    try {

        const result = await getAllCards();
    
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json(`Error getting cards: ${ error.message }`);
    }
})