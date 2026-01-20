
    const apiKey = "248831b2832b71f974bbc9127f98c18b"; // Your API key

    function getWeather() {
      const cityInput = document.getElementById("city");
      const resultDiv = document.getElementById("result");
      const city = cityInput.value.trim();

      if (city === "") {
        resultDiv.innerHTML = `<span class="error">⚠️ Please enter a city name.</span>`;
        return;
      }

      // Show loader
      resultDiv.innerHTML = `<span class="loader">Fetching weather data...</span>`;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("City not found or API error");
          }
          return response.json();
        })
        .then(data => {
          resultDiv.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
          `;
        })
        .catch(error => {
          resultDiv.innerHTML = `<span class="error">❌ Unable to fetch weather data.<br>Check city name or API key.</span>`;
          console.error(error);
        });
    }

    // Event listener for button click
    document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

    // Optional: trigger weather fetch on Enter key
    document.getElementById("city").addEventListener("keypress", function(e) {
      if (e.key === "Enter") getWeather();
    });

