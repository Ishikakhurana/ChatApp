let onlineList=document.querySelector(".online-list");
//sends a message to server

socket.emit("userConnected",username);
socket.on("leave",function(leftUserobj){
    let leaveDiv = document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent = `${leftUserobj.username} left chat`;
    chatWindow.append(leaveDiv);
    deleteFromOnlinelist(leftUserobj.id);
});
socket.on("online-list",function(userList){
for(let i=0;i<userList.length;i++){
    if(socket.id!=userList[i].id){
        let userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.setAttribute("id" , userList[i].id);
    
        userDiv.innerHTML = ` <div class="user-image">
         <img src="default1.jpg" alt="">
        </div>
         <div class="user-name">${userList[i].username}</div>`

         onlineList.append(userDiv);
        
    }
    
}
});
socket.on("join",function(dataObj){
    let joinDiv=document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent=`${dataObj.username} joined the chat`;
    chatWindow.append(joinDiv);
    addtoOnlineList(dataObj);
});
socket.on("chatLeft",function(chatObj){
    let chatDiv=document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("left");
        chatDiv.innerHTML=`<h4>${chatObj.username} :</h4><p>${chatObj.chat}</p>`;
        // chatDiv.textContent=chatInput.value;
        chatWindow.append(chatDiv);
        chatWindow.scrollTop=chatWindow.scrollHeight;
});
function deleteFromOnlinelist(id){
    document.querySelector(`#${id}`).remove();
}
function addtoOnlineList(dataObj){
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.setAttribute("id" , dataObj.id);

    userDiv.innerHTML = ` <div class="user-image">
     <img src="default1.jpg" alt="">
    </div>
     <div class="user-name">${dataObj.username}</div>`

     onlineList.append(userDiv);   
}