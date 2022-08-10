var colors=["green","red","yellow","blue"];
var sequence=[];
var currentLevel=1;
var registered=false
var index=0;

$(document).one("keydown",function(){
    firstLevelStart();
  });

function buttonHandler(){
  var btnClicked=this.classList[1] //get the button clicked name

  if(index<(currentLevel-1) && btnClicked===sequence[index]){ //is it the correct button that is not the last button
    playSoundAndAnimateButton(btnClicked,$(this));
    index++;
  }
  else if(index==currentLevel-1 && btnClicked===sequence[index])
  {//is it the correct and last button
    playSoundAndAnimateButton(btnClicked,$(this));
    index=0;
    currentLevel++;//go to next level
    setTimeout(levelStart,1000); //load next level
  }
  else{ //not correct button
    gameOver();
  }
}

function playSoundAndAnimateButton(buttonName,buttonRef){
  audio=new Audio("sounds/"+buttonName+".mp3"); //play its audio
  audio.play();
  buttonRef.addClass("pressed");//animate it
  setTimeout(function(){
    buttonRef.removeClass("pressed");//animation
  },100);
}

function gameOver(){
  audio=new Audio("sounds/wrong.mp3"); //play wrong answer audio
  audio.play();
  $("body").addClass("game-over");//show game over animation
  $("h1").text("Game Over, Press Any Key to Restart"); //show game over header again
  currentLevel=1; //set level back to one
  sequence=[];//clear sequenc
  setTimeout(function(){//animation
    $(".btn").removeClass("pressed");
    $("body").removeClass("game-over");
  },100);
  if(!registered){
    registered=true;
    $(document).one("keydown",function(){//register a one time listener for restart
        firstLevelStart();
      });
  }
}

function levelStart(){
  $("h1").text("level "+currentLevel);
  var randomColorIndex=Math.floor(Math.random()*4); //choose a random index
  var color=colors[randomColorIndex]; //get its color
  var audio = new Audio("sounds/"+color+".mp3"); //play its audio
  audio.play();
  $("."+color).fadeOut(100).fadeIn(100); //animate it
  sequence.push(color);
}

function firstLevelStart(){
  sequence=[];
  index=0;
  currentLevel=1;
  $("h1").text("Level 1"); //put the level 1 as header
  var randomColorIndex=Math.floor(Math.random()*4); //choose a random index
  var color=colors[randomColorIndex]; //get its color
  var audio = new Audio("sounds/"+color+".mp3"); //play its audio
  audio.play();
  $("."+color).fadeOut(100).fadeIn(100); //animate it
  sequence.push(color);//add it to the sequence
  if(!registered){
    $(".btn").on("click",buttonHandler);
  }
  registered=false;
}
