import { useNavigate } from "react-router-dom";

const useNavbar = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.setItem("token", "");
    navigate("/login");
  }
  return {
    handleLogout,
  };
};

export default useNavbar;
