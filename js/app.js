console.log("app.js is alive");
$(function(){
  console.log("so is jQuery");
  //====================================================
  //                 GRAB ELEMENT
  //====================================================
  //Grab the spaces
  var $spaces = $('.space');
  var $button = $('.button');
  var $player1ControlledSpaces = $('.player1');
  var $player2ControlledSpaces = $('.player2');
  var counter = 0;
  var $player1Score = $('.player1').length;
  var $player2Score = $('.player2').length;


  // add controlled amount to player1
  player1.$numberOfControlledSpaces = $player1ControlledSpaces.length;

  // add controlled amount to player2
  player2.$numberOfControlledSpaces = $player2ControlledSpaces.length;


  //====================================================
  //                EVENT HANDLER
  //====================================================

  var eventHandler = {
    resetSpace() {
      console.log('HERE BE DRAGONS!!!');
      game.resetting();
    },
    newSpace() {
      console.log('BEGINNING OF NEWSPACE<><><><><><><><><><><><>');
      $(this).addClass('new-space');
      clickedNumber2 = $(this).index();
      clickedText2= $(this).text();
      console.log('#2: ' + clickedNumber2);
      game.attackPhase();
      eventHandler.resetSpace();
      console.log('END OF NEWSPACE<><><><><><><><><><><><>');
    },

// we will talk later.

    // triggerClickedSpace : function(){
    //   for (var i = 0; i < 16; i++) {
    //     if (parseInt($('#space-' + i).text()) < 1)  {
    //       $('#space-' + i).off();
    //       console.log('NOT CLICKABLE DUH=======================');
    //     } else {
    //       $('#space-' + i).on('click', eventHandler.clickedSpace);
    //       console.log('clickable duh =======================');
    //     }
    //   }
    //   eventHandler.clickedSpace();
    // },
    clickedSpace() {
      console.log('BEGINNING OF CLICKEDSPACE<><><><><><><><><><><><>');









      //******This Section finds the index of the 4 surrounding spaces.
      var thisLocation = $(this).index();
      // console.log(thisLocation + ' here');
      var upLocation = thisLocation-4;
      // console.log(upLocation + ' up');
      var rightLocation = thisLocation+1;
      // console.log(rightLocation + ' right');
      var downLocation = thisLocation+4;
      // console.log(downLocation + ' down');
      var leftLocation = thisLocation-1;
      // console.log(leftLocation + ' left');









      //******This section creates Vars that will add the Class with the border to the possible options
      var addBorderUp = function(){
        $('#space-' + upLocation).not($('.' + game.currentPlayer)).addClass('new-space');
      };
      var addBorderRight = function(){
        $('#space-' + rightLocation).not($('.' + game.currentPlayer)).addClass('new-space');
      };
      var addBorderDown =function(){
        $('#space-' + downLocation).not($('.' + game.currentPlayer)).addClass('new-space');
      };
      var addBorderLeft =function(){
        $('#space-' + leftLocation).not($('.' + game.currentPlayer)).addClass('new-space');
      };

      console.log($(this));
      //This statement fixes the side from looking at the far sides of the grid.
      // var thatThing = parseInt($(this).text())

      if (parseInt($(this).text()) >= 2) {
        console.log('ok');
        console.log(typeof $(this).text());

        if (thisLocation === 3) {
          addBorderDown();
          addBorderLeft();
        } else if (thisLocation === 4 || thisLocation === 8) {
          addBorderDown();
          addBorderUp();
          addBorderRight();
        } else if (thisLocation === 7 || thisLocation === 11) {
          addBorderUp();
          addBorderLeft();
          addBorderDown();
        } else if (thisLocation === 12) {
          addBorderUp();
          addBorderRight();
        } else {
          addBorderUp();
          addBorderRight();
          addBorderDown();
          addBorderLeft();
        }
        $(this).addClass('clicked-space');
      } else {
        // $('#space-' + thisLocation).off();
        // $('#space-' + rightLocation).off();
        // $('#space-' + downLocation).off();
        // $('#space-' + leftLocation).off();
        alert('You do not have enough soldiers here to attack. Please pick another island or end the phase.');
        // game.resetting(); //clears everything
      }

      // $(this).addClass('clicked-space');
      $('.space').off(); //removed button from all spaces
      $(this).on('click', eventHandler.resetSpace); //clears everything
      // console.log('classAdded');
      clickedNumber1 = thisLocation;
      clickedText1 = $(this).text();


      $('#space-' + upLocation).not($('.' + game.currentPlayer)).on('click', eventHandler.newSpace);
      $('#space-' + rightLocation).not($('.' + game.currentPlayer)).on('click', eventHandler.newSpace);
      $('#space-' + downLocation).not($('.' + game.currentPlayer)).on('click', eventHandler.newSpace);
      $('#space-' + leftLocation).not($('.' + game.currentPlayer)).on('click', eventHandler.newSpace);

      console.log(clickedText1);//text in div
      console.log('#1: ' + clickedNumber1);//index #
      console.log('END OF CLICKEDSPACE<><><><><><><><><><><><>');
    },
    $currentId : $(this).attr('id'),
  };
  test = eventHandler.clickedSpace;
  //====================================================
  //                EVENT LISTENER
  //====================================================

  var testing = function(){
    console.log('BEGINNING OF TESTING<><><><><><><><><><><><>');
    var $player1Score = $('.player1').length;
    var $player2Score = $('.player2').length;
    $('.scores').html('<p>Player 1\'s points: ' + $player1Score + '</p> <p>Player 2\'s points: ' + $player2Score + '</p>');
    $('.rules').html('<h3>Attack Phase</h3><p>By selecting any of your spaces that have at least 2 points in it, you can attack any space touching yours horizontally or vertically. Repeat until you have no more possible moves.  When done, press \'End Phase\' to continue.</p>');

    // $('.phase').text('Attack Phase');
    if (toggle === true) {
      game.currentPlayer = 'player1';
      otherPlayer = 'player2';
      $('.turns').html('<p>Player 1\'s turn</p><p class="phase">Attacking Phase</p>').css({'box-shadow':'inset 0 0 0 10px slategrey'});
      console.log(game.currentPlayer);
    }else{
      game.currentPlayer = 'player2';
      otherPlayer = 'player1';
      $('.turns').html('<p>Player 2\'s turn</p><p class="phase"><p>Attacking Phase</p>').css({'box-shadow':'inset 0 0 0 10px #673131'});
      console.log(game.currentPlayer);
    }
    // console.log(parseInt($('.'+game.currentPlayer).text()));
    // if (parseInt($('.'+game.currentPlayer).text()) > 1) {
    //
    //
    //   console.log('IS CLICKABLE ' +parseInt( $('.'+game.currentPlayer).text()));
      $('.'+game.currentPlayer).on('click', eventHandler.clickedSpace);




    // }
    // else {
    //   console.log('ISN\'T CLICKABLE' + $('.'+game.currentPlayer).text());
    //   $('.'+game.currentPlayer).unbind('click', eventHandler.clickedSpace);
    // }
    console.log('END OF TESTING<><><><><><><><><><><><>');
  };

  $button.on('click', eventHandler.clickedButton);

  begin = testing;
  clickedSpace = eventHandler.clickedSpace;
  testing();
}); //End of Window onload**************************


