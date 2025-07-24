//   fetch('/svg/Contact.svg')
// .then(response => response.text())
// .then(data => {

//     document.getElementById('contact').innerHTML = data;

// })
// .catch(error => {
//     console.error('SVG load korte problem hoise:', error);
// });

class CaptchaSystem {
  constructor() {
    this.captchas = [
      // { type: 'math', data: { question: '৮ + ৫ = ?', answer: '13' } },
      // { type: 'math', data: { question: '১২ - ৭ = ?', answer: '5' } },
      // { type: 'math', data: { question: '৬ × ৩ = ?', answer: '18' } },
      // { type: 'math', data: { question: '২০ ÷ ৪ = ?', answer: '5' } },
      // { type: 'math', data: { question: '১৫ + ৯ = ?', answer: '24' } },
      // { type: 'color', data: { question: 'লাল রঙটি নির্বাচন করুন', answer: 'red' } },
      // { type: 'color', data: { question: 'নীল রঙটি নির্বাচন করুন', answer: 'blue' } },
      // { type: 'color', data: { question: 'সবুজ রঙটি নির্বাচন করুন', answer: 'green' } },
      // { type: 'pattern', data: { question: 'বৃত্ত আকৃতি নির্বাচন করুন', answer: '●' } },
      // { type: 'pattern', data: { question: 'তারা আকৃতি নির্বাচন করুন', answer: '★' } },
      // { type: 'pattern', data: { question: 'হৃদয় আকৃতি নির্বাচন করুন', answer: '♥' } },
      // { type: 'image', data: { question: 'গাছের ইমোজি নির্বাচন করুন', answer: '🌳' } },
      // { type: 'image', data: { question: 'সূর্যের ইমোজি নির্বাচন করুন', answer: '☀️' } },
      // { type: 'image', data: { question: 'চাঁদের ইমোজি নির্বাচন করুন', answer: '🌙' } },
      // { type: 'slider', data: { question: 'স্লাইডারটি ৭৫ এ সেট করুন', answer: 75 } },
      // { type: 'slider', data: { question: 'স্লাইডারটি ৫০ এ সেট করুন', answer: 50 } },
      // { type: 'sequence', data: { question: '২, ৪, ৬, ?', answer: '8' } },
      // { type: 'sequence', data: { question: '১, ৩, ৫, ?', answer: '7' } },
      // { type: 'text', data: { question: '"CAPTCHA" শব্দটি টাইপ করুন', answer: 'CAPTCHA' } },
      // { type: 'text', data: { question: '"বাংলা" শব্দটি টাইপ করুন', answer: 'বাংলা' } }

      { type: "math", data: { question: "8 + 5 = ?", answer: "13" } },
      { type: "math", data: { question: "12 - 7 = ?", answer: "5" } },
      { type: "math", data: { question: "6 × 3 = ?", answer: "18" } },
      { type: "math", data: { question: "20 ÷ 4 = ?", answer: "5" } },
      { type: "math", data: { question: "15 + 9 = ?", answer: "24" } },
      {
        type: "color",
        data: { question: "Select the red color", answer: "red" },
      },
      {
        type: "color",
        data: { question: "Select the blue color", answer: "blue" },
      },
      {
        type: "color",
        data: { question: "Select the green color", answer: "green" },
      },
      {
        type: "pattern",
        data: { question: "Select the circle shape", answer: "●" },
      },
      {
        type: "pattern",
        data: { question: "Select the star shape", answer: "★" },
      },
      {
        type: "pattern",
        data: { question: "Select the heart shape", answer: "♥" },
      },
      {
        type: "image",
        data: { question: "Select the tree emoji", answer: "🌳" },
      },
      {
        type: "image",
        data: { question: "Select the sun emoji", answer: "☀️" },
      },
      {
        type: "image",
        data: { question: "Select the moon emoji", answer: "🌙" },
      },
      {
        type: "slider",
        data: { question: "Set the slider to 75", answer: 75 },
      },
      {
        type: "slider",
        data: { question: "Set the slider to 50", answer: 50 },
      },
      { type: "sequence", data: { question: "2, 4, 6, ?", answer: "8" } },
      { type: "sequence", data: { question: "1, 3, 5, ?", answer: "7" } },
      {
        type: "text",
        data: { question: 'Type the word "CAPTCHA"', answer: "CAPTCHA" },
      },
      {
        type: "text",
        data: { question: 'Type the word "Bangla"', answer: "Bangla" },
      },
    ];

    this.currentStep = 0;
    this.selectedCaptchas = [];
    this.currentAnswer = null;
    this.usedCaptchas = [];

    this.init();
  }

