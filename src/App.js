import React from 'react';

import './App.css';

import Home from './pages/home/home.component';
import Course from './pages/course/course.component'
import School from './pages/school/school.component';
import { Routes, Route } from 'react-router-dom';

import TestHome from './pages/test-home/test-home';

const App = () => (
  <div className="App" >
    <Routes>
      <Route path="/" element={<TestHome />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/course/:course" element={<Course />} />
      <Route path="/school/:school" element={<School />} />
    </Routes>
  </div>
)

export default App;


