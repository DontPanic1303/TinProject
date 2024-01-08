const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../mydatabase.db');
const db = new sqlite3.Database(dbPath);

const runAsync = promisify(db.run.bind(db));
const getAsync = promisify(db.get.bind(db));

function getPizza (req, res) {
    const query = 'SELECT Nazwa, cena, rozmiar, skladniki FROM pizza';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({error: 'Błąd bazy danych'});
            return;
        }

        res.json(rows);
    })
}

async function addPizza(req, res) {
    const {Nazwa, cena, rozmiar, skladniki} = req.body;

    try {
        const {maxId} = await getAsync('SELECT MAX(id_pizzy) AS maxId FROM pizza') || {maxId: 0};
        const newId = maxId + 1;

        await runAsync(
            'INSERT INTO pizza (id_pizzy, Nazwa, cena, rozmiar, skladniki) VALUES (?, ?, ?, ?, ?)',
            [newId, Nazwa, cena, rozmiar, skladniki]
        );

        res.json({message: 'Pizza została dodana', id: newId});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Błąd bazy danych'});
    }
}

module.exports = getPizza, addPizza;