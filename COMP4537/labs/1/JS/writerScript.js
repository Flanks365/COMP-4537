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
                storedMessages.splice(index, 1);
                localStorage.setItem("messages", JSON.stringify(storedMessages));
                document.getElementById(index).remove();
                

            });
        });

        const editButtons = document.getElementsByClassName('edit');

        Array.from(editButtons).forEach(button => {
            button.addEventListener('click', function() {

                const index = button.dataset.index;
                const messageDiv = document.getElementById(index);
                const messageContent = messageDiv.querySelector('.message');

                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = messageContent.textContent;
                editInput.className = 'editInput';

                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.className = 'save';

                messageDiv.replaceChild(editInput, messageContent);
                messageDiv.appendChild(saveButton);

                saveButton.addEventListener('click', function() {
                    messageContent.textContent = editInput.value;
                    msg[index] = editInput.value;
                    storedMessages[index] = editInput.value;
                    localStorage.setItem("messages", JSON.stringify(storedMessages));
                    messageDiv.replaceChild(messageContent, editInput);
                    messageDiv.removeChild(saveButton);
                });

        });
        });

    }, 2000);
}

function addMsg(){
    let messJson = localStorage.getItem("messages");
    if(messJson !== null){
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

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.dataset.index = msg.indexOf(message);


        messageDiv.appendChild(editButton);

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(removeButton);
        if (!document.getElementById(msg.indexOf(message))) {
            document.getElementById('messageContainer').appendChild(messageDiv);
        }

    });
}
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = '1/index.html';
});

updateDiv();

