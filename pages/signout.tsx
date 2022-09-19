import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { authActions } from '../context/auth/state';
import { useAuth } from '../context/auth/useAuth';
import supabase from '../supabase/supabaseClient';

const Signout = () => {
  const { dispatch } = useAuth()
  const router = useRouter();
  useEffect(() => {
    (async() => {
      await supabase.auth.signOut();
      dispatch({ type: authActions.SIGN,  data:{ authorized: false }});
      router.push('/signin')
    })();
  },[dispatch, router]);
  return (
    <div>Signout</div>
  )
}

export default Signout