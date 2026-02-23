// -------------------- Setup board --------------------
const allSquares = document.querySelectorAll('#chessBoard .square');
const boardSquares = [];
let index = 0;

for (let row = 0; row < 8; row++) {
  const rowArray = [];
  for (let col = 0; col < 8; col++) {
    rowArray.push(allSquares[index]);
    index++;
  }
  boardSquares.push(rowArray);
}

// -------------------- Piece Data --------------------
const pieces = [
  ["r", "n", "b", "q", "k", "b", "n","r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

function getPieceUnicode(piece) {
  switch (piece) {
    case "r": return "&#9820;";
    case "n": return "&#9822;";
    case "b": return "&#9821;";
    case "q": return "&#9819;";
    case "k": return "&#9818;";
    case "p": return "&#9823;";

    case "R": return "&#9814;";
    case "N": return "&#9816;";
    case "B": return "&#9815;";
    case "Q": return "&#9813;";
    case "K": return "&#9812;";
    case "P": return "&#9817;";

    default: return "";
  }
}

// Display pieces initially
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    boardSquares[row][col].innerHTML = getPieceUnicode(pieces[row][col]);
  }
}

// -------------------- Turn System --------------------
let currentTurn = "white"; // white starts first

function isBlackPiece(piece) {
  return ["r", "n", "b", "q", "k", "p"].includes(piece);
}
function isWhitePiece(piece) {
  return ["R", "N", "B", "Q", "K", "P"].includes(piece);
}


// King's legalMove check!
const islegalmoveK = (fromRow, fromCol, toRow, toCol) => {

  console.log("King's isLegalmove function called");

  let rowDiff = Math.abs(toRow - fromRow);
  let colDiff = Math.abs(toCol - fromCol);


// King moves exactly one square in any direction
  if (rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0)) {
    return true;
  }

  return false;
};




let selectedSquare = null;
let selectedRow = null;
let selectedCol = null;


// -------------------- Helper Functions --------------------

function clearHighlights() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      boardSquares[row][col].classList.remove("possible", "target", "selected");
    }
  }
}


// Showing Possible Moves and Targets for each selected piece
function possibleMoves(row1, col1) {
  const pieceUnicode = getPieceUnicode(pieces[row1][col1]);


//Kings
 if(pieceUnicode==="&#9818;") // Black King's Logic
{
     // black king left move
    for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row1][col]) === "&#9820;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9822;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9821;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9819;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9818;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9823;" ){
      possiblePosition.classList.remove("target");
     break;}
    break;
  } 
}

// Black's King Right move
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } 
  else  {
    possiblePosition.classList.add("target");
    if(getPieceUnicode(pieces[row1][col]) === "&#9820;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9822;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9821;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9819;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9818;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9823;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
}
        
     //Black's King Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row][col1]) === "&#9820;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9822;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9821;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9819;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9818;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9823;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
 
}

   // Black's King  Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } 
  else  {
    possiblePosition.classList.add("target");
   if(  getPieceUnicode(pieces[row][col1]) === "&#9820;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9822;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9821;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9819;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9818;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9823;" ){
      possiblePosition.classList.remove("target");
      break;}

    break;
  }
}


  // Black King  Down-left direction 
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9820;" || // rook
      getPieceUnicode(pieces[row][col]) === "&#9822;" || // knight
      getPieceUnicode(pieces[row][col]) === "&#9821;" || // bishop
      getPieceUnicode(pieces[row][col]) === "&#9819;" || // queen
      getPieceUnicode(pieces[row][col]) === "&#9818;" || // king
      getPieceUnicode(pieces[row][col]) === "&#9823;"    // pawn
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}

  // Black King Down-right direction 
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9820;" || // rook
      getPieceUnicode(pieces[row][col]) === "&#9822;" || // knight
      getPieceUnicode(pieces[row][col]) === "&#9821;" || // bishop
      getPieceUnicode(pieces[row][col]) === "&#9819;" || // queen
      getPieceUnicode(pieces[row][col]) === "&#9818;" || // king
      getPieceUnicode(pieces[row][col]) === "&#9823;"    // pawn
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}
 
// Black King  Up-right direction 
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9820;" || // rook
      getPieceUnicode(pieces[row][col]) === "&#9822;" || // knight
      getPieceUnicode(pieces[row][col]) === "&#9821;" || // bishop
      getPieceUnicode(pieces[row][col]) === "&#9819;" || // queen
      getPieceUnicode(pieces[row][col]) === "&#9818;" || // king
      getPieceUnicode(pieces[row][col]) === "&#9823;"    // pawn
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}

 //Black King Up-left direction 
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9820;" || // rook
      getPieceUnicode(pieces[row][col]) === "&#9822;" || // knight
      getPieceUnicode(pieces[row][col]) === "&#9821;" || // bishop
      getPieceUnicode(pieces[row][col]) === "&#9819;" || // queen
      getPieceUnicode(pieces[row][col]) === "&#9818;" || // king
      getPieceUnicode(pieces[row][col]) === "&#9823;"    // pawn
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}

}
else if (pieceUnicode==="&#9812;")// White King's Logic

