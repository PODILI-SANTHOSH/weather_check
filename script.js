const apiKey = '76be9cc42af84a3886881134251906';

async function getWeather() {
  const location = document.getElementById('locationInput').value;
  if (!location) return alert('Please enter a city name.');

  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`);
  const data = await response.json();

  if (data.error) {
    document.getElementById('weatherResult').innerHTML = `<p>${data.error.message}</p>`;
    return;
  }

  const { location: loc, current, forecast } = data;

  document.getElementById('weatherResult').innerHTML = `
    <h2>${loc.name}, ${loc.country}</h2>
    <p><strong>${current.temp_c}°C</strong> - ${current.condition.text}</p>
    <img src="${current.condition.icon}" />
  `;

  const labels = forecast.forecastday.map(d => d.date);
  const temps = forecast.forecastday.map(d => d.day.avgtemp_c);

  renderChart(labels, temps);
}

function renderChart(labels, temps) {
  const ctx = document.getElementById('historyChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Avg Temp (°C)',
        data: temps,
        borderColor: '#4bc0c0',
        fill: false,
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
}
