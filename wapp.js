let weather = {
    apikey: "d7dd8871deb98b2a4fa3c9ecec8ad3dc",

    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));

             
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { lat, lon } = data.coord;
        console.log(name, icon, description, temp, humidity, speed, lat, lon)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed : " + speed + "km/hr";

        let daily = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${this.apikey}`
        fetch(daily).then((res) => res.json()).then((newdata) => this.displayWeather1(newdata))
    },

    search: function () {
        this.fetchWeather(document.querySelector(".searchb").value);
    },

    // forecast
    displayWeather1: function (newdata) {
        const { min, max } = newdata.daily[0].temp;
        console.log("This is the forecast " + min, max);



        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "friday", "Saturday"];

        let today = new Date().getDay();

        let rotateday = days.slice(today).concat(days.slice(0, today));


        //     let a= days.slice(0,today)
        //    console.log(a);

        let week = document.querySelectorAll(".weeksday");
        let icons = document.querySelectorAll(".wicon");
        let tem = document.querySelectorAll(".ftemp");

        for (let i = 0; i < week.length; i++) {
            const { icon } = newdata.daily[i].weather[0];
            week[i].innerHTML = rotateday[i];
            // icons[i].src = "https://openweathermap.org/img/wn/" + params.daily[i].weather[0].icon + ".png";
            icons[i].src = "https://openweathermap.org/img/wn/" + icon + ".png";
           
            tem[i].innerHTML = newdata.daily[i].temp.day +" °C";
        }
    },




}

// search bar

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchb").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("mumbai");