  init() {
    document.getElementById("emailLink").addEventListener("click", (e) => {
      e.preventDefault();
      this.startCaptcha();
    });
    document.getElementById("emailLink2").addEventListener("click", (e) => {
      e.preventDefault();
      this.startCaptcha();
    });
    document.getElementById("emailLink3").addEventListener("click", (e) => {
      e.preventDefault();
      this.startCaptcha();
    });

    document.getElementById("submitBtn").addEventListener("click", () => {
      this.submitCaptcha();
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
      this.closeCaptcha();
    });
  }

  getRandomCaptchas() {
    const availableCaptchas = this.captchas.filter(
      (captcha) => !this.usedCaptchas.includes(captcha)
    );

    if (availableCaptchas.length < 2) {
      this.usedCaptchas = [];
      return this.getRandomCaptchas();
    }

    const shuffled = [...availableCaptchas].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    this.usedCaptchas.push(...selected);

    return selected;
  }

  startCaptcha() {
    this.currentStep = 0;
    this.selectedCaptchas = this.getRandomCaptchas();
    this.showCaptcha();
    document.getElementById("captchaOverlay").style.display = "flex";
  }

  showCaptcha() {
    const captcha = this.selectedCaptchas[this.currentStep];
    const title = document.getElementById("captchaTitle");
    const content = document.getElementById("captchaContent");
    const progressFill = document.getElementById("progressFill");

    title.textContent = `Captcha Verification (${this.currentStep + 1}/2)`;
    progressFill.style.width = `${((this.currentStep + 1) / 2) * 100}%`;

    content.innerHTML = this.generateCaptchaHTML(captcha);
    this.setupCaptchaEvents(captcha);
    this.clearMessage();
  }

  generateCaptchaHTML(captcha) {
    switch (captcha.type) {
      case "math":
        return `
                            <div class="math-captcha">${captcha.data.question}</div>
                            <input type="text" class="captcha-input" id="mathInput" placeholder="Enter your answer">
                        `;

      case "color":
        return `
                            <p>${captcha.data.question}</p>
                            <div class="color-grid">
                                <div class="color-box" data-color="red" style="background-color: #ef4444;"></div>
                                <div class="color-box" data-color="blue" style="background-color: #3b82f6;"></div>
                                <div class="color-box" data-color="green" style="background-color: #10b981;"></div>
                                <div class="color-box" data-color="yellow" style="background-color: #f59e0b;"></div>
                                <div class="color-box" data-color="purple" style="background-color: #8b5cf6;"></div>
                                <div class="color-box" data-color="orange" style="background-color: #f97316;"></div>
                                <div class="color-box" data-color="pink" style="background-color: #ec4899;"></div>
                                <div class="color-box" data-color="gray" style="background-color: #6b7280;"></div>
                            </div>
                        `;

      case "pattern":
        return `
                            <p>${captcha.data.question}</p>
                            <div class="pattern-grid">
                                <div class="pattern-box" data-pattern="●">●</div>
                                <div class="pattern-box" data-pattern="■">■</div>
                                <div class="pattern-box" data-pattern="▲">▲</div>
                                <div class="pattern-box" data-pattern="★">★</div>
                                <div class="pattern-box" data-pattern="♥">♥</div>
                                <div class="pattern-box" data-pattern="♦">♦</div>
                            </div>
                        `;

      case "image":
        return `
                            <p>${captcha.data.question}</p>
                            <div class="image-grid">
                                <div class="image-box" data-emoji="🌳">🌳</div>
                                <div class="image-box" data-emoji="☀️">☀️</div>
                                <div class="image-box" data-emoji="🌙">🌙</div>
                                <div class="image-box" data-emoji="🌊">🌊</div>
                                <div class="image-box" data-emoji="🏔️">🏔️</div>
                                <div class="image-box" data-emoji="🌸">🌸</div>
                                <div class="image-box" data-emoji="🔥">🔥</div>
                                <div class="image-box" data-emoji="⭐">⭐</div>
                                <div class="image-box" data-emoji="🌈">🌈</div>
                            </div>
                        `;

      case "slider":
        return `
                            <p>${captcha.data.question}</p>
                            <div class="slider-container">
                                <input type="range" min="0" max="100" value="0" class="slider" id="captchaSlider">
                                <p>Current Value: <span id="sliderValue">0</span></p>
                            </div>
                        `;

      case "sequence":
        return `
                            <p>Complete the sequence:</p>
                            <div class="sequence-container">
                                ${captcha.data.question
                                  .split(", ")
                                  .map((num) =>
                                    num === "?"
                                      ? '<div class="sequence-number question-mark">?</div>'
                                      : `<div class="sequence-number">${num}</div>`
                                  )
                                  .join('<div class="arrow">→</div>')}
                            </div>
                            <input type="text" class="captcha-input" id="sequenceInput" placeholder="Next Number">
                        `;

      case "text":
        return `
                            <p>${captcha.data.question}</p>
                            <input type="text" class="captcha-input" id="textInput" placeholder="Type here">
                        `;

      default:
        return "<p>Error: Unknown Captcha Type</p>";
    }
  }

