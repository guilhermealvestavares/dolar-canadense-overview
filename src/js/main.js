let $ = document.querySelector.bind(document);
const priceNow = $('.content-infos__price');

const createFieldForAfterDay = (date,price) => {
  const containerField = document.createElement('div');
  containerField.classList.add('content-after-days__data');
  containerField.innerHTML = `
    <p class="content-after-days__date"> ${date}</p>
    <p class="content-after-days__price">${price}</p>
  `;
  $('.content-after-days').appendChild(containerField);
}

const timeStampForPatternBr = (timeStamp, type) => {
  let date = new Date(timeStamp * 1000).toLocaleString('pt-BR', { timeZone: 'UTC', month: 'numeric', day: 'numeric' });
  return date;
}

const insertDataInChart = (bid,timestamp) => {
  chartPrice.config.data.labels.unshift(timestamp);
  chartPrice.config.data.datasets[0].data.unshift(bid);
}

const reqApi = () => {
    fetch("https://economia.awesomeapi.com.br/json/daily/CAD-BRL/90")
        .then((response) => {
        response.json()
        .then((data) => {
        data.forEach(({bid,timestamp}, index) => {
            insertDataInChart(bid,timeStampForPatternBr(timestamp));
            if(index == 0) {
                priceNow.innerHTML += bid;
            } else if(index <= 8) {
              createFieldForAfterDay(timeStampForPatternBr(timestamp), bid);
            } else {

            }
        });
    })
  })
  .catch((err) => { 
    console.error('Failed retrieving information', err);
  });
}

reqApi();

const ctx = document.getElementById('chart-price').getContext('2d');
Chart.defaults.global.defaultFontColor = 'white';
const chartPrice = new Chart(ctx, {
  type: 'line',
  data: {
      labels: [],
      datasets: [{
          label: 'Preço do dólar canadense',
          data: [],
          backgroundColor: 
            'rgba(255,255, 255, 0.3)',
          borderColor: 
            'rgba(255,255, 255, 0.3)'
          ,
          borderWidth: 1
      }]
  },
  options: {
    responsive: true,
    legend: {
      labels: {
          fontColor: 'white',
          fontFamily: 'Roboto'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: false
          }
      }]
    }
  }
});


