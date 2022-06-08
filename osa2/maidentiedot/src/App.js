import axios from 'axios'
import { useState, useEffect } from 'react';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [tooManyMatches, setTooManyMatches] = useState(true);
  const [showOne, setShowOne] = useState(false);


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, []);

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setNewFilter(e.target.value);
    let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
    console.log(countriesToShow)

    if (countriesToShow.length === 1) {
      console.log(countriesToShow[0]);
      setSelectedCountry(countriesToShow[0]);
      setTooManyMatches(false);
      setShowFiltered(false);
      //console.log(selectedCountry); //tyhjäää????
      //console.log("kielet: ", selectedCountry.languages); //tämä undefined
      //console.log("maan nimi", selectedCountry.name.common);
      setShowOne(true);

    }
    else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      setShowOne(false);
      setTooManyMatches(false);
      setfilteredCountries(countriesToShow);
      setShowFiltered(true);
    }
    else {
      setShowOne(false);
      setShowFiltered(false);
      setTooManyMatches(true);
    }
  }

  const handleShow = (countryName) => {
    console.log("maan nimi:", countryName)
    setTooManyMatches(false);
    setShowFiltered(false);
    let country = filteredCountries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()));
    console.log('maa ', country[0]);

    setSelectedCountry(country[0]);
    //console.log("valittu maa", selectedCountry);
    setShowOne(true);
  }

  return (
    <>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <div>
        {showFiltered ? (
          filteredCountries.map(country =>
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={() => handleShow(country.name.common)}>show</button>
            </div>
          )
        ) : (
          <p></p>
        )}
        {tooManyMatches ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <p></p>
        )}
        {showOne ? (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>capital {selectedCountry.capital[0]}</p>
            <p>area {selectedCountry.area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(selectedCountry.languages).map((lang) => <li key={lang}>{lang}</li>)}
            </ul>
            <div>
              <img src={selectedCountry.flags.png} alt="flag"/>             
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>

  )
}

export default App;
