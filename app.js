let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turnO = true;  //PlayerX, PlayerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    totalMoves = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

let totalMoves=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        totalMoves++;
        // if(totalMoves === 9){
            
        // }
        if(turnO){
            box.innerText = "O";
            box.style.color = "#149028";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        checkWinner(totalMoves);
    });
});

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""; 
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner, totalMoves) => {
    totalMoves = 0;
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); 
}

const drawGame = (totalMoves) => {
    totalMoves = 0;
    msg.innerText = `Game draw`;
    msgContainer.classList.remove("hide");
    disableBoxes(); 
    return;
}

const checkWinner = (totalMoves) => {
    // console.log(totalMoves);
    if(totalMoves === 9){
        // console.log("Draw");
        drawGame(totalMoves);
    }
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]); 
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val, totalMoves);
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);