import { Nav } from './Nav'
import { Footer } from './Footer'
export const Layout: React.FC = ({ children }) => {
  return (
    <><div className='flex justify-center bg-primary'>
        <div className='flex justify-between flex-col min-h-screen w-3/5 bg-primary shadow-2xl'>
          <Nav />
          <main className='p-6'>{children}</main>
        
          <Footer />
      </div>
    </div>
      
    </>
  )
}
