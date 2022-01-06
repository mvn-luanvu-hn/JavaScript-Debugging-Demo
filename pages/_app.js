import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
