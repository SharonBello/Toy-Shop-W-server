const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const toyService = require('./services/toy.service.js')

const app = express()
const http = require('http').createServer(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

// app.get('/api/toy', (req, res) => {
//     const filterBy = {
//         txt: req.query.txt || '',
//         inStock: req.query.inStock || true,
//         labels: req.query.labels || [],
//         sortBy: req.query.sortBy || 'name',
//         pageIdx: +req.query.pageIdx || 0
//     }
//     if(filterBy.labels.length) { 
//         filterBy.labels = filterBy.labels.split(',')
//     }
//     if (filterBy.txt === 'undefined') filterBy.txt = ''
//     if (filterBy.inStock === 'undefined') filterBy.userId = 'all'
//     console.log('filter by labels - !!!!!!!!!!!!!!', filterBy)
//     toyService.query(filterBy)
//         .then(toys => res.send(toys))
//         .catch(err => console.log('err@$@$@$', err))
// })

// //new toy
app.post('/api/toy', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add toy')

    const toy = req.body
    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
})

// //edit 
// app.put('/api/toy/:toyId', (req, res) => {
//     // const loggedinUser = userService.validateToken(req.cookies.loginToken)
//     // if (!loggedinUser) return res.status(401).send('Cannot update toy')

//     const toy = req.body
//     toyService.save(toy) // + loggedinUser
//         .then(savedToy => res.send(savedToy))
// })

// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.getById(toyId)
//         .then(toy => res.send(toy))
// })

// app.delete('/api/toy/:toyId', (req, res) => {
//     // const loggedinUser = userService.validateToken(req.cookies.loginToken)
//     // if (!loggedinUser) return res.status(401).send('Cannot delete toy')

//     const { toyId } = req.params
//     toyService.remove(toyId) // + loggedinUser
//         .then(() => res.send())
//         .catch(err => {
//             res.status(401).send('Cannot delete toy', err)
//         })
// }
// )

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/toy/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')

const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

