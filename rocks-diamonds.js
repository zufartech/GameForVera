import {analyseGuess} from "./defense-alg.js"
// console.log(analyseGuess([4,3,2,1], [1,2,3,4]))
let ground = document.getElementById('playground')
let attempts = 1; // -2


//right side
let dialButtons = document.getElementsByClassName('dial')
dialButtons = Array.from(dialButtons)

function genInput() { 
    let tempInput = document.getElementById('in');
    tempInput.value += this.textContent
}

dialButtons.forEach(el => {
    el.addEventListener('click', genInput)
    
})

//left side
let remarkButtons = document.getElementsByClassName('remark')

remarkButtons = Array.from(remarkButtons)
remarkButtons.forEach(el => {
    el.addEventListener('click', () => {
        changeColor(el)
    })
})

function changeColor(el){
    //body.style.backgroundColor = toggle ? "white" : "yellow";
    
    if (window.getComputedStyle(el).backgroundColor == 'rgb(62, 62, 62)') {
    
        el.style.backgroundColor = 'green';
    }
    else if (window.getComputedStyle(el).backgroundColor == 'rgb(0, 128, 0)') {
        el.style.backgroundColor = 'red';
        document.getElementById(`d${el.textContent}`).removeEventListener('click', genInput)
        document.getElementById(`d${el.textContent}`).style.backgroundColor = 'rgba(62, 62, 62, 0.3)'
    }
    else {
        el.style.backgroundColor = 'rgb(62, 62, 62)';
        document.getElementById(`d${el.textContent}`).addEventListener('click', genInput)
        document.getElementById(`d${el.textContent}`).style.backgroundColor = 'rgb(62, 62, 62)'
    }
}


// generate target
let target=[]
while (target.length != 4) {
    let digit = `${Math.floor(Math.random() * 10)}`
    if (target.includes(digit)) continue;
    target.push(digit)
}
console.log(...target)

let enterButton = document.getElementById('enter')
let guess;
let result;

enterButton.addEventListener('click', () => {
    let row = document.getElementById('row')
    let tempInput = document.getElementById('in')
    guess = tempInput.value
    result = analyseGuess(guess.split(''), target)
    row.innerHTML = `
                <span class='output'>${attempts} ${guess}</span>
                <span class='output'> - </span>
            <span class='output'>${result}</span>
            `
    row.removeAttribute('id')
    ground.innerHTML += `
                <div id="row">
                <input type="text" id="in">
            </div>`
    attempts++
})


// show the generated number
let showButton = document.getElementById('show')
showButton.addEventListener('click', () => {
    alert(`The number was: ${target.join(' ')}`)
})


// Problem: I needed to pass an eventhandler with paramenters(the element intself). Without calling the eventhandler, I had to implement closure. But when removing the eventlistener, I could not refer to inner function, out of the scope. I had to not pass parameters, amd use keyword 'this', for this case it worked. Otherwise, imbed paramenters into attributes, and access them by this - i think.