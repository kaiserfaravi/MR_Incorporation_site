// fetching menu wheel
fetch('svg/ninesectionmenu.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('menu-wheel').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});

// fetch('svg/Menuwheel.svg')
// .then(response => response.text())
// .then(data => {
    
//     document.getElementById('menu-wheel').innerHTML = data;
    
// })
// .catch(error => {
//     console.error('SVG load korte problem hoise:', error);
// });