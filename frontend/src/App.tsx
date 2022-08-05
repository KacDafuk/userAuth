import Routes from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { AUTH_URL } from "./Consts";
function App() {
  useEffect(() => {
    console.log("start post ");
    fetch(AUTH_URL + "/test", {
      method: "POST",
    })
      .then((x) => {
        console.log("FIRST THEN");
        return x.json();
      })
      .then((data) => {
        console.log("final");
        console.log(data);
      });
  });
  return (
    <>
      {/* <Navbar />
      <Routes /> */}
    </>
  );
}

export default App;
