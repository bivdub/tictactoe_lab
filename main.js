document.addEventListener('DOMContentLoaded', function() {
//Establishes Global variables need by multiple functions
//tac is an array of the references to the gameplay squares
//if turn counter is odd it is X's turn, even O's, winningCombos i a list of all winning moves
//aiPlay toggles playing against a computer or another player
  var tac = document.querySelectorAll('.tic');
  var turn = 1;
  var winningCombos = [["#t1","#t2","#t3"], ["#t4","#t5","#t6"], ["#t7","#t8","#t9"], ["#t1","#t4","#t7"], 
  ["#t2","#t5","#t8"], ["#t3","#t6","#t9"], ["#t1","#t5","#t9"], ["#t3","#t5","#t7"]];
  var aiPlay = false;


//reset function removes gameplay classes '.X' and '.O' from gameplay squares
//resets gameplay announcement to X's turn and turn counter to X's
  var reset = function() {
    for (var i = 0; i<tac.length; i++) {
      tac[i].classList.remove('O');
      tac[i].classList.remove('X');
    }
    document.querySelector('.currentMove').innerText = "X's Move";
    turn = 1;
  }

//Next thing that would be impleted in order to make code more DRY
//Ran out of time to debug implementation

  // var oMove = function(square) {
  //     square.classList.add('O');
  //     document.querySelector('.currentMove').innerText = "X's Move";
  //     temp = 1;
  // }

//defines the AI for the computer player, order of moves is as follows
//If computer has a winning move it will play that >>
//If player has a winning move, computer will block it >>
//Computer will play the first open square from left to right, top to bottom

  var aiMove = function(temp) {
    for (var j = 0; j<8 && temp == 0; j++) {
      win1 = document.querySelector(winningCombos[j][0]);
      win2 = document.querySelector(winningCombos[j][1]);
      win3 = document.querySelector(winningCombos[j][2]);
      if (win1.classList.contains('O') && win2.classList.contains('O') && !win3.classList.contains('X')) {
        win3.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } else if (win1.classList.contains('O') && win3.classList.contains('O') && !win2.classList.contains('X')) {
        win2.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } else if (win2.classList.contains('O') && win3.classList.contains('O') && !win1.classList.contains('X')) {
        win1.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } else if (win1.classList.contains('X') && win2.classList.contains('X') && !win3.classList.contains('O')) {
        win3.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } else if (win1.classList.contains('X') && win3.classList.contains('X') && !win2.classList.contains('O')) {
        win2.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } else if (win2.classList.contains('X') && win3.classList.contains('X') && !win1.classList.contains('O')) {
        win1.classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      } 
    }    
    for (var k = 0; k<tac.length && temp == 0; k++) {
      if (tac[k].classList.contains('X') == false && tac[k].classList.contains('O') == false && temp == 0) {
        tac[k].classList.add('O');
        document.querySelector('.currentMove').innerText = "X's Move";
        temp = 1;
      }
    }
  }

//Basic Move function. Assigned to each square in the board via the initial for loop
//when square is clicked it makes sure that square hasn't already then played and then
//assigns X or O to that square via a class assignment to that square. X is always player
//controlled but if aiPlay = true, O will be sent to the aiPlay function above

  for (var i = 0; i<tac.length; i++) {
    tac[i].onclick = function () {
      if (this.classList.contains('X') == false && this.classList.contains('O') == false) {

        if (turn % 2 === 1) {
          this.classList.add('X'); 
          document.querySelector('.currentMove').innerText = "O's Move";
          turn++;
          if (aiPlay === true) {
            //to add Delay to function
            // setTimeout(function () {
            //   aiMove(0); 
            // }, 500);
          aiMove(0);
            turn++;
          }
        } else {
          this.classList.add('O');
          document.querySelector('.currentMove').innerText = "X's Move";
          turn++;
        }
        
      }
    }
  }

//function that checks for winner on each click by checking an array of the winning
//id assignments and seeing if they each possess the class X or O. If a winner is found
//an alert is sent to the screen and the board is automatically reset.
  
  document.addEventListener('click', function () {
    for (var j = 0; j<8; j++) {
      win1 = document.querySelector(winningCombos[j][0]);
      win2 = document.querySelector(winningCombos[j][1]);
      win3 = document.querySelector(winningCombos[j][2]);

      if ((win1.classList.contains('X')) && (win2.classList.contains('X')) && (win3.classList.contains('X'))) {
        alert('X wins!');
        reset();
      } else if ((win1.classList.contains('O')) && (win2.classList.contains('O')) && (win3.classList.contains('O'))) {
        alert('O wins!');
        reset();
      }
    }
  })

//function that toggles the aiPlay value between true and false based on whether
//the checkbox is clicked or not

  document.querySelector('#check').addEventListener('click', function () {
    if (this.checked === true) {
      aiPlay = true;
    } else {
      aiPlay = false;
    }
  })

//Assigns the reset function to the reset button on the DOM

  document.querySelector('#resetButton').addEventListener('click', function () {
    reset();
  })
})