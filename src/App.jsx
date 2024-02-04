import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@mui/material";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
