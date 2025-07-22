
  fetch('/svg/Contact.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('contact').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});

