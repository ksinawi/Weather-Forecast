const key = '606509710a73bde522aa11c983e64862';

let locations = {};

//* selectors

const ui = 
{
    searchBar: document.getElementById('search'),
    searchButton: document.getElementById('search-button'),

    temprature: document.getElementById('main-p'),
    location: document.getElementById('main-location'),
    image: document.getElementById('main-img'),
    tempratureFeelsLike: document.getElementById('main-feels-like'),
    humidity: document.getElementById('humidity'),
    gusts: document.getElementById('gusts'),

    container: document.getElementById('main-container'),
};

//* event listeners

function eventListeners () {
    document.addEventListener('DOMContentLoaded', renderWeather)
    ui.searchBar.addEventListener('keyup', handleInput);
    ui.searchButton.addEventListener('click', handleClick);
}

//* event handlers

function handleInput (event) {
    if (event.key === 'Enter') {
       searchLocation();
    }
}

function handleClick () {
    searchLocation();
}

function searchLocation (event) {
    const userInput = ui.searchBar.value.trim().toLowerCase();
    if (userInput) {
        fetchWeather(userInput);
    }
}

//* render functions 

function renderWeather () {;
    fetchWeather('dubai');
}

function renderSearch() {
    ui.temprature.innerText = `${locations.main.temp}°c`;
    ui.location.innerText = `${locations.name}`;
    ui.tempratureFeelsLike.innerText = `Feels Like ${locations.main.feels_like}°c`;
    ui.humidity.innerText = `${locations.main.humidity}%`;
    ui.gusts.innerText = `${locations.wind.gust}km/h`

    const weatherMain = locations.weather[0].main;

    switch (weatherMain) {
        case 'Clouds':
            ui.image.src = './images/cloudy.png';
            ui.container.style.backgroundColor = 'gray';
            break;
        case 'Rain':
            ui.image.src = './images/rainy.png';
            ui.container.style.backgroundColor = 'gray';
            break;
        case 'Clear':
            ui.image.src = './images/sunny.png';
            ui.container.style.backgroundColor = 'lightblue';
            break;
        case 'Snow':
            ui.image.src = './images/snow.png';
            ui.container.style.backgroundColor = 'lightgrey';
            break;
        default:
            ui.image.src = './images/sunny.png'; 
    }
}

//* api functions

function fetchWeather (chosenLocation) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${chosenLocation}&appid=${key}&units=metric`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            locations = data;
            renderSearch();
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

//* initialization
eventListeners();