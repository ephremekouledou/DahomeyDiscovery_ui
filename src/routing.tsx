import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import NotFound from './pages/NotFound';
import Actualites from './pages/Actualites/Actualites';
import BonneAddress from './pages/BonneAddress/BonneAddress';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Acceuil />,
      errorElement: <NotFound />,
    },
    {
      path: "/bonnes-adresses",
      element: <BonneAddress />,
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
