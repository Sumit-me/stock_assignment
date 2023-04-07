const apiKey = 'X8PEO7JFMXVYDEN5';

async function fetchData(symbol, ratio) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const dates = Object.keys(data['Time Series (Daily)']).reverse();
  const values = [];
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const value = data['Time Series (Daily)'][date][ratio];
    values.push(value);
  }
  return { dates, values };
}

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const symbol = document.getElementById('symbol').value;
  const ratio = document.getElementById('ratio').value;
  const { dates, values } = await fetchData(symbol, ratio);
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: `${symbol} ${ratio} values`,
        data: values,
        borderColor: 'blue',
        borderWidth: 1,
        fill: false,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
          },
        }],
      },
    },
  });
});
