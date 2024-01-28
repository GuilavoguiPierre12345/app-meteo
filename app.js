const container = document.querySelector(".appBox"); /** container de l'application */
const searchBtn = document.querySelector(".searchBox button"); /** bouton de recherche */
const weatherBox = document.querySelector(".weather-box"); /** Bloc d'info des meteos */
const weatherDetails = document.querySelector(".weather-details"); /** details de la meteo */

searchBtn.addEventListener("click", function(event) {
    const apiKey = '68c517a51119f056fc4f841e89488409'; /** cle api du site */
    const ville = document.querySelector(".searchBox input").value;

    /** mettre fin a la recherche si le nom de la ville est vide */
    if (ville === "")
        return;

    /** envoi de la requette vers l'api pour avoir des informations de la meteo */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
        /** les informations de la meteo */
        const image = document.querySelector(".weather img");
        const temperature = document.querySelector(".weather .temperature");
        const description = document.querySelector(".weather .description");
        /** les details sur la meteo */
        const humidity = document.querySelector(".humidity .info-humidity span");
        const wind = document.querySelector(".wind .info-wind span");
        const code = document.querySelector(".code");
        /** changer l'image en fonction de l'etat de la meteo */
        switch (json.weather[0].main) {
            case "Clear": /** cas pour un ciel claire */
                image.src = "clear.png";
                break;
            case "Rain": /** cas pour une pluie */
                image.src = "rain.png";
                break;
            case "Snow": /** cas pour une neige */
                image.src = "snow.png";
                break;
            case "Clouds": /** cas pour le nuage */
                image.src = "clouds.png";
                break;
            case "Mist": /** cas pour le brouillard */
                image.src = "mist.jpg";
                break;
            default:
                image.src = "cloud1.png";
                break;
        }
        temperature.innerHTML = `${json.main.temp}<sup>°C</sup>`;
        humidity.textContent = `${json.main.humidity}%`;
        description.textContent = `${json.weather[0].description}`;
        wind.textContent = `${json.wind.speed}Km/h`;
        code.textContent = `Coords (long :${json.coord.lon}, lat :${json.coord.lat})`;

    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
    })


});