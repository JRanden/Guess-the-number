import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc
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

  // Get collection data
  getDocs(colRef)
    .then((snapshot) => {
        let Highscores = []
        snapshot.docs.forEach((doc) => {
            Highscores.push({...doc.data(), id: doc.id})
        })
        console.log(Highscores)
    })
    .catch(err => {
        console.log(err.message)
    })

    // Addoing documents 
    const addUser = document.querySelector('.user')
    addUser.addEventListener ('submit', (e) => {
        e.preventDefault()
        list.textContent = `Level`;

        addDoc(colRef, {
            Person: addUser.name.value
        })
        .then(() => {
            addUser.reset()
        })
    })

    //-------------------------------------------------------//
    // GAME FUNCTIONS//
    let correctAnswer = Math.floor (Math.random() *100);
console.log(correctAnswer)

const input = document.querySelector('#number');
const tall = document.querySelector('#feedback');

input.addEventListener ('keydown', e=> {
    const number = input.value * 1
    if(number === correctAnswer){
    tall.textContent = 'This is the correct number, Well done!'
    }
     else if(number > correctAnswer) {
    tall.textContent ='The number you are looking for is lower'
    }
    else if(number < correctAnswer){
    tall.textContent = 'The number you are looking for is higher'
    }
});


