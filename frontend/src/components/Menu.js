import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Menu.css"
import {useSelector, useDispatch} from "react-redux";
import {setUser, deSetUser} from "../features/user/userSlice";
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const [login, setLogin] = useState();
    const [password, setPassword] = useState()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
    const isAdmin = useSelector((state)=> state.user.isAdmin);
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Login: login, Haslo: password }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    alert('Błędny login lub hasło');
                    return;
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Błąd podczas logowania');
                }
            }

            const userData = await response.json();
            setNewUser(JSON.stringify(userData));

        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    const setNewUser = (userData) =>{
        dispatch(setUser(userData));
        setLogin("");
        setPassword("");
        navigate('/pizza');
    }

    const handleLogout = () => {
        dispatch(deSetUser());
        navigate('/pizza')
    }

    return (
       <div class="top-side">
           <div class="left-side">
                <Link to="/pizza" class="link-container">Zamów pizze</Link>
               {isLoggedIn && (<Link to="/information" class="link-container">Informacie o koncie</Link>)}
               {isAdmin && (<Link to="/userList" class="link-container">Lista urzytkowników</Link>)}
           </div>
           <div class="right-side">
               {isLoggedIn ? (
                   <div class="login-container">
                       {user.Imie} {user.Nazwisko} <button onClick={handleLogout}>Wyloguj</button>
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