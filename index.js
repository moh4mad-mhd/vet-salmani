const { json } = require('express')
const express = require('express')
const moment = require('jalali-moment')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/home')
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/visit', (req, res) => {
    // add a single visit to cases table in database
    console.log('a visit case confirmed')
    res.send('یک ویزیت ثبت شد')
})

app.post('/home', (req, res) => {
    // add data to the visit table in database
    var data = {
        name: req.body.fname,
        pet_type: req.body.pet_type,
        age: req.body.age,
        gender: req.body.gender,
        his: req.body.history,
        visit_case: req.body.case
    }
    res.render('confirm', data)
})

app.get('/getLastNum', (req, res) => {
    res.send('100')
})

app.post('/addNew', (req, res) => {
    // add values to cases and visit cases table in database
    res.send("پرونده ی جدید ثبت شد")
})

app.get('/doctor', (req, res) => {
    res.render('doctor')
})

app.get('/cases', (req, res) => {
    res.render('cases', { disabled: 'disabled', name: 'mohamad' })
})

app.get('/petshop', (req, res) => {
    res.render('petshop')
})

app.get('/confirm', (req, res) => {
    res.render('confirm', { name: "test" })
})

app.post('/doctor/lastCaseNum', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.send({ lastCaseNum: 10 })
})

//----ristrict routing--
app.get('/:default', (req, res) => {
    res.redirect('back')
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

    socket.on('sendDr', (data) => {
        console.log("data:" + data)
        socket.broadcast.emit('sendDr', data)
    })

    socket.on('confirmData', (data) => {
        console.log(moment.from(data[2].value, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'))
        socket.broadcast.emit('confirmData', JSON.stringify(data))
        console.log('data: ' + JSON.stringify(data))
    })
});