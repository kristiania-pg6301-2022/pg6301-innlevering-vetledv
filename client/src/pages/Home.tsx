import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <Link to={'/question'}>Get a random question</Link>
    </>
  )
}
