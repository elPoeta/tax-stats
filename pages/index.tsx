import { NextPage } from "next"
import HeadBase from "../components/common/HeadBase"

const Home: NextPage = () => {
  return (
    <div className="container">
      <HeadBase title={`Tax Stats ${new Date().getFullYear()}`} />
       Test
    </div>
  )
}

export default Home
