import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
const OrderList = () =>{
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(20);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders');
            const ordersData = await response.json();
            console.log(ordersData);
            return ordersData;
        } catch (error) {
            console.error('Błąd pobierania danych zamówień:', error);
            return [];
        }
    };
    const generateOrderListHTML = async () => {
        try {
            const ordersData = await fetchOrders();
            console.log(ordersData);
            setOrders(ordersData);
        } catch (error) {
            console.error('Błąd generowania listy zamówień:', error);
        }
    };

    useEffect(() => {
        generateOrderListHTML();
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const indexOfLastUser = currentPage * ordersPerPage;
    const indexOfFirstUser = indexOfLastUser - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <div>
            {isAdmin ? (
                <div>
                    {currentOrders.map((orders) =>(
                        <div key={orders.Id_zam}>
                            <p><Link to={`/orderList/${orders.Id_zam}`}>Zamówienie nr: {orders.Id_zam}, z dnia: {orders.data}</Link></p>
                            <br/>
                        </div>
                    ))}
                    <ul className="pagination">
                        <li onClick={() => handlePageChange(1)}>|&lt;</li>
                        <li onClick={() => handlePageChange(currentPage - 1)}>&lt;</li>
                        <li>{currentPage}</li>
                        <li onClick={() => handlePageChange(currentPage + 1)}>&gt;</li>
                        <li onClick={() => handlePageChange(totalPages)}>&gt;|</li>
                    </ul>
                </div>
            ):(
                <div>
                    <h1>Nie masz dostępu</h1>
                </div>
            )}

        </div>
    )
}

export default OrderList;