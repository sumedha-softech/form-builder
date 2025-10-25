import FbContext from "./context/FbContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <FbContext>
    <App />
  </FbContext>
);