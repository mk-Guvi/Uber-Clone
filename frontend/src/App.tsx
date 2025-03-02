import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import StartPage from "./pages/Start";
import UserProtectWrapper from "./HOC/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainProtectWrapper from "./HOC/CaptainProtectWrapper";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
      <Route path="/login" element={<UserLogin />} />
      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/riding"
        element={
          <UserProtectWrapper>
            <Riding />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/captain-riding"
        element={
          <CaptainProtectWrapper>
            <CaptainRiding />
          </CaptainProtectWrapper>
        }
      />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route
        path="/captain-home"
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route
        path="/captain/logout"
        element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        }
      />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
