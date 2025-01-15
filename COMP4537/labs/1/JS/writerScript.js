let msg = [];

let total_size = 0;

class Message {
    constructor(message, index){
        this.message = message;
        this.index = index;
    }

    getMessage() {
        return this.message;
    }

    getindex() {
        return this.index;
    }

}

class indexs{
    constructor(index){
        this.index = index;
    }

    getindex(){
        return this.index;
    }
}


document.getElementById('addButton').addEventListener('click', function() {
    document.getElementById('messageInput').style.display = 'block';
});


document.getElementById('submitMessage').addEventListener('click', function() {
    const messageText = document.getElementById('messageText').value;

    if (messageText.trim() !== '') {

        const newMessageDiv = document.createElement('div');

        newMessageDiv.textContent = messageText;
        let newMessage = new Message(messageText, msg.length);

        msg.push(newMessage);
        
        document.getElementById('messageText').value = '';
        document.getElementById('messageInput').style.display = 'none';

    }
});


function updateDiv() {
    setInterval(function() {

        let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

        msg.forEach(message => {
            if (!storedMessages.some(stored => stored.index === message.index)) {
                storedMessages.push(message);
            }
        });

        localStorage.setItem("messages", JSON.stringify(storedMessages));

        addMsg();

        document.getElementById("timeSaved").textContent = timeSaved + new Date().toLocaleTimeString();

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
                    
                    let newMess = new Message(editInput.value, index);

                    msg[index] = newMess;
                    storedMessages[index] = newMess;

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
        messageDiv.id = message.index;
        messageDiv.className = 'msgDiv';

        const messageContent = document.createElement('div');
        messageContent.className = 'message';
        messageContent.textContent = message.message;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.dataset.index = message.index;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.dataset.index = message.index;


        messageDiv.appendChild(editButton);

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(removeButton);

        
        if (!document.getElementById(message.index)) {
            document.getElementById('messageContainer').appendChild(messageDiv);
        }

    });
}
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

updateDiv();

