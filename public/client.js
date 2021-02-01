// const a = require('prompt-sync')
const socket = io();

let textarea = document.querySelector('#textaera')
let messageArea = document.querySelector('.message_area')
let userName;

do {
    userName = prompt("please enter your name")
}while (!userName)


textarea.addEventListener('keyup',(e)=>{
    if (e.key==='Enter'){
        sendMessage(e.target.value)
    }
});


function sendMessage(message){
    let msg = {
          user:  userName,
          message:message.trim()
    }
    //append message and userName

    appendMessage(msg , 'outgoing')

    textarea.value = ""

    scrollToBottom()


    //send message to server by socket.io
    socket.emit('message',msg);
}

function appendMessage(msg ,type){
    let mainDiv =document.createElement('div');
    let className = type
    mainDiv.classList.add(className , 'message')

    markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}


//Recived message to get browser

socket.on('message',(msg)=>{
    appendMessage(msg , 'incoming');

    scrollToBottom()
}) 

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}