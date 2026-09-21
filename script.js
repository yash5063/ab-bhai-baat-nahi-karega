const scenes = [
  ...document.querySelectorAll(".scene")
];

const counter =
  document.getElementById("currentNumber");

const progress =
  document.getElementById("progressBar");

const currentNumber =
  document.getElementById("currentNumber");

let current = 0;


/* =========================
   SHOW SCENE
========================= */

function showScene(index) {

  if (index < 0) {
    index = scenes.length - 1;
  }

  if (index >= scenes.length) {
    index = 0;
  }

  current = index;

  scenes.forEach((scene, i) => {
    scene.classList.toggle(
      "active",
      i === current
    );
  });

  const number =
    String(current + 1).padStart(2, "0");

  currentNumber.textContent = number;

  const progressValue =
    ((current + 1) / scenes.length) * 100;

  progress.style.width =
    `${progressValue}%`;
}


/* =========================
   NEXT BUTTONS
========================= */

document
  .querySelectorAll(".next")
  .forEach(button => {

    button.addEventListener("click", () => {

      showScene(current + 1);

    });

  });


/* =========================
   RESTART
========================= */

document
  .querySelectorAll(".restart")
  .forEach(button => {

    button.addEventListener("click", () => {

      showScene(0);

    });

  });


/* =========================
   GAME
========================= */

const options =
  document.querySelectorAll(".option");

const gameResult =
  document.getElementById("gameResult");

options.forEach((option, index) => {

  option.addEventListener("click", () => {

    options.forEach(item => {
      item.classList.remove("selected");
    });

    option.classList.add("selected");

    if (index === 2) {

      gameResult.textContent =
        "Haan! Ye wala answer bhai ko bilkul pata tha. 😂";

    } else {

      gameResult.textContent =
        "Hmm... bhai thoda disappointed hai. 😤";

    }

    setTimeout(() => {

      showScene(3);

    }, 900);

  });

});


/* =========================
   PUNISHMENT
========================= */

const punishments =
  document.querySelectorAll(".punishment");

const punishmentResult =
  document.getElementById("punishmentResult");

punishments.forEach((button, index) => {

  button.addEventListener("click", () => {

    punishments.forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    const responses = [

      "Approved. Meme bhejna compulsory hai. 😂",

      "Perfect. Bas ab message kar bhi de. 👀",

      "Bhai ko pizza wali punishment sabse pasand hai. 🍕"

    ];

    punishmentResult.textContent =
      responses[index];

    setTimeout(() => {

      showScene(4);

    }, 1100);

  });

});


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener(
  "touchstart",
  event => {

    touchStartX =
      event.changedTouches[0].screenX;

    touchStartY =
      event.changedTouches[0].screenY;

  },
  { passive: true }
);


document.addEventListener(
  "touchend",
  event => {

    const touchEndX =
      event.changedTouches[0].screenX;

    const touchEndY =
      event.changedTouches[0].screenY;

    const diffX =
      touchStartX - touchEndX;

    const diffY =
      touchStartY - touchEndY;

    if (
      Math.abs(diffX) > 55 &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {

      if (diffX > 0) {

        showScene(current + 1);

      } else {

        showScene(current - 1);

      }

    }

  },
  { passive: true }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "ArrowRight" ||
      event.key === " " ||
      event.key === "Enter"
    ) {

      showScene(current + 1);

    }

    if (event.key === "ArrowLeft") {

      showScene(current - 1);

    }

  }
);


/* =========================
   INITIAL
========================= */

showScene(0);

  /* PROGRESS */

  progress.style.width =
    `${((current + 1) / scenes.length) * 100}%`;


  /* BACKGROUND MOOD */

  const app =
    document.getElementById("app");

  if (current >= 6) {

    app.style.background =
      "radial-gradient(circle at 50% 48%, #29231c 0%, #11110f 64%)";

  } else if (current === 3) {

    app.style.background =
      "radial-gradient(circle at 50% 48%, #1e1b17 0%, #11110f 64%)";

  } else {

    app.style.background =
      "radial-gradient(circle at 50% 48%, #22201b 0%, #11110f 62%)";

  }

}


/* NEXT BUTTONS */

document
  .querySelectorAll(".next")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScene(current + 1);

      }
    );

  });


/* RESTART */

document
  .querySelector(".restart")
  .addEventListener(
    "click",
    () => {

      showScene(0);

    }
  );


/* SWIPE SUPPORT */

let touchStartX = 0;
let touchStartY = 0;


document.addEventListener(
  "touchstart",
  event => {

    touchStartX =
      event.changedTouches[0].clientX;

    touchStartY =
      event.changedTouches[0].clientY;

  },
  {
    passive: true
  }
);


document.addEventListener(
  "touchend",
  event => {

    const dx =
      event.changedTouches[0].clientX -
      touchStartX;

    const dy =
      event.changedTouches[0].clientY -
      touchStartY;


    if (
      Math.abs(dx) > 70 &&
      Math.abs(dx) >
      Math.abs(dy) * 1.25
    ) {

      showScene(
        current + (dx < 0 ? 1 : -1)
      );

    }

  },
  {
    passive: true
  }
);


/* KEYBOARD SUPPORT */

document.addEventListener(
  "keydown",
  event => {

    if (
      ["ArrowRight", " ", "Enter"]
      .includes(event.key)
    ) {

      showScene(current + 1);

    }


    if (event.key === "ArrowLeft") {

      showScene(current - 1);

    }

  }
);


/* INITIAL */

showScene(0);
