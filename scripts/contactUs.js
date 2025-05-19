  // =============================contact Us =======================================================
  fetch('svg/Contact_Us_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('contact').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});