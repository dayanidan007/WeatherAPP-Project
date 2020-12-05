const express = require('express')
const router = express.Router()
const urllib = require('urllib');
const City = require('../models/City');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


const myApiKey = '204b62a4b54c5ef810c2383eed8b09d1'

router.get('/mycity/:city', function (req, res) {
    const city = req.params.city
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=metric`, function (err, response) {
        let newdata = JSON.parse(response)
        res.send(newdata)
    })
})

router.get('/usercity/:latitude/:longitude', function (req, res) {
    const latitude = req.params.latitude
    const longitude = req.params.longitude
    urllib.request(`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}`, function (err, response) {
        let newdata = JSON.parse(response)
        res.send(newdata.name)
    })
})


router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', async function (req, res) {
    let addCity = await new City({ ...req.body })
    addCity.save()
    res.send(addCity)
})

router.delete('/city/:cityName', async function (req, res) {
    let cityName = req.params.cityName
    const remove = await City.findOneAndDelete({ name: cityName })
    res.send(remove)
})

router.put('/cityupdate/:cityName', async function (req, res) {
    let cityName = req.params.cityName
    let data = req.body
    let update = await City.findOneAndUpdate({ name: cityName },{...req.body})
    res.send(update)
})

module.exports = router
