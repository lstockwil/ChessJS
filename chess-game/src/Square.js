const Square = ({ piece, isSelected, isValidMove, onClick, position }) => {
    const getPieceSymbol = (type, color) => {
      const symbols = {
        white: {
          king: '♔',
          queen: '♕',
          rook: '♖',
          bishop: '♗',
          knight: '♘',
          pawn: '♙',
        },
        black: {
          king: '♚',
          queen: '♛',
          rook: '♜',
          bishop: '♝',
          knight: '♞',
          pawn: '♟',
        },
      };
      return symbols[color]?.[type] || '';
    };
  
    const backgroundColor = isSelected ? '#baca44' :
      isValidMove ? '#a9a9a9' :
      ((position[0] + position[1]) % 2 === 0 ? '#f0d9b5' : '#b58863');
  
    return (
      <div
        className="square"
        style={{ backgroundColor }}
        onClick={onClick}
      >
        {piece && (
          <span className={`piece ${piece.color}`}>
            {getPieceSymbol(piece.type, piece.color)}
          </span>
        )}
      </div>
    );
  };
  
  export default Square;