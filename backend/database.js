const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

const fs = require('fs');
const sqlScript = fs.readFileSync('Pizzeria_create.sql', 'utf8');

db.serialize(() => {
    db.exec(sqlScript, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Skrypt SQL został pomyślnie wykonany.');
        }
    });
});

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


db.close();