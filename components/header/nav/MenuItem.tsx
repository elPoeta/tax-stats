import Link from "next/link";
import React from "react";

const items = [
  { id: "menu-item-home", title: "Home", path: '/' },
  { id: "menu-item-project", title: "Tax", path: '/tax' },
  { id: "menu-item-login", title: "Login", path: '/signin' }
];

type MenuItemType = { classNames: string, handleToggleLinkClicked?: ()=> void };

export const MenuItem = ({ classNames, handleToggleLinkClicked }:MenuItemType ) => {
  return (
    <>
      {items.map((item) => (
        <li key={item.id} className={classNames} onClick={() => handleToggleLinkClicked ? handleToggleLinkClicked() : false }>
          <Link href={item.path}>
          <a>
            {item.title}
          </a>
          </Link>
        </li>
      ))}
    </>
  );
};