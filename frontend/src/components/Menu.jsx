// Menu.jsx
// import React from 'react';

export default function Menu() {
  // Data menu dipisahkan agar mudah ditambah/dikurangi di masa depan
  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Koleksi', href: '#' },
    { name: 'Emas Putih vs Platinum', href: '#' },
    { name: 'Kontak', href: '#' },
  ];

  return (
    <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
      {menuItems.map((item, index) => (
        <li key={index}>
          <a 
            href={item.href} 
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}