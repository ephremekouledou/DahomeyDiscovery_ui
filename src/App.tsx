import "./App.css";
import { AnimationProvider } from "./context/animationContext";
import { TransactionProvider } from "./context/transactionContext";
import Routing from "./routing";

function App() {
  return (
    <AnimationProvider>
      <TransactionProvider>
        <Routing />
      </TransactionProvider>
    </AnimationProvider>
  );
}

export default App;
