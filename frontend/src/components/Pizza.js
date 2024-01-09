import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {setUser} from "../features/user/userSlice";

const Pizza = () => {
    const [formData, setFormData] = useState({
        Nazwa: '',
        cena: '',
        rozmiar: '',
        Skladniki: '',
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
        console.log('Wysłano dane:', formData);
    };

    const isAdmin = useSelector((state)=> state.user.isAdmin);
    return (

        <div>
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
                    </form>
                )}
            </div>
            pizza1
            pizza2
        </div>
    );
}

export default Pizza;