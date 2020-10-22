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
        let searchResultKeys = Object.keys(response.data)
        if (searchResultKeys.includes('Search')) {
            let movieData=response.data.Search
            res.render('movies',{searchResults: movieData})
        } else if (searchResultKeys.includes('Error')) {
            let noResults= [
                { Title: 'There were no results for that search',
                imdbID: 'no results to display'
                }
            ]
            res.render('movies',{searchResults: noResults })
        }
        
    })
    .catch(err=>{
        console.log(err)
    })
})

    // -----> RAW DATA FOR TITANIC <-----
app.get('/data',(req,res)=>{
    let movieSearch = req.query.q
     axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY.toString()}&s=Titanic`)
    .then(response=>{
        res.send(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
})

    // -----> RAW DATA FOR TITANIC WARS <-----
app.get('/data2',(req,res)=>{
    let movieSearch = req.query.q
     axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY.toString()}&s=Titanic+Wars`)
    .then(response=>{
        res.send(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
})

 // -----> SHOW ROUTE <-----
app.get('/movies/:idx',(req,res)=>{
    //res.send(req.params.idx)
    axios.get(`http://www.omdbapi.com/?i=${req.params.idx}&apikey=${process.env.API_KEY.toString()}`)
    .then(response=>{
        let OMDbMovieData = response.data
        let dataKeys= Object.keys(OMDbMovieData)
        let dataValues= Object.values(OMDbMovieData)
        let x = {dataKeys: dataValues}
        res.render('show',{detailKeys: dataKeys, detailValues: dataValues})
        //res.render('show',{OMDbMovieData: movieData})
        //res.send(response.data)

    })
    .catch(err=>{
        console.log(err)
    })
    //res.render('show')
})



app.listen(process.env.PORT,()=>{
    console.log('OMDB is running...')
})