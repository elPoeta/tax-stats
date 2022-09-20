import React from 'react'
import Navbar from './nav/NavBar'

const styles = {
  headerBar: 'dark:bg-slate-800 dark:border-0 border-b-2 border-b-slate-800 flex items-center justify-between px-2 h-[60px] lg:px-5 lg:h-[70px]'
}
export const Header = () => {
  return (
    <header className={styles.headerBar}>
     <h1 className='text-2xl font-bold lg:text-4xl'>Tax stats</h1>
     <Navbar />      
    </header>
  )
}
