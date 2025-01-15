let msg = [];


document.getElementById('addButton').addEventListener('click', function() {
    document.getElementById('messageInput').style.display = 'block';
});

document.getElementById('submitMessage').addEventListener('click', function() {
    const messageText = document.getElementById('messageText').value;
    if (messageText.trim() !== '') {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.textContent = messageText;
        msg.push(messageText);
        document.getElementById('messageText').value = '';
        document.getElementById('messageInput').style.display = 'none';

    }
});


function updateDiv() {
    setInterval(function() {

        let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

        msg.forEach(message => {
            if (!storedMessages.includes(message)) {
                storedMessages.push(message);
            }
        });

        localStorage.setItem("messages", JSON.stringify(storedMessages));

        addMsg();

        document.getElementById("timeSaved").textContent = new Date().toLocaleTimeString();

        const removeButtons = document.getElementsByClassName('remove');

        Array.from(removeButtons).forEach(button => {
            button.addEventListener('click', function() {

                const index = button.dataset.index;
                msg.splice(index, 1);
                document.getElementById(index).remove();

            });
        });

    }, 2000);
}

function addMsg(){
    let messJson = localStorage.getItem("messages");
    let messages = JSON.parse(messJson);
    

    messages.forEach(message => {
        const messageDiv = document.createElement('Div');
        messageDiv.id = msg.indexOf(message);
        messageDiv.className = 'msgDiv';

        const messageContent = document.createElement('div');
        messageContent.className = 'message';
        messageContent.textContent = message;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.dataset.index = msg.indexOf(message);


        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(removeButton);
        if (!document.getElementById(msg.indexOf(message))) {
            document.getElementById('messageContainer').appendChild(messageDiv);
        }
    });
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

updateDiv();

