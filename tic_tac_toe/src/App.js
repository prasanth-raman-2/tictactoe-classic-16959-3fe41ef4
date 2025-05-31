import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // "X" always starts first
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Helper: Check for winner
  // PUBLIC_INTERFACE
  function checkWinner(b) {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Cols
      [0, 4, 8],
      [2, 4, 6], // Diags
    ];
    for (let [a, bIdx, c] of winLines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Cell filled or game over
    const nextBoard = board.slice();
    nextBoard[idx] = isX ? "X" : "O";
    setBoard(nextBoard);

    // Evaluate win/draw
    const winnerDetected = checkWinner(nextBoard);
    if (winnerDetected) {
      setWinner(winnerDetected);
      setIsDraw(false);
    } else if (nextBoard.every((cell) => cell)) {
      setIsDraw(true);
      setWinner(null);
    } else {
      setIsX(!isX);
    }
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
    setIsDraw(false);
  }

  // Status message
  let statusMsg = "";
  if (winner) {
    statusMsg = `Winner: ${winner}`;
  } else if (isDraw) {
    statusMsg = "Draw! No more moves.";
  } else {
    statusMsg = `Turn: ${isX ? "X" : "O"}`;
  }

  // Styling: KAVIA bar remains, board centered, buttons styled per palette
  // Palette: primary #fff, secondary #222, accent #4caf50, light mode

  return (
    <div className="app" style={{ minHeight: "100vh", background: "#ffffff", color: "#222222" }}>
      <nav className="navbar" style={{ background: "#222222", color: "#ffffff" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: "#4caf50" }}>✱</span> KAVIA AI
            </div>
            <button className="btn" style={{ background: "#4caf50" }} disabled>
              TicTacToe Classic
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            justifyContent: "center",
            paddingTop: 120,
          }}
        >
          <div
            style={{
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <h1 className="title" style={{ color: "#4caf50", fontSize: "2.5rem", marginBottom: 8 }}>
              TicTacToe Classic
            </h1>
            <div className="subtitle" style={{ color: "#222222", fontSize: "1.15rem" }}>
              Two Player | Win & Draw Detection
            </div>
          </div>

          {/* Status */}
          <div
            style={{
              marginBottom: 24,
              fontWeight: 500,
              fontSize: "1.15rem",
              color:
                winner
                  ? "#4caf50"
                  : isDraw
                  ? "#999"
                  : isX
                  ? "#222222"
                  : "#4caf50",
              minHeight: 28,
            }}
            aria-live="polite"
          >
            {statusMsg}
          </div>

          {/* Board */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gridTemplateRows: "repeat(3, 60px)",
              gap: "4px",
              background: "#22222211",
              borderRadius: "12px",
              boxShadow: "0 2px 12px 0 rgba(76,175,80,0.04)",
              marginBottom: 32,
            }}
            role="grid"
            aria-label="TicTacToe board"
          >
            {board.map((val, i) => (
              <button
                key={i}
                onClick={() => handleCellClick(i)}
                className="ttt-cell"
                aria-label={
                  val
                    ? `${val} at row ${Math.floor(i/3) + 1} col ${(i % 3) + 1}`
                    : `Empty cell row ${Math.floor(i/3) + 1} col ${(i % 3) + 1}`
                }
                disabled={!!val || winner}
                style={{
                  width: 60,
                  height: 60,
                  fontSize: "2rem",
                  fontWeight: 700,
                  background: "#fff",
                  color:
                    val === "X"
                      ? "#222222"
                      : val === "O"
                      ? "#4caf50"
                      : "#4caf50",
                  border: "2px solid #4caf50",
                  borderRadius: "10px",
                  cursor: !!val || winner ? "not-allowed" : "pointer",
                  outline: "none",
                  transition: "background 0.2s, color 0.2s",
                  boxShadow:
                    val
                      ? "0 1px 8px 0 rgba(76, 175, 80, 0.07)"
                      : "0 0px 2px 0 rgba(34,34,34,0.07)",
                }}
                role="gridcell"
                tabIndex={0}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="btn btn-large"
            style={{
              background: "#4caf50",
              color: "#fff",
              minWidth: 160,
              fontWeight: 500,
              borderRadius: 7,
              fontSize: "1.1rem",
              boxShadow: "0 1px 8px 0 rgba(76,175,80,0.15)",
              border: "none",
              outline: "none",
            }}
          >
            Restart
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;