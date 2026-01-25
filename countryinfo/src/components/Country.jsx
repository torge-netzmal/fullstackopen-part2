const Country = ({country}) => {
    console.log(country)
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
        </div>
    )
}


export default Country;