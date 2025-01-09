
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

// generates a random hex colour
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
        console.log(i);
        let id = new Idbox(i);
        let color = new colorBox(generateColour());
        boxes.push(new Box(id, color, id));
        
    }

    // adjusts the stylings of the button/divs that will be put on screen
    // according to the objects
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

    game()


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
                button.disabled = true; // remove click event
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
                    button.disabled = false; // Re add click event
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

                    button.textContent = button.id;
                    currentNumber++;

                    if (currentNumber > buttons.length) {

                        buttons.forEach(btn => btn.remove());
                        document.getElementById("button").style.display = "block";

                        currentNumber = 1;
                        winnerMsg();
                        boxes.length = 0;
                    }
                } else {

                    buttons.forEach(btn => btn.textContent = btn.id);

                    setTimeout(() => {

                        buttons.forEach(btn => btn.remove());
                        
                        document.getElementById("button").style.display = "block";
                    
                        currentNumber = 1;
                        loserMsg();
                        boxes.length = 0;

                    }, 1000 * input);

                    function loserMsg(){
                        const wrongMsgDiv = document.getElementById("wrongMsg");
                        
                        
                        const loser = document.createElement("div");
                        loser.textContent = losermsg;
                        loser.style.color = "red";
                        loser.style.fontSize = "3em";
                        
                        wrongMsgDiv.appendChild(loser);
                        }

                        
                        function winnerMsg(){
                        
                        const wrongMsgDiv = document.getElementById("wrongMsg");
                        
                        
                        const winner = document.createElement("div");
                        winner.textContent = winnermsg;
                        winner.style.color = "green";
                        winner.style.fontSize = "3em";
                        
                        wrongMsgDiv.appendChild(winner);
                        
                        }
                        
                
                }
            });
        });

    }, input * 1000);

    
    
}
