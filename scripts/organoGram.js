


  // Function to handle hover over paths with class 'business'
  function coglagmards(cardId,selector) {
    const card = document.getElementById(cardId);
    const elements = document.querySelectorAll(selector);
    // const card = document.getElementById('CurrentBusinessCard');
    // const elements = document.querySelectorAll('svg path.business');

    elements.forEach(path => {
      path.addEventListener('mouseenter', () => {
        card.style.display = 'block';
      }); 

      path.addEventListener('mousemove', (e) => {
        card.style.left = e.pageX + 15 + 'px';
        card.style.top = e.pageY + 15 + 'px';
      });

      path.addEventListener('mouseleave', () => {
        card.style.display = 'none';
      });
    });
  }

  // Load external SVG
  fetch('svg/TMPOrganogram.svg')
    .then(res => res.text())
    .then(svgData => {
      const container = document.getElementById('organogramContainer');
      container.innerHTML = svgData;

      // Now setup hover after SVG is loaded
      coglagmards('Country_Board_of_Directors','svg g.Country_Board_of_Directors');
      coglagmards('Regional','svg g.Regional');
      coglagmards('Central_Board_of_Directors','svg g.Central_Board_of_Directors');
      coglagmards('executive','svg g.executive');
      coglagmards('Country_CFO','svg g.Country_CFO');
      coglagmards('Country_CEO','svg g.Country_CEO');
      coglagmards('Regional_CEO','svg g.Regional_CEO');
      coglagmards('Regional_CFO','svg g.Regional_CFO');
      coglagmards('HR','svg g.HR');
      coglagmards('Chairman','svg g.Chairman');
      coglagmards('R_Executive_Committee','svg g.R_Executive_Committee');
      coglagmards('CEExecutive_Committee','svg g.CEExecutive_Committee');
      coglagmards('CE_Working_Committee','svg g.CE_Working_Committee');
      coglagmards('Re_Working_Committee','svg g.Re_Working_Committee');
      coglagmards('Co_Working_Committee','svg g.Co_Working_Committee');
      coglagmards('Re_Technical_Committee','svg g.Re_Technical_Committee');
      coglagmards('CE_Technical_Committee','svg g.CE_Technical_Committee');
      coglagmards('C_Risk_Management_Committee','svg g.C_Risk_Management_Committee');
      coglagmards('RE_Risk_Management_Committee','svg g.RE_Risk_Management_Committee');
      coglagmards('Co_Risk_Management_Committee','svg g.Co_Risk_Management_Committee');

      
    })
    .catch(err => {
      console.error('Failed to load SVG:', err);
    });
