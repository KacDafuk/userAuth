import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="" />
    </Switch>
  );
};

export default Routes;
