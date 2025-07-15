fetch('/svg/History_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('historyContainer').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});