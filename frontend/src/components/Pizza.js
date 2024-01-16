import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";


const Pizza = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state)=> state.user.isLoggedIn);
    const [formData, setFormData] = useState({
        Nazwa: '',
        cena: '',
        rozmiar: '',
        Skladniki: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const [pizzas,setPizzas] = useState([]);
    const [pizzasOrder, setPizzasOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pizzasPerPage] = useState(5);
    const [editedPizza, setEditedPizza] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeModify = (e) => {
        const { name, value } = e.target;
        setEditedPizza((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Nazwa.trim().length < 5) {
            alert("Nazwa musi mieć przynajmniej 5 znaków.")
            return;
        }

        if (formData.cena.trim().length < 1 || isNaN(formData.cena)) {
            alert("Podaj poprawną cene")
            return;
        }

        if (formData.rozmiar.trim().length < 2 || isNaN(formData.rozmiar)) {
            alert("Za mały rozmiar, lub niepoprawna wartość")
            return;
        }

        if (formData.Skladniki.trim().length < 7) {
            alert("Składniki muszą mieć przynajmniej 7 znaków.")
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/addPizza', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
            generatePizzasListHTML()
        } catch (error) {
            console.log('Błąd: ', error.message);
        }

        console.log('Wysłano dane:', formData);
        alert('Dodano pizze');
        setFormData({
            Nazwa: '',
            cena: '',
            rozmiar: '',
            Skladniki: '',
        });
    };

    const handleSubmitOrder = (e) => {

    }

    const handleModify = (pizza) =>{
        setEditedPizza({...pizza});
        setIsEditing(true);
    }

    const handleCancelModify = () => {
        setIsEditing(false);
    }

    const handleSaveModify = async () => {
        const response = await fetch(`http://localhost:3001/pizza/${editedPizza.Id_pizzy}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedPizza),
        });
        setIsEditing(false);
        alert("Zmieniono pizze")
        generatePizzasListHTML();
        if (!response.ok) {
            throw new Error('Błąd podczas wysyłania danych');
        }
    }

    const deletePizza = async (pizzaId) => {
        console.log(pizzaId);
        try {
            const response = await fetch(`http://localhost:3001/pizza/${pizzaId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Błąd podczas wysyłania danych');
            }
        } catch (e) {
            console.log(e);
        }
        generatePizzasListHTML();
        console.log(`Usuwanie pizzy o ID: ${pizzaId}`);
        alert(`Usunięto pizze o ID: ${pizzaId}`)
    }

    const addPizzaToOrder = (Id_pizzy, nazwa) => {
        const pizzaExistsIndex = pizzasOrder.findIndex((pizza) => pizza.Id_pizzy === Id_pizzy);

        if (pizzaExistsIndex === -1) {
            setPizzasOrder((prevOrder) => [
                ...prevOrder,
                {
                    Id_pizzy: Id_pizzy,
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
        setPizzasOrder((prevOrder) => prevOrder.filter((pizza) => pizza.Id_pizzy !== id_pizzy));
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

    const indexOfLastPizza = currentPage * pizzasPerPage;
    const indexOfFirstPizza = indexOfLastPizza - pizzasPerPage;
    const currentPizzas = pizzas.slice(indexOfFirstPizza, indexOfLastPizza);
    const totalPages = Math.ceil(pizzas.length / pizzasPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const isAdmin = useSelector((state)=> state.user.isAdmin);
    return (
        <div class="top-side">
            <div class="left-side">
            <h1>Pizze</h1>
            {currentPizzas.map((pizza) => (
                <div>
                    <PizzaItem key={pizza.Id_pizzy} pizza={pizza} isAdmin={isAdmin} handleModify={{handleModify}} addPizzaToOrder={addPizzaToOrder} deletePizza={{deletePizza}}/>
                    <br/>
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
            <div class="right-side">
                {isAdmin ? (
                    <div>
                        {isEditing ? (
                            <div>
                                <h1>Edytuj informacje o pizie</h1>
                                <form>
                                    <label>
                                        Nazwa:
                                        <input type="text" name="Nazwa" value={editedPizza.Nazwa} onChange={handleChangeModify} />
                                    </label>
                                    <br />

                                    <label>
                                        Cena:
                                        <input type="text" name="cena" value={editedPizza.cena} onChange={handleChangeModify} />
                                    </label>
                                    <br />

                                    <label>
                                        Rozmiar:
                                        <input type="text" name="rozmiar" value={editedPizza.rozmiar} onChange={handleChangeModify} />
                                    </label>
                                    <br />

                                    <label>
                                        Składniki:
                                        <input type="text" name="Skladniki" value={editedPizza.Skladniki} onChange={handleChangeModify} />
                                    </label>
                                    <br />

                                    <button type="button" onClick={handleCancelModify}>
                                        Anuluj
                                    </button>
                                    <button type="button" onClick={handleSaveModify}>
                                        Zapisz
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <p>Dodaj pizze</p>
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
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                    <h1>Zamówienie</h1>
                    Adres: {isLoggedIn ? (
                        <div>
                            {user.Adres}<br/>
                            <button onClick={() => handleSubmitOrder}>Zamów</button> <br/>
                        </div>
                    ) : (

                        <form onSubmit={handleSubmitOrder}>
                            <label>
                                <input type="text" name="Adres" value={formData.Nazwa} onChange={handleChange}/> <br/>
                            </label>
                            <button type="submit">Zamów</button> <br/>
                        </form>
                    )}
                        {pizzasOrder.map((pizza) => (
                            <div key={pizza.Id_pizzy}>
                                <p>Nazwa: {pizza.nazwa}</p>
                                <p>Ilość: {pizza.ilosc}</p>
                             <button onClick={() => removePizzaFromOrder(pizza.Id_pizzy)}>Usuń</button>
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const PizzaItem = ({ pizza, isAdmin, handleModify, addPizzaToOrder, deletePizza}) => {
    return (
        <div>
            <p>Nazwa: {pizza.Nazwa}</p>
            <p>Cena: {pizza.cena}</p>
            <p>Rozmiar: {pizza.rozmiar}</p>
            <p>Skladniki: {pizza.Skladniki}</p>
            {isAdmin ? (
                <div>
                    <button onClick={() => handleModify.handleModify(pizza)}>Zmodyfikuj</button>
                    <button onClick={()=> deletePizza.deletePizza(pizza.Id_pizzy)}>Usuń</button>
                </div>
            ) : <button onClick={() => addPizzaToOrder(pizza.Id_pizzy, pizza.Nazwa)}>Zamów</button>}
        </div>
    );
};


export default Pizza;