const generateMesssage = (text) =>{
    console.log(text)
    return {
        text,
        createdAt:new Date().getTime()
    }
}

const generateLocationMessage = (url) =>{
    return {
        url,
        createdAt:new Date().getTime()
    }
}

//Users/pramodmanjunatha/Desktop/Node-course/chat-app/src/utils/messages.js
//Users/pramodmanjunatha/Desktop/Node-course/chat-app/src/index.js
module.exports = {
    generateMesssage:generateMesssage,
    generateLocationMessage:generateLocationMessage
}
