let gameStatus = false;
let digits = 5;
let lastStateButton = 5;
let target=[];
let column = -2;
let symbol = 0;
let  digitButtonOn            = 'rgb(35, 107, 70)',
     digitButtonOff           = 'rgb(184, 137, 50)',
     Background               = 'rgb(191, 191, 191)',
     menuButtonBackground     = 'rgb(54, 134, 156)',
     textAreaBackground       = 'rgb(210, 210, 210)',
     TextAreaTextColor        = 'rgb(26, 26, 26)';



// ****************************** init ***********************************************************
function init(){

document.querySelector('body').style.backgroundColor        = Background ;           // HTML background color
document.getElementById('playground').style.borderColor     = Background ;           // center background color

document.querySelector('textarea').style.backgroundColor    = textAreaBackground;           // textarea background color
document.querySelector('textarea').style.borderColor        = Background             // textarea background color
document.querySelector('textarea').style.color              = TextAreaTextColor;     // text color

document.getElementById('play').style.backgroundColor       = menuButtonBackground;   // button 'play' background color
document.getElementById('show').style.backgroundColor       = menuButtonBackground;   // button 'show background color
document.getElementById('dig').style.backgroundColor        = menuButtonBackground;    // button 'dig' background color

document.getElementById('enterb').style.backgroundColor     = menuButtonBackground;   // button 'enter' background color
document.getElementById('cancel').style.backgroundColor     = menuButtonBackground;  // button 'cancel' background color
document.getElementById('about').style.backgroundColor      = menuButtonBackground;   // button 'enter' background color

document.getElementById('play').style.color                 = TextAreaTextColor;   // button 'play' text color
document.getElementById('show').style.color                 = TextAreaTextColor;   // button 'show textcolor
document.getElementById('dig').style.color                  = TextAreaTextColor;    // button 'dig' text color

document.getElementById('enterb').style.color               = TextAreaTextColor; // button 'enter' text color
document.getElementById('cancel').style.color               = TextAreaTextColor; // button 'cancel' text color
document.getElementById('about').style.color                = TextAreaTextColor;  // button 'enter' text color

column = -2;
symbol = 0;
target.length = 0; //zeroing the entire array
document.getElementById('textbox').textContent = '-- ';

for (let i = 0; i < 10; i++){
//**************************** remark default set *********
buttonRemark[i].style.backgroundColor = digitButtonOn;    // buttons remark 'on' state background color
buttonRemark[i].value ='on';
buttonRemark[i].style.color = 'rgb(238, 238, 238)';         // buttons remark 'on' state text color
//**************************** dial default set ***********
buttonDial[i].style.backgroundColor = digitButtonOn;      // buttons dial 'on' state background color
buttonDial[i].value ='on';
buttonDial[i].style.color = 'rgb(238, 238, 238)';           // buttons dial 'on' state text color
buttonDial[i].addEventListener('click', buttonDialHandler);
}
}

//******************************* abot ***********************************************************
let abouText = "Train your brain by Zufar and Raduan for dear Vera 🙏";
about.onclick = function() {
alert(abouText)
// document.getElementById('textbox').textContent = abouText
}

//******************************* remarkButtons ****************************************************
let buttonRemark = document.querySelectorAll('.remark'); // get'remark' buttons to array
buttonRemark.forEach(btnR => {
btnR.addEventListener('click', buttonRemarkHandler)
})

function buttonRemarkHandler(e){
// alert(e.target.value);
if(gameStatus){
if(e.target.value =='on'){
    //remrk-----------------------------------------
    e.target.style.backgroundColor = digitButtonOff;
//     e.target.style.color = 'rgb(96, 96, 96)';
    e.target.value = 'off';
    //dial------------------------------------------
    document.getElementById(`d${e.target.textContent}`).removeEventListener('click', buttonDialHandler);
    document.getElementById(`d${e.target.textContent}`).style.backgroundColor = digitButtonOff;
//     document.getElementById(`d${e.target.textContent}`).style.color = 'rgb(96, 96, 96)';
    document.getElementById(`d${e.target.textContent}`).value = 'off';
}
else{
    //remrk-----------------------------------------
    e.target.style.backgroundColor = digitButtonOn;
//     e.target.style.color = 'rgb(238, 238, 238)';
    e.target.value ='on';
    //dial------------------------------------------
    document.getElementById(`d${e.target.textContent}`).addEventListener('click', buttonDialHandler);
    document.getElementById(`d${e.target.textContent}`).style.backgroundColor = digitButtonOn;
//     document.getElementById(`d${e.target.textContent}`).style.color = 'rgb(238, 238, 238)';
    document.getElementById(`d${e.target.textContent}`).value = 'on';
}
}
}

