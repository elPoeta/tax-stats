import { User } from "@supabase/supabase-js";
import type { NextApiRequest } from "next";
import React from 'react'
import supabase from '../supabase/supabaseClient'

const Tax= ({user}:{user:User}) => {
  console.log('USER >>>> ',user)
  return (
    <div>Tax</div>
  )
}

export default Tax


export async function getServerSideProps({ req }:{ req:NextApiRequest }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/signin' } }
  }

  return { props: { user } }
}
