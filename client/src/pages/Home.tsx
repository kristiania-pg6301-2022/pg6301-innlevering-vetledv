import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button clickHandler={() => navigate('/question')}>
        Get a random question
      </Button>
    </>
  )
}
