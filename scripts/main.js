let locationText = document.querySelector('.locationText');
let astrosList   = document.querySelector('.astrosList');
let totalAmount  = document.querySelector('.totalAmount span');
let presentTime  = document.querySelector('.date h4');
let presentDate  = document.querySelector('.date span');

let locationData;
let astrosAmount;

function getDate(){
    locationData = new XMLHttpRequest();

    locationData.open('GET', 'http://api.open-notify.org/iss-now.json', false);

    locationData.send();

    if (locationData.status != 200) {
        alert(locationData.status + ': ' + locationData.statusText); 
    }

    locationData = JSON.parse(locationData.response);

    astrosAmount = new XMLHttpRequest();

    astrosAmount.open('GET', 'http://api.open-notify.org/astros.json', false);

    astrosAmount.send();

    if (astrosAmount.status != 200) {
        alert(astrosAmount.status + ': ' + astrosAmount.statusText); 
    }

    astrosAmount = JSON.parse(astrosAmount.response);

    setTimeout(getDate, 5000);
}

function setLocationText() {
    locationText.innerHTML = `longitude: ${locationData.iss_position.latitude}, latitude: ${locationData.iss_position.longitude}`;
    setTimeout(setLocationText, 5050);
}

function setDate() {
    let time = new Date(locationData.timestamp * 1000);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let year   = time.getFullYear();
    let month  = months[time.getMonth()];
    let day    = days[time.getDay()];
    let date   = time.getDate();
    let hour   = time.getHours();
    let min    = `${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
    
    presentTime.innerHTML = `Current UTC time: ${hour}:${min}`;
    presentDate.innerHTML = `${day}, ${date} ${month} ${year}`;
    setTimeout(setDate, 5000);
}

function setAstros() {

    let amount = []
    astrosList.innerHTML = '';
    for(let i = 0; i < astrosAmount.people.length; i++) {

        let astro = astrosAmount.people[i];

        let astroblock = document.createElement('div');
        astroblock.className = ('astro p-2 mb-2 d-lg-flex');

        let avatar = document.createElement('i');
        avatar.className = ('fas fa-user-circle');

        let astroName = document.createElement('span');

        astrosList.appendChild(astroblock);
        astroblock.appendChild(avatar);
        astroblock.appendChild(astroName);

        if (astro.craft === 'ISS') {
            astroName.innerHTML = `${astro.name}`;
            amount.push(astro);
        }
    }
    totalAmount.innerHTML = `Total amount: ${amount.length} people on ISS`
    setTimeout(setAstros, 5000);
}

function initMap() {
    
    var myLatLng = { lat: +locationData.iss_position.latitude, lng: +locationData.iss_position.longitude };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
    setTimeout(initMap, 5000);
}

getDate();
setLocationText();
setAstros();
setDate()
