import React, { useState } from "react";
import Index from "./pages/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Css
import "./assets/vendor/switcher/switcher.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserState, setDefaultUser } from "./store/sessionUser";
import { useEffect } from "react";
import { SignalConnector } from "./helpers";

function App() {
  const dispatch = useDispatch();
  const { sessionUser } = useSelector((state) => state);
  const [userId, setUserId] = useState("");

  const { dataSignal } = SignalConnector(userId);

  useEffect(() => {
    if (
      sessionUser.userInfo?.id == "" ||
      sessionUser.userInfo?.id == undefined
    ) {
      if (sessionStorage.getItem("userLogin")) {
        const userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
        dispatch(setUserState(userLogin));
      } else {
        dispatch(setDefaultUser());
      }
    }
  }, []);

  useEffect(() => {
    console.log("userInfo useEffect APP", sessionUser);
    if (sessionUser.userInfo?.id != "") {
      setUserId(sessionUser.userInfo?.id);
    }
  }, [sessionUser.userInfo?.id]);
  console.log("Data signal", dataSignal);
  return (
    <>
      <Index />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
    </>
  );
}
export default App;
