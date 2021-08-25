import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// how props and onclick flow the date, can we do it in java, how differnt it would be, how js was created clouser and prototype
// how facbook alien did it
// css, unix, sql

// while creating data defination language quries we have to specify the 'table' keyword as we could be defining table or
// database etc.
// for data manuplation langugae we already know its a table so we don't have to specify the keyword table
// and in DML we have 'insert into', 'update', 'delete from' etc.
//
/*

import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    interface Clickable{
        void clicked();
    }
    interface Clickable2{
        void clicked(int i);
    }
    static class Square{
        Clickable clickable;
        public Square(Clickable clickable){
            System.out.println("Square created");
            this.clickable = clickable;
        }

        public void draw(){
            System.out.println("drawing Square");
        }

        public void onClick(){

            System.out.println("clicked Square");
            clickable.clicked();
        }

    }

    static class Board{

        ArrayList<Square> squares;
        public Board(ArrayList<Character> state, Clickable2 clickable2){
            System.out.println("Board created");
            squares = new ArrayList<>();
            for (int i = 0; i < 9; i++) {
                int finalI = i;
                squares.add(new Square(new Clickable() {
                    @Override
                    public void clicked() {
                        System.out.println("Board: square "+ finalI + "Clicked");
                        clickable2.clicked(finalI);
                    }
                }));
            }
        }
        public void draw(){
            for (Square s: squares) {
                s.draw();
            }
        }

    }

    static class Game{

        ArrayList<ArrayList<Character>> history;
        Board board;
        public Game(){
            history = new ArrayList<>();
            System.out.println("Game created");
            history.add(new ArrayList<>(Arrays.asList(' ','X','O',' ','X',' ')));
            board = new Board(history.get(0), new Clickable2() {
                @Override
                public void clicked(int i) {
                    System.out.println("Game: square "+ i + "Clicked");
                }
            });
    }
        public void draw(){
            board.draw();
        }
    }



    public static void main(String[] args) {
        System.out.println("hello");
        new Game().draw();
    }
}

*/

// first principle draw on state change :)

// square: component represents the one single block of tic-tac-toe
class Square extends React.Component {
  constructor(props) {
    super(props);
    console.log("Square constructor");
    console.log(props);
  }

  // render function each component need render
  // returns the html that will be rendered
  render() {
    return (
      // onclick will call : whatever onlick is defined for this element in "props"
      // props are defined inside Board components while creating this components
      // props are given inside <Square> tag in 'renderSquare' method

      // IMP if we use arrow function in onClick that mean we are preserving this contex
      // because arrow function don't have there own 'this' of if we use this in next function this will propagate from privious contex
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    // this is irrelevant as 'react' is writtern as 'function programing' so when props get updated it create another copy of props
    // and we are storing the reference of the props only one time when construnctor is called
    // as constructor will be called only one time, at the start
    // after we clicked the button 'props' is changed with new instance (as it is const) (functional programing stuff..) and constructor is not called.
    this.squares = this.props.value.squares;
    this.isXnext = this.props.value.isXnext;
  }

  renderSquare(i) {
    // Here we create Square component instance
    // in this 'onClick' is very interesting as it example of 'clouser' being used
    // note we are passing a function to onClick, which takes 'i' as argument, which is closed under the function at the time of creation
    // so not this function will be 'passed to Square component props' whenever it will call the function i will be stored as it was given
    return (
      <Square
        value={this.props.value.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  // Boards rendre method
  render() {
    // calculate the winner using 'Boards current state' which is in 'squares' passed in props.
    const winner = calculateWinner(this.props.value.squares);

    let status;
    if (winner) {
      status = "winner is " + winner;
    } else {
      // if no one has won, check who is next, which is also passed through isXnext form props
      status = "Next player: " + (this.props.value.isXnext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Game component
class Game extends React.Component {
  constructor(props) {
    super(props);

    // we 'store' all the 'game states' inside the Game component
    // in functional programing, state gives us the proper way to 'interact with world' and 'maintaing changing states'.
    this.state = {
      // all the board position till now, with wo was playing at that state
      history: [
        {
          squares: Array(9).fill(null),
          isXnext: true
        }
      ],
      // current step number, so we can jump position and keep track
      stepNumber: 0
    };
  }

  // finally the click function we was talking about from start
  // this is the click function which is chained down form Square component through Bord to now Game
  // click go 'i' which was given while instantiating Square 'through clouser', let's update the states of game
  clicked(i) {
    // as soon as button is clicked, if we are navegating throught the history
    // we will snap to the current histroy in which we clicked the Square
    // i.e all the history beyound it is sliced..
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    // get the lettest state
    const state = history[history.length - 1];

    // take the copy of square(array of state 'X' or 'O'), slice with no parameter clone the array
    // 'note' we are taking the 'clone' as we are 'having immutable data', as 'functional programing'.
    const squares = state.squares.slice();

    // if won or already X or O
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // perform X or O
    squares[i] = state.isXnext ? "X" : "O";

    // change next, or create new one ;) const stuff FP
    const isXnext = !state.isXnext;

    // change the game state, all the newly updated values
    // note we did not change any values our, we created new one's, 'new squares', 'new isXnext'
    // now we set all this new values to current state
    this.setState({
      // append to history by current history
      history: history.concat([
        {
          squares: squares,
          isXnext: isXnext
        }
      ]),
      // step next is the lettest number
      stepNumber: history.length
    });
  }

  // jump to the step, just by setting the 'stepNumber' to state.
  // we will 'only render' till the stepNumber
  jumpto(move) {
    this.setState({
      stepNumber: move
    });
  }

  render() {
    // get history form state
    const history = this.state.history;

    // only render till the stepNumber
    const state = history[this.state.stepNumber];

    // Map through the history and 'create the jump buttons'
    const moves = history.map((step, move) => {
      const buttonstr = move ? "jump to " + move + " move" : "jump to start";
      return (
        <li>
          <button onClick={() => this.jumpto(move)}>{buttonstr}</button>
        </li>
      );
    });

    // calulate the winner
    const winner = calculateWinner(state.squares);
    let status;
    if (winner) {
      status = "winner is " + winner;
    } else {
      status = "Next player: " + (state.isXnext ? "X" : "O");
    }

    // rendre it all
    return (
      <div className="game">
        <div className="game-board">
          <Board value={state} onClick={i => this.clicked(i)} />
        </div>
        <div className="game-info">
          {/* show winner */}
          <div>{status}</div>
          {/* show jump buttons */}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// calculate winner function no one care ;)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
