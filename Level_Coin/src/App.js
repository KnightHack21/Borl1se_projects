import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import RootApp from "./RootApp.js";
import "./styles/RootApp.css";
import qrCodeIcon from "./images/qr-code.png";

const firebaseConfig = {
  apiKey: "",
  authDomain: "level-ada17.firebaseapp.com",
  projectId: "level-ada17", 
  storageBucket: "level-ada17.appspot.com", 
  messagingSenderId: "885676337384",
  appId: "1:885676337384:web:0615a6e6990e9eece1c15d", 
  measurementId: "G-QS67351G51"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const tg = window.Telegram.WebApp;
  const [loading, setLoading] = useState(true);
  const loader = document.getElementById("spinner");
  let isTelegram = true;
  if (Object.keys(tg.initDataUnsafe).length == 0) {
    isTelegram = false;
  }
  if (loader){
      setTimeout(() => {
      loader.style.display = "none";
      setLoading(false);
    }, 3000);
  }
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);
  if (isTelegram){
    return (
      !loading && (
      <div className="App">
        <RootApp />
      </div>
      )
    );
  }
  else{
  return(
    !loading && (
      <div className="App">
        <h6>Please open Telegram</h6>
        <img src={qrCodeIcon} className="qrCodeIcon" /> 
      </div>
      )
  );
}
}
export default App;
