import "./App.css";
import FloatingCartButton from "./components/dededed/PanierButton";
import { AnimationProvider } from "./context/animationContext";
import { PanierProvider } from "./context/panierContext";
import { TransactionProvider } from "./context/transactionContext";
import Routing from "./routing";

function App() {

  return (
    <AnimationProvider>
      <PanierProvider>
        <TransactionProvider>
          <FloatingCartButton />
          <Routing />
        </TransactionProvider>
      </PanierProvider>
    </AnimationProvider>
  );
}

export default App;
