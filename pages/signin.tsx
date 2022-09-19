import { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth/useAuth';
import supabase from '../supabase/supabaseClient';

const Signin = () => {
  const { state:{ authorized } } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(authorized) router.push('/tax')
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
      setHasError(true);
      setErrorMessage('Email or password is empty');
      return;    
    }
    setHasError(false);
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
       setHasError(true);
    } else {
       router.push('/tax')   
    }
    }

  return (
    <div className='w-[90%] mx-auto'>
      <h2>Sign-In</h2>
      <form className='flex flex-col gap-3'>
        <p className={`text-red-600 text-xl ${!hasError ? 'hidden' : ''}`}>{errorMessage}</p>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter an email..." required />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Enter a pasword..." required />
        <button onClick={handleSubmit}>Sign-in</button>
      </form>
    </div>
  )
}

export default Signin