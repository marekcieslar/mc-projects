import { useState } from 'react';
import './App.css';

type SubmenuItem = {
  label: string;
  href: string;
  newTab?: boolean;
};

type MenuSection = {
  id: string;
  title: string;
  items: SubmenuItem[];
};

const menu: MenuSection[] = [
  {
    id: 'dart',
    title: 'Dart',
    items: [
      { label: 'Gra', href: '/dart/', newTab: true },
      { label: 'Liczenie', href: '/dart-count/', newTab: true },
    ],
  },
];

function MenuTile({ section }: { section: MenuSection }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="menu-tile">
      <button
        type="button"
        className="tile-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="tile-title">{section.title}</span>
        <span className="tile-chevron" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <ul className="tile-submenu">
          {section.items.map((item) => (
            <li key={item.label} className="submenu-item">
              <a
                href={item.href}
                target={item.newTab ? '_blank' : undefined}
                rel={item.newTab ? 'noreferrer' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <div className="menu-container">
        <h1 className="menu-title">MC Projects</h1>
        <div className="menu-grid">
          {menu.map((section) => (
            <MenuTile key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
