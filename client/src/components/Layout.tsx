import { Nav } from './Nav'
import { Footer } from './Footer'
export const Layout: React.FC = ({ children }) => {
  return (
    <div className='flex justify-between flex-col min-h-screen'>
      <div className='flex flex-col min-w-full justify-center items-center'>
        <Nav />
        <div className='p-4 min-w-full flex justify-center items-center'>
          <main className='px-2 pb-2 md:px-6 flex max-w-5xl w-full lg:w-full bg-red-400'>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
