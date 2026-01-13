import { ArtworkProvider } from "./contexts";
import Home from "./pages/Home";

function App() {
  return (
    <ArtworkProvider>
      <Home />
    </ArtworkProvider>
  );
}

export default App;
