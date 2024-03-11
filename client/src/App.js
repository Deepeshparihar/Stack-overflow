import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { useEffect, useState } from "react";
import { fetchAllQuestions } from "./actions/question";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./actions/users";
import { fetchCards } from "./actions/cards";
import ChatbotButton from "./components/Chatbot/ChatbotButton";
import Chatbot from "./components/Chatbot/Chatbot";
import { getCurrentUserAmount } from "./actions/question";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [isDaytime, setIsDaytime] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const apiKey = "fdeccd3a13711982f2b0a14ac8dc4193";
        const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        // Fetch current weather
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        const isDaytimeNow = () => {
          const currentTime = new Date().getHours();
          return currentTime >= 6 && currentTime < 18;
        };

        const isBadWeather = data.weather[0].main === "Rain";
        setIsDaytime(isBadWeather ? false : isDaytimeNow());
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.currentUserReducer?.result?._id);
  useEffect(() => {
    if (userId) {
      dispatch(getCurrentUserAmount(userId));
    }
  }, [dispatch, userId]);

  const isOTPVerified = useSelector((state) => state.authReducer.isOTPVerified);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(fetchCards());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`App ${isDaytime ? "daytime" : "nighttime"}`}>
      <Router>
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        {!isOTPVerified && <ChatbotButton />}
        {isOTPVerified && <Chatbot />}
        {isOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
