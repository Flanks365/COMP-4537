
//the writer class will contain the array and methods to add, remove, and edit messages
// also will contain methods to store in the local storage and pull from the local storage as well

class Writer{
    msg;
    total_size;
    local_store;

    constructor(){
        this.msg = [];
        this.total_size = 0;
        this.local_store = [];
    }

    addMsg(message){

        if(!this.msg.some(stored => stored.index === message.index)){

            this.msg.push(message);
            this.total_size++;

        }

    }

    removeMsg(index){

        this.msg.splice(index, 1);
        this.local_store.splice(index, 1);

        this.total_size--;
    }

    editMsg(index, message){
        this.msg[index] = message;
        this.local_store[index] = message
        this.store_local();
    }

    getMsg_s(){
        return this.local_store;
    }

    retrieve_local(){
        let local_s = localStorage.getItem("messages");
        this.local_store = JSON.parse(local_s);

        if(this.local_store !== null){

           this.msg.forEach(message => {
                if(!this.local_store.some(stored => stored.index === message.index)){
                    this.local_store.push(message);
                }
            }
           )
        } else {
            this.local_store = [];
        }
    }

    store_local(){
        localStorage.setItem("messages", JSON.stringify(this.msg));
    }

    get_total_size(){
        return this.total_size;
    }

    total_size_up(){
        this.total_size++;
    }

}


// I have a message class that will be used to create
// message objects that will be stored in the array
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

let writer = new Writer();

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
        
        //creates an object of the message
        let newMessage = new Message(messageText, writer.get_total_size());

        writer.total_size_up();

        writer.addMsg(newMessage);
       
        
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

        writer.retrieve_local();

        writer.store_local();

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
                writer.removeMsg(index);

                // overwrites the local storage with the updated array
                writer.store_local();

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
                    writer.editMsg(index, newMess);

                    // overwrites the local storage with the updated array
                    writer.store_local();

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
    let messJson = writer.getMsg_s();

    // if the storage returns nothing don't do anything
    if(messJson !== null){
    

    // for each message in the local storage
    messJson.forEach(message => {
        
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

