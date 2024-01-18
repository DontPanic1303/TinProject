const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

const fs = require('fs');
const sqlScript = fs.readFileSync('Pizzeria_create.sql', 'utf8');

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

// db.serialize(() => {
//     db.exec(sqlScript, (err) => {
//         if (err) {
//             console.error(err.message);
//         } else {
//             console.log('Skrypt SQL został pomyślnie wykonany.');
//         }
//     });
// });
//
// db.all('CREATE TABLE Pizza_do_zamowienia (\n' +
//     '                                     Pizzer integer,\n' +
//     '                                     Id_zam integer NOT NULL,\n' +
//     '                                     Id_pizzy integer NOT NULL,\n' +
//     '                                     Ilosc integer NOT NULL,\n' +
//     '                                     CONSTRAINT Pizza_do_zamowienia_pk PRIMARY KEY (Id_zam,Id_pizzy),\n' +
//     '                                     CONSTRAINT Pizza_do_zamowienia_Zamowiania FOREIGN KEY (Id_zam)\n' +
//     '                                         REFERENCES Zamowiania (Id_zam),\n' +
//     '                                     CONSTRAINT Pizza_do_zamowienia_Pizza FOREIGN KEY (Id_pizzy)\n' +
//     '                                         REFERENCES Pizza (Id_pizzy),\n' +
//     '                                     CONSTRAINT Pizza_do_zamowienia_Osoba FOREIGN KEY (Pizzer)\n' +
//     '                                         REFERENCES Osoba (Id_osoba)\n' +
//     ');', (err, rows) => {
// });

async function a() {
    try {
        const a = await runAsync('DELETE FROM Zamowiania');
        console.log(JSON.stringify(a));
    } catch (error) {
        console.error('Error getting all orders:', error);

    }
}

//a();

// db.all(' SELECT Dostawca, Odbiorca, Adres FROM Zamowiania WHERE Id_zam = 4', (err, rows) => {
//     console.log(rows);
//     if (!rows || rows.length === 0) {
//         res.status(404).json({error: 'Nie znaleziono zamówienia'});
//         return;
//     }
// });

db.all(`SELECT * FROM Osoba WHERE Id_osoba = 7`, (err, rows) => {
    console.log(rows);
    if (!rows || rows.length === 0) {
        console.log("nie")
    }

    console.log(err);
});

db.close();

