import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const userLoged = useSelector((state) => state.user.user);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const usersData = await response.json();
            console.log(usersData);
            return usersData;
        } catch (error) {
            console.error('Błąd pobierania danych użytkowników:', error);
            return [];
        }
    };

    const deleteUser = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
        } catch (e) {
            console.log(e);
        }
        generateUserListHTML();
        console.log(`Usuwanie użytkownika o ID: ${userId}`);
    };

    const makeAdmin = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/admin`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
        } catch (e) {
            console.log(e);
        }
        generateUserListHTML();
        console.log(`Ustawanie admina o id: ${userId}`);
    };

    const makePizzer = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/pizzer`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
        } catch (e) {
            console.log(e);
        }
        generateUserListHTML();
        console.log(`Ustawanie admina o id: ${userId}`);
    };

    const makeDostawca = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/dostawca`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
        } catch (e) {
            console.log(e);
        }
        generateUserListHTML();
        console.log(`Ustawanie admina o id: ${userId}`);
    };

    const filteredUsers = currentUsers.filter(user => user.Id_osoba !== userLoged.Id_osoba);
    const generateUserListHTML = async () => {
        try {
            const usersData = await fetchUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Błąd generowania listy użytkowników:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        generateUserListHTML();
    }, []);

    return (
        <div>
            {isAdmin ? (
                <div>
                    {filteredUsers.map((user) => (
                        <div key={user.Id_osoba}>
                            <p>ID: {user.Id_osoba}</p>
                            <p>Imię: {user.Imie}</p>
                            <p>Nazwisko: {user.Nazwisko}</p>
                            <p>Rodzaj: {user.Rodzaj}</p>
                            <p>Adres: {user.Adres}</p>
                            <button onClick={() => deleteUser(user.Id_osoba)}>Usuń</button>
                            {user.Rodzaj === 'Klient' ? (
                                <div>
                                    <button onClick={() => makeAdmin(user.Id_osoba)}>Ustaw admina</button>
                                    <button onClick={() => makePizzer(user.Id_osoba)}>Ustaw pizzera</button>
                                    <button onClick={() => makeDostawca(user.Id_osoba)}>Ustaw dostawce</button>
                                </div>
                            ) : (
                                <br/>
                            )}
                            <br />
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
            ) : (
                <div>
                    <h1>Nie jesteś administratorem</h1>
                </div>
            )}
        </div>
    );
};

export default UserList;