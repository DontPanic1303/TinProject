import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { deSetUser, setUser } from '../features/user/userSlice';

const Information = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10)
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${user?.Id_osoba}`);

            if (!response.ok) {
                throw new Error('Błąd podczas pobierania zamówień');
            }

            const ordersData = await response.json();
            console.log("Pobrane ordery", ordersData);
            return ordersData;
        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    const putOrders = async () => {
        try {
            const ordersData = await fetchOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Błąd generowania listy użytkowników:', error);
        }
    }

    useEffect(() => {
        if (isLoggedIn && user.Rodzaj === 'Klient') {
            putOrders();
        }
    }, [user?.Id_osoba, isLoggedIn]);

    const deleteUser = async (userId) => {
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
            console.log(e);
        }
        console.log(`Usuwanie użytkownika o ID: ${userId}`);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser({ ...user });
    };

    const handleSaveEdit = async () => {
        try {
            const editedUserWithoutRodzaj = { ...editedUser, Rodzaj: user?.Rodzaj };

            const response = await fetch(`http://localhost:3001/user/${user?.Id_osoba}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUserWithoutRodzaj),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
            console.log(editedUserWithoutRodzaj)
            changeUser(JSON.stringify(editedUserWithoutRodzaj));
        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    const changeUser = (editedUserWithoutRodzaj) => {
        dispatch(setUser(editedUserWithoutRodzaj));
        setIsEditing(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div  className="form-body">
        <div className="form-container">
            {isLoggedIn ? (
                <div>
                    {isEditing ? (
                        <div>
                            <h1>Edytuj informacje o koncie</h1>
                            <form>
                                <label>
                                    Imię:
                                    <input type="text" name="Imie" value={editedUser.Imie} onChange={handleChange} />
                                </label>
                                <br />

                                <label>
                                    Nazwisko:
                                    <input type="text" name="Nazwisko" value={editedUser.Nazwisko} onChange={handleChange} />
                                </label>
                                <br />

                                <label>
                                    Rodzaj:
                                    <input type="text" name="Rodzaj" value={user?.Rodzaj} disabled />
                                </label>
                                <br />

                                <label>
                                    Adres:
                                    <input type="text" name="Adres" value={editedUser.Adres} onChange={handleChange} />
                                </label>
                                <br />

                                <button type="button" onClick={handleCancelEdit}>
                                    Anuluj
                                </button>&nbsp;
                                <button type="button" onClick={handleSaveEdit}>
                                    Zapisz
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1>Informacje o koncie</h1>
                            <ul>
                                <li>
                                    <strong>Imię:</strong> {user?.Imie}
                                </li>
                                <li>
                                    <strong>Nazwisko:</strong> {user?.Nazwisko}
                                </li>
                                <li>
                                    <strong>Rodzaj:</strong> {user?.Rodzaj}
                                </li>
                                <li>
                                    <strong>Adres:</strong> {user?.Adres}
                                </li>
                            </ul>
                            <button onClick={() => deleteUser(user?.Id_osoba)}>Usuń konto</button>&nbsp;
                            <button onClick={handleEdit}>Zmodyfikuj</button>
                            {user.Rodzaj === 'Klient' && (
                                <div>
                                    <br/>
                                    <h2>Zamówienia</h2>
                                    <br/>
                                    <div>
                                        {currentOrders.map((orders) =>(
                                            <div key={orders.Id_zam}>
                                               <p><Link to={`/orderList/${orders.Id_zam}`}>Zamówienie nr: {orders.Id_zam}, z dnia: {orders.data}</Link></p>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                    <ul className="pagination">
                                        <li onClick={() => handlePageChange(1)}>|&lt;</li>
                                        <li onClick={() => handlePageChange(currentPage - 1)}>&lt;</li>
                                        <li>{currentPage}</li>
                                        <li onClick={() => handlePageChange(currentPage + 1)}>&gt;</li>
                                        <li onClick={() => handlePageChange(totalPages)}>&gt;|</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Proszę się zalogować</h1>
                </div>
            )}
        </div>
        </div>
    );
};

export default Information;
