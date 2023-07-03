import { Box } from "@mui/material";

import { useContext } from "react";
import AuthContext from "./hooks/AuthContext";
import AppRoutes from "./pages/AppRoutes";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div style={{ padding: "1rem" }}>
      <AppRoutes />
    </div>
  );
}

export default App;
