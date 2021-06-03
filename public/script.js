
let chatInput=document.querySelector(".chat-input");
let chatWindow=document.querySelector(".chat-window");
let userNamediv=document.querySelector(".user-name");
let sendDiv=document.querySelector(".send");
let username="";
do{
username=prompt("Enter Your Chat Name:");
}while(username=="");

userNamediv.textContent=username;
chatInput.addEventListener("keypress",function(e){
    if(e.key=="Enter" && chatInput.value){
        console.log("here");
        let chatDiv=document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
       
        chatDiv.innerHTML=`<h4>${username} :</h4><p>${chatInput.value}</p>`;
        // chatDiv.textContent=chatInput.value;
        chatWindow.append(chatDiv);
        socket.emit("chat",{username:username,chat:chatInput.value});
        chatInput.value="";
        chatWindow.scrollTop=chatWindow.scrollHeight;
    }

});

sendDiv.addEventListener("click",function(){
    if(chatInput.value){
        console.log("here");
        let chatDiv=document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.innerHTML=`<h4>${username} :</h4><p>${chatInput.value}</p>`;
        // chatDiv.textContent=chatInput.value;
        chatWindow.append(chatDiv);
        socket.emit("chat",{username:username,chat:chatInput.value});
        chatInput.value="";
        chatWindow.scrollTop=chatWindow.scrollHeight;
    }

});

