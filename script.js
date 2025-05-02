const apiKey = "1055946000440e5ff2dd438240b40f75";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    //display error message when city is not found
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }else{
        document.querySelector(".error").style.display = "none";
    }

    var data = await response.json();
    
    //display data in html
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //update weather icon depends on the weather
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    } else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    } else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    } else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    } else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    } else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }

    //display weather when city is searched
    document.querySelector(".weather").style.display = "block";


    
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})