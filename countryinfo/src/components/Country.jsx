import {useEffect, useState} from "react";
import weatherService from "../services/weather.js";

const Country = ({country}) => {
    console.log(country)
    const [temp, setTemp] = useState('');
    const [wind, setWind] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');


    useEffect(() => {
        const lat = country.capitalInfo.latlng[0];
        const long = country.capitalInfo.latlng[1];
        weatherService.getWeather(lat, long).then((weather) => {
            console.log(weather);
            setTemp((weather.main.temp - 273.15).toFixed(2))
            setWind(weather.wind.speed)
            setWeatherIcon(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
        })
    }, [country])


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]} <br/>
                Area {country.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, lang]) => {
                    return <li key={key}>{lang}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
            <h2>Weather in {country.capital[0]}</h2>
            <p>
                Temperature {temp} Celsius<br/>
                <img src={weatherIcon}/><br/>
                Wind {wind} m/s
            </p>
        </div>
    )
}


export default Country;