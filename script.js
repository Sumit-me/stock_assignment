const newsContainer = document.getElementById('news-cards');

fetch('https://cloud.iexapis.com/stable/stock/market/news/last/10?token=pk_2586d877178a4051a62db896a4bead19')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create a card for each news item
    data.forEach(newsItem => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem'; // Adjust card width as per your design

      const cardImg = document.createElement('img');
      cardImg.src = newsItem.image;
      cardImg.classList.add('card-img-top');
      cardImg.alt = newsItem.headline;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = newsItem.headline;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = newsItem.summary;

      const cardLink = document.createElement('a');
      cardLink.href = newsItem.url;
      cardLink.classList.add('btn', 'btn-primary');
      cardLink.textContent = 'Read more';

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardLink);

      card.appendChild(cardImg);
      card.appendChild(cardBody);

      newsContainer.appendChild(card);
    });
  })
  .catch(error => console.error(error));
