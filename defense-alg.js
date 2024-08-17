export function analyseGuess(guess, target) {

// let guessDigits = [7,2,3,1];

// let target = [6,5,2,1];

let rocks = 0;
let diamonds = 0;

guess.forEach((numb, index) => {
    if (target.includes(numb)) {
        
        if (target.indexOf(numb) == index) {
            diamonds+=1
            rocks-=1
        }
        rocks+=1
    }
})

return `${diamonds} ✦ : ${rocks} ◇`

}
