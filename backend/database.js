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

// db.get(`UPDATE Zamowiania SET Dostawca = 7 WHERE Id_zam = 29`, (err, rows) => {
//     console.log(rows);
//     if (!rows || rows.length === 0) {
//         console.log("nie")
//     }
//
//     console.log(err);
// });

// db.get(`UPDATE Pizza_do_zamowienia SET Pizzer = 8 WHERE Id_zam = 29 AND Id_pizzy = 3`, (err, rows) => {
//     console.log(rows);
//     if (!rows || rows.length === 0) {
//         console.log("nie")
//     }
//
//     console.log(err);
// });

db.close();

