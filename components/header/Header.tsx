import React from 'react'
import ThemeButton from './nav/ThemeButton'

const styles = {
  headerBar: 'dark:bg-slate-800 dark:border-0 border-b-2 border-b-slate-800 flex items-center justify-between px-2 h-[60px] lg:px-5 lg:h-[70px]'
}
export const Header = () => {
  return (
    <header className={styles.headerBar}>
      <ThemeButton classNames='hidden lg:flex lg:w-6 lg:h-6 lg:cursor-pointer lg:ml-3'/>
    </header>
  )
}
