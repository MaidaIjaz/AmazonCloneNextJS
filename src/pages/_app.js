import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"



const MyApp = ({ Component, pageProps:{session, ...pageProps} }) => {
  return (
    // Allow us to access authentication state across pages
    // Give our entire application access to Auth State
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
  )
}

export default MyApp


