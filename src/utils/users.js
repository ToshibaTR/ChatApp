const users = []
const addUser=({id,username,room})=>{
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if(!username || !room){
        return{
            error:'Username and room are required!'
        }
    }
    const existingUser = users.find((user)=>{
        return user.room == room && user.username==username
    })
    if(existingUser)
    {
        return{
            error:'Username is in use'
        }
    }
        const user = {id,username,room}
        users.push(user)
        console.log('add user is',user)
       // console.log("user is now",user)
        return {user}

    }


    const res = addUser({
        id:22,
        username:'Andrew',
        room:'South Philly'
    })

    console.log(res)

    const removeUser=(id)=>{
      const index = users.findIndex((user)=>{
          return user.id==id
      })
      if (index !== -1)
      return users.splice(index,1)[0]
    }
console.log(users)
const removedUser = removeUser(22)
console.log(removedUser)
console.log(users)



 const getUser = (id) => {

  
    const user = users.find((user) =>{ return user.id===id})

    
    return user
    console.log(user)
}

const getUserInRoom = (room) => {
    console.log('getUserInRoom -Room is',room)
    console.log(users)
    room = room.trim().toLowerCase()
   const usersInRoom = users.filter((user) =>{
        console.log('Inside getUserInRoom',user.room)
        return room.localeCompare(user.room)
        //console.log('Room is',room)
    })
     //console.log('Inside getUserInRoom',user.room)
    console.log('getUserInRoom:users in room',usersInRoom)
     return {usersInRoom}

}
/*
const userOne = addUser({
    id:22,
    username:'Toshiba',
    room:'South Philly'
})

const userTwo = addUser({
    id:23,
    username:'Pramod',
    room:'Center City'

})

const userThree = addUser({
    id:24,
    username:'Medha',
    room:'Center City'
})

const userFour = addUser({
    id:25,
    username:'Next one',
    room:'South Philly'
})
*/


//const user = getUser(22)
//console.log('user is',user)
//const usersInRoom = getUserInRoom('South Philly')
//console.log('users In room',usersInRoom)

//const CenterCityUsers = getUserInRoom('Center City')
//console.log('users In room',usersInRoom)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}