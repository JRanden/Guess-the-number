import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, doc, query, where, orderBy
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyALaih0gMsHL_p_C5zr9HCQrPUKbcfiZi8",
    authDomain: "guess-the-number-88fe9.firebaseapp.com",
    projectId: "guess-the-number-88fe9",
    storageBucket: "guess-the-number-88fe9.appspot.com",
    messagingSenderId: "799338469935",
    appId: "1:799338469935:web:7af94b74045a1fff51c4da",
    measurementId: "G-BP2WSJBX14"
  };

  // init firbase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collection ref
  const colRef = collection(db,'Highscores')


  // queries
  const q = query(colRef, orderBy('Score', 'asc'))

  // Get real time collection data
onSnapshot(q,(snapshot) => {
    let highscores =[]
    snapshot.docs.forEach((doc) => {
        highscores.push({...doc.data(), id: doc.id})
    })
   
    removeList()
    createList(highscores)
    console.log(highscores)
})

//add documents tar verdien fra navn inputen og sender det inn også fjerner navne feltet og 
const addUser = document.querySelector('.user')
addUser.addEventListener ('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        Person: addUser.name.value
    })

    gameField.classList.remove("hidden")
    nameField.classList.add("hidden")
})



    let correctAnswer = Math.floor (Math.random() *100);
    console.log(correctAnswer)
    
    let count = 0
    let score;
    
    const input = document.querySelector('#number');
    const tall = document.querySelector('#feedback');
    const gameField = document.querySelector('.game')
    const nameField = document.querySelector('.user')
    const scoreboard = document.querySelector('#highscorelist')
    const scoreboardlength = 10
    
    


input.addEventListener ('keyup', e=> {
    if (e.key == "Enter") {
    const number = input.value * 1
    if(number === correctAnswer){
    tall.textContent = 'This is the correct number, Well done!'
    stopTimer()
    addScore()
    addDoc(colRef, {
        Person: addUser.name.value,
        Score: count
    })

    }
     else if(number > correctAnswer) {
    tall.textContent ='The number you are looking for is lower'
    startTimer()
    addScore()
    }
    else if(number < correctAnswer){
    tall.textContent = 'The number you are looking for is higher'
    startTimer()
    addScore()
}


}
});

function counter() {
    count++;
    
    console.log(count)
    }
    
    function addScore(){
        count +=10
    }
    
    function startTimer() {
        score = setInterval(counter,100);
        
    }
    
    function stopTimer(){
        clearInterval(score)
    }
counter()


function  createList (par1) {
    for (let i = 0; i < par1.length && i < scoreboardlength; i++) {

        const li = document.createElement('li')
        li.textContent =`${i+1}. Name : ${par1[i].Person} Score : ${par1[i].Score}`;
        li.classList.add("scorelistli")

        scoreboard.append(li)

        
    }
}

function removeList (){
    const removeElement = document.querySelectorAll('.scorelistli');

    removeElement.forEach(element => {
        element.remove();
    })
}

