
// ******************************* обработчик кнопки менъю "- 5 -" ******************************** 
dig.onclick = function() {
   if (document.getElementById('dig').textContent === '- 5 -'){
        document.getElementById('dig').textContent = '- 6 -';
   }
   else if (document.getElementById('dig').textContent === '- 6 -'){
        document.getElementById('dig').textContent ='- 4 -';
   }
    else {
        document.getElementById('dig').textContent = '- 5 -';
    }
}

//******************************* abot ***********************************************************
let abouText = 'Train your brain by Zufar and Raduan';
about.onclick = function() {
     // alert('hi')
     document.getElementById('textbox').textContent = abouText;

}

// *****************************