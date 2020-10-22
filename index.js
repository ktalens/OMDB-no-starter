require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs =require('fs') 
const axios = require('axios')

app.set('view engine','ejs')
app.use(ejsLayouts)


// -----> HOME ROUTE <-----
app.get('/',(req,res)=>{
    res.render('home')
})

// -----> MOVIES GET ROUTE <-----
app.get('/movies',(req,res)=>{
    let movieSearch = req.query.q
    //res.render('movies',{movieData: movieSearch})

    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY.toString()}&s=${movieSearch}`)
    .then(response=>{
        //res.send(response.data)
        let movieData=response.data.Search
        //res.send(movieData[0].Title)
        res.render('movies',{movieData: movieData})
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(process.env.PORT,()=>{
    console.log('OMDB is running...')
})