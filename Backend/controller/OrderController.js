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

function getAllOrders(req, res) {

}

function getOrderByUserId(req, res) {
    const { id } = req.params;
    try {
        

    } catch (error) {
        console.log(error.message);
    }
}

function getOrderPizzasById(req, res) {

}

function getOrderPersonsById(req, res) {

}

function makeNewOrder(req, res) {

}

module.exports = {
    getAllOrders,
    getOrderPizzasById,
    getOrderPersonsById,
    getOrderByUserId,
    makeNewOrder,
}