import LandingPage from './components/LandingPage/LandingPage';
import { albums } from './data/destinations';

/**
 * Root App component.
 * Passes the albums data array to the LandingPage.
 */
function App() {
  return <LandingPage albums={albums} />;
}

export default App;
