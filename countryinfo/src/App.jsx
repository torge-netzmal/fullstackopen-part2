import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import countriesService from "./services/countries.js";
import Country from "./components/Country.jsx";

function App() {

    const [countries, setCountries] = useState(null)
    const [newFilter, setNewFilter] = useState('')
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => {
        countriesService.getAll()
            .then(res => setCountries(res))
    }, [])

    const handleFilterChange = (event) => {
        const name = event.target.value
        setNewFilter(name)
        console.log(name)
        const filteredCountries = countries.filter(country => {
            return country.name.common.toLowerCase().includes(name.toLowerCase())
        })

        console.log(filteredCountries)
        setCountriesToShow(filteredCountries)
    }


    return (
        <>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
            <div>
                {countriesToShow.length > 10 ? <p>Too many matches, specify another filter</p> : ""}
                {countriesToShow.length === 0 ? <p>No country found, specify another filter</p> : ""}
                {((countriesToShow.length < 10) && (countriesToShow.length > 1)) ?
                    <ul>{countriesToShow.map((country) => <li key={country.cca3}>{country.name.common}
                        <button onClick={() => setCountriesToShow([country])} key={"btn" + country.cca3}>Show</button>
                    </li>)}</ul> : ""}
                {countriesToShow.length === 1 ? <Country country={countriesToShow[0]}/> : ""}
            </div>
        </>
    )
}

export default App
