import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/HomeScreen";
import Profile from "../pages/Profile/ProfileScreen";

import { PrivateRoute } from "./routeConfig"

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;