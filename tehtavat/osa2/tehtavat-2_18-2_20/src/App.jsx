import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY

const Form = (props) => 
  <form>
    <li>find countries <input type="text" onChange={props.handleInput}/></li>
  </form>

const CountryName = (props) => 
  <li>{props.countryObj.name.common} <button onClick={() => props.setCountry(props.countryObj)}>Show</button></li>


const Languages = (props) => 
  <>
    <h2>Languages</h2>
    <ul>
      {Object.values(props.langs).map(lang =>
        <li key={lang}> {lang}</li>
      )}
    </ul>
  </>

const Flag = (props) => 
  <img src={props.flag.png} alt="" />

const WeatherData = (props) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coord1}&lon=${props.coord2}&appid=${apiKey}&units=metric`)
      .then(response =>  setData(response.data)) 
  }, [props.coord1, props.coord2])

  if (!data) {
    return
  }

  console.log(data)
  let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  return (
  <>
    <h2>Weather in {props.name}</h2>
    <li>Temperature {data.main.temp} Celcius</li>
    <img src={weatherIcon} alt="" />
    <li>Wind {data.wind.speed} m/s</li>
  </>
  )
}

const CountryData = (props) => {

  let country = props.country

  return (
  <>
    <h1>{country.name.common}</h1>
    <li>Capital {country.capital}</li>
    <li>Area {country.area}</li>
    <Languages langs={country.languages}/>
    <Flag flag={country.flags}/>
    <WeatherData name ={country.name.common} coord1={country.capitalInfo.latlng[0]} coord2={country.capitalInfo.latlng[1]}/>
  </>
  )
}

const CountryLister = (props) => {

  const [countryInView, setCountryInView] = useState()

  useEffect(() => {
    setCountryInView(null)
  }, [props.currentInput])

  const setCountry = (country) => setCountryInView(country)

  if (props.countries.length > 10) return 'Too many matches, specify another filter'
  if (props.countries.length == 1) return <CountryData country={props.countries[0]}/>
  if (countryInView) return <CountryData country={countryInView}/>

  return props.countries.map(country => 
    <div key={country.name.common}>
      <CountryName countryObj={country} setCountry={setCountry}/>
    </div>
)}



function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [currentInput, setCurrentInput] = useState('')

useEffect(() => {
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => setAllCountries(response.data))
}, [])


  const handleInput = (event) => {
    let input = event.target.value.toLowerCase()
    setCurrentInput(input)
    setCountries(allCountries.filter(country => {
      let name = country.name.common.toLowerCase()
      return name.includes(input)
      }
    ))
  }

  return (
    <div>
      <Form handleInput={handleInput}/>
      <CountryLister countries={countries} currentInput={currentInput}/>
    </div>
  )
}

export default App