 fetch('svg/organogramfinal.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('organogramContainer').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});