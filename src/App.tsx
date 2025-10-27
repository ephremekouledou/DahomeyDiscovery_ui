import "./App.css";
import { AnimationProvider } from "./context/animationContext";
import { PanierProvider } from "./context/panierContext";
import { TransactionProvider } from "./context/transactionContext";
import Routing from "./routing";

function App() {

  return (
    <AnimationProvider>
      <PanierProvider>
        <TransactionProvider>
          <Routing />
        </TransactionProvider>
      </PanierProvider>
    </AnimationProvider>
  );
}

export default App;
