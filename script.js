const boardContainer = document.querySelector(".game-board");

const gameBoard = () => {
  nameDisplay.innerHTML = currentPlayer.playerName + "'S TURN";
  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = "Reset Board";
  winnerDisplay.appendChild(resetBtn);
  resetBtn.addEventListener("click", () => {
    reset();
  });

  const board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  board.forEach((row) => {
    row.forEach((tiles) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      boardContainer.appendChild(tile);

      tile.addEventListener("click", (event) => {
        console.log(row.indexOf(tiles));
        if (tile.innerHTML === "") {
          tile.innerHTML = currentPlayer.sign;
          row.splice(row.indexOf(tiles), 1, currentPlayer.sign);
          console.log(board);
          let check = hasConsecutive(
            board,
            currentPlayer.playerName,
            currentPlayer.sign
          );
          if (check !== true) {
            actualPlayer(myPlayers[0], myPlayers[1]);
            console.log("check" + check);
          }
        }
      });
    });
  });
};

const player = (playerName, sign) => {
  return {
    playerName,
    sign,
  };
};

const playerName1 = document.querySelector("#player1");
const playerName2 = document.querySelector("#player2");

const startGameBtn = document.querySelector("#startBtn");

const nameDisplay = document.querySelector(".name-input");
const winnerDisplay = document.querySelector(".winner");

startGameBtn.addEventListener("click", () => {
  if (playerName1.value != "" && playerName2.value != "") {
    hideInput();

    const player1 = player(playerName1.value, "X");
    const player2 = player(playerName2.value, "O");
    addPlayer(player1, player2);

    gameBoard();
  }
});

let myPlayers = [];
let currentPlayer;

function addPlayer(obj, obj2) {
  myPlayers.push(obj);
  myPlayers.push(obj2);

  currentPlayer = myPlayers[0];
}

const actualPlayer = function (player1, player2) {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    nameDisplay.innerHTML = player2.playerName + "'S TURN";
  } else {
    currentPlayer = player1;
    nameDisplay.innerHTML = player1.playerName + "'S TURN";
  }
};

// const player1 = player("player-1", "X");
// const player2 = player("player-2", "O");

function hasConsecutive(bingo, player, sign) {
  for (i = 0; i < 3; i++) {
    if (bingo[i][0] == sign && bingo[i][1] == sign && bingo[i][2] == sign) {
      nameDisplay.textContent = player + " WINS!";
      return true;
    } else if (
      bingo[0][i] == sign &&
      bingo[1][i] == sign &&
      bingo[2][i] == sign
    ) {
      nameDisplay.textContent = player + " WINS!";
      return true;
    } else if (bingo[1][1] == sign) {
      if (bingo[0][0] == sign && bingo[2][2] == sign) {
        nameDisplay.textContent = player + " WINS!";
        return true;
      } else if (bingo[0][2] === sign && bingo[2][0] === sign) {
        nameDisplay.textContent = player + " WINS!";
        return true;
      }
    }
  }
}

function hideInput() {
  const hide = document.querySelectorAll(".hide");

  hide.forEach((div) => {
    div.style.display = "none";
  });
}

function reset() {
  boardContainer.innerHTML = "";
  winnerDisplay.innerHTML = "";
  currentPlayer = myPlayers[0];
  gameBoard();
}
