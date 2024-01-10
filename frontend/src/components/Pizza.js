import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {setUser} from "../features/user/userSlice";

const Pizza = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
    const [formData, setFormData] = useState({
        Nazwa: '',
        cena: '',
        rozmiar: '',
        Skladniki: '',
    });
    const [pizzas,setPizzas] = useState([]);
    const [pizzasOrder, setPizzasOrder] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Wysłano dane:', formData);
    };

    const handleSubmitOrder = (e) => {

    }

    const handleModify = (pizzaId) =>{

    }

    const addPizzaToOrder = (id_pizzy, nazwa) => {
        const pizzaExistsIndex = pizzasOrder.findIndex((pizza) => pizza.id_pizzy === id_pizzy);

        if (pizzaExistsIndex === -1) {
            setPizzasOrder((prevOrder) => [
                ...prevOrder,
                {
                    id_pizzy: id_pizzy,
                    nazwa: nazwa,
                    ilosc: 1,
                },
            ]);
        } else {
            setPizzasOrder((prevOrder) => {
                const updatedOrder = [...prevOrder];
                updatedOrder[pizzaExistsIndex] = {
                    ...updatedOrder[pizzaExistsIndex],
                    ilosc: updatedOrder[pizzaExistsIndex].ilosc + 1,
                };
                return updatedOrder;
            });
        }
    };

    const removePizzaFromOrder = (id_pizzy) => {
        setPizzasOrder((prevOrder) => prevOrder.filter((pizza) => pizza.id_pizzy !== id_pizzy));
    };

    const fetchPizzas = async () => {
        try {
            const response = await fetch('http://localhost:3001/pizza');
            const pizzasData = await response.json();
            console.log(pizzasData)
            return pizzasData;
        } catch (error) {
            console.error('Błąd pobierania danych użytkowników:', error);
            return [];
        }
    };

    const generatePizzasListHTML = async () => {
        try {
            const pizzasData = await fetchPizzas();
            setPizzas(pizzasData);
        } catch (error) {
            console.error('Błąd generowania listy użytkowników:', error);
        }
    };

    useEffect(() => {
        generatePizzasListHTML();
    }, []);

    const isAdmin = useSelector((state)=> state.user.isAdmin);
    return (
        <div class="top-side">
            <div class="left-side">
            <h1>Pizze</h1>
            <div>
                {isAdmin && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nazwa:
                            <input type="text" name="Nazwa" value={formData.Nazwa} onChange={handleChange} />
                        </label> <br/>
                        <label>
                            Cena:
                            <input type="text" name="cena" value={formData.cena} onChange={handleChange} />
                        </label> <br/>
                        <label>
                            Rozmiar:
                            <input type="text" name="rozmiar" value={formData.rozmiar} onChange={handleChange} />
                        </label> <br/>
                        <label>
                            Składniki:
                            <input type="text" name="Skladniki" value={formData.Skladniki} onChange={handleChange} />
                        </label> <br/>
                        <button type="submit">Dodaj</button>
                    </form>
                )}
            </div>
            {pizzas.map((pizza) => (
                <PizzaItem key={pizza.id_pizzy} pizza={pizza} isAdmin={isAdmin} handleModify={handleModify} addPizzaToOrder={addPizzaToOrder}/>
            ))}
            </div>
            <div class="right-side">
                <h1>Zamówienie</h1>
                Adres: {isLoggedIn ? (user.Adres) : (
                    <form onSubmit={handleSubmitOrder}>
                        <label>
                            <input type="text" name="Adres" value={formData.Nazwa} onChange={handleChange}/> <br/>
                        </label>
                        <button type="submit">Zamów</button> <br/>
                    </form>
            )}
                {pizzasOrder.map((pizza) => (
                    <div key={pizza.id_pizzy}>
                        <p>Nazwa: {pizza.nazwa}</p>
                        <p>Ilość: {pizza.ilosc}</p>
                        <button onClick={() => removePizzaFromOrder(pizza.id_pizzy)}>Usuń</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const PizzaItem = ({ pizza, isAdmin, handleModify, addPizzaToOrder}) => {
    return (
        <div>
            <p>Nazwa: {pizza.Nazwa}</p>
            <p>Cena: {pizza.cena}</p>
            <p>Rozmiar: {pizza.rozmiar}</p>
            <p>Skladniki: {pizza.Skladniki}</p>
            {isAdmin ? <button onClick={() => handleModify(pizza.id_pizzy)}>Zmodyfikuj</button> : <button onClick={() => addPizzaToOrder(pizza.id_pizzy, pizza.Nazwa)}>Zamów</button>}
        </div>
    );
};


export default Pizza;