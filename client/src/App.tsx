import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/*Public Routes*/}
        <Route path="*" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/*Private Routes*/}
        <Route>
          {/* <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
