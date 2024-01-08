const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../mydatabase.db');
const db = new sqlite3.Database(dbPath);

const runAsync = promisify(db.run.bind(db));
const getAsync = promisify(db.get.bind(db));
function loginUser (req, res){
    const {Login, Haslo} = req.body;
    db.get('SELECT * FROM Osoba WHERE Login = ? AND Haslo = ?',[Login,Haslo],(err,row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Błąd bazy danych' });
            return;
        }

        if (!row) {
            res.status(404).json({ error: 'Błędny login lub hasło' });
            return;
        }

        const User = {
            Id_osoba : row.Id_osoba,
            Imie : row.Imie,
            Nazwisko : row.Nazwisko,
            Rodzaj : row.Rodzaj,
            Adres : row.Adres
        }

        res.status(200).json(User);
    });
}

async function addUser(req, res) {
    const {Imie, Nazwisko, Login, Haslo, adres} = req.body;
    const Rodzaj = 'Klient';

    try {

        const {maxId} = await getAsync('SELECT MAX(Id_osoba) AS maxId FROM Osoba') || {maxId: 0};

        const newId = maxId + 1;
        await runAsync(
            'INSERT INTO Osoba (Id_osoba, Imie, Nazwisko, Login, Haslo, Rodzaj, adres) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [newId, Imie, Nazwisko, Login, Haslo, Rodzaj, adres]
        );

        res.json({message: 'Osoba została dodana', id: newId});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Błąd bazy danych'});
    }
}

function updateUser(req, res){
    const { id } = req.params;
    const { Imie, Nazwisko, Login, Haslo, Rodzaj, adres } = req.body;

    const updateQuery = `
    UPDATE Osoba
    SET Imie = ?, Nazwisko = ?, Login = ?, Haslo = ?, Rodzaj = ?, adres = ?
    WHERE Id_osoba = ?
  `;

    db.run(updateQuery, [Imie, Nazwisko, Login, Haslo, Rodzaj, adres, id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Błąd bazy danych' });
            return;
        }

        res.json({ message: 'Osoba została zaktualizowana', id: id });
    });
}

function makeAdmin(req, res){
    const { id } = req.params;

    db.run('UPDATE Osoba SET Rodzaj = ? WHERE Id_osoba = ?', ['admin', id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Błąd bazy danych' });
        }

        res.json({ message: 'Rodzaj użytkownika został zmieniony na admin' });
    });
}

async function deleteUser(req, res) {
    const {id} = req.params;

    try {
        await runAsync('DELETE FROM Pizza_do_zamowienia WHERE Zamowiania_id_zam IN (SELECT id_zam FROM Zamowienia WHERE Odbiorca = ?)', [id]);

        await runAsync('DELETE FROM Osoba WHERE Id_osoba = ?', [id]);

        res.json({message: 'Użytkownik i jego zamówienia zostały usunięte'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Błąd bazy danych'});
    }
}

function getAllUsers(req,res){
    db.all('SELECT * FROM Osoba', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Błąd bazy danych' });
        }

        res.json(rows);
    });
}

module.exports = loginUser,addUser, updateUser, makeAdmin, deleteUser, getAllUsers;