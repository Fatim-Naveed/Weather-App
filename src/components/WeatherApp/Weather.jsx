import React from 'react'
import { useState } from "react";
import "./WeatherStyles.css"

import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"

export const Weather = () => {
    const key="55c14a4cf345d909ac296016165d2f28";
    const [wicon,setWicon ]=useState(clear_icon);
    function checkEnter(e)
    {
        if(e.key=='Enter')
        {
            search();
        }
    }
    async function search()
    {


       const searchReturn=document.getElementsByClassName("search-bar");

       if(searchReturn[0].value==="")
       {
        return 0;
       }
       else
       {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchReturn[0].value}&units=metric&appid=${key}`;
        
        let response = await fetch(url);
        if(response.status == "404")
        {
            alert("Enter a valid city name");
            return;
        }
        let data=await response.json();

        let weatherTemp=document.getElementsByClassName("weather-temp");
        let location=document.getElementsByClassName("weather-location");
        let humidityPerc=document.getElementsByClassName("humidity-percent");
        let windspeed=document.getElementsByClassName("wind-speed");

       weatherTemp[0].innerHTML=Math.floor(data.main.temp) + " °C";
       location[0].innerHTML=data.name;
       humidityPerc[0].innerHTML=data.main.humidity;
       windspeed[0].innerHTML=Math.floor(data.wind.speed);

        // alert(data.weather[0].icon);

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
        {
        setWicon(clear_icon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon == "03d" || data.weather[0].icon == "03n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
        {
        
        setWicon(cloud_icon);
        }
        else if(data.weather[0].icon == "10d" || data.weather[0].icon == "10n")
        {
            
                setWicon(rain_icon);
        }
        else if(data.weather[0].icon == "09d" || data.weather[0].icon == "09n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon == "13d" || data.weather[0].icon == "13n")
        {

            setWicon(snow_icon);
        }
        else
        {
        setWicon(cloud_icon);
        }
       
       }
    }
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='search-bar' placeholder='search' onKeyDown={checkEnter}></input>
            <div className='search-icon' onClick={search}>
            <img src={search_icon}></img>
            </div>
        </div>
        <div className='weather-icon'>
            <img src={wicon} alt="weathericon" />
        </div>
        <div className='weather-temp'>24°C</div>
        <div className='weather-location'>London</div>
        <div className='data-container'>
            <div className='data-element'>
                <div className='humidity-icon'>
                    <img src={humidity_icon}></img>
                </div>
                <div className='data-details'>
                    <div className='humidity-percent'>64%</div>
                    <div className='data-text'>Humidity</div>
                </div>
            </div>
            <div className='data-element'>
                <div className='wind-icon'>
                    <img src={wind_icon}></img>
                </div>
                <div className='data-details'>
                    <div className='wind-speed'>20 km/h </div>
                    <div className='data-text'>Wind speed</div>
                </div>
            </div>
        </div>
    
    </div>
  )
}
