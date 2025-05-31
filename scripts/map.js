  // Function to handle hover over paths with class 'business'
  function setupBusinessHover() {
    const card = document.getElementById('businessCard');
    const businessPaths = document.querySelectorAll('svg path.business');

    businessPaths.forEach(path => {
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
  fetch('svg/map.svg')
    .then(res => res.text())
    .then(svgData => {
      const container = document.getElementById('map-container');
      container.innerHTML = svgData;

      // Now setup hover after SVG is loaded
      setupBusinessHover();
    })
    .catch(err => {
      console.error('Failed to load SVG:', err);
    });
