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

//rook's legalMove check!
const islegalmoveR=(fromRow,fromCol,toRow,toCol)=>{
  console.log("isLegalmove function called");
 let check =false;  
  if(fromRow===toRow || fromCol===toCol){
      check=true;
  }
   
  return check;
}

//Pawns LegalMove Check
const islegalmoveP=(fromRow,fromCol,toRow,toCol)=>{
  console.log("isLegalmove function called");
 let check =false;  
  if(fromRow===toRow || fromCol===toCol || fromRow!==toRow || fromCol!==toCol){
      check=true;
  }
   
  return check;
}


// bishop's legalMove Check!
const islegalmoveB=(fromRow,fromCol,toRow,toCol)=>{
  console.log("bishop's isLegalmove function called");
 let check =false;  
  if(fromRow!==toRow && fromCol!==toCol){
      check=true;
  }
  return check;
}

//Queen's LegalMove Check!
const islegalmoveQ=(fromRow,fromCol,toRow,toCol)=>{
  console.log("isLegalmove function called");
 let check =false;  
  if(fromRow===toRow || fromCol===toCol){
      check=true;
  }
  else if(fromRow !==toRow && fromCol !== toCol){
      check=true;
  } 
  else { return check;}
  return check;
}

// Knight's Legal Move Check
const islegalmoveN = (fromRow, fromCol, toRow, toCol) => {
  console.log("Knight's isLegalmove function called");
  let rowDiff = Math.abs(toRow - fromRow);
  let colDiff = Math.abs(toCol - fromCol);

  // Knight moves in an "L" shape: 2 + 1 in any direction
  return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
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


  // Rooks
  if (pieceUnicode === "&#9820;") { // Black Rook logic

    //Black's Rook Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

   // Black's Rook  Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black's Rook Right
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
// Black Rook's Left
for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

}
else if (pieceUnicode === "&#9814;")// White Rook Logic
  {

 //White's Rook Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
 
}
//White's Rook  Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } 
  else  {
    possiblePosition.classList.add("target");
   if(  getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}

    break;
  }
}
// White's Rook Right
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } 
  else  {
    possiblePosition.classList.add("target");
    if(getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
}
// White Rook's Left
for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
     break;}
    break;
  } 
}

}

  //Bishops
 else if (pieceUnicode==="&#9821;") // Black  Bishop's Logic

