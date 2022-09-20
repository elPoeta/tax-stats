import { NextApiRequest, NextPage } from "next"
import supabase from "../supabase/supabaseClient"

const Home: NextPage = () => {
  return (
    <div className="container">
       Test
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
