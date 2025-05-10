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

fetch('/ABOUT_US_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('us').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});