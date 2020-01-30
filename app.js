window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description')
    let temperatureDegree = document.querySelector('.temp-degree')
    let locationTimezone = document.querySelector('.location-timezone')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'

            const api = `${proxy}https://api.darksky.net/forecast/c70954bbe10e84bba210935af990dfe7/${lat},${long}`
            // console.log(position)

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const{temperature, summary, icon} = data.currently
                //SET DOME ELEMENTS FROM THE API

                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone
                // SET ICONS
                setIcons(icon, document.querySelector('.icon'))
                
            })
        });
       
    }  
    function setIcons(icon, iconId) {
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase()
        skycons.play()
        return skycons.set(iconId, Skycons[currentIcon])
    }
});