import express from 'express'
const app = new express()
import allPossibleMoves from './all_possible_moves'
const numberTurns = 2


app.get('/', (req, res) => {
    const possibleMovesTurn1 = allPossibleMoves[ req.query.pos ]
    let possibleMovesNextTurns = [
        possibleMovesTurn1
    ]

    if ( possibleMovesTurn1 === undefined ) {
        res.status(400).send('Invalid or undefined chess coordinate')
        return
    }

    for ( let turn = 1; turn < numberTurns; turn++ ) {
        let possibleMovesNextTurn = []
        const lastTurn = possibleMovesNextTurns[ possibleMovesNextTurns.length - 1 ]

        for ( let coordinate of lastTurn ) {
            possibleMovesNextTurn.push( ...allPossibleMoves[ coordinate ] )
        }

        possibleMovesNextTurns.push( possibleMovesNextTurn )
    }

    res.send( possibleMovesNextTurns )
});

app.listen(8080, () => {
    console.log( 'Server Running!' )
});

export default app;
