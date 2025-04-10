import { BrowserRouter as Router } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataContext";
import { AppRoutes } from "./AppRoutes"
import "./styles/index.scss";

const App = () => {
  return (
    <>
      <UserDataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserDataProvider>
    </>
  );
}

export default App