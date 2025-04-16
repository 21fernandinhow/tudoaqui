import { UserDataProvider } from "./context/UserDataContext";
import { AppRoutes } from "./AppRoutes"
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <UserDataProvider>
      <BrowserRouter basename='/'>
        <AppRoutes />
      </BrowserRouter>
    </UserDataProvider>
  );
}

export default App