
// Gpt used for QA purposes


/**
 * similar to the writer script all this does is update the 
 * message container every 2 seconds and includes updating the
 * user to when the messages are received
 */
function updateDiv() {

    // sets a 2 second interval (so executes the code every 2 seconds)
    setInterval(function() {

        // grabs the messages from local storage
        getMsg();

        // updates the time retrieved to the user
        document.getElementById("timeRetrived").textContent = timeRetrive + new Date().toLocaleTimeString();


    }, 2000);
}

/**
 * main code  that will execute every 2 seconds
 * grabs the array of objects from the local storage
 * parses it, then updates the div with the messages
 */
function getMsg(){

    // grabs the messages from local storage
    let messJson = localStorage.getItem("messages");

    // if null do nothing
    if(messJson !== null){

    // parses the json string into an array of objects
    let messages = JSON.parse(messJson);
    
    // for each message in the local storage
    messages.forEach(message => {

        // create a div that holds the index the message was at
        const messageDiv = document.createElement('div');
        messageDiv.id = message.index;
        messageDiv.className = 'msgDiv';

        // create a span that holds the message
        const messageContent = document.createElement('span');
        messageContent.textContent = message.message;

        //adds it to the message container
        messageDiv.appendChild(messageContent);

        // if the main container already contains the message 
        // don't add it again
        if (!document.getElementById(message.index)) {

            document.getElementById('messageContainer').appendChild(messageDiv);

        }

    });
}
}

document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

//executes on load
updateDiv();