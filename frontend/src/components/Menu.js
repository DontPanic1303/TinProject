import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/pizza">Pizze</Link></li>
            </ul>
        </nav>
    );
}

export default Menu;