import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import hazeImage from "../images/haze.png"

interface Weather {
  name: string;
  temp: number;
  high: number;
  low: number;
  humidity: number;
  pressure: number;
  visibility: number;
  wind: number;
  windDirection: number;
  sunrise: number;
  sunset: number;
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 2px dashed black;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  p{
    margin: 0;
    font-size: 32px;
    font-family: bold;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: space-around;
  margin: 20px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px dashed black;
  font-size: 16px;
  :focus{
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  background-color: #2f15c2;
  color: #fff;
  cursor: pointer;
`;

const DisplayWeather = styled.div`
  border: 1px solid black;
  padding: 12px;
  background: #d8d8e3;
  border-radius: 10px;
  p{
    text-align: left;
    font-size: 20px;
  }
  p:nth-child(2) {
    text-align: left;
    font-size: 16px;
    color: #303033;
  }
  
`;
const Temperature = styled.div`
  img{
    margin-left: 12px;
    width: 80px;
    height: 60px;
  } 
  p:first-child{
    text-align: center;
    font-size: 16px;
  }
  span:first-child{
    font-size: 52px;s
  }
`;
const Tabledata = styled.div`
  display: flex;
  gap: 20px;
`;
const Table = styled.table`
margin: 10px auto;
tr{
  display: block;
  margin-top: 10px;
  border-bottom: 2px dotted black;
}
td{
  font-family: bold;
  font-size: 18px;
  width: 115px;
  padding-bottom:12px;
  text-align: left;
}
`;

function Weather() {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [weather, setWeather] = useState<Weather>();
  // const [weather, setWeather] = useState([]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  // function is for fetch the weather data
  const getWeatherData = async () => {
    try {
      const response: any = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=c72b8ea826532e999747c102e212f63f`);
      const weatherData: Weather = {
        name: response.data.name,
        temp: response.data.main.temp,
        high: response.data.main.temp_max,
        low: response.data.main.temp_min,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        wind: response.data.wind.speed,
        windDirection: response.data.wind.deg,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
      };
      console.log("asdf", weatherData)
      setWeather(weatherData);
      console.log("response", weather)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AppContainer>
      <p>Weather App</p>
      <InputContainer>
        <Input type="text" placeholder="City" value={city} onChange={handleCityChange} />
        <Input type="text" placeholder="INDIA" value={country} onChange={handleCountryChange} />
        <Button onClick={getWeatherData} type='submit'>Submit</Button>
      </InputContainer>
      {weather &&
        <>
          <DisplayWeather>
            <p>{weather.name} {country.toUpperCase()}. Weather</p>
            <p>As of {new Date().toLocaleTimeString()}</p>
            <Temperature>
              <span>{Math.floor(weather.temp - 273)}<span>&#8451;</span></span>
              <span>
                <img src={hazeImage} alt="haze-image" />
                <span>Haze</span>
              </span>
            </Temperature>
            <p>Haze</p>
          </DisplayWeather>
          <Tabledata>
            <Table>
              <tr>
                <td>High/Low</td>
                <td>{Math.floor(weather.high / 10) + "/" + Math.floor(weather.low / 10)}</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather.humidity + " %"}</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weather.pressure + " hPa"}</td>
              </tr>
              <tr>
                <td>Visibility</td>
                <td>{weather.visibility / 1000 + " Km"}</td>
              </tr>
            </Table>
            <Table>
              <tr>
                <td>Wind</td>
                <td>{weather.wind + " Km/hr"}</td>
              </tr>
              <tr>
                <td>Wind Direction</td>
                <td>{weather.windDirection + " deg"}</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{new Date(weather.sunrise * 1000).toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>{new Date(weather.sunset * 1000).toLocaleTimeString()}</td>
              </tr>
            </Table>
          </Tabledata>
        </>
      }
    </AppContainer>
  )
}

export default Weather;
