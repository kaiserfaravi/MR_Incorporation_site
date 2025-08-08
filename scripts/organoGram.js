// Function to handle hover over paths with class 'business'
function organogram(cardId, selector) {
  const card = document.getElementById(cardId);
  const elements = document.querySelectorAll(selector);
  // const card = document.getElementById('CurrentBusinessCard');
  // const elements = document.querySelectorAll('svg path.business');

  elements.forEach((path) => {
    path.addEventListener("mouseenter", () => {
      card.style.display = "block";
    });

    path.addEventListener("mousemove", (e) => {
      card.style.left = e.pageX + 15 + "px";
      card.style.top = e.pageY + 15 + "px";
    });

    path.addEventListener("mouseleave", () => {
      card.style.display = "none";
    });
  });
}

// Load external SVG
fetch("/svg/Organogram.svg")
  .then((res) => res.text())
  .then((svgData) => {
    const container = document.getElementById("organogramContainer");
    container.innerHTML = svgData;

    // Now setup hover after SVG is loaded
    organogram(
      "Country_Board_of_Directors",
      "svg g.Country_Board_of_Directors"
    );
    organogram("Regional", "svg g.Regional");
    organogram(
      "Central_Board_of_Directors",
      "svg g.Central_Board_of_Directors"
    );
    organogram("executive", "svg g.executive");
    organogram("Country_CFO", "svg g.Country_CFO");
    organogram("Country_CEO", "svg g.Country_CEO");
    organogram("Regional_CEO", "svg g.Regional_CEO");
    organogram("Regional_CFO", "svg g.Regional_CFO");
    organogram("HR", "svg g.HR");
    organogram("Chairman", "svg g.Chairman");
    organogram("R_Executive_Committee", "svg g.R_Executive_Committee");
    organogram("CEExecutive_Committee", "svg g.CEExecutive_Committee");
    organogram("CE_Working_Committee", "svg g.CE_Working_Committee");
    organogram("Re_Working_Committee", "svg g.Re_Working_Committee");
    organogram("Co_Working_Committee", "svg g.Co_Working_Committee");
    organogram("Re_Technical_Committee", "svg g.Re_Technical_Committee");
    organogram("CE_Technical_Committee", "svg g.CE_Technical_Committee");
    organogram(
      "C_Risk_Management_Committee",
      "svg g.C_Risk_Management_Committee"
    );
    organogram(
      "RE_Risk_Management_Committee",
      "svg g.RE_Risk_Management_Committee"
    );
    organogram(
      "Co_Risk_Management_Committee",
      "svg g.Co_Risk_Management_Committee"
    );
    organogram("RA", "svg g.RA");
    organogram("Rmarketing", "svg g.Rmarketing");
    organogram("Cmarketing", "svg g.Cmarketing");
    organogram("md", "svg g.md");
    organogram("tre", "svg g.tre");
    organogram("C_Executive_Committee", "svg g.C_Executive_Committee");
    organogram("tax", "svg g.tax");
    organogram("Equity", "svg g.Equity");
     organogram("chairman", "svg g.chairman");
  })
  .catch((err) => {
    console.error("Failed to load SVG:", err);
  });