/////////////Objects
var clickedSpace;
var clickedNumber1 = -1;
var clickedNumber2 = -1;
var clickedText1 = '';
var clickedText2 = '';
var newSoldiers = 0;
var otherPlayer;
var test;
var testing;
var begin;
var toggle = true;


var player1 = {
  name:'',
  playerColor:'',
  $numberOfControlledSpaces:$('.player1').length,
  numberOfSoldiers:2,
  currnetlyContolledSpaces:[]
};

var player2 = {
  name:'',
  playerColor:'',
  $numberOfControlledSpaces:$('.player2').length,
  numberOfSoldiers:2,
  currnetlyContolledSpaces:[]
};

var game = {
  currentPlayer:'player1',
  // currentPlayerString:
  gameRound:0,
  currentPhase:'Attaack',


  checkForWinner: function(){
    console.log('CHECKING FOR WINNER');
    player1.$numberOfControlledSpaces = $('.player1').length;
    player1.$numberOfControlledSpaces = $('.player1').length;
    //if all boxes are one color or the other.
    if (player1.$numberOfControlledSpaces == 16){
      alert('Congratulations ' + player1.name + "!!  You have won the game!");
    } else if (player2.$numberOfControlledSpaces == 16){
      alert('Congratulations ' + player2.name + "!!  You have won the game!");
    } else {
      console.log('NO WINNER YET');
      return;
    }
  },


  resetting: function(){
    $('.space').removeClass('clicked-space').removeClass('new-space');
    console.log('clicked-space and new-space classRemoved');
    $('.space').off('click');
    clickedNumber1 = '';
    clickedNumber2 = '';
    $('.' + game.currentPlayer).on('click',clickedSpace);
  },


  claimLand: function(){
    console.log("CLAIMING LAND");
    clickedText2 = Math.ceil(clickedText1 /2);
    // console.log(clickedText2);
    clickedText1 = clickedText1 - clickedText2; // winning space is now split among the 2 spaces
    // console.log(clickedText1);
    console.log('currentPlayer = '+game.currentPlayer);
    $('#space-' + clickedNumber2).removeClass(otherPlayer).addClass(game.currentPlayer);
    $('#space-' + clickedNumber1).html('<h2>'+clickedText1+'</h2>');
    $('#space-' + clickedNumber2).html('<h2>'+clickedText2+'</h2>');
    console.log('end of attack phase');
    $('.clicked-space').off('click');
    $('.new-space').off('click');
    console.log('claimLand>>>resetting');
  },


  attackPhase: function(){
    // console.log('Starting Attack Phase');
    $('.button').off();
    $('.button').on('click', game.hirePhase);
    if (clickedText2 === 0 ) {
      this.claimLand();
    } else{
      // console.log(clickedText2 + "this is the second clicked");
      game.rollOfDice();
    }
    game.resetting();
  },


  rollOfDice: function(){
    // console.log("Beginning dice roll");
    var attackerTotal = 0;
    var defenderTotal = 0;
    // $('.button').on('click',game.hirePhase)
    var sixSidedDie = function(){
      return Math.ceil(Math.random() * 6);
    };
    for (var i = 0; i < parseInt(clickedText1); i++) {
      attackerTotal = attackerTotal + sixSidedDie();
      // console.log('doing the attack roll');
    }
    // console.log("Attacker Roll " +parseInt(attackerTotal));
    for (var j = 0; j < parseInt(clickedText2); j++) {
      defenderTotal = defenderTotal + sixSidedDie();
    }
    // console.log('Defender Roll ' + defenderTotal);
    if (attackerTotal > defenderTotal) {
      // console.log('Attacker Wins');
      game.claimLand();
    }else {
      $('#space-' + clickedNumber1).html('<h2>'+1+'</h2>');
    }
    // console.log('defender wins');
  },////Running to my specifications!!!


  endOfRound: function(){
    // console.log('END OF ROUND  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    $('.new-space').removeClass('new-space');
    $('.clicked-space').removeClass('clicked-space');

    // console.log(clickedText1);
    // console.log('#1: ' + clickedNumber1);
    if (toggle === true) {
      toggle = false;
      // console.log('true >> false');
    } else {
      toggle = true;
      // console.log('false >> true');
    }
    // console.log("Toggle = " + toggle);
    begin();
  },



  hirePhase: function(){
    game.checkForWinner();

    $(".button").animate({left: '250px'});
    //Comes from attackPhase
    $('.turns').html('<p>' + game.currentPlayer +'\'s turn</p><p class="phase"><p>Rebuild Phase</p>');
    var curentPlayerClass = '.' + game.currentPlayer;
    console.log('.' + game.currentPlayer);
    console.log(game.currentPlayer + " HERE!!!!!!!!!!!!!!!!!!!!!!!");
    // Calculate the number of spaces currently owned.

    $(curentPlayerClass).addClass('new-space');
    console.log(player2.$numberOfControlledSpaces);

    if (game.currentPlayer === 'player1') {
      player1.$numberOfControlledSpaces = $('.' + game.currentPlayer).length;
      newSoldiers = player1.$numberOfControlledSpaces;
      console.log('player1 gets to hire now');

    } else {
      console.log(player2.$numberOfControlledSpaces + ' = else statement');
      console.log($('.' + game.currentPlayer).length + ' = currentPlayer length');
      player2.$numberOfControlledSpaces = ($('.' + game.currentPlayer).length);
      console.log($('.' + game.currentPlayer).length);
      newSoldiers = player2.$numberOfControlledSpaces;
      console.log('player2 gets to hire now');
    }

    $('.rules').html('<h3>Rebuild Phase</h3><p>You gain 1 new pirate per space that you own. Add these mateys to any of your spaces. </p> <h3> You have ' + newSoldiers + ' seadogs available.</h3>');

    console.log("new Soldiers = " + newSoldiers);

    var $currentPlayer = $('.'+ game.currentPlayer);
    // $('.new-space').removeClass('new-space');
    $('.clicked-space').removeClass('clicked-space');
    $('.space').off('click');
    $('.button').off('click');
    console.log(game.currentPlayer + " IS HIRING");
    $currentPlayer.on('click',function(){
      if(newSoldiers>0){
        $(this).html('<h2>' + (parseInt($(this).text())+1) + '</h2>');
        newSoldiers--;
        console.log("new Soldiers = " + newSoldiers);
            $('.rules').html('<h3>Rebuild Phase</h3><p>You gain 1 new pirate per space that you own. Add these mateys to any of your spaces. </p> <h3> You have ' + newSoldiers + ' seadogs available.</h3>');
      }
    });
    console.log("END OF HIRING");
    $('.button').on('click', game.endOfRound);
  },
};
