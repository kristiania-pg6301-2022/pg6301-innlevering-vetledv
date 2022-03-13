import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { RandomQuestion } from './pages/RandomQuestion'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      keepPreviousData: true,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/question' element={<RandomQuestion />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App