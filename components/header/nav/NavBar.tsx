import React from 'react'
import { MenuButton } from './MenuButton'
import { MenuItem } from './MenuItem'
import ThemeButton from './ThemeButton'

const Navbar = () => {
  return (
    <nav className='lg:flex items-center justify-center'>
      <ul className='hidden lg:flex lg:flex-row'>
        <MenuItem classNames="lg:text-xl lg:px-2 lg:font-bold lg:hover:text-[#0ea5e9]" />
      </ul>
      <ThemeButton classNames='hidden lg:flex lg:w-6 lg:h-6 lg:cursor-pointer lg:ml-3' />
      <MenuButton />
    </nav>
  )
}

export default Navbar