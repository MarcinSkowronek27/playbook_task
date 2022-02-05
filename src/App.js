import React from 'react';
// import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, name: "New book about Rust", amount: 150 }
      ],
      euroRate: 4.382,
      inputTitle: '',
      inputAmount: '',
      sum: 150,
    };
  }

  handleChangeTitle = (e) => {
    e.preventDefault();
    this.setState({ inputTitle: e.target.value });
  }
  handleChangeAmount = (e) => {
    e.preventDefault();
    this.setState({ inputAmount: e.target.value });
  }

  handleAddExp = () => {
    let inputTitle = this.state.inputTitle;
    let inputAmount = this.state.inputAmount;
    let pattern = "^[1-9][1-9]*[.]?[1-9]{0,2}$";
    if (inputTitle.length < 5) {
      alert('Title should have at least 5 characters');
    } else if (inputAmount.search(",") !== -1) {
      alert('Amount should have only decimal point, not comma');
    } else if (inputAmount.match(pattern) === null) {
      alert('Amount should have only digits and 2 digits after decimal point');
    }
    else {
      this.setState({
        expenses: [...this.state.expenses, { id: this.state.expenses.length + 1, name: this.state.inputTitle, amount: this.state.inputAmount }],
      })
    }
  }

  deleteCell = (id) => {
    let filteredExpenses = this.state.expenses.filter(item => item.id !== id);
    this.setState({
      expenses: filteredExpenses,
    });
  }

  takeSumPln = () => {
    let sum = 0;
    this.state.expenses.forEach(item => {
      sum += Number(item.amount);
    })
    return Math.round(sum * 100) / 100;
  }

  takeSumEur = () => {
    let sum = Math.round(this.takeSumPln() / this.state.euroRate * 100) / 100;
    return sum;
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="titleDiv">
          <h1>List of expenses</h1>
          <p>1 EUR = {this.state.euroRate} PLN</p>
        </div>
        <div className="inputBoxTitle">
          <h4>Title of transaction</h4>
          <input
            type="text"
            name="name"
            autoComplete="off"
            minLength="5"
            onChange={(e) => this.handleChangeTitle(e)}
          ></input>
        </div>
        <div className="inputBoxAmount">
          <h4>Amount (in PLN)</h4>
          <input
            autoComplete="off"
            type="text"
            name="amount"
            onChange={(e) => this.handleChangeAmount(e)}
          ></input>
          <button onClick={this.handleAddExp}>Add</button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Amount (PLN)</TableCell>
                <TableCell align="center">Amount (EUR)</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.expenses.map((expense) => (
                <StyledTableRow
                  key={expense.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="tableContent"
                >
                  <TableCell component="th" scope="row">
                    {expense.name}
                  </TableCell>
                  <TableCell align="center">{expense.amount}</TableCell>
                  <TableCell align="center">{Math.round(expense.amount / this.state.euroRate * 100) / 100}</TableCell>
                  <TableCell align="center"><button onClick={e => this.deleteCell(expense.id)}>Delete</button></TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="divSum">
          Sum: {this.takeSumPln()} PLN ({this.takeSumEur()} EUR)
        </div>
      </div>
    );
  }
}

export default App;
