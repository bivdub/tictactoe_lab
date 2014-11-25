$(function () {

  var turn = 1;
  var winningCombos = [["#t1","#t2","#t3"], ["#t4","#t5","#t6"], ["#t7","#t8","#t9"], ["#t1","#t4","#t7"], 
    ["#t2","#t5","#t8"], ["#t3","#t6","#t9"], ["#t1","#t5","#t9"], ["#t3","#t5","#t7"]];
  var aiPlay = false;

  var reset = function() {
    $('.tic span').removeClass('X').text("");
    $('.tic span').removeClass('O').text("");
    $('.currentMove').text("X's Move");
    turn = 1;
  }

  var oMove = function(temp) {
    $("<span>O</span>").appendTo$(temp).addClass('O').fadeTo( "slow", .99, function () {
      $('.currentMove').text("X's Move");
      turn++;
      checkWin();
    })
  }

  var aiMove = function(temp) {
    for (var j = 0; j<8 && temp ===0 ; j++) {
      if ($(winningCombos[j][0] + ":has(span)").hasClass('O') && $(winningCombos[j][1] + ":has(span)").hasClass('O') && !$(winningCombos[j][2] + ":has(span)").hasClass('X')) {
        oMove(winningCombos[j][2]);
        turn = 1;
      } else if ($(winningCombos[j][0] + ":has(span)").hasClass('O') && $(winningCombos[j][2] + ":has(span)").hasClass('O') && !$(winningCombos[j][1] + ":has(span)").hasClass('X')) {
        $(winningCombos[j][1]).addClass('O');
        $('.currentMove').text("X's Move");
        temp = 1;
      } else if ($(winningCombos[j][1] + ":has(span)").hasClass('O') && $(winningCombos[j][2] + ":has(span)").hasClass('O') && !$(winningCombos[j][0] + ":has(span)").hasClass('X')) {
        $(winningCombos[j][0]).addClass('O');
        $('.currentMove').text("X's Move");
        temp = 1;
      } else if ($(winningCombos[j][0] + ":has(span)").hasClass('X') && $(winningCombos[j][1] + ":has(span)").hasClass('X') && !$(winningCombos[j][2] + ":has(span)").hasClass('O')) {
        $(winningCombos[j][2]).addClass('O');
        $('.currentMove').text("X's Move");
        temp = 1;
      } else if ($(winningCombos[j][0] + ":has(span)").hasClass('X') && $(winningCombos[j][2] + ":has(span)").hasClass('X') && !$(winningCombos[j][1] + ":has(span)").hasClass('O')) {
        $(winningCombos[j][1]).addClass('O');
        $('.currentMove').text("X's Move");
        temp = 1;
      } else if ($(winningCombos[j][1] + ":has(span)").hasClass('X') && $(winningCombos[j][2] + ":has(span)").hasClass('X') && !$(winningCombos[j][0] + ":has(span)").hasClass('O')) {
        $(winningCombos[j][0]).addClass('O');
        $('.currentMove').text("X's Move");
        temp = 1;
      }
    }    
    for (var k = 0; k<8 && temp === 0; k++) {
      if ($('#t'+(k+1)+ ":has(span)") == false && temp == 0) {
        oMove('#t'+(k+1));

        // $('#t'+(k+1)+ " span").addClass('O');
        // $('.currentMove').text("X's Move");
        temp = 1;
      }
    }
  }


  var checkWin = function () {
    for (var j = 0; j<winningCombos.length; j++) {
      if ($(winningCombos[j][0] + " span").hasClass('X') && $(winningCombos[j][1] + " span").hasClass('X') && $(winningCombos[j][2] + " span").hasClass('X')) {
        alert('X wins!');
        reset();
      } else if ($(winningCombos[j][0] + " span").hasClass('O') && $(winningCombos[j][1] + " span").hasClass('O') && $(winningCombos[j][2] + " span").hasClass('O')) {
        alert('O wins!');
        reset();
      }
    }
  }

  var playLoop = function () {
    if ($(this).hasClass('X') == false && $(this).hasClass('O') == false) {
      var temp = 0;
      if (turn % 2 === 1 && temp === 0) {
        temp = 1;
        var element = $(this);
        console.log(this);
        $("<span>X</span>").appendTo(this).addClass('X').fadeTo( "slow", .99, function () {
          $('.currentMove').text("O's Move");
          turn++;
          checkWin();
        })
        if (aiPlay===true) {
          aiMove(0);
          turn++;
          checkWin();
        }

      } else {
        oMove(this);
        // $("<span>O</span>").appendTo(this).addClass('O').fadeTo( "slow", .99, function () {
        //   $('.currentMove').text("X's Move");
        //   turn++;
        //   checkWin();
        // })
      }
    }
  }

  $('#check').on('click', function () {
    if ($(this).is(':checked')) {
      aiPlay = true;
    } else {
      aiPlay = false;
    }
  })

  $('.tic').on('click', playLoop);
  $('#resetButton').click(reset);
})