// frontend/src/components/Menu.jsx
export default function Menu() {
  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Koleksi", href: "#" },
    { name: "Emas Putih vs Platinum", href: "#" },
    { name: "Kontak", href: "#" },
  ];

  return (
    <ul className="flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
      {menuItems.map((item, index) => (
        <li key={index}>
          <a
            href={item.href}
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
