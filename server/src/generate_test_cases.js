const fs = require( 'fs' )
const allPossibleMoves = require( './all_possible_moves' );
let allPossibleMovesPerCell = {}


for ( let coordinateTurn in allPossibleMoves ) {
	const allPossibleMovesTurn1 = allPossibleMoves[ coordinateTurn ];
	let allPossibleMovesTurn2 = [];

	for ( let coordinateTurn1 of allPossibleMovesTurn1 ) {
		allPossibleMovesTurn2.push( ...allPossibleMoves[ coordinateTurn1 ] )
	}

	allPossibleMovesPerCell[ coordinateTurn ] = {
		'turns': [
			allPossibleMovesTurn1,
            allPossibleMovesTurn2
		]
	}
}

fs.writeFile( 'src/all_possible_moves.json', JSON.stringify( allPossibleMovesPerCell, null, 4 ), 'utf8' );
