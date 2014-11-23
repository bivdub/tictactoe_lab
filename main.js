document.addEventListener('DOMContentLoaded', function() {

  var tac = document.querySelectorAll('.tic');
  var turn = 1;
  var winningCombos = [["#t1","#t2","#t3"], ["#t4","#t5","#t6"], ["#t7","#t8","#t9"], ["#t1","#t4","#t7"], 
  ["#t2","#t5","#t8"], ["#t3","#t6","#t9"], ["#t1","#t5","#t9"], ["#t3","#t5","#t7"]];

  var xArray = [];
  var oArray = [];

  var reset = function() {
    for (var i = 0; i<tac.length; i++) {
      tac[i].classList.remove('O');
      tac[i].classList.remove('X');
      tac[i].style.backgroundImage = null;   
    }
    document.querySelector('.currentMove').innerText = "Cat's Move";
    turn = 1;
  }

  for (var i = 0; i<tac.length; i++) {
    tac[i].onclick = function () {
      if (this.classList.contains('X') == false && this.classList.contains('O') == false) {

        if (turn % 2 === 1) {
          this.style.backgroundImage="url(http://placekitten.com/g/80/75)";
          this.classList.add('X'); 
          document.querySelector('.currentMove').innerText = "Cage's Move";
        } else {
          this.style.backgroundImage="url(http://placecage.com/c/80/75)";
          this.classList.add('O');
          document.querySelector('.currentMove').innerText = "Cat's Move";
        }
        turn++; 
      }
    }
  }
  
  document.addEventListener('click', function () {
    for (var j = 0; j<8; j++) {
      win1 = document.querySelector(winningCombos[j][0]);
      win2 = document.querySelector(winningCombos[j][1]);
      win3 = document.querySelector(winningCombos[j][2]);

      if ((win1.classList.contains('X')) && (win2.classList.contains('X')) && (win3.classList.contains('X'))) {
        alert('Cats wins!');
        reset();
      } else if ((win1.classList.contains('O')) && (win2.classList.contains('O')) && (win3.classList.contains('O'))) {
        alert('Cage wins!');
        reset();
      }
    }
  })

  document.querySelector('#resetButton').addEventListener('click', function () {
    reset();
  })
})