//*************************************** play *************************************
play.onclick = playStart;
function playStart(){
// alert('hello play');
init();
digits = lastStateButton;
gameStatus = true;
while (target.length != digits) {
let digit = `${Math.floor(Math.random() * 10)}`
if (target.includes(digit)) continue;
target.push(digit);
}
// target = ['1', '2', '3', '4', '5'];
}

//*************************************** show *************************************

show.onclick = shower; 
function shower(){
if(gameStatus){
gameStatus = false;
document.getElementById('textbox').textContent += '\n' + '--- ' + target.reduce((res, item) => res + item, '') + ' ---';
// target.reduce((res, item) => res + item, '').bold()
// document.write(target.reduce((res, item) => res + item, '').bold())
}
}

// ************************************ "- 5 -" ************************************
dig.onclick = function() {
if (document.getElementById('dig').textContent === '- 5 -'){
document.getElementById('dig').textContent = '- 6 -';
lastStateButton = 6;
}
else if (document.getElementById('dig').textContent === '- 6 -'){
document.getElementById('dig').textContent ='- 4 -';
lastStateButton = 4;
}
else {
document.getElementById('dig').textContent = '- 5 -';
lastStateButton = 5;
}
}

//******************************* dialButtons ****************************************************
let buttonDial = document.querySelectorAll('.dial'); // get'dial' buttons to array
buttonDial.forEach(btnD => {
btnD.addEventListener('click', buttonDialHandler)
})

function buttonDialHandler(e){
// alert(e.target.value);
if((gameStatus) && (e.target.value ==='on') && (symbol < digits)){
// document.getElementById('textbox').textContent = e.target.textContent;
let line = document.getElementById('textbox').textContent;

if(symbol > 0){
    if (line.slice(-symbol).split('').includes(e.target.textContent)){
        // alert('repeat');
        return;
    }
}
symbol +=1;
line += e.target.textContent;
document.getElementById('textbox').textContent = line;
}
}

//*************************************** enter *************************************
enterb.onclick=enter;
function enter(){
if((gameStatus) && (symbol == digits)){
// alert('hello enter');
let cut = document.getElementById('textbox').textContent.slice(-digits).split('');
// let cut = Array.from(document.getElementById('textbox').textContent.slice(-digits), String);
let k = 0;
let a = 0;
let lineNumber = '--';
// alert(cut[0]);
for (let i = 0; i < cut.length; i++){
    if((cut.includes(target[i])) && (cut[i] == target[i])){
        a++;
    }
    else if((cut.includes(target[i])) && (cut[i] != target[i])){
        k++;
    }
}

let prob = 0;
if(digits == 4){
    prob = '  - ';
}
else if(digits == 5){
    prob = ' - ';
}
else if(digits == 6){
    prob = '- ';
}

symbol = 0;
column++;

if(column > 0){
    if(column < 10){
        lineNumber = ' ' + column;
    }
    else{
        lineNumber = column;
    }            
}

if(column > 17){
    gameStatus = false;
    if(a == digits){
        document.getElementById('textbox').textContent += prob + a + '✦ : ' + k + '◼' + '\n' + '------you win!-----' + '\n' + '-- ' + target.reduce((res, item) => res + item, '') + ' --';
    }
    else{
        document.getElementById('textbox').textContent += prob + a + '✦ : ' + k + '◼' + '\n' + '----end the game---' + '\n' + '-- ' + target.reduce((res, item) => res + item, '') + ' --';
    }
}
else if(column == 1){
    if(a == digits){
        gameStatus = false;
        document.getElementById('textbox').textContent += prob + a + '◇ : ' + k + '◆' + '\n' + '------you win!-----' + '\n' + '-- ' + target.reduce((res, item) => res + item, '') + ' --';
    }
    else {
        document.getElementById('textbox').textContent += prob + a + '◇ : ' + k + '◆' + '\n' + '===================' + '\n' + lineNumber + ' ';
    }
}
else{
    if(a == digits){
        gameStatus = false;
        document.getElementById('textbox').textContent += prob + a + '◇ : ' + k + '◆' + '\n' + '------you win!-----' + '\n' + '-- ' + target.reduce((res, item) => res + item, '') + ' --';
    }
    else {
        document.getElementById('textbox').textContent += prob + a + '◇: ' + k + '◆' + '\n' + lineNumber + ' ';
    }       
}
}
}

//*************************************** cancel ************************************
cancel.onclick=canceler;
function canceler(){
if((gameStatus) && (symbol > 0)){
document.getElementById('textbox').textContent=document.getElementById('textbox').textContent.slice(0, -1);
symbol --;
}
}

init();
document.getElementById('textbox').textContent = '  Train your brain';