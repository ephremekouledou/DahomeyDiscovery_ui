import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Acceuil from "./pages/Acceuil/Acceuil";
import NotFound from "./pages/NotFound";
import BonneAddress from "./pages/BonneAddress/BonneAddress";
import Circuits from "./pages/Circuits/Circuits";
import { CircuitView } from "./components/CircuitView/CircuitView";
import CircuitsCartes from "./pages/Circuits/CircuitsCartes";
import CircuitCarteView from "./components/CircuitView/CircuitCarteView";
import CircuitsSignature from "./pages/Circuits/CircuitsSignature";
import Hebergements from "./pages/NosOffres/hebergement";
import Locations from "./pages/NosOffres/locations";
import ReservationCircuit from "./pages/Reservations/reservationCircuits";
import ReservationLocation from "./pages/Reservations/reservationLocations";
import ViewHebergement from "./pages/NosOffres/viewHebergement";
import ViewLocation from "./pages/NosOffres/viewLocation";
import Restaurants from "./pages/Restaurants/restaurants";
import Attractions from "./pages/Attractions/attractions";
import Apropos from "./pages/Apropos/Apropos";
import Actualites from "./pages/Actualites/Actualites";
import CGV from "./pages/CGV/cgv";
import ReservationVehicule from "./pages/Reservations/reservationVehicule";
import AttractionDetailPage from "./pages/Attractions/viewAttractions";
import Transferts from "./pages/Transfers/transferts";

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
    path: "/circuits-signature",
    element: <CircuitsSignature />,
    errorElement: <NotFound />,
  },
  {
    path: "/bonnes-adresses",
    element: <BonneAddress />,
    errorElement: <NotFound />,
  },
  {
    path: "/hebergements",
    element: <Hebergements />,
    errorElement: <NotFound />,
  },
  {
    path: "/hebergements/:id",
    element: <ViewHebergement />,
    errorElement: <NotFound />,
  },
  {
    path: "/locations",
    element: <Locations />,
    errorElement: <NotFound />,
  },
  {
    path: "/locations/:id",
    element: <ViewLocation />,
    errorElement: <NotFound />,
  },
  {
    path: "/transferts",
    element: <Transferts />,
    errorElement: <NotFound />,
  },
  {
    path: "/restaurants",
    element: <Restaurants />,
    errorElement: <NotFound />,
  },
  {
    path: "/attractions",
    element: <Attractions />,
    errorElement: <NotFound />,
  },
  {
    path: "/attractions/:id",
    element: <AttractionDetailPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/a-propos",
    element: <Apropos />,
    errorElement: <NotFound />,
  },
  {
    path: "/conditions-generales",
    element: <CGV />,
    errorElement: <NotFound />,
  },
  {
    path: "/actualites",
    element: <Actualites />,
    errorElement: <NotFound />,
  },
  {
    path: "/reservations-circuits",
    element: <ReservationCircuit />,
    errorElement: <NotFound />,
  },
  {
    path: "/reservations-locations",
    element: <ReservationLocation />,
    errorElement: <NotFound />,
  },
  {
    path: "/reservations-vehicules",
    element: <ReservationVehicule />,
    errorElement: <NotFound />,
  },
]);

export default function Routing() {
  return <RouterProvider router={router} />;
}
