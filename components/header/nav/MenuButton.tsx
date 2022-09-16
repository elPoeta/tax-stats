import React, { useState } from "react";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ThemeButton from "./ThemeButton";
import { MenuItem } from "./MenuItem";

export const MenuButton = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleLinkClicked = () => {
    setToggleMenu(false);
  } 

  return (
    <div className="lg:hidden">
      {!toggleMenu && (
        <Bars3BottomLeftIcon
          className="w-6 h-6 fill-[#0ea5e9]"
          onClick={() => setToggleMenu(true)}
        />
      )}
      {toggleMenu && (
        <div className="flex relative z-50">
          <ul className="fixed top-0 right-0 p-3 w-[70vw] menu-glassmorphism dark:bg-[#27335966]   h-screen shadow-2xl animate-slide-in">
            <li className="flex items-start justify-between">
              <XMarkIcon
                className="w-8 h-8 fill-[#0ea5e9]"
                onClick={() => setToggleMenu(false)}
              />
              <ThemeButton classNames='w-8 h-8 fill-white dark:fill-[#0ea5e9]' />
            </li>
            <MenuItem classNames="text-xl py-5 px-2 font-bold" handleToggleLinkClicked={handleToggleLinkClicked} />
          </ul>
       </div>
      )}
    </div>
  );
};