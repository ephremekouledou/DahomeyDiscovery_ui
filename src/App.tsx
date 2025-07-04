import "./App.css";
import { AnimationProvider } from "./context/animationContext";
import Routing from "./routing";

function App() {
  return (
    <AnimationProvider>
      <Routing />
    </AnimationProvider>
  );
}

export default App;
