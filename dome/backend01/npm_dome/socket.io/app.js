'use strict'

let express = require('express')
let path = require('path')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

app.use('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'))
})

io.on('connection', client => {
  console.log(client.id, '=======================')
  client.on('channel', data => {
    console.log(data)
    io.emit('broadcast', data)
    // client.emit('channel', data)
  })
  client.on('disconnect', () => {
    console.log('close')
  })
})

server.listen(3000, () => {
  console.log("The service listening on 3000 port")
})