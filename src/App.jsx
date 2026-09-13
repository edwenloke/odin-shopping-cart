import { Outlet } from "react-router";
import { useState } from "react";

import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="app">
      <Nav cart={cart} />

      <Outlet context={{cart, setCart}} />
    </div>
  );
}

export default App;
