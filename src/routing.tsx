import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Acceuil />,
      errorElement: <NotFound />,
    },
  ]);
  
  export default function Routing() {
    return <RouterProvider router={router} />;
  }
