let allPossibleMoves = {};
const dictionaryXChars = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

for ( let x = 1; x <= 8; x++ ) {
	for( let y = 1; y <= 8; y++ ) {
		let possiblePositions = [];

		const Right_Up = { 'x': x + 2, 'y': y + 1};
		const Right_Down = { 'x': x + 2, 'y': y - 1};

		const Down_Right = { 'x': x + 1, 'y': y - 2};
		const Down_Left = { 'x': x - 1, 'y': y - 2};

		const Left_Up = { 'x': x - 2, 'y': y + 1};
		const Left_Down = { 'x': x - 2, 'y': y - 1};

		const Up_Right = { 'x': x + 1, 'y': y + 2};
		const Up_Left = { 'x': x - 1, 'y': y + 2};

		if ( (Right_Up.x >= 1 && Right_Up.y >= 1) && (Right_Up.x <= 8 && Right_Up.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Right_Up.x - 1]}${Right_Up.y}` )
		}
		if ( (Right_Down.x >= 1 && Right_Down.y >= 1) && (Right_Down.x <= 8 && Right_Down.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Right_Down.x - 1]}${Right_Down.y}` )
		}

		if ( (Down_Right.x >= 1 && Down_Right.y >= 1) && (Down_Right.x <= 8 && Down_Right.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Down_Right.x - 1]}${Down_Right.y}` )
		}
		if ( (Down_Left.x >= 1 && Down_Left.y >= 1) && (Down_Left.x <= 8 && Down_Left.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Down_Left.x - 1]}${Down_Left.y}` )
		}

		if ( (Left_Up.x >= 1 && Left_Up.y >= 1) && (Left_Up.x <= 8 && Left_Up.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Left_Up.x - 1]}${Left_Up.y}` )
		}
		if ( (Left_Down.x >= 1 && Left_Down.y >= 1) && (Left_Down.x <= 8 && Left_Down.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Left_Down.x - 1]}${Left_Down.y}` )
		}

		if ( (Up_Right.x >= 1 && Up_Right.y >= 1) && (Up_Right.x <= 8 && Up_Right.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Up_Right.x - 1]}${Up_Right.y}` )
		}
		if ( (Up_Left.x >= 1 && Up_Left.y >= 1) && (Up_Left.x <= 8 && Up_Left.y <= 8) ) {
			possiblePositions.push( `${dictionaryXChars[Up_Left.x - 1]}${Up_Left.y}` )
		}

		allPossibleMoves[ `${dictionaryXChars[x - 1]}${y}` ] = possiblePositions
	}
}

module.exports = allPossibleMoves;
