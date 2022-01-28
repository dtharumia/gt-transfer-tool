import React from 'react';

import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { searchClient } from '../../typesenseAdapter';
import TransferHits from './transfer-hits';


const TestHome = () => (
  <div className="TestHome" >
    
    <InstantSearch indexName={schools}  searchClient={searchClient}>
    <h4>Search Transfer Courses</h4>
    <SearchBox/>
    <TransferHits/>
    </InstantSearch>
  </div>
)

export default TestHome;


