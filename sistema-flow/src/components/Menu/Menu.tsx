import React from 'react';


interface MenuItem {
  id: number;
  label: string;
  path: string;
}

interface MenuProps {
  items?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, label: 'Início', path: '/' },
  { id: 2, label: 'Sobre', path: '/sobre' },
  { id: 3, label: 'Contato', path: '/contato' },
];

const Menu: React.FC<MenuProps> = ({ items = defaultMenuItems }) => {


  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {items.map((item) => ( // Use parênteses para retorno implícito de JSX
          <li key={item.id} className="menu-item">
            <a href={item.path} className="menu-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
