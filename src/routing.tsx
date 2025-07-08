import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Acceuil from "./pages/Acceuil/Acceuil";
import NotFound from "./pages/NotFound";
import Actualites from "./pages/Actualites/Actualites";
import BonneAddress from "./pages/BonneAddress/BonneAddress";
import Apropos from "./pages/Apropos/Apropos";
import Circuits from "./pages/Circuits/Circuits";
import { CircuitView } from "./components/CircuitView/CircuitView";
import CircuitsCartes from "./pages/Circuits/CircuitsCartes";
import CircuitCarteView from "./components/CircuitView/CircuitCarteView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Acceuil />,
    errorElement: <NotFound />,
  },
  {
    path: "/circuits-thematiques",
    element: <Circuits />,
    errorElement: <NotFound />,
  },
  {
    // This will match /circuits/circuit-signature/view or any /circuits/:id/view pattern
    path: "/circuits-thematiques/:id",
    element: <CircuitView />,
    errorElement: <NotFound />,
  },
  {
    path: "/circuits-a-la-carte",
    element: <CircuitsCartes />,
    errorElement: <NotFound />,
  },
  // This will match /circuits-a-la-carte/:id/view
  {
    path: "/circuits-a-la-carte/:id",
    element: <CircuitCarteView />,
    errorElement: <NotFound />,
  },
  {
    path: "/bonnes-adresses",
    element: <BonneAddress />,
    errorElement: <NotFound />,
  },
  {
    path: "/a-propos",
    element: <Apropos />,
    errorElement: <NotFound />,
  },
  {
    path: "/actualites",
    element: <Actualites />,
    errorElement: <NotFound />,
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
