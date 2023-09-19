import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import HTML from "./pages/html";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {useContext} from 'react';
import ThemeProvider from './context/themeContext';
import ErrorPage from "./pages/Error_page";
import EditTask from "./pages/Edit-task/Edit-task";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/html",
    element: <HTML />,
  },
  {
    path: "/css",
    element: <Css />,
  },
  {
    path: "/javascript",
    element: <Javascript />,
  },
  {
    path: "/EditTask/:stringId",
    element: <EditTask />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

function App() {
  const {theme} = useContext(ThemeProvider)
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;