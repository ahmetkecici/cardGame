
let firstCard ;
let secondCard;
let hasFlippedCard = false;
let level1Cards=['fab fa-js-square','fab fa-java','fab fa-css3-alt','fab fa-react','fab fa-angular','fab fa-js-square','fab fa-java','fab fa-css3-alt','fab fa-react','fab fa-angular'];
let level2Cards=['fas fa-book','fas fa-laptop','fas fa-tv','fas fa-couch','fas fa-bed','default','far fa-clock','fas fa-phone','fas fa-book','fas fa-laptop','fas fa-tv','fas fa-couch','fas fa-bed','far fa-clock','fas fa-phone'];

let level3Cards=['fab fa-youtube','fab fa-facebook','fab fa-linkedin-in','fab fa-steam','fab fa-twitter','fab fa-blogger','fab fa-wordpress','fab fa-telegram','fab fa-whatsapp','fab fa-github','fab fa-youtube','fab fa-facebook','fab fa-linkedin-in','fab fa-steam','fab fa-twitter','fab fa-blogger','fab fa-wordpress','fab fa-telegram','fab fa-whatsapp','fab fa-github']
const theme=document.querySelector('.theme')
let level=1;
const game=document.querySelector('.game')
let nowCards=[];
let length;
let openedCards=0;
let lockDeck=false;
const form =document.querySelector('#nameForm')
const input =document.querySelector('#name-input')
let userName;
const nameArea=document.querySelector('.nameArea')
const container=document.querySelector('.container')
const rules=document.querySelector('.rules-btn')
let time=10
const timeDisplay=document.querySelector('.time')
let score=0;
const scroeDisplay=document.querySelector('.score')
let wrongChoose=0;
const gameResult=document.querySelector('.game-result')
/*
<div class="memory-card" data-framework="react">
<i class="fab fa-java"></i>
  nowCards=levelCards;

</div>
 */

// cards.forEach(card=>{
//     card.addEventListener('click',flip)

// })


form.addEventListener('submit',getName)

function getName(e){
 e.preventDefault()
if (input.value!='') {
  nameArea.style.display='none'
  userName=input.value
  rules.style.display='none'
  container.style.display='block'
startGame()
}else{
 alert('lütfen isim kısmını doldurun')
}

 
}
function flip(){
  if (lockDeck) {
    return
  }
  if (this===firstCard) {
    return
  }

  this.classList.add('open')
 
  if (this.dataset.imgName=== "default") {
    
    setTimeout(() => {
      this.classList.remove('open')
      
    }, 700);
   
    return
  }
 
   if (!hasFlippedCard) {
       hasFlippedCard=true;
       firstCard=this
   }else{
    hasFlippedCard=false;
    secondCard=this
    checkMatch()
   }

 
  
  
}
function checkMatch(){
  
  if (firstCard.dataset.imgName===secondCard.dataset.imgName) {
    disableCards()
    openedCards+=2;
  //  mySound=new sound("sad.mp3")
   // mySound.play()
   score=score+10;
   scroeDisplay.innerHTML=score
   setTimeout(() => {
    if (openedCards===length) {
     nextLevel()
       //next level çalışacak
     }
   }, 500);
   }else{
   // mySound=new sound("sa.wav")
   // mySound.play()
   wrongChoose++;
   if (wrongChoose===3) {
     score=score-10
     scroeDisplay.innerHTML=score
     wrongChoose=0
   }
  
    unflip()

   }
}
function disableCards(){
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
   firstCard.classList.add('match')
   secondCard.classList.add('match')
  
}
function unflip(){

  firstCard.classList.add("unmatched");
  secondCard.classList.add("unmatched");
  lockDeck=true
  setTimeout(() => {
    firstCard.classList.remove('open')
    secondCard.classList.remove('open')
    firstCard.classList.remove("unmatched");
    secondCard.classList.remove("unmatched");
    lockDeck=false
  }, 1200);
 
}

function startGame(){
  startLevel(level1Cards) 
  length=level1Cards.length
   theme.textContent="Programlama Teknolojileri"
   scroeDisplay.innerHTML=score
   startTimer()
}

function startLevel(levelCards){
 
 nowCards=[]
 
  
  setTimeout(() => {
    nowCards= shuffle(levelCards)
  }, 5);
setTimeout(() => {
  nowCards.forEach(x=>{
    setTimeout(() => {
      let memoryCard=document.createElement('div');
      memoryCard.className='memory-card';
      let memoryCardImage=document.createElement('i')
      memoryCardImage.className=x;
      memoryCard.appendChild(memoryCardImage);
      memoryCard.dataset.imgName=x
      game.appendChild(memoryCard)
    //  nowCards.push(memoryCard)
     memoryCard.addEventListener('click',flip)
    }, 5);
     
})
}, 10);


}

function nextLevel(){
  
  game.childNodes.forEach(c=>{
   
    setTimeout(() => {
      game.removeChild(c)
     }, 100);

  })
 

   openedCards=0;
  level++;
 
  setTimeout(() => {
      if (level===2) {
        startLevel(level2Cards)
        length=level2Cards.length-1;
        theme.textContent="Ev Eşyaları"
      }else if (level===3) {
        startLevel(level3Cards)
        length=level3Cards.length;
        theme.textContent="Popüler siteler"
      }else{
        finishGame(true)
      }

  }, 1500);
}


function sound(src) {

  this.sound = document.createElement("audio");

  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");

  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
};

var interval;
function startTimer(){
 
  interval=setInterval(() => {
   
    time=time-1;
    let minute=parseInt(time/60);
    let second=(time-minute*60)
    second=second>=10?second:'0'+second
  timeDisplay.innerHTML='0'+minute+':'+second
  if (time==0) {
   
  finishGame(true)
  }
  }, 1000);
}


function finishGame(isWinner){
  container.style.display='none'
  const resultHead=document.querySelector('.result-head')
  gameResult.style.display='block';

 clearInterval(interval)
   if (isWinner==true) {
     gameResult.classList.add('bg-success')
       resultHead.innerHTML="Tebrikler kazandın "+ userName+" Skorun:"+score
          mySound=new sound("sad.mp3")
   mySound.play()
   }else{
    resultHead.innerHTML="Malesef kaybettin üzülme bidehaki sefere "+ userName+" <br>Skorun:"+score
     //  mySound=new sound("sa.wav")
   // mySound.play()
   }
}