const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../mydatabase.db');
const db = new sqlite3.Database(dbPath);

function runAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this);
        });
    });
}

function getAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
}
async function loginUser(req, res) {
    const { Login, Haslo } = req.body;

    try {
        const row = await getAsync('SELECT * FROM Osoba WHERE Login = ? AND Haslo = ?', [Login, Haslo]);

        if (!row) {
            res.status(404).json({ error: 'Błędny login lub hasło' });
            return;
        }

        const User = {
            Id_osoba: row.Id_osoba,
            Imie: row.Imie,
            Nazwisko: row.Nazwisko,
            Rodzaj: row.Rodzaj,
            Adres: row.Adres
        };

        res.status(200).json(User);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
}

async function addUser(req, res) {
    const { Imie, Nazwisko, Login, Haslo, Adres } = req.body;
    const Rodzaj = 'Klient';
    console.log(req.body);
    try {
        const { maxId } = await getAsync('SELECT MAX(Id_osoba) AS maxId FROM Osoba') || { maxId: 0 };
        const newId = maxId + 1;

        await runAsync(
            'INSERT INTO Osoba (Id_osoba, Imie, Nazwisko, Login, Haslo, Rodzaj, adres) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [newId, Imie, Nazwisko, Login, Haslo, Rodzaj, Adres]
        );

        res.json({ message: 'Osoba została dodana', id: newId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { Imie, Nazwisko, Login, Haslo, Rodzaj, adres } = req.body;

    try {
        await runAsync(
            'UPDATE Osoba SET Imie = ?, Nazwisko = ?, Login = ?, Haslo = ?, Rodzaj = ?, adres = ? WHERE Id_osoba = ?',
            [Imie, Nazwisko, Login, Haslo, Rodzaj, adres, id]
        );

        res.json({ message: 'Osoba została zaktualizowana', id: id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
}

async function makeAdmin(req, res) {
    const { id } = req.params;

    try {
        await runAsync('UPDATE Osoba SET Rodzaj = ? WHERE Id_osoba = ?', ['admin', id]);

        res.json({ message: 'Rodzaj użytkownika został zmieniony na admin' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        await runAsync('DELETE FROM Pizza_do_zamowienia WHERE Zamowiania_id_zam IN (SELECT id_zam FROM Zamowienia WHERE Odbiorca = ?)', [id]);

        await runAsync('DELETE FROM Osoba WHERE Id_osoba = ?', [id]);

        res.json({ message: 'Użytkownik i jego zamówienia zostały usunięte' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
}

function getAllUsers(req, res) {
    db.all('SELECT * FROM Osoba', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({error: 'Błąd bazy danych'});
        }

        const hardcodedUsers = [
            {
                "id": 1,
                "imie": "John",
                "nazwisko": "Doe",
                "rodzaj": "Klient",
                "adres": "ul. Example 123"
            },
            {
                "id": 2,
                "imie": "Jane",
                "nazwisko": "Smith",
                "rodzaj": "Administrator",
                "adres": "ul. Sample 456"
            },
            {
                "id": 3,
                "imie": "Bob",
                "nazwisko": "Johnson",
                "rodzaj": "Klient",
                "adres": "ul. Test 789"
            }
        ];

        res.json(rows);
    });
}

module.exports = {
    loginUser,
    addUser,
    updateUser,
    makeAdmin,
    deleteUser,
    getAllUsers
};