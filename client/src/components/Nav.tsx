import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useDarkMode'
import { ThemeBtn } from './ThemeBtn'

export const Nav = () => {
  const [theme, setTheme] = useTheme()

  return (
    <div className='sticky top-0 w-full bg-primary p-5 flex justify-between shadow-md'>
      <Link to={'/'}>Home</Link>
      <ThemeBtn colorTheme={theme} setTheme={setTheme} />
    </div>
  )
}