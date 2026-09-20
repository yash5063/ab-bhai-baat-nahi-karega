const scenes = [
  ...document.querySelectorAll(".scene")
];

const counter =
  document.getElementById("counter");

const progress =
  document.getElementById("progress");

let current = 0;


/* SHOW SCENE */

function showScene(index) {

  current =
    (index + scenes.length) %
    scenes.length;

  scenes.forEach((scene, i) => {

    scene.classList.toggle(
      "active",
      i === current
    );

  });


  /* COUNTER */

  counter.textContent =
    `${String(current + 1).padStart(2, "0")} / ` +
    `${String(scenes.length).padStart(2, "0")}`;


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
