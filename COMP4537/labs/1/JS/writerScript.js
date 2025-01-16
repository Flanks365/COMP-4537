let msg = [];

let total_size = 0;

// For this Lab I deemed that 1 class was all
// that I will require for this lab
// as my buttons are based on the messages index 
// and the message just needs to contain its index
// and its message
// and creating a class for an index seems redundant

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

// Gpt used for QA purposes

// when add button is pressed the text box is displayed
document.getElementById('addButton').addEventListener('click', function() {
    document.getElementById('messageInput').style.display = 'block';
});

//when the submit message is pressed the message will go through the below process
document.getElementById('submitMessage').addEventListener('click', function() {

    // grabs the value in the box
    const messageText = document.getElementById('messageText').value;

    // checks if it is all whitespace if it is don't execute the code
    if (messageText.trim() !== '') {

        // creates a new div to hold the message
        const newMessageDiv = document.createElement('div');

        // makes the content the input from the above text box
        newMessageDiv.textContent = messageText;
        
        //creates an object of the message
        let newMessage = new Message(messageText, msg.length);

        // adds it to the array of objects
        msg.push(newMessage);
        
        // resets the text box and hides it.
        document.getElementById('messageText').value = '';
        document.getElementById('messageInput').style.display = 'none';

    }
});

/**
 * the main function container for 
 * the constantly executing code
 * which is just called updateDiv (could be a better name)
 * but this includes logic like removal and adding (could be placed in smaller functions)
 */
function updateDiv() {

    // sets a 2 second interval so every 2 seconds execute the code
    setInterval(function() {

        // grabs the stored messages from local storage
        // if the storage returns nothing or null make an empty array
        let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

        // check the current array in the session storage
        // if any discrepencies are found add them to the stored messages
        msg.forEach(message => {

            // .some will return true if any of the elements pass
            // not if all pass but if atleast one pass
            // so if the index exists in some way it will return true
            // which means it doesn't have to be added.
            if (!storedMessages.some(stored => stored.index === message.index)) {
                storedMessages.push(message);
            }
        });

        // after checking the stored messages array
        // overwrite the local storage with the updated array
        localStorage.setItem("messages", JSON.stringify(storedMessages));

        addMsg();

        // every 2 seconds update the time the messages were saved
        document.getElementById("timeSaved").textContent = timeSaved + new Date().toLocaleTimeString();

        // grabs all the remove buttons returns a collection
        const removeButtons = document.getElementsByClassName('remove');

        // turns the collection into an array and for each button
        Array.from(removeButtons).forEach(button => {

            // adds an event Listener to each button
            button.addEventListener('click', function() {

                // grabs the index that was stored in the button
                // through a field called dataset (which was meant for further meta data)
                const index = button.dataset.index;

                // removes the index that was stored in the array in 
                // both the localstorage array and session storage
                msg.splice(index, 1);
                storedMessages.splice(index, 1);

                // overwrites the local storage with the updated array
                localStorage.setItem("messages", JSON.stringify(storedMessages));

                // gets rid of the div that matches the index
                document.getElementById(index).remove();
                

            });
        });

        // grabs all the edit buttons (returns a collection)
        const editButtons = document.getElementsByClassName('edit');

        // creates an array from the collection
        // and for each button add an event listener
        Array.from(editButtons).forEach(button => {

            button.addEventListener('click', function() {
                
                // grabs the index that was attached to the said button
                // through the meta data field dataset
                const index = button.dataset.index;

                // grabs the div that contains the message
                // that matches the index
                const messageDiv = document.getElementById(index);

                // grabs the content of the message
                const messageContent = messageDiv.querySelector('.message');

                // creates an input field
                const editInput = document.createElement('input');

                // what type of input field
                editInput.type = 'text';
                // sets the value of the input field to the content of the message
                editInput.value = messageContent.textContent;

                // sets the class name of the input field
                editInput.className = 'editInput';

                // creates a save button
                const saveButton = document.createElement('button');

                // sets the text of the button
                saveButton.textContent = 'Save';

                // sets the class name of the button
                saveButton.className = 'save';

                // replaces the content of the message with the input field
                messageDiv.replaceChild(editInput, messageContent);

                // adds the save button to the div
                messageDiv.appendChild(saveButton);

                // adds an event listener to the save button
                saveButton.addEventListener('click', function() {

                    // sets the content of the message to the value of the input field
                    messageContent.textContent = editInput.value;
                    
                    // creates a new message object with the new content
                    let newMess = new Message(editInput.value, index);

                    // replaces the old message with the new message
                    // in both session storage and local storage
                    msg[index] = newMess;
                    storedMessages[index] = newMess;

                    // overwrites the local storage with the updated array
                    localStorage.setItem("messages", JSON.stringify(storedMessages));

                    // replaces the input field with the content of the message
                    messageDiv.replaceChild(messageContent, editInput);
                    
                    // remove the input field
                    messageDiv.removeChild(saveButton);

                });

        });
        });

    }, 2000);
}

// This function will execute every 2 seconds if there 
// are any new messages that need to be added to the 
// main message container and to the local storage 
// this function will execute
function addMsg(){

    // grabs the stored messages from local storage
    let messJson = localStorage.getItem("messages");

    // if the storage returns nothing don't do anything
    if(messJson !== null){

    // parses the json string into an array of objects
    // these objects will not have the same methods as the class
    // in the script so they follow key value pairs rules
    // so the names message and index will be used as keys
    let messages = JSON.parse(messJson);
    

    // for each message in the local storage
    messages.forEach(message => {
        
        //create a div
        const messageDiv = document.createElement('Div');

        // set the id of the div to the index of the message
        messageDiv.id = message.index;

        // set the class name of the div for css
        messageDiv.className = 'msgDiv';

        // creates a div to hold the message

        const messageContent = document.createElement('div');
        messageContent.className = 'message';
        messageContent.textContent = message.message;

        // creates a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';

        // the index will match the index of the message
        removeButton.dataset.index = message.index;

        // creates an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';

        // the metadata will store the index of the message
        editButton.dataset.index = message.index;


        // add all the children to the div
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(editButton);
        messageDiv.appendChild(removeButton);

        // if the div doesn't exist add it to the message container
        if (!document.getElementById(message.index)) {
            document.getElementById('messageContainer').appendChild(messageDiv);
        }

    });
}
}

// returns to the index page
document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

// executes the script on page load
updateDiv();

