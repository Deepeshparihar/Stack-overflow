// import React, { useEffect, useState } from 'react'
// import weather  from 'openweathermap'

// const ThemeChange = () => {

//     const [isDaytime, setIsDaytime] = useState(true);

//     useEffect(() => {
//       // Function to determine if it's daytime based on current time
//       const isDaytimeNow = () => {
//         const currentTime = new Date().getHours();
//         return currentTime >= 6 && currentTime < 18; // Assume daytime between 6 AM and 6 PM
//       };
  
//       // Function to set theme based on time
//       const setThemeBasedOnTime = () => {
//         setIsDaytime(isDaytimeNow());
//       };
  
//       setThemeBasedOnTime();
  
//       // Update theme every minute
//       const intervalId = setInterval(() => {
//         setThemeBasedOnTime();
//       }, 60000);
  
//       return () => clearInterval(intervalId);
//     }, []);
  
//     // Fetch weather information using user's geolocation
//     const fetchWeather = async () => {
//       try {
//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
  
//         const { latitude, longitude } = position.coords;
  
//         // Set up weather  API with your API key
//         const apiKey = 'YOUR_openweathermap _API_KEY';
//         const owm = new weather (apiKey);
  
//         // Fetch current weather
//         const weatherData = await owm.currentWeather({ lat: latitude, lon: longitude });
  
//         // Determine if it's bad weather based on your criteria
//         const isBadWeather = weatherData.weather[0].main === 'Rain'; // Example: consider rain as bad weather
  
//         // Update theme based on weather
//         setIsDaytime(isBadWeather ? false : isDaytimeNow());
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchWeather();
//     }, []);

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ThemeChange