  setupCaptchaEvents(captcha) {
    this.currentAnswer = null;

    switch (captcha.type) {
      case "math":
      case "text":
      case "sequence":
        const input =
          document.querySelector(`#${captcha.type}Input`) ||
          document.querySelector("#mathInput") ||
          document.querySelector("#textInput") ||
          document.querySelector("#sequenceInput");
        if (input) {
          input.addEventListener("input", (e) => {
            this.currentAnswer = e.target.value.trim();
          });
        }
        break;

      case "color":
        document.querySelectorAll(".color-box").forEach((box) => {
          box.addEventListener("click", () => {
            document
              .querySelectorAll(".color-box")
              .forEach((b) => b.classList.remove("selected"));
            box.classList.add("selected");
            this.currentAnswer = box.getAttribute("data-color");
          });
        });
        break;

      case "pattern":
        document.querySelectorAll(".pattern-box").forEach((box) => {
          box.addEventListener("click", () => {
            document
              .querySelectorAll(".pattern-box")
              .forEach((b) => b.classList.remove("selected"));
            box.classList.add("selected");
            this.currentAnswer = box.getAttribute("data-pattern");
          });
        });
        break;

      case "image":
        document.querySelectorAll(".image-box").forEach((box) => {
          box.addEventListener("click", () => {
            document
              .querySelectorAll(".image-box")
              .forEach((b) => b.classList.remove("selected"));
            box.classList.add("selected");
            this.currentAnswer = box.getAttribute("data-emoji");
          });
        });
        break;

      case "slider":
        const slider = document.getElementById("captchaSlider");
        const valueDisplay = document.getElementById("sliderValue");
        slider.addEventListener("input", (e) => {
          this.currentAnswer = parseInt(e.target.value);
          valueDisplay.textContent = e.target.value;
        });
        break;
    }
  }

  submitCaptcha() {
    const captcha = this.selectedCaptchas[this.currentStep];
    const isCorrect = this.validateAnswer(captcha, this.currentAnswer);

    if (!isCorrect) {
      this.showMessage("Incorrect answer! Please try again.", "error");
      return;
    }

    if (this.currentStep === 0) {
      this.showMessage("First captcha passed! Moving to second...", "success");
      setTimeout(() => {
        this.currentStep = 1;
        this.showCaptcha();
      }, 1500);
    } else {
      this.showMessage(
        "Both captchas passed! Redirecting to email...",
        "success"
      );
      setTimeout(() => {
        this.openEmail();
      }, 1500);
    }
  }

  validateAnswer(captcha, answer) {
    if (!answer) return false;

    if (captcha.type === "slider") {
      return Math.abs(parseInt(answer) - captcha.data.answer) <= 2;
    }

    return (
      answer.toString().toLowerCase() ===
      captcha.data.answer.toString().toLowerCase()
    );
  }

  showMessage(message, type) {
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.innerHTML = `<div class="${type}-message">${message}</div>`;
  }

  clearMessage() {
    document.getElementById("messageDiv").innerHTML = "";
  }

  closeCaptcha() {
    document.getElementById("captchaOverlay").style.display = "none";
    this.currentStep = 0;
    this.currentAnswer = null;
  }

  openEmail() {
    this.closeCaptcha();
    // window.location.href ="https://mail.google.com/mail/?view=cm&fs=1&to=shahidullahkaiserfaravi@gmail.com";
    window.open("https://mail.google.com/mail/?view=cm&to=uk.mrinc@gmail.com", "_blank");
    // window.location.href = 'mailto:shahidullahkaiserfaravi@gmail.com';
  }
}

// Initialize the captcha system when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new CaptchaSystem();
});
