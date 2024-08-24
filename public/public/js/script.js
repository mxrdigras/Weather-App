let searchBox = document.getElementById('search');
let search = document.getElementById('text_box');
let button = document.getElementById('enter');
let weatherIcon = document.getElementById("weather_icon");
let flag = document.getElementById("flags");


function displayInfo (response) {

    if (response.cod == 404) {

        console.log(response);
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";

    }

    else {

        console.log(response);

        let code = response.sys.country;

        flag.src = "https://flagsapi.com/" + `${code}` + "/shiny/64.png";

        var data = response;

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        const condition = data.weather[0].main;

        if (condition == "Clouds") {
            weatherIcon.src = "icons/clouds.png";
        }
        else if (condition == "Clear") {
            weatherIcon.src = "icons/clear.png";
        }
        else if (condition == "Rain") {
            weatherIcon.src = "icons/rain.png";
        }
        else if (condition == "Drizzle") {
            weatherIcon.src = "icons/drizzle.png";
        }
        else if (condition == "Mist") {
            weatherIcon.src = "icons/mist.png";
        }
        else {
            weatherIcon.src = "icons/snow.png";
        }
        
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";

    }  

}

async function getWeather() {

    if (search.value == '') {
        return alert('empty');
    }

    city = search.value;

    search.value = "";

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            displayInfo(response);
        }
    }
    xhr.open('GET', `/weather?title=${city}`, true);
    xhr.send();    
}

//Attach Enter-key Handler
const ENTER = 13;

function handleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        button.click();
    }
}

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('enter').addEventListener('click', getWeather);
    //add key handler for the document as a whole, not separate elements.
    document.addEventListener('keyup', handleKeyUp);


})