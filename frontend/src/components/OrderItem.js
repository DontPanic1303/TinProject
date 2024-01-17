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
        <div>
            {isAdmin ? (
                <Link to="/orderList">Podrót do listy</Link>
            ) : (
                <Link to="/information">Podrót do listy</Link>
            )}
            <h1>Szczeguły zamówienia nr {id}</h1>
            {orderPizzas.map(order => (
                <div key={order.Id_pizzy}>

                </div>
            ))}


        </div>
    )

}
export default OrderItem;