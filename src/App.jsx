import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Header from './components/Header'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="px-8 py-2">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </Router>

    </div>
  )
}

export default App
