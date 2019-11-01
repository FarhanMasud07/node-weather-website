const path = require('path')


const express = require('express')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

///// define paths for express config ////////


 const publicDirectory = path.join(__dirname,'../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const layoutPath = path.join(__dirname, '../templates/layout')



//// geo code , forecast/////
//const address = process.argv[2]
// if (!address) {
//     console.log('Please Procide an address')
// } else {
//     geocode(address, (error, { latitude, longitude, location }) => {
//         if (error) {
//             return console.log(error)
//         }
//         //  console.log('Error',error)
//         //  console.log('Data',data)
//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return console.log(error)
//             }

//             console.log(location)
//             console.log(forecastData)
//         })
//     })
// }







///// setup static directory to server ///
 app.use(express.static(publicDirectory))

/////// set up handlebar engine and view ////////

app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(layoutPath)

// app.get('', (req,res)=>{
//     res.render('index',{
//         'title' : 'PRD'
//     })
// })

app.get('', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address !!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        //  console.log('Error',error)
        //  console.log('Data',data)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({

                forecast: forecastData,
                location,
                address: req.query.address
            })
            //console.log(location)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     forcast: 'it is snowing',
    //     location: 'Dhaka',
    //     address: req.query.address,
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search form'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.send('About article not found')
})

app.get('*', (req, res) => {
    res.send('404 Page Not Found')
})

// app.get('', (req,res)=>{
//     res.send('Hello Node Js!')
// })

// app.get('/contact', (req,res)=>{
//     res.send('Contact Us!')
// })

// app.get('/about', (req,res)=>{
//     res.send('About Us!')
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})