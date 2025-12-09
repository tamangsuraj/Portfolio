import { createRoot } from "react-dom/client";
import App from "./App.tsx";  // Explicitly add .tsx extension
import "./index.css";         // Import your styles

// Create the root element and render the App component into the DOM
createRoot(document.getElementById("root")!).render(<App />);
