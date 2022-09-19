import {  useEffect, useReducer } from "react";
import { IProps } from "../../interfaces/IProps";

import { authActions, initialState, reducer } from "./state";
import { AuthContext } from "./AuthContext";
import supabase from "../../supabase/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const AuthProvider = ({children}:IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event:AuthChangeEvent, session:Session | null) => {
      //session.user.email
      handleAuthChange(event,session);
      if (event === 'SIGNED_IN') {
        dispatch({ type: authActions.SIGN,  data:{ authorized: true }});
      }
      if (event === 'SIGNED_OUT') {
        dispatch({ type: authActions.SIGN,  data:{ authorized: false }});
      }
    })
    checkUser();
    return () => {
      if(!authListener) return;
      authListener.unsubscribe();
    }
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      dispatch({ type: authActions.SIGN,  data:{ authorized: true }});
    }
  }

  async function handleAuthChange(event:AuthChangeEvent, session:Session | null) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <AuthContext.Provider value={{
       state,
       dispatch
    }}>
     {children}
    </AuthContext.Provider>
  )
}