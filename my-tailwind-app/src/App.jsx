import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Post from './pages/post'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/post" element={<Post/>}></Route>
        </Routes>
      </BrowserRouter>

    </div >
  )
}

export default App
