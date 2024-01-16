import {useSelector, useDispatch} from "react-redux";
import React, { useState } from 'react';
import "./Registration.css"
import {setUser} from "../features/user/userSlice";
import { useNavigate } from 'react-router-dom';

const Formularz = () => {
    const [formData, setFormData] = useState({
        Imie: '',
        Nazwisko: '',
        Adres: '',
        Login: '',
        Haslo: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Login.length === 0) {
            alert('Login jest wymagany.');
            return;
        }

        const isLoginAvailable = await checkLoginAvailability(formData.Login);

        if (!isLoginAvailable) {
            alert('Podany login jest już zajęty.');
            return;
        }

        if (formData.Imie.trim().length < 2 || formData.Nazwisko.trim().length < 2) {
            alert('Imię i nazwisko muszą mieć przynajmniej dwa znaki.');
            return;
        }

        if (formData.Adres.trim().length < 5) {
            alert('Adres musi mieć przynajmniej pięć znaków.');
            return;
        }

        if (formData.Haslo.trim().length < 4) {
            alert('Hasło musi mieć przynajmniej cztery znaki.');
            return;
        }


        try {
            console.log('Wysłano dane:', formData);
            const response = await fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
            const responseData = await response.json();
            loginUser(JSON.stringify(responseData));
        } catch (error) {
            console.error('Błąd:', error.message);
        }
    };

    const loginUser =  (responseData) => {
        console.log("Odebrane", responseData)
        dispatch(setUser(responseData));
        navigate('/pizza');
    }

    const checkLoginAvailability = async (login) => {
        try {
            const response = await fetch(`http://localhost:3001/user/login?login=${login}`);
            if (!response.ok) {
                throw new Error('Błąd podczas sprawdzania dostępności loginu');
            }

            const data = await response.json();
            return data.available;
        } catch (error) {
            console.error('Błąd sprawdzania dostępności loginu:', error);
            return false;
        }
    };

    return (
        <div className="form-body">
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                Imię:
                <input type="text" name="Imie" value={formData.Imie} onChange={handleChange} />
            </label>
            <br />

            <label>
                Nazwisko:
                <input type="text" name="Nazwisko" value={formData.Nazwisko} onChange={handleChange} />
            </label>
            <br />

            <label>
                Adres:
                <input type="text" name="Adres" value={formData.Adres} onChange={handleChange} />
            </label>
            <br />

            <label>
                Login:
                <input type="text" name="Login" value={formData.Login} onChange={handleChange} />
            </label>
            <br />

            <label>
                Hasło:
                <input type="password" name="Haslo" value={formData.Haslo} onChange={handleChange} />
            </label>
            <br />

            <button type="submit">Wyślij</button>
        </form>
        </div>
    );
}

export default Formularz;