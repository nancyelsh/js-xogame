//  instance ويعرف هذا الكائن بنموذج class يمكننا إنشاء كائن من فئة
//  new باستخدام الكلمة الرئيسية أو الكلمة الدالة
const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start(); // method - خاصة بكائن funtion

// constructor funtion -> creates TicTacToeGame instance (object) of class ticTacToeGame
// constructor of constructors
function TicTacToeGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);

  let turn = 0;

  this.start = function () {
    // متابعة التغيرات فور بدء اللعبة
    const config = { childList: true }; // observer من خلال divل child لتتبع التغيرات في أي
    const observer = new MutationObserver(() => takeTurn()); // observer أنشئ
    board.positions.forEach((el) => observer.observe(el, config)); // takeTurn راقب التغيرات وبناء على ذلك استدعي
    takeTurn(); // هل نقوم باستدعائها مرتين؟
  };

  // class أستخدم constructorلو أنا خارج ال
  // this أستخدم constructorلو أنا داخل ال
  function takeTurn() {
    // لو كان هناك فائز
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }
    turn++;
  }
}

function Board(board) {
  this.positions = Array.from(document.querySelectorAll(".tile"));
  // console.log("Positions", this.positions); // consoleتأكد في ال

  // 0 1 2
  // 3 4 5
  // 6 7 8
  this.checkForWinner = function () {
    let winner = false;
    // مصفوفة مكونة من عدة مصفوفات
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    const positions = this.positions;
    winningCombinations.forEach((winningCombo) => {
      const position0InnerText = positions[winningCombo[0]].innerText;
      const position1InnerText = positions[winningCombo[1]].innerText;
      const position2InnerText = positions[winningCombo[2]].innerText;

      const isWinningCombo =
        position0InnerText !== "" &&
        position0InnerText === position1InnerText &&
        position1InnerText === position2InnerText;

      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach(
          (index) => (positions[index].className += "winner") // يميز السطر الرابح class أضف
        );
      }
    });
    return winner;
  };
}

function HumanPlayer(board) {
  // خذ دورك واطبع الرمز الخاص بك
  this.takeTurn = function () {
    // console.log("HP Turn");
    // eventListener أضف
    board.positions.forEach(
      (el) => el.addEventListener("click", handleTurnTaken) // click ابحث عن
    );
  };

  function handleTurnTaken(event) {
    // console.log("Turn taken");
    event.target.innerText = "X";
    // تعطيل الزر المضغوط
    board.positions.forEach((el) =>
      el.removeEventListener("click", handleTurnTaken)
    );
  }
}

// الكمبيوتر في هذا التمرين ليس ذكياً
function ComputerPlayer(board) {
  // خذ دورك واطبع الرمز الخاص بك
  this.takeTurn = function () {
    // console.log("CP Turn");
    const availablePositions = board.positions.filter(
      (p) => p.innerText === "" // مصفوفة
    );
    console.log(availablePositions);
    const move = Math.floor(Math.random() * availablePositions.length); // رقم عشوائي بين صفر وطول المصفوفة
    availablePositions[move].innerText = "O";
  };
}

// ؟JavaScript في لغة constructorما هو ال
/*
    A constructor is a function that creates an instance of a class which is typically
    called an “object”. In JavaScript, a constructor gets called when you declare an 
    object using the new keyword.
*/
