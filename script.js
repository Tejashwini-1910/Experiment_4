// Arrow function for fetching weather data using async/await
const getWeather = async () => {
  const city = document.getElementById("city").value;
  const apiKey = "b00c84106ba311bc5382f780bcf5e2c8"; 
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") {
      alert("City not found!");
      return;
    }

    processWeatherData(data); // callback
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
// Callback function to process weather data and draw chart
const processWeatherData = (data) => {
  const labels = [];
  const temps = [];

  // Extract data for the next 6 time slots (3-hour interval each)
  data.list.slice(0, 6).forEach(entry => {
    labels.push(entry.dt_txt.split(" ")[1]); // Time only (e.g., 15:00:00)
    temps.push(entry.main.temp);
  });

  // If chart already exists, destroy it before creating new one
  if (window.weatherChart instanceof Chart) {
  window.weatherChart.destroy();
}


  // Create Chart.js line chart
  const ctx = document.getElementById("weatherChart").getContext("2d");
  window.weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
};
