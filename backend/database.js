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


db.close();