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

const timeStampForPatternBr = (timeStamp) => {
  let date = new Date(timeStamp * 1000).toLocaleString('pt-BR', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  console.log(date);
  return date;
}

const reqApi = () => {
    fetch("https://economia.awesomeapi.com.br/json/daily/CAD-BRL/8")
        .then((response) => {
        response.json()

        .then((data) => {
        data.forEach(({bid,timestamp}, index) => {
            if(index == 0) {
                priceNow.innerHTML += bid;
            } else {
              createFieldForAfterDay(timeStampForPatternBr(timestamp), bid);
    
            }
        });
    })
  })
  .catch((err) => { 
    console.error('Failed retrieving information', err);
  });
}

reqApi();