{

  // Black Bishop's  Down-left direction → row++, col--
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

  // Black Bishop's Down-right direction → row++, col++
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
 
// Black Bishop's  Up-right direction → row--, col++
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

 //Black Bishop's Up-left direction → row--, col--
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
else if (pieceUnicode==="&#9815;") // White Bishop's Logic
{
 
     // White Bishop's  Down-left direction → row++, col--
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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


  // White Bishop's Down-right direction → row++, col++
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
 
// White Bishop's  Up-right direction → row--, col++
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

 // White Bishop's Up-left direction → row--, col--
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Queens
else if (pieceUnicode==="&#9819;") // Black Queen's Logic
{

  
 // Black Queen's Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Right
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Left
for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

  // Black Queen's Down-left direction → row++, col--
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Down-right direction → row++, col++
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Up-right direction → row--, col++
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Black Queen's Up-left direction → row--, col--
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
else if (pieceUnicode==="&#9813;") // White Queen's Logic
{

    //White's Queen Up
for (let row = row1 - 1; row >= 0; row--) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
 
}

         //White's Queen  Down
for (let row = row1 + 1; row < 8; row++) {
  let possiblePosition = boardSquares[row][col1];
  if (boardSquares[row][col1].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } 
  else  {
    possiblePosition.classList.add("target");
   if(  getPieceUnicode(pieces[row][col1]) === "&#9812;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9813;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9814;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9815;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9816;" ||
  getPieceUnicode(pieces[row][col1]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}

    break;
  }
}

// White's Queen Right
for (let col = col1 + 1; col < 8; col++) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } 
  else  {
    possiblePosition.classList.add("target");
    if(getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
      break;}
    break;
  }
}
// White Queen's Left
for (let col = col1 - 1; col >= 0; col--) {
  let possiblePosition = boardSquares[row1][col];
  if (boardSquares[row1][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
  } else  {
    possiblePosition.classList.add("target");
    if(  getPieceUnicode(pieces[row1][col]) === "&#9812;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9813;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9814;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9815;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9816;" ||
  getPieceUnicode(pieces[row1][col]) === "&#9817;" ){
      possiblePosition.classList.remove("target");
     break;}
    break;
  } 
}


     // White Queen's  Down-left direction → row++, col--
for (let row = row1 + 1, col = col1 - 1; row < 8 && col >= 0; row++, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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


  // White Queen's Down-right direction → row++, col++
for (let row = row1 + 1, col = col1 + 1; row < 8 && col < 8; row++, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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
 
// White Queen's  Up-right direction → row--, col++
for (let row = row1 - 1, col = col1 + 1; row >= 0 && col < 8; row--, col++) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

 // White Queen's Up-left direction → row--, col--
for (let row = row1 - 1, col = col1 - 1; row >= 0 && col >= 0; row--, col--) {

  let possiblePosition = boardSquares[row][col];

  if (boardSquares[row][col].innerHTML === "") {
    possiblePosition.classList.add("possible");
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

// Knights
else if (pieceUnicode==="&#9822;") // Black Knight's Logic
{

  // All 8 potential knight L-moves
  const moves = [
    [row1 - 2, col1 - 1], [row1 - 2, col1 + 1],
    [row1 - 1, col1 - 2], [row1 - 1, col1 + 2],
    [row1 + 1, col1 - 2], [row1 + 1, col1 + 2],
    [row1 + 2, col1 - 1], [row1 + 2, col1 + 1]
  ];

  for (let [r, c] of moves) {
    // Skip if out of board range
    if (r < 0 || r > 7 || c < 0 || c > 7) continue;

    const possiblePosition = boardSquares[r][c];
    const targetPiece = getPieceUnicode(pieces[r][c]);

    // If empty square → mark as possible
    if (targetPiece === "") {
      possiblePosition.classList.add("possible");
    } 
    else {
      // Check if target is white (enemy)
      if (
        targetPiece === "&#9812;" || // white rook
        targetPiece === "&#9813;" || // white knight
        targetPiece === "&#9814;" || // white bishop
        targetPiece === "&#9815;" || // white queen
        targetPiece === "&#9816;" || // white king
        targetPiece === "&#9817;"    // white pawn
      ) {
        possiblePosition.classList.add("target");
      }
    }
  }

}
else if(pieceUnicode==="&#9816;")  // White Knight's Logic
{

  // All 8 potential knight L-moves
  const moves = [
    [row1 - 2, col1 - 1], [row1 - 2, col1 + 1],
    [row1 - 1, col1 - 2], [row1 - 1, col1 + 2],
    [row1 + 1, col1 - 2], [row1 + 1, col1 + 2],
    [row1 + 2, col1 - 1], [row1 + 2, col1 + 1]
  ];

  for (let [r, c] of moves) {
    // Skip if out of board range
    if (r < 0 || r > 7 || c < 0 || c > 7) continue;

    const possiblePosition = boardSquares[r][c];
    const targetPiece = getPieceUnicode(pieces[r][c]);

    // If empty square → mark as possible
    if (targetPiece === "") {
      possiblePosition.classList.add("possible");
    } 
    else {
      // Check if target is black (enemy)
      if (
        targetPiece === "&#9820;" || // black rook
        targetPiece === "&#9822;" || // black knight
        targetPiece === "&#9821;" || // black bishop
        targetPiece === "&#9819;" || // black queen
        targetPiece === "&#9818;" || // black king
        targetPiece === "&#9823;"    // black pawn
      ) {
        possiblePosition.classList.add("target");
      }
    }
  }

}

//Kings
else if(pieceUnicode==="&#9818;") // Black King's Logic
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
// -------------------- Pawn Logic --------------------
if (pieceUnicode === "&#9823;") { // black pawn (moves down the board)
  // Forward move (one square)
  if (row1 + 1 < 8 && boardSquares[row1 + 1][col1].innerHTML === "") {
    boardSquares[row1 + 1][col1].classList.add("possible");

    // Two-square move (first move only)
    if (row1 === 1 && boardSquares[row1 + 2][col1].innerHTML === "") {
      boardSquares[row1 + 2][col1].classList.add("possible");
    }
  }

  // Capture diagonally left
  if (row1 + 1 < 8 && col1 - 1 >= 0) {
    let targetPiece = pieces[row1 + 1][col1 - 1];
    if (targetPiece !== "" && isWhitePiece(targetPiece)) {
      boardSquares[row1 + 1][col1 - 1].classList.add("target");
    }
  }

  // Capture diagonally right
  if (row1 + 1 < 8 && col1 + 1 < 8) {
    let targetPiece = pieces[row1 + 1][col1 + 1];
    if (targetPiece !== "" && isWhitePiece(targetPiece)) {
      boardSquares[row1 + 1][col1 + 1].classList.add("target");
    }
  }
}


// -------------------- White Pawn Logic --------------------
else if (pieceUnicode === "&#9817;") { // white pawn (moves up the board)

  // Forward move (one square)
  if (row1 - 1 >= 0 && boardSquares[row1 - 1][col1].innerHTML === "") {
    boardSquares[row1 - 1][col1].classList.add("possible");

    // Two-square move (first move only)
    if (row1 === 6 && boardSquares[row1 - 2][col1].innerHTML === "") {
      boardSquares[row1 - 2][col1].classList.add("possible");
    }
  }


  // Capture diagonally left
  if (row1 - 1 >= 0 && col1 - 1 >= 0) {
    let targetPiece = pieces[row1 - 1][col1 - 1];
    if (targetPiece !== "" && isBlackPiece(targetPiece)) {
      boardSquares[row1 - 1][col1 - 1].classList.add("target");
    }
  }

  // Capture diagonally right
  if (row1 - 1 >= 0 && col1 + 1 < 8) {
    let targetPiece = pieces[row1 - 1][col1 + 1];
    if (targetPiece !== "" && isBlackPiece(targetPiece)) {
      boardSquares[row1 - 1][col1 + 1].classList.add("target");
    }
  }



}




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

        // Rook Selected 
        if (getPieceUnicode(fromPiece) === "&#9820;" || getPieceUnicode(fromPiece) === "&#9814;") 
          {

          if (islegalmoveR(selectedRow, selectedCol, row, col)) {

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
         // Bishop Selected
         else if (getPieceUnicode(fromPiece) === "&#9821;" || getPieceUnicode(fromPiece) === "&#9815;"){
   
          if (islegalmoveB(selectedRow, selectedCol, row, col)) {

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
        // Queen Selected 
         else if (getPieceUnicode(fromPiece) === "&#9819;" || getPieceUnicode(fromPiece) === "&#9813;"){
 
          if (islegalmoveQ(selectedRow, selectedCol, row, col)) {

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
          // Knight Selected
       else if (getPieceUnicode(fromPiece) === "&#9822;" || getPieceUnicode(fromPiece) === "&#9816;"){

          if (islegalmoveN(selectedRow, selectedCol, row, col)) {

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
         // King Selected
       else if (getPieceUnicode(fromPiece) === "&#9818;" || getPieceUnicode(fromPiece) === "&#9812;"){
           
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

       else if (getPieceUnicode(fromPiece) === "&#9823;" || getPieceUnicode(fromPiece) === "&#9817;")
       {
          
          if (islegalmoveP(selectedRow, selectedCol, row, col)) {

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
            
            //

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
