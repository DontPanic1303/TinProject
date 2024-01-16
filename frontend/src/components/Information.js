import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {deSetUser} from "../features/user/userSlice";

const Information = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    }, [user?.Id_osoba, isLoggedIn]);

    const deleteUser = async (userId) => {
        console.log(userId)
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
            navigate('/pizza');
            dispatch(deSetUser());
        } catch (e) {
            console.log(e)
        }
        console.log(`Usuwanie użytkownika o ID: ${userId}`);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>Informacje o koncie</h1>
                    <ul>
                        <li><strong>Imię:</strong> {user?.Imie}</li>
                        <li><strong>Nazwisko:</strong> {user?.Nazwisko}</li>
                        <li><strong>Rodzaj:</strong> {user?.Rodzaj}</li>
                        <li><strong>Adres:</strong> {user?.Adres}</li>
                    </ul>
                    <button onClick={() => deleteUser(user?.Id_osoba)}>Usuń konto</button>
                    <h2>Zamówienia</h2>
                    <div>
                        {orders.map((order) => (
                            <div key={order.id_zamowienia}>
                                <p>ID Zamówienia: {order.id_zamowienia}</p>
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
