import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./components/App";

createRoot(document.getElementById("app")!).render(<App />);
