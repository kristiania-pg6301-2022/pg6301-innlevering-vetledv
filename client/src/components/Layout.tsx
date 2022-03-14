import { Nav } from './Nav'
import { Footer } from './Footer'
export const Layout: React.FC = ({ children }) => {
  return (
    <>
        <div className='flex justify-between flex-col min-h-screen'>
      <div>
        <Nav />
        <main className='p-6'>{children}</main>
      </div>
      <Footer />
    </div>
      
    </>
  )
}
