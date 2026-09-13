(() => {
  const beats = [
    {
      speaker: "Kakashi Hatake",
      line: "...You're late.",
      choice: "Remain silent."
    },
    {
      speaker: "Kakashi Hatake",
      line: "The courier leaves the south gate at first light. Take the package before it reaches the border.",
      choice: "Understood."
    },
    {
      speaker: "Kakashi Hatake",
      line: "No witnesses. No heroics. Return to this roof when it's done.",
      choice: "Accept the assignment."
    },
    {
      speaker: "Kakashi Hatake",
      line: "Good. Don't make me wait twice.",
      choice: "Replay benchmark",
      terminal: true
    }
  ];

  const stage = document.querySelector("#stage");
  const speaker = document.querySelector("#speaker");
  const line = document.querySelector("#line");
  const choice = document.querySelector("#choice");
  const choiceLabel = document.querySelector("#choice-label");
  const back = document.querySelector("#back");

  let index = 0;
  let transitionTimer = null;

  function paint() {
    const beat = beats[index];

    speaker.textContent = beat.speaker;
    line.textContent = beat.line;
    choiceLabel.textContent = beat.choice;
    back.disabled = index === 0;
    choice.setAttribute(
      "aria-label",
      beat.terminal
        ? "Replay benchmark"
        : `${beat.choice} Press F to continue.`
    );
  }

  function transition(nextIndex) {
    window.clearTimeout(transitionTimer);
    stage.classList.add("is-transitioning");

    transitionTimer = window.setTimeout(() => {
      index = nextIndex;
      paint();
      stage.classList.remove("is-transitioning");
      choice.focus({ preventScroll: true });
    }, 180);
  }

  function advance() {
    const beat = beats[index];
    transition(beat.terminal ? 0 : Math.min(index + 1, beats.length - 1));
  }

  function goBack() {
    if (index === 0) return;
    transition(index - 1);
  }

  choice.addEventListener("click", advance);
  back.addEventListener("click", goBack);

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      advance();
    }
  });

  paint();
})();
