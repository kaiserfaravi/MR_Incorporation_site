fetch('/svg/ABOUT_US_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('about-container').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});

const card = document.getElementById('hoverCard');
  const introElements = document.querySelectorAll('g.introduction');

  introElements.forEach(g => {
    g.addEventListener('mouseenter', (e) => {
      card.style.display = 'block';
    });

    g.addEventListener('mousemove', (e) => {
      card.style.left = e.pageX + 15 + 'px';
      card.style.top = e.pageY + 15 + 'px';
    });

    g.addEventListener('mouseleave', () => {
      card.style.display = 'none';
    });
  });