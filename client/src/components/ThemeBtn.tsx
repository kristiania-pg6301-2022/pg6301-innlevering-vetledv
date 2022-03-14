import { IThemeBtn } from '../interfaces/components'
import { SunIcon, MoonIcon } from './Icons'

export const ThemeBtn = ({ colorTheme, setTheme }: IThemeBtn) => {
  return (
    <span
      onClick={() => {
        setTheme(colorTheme)
      }}
      className=' cursor-pointer flex items-center self-end w-9 h-9'>
      {colorTheme === 'light' ? <SunIcon /> : <MoonIcon />}
    </span>
  )
}
