import Square from './Square';

const Board = ({ board, validMoves, onSquareClick, selectedPiece }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => {
            const isSelected = selectedPiece?.every((val, i) => 
              val === (i === 0 ? rowIndex : colIndex)
            );
            const isValidMove = validMoves.some(([r, c]) => 
              r === rowIndex && c === colIndex
            );
            
            return (
              <Square
                key={colIndex}
                piece={piece}
                isSelected={isSelected}
                isValidMove={isValidMove}
                position={[rowIndex, colIndex]}
                onClick={() => onSquareClick(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;