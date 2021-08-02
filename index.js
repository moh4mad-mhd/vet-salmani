const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.get('/home', (req, res) => {
    res.render('home')
})

app.post('/home', (req, res) => {
    res.render('confirm')
})

app.get('/doctor', (req, res) => {
    res.render('doctor')
})

app.get('/petshop', (req, res) => {
    res.render('petshop')
})

server.listen(3001, '0.0.0.0', () => {
    console.log("server running...")
})

io.on('connection', (socket) => {
    console.log("user connected:" + socket.id)

    socket.on('message', (data) => {
        console.log("data:" + data)
        //socket.broadcast.emit('message', data)
    });

    socket.on('getLastId', () => {
        socket.emit('getLastId', "10")
    })
});