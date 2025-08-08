
  fetch('svg/coglaGamard.svg')
    .then(res => res.text())
    .then(svgData => {
      const container = document.getElementById('coglagamsection');
      container.innerHTML = svgData;

      
    })
    .catch(err => {
      console.error('Failed to load SVG:', err);
    });
