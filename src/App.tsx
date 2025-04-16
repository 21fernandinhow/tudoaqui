import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataContext";
import { AppRoutes } from "./AppRoutes"
import "./styles/index.scss";

const App = () => {
  return (
    <>
      <UserDataProvider>
        <BrowserRouter basename="/">
          <AppRoutes />
        </BrowserRouter>
      </UserDataProvider>
    </>
  );
}

export default App