const apiKey = 'APIKEY'; // Replace with your API key

async function getWeather(city) {
    const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city;
    const response = await fetch(apiUrl, { mode: 'cors' });
    const data = await response.json();
    return data;
}

function updateUI(data) {
    if (data && data.location && data.location.name) {
        document.querySelector('.location').textContent = data.location.name + ', ' + data.location.country;
        document.querySelector('.temperature').textContent = data.current.temp_c + '°C';
        document.querySelector('.description').textContent = data.current.condition.text;
    } else {
        console.log('Weather data is invalid:', data);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    if (citySelect) {
        citySelect.addEventListener('change', () => {
            const selectedCity = citySelect.value;
            console.log('Selected city:', selectedCity); // Log the selected city
            getWeather(selectedCity)
                .then(data => {
                    console.log('Weather data:', data); // Log the weather data
                    updateUI(data);
                })
                .catch(error => console.log('Error fetching weather:', error));
        });

        // Get weather for default city on page load
        const defaultCity = citySelect.value;
        console.log('Default city:', defaultCity); // Log the default city
        getWeather(defaultCity)
            .then(data => {
                console.log('Weather data:', data); // Log the weather data
                updateUI(data);
            })
            .catch(error => console.log('Error fetching weather:', error));
    } else {
        console.log('Element with id "city-select" not found.');
    }
});
