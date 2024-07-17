import React from "react";
import Registration from "./Pages/Registration/Registration.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";

import RootLayout from "./Components/HomeComponents/RootLayout/RootLayout.jsx";

import Home from "./Pages/Home/Home.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route element={<RootLayout />}>
          <Route index path="/" element={<Home />}></Route>
          <Route index path="/chat" element={"Chat"}></Route>
          <Route index path="/notification" element={"Notification"}></Route>
          <Route index path="/settings" element={"settings"}></Route>
        </Route>
      </>,
    ),
  );
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