{
       // White king left move
    for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else  {
    possiblePosition.classList.add("target");
    if( getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;"
 )
 {
      possiblePosition.classList.remove("target");
     break;}

    break;
  } 
}

// White's King Right move
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } 
  else  {
    possiblePosition.classList.add("target");
     if(  getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;"
 )
  {
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
}
        
     //White's King Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;"
 )
  {
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
 
}


   // White's King  Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
 
    possiblePosition.classList.add("possible");
    break;
  } 
  else  {
    possiblePosition.classList.add("target");

    if(getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;"
 )
  {
      possiblePosition.classList.remove("target");
      break;}

    break;
  }
}


// White King  Up-right  
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9812;" || 
      getPieceUnicode(pieces[row][col]) === "&#9813;" || 
      getPieceUnicode(pieces[row][col]) === "&#9814;" || 
      getPieceUnicode(pieces[row][col]) === "&#9815;" || 
      getPieceUnicode(pieces[row][col]) === "&#9816;" || 
      getPieceUnicode(pieces[row][col]) === "&#9817;"    
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}


//White King Up-left  
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9812;" || 
      getPieceUnicode(pieces[row][col]) === "&#9813;" || 
      getPieceUnicode(pieces[row][col]) === "&#9814;" || 
      getPieceUnicode(pieces[row][col]) === "&#9815;" || 
      getPieceUnicode(pieces[row][col]) === "&#9816;" || 
      getPieceUnicode(pieces[row][col]) === "&#9817;"    
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}


// White King Down-right 
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9812;" || 
      getPieceUnicode(pieces[row][col]) === "&#9813;" || 
      getPieceUnicode(pieces[row][col]) === "&#9814;" || 
      getPieceUnicode(pieces[row][col]) === "&#9815;" || 
      getPieceUnicode(pieces[row][col]) === "&#9816;" || 
      getPieceUnicode(pieces[row][col]) === "&#9817;"    
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}


// White King  Down-left  
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
    break;
  } else {
    possiblePosition.classList.add("target");

    // Stop if the target square has a friendly piece
    if (
      getPieceUnicode(pieces[row][col]) === "&#9812;" || 
      getPieceUnicode(pieces[row][col]) === "&#9813;" || 
      getPieceUnicode(pieces[row][col]) === "&#9814;" || 
      getPieceUnicode(pieces[row][col]) === "&#9815;" || 
      getPieceUnicode(pieces[row][col]) === "&#9816;" || 
      getPieceUnicode(pieces[row][col]) === "&#9817;"    
    ) {
      possiblePosition.classList.remove("target");
    }

    break; // stop after hitting any piece
  }
}



}

//Pawns


}
  
// -------------------- Event Listener (clicks) --------------------
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    boardSquares[row][col].addEventListener('click', () => {

      // Selecting a piece
      if (!selectedSquare && pieces[row][col] !== "") {
        const piece = pieces[row][col];

        // Enforce turn restriction
        if (currentTurn === "white" && !isWhitePiece(piece)) {
          console.log("It's white's turn!");
          return;
        }
        if (currentTurn === "black" && !isBlackPiece(piece)) {
          console.log("It's black's turn!");
          return;
        }

        selectedSquare = boardSquares[row][col];
        selectedRow = row;
        selectedCol = col;
        selectedSquare.classList.add("selected");
        possibleMoves(row, col);
        return;
      }


      // Clicking the same square again -> deselect
      if (selectedSquare === boardSquares[row][col]) {
        clearHighlights();
        selectedSquare = null;
        return;
      }

      // Trying to move
      if (selectedSquare) {
        const fromPiece = pieces[selectedRow][selectedCol];
        const toPiece = pieces[row][col];

        // Which Piece has been selected?

         // King Selected
        if (getPieceUnicode(fromPiece) === "&#9818;" || getPieceUnicode(fromPiece) === "&#9812;"){
           
          if (islegalmoveK(selectedRow, selectedCol, row, col)) {

            // Prevent capturing same color
            if ((isBlackPiece(fromPiece) && isBlackPiece(toPiece)) ||
                (isWhitePiece(fromPiece) && isWhitePiece(toPiece))) {
              console.log("Cannot capture your own piece!");
              return;
            }

            // Move logically
            pieces[row][col] = fromPiece;
            pieces[selectedRow][selectedCol] = "";

            // Update visuals
            boardSquares[row][col].innerHTML = getPieceUnicode(pieces[row][col]);
            selectedSquare.innerHTML = "";

            // Clear selections
            clearHighlights();
            selectedSquare = null;

            // Switch turns
            currentTurn = (currentTurn === "black") ? "white" : "black";
            console.log("Turn switched to:", currentTurn);
          }

       }


      }


    });
  }
}
