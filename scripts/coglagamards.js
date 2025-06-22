


  // Function to handle hover over paths with class 'business'
  // function coglagmards(cardId,selector) {
  //   const card = document.getElementById(cardId);
  //   const elements = document.querySelectorAll(selector);

  //   elements.forEach(path => {
  //     path.addEventListener('mouseenter', () => {
  //       card.style.display = 'block';
  //     }); 

  //     path.addEventListener('mousemove', (e) => {
  //       card.style.left = e.pageX + 15 + 'px';
  //       card.style.top = e.pageY + 15 + 'px';
  //     });

  //     path.addEventListener('mouseleave', () => {
  //       card.style.display = 'none';
  //     });
  //   });
  // }

  // Load external SVG
  fetch('svg/coglaGamardsfinal.svg')
    .then(res => res.text())
    .then(svgData => {
      const container = document.getElementById('coglagamsection');
      container.innerHTML = svgData;

      // Now setup hover after SVG is loaded
    //   coglagmards('Country_Board_of_Directors','svg g.Country_Board_of_Directors');

      
    })
    .catch(err => {
      console.error('Failed to load SVG:', err);
    });
