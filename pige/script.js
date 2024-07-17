const map = [
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
];

const gridCells = document.querySelectorAll(".grid__cell");
let totalCarrots = 0;

for (let i = 0; i < gridCells.length; i++) {
  const row = Math.floor(i / map[0].length);
  const col = i % map[0].length;

  gridCells[i].dataset.position = `map[${row}][${col}]`;

  if (map[row][col] === 0) {
    gridCells[i].classList.add("fill");
  } else {
    gridCells[i].textContent = "🥕";
    totalCarrots++;
  }
}

const addActiveClass = function (rowPosition, colPosition) {
  const position = `map[${rowPosition}][${colPosition}]`;
  const gridCell = document.querySelector(`[data-position="${position}"]`);

  if (document.querySelector(".active")) {
    document.querySelector(".active").textContent = "";
    document.querySelector(".active").classList.remove("active");
  }

  if (gridCell) {
    if (gridCell.textContent === "🥕") {
      gridCell.textContent = "";
      totalCarrots--;

      if (totalCarrots === 0) {
        setTimeout(() => {
          alert("Happy oink! 🐷");
        }, 10);
      }
    }

    gridCell.classList.add("active");
    gridCell.textContent = "🐷";
  }
};

const startGame = function () {
  let row, col;
  do {
    row = Math.floor(Math.random() * map.length);
    col = Math.floor(Math.random() * map[0].length);
  } while (map[row][col] !== 1);

  addActiveClass(row, col);
  return [row, col];
};

const position = startGame();
let rowPosition = position[0];
let colPosition = position[1];

document.addEventListener("keydown", function (evt) {
  if (evt.key === "ArrowUp") {
    if (rowPosition > 0 && map[rowPosition - 1][colPosition] === 1) {
      rowPosition -= 1;
      addActiveClass(rowPosition, colPosition);
    }
  } else if (evt.key === "ArrowRight") {
    if (
      colPosition < map[0].length - 1 &&
      map[rowPosition][colPosition + 1] === 1
    ) {
      colPosition += 1;
      addActiveClass(rowPosition, colPosition);
    }
  } else if (evt.key === "ArrowDown") {
    if (
      rowPosition < map.length - 1 &&
      map[rowPosition + 1][colPosition] === 1
    ) {
      rowPosition += 1;
      addActiveClass(rowPosition, colPosition);
    }
  } else if (evt.key === "ArrowLeft") {
    if (colPosition > 0 && map[rowPosition][colPosition - 1] === 1) {
      colPosition -= 1;
      addActiveClass(rowPosition, colPosition);
    }
  }
});

const padButtons = document.querySelectorAll(".d-pad__button");

for (let i = 0; i < padButtons.length; i++) {
  padButtons[i].addEventListener("click", function () {
    if (padButtons[i].classList.contains("up")) {
      if (rowPosition > 0 && map[rowPosition - 1][colPosition] === 1) {
        rowPosition -= 1;
        addActiveClass(rowPosition, colPosition);
      }
    } else if (padButtons[i].classList.contains("right")) {
      if (
        colPosition < map[0].length - 1 &&
        map[rowPosition][colPosition + 1] === 1
      ) {
        colPosition += 1;
        addActiveClass(rowPosition, colPosition);
      }
    } else if (padButtons[i].classList.contains("down")) {
      if (
        rowPosition < map.length - 1 &&
        map[rowPosition + 1][colPosition] === 1
      ) {
        rowPosition += 1;
        addActiveClass(rowPosition, colPosition);
      }
    } else if (padButtons[i].classList.contains("left")) {
      if (colPosition > 0 && map[rowPosition][colPosition - 1] === 1) {
        colPosition -= 1;
        addActiveClass(rowPosition, colPosition);
      }
    }
  });
}
