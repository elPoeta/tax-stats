import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth/useAuth';
import supabase from '../supabase/supabaseClient';

const styles = {
  title: 'text-center text-2xl py-3 font-semibold',
  form:'flex flex-col gap-3',
  inputs: 'p-2 text-sm border-2 border-blue-500 rounded-full dark:bg-slate-800 ',
  button: 'text-lg font-semibold text-white dark:text-slate-900 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full py-2'
}
const Signin = () => {
  const { state:{ authorized } } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [formError, setFormError] = useState<string | null>(null);
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
      setFormError('Email or password is empty');
      return;    
    }
    setFormError(null);
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
       setFormError(error.message);
    } else {
       setFormError(null);
       router.push('/')   
    }
    }

  return (
    <div className='w-[90%] mx-auto'>
      <h2 className={styles.title}>Sign-In</h2>
      <form className={styles.form}>
        {formError && <p className='text-red-600 text-xl'>{formError}</p>}
        <input className={styles.inputs} type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter an email..." required />
        <input className={styles.inputs} type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Enter a pasword..." required />
        <button className={styles.button} onClick={handleSubmit}>Sign-in</button>
      </form>
    </div>
  )
}

export default Signin