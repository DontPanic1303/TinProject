import React, { useState } from 'react';
import "./Registration.css"

const Formularz = () => {
    const [formData, setFormData] = useState({
        Imie: '',
        Nazwisko: '',
        Rodzaj: '',
        Adres: '',
        Login: '',
        Haslo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tutaj możesz przetworzyć dane, np. wysłać na serwer
        console.log('Wysłano dane:', formData);
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
                Rodzaj:
                <input type="text" name="Rodzaj" value={formData.Rodzaj} onChange={handleChange} />
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