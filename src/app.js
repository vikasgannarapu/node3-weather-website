const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fetch = require('node-fetch')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view directory
app.set('views',viewPath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vikas Gannarapu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikas Gannarapu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Vikas Gannarapu',
        helpMessage: 'How can I help you?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'There is no address received'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'coralville',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    req.query
    res.send({
       products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas Gannarapu',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas Gannarapu',
        errorMessage: 'page not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


