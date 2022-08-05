import Routes from "./routes/Routes";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { AUTH_URL } from "./Consts";
function App() {
  useEffect(() => {
    console.log("fetching");
    fetch(AUTH_URL + "/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log("DATA");
        return data.json();
      })
      .then((x) => {
        console.log("final");
        console.log(x);
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
