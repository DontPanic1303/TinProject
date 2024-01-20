import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";

const Person = () =>{
    const { id } = useParams();
    const isAdmin = useSelector((state)=> state.user.isAdmin);
    const [person, setPerson] = useState([]);

    const fetchOrderPizzas = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/${id}`);
            const personData = await response.json();
            console.log(personData);
            return personData;
        } catch (error) {
            console.error('Błąd pobierania danych zamówienia:', error);
            return [];
        }
    };

    const generateOrderListHTML = async () => {
        try {
            const personData = await fetchOrderPizzas();
            setPerson(personData);
        } catch (error) {
            console.error('Błąd generowania listy zamówień:', error);
        }
    };

    useEffect(() => {
        generateOrderListHTML();
    }, []);

    return (
        <div className="form-body">
        <div className="form-container">
            {isAdmin ? (
                <div>
                    <h1>Szczeguły osoby nr {id}</h1>
                    <div>
                        <ul>
                            <li>
                                <strong>Imię:</strong> {person?.Imie}
                            </li>
                            <li>
                                <strong>Nazwisko:</strong> {person?.Nazwisko}
                            </li>
                            <li>
                                <strong>Rodzaj:</strong> {person?.Rodzaj}
                            </li>
                            <li>
                                <strong>Adres:</strong> {person?.Adres}
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Nie masz dostępu</h1>
                </div>
            )}
        </div>
        </div>
    )

}
export default Person;