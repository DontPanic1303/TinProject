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

function allAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

async function getAllOrders(req, res) {
    try {
        const orders = await allAsync('SELECT Id_zam, data FROM Zamowiania');

        console.log(JSON.stringify(orders));
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

async function getOrderByUserId(req, res) {
    const {id} = req.params;

    try {
        const orders = await allAsync('SELECT Id_zam, data FROM Zamowiania WHERE Odbiorca = ?', [id]);

        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting orders by user id:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

async function getOrderPizzasById(req, res) {
    const { id } = req.params;

    console.log("Id pizzas",id)

    try {
        const pizzas = await allAsync(`
            SELECT P.Id_pizzy, P.Nazwa, P.cena, P.rozmiar, P.Skladniki,
                   PDO.Ilosc, PDO.Pizzer
            FROM Pizza P
            JOIN Pizza_do_zamowienia PDO ON P.Id_pizzy = PDO.Id_pizzy
            WHERE PDO.Id_zam = ?`, [id]);

        console.log("pizzas",pizzas);

        if (!pizzas || pizzas.length === 0) {
            res.status(404).json({ error: 'Nie znależiono zamówienia lub brak pizz w zamówieniu' });
            return;
        }

        res.status(200).json(pizzas);
    } catch (error) {
        console.error('Błąd przy pobieraniu pizz:', error);
        res.status(500).json({ error: 'Błąd serwara' });
    }
}

async function getOrderPersonsById(req, res) {
    const {id} = req.params;

    console.log("id person",id);

    try {
        const orderInfo = await getAsync(`
            SELECT Dostawca, Odbiorca, Adres
            FROM Zamowiania
            WHERE Id_zam = ?`, [id]);

        console.log("persons",orderInfo);

        if (!orderInfo || orderInfo.length === 0) {
            res.status(404).json({error: 'Nie znaleziono zamówienia'});
            return;
        }

        const {Dostawca, Odbiorca, Adres} = orderInfo;

        res.status(200).json({Dostawca, Odbiorca, Adres});
    } catch (error) {
        console.error('Błąd przy pobierania osób zamówienia:', error);
        res.status(500).json({error: 'Błąd servera'});
    }

}

async function makeNewOrder(req, res) {
    try {
        const maxIdResult = await getAsync('SELECT MAX(Id_zam) AS maxId FROM Zamowiania', []);
        const maxId = maxIdResult.maxId || 0;

        const newOrderId = maxId + 1;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const { Odbiorca, Adres } = req.body;
        console.log('Odbiorca i adres', Odbiorca, Adres);

        const recipientId = Odbiorca || null;
        const deliveryAddress = Odbiorca ? null : Adres;

        await runAsync(
            'INSERT INTO Zamowiania (Id_zam, data, Dostawca, Odbiorca, Adres) VALUES (?, ?, null, ?, ?)',
            [newOrderId, currentDate, recipientId, deliveryAddress]
        );
        console.log("id_zam: ",newOrderId);
        res.status(200).json({ id_zam: newOrderId });
    } catch (error) {
        console.error('Błąd podczas tworzenia zamówienia:', error);
        res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia zamówienia.' });
    }
}

async function addPizzasToOrder(req, res) {
    const { id } = req.params;
    const pizzas = req.body;

    console.log('id_zam', id);

    try {
        for (const pizza of pizzas) {
            const { Id_pizzy, ilosc } = pizza;

            console.log('Id_pizzy i ilosc', Id_pizzy,ilosc);

            await runAsync(
                'INSERT INTO Pizza_do_zamowienia (Id_zam, Id_pizzy, Ilosc) VALUES (?, ?, ?)',
                [id, Id_pizzy, ilosc]
            );
        }

        res.status(200).json({ message: 'Pizze dodane pomyślne' });
    } catch (error) {
        console.error('Błąd podczas dodawania pizz', error);
        res.status(500).json({ error: 'Błąd podczas dodawania zamówienia' });
    }
}

module.exports = {
    getAllOrders,
    getOrderPizzasById,
    getOrderPersonsById,
    getOrderByUserId,
    makeNewOrder,
    addPizzasToOrder,
}