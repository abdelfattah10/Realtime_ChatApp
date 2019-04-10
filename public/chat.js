
var socket = io.connect('http://localhost:3000');


var  message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      error = document.getElementById('error');

// Emit events
btn.addEventListener('click', ()=>{
  if((handle.value && message.value != '')){
  socket.emit('chat',{
    handle:handle.value,
    message:message.value
  });
  message.value = '';
}else{
 error.style.border = '1px red solid';
  setTimeout(()=>{
    error.style.border = 'none';
  },200);
}
});

message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
})

message.addEventListener('keyup',()=>{
    socket.emit('keyup');
})

// Listen when event happens
socket.on('chat',(data)=>{
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('keyup',()=>{
  setTimeout(()=>{
    feedback.innerHTML = '';
  },1200);
})
