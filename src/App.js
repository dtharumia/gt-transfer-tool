import React from 'react';

import './App.css';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
// import TRANSFER_DATA from './data/transfer';


class App extends React.Component {

  constructor() {
    console.log(process.env.DB_HOST)
    super();
    this.state = {
      transfers: [],
      searchField: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/api")
    .then((response) => response.json())
    .then(response => console.log(response))
  }


  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  }
  render() {

    const { transfers, searchField } = this.state;

    const filteredTransfers = transfers.filter(transfer =>
      transfer.gt_class.toUpperCase().includes(searchField.toUpperCase())
    )

    return (
      <div className="App" >
        <h1>Georgia Tech Transfer Tool</h1>
        <SearchBox onSearchChange={this.onSearchChange} />
        <CardList transfers={this.state.searchField ? filteredTransfers : []} />
      </div>
    )
  }
}
export default App;


