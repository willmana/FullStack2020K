import React, {useState, useEffect} from 'react'
import Country from './Country'
import axios from 'axios'

const ShowButton = ({ setFilter, country }) => {
    return (
        <button onClick={(() =>
            setFilter(country.name))
        }> show </button>
    )
}

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('')
    const params = {
        access_key: '9da8d602730709d39ee78f2580d0b386',
        query: capital
    }
    const hook = () => {
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(hook, [])

    if (! weather) {
        return (<div></div>)
    }
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p><strong>temperature: </strong>{weather.current.temperature} °C</p>
            <img src={weather.current.weather_icons} alt={weather.current.description}/>
            <p><strong>wind: </strong>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
        </div>
    )
}

const ShownCountries = ({ matches, countries, setFilter }) => {
    if (matches > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (matches > 1) {
        return (
            <div>
                <ul>
                    {countries.map(country =>
                        <li key={country.numericCode}>{country.name}
                            <ShowButton
                                country={country}
                                setFilter={setFilter}
                            />
                        </li>)}
                </ul>
            </div>
        )
    } else if (matches === 1) {
        return (
            <div>
                <Country
                    name={countries[0].name}
                    capital={countries[0].capital}
                    population={countries[0].population}
                    languages={countries[0].languages}
                    flag={countries[0].flag}
                />
                <Weather capital={countries[0].capital}/>
            </div>
        )
    } else {
        return (
            <div>No matches found</div>
        )
    }
}

export default ShownCountries