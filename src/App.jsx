import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const today = new Date().toDateString();
  const localKey = `NASA-${today}`;

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        //if we already went today to grab the key we can grab it from local storage insted of using api
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        return;
      }

      localStorage.clear();

      try {
        const res = await fetch(url); //api call
        const apiData = await res.json();
        setData(apiData);
        localStorage.setItem(localKey, JSON.stringify(apiData));
      } catch (e) {
        console.log(e);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main url={data.hdurl} />
      ) : (
        <div className="loadingstate">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
