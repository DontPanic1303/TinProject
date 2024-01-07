const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../mydatabase.db');
const db = new sqlite3.Database(dbPath);
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

module.exports = loginUser;