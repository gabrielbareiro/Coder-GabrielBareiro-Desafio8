const express = require('express');
const path = require('path');
const fs = require('fs')
const multer = require('multer')


const apiRoutes = require('./routers/index')


const app = express();
const PORT = process.env.PORT || 8080;


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//routes
app.use('/api', apiRoutes);
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})


const connectedServer = app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});

