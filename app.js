//get all front end tags
const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.getElementById('guess-btn');
const guessInput = document.getElementById('guess-input');
const message = document.querySelector('.message');


let min = 1, max = 10, winningNum = getRandomNum(max, min), guessesLeft = 3;

//assign min and max to front end
minNum.textContent = min;
maxNum.textContent = max;

//play gain listener
game.addEventListener('mousedown', function (e){

    if(e.target.className === 'play-again')
        window.location.reload();
    
})

//list for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    let rightValue = true;

    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        rightValue = false;
    }

    if(guess === winningNum && rightValue === true)
        gameOver(true, `${winningNum} is correct YOU WIN!`);
    
    else if(rightValue) 
    {
        guessesLeft--;

        if(guessesLeft === 0)
            gameOver(false, `GAME OVER. Correct number was ${winningNum}`)
        else
        {
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, 'red');
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
        }
    }
});

function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}

function gameOver(won, msg){
    let color;

    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}