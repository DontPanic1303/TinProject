import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from "../Model/User"
import "./Menu.css"

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
            setLogin("")
            setPassword("")
            console.log("zalogowano")
            setUser(new User(userFromRow))
            setIsLoggedIn(true);
        }
    }

    const handleLogout = () => {
        setUser(null)
        setIsLoggedIn(false);
    }

    return (
       <div class="top-side">
           <div class="left-side">
                <Link to="/pizza" class="link-container">Zamów pizze</Link>
           </div>
           <div class="right-side">
               {isLoggedIn ? (
                   <div class="login-container">
                       {user.Imie}
                       {user.Nazwisko}
                       <button onClick={handleLogout}>Wyloguj</button>
                   </div>
               ) : (
                    <div class="login-container">
                        Login: <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                        Haslo: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleLogin}>Zaloguj</button>
                        <Link to="/registration">
                            <button>Zarejestuj się</button>
                        </Link>
                    </div>
               )}
           </div>
       </div>
    );
}

export default Menu;