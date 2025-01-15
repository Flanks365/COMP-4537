

function updateDiv() {
    setInterval(function() {

        getMsg();

        document.getElementById("timeRetrived").textContent = timeRetrive + new Date().toLocaleTimeString();


    }, 2000);
}

function getMsg(){
    let messJson = localStorage.getItem("messages");
    let messages = JSON.parse(messJson);
    let index = 0;
    

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.id = index;
        messageDiv.className = 'msgDiv';

        const messageContent = document.createElement('span');
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        if (!document.getElementById(index)) {
            document.getElementById('messageContainer').appendChild(messageDiv);
        }
        index++;
    });
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = '1/index.html';
});

updateDiv();