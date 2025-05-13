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
// const card = document.getElementById('hoverCard');
//   const introElements = document.querySelectorAll('g.introduction');

//   introElements.forEach(g => {
//     g.addEventListener('mouseenter', (e) => {
//       card.style.display = 'block';
//     });

//     g.addEventListener('mousemove', (e) => {
//       card.style.left = e.pageX + 15 + 'px';
//       card.style.top = e.pageY + 15 + 'px';
//     });

//     g.addEventListener('mouseleave', () => {
//       card.style.display = 'none';
//     });
//   });
  //===================================================== about Us Hover orangecard=========
  // const orangeCard = document.getElementById('orange');
  // const orangeElements = document.querySelectorAll('g.orange');

  // orangeElements.forEach(g => {
  //   g.addEventListener('mouseenter', (e) => {
  //     orangeCard.style.display = 'block';
  //   });

  //   g.addEventListener('mousemove', (e) => {
  //     orangeCard.style.left = e.pageX + 15 + 'px';
  //     orangeCard.style.top = e.pageY + 15 + 'px';
  //   });

  //   g.addEventListener('mouseleave', () => {
  //     orangeCard.style.display = 'none';
  //   });
  // });
  // =====================================About us green Section====================================
  // const greenCard = document.getElementById('green');
  // const greenElements = document.querySelectorAll('g.green');

  // greenElements.forEach(g => {
  //   g.addEventListener('mouseenter', (e) => {
  //     greenCard.style.display = 'block';
  //   });

  //   g.addEventListener('mousemove', (e) => {
  //     greenCard.style.left = e.pageX + 15 + 'px';
  //     greenCard.style.top = e.pageY + 15 + 'px';
  //   });

  //   g.addEventListener('mouseleave', () => {
  //     greenCard.style.display = 'none';
  //   });
  // });
  // ================================yellow section================================================
  // const yellowCard = document.getElementById('yellow');
  // const yellowElements = document.querySelectorAll('g.yellow');

  // yellowElements.forEach(g => {
  //   g.addEventListener('mouseenter', (e) => {
  //     yellowCard.style.display = 'block';
  //   });

  //   g.addEventListener('mousemove', (e) => {
  //     yellowCard.style.left = e.pageX + 15 + 'px';
  //     yellowCard.style.top = e.pageY + 15 + 'px';
  //   });

  //   g.addEventListener('mouseleave', () => {
  //     yellowCard.style.display = 'none';
  //   });
  // });
// =================in a single function ============================================================
function handleHover(cardId, selector) {
  const card = document.getElementById(cardId);
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      card.style.display = 'block';
    });

    el.addEventListener('mousemove', (e) => {
      card.style.left = e.pageX + 15 + 'px';
      card.style.top = e.pageY + 15 + 'px';
    });

    el.addEventListener('mouseleave', () => {
      card.style.display = 'none';
    });
  });
}

// Call the function for each card and selector pair
handleHover('hoverCard', 'g.introduction');
handleHover('orange', 'g.orange');
handleHover('green', 'g.green');
handleHover('yellow', 'g.yellow');


  // =============================contact Us =======================================================
  fetch('svg/Contact_Us_final.svg')
.then(response => response.text())
.then(data => {
    
    document.getElementById('contact').innerHTML = data;
    
})
.catch(error => {
    console.error('SVG load korte problem hoise:', error);
});