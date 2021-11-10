

const socket = io("http://localhost:3000")

const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const $messages=document.querySelector('#messages')
const messageTemplate= document.querySelector('#message-template').innerHTML

const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message', (message) =>{
    debugger
    console.log('This needs to be rendered',message)
    
    const html = Mustache.render(messageTemplate, {
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    debugger
    console.log('message put for render')
    debugger
    $messages.insertAdjacentHTML('beforeend',html)
})

debugger
socket.on('sendLocation',(message)=>{
console.log(message)
const html = Mustache.render(locationMessageTemplate, {
    url:message.url,
    createdAt:moment(message.createdAt).format('h:mm a')
    })
$messages.insertAdjacentHTML('beforeend',html)
})
/*
const autoscroll = () => {
    const $newMessageStyles = getComputedStyle($newMessage)
    const $newMessage = $messages.lastElementChild
    const newMessageStyles = getComputesStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    const visibleHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight
    const scrollOffset = $messages.scrollTop + visibleHeight
    if (containerHeight - newMessageHeight) < = {
        $messages.scrollTop = $messages.scrollHeight
    }
}
*/
const $messageform = document.querySelector('#message-form')
const $messageforminput = document.querySelector('input')
const $messageformbutton = document.querySelector('button')
console.log(document.querySelector('#message-form'))
console.log(document.querySelector('input').value)
debugger
document.querySelector('#message-form').addEventListener('submit', (e)=>{
    debugger
    e.preventDefault()
    console.log('input from clients')
   $messageformbutton.setAttribute('disabled', 'disabled')
   debugger
    const message = e.target.elements.message.value
    console.log(message)
    debugger
    //const message = document.querySelector('input').value
    socket.emit('sendMessage', message,(error)=>
    { 
        debugger
        $messageformbutton.removeAttribute('disabled')
        $messageforminput.value = ''
        $messageforminput.focus()
       if (error)
       {
        console.log('The message is not Delivered',error)
       }
       debugger
       console.log('Message is delivered')
    }
    )
})

const $sendLocation = document.querySelector('#send-location')

$sendLocation.addEventListener('click', ()=>{
    console.log('Now popup should come')
    if(!navigator.geolocation)
    return alert('Geolocation not supported by your browser')

    $sendLocation.setAttribute('disabled','disabled')
    
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log('now to display location')
       // console.log(position.coords.latitude)
        const coordinates = {
            'longitude':position.coords.longitude,
            'latitude':position.coords.latitude
        }
       // console.log('what is wrong'+coordinates.longitude+coordinates.latitude)
      //  socket.emit('sendLocation',{longitude:position.coords.longitude,latitude:position.coords.latitude})
        socket.emit('sendLocation',coordinates, (message)=>{
            $sendLocation.removeAttribute('disabled')
            console.log('Message from Server',message)
            
        })
        })
})

//const username = "1345dfrde456ar"
//const room = "110067"
debugger
socket.emit('join',{username,room},(error)=>{
    console.log('Join-username room',username,room)
    debugger
    if(error){
    alert(error)
    debugger
    location.href = '/'
    }
    debugger
    //console.log('Socket join error from server',error)
    debugger
})
  
