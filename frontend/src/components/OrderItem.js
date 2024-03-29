import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";

const OrderItem = () =>{
    const { id } = useParams();
    const isAdmin = useSelector((state)=> state.user.isAdmin);
    const [orderPizzas, setOrderPizzas] = useState([]);
    const [orderPersons, setorderPersons] = useState([]);

    const fetchOrderPizzas = async () => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${id}/pizzas`);
            const ordersDataPizzas = await response.json();
            console.log(ordersDataPizzas);
            return ordersDataPizzas;
        } catch (error) {
            console.error('Błąd pobierania danych zamówienia:', error);
            return [];
        }
    };

    const fetchOrderPersons = async () => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${id}/persons`);
            const ordersDataPersons = await response.json();
            console.log(ordersDataPersons);
            return ordersDataPersons;
        } catch (error) {
            console.error('Błąd pobierania danych zamówienia:', error);
            return [];
        }
    };
    const generateOrderListHTML = async () => {
        try {
            const ordersDataPizzas = await fetchOrderPizzas();
            const ordersDataPersons = await fetchOrderPersons();
            setOrderPizzas(ordersDataPizzas);
            setorderPersons(ordersDataPersons)
        } catch (error) {
            console.error('Błąd generowania listy zamówień:', error);
        }
    };

    useEffect(() => {
        generateOrderListHTML();
    }, []);

    return (
        <div className="form-body">
        <div className="form-container">
            {isAdmin ? (
                    <div>
                        <Link to="/orderList">Podrót do listy</Link>
                        <h1>Szczeguły zamówienia nr {id}</h1>
                        <h2>Dostawa</h2>
                        <div>
                            {orderPersons.Dostawca === null ? (
                                <p>Dostawca: Brak</p>

                            ):(
                                <p><Link to={`/person/${orderPersons?.Dostawca}`}>Dostawca: {orderPersons.Dostawca}</Link></p>
                            )}
                            <br/>
                            {orderPersons.Odbiorca === null ? (
                                <p>Adres: {orderPersons.Adres}</p>
                            ):(
                                <p><Link to={`/person/${orderPersons?.Odbiorca}`}>Odbiorca: {orderPersons.Odbiorca}</Link></p>
                            )}
                        </div>
                    </div>
            ) : (
                <div>
                    <Link to="/information">Podrót do listy</Link>
                    <h1>Szczeguły zamówienia nr {id}</h1>
                    <div>
                        {orderPersons.Dostawca === null  ? (
                            <p>Dostawca: Brak</p>
                        ):(
                            <p>Dostawca: {orderPersons.Dostawca}</p>
                        )}
                    </div>
                </div>
            )}
            <h2>Pizze</h2>
            {orderPizzas && orderPizzas.map(order => (
                <div key={order.Id_pizzy}>
                    <p>Id pizzy: {order.Id_pizzy}</p>
                    <p>Nazwa: {order.Nazwa}</p>
                    <p>Cena: {order.cena}</p>
                    <p>Rozmiar: {order.rozmiar}</p>
                    <p>Składniki: {order.Skladniki}</p>
                    <p>Ilosc: {order.Ilosc}</p>
                    {isAdmin ? (
                        <div>
                            {order?.Pizzer === null ? (
                                <p>Pizzer: Brak</p>
                            ):(
                                <p><Link to={`/person/${order?.Pizzer}`}>Pizzer: {order?.Pizzer}</Link></p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {order?.Pizzer === null ? (
                                <p>Pizzer: Brak</p>
                            ):(
                                <p>Pizzer: {order?.Pizzer}</p>
                            )}
                        </div>
                    )}
                    <br/>
                </div>
            ))}


        </div>
        </div>
    )

}
export default OrderItem;