import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import Main from "./pages/Main";
import { UserProvider } from "./provider/UserProvider";
import { CreateAccountpage } from "./pages/Createaccount";
import { Infom } from "./pages/Info";
import { UserProfileProvider } from "./provider/UserProfileProvider";

function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
            <Route path="/CreateAccount" element={<CreateAccountpage />} />
            <Route path="/main/info" element={<Infom />} />
          </Routes>
        </UserProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
