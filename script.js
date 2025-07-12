// === Update Checker (leave this at the top if needed) ===
(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/

// Jumpscare logic
// script.js
// script.js
const messages = [
  "Are you sure?",
  "Really sure??",
  "Seriously?",
  "You fr fr? Like Fr Fr??",
  "Are you SUREEEEE??",
  "If you say no, I will be really sad...",
  "Ok fine, I will stop asking...",
  "Fine I don't need you anyways.",
  ".....",
  "Why are you so difficult?",
  "Don't ever talk to me again",
  "Please say yes..."
];

const horrorMessages = [
  "...",
  "Why do you keep saying.. no?",
  "Do you hate my company that much..?",
  "I'm sorry...",
  "Why would you do this to me..?",
  "Do you know what you've done?",
  "They're awake now.",
  "They're watching you.",
  "You can't leave.",
  "Not anymore.",
  "You're going to be with me forever...",
  "heh..",
  "They are hungry..",
  "Goodluck. ",
  "ERROR",
  "SYSTEM NOT RESPONDING",
  "ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERRORERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERRO ERROR ERROR ERROR ERROR ERROR"
];

let messageIndex = 0;
let noClickCount = 0;
let horrorIndex = 0;
let typing = false;
let textColorChanged = false;
let audioSwitched = false;

function handleNoClick() {
  const backgroundMusic = document.getElementById("backgroundMusic");
  if (backgroundMusic && backgroundMusic.paused) {
    backgroundMusic.play();
  }

  if (noClickCount < 11) {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex++;
    noClickCount++;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.2}px`;
  } else if (noClickCount === 11) {
    noClickCount++;
    const backgroundMusic = document.getElementById("backgroundMusic");
    const staticNoise = document.getElementById("staticSound");
    backgroundMusic.pause();
    staticNoise.play();

    const overlay = document.getElementById("jumpscareOverlay");
    const main = document.querySelector(".container");
    main.style.display = "none";
    overlay.style.display = "flex";

    setTimeout(() => {
      startJumpscare();
    }, 1000);
  }
}

function handleYesClick() {
  window.location.href = "yes_page.html";
}

function startJumpscare() {
  const overlay = document.getElementById("jumpscareOverlay");
  const scream = document.getElementById("screamSound");
  const sting = document.getElementById("stingSound");
  const staticNoise = document.getElementById("staticSound");
  const horrorMusic = document.getElementById("horrorMusic");
  const textBox = document.getElementById("horrorText");
  const finalImage = document.getElementById("finalImage");

  if (!audioSwitched) {
    staticNoise.pause();
    staticNoise.currentTime = 0;
    horrorMusic.play();
    audioSwitched = true;
  }

  overlay.addEventListener("click", () => {
    if (typing) return;

    if (horrorIndex < horrorMessages.length) {
      const message = horrorMessages[horrorIndex];
      horrorIndex++;

      if (message.includes("ERROR")) {
        staticNoise.play();
        textBox.style.color = "white";
        textBox.style.textShadow = "0 0 6px white";
        horrorMusic.pause();
        horrorMusic.currentTime = 0;

        typeMessage(message, textBox, () => {
          setTimeout(() => {
            location.reload();
          }, 10000); // Extended to 10 seconds delay after final error
        });
      } else {
        typeMessage(message, textBox);
      }
    } else {
      textBox.style.display = "none";
      finalImage.style.display = "block";
      scream.play();
    }
  });
}

function typeMessage(message, element, onComplete) {
  element.classList.remove("glitching");
  element.textContent = "";
  typing = true;

  if (textColorChanged) {
    element.style.color = "#ff0000";
    element.style.textShadow = "0 0 8px #ff0000";
  }

  let i = 0;
  const interval = setInterval(() => {
    element.textContent += message.charAt(i);
    i++;

    if (i >= message.length) {
      clearInterval(interval);
      typing = false;

      if (message === "Do you know what you've done?") {
        const sting = document.getElementById("stingSound");
        sting.play();

        setTimeout(() => {
          element.style.color = "#ff0000";
          element.style.textShadow = "0 0 8px #ff0000";
          document.body.classList.add("shake");

          setTimeout(() => {
            document.body.classList.remove("shake");
          }, 500);
        }, 300);

        textColorChanged = true;
      }

      element.classList.add("glitching");
      if (onComplete) onComplete();
    }
  }, 50);
}
