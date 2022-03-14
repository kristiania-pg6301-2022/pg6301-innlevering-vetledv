import { Nav } from './Nav'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      <main className='p-6'>{children}</main>
    </>
  )
}
