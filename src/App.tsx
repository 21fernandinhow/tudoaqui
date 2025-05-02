import { UserDataProvider } from "./context/UserDataContext";
import { AppRoutes } from "./AppRoutes"
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./contexts/SnackbarContext";

const App = () => {
  return (
    <UserDataProvider>
      <BrowserRouter basename='/'>
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </BrowserRouter>
    </UserDataProvider>
  );
}

export default App