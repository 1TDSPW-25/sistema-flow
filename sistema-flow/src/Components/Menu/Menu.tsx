import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

interface MenuItem {
    label: string;
    path: string;
}

const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
];
const Menu: React.FC = () => {
    return (
        <nav className="menu">
            <ul className="menu-list">
                {menuItems.map((item, index) => (
                    <li key={index} className="menu-item">
                        <Link to={item.path} className="menu-link">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            </nav>
    );
};
export default Menu;
