import React, { useEffect, useRef, useState } from "react";
import "./Wea.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {

  const inputref = useRef()

  const [weatherdata,setWeatherdata] = useState(false);

  const allicon = {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "013d":snow_icon,
    "013n":snow_icon,
  }

    const find = async (city) => {

      if(city===""){
        alert("First Enter City Name");
        return;
      }
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const icon = allicon[data.weather[0].icon] || clear_icon;
        setWeatherdata({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:icon
        })
      } catch (error) {
        setWeatherdata(false)
        console.error("Error in fetching the data")
      }
    };
  
  
  useEffect(() => {
    find("London");
  }, []);




  return (
    <div className=" weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputref} />
        <img src={search_icon} alt="" onClick={()=>{
          find(inputref.current.value)
        }} />
      </div>

        {weatherdata?<>
        
          <img src={weatherdata.icon} alt="" className="weather-icon" />
      <p className="temp">{weatherdata.temperature}°C</p>
      <p className="city">{weatherdata.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherdata.windSpeed}%</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
        
        </>:<></>}

    
    </div>
  );
}

export default Weather;
