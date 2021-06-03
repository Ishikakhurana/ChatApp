const express=require("express");
const { Server } = require("socket.io");


const app=express();
const http = require('http');
const { prototype } = require("events");
const server = http.createServer(app);

const io = new Server(server);



app.use(express.static("public"));

let userList=[];

io.on("connection",function(socket){
// console.log(socket.id+" connected");

socket.on("userConnected",function(username){
    if(username==null){
        return;
    }
let userObject={
    id:socket.id,
    username:username
};
userList.push(userObject);
// console.log(userList);

socket.broadcast.emit("join",userObject);
socket.emit("online-list",userList);
});
socket.on("chat" , function(chatObj){
    socket.broadcast.emit("chatLeft" , chatObj);
});

socket.on("disconnect",function(){
    // console.log(socket.id+ " disconnected");
    let leftUserObj;
    let remainingUserList=userList.filter(function(userObj){
        if(userObj.id == socket.id){
            leftUserObj=userObj;
            return false;
        }
        return true;
    });
    userList=remainingUserList;
socket.broadcast.emit("leave",leftUserObj);
});

});
// app.get("/",function(req,res){

// });

let port=process.env.PORT||5500;
server.listen(port,function(){
// console.log("server running");
});