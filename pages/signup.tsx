import React, { useEffect, useState } from 'react'
import supabase from '../supabase/supabaseClient';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [enable, setEnable] = useState(false);

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
    console.log(formData)
    signUp();
  }

  const signUp = async () => {
    const {email, password } = formData;
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password
    });
  
    error ? console.log(error) : console.log(user, session);
    };

  useEffect(() => {
    const isEnable = process.env.NEXT_PUBLIC_ENABLE_REGISTER === 'true';
    console.log(">>> ",isEnable)
    setEnable(isEnable);
  },[enable]);

  return (
    <div className='w-[90%] mx-auto'>
      {
        enable ? (
          <>
          <h2>Sign-Up</h2>
          <form className='flex flex-col gap-3'>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Enter an email..." required />
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Enter a pasword..." required />
            <button onClick={handleSubmit}>Sign-up</button>
          </form>
        </>
        ): (
            <h2 className='text-center text-2xl p-4'>Sign-Up are closed!</h2>
        )
      }

    </div>
  )
}

export default Signup