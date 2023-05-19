import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

const App = () => {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div>
      {/* <h1>{message}</h1> */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
