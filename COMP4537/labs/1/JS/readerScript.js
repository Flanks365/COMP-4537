

function updateDiv() {
    setInterval(function() {

        getMsg();

        document.getElementById("timeRetrived").textContent = timeRetrive + new Date().toLocaleTimeString();


    }, 2000);
}

function getMsg(){
    let messJson = localStorage.getItem("messages");

    if(messJson !== null){

    let messages = JSON.parse(messJson);
    
    

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.id = message.index;
        messageDiv.className = 'msgDiv';

        const messageContent = document.createElement('span');
        messageContent.textContent = message.message;

        messageDiv.appendChild(messageContent);

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