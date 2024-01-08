import { useState, useEffect } from 'react';
const UserList = () =>{
    const  [users, setUsers] = useState([]);


    // const fetchUsers = async () => {
    //     try {
    //         const response = await fetch('http://localhost/users');
    //         const users = await response.json();
    //         return users;
    //     } catch (error) {
    //         console.error('Błąd pobierania danych użytkowników:', error);
    //         return [];
    //     }
    // };

    useEffect(() => {
        // Tutaj możesz umieścić logikę pobierania użytkowników z serwera
        // np. wywołując funkcję fetchUsers().

        // Przykład tymczasowy z hardcoded danymi
        const hardcodedUsers = [
            {
                "id": 1,
                "imie": "John",
                "nazwisko": "Doe",
                "rodzaj": "Klient",
                "adres": "ul. Example 123"
            },
            {
                "id": 2,
                "imie": "Jane",
                "nazwisko": "Smith",
                "rodzaj": "Administrator",
                "adres": "ul. Sample 456"
            },
            {
                "id": 3,
                "imie": "Bob",
                "nazwisko": "Johnson",
                "rodzaj": "Klient",
                "adres": "ul. Test 789"
            }
        ];

        setUsers(hardcodedUsers);
    });


    const generateUserListHTML = () => {
        return users.map((user) => (
            <div key={user.id}>
                <p>ID: {user.id}</p>
                <p>Imię: {user.imie}</p>
                <p>Nazwisko: {user.nazwisko}</p>
                <p>Rodzaj: {user.rodzaj}</p>
                {user.rodzaj === 'Klient' ? <button onClick={() => deleteUser(user.id)}>Usuń</button> : ''}
                <p>Adres: {user.adres}</p>
            </div>
        ));
    };

    const deleteUser = (userId) => {
        // Tutaj możesz umieścić logikę usuwania użytkownika
        console.log(`Usuwanie użytkownika o ID: ${userId}`);
    };


    return (
        <div>
            {generateUserListHTML()}
        </div>
    );
}
export default UserList