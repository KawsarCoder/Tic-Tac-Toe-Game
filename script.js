document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const cells = Array.from(document.querySelectorAll(".cell"));
  const message = document.createElement("div");
  const popup = document.createElement("div");
  let currentPlayer = "X";
  let gameWon = false;

  // start the game
  const startGame = () => {
    message.textContent = `Player ${currentPlayer}'s turn`;
    message.classList.remove("win");
    board.appendChild(message);
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
      cell.addEventListener("click", handleClick, { once: true });
    });
  };

  // Initialize the game
  startGame();

  // handle cell click
  function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
      endGame(cell);
    } else if (checkDraw()) {
      endGame(null, true);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  // check for a win
  function checkWin() {
    const winningCombinations = [
      [0, 1, 3],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        cells[a].classList.contains(currentPlayer) &&
        cells[b].classList.contains(currentPlayer) &&
        cells[c].classList.contains(currentPlayer)
      );
    });
  }

  // check for draw
  function checkDraw() {
    return cells.every((cell) => {
      return cell.classList.contains("X") || cell.classList.contains("0");
    });
  }

  // End the Game
  function endGame(winningCell, draw = false) {
    gameWon = true;
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
    });
    if (draw) {
      message.textContent = "Draw!";
    } else {
      message.textContent = `Player ${currentPlayer} wins!`;
      message.classList.add("win");
      if (winningCell) {
        winningCell.classList.add("winning-cell");
        popup.textContent = `Player ${currentPlayer} wins!`;
        popup.classList.add("popup");
        document.body.appendChild(popup);
      }
    }
  }
});
