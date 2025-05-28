import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Empleados,Root,ErrorPage} from "./routes"
import Inventario from './routes/Inventario';
import Ventas from './routes/Ventas';
import Productos from './routes/Productos';
import EmpleadoPerfil from './routes/EmpleadoPerfil';


const router = createBrowserRouter([
  {
    path:"/",
    element:<Root/>,  
    errorElement: <ErrorPage />,
    children:[
      {
        path:"empleados",
        element: <Empleados/>
      },
      {
        path:"empleados/:id_empleados",
        element: <EmpleadoPerfil/>
      },
      {
        path:"ventas",
        element: <Ventas/>
      },
      {
        path:"stock",
        element: <Inventario/>
      }
      ,
      {
        path:"productos",
        element: <Productos/>
      }

    ]
  },
 
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
