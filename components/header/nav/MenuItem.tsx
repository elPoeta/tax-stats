import Link from "next/link";
import { useAuth } from "../../../context/auth/useAuth";

const items = [
  { id: "menu-item-home", title: "Home", path: '/' },
  { id: "menu-item-project", title: "Tax", path: '/tax' },
  { id: "menu-item-sign", title: "Login", path: '/signin' }
];

type MenuItemType = { classNames: string, handleToggleLinkClicked?: ()=> void };

export const MenuItem = ({ classNames, handleToggleLinkClicked }:MenuItemType ) => {
  const { state: { authorized } } = useAuth();
  return (
    <>
      {items.map((item) => (
        <li key={item.id} className={classNames} onClick={() => handleToggleLinkClicked ? handleToggleLinkClicked() : false }>
          <Link href={ item.id === "menu-item-sign" && authorized ? '/signout' : item.path}>
          <a>
            {item.id === "menu-item-sign" && authorized ? 'Logout' : item.title}
          </a>
          </Link>
        </li>
      ))}
    </>
  );
};