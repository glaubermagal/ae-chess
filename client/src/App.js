import React, { Component } from 'react';
import classNames from 'classnames';
import './compiled/App.css';


function Cell(props) {
    const classes = classNames("chess-board--cell", {
        'selected': props.coordinate === props.selected,
        'highlight': props.highlighted.includes(props.coordinate),
        [props.coordinate]: true
    });

    return (
        <button className={classes} onClick={props.onClick}> </button>
    );
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.cols = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]
        this.rows = [ 1, 2, 3, 4, 5, 6, 7, 8 ]
    }

    renderCol(col, row) {
        return (
            <Cell
                key={`${col}${row}`}
                coordinate={`${col}${row}`}
                selected={this.props.selected}
                highlighted={this.props.highlighted}
                onClick={() => this.props.onClick(`${col}${row}`)}
            />
        );
    }

    renderRow(row) {
        return (
            <div className="chess-board--row" key={row}>
                {this.cols.map((col, index) =>
                    this.renderCol(col, row)
                )}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.rows.map((row, index) =>
                    this.renderRow(row)
                )}
            </div>
        );
    }
}

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            possible_moves: [],
            moving_class: "",
            highlighted: []
        };
    }

    callApi = async (coordinate) => {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/?pos=${coordinate}`);

        let text = await resp.text();
        let data = null;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error(`Invalid json\n${e}`);
        }

        if (resp.status !== 200) {
            throw Error( data.message );
        }

        return data;
    };

    movePiece(coordinate, possible_moves) {
        if (this.state.selected) {
            const diff_x = coordinate[0].charCodeAt(0) - this.state.selected[0].charCodeAt(0);
            const diff_y = coordinate[1] - this.state.selected[1];
            let movingClass = '';

            if (diff_x === 1 && diff_y === -2) {
                movingClass = 'move-up-right'
            }
            if (diff_x === -1 && diff_y === -2) {
                movingClass = 'move-up-left'
            }
            if (diff_x === 1 && diff_y === 2) {
                movingClass = 'move-down-right'
            }
            if (diff_x === -1 && diff_y === 2) {
                movingClass = 'move-down-left'
            }
            if (diff_x === 2 && diff_y === -1) {
                movingClass = 'move-right-up'
            }
            if (diff_x === 2 && diff_y === 1) {
                movingClass = 'move-right-down'
            }
            if (diff_x === -2 && diff_y === -1) {
                movingClass = 'move-left-up'
            }
            if (diff_x === -2 && diff_y === 1) {
                movingClass = 'move-left-down'
            }

            this.setState({
                moving_class: movingClass,
            });
        }

        setTimeout(() => {
            this.setState({
                moving_class: "",
                selected: coordinate,
                possible_moves: possible_moves,
            })
        }, 300)
    }

    highlightPossibleMoves() {
        if (!this.state.selected) {
            return
        }

        this.setState({
            highlighted: this.state.possible_moves[0],
        })
        setTimeout(() => {
            this.setState({
                highlighted: this.state.possible_moves[1],
            })
            setTimeout(() => {
                this.setState({
                    highlighted: [],
                })
            }, 1000)
        }, 1000)
    }

    handleClick(coordinate) {

        if ( this.state.possible_moves.length > 0 && !this.state.possible_moves[0].includes(coordinate) ) {
            return
        }

        this.callApi(coordinate)
            .then(res => {
                this.movePiece(coordinate, res);
            })
            .catch(err => {
                alert(err)
            });
    }

    render() {
        const classes = classNames("chess-board", {
            'move-up-right': this.state.moving_class === 'move-up-right',
            'move-up-left': this.state.moving_class === 'move-up-left',
            'move-down-right': this.state.moving_class === 'move-down-right',
            'move-down-left': this.state.moving_class === 'move-down-left',
            'move-right-up': this.state.moving_class === 'move-right-up',
            'move-right-down': this.state.moving_class === 'move-right-down',
            'move-left-up': this.state.moving_class === 'move-left-up',
            'move-left-down': this.state.moving_class === 'move-left-down',
        });

        return (
            <div className="chess">
                <div className={classes}>
                    <Board
                        selected={this.state.selected}
                        highlighted={this.state.highlighted}
                        onClick={coordinate => this.handleClick(coordinate)}
                    />
                </div>
                <button
                    className="button-highlight"
                    onClick={() => this.highlightPossibleMoves()}>
                    highlight two turns
                </button>
            </div>
        );
    }
}

export default Game;
