// fetching empowering progresss:
fetch('Empowering_Progress_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('empowering').innerHTML = data;
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});



// ==========================================================================
// fetching menu wheel
fetch('ninesectionmenu.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('menu-wheel').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});
// =========================================================================

fetch("/Contact Us.svg")
.then(res=>res.text())
.then(data=>{
    document.getElementById('AboutDetail').innerHTML =data;
})
.catch(error=>{
    console.log("error pawa gese svg",error);
})