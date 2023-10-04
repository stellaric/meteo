import React, { useEffect, useState } from 'react';
import Search from './Search';

export default function Main() {

  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;//remplacer la clé api sinon ça ne va pas marcher 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;
const options =  {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: apiKey,
  },
};
  useEffect(() => {
    // Fonction pour gérer la recherche
    const handleSearch = () => {
      if (searchQuery.trim() === '') {
        alert('Veuillez entrer une ville.');
        return;
      }

      fetch(url,options)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod !== 200) {
            alert('Ville non trouvée. Veuillez réessayer.');
            return;
          }
          setWeatherData(data);
        })
        .catch((error) => {
          console.error(error);
          alert('Une erreur s\'est produite lors de la recherche. Veuillez réessayer.');
        });
    };

    // Exécutez handleSearch lorsque searchQuery change
    if (searchQuery !== '') {
      handleSearch();
    }
  }, [searchQuery, url]);

  return (
    <div className="App">
      <Search
        searchQuery={searchQuery}
        onSearch={(query) => setSearchQuery(query)}
      />
      {weatherData && (
        <div className="weather-info">
          <h2>Météo pour {weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Température : {weatherData.main.temp}°C</p>
          <p>Humidité : {weatherData.main.humidity}%</p>
          <p>Pression : {weatherData.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}
