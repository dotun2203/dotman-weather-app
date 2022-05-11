const cityForm = document.querySelector("form");

const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const updateUI = (data) => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // DESTRUCTURE PROPERTIES
  const { cityDets, weather } = data;

  // UPDATE DETAILS UPDATE
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // UPDATE THE NIGHT/DAY  & ICON IMAGES
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  // if (weather.IsDayTime) {
  //   timeSrc = "img/day.svg";
  // } else {
  //   timeSrc = "img/night.svg";
  // }
  time.setAttribute("src", timeSrc);

  // REMOVE THE D-NONE CLASS IF PRESENT
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // PREVENT DEFAULT ACTION
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // UPDATE THE UI WITH NEW CITY
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // SET LOCAL STORAGE
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
