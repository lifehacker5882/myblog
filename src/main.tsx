import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext.tsx";

import "./index.css";
/* import "@mattilsynet/design/styles.css";
import "@mattilsynet/design"; */
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
