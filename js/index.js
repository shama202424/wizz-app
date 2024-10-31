// select html element
const inputSearch = document.querySelector(".search-input");
const btnSearch = document.querySelector(".search-btn");
const rowData = document.querySelector("#rowData");

// your api key
const myApi = "02fb115548714016b6142647240310";

// call api
async function callApi(value) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${myApi}&q=${value}&days=3`
  );
  const data = await response.json();

  //   caal display function
  display(data);
}

// // add event to search input
inputSearch.addEventListener("input", (e) => {
  if (e.target.value.length < 3) return;
  console.log("hello");
  callApi(e.target.value);
});

// add event
btnSearch.addEventListener("click", function () {
  console.log("hello");
  callApi(inputSearch.value);
});

// display function
function display(data) {
  let location = data.location.name;
  let array = data.forecast.forecastday;

  let cartona = "";
  // loop on all data from array
  for (let i = 0; i < array.length; i++) {
    let x = getDay(array[i].date);
    console.log(x);
    cartona += `
      <div class="col-md-4 forecast p-0">
        <div class="forecast-header p-3 d-flex align-items-center justify-content-between">
  <p class="day">${x.day}</p>
  <p>${i < 1 ? x.month : ""}</p>
</div>
<div class="forecast-body p-3">
  <p class="location">${i < 1 ? location : ""}</p>
  <div class="degree d-flex flex-column justify-content-center align-items-center">
      <div class="num me-4 d-inline-block">
       ${i < 1 ? data.current.temp_c : array[i].day.avgtemp_c}<sub>o</sub>C
      </div>
      <div class="forecast-icon d-inline-block my-2">
          <img src=${
            i < 1 ? data.current.condition.icon : array[i].day.condition.icon
          } width="90" alt="">
      </div>
  </div>
  <p class="custom mb-5">${
    i < 1 ? data.current.condition.text : array[i].day.condition.text
  }</p>
 <div>
  ${
    i < 1
      ? ` <span class="me-2">
      <img src="./images/icon-umberella.png" alt="">
        ${array[i].day.avghumidity}
      %
  </span>
  <span class="me-2">
      <img src="./images/icon-wind.png" alt="">
      ${array[i].day.maxwind_kph} Kph
  </span>
  <span class="me-2">
      <img src="./images/icon-compass.png" alt="">
      ${data.current.wind_dir}
  </span>`
      : ""
  }
 </div>
</div>
    </div>
    `;
  }

  rowData.innerHTML = cartona;
}

// get Day
function getDay(x) {
  let date = new Date(x);

  let day = date.toLocaleString("en-Us", { weekday: "long" });

  let month = date.toLocaleString("en-Us", { month: "long" });

  return {
    day,
    month,
  };
}

// geolocation
navigator.geolocation.getCurrentPosition(
  (data) => {
    let x = data.coords.latitude;
    let y = data.coords.longitude;
    callApi(`${x},${y}`);
  },
  (err) => {
    callApi("cairo");
  }
);
