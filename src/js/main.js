let $ = document.querySelector.bind(document);
const priceNow = $('.content-infos__price');
const pricesAfter = document.querySelectorAll('.content-after-days__prices');

const createFieldForAfterDay = () => {
  const containerField = document.createElement('div');
  containerField.classList.add('content-after-days__data');
  containerField.innerHTML = `
  <p class="content-after-days__date">aaa</p>
  <p class="content-after-days__price">aaa</p>
`;
$('.content-after-days').appendChild(containerField);
}

/* const insertPriceInFields = (className, value) => {
  document.querySelectorAll(className)[index - 1].innerHTML = value;
}

const insertDateInFields = () => {
  document.querySelectorAll('.content-after-days__date')[index - 1].innerHTML = element.timestamp;
} */

const timeStampForPatternBr = (timeStamp) => {
  //const date = new Date(timeStamp * 1000); 
  //date.toISOString();
  //console.log(date);
  let date = moment.tz(timeStamp * 1000, "America/Sao_Paulo").calendar();
  return date;

}

const reqAPI = () => {
    fetch("https://economia.awesomeapi.com.br/json/daily/CAD-BRL/8")
        .then((response) => {
        response.json()

        .then((data) => {
        data.forEach((element, index) => {
            if(index == 0) {
                priceNow.innerHTML += element.bid;
            } else {
              createFieldForAfterDay();
              document.querySelectorAll('.content-after-days__price')[index - 1].innerHTML = element.bid;
              document.querySelectorAll('.content-after-days__date')[index - 1].innerHTML = timeStampForPatternBr(element.timestamp);
            }
        });
    })
  })
.catch((err) => { 
  console.error('Failed retrieving information', err);
});
}

reqAPI();