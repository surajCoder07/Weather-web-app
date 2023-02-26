let demoCities = document.getElementById("demo").querySelectorAll("li");
let cityInput = document.getElementById("input-city");
let search = document.getElementById("search");


// For demo cities 


demoCities.forEach((city) => {
  city.addEventListener("click", () => {
    cityInput.value = city.textContent;
  });
});

// Click event in search button 

search.addEventListener("click", fetchWeatherDetails) 


// Enter to search

window.addEventListener("keydown",(e)=>{
    if(e.key =="Enter"){
        fetchWeatherDetails();
    }

})






// Main function 



function fetchWeatherDetails() {
    const apiKey = "6c30bdb5ae66b1a8a4391798c79e2e39";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`;

    let weatherData = fetch(url);

    // getting data 

    weatherData
      .then((response) => {
            return response.json();
      })
      .then((data) => {
        if (data.cod == "404") {
          cityInput.classList.add("error");
          alert("Write correct city/state name")
          setTimeout(() => {
            cityInput.classList.remove("error");
          }, 1500);
        } else {

            // temperature

          let temp = document.getElementById("temp");
          temp.textContent = `${Math.round(data.main.temp - 272.15)}°`;

          // location 

          let location = document.querySelectorAll("#location span");
          let date = new Date();
          location[0].textContent = data.name;
          location[1].innerHTML = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} <br> ${
            (  date.getHours()-12) 
          }:${date.getMinutes()} `;

        //   minimum temperature 

          let min = document.getElementById("min");
          min.textContent = `${Math.floor(data.main.temp_min - 272.15)}°`;

        //   maximum temperature 

          let max = document.getElementById("max");
          max.textContent = `${Math.round(data.main.temp_max - 272.15)}°`;

        //   humidity

          let humidity = document.getElementById("humidity");
          humidity.textContent = `${data.main.humidity}%`;

        //   wind


          let wind = document.getElementById("wind");
          wind.textContent = `${data.wind.speed}km/h`;

        //   Weather Type 

          let weatherType = document.getElementById("weatherType");
          weatherType.textContent = data.weather[0].main;

          //background

          let background = document.querySelector(".container").style;

          let bg = document.querySelector(".container").style;

          let random = Math.floor(Math.random() * 4);

          if (date.getHours() > 18 || date.getHours() < 4) {
            weatherImg.setAttribute("src", "icon/night.png");
            background.setProperty(
              "--bg-img",
              `url(images/night-${random}-min.jpg`
            );

            return;
          } else {
            switch (data.weather[0].main) {
              case "Clear":
                weatherImg.setAttribute("src", "icon/sun.png");
                background.setProperty(
                  "--bg-img",
                  `url(images/sunny-cloudy-${random}-min.jpg`
                );
                break;
              case "Haze":
                weatherImg.setAttribute("src", "icon/haze.png");
                background.setProperty(
                  "--bg-img",
                  `url(images/haze-${random}-min.jpg`
                );
                break;
              case "Rain":
                weatherImg.setAttribute("src", "icon/rain.png");
                background.setProperty(
                  "--bg-img",
                  `url(images/rain-${random}-min.jpg`
                );
                break;
              case "Smoke":
                weatherImg.setAttribute("src", "icon/haze.png");
                background.setProperty(
                  "--bg-img",
                  `url(images/haze-${random}-min.jpg`
                );
                break;
                case "Clouds":
                    weatherImg.setAttribute("src", "icon/cloud.png");
                    background.setProperty(
                      "--bg-img",
                      `url(images/clouds.jpg`
                    );
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }


