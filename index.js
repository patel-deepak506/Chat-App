const express = require('express');
const app = express();
const http = require('http').createServer(app);


app.use(express.static(__dirname + '/public'))

app.get('/chat',(req,res)=>{
    res.sendfile('index.html')
});

http.listen(3000,()=>{
    console.log("server is running on port 3000");
});


const io =require ('socket.io')(http)


// socket for sending message on the browser you can access many browser

io.on('connection',(socket)=>{
    console.log('connected...');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message' , msg)
    })
})
