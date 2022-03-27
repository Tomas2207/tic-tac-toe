const gameBoard = () => {
  const boardContainer = document.querySelector(".game-board");
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
          hasConsecutive(board, currentPlayer.playerName, currentPlayer.sign);
          actualPlayer(myPlayers[0], myPlayers[1]);
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

startGameBtn.addEventListener("click", () => {
  hideInput();

  const player1 = player(playerName1.value, "X");
  const player2 = player(playerName2.value, "O");
  addPlayer(player1, player2);

  gameBoard();
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
  } else {
    currentPlayer = player1;
  }
};

// const player1 = player("player-1", "X");
// const player2 = player("player-2", "O");

function hasConsecutive(bingo, player, sign) {
  for (i = 0; i < 3; i++) {
    if (bingo[i][0] == sign && bingo[i][1] == sign && bingo[i][2] == sign) {
      nameDisplay.innerHTML = player + "  WINS!";
      break;
    } else if (
      bingo[0][i] == sign &&
      bingo[1][i] == sign &&
      bingo[2][i] == sign
    ) {
      nameDisplay.innerHTML = player + "  WINS!";
      break;
    } else if (bingo[1][1] == sign) {
      if (bingo[0][0] == sign && bingo[2][2] == sign) {
        nameDisplay.innerHTML = player + " WINS!";
        break;
      } else if (bingo[0][2] === sign && bingo[2][0] === sign) {
        nameDisplay.innerHTML = player + " WINS!";
        break;
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
