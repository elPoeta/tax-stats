import React, { useState } from 'react'
import supabase from '../supabase/supabaseClient';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: ''});
 
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
    signIn();
  }

  const signIn = async () => {
    const {email, password } = formData;
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password
    });
  
    error ? console.log(error) : console.log(user, session);
    }

  return (
    <div className='w-[90%] mx-auto'>
      <h2>Sign-In</h2>
      <form className='flex flex-col gap-3'>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter an email..." required />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Enter a pasword..." required />
        <button onClick={handleSubmit}>Sign-in</button>
      </form>
    </div>
  )
}

export default Signin