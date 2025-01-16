
// has a relation ship with id
// and color
class Box{

    constructor(value,color, id){
        this.value = value;
        this.color = color;
        this.id = id;
    }

    getValue(){
        return this.value;
    }

    getColor(){
        return this.color;
    }

    getid(){
        return this.id;
    }
}

class Idbox{
    constructor(id){
        this.id = id;
    }

    getid(){
        return this.id;
    }
}

class colorBox{
    constructor(color){
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}

let boxes = [];

// chatgpt was used to fix logic errors
// and for finding certain bugs

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("buttonGo");
    button.addEventListener("click", createBoxes);
});

// generates a random hex colour to be used for the boxes
function generateColour(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

// creates the boxes and buttons
function createBoxes(){
    const input = document.getElementById("boxs").value;

    if(input > 7 || input < 3 || isNaN(input)){
        wrongMsg();
        return;
    }

    document.getElementById("button").style.display = "none";

    

    // makes the boxes / buttons
    for(let i = 1; i <= input; i++){
        
        let id = new Idbox(i);

        let color = new colorBox(generateColour());

        boxes.push(new Box(id, color, id));
        
    }

    // adjusts the stylings of the button/divs that will be put on screen
    // according to the objects
    // and places all the boxes on screen
    for(let i = 0; i < boxes.length; i++){

        const button = document.createElement("button");
        button.style.height = "5em";
        button.style.width = "10em";
        button.style.backgroundColor = `#${boxes[i].getColor().getColor()}`;
        button.textContent = `${boxes[i].getValue().getid()}`;
        button.id = boxes[i].getid().getid();
        document.getElementById("boxes").appendChild(button);

    }

    // checks if the wrong message is displayed
    // then removes it
    const wrongMsgDiv = document.getElementById("wrongMsg");
    if (wrongMsgDiv.hasChildNodes()) {
        while (wrongMsgDiv.firstChild) {
            wrongMsgDiv.removeChild(wrongMsgDiv.firstChild);
        }
    }

    // executes the game
    game()


    // displays the wrong message
    // put in same scope as createBoxes
    // so it can be used in the createBoxes
    function wrongMsg(){
        const wrongMsgDiv = document.getElementById("wrongMsg");
    
        const wrong = document.createElement("div");
        wrong.textContent = warning;
        wrong.style.color = "red";
        wrong.style.fontSize = "3em";
    
        wrongMsgDiv.appendChild(wrong);
    }

};

window.createBoxes = createBoxes;



// plays the actual game
function game(){

    const input = document.getElementById("boxs").value;

    document.getElementById("button").style.display = "none";

    // sets a timeout where the boxes will be displayed
    // and then the buttons will be moved
    setTimeout(() => {

        document.getElementById("boxes").style.display = "block";

        const buttons = document.querySelectorAll("#boxes button");

        let moveCount = 0;

        // chat gpt used here for randomization logic
        function moveButtons() {
            buttons.forEach(button => {
                button.style.position = "absolute";
                button.style.top = `${Math.random() * 80}vh`;
                button.style.left = `${Math.random() * 80}vw`;
                button.textContent = "";
                button.disabled = true; // turns off buttons for moving
            });
        }


        // sets an interval where it will move all the buttons
        // and delay this action 2 seconds once moved to the 
        // amount of boxes stop the interval

        const moveInterval = setInterval(() => {
            moveButtons();
            moveCount++;
            if (moveCount >= input) {
                buttons.forEach(button => {
                    button.disabled = false; // Turns the buttons back on
                });
                clearInterval(moveInterval);
            }
        }, 2000);
    
        let currentNumber = 1;
    
        // for each created button
        // add an event where if a button
        // is selected correctly then display the value
        // and increment the next number needed
        // else remove all buttons and display the start button
        // and the lost message
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (parseInt(button.id) === currentNumber) {

                    // grabs the ID which represents the number
                    // places it in the button for viewing
                    button.textContent = button.id;

                    // increments the number needed
                    // because its ascending numerical order
                    currentNumber++;

                    // unused check for if the array is smaller then current Number
                    // was going to be used for a loss case
                    if (currentNumber > buttons.length) {

                        buttons.forEach(btn => btn.remove());
                        document.getElementById("button").style.display = "block";

                        currentNumber = 1;
                        winnerMsg();
                        boxes.length = 0;

                        // displays the winner message
                        // put in same scope as createBoxes
                        function winnerMsg(){
                        
                            const wrongMsgDiv = document.getElementById("wrongMsg");
                            
                            // creates the message dynamically
                            const winner = document.createElement("div");
                            winner.textContent = winnermsg;
                            winner.style.color = "green";
                            winner.style.fontSize = "3em";
                            
                            wrongMsgDiv.appendChild(winner);
                            
                            }
                    }

                } else {

                    // grabs all the buttons currently on screen
                    buttons.forEach(btn => btn.textContent = btn.id);

                    // sets a timout for how long they can see the buttons
                    setTimeout(() => {

                        // removes all the buttons
                        buttons.forEach(btn => btn.remove());
                        
                        // displays the original starting box and button
                        document.getElementById("button").style.display = "block";
                    
                        // resets variables and displays the loser message
                        currentNumber = 1;
                        loserMsg();
                        boxes.length = 0;

                    }, 1000 * input);

                    // loser message in same scope as the above timeout so it 
                    // be accessed in the timeout
                    function loserMsg(){
                        const wrongMsgDiv = document.getElementById("wrongMsg");
                        
                        
                        const loser = document.createElement("div");
                        loser.textContent = losermsg;
                        loser.style.color = "red";
                        loser.style.fontSize = "3em";
                        
                        wrongMsgDiv.appendChild(loser);
                        }

                        
                
                }
            });
        });

    }, input * 1000);

    
    
}
