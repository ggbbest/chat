// const socket = io('http://localhost:3001')
const socket = io('https://talk.c4ei.net')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  // const name = prompt('What is your name?');
  let _letter = jsfnLetter();
  const name = _letter + "" + Math.floor(Math.random() * 1000000);
  socket.emit('new-user', roomName, name)
  appendMessage('You joined')

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  // messageContainer.scrollTop = messageContainer.scrollHeight;
  window.scrollTo(0,document.body.scrollHeight);
}

function jsfnLetter() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let _letter = alphabet[Math.floor(Math.random() * alphabet.length)]
	return _letter;
}

// function jsfn_scrollBtm() {
//   messageContainer.scrollTop(messageContainer[0].scrollHeight);
// }