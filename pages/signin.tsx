import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth/useAuth';
import { useTheme } from '../context/theme/useTheme';
import supabase from '../supabase/supabaseClient';

const styles = {
  title: 'text-center text-2xl py-3 font-semibold',
  form:'flex flex-col gap-3',
  inputs: 'p-2 text-sm border-2 border-blue-500 rounded-full dark:bg-slate-800 ',
  button: 'text-lg font-semibold text-white dark:text-slate-900 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full py-2'
}
const Signin = () => {
  const { state:{ authorized } } = useAuth();
  const {state:{ colorTheme }} = useTheme();
  const [formData, setFormData] = useState({ email: '', password: ''});
  const router = useRouter();

  useEffect(() => {
    if(authorized) router.push('/')
  },[authorized, router]);

  const handleChange = (ev:React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => {
      return {
      ...prev,
      [ev.target.name]: ev.target.value
    }
  });
  }
  const handleSubmit = (ev:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();
    const {email, password} = formData;
    if(email === '' || password === '') {
      toast.error('Email or password is empty',{
        theme: colorTheme === 'dark' ? 'dark' : 'light',
        autoClose: 3000
      });
      return;    
    }
    signIn();
  }

  const signIn = async () => {
    const {email, password } = formData;
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password
    });
    error ? console.log(error) : console.log(user, session);
    if(error) {
      toast.error(error.message,{
        theme: colorTheme === 'dark' ? 'dark' : 'light',
        autoClose: 3000
      })
    } else {
       router.push('/')   
    }
    }

  return (
    <div className='container mx-auto w-[90%] md:w-[70%] lg:w-[40%]'>
      <h2 className={styles.title}>Sign-In</h2>
      <form className={styles.form}>
        <input className={styles.inputs} type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter an email..." required />
        <input className={styles.inputs} type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Enter a pasword..." required />
        <button className={styles.button} onClick={handleSubmit}>Sign-in</button>
      </form>
    </div>
  )
}

export default Signin