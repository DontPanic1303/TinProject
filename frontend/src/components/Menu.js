import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from "../Model/User"

const Menu = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState();
    const [password, setPassword] = useState()

    const handleLogin = () => {
        if (login === 'adm' && password === '123') {
            const userFromRow = {
                Id_osoba: 1,
                Imie: 'John',
                Nazwisko: 'Doe',
                Rodzaj: 'Klient',
                Adres: 'ul. Example 123'
            };
            setUser(new User(userFromRow))
            setIsLoggedIn(true);
        }
    }

    const handleLogout = () => {
        setUser(null)
        setIsLoggedIn(false);
    }

    return (
       <div>
           <div >
                <Link to="/pizza">Zamów pizze</Link>
           </div>
           <div>
               {isLoggedIn ? (
                   <div>
                       {user.Imie}
                       {user.Nazwisko}
                       <button onClick={handleLogout}>Wyloguj</button>
                   </div>
               ) : (
                    <div>
                        Login: <input type="text" value={login}/>
                        Haslo: <input type="password" value={password}/>
                        <button onClick={handleLogin}>Zaloguj</button>
                    </div>
               )}
           </div>
       </div>
    );
}

export default Menu;