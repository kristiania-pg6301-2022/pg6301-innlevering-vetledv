import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex justify-center'>
        <Button clickHandler={() => navigate('/random')}>
          Get a random question
        </Button>
      </div>
    </>
  )
}
