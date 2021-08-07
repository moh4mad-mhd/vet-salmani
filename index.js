const { json } = require('express')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
let date = new Date().toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded())
app.set('view engine', 'ejs')

function validate() {
    if (2 > 3) {
        return false
    }
    else {
        return true
    }
}

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
    var fname = req.body.fname
    var pet = req.body.pet_type
    var age = req.body.age
    var gender = req.body.gender
    var tel = req.body.tel
    var address = req.body.address
    var history = req.body.history
    var vcase = req.body.case

    var data = {
        name: fname,
        pet_type: pet,
        age: age,
        his: history,
        visit_case: vcase
    }
    res.render('confirm', data)
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
});