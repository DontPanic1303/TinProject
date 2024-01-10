import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Information = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3001/orders/${user.Id_osoba}`); //końcówka do implamentracji

                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania zamówień');
                }

                const ordersData = await response.json();
                setOrders(ordersData);
            } catch (error) {
                console.error('Błąd:', error.message);
            }
        };

        if (isLoggedIn) {
            fetchOrders();
        }
    }, [user.Id_osoba, isLoggedIn]);

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>Informacje o koncie</h1>
                    <ul>
                        <li><strong>Imię:</strong> {user.Imie}</li>
                        <li><strong>Nazwisko:</strong> {user.Nazwisko}</li>
                        <li><strong>Rodzaj:</strong> {user.Rodzaj}</li>
                        <li><strong>Adres:</strong> {user.Adres}</li>
                    </ul>
                    <h2>Zamówienia</h2>
                    <div>
                        {orders.map((order) => (
                            <div key={order.id_zamowienia}>
                                {/* Wyświetlanie informacji o zamówieniach */}
                                <p>ID Zamówienia: {order.id_zamowienia}</p>
                                {/* Dodaj inne informacje o zamówieniach, które chcesz wyświetlić */}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Proszę się zalogować</h1>
                </div>
            )}
        </div>
    );
};

export default Information;
