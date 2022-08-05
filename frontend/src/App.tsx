import Routes from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { AUTH_URL } from "./Consts";
function App() {
  useEffect(() => {
    fetch(AUTH_URL);
  });
  return (
    <>
      {/* <Navbar />
      <Routes /> */}
    </>
  );
}

export default App;
