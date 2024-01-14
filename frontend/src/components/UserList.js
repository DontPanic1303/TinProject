import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const isAdmin = useSelector((state) => state.user.isAdmin);

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
        generateUserListHTML()
        console.log(`Usuwanie użytkownika o ID: ${userId}`);
    };

    const generateUserListHTML = async () => {
        try {
            const usersData = await fetchUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Błąd generowania listy użytkowników:', error);
        }
    };

    useEffect(() => {
        generateUserListHTML();
    }, []);

    return (
        <div>
            {isAdmin ? (
                users.map((user) => (
                    <div key={user.Id_osoba}>
                        <p>ID: {user.Id_osoba}</p>
                        <p>Imię: {user.Imie}</p>
                        <p>Nazwisko: {user.Nazwisko}</p>
                        <p>Rodzaj: {user.Rodzaj}</p>
                        {user.Rodzaj === 'Klient' ? (
                            <button onClick={() => deleteUser(user.Id_osoba)}>Usuń</button>
                        ) : (
                            ''
                        )}
                        <p>Adres: {user.Adres}</p> <br />
                    </div>
                ))
            ) : (
                <div>
                    <h1>Nie jesteś administratorem</h1>
                </div>
            )}
        </div>
    );
};

export default UserList;