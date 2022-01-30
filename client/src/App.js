import React from 'react';

import Home from './pages/home/home';
import Course from './pages/course/course'
import School from './pages/school/school';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/course/:course" element={<Course />} />
    <Route path="/school/:school" element={<School />} />
  </Routes>
)

export default App;


