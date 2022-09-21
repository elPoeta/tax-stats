import { NextApiRequest, NextPage } from "next"
import Link from "next/link"
import supabase from "../supabase/supabaseClient"

const Home: NextPage = () => {
  return (
    <div className="container">
       <Link href='/newtax'><a>New</a></Link>
    </div>
  )
}

export default Home

export async function getServerSideProps({ req }:{ req:NextApiRequest }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/signin' } }
  }

  return { props: { user } }
}
