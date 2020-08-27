import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enteredNumber: {
        value: '',
        error: null
      },

      calculatedNumber: {
        value: '',
        error: null
      }
    };
  }

  handleChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: { value }
    });
  };

  add(str1, str2) {

    let sum = "";  // our result will be stored in a string.

    // we'll need these in the program many times.
    let str1Length = str1.length;
    let str2Length = str2.length;

    // if s2 is longer than s1, swap them.
    if(str2Length > str1Length ){
      let temp = str2;
      str2 = str1;
      str1 = temp;
    }

    let carry = 0;  // number that is carried to next decimal place, initially zero.
    let a;
    let b;
    let temp;
    let digitSum;
    for (let i = 0; i < str1.length; i++) {
      a = parseInt(str1.charAt(str1.length - 1 - i));      // get ith digit of str1 from right, we store it in a
      b = parseInt(str2.charAt(str2.length - 1 - i));      // get ith digit of str2 from right, we store it in b
      b = (b) ? b : 0;                                    // make sure b is a number, (this is useful in case, str2 is shorter than str1
      temp = (carry + a + b).toString();                  // add a and b along with carry, store it in a temp string.
      digitSum = temp.charAt(temp.length - 1);            //
      carry = parseInt(temp.substr(0, temp.length - 1));  // split the string into carry and digitSum ( least significant digit of abSum.
      carry = (carry) ? carry : 0;                        // if carry is not number, make it zero.

      sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;  // append digitSum to 'sum'. If we reach leftmost digit, append abSum which includes carry too.

    }

    return sum;     // return sum

  }

  calculateFactorial = (e) => {

    e.preventDefault();

    const { enteredNumber, calculatedNumber } = this.state;

    let fact = 1;
    let n = parseInt(enteredNumber.value);

    for (let i = 2; i <= n; i++){

      if(Number.isSafeInteger(fact*i)){
        fact = fact * i;
      }
      else {
        //fact = fact + fact + .. i times
        let factxi = "0";  // this is (fact * i) for us.
        for(let j = 0; j < i; j++){
          factxi = this.add(factxi,fact.toString());
        }
        fact = factxi; // update value of fact before continuing the loop.
      }
    }

    calculatedNumber.value = fact.toString(10);

    this.setState({calculatedNumber});

    return false;
  }
  render() {
    const { enteredNumber, calculatedNumber } = this.state;

    return (
        <div>
          <h1>Factorial Calculator</h1>
          <form>
            <input
                type="number"
                placeholder="Enter a number..."
                value={enteredNumber.value}
                onChange={e => this.handleChange(e)}
                name="enteredNumber"
            />
            <br/>
            <button onClick={e => this.calculateFactorial(e)}>Calculate Factorial</button>
          </form>
          <h2>Factorial: {calculatedNumber.value}</h2>
        </div>
    );
  }
}

export default App;
