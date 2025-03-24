import { Link, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './page/Homepage'
import ListTask from './page/Listtask'
import DetailTasks from './page/DetailTasks'
import Header from './components/header/Header'

function App() {

  return (
    <>
      <nav>
        <Header/>
        <ul className="flex justify-between items-center p-5">
          <li ><Link className='text-[1.5rem] font-medium' to="/">List your tasks</Link></li>
          {/* <li><Link to="/task/:id">Tasks Details</Link></li> */}
          <li className='p-2 border-2 rounded-2xl border-purple-600 text-[1rem]'><Link to="/create">Create new task +</Link></li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<ListTask />} />
        <Route path="/task/:id" element={<DetailTasks />} />
        <Route path="/create" element={<Homepage />} />
      </Routes>
      </>
  )
}

export default App
