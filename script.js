
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 28;
  var score = 0;

  //layout of grid what is in the squares
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,5,5,5,2,2,5,5,5,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  const squares = [];

  //Legend
  //0 - pac-dot
  //1 - wall
  //2 - ghost lair
  //3 - power-pellet
  //4 - empty

  // draw grid and render it
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

  // add layout to the board
    if(layout[i]===0) {
    squares[i].classList.add("pac-dot")
    } else if(layout[i]===1) {
    squares[i].classList.add("wall")
    } else if(layout[i]===2) {
    squares[i].classList.add("ghost-lair")
    } else if(layout[i]===3) {
    squares[i].classList.add("power-pellet")
  }

    }
  }

  createBoard();

  // starting position of pacman
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man")


  // move pacman 
  function movePacman(e){
    squares[pacmanCurrentIndex].classList.remove("pac-man")

  switch(e.keyCode) {
      case 37:
        if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex-1].classList.contains("wall") && !squares[pacmanCurrentIndex-1].classList.contains("ghost-lair")) pacmanCurrentIndex -= 1;
        if(pacmanCurrentIndex===364 ) pacmanCurrentIndex+=27
        break;
      case 38:
        if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex-width].classList.contains("wall") && !squares[pacmanCurrentIndex-width].classList.contains("ghost-lair"))  pacmanCurrentIndex -= width;
        break
      case 39:    
      if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex+1].classList.contains("wall") && !squares[pacmanCurrentIndex+1].classList.contains("ghost-lair"))  pacmanCurrentIndex += 1;
      if(pacmanCurrentIndex===391 ) pacmanCurrentIndex-=27
        break
      case 40:
        if(pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex+width].classList.contains("wall")  && !squares[pacmanCurrentIndex+width].classList.contains("ghost-lair"))  pacmanCurrentIndex += width;
        break     

  }
  squares[pacmanCurrentIndex].classList.add("pac-man")

  eatPacdot();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();

  }
  document.addEventListener('keyup',movePacman)



  // what happens when pacman eats pac dot
  function eatPacdot() { 
      if(squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++;
        scoreDisplay.innerHTML=score
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
      }
    
  }

  // what happens when pacman eats power pellet

  function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
      score+=10;
      scoreDisplay.innerHTML=score;
      squares[pacmanCurrentIndex].classList.remove("power-pellet");
      ghosts.forEach((ghost)=>{ghost.isScared = true})
      setTimeout(unscaredGhosts,10000)
    }
  }

  function unscaredGhosts(){
    ghosts.forEach((ghost)=>{ghost.isScared = false})
  }

 // creating a ghost constructor
  class Ghost {
    constructor(className,startIndex,speed) {
          this.className=className
          this.startIndex=startIndex
          this.speed=speed
          this.CurrentIndex=startIndex
          this.timerId=NaN
          this.isScared=false
    }
  } 

  const ghosts = [
    new Ghost('blinky',348,200),
    new Ghost('pinky',376,200),
    new Ghost('inky',351,200),
    new Ghost('clyde',379,200)
  ]

  // rendering ghosts
  ghosts.forEach((ghost)=>{
       squares[ghost.CurrentIndex].classList.add(ghost.className)
       squares[ghost.CurrentIndex].classList.add('ghost')
  })


  // move all ghosts randomly
  ghosts.forEach((ghost)=>{moveghost(ghost)})

  // function for getting coordinates
  function getCoordinates(index) {
    return [index % width,Math.floor(index/width)];
  }

  // moving the ghosts in random direction
  function moveghost(ghost) {
   const directions = [-1,+1,+width,-width];
   let direction = directions[Math.floor(Math.random()*directions.length)];
   ghost.timerId = setInterval(()=>{  
    if(!squares[ghost.CurrentIndex+direction].classList.contains("wall") && !squares[ghost.CurrentIndex+direction].classList.contains("ghost")) {
      squares[ghost.CurrentIndex].classList.remove(ghost.className,"ghost","scared-ghost");

      var [ghostX,ghostY] = getCoordinates(ghost.CurrentIndex);
      var [pacmanX,pacmanY] = getCoordinates(pacmanCurrentIndex);
      var [ghostNewX,ghostNewY] = getCoordinates(ghost.CurrentIndex+direction);
  
      function xCoordCloser(){
        if ((Math.abs(ghostNewX - pacmanX)) < (Math.abs(ghostX - pacmanX))) {
          return true;

       } else {
           return false;
       }
      }

      function yCoordCloser(){
        if ((Math.abs(ghostNewY - pacmanY)) < (Math.abs(ghostY - pacmanY))) {
          return true;

       } else {
           return false;
       }
      }
    
      if(xCoordCloser() || yCoordCloser()) {
        ghost.CurrentIndex+=direction;
      squares[ghost.CurrentIndex].classList.add(ghost.className,"ghost");
      } else{
        squares[ghost.CurrentIndex].classList.add(ghost.className,"ghost");
        direction = directions[Math.floor(Math.random()*directions.length)];
      }
      // ghost.CurrentIndex+=direction;
      // squares[ghost.CurrentIndex].classList.add(ghost.className,"ghost");

    } else{
      direction = directions[Math.floor(Math.random()*directions.length)];
    }

    if(ghost.isScared) {
      squares[ghost.CurrentIndex].classList.add("scared-ghost");
    }
    if(ghost.isScared && squares[ghost.CurrentIndex].classList.contains("pac-man")) {
      squares[ghost.CurrentIndex].classList.remove(ghost.className,"ghost","scared-ghost");
      ghost.CurrentIndex=ghost.startIndex;
      score+=100;
      scoreDisplay.innerHTML=score;
      squares[ghost.CurrentIndex].classList.add(ghost.className,"ghost");
    }
    checkForGameOver();
   },ghost.speed)

  }

 // function for checking game over
   function checkForGameOver() {
     if(squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")){
      ghosts.forEach(ghost=>clearInterval(ghost.timerId));
      document.removeEventListener("keyup",movePacman);
      scoreDisplay.innerHTML="Game Over ! Refresh the page to restart the game"
      
     }
   }

 // function for checking win 
   function checkForWin() {
    if(score>=800){
      ghosts.forEach(ghost=>clearInterval(ghost.timerId))
      document.removeEventListener("keyup",movePacman);
      scoreDisplay.innerHTML = "You Won! Refresh the page to restart the game "
    }
   }   

  
  

