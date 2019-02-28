const dogArray = ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg", "dog6.jpg", "dog7.jpg", "dog8.jpg", "dog9.jpg", "dog10.jpg", "dog11.jpg", "dog12.jpg"];
let firstCard = null;
let secondCard = null;
let counter = 0;
let moves = 0;
let moveDisplay = document.getElementById('moves');
let resetButton = document.getElementById('reset');
let time = setInterval(countTimer, 1000);
let totalSeconds = 0;
let winning = false;

window.onload = function() {
  initializeCards(dogArray);
  let card = document.querySelectorAll(".card");
  card.forEach(function(card) {
    card.addEventListener('click', handleClicks);
})
}
  resetButton.addEventListener('click', function() {
    document.location.reload()
  })

  function handleClicks(e) {
    if (!firstCard&&!secondCard) { 
      console.log(firstCard);
       firstCard = e.currentTarget;
       firstCard.removeEventListener('click', handleClicks);
       console.log('first card', firstCard);
       flip(e.currentTarget);
    } else if (!secondCard) {
       moves++;
       moveDisplay.innerHTML = moves.toString().padStart(4, "0");
       if (e.currentTarget === firstCard) {return}
       secondCard = e.currentTarget;
       console.log('second card', secondCard);
       flip(e.currentTarget);
       checkForMatch(e.currentTarget);
    }
  }

   function checkForMatch(item) {
       if (firstCard.innerHTML === secondCard.innerHTML) {
        console.log('match!');
          firstCard.removeEventListener('click', handleClicks);
          secondCard.removeEventListener('click', handleClicks);
          firstCard = null;
          secondCard = null;
          counter++;
          console.log('counter', counter);
          if (counter === 12) {
            win();
          }
       } else {
        firstCard.addEventListener('click', handleClicks);
        secondCard.addEventListener('click', handleClicks);
         setTimeout(function() {
          flip(firstCard);
          flip(secondCard);
          firstCard = null;
          secondCard = null; }, 1200);
       }
  } 
    

function initializeCards(arr) {
	let randArray1 = arr
  		.map((a) => ({sort: Math.random(), value: a}))
  		.sort((a, b) => a.sort - b.sort)
  		.map((a) => a.value);
  	let randArray2 = arr
  		.map((a) => ({sort: Math.random(), value: a}))
  		.sort((a, b) => a.sort - b.sort)
  		.map((a) => a.value);
    let randArrayTemp = randArray1.concat(randArray2);
    let randArray = randArrayTemp
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    console.log(randArray);
  	let place = [];
  	let istr = "";
  	for (let i=0; i<dogArray.length*2; i++) {
  		/* place[i] = document.getElementsByClassName("front")[i].getElementsByTagName("img")[0].getAttribute('src');
  		console.log(i, place[i]); */
      document.getElementsByClassName("front")[i].getElementsByTagName("img")[0].src = randArray[i];
  	}
}

function flip(image) {
	image.classList.toggle('flip');
}

function win() {
  let dogGrid = document.querySelector(".dogGrid");
  winning = true;
  dogGrid.style.transition="opacity 2s ease-in-out";
  dogGrid.style.opacity="0";
  setTimeout(function() {
      dogGrid.style.display="block";
      dogGrid.style.backgroundImage="url('d5.jpg')";
      dogGrid.style.backgroundSize = "cover";
      dogGrid.innerHTML= "<p class='jumbo'>You are a ROCK STAR!</p>";
      dogGrid.style.opacity = "1";
  }, 2000);
}

function countTimer() {
  if (!winning) {
   ++totalSeconds;
   let hour = Math.floor(totalSeconds /3600);
   let minute = Math.floor((totalSeconds - hour*3600)/60);
   let seconds = totalSeconds - (hour*3600 + minute*60);
   document.getElementById("time").innerHTML = hour.toString().padStart(1, "0") + ":" + minute.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  }
}