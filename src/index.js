const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const {generateMesssage, generateLocationMessage} = require('./utils/messages')

const {addUser,removeUser,getUser, getUserInRoom} = require('./utils/users')


//const {generateMesssage } = require('./utils/messages')


const app = express()
const server = http.createServer(app)

const io = socketio(server) 

app.use(express.json())

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))




io.on('connection', (socket) => {
    debugger
    console.log('New WebSocket connection')
    socket.on('join',({username,room}, callback) => {
        const {error,user} = addUser({id:socket.id,username,room})
        if (error) {
            return callback(error)
        }
        socket.join(user.room)

        console.log('I have joined here')
        socket.emit('message', generateMesssage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMesssage(`${username} has joined`))
        
        callback()
       // socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
      })
    
  
socket.on('sendMessage', (message,callback)=>{
    debugger
    const user = getUser(socket.id)
    console.log('user is in sendMessage',user,getUser(socket.id))
    console.log('socket.id for connection',socket.id)
   const filter = new Filter()
   if (filter.isProfane(message))
   {
       return callback('Profanity not allowed')
   }
   if (!user)
   {
       console.log('user is undefined')
       return callback('user is undefined')
   }
   io.to(user.room).emit('message',generateMesssage(message))
   callback('')

   })
   
   socket.on('disconnect', ()=>{
       const user = removeUser(socket.id)
       if(user){
           io.to(user.room).emit('message', generateMesssage(`${user.username} has left`))
       }

       io.emit('message',generateMesssage('A user has left!'))
   })
   
  
   socket.on('sendLocation', (coordinates,callback)=>{
    console.log(coordinates)
       io.emit('sendLocation' ,generateLocationMessage(`https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`))
       callback('Location shared to all clients')
   })
   
})


server.listen(3000,()=>{
    console.log('server is up on port 3000')
})

 