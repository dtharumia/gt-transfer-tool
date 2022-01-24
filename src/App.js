import React from 'react';

import './App.css';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
// import TRANSFER_DATA from './data/transfer';

import { readCoursesfromDatabase } from './firebase/firebase_utils';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      transfers: [],
      transferCourses: [],
      searchField: ""
    }
  }

  componentDidMount() {
    readCoursesfromDatabase()
      .then((e) => this.setState({ transferCourses: Object.keys(e) }))
  }


  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  }
  render() {

    const { transfers, transferCourses, searchField } = this.state;

    // const filteredTransfers = transfers.filter(transfer =>
    //   transfer.gt_class.toUpperCase().includes(searchField.toUpperCase())
    // )

    const filteredTransfers = transferCourses.filter(transfer =>
      transfer.toUpperCase().includes(searchField.toUpperCase())
    )

    console.log(filteredTransfers)

    return (
      <div className="App" >
        <h1>Georgia Tech Transfer Tool</h1>
        <SearchBox onSearchChange={this.onSearchChange} />
        {/* <CardList transfers={this.state.searchField ? filteredTransfers : []} /> */}
      </div>
    )
  }
}
export default App;


