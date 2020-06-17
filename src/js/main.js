let $ = document.querySelector.bind(document);
const priceNow = $('.content-infos__price');
const IOF_RATE = 1.10;

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

const changeTypeChart = () => {
  const radioChart = document.querySelectorAll('.radio-change-chart');
  radioChart.forEach((element, index) => {
    element.addEventListener('click', () => {
      if(element.checked) {
        if(index == 0) {
          console.log("gráfico de linha");
          chartPrice.type = "line";
          console.log(chartPrice.type);
        } else if(index == 1) {
          console.log("gráfico de barras");
          chartPrice.type = "bar";
          console.log(chartPrice.bar);
        }
      }
    })
  })
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
              createFieldForAfterDay(timeStampForPatternBr(timestamp), bid );
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

changeTypeChart();

