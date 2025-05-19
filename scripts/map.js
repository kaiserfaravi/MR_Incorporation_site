// ============================map===========================================================
fetch('svg/map.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('map-container').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});