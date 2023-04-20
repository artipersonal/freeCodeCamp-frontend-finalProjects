import './App.css';
import React from 'react';
import { evaluate } from 'mathjs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formula: "", status: true, lastOperand: "0" };
  }

  handleClick = (event) => {
    this.setState((prevState) => {

      // check for AC first
      if (event.target.value === "AC") { return { formula: "", lastOperand: "0", status: true } }
      // Check for errors then - no further actions if there was an error

      else if (prevState.status) {
        // check for equals if user wants to receive a result
        if (/=/.test(event.target.value)) {
          // Then trying to evaluate
          try {
            let result = evaluate(prevState.formula);
            return { formula: `${prevState.formula}=${result}`, lastOperand: result };
          }
          // if error - close calculator for further actions
          catch (error) { console.log(error); return { formula: "ERROR", lastOperand: "ERROR", status: false } }
        }
        // if number or other: check if we calculated results already
        else if (/=/.test(prevState.formula)) {
          // if yes - take the last formula and continue
          return { formula: prevState.formula.slice(prevState.formula.indexOf("=") + 1,) + event.target.value, lastOperand: event.target.value }
        }
        // if no previous calculations or we just continue ours - then check for mistakes and add to formula
        // first check for operands
        else if (/[\-\+\/\*]/.test(event.target.value)) {
          // if this is an operand - check previous to escape doubling operations
          // check for +- already in the formula. If next character is another symbol - then remove +-...
          if (/[\-\+\/\*][\-\+\/\*]/.test(prevState.formula.slice(prevState.formula.length - 2,))) {
            return { formula: prevState.formula.slice(0, prevState.formula.length - 2) + event.target.value, lastOperand: event.target.value }
          }
          // check for + in the last character to approve - next.
          if ((/[\+\/\*]/.test(prevState.lastOperand) && (event.target.value === "-")) && (prevState.lastOperand !== event.target.value)) {
            return { formula: prevState.formula + event.target.value, lastOperand: event.target.value }
          }
          // if there is another operator previously - remove it and change, otherwise - add value
          else {
            return (/[\+\-\/\*.]/.test(prevState.formula.slice(prevState.formula.length - 1,)))
              ? { formula: prevState.formula.slice(0, prevState.formula.length - 1) + event.target.value, lastOperand: event.target.value }
              : { formula: prevState.formula + event.target.value, lastOperand: event.target.value };
          }
        }
        // that means we received either . or number - check for the dot
        else if (event.target.value === ".") {
          // if dot - check for previous character. If it is a number - continue to add or add 0 and continue otherwise
          if (/[\+\-\/\*]/.test(prevState.formula.slice(prevState.formula.length - 1,))) {
            return { formula: prevState.formula + "0" + event.target.value, lastOperand: "0" + event.target.value }
          }
          else {

            // if (prevState.lastOperand.indexOf(".") !== -1)) {
            if ((prevState.lastOperand === "0")) {
              return { formula: prevState.formula + event.target.value, lastOperand: prevState.lastOperand + event.target.value }
            }
            else {
              return ((prevState.lastOperand.indexOf(".") === -1) && (prevState.lastOperand !== "0") && (prevState.formula.slice(prevState.formula.length - 1,) !== "."))
                ? { formula: prevState.formula + event.target.value, lastOperand: prevState.lastOperand + event.target.value }
                : {};
            }
          }
        }
        // if number- should check for 0 in the start first or previous operands in lastOperand to change it completely
        else {
          if ((prevState.lastOperand === "0") || (/[\+\-\/\*]/.test(prevState.lastOperand))) {
            if ((prevState.lastOperand === "0") && (/[\+\-\*\/]?0*[^\.]$/.test(prevState.formula))) {
              return { formula: prevState.formula, lastOperand: event.target.value };
            }
            else {
              return (/[\d]/.test(prevState.formula))
                ? { formula: prevState.formula + event.target.value, lastOperand: event.target.value }
                : { formula: event.target.value, lastOperand: event.target.value };
            }
          }
          // if all is OK - add 
          else {
            // if only operands and no numbers - then change:
            return { formula: prevState.formula + event.target.value, lastOperand: prevState.lastOperand + event.target.value };
          }
        }
      }
    })
  };

  render() {
    return (
      <div id="App">
        <div id="calculator">
          <div id="display-container">
            <div id="display-formula">{this.state.formula}</div>
            <div id="display">{this.state.lastOperand}</div>
          </div>
          <div id="buttons">
            <button id="clear" value="AC" onClick={this.handleClick}>AC</button>
            <button id="divide" value="/" onClick={this.handleClick}>/</button>
            <button id="multiply" value="*" onClick={this.handleClick}>X</button>
            <button id="seven" value="7" onClick={this.handleClick}>7</button>
            <button id="eight" value="8" onClick={this.handleClick}>8</button>
            <button id="nine" value="9" onClick={this.handleClick}>9</button>
            <button id="subtract" value="-" onClick={this.handleClick}>-</button>
            <button id="four" value="4" onClick={this.handleClick}>4</button>
            <button id="five" value="5" onClick={this.handleClick}>5</button>
            <button id="six" value="6" onClick={this.handleClick}>6</button>
            <button id="add" value="+" onClick={this.handleClick}>+</button>
            <button id="one" value="1" onClick={this.handleClick}>1</button>
            <button id="two" value="2" onClick={this.handleClick}>2</button>
            <button id="three" value="3" onClick={this.handleClick}>3</button>
            <button id="equals" value="=" onClick={this.handleClick}>=</button>
            <button id="zero" value="0" onClick={this.handleClick}>0</button>
            <button id="decimal" value="." onClick={this.handleClick}>.</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
