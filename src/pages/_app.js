import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"


const MyApp = ({ Component, pageProps:{session, ...pageProps} }) => {
  return (
    // Allow us to access authentication state across pages
    // Give our entire application access to Auth State

    // App must be wrapped in provider since you are using useDispatch in it (redux)
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      </Provider>
  )
}

export default MyApp


