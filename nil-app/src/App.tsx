import { useNil } from './store'
import { TopBar, TabBar, Toast, NightNudge, FloatingCartOverlay } from './components/ui'
import Onboarding from './screens/Onboarding'
import Restaurants from './screens/Restaurants'
import Browse from './screens/Browse'
import Cart from './screens/Cart'
import Payment from './screens/Payment'
import Tracking from './screens/Tracking'
import LetGo from './screens/LetGo'
import You from './screens/You'

export default function App() {
  const { screen } = useNil()

  const showChrome = screen === 'restaurants' || screen === 'browse' || screen === 'cart' || screen === 'you'
  const showOverlay = screen === 'restaurants' || screen === 'browse'

  return (
    <div className="app">
      {showChrome && <TopBar />}
      {screen === 'onboarding' && <Onboarding />}
      {screen === 'restaurants' && <Restaurants />}
      {screen === 'browse' && <Browse />}
      {screen === 'cart' && <Cart />}
      {screen === 'payment' && <Payment />}
      {screen === 'tracking' && <Tracking />}
      {screen === 'letgo' && <LetGo />}
      {screen === 'you' && <You />}
      {showOverlay && <FloatingCartOverlay />}
      {showChrome && <TabBar />}
      <Toast />
      <NightNudge />
    </div>
  )
}
