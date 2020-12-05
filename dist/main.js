
let cities = new citiesManeger()
let renderer = new Renderer()

$('#btn').on('click', async function () {
    const input = $('#input').val()
    const data = await getCity(input)
    renderer.renderData(data)
})
const save = async function (name) {
    const data = await getCity(name)
    const addCity = await cities.saveCity(data)
    return addCity
}

const getCity = async function (name) {
    const cityName = name.toLowerCase()
    const getCity = await cities.getCityData(cityName)
    let data = {
        name: getCity.name,
        temperature: getCity.main.temp,
        condition: getCity.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${getCity.weather[0].icon}@2x.png`,
        updatedAt: new Date()
    }
    return data
}

const updateAouto = async function(){
    const load = await cities.getDatafromDB()
    for (let l of load){
        await update(l.name)
    }
}


const loadPage = async function () {
    getLocation()
    updateAouto()
}

const update = async function (name) {
    const data = await getCity(name)
    const updateData = await cities.updateCity(name, data)
    const load = await cities.getDatafromDB()
    renderer.renderOnload(load)
}
const remove = async function (name) {
    const removeCity = await cities.removeCity(name)
    const load = await cities.getDatafromDB()
    renderer.renderOnload(load)
}




function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(takePositionAndshow);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
 const takePositionAndshow = async function (position) {
    let latitude =   position.coords.latitude 
    let longitude =  position.coords.longitude
    const cityName = await cities.getUserCity(latitude,longitude)
    const data = await getCity(cityName)
    renderer.renderData(data)
}
