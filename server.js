const express = require('express')
const favicon = require('express-favicon')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

app.use(favicon(__dirname + '/build/favicon.ico'))
app.use(express.static(__dirname))

// Serve the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint to check the status of the app
app.get('/marco', (req, res) => res.send('polo') )

// Serve the index html file for all other requests
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')) )

app.listen(port, () => console.log("Listening on Port", port)) 