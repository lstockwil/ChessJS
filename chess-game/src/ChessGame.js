import { useState } from 'react';
import Board from './Board';
import './App.css';

const initializeBoard = () => {
  const board = Array(8).fill().map(() => Array(8).fill(null));
  
  // Black pieces
  const blackPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  board[0] = blackPieces.map(type => ({ type, color: 'black' }));
  board[1] = Array(8).fill().map(() => ({ type: 'pawn', color: 'black' }));
  
  // White pieces
  const whitePieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  board[7] = whitePieces.map(type => ({ type, color: 'white' }));
  board[6] = Array(8).fill().map(() => ({ type: 'pawn', color: 'white' }));
  
  return board;
};

const ChessGame = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const getValidMoves = (board, position) => {
    const [row, col] = position;
    const piece = board[row][col];
    if (!piece || piece.color !== currentPlayer) return [];
    
    const moves = [];
    const directions = {
      pawn: piece.color === 'white' ? -1 : 1,
      knight: [[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]],
      king: [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],
      bishop: [[1,1],[-1,1],[-1,-1],[1,-1]],
      rook: [[1,0],[0,1],[-1,0],[0,-1]],
      queen: [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]]
    };

    const addMove = (r, c) => {
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (!board[r][c] || board[r][c].color !== piece.color) {
          moves.push([r, c]);
          return !board[r][c]; // Continue if empty
        }
      }
      return false;
    };

    switch (piece.type) {
      case 'pawn':
        // Forward moves
        if (!board[row + directions.pawn][col]) {
          addMove(row + directions.pawn, col);
          if ((piece.color === 'white' && row === 6) || (piece.color === 'black' && row === 1)) {
            addMove(row + 2 * directions.pawn, col);
          }
        }
        // Captures
        [[directions.pawn, 1], [directions.pawn, -1]].forEach(([dr, dc]) => {
          const r = row + dr;
          const c = col + dc;
          if (c >= 0 && c < 8 && board[r]?.[c]?.color !== piece.color) {
            addMove(r, c);
          }
        });
        break;

      case 'knight':
        directions.knight.forEach(([dr, dc]) => {
          addMove(row + dr, col + dc);
        });
        break;

      case 'king':
        directions.king.forEach(([dr, dc]) => {
          addMove(row + dr, col + dc);
        });
        break;

      case 'bishop':
      case 'rook':
      case 'queen':
        directions[piece.type].forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (addMove(r, c)) {
            r += dr;
            c += dc;
          }
        });
        break;

      default:
        break;
    }

    return moves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
  };

  const handleSquareClick = (row, col) => {
    if (!selectedPiece) {
      const piece = board[row][col];
      if (piece?.color === currentPlayer) {
        setSelectedPiece([row, col]);
        setValidMoves(getValidMoves(board, [row, col]));
      }
    } else {
      const isMoveValid = validMoves.some(([r, c]) => r === row && c === col);
      if (isMoveValid) {
        const newBoard = board.map(row => [...row]);
        const [oldRow, oldCol] = selectedPiece;
        newBoard[row][col] = board[oldRow][oldCol];
        newBoard[oldRow][oldCol] = null;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  return (
    <div className="chess-game">
      <h2>Current Player: {currentPlayer}</h2>
      <Board 
        board={board}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
        selectedPiece={selectedPiece}
      />
    </div>
  );
};

export default ChessGame;