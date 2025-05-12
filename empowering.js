// fetching empowering progresss:
fetch('svg/Empowering_Progress_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('empowering').innerHTML = data;
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});



// ==========================================================================
// fetching menu wheel
fetch('svg/ninesectionmenu.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('menu-wheel').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});
// =========================================================================

fetch('svg/map.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('map-container').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});
// ===================== about Us Hover Card introduction section===========================
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
  //===================================================== about Us Hover Card introduction section=========
  const orangeCard = document.getElementById('orange');
  const orangeElements = document.querySelectorAll('g.orangeColor');

  orangeElements.forEach(g => {
    g.addEventListener('mouseenter', (e) => {
      orangeCard.style.display = 'block';
    });

    g.addEventListener('mousemove', (e) => {
      orangeCard.style.left = e.pageX + 15 + 'px';
      orangeCard.style.top = e.pageY + 15 + 'px';
    });

    g.addEventListener('mouseleave', () => {
      orangeCard.style.display = 'none';
    });
  });