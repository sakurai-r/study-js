"use client";
import React, { useState } from "react";
import Cell from "./Cell";

const BOARD_SIZE = 8;
type CellState = "empty" | "black" | "white";
type Board = CellState[][];

const initialBoard: Board = Array.from({ length: BOARD_SIZE }, () =>
  Array<CellState>(BOARD_SIZE).fill("empty")
);

initialBoard[3][3] = "white";
initialBoard[4][4] = "white";
initialBoard[3][4] = "black";
initialBoard[4][3] = "black";

const Board = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">(
    "black"
  );

  const isValidMove = (row: number, col: number): boolean => {
    return board[row][col] === "empty"; // 簡易的な判定
  };

  const placeStone = (row: number, col: number) => {
    if (!isValidMove(row, col)) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");

    if (currentPlayer === "white") {
      getAiMove(newBoard);
    }
  };

  const getAiMove = async (newBoard: Board) => {
    const response = await fetch("/api/get-move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board: newBoard, player: "white" }),
    });

    const data = await response.json();
    if (data.row !== undefined && data.col !== undefined) {
      placeStone(data.row, data.col);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-1">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => placeStone(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
