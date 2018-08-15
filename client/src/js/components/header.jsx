import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header className="header">
        <nav className="header__navigation">
            <ul className="header-menu-links">
                <li><NavLink to="/repositories">Repositories</NavLink ></li>
                <li><NavLink to="/bookmarked-repositories">Bookmarked</NavLink ></li>
            </ul>
        </nav>
    </header>
);

export default Header;