import axios from 'axios';
import Chart from 'chart.js';

const apiKey = 'import axios from 'axios';
import Chart from 'chart.js';

const apiKey = 'pk_2586d877178a4051a62db896a4bead19';
let stockSymbol = '';
let ratio = 'price';

const chartData = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    borderColor: 'blue',
    fill: false,
  }],
};

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: chartOptions,
});

const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  stockSymbol = document.getElementById('stock-symbol').value;
  ratio = document.getElementById('ratio').value;
  fetchData();
});

function fetchData() {
  axios.get(`https://cloud.iexapis.com/stable/stock/${stockSymbol}/chart/1m?token=${apiKey}`)
    .then(response => {
      const stockData = response.data;
      updateChart(stockData);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateChart(stockData) {
  chartData.labels = stockData.map(data => data.date);
  chartData.datasets[0].label = stockSymbol;
  chartData.datasets[0].data = stockData.map(data => data[ratio]);
  chart.update();
}
';
let stockSymbol = '';
let ratio = 'price';

const chartData = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    borderColor: 'blue',
    fill: false,
  }],
};

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: chartOptions,
});

const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  stockSymbol = document.getElementById('stock-symbol').value;
  ratio = document.getElementById('ratio').value;
  fetchData();
});

function fetchData() {
  axios.get(`https://cloud.iexapis.com/stable/stock/${stockSymbol}/chart/1m?token=${apiKey}`)
    .then(response => {
      const stockData = response.data;
      updateChart(stockData);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateChart(stockData) {
  chartData.labels = stockData.map(data => data.date);
  chartData.datasets[0].label = stockSymbol;
  chartData.datasets[0].data = stockData.map(data => data[ratio]);
  chart.update();
}
