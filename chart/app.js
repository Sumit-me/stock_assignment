$(document).ready(function() {
  // Get the API key from the environment variable
  const apiKey = 'pk_2586d877178a4051a62db896a4bead19';
  
  // Get references to HTML elements
  const searchForm = $('#search-form');
  const searchInput = $('#search-input');
  const resultsTable = $('#results-table');
  const newsSection = $('#news-section');
  const newsCards = $('#news-cards');
  const chartCanvas = $('#chart');

  // Listen for the form submission event
  searchForm.on('submit', function(event) {
    // Prevent the form from actually submitting
    event.preventDefault();

    // Get the user's search query
    const query = searchInput.val().trim().toUpperCase();

    // If the query is empty, don't do anything
    if (!query) {
      return;
    }

    // Make API calls to get the stock quote and news articles
    $.when(
      // Get the stock quote
      $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${query}/quote?token=${apiKey}`,
        method: 'GET'
      }),

      // Get the news articles
      $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${query}/news/last/5?token=${apiKey}`,
        method: 'GET'
      })
    )
      .then(function(quoteResponse, newsResponse) {
        // Extract the relevant data from the API responses
        const quote = quoteResponse[0];
        const news = newsResponse[0];

        // Add the stock quote to the results table
        resultsTable.html(`
          <tr>
            <th>Symbol</th>
            <td>${quote.symbol}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>${quote.companyName}</td>
          </tr>
          <tr>
            <th>Latest Price</th>
            <td>${quote.latestPrice}</td>
          </tr>
          <tr>
            <th>Change</th>
            <td>${quote.change}</td>
          </tr>
          <tr>
            <th>Change Percent</th>
            <td>${quote.changePercent}</td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>${quote.marketCap}</td>
          </tr>
          <tr>
            <th>PE Ratio</th>
            <td>${quote.peRatio}</td>
          </tr>
        `);

        // Add the news articles to the news section
        const newsCardsHtml = news.map(function(article) {
          return `
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${article.headline}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${article.source}</h6>
                <p class="card-text">${article.summary}</p>
                <a href="${article.url}" target="_blank" class="card-link">Read more</a>
              </div>
            </div>
          `;
        }).join('');
        newsCards.html(newsCardsHtml);

        // Get the stock chart data
        return $.ajax({
          url: `https://cloud.iexapis.com/stable/stock/${query}/chart/5y?token=${apiKey}`,
          method: 'GET'
        });
      })
      .then(function(chartData) {
  // Convert the date strings to Date objects
  chartData = chartData.map(function(day) {
    return {
      x: new Date(day.date),
      y: day[ratio]
    };
  });

  // Create the chart
  var chart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      datasets: [{
        label: `${query} ${ratio}`,
        data: chartData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Price'
          }
        }
      }
    }
  });
})

