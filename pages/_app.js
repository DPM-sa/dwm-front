import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer, { initialState } from '../context/reducer';
import { StateProvider } from '../context/StateProvider';
import '../styles/globals.css'
import '../styles/styles.css'
import 'swiper/swiper-bundle.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>

  )
}

export default MyApp
