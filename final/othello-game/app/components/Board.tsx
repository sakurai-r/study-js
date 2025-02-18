"use client";
import React, { useEffect, useState } from "react";
import Cell from "./Cell";

const BOARD_SIZE = 8;
type CellState = "empty" | "black" | "white";
type Board = CellState[][];
type Player = "black" | "white";

// 8方向のオフセット
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// 初期配置のボード
const initialBoard: Board = Array.from({ length: BOARD_SIZE }, () =>
  Array<CellState>(BOARD_SIZE).fill("empty")
);

initialBoard[3][3] = "white";
initialBoard[4][4] = "white";
initialBoard[3][4] = "black";
initialBoard[4][3] = "black";

const Board = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("black");

  // currentPlayer が white になったら実行
  useEffect(() => {
    if (currentPlayer === "white") {
      getAiMove(board);
    }
  }, [currentPlayer]);

  /**
   * ある方向にひっくり返せる石を取得
   */
  const getFlippedStones = (
    row: number,
    col: number,
    player: Player
  ): [number, number][] => {
    const opponent = player === "black" ? "white" : "black";
    let flipped: [number, number][] = [];

    for (const [dx, dy] of DIRECTIONS) {
      let r = row + dx,
        c = col + dy;
      let possibleFlips: [number, number][] = [];

      while (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === opponent
      ) {
        possibleFlips.push([r, c]);
        r += dx;
        c += dy;
      }

      if (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        flipped = flipped.concat(possibleFlips);
      }
    }

    return flipped;
  };

  /**
   * 合法手か判定
   */
  const isValidMove = (row: number, col: number, player: Player): boolean => {
    if (board[row][col] !== "empty") {
      return false;
    }

    return getFlippedStones(row, col, player).length > 0;
  };

  /**
   * 石を配置し、裏返す
   */
  const placeStone = (row: number, col: number) => {
    if (!isValidMove(row, col, currentPlayer)) {
      return;
    }
    console.log(currentPlayer);

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;

    // 裏返せる石を取得し、反転
    const flippedStones = getFlippedStones(row, col, currentPlayer);
    for (const [r, c] of flippedStones) {
      newBoard[r][c] = currentPlayer;
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  /**
   * AIの手を取得
   */
  const getAiMove = async (newBoard: Board) => {
    const response = await fetch("/api/get-move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board: newBoard, player: "white" }),
    });

    const data = await response.json();
    if (data.row !== undefined && data.col !== undefined) {
      if (isValidMove(data.row, data.col, "white")) {
        placeStone(data.row, data.col);
      } else {
        console.log("無効な手");
      }
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
