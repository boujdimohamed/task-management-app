import { useState } from 'react'
import TaskList from './components/TaskList'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TaskList />
    </>
  )
}

export default App
