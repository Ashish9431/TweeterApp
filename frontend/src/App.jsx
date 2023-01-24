import { useEffect } from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCityLocation } from "./Redux/action";
import { IP_API } from "./api/api";

function App() {
  const dispatch = useDispatch();
  const getIp = async () => {
    try {
      let response = await axios.get(IP_API);
      getLocation(response.data.ip);
    } catch (error) {
      console.log(error);
    }
  };
  const getLocation = async (ip) => {
    try {
      let response = await axios.get(
        `https://ipinfo.io/${ip}?token=${import.meta.env.VITE_IP_TOKEN}`
      );
      dispatch(getCityLocation(response.data.city));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getIp();
  }, []);

  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